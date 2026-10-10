# 017. Release and deployment strategy: staging, then a no-traffic revision, then promote on approval

Status: accepted by the user, 2026-10-09
Depth class: structural

## Context

The CI/CD pipeline is new (first CI deploy 2026-10-08, [[deploy-runbook]] §10). Today every merge to `main` that passes Tests builds, deploys at 100% traffic, smoke-tests, and rolls back by itself if the smoke test fails. Production migrations are applied by hand beforehand (§8). Branch protection is off, and the `production` environment has no required reviewer. There is no staging environment.

Gate answers (the user, 2026-10-09):
- **Pressure:** none measured yet, because the pipeline is new. The expected pressure is an alpha with outside users, frequent features and fixes, and a manual migration step that can be forgotten. Two other accounts already use production.
- **Unit:** one container (API plus the PWA bundle, one origin, [[010-hosting-cloud-run]]), stateless, on Cloud Run (`max-instances=1`, `min-instances=0`) with Neon Postgres.
- **Rollback target:** 30 minutes or less. Moving Cloud Run traffic back takes seconds, so this is met.
- **Schema coupling:** features and fixes ship often; the user is preparing an alpha and will set a plan once real users give consistent use.
- **Environments:** the user wants a staging environment. Sign-off: wants a person's approval for production during the alpha.
- **Cadence:** slower than the last few weeks (other projects compete for time); a single person watches.
- **Infrastructure:** extra paid services only if there is a clear reason.

## Decision

1. **Environment progression:** PR (CI) → merge to `main` → **staging** (automatic) → **production** (approval).
2. **Staging** is a second Cloud Run service (`iron-log-staging`, scale to zero) on a Neon branch. CI applies migrations to the staging branch on every deploy, so every migration is rehearsed before production. Production data is never copied there without a plan for what is in it.
3. **Production rollout:** deploy the new revision with a tag and **no traffic**, smoke-test the tagged URL, then send it 100%. A failing revision never receives traffic. No percentage canary: with a handful of alpha users a 5% slice gives no signal.
4. **Sign-off:** staging is automatic. Production needs the user as required reviewer on the `production` GitHub environment, kept for the alpha. Branch protection requires the Tests jobs and a pull request.
5. **Migrations to production stay manual** (CI never holds the production owner password), with a backup run first ([[deploy-runbook]] §7, §8). The existing "migration waiting" stop stays.
6. **Expand/contract is the rule for schema and API changes:** add-only migration → migrate → deploy code that writes both → backfill → deploy code that reads the new shape → drop the old much later. Installed PWA bundles stay on the old client until they update, so the API supports the previous client for one release (the `minClientVersion` update gate, [[003-sync-versioned-rows]]).
7. **Rollback:** before promotion nothing to roll back. After promotion, the 5xx alert, then a one-line traffic move to the previous revision. A rollback that pins traffic to a revision must be undone with `--to-latest` before the next deploy, or later revisions get 0% traffic.
8. **Cadence:** staging on every merge; production when the user chooses, about weekly while time is split across projects. The user watches; the alert email goes to the user.
9. **Health signal:** the smoke checks (health, database login, app files, anonymous `/api/me` = 401) and the existing 5xx alert. A richer signal waits for real traffic ([[013-error-reporting-cloud-logging]]).

## Alternatives considered

- **Canary with traffic percentages.** Not chosen: too little traffic to judge a slice.
- **Blue-green.** Not chosen: a no-traffic revision plus a promote already gives an instant swap and instant rollback on Cloud Run.
- **Feature flags for everything.** Not chosen: every flag is a branch to test both ways and later remove. Use one only for a risky feature that needs instant off.
- **Auto-deploy to production on every green merge (today).** Not chosen for the alpha: nobody trusts the gate yet, and the smoke test cannot catch a change that is wrong but healthy (the loading flash and empty-account bugs of 2026-10-08/09 were found by looking).
- **Manual deploys only.** Not chosen: slowest, and it drops the safe automatic part.

## Consequences

- A second set of secrets, an OAuth redirect URI for staging, and a Neon branch to maintain. Check Neon Free plan branch and compute limits and Artifact Registry storage before relying on staging; staging itself scales to zero, so it should cost about $0.
- One approval click per production release.
- The tagged URL differs from the service URL, so Google sign-in does not work on it; the pre-promotion smoke test is anonymous only. A signed-in sync round-trip check needs a safe test account and is a separate item.
- Production migrations remain a human step; the cost is that one can be forgotten, the stop in the deploy workflow is the guard.
- Dropped requests during a swap: not measured yet. Measure first (probe the service during a deploy), then add a startup probe on `/api/health/db` only if requests fail. The server already handles SIGTERM by closing the listener and pool, and the sync queue retries without discarding ([[010-hosting-cloud-run]], FM-02).

## First real deploy and measurement (2026-10-09, local evening)

- The first run (Deploy #16, merge of #140) stopped at the migration check, before building anything: the live-commit lookup returned a image digest, not a commit. Fixed in #142 (`COMMIT_SHA` setting on each revision). Production was untouched.
- Deploy #17 (merge of #142) ran the whole new flow and passed: candidate with no traffic (22:14:48 to 22:16:10), candidate check, promote (22:16:11 to 22:16:34), live check. Revision `iron-log-00015-sax`.
- **Dropped requests: none measured.** `scripts/deploy-probe.sh`, two requests a second to `/api/health` and `/api/health/db` across the whole deploy: 491 requests between 22:13 and 22:19, all 200, slowest 0.64 s; 0 non-200 in the whole log (1600+ requests). The one slow answer (3.1 s, 22:11:00) was before the deploy started, an idle cold start. So no startup probe is needed now.
- Why the swap is quiet: the candidate check warms the new revision before it gets traffic, so promotion lands on a warm instance.
- Limits of this measurement: health endpoints only (no sync writes or sign-in), one deploy, a handful of users. Repeat when traffic grows.

## Revisit when

- A bad release gets past the smoke test, or a deploy visibly drops requests.
- More than about 20 active users, or enough traffic for a percentage canary to be meaningful.
- Shipping more than a few times a week makes the approval click the bottleneck.
- Migrations become frequent enough that the manual step hurts, or a missed one causes an incident.
- Staging costs or upkeep outgrow their value.

## Spec amendment

None. Implementation is a separate, explicitly started step; the items are in [[Projects/iron-log/docs/backlog]] under "Deploy safeguards".
