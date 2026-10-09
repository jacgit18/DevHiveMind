# Iron Log backend build spec

Drafted 2026-10-06 for `spec-drift-gate`. The decisions are in the ADRs (`architecture/decisions/001` to `015`) and [[iron-log/docs/architecture/stack-walkthrough|stack-walkthrough]]; this file links to them and does not repeat them. Table design: [[iron-log/docs/data-model/iron-log]]. Code sketches (not run): [[code-samples]].

## 1. Problem

Iron Log is a single-device PWA that keeps data on the phone. It is going multi-user, so each person's workouts must be tied to an account, sync through our own API (Cloud Run, Neon Postgres), and keep working offline for about 2 days. Top priority: no lost workout over a rare duplicate. Second goal: learn production backend skills on free tiers.

## 2. Tradeoffs weighed

Each choice has alternatives and the reason they lost in its ADR: backend shape (001), datastore (002), sync (003), auth (004), language (005), weight unit (006), framework (007), API style (008), data access (009), hosting (010), date and week (011), migrations (012), error reporting (013), backend tests (014), shared layout (015).

## 3. Scope

**In scope (backend v1):**
- The API in `server/`, serving the built PWA from one origin (ADR 010).
- Google login through Better Auth (ADR 004).
- The tables in [[iron-log/docs/data-model/iron-log]], created by dbmate migrations (ADR 012).
- The command endpoints and the pull endpoint (ADR 008), with the commands drawn from [[backend-data-rules]].
- The phone's sync client: persisted queue, replay, quarantine of refused writes (ADR 003).
- `import-legacy` (decision 10 note), logging and the client-error endpoint (ADR 013), tests (ADR 014).
- Moving framework-free code into `src/shared/` one file per commit (ADR 015).

**Out of scope (deferred):** email and password login; share grants and per-viewer read policies; the multi-device change-feed pull beyond the basic pull; a sync engine or CRDTs; a custom domain; the week-start setting; the midnight-ticking behavior; analytics; medical-record import; OpenAPI or a generated client; workspaces (planned next step if needed); error-tracking vendors; the tombstone purge and refused-writes retention values until real data exists.

**Existing behavior that must not change** (`CLAUDE.md`): no exercise may be lost or duplicated in the board reorder and log write paths (`planFix`, `mutateChecks`, `autoLogs`, `addEntry`). One change per commit; no behavior change inside a refactor.

## 4. Controlled-experiment slice (first, cheap to discard)

**Slice S0, the iOS sign-in spike.** The riskiest assumption in the whole stack is that Google sign-in works inside an *installed* iOS PWA served from the same origin as the API (ADR 004, 010). Build the thinnest thing that tests it: a throwaway Express app serving the built PWA and a Better Auth Google login, deployed to Cloud Run on a scratch Neon branch, with one `/api/me` route. Pass or fail on a real iPhone; record the result in ADR 004 and 010; discard the code (a throwaway branch, not merged).

