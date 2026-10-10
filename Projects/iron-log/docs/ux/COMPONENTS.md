# Iron Log: components
_Last reviewed 2026-10-10. Classes are in `src/styles.css`; React files under `src/components/`. States listed are the ones that exist; add a state here when you add one._

| Component | Code | States / variants |
|---|---|---|
| Button | `.btn` | default, hover (border darkens), `.primary`, `.ghost`, `.sm`, `.danger`, disabled (35% opacity), focus-visible |
| Armed button (two-tap confirm) | `ArmedButton.tsx` | idle, armed ("tap again"), disabled; used for erase/delete |
| Tabs | `.tabs` in `App.jsx` | selected (`aria-selected`), arrows/Home/End keys |
| Segmented control | `.seg` | on / off |
| Card (exercise) | `Card.tsx`, `.card` | default, done (strikethrough, no shadow), skipped (dashed), moved tag, dragging, stalled tag, superset (one checkbox each), either/or |
| Day column | `Board.tsx` | empty, rest day, partly done, complete, with date once logged |
| Chip / pill | `.chip`, `.pill` | default, primary/secondary muscle (`.p`, `.s`), selected |
| Notice | `.notice` | warning, `.movewarn`, `.leftovers`, `.tip`, `.firstrun`; dismissible with actions |
| Sheet (modal) | `Sheet.tsx`, `components/sheets/` | open, scrim, ≤480px wide (help 640), Esc closes, focus trapped and restored; log, exercise, import, new program, help, etc. |
| Form field | `.field`, `ExerciseField.tsx`, `CommitInput.tsx` | default, focus, error text, number input prefilled |
| Set row | `.setrow` in `LogSheet.tsx` | prefilled target, edited, "Same as last" |
| Timer bar | `TimerBar.jsx` | idle, hold countdown, rest, finished |
| Charts | `LineChart.jsx`, `Trends.tsx` | one line per phase, tooltip on hover/focus |
| Muscle map | `Muscles.jsx` | front/back, shaded by `--m0..m4`, selected muscle |
| Progress bar | `.bar` | goal progress |
| Banners | `UpdateBanner.tsx`, `SyncNotice.tsx` | update ready (auto-applied when idle; banner while busy), sync error/quarantined |
| First-run | `FirstRun.tsx`, `StretchFirstRun.tsx`, `Landing.tsx` | new account only |

Loading: the view renders only when `ready` (Settings excepted); no skeletons.
Rules: [[DESIGN-SYSTEM|design system]]. Where each appears: [[SCREEN-SPECS|screen specs]].
