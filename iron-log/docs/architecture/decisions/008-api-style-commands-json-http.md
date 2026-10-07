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
- The command list itself is fixed during build from `backend-data-rules.md`, not here.
- No recurring cost, so no paid alternative to record.

## Revisit when

- Commands multiply past what a hand-written wrapper handles well; consider generating the client from the contract.
- A second client type needs a public API; consider documenting it with OpenAPI.

## Spec amendment

None. Backlog step 3 item "API style" is settled.
