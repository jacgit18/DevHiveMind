# v2: Suggest moving one card when a day is finished

Replaces the first v2 spec (PR #72), which only added tests and did not build the feature. Follows [[2026-10-05-reorder-on-day-complete-design]] (v1).

## Goal

When you finish a day and an exercise lands on two days in a row, suggest the smallest change that removes the repeat:

1. **Move the rest day** (v1, unchanged).
2. **Move one card** to another day (new).
3. **Reorder whole days** (v1), only when it leaves fewer repeats than moving one card.

Leaving out, as in v1: Home cards, either/or cards, and exercises on every workout day (the Optional sled).

## Why this order

Fewest cards moved wins. A rest-day move changes no workout. A card move changes one card. A day reorder moves every card on two or more days and changes what "Day N" means. With the built-in programs, every clash is one exercise between two neighbouring days. Moving one card fixes that. Reordering whole days (for example, reversing Days 3 to 6) is far more than needed.

## Behavior

### When a day counts as finished (changed from v1)

- A column is **finished** when it has at least one card that counts, every counting card is ticked or skipped, and at least one is ticked. Cards that count: anything but `sec === 'Home'` and `sec === 'Optional'`. A day of only Home or Optional cards is never finished.
- The check runs when a column goes from not finished to finished, by **any** check-off change: a tick, the day's box, or a **skip**. In v1 a skip never raised a suggestion, so finishing a day by skipping the sled last showed nothing.
- Ticking a Home or Optional card on a finished day does nothing (the column was already finished).
- `tally(...).full` and the day check-off box are unchanged. Only the trigger uses the new rule.
- Unticking or un-skipping that makes the column not finished drops a suggestion not yet applied (as v1).

### What a card move may do

- **Card:** in a movable column (after the finished column, nothing checked, not empty, not the rest column; same rule as v1). It counts for clashes (not Home, not either/or), is not skipped, and has nothing checked. A superset moves as one card, with all its exercises.
- **Target:** another movable column. Never the finished column or earlier, a started day, the rest column, or an empty day (empty days are where rest days go).
- **No same-day double:** the target day must not already have any of the card's exercises (on a card that counts for clashes). The repeat count only looks at neighbouring days, so it would score that as a fix.
- **The day it leaves keeps a workout:** at least one other card that counts toward finishing stays on that day, so a card move never empties a day.
- **Every-day exercises stay every-day:** a move that changes which exercises are on every workout day is not suggested. Otherwise moving a card could hide a repeat (by making it count as every-day) instead of fixing it.
- **Score:** back-to-back repeats from the finished column on (`countFrom`), with the same every-day exercises left out as v1 (`dailyOf` of the current layout).
- **Best card move:** fewest repeats, then the target nearest the card's current column, then the later day, then the first card in board order. This keeps the result stable.

### Choosing between the three

1. If a rest-day-only change reduces repeats, suggest it (v1 rule, unchanged).
2. Otherwise take the best card move and the best day reorder (v1 `planOrder`, workouts allowed). The card move wins unless the reorder leaves **fewer** repeats. A tie goes to the card move.
3. Suggest nothing unless the winner has fewer repeats than now.

### The notice

Same place and style as v1, with the label "Back-to-back:". It names what clashes, then the change:

- "Leg Extension ISO hold is on Day 2 and Day 3. Moving Leg Extension ISO hold from Day 3 to Day 4 fixes it."
- A superset: "Moving the Hip Thrust + Chest Press superset from Day 2 to Day 6 fixes it."
- If it only reduces: "… leaves 1 back-to-back repeat instead of 2."

Buttons are the same as v1. **Apply** writes the move, and the notice reads "Moved for this week." with **Put back** and **Done**. **Put back** restores `week.moved` for that card exactly, as long as that card's entry hasn't changed since Apply. **Dismiss** stops the same suggestion coming back for this week and finished column. After Apply, focus goes to Put back.

### Manual moves use the same clash rule

`moveClashes` (the heads-up on a drag or dropdown move) and `altDay` follow the planner for **back-to-back** warnings: Home and either/or cards neither cause nor receive them, and every-day exercises (the sled) never do. Today they do, so the two warnings disagree. The **same exercise twice on the same day** still warns for every card, because that is a real duplicate.

## Data

- Nothing new is stored. A card move writes `week.moved[slotId]` the same way `moveSlot` does: the program day shown in the target column (`dayAt`), or the key is removed when that is the card's own day.
- `normWeek`, export, import and merge already handle `week.moved`.

### Logic (`src/lib/logic.js`)

- `countsForFinish(s)`: `s.sec !== 'Home' && s.sec !== 'Optional'`.
- `isFinished(list, week)`: the finished rule above.
- `planCard(cfg, week, slots, doneCol)`: the best single card move, `null` or `{ slot, to, pd, before, after, lines }`.
- `planFix(cfg, week, slots, doneCol)`: picks between rest-day-only, card and reorder by the rules above. Returns `null`, `{ kind: 'order', order, rest, before, after, lines }` or `{ kind: 'card', slot, pd, before, after, lines }`.
- `planOrder` keeps its current contract. It also reports whether its result is rest-day-only (`restOnly: true`), so `planFix` doesn't re-run the search.
- `moveClashes` ignores cards that don't count for clashes on either side, and every-day exercises.

### Store (`src/store/useAppStore.js`)

- `suggestOrder` uses `isFinished` before and after, runs on any check-off change (tick or skip), and calls `planFix`.
- `orderNote` gains `kind`. A card note has `prev: { slot, moved }` and `next: { slot, moved }`, where `moved` is the card's `week.moved` value or `null`.
- `canUndoOrder`, `applyOrder` and `undoOrder` handle both kinds. A card Put back is refused when that card's `week.moved` value no longer equals `next`.

## Testing (to the v1 standard)

Written first (TDD).

- **Unit (`logic.test.js`):** `isFinished` (Home and Optional left out, skip counts, an all-skipped day is not finished); `planCard`:
  - picks the nearest clash-free day;
  - never targets a rest column, an empty day, a started day or a fixed day;
  - moves a superset whole;
  - ignores Home, either/or and every-day exercises;
  - returns `null` when no card move helps.

  `planFix`: rest day beats a card; a card beats a reorder on a tie; a reorder wins only with fewer repeats. `moveClashes`: Home and either/or ignored, the sled ignored.
- **Property tests (`planOrder.test.js`, extended):** about 3,000 seeded random weeks, every finished column. For each card suggestion:
  - exactly one card changes column;
  - it appears exactly once;
  - every other card stays where it was;
  - nothing in a fixed or started column changes;
  - the target is a movable workout column;
  - only `week.moved[slot]` differs in the candidate week;
  - the input is not mutated;
  - before and after counts are honest.

  For `planFix`: the priority rules hold against brute force (the best card move and best reorder are computed independently).
- **Mutation-checked:** each of these must fail the suite:
  - letting the target be the rest column, an empty day or a started day;
  - preferring a reorder on a tie;
  - letting a rest day lose to a card;
  - counting Home cards as finishing a day;
  - not firing on a skip;
  - writing the wrong card in Apply;
  - a Put back that does not restore `week.moved`.
- **Store round trip (`useAppStore.test.js`):**
  - finishing a day with the sled and Home cards unticked raises the note;
  - finishing it by a skip raises the note;
  - Apply for a card keeps every card once and changes only that card's `week.moved`;
  - Put back restores the week exactly;
  - Put back is refused after that card is moved again;
  - existing v1 order tests still pass.
- **Replace `src/lib/moveCard.test.js`:** remove the tests that never call app code; keep the `moveClashes` and `altDay` unit cases.
- **End to end (`e2e/board.spec.js`):** Program A, finish Day 2 with Home and the sled unticked. The notice suggests moving Leg Extension from Day 3 to Day 4. Apply moves it and focuses Put back, and Put back restores it. This updates the v1 e2e, which expected the whole-day reorder.

## Docs

HelpSheet: finishing a day may suggest moving the rest day, one card or the day order, and Home and Optional cards don't need ticking. Update the README feature list in the same change.

## Not included (later)

- Moving two or more cards in one suggestion, or a card move plus a reorder together.
- Limiting how long a day gets after a card moves.
- Counting shared muscles as clashes, or checking across the week boundary.
