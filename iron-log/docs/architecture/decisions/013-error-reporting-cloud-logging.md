# 013. Error reporting and logging: Cloud Run logging plus our own client-error endpoint

Status: accepted by the user, 2026-10-06
Depth class: structural

## Context

ADR 003 (FM-22) requires detection from day one: server structured logs, a refused-writes table, and error reporting with personal data scrubbed. The tool was left open. The API runs on Cloud Run (ADR 010), which collects stdout logs. Body weight and workouts are health-adjacent data (ADR 004, privacy policy). Most failures that matter, such as a queued write that will not sync, happen on the phone. Free tools only.

## Decision

1. **Server:** structured JSON logs to stdout, collected by Cloud Run's logging. Use the platform's error grouping if it is included at no cost (not verified; check the Google Cloud pricing pages).
2. **Phone:** a small `POST /api/client-errors` endpoint that scrubs, size-limits and rate-limits reports, then logs them the same way. The phone's "not saved" list stays user-visible (ADR 003 FM-02).
3. **One wrapper module** for reporting, so adding a dedicated tool later is a one-file change.
4. **Log content:** command name, internal user id (never email), request id, result. Never body weights, notes or tokens (FM-18).
5. **Durable record:** the refused-writes table stays (retention value still to set).
6. **One alert:** an error-rate or 5xx burst, to the user's email (check Cloud Monitoring's free alerting).

## Alternatives considered

- **Sentry.** Best developer experience and source maps, with a free plan (limits not verified). Lost on a new vendor and account, and data leaving our system with scrubbing to configure. It is the upgrade path.
- **GlitchTip or another Sentry-compatible tool.** Needs hosting or an unverified hosted plan. Lost on cost and ops.
- **Logs only, no reporting.** You only learn of a failure when you look, which is the FM-22 problem. Lost.

## Deciding axes

1. Free cap and no new vendor. 2. Privacy. 3. Covers the phone as well as the server. 4. Easy to upgrade later.

## Consequences

- No source-map stack traces for the PWA and weaker alerting than a dedicated tool.
- Cloud logging's free allocation and the error-grouping inclusion are unverified; confirm before relying on them.
- The client-error endpoint is an abuse surface: authenticate it where possible, rate-limit and cap sizes.
- **Paid alternative:** Sentry's paid team plan. Trigger: source-mapped phone stack traces are needed.

## Revisit when

- Debugging phone failures from logs alone proves too slow.
- The free logging allocation or alerting changes.

## Spec amendment

Closes the "error reporting (none yet)" inventory gap in [[failure-modes/sync]] and backlog "crash reporting" in part (opt-in analytics stays separate).
