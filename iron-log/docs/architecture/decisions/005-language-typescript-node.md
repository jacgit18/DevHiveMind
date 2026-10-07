# 005. Language and runtime: TypeScript on Node

Status: accepted by the user, 2026-10-06
Depth class: structural

## Context

The API (ADR 001) needs a language before the web framework, API style and data-access layer are chosen. The client is already TypeScript (`src/types.ts`, `validate.ts` cleaners, store types). ADR 003 and `backend-data-rules.md` require the server to re-validate every write with the same rules the client uses, and a client/server mismatch can reject or lose a workout (FM-02). ADR 004 chose Better Auth, which is TypeScript-only. Free tiers only.

## Decision

Write the API in **TypeScript with `strict` on, running on Node (current LTS)**. Share types and validation with the client from one source rather than copying them.

## Alternatives considered

- **Go.** Best footprint (small image, low memory, fast start) and the most breadth as a learning goal. Lost because rules would be written twice, so the client and server can drift, and Better Auth would not run, which reopens ADR 004.
- **Python (FastAPI).** Quick to write with good Postgres tooling. Lost for the same two reasons as Go, plus the weakest start time and footprint.
- **Bun or Deno instead of Node.** Not walked in full. Node is the boring, widely supported path and Better Auth targets it; revisit if there is a reason.

## Deciding axes

1. Rule reuse and drift. 2. Fit with ADR 004. 3. Learning and production experience. 4. Footprint on free hosting. Cost was cut: all candidates are $0 here.

## Consequences

- One copy of types and validation, shared by client and API. How to share it (a workspace package or a shared folder) is a build-time detail for the web-framework and data-access steps.
- Heavier image and more dependency upkeep than Go. Pin versions and turn on dependency alerts.
- Less language breadth. If wanted, get it from a small side tool, not the core API.
- Matches the repo rule in `CLAUDE.md`: new code in TypeScript, no `.js` or `.jsx`.
- Footprint on a sleeping free host is unverified; re-check at decision 9 (hosting).

## Revisit when

- Image size, memory or cold start becomes a real problem on the chosen host. Extract the shared validation into a package first, so a rewrite stays contained.
- A runtime other than Node offers a clear gain and Better Auth supports it.

## Spec amendment

None. Backlog step 3 item "Language/runtime" is settled.
