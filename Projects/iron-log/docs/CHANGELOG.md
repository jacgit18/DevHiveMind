# Iron Log: changelog
_Newest first. Grouped by date from merged PRs (#1 to #140, 2026-09-26 to 2026-10-09). Add an entry in the same PR as any change; use `git log --first-parent` for the full list._

## Unreleased
- Grocery list under Daily, **admin only** (branch `f-grocery-list`, [[019-grocery-list-device-only|ADR 019]]): items kept once with store, usual count and last price; each month starts as the same list with nothing ticked; occasional items are added to a month when needed; count and unit price give per-store and monthly totals (expected and spent); past months stay readable. Kept on this device only (no server change); in the data file, imports and backups; *Delete my data* clears it. `Daily.jsx` converted to TypeScript. Store drop-downs suggest BJ's, C-Town, Whole Foods, Flatbush Co-Op and Aldi; Groceries is the first button in the Daily row.
- App updates apply themselves when the app is idle (branch `f-auto-update-when-idle`, [[018-auto-apply-updates-when-idle|ADR 018]]): a waiting version reloads the app once no timer is running, no sheet or import is open, no write is unsaved, no text field is focused and nothing was tapped for 15 s; otherwise the *Reload now / Later* banner shows as before. Opening the app after 10 minutes also checks for an update. Everyone, no flag.
- Traffic hardening (branch `f-traffic-hardening`): responses are compressed (gzip/brotli via `compression`); `/api/health/db` is limited to 30 a minute per address and reuses its answer for 5 s; the 19 command routes register through one `command()` helper in `server/app.ts` (no behavior change); the first refused call over a rate limit logs one `rate limited` line (route, ip or user, no address); `MIN_INSTANCES` env var sets Cloud Run min-instances in `deploy-cloud-run.sh` (default 0, unchanged).
- `npm run check` (`scripts/check.mjs`) runs only the checks that fit the changed files (docs: none; tests: test + lint; styles: e2e; source: typecheck + test + lint + build or e2e; sync/server: adds e2e:sync + db:check; unknown or config files: everything). `CLAUDE.md` Checks section rewritten to match; CI still runs everything.
- Registry checks (`src/features.registry.test.ts`) and a PR audience check (`pr-audience.yml`); `feature-map.md` audience table is per feature.
- PR template asks for the audience (admin or everyone); `feature-map.md` has an "Audience at a glance" table.
- A feature name missing from the `FEATURES` registry is now hidden from everyone (was shown to everyone), so a forgotten line fails closed.
- Remove GitHub Pages deploy; README points at Cloud Run.
- Warm-up moved from the workout board to the top of each Stretches day; its ticks are stored in the stretch week (`<day>:warm:<id>`).

## 2026-10-09
- Deploy with no traffic, smoke-test, then promote (#140); backup retention 23+7 (#139); sync re-checks identity (#138); `/api/auth` body cap (#137); moved card goes on top (#136).

## 2026-10-08
- Backend live on Cloud Run (#120-#126): CI deploy, alerts, backups, delete-my-data, landing page.
- Blank start and first-run prompt for new accounts (#130-#134); admin feature flags (#135).
- Better Auth with Google sign-in, RLS, account hardening (#114-#118); import-legacy (#119).
- Sync client: mapping, transport, adapter, conflicts, status screen, e2e (#106-#113).

## 2026-10-07
- Backend skeleton, Neon database, command endpoints and sync pull (#83-#103); CI and Docker (#104, #105).

## 2026-10-06
- TypeScript migration: tooling, types, lib, store, components (#80, #81).

## 2026-10-05
- v2 card-move suggestion; stall judging per week; logs no longer duplicated or lost; central validation; `updatedAt` stamps (#71-#79).

## 2026-10-04
- Stretches and Supplements tabs, Daily grouping, editable warm-up, sled card (#55-#65).

## 2026-10-01 to 10-03
- Day 7 / rest days, swap days, day dates, experiment board, exercise library, muscles tab, weight goals, Playwright tests, Excel backup (#23-#52).

## 2026-09-26 to 09-28
- First PWA: program versions, trend charts, body weight, per-set logging, React rewrite with WCAG AAA and offline install, Excel import, GitHub backup (#1-#22).
