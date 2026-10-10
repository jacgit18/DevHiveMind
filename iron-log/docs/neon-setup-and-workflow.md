# Neon setup and workflow

_Written 2026-10-07. Covers what was set up, how local Docker, Neon branches and the tests fit together, and where the e2e tests stand. The decisions behind it are in `architecture/decisions/` (002 datastore, 012 migrations, 014 test tooling)._

## What is set up

| Piece | State |
|---|---|
| Neon agent skills (`neon`, `neon-postgres`) | In the repo at `.claude/skills/`, pinned in `skills-lock.json` (PR #87) |
| Neon MCP server | Configured at user scope in `~/.claude.json` (`https://mcp.neon.tech/mcp`), not in the repo |
| Project link | `.neon` (git-ignored): project `iron-log` (`lucky-cake-00054109`), written by `neon link` |
| `neon.ts` | Postgres only: `auth`, `dataApi`, `aiGateway` off; default branch has no overrides; new non-default branches expire after 7 days (PR #89) |
| Packages | `@neon/config` (dev, CLI tooling), `@neon/env` (runtime, not yet imported) |
| Server connection | `server/db/connection.ts` (Kysely pool) and `GET /api/health/db` (PR #86). Verified against the production branch: 200 |
| Migration `20261007000001_core_tables.sql` | Applied to production by the owner. Check each other branch with `dbmate status` |

`neon config plan` against production reported no changes. `neon deploy` and `neon config apply` have nothing to do until `neon.ts` declares more.

## Local Docker versus Neon

- **Docker Postgres** (`docker-compose.yml`, `127.0.0.1:5433`) is the offline local dev database with throwaway data.
- **Neon** is hosted and needs no Docker. Pointing `DATABASE_URL` at a Neon branch is all the server and dbmate need.
- **The connection test still needs Docker.** It uses Testcontainers, which starts its own Postgres container, separate from the compose database and from Neon. CI has Docker; a local run without it fails those tests whichever branch `.env` points at.

## Branches and migrations

- A new Neon branch is a copy-on-write copy of its parent's schema and data at creation time. After that, branches are independent.
- A migration is run per branch with `dbmate up` against that branch's URL. Running it on `dev` does not touch `production`. Promoting a change means running the same migration on production.
- **Use the unpooled URL for migrations.** `DATABASE_URL` is the pooled (PgBouncer) connection and is right for the server. dbmate and `kysely-codegen` read `DATABASE_URL`, so for migrations override it with `DATABASE_URL_UNPOOLED` for that command.
- `npm run db:migrate` also regenerates `server/db/types.ts` from the database it ran against. Check `git status` after it and commit a types change on its own.

### Hazard: `.env` points at production

`neon link` rewrote `.env`, so `DATABASE_URL` now points at the **production** branch. Everything that reads `.env` (`db:migrate`, `db:rollback`, `db:types`, `dev:server`) hits production until it is changed.

Create a dev branch and switch to it:

```bash
neon checkout dev --create     # creates the branch, relinks .neon, rewrites .env
neon branches list             # confirm it exists
neon checkout production       # switch back (rewrites .env again)
```

- `--no-env-pull` skips the `.env` rewrite.
- The `dev` branch inherits `neon.ts` policy, so it expires after 7 days unless `ttl` is changed.
- Before running `db:migrate` or `db:rollback`, check `NEON_BRANCH` in `.env`.
- A deployed server needs `DATABASE_URL` (the pooled URL of the right branch) set in its own environment. The local `.env` does not carry over.

## Test layers

| Layer | What it covers | Where it lives |
|---|---|---|
| Unit | One function or module in isolation, no database or network | `src/**/*.test.js`, `server/**/*.test.ts` |
| Integration | A few real pieces together, no browser: a route plus a real Postgres | `server/db/connection.test.ts` (Testcontainers) |
| End-to-end | The whole system driven through a real browser | `e2e/*.spec.js` (Playwright) |

- A feature tested from the backend through to the frontend is **e2e**. Integration is the layer below, usually the backend alone.
- **The current e2e tests do not need changes.** The app is still local-first, and the e2e suite passes without the Express server running. Backend work does not break it.
- **When the frontend starts syncing through the API,** choose one of two paths: keep the existing e2e tests against a stubbed or offline backend (fast, deterministic), or add a few full-stack e2e tests that start the real server and a throwaway database and check that a UI log entry reaches the database. Keep the full-stack ones few; they are slower and flakier.
- The rule that board reorder and log writes lose or duplicate no exercise (`planFix`, `mutateChecks`, `autoLogs`, `addEntry`) belongs in integration tests once the sync logic lives on the server.

## Security audit status

Eight findings became three after PR #88 (`npm audit fix`, Testcontainers 11 to 12.2). The remaining three are `braces` through `kysely-codegen` (dev only). npm's only offered fix is a downgrade to `kysely-codegen` 0.6.1, so it is left. Recheck when `kysely-codegen` updates `micromatch`.

## Open items

#todo/project/priority/Low
- [ ] Create the Neon `dev` branch and move `.env` off production.
- [ ] Decide how migrations get the unpooled URL (a small script or an `.env` variable).
- [ ] Update the Neon CLI (8.0.11 to 8.0.12).
- [ ] Decide which backend routes get integration tests first.
- [ ] Recheck the `braces` audit finding when `kysely-codegen` updates.
- [ ] Set `DATABASE_URL` in the deploy environment once the server is hosted (ADR 010).
