# TypeScript migration: status, what to leave alone, and follow-ups

_Updated 2026-10-06. PRs #80, #81 and #82 are merged (all phases and follow-ups #1, #2, #4). Leftovers are in backlog.md._

## Approach
- Gradual: `allowJs: true`, `checkJs: false`, `strict: true` for `.ts`/`.tsx`. `npm run typecheck` runs in both workflows.
- Convert files that carry data shapes and rules; leave tooling and tests alone.
- Core types in `src/types.ts`; store types in `src/store/types.ts` (`AppState` = core + editor + settings + wellness slices).
- After each file: `npx tsc`, `npm test` (590), `npm run lint`, `npm run build`; e2e (16) before opening a PR.

## Done
| Phase | What |
|---|---|
| 1 (PR #80) | `types.ts`, `validate`, `data`, `logic`, `dates`, `body`, `trends`, `liftGoal`, `exerciseLibrary`, `viewState`, `storage`, `github`, `supplements`, `water`, `stretches` |
| 2 (PR #81) | `muscles`, `export`, `excelImport`; `useTimerStore`, `useToday`, `useAppStore` + `editorSlice`, `settingsSlice`, `wellnessSlice` |
| 3 (PR #81) | `appearance`, `motion`, `pwa`, `useFocusKeeper`, `useTooltips`; components: board, sheets, progress, settings, stretches, supplements, program, plus `ArmedButton`, `CommitInput`, `ExerciseField`, `Sheet` |

Real bugs-in-waiting the types surfaced (all handled without behavior change): saved versions use `key: 'N'`; built-in slots have no `id` until `withAllDays`; old logs hold `''` weights; old weeks store `rest` as one number; `LogSheet`'s 1RM state mixes number and string; CSV imports have no `experiments`.

## Not converted, and why (detail)
| File(s) | Why leave it |
|---|---|
| `src/**/*.test.js` (33 files, 590 tests) | The tests are the safety net that proved every conversion changed nothing, and Vitest runs JS and TS alike. Converting them would mean editing 5k+ lines in the one place a mistake hides a regression. They already exercise the typed code with real values; types on test fixtures mostly add `as` casts. Revisit only if a fixture needs shape help. |
| `e2e/*.spec.js`, `playwright.config.js` | These drive a built browser app and are checked by running them (16 pass). Types would check only the test script itself. |
| `vite.config.js` | 90 lines of plugin config. TS adds nothing, and Vite's config loader plus the PWA plugin make a rename a small risk for no gain. |
| `scripts/make-icons.mjs`, `tools/screenshots.mjs`, `tools/visual-diff.mjs` | One-off Node scripts that are not shipped. The ones that matter are covered by their own CI runs. |
| `src/test/browserStubs.js`, `src/test/fixtures/*` | Test support data. |
| `src/fonts.js` | Fourteen lines of font imports. |
| `src/main.jsx`, `src/App.jsx` | Entry points. `index.html` points at `/src/main.jsx`, so a rename must change that path too. Low risk but no data logic, so the payoff is cosmetic; do it last if you want a fully TS tree. |
| `Daily`, `Medical`, `LineChart`, `MuscleChips`, `Muscles`, `TimerBar`, `UpdateBanner` | Presentational. Little data flows through them and they only receive props, so typing them adds friction. Convert when next edited. |
| `public/`, `docs/`, `dist/` | Not source. |

## Follow-ups: what, why, and whether to do it
`any` count (excluding tests) after the follow-up PR: components 2 (was 129), lib 38, store 37. Items marked DONE are in the follow-ups PR.

| # | Follow-up | Worth it? | Notes |
|---|---|---|---|
| 1 | **DONE.** **Real prop types for components** (replace the auto-generated `any` props). The biggest gap: today the store is typed but component props are not, so a wrong prop is not caught. | **Yes, do next**, a few components per PR, biggest first: `Trends` (20 `any`), `Board` (19), `SlotSheet` (13), `Supplements` (11), `Stretches` (8), `Editor` (7). | Most props are ids, callbacks and `Cfg`/`Week`/`LogEntry` shapes that already have types. |
| 2 | **DONE.** **Typed sheet forms** (`Form = any` in `store/types.ts`: slot, exercise, stretch, supplement, log forms). | **Yes, with #1.** Define one form type per sheet next to the sheet and use it in both the sheet and the store action. This closes the loop where bad form data reaches the store. | Also removes `SlotSheet`'s `useState<any>`. |
| 3 | **Untrusted-input `any`** in `lib/` (stretches, supplements, storage, excelImport, normWeek, normConfig). | **Mostly no.** These functions clean arbitrary JSON, so `any`/`unknown` input is correct; the output is already typed. Only switch a function to `unknown` plus narrowing if it is edited anyway. `normWeek(w?: any)` could take a `RawWeek` type. | Low value, easy to introduce bugs. |
| 4 | **DONE.** **Typed `LIMITS` and `Cfg`**. `LIMITS` is `Record<string, Record<string, number>>`, so a misspelled key compiles. `Cfg` lists only keys the logic reads; backup/import code adds more. | **Yes, small.** Make `LIMITS` an `as const` object and widen `Cfg` as keys appear. One short PR. | |
| 5 | **`noUncheckedIndexedAccess`** (flags `logs[id]`, `arr[0]` as possibly undefined). | **Not now.** Measured: 321 new errors, nearly all in code that already checks (`cols[d]`, `DAYS[i]`). Fixing them means `!` or guards everywhere, which adds noise and little safety. If wanted, enable it for `lib/` and `store/` only, after #1 and #2. | |
| 6 | **TypeScript lint rules** (flag new `any`, unused types). | **Maybe.** oxlint can run type-aware rules via `oxlint-tsgolint`; it would stop `any` growing. Cost: a new dev dependency and CI time. Worth it only once #1 and #2 shrink the count, so the rule is not drowned in existing hits. | |
| 7 | **Update `feature-map.md`**. | **No.** No feature or interaction changed. | |

Suggested order: #1 and #2 together (per component group), then #4, then decide on #6. Skip #3 and #5.

## Findings worth keeping
- Strict TypeScript found no behavior bugs, but it did show where shapes are only convention (see the list above). Keep those comments next to the types.
- `OrderNote` is a discriminated union (`kind: 'order' | 'card'`), which removed several runtime assumptions in the reorder undo/apply code.
- Reorder/log write paths (`planFix`, `mutateChecks`, `autoLogs`, `addEntry`) are now typed end to end; the existing reorder tests still prove no exercise is lost or duplicated.

## After the follow-ups PR
- Remaining `any`: 2 in components (`SlotSheet`'s clone of a program slot), 38 in `lib/` and 37 in the store, almost all untrusted-input cleaners and host handles (db, mcp) that should stay loose.
- Still open by decision: #3 (leave), #5 (skip), #6 (lint rules, maybe later). Next candidates if continuing: convert the remaining presentational components when touched, and `App.jsx`/`main.jsx` last.
