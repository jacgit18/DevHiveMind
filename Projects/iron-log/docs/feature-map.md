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
- [[Projects/iron-log/docs/backlog|backlog]] — what is planned and in what order. The source of truth for intent.
- [[backend-data-rules]] — the storage, identity, uniqueness and merge rules a server must
  enforce. The source of truth for data semantics; this doc links into it rather than restating it.
- [[feature-flags]] — flag concepts. Iron Log has no runtime flag system (see 1.12).

---

## Part 1: Feature inventory

Five tabs: **Board**, **Daily**, **Progress**, **Program**, **Settings** (`src/App.jsx:26`). Two of them have a
second level of navigation: Board → Workout | Stretches (`components/board/BoardTab.jsx`), Daily → Supplements |
Medical (`components/daily/Daily.jsx`). Muscles is **not** a top-level tab — it is a view inside Progress
(`components/progress/Progress.jsx:144`), which the README still describes as its own tab (drift, see part 6).

### Audience at a glance (2026-10-10)

Who sees each feature. **Public** means no flag: every user. **Admin** means `'admin'` in `FEATURES` (`src/features.ts`, see 1.27). Add a row for every new feature; a feature that is not public must say so here.

| Feature | Audience | Flag |
|---|---|---|
| 1.1 The weekly board | Public | none |
| 1.2 Rest days | Public | none |
| 1.3 Swap days (`week.order`) | Public | none |
| 1.4 Move a card (`week.moved`) | Public | none |
| 1.5 One-week cards (`week.extra`) | Public | none |
| 1.6 Back-to-back repeat suggestions | Public | none |
| 1.7 Skip, leftovers and the make-up day | Public | none |
| 1.8 Logging, check-off entries and undo | Public | none |
| 1.9 Targets, progression, stalls and back-off | Public | none |
| 1.10 Phases | Public | none |
| 1.11 Exercises, equipment, details, library | Public | none |
| 1.12 Sort and filter | Public | none |
| 1.13 Program rotation and modes | Public | none |
| 1.14 Stretches | Public | none |
| 1.15 Supplements (water log) | Public | none |
| 1.16 Medical | Public | none |
| 1.17 Body weight and the weight goal | Public | none |
| 1.18 Lift weight goals | Public | none |
| 1.19 Timers | Public | none |
| 1.20 Progress | Public | none |
| 1.21 Muscle map | Public | none |
| 1.22 Program editor and the program library | Public | none |
| 1.23 Export, import and backup | Public | none |
| 1.24 Validation | Public | none |
| 1.26 PWA, updates, erase, appearance, accessibility | Public | none |
| 1.25 Storage, offline and sync | Public on Cloud Run (syncing on); the build-time flag `VITE_API_SYNC` / `ironlog:flag:apiSync` is separate (1.27) | `apiSync` |
| Account pages: sign-in, landing page, delete my data, blank start and first-run prompt | Public | none |
| 1.28 Grocery list (Daily tab) | **Admin** | `grocery` |
| **Admin-only features** | **Groceries (1.28)** | `grocery` in `FEATURES` |

### 1.1 The weekly board

| | |
|---|---|
| Code | `components/board/Board.jsx`, `Card.jsx`, `BodyWeightRow.jsx`; layout logic in `lib/logic.js` |
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
A moved card shows at the **top** of its new day (`currentLayout` puts cards with a `moved` entry first; the others keep program order). Derived, nothing stored; moving it back returns it to its program position. Conflicts: none with the board/log write paths (display order only).

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
specified in [[backend-data-rules]] §3.

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
Excel use. Merge semantics are specified in [[backend-data-rules]] §4 and tested in
`lib/mergeRules.test.js` and `store/logData.test.js`. The two backup paths are selected by `get().mcp`
(`canBackup` / `backupNow` / `lastBackup`, `useAppStore.js:820–822`) — see C11.

### 1.24 Validation

`lib/validate.js` is the single gate: every entry point (load, import, store mutation) normalizes through it as of
#77. Bad dates reject a whole entry; bad numbers inside a valid entry become null; unknown fields are dropped;
prototype keys are refused. Limits table: [[backend-data-rules]] §6.

