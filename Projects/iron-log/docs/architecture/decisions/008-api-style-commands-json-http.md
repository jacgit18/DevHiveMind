# 008. API style: command endpoints over plain JSON HTTP

Status: accepted by the user, 2026-10-06
Depth class: structural

## Context

ADR 003 fixed the sync semantics: one command per user action, each in one transaction (item 8), versioned rows, and a pull feed. The data model adds the `seq` cursor (`users.change_seq`). ADR 005 shares types and validation with the client; ADR 007 chose Express. This decision sets the HTTP shape. The client is one PWA with a fixed set of actions and an offline queue (up to about 2 days), so a queued write must be a serializable, replayable object. The user is more familiar with REST and asked for the difference to be explained; they chose commands after that. Cost is cut: every candidate is $0.

## Decision

Use **command endpoints over plain JSON HTTP**, plus one pull endpoint.

- Writes: `POST /api/commands/<name>` (for example `log-session`, `tick-card`, `untick-card`, `delete-entry`). The offline queue stores `{ name, clientId, baseVersion, input }` and replays it unchanged.
- Reads: `GET /api/sync?since=<seq>`, paged, returns changed rows across tables plus the new cursor.
- One response envelope: success `{ rows, cursor }`; refusal `{ refused: <reason code>, current }` with the current row or tombstone (ADR 003 items 2 and 5).
- Status codes: 2xx applied or already applied (idempotent create), 409 stale or conflict, 422 validation, 401 and 5xx never cause the phone to discard a queued write (FM-02).
- A client version header on every call carries the minimum-version check (ADR 003, FM-03).
- One shared contract module holds each command's name, input type and validator, used by client and API.

## Alternatives considered

- **Resource REST** (`PUT/PATCH/DELETE` on rows). Familiar, but one call touches one row, so the cross-row rules (a hand-logged session replaces a check-off) split across calls that can fail halfway. Lost on the top priority, no lost workouts.
- **Hybrid**: REST for simple rows, commands for cross-row rules only. Reasonable, but two styles mean the queue, logging and refused-writes table handle writes two ways. Not chosen.
- **tRPC.** Automatic type inference, but couples the client build to the server router and the offline queue still needs its own envelope. Duplicates the shared module.
- **GraphQL.** One client, fixed shapes, writes are commands. Heavy for no gain.

## Deciding axes

1. Fit with command-per-action and the offline queue. 2. Shared types and validation. 3. Observability. 4. Learning and easy switching.

## Consequences

- A hand-written, thin typed client wrapper per command (about 8 to 10 commands). Cost accepted over tRPC's inference.
- Per-command logs, rate limits and refused-writes rows are keyed by command name (FM-22).
- Adding an action means adding a command to the shared contract, not a table route.
- Plain HTTP and JSON transfer to any stack, so switching framework (ADR 007) stays cheap.
- The command list itself is fixed during build from [[backend-data-rules]], not here.
- No recurring cost, so no paid alternative to record.

## Revisit when

- Commands multiply past what a hand-written wrapper handles well; consider generating the client from the contract.
- A second client type needs a public API; consider documenting it with OpenAPI.

## Spec amendment

None. Backlog step 3 item "API style" is settled.

## Amendment 2026-10-08: the phone queues documents, not commands

Decision 1 of the Phase D brief ([[phase-d-brief]], sections 3 and 6, confirmed by the user 2026-10-07) changes one sentence of this ADR: the line
"The offline queue stores `{ name, clientId, baseVersion, input }` and replays it unchanged." is **not** how the phone is built.

**What was built instead.** The store already writes whole documents through a small database handle (`doc(path).set / delete / onSnapshot`).
`src/sync/apiDb.ts` is that handle backed by the API. A save is kept in the browser first (the outbox, one latest document per path) and then
compared with the phone's copy of the server's rows (the mirror, with their versions and tombstones). The smallest list of commands that makes
them equal is planned at send time (`plan.ts`) and sent one at a time. **The commands on the wire are exactly the ones this ADR lists**
(`log-session`, `tick-card`, `delete-entry`, and the document commands); the server, the contract and the one-transaction rule are unchanged.

**Why.** A command log in the store means every store action enqueues a command, in a 1,000-line store whose reorder and log paths are the most
protected code in the repo. The adapter reaches the same server state with one new module and leaves the store, its tests and the "no exercise
lost or duplicated" paths alone.

**What it gives up.** The queue holds documents plus a mirror, not an ordered list of user intents. "Why" information is not kept (for example
that an untick also removed what the user had logged). The server still ends in the right state because the server's rules (rule 2, one check-off
per card and week) and the planner agree, and the end-to-end tests check it against the real API.

**What it needed in the commands.** A command is now sometimes planned from a changed document rather than from one action, so: a log entry that
comes back after a delete (the board's Undo) is restored by a write that names the tombstone's own version (`log-session`, `tick-card`), never by
a create with no version, so a late duplicate cannot undo a delete; the document commands revive a deleted row on a create with no version.

**Revisit when** a user-visible feature needs the intent behind a change (an activity feed, an audit of "who unticked what"): then record the
intent as a separate event, not by turning the queue back into a command log.
