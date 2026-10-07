# 001. Backend shape: own server, not a backend service

Status: accepted "for now" by the user, 2026-10-06 (revisit if effort or security load proves too high; Supabase is the fallback)
Depth class: load-bearing

## Context

Backlog step 3 needs a place for each user's data, with login, and it must keep working offline at the gym. The app will be opened to other users, partly to get production experience. Free tiers only. The client is a React 19 + Vite PWA that saves through `src/lib/storage.js` and a save queue.

`backend-data-rules.md` already specifies what the server must enforce: one row per entry, uniqueness rules, soft delete (`deletedAt`), merge rules, and stale-write rejection.

## Decision

Build and run our own API server (in Docker) on top of a Neon Postgres database, with a separate auth provider. Do not use Firebase or Supabase as the backend.

The server is authoritative: the client sends intent, the server re-validates and applies the rules from `backend-data-rules.md` in a transaction. Client rule checks stay as UX and for offline use.

## Alternatives considered

- **Firebase (Google sign-in + Firestore).** Least effort and built-in offline sync, and it fits the Firestore-like `db` in `storage.ts`. Lost because Firestore's whole-document, last-writer-wins model is what the data-rules doc says to move away from, rules would sit in a security-rules language, and exit cost is high.
- **Supabase (Postgres + auth + auto API).** Honest runner-up and the fallback if speed ever beats learning. Lost because the multi-row rules (a hand-logged session replaces a check-off, stale-write rejection) would live in SQL functions instead of normal code, and it teaches less of the production path.

## Deciding axes

1. Production experience (stated goal). 2. Fit with the data rules. 3. Effort and ops under a free-only budget. 4. Cost of leaving later.

## Consequences

- Most work of the three options, and a slower first working sync.
- Free hosts may sleep when idle (decided in the hosting ADR).
- Security (ownership checks, rate limits, input validation) is ours to get right.
- Postgres and Docker keep exit cost low.
- Walks next: datastore, sync protocol, auth, language, framework, API style, data access, hosting, data upload, lb/kg unit.

## Spec amendment

Backlog step 3, "Choose a backend", previously leaned Firebase with Supabase as the alternative. Amended to point here.
