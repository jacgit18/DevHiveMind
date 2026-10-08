# Phase B precision brief: real sign-in

Drafted 2026-10-08. For [[build-spec]] §6a, Phase B (B2; B1 is no longer a gate). Decisions it rests on: ADR 004 (Better Auth, Google first), ADR 010 (one origin), ADR 003 (a 401 pauses the queue, never drops a write), [[data-model/iron-log]] (row-level security). **Nothing here is built yet. Section 6 is what I need from you; section 7 is what I need you to decide.**

## 1. Goal

Sign in with your Google account and the data is yours: the API knows who is calling from a session cookie, every row is reachable only by its owner, and the phone's sync (Phase D) works against it. **Done when:** on your phone, signed in as yourself, a logged session saves under your own user (the build spec's B2 test); a second Google account cannot see it; and a request with no session, or with the development header in a production build, is refused.

## 2. What is already known

- **The S0 spike worked on a desktop** (Google sign-in against a real Neon branch, then on Cloud Run). The spike code is about 50 lines of Better Auth setup and still exists on the local branch `spike-s0-signin` (never pushed): Better Auth `^1.7.7` over a plain `pg` Pool, `socialProviders.google`, a 30-day session with a one-day refresh, the handler mounted at `/api/auth/*` **before** any JSON body parser, `auth.api.getSession` reading the cookie. It created its tables at start; B2 replaces that with a migration.
- **The iPhone result was never recorded.** That decision is made (2026-10-07): assume it works and verify at the first real deploy. If it fails, only the sign-in layer is redone.
- **The seam is ready.** Everything after sign-in already reads one value, `res.locals.userId`, set today by the development stub (`server/auth.ts`). B2 replaces what sets it. The sync client already treats a 401 as "pause, keep everything, show Sign-in needed".
- A leftover: **the spike server is still running on your machine** (`node spike/server.ts`, port 3001, started about ten hours ago, reading `spike/.env` with real Google credentials). It is harmless but worth stopping, and the Google client secret it uses is on the spike cleanup list.

## 3. Design

**3.1 Better Auth inside our API.** Pinned version, Google only, no plugins. Its tables live in an `auth` schema (a migration, not run-at-start); sessions are server-side rows with a 30-day sliding lifetime so a two-day offline gap never forces a re-login (FM-16). Sign-in is a button that POSTs to `/api/auth/sign-in/social` and follows the returned URL; the callback lands on the same origin, so the cookie is first-party (ADR 010).

**3.2 Who is calling.** A guard replaces the development stub: read the session, then find or create our own `users` row for it (`users.auth_user_id` is the single link to Better Auth, FM-19), and set `res.locals.userId`. The development header stays, but only where it is already allowed (`NODE_ENV` development or test); a production build refuses it. Token or session verification lives in one module.

**3.3 Row-level security, and the two database roles it needs.** RLS only protects if the API does not connect as the table owner. So:
- `ironlog_owner` runs migrations (and your hand-run scripts such as `seed-test-user`).
- `ironlog_app` is what the API connects as: no ownership, no `BYPASSRLS`. Every synced table gets a policy `user_id = current_setting('app.user_id', true)::bigint`; with no `app.user_id` set, nothing is visible. The API already sets it per request with `SET LOCAL` inside the transaction.
- Creating the `users` row happens before we know the user id, so it goes through one small `SECURITY DEFINER` function the app role may call, not through a table grant. The `users` table itself is visible and updatable only for the caller's own row (the change counter lives there).
- **The risk to test, flagged in the data model:** Neon's pooled connections run in transaction mode, where session settings do not survive. `SET LOCAL` inside a transaction should be fine; B2 includes a test against your real Neon pooled endpoint to prove it.

