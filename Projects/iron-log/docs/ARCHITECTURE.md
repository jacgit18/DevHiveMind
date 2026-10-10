# Iron Log: architecture
_Last reviewed 2026-10-10. Short map only. Reasons are in the ADRs ([[DECISIONS|decisions]]); the one-page visual is the [[Iron Log Design Mind Map.canvas|design mind map]]. Behaviour lives in [[feature-map|feature map]]._

## Shape
One TypeScript package. A React 19 + Vite **PWA** (offline-first, state in a zustand store, data on the phone) syncs to an **Express 5 API** on **Google Cloud Run** that also serves the built PWA from one origin. Data lives in **Neon Postgres**; sign-in is Better Auth with Google.

```
phone PWA ──queue/replay──▶ Cloud Run (Express: /api commands + one pull + static PWA)
  src/store (zustand)            │  Kysely ─▶ Neon Postgres (RLS backstop, tombstones, row versions)
  src/sync  (queue, pull)        └─ Better Auth (Google), rate limits, body caps, client-error endpoint
```

## Where things live
| Path | What |
|---|---|
| `src/components/` | UI by tab: board, stretches, supplements, progress, muscles, program, settings, sheets |
| `src/store/` | zustand store and slices (`AppState` in `src/store/types.ts`) |
| `src/lib/` | pure logic: targets, stalls, planning/reorder, trends, export/import, validation |
| `src/sync/` | client sync: persisted queue, replay, conflicts, refused-write quarantine |
| `src/shared/` | code shared by client and server (ADR 015); data types in `src/types.ts` |
| `server/` | API: `app.ts`, `auth/`, `commands/`, `db/`, rate limit, headers, admin |
| `db/` | dbmate SQL migrations (never edit one that has run) |
| `scripts/`, `cloudbuild*.yaml`, `.github/workflows/` | deploy, backup, CI |
| `e2e/`, `e2e-sync/`, `e2e-accounts/` | Playwright suites |

## Data flow rules
- Server-versioned rows, tombstones, stale edits refused, one command per user action ([[003-sync-versioned-rows|ADR 003]]).
- Weights stored in pounds; dates are local calendar dates, Sunday-start weeks (ADR 006, 011).
- Board reorder and log writes must never lose or duplicate an exercise (tests: `planFix`, `mutateChecks`, `autoLogs`, `addEntry`).

## Key dependencies
React 19, Vite, zustand, Vitest, Playwright, Express 5, Kysely, dbmate, Better Auth, Postgres (Neon), Cloud Run, GitHub Actions.

## Deeper docs
[[Projects/iron-log/docs/architecture/stack-walkthrough|stack walkthrough]] · [[iron-log|data model]] · [[backend-data-rules|backend data rules]] · [[sync|sync failure modes]] · [[deploy-runbook|deploy runbook]] · [[feature-flags|feature flags]]
