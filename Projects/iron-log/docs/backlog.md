# TODO

Work through these from the top: bugs first, then the backend and its load-bearing decisions, then what follows them, then UX and optional ideas. Completed sections are at the bottom. Item numbers are labels only, not an order; check for bugs after each item.

**Convention: all new code is TypeScript** (`.ts`/`.tsx`, strict). Do not add `.js` or `.jsx` files; core types are in `src/types.ts` and `src/store/types.ts`. Run `npm run typecheck` with the other checks. _Last reviewed against the code: 2026-10-09 (see the review notes at the end)._

## Phase F follow-ups (added 2026-10-08, when Phase F was closed; see [[build-spec]], [[deploy-runbook]])

Live since 2026-10-08: revision `iron-log-00005-wvl`, deployed by CI. These are what Phase F left behind.

- [x] (checked 2026-10-08: the owner's row, id 1, already had `is_admin = true`; two other accounts have signed up, neither admin) Set `is_admin` on the owner's row in production by hand (B2f): `update users set is_admin = true where auth_user_id = (select id from auth."user" where email = '<email>')`. The app role cannot do this.
- [x] Stale branches (done 2026-10-08): 89 remote and all local branches deleted, including the old `import-fixes`, `pwa`, `react-conversion`, `wcag-aaa` and the unpushed spike branch `spike-s0-signin`. Left on GitHub: `main`, `data` (backups), `pr-screenshots` (the screenshots workflow). Names and commit ids are in `restore_remote.txt` and `restore_local.txt` in this folder, if one is needed back.
#todo/project/priority/High
- [ ] **First installed-iPhone PWA sign-in** (open S0 item below). Add to Home Screen, open from the icon, sign in with Google, close and reopen, still signed in. If it fails, reopen ADR 004 and the same-origin choice in ADR 010.
- [ ] Confirm the Neon **owner** password was rotated (it lives only in the local `.env`; the app and CI use `ironlog_app`).j
- [ ] Rehearse a Neon restore and a failing migration on a Neon branch (FM-20, FM-21, FM-24). Phase F listed both; they were not done.
- [ ] Watch for a missed nightly backup: the alert cannot cover "no backup for a day". Look now and then at `PROJECT_ID=iron-log-jacgit18 scripts/backup-cloud-run.sh list`.
- [ ] GitHub Actions: `ubuntu-latest` moves to Ubuntu 26 on 2026-10-19 (notice in the deploy log). Run the workflows once after that date, or pin `ubuntu-24.04`.
- [ ] Personal defaults must not leak into a new account (also covers the same item under Multi-user readiness below). Decision in [[016-new-account-starting-state]]. **Status 2026-10-09:** steps 1 and 3 and the stretches extension are built on branch `f-no-board-until-loaded-2` (3 commits ahead of `main`, merge pending): a new account gets the blank program (`BLANK`, `settleStart`), a first-run prompt (`FirstRun.tsx`), an empty stretch list (`StretchFirstRun.tsx`), and no board is drawn until the data has loaded. Accounts with a log entry or a saved program keep what they had. **Left:** (step 2) the "Original program · built in" row in `Editor.tsx` still offers the owner's plan: make "Original" mean blank in sync mode, but only after the two existing accounts have been asked or checked; (step 4) remove `jacgit18/iron-log-data`, `jacgit18/iron-log` and `Composio For You` from `export.ts` (or remove the GitHub backup first, §4). The exercise library `EX` stays as it is for now. Supplements and experiment lists were not checked for owner defaults.
#todo/project/priority/Low
- [ ] Update ADR 004 (sign-in) with what the deploy showed, and record the iPhone result.
- [ ] Decide the tombstone purge window and the refused-writes retention (open in [[iron-log]]). The 2026-10-09 audit adds `row_history` to this and a per-account size limit; see "Security audit follow-ups".
- [ ] **Deploy safeguards: DECIDED 2026-10-09, see [[017-release-and-deployment-strategy]] (staging, then a no-traffic tagged revision smoke-tested and promoted, production on approval, migrations manual with a backup first).** Build steps below, in order. The original options list is kept after them for reference (noted 2026-10-09).
  - [x] 1. Required checks on `main` (done by the user 2026-10-09; verified): the "Protect main" ruleset requires a pull request, blocks force-push and deletion, and now requires `test`, `docker`, `database`, `backup`, `e2e-sync`, `e2e`. (Correction: `main` already had a ruleset; classic branch protection was what returned 404.)
  - [x] 2. Required reviewer on the `production` environment (done by the user 2026-10-09; verified: `jacgit18`). Each production deploy now waits for one approval click; keep it for the alpha.
  - [ ] 3. **Revisions: deploy with no traffic, test, then promote. Built and live 2026-10-09 (#140, with the live-commit fix #142); first real deploy (#17) passed. 3e (rehearse a failing candidate and a rollback) is still open.** (change `scripts/deploy-cloud-run.sh` and `.github/workflows/deploy-cloud-run.yml`). Steps:
    - [x] 3a. Deploy with `gcloud run deploy ... --no-traffic --tag candidate`; read the tagged URL from the output (`https://candidate---iron-log-<number>.<region>.run.app`).
    - [x] 3b. Run `scripts/ci-deploy.sh smoke <tagged url>` against it. If it fails, stop: the revision never got traffic, so there is nothing to roll back (delete the tag/revision if wanted). Smoke is anonymous only, because Google sign-in does not work on the tagged URL.
    - [x] 3c. If it passes, `gcloud run services update-traffic iron-log --to-tags candidate=100`, then smoke the real service URL once more.
    - [x] 3d. Rollback path: after a post-promotion failure, `update-traffic --to-revisions <previous>=100`. **That pins traffic**, so the next deploy would get 0%. Restore with `update-traffic --to-latest` once the fix is ready (or make the deploy script do it), and write this in [[deploy-runbook]] §6.
    - [ ] 3e. Rehearse once: deploy a deliberately broken candidate (the smoke test should reject it with no user impact), then rehearse a rollback and the `--to-latest` restore. Update [[deploy-runbook]] §10 and the workflow header comment.
  - [x] 4. **Measure dropped requests during a deploy. Done 2026-10-09: none dropped across deploy #17 (491 requests in the deploy window, all 200, slowest 0.64 s); result recorded in [[017-release-and-deployment-strategy]]; no startup probe needed for now.** Probe written 2026-10-09 (`scripts/deploy-probe.sh`, runbook §11, same branch); the measurement itself still has to be taken during a real deploy: start the probe, then approve the deploy. (optional; do it before adding any fix). Nothing is built; the point is to find out whether a swap fails any requests. Plan: in a scratch script (`scripts/` or the scratchpad, not committed unless useful), run `curl` against `/api/health` and `/api/health/db` once a second, logging the time and HTTP status, from just before until a minute after a deploy (a plain deploy now; after step 3 also around the promote). Count non-200s and the slowest response (cold start of Cloud Run plus Neon wake). Result: if none fail, record "no drops measured" in [[017-release-and-deployment-strategy]]. If some fail, add a startup probe on `/api/health/db` (one flag on `gcloud run deploy`) and measure again. Graceful shutdown already exists (`SIGTERM` closes the listener and pool in `server/index.ts`) and the sync queue retries without discarding, so a failure here is expected to be a slow request, not lost data.
  - [ ] 5. **Staging:** second Cloud Run service (`iron-log-staging`, scale to zero) on a Neon branch with its own secrets and a Google OAuth redirect URI; CI deploys it on every merge and applies migrations to the staging branch there. First check Neon Free branch and compute limits and Artifact Registry storage. The user does the secret and account steps; needs the production deploy to wait on staging passing.
  - [x] 6. Retired the GitHub Pages deploy (`.github/workflows/deploy.yml` removed, README points at Cloud Run; no users were on it). Still to do by hand: Settings → Pages → turn off, 2026-10-09.
  - [ ] 7. Pin `ubuntu-24.04` in the workflows before `ubuntu-latest` moves to Ubuntu 26 on 2026-10-19 (same as the open item above; do both together).
  - [ ] **Required reviewers** on the GitHub `production` environment (Settings → Environments → production): each deploy waits for one click. Zero code; the runbook suggested it for the first few deploys.
  - [x] **A pause switch** (done 2026-10-10, #146; tested on the #147 merge: deploy skipped, summary shown; see [[deploy-runbook]] §10): a repository variable (for example `DEPLOY_PAUSED=true`) that makes the deploy job skip, so merges can keep landing while production stays put. Small workflow change.
  - [ ] **A wider smoke test:** today it checks the API, the database login, the app's files and that an anonymous call is refused. Could add a real sign-in and one sync round-trip with a test account (needs a test account that is safe to keep in production, and an ADR).
  - [ ] **Gradual rollout:** deploy the new revision with no traffic, run the smoke test against it, then send a small share of traffic (Cloud Run traffic splitting) before 100%. Needs a decision about how long to watch and what to watch.
  - [ ] **Manual deploys only:** change the trigger back to `workflow_dispatch`, so a person starts every deploy. The old way; slowest, safest.
  - [ ] **A staging copy:** a second Cloud Run service on a Neon branch, deployed on merge, with production deployed by hand or on a tag. The most protection and the most to maintain (a second service, secrets and database branch); probably only worth it with more users.
  - Existing item folded in: Required reviewers on the `production` environment, at least for the first few CI deploys.
- [ ] Turn on "Automatically delete head branches" in the GitHub repo settings, so merged branches stop piling up.
- [ ] The README screenshots bot adds a commit to every PR branch even when only a few bytes of a PNG change (noise, and it makes the branch move under you: it rejected a push on #127). Only commit when the image really differs.
- [ ] Flaky test: `src/lib/planOrder.test.js` "on random programs ..." takes about 6 s on this machine against the 5 s default. Give it a longer timeout (do not change what it checks: the reorder tests must stay).
- [ ] The build warns that a chunk is over 500 kB; split the largest (lazy-load the tabs) if load time on a phone matters.
- [ ] Lint: `Supplements.tsx:83` warns `set-state-in-effect` (known, one warning).
- [ ] CI deploy rough edges found on the first run, now fixed (#128, #129): the Google sign-in file made the tree dirty; the deployer needed `storage.buckets.list`; the build ran as the Editor-role default account. Notes in [[deploy-runbook]] §10.
- [ ] Spike clean-up (S0): delete the Artifact Registry repo `cloud-run-source-deploy` in `iron-log-spike` (about 345 MB: `gcloud artifacts repositories delete cloud-run-source-deploy --location us-central1 --project iron-log-spike`), the Neon `spike-s0` branch (Neon console, Branches; look at it first), and then consider deleting the `iron-log-spike` project (`gcloud projects delete iron-log-spike`; Google keeps a deleted project 30 days; do it last, the registry repo lives in it). The local `spike-s0-signin` branch is already deleted (2026-10-08; its commit was `70f1187`, never pushed). Before rotating or deleting a Google OAuth client secret, check which client production uses (secret `iron-log-google-client-id`); rotating that one signs everyone out until the secret is updated.

## Security audit follow-ups (added 2026-10-09; see [[Projects/iron-log/docs/security-audit/README|security-audit]] and [[REPORT|run-1 report]])

A full audit of commit `979f6ea` found nothing critical, high or medium. These are the fixes and checks it left, grouped by what to do first. "Open lead" items are unverified: the audit could not see the live system, so the first step is a read-only look, not a code change. One change per commit; add a regression test for each fix; update [[feature-map]] if an interaction changes.

**Triage (2026-10-09).** What sets the urgency is who can trigger it.
- **Now:** merge PR #137 (the `/api/auth` body cap; anyone on the internet could crash the server, no account needed). Look once at the deployment facts below, especially required reviewers on the `production` environment (every merge deploys by itself) and whether the Google consent screen is published. Decide the backup soft-delete wording (a two-line change either way).
- **Before opening sign-up** (each needs a signed-in account, and only three accounts exist today): the `import-legacy` pool timeouts and one-import-at-a-time, storage caps and retention (check Neon's storage limit first), the rate-limiter map cap and /64 keys, the expected-user header for sync, and the soft-delete wording if not done.
- **Whenever:** merge PR #138 (sync re-check; low), and the five hardening bundles (CI, database, client input, server, operator scripts).

#todo/project/priority/High
- [ ] **Sync: re-check who is signed in before every send and pull** (confirmed, low; not urgent, merge PR #138 when convenient). **Status 2026-10-09: the client part is built and tested on branch `f-sync-recheck-identity`, PR #138 open ( also saved as a stash and as `security-audit/run-1/validation/sync-recheck-identity.patch`): `verified` is cleared on wake and on every poll. Left: the server-side expected-user header and 409 for the case of a visible tab edited while another window switches the account.** Original description ( `src/sync/apiDb.ts:152`). `gate()` checks identity once, then trusts it until a 401. If another tab signs out and in as someone else, the open tab sends its unsent log entries into the new account and pulls that account's rows into its own view. Re-verify on wake, on the minute poll and on visibility change, or clear `verified` there; better, send an expected-user header and make the API refuse a mismatch (409), so the client pauses with "account". Add a test with two fake servers like the audit's harness. Also store the owner id inside the outbox and mirror values so a later page load can reject them cheaply.
- [ ] **CSV export formula guard** (confirmed, low; already listed under Bugs): in `csvCell` (`src/lib/export.ts:28`) prefix a `'` to text cells that start with `=`, `+`, `-`, `@`, tab or CR (text columns only, so negative weights stay numbers). Test: `=1+1` exports as `'=1+1`.
- [ ] **Cap the body size on `/api/auth`** (**reproduced 2026-10-09: 16 concurrent 32 MiB anonymous bodies killed the production server in a 512 MiB container; fix `server/bodyLimit.ts` is on branch `f-auth-body-cap`, PR #137 open, with tests, and the same flood then got 413 with memory flat at about 50 MiB. Left: commit and PR it; check on staging what Cloud Run forwards (about 32 MiB) and look in the live logs for Better Auth's "could not determine a client IP" warning**; `server/app.ts:85`). The better-auth handler is mounted before every body parser, so an anonymous caller can send a body of any size (a 32 MiB test body added about 65 MB of server memory; the service is one 512Mi instance). Add a small byte cap ahead of the mount (a `Content-Length` check that answers 413). Then, on a staging copy only, check what 6 to 10 large bodies do (Cloud Run memory and restart metrics) and what Cloud Run itself rejects (about 32 MiB).
#todo/project/priority/Low
- [ ] **After PR #137 is deployed, one harmless live check** (needs your yes first): a single ~20 KiB `POST` to `/api/auth/sign-out` on the live URL should answer `413`. That confirms the body cap is live; do not send anything large. Also look once in the live logs for Better Auth's warning "could not determine a client IP and is falling back to a single shared per-path bucket" (it appeared locally when a request had no forwarded-address header); on Cloud Run the header should be there.
- [ ] **Sync, the full fix: the server refuses a request from the wrong user.** The client sends `X-Expected-User` (the id it verified); `sessionAuth` answers `409` when it differs from the session's user, on `/api/commands/*`, `/api/sync` and `import-legacy`; the client pauses with "account" and sends nothing. Closes the gap PR #138 leaves (a visible tab edited while another window switches account, until the next poll). Needs a small ADR note (the contract changes) and a test with two users on one cookie jar. Before sign-up opens.
- [ ] **Rate limiter** (bypass **reproduced 2026-10-09**: 25 of 25 requests from rotating IPv6 addresses passed a 20 a minute limit; the scan cost is small, 0.3 ms to 1.8 ms at 40,000 keys; still open: whether the live service sees IPv6 clients; `server/rateLimit.ts:26`): once the map passes 10,000 keys every request scans it, live keys are never evicted, and each distinct IPv6 address is its own bucket (so the sign-in limit of 10 a minute is bypassed). Put a hard cap on the map, key IPv6 by /64, sweep on a timer instead of per request. First check, on staging, whether the run.app URL accepts IPv6 clients and what `X-Forwarded-For` the app sees; if either is no, close the lead.
- [ ] **`/api/health/db`** (rejected as a finding, kept as hardening; `server/app.ts:98`): give it its own small per-IP limit or a few seconds of cached result, and fix the comment at `app.ts:118` that says an anonymous caller never reaches the database. The deploy smoke test must still get a 200.
- [ ] **Per-user storage limits and retention** (growth **reproduced 2026-10-09**: 100 saves of 52 KB added 5.7 MB to `row_history`, 100 refused 80 KB bodies added 8.5 MB to `refused_writes`, linear with no cap; still open: Neon's storage ceiling and whether sign-up is open; fold into "Decide the tombstone purge window and the refused-writes retention" above). Today only the request count is limited (600 a minute). Decide: a cap on rows and bytes per account, a prune of `row_history` by `replaced_at` and `refused_writes` by `received_at`, a size cap on what `refuse()` stores, and a cap on log, library and list rows. First look at the Neon storage limit and alerts, and whether sign-up is restricted.
- [ ] **`import-legacy` can hold a database connection for a long time** (**reproduced 2026-10-09**: 2,000 commands hold a connection 4.4 s; one account sending 3 at once on a pool of 3 made another user wait 3.9 s; the repeat-after-rollback variant was not reproduced; production pool is 10; `server/commands/importLegacy.ts`): up to 20,000 commands in one transaction on a shared pool of 10 with no timeouts. Set pool `max`, `connectionTimeoutMillis`, `statement_timeout` and `lock_timeout`; allow one import in flight per user; consider a time budget or a smaller command cap. Measure one 2,000-command import on a local Postgres first.
- [ ] **Backup bucket soft delete vs the 30-day promise** (confirmed on the live bucket 2026-10-09: soft delete is 7 days, so a dump could survive to about day 37 against a promise of 30). **Decided: keep the 7-day undo and delete at 23 days (23 + 7 = 30).** PR #139 sets `RETENTION_DAYS` 23 and pins `SOFT_DELETE_DAYS` 7 in `scripts/backup-cloud-run.sh`, with a policy test that they add up to 30. **Left after merging:** run `PROJECT_ID=iron-log-jacgit18 scripts/backup-cloud-run.sh setup` once (idempotent) and confirm with `gcloud storage buckets describe gs://iron-log-jacgit18-iron-log-backups --format='yaml(lifecycle_config,soft_delete_policy)'` that it says `age: 23` and `retentionDurationSeconds: '604800'`. Restore points then reach back 23 days, not 30.
- [ ] **Deployment facts to look at once** (source cannot show them; none is a known problem): Cloud Run invoker policy and `NODE_ENV=production` on the live revision; the GitHub `production` environment's reviewers (already listed under Deploy safeguards) and branch rule; whether the Workload Identity provider's condition is bound to the repository id and the `production` environment, and that it was re-applied (the setup script never updates an existing provider); the live Neon role really is `ironlog_app` (not owner, no BYPASSRLS), and whether the pooler keeps `SET LOCAL app.user_id` (`scripts/check-pooled-rls.mjs --scratch` against a branch).
- [ ] **Narrow the CI deployer's roles** (hardening; the audit rejected this as a vulnerability because only this repo's main branch can use the identity): give `run.developer` on the one service instead of the project, bind `builds.editor`/`builds.create` with a condition or set the project's default build account to `iron-log-build`, and correct the header comment in `scripts/ci-deploy-setup.sh` (it says the deployer cannot read the database, secrets or backups, which is not strictly true).
- [ ] **CI and workflow hardening, one small PR** (all hardening): pin every action by commit SHA (and `ubuntu-24.04`, same item as the Ubuntu 26 note above); `persist-credentials: false` on the screenshots checkout; in `deploy.yml` move `pages: write` and `id-token: write` from the workflow to the deploy job; `scripts/ci-deploy.sh` use `--no-renames` so a renamed migration still stops the deploy; refuse a `head_sha` that is not an ancestor of `main` (a re-run of an old Tests run redeploys an old commit); pass `steps.live.outputs.*` through `env:`; key the screenshots concurrency group on the PR number; make `gh pr list --head` match the owner.
- [ ] **Database hardening, one migration** (all hardening, none reachable today because no request can run its own SQL): `set search_path = public, pg_temp` and schema-qualified names in `record_row_history`, `ensure_user`, `erase_my_data` and `delete_my_account`; `revoke temporary on database ... from public`. Make `server/db/rls.test.ts` assert each policy's condition (`user_id = app.user_id`), not only that a policy exists; add a "every table has RLS" check to `scripts/check-migrations.mjs`; run `check-pooled-rls.mjs` over every data table. Consider a second database role for better-auth, because `ironlog_app` has full access to the `auth` schema (sessions, encrypted tokens) with no row-level security.
- [ ] **Client input hardening, one PR**: apply `goodUrl` to `cfg.ex[].url` and `backup.last.url` inside `normConfig` (server and client share the rule); use `Object.hasOwn` or null-prototype objects in `excelImport.readWeeks` and `readSessions` (a day named `hasOwnProperty` wrote onto a built-in; rejected as a vulnerability, in-memory only), skip `__proto__` keys in `settingsSlice.applyImport` and `normTakenDay`; cap supplement and stretch id charset and length; `validRepo` reject `.` and `..` segments and encode the path in `github.ts`; a size cap before `JSON.parse` of restored text; clear the GitHub token key on sign-out or account change; add a CSP `<meta>` to the GitHub Pages build (it has no CSP header).
- [ ] **Small server fixes**: gate the CSP skip in `server/securityHeaders.ts:31` to `/dev/auth` in development only (today any `/dev/*` path gets no CSP in production, and the SPA answers there); add `MIN_CLIENT_VERSION` to `deploy-cloud-run.sh` or use `--update-env-vars` (`--set-env-vars` drops an operator-set value and the 426 gate is off in production); slice the message to about 1000 characters before masking in `server/clientErrors.ts`; require `Origin` or `Referer` on mutations that carry a session cookie; add `pg_has_role` to the owner check in `server/db/role.ts` over all public tables; in `erase_my_data`/`delete_my_account` take the user-row lock first; make `ensure_user` require an existing `auth."user"` row.
- [ ] **Operator scripts**: make the `scripts/e2e-sync.mjs` local-only guard reject `host=`, `hostaddr=`, `service=` and `PGHOST` (it checks only the URL hostname, and `pg` honours `?host=`); make `seedTestUser` check `--to` against `auth.user`.
- [ ] **Document-save replay**: `save-week`, `save-program`, `save-library-item`, `save-list-item`, `save-supplement-day` and `log-body-weight` revive a deleted row on a stale queued create (the log commands do not). Same-user only and by design, but decide if they should require the tombstone version like the log commands do.
- [ ] **Make the audit repeatable**: put a local Postgres in the sandbox (the Docker container on port 5433 is loopback-only) so the Postgres-backed suites and the open leads above can be measured; then re-run the audit after the fixes. The tools are in `security-audit/run-1/tools/`.

## Bugs

Found in the 2026-10-05 bug sweep and re-checked against the code on 2026-10-06 (all still present; the TypeScript conversion changed none of them, only renamed files). The high and medium ones are fixed (#67), plus import-replace atomicity and the empty-repo GitHub backup (PR in review). These are what's left.

#todo/project/priority/High
- [ ] `bestLift` can show the wrong date when entries aren't in date order (`addEntry` and `mergeEntries` sort; a JSON replace import and database snapshots do not, `normEntries` keeps the file's order). Simplest fix: sort in `normEntries`.
- [ ] CSV export: a leading `=`, `+`, `-` or `@` in a note or exercise name runs as a formula in Excel (confirmed by the 2026-10-09 audit, severity low; fix described under "Security audit follow-ups"). CSV import also drops the exercise id (`exId` column is empty), so a renamed custom exercise duplicates.
#todo/project/priority/Low
- [ ] Deleting a stretch and re-adding one with the same name brings old check-offs back in earlier weeks (ids are slugs of the name).
- [ ] Merge-import orphans stretch check-offs when the stretch matches by name but has a different id.
- [ ] Rest timer: the manual Rest button uses `restSecs() || 90`, so a Rest setting of 0 runs 90 s while holds treat 0 as no rest. Decide which is intended.
- [ ] Wake lock can leak if `stop()` or a restart lands before the lock request resolves (`src/store/useTimerStore.ts`). Track the pending promise.
- [ ] Excel notes: an entry with both a note and `auto` loses `auto` on re-import (`noteOf` in `src/lib/export.ts`).
- [ ] Small leaks: `UpdateBanner` hourly interval never cleared, `useTooltips` doesn't clear its hide timer, `initPwa` adds listeners on every call, theme-color meta doesn't follow an OS theme change.
- [ ] GitHub rate-limit message always says "paste your token first", even when a token is set (`explain` in `src/lib/github.ts`).
- [ ] `screenshots.yml` fails on fork PRs (read-only token on `git push`), and its `git clone || git init` fallback hides real clone errors.
- [ ] Experiment excercises only show 5 days on dropdown

## 3. Backend, database and Google login (together)

> 2026-10-08: a landing page now hides the app from people who are not signed in (the deployed build only). Still to decide: the `plan` column (beta, free, paid), a signup cap, publishing the consent screen.

- [x] Choose a backend. Accepted for now (2026-10-06): own API server in Docker on Neon Postgres, with a separate auth provider (ADR 001 draft, [[001-backend-shape]], 2026-10-05). Firebase and Supabase were considered; Supabase is the fallback. This replaces the earlier Firebase lean once confirmed. Remaining stack decisions (datastore, sync, auth, language, framework, hosting) are still being walked.
- [x] Pick the API language: TypeScript on Node (ADR 005). **Lean TypeScript:** the API can import `src/types.ts` and run the same `validate.ts` cleaners (`normEntry`, `normProgram`, `normLibrary`, `normBody`) and `normalizeData`/`DataFile` on the server, so client and server cannot disagree on a document's shape. The docs are already versioned (`SCHEMA_VERSION`) and stamped (`updatedAt`). Another language means re-implementing and re-testing all of that. Needs a shared types package or a monorepo layout.
- [x] Add Google login. Each user's data is tied to their account. (Phase B, live since 2026-10-08. Only the installed-iPhone test is open, see Phase F follow-ups and the S0 items below.)
  - [ ] **S0 iPhone test (parked 2026-10-07; the user will do it later).** Google login passed on the desktop locally, and the spike also ran on Cloud Run. **The Cloud Run service and its four secrets were deleted on 2026-10-07**, so the test needs one redeploy first: on the local branch `spike-s0-signin` (the spike code exists only there, never pushed) fill `spike/.env`, run `./spike/deploy.sh`, then `BASE_URL_OVERRIDE=<service URL> ./spike/deploy.sh`; the OAuth client already allows `https://iron-log-spike-1088998530888.us-central1.run.app`. Then on the iPhone, in Safari: Add to Home Screen, launch from the icon (page must say `display-mode standalone: true`), sign in with Google, note where you land afterwards, check `/api/me`, close and reopen the app, check `/api/me` again, and record the iOS version. Pass/fail rules are in [[build-spec]] section 4. Record the result in ADR 004 and 010. If it fails, try popup versus redirect and Google's ID-token flow before reopening the same-origin choice.
  - [ ] **S0 cleanup, what is left (done 2026-10-07: Cloud Run service and 4 secrets).** After the iPhone test: delete the Artifact Registry repo `cloud-run-source-deploy` (about 345 MB of images, a small storage cost), the Neon `spike-s0` branch, the local branch `spike-s0-signin` (never merge it), consider deleting the `iron-log-spike` project, and rotate or delete the Google OAuth client secret. Keep the budget alert.
  - [ ] **Not a gate any more (2026-10-07):** we assume iPhone sign-in works and verify it at the first real deploy (see the build spec drift log). B1 stays open until that result is recorded. (Earlier wording follows.) B1 stays open until the iPhone result is recorded. B2 (real sign-in in the API) needs it, so Phase B is blocked on this. Phase C does not need it.
- [x] Keep it offline-first for gym use: queue saves and sync them later. (Phase D: persisted outbox, replay with a retry cap, quarantine; `src/sync/outbox.ts`.)
- [x] (Phase E: `import-legacy`, `src/sync/legacy.ts`, Settings → Account → Upload from an export file) Add a one-time "upload my existing data" step so data already on the phone isn't lost. (Smaller now: `buildDataFile`/`normalizeData` already produce and check a typed `DataFile`, which is exactly what to upload.)
#todo/project/priority/Low
- [ ] Possibly exercise catalog what api to use any free options
  - If the app goes multi-user this is close to required: use it to prefill muscles, equipment and video links so new users don't type every exercise.

### Backend stack walkthrough (2026-10-06, one ADR per decision, free tiers only)

Run with `/tech-decision-walkthrough`. Handoff: `iron-log/.claude/handoffs/handoff-backend-stack-walkthrough-2026-10-06.md`.

- [x] 1. Backend shape: own API in Docker (ADR 001)
- [x] 2. Datastore: Neon Postgres, database-first migrations (ADR 002)
- [x] 3. Sync, ADR 003 [[003-sync-versioned-rows]] accepted (design B agreed: per-row server versions, stale edits refused and re-merged on the phone, `deletedAt` tombstones, idempotent client-id creates, server-stamped time, short history table, change-feed pull later). Failure-mode register done ([[sync]], register only) and ADR 003 accepted. Was: failure-mode analysis (5x5 grid; inventory gaps to add: "error reporting (none yet)", "backups and restore" (check Neon's free restore window), "where sync errors show" (server logs plus a user-visible message when a write keeps failing)), then write ADR 003 and log any amendments to [[backend-data-rules]] section 7.
- [x] 4. Auth: Better Auth inside our API, Google login first, email/password deferred (ADR 004 [[004-auth-better-auth]]). Own `users` table, provider id in one column, token check in one module; one admin flag with a logged path; row-level security backstop; sharing later via opt-in grants. Open spikes: iOS cookie behavior across sites (settle at decision 9) and Google OAuth in an installed iOS PWA.
- [x] 5. Language/runtime: TypeScript (`strict`) on Node LTS, types and validation shared with the client (ADR 005 [[005-language-typescript-node]]). Go and Python lost on rule drift and Better Auth; revisit if footprint hurts at decision 9.
- [x] 6. Web framework: Express 5, thin routes, rules in the shared framework-free module (ADR 007 [[007-web-framework-express]]). Hono is the fallback.
- [x] 7. API style: command endpoints over plain JSON HTTP (`POST /api/commands/<name>`, `GET /api/sync?since=`), one response envelope, shared contract module (ADR 008 [[008-api-style-commands-json-http]]).
- [x] 8. Data-access layer: Kysely typed query builder, raw `sql` escape hatch, types generated from the database, explicit transactions (ADR 009 [[009-data-access-kysely]]). Migration tool still open.
- [x] 9. Hosting: Google Cloud Run (max one instance, budget alert), Express serves the PWA from one origin; Render free is the no-card fallback (ADR 010 [[010-hosting-cloud-run]]). Prices from aggregator sites, confirm on provider pages. Open spike: Google sign-in in an installed iOS PWA.
- [x] 10. One-time upload: one `import-legacy` command, empty account only, dedupe by client id, check legacy hash collisions first (note in [[Projects/iron-log/docs/architecture/stack-walkthrough|stack-walkthrough]]).
- [x] 11. lb/kg storage unit: canonical pounds, `numeric` 4 dp in `weight_lb`-style columns, one conversion module, display-only toggle (ADR 006 [[006-weight-unit-canonical-lb]]). Table design is now unblocked.
- [x] Table design via `relational-modeling`: [[iron-log]] written 2026-10-06 (bigint ids plus unique client id, jsonb documents, per-user change counter, history trigger, RLS). Open: tombstone purge window, refused-writes retention, migration tool.
- [x] Closeout (written in [[Projects/iron-log/docs/architecture/stack-walkthrough|stack-walkthrough]]): summary table; cross-cutting obligations (HTTPS, rate limits, backups, CI, secrets, migrations tool, error reporting, privacy policy and data-deletion path); cost-cap check; deferred list; missed-decision audit
#todo/project/priority/Low
- [ ] Verify Neon free-tier numbers at neon.com (1 GB per project, 100 CU-hours per month; from aggregator pages)
- [ ] Verify iOS Safari storage eviction for non-installed PWAs (offline up to about 2 days)
- [ ] Then type `/system-design-communication` (once the stack is settled) and `/decision-journal` for any decision to revisit

### Open after the backend stack walkthrough (2026-10-06; details in [[Projects/iron-log/docs/architecture/stack-walkthrough|stack-walkthrough]])

Short ADRs still to write:
- [x] Date and timezone policy (FM-12): local calendar dates as data, Sunday-start week, server validates (ADR 011 [[011-date-and-week-policy]]).
- [x] Migration tool: dbmate, plain SQL files (ADR 012 [[012-migrations-dbmate]]).
- [x] Error reporting and logging: Cloud Run logging plus our own client-error endpoint, Sentry as the upgrade (ADR 013 [[013-error-reporting-cloud-logging]]).
- [x] Backend test tooling: Vitest plus a real Postgres in a throwaway container (ADR 014 [[014-backend-test-tooling]]).
- [x] Shared code layout: one package, `src/shared/` plus `server/`, workspaces as the planned next step (ADR 015 [[015-shared-code-layout]]).

Values to set:
#todo/project/priority/Low
- (Tombstone purge window and refused-writes retention: tracked under Phase F follow-ups at the top.)

Spikes and checks (do early):
- [x] Count legacy `k`+hash id collisions in a real export before building `import-legacy`. (2026-10-08: the 2026-10-07 export has 53 entries and 0 collisions; the old `iron-log-data.json` has 1, `dip` and `kneeraise` on 2026-09-28: the hash ignores the exercise and ids are unique per user across exercises, so the importer gives the later one a `-2` suffix in input order.)
#todo/project/priority/High
- (Google sign-in in an installed iOS PWA: tracked under Phase F follow-ups at the top.)
- (Neon restore and failing-migration rehearsals: tracked under Phase F follow-ups at the top.)
#todo/project/priority/Low
- [ ] Confirm on provider pages: Cloud Run quota and pricing, Neon free-tier numbers and restore window, Better Auth advisories (GitHub Security tab), current Express 5, Kysely and Better Auth versions.
- [ ] Turn on Neon **branch protection** for `production`, if the Free plan allows it, so it cannot be deleted by hand in the console. Checked 2026-10-08: `production` is the default branch with no expiry (only `dev` and `spike-s0` expire, on 2026-10-14, from the 7-day rule in `neon.ts`) but shows `protected: false`. Plan availability is not verified: look for the toggle in the Neon console (branch settings) and, if it is paid-only, note that and rely on the nightly backups instead ([[deploy-runbook|deploy-runbook]] section 7).

### Multi-user readiness (if the app is opened to other people)

The app began as a single-user gym app. These are the gaps that only matter once other people use it. Do them with step 3 unless noted.

- [x] Auto-progression suggestions ("you hit 3×8, try +5 lb"): `progressionOf`/`targetOf` suggest "up from N lb" after two full sessions, and a stalled lift gets a back-off (#76). Left: show it more prominently if wanted.
- [x] Account screen: profile, sign out, last-synced time and a visible offline/sync status. (B2e: Settings → Account and Sync; PR #118.)
- [x] Privacy policy and terms, with a clear data-deletion path (see step 4). Needed before launch because of Google login and body-weight data. (2026-10-08, PR in review: `public/privacy.html` and `terms.html` drafted against GDPR/UK GDPR, CCPA and other US state laws and Washington's health-data law; Settings → Delete my data erases everything or deletes the account for good, backups age out in 30 days. **Still recommended before opening signup to the public: a lawyer's review, and a decision on the governing-law clause, which was left out on purpose.**)
- [x] Check that no personal defaults leak into a new account's starting state: audited 2026-10-08 and mostly fixed. The remaining work (ADR 016 steps 2 and 4) is tracked in the "Personal defaults" item under Phase F follow-ups at the top.
- [x] Conflict handling when one account is used on two devices (ADR 003, Phase D): versioned rows, stale edits refused and re-merged, a tick beats a skip (`src/sync/merge.ts`), the replaced version kept in `row_history`. Anything else in a conflict is "this device wins" by design. Left: a real two-phone test, if wanted.
#todo/project/priority/Low
- [ ] Starter programs for new users (PPL, upper/lower, full body, 5x5) and a "build my own" flow, with a choice of days per week. The board currently assumes a fixed 7-day layout.
- [ ] Move the first-run guide (item 58) into this step instead of after the backend.
- [ ] Explain jargon in the app (phase, superset, "Same as last", 1RM) with one-line tooltips or a glossary.
- [ ] In-app "report a problem" that attaches the app version and sync state (alongside the feedback form link at the bottom).
- [ ] Week-start choice (Sunday or Monday) and locale date formats. lb/kg (62) becomes required, not optional.
- [ ] Screen-reader testing of the log flow with real devices.
- [ ] Opt-in, privacy-respecting analytics and crash reporting, so problems new users hit are visible.
- [ ] Test the install prompt and update banner with people unfamiliar with the app.
- [ ] Exercise catalog (revisit; idea saved 2026-10-08, see [[exercise-catalog-idea]]): keep private custom exercises, add a read-only global catalog imported from a free dataset (check licenses), and maybe a suggest-and-approve step later. Needs stable exercise ids first (ids are name slugs today), and an ADR before building.
- [ ] Optional, only for growth: share or import a program by link or file; coach or training-partner view. Skip public profiles and leaderboards until the basics work.

## 4. Remove the stand-in features (only once the backend is working)

- [x] Turn "Erase data" into "delete my account data": Settings → Delete my data (PR #124). The old local "Erase data" panel is still in Settings for local mode.
#todo/project/priority/Low
- [ ] Remove GitHub backup and restore (#18).
- [ ] Remove JSON import.
- [ ] Stop using localStorage as the main place data is saved.
- [ ] Update the README and the training skill with each removal so they stay in sync.

## 5. Advanced features and integrations (post-backend)

- [x] Weight goals feature (set targets and track progress).
- [x] supplement log (Supplements tab with schedule and water log, #61, #79)
- [x] Plateau/deload hint: `stallOf` judges each lift per week and `backoffOf` suggests a back-off (#76).
#todo/project/priority/Low
- [ ] Google Fit API integration to pull activity and weight data.
- [ ] Import medical records and add AI assessment of medical information. Decide whether to build this at all before multi-user launch: it brings health-data regulation, disclaimers and the highest risk of the list.
- [ ] **Social feed, privacy-light (idea saved 2026-10-08).** Let people follow friends and see short activity posts: "Sam trained 14 times this month", "Alex hit a new best on Hack Squat". It is less invasive than most fitness social features because it only says *that* someone lifted and how they did, never *where*: no gym, location, map, route or check-in, ever. Design notes so the idea is not lost:
  - **Opt-in and private by default.** Nothing is shared until a person turns it on, and they choose who sees it. Sharing is a grant a person can revoke at any time, as ADR 004 already planned for sharing ([[004-auth-better-auth]]: a user-owned `share_grants(owner_id, viewer_id, scope)` row, one `canRead(viewer, row)` check, and a matching row-level-security read policy). No public profiles or leaderboards, in line with the "skip them" note under multi-user readiness.
  - **Milestones and totals, not raw logs.** Posts are generated by the app from a person's own data (sessions this month, a new best on an exercise, a streak), so a friend sees the headline and not every set. **Body weight, notes and photos are never in a post.** Treat it as health-adjacent: it is not used for advertising or ranking people.
  - **No location, by construction.** The app does not collect it, so a post cannot leak it; keep it that way (no gym names, no timestamps finer than the day, nothing from the device).
  - **Before building it:** (1) update the privacy policy and terms: today they say data goes only to the service providers, so sharing with other users is a new purpose and needs the person's explicit consent (GDPR Art. 9 for health-related data); (2) add the safety basics: block, mute, report, and the ability to leave without a trace; (3) make delete-my-data and account deletion also remove a person's posts and grants everywhere, including from other people's feeds; (4) it is 16 and over only, as the terms already say; (5) decide whether it needs a moderation and abuse plan before more than a handful of friends use it; (6) check what the rate limits and the free-tier database can carry once feeds exist.
  - **Cheapest first test:** a read-only "training partner" view for one person you invite, showing only the monthly session count and new bests, before any feed exists.
- [ ] Warn when you skip an exercise too many times that's on your program.
- [ ] Improve weight entry UX: catch and prevent common mistakes (e.g., wrong weight entered for an exercise). Partly done: range limits and messages for sets, body weight and 1RM are central in `validate.ts` (#77). Left: flag a weight that is far from the last session for that exercise.

## 6. UX improvements and fixes

- [x] Keep the tab and the phone day picker across a page refresh (per browser tab; a fresh open starts clean).
- [x] Always open on the current week, and an app left open past the end of the week moves on to the new one.

## 7. Optional UI improvements (not decided yet)

From a review of the current screens. None of these are committed to: pick what you want, and move it into the numbered steps above. The numbers match the list from that review so they can be referred to. Where each one goes relative to the backend (step 3):

#todo/project/priority/Low
- [ ] Midnight behavior for check-offs (idea, not decided): a check-off belongs to the current day. If at least one item was ticked before midnight, flag the rest at midnight or move them to the next day where they can be skipped or kept, so exercises don't span multiple days. Today nothing is restricted. See ADR 011.

- **Before the backend** if it changes what gets stored.
- **Any time** if it is only how things look. These don't touch saving, so they can go before or after.
- **After the backend** if it depends on the backend, or gets reshuffled by step 4.

### Before the backend (changes what is stored)

- [x] 55. Exercise library page: every exercise with its equipment, video link, default phase, 1RM and muscle tags, edited in one place. On the Program tab. Per-exercise settings stay in `cfg.ex`, `cfg.exPh`, `cfg.rm` and `cfg.muscleMap`.
- [x] 33. Undo after unchecking something you logged: the board shows how many entries were removed with an Undo that puts back the entries and the tick.
#todo/project/priority/High
- [ ] 62. lb/kg unit toggle. Canonical unit settled: pounds, stored as `numeric` 4 dp (ADR 006); the toggle is display and input only, and progression steps become unit-aware. Types do not enforce units (all are plain `number`), so list every `lb`/`Lb` place (limits in `validate.ts`, labels, exports, plate calculator) before starting; a branded `Lb`/`Kg` type is optional.
#todo/project/priority/Low
- [ ] 38. A tick per set in the Log sheet (and start the rest timer between sets). Changes the shape of a logged entry. Safer now: add the field to `LogSet` in `types.ts` and `tsc` lists every reader and writer; also update `normSet` in `validate.ts` and the Excel/CSV sheets.
- [ ] 61. Per-exercise notes ("seat at 4, elbows tucked"), shown in the Log sheet. Adds a field to each exercise's stored settings.

### Any time: phone and board layout (most useful first)

#todo/project/priority/Low
- [ ] 1. Show the first exercise sooner on phones: less above the day tabs.
- [ ] 2. Slim down the top of each day column (rest day, add buttons, swap arrows, warm-up).
- [ ] 3. Stop the Rest timer button covering cards and the add buttons.
- [ ] 4. Mark today: highlight today's column on desktop, open on today's tab on phones.
- [ ] 60. "Gym mode" on phones: only today's exercises, big checkboxes and the timer.
- [ ] 25. Fit all 7 days on desktop (narrower columns or a compact density) with clear scrolling.

### Any time: header, week bar and notices

#todo/project/priority/Low
- [ ] 6. Remove the repeated program/mode between the header pills and the week bar.
- [ ] 7. Move the mode dropdown into Settings.
- [ ] 8. Put "Set by month" next to the A/B toggle it explains.
- [ ] 9. Fold overall progress into the week title on phones ("Sep 20 – 26 · 17/62").
- [ ] 10. Shrink the "This week" button.
- [ ] 11. Smaller leftovers notice: a one-line strip that opens the choices.
- [ ] 12. Show the move heads-up near the moved card, or as a short message at the bottom, instead of pushing the board down.

### Any time: body weight row and sort/filter

#todo/project/priority/Low
- [ ] 13. Make the body weight row compact on desktop.
- [ ] 14. Once logged, show it as one line ("195 lb · −2 · Goal: 15 to go").
- [ ] 15. Fix the body weight input showing "lb" twice.
- [ ] 16. One "Sort & filter" button instead of two large dropdowns.
- [ ] 17. Show active sort/filter as removable chips.
- [ ] 18. Quick search to jump to an exercise by name.

### Any time: day columns and cards

#todo/project/priority/Low
- [ ] 19. Group the column controls (rest day, swap, only this week) into a "⋯" menu.
- [ ] 20. Move "+ Add exercise" to the bottom of the column.
- [ ] 21. Bigger or menu-based swap arrows.
- [ ] 22. Collapse the warm-up once it's done.
- [ ] 23. Collapse finished days into a summary.
- [ ] 69. Session summary after finishing a day (total volume, PRs, time). Item 23 collapses finished days but doesn't summarize them.
- [ ] 24. Explain an empty day ("Nothing planned · + Add exercise") instead of 0/0.
- [ ] 26. Let section headings (Regular, Supersets, Home) collapse.
- [ ] 27. Make Details a small icon next to the name.
- [ ] 28. Keep exercise names on one line where possible.
- [ ] 29. Make phase easier to see without relying on color (letter or icon).
- [ ] 30. Put target weight, sets × reps and last time on one line.
- [ ] 31. Shrink finished cards to the name and a tick.
- [ ] 32. Show the tag line ("Primary · Superset") only when it matters, or as a colored card edge.
- [ ] 40. Rename "Same as last" on the card to show what it logs ("Repeat 320×6").
- [ ] 56. One button style for the two add buttons.

### Any time: Log sheet and timer

#todo/project/priority/Low
- [ ] 34. Put rarely used fields (1RM, video link, equipment, default-phase boxes) under "More options".
- [ ] 35. Date as a small "Today ▾" chip.
- [ ] 36. Keep Save and Cancel pinned to the bottom of the sheet.
- [ ] 37. Fix the "up from 320 lb" note floating to the right of the target.
- [ ] 39. +/− 5 lb and +/− 1 rep buttons.
- [ ] 41. Dock or shrink the Rest timer button, and move it up when a sheet opens.
- [ ] 42. Show the running time on the Rest timer button.
- [ ] 63. Plate calculator: show plates per side ("45 + 25 + 5") next to the target weight, and flag weights that can't be loaded (helps catch wrong-weight entries, see step 5).
- [ ] 64. Warm-up set generator: suggest ramp-up sets (e.g. 50/70/85%) from the target weight or 1RM.
- [ ] 65. Show estimated 1RM live in the Log sheet from weight × reps, so a PR is visible before saving.
- [ ] 66. Settings toggle for timer vibration (it is always on now).

### Any time: Progress, Muscles and Program tabs

#todo/project/priority/Low
- [ ] 43. Fill the empty gap in the Progress layout.
- [ ] 44. Move body weight and the goal up next to the other numbers.
- [ ] 45. Draw the weight goal as a dashed target line on the chart.
- [ ] 46. Add a phase legend to "Weight change by exercise".
- [ ] 47. Hide the "Sets, last 4 weeks" explanation until it's useful.
- [ ] 48. Tap an exercise in the weight change list to open its history.
- [ ] 49. Muscles: a "this week vs planned" toggle.
- [ ] 50. Muscles: mark low or untrained muscles on the body diagram itself.
- [ ] 51. Program: drag cards to reorder.
- [ ] 52. Program: a whole-week overview next to the one-day editor.
- [ ] 53. Program: show which program is being edited and which is on the board.
- [ ] 67. Charts: a "view as table" toggle and a text summary for each chart, for screen readers (WCAG AAA).

### Any time: across the app

#todo/project/priority/High
- [ ] 71. React error boundary with a "Something went wrong, export your data" fallback, so a render error isn't a white screen.
#todo/project/priority/Low
- [ ] 57. Messages: short notices at the bottom of the screen, with Undo where it applies, instead of the easy-to-miss line under the header.
- [ ] 59. Recheck dark mode and contrast for the newer pieces (Mobility purple, equipment labels, goal bar).
- [ ] 68. PR celebration: a badge or toast on save when a set beats the best weight or estimated 1RM.
- [ ] 70. Helpful empty states on Progress, Muscles and Trends instead of blank charts.
- [ ] 72. Code-split the heavy tabs (Progress, Muscles, Settings). The xlsx library is already lazy (`loadXLSX`, its own 160 kB gzip chunk). The main bundle is about 158 kB gzip and the app is cached offline, so the gain is small; low priority.
- [ ] 73. Keyboard shortcuts on desktop (e.g. L to log, T for the timer) with a list in Settings.
- [ ] 74. Printable week view, or share a session summary with `navigator.share`.

### After the backend

#todo/project/priority/Low
- [ ] 54. Regroup Settings into Training, Data and App. Do this after step 4, because the Data section changes when GitHub backup and JSON import are removed. If the app goes multi-user, do it before launch, since an Account section will crowd Settings.
- [ ] 58. First-run guide (pick a program, log a set, check a day). Do this once sign-in exists, so it can include signing in and syncing. If the app goes multi-user, it moves into the "Multi-user readiness" list under step 3.
- [ ] Feature to add excercise to experiment and remove from program

## Anytime

#todo/project/priority/Low
- [ ] Add a link to a Google feedback form in Settings.

### TypeScript migration (leftovers; the main work is done, see [[typescript-migration]])

#todo/project/priority/Low
- [ ] Convert `App.jsx` and `main.jsx` to TypeScript, and change `index.html` to `/src/main.tsx` in the same PR. Gives a fully TypeScript source tree (apart from `fonts.js`, the tests and tooling).
- [ ] Convert the remaining presentational components when next edited: `Daily`, `Medical`, `LineChart`, `Muscles`, `TimerBar`, `UpdateBanner`.
- [ ] Try TypeScript lint rules to stop new `any` (`oxlint-tsgolint`): costs one dev dependency and some CI time; worth it now that component `any` is down to 2.
- [ ] Tighten `any` in `lib/` and the store only when a function is edited anyway (38 in `lib/`, 37 in the store). Most are untrusted-input cleaners and the host's db/mcp handles, which should stay loose. `normWeek(w?: any)` could take a `RawWeek` type.
- [ ] `SlotSheet`'s clone of a program slot is the last component `any`.
- Decided against: converting tests, e2e, configs and scripts; `noUncheckedIndexedAccess` (321 new errors, little gain).

## 1. Fix imports and pick one file format (before the backend)

- [x] Excel import bug: no failing file turned up (the re-saved-dates bug was already fixed in #16). The real gap was that workbooks only brought back part of the data; see the next item.
- [x] Make Excel (.xlsx) the one format for both export and import. Programs, saved versions, check-offs, config, sessions and body weight each have a sheet, and an exported workbook imports back the same as the JSON file.
  - Still to do: remove the old partial-import path for workbooks made before this change, once nobody has those.
- [x] Accept CSV as an import fallback only (sessions only).
- [x] Keep JSON import until the backend exists, because it is the only full-detail backup for now. It gets removed in step 4.

## 2. Board and exercise changes (before the backend)

These change how days and exercises are stored. Do them together so the data structure is settled before it goes into a database.

- [x] Add a Day 7 to the board. It starts empty, and exercises can be added whenever.
- [x] Add a Rest day checkbox to each day. Ticking it inserts a rest day there and moves the later workouts one day later (blocked while Day 7 has exercises). A rest day counts as a complete day, and its exercises aren't in it, so volume numbers aren't inflated.
- [x] Add an exercise to the current day from the board.
- [x] Add stretches to the board, as a card type that doesn't need weight or reps.
- [x] Add an optional video link to each exercise.
- [x] Specify equipment for each exercise (dumbbell, bar, machine, bodyweight, etc.).
- [x] Add a Filter to sort exercises on the board by muscle group.
- [x] Set a default phase for an exercise that applies to all future instances of that exercise.
- [x] Add spinal waves as a bodyweight mobility exercise.

## Done

- [x] Convert to React, meet WCAG 2.2 AAA, make it an installable offline PWA (#14)

## Review notes (2026-10-06)

Checked the feature, bug and architecture items against the code after the TypeScript migration (#80, #81, #82). The pure layout items (1-74) were not re-checked one by one, so a few of those may also be built already.

- **Reduced by TypeScript:** backend language/shape work (shared types and validation, smaller upload step), per-set ticks (#38) and the unit toggle (#62) as refactors (the compiler lists what to change), and stale `.js` paths in the notes.
- **Not reduced (types do not fix behavior or design):** every bug in the Bugs list, all layout and UX items (1-74 except the ones noted), Google login and sync, multi-user items, the stand-in removals in step 4, and error handling (#71 error boundary does not exist yet).
- **Marked done (they were built but never ticked):** plateau/deload hint, auto-progression suggestions, supplement log.
- **Spot-checked as not built:** feedback-form link, error boundary (#71), gym mode (#60), mark today (#4), first-run guide (#58), lb/kg (#62), skip-too-often warning, per-set ticks (#38).
## Review notes (2026-10-09)

Checked the backend, multi-user and personal-defaults items against the code and the feature map. **Ticked (built, never ticked):** Google login, offline-first queue, one-time upload, delete my data, two-device conflict handling. **Rewritten:** the personal-defaults item (ADR 016 steps 1 and 3 and stretches are built, steps 2 and 4 remain). **Collapsed duplicates:** iPhone sign-in test, Neon restore rehearsal, tombstone purge window, personal defaults. **Re-confirmed open in the code:** `normEntries` does not sort (`bestLift` date bug), `csvCell` has no formula guard, no `ErrorBoundary` (#71). The Bugs list and items 1-74 were not re-checked one by one.

## Review notes (2026-10-06, continued)

- **Worth doing early because they are small and unblock other work:** sort in `normEntries` (fixes the `bestLift` date), the rest-timer 0 decision, and the personal-defaults list before any multi-user work.
