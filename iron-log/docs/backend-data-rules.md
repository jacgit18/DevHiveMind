# Iron Log: data rules for a backend

What the client enforces today, written down so a server can enforce it authoritatively. Client checks are UX only; the server must re-validate everything. Source of truth in code: `src/lib/validate.js` (limits and shapes), `src/lib/export.js` (`mergeEntries`, `mergeWeek`, `normalizeData`, `normConfig`), `src/lib/logic.js` (`normWeek`), `src/lib/storage.js` (save queue), `src/store/useAppStore.js` (loaders, `addEntry`, `updateLog`, `quickLog`).

## 1. Today's storage model (documents)

One document per path, whole-document writes, last writer wins. A backend should keep these boundaries but store the repeated items as rows.

| Path | Shape | Backend suggestion |
|---|---|---|
| `config/main` | settings object | one row per user |
| `logs/<exerciseId>` | `{entries: [...]}` | **one row per entry**, unique on `(user, id)` |
| `weeks/<YYYY-MM-DD>` | week object | one row per user and week |
| `stretchweeks/<YYYY-MM-DD>` | stretch week | one row per user and week |
| `body/main` | `{entries: [{wk, d, w}]}` | one row per entry, unique on `(user, wk)` |
| `library/main` | `{items: [...]}` | one row per saved version, unique on `(user, id)` |
| `experiments/main`, `stretches/main`, `supplements/main` | lists / water log | rows keyed by `id`; water by `(user, date)` |
| `programs/A`, `programs/B` | program body | one row per user and key |

The `logs`, `body`, `library` and `experiments` documents carry `schema: 1` (`SCHEMA_VERSION` in `validate.js`); bump it when a stored shape changes so a migration knows what it reads. Deletion today is a `{__delete: true}` write. Use soft delete (`deletedAt`) on the server so a merge can tell "removed" from "never seen".

## 2. Identity

- Every log entry has a string `id` (`L` + time + random for new ones).
- Entries saved before ids existed are identified by `'k' + hash(sameKey(entry))`, a hash of their values. **Editing such an entry stores that hash as its id**, so an older copy in a backup is still recognised as the same session. Migration: assign each legacy entry its hash id on import.
- Every session and body-weight entry the app writes carries `updatedAt`, an ISO date-time set when the user adds or edits it (check-offs get one when created). It is not part of the content match, so it never makes two copies of a session look different. Entries from older data or Excel files have none. Server: treat it as the client's claim and also keep your own server timestamp.
- Edit and delete address an entry **by id, never by position**, and are refused when the entry changed meanwhile ("That session changed meanwhile"). The server should reject a stale write (compare `updatedAt` or a version).
- `sameKey` (the content match) covers date, phase, weight, sets, reps, hold, per-set detail, note, auto flag, slot, and `wk` when it differs from the date's week. Numbers compare as numbers (`''` and null are equal).

## 3. Uniqueness rules

1. **One check-off per card and week.** A check-off is an entry with `auto: true`, `slot` and `wk`. At most one per `(exercise, slot, wk)`.
2. **A hand-logged session replaces the check-off** for the same card and week (the real numbers supersede the planned ones). It does not replace another hand-logged session.
3. **"Same as last" logs once per card and week**: refused when a non-auto entry exists for `(exercise, slot, wk)`.
4. **One body-weight entry per week** (`wk`); first one wins on import.
5. Stretch and supplement items: unique `id`; stretch names unique case-insensitively on merge; extras unique by `id`.

Tests for rules 1 to 3 and 7: `src/store/logData.test.js` (F3, F3b, F4, F5, F7, F8).
6. Experiments, library versions, week "extra" cards: unique `id`. Slot ids inside a program are unique.
7. Logging the other option of an either/or card drops the first option's check-off. Unticking a card drops check-offs under an exercise it no longer has. Changing a ticked card's phase redoes its check-off in the new phase.

## 4. Merge rules (import "add", multi-device)

Each rule below has a test: `src/lib/mergeRules.test.js` (pure merges) and `src/store/logData.test.js` (import through the store, tests F1 to F3b, M1).

**Entries** (`mergeEntries`)
- An incoming entry is added only if its id **and** its content key are both new. Same content under another id: not added.
- **Same id:** this device's copy stays, unless both copies have an `updatedAt` and the incoming one is later; then it replaces this one (an edit made elsewhere after this copy). A copy without a timestamp never replaces anything and is never replaced.
- An incoming **check-off** is not added when anything exists for the same card and week (hand-logged or check-off).
- An incoming **hand-logged session removes the local check-off** for the same card and week. This is the only case where a merge removes a local entry. Two different hand-logged sessions for one card and week both stay.
- An entry with no `slot` or `wk` never clashes with a check-off.
- Duplicates inside the incoming list are added once. Result sorted by date. Inputs are not mutated.

**Weeks** (`mergeWeek`), result is a normalized week
- `prog`, `rest`, `order`, `restOn`: filled only when this device has none; this device's value stays otherwise.
- `moved`, `ph`, `warm`: merged per key, this device's value wins.
- `extra`: union by id, this device's copy wins.
- `done` and `skipped`: union. A card in `done` is removed from `skipped`, so **a card ticked on the other side beats this device's skip**. That is a deliberate exception to "this device wins": the workout was done.

