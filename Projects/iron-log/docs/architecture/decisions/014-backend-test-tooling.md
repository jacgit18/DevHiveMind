# 014. Backend test tooling: real Postgres in a throwaway container

Status: accepted by the user, 2026-10-06
Depth class: structural

## Context

Several rules live only in Postgres: the partial unique index for one check-off per card and week, row-level security with `SET LOCAL`, `ON CONFLICT` for idempotent creates, `jsonb`, and the command transactions (ADR 002, 003, 004, 008, 009). Failure modes FM-04, 05, 06, 07, 09, 10, 11 and 12 need tests against that behavior. Vitest already runs the client tests (`CLAUDE.md`). Docker is already part of the plan (ADR 001). Neon's free plan has 100 CU-hours a month and cold starts (ADR 002). Free tools only; all candidates are free except that a Neon branch spends the cap.

## Decision

1. **Runner:** Vitest, as for the client.
2. **Database for tests:** a real Postgres started in a throwaway container per run (Testcontainers), with the dbmate migrations applied (ADR 012). The same setup works locally and in CI.
3. **Test shape:**
   - Pure unit tests for the shared rules module (merge rules, week function, unit conversion): no database, run for client and server.
   - Command integration tests against the container: each starts from a migrated, empty database and checks one command, including idempotent retry, stale write refused and the FM cases.
   - A few end-to-end tests (Playwright, already in the repo) against the built app and API, added later in the build.
4. **Neon branches** are used only to rehearse migrations before production (FM-21), not for the test suite.

## Alternatives considered

- **Postgres service in CI plus local `docker compose`.** Same fidelity, but two setups to keep in sync and manual cleanup between tests. Runner-up and the fallback if Testcontainers causes trouble.
- **A Neon branch per test run.** Exact production, but needs network and secrets in CI, cold starts and spends CU-hours. Lost on cost and speed.
- **In-memory or SQLite stand-in.** Does not run partial indexes, row-level security or `SET LOCAL` the same way, so it would pass tests the real database fails. Lost on fidelity.
- **Mocking the data-access layer.** Tests nothing about the SQL, where the cross-row rules live. Lost.

## Deciding axes

1. Fidelity to the real database. 2. Same setup locally and in CI. 3. Speed and cost within free limits. 4. Learning.

## Consequences

- Docker must be running to run the integration tests; they start a few seconds slower than an in-memory database.
- Testcontainers' current Node version and maintenance are not verified; check when adding it.
- Each integration test needs a clean database (fresh container or truncate between tests); decide at build time.
- No recurring cost, so no paid alternative to record.

## Revisit when

- Container startup makes the suite too slow (share one container per file and truncate), or Testcontainers causes recurring trouble (fall back to the CI service plus compose).

## Spec amendment

None. Closes the "backend test tooling" item in the backlog. Hands the FM-04, 05, 06, 07, 09, 10, 11 and 12 test charters to `test-strategy` and `test-case-discovery` at build time.