**3.4 Defence for cookie-authenticated writes.** Cookies make command endpoints a CSRF target. Three layers: `SameSite=Lax` cookies (the Better Auth default) block cross-site POSTs; a custom header (`x-client-version`) makes a cross-site fetch need a CORS preflight, which the API never grants; and a small check refuses a state-changing request whose `Origin` is present and not ours. Also `trust proxy` for Cloud Run, secure cookies in production, and Better Auth's own rate limiting on the auth routes.

**3.5 The phone.** A **Sign in with Google** button and the signed-in email with **Sign out** (an Account panel in Settings: the part left out of the D6 sync screen on purpose). When syncing is on and nobody is signed in, the board shows a sign-in card instead of waiting on "Loading…" forever; after the redirect back, the sync resumes and the queue, which was kept the whole time, is sent. A second session on another device is simply another session row.

**3.6 Testing without Google.** Google cannot be driven by a test. A test-only configuration (never enabled in production) turns on email and password in Better Auth so the real cookie, session and guard path run in automated tests; the Google redirect itself is checked by hand on your desktop and then on the phone. The existing development-header tests keep working.

## 4. Increments (each one PR, repo checks green, flag off by default)

| # | What | Done when |
|---|---|---|
| B2a | The dependency (pinned, advisories checked), the `auth` schema migration generated by Better Auth's tool, the auth module, the routes mounted before the JSON parser, `.env.example` entries. | On your desktop, signing in with real Google sets a session cookie and `/api/me` returns your user (found or created). |
| B2b | The guard that replaces the stub (dev header only in dev and test), the `users` upsert, tests that sign in through the test-only path and exercise commands and sync with a real cookie. | A request with no session is 401; the dev header is refused when `NODE_ENV` is production; two users with sessions never see each other's rows. |
| B2c | The two roles, RLS on every synced table and on `users`, the `SECURITY DEFINER` function, the API connecting as `ironlog_app`, `seed-test-user` running as the owner. | A test as the app role reads and writes only the caller's rows, sees nothing without `app.user_id`, and cannot insert a row for another user; the Neon pooled-endpoint test passes. |
| B2d | The Origin check, secure cookies, `trust proxy`, auth-route rate limits, security headers. | Tests for each; a cross-origin POST with a valid cookie is refused. |
| B2e | The Account panel, the sign-in card, the 401 flow end to end, browser tests (the card, a refused development header in a production build, sign-out). | Signed out shows the card; signing in and out works against the real API in `e2e:sync`. |
| B2f | ADR 004 updated with what was built; [[feature-map]] and the sign-in notes. | The docs match. |

Order: B2a to B2d are server work and need only your Google OAuth client and a Neon role; B2e needs B2a to B2c. **Nothing here needs Cloud Run.** The iPhone test happens at the first real deploy (Phase F), which is also the first time the redirect URI is the real URL.

## 5. Risks

- **Installed iOS PWA and Google's redirect** (the S0 question). Not tested; the plan is to find out at the first deploy. If it fails: try a popup or Google's ID-token flow before touching ADR 004 or the same-origin choice; if the cookie is the problem, a bearer token behind the same guard.
- **RLS plus pooled connections.** Tested in B2c, on Neon, before anything depends on it.
- **A Better Auth advisory.** Several exist, mostly in plugins we do not use and in email and password registration, which stays off in production. Check the repository's security tab when pinning the version, and turn on dependency alerts.
- **The admin account is the highest-value target.** Use the Google account with 2-step verification; set `users.is_admin` once by hand in SQL, never from a request. Keep one written recovery step.
- **Locking myself out.** The development header and the sign-in guard must not both be off: a test fails the build if a production configuration has neither.

## 6. What I need from you (before B2a)

1. **A Google Cloud OAuth client (web application)** for the real app. Redirect URIs: `http://localhost:3001/api/auth/callback/google` (or whichever port we use locally) and, later, `https://<the Cloud Run URL>/api/auth/callback/google`. The spike's client can be reused, but a clean one is better: the spike client's secret is on the cleanup list. **Put the client id and secret in `.env` yourself; do not paste them into chat.**
2. **`BETTER_AUTH_SECRET`** (a long random string, `openssl rand -base64 32`), in `.env` the same way.
3. **Neon:** permission to create a database role. I need `ironlog_app` (with a password you set and keep) on the real project, and a Neon branch to run the pooled-connection test against, so no real data is at risk.
4. **Which Google accounts:** yours (the owner and admin) and a separate Gmail for the test user.

