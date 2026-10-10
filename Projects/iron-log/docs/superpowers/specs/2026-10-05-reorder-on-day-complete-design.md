# Suggest a new day order when a day is finished

Roadmap: not yet on the backlog; add under section 6 (UX) when the plan is written.

## Goal

When you finish a day, the app checks the days still ahead this week. If the same exercise lands on two days in a row, it suggests a new order for the remaining days that removes or reduces those back-to-back repeats. You apply the suggestion with one button, and you can put it back.

v1 only reorders whole days, and it may move the week's rest day too. Moving single cards to fix a clash is v2 (see Not included).

## Behavior

- **Trigger.** The check runs when a column goes from not complete to complete (`tally(...).full` changes from false to true), whether by the day's check-off box (`checkDay`) or by ticking its last card. It does not run on unticking, on a skip, or when a column was already complete.
- **What can move.** Only columns after the one you just finished that have nothing checked yet. That includes a later rest column: the suggestion may move the rest day to a different movable column, and the workouts shift to fill the gap. These stay fixed:
  - the finished column and every column before it, including a rest day that is already behind you;
  - any later column with at least one check-off (a day you've started stays where it is).
  - an empty day (no cards), such as the empty Day 7 or a day you cleared. It is where a rest day goes; moving it could leave a rest day no room and push a workout off the week (bug found 2026-10-05: after Apply, ticking a rest day wanted to push 7 cards off).
  - Regression test: finish Day 1 of Program A, Apply, then a rest day on Day 2 pushes nothing off.
- **Rest days move as a rest day.** The number of rest days doesn't change, and moving one never pushes a workout off the board. A rest day that moves keeps its `restOn` date, as it does with the swap arrows.
- **What counts as a clash.** The same exercise (same `ex` id) on two neighboring displayed columns. Skipped cards don't count. Muscle overlap doesn't count. An exercise on every workout day of the week (the optional sled, for example) is left out, since no order can split it. Home cards (daily habits like the grip trainer) and either/or cards (you pick whichever is free) are left out too. A rest column between two days breaks the adjacency, because the rest column has no cards. That is why moving the rest day can be the best fix: putting it between two days that share an exercise removes the clash without reordering any workouts. Saturday to next Sunday is not checked; the user handles that by hand.
- **The finished day counts as a neighbor.** Finishing Day 3 with Squat makes a Squat on Day 4 a clash, and the planner may move that workout later.
- **Rest day first.** If moving the rest day alone cuts the repeats, that is the suggestion; workouts are reordered only when it can't help. With no rest day ticked there is nothing to move, so it reorders workouts.
- **When to suggest.** Only when the best order has fewer clashes than the current one. With no clashes, or no order that does better, nothing is shown.
- **The notice.** Shown on the board in the same place and style as the move heads-up (`moveNote`), with `role="status"`. Its label is "Back-to-back:". It names what clashes and what the change fixes, for example: "Squat is on Day 3 and Day 4. Moving Day 4's workout to Day 6 fixes it." Or, when the rest day moves: "Squat is on Day 3 and Day 4. Moving your rest day from Day 6 to Day 4 fixes it." Swapping two workouts reads "Swapping Day 4 and Day 5 fixes it." When several things move, it lists the new order ("New order for Days 3 to 7: Day 6's workout, Rest, Day 4's workout, empty day, Day 3's workout. That fixes it."). If the best order only reduces clashes, it says how many are left. Buttons:
  - **Apply**: writes the new order for this week. The notice then reads "Order changed for this week." with **Put back** and **Done** buttons.
  - **Dismiss**: hides the notice. The same suggestion is not shown again for this week and finished column during this session.
- **Put back** restores the order and the rest day from before Apply, provided nothing else changed either since then (otherwise the button is gone).
- **Labels follow position.** As with swaps, "Day N" is whatever sits Nth. A workout's subtitle, make-up flag, check-offs, logs, warm-ups, phases, skips and moved cards travel with it, since they are keyed by workout.
- **Other weeks.** The check runs on whichever week is shown, past or future, the same as swaps. Changing week clears the notice.
- **Phone.** After Apply the selected day stays on the same column.
- **Accessibility (WCAG 2.2 AAA).** Real buttons, 44 px minimum target, keyboard operable. Focus is not moved when the notice appears; the status role announces it. After Apply, focus goes to the Put back button.
- **Not included (v2 or later):** moving single cards when no day order fixes a clash (using `altDay`), counting shared muscles as clashes, checking across the week boundary, applying the order automatically without asking.

## Data

- Nothing new is stored. Apply writes `week.order` and `week.rest` exactly as `swapDays` does: `order` is a permutation of 1..7, removed when it equals the identity; `rest` is the ascending list of rest columns. Persistence, export, import and merge already handle both.
- "The planner" in this spec is just the pure function `planOrder` below. It decides what to suggest and changes nothing itself.
- New pure functions in `logic.js`:
  - `countsForClash(slot)`: false for Home cards (`sec === 'Home'`) and either/or cards (`type === 'either'`).
  - `dailyExercises(week, slots)`: exercises on every non-empty column (needs at least two); these never count as a clash.
  - `dayClash(week, slots, a, b)`: the exercise ids shared by displayed columns `a` and `b` (skipped cards, Home and either/or cards, and daily exercises excluded). Uses `currentLayout`.
  - `clashCount(week, slots, from)`: total of `dayClash` over neighboring pairs `(c, c + 1)` for `c` from `from` to `DAY_COUNT - 1`.
  - `planOrder(cfg, week, slots, doneCol)` (`cfg` for exercise names in the notice): returns `null` or `{ order, rest, before, after, lines }`.
    1. Find the movable columns (rules above). Each holds either a program day (`dayAt`) or a rest day. Rest days count as identical items.
    2. Try every arrangement of those items across those columns (at most 6! = 720, fewer with identical rest items). For each, build the candidate: the rest columns become `rest`, and the workouts, taken in column order after the fixed columns, fill `order` positions in sequence (hidden off-board workouts stay last). Score it with `clashCount(..., doneCol)`.
    3. **Rest day first:** if an arrangement that only moves rest days (workouts keep their order) has fewer repeats than now, the best of those is the suggestion, even when a reorder would fix more. Otherwise keep the lowest score overall. Ties go to the arrangement that reorders the fewest workouts (pairs of workouts whose order flips), then to the one that changes the fewest columns, then to the first one found (the current order is tried first), so the result is stable. A rest-day move reorders no workouts, so it wins a tie against a swap.
    4. Return `null` unless the best score is lower than the current one.
- Store (`useAppStore.js`):
  - `mutateChecks` calls `suggestOrder` only when the change ticked something (a skip or an untick never raises a suggestion). It compares each column's `tally(...).full` before and after the change. For the lowest column that became full, it calls `planOrder` and sets `orderNote: { week, doneCol, prev, next, lines, applied: false }`, where `prev` and `next` are each `{ order, rest }`, unless that week and column were dismissed this session.
  - `canUndoOrder()`: the note is applied and the week's order and rest still equal `next` (the board shows Put back only then).
  - `applyOrder()`: writes `orderNote.next` (order and rest) through `mutateWeek`, then sets `applied: true`.
  - `undoOrder()`: if the week's current order and rest still equal `next`, writes `prev` back and clears the note.
  - `dismissOrder()`: clears the note and records `week:doneCol` in a session-only dismissed set.
  - `swapDays`, `setRest`, a card move and changing week clear `orderNote` (they change the layout the suggestion was based on).
- `Board.jsx` renders the notice next to the move heads-up.

## Testing

Written first (TDD), next to the existing tests in `logic.test.js` and `useAppStore.test.js`:
- `dayClash`: shared exercise found; skipped card ignored; a superset item matches; rest column returns nothing.
- `planOrder`:
  - finishing Day 3 with Squat on Day 4 moves that workout later;
  - no clash returns `null`;
  - a clash no order can fix returns `null`; one it can only reduce returns the reduced order;
  - columns with a check-off and earlier columns (including an earlier rest day) never move;
  - a later rest day moves when that alone fixes the clash (Squat on Days 3 and 4, rest on Day 6: rest goes to Day 4, the Day 4 workout and the ones after it shift later);
  - a rest day move never pushes a workout off the board and keeps `restOn`;
  - a rest-day move and a workout reorder are compared on the same score; a tie goes to the one that reorders fewer workouts;
  - an exercise on every workout day is ignored, and so are Home and either/or cards;
  - works with an existing `week.order` and with rest days set;
  - moved cards travel with their workout in the candidate layout.
- Store: completing a day by its box and by its last card both raise the note; unticking does not; Apply writes `week.order` and `week.rest` (identity removes `order`); Put back restores both; Put back is refused after a later swap; Dismiss stops the same suggestion coming back; changing week clears it.
- End to end (`e2e/board.spec.js`): finishing Day 2 of Program A (Leg Extension on Days 2 and 3) shows the notice, Apply moves the Day 3 workout to column 4 and focuses Put back, and Put back restores it. The phone layout was checked by a screenshot.

- **Property tests** (`src/lib/planOrder.test.js`): about 3,000 seeded random weeks (both built-in programs and random programs with supersets, either/or, Home cards and empty days; random rest days, orders, moved, skipped and checked cards), every finished column. Each suggestion is checked for: no card lost, none duplicated, hidden cards stay hidden, workouts stay whole, fixed columns unchanged, input not mutated, honest before/after counts, a valid order with the same number of rest days, and rest day first. Mutation-checked: making empty days movable, or putting hidden workouts first, both fail the suite.
- **Store round trip** (`useAppStore.test.js`): for each rest day and finished day, Apply keeps every card once and leaves done, skipped, moved, restOn and logs unchanged; Put back restores the week exactly.

## v2 testing requirement

v2 (moving single cards) must ship with the same level of testing: extend `planOrder.test.js` so the same invariants hold when single cards move (a moved card appears exactly once, nothing else moves with it unless intended, Put back restores `week.moved` exactly), and mutation-check the new tests.

## Docs

Update HelpSheet (finishing a day may suggest a new order) and the README feature list in the same change.
