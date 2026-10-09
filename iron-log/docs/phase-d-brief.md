# Phase D precision brief: the phone talks to the API

Drafted 2026-10-07. For [[build-spec]] §6a, Phase D. Decisions it rests on: ADR 003 (sync), 008 (commands), 010 (one origin), 015 (shared code); failure modes [[iron-log/docs/architecture/failure-modes/sync]]; rules [[backend-data-rules]] §3 to §5 and §8. **Nothing here is built yet. Section 6 lists what I need you to decide first.**

## 1. Goal

With a flag on, the app reads and writes through the API instead of the browser's own storage, keeps working offline, and a logged workout can never be lost or silently overwritten. With the flag off, nothing changes. **Done when:** with the flag on and the dev sign-in stub, log a workout, tick a card, reload, and see them again from the server; go offline, log more, come back online, and everything arrives; and the reconciliation test (§5) passes.

## 2. What the code already gives us (checked 2026-10-07)

The store does not call `localStorage` directly. It writes through `queue.save(path, document)` and reads through a host handle `db` with a Firestore-like shape: `db.doc(path).set / delete / onSnapshot` and `db.collection(path).onSnapshot`, a snapshot having `exists`, `data()` and `docs[].id`. `init()` already has two modes: `storeMode 'local'` (no `db`, localStorage) and `'db'` (a host database). The store skips an incoming snapshot for any path that still has a write queued (`queue.pending(path)`), which is already half of FM-04.

The documents the store uses, and where each lands on the server:

| Path | Document | Server table |
|---|---|---|
| `logs/<exerciseId>` | `{entries}` | `log_entries` (a check-off, `auto`, goes through `tick-card`) |
| `weeks/<YYYY-MM-DD>` | week | `weeks` |
| `stretchweeks/<YYYY-MM-DD>` | stretch week | `stretch_weeks` |
| `body/main` | `{entries}` | `body_entries` |
| `library/main` | `{items}` | `library_items` |
| `experiments/main` | `{items}` | `list_items` (`experiment`) |
| `stretches/main` | `{items, experiments}` | `list_items` (`stretch`, `stretch_experiment`) |
| `supplements/main` | one document: goal, mode, water, boost, taken, items | `supplement_days` (per day), `list_items` (`supplement_item`), `config` (goal, mode) |
| `config/main` | settings | `config` |
| `programs/A`, `programs/B` | program body | `programs` |

Existing limits to design around: the queue keeps a permanently refused write only **in memory** (`failed`), so a reload loses it (FM-02 needs it kept); a transient error retries every 1.5 s forever with no backoff; `settingsSlice` replace-import deletes old documents only if the `refusals` counter did not move, so a refused write must keep raising it.

## 3. Recommended approach: a document adapter, not a command log in the store

**Build `createApiDb()`, an object with the same `db` interface, backed by the API.** The store, its tests and the board/log write paths (`planFix`, `mutateChecks`, `autoLogs`, `addEntry`, which `CLAUDE.md` says must not change behavior) stay as they are. The adapter does three jobs:

1. **A local mirror** of the server's rows (table, key, `version`, document), plus the pull cursor, kept in the browser. It is what the app reads while offline.
2. **Write by diff.** When the queue flushes `set(path, document)`, the adapter compares the document with the mirror and sends the smallest list of commands: a new entry is `log-session` (or `tick-card` for a check-off), a changed one is the same command with the row's `baseVersion`, a removed one is `delete-entry`, and likewise for the other tables. Each response updates the mirror. Because the diff is computed at flush time against what the server is known to hold, a retry after a crash is safe: creates are idempotent by client id, and a repeated edit that already landed is answered "already that".
3. **Pull.** `GET /api/sync?since=<cursor>` on start, when the app regains focus or the network, after each flush, and about every minute while visible. Rows are applied to the mirror and `onSnapshot` callbacks fire for the affected paths.

**Why not the literal ADR 008 queue** (every store action enqueues a command): it touches dozens of actions in a 1,000-line store whose reorder and log paths are the most protected code in the repo, and each action would have to be re-proven against the "no exercise lost or duplicated" tests. The adapter reaches the same server state with one new module. **What it gives up:** the queue holds documents plus a mirror, not an ordered list of user intents, so "why" information (for example *unticked and removed what I logged*) is not preserved; the server still ends in the right state because rule 2 and the diff agree. This departs from ADR 008's wording ("the offline queue stores commands"), so it needs your yes (§6, decision 1) and a short amendment to ADR 008.

