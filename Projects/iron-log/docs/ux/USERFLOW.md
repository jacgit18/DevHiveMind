# Iron Log: user flows
_Last reviewed 2026-10-10. Names match the tabs in `src/App.jsx`: Board, Daily, Progress, Program, Settings._

## 1. First run (new account)
Landing page → Google sign-in → empty board with the first-run prompt (`FirstRun.tsx`) → pick or build a program (Program tab / new program sheet) → Board shows the week. Stretches show their own first-run prompt (`StretchFirstRun.tsx`). Nothing is drawn until data has loaded (ADR 016).

## 2. Weekly training loop (the main flow)
Open app (installed PWA) → Board, current week → tap a day (phone: swipe between days) → tick a card, or open the log sheet → per-set rows prefilled with the target → Save → card done, Progress updates → finish the day → app may suggest a fix for back-to-back repeats (notice: apply / dismiss) → next week rolls over on its own.
Errors: unchecking a logged card shows an undo notice; skipped cards go to leftovers with a make-up option.

## 3. Adjust the week
Rest day checkbox (moves later days) · swap arrows (neighbour days) · move a card · add an experiment card for this week only · change a phase for one week.

## 4. Check progress
Progress tab → headline numbers → lift list (stall tags) → tap a lift for its chart and weight goal → body weight goal. Muscles heatmap by week.

## 5. Daily extras
Daily tab → Stretches (tick routine), Supplements (water log, hot day / training minutes raise the goal), Medical.

## 6. Program editing
Program tab → editor (add, reorder, remove exercises; superset or either/or) → exercise library (search, filter, edit details) → saved versions.

## 7. Data and account
Settings → sync status / account → export (Excel, CSV, JSON) → import (Add vs Replace, review step) → backup → Erase data or Delete my data (second tap to confirm) → install the app.

## 8. Offline and updates
Everything works offline; writes queue and replay. A new version is applied by itself when the app is idle (no timer, sheet, import or typing, 15 s without a tap); while it is in use a banner offers *Reload now* or *Later*; refused writes are quarantined and shown, never silently dropped.

Brief: [[UX-DESIGN-BRIEF|UX design brief]]. Behaviour detail: [[feature-map|feature map]].
