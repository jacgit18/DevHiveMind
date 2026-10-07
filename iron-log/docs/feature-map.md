# Iron Log: feature map and conflict register

**What this is.** The full inventory of what Iron Log does, where each feature lives in code, what it writes to
storage, and — the part that matters most — which features overlap enough to fight each other. Read the conflict
register (part 3) before changing anything on the board, the log, or an import path.

**Last verified against:** commit `e91954c` ("Centralize validation and clean data at every entry point", #77),
2026-10-05. Verified by reading `src/lib/logic.js`, `src/lib/export.js`, `src/lib/validate.js`,
`src/store/useAppStore.js`, `src/store/settingsSlice.js`, `src/components/**`, plus `README.md`.

**How to maintain it.** See part 6. Short version: when a PR changes a feature, update that feature's row and the
header date in the same PR; when a PR changes how two features interact, add or edit a conflict entry.

**Related docs in this folder**
- [`backlog.md`](backlog.md) — what is planned and in what order. The source of truth for intent.
- [`backend-data-rules.md`](backend-data-rules.md) — the storage, identity, uniqueness and merge rules a server must
  enforce. The source of truth for data semantics; this doc links into it rather than restating it.
- [`feature-flags.md`](feature-flags.md) — flag concepts. Iron Log has no runtime flag system (see 1.12).

---

## Part 1: Feature inventory

Five tabs: **Board**, **Daily**, **Progress**, **Program**, **Settings** (`src/App.jsx:26`). Two of them have a
second level of navigation: Board → Workout | Stretches (`components/board/BoardTab.jsx`), Daily → Supplements |
Medical (`components/daily/Daily.jsx`). Muscles is **not** a top-level tab — it is a view inside Progress
(`components/progress/Progress.jsx:144`), which the README still describes as its own tab (drift, see part 6).

### 1.1 The weekly board

| | |
|---|---|
| Code | `components/board/Board.jsx`, `Card.jsx`, `WarmUp.jsx`, `BodyWeightRow.jsx`; layout logic in `lib/logic.js` |
| Storage | `weeks/<YYYY-MM-DD>` (one document per week, Sunday-keyed) |
| Week shape | `{prog, done, skipped, moved, ph, warm, rest, order, extra}` — normalized by `normWeek` |

Seven columns. Each column shows the cards whose **displayed column** resolves to it. That resolution is a chain of
four independent features, applied in this order (`colOfSlot` → `posOf` → `shownDay`, `lib/logic.js:216`):

```
card's program day  →  moved[slot.id] overrides it  →  week.order permutes it  →  week.rest shifts it later
```

Everything in 1.2–1.6 writes one link of that chain. That is why they conflict (C1–C4).

**Check-off model.** A card is `done`, `skipped`, or open. Supersets check off per item (`done["<slot>#<idx>"]`),
either/or counts once (`isDone`, `isItemDone`). Done and skipped cards sort to the bottom of their day. Day counts
come from `tally`; `isFinished` ignores Home and Optional sections, so the sled and home cards don't gate "day
finished".

**Notices rendered above the board**, in source order: GitHub backup age (≥7 days, snoozable), local-storage-only
tip, yesterday's leftovers, uncheck/undo, move heads-up, suggestion banner, body-weight reminder.

### 1.2 Rest days

Tick Rest day on a column → that day is inserted as rest and later workouts shift one day later (`shownDay`).
Multiple rest days allowed (`restsOf` accepts an array; a bare number is the old single-rest format). Blocked when
the shift would push a non-skipped card off column 7 (`restBlocked` / `overflowSlots`); skipped cards may go and
return when the rest day is unticked. Rest columns count as complete days and contribute no volume.

### 1.3 Swap days (`week.order`)

Arrows swap a column with its neighbour for the current week only. Stored as a permutation of 1..7 and **only when
it differs from 1..7** (`isOrder`, `orderOf`). The next week starts in program order.

### 1.4 Move a card (`week.moved`)

Drag on desktop, "Move to" on phone. Stores `moved[slot.id] = programDay`. On move, `moveClashes` warns when the
same exercise would land on the same day, the day before, or the day after; the heads-up offers "move it back" and
`altDay`'s nearest clash-free column. Home cards and either/or cards never clash, and an exercise present on every
workout day (the sled) is exempt (`countsForClash`, `dailyOf`).

### 1.5 One-week cards (`week.extra`)

Two flavours, same storage: **Experiments** (`+ Only this week` and the Experiments list, `sec: 'Experiment'`) and
**Added** (`sec: 'Added'`, from `x.add`). Ids match `X-…`, max 200-char note, day 1..7 (`isExtra`). They become real
slots for that week via `extraSlots` and are part of `weekSlots`, so they participate in clash detection, counts and
suggestions — but never touch the program.

### 1.6 Back-to-back repeat suggestions

Finishing a workout column triggers `planFix(cfg, week, slots, doneCol)` — smallest change first:

1. **Rest-day move alone** (`searchOrder` with `restOnly`) if that cuts repeats.
2. **One card move** (`planCard`) — the single move with the fewest resulting repeats; ties by nearest target, then
   later day, then first card. Refuses a move that would empty a day of finish-counting cards or change the set of
   every-day exercises.
3. **A new day order** for the remaining days — wins only when strictly better than the card move.

Apply writes `week.order` and `week.rest` (order) or `week.moved` (card). There is an undo.

### 1.7 Skip, leftovers and the make-up day

- **Skip** removes a card from the week's counts without deleting it; checking it off later clears the skip
  (`setCardDone` deletes from `skipped`). Skipping **keeps** anything already logged.
- **Leftovers notice**: when yesterday's column still has cards with nothing ticked (`leftovers`), offers "skip all"
  or "move all" to a later unfinished non-rest column (`moveTargets`).
- **Make-up day** is the program's `makeup` day (normally Day 5) — a label and convention, not separate logic.

### 1.8 Logging, check-off entries and undo

| | |
|---|---|
| Code | `components/sheets/LogSheet.jsx`; `addEntry`, `updateLog`, `quickLog` in `store/useAppStore.js`; `autoLogs`, `autoEntry` in `lib/logic.js` |
| Storage | `logs/<exerciseId>` → `{entries: [...]}`, sorted by date |

One row per planned set, prefilled from the target; editing set 1 cascades until a row is edited by hand. Isometric
and Mobility log hold seconds instead of reps. "Same as last" repeats the previous session once per card and week.

**Check-offs log the plan.** Ticking an unlogged card writes an entry marked `auto: true` with note
`From check-off`, carrying `slot` and `wk`, so it appears in Progress. Logging real numbers replaces it. Unticking
removes the week's entries for that card — the check-off's *and* yours (`removeLogged`) — and shows a notice naming
what was unchecked, how many entries went, and an Undo that restores both. Uniqueness and replacement rules are
specified in [`backend-data-rules.md` §3](backend-data-rules.md).

**Entry identity**: `id` = `L<base36 time><random>`; legacy id-less entries are addressed by `'k' + hash(sameKey)`.
Edits and deletes go by id, never by position, and refuse a stale target ("That session changed meanwhile").

### 1.9 Targets, progression, stalls and back-off

All four read `logs` and all four are phase-scoped. `lib/logic.js:28–100`.

| Rule | Function | Counts check-off entries? |
|---|---|---|
| Base target = last logged weight in that phase, else program weight | `baseTargetOf` → `lastLog` | **Yes** |
| Suggest heavier (+2.5 lb under 50 lb, else +5; isometrics need 30 s holds) | `progressionOf` → `sessionsOf` | No |
| Stalled tag (best session per week, 3 training weeks, ≥2 weeks apart) | `stallOf` | No |
| Back off 5–10% (Strength 2+ reps short, or iso under range, twice running) | `backoffOf` | No |

`targetOf` = the higher of base and progression. `stallOf` returns null while `progressionOf` fires. Back-off is
shown **instead of** a stall. Explosive and Mobility are never stalled. A 1RM is reference only and does not set
targets (#65). The `lastLog`/`sessionsOf` split is conflict C7.

### 1.10 Phases

Five: Strength, Isometric, Hypertrophy, Explosive, Mobility, each with a default sets × reps and a percent of 1RM
(85/75/65/45, placeholders, editable in Settings). Timed phases are `iso` and `mob` (`isTimed`).

**Phase precedence** (`defaultPhase`, `phaseOf`, `lib/logic.js:23`), highest first:

```
week.ph[slot:idx]   this week only
cfg.phDef[slot:idx] saved slot default
cfg.exPh[exId]      exercise default, every card
item.ph             the program's value
null
```

Setting an exercise default **deletes** the slot defaults for that exercise across all programs and the library
(`setExerciseDefault`, `store/useAppStore.js:69–73`), which is what makes "replaces any slot default" true while a
slot default saved *afterwards* still wins.

### 1.11 Exercises, equipment, details, library

Per-exercise settings live in config, not in programs: `cfg.ex` (name, equipment, video), `cfg.exPh` (default
phase), `cfg.rm` (1RM), `cfg.muscleMap` (tags). One sheet edits them all — reached from a card's **Details**, from
the Log sheet (equipment and video), or from **Exercise library** on the Program tab (`lib/exerciseLibrary.js`,
`components/program/ExerciseLibrary.jsx`). `usageOf` gates deletion: a custom exercise can only go once no program,
saved version, experiment or log references it. Video links are labelled by platform (#40).

### 1.12 Sort and filter

Sort by muscle ranks a day's cards primary → secondary → rest (`muscleRank`); filter by equipment hides others
(`matchesFilter`). Neither changes day counts. View-only, nothing stored.

### 1.13 Program rotation and modes

Three modes (`programFor`, `activeProgKey`): 1 = A only; 2 = alternate by even/odd month, with a per-week manual
override stored as `week.prog`; 3 = swap every 6 months from `m3Start`/`m3First`. **The per-week override is honoured
in mode 2 only** — `activeProgKey` ignores `week.prog` in modes 1 and 3 (conflict C8).

### 1.14 Stretches

| | |
|---|---|
| Code | `components/stretches/Stretches.jsx`, `components/program/StretchLibrary.jsx`, `lib/stretches.js` |
| Storage | `stretches/main` (items), `stretchweeks/<YYYY-MM-DD>` (per-week ticks) |

A parallel seven-day board on the Board tab, identical in every mode and program. Items are tiered Every day /
Once in a while / Library only, grouped, ticked per `(day, id)`. A skipped day is counted neither for nor against
the week (`weekDaysCounted`). Own Experiments list. **Ids are slugs of the name** (`newStretchId`) — conflict C9.

### 1.15 Supplements (water log)

`components/supplements/Supplements.jsx`, `lib/water.js`, `lib/supplements.js`; storage `supplements/main`. Tap a
cup or bottle size (8 oz → half gallon) or type an amount, against a daily goal, with the last 7 days. The default
goal is derived from body weight — half your weight in pounds, in ounces (`goalFor`, `OZ_PER_LB = 0.5`), so
Supplements reads the body-weight log (C10). Each day can also carry a boost (`supp.boost[date] = {hot, mins}`):
+16 oz for a hot day and +12 oz per 30 minutes of training, added on top of the base goal by `goalFor` (so the 7-day bars
use it too). `lib/supplements.js` additionally models scheduled items
(morning/noon/night with `taken`), which the Supplements UI does not yet surface.

### 1.16 Medical

`components/daily/Medical.jsx` — a placeholder panel. Nothing stored. Backlog step 5 flags it as the highest-risk
item on the list (health-data regulation) and explicitly undecided.

### 1.17 Body weight and the weight goal

One entry per week (`body/main`, `{wk, d, w}`, first wins on import). Logged from the top of the board. The goal
(target plus optional date) lives in Settings config and renders on Progress: distance to go, progress bar, recent
weekly pace, weekly change needed (`lib/body.js`, `goalStatus`). Included in both exports.

### 1.18 Lift weight goals

`lib/liftGoal.js`, `components/progress/LiftGoal.jsx`. Per exercise, per phase, plus an `any` phase goal. A phase
goal counts only the heaviest set logged in that phase and **excludes check-off entries** (`bestLift`). Shown on the
lift card, on the matching Log sheet, and announced when a logged set reaches one.

### 1.19 Timers

`store/useTimerStore.js`. A hold countdown for isometrics that rests between sets and starts the next hold
(`holdPlan`), plus a general rest timer. Wake lock while running; vibration always on.

### 1.20 Progress

`components/progress/Progress.jsx`, `Trends.jsx`, `lib/trends.js`, `components/LineChart.jsx`. Week headline
numbers, sets per week, weight change by exercise over 8 weeks, muscles-by-week heatmap of what was actually
trained, weight-over-time per exercise (one line per phase), 12-week days-completed record (`WEEK_GOAL_DAYS = 6`).
Logged sessions are editable from here (#47).

### 1.21 Muscle map

`components/muscles/Muscles.jsx`, `MuscleChips.jsx`, `lib/muscles.js`. Front/back SVG silhouettes shaded by weekly
sets per muscle group, averaged across programs (`muscleVolumeAll`); secondary work counts as half a set. Tap a
muscle for the exercises that train it and where. Tags are editable per exercise into `cfg.muscleMap`.

### 1.22 Program editor and the program library

`components/program/Editor.jsx`, `store/editorSlice.js`, `components/sheets/SlotSheet.jsx`. Add, edit, reorder,
remove slots (single / superset / either-or) per day of either program; rename programs (`cfg.progNames`) while A
and B still drive rotation. **Create a program** copies A or B into the library, buildable without touching the
board, loadable into A or B later; copying carries slot phase defaults across to the new slot ids
(`editorSlice.js:110–116`). **Saved versions** (`library/main`) keep named copies; the built-in original is always
kept and loading a version saves the current one first.

### 1.23 Export, import and backup

| Path | Code | Covers |
|---|---|---|
| JSON data file (`DATA_FORMAT = 1`) | `buildDataFile`, `parseDataFile`, `normalizeData` | everything |
| Excel workbook, overall and per week | `buildOverallWorkbook`, `buildWeekWorkbook` | everything, via data sheets |
| CSV | `buildCsv` | sessions only, import fallback |
| GitHub backup — standalone | `lib/github.js`, `backupDirect`, `restoreFromGitHub`; `cfg.ghBackup`, default `jacgit18/iron-log` branch `data` | xlsx + json, one commit each |
| GitHub backup — Claude build | Composio MCP in `lib/export.js`/`useAppStore.js`; `cfg.backup`, default `jacgit18/iron-log-data` branch `main` | xlsx + json + changed `weeks/*.xlsx` |

Import has two modes: **Add to my data** (merge) and **Replace my data** (all-or-nothing: plan, apply, then delete
old documents only if every write succeeded, #68). The review sheet lets you pick sections (board, progress,
muscles, program, stretches, supplements, settings — `IMPORT_SECTIONS`). SheetJS is loaded lazily, only on first
Excel use. Merge semantics are specified in [`backend-data-rules.md` §4](backend-data-rules.md) and tested in
`lib/mergeRules.test.js` and `store/logData.test.js`. The two backup paths are selected by `get().mcp`
(`canBackup` / `backupNow` / `lastBackup`, `useAppStore.js:820–822`) — see C11.

### 1.24 Validation

`lib/validate.js` is the single gate: every entry point (load, import, store mutation) normalizes through it as of
#77. Bad dates reject a whole entry; bad numbers inside a valid entry become null; unknown fields are dropped;
prototype keys are refused. Limits table: [`backend-data-rules.md` §6](backend-data-rules.md).

### 1.25 Storage, offline and sync

`lib/storage.js` (`makeSaveQueue`), `store/useAppStore.js:880–883`. Two backends, chosen at runtime: the artifact
database (`window.claude.use('db')`) when available, otherwise `localStorage`. Writes are serialised per path and
coalesced to the latest value while offline; a refused write goes to a "not saved" list and is retried; permanent
errors drop that one write and surface it. Incoming snapshots are applied except for a path still being written
locally. Deletion is a `{__delete: true}` whole-document write — **there are no tombstones** (C12).

### 1.26 PWA, updates, erase, appearance, accessibility

- `lib/pwa.js`, `components/UpdateBanner.jsx` — installable, fully offline including Excel export; an update waits
  behind a banner rather than reloading mid-workout.
- **Erase data** (Settings) wipes selected sections after a confirm tap; display options, the GitHub token and
  backups already made survive (`useAppStore.js:703–708`).
- `lib/appearance.js` — light / dark / system, roomier text spacing.
- Built to WCAG 2.2 AAA: keyboard throughout, announcements, 7:1 contrast, 44×44 targets, nothing by colour alone;
  `e2e/a11y.spec.js` scans in CI. Help sheet explains the jargon.
- View state (tab, phone day) persists per browser tab (`lib/viewState.js`).

### 1.27 Feature flags

**None.** There is no flag system, no env-var gate and no kill switch. The only runtime branch is capability
detection — `window.claude` for storage (1.25) and `mcp` for the backup path (1.23) — which is not a flag: nothing
outside the code sets it. `feature-flags.md`'s TODO ("find the flag already created") should be closed as "there
isn't one". If a flag is ever wanted, the realistic shape for this app is a `localStorage` boolean read once at
startup.

---

## Part 2: Cross-cutting rules worth knowing before you touch anything

1. **Column resolution is a four-link chain** (1.1). Any feature that moves a card must go through
   `moved` / `order` / `rest`, never write a column number directly.
2. **Three exemption predicates, three different meanings.** `countsForFinish` (not Home, not Optional) gates
   "day finished". `countsForClash` (not Home, not either-or) gates repeat detection. `isSkipped` removes a card
   from counts but not from storage. Mixing them up is the easiest way to break day counts.
3. **`auto: true` is the seam between planned and real.** Progression, stalls, back-off and phase lift goals ignore
   auto entries; base targets and Progress totals include them.
4. **Local wins on merge, with one deliberate exception:** a card in the incoming `done` beats this device's
   `skipped`.
5. **No merge can express a deletion.** Anything deleted or unticked comes back if the other side still has it.
6. **Per-exercise settings live in `cfg`, not in programs**, so they survive program edits, version loads and
   library copies.

---

## Part 3: Conflict register

Status key: **by design** (resolved, rule written down) · **open** (known, unfixed) · **watch** (works now, will
break under a planned change).

### C1 — Rest days vs. moved cards vs. day 7 · by design
Adding a rest day shifts later columns right, which can push a moved card past column 7. `restBlocked` refuses the
tick when any non-skipped card would overflow, and offers to skip them for the week instead; skipped overflow cards
return when the rest day is unticked. This is also why Day 7 having exercises blocks a rest day in practice.
*Guard:* `overflowSlots` must stay in sync with `colOfSlot` — both compute the chain independently.

### C2 — Swap days vs. the suggestion engine · by design, fragile
Both write `week.order`. Applying an order suggestion overwrites manual swaps for the rest of the week with no
warning, and applying it can also rewrite `week.rest`. The engine only plans columns at or after `doneCol`, so
earlier manual swaps survive. *Risk:* a user who swaps days and then finishes a day sees their swap silently
replaced. Backlog item 12 (show the heads-up near the card) touches the same surface.

### C3 — Suggestion engine vs. rest-day overflow · watch
`planFix` can propose a `rest` array, and `searchOrder` candidates are scored on repeats. Confirm that every
candidate it emits also satisfies `restBlocked` for the cards present, or Apply can produce a layout the manual
rest-day tick would have refused. Not currently covered by a test in `lib/planOrder.test.js`.

### C4 — Move-clash warning vs. the planner's clash rule · by design
Two clash definitions coexist. `moveClashes` (manual move) warns about same-day duplicates for **every** card type,
and about neighbouring days only for cards that pass `countsForClash`, with every-day exercises exempted.
`planCard` / `planOrder` only ever count neighbouring-column repeats. So a manual move can be warned about when the
planner would not care, and vice versa. Deliberate — the manual warning is more cautious — but the two must be
edited together.

### C5 — Check-off vs. hand-logged entry, same card and week · by design
At most one check-off per `(exercise, slot, wk)`. A hand-logged session replaces the check-off; it never replaces
another hand-logged session. "Same as last" refuses when a non-auto entry already exists. On merge, an incoming
hand-logged session removes the local check-off — the only case where a merge deletes a local entry. Full rules:
[`backend-data-rules.md` §3](backend-data-rules.md). Tests: `logData.test.js` F3–F8.

### C6 — Uncheck vs. skip, for entries you logged yourself · by design
Unchecking removes the week's log entries for that card, yours included (`removeLogged: true`), with an Undo.
Skipping keeps them. Two adjacent controls with opposite consequences for real data — the Undo notice is the only
thing making this safe, so do not regress it.

### C7 — Check-off entries move the base target but nothing else · open question
`baseTargetOf` uses `lastLog`, which does **not** filter `auto`, while `progressionOf`, `stallOf`, `backoffOf` and
`bestLift` all use filtered helpers. The comment above `sessionsOf` explains the exclusion for the latter group. In
the common case this is harmless (a check-off logs the target, so the target does not move), but after a phase
change, an edited card weight or an imported check-off, a never-actually-performed weight becomes the anchor for the
next session. *Decide:* is this intended? If not, `lastLog` needs an auto filter and several tests will move.

### C8 — Per-week program override vs. modes 1 and 3 · open
`week.prog` is stored by the manual A/B switch but `activeProgKey` honours it **only in mode 2**. Switching mode
after overriding a week silently discards the override, and the value stays in storage. Merge rules fill `prog` only
when the local week has none, so a stale `prog` can also arrive from another device and sit unused.

### C9 — Stretch ids are name slugs · open (listed in `backlog.md` Bugs)
`newStretchId` slugs the name, so deleting a stretch and re-adding one with the same name resurrects its old
check-offs in earlier weeks. The same identity choice orphans stretch check-offs on merge import when a stretch
matches by name but carries a different id. Fix is an opaque id plus a name index; it is a data migration.

### C10 — Water goal depends on the body-weight log · by design, undocumented in the UI
`goalFor` derives the default daily ounces from the latest body weight. A week with no body weight falls back to
`DEFAULT_GOAL_OZ = 64`, so the goal can appear to move on its own after a weigh-in. Worth a one-line explanation in
the Supplements panel.

### C11 — Two GitHub backup implementations · by design, scheduled for removal
Standalone uses the REST API, `cfg.ghBackup`, `jacgit18/iron-log` branch `data`. The Claude build uses the Composio
connector, `cfg.backup`, `jacgit18/iron-log-data` branch `main`, and additionally writes per-week workbooks. They
have separate repos, separate last-backup timestamps and separate error strings; `canBackup`, `backupNow` and
`lastBackup` route by `mcp`, and merge import preserves both keys independently (`settingsSlice.js:75`). A change to
"backup" that only touches one path is a half-change. Backlog step 4 removes both once the backend lands.

### C12 — Merge has no tombstones · open, blocks multi-device
No merge can express a deletion, so anything deleted or unticked on one device returns from another. Documented as
the stated limit of every merge rule. The backend must store `deletedAt` and let a newer deletion win.

### C13 — Last-writer-wins documents vs. per-entry edits · open, blocks multi-device
`logs/<exerciseId>` is one whole-document write holding every entry for that exercise. Two devices logging different
exercises are fine; two devices logging the same exercise lose one session. Mitigated today only by the save queue's
local-copy-is-newer rule. Fix is per-entry rows plus `updatedAt`, which is also what C14 needs.
*Memory note:* this is the backend-schema risk already recorded for this project.

### C14 — No `updatedAt` or schema version on entries · open
Stale-write detection exists in the UI ("That session changed meanwhile") but has nothing to compare on the server.
`DATA_FORMAT` versions the file, not the rows. The `entry-timestamps` branch appears to be addressing this — fold
the outcome back into this entry and into `backend-data-rules.md` §7.

### C15 — Excel round-trip loses `auto` when an entry also has a note · open (bug list)
`noteOf` in `lib/export.js` writes one note column, so an entry with both a user note and `auto: true` re-imports as
hand-logged. That silently promotes a planned session into one that drives progression and stalls (C7's neighbours).

### C16 — CSV export vs. formula injection and exercise identity · open (bug list)
A leading `=`, `+`, `-` or `@` in a note or exercise name executes as a formula in Excel. CSV import also drops
`exId`, so a renamed custom exercise duplicates instead of matching. CSV is import-fallback-only by design, which
limits the blast radius but does not remove it.

### C17 — Rest timer `0` means two different things · open (bug list)
The manual Rest button uses `restSecs() || 90`, so a Rest setting of `0` runs 90 s, while hold timers treat `0` as
"no rest". Pick one meaning.

### C18 — Wake lock can leak · open (bug list)
In `store/useTimerStore.js`, a `stop()` or restart landing before the lock request resolves leaves the lock held.
Track the pending promise.

### C19 — `bestLift` date vs. entry order · open (bug list)
`bestLift` assumes date order. `addEntry` sorts, but import paths append, so an imported history can show the wrong
date on a lift record — and lift-goal achievement messages read from it.

### C20 — Exercise default phase vs. saved slot defaults · by design, order-dependent
Setting `cfg.exPh` deletes matching `cfg.phDef` keys across programs and the library. Saving a slot default
*afterwards* wins again. So the outcome depends on the order the two sheets were used, which the README states and
`useAppStore.test.js:629–633` pins. Keep that test.

### C21 — Program edits vs. existing check-offs · by design
Changing a ticked card can leave check-offs under an exercise the card no longer has; `autoLogs` sweeps those on the
next untick, unticking drops check-offs for removed exercises, and changing a ticked card's phase redoes its
check-off in the new phase. Logging the other option of an either/or drops the first option's check-off.

---

## Part 4: Planned work that will create new conflicts

From [`backlog.md`](backlog.md). Each of these collides with something above; note it here when the work starts.

| Planned | Collides with | Why |
|---|---|---|
| Backend + Google login (step 3) | C12, C13, C14 | Needs tombstones, per-entry rows and versions before it can be safe on two devices |
| Remove GitHub backup and JSON import (step 4) | C11, 1.23 | Two implementations and the only full-detail backup both disappear; JSON import must not go before the backend can restore |
| Starter programs, days-per-week choice | 1.1, 1.13, C8 | The board assumes a fixed 7-day layout and an A/B rotation |
| lb/kg toggle (item 62) | 1.9, 1.24, every stored weight | Must settle a canonical unit before data reaches a database; `round`/`step` thresholds (50 lb, 2.5/5 lb) are pound-shaped |
| Per-set ticks in the Log sheet (item 38) | 1.8, C5, C15 | Changes the shape of a logged entry, so `sameKey`, merge and the Excel sheets all move |
| Drag to reorder in the Program editor (item 51) | 1.22, C20 | Slot ids encode position for unnamed slots (`<owner>-d<day>s<position>`); reordering must not re-key `phDef` |
| Plateau/deload hint (item 75 → step 5) | 1.9, C7 | A fourth rule over the same session history; decide its precedence against stall and back-off up front |
| Medical records + AI assessment | 1.16 | Health-data regulation; explicitly undecided |
| Auto-progression suggestions (multi-user list) | 1.9 | Overlaps `progressionOf`; risk of two voices suggesting different weights |

---

## Part 5: Test coverage of the conflict-prone parts

Where the rules above are pinned, so a change that breaks one fails loudly:

| Area | Tests |
|---|---|
| Board reorder, no exercise lost or duplicated | `lib/planOrder.test.js`, `lib/moveCard.test.js`, `store/useAppStore.test.js` |
| Check-off / log uniqueness (C5, C6) | `store/logData.test.js` (F1–F8, M1) |
| Merge rules (C12) | `lib/mergeRules.test.js`, `store/logData.test.js` |
| Targets, progression, stalls, back-off (1.9, C7) | `lib/logic.test.js` |
| Phase precedence (C20) | `store/useAppStore.test.js`, `store/editorSlice.test.js` |
| Validation limits (1.24) | `lib/validate.test.js` |
| Export/import round trip (C15, C16) | `lib/workbookRoundTrip.test.js`, `lib/dataFormat.test.js`, `lib/excelImport.test.js`, `lib/export.test.js` |
| Data format pinned | `src/test/fixtures/iron-log-data.v1.json` — if its test fails, bump the format number, don't edit the fixture |
| Browser and accessibility | `e2e/board.spec.js`, `e2e/progress.spec.js`, `e2e/a11y.spec.js` |

Gaps worth filling: C3 (suggestion output vs. rest-day overflow), C8 (mode switch discarding `week.prog`), stretch
identity (C9).

---

## Part 6: Maintaining this document

**When to update.** In the same PR as the change, not later:

1. A feature is added, removed or renamed → its row in part 1, plus the tab inventory if navigation moved.
2. A storage path, config key or entry field changes → part 1's table for that feature **and**
   [`backend-data-rules.md`](backend-data-rules.md).
3. Two features start or stop interacting → add, edit or close a conflict entry. Closing one means moving it to the
   drift log below with the PR number, not deleting it.
4. A bug from `backlog.md`'s Bugs list is fixed → close the matching C-entry (C9, C15–C19 map onto it).
5. Either way: bump the **Last verified against** commit in the header.

**Numbering.** C-numbers are permanent. Never reuse one; closed entries move to the log below.

**Verification pass.** Every few PRs, or before starting a step in the backlog, re-read `lib/logic.js`,
`lib/export.js` and `store/useAppStore.js` against part 2 — those three files hold most of the cross-cutting rules
and they are where drift shows up first.

### Drift found and not yet fixed

- `README.md` describes **Muscles** as its own tab; it is a view inside Progress
  (`components/progress/Progress.jsx:144`). The tab list is Board / Daily / Progress / Program / Settings.
- `feature-flags.md` ends with a TODO to find an existing flag. There is none (1.27); close the TODO.
- `lib/supplements.js` models scheduled supplements (morning/noon/night, `taken`) that no UI exposes. Either a
  planned feature or dead code — decide and record it.

### Closed conflicts

_(none yet — the first entry goes here when a C-number is closed)_
