# Iron Log backend stack: walkthrough log and closeout

Run 2026-10-06 with `/tech-decision-walkthrough`. One ADR per decision except decision 10 (routine, a note below). Cost cap: free tiers only.

## Summary

| # | Decision | Choice | ADR | Depth |
|---|---|---|---|---|
| 1 | Backend shape | Own API in Docker | 001 | load-bearing |
| 2 | Datastore | Neon Postgres, database-first migrations | 002 | load-bearing |
| 3 | Sync | Server-versioned rows, tombstones, stale edits refused, command per action | 003 | load-bearing |
| 4 | Auth | Better Auth in our API, Google login first, flat ownership, RLS backstop | 004 | load-bearing |
| 5 | Language | TypeScript `strict` on Node | 005 | structural |
| 6 | Web framework | Express 5, thin routes | 007 | structural |
| 7 | API style | Command endpoints over JSON HTTP, one pull endpoint | 008 | structural |
| 8 | Data access | Kysely, raw `sql` escape hatch, generated types | 009 | structural |
| 9 | Hosting | Google Cloud Run, Express serves the PWA (one origin); Render free fallback | 010 | structural |
| 10 | One-time upload | A single `import-legacy` command (note below) | none | routine |
| 11 | Weight unit | Canonical pounds, `numeric` 4 dp | 006 | load-bearing |
| 12 | Date and week policy | Local calendar dates as data, Sunday-start week, server validates | 011 | load-bearing |
| 13 | Migration tool | dbmate, plain SQL files | 012 | structural |
| 14 | Error reporting and logging | Cloud Run logging plus our own client-error endpoint | 013 | structural |
| 15 | Backend test tooling | Vitest plus real Postgres in a throwaway container | 014 | structural |
| 16 | Shared code layout | One package, `src/shared/` plus `server/` | 015 | structural |

Table design: [[iron-log]]. Code sketches: [[code-samples]].

## Decision 10 (routine): one-time upload of phone data

- **One `import-legacy` command**, same envelope as the others (ADR 008), one transaction, **only on an empty account** (refused with a reason if the user already has rows). That blocks a second run or a second device (FM-11) from stamping real edits out of order.
- **Dedupe by client id only**, never by content match (FM-10, [[backend-data-rules]] section 7). Legacy `k`+hash ids load into `client_id` unchanged. Replays are safe because of `UNIQUE(user_id, client_id)`.
- **Collision risk to check before building:** two genuine identical sessions have identical values, so they hash to the **same** legacy id and the second would be dropped. Count collisions in the real export first; if any, give the later ones a deterministic suffix (for example `-2`) in input order.
- The phone keeps its export file until the server confirms the counts match; it marks local data synced only after that.
- Imported rows get version 1 and one `seq` per import; original date and week fields are kept as data, server time is only the stamp.

## Cross-cutting obligations (not ADRs, slot into the build)

- **Transport and cookies:** HTTPS (Cloud Run provides it, confirm); `Secure`, `HttpOnly`, `SameSite` cookies; no CORS needed (same origin).
- **Abuse control:** rate limits per user and per IP on commands and auth; request size limits.
- **Secrets and config:** no DB URL or key in repo, image or logs (FM-18); use Cloud Run environment or Secret Manager; scrub body weight from logs.
- **Backups:** confirm Neon's free restore window (FM-20); schedule a `pg_dump` export; **rehearse a restore** (FM-24).
- **CI:** typecheck, tests, lint, build, e2e (existing); add API tests against a real Postgres, a codegen-up-to-date check (ADR 009), dependency alerts and pinned versions.
- **Migrations:** pick the tool (open); test each on a Neon branch first (FM-21); never edit a run migration.
- **Error reporting and logs:** structured server logs, refused-writes table (retention open), one error-reporting tool with personal data scrubbed (FM-22).
- **Client version gate:** minimum-version header refused with a clear message (FM-03).
- **Jobs:** history pruning (FM-15), tombstone purge, refused-writes retention; a small scheduled job on Cloud Run or Cloud Scheduler (check its free quota).
- **Privacy:** privacy policy, terms, and a data-deletion path (Google login plus body-weight data).
- **Cloud spend guard:** `max-instances=1` and a budget alert (ADR 010).
- **Queue behavior:** long request timeout, a timeout never discards (FM-02).
- **Admin:** documented admin-account recovery step (ADR 004).
- **Clean-up from the backlog:** remove personal defaults from new accounts; remove GitHub backup but keep a manual export (FM-23).
- **Security checks:** confirm Better Auth advisories on its GitHub Security tab (ADR 004); every read through `canRead`, every route scoped by the token's user (FM-17).

