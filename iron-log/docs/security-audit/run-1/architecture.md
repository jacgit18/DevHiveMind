# iron-log architecture (audit run-1, commit 979f6ea, profile standard, full scope)

**Product.** Offline-first workout-tracker PWA (React 19/Vite, zustand). Optional sync (flag `apiSync`, off by default, on in the Cloud Run build) to an Express 5 API (`server/`) with Google-only better-auth sessions and Postgres (kysely/pg, Neon in prod). One real tenant type: a signed-in Google user with a private dataset. Protected resources: each user's logs, programs, weeks, body weight, library; better-auth session/provider-token rows (`auth` schema); operator secrets and deploy authority (GCP, GitHub OIDC).

**Principals.** Anonymous: `/api/health*`, `/api/auth/*`, `POST /api/client-errors`, static/SPA. Signed-in user: `/api/me`, `/api/sync`, ~20 `/api/commands/*`, account erase/delete. Dev user (`X-Dev-User`) only when NODE_ENV development/test. Operator/DB owner is not an HTTP principal. DB role `ironlog_app` runs queries.

**Comparable baseline.** better-auth + Google OAuth; Postgres RLS keyed on a per-transaction GUC (`app.user_id`). Custom outbox/pull/merge sync (no PowerSync-style comparable).

**Stack/deploy.** TypeScript; esbuild bundle `dist-server/index.mjs`; Docker node:22-slim non-root; Cloud Build -> Cloud Run (max 1 instance, `K_SERVICE` -> trust proxy 1); GitHub Pages static build. Offline limits: host Node 20 (engines >=22); server tests touching auth/RLS/commands need Docker testcontainers (not runnable in the no-network sandbox); `.env` (Neon creds) is never exposed to the sandbox.

**Middleware order (server/app.ts).** securityHeaders (L77) -> originGuard on /api (L79; missing Origin passes) -> better-auth mount with IP rate limits (L81-86) -> client-errors (4kb) (L88) -> json 100kb / import-legacy 4mb (L90-91) -> unauthenticated health (L94-110) -> clientVersionGate (L113) -> /dev/auth (dev only) -> /api rate limit -> sessionAuth (L120) -> per-user limits -> routes. Static + SPA fallback last (L294-303).

**Paths of interest.** sessionAuth: cookie session -> `ensure_user()` SECURITY DEFINER -> `inUserTransaction` sets `app.user_id` -> RLS `own_rows` (no FORCE RLS; role check only warns/refuses in prod for superuser/BYPASSRLS/owner). Commands validate with `src/shared/*` (normConfig spreads unknown keys; several normalizers lack key/id caps); `refused_writes.payload` stores unscrubbed bodies with no retention; import-legacy 4mb/20k commands. Client: xlsx/csv/JSON/GitHub restore imports -> normalize* -> localStorage/db; user URLs from `cfg.ex[].url` and `backup.last.url` reach `<a href>` with only partial scheme checks; GitHub token in plaintext localStorage.

**Trust boundaries / strongest controls.** CSRF: SameSite cookie + custom header preflight + originGuard. Authn: better-auth server-side sessions. Tenant isolation: RLS + explicit user_id filters. XSS: CSP `script-src 'self'`, no innerHTML sinks. Rate limits: in-memory per instance. Supply chain: lockfile with integrity; actions pinned by tag only; OIDC (no stored secrets).

**Unobservable (needs_validation if decisive).** Cloud Run invoker policy, live NODE_ENV/secrets/BASE_URL/MIN_CLIENT_VERSION, real Neon role grants, pooler + SET LOCAL behavior, GitHub environment reviewers/branch protection, Workload Identity attribute conditions.

**Starting paths.** server/app.ts, server/auth.ts, server/auth/betterAuth.ts, server/originGuard.ts, server/db/role.ts, server/commands/*, src/shared/*, db/migrations/*, src/store/settingsSlice.ts, src/lib/excelImport.ts, src/lib/export.ts, src/lib/github.ts, src/sync/*, .github/workflows/*, Dockerfile, cloudbuild.yaml, scripts/*.sh.

**Prior coverage.** No prior runs; all units `none`.

**Companions selected.** WEB-PROTOCOL-AND-AUTH (sessions, CSRF, OAuth), CLIENT-SIDE (SPA, storage, SW, URL sinks), DATA-ISOLATION-AND-LIFECYCLE (RLS, import/restore, erase), SUPPLY-CHAIN-AND-RELEASE (CI, deps), CLOUD-AND-DEPLOYMENT (Cloud Run, secrets), RESOURCE-EXHAUSTION-AND-AVAILABILITY (unauth endpoints, imports). Excluded: MEMORY-SAFETY-AND-BINARY (no native code), AI-AND-LLM (no model/agent), PROTOCOLS-RPC-AND-MESSAGING (plain JSON HTTP), DESKTOP-MOBILE-AND-LOCAL-IPC (no native shell).
