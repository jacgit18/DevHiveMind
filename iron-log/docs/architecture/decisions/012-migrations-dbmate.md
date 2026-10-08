# 012. Migration tool: dbmate (plain SQL files)

Status: accepted by the user, 2026-10-06
Depth class: structural

## Context

ADR 002 made the ordered migration files in the repo the source of truth for the schema and left the tool open until the language was chosen. ADR 009 generates Kysely types from the live database after each migration, and ADR 005 and 007 fix Node and Express. The schema needs raw SQL for partial unique indexes, check constraints and row-level security (ADR 002, 004), and the user wants to learn SQL. A half-applied or destructive migration with no rollback is FM-21. Free tools only; all candidates are free and open source, so cost was cut.

## Decision

Use **dbmate**: plain `.sql` files, each with a `migrate:up` and `migrate:down` section, run against `DATABASE_URL`.

Conventions:
- Never edit a migration that has run; every change is a new file.
- Run migrations as a separate deploy step, not on app start.
- Test each migration on a Neon branch before production.
- After each migration, regenerate the Kysely types and fail CI if the committed types are out of date.
- Write a `down` section only where it is safe; for destructive changes rely on a backup and a restore rehearsal (FM-20, FM-21).

## Alternatives considered

- **node-pg-migrate.** Stays in the Node toolchain and supports SQL files, but its JavaScript builder invites avoiding SQL and it is one more dependency to pin.
- **Kysely's built-in migrator.** No extra dependency, but migrations are TypeScript code, not SQL files, which is harder to read and learn from and drifts toward the builder where raw SQL is needed.
- **Flyway or Atlas.** A JVM or a new model to learn; too heavy for one maintainer.

## Deciding axes

1. Plain SQL files. 2. Safe on live data (testable on a Neon branch, a record of what has run). 3. Fit with CI, the Docker build and Cloud Run. 4. Easy to switch later.

## Consequences

- A separate binary, not an npm package: CI and the Docker build must install it. Check the current version and maintenance status when adding it (not verified).
- Plain SQL files move to any other tool by changing the command, not rewriting migrations.
- Rollback on live data stays hard; the safety net is branch testing and a rehearsed restore.
- No recurring cost, so no paid alternative to record.

## Revisit when

- Maintenance of dbmate stalls, or CI and Docker installation becomes a recurring problem. First alternative: node-pg-migrate with SQL files.

## Spec amendment

None. Closes the "migration tool" open item in [[data-model/iron-log]] and ADR 002 decision 3.
