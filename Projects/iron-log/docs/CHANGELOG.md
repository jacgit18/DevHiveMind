# Iron Log: changelog
_Newest first. Grouped by date from merged PRs (#1 to #140, 2026-09-26 to 2026-10-09). Add an entry in the same PR as any change; use `git log --first-parent` for the full list._

## Unreleased
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
