# 003. Sync: server-versioned rows, stale edits refused and re-merged on the phone

Status: accepted, 2026-10-06 (design B and the drafted answers to the four red failure modes confirmed by the user)
Depth class: load-bearing

## Context

ADR 001 and 002 chose our own API on Neon Postgres. Today's sync is whole-document, last writer wins, with no deletion merge ([[backend-data-rules]] sections 4 and 5). User priorities (2026-10-06): no lost workouts over a rare duplicate; phone is the main device but computers are used too; offline up to about 2 days; assume iOS worst case. Failure modes: [[iron-log/docs/architecture/failure-modes/sync]] (24 modes, 4 red).

## Decision

1. **Per-row server-owned versions.** Every synced row has a `version` the server increments. The phone sends the version it edited from.
2. **Stale edits are refused.** The server returns the current row (or its tombstone). The phone re-applies the section 4 merge rules (this device wins same-field conflicts; a ticked card beats a skip) and resends.
3. **Soft delete.** `deletedAt` tombstones; a delete is a versioned write like any other.
4. **Idempotent creates.** The client id is the key, unique on `(user, id)`; a retried create returns the existing row.
5. **Server time orders things.** The server stamps its own time and never trusts client `updatedAt` for ordering.
6. **History table.** Replaced rows are copied to a history table; retention is set so recovery works for at least 90 days (draft; confirm size against the 1 GB cap).
7. **Change-feed pull** is added when a second device is used.
8. **One command per user action** (draft, FM-06/07): "log session", "tick card", "untick", "delete entry" are single API calls that run in one transaction and enforce the cross-row rules (one check-off per card and week; hand-logged replaces check-off) on the server. Row-level versions alone cannot do this.

### Answers to the red failure modes (drafts)

- **FM-02, never drop a queued workout.** A rejected write is quarantined on the phone, shown in the "not saved" list, and included in a manual export. 401 and 5xx pause the queue; they never discard. Only the user can discard.
- **FM-04, pull over an unsynced edit.** A pulled row never replaces a row with unsynced local changes. It is run through the merge rules, and the result is sent as a normal versioned write.
- **FM-05, edit meets delete.** An edit to a row whose current version is a tombstone is refused with the tombstone. The phone shows "deleted elsewhere, restore?"; the edit is kept until the user chooses. A delete never wins silently over an edit made after the version it was based on.
- **FM-22, detection.** Server structured logs and a server-side table of refused writes from day one; error reporting with personal data scrubbed (tool chosen later, see backlog "crash reporting").

## Alternatives considered

- **Last-writer-wins by client timestamp.** Simple, but a skewed clock or an offline device silently overwrites a workout. Lost on the top priority.
- **CRDTs / sync engine (for example Automerge, ElectricSQL, PowerSync).** Strong offline merge, but a large new dependency and mental model, and the existing merge rules are already specific to this domain. Revisit if two-device conflicts prove common.
- **Server-side automatic merge.** Moves the domain rules to the server and removes the phone's role. Lost because the rules already live and are tested on the client (`mergeRules.test.js`).

## Consequences

- Every write has a possible refusal round trip; the phone needs a retry loop with a cap.
- The history table grows; it needs pruning, or it becomes FM-15.
- The server must carry the section 3 and 4 rules, so the rules exist in two places (client for offline, server as authority) and need shared tests.
- Stale clients: the API sends a minimum client version and refuses older ones (FM-03).
- Open: legacy `k`+hash ids on import must not drop a real second session (FM-10); date and timezone policy for `wk` (FM-12) belongs in a later decision.
- Handoffs: `relational-modeling` for tables and constraints; `test-strategy` for FM-04, 05, 06, 07, 09, 10, 11, 12; `resilience-strategy` for the queue (FM-02, 14, 16).

## Amendment 2026-10-07: timestamps on check-offs (clarification, no new columns)

Question raised: should a check-off be timestamped as it is ticked, to help logging and the FM-22 detection problem? Answer: yes, and the design already does it. This section records which column means what so nobody adds a duplicate.

- **When it was ticked or unticked = `updated_at`** on the `log_entries` row (server `now()`, set inside the command transaction). `created_at` is the first tick only; an untick is a tombstone and a re-tick revives the row (version bump), so `updated_at` is the moment of the latest tick.
- **The trail of earlier ticks and unticks = `row_history`** (`replaced_at`), written by the existing trigger. No separate completion-event table.
- **`d` and `wk` stay the day and week the workout belongs to** (ADR 011). They are not timestamps and are never derived from one. A tick on a past week stamps `d` with that week's Sunday, so `updated_at` is the only record of the real moment.
- **`client_updated_at`** stays a diagnostic and merge claim. The gap between it and `updated_at` shows how long a write sat in the offline queue. It is never used for ordering.
- **Refused writes and logs:** `refused_writes.received_at` already timestamps every refusal (command, reason, client version). Server logs carry Cloud Logging's own timestamp plus command name, internal user id, request id and result (ADR 013 #4); no payload values next to it.

Not added: a `checked_at` column, `tz` or `local_date` fields (ADR 011 already stores local dates as data), or an events table.

Revisit when: a question comes up that `updated_at` plus `row_history` cannot answer, such as "how long between ticking and syncing" across many rows (then consider a dedicated column) or time-of-day analytics.
