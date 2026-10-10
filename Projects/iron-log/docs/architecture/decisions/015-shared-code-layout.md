# 015. Shared code layout: one repo, one package, a shared folder

Status: accepted by the user, 2026-10-06
Depth class: structural

## Context

ADR 005 requires one copy of types and validation shared by the client and the API; ADR 008 adds a shared command contract, ADR 006 a unit-conversion module and ADR 011 a week function. Today the repo is a single package at the root (`package.json`, one `tsconfig.json`, Vite and Vitest). The framework-free candidates are already in `src/lib/` (`validate.ts`, `dates.ts`, `logic.ts`, merge code) and `src/types.ts`; that they have no React or DOM imports was not checked file by file. `CLAUDE.md` requires one change per commit and no behavior change inside a refactor. Cloud Run builds one image that serves the API and the PWA (ADR 010). Free tools only; all options are free.

## Decision

1. **Keep one repo and one package.** Do not introduce workspaces now.
2. **`src/shared/`** holds only code with no React, DOM or Node imports: types, validators, the command contract, merge rules, the week function, unit conversion.
3. **`server/`** holds the API, with its own `tsconfig` (Node types). It imports from `src/shared/` and never from `src/components` or the store. A lint rule or a small CI script enforces this (check whether oxlint can express it).
4. **`npm run typecheck`** runs both `tsconfig` files.
5. **Moving code is one file per commit, with no behavior change**, starting with the files the first command needs.
6. **Planned step if it gets painful:** convert to npm workspaces (`packages/shared`, `apps/web`, `apps/api`). Because shared code stays framework-free, this is mostly moving folders.

## Alternatives considered

- **npm workspaces monorepo now.** Clean dependency boundaries and the standard layout, but moves every file and changes CI, Vite and Playwright config now. Lost on cost of change; it is the planned next step.
- **Separate repos with a published shared package.** Two repos and a publish step for one person, plus versions to sync. Lost.
- **Copy or generate the shared files.** Exactly the drift ADR 005 exists to prevent. Lost.

## Deciding axes

1. One copy, no drift. 2. Cost of change now. 3. Dependency boundaries. 4. Fits one Cloud Run image. 5. Easy to switch later.

## Consequences

- API-only dependencies (Express, Kysely, Better Auth) share one `package.json` with the client's. Keep them as separate groups and watch image size.
- Boundaries are enforced by a lint rule and a separate `tsconfig`, not by the package system; a browser-only import into the server is possible if the rule is missing.
- No recurring cost, so no paid alternative to record.

## Revisit when

- Dependency mixing or boundary mistakes recur, or the image grows too large: convert to workspaces.

## Spec amendment

None. Closes the "shared code layout" item in the backlog.