## 4. Rules for the adapter (all from decisions already made)

- **Never drop a queued write (FM-02).** 401, 5xx and network errors **pause** the queue (backoff from 1.5 s to 60 s with jitter; resume on `online` and when the app is focused). A write the server **refuses** (422, or a conflict that cannot be merged) is **quarantined**: saved in the browser across reloads, listed in the "not saved" list, included in the manual export, and only the user can discard it. The `refusals` counter keeps rising on a refusal.
- **Retry cap (spec).** The cap applies to conflict loops only: a 409 is re-merged and resent at most 3 times, then quarantined. Network pauses are not capped.
- **Conflicts (FM-04, FM-05).** 409 `stale`: take the server's row from the response, then resend this device's version on top of it (this device wins, per ADR 003); every server version replaced is in `row_history`. Weeks keep the existing `mergeWeek` exception: a ticked card beats a skip. 409 `deleted`: **do not bring it back**; quarantine the edit with the message "deleted elsewhere" (the restore choice is a later UI). 409 `not-found`: the row was never created; send it as a create.
- **A pulled row never replaces a document with a queued write** (already true via `queue.pending`); after the write lands, the next pull applies.
- **Auth.** Every request goes through one function that adds the credentials. Today that is the `x-dev-user` header, allowed only in development builds; B2 swaps it for the session cookie. A 401 pauses; it never discards.
- **Client version.** Every request sends `x-client-version` (the build id). The server (D5) answers 426 below a minimum, and the app shows "update needed" and stops sending, keeping the queue (FM-03).

## 5. Tests

- **Reconciliation invariant (spec §5):** an integration test runs the adapter against the real API on a Postgres container: after any sequence of writes, flushes and pulls, the mirror equals the server's rows for the user (same keys, versions, tombstones), and there is at most one live check-off per card and week. Includes: a crash between two commands of one user action, an offline stretch with many writes, and two adapters (two devices) writing the same rows.
- **Mapping tests:** every document kind round-trips (document to rows to document) and equals what the store wrote. The existing `logData`, `mergeRules` and board tests run unchanged.
- **Failure tests:** 401 and 500 pause and resume without loss; 422 quarantines and survives a reload; a lost response followed by a retry creates no duplicate; 426 stops sending and keeps the queue.
- **e2e:** one Playwright run with the flag on against a local server.

## 6. Decisions I need from you before D1

1. **Approach:** the document adapter (recommended), or the literal command queue in the store actions?
2. **Local storage for the mirror and queue:** the browser's `localStorage` as now (recommended for v1: the data is tens of KB, the same place the app stores it today), or IndexedDB (larger, more code, more to test)?
3. **Conflict policy v1:** this device wins on a stale edit (plus the "ticked beats skipped" week rule), and an edit of something deleted elsewhere is quarantined, not restored. OK?
4. **Flag:** build-time default off (`VITE_API_SYNC`), plus a `localStorage` override (`ironlog:flag:apiSync`) so you can switch it on in one browser to test. OK, or do you want a visible switch in Settings?
5. **Existing local data:** when the flag is first turned on, the app does not upload what is already in the browser. That is Phase E (`import-legacy`). Until then, flag-on means an empty account. OK?

## 7. Increments (each one PR, repo checks green, flag off by default)

| # | What | Done when |
|---|---|---|
| D1 | Pure mapping and diff, no network: path to rows, rows to document, document to commands, for all 10 document kinds. | Round-trip and diff tests pass; nothing wired in. |
| D2 | Transport (one request function with auth hook, version header, error classes) and the mirror with its pull and paging, persisted. | Tests with a fake server: pull fills the mirror, a reload keeps it, errors are classified. |
| D3 | `createApiDb()` with the flush loop, pause and backoff, quarantine saved across reloads; wired into `init()` behind the flag. | Flag on, dev stub: a logged workout and a tick are rows in the database and survive a reload; the §5 invariant test passes. |
| D4 | Conflicts: 409 stale, deleted and not-found, the retry cap, the `mergeWeek` exception. | FM-04 and FM-05 tests pass; two adapters writing the same rows end equal. |
| D5 | Server: minimum client version (426) and a useful `GET /api/me`; client: the "update needed" stop. | A stale version is refused, the queue is kept. |
| D6 | Sync status and account screen in Settings: signed in as, last synced, pending count, the quarantine list with retry, export and discard. | You can see what is not saved and retry or export it. |
| D7 | Playwright run with the flag on; update [[feature-flags]] and [[feature-map]]; amend ADR 008. | The e2e run passes; the docs match. |

