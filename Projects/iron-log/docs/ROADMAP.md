# Iron Log: roadmap
_Last reviewed 2026-10-10. Pointer file: the full list, with item status, is [[Projects/iron-log/docs/backlog|backlog]]. Do not copy items here; link them._

**Agents: build only what the backlog lists, from the top. If a request is not in the backlog or in "Out of scope" below, ask before building it.**

## Now (in this order)
1. Security follow-ups, "Now" and "Before opening sign-up" groups: [[Projects/iron-log/docs/backlog|backlog]] section "Security audit follow-ups".
2. Phase F follow-ups: first installed-iPhone PWA sign-in, Neon restore rehearsal, new-account defaults (ADR 016), deploy safeguards steps 3e, 5, 7 ([[017-release-and-deployment-strategy|ADR 017]]).
3. Bugs section of the backlog.

## Next
- Remove the stand-in features (backlog section 4), once the backend is proven.
- Multi-user readiness (open sign-up) after the security items above.

## Later
- Advanced features and integrations (backlog section 5), UX fixes (6), optional UI ideas (7), exercise catalog ([[exercise-catalog-idea|idea]]).

## Milestones reached
Local-only PWA (Sep 2026) → TypeScript migration (Oct 6) → backend, sync, auth (Oct 7-8) → live on Cloud Run (Oct 8) → release strategy / no-traffic deploys (Oct 9). Dated detail: [[CHANGELOG|changelog]].

## Out of scope (deferred)
From [[build-spec|build spec]] section 3: email and password login; share grants and per-viewer read policies; a sync engine or CRDTs; a custom domain; native apps. Cost cap: free tiers only.