### 1.25 Storage, offline and sync

`lib/storage.js` (`makeSaveQueue`), `store/useAppStore.js:880–883`. Two backends, chosen at runtime: the artifact
database (`window.claude.use('db')`) when available, otherwise `localStorage`. Writes are serialised per path and
coalesced to the latest value while offline; a refused write goes to a "not saved" list and is retried; permanent
errors drop that one write and surface it. Incoming snapshots are applied except for a path still being written
locally. Deletion is a `{__delete: true}` whole-document write — **there are no tombstones** (C12).

**Third backend, behind the flag (Phase D, `src/sync/`):** the API. `createApiDb()` has the same `doc(path).set / delete /
onSnapshot` and `collection(name).onSnapshot / get` shape the store already uses, so the store, the queue and the protected
board and log write paths are unchanged. A save is kept in the browser first (the outbox) and only then sent; sending compares
the document with the phone's copy of the server's rows (the mirror) and posts the smallest list of commands. An unreachable
server, a sign-in problem or an out-of-date app **pauses** the write and retries with backoff; it is never dropped. A write the
server refuses goes to a quarantine that survives reloads. Pulls run on start, on focus and when the network returns, and
every minute while visible; the first snapshot waits for the first pull. Deletions are tombstones on the server, so C12 no
longer holds for this backend. Conflicts between phones follow ADR 003 (D4): this device wins a stale edit, a card ticked
elsewhere beats a skip, a delete never wins silently over a later edit, one check-off per card and week. An app older than the
API's `MIN_CLIENT_VERSION` (the unix time of its commit) is refused with 426: it stops sending, keeps its changes, and the
board shows an "Update needed" notice with a Reload button (D5).

**Sync screen (D6, flag on only):** Settings → **Sync** (top of the right column) says in words what sync is doing (synced, syncing,
offline, server not answering, sign-in needed, too old, loading, storage full), with **Sync now**. **Not sent** lists the writes the
server would not take, each with the reason and time, and **Try again** (refused for a path with a newer unsent document), **Download**
(JSON with the whole document) and **Discard** (two presses, only the user can do it); a refused write is never dropped. **Notes** lists
what happened because another device went first, with **Clear**. A notice under the header appears when changes are waiting because the
server cannot be reached, or when anything was set aside; with sync on, the older "Not saved… storage is full" notice is not shown (it
would be wrong: nothing is lost on reload).

**Accounts (B2e, flag on only):** Settings → **Account** (above Sync) says who is signed in (`GET /api/me`) with **Sign out**, or "Not signed in"
with **Sign in with Google**; a failed check says "Could not check", never "not signed in". When the server answers 401 a card under the
header says "Sign in to sync" (changes are kept on this device) instead of an endless "Loading…". The first account to sync owns the
device's data (`localStorage` `ironlog:sync/owner`). If a different account signs in and the device holds data or unsent changes, sync
pauses with reason **account** (nothing pulled or sent) and a card offers **Download this device's data** (everything it held, incl. unsent
and set-aside), **Wipe it and continue** (two presses, forgets mirror + outbox + set-aside list, then reloads), or **Sign out**. A device
with no data is handed to the new account silently. Conflicts: none with the board/log write paths (sync-only layer).

**Upload of data from before accounts (Phase E, flag on only):** a card under the header, "Upload this device's data?", appears when the browser holds old per-path documents (`ironlog:logs/*`, `weeks/*`, `body/main`, ...), the account is signed in and caught up, and this device holds nothing of the account yet. **Upload** sends every row in one `import-legacy` request (creates only, run by the server in one transaction, only for an account that has never held a row, all or nothing); **Not now** hides it until the next reload. Entries with old hash ids that collide across exercises get `-2`, `-3` (input order); a check-off that a hand-logged session already replaces, or a second check-off for one card and week, is left out; the GitHub backup settings never leave the device. Once anything new is logged (or the account has data) the card instead says the old data cannot be added automatically (**Got it** remembers). The old documents are never deleted; Settings → Sync notes when the upload happened. Conflicts: none with the board/log write paths (it only creates rows, through the same handlers).