## 7. Decisions for you

1. **Roles and RLS as designed** (an owner role for migrations, a restricted app role for the API), or defer RLS and rely on the API guard alone for now? Recommended: as designed; it is the backstop ADR 004 asks for, and it is far easier before real data exists.
2. **A new OAuth client for the real app** (recommended), or reuse the spike's?
3. **Keep the development header** for local development and tests after B2 (recommended; it is refused anywhere else), or remove it and use only the test-only email and password path?
4. **The test-only email and password configuration** for automated sign-in (recommended), or hand-craft session cookies in tests?
5. **Sign-in card wording and placement:** the board's loading area when signed out, plus an Account panel in Settings. OK?
6. **Stop the leftover spike server now?** I will not touch it unless you say so.

## 8. Not in Phase B

Email and password sign-in for users, sharing between users, a second admin, account deletion and a privacy policy (Phase F), and rate limits on the command endpoints (Phase F).

## 9. Status (2026-10-08)

**Advisory check done** (the one ADR 004 asked for). Better Auth's latest release is **1.7.7**, which is the version pinned exactly. GHSA-965c-763c-88jm (critical: OAuth state usable as a magic link) affects 1.4.0-beta.18 through 1.7.6 and needs the Magic Link plugin enabled as well; 1.7.7 is the fix and we use no plugins. The other published advisories are in plugins we do not use (SSO, SCIM, Stripe, OAuth proxy, device authorization) or in email-and-password flows, which exist only in the test configuration. Turn on dependency alerts on the repository.