**Other sections** (merge import through the store)
- Body weight: this device's entry for a week stays; a new week is added.
- Stretches: added unless the id exists or the name matches case-insensitively. Experiments and extras: by id. Stretch weeks merge like weeks.
- Supplements: a water day this device already has stays as it is; other days are added. Items by id; `taken` merged with this device winning.
- Config: only these keys, and only filling keys that are missing locally: `rm`, `phDef`, `exPh`, `ex`, `muscleMap`, `rxOverride`, `progNames`. Other settings (rest, percentages, mode, goals) are not touched by a merge. Saved versions are added by id; an edited program from the file is saved as a new saved version unless an identical one exists.

**Limit of every merge above: it cannot express a deletion.** There are no tombstones, so anything this device deleted or unticked comes back when the other side still has it. A backend must store deletions (`deletedAt`) and let a newer deletion beat an older copy.

**Replace import**: all-or-nothing. Plan everything first, apply, and delete old documents only if every write of the new data succeeded.

## 5. Sync and conflicts

- Every incoming snapshot is applied, **except** for a path this device is still writing: the local copy is newer and is kept.
- Writes per path are serialised and coalesced to the latest value while offline.
- A refused write stays in a "not saved" list and is retried; permanent errors drop only that write and are surfaced.
- Server equivalent: per-row `updatedAt` plus optimistic concurrency; an offline client sends its queued rows and handles a conflict by re-fetching and re-applying the merge rules in section 4.

## 6. Validation limits (`src/lib/validate.js`)

| Field | Rule |
|---|---|
| Date (`d`, `wk`) | `YYYY-MM-DD`, a real calendar day, year 1970 to 2200. A bad date rejects the whole entry. |
| Set weight | number, 0 up to but not including 5000 lb |
| Reps | number, 0 to 1000 |
| Hold | number, 0 to 86400 s |
| Sets count `s` | integer, 0 to 200; at most 200 entries in `sets` |
| Phase | one of `strength`, `iso`, `hyp`, `exp`, `mob`, or null |
| Note | string, up to 500 characters |
| Entry id, slot id | string, 1 to 100 characters, no prototype keys |
| `updatedAt` | ISO date-time string, up to 40 characters; dropped if invalid |
| Body weight | number, above 0 and below 1500 lb; target the same |
| Lift goal | above 0 and below 5000 lb |
| Rest timer | 0 to 600 s |
| Percent of 1RM | 0 to 110 |
| 1RM | above 0 |
| Mode | 1, 2 or 3 |
| Water | a drink above 0 and up to 200 oz; daily goal 8 to 500 oz |
| Backup repo | `owner/name` |

Bad numbers inside an otherwise valid entry become null; unknown fields are dropped.

**Week object**: `prog` is `'A'` or `'B'` or null; `done`, `skipped`, `moved`, `ph`, `warm` keys are 1 to 100 characters with no control characters and no prototype keys; `done` and `skipped` hold `true`; `ph` holds a phase; `warm` holds booleans two levels deep; `moved` days are whole numbers 1 to 7; `rest` is unique whole days 1 to 7; `order` is a permutation of 1 to 7 and only stored when it differs from 1..7; `extra` cards have an id `X-…`, day 1 to 7, an exercise, optional phase, note up to 200.

**Program**: 6 or 7 days (a sixth-day program gets an empty seventh); at most 40 slots a day and 12 items a slot; day title up to 60, subtitle up to 100; slot `type` is `single`, `superset` or `either`; item has `ex`, `ph`, `w` (set-weight rule), optional `bw`, `rx` (60), `note` (200). A slot with no valid items is dropped; a slot without an id gets `<owner>-d<day>s<position>`, assigned before anything is dropped so later ids don't shift.

## 7. Not yet decided or not present

- `updatedAt` and `schema` exist now (section 1 and 2). Not yet stamped: config, weeks, programs, stretches and supplements documents. A server should add its own version or timestamp to every row.
- The Excel export does not carry `updatedAt`, so an Excel round trip loses it (the JSON data file keeps it).
- Authentication, ownership and rate limits: not applicable client-side, all new on the server.
- The client now drops invalid stored data on load. On a server, prefer quarantining rejected rows rather than deleting them.
- Deletions still cannot be merged (section 4): add `deletedAt` server-side.

## 8. Amendments from the sync failure-mode analysis (2026-10-06, ADR 003, accepted)

- **Edit meets delete:** an edit to a row whose current version is a tombstone is refused with the tombstone; the phone offers "restore?" and keeps the edit until the user chooses. A delete never wins silently over a later-based edit (FM-05).
- **Pull over unsynced local edit:** a pulled row never replaces a row with unsynced local changes; it goes through the section 4 merge and is sent as a versioned write (FM-04).
- **Queued writes are never dropped** automatically: a refused write is quarantined on the device and exported on request; 401 and 5xx pause the queue (FM-02). This replaces "permanent errors drop only that write" in section 5.
- **Cross-row rules (section 3, rules 1 to 3 and 7) are enforced on the server in one transaction per user action**, not by row versions alone (FM-06, 07).
- **Import ids:** legacy hash ids must not make the content match drop a genuine second session (FM-10). Server dedupe is by id only.