**Upload from an export file (Phase E, flag on, signed in):** Settings → Account → **Upload from an export file** (the way from another address, such as the old GitHub Pages copy, whose browser storage a new address cannot see). **Choose export file…** reads an Iron Log JSON (same checks as Import: not JSON, not an Iron Log file, a newer format and an empty file each say so), shows what it holds and when it was exported, then **Upload to my account** (or **Cancel**) sends it through the same all-or-nothing `import-legacy` road, with the same id and check-off rules. Offered only while the account is empty and this device holds nothing of it; otherwise the section says to use Export & import, which merges. Conflicts: Export & import (1.23) merges into an account that has data; this one is all-or-nothing into an empty one.

**Delete my data and the legal pages (Phase F, flag on, signed in):** Settings → **Delete my data** (after Erase data). *Export all data first* downloads a copy. **Erase everything in my account** (type `ERASE`) and **Delete my account** (type `DELETE`) each call the server, which removes the rows **for good** (migration 010: `erase_my_data()` / `delete_my_account()`, owner-run, acting only on the signed-in user; not tombstones, so no weight or note stays, and the edit-history copies and refusal records go too). The account action also removes the users row and Better Auth's user, sessions, Google tokens and verification records. On success this device forgets its copy, unsent changes and device owner, removes the browser's pre-accounts documents, marks the upload card dismissed (erased data is never offered again) and reloads. If the server cannot do it, nothing local changes and sending carries on. Other phones of the account: the pull feed carries `users.data_epoch`, which goes up on an erase; a phone holding a different one drops its copy and keeps its cursor (everything of the new epoch has a higher seq), so it shows the empty account at its next pull. Erase and delete share a limit of 5 an hour per user. Backups age out within 30 days (the retention that the backup bucket enforces). The existing selective **Erase data** panel (checkboxes, soft deletes through normal sync) is unchanged. **Legal pages:** `public/privacy.html` and `public/terms.html` (static files, linked from the sign-in card, the Account panel and Delete my data); operator Joshua Carpentier as an individual, contact joshuaxcarpentier@gmail.com, minimum age 16; a test fails if the retention and session numbers in the policy stop matching the backup script and the sign-in lifetime. Conflicts: none with the board/log write paths.

**Landing page and the gate (Phase F, flag on, i.e. the deployed build):** a visitor this browser has never seen signed in gets a landing page (`src/components/Landing.tsx`: what Iron Log is, a screenshot, *Sign in with Google*, "signing in creates your account the first time", Terms and Privacy links, free beta, 16 and over) **instead of the app**; nothing of the app is mounted or synced behind it (`src/main.jsx`, `src/lib/gate.ts`). Rules: syncing off (GitHub Pages) → the app, always, no request to the server. A browser that has seen a signed-in session before (`ironlog:session/known`) → the app at once, no check and no wait, so it still opens instantly and offline; if its session has expired the app shows the *Sign in to sync* card and keeps the data reachable. Anyone else → one `/api/me` question: signed in → remember it and open the app; a definite 401 → the landing page; could not tell (offline) → the app if the device already holds an account's data (`sync/owner`), else the landing page with an offline note. **Signing out on purpose** (Settings → Account, or the other-account card), and **deleting the account**, forget the session and reload to the landing page; the device's own data stays (a landing page hides the screen, it is not a lock on browser storage). Conflicts: sign-out used to leave the app with a sign-in card; it now ends at the landing page.