**B2a built** (PR #114): Better Auth 1.7.7 pinned, no plugins; migration 008 creates the `auth` schema from the definitions Better Auth itself generates; Better Auth reaches the tables by **schema-qualified name** (`auth.user` etc.), tested to work and chosen because a connection-level `search_path` may not survive Neon's pooler; Google's tokens are stored encrypted; session cookie HttpOnly, SameSite=Lax, 30 days, Secure with the `__Secure-` prefix over https; the routes are mounted before the JSON parser; email and password exists only in a test configuration and the server refuses to start with it unless `NODE_ENV` is development or test; sign-in stays off, with the reasons logged, unless all of `BASE_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `BETTER_AUTH_SECRET` and `DATABASE_URL` are set. The generated database types and `db:check` leave the `auth` schema alone (it is Better Auth's, not our code's).

**Your local setup, decided:** the app reads the repo's root `.env`; the spike's Google client is reused for development (its redirect list needs `http://localhost:3002/api/auth/callback/google` added); all B2 work runs against the local Docker Postgres, never the Neon `production` branch.

**B2b built** (PR #115): `sessionAuth` replaces the stub. A Better Auth session cookie resolves to our own `users` row (found or created by `auth_user_id`, one round trip, safe under concurrent first requests); only where `NODE_ENV` is development or test, a dev header can name a dev user (a session wins when both are sent); otherwise 401. **A failure to look the session up is a 503, never a 401**, so a database problem cannot look like being signed out and make the phone ask the user to sign in again. `/api/me` now reports `account` (kind, email, name). A bare page at `/dev/auth` (development only, and only when sign-in is configured) is for trying real sign-in by hand. At startup, outside development and test, a server with sign-in off logs that nobody can sign in. **Still to do by hand, once:** real Google sign-in on the desktop through `/dev/auth` (the one thing a test cannot drive).

**B2b verified by hand (2026-10-08):** real Google sign-in on the desktop through `/dev/auth` worked; `/api/me` returned the Google account.

**B2c built** (PR #116): migration 009 creates `ironlog_app` (no login, no password) and turns row-level security on for every table. The API role may read, insert and update the caller's own rows and **cannot delete anything** (rows are soft-deleted); it cannot insert users or touch `is_admin` (a user row is made by `ensure_user()`, a security-definer function, the one door); it cannot read `row_history` (the history trigger now runs as the owner) or `refused_writes` (insert only); it has full access to Better Auth's tables. Policies read `app.user_id`, set per transaction; unset or empty means nothing is visible. The API checks at startup which role it is and **refuses to run in production as a superuser, a role with BYPASSRLS, or the table owner** (retrying a database that is still waking up). `APP_DATABASE_URL` is the API's connection; `DATABASE_URL` stays the owner that runs migrations. Tests (58, as the restricted role): reading, writing, refusals, `users`, `ensure_user` under concurrency, the history trigger, the whole API (Better Auth, commands, pull) as the restricted role, and a **coverage test that fails if any future table lacks row-level security or a policy**. `npm run e2e:sync` now runs the API as the restricted role. `scripts/check-pooled-rls.mjs` proves the per-request setting survives Neon's pooler; it is ready, and waits for the Neon role.

**B2d built** (PR #117): `originGuard` refuses a state-changing `/api` request whose `Origin` is present and is not this host or `BASE_URL` (403, before the body is read). Security headers on every response (nosniff, frame denial, referrer and permissions policy, COOP, a CSP of own scripts plus `api.github.com`, HSTS over https). `trust proxy` is 1 when `K_SERVICE` is set (`TRUST_PROXY` overrides). `/api/auth` is rate-limited per `req.ip` (sign-in 10/min, rest 120/min; in memory, so per Cloud Run instance); Better Auth's own limiter is not used because it gives up on a multi-hop `X-Forwarded-For`. The Vite dev proxy now keeps the `Host` header, or dev and `e2e:sync` look cross-origin. The CSP has not met a real installed PWA yet: check at the first deploy.


**B2c verified on Neon (2026-10-08):** `check-pooled-rls.mjs --scratch` printed `Passed.` as `ironlog_app` through the pooler on a scratch branch. Migrations 001-009 were also applied to Neon `production` by mistake (0 rows, additive, role has no login); treat Phase F's production-migration step as done.

**To finish B2c on Neon (your steps, on a scratch branch, never production):**
1. In the Neon console, use the spike's branch `spike-s0` (or make a new branch) as the scratch branch.
2. Run the migrations on it with that branch's **direct (unpooled)** connection string: `DATABASE_URL='<owner, unpooled, scratch>' npx dbmate up`.
3. In that branch's SQL editor: `ALTER ROLE ironlog_app LOGIN PASSWORD '<a password you choose and keep>';`
4. Build `APP_DATABASE_URL` from the branch's **pooled** connection string with the user `ironlog_app` and that password. Keep it in your shell or `.env`, never in chat or a commit.
5. `APP_DATABASE_URL='<that>' node scripts/check-pooled-rls.mjs --scratch` and tell me whether it printed `Passed.`

**B2e built** (PR #118): the Account panel (Settings, flag on only), the "Sign in to sync" card on a 401, and **one account per device**: the first account to sync owns the local data (`sync/owner`); a different account signing in on a device with data pauses sync (reason `account`) until the user downloads a copy and wipes it, or signs out. A second Playwright config (`playwright.accounts.config.js`, run by `npm run e2e:sync`) tests the production build with real cookies through Better Auth's test sign-in: no dev header sent, the card, sign-out, and a second account held back. **B2f done:** ADR 004 has a "What was built" section; [[feature-map]] has the Accounts paragraph. **Left for the first deploy:** Google in an installed iPhone PWA, the CSP, the cookie on the real origin. **Left for you, by hand:** set the admin flag after your first real sign-in (`update users set is_admin = true where auth_user_id = (select id from auth."user" where email = '<your email>')`, local first).
