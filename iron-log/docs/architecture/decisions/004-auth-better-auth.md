# 004. Auth: Better Auth in our API, Google login first

Status: accepted by the user, 2026-10-06 (Google-only at launch is my recommendation and was not explicitly confirmed; email/password timing is open, see Consequences)
Depth class: load-bearing

## Context

Open signup for a few friends, maybe more. The API (ADR 001) must know the caller before it stores or returns per-user rows. The phone can be offline up to about 2 days (ADR 003), so a token that expires or a provider outage must never cause a queued workout to be dropped (FM-16, feeding FM-02). Provider switch or a second Google account must not orphan data (FM-19). Free tiers only.

The owner is the only admin and wants full access, mainly to watch the production environment (a stated learning goal). A later feature lets users opt into sharing progress with people they follow; it is not meant to expose everyone to everyone.

Authentication (who you are) is decided here. Authorization (what you may do) was run through `access-control-modeling`; its result is under Decision.

## Decision

**Authentication.** Use Better Auth inside our own API, storing users, accounts and sessions in Neon. Launch with **Google login only**. Email and password is a planned later addition, not launch scope.

- Session: server-side session row, long sliding lifetime. Better Auth defaults are 7 days with a 1-day refresh; set the lifetime to at least 30 days so a 2-day offline gap never forces a re-login.
- Revocation is deleting the session row.
- Our own `users` table with an internal id is the identity every data row points to. The Better Auth provider id lives in one column. Token or session verification lives in one module (FM-19).
- A 401 means "pause the queue and re-authenticate", never "drop the write" (FM-16, ADR 003).

**Authorization (from `access-control-modeling`).**

```
Need:                 Open signup: every row must be reachable only by its owner; one admin; sharing later
Actors:               user (owns their rows); admin (the owner, one account)
Protected resources:  workout, entry and config rows (read, write, soft-delete, export); account (delete)
Granularity:          per-instance ownership today; per-instance relationship when sharing arrives
Model:                flat ownership + one admin flag now. Sharing later = opt-in grants (ReBAC-lite), not roles
Tenancy:              shared schema, user_id on every table
Isolation backstop:   Postgres row-level security on user_id for writes and owner reads
Enforcement:          one guard in the API resolves the session to users.id and calls a single canRead/canWrite
                      policy function; RLS is the backstop; the frontend is never the check
Caching:              none
Delegation/admin:     users cannot grant permissions; sharing is a user-owned grant row, revocable by its owner
Audit:                refused writes, account deletion and every admin action are logged
Entities to model:    users, accounts/sessions (Better Auth), later share_grants(owner_id, viewer_id, scope)
```

**Admin ("god mode").**
- Admin is a flag on one user row, not a wildcard in RLS.
- Admin reads and writes go through a separate, logged code path.
- Default posture is read-only monitoring. Writing as another user is allowed but logged, with no silent impersonation.
- The admin account is the highest-value target. Use a Google account with 2-step verification.

**Sharing, built later.** Every read goes through the one `canRead(viewer, row)` function from day one, so adding a share grant is one new branch there. RLS read policies will need a matching grant lookup at that point. That is a known future cost, not a surprise.

## Alternatives considered

- **Clerk (hosted).** Fastest, but short-lived tokens give less control over offline lifetime, adds a vendor, and teaches least about the production path. It is the fallback if self-running proves too heavy; the FM-19 design keeps the swap contained.
- **Google ID-token verification plus hand-rolled sessions.** Smallest surface but hand-rolled refresh and revocation is where self-built auth usually fails.
- **Firebase Auth as identity only.** Reintroduces the Google stack ADR 001 stepped away from, with similar exit cost to Clerk.
- **Email and password at launch.** Deferred, see below.

## Deciding axes

1. Who carries the security load. 2. Fit with 2 days offline (FM-16). 3. Exit cost (FM-19). 4. Learning and effort under free-only.

## Library vetting (Better Auth), checked 2026-10-06

- **License:** MIT. About 30k GitHub stars, active development.
- **Advisories found by search, to confirm on the repo's GitHub Security tab before building:**
  - Several advisories exist, mostly in optional plugins we do not use (device authorization, OIDC provider, MCP, API keys) and in open redirects.
  - One reported account takeover ("pre-account hijacking") affects open **email and password** registration, reported against versions up to 1.6.21.
- **Reading of that:** it supports Google-only at launch, and it means enabling email/password later requires checking the fix and the current version first.
- **Rule:** pin the version, enable only the plugins we use, and watch advisories (dependency alerts on the repo).
- **Not verified:** exact latest version, maintainer count, and which database adapters we would use. Check when decision 5 and the data-access ADR are made.

## Consequences

- More work than Clerk, and security details are ours, including the session cookie settings.
- **Decision 5 is effectively TypeScript.** Better Auth is TypeScript-only.
- **Email and password later** needs password hashing, reset and email verification, so an email sender. Free sender limits are unverified. Revisit when a real user asks for it or Google-only blocks a friend.
- **Cookies versus iOS:** if the API sits on a different site from the PWA, iOS Safari may block the cross-site session cookie. Resolve in decision 9 (hosting): serve both from one site (a subdomain of one domain) or move to a bearer token. This is unverified; spike early. Google OAuth redirects in an installed iOS PWA may also lose context; spike that too.
- **Admin is a single point of risk.** Losing the admin Google account means losing the admin path; keep one documented recovery step.
- Adds a privacy policy and a data-deletion path to the closeout list (account deletion is an audited action).

## Revisit when

- A friend cannot or will not use Google (add email/password after the account-takeover advisory is checked).
- Self-running auth costs more time than it teaches (swap to Clerk behind the one verification module).
- Sharing ships (add grants and the read policy; consider relationship-based tooling if the rules grow).
- A second admin is needed (move from a flag to a role).

## Spec amendment

Backlog step 3 "Auth: Clerk vs a self-run library" is settled to Better Auth. The Account screen item (sign out, last-synced time) now has a concrete provider. No backlog item changes scope.
