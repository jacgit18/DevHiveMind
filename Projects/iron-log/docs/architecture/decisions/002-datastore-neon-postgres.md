# 002. Datastore: Neon Postgres, database-first with migrations

Status: accepted, 2026-10-06
Depth class: load-bearing

## Context

ADR 001 chose our own API server. It needs a database that can enforce [[backend-data-rules]]: one row per entry, unique `(user, id)`, a partial unique index for check-offs, check constraints for the validation limits, soft delete (`deletedAt`), transactions for "a hand-logged session replaces the check-off", and stale-write rejection.

Facts (user's words, 2026-10-06): the only consumer is the Iron Log web app through our API; only the API touches the database; private for now (nothing exposed across a boundary); the shape is mostly stable, with additive data later from free exercise-library APIs. Free tiers only. Estimated about 1 MB per user per year (estimate, not measured).

Free-tier terms checked 2026-10-06 (from aggregator pages; confirm at neon.com): Neon Free is 1 GB per project (raised from 0.5 GB on 2026-10-01), 20 GB per account, 100 CU-hours per project per month, scales to zero after 5 minutes idle and wakes on the next connection. Supabase Free is 500 MB and pauses after 7 days without API requests.

## Decision

1. **Engine and host:** Postgres on Neon (free plan).
2. **Source of truth:** database-first. The ordered migration files in the repo are authoritative; the live schema is their result. Raw SQL is used inside migrations where a builder cannot express a rule (partial unique index, check constraints).
3. **Migration tool:** deferred until the language is chosen (Knex if Node; Alembic if Python; dbmate or Flyway for any language).
4. **Application access (ORM, query builder, raw SQL):** deferred to the data-access decision.
5. **Validation:** the server re-validates everything per [[backend-data-rules]]; database constraints are the second line.
6. **Mapping:** database row -> domain object -> API response. Outside exercise APIs are mapped into our own shape at an import step and are not stored raw as truth.
7. **No formal API contract now.** Revisit if a second consumer appears.

## Alternatives considered

- **Supabase as a plain database.** Same engine and low exit cost. Lost on idle behavior (a paused project needs a manual restore; unclear whether a direct connection counts as activity), on size (500 MB vs 1 GB), and on carrying unused features.
- **Turso / SQLite-family.** Honest runner-up if Neon's free cap or idle delay becomes a problem. Lost on a different SQL dialect and less transferable learning.
- **Document store (MongoDB Atlas, Firestore).** Poor fit for per-row uniqueness, transactions and constraints.
- **Code-first (ORM models) as source of truth.** Some ORMs cannot express the partial-index and check rules, and it teaches less SQL.
- **Contract-first.** One client we own and no outside consumers; a spec would have no reader yet.

## Consequences

- First request after idle is slower (scale to zero).
- Free plan has a monthly compute cap and a small size cap; both are tied to one company's terms, which changed days before this decision.
- Types in code and tables are kept in sync by hand or by a generator.
- Rules live in two places (database constraints and server code) and can drift; a test should cover each rule on both sides.
- A migration that has run is never edited; every change is a new file. Rolling back on live data is hard; use Neon branches to test migrations first.
- Paid alternative: Neon's usage-based paid plan (check pricing when needed). Exit path: standard `pg_dump` to any Postgres host.
- Neon has an MCP server for schema inspection. Migrations stay in the repo regardless, so no capability depends on it.
- Next: table design (keys, indexes, constraints, `deletedAt`) goes to `relational-modeling`; access mechanics go to `data-access-layer` after language and framework are chosen.