## Spec amendments

Backlog step 3 items for all ten decisions are ticked and cross-linked. ADR 001 replaced the earlier Firebase lean. ADR 006 added the lb/kg storage rule. [[backend-data-rules]] section 7 carries the queue and import-id rules. No other upstream requirement changed.

## Missed-decision audit

Update 2026-10-06: the five ADR-worthy rows below (date and timezone, migration tool, error reporting, backend test tooling, shared code layout) were walked afterwards as decisions 12 to 16 (ADR 011 to 015).

| Topic | Recommendation | ADR-worthy? |
|---|---|---|
| Date and timezone policy (FM-12) | Fix one rule for deriving `wk` (client local date vs a stored user timezone), documented | Yes, short ADR |
| Migration tool | dbmate or similar plain-SQL runner, since ADR 002 is database-first | Yes, short ADR |
| Error reporting tool and logging | Pick one free tool, scrub PII | Yes, short ADR |
| Backend test tooling | Vitest plus a real Postgres (Neon branch or container); route via `database-test-tooling` | Yes, when building |
| Shared code layout | Workspace package or shared folder for contract, validators and units | Yes, short ADR (affects repo layout) |
| CI provider | GitHub Actions if already used | No, build detail |
| Container base image | Node LTS slim, multi-stage build | No, build detail |
| Config and secrets | Cloud Run env and Secret Manager (see obligations) | No, build detail |
| Domain name | Not needed on `run.app` for now; revisit with the privacy policy and OAuth callback | No |
| i18n, a11y | Only the lb/kg display toggle (ADR 006) | No |

## Cost-cap reconciliation

| ADR | Recurring cost at your scale |
|---|---|
| 001, 005, 007, 008, 009 | $0 (open source, no hosted service) |
| 002 Neon | $0 free plan (1 GB, 100 CU-hours; confirm at neon.com) |
| 004 Better Auth, Google login | $0 |
| 010 Cloud Run | $0 inside the free quota; **a card is on file** (small risk, capped by one instance and a budget alert) |

Nothing breaks the cap. **Paid alternatives, collected (all unverified prices):** Neon paid plan if 1 GB or CU-hours run out; Railway Hobby or Fly.io about $5/month, or Render, if the free host's cold start hurts; Supabase as the fallback backend (ADR 001); Turso if Neon's limits bite (ADR 002).

## Deferred list

Email/password login (ADR 004); share grants and per-viewer read policies; the change-feed pull until a second device is used (ADR 003); a sync engine or CRDTs; tombstone purge window and refused-writes retention values; OpenAPI or a generated client; Bun or Deno; analytics; medical-record import; a custom domain.

## Open spikes and checks

- Google sign-in inside an installed iOS PWA, on a real iPhone, early.
- Neon free-tier numbers and restore window; Cloud Run quota and pricing; Better Auth advisories; Express 5, Kysely and Better Auth current versions.
- Count legacy hash-id collisions in the real export.

## Hand off

Fold the ADRs and amendments into the build spec (`spec-drift-gate`), then pace the build (`incremental-build-pacing`). Suggested first slice: the iOS sign-in spike, then one command end to end (`log-session`) with its tests.
