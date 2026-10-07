# 007. Web framework: Express

Status: accepted by the user, 2026-10-06
Depth class: structural

## Context

The API (ADR 001) runs on TypeScript and Node (ADR 005). It needs an HTTP framework to host the sync routes (ADR 003) and mount Better Auth (ADR 004). Rules and validation are shared with the client (ADR 005), so the framework should stay thin. Free tiers only; every candidate is free and open source, so cost was cut as an axis. The user already knows Express, and the learning goals of this walkthrough are sync, auth and Postgres, not a new framework.

## Decision

Use **Express (version 5)** for the API. Keep routes thin: rules and validation live in a framework-free module shared with the client, and Express handles only routing, auth middleware and error shaping.

## Alternatives considered

- **Hono.** Recommended first. Web-standard `Request`/`Response`, runs on Node, Bun, Deno and edge hosts, and Better Auth mounts with a few lines. Lost on the user's familiarity, which outweighed its small edge on Better Auth fit and switching cost. It is the fallback.
- **Fastify.** Runner-up. Mature, good TypeScript support, documented Better Auth integration. Lost because it is Node-only, its native validation is JSON Schema (needs an adapter for shared validators), and it is unfamiliar.
- **NestJS.** Lost as heavy for a one-person API: decorators and dependency injection would pull rules into framework classes, working against ADR 005.

## Deciding axes

1. Familiarity (added after the first round). 2. Rule reuse with the client. 3. Fit with Better Auth. 4. Cost of switching later. 5. Learning and production relevance.

## Consequences

- Validation, error shaping and structure are hand-built. Write one validation middleware that calls the shared validators and one error handler, each in a single file.
- Use Express 5 (async handler errors are caught natively). Release status not verified; check the current stable version at scaffold time.
- Better Auth's Express handler must be mounted before `express.json()`. Confirm against the Better Auth docs when wiring.
- Least current of the options and Node-only coupling (mild). Switching to Hono later stays cheap while routes stay thin.
- No recurring cost, so no paid alternative to record.

## Revisit when

- Hand-built validation and error plumbing starts to drift or duplicate.
- A non-Node runtime is wanted (ADR 005 revisit trigger); Hono is the first alternative.

## Spec amendment

None. Backlog step 3 item "Web framework" is settled.