D1 to D3 are the core. D4 to D7 can follow in any order after D3, though D4 should come before anyone but you uses the flag.

## 8. Risks and what I will watch

- **The supplements document** is one document that maps to three destinations (per-day rows, list items, config). It is the hardest mapping; D1 handles it first.
- **Replace-import** writes many documents at once and depends on the `refusals` counter. D3 must keep that contract; one test covers it.
- **Whole-document writes mean large diffs on a first flush** (an account with years of history). The first flush after an import is one command per entry; fine at tens or hundreds of entries, to be measured at thousands.
- **iOS eviction (FM-01):** the installed PWA is the case that matters; the mirror and quarantine live in the same browser storage as today's data, so the risk is unchanged, not worse. Quarantine export stays available.
- **Time:** D1 to D3 are the bulk; I expect D3 to be the largest and to need your review of how it hooks into `init()`.

## 9. Status (2026-10-08)

D1 (PR #106), D2 (#107), the Undo fix on the server (#108), D3 (#109) D4 (#110), D5 (#111) and D6 (#112) are merged; D7 is PR #113, which closes Phase D. Decisions 1 to 5 in section 6 were all answered "yes, as recommended".

Differences from the plan above, all found while building:
- **The queue is persisted by the adapter, not the store.** The store's queue only hands a document to the database after the previous one finishes, so during a long offline stretch the newest edit would have sat in memory. `set()` keeps each document in the browser first (`outbox.ts`) and returns once it is safe there or sync is paused.
- **An Undo is a restore at the tombstone version** (server PR #108), so a late duplicate of an old create can never undo a delete.
- **The flag key is `ironlog:flag:apiSync`** (and `ironlog:flag:apiUser` for the development sign-in), as in decision 4.
- **Pulls and sends take turns** (one request at a time). A pull waits while a send is waiting out an outage; nothing from another device can land on a path with an unsent document, which is how FM-04 is met.
- **Conflict rules as built (D4):** this device wins a stale edit; a card ticked elsewhere beats this device's skip; a delete never wins silently over a later edit (the edit is kept and a notice recorded); an edit of something deleted elsewhere is set aside, not restored; one check-off per card and week (the second phone adopts the first); a row that keeps changing, or a server that answers without changing anything, is set aside after a few tries instead of looped on.
- **Client version (D5):** a version is the unix time of the commit the app was built from, so builds order without bumping a number. The server's `MIN_CLIENT_VERSION` (unset = no gate; a value that is not a number stops the server from starting) refuses older apps with 426 on `/api/commands` and `/api/sync` before the sign-in check. To require a build: `git log -1 --format=%ct <commit>`. The app waits 5 minutes between tries once told it is too old, and shows an "Update needed" notice.
- **Sync screen (D6):** a Sync panel in Settings (right column, top; only with the flag on) and a notice under the header when changes are waiting offline or anything was set aside. Words for every state, never colour alone; Not sent (Try again, Download, Discard with two presses); Notes; app version. Decisions confirmed: panel placement, header notice, Try again, JSON download. Left out on purpose: an account or sign-in section until Phase B, and relative times ("2 min ago") which would need a timer.
- **End to end (D7):** `npm run e2e:sync` runs a real browser with the flag on against the real API and a scratch Postgres database (made and dropped by `scripts/e2e-sync.mjs`; it refuses a server that is not on this machine), nothing mocked: a ticked card and an edited session reach the database and a second phone sees them; offline keeps a tick and says so, and a reload while offline loses nothing; two phones ticking one card end with one check-off; users are separate. It runs in CI (the `e2e-sync` job). ADR 008 is amended (queue of documents, not commands).
- **Not done yet:** the server's current head is not in the pull answer, so a restore from an older backup cannot be detected yet (FM-20).
