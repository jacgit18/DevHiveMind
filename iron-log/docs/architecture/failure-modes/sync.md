# Failure-mode register: sync path

Date: 2026-10-06. Mode: register only (no sign-off gate, no acceptance log). Feeds ADR 003.

## Frame
- **Altitude:** sync path end to end, from logging a set on the phone to the Postgres row and back.
- **Components:** C1 phone PWA (store, save queue, merge rules); C2 on-device storage; C3 second device (later); C4 API in Docker; C5 Neon Postgres (versions, tombstones, history table); C6 auth provider (decision 4); C7 hosting (decision 9); C8 backups and restore; C9 migrations and deploy (manual); C10 error reporting (none today); C11 one-time upload.
- **Interactions:** I1 write with base version; I2 stale refusal returning current row; I3 queued retry with client id; I4 API transaction into Postgres; I5 token on every call; I6 pull / change feed; I7 upload; I8 migration into the database.
- **Out of scope:** Google's identity service, static hosting of the PWA, exercise-API imports (deferred).
- **Scheme:** 5x5 grid. Severity 5 = a logged workout permanently lost or silently overwritten with no recovery; 4 = duplicate or reappearing delete needing manual cleanup; 3 = visible stuck sync; 2-1 = delay or cosmetic. Likelihood 1 (<1/yr) to 5 (daily). Red: S x L >= 15, or S = 5 and L >= 3. Amber 6-14. Green <= 5.
- **Detection today:** client "not saved" list, vitest, Playwright. Nothing on the server.
- **Unverified facts:** iOS eviction rules for non-installed PWAs; Neon free restore window; Neon CU-hour cap.

## Register (ranked)

| ID | Where | Category | Cause -> manifestation -> impact | S | L | Band | Caught now? |
|---|---|---|---|---|---|---|---|
| FM-02 | I3 queue | Consistency | Queued write classed a permanent error (server validation stricter than client, 401, storage full) and dropped; shows only if the user looks; workout gone | 5 | 3 | Red | Partly |
| FM-04 | I6 pull | Consistency | Second device pulls rows over an unsynced local edit (no version comparison); phone edit silently replaced | 5 | 3 | Red | No |
| FM-05 | Tombstones | Consistency | Device A deletes, device B offline edits the same row; edit dropped or row resurrects; merge rules silent. Contested S4-5, kept at 5 | 5 | 3 | Red | No |
| FM-22 | C10 | Operational | No server logging or error reporting; sync bugs fail silently; amplifies every other row | 4 | 4 | Red | No |
| FM-01 | C2 | Availability | iOS Safari evicts storage for a non-installed PWA (verify); unsynced workouts vanish | 5 | 2 | Amber | No |
| FM-10 | I7 | Functional | Legacy `k`+hash id plus content-match rule drops a genuine second identical session on import | 5 | 2 | Amber | No |
| FM-20 | C8 | Operational | Neon free restore window short (verify); corruption found after it is unrecoverable | 5 | 2 | Amber | No |
| FM-21 | I8 | Operational | Half-applied or destructive migration, no rollback because the schema moved forward | 5 | 2 | Amber | No |
| FM-23 | C1 | Human | Phone unattended with unsynced data, user unaware, device lost; backlog step 4 removes the JSON export, the last escape hatch | 5 | 2 | Amber | Partly |
| FM-03 | I1 | Integration | Cached old PWA sends old shape to newer API; unknown fields dropped; row rewritten without a new field | 4 | 3 | Amber | No |
| FM-06 | C4/C5 | Consistency | Per-row versions do not cover cross-row rules (one check-off per card and week; hand-logged replaces check-off); two offline devices tick the same card, one write refused | 4 | 3 | Amber | No |
| FM-07 | I1 | Consistency | One user action is several writes (log session, drop check-off, mark week); crash between leaves a duplicate or stale tick | 4 | 3 | Amber | No |
| FM-08 | I2 | Consistency | "This device wins" merge overwrites the other device's edit; history table short, no restore UI; recovery is a manual query | 4 | 3 | Amber | No |
| FM-09 | I2 | Functional | Merging a conflicting week row loses or duplicates a card (`order`, `moved`, `extra` are this-device-wins) | 4 | 2 | Amber | Tests |
| FM-11 | I7 | Functional | Upload run twice or from two devices; server-now stamps order wrongly against real edits | 4 | 2 | Amber | No |
| FM-13 | C1/C5 | Functional | lb/kg toggle ships before a stored unit exists; units mix silently | 4 | 2 | Amber | No |
| FM-18 | C4/C7 | Security | DB URL or key in repo, image or logs; body weight in logs | 4 | 2 | Amber | No |
| FM-24 | C9 | Human | One maintainer; restore never rehearsed | 4 | 2 | Amber | No |
| FM-12 | C1 | Functional | Week derived from phone local date; travel or post-midnight log lands in the wrong week and trips check-off uniqueness | 3 | 3 | Amber | No |
| FM-14 | C5/C7 | Performance | Neon cold start, CU-hour cap (verify) or sleeping free host; sync stalls, phone still works | 3 | 3 | Amber | No |
| FM-16 | I5 | Dependency | Token expires during 2 days offline, or auth provider down; writes 401; feeds FM-02 | 3 | 3 | Amber | Partly |
| FM-17 | I5 | Security | A route does not scope by the token's user id; another user's rows readable or writable; likelihood rises when the app opens to others | 5 | 1 | Green | No |
| FM-19 | C6 | Dependency | Provider id changes (provider switch, other Google account); data orphaned and looks lost | 4 | 1 | Green | No |
| FM-15 | C5 | Availability | Unbounded history table hits the 1 GB cap; writes refused; feeds FM-02 | 3 | 1 | Green | No |

## High-severity watchlist (S5)
FM-02, 04, 05, 01, 10, 20, 21, 23, 17 (FM-17 kept despite green band).

## Findings
- FM-02 is the hub: FM-03, 15, 16 all end in "queue drops the write". Rule: a queued workout is never dropped; a rejected write is quarantined on the device, visible and exportable.
- Per-row versions are not enough: one server command per user action, one transaction, cross-row rules enforced there (FM-06, 07).
- Merge rules lack two cases: edit of a deleted row (FM-05), pull over an unsynced local edit (FM-04).
- Backlog step 4 (remove JSON import/export) conflicts with FM-23; keep a manual export.

## Handoffs
- resilience-strategy: FM-02, 14, 16
- observability-strategy: FM-22, 23, 01, 05
- test-strategy: FM-04, 05, 06, 07, 09, 10, 11, 12
- relational-modeling: FM-05, 06, 08, 10, 15
- eng backlog: FM-03, 08, 12, 13, 23
- threat model: FM-17, 18