**Pass:** sign in succeeds from the installed PWA, the session survives closing and reopening the app, and `/api/me` returns the user.
**Fail:** try another flow (popup versus redirect; Google's ID-token flow) before reopening the same-origin choice or ADR 004.

User-side prerequisites: a Google Cloud project with a billing account (card; ADR 010 guards), an OAuth client with the Cloud Run URL as the redirect, a Neon project (a scratch branch), and an iPhone.

## 5. Reconciliation invariant

After any flush and pull, the phone's rows equal the server's rows for that user (same ids, same versions, tombstones included), and there is at most one check-off per card and week. This is the test for the first command slice (`log-session`).

## 6. Slice order

S0 sign-in spike, then S1 foundations (`src/shared/` first files, `server/` skeleton, first migration, the real auth tables), then S2 `log-session` end to end with tests and the invariant, then the other commands, the pull endpoint, the phone queue, `import-legacy`, and hosting hardening. Each slice gets its own precision brief when it starts.

### 6a. Phases and increments (drafted 2026-10-07)

Goal that sets the order: **a running backend, connected to Postgres, with real data saved to it, as early as possible.** Each increment is one commit (or one small PR) and ends with the repo checks green (`npm run typecheck && npm test && npm run lint && npm run build`). Each increment has a "done when" that can be seen working. Each phase still gets its own precision brief when it starts.

**Phase A: first saved row (walking skeleton).** Auth is a dev-only stub so this does not wait on S0.
- A1 `server/` skeleton: own `tsconfig`, Express 5, `GET /api/health`; `npm run typecheck` covers both configs; a check that `server/` never imports components or the store (ADR 015). *Done when:* `curl /api/health` returns ok.
- A2 Local Postgres (Docker) and dbmate. Migration 001: `users`, `log_entries` (standard columns, CHECKs, partial unique index for one check-off per card and week), `row_history` plus its trigger, `refused_writes`. Generate Kysely types (ADR 009, 012). *Done when:* migrate up and down run, and `psql` shows the tables.
- A3 Database connection from the API (Kysely, `DATABASE_URL`), and `GET /api/health/db` doing `SELECT 1`. Point it at a scratch Neon branch as well as local. *Done when:* both return ok; note the Neon wake delay after idle. **Must handle:** the `pg` driver returns SQL `date` columns (`d`, `wk`) as JS `Date` objects in the local timezone, which can shift a day (ADR 011 stores plain `YYYY-MM-DD` strings); register a type parser so dates stay strings and test it with the process timezone set to a non-UTC zone. `bigint` ids and `numeric` weights also arrive as strings (ADR 006).
- A4 First shared files, one per commit, no behavior change: the entry validator (`normEntry` from `validate.ts`), the week function from `dates.ts` (rename `monday()` to `weekStartOf`, ADR 011), then the `log-session` input type in the command contract (ADR 015, 008). *Done when:* the client tests stay green and `server/` imports them.
- A5 Dev-only auth stub: a fixed dev user chosen by a header, refused unless `NODE_ENV` is development or test; the per-request transaction runs `SET LOCAL app.user_id`. *Done when:* a request without the header gets 401.
- A6 **`log-session` command** (`POST /api/commands/log-session`): validate, insert in one transaction, bump `users.change_seq`, set `seq`, `version`, `updated_at`; idempotent by client id; 409 stale, 422 invalid (written to `refused_writes`). Tests against a real Postgres container (ADR 014): create, retry returns the same row, invalid refused, stale refused. *Done when:* a posted workout is a row in the database.
- A7 `GET /api/sync?since=` returns changed rows plus the cursor; the §5 reconciliation test for this one command. *Done when:* post a session, restart the server, read it back through sync.

**Phase B: real sign-in.** S0 can run any time in parallel with Phase A; it needs your Google Cloud project, Neon branch and iPhone.
- B1 S0 spike (§4), result recorded in ADR 004 and 010; code discarded.
- (Precision brief for B2: [[phase-b-brief]], drafted 2026-10-08, decisions open.)
- B2 Better Auth in an `auth` schema, Google login, a `users` row created on first sign-in (`auth_user_id`), session to `user_id` replaces the stub; RLS turned on for the tables that exist. Needs the Neon pooled-connection `SET LOCAL` test (data model note). *Done when:* sign in as yourself on the phone, and `log-session` saves under your own user. **Accounts (confirmed 2026-10-07):** your Google account is the owner and the admin (`users.is_admin`, ADR 004; no second admin login). Set the flag once by hand in SQL against your own `auth_user_id`, never from a request. The test user signs in with its own Gmail account and is a normal, non-admin user.

**Phase C: remaining commands.** One increment each, each with its test and the §5 invariant: `tick-card` and `untick-card` (the one-check-off rule, a hand-logged session replaces a check-off), `delete-entry` (tombstone, edit-meets-delete FM-05), body weight (`log-body-weight`, `delete-body-weight`, with `body_entries` in migration 002), then the document tables (`config`, `programs`, `weeks`, `stretch_weeks`, `supplement_days`, `library_items`, `list_items`) in migration 003. The full pull and paging come at the end. Status 2026-10-07: **Phase C is built.** Merged: C1 (PR #94), `tick-card` and `untick-card` (PR #95), `delete-entry` (PR #96), body weight with migration 002 (PR #97), weeks and stretch weeks with migration 003 (PR #98), supplement days with migration 004 (PR #99), programs and config with migration 005 (PR #100), library items with migration 006 (PR #101), list items with migration 007 (PR #102), and the `seed-test-user` script (PR #103). The full pull is `GET /api/sync?since=0`: the same feed, paged by `seq` without splitting a command, now covering every table; nothing separate was built. Still open from Phase C: the cross-table wiring (ticking a card also updating `weeks.done`), left for Phase D to show whether it is needed.

**Phase C, seeding the test user.** After the document tables exist: a `seed-test-user` script (run by hand, not an API route) that creates the test account's blank profile and copies in **all libraries and experiments** from your account: `library_items`, and the `list_items` lists `stretch`, `stretch_experiment` and `experiment`. It does **not** copy programs, log entries, weeks, body weights, config, supplements or backup settings, so the test user starts with no program. The built-in exercise catalog is app code and needs no copying. Re-running it must not duplicate rows (by client id). Open: whether the `supplement_item` list counts as a library (default: no).

**Phase D: the phone talks to the API.** Persisted queue, replay with a retry cap, quarantine into the "not saved" list, pull then merge rules, the client-version gate, the account and sync-status screen. Put it behind a flag ([[feature-flags]]) so the app keeps working on localStorage until it is trusted. Needs Phase B and enough of Phase C. Precision brief: [[phase-d-brief]] (drafted 2026-10-07, five decisions open). Status 2026-10-08: **Phase D is built** (D1 to D7, PRs #106 to #113, plus the server fix #108), behind the flag and off by default; what is left before it can be turned on for real is Phase B (sign-in).

**Phase E: `import-legacy`.** Status 2026-10-08: **built** (branch `e-import-legacy`): the collision count is done (0 in your 2026-10-07 export, 1 in the old `iron-log-data.json`, handled by a `-2` suffix); the server command runs the phone's creates through the existing handlers in one transaction for an empty account only; the phone plans them from its old documents (`src/sync/legacy.ts`) and offers the upload in a card. Original brief: Prerequisite: count `k`+hash id collisions in a real export. One command, empty account only. Your 2026-10-07 export has 53 entries, 43 with no id (ids are derived), 19 check-offs, and `config.ghBackup`, which may hold a GitHub token and must not be imported. It needs every Phase C table: only `logs` fits migration 001.

**Phase F: deploy and harden.** Dockerfile, Cloud Run with a budget alert, production Neon, CI (migrations, committed types in sync), rate limits, client-error endpoint and logs (ADR 013), backups and a restore rehearsal, a failing-migration rehearsal on a Neon branch, retention and purge values, privacy policy and delete-my-data. The stand-in features (GitHub backup, JSON import, localStorage as primary) go only after this phase passes (backlog §4). **Status 2026-10-08: closed.** Live on Cloud Run (revision `iron-log-00005-wvl`), deployed from GitHub by CI with a smoke test and automatic rollback; rate limits, backups (nightly, private bucket), email alerts, delete-my-data, privacy policy and terms, and a landing page are in. **Not done, carried to [[Vault Backlog]] ("Phase F follow-ups"):** the installed-iPhone sign-in test, a Neon restore rehearsal, the failing-migration rehearsal, and the retention and purge values.

**Order and dependencies:** A1 to A7 in order. B1 is independent of A. B2 needs A7 and B1. C needs A7 (and B2 before it ships). D needs B2 and the first Phase C commands. E needs the collision count and the final tables. F's deploy pieces can start once A7 passes. The riskiest unknowns are first: the database round trip (A3 to A7) and iOS sign-in (B1).

## 7. Tripwires (stop and ask, do not default)

- A change to a key, a unique index or a column that other tables build on.
- Anything touching retention, logging of personal data, or what leaves the server.
- A term the rules don't define (for example what counts as one "session").
- Any step that would spend money or exceed the free tiers.
- A result in S0 that contradicts ADR 004 or 010.

## 8. Drift log

- 2026-10-07, confirmed by the user: (1) §6 said S0 first, then S1 and S2. The new §6a lets Phase A start before S0 passes, using a dev-only auth stub, because the top goal is a saved row in a connected database soon. Before: S0 gate before any backend code. After: S0 runs in parallel; the Better Auth tables wait for it. (2) Data model said 12 tables in the first migration. After: migration 001 is `users`, `log_entries`, `row_history`, `refused_writes` only; the other tables follow in Phase C. Reason: the smallest schema that `log-session` needs.
- 2026-10-07, confirmed by the user: accounts. Owner = admin (flag on your own account, ADR 004 unchanged); the test user is a separate Gmail account, blank except for all libraries and experiments. Added to B2 and a new Phase C seeding step. No change to ADR 004.
- 2026-10-07, confirmed by the user: what one "session" is. One `log-session` command carries one log entry: one exercise on one day, with its sets (`LogSessionInput = { exerciseId, entry }` in `src/shared/commands.ts`). Before: the docs never defined "session" (a section 7 tripwire). Not chosen: one command per whole workout (a day's list of entries), because the client has no workout object and the queue and refused-writes rows would need a batch shape. A6 and A7 build on this.
- 2026-10-07, confirmed by the user: body weight before the document tables. Before: body weight, then all the document tables in a second migration. After: migration 002 is `body_entries` only (the week is the key; a deleted week is revived by logging it again), and the document tables are migration 003. Reason: body weight needed its table before the rest of the document tables are designed. The sync pull now covers `body_entries` as well as `log_entries`.
- 2026-10-07, confirmed by the user: migration numbering. Before: body weight, then all the document tables in one second migration. After: one migration per increment (002 body entries, 003 weeks and stretch weeks, 004 supplement days, 005 programs and config, 006 library items, 007 list items). Reason: each increment is one PR with its own up/down check.
- 2026-10-07, confirmed by the user: `list_items` gets a `position` column (0 to 9999). Before: the data model had no order column, but stretches, experiments and supplements are arrays whose order is the order shown. After: the phone sends each item's position with its save; moving an item is a save of each item whose position changed. Not chosen: one command that replaces a whole list (simpler for the phone, weaker conflict handling).
- 2026-10-07: `library_items` stores the whole saved version in one `data` jsonb document instead of the separate name, from, saved_at, auto, created and prog columns the data model listed. Reason: it is read and written whole and never queried inside, and older versions can have an empty `at`, which `saved_at NOT NULL` could not hold.
- 2026-10-07: the config document the server stores leaves out `backup` and `ghBackup` (the GitHub backup settings, which belong to the stand-in backup features and may hold a token) and any unknown key; `waterGoal` and `waterMode` live in it. Before: the data model said config includes the backup settings.
- 2026-10-07: no `delete-config`; erasing settings is `save-config` with an empty config. Deleting a program (`delete-program`) puts it back to the built-in one.
- 2026-10-07, confirmed by the user: build on the assumption that Google sign-in works in an installed iPhone PWA, and verify it at the first real deploy instead of in a separate spike. Before: B1 (the S0 iPhone spike) had to pass before B2 and anything after it. After: B1 is not a gate; the first deployed build with real sign-in is the test. If it fails, only the sign-in layer is redone (ADR 004 and the same-origin choice in ADR 010 are revisited); the sync queue, commands, tables and image are unaffected. Condition: sign-in stays behind one seam (`res.locals.userId`, as the dev stub does now), so it can be swapped.
