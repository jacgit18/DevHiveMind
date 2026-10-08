# 009. Data-access layer: Kysely (typed query builder) with raw `sql` as the escape hatch

Status: accepted by the user, 2026-10-06
Depth class: structural

## Context

Gate answers (routed through `data-access-layer`):
- **Source of truth:** database-first on Neon Postgres, migrations in the repo (ADR 002). Tables are designed in [[data-model/iron-log]].
- **Language:** TypeScript `strict` on Node (ADR 005), so the whole spectrum is available.
- **Team SQL fluency:** low; the user wants to learn it.
- **Query-shape mix (estimate, confirmed):** about 40% plain CRUD by key, 25% filtered lists (the `seq` pull feed), 5% reports, 30% database-specific (the `change_seq` bump with `UPDATE ... RETURNING`, `ON CONFLICT` for idempotent creates, partial unique indexes, `jsonb`, row-level security). The 30% is roughly 6 to 8 distinct queries reused by every command, not 30% of the code.
- **Refactor-safety bar:** a renamed column or changed type should break the build, not production.
- **Priority:** learning, with SQL transparency.
- Constraints from earlier ADRs: every command is one transaction with explicit control (ADR 003, 008); row-level security needs a per-request `user_id` set with `SET LOCAL` in the same transaction (ADR 004); `numeric` weights come back from the driver as strings and are parsed once at this boundary (ADR 006).

## Decision

- **Primary style: Kysely**, a typed query builder. Queries are TypeScript method chains that read close to SQL.
- **Secondary style (escape hatch): Kysely's raw `sql` template** for the database-specific queries the builder fights: the counter bump, upserts, partial-index checks, `SET LOCAL`.
- **Types are generated from the real database** (kysely-codegen or similar) after each migration, so a rename breaks the build. Generated types are committed so they are readable without running anything.
- **Transactions:** explicit (`db.transaction().execute(...)`); each command handler runs inside one, and sets the row-level-security user first.
- **Mapping boundary:** none beyond one data-access module that parses `numeric` strings to numbers and hands the rest of the code plain row types. The API shape is the shared contract (ADR 008), not the table types.
- **Migrations:** plain SQL files in the repo (ADR 002). The tool to run them is still open (see the data model's open items) and is settled at closeout; it is independent of Kysely.
- **Agent legibility:** good. SQL migrations and committed generated types can be read directly; nothing needs running to see what a query does.

## Alternatives considered

- **Drizzle.** Runner-up. Typed and close to SQL, but it leans toward the TypeScript schema being the source of truth, which pulls against database-first (ADR 002).
- **Prisma or another full ORM.** Hides SQL (against the learning goal), makes per-request row-level security and explicit transaction control awkward, brings its own migration tool and heavier runtime. Lost on the data rules and learning.
- **Raw `pg` with hand-written SQL.** Most transparent, but hand row-mapping everywhere and nothing catches a renamed column. Lost on refactor safety.

## Consequences

- More code written by hand than with an ORM. Accepted for learning and control.
- Generated types are only as current as the last codegen run; make it part of the migrate step and CI.
- The 6 to 8 hard queries live in one module and are explained as they are written; they are the main SQL learning surface.
- Kysely's current version and maintenance status are not verified; check when scaffolding.
- No recurring cost, so no paid alternative to record.

## Revisit when

- Reporting grows past a small share of the work and most queries use the `sql` escape hatch (consider keeping Kysely for types only or adding a view layer).
- Hand-written query code keeps drifting from the schema despite codegen.
- A second language needs the same data tier.

## Spec amendment

None. Backlog step 3 item "Data-access layer" is settled.