**A new account starts with a blank board (Phase F, flag on; [[016-new-account-starting-state]]):** in sync mode, a program (A or B) with no saved document is the **blank program** (seven empty days, `BLANK` in `src/lib/data.ts`) when the account has **no log entries at all**, and the built-in plan (`BUILTIN`) when it has any. This is decided by `settleStart` in `src/store/useAppStore.ts` once both the programs and the logs have loaded, whichever arrives last, in both directions: a device that gets the account's logs late switches from blank back to the built-in plan. A saved program, and one a new account has just edited (pending or saved), is never replaced. Nothing is written to any account to do this, so accounts that already exist see exactly what they saw before. Local mode (no sync, e.g. GitHub Pages) is unchanged. **First-run prompt (ADR 016 step 3):** when the week has no exercise cards at all (a new account, or one that removed every card), the Board shows a *Build your first workout* notice above the body-weight row (`src/components/board/FirstRun.tsx`): *Add your first exercise* opens the same add-exercise sheet as a day's *+ Add exercise* (`openAddToProgram(1)`), and a note points at the per-day buttons and the Program tab. Any board with at least one card is unchanged. **Stretches follow the same rule (ADR 016, extended 2026-10-09):** in sync mode a stretch list with no saved document (`stretches/main`) is **empty** when the account has no log entries **and** no stretch-week records (`stretchweeks/*`), and the default routine (the owner's 19 stretches) when it has either. `settledStretches` in `src/store/useAppStore.ts` decides it in the same update that marks the list, the logs and the stretch weeks ready (new `ready.strHist`, fed by a `stretchweeks` collection listener), in both directions; a saved or just-edited list is never replaced; nothing is written to any account. An empty list shows *Build your stretch routine* on the Stretches view (`src/components/stretches/StretchFirstRun.tsx`): *Add your first stretch* opens the same new-stretch sheet as *+ New stretch* in the Program tab. Local mode is unchanged. Conflicts: none with the board/log write paths.

**Not yet done (ADR 016 steps 2 and 4):** the "Original program · built in" row still offers the built-in plan; the personal backup repo names are still in `export.ts`. Conflicts: none with the board/log write paths (no card is created, moved or removed by it; the reorder and log tests are unchanged).

### 1.26 PWA, updates, erase, appearance, accessibility

- `lib/pwa.ts`, `components/UpdateBanner.tsx`, `lib/updateIdle.ts` — installable, fully offline including Excel export; a new version is applied by itself once the app is idle (no timer, sheet, import, unsaved write or focused text field, 15 s without a tap; [[018-auto-apply-updates-when-idle|ADR 018]], audience: everyone), and waits behind a *Reload now / Later* banner while it is in use. Conflicts: none with the board/log write paths.
- **Erase data** (Settings) wipes selected sections after a confirm tap; display options, the GitHub token and
  backups already made survive (`useAppStore.js:703–708`).
- `lib/appearance.js` — light / dark / system, roomier text spacing.
- Built to WCAG 2.2 AAA: keyboard throughout, announcements, 7:1 contrast, 44×44 targets, nothing by colour alone;
  `e2e/a11y.spec.js` scans in CI. Help sheet explains the jargon.
- View state (tab, phone day) persists per browser tab (`lib/viewState.js`).

### 1.27 Feature flags

**One: syncing through the API** (`src/sync/flag.ts`). A release flag, **off by default**. On, the store's database handle is
backed by the API (1.25) instead of the browser's own storage. Two ways to turn it on: build time (`VITE_API_SYNC=true`), or
in one browser (`localStorage` `ironlog:flag:apiSync` = `true`, or `false` to force it off against a build that has it on).
In a development build there is no dev user until you choose one (landing page skip button, or `?devUser=dev`); the choice is `ironlog:flag:apiUser` (a JSON string). Removed when syncing
is trusted and the stand-in storage goes (backlog step 4). `window.claude` (the host database) still takes precedence over
the flag, and `mcp` for the backup path (1.23) is capability detection, not a flag.

**Admin-only features (2026-10-09):** `src/features.ts` lists features by audience (`admin`, `all`, `off`); `useFeature(name)` is the check. An admin is an account on the server's `ADMIN_EMAILS` list; `/api/me` returns `account.isAdmin`; `server/admin.ts` has `requireAdmin` for routes. One feature is registered: `grocery` (1.28). Details in [[feature-flags]]. Conflicts: none with the board/log write paths.

### 1.28 Grocery list (Daily tab, admin only, device-only)

Daily → **Groceries** (`components/grocery/Grocery.tsx`, store in `store/grocerySlice.ts`, pure logic in `lib/grocery.ts`, [[019-grocery-list-device-only|ADR 019]]). Audience: **admin** (`grocery` in `FEATURES`); no API route, so no `requireAdmin`.
- **Catalogue** (`grocery/main`): stores in order, items `{id, n, store, qty, cents, once}`. **Month** (`grocery/YYYY-MM`): `lines {id: {got, qty, cents}}`, `pulled [id]`. Both stay in the browser's storage and are not in the sync (`parsePath` is null for them). A month with no document is the regular items, nothing ticked: that is the monthly refresh.
- Rows are grouped by store (then *Anywhere*); each has a tick, a count, a unit price and the line total. The summary line gives got of count, spent, expected and items without a price; each store card shows its own. Month arrows go back (never past this month). Groceries is the first button of the Daily section row; Supplements still opens first. Store drop-downs offer your stores, then suggested ones not yet used (`SUGGESTED_STORES`).
- *Edit* adds items (name, store, count, price, occasional), renames, moves between stores, removes, and manages stores (a store goes only when empty). **Occasional** items are not on a month's list; *Add to this month* pulls one on, *Take off* removes it.
- A price typed in the current month becomes the item's usual price; an old month's edit does not. Ticking records the count and price paid in that month. Totals use whole cents.
- In the data file (`grocery`, left out when empty, and only for an admin), import (Add keeps what is here, matching items by name and store and mapping the file's month lines to them; Replace matches the file) and both backups. *Delete my data* clears the device's list, and so does the device being handed to another account (a plain sign-out and back in as the same account keeps it).
- Conflicts: none with the board/log write paths. With syncing on, the list is per device (a phone and a laptop differ until the follow-up in backlog adds sync).

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
[[backend-data-rules]] §3. Tests: `logData.test.js` F3–F8.

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

### C9 — Stretch ids are name slugs · open (listed in [[Projects/iron-log/docs/backlog|backlog]] Bugs)
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
the outcome back into this entry and into [[backend-data-rules]] §7.

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

From [[Projects/iron-log/docs/backlog|backlog]]. Each of these collides with something above; note it here when the work starts.

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

1. A feature is added, removed or renamed → its row in part 1, plus the tab inventory if navigation moved. A new feature also gets a row in "Audience at a glance" (admin until released); flipping it to `'all'` updates that row.
2. A storage path, config key or entry field changes → part 1's table for that feature **and**
   [[backend-data-rules]].
3. Two features start or stop interacting → add, edit or close a conflict entry. Closing one means moving it to the
   drift log below with the PR number, not deleting it.
4. A bug from [[Projects/iron-log/docs/backlog|backlog]]'s Bugs list is fixed → close the matching C-entry (C9, C15–C19 map onto it).
5. Either way: bump the **Last verified against** commit in the header.

**Numbering.** C-numbers are permanent. Never reuse one; closed entries move to the log below.

**Verification pass.** Every few PRs, or before starting a step in the backlog, re-read `lib/logic.js`,
`lib/export.js` and `store/useAppStore.js` against part 2 — those three files hold most of the cross-cutting rules
and they are where drift shows up first.

### Drift found and not yet fixed

- `README.md` describes **Muscles** as its own tab; it is a view inside Progress
  (`components/progress/Progress.jsx:144`). The tab list is Board / Daily / Progress / Program / Settings.
- [[feature-flags]] ends with a TODO to find an existing flag. There is none (1.27); close the TODO.
- `lib/supplements.js` models scheduled supplements (morning/noon/night, `taken`) that no UI exposes. Either a
  planned feature or dead code — decide and record it.

### Closed conflicts

_(none yet — the first entry goes here when a C-number is closed)_


**Warm-up moved to the Stretches tab (2026-10-10):** the Warm-up block (`src/components/stretches/WarmUp.tsx`, list still `cfg.warmup`) now sits at the top of each Stretches day, under *Skip day*, and is gone from the workout Board. Its ticks are stored in the stretch week's `done` as `"<day 0-6>:warm:<id>"` (`warmKey` in `src/lib/stretches.ts`), so they are per weekday, not per program day, and do not count toward the day's stretch tally. It is hidden while the stretch list is empty (new account). `setWarm` and the old `week.warm` ticks are no longer written; old `week.warm` data is kept and still exported/synced but not shown.
