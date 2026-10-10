# Codebase audit: finance-dashboard, 2026-10-10 (run 2)

Stack: FastAPI + SQLAlchemy/Alembic + Postgres (uv), React 18 + Vite 5 + TypeScript (npm), Docker Compose + Caddy + Cloudflare tunnel, GitHub Actions.
Scope: `finance-dashboard/`. Commit: 3ed667c. Compared against `2026-10-10-codebase-audit.md` (run 1).
Location rule used: repo rules (`conventions.md`: docs live under DevHiveMind `EndToEnd-App-with-AI-Using-skills/finance-dashboard/docs/`).

## Summary

- Top risk: the login rate limiter is probably bypassable through a spoofed `X-Forwarded-For` (suspected, code facts confirmed, behaviour not tested). Next: 2 moderate `react-router` advisories, and a local test run that skips 64% of tests.
- Health: typecheck and 109 frontend tests pass; backend 173 pass, 312 skipped. Every router except `/api/auth` and `/health` requires a session plus CSRF.
- Not run: ruff, mypy, pyright, vulture, deptry, pip-audit, knip, depcheck, JS lint (none installed).

## Findings, ranked

| # | Severity | Area | Finding | Evidence | Suggested fix | Status |
|---|---|---|---|---|---|---|
| 1 | High (suspected) | Auth | Login rate limit (10 / 15 min) is keyed on `request.client.host`. Prod runs uvicorn with `--proxy-headers` and `FORWARDED_ALLOW_IPS="*"`, and Caddy trusts `private_ranges` without strict mode. If the leftmost `X-Forwarded-For` entry wins, an attacker rotating that header gets a fresh bucket per attempt and guessing is unlimited. Which entry the installed uvicorn and Caddy pick was not tested. | `backend/app/rate_limit.py:26-31`; `compose.prod.yaml:71,80`; `Caddyfile.prod:20-27` | Test against the running stack (send varying `X-Forwarded-For`, count 429s). Fix: key on `CF-Connecting-IP`, or trusted_proxies_strict plus rightmost-untrusted, and add a global (non-IP) limit. | New |
| 2 | Med | Dependencies | `react-router` / `react-router-dom` 6.30.6: open redirect (GHSA-wrjc-x8rr-h8h6) and SSR `deserializeErrors` injection (GHSA-337j-9hxr-rhxg). Fix offered is 7.18.4 (breaking). SSR one looks unreachable in a client-only SPA (suspected). | `npm audit --omit=dev`, re-run this audit | Plan v7 upgrade as its own PR. | Still open (run 1 #1) |
| 3 | Med | Tests | `pytest -q`: 173 passed, 312 skipped. Cause confirmed: `iron-log-db-1` publishes `127.0.0.1:5433`, so the finance test DB cannot bind there and the `finance` user is rejected. CI is protected (`REQUIRE_DB=1`). | `ss -ltn`, `docker ps`, `pytest -rs`, `tests/conftest.py:75` | Stop iron-log's DB or move one project's port; run local tests with `REQUIRE_DB=1` so skips fail. | Still open; cause now confirmed (run 1 #2) |
| 4 | Med | Uploads | 2 MB cap is applied after Starlette has already spooled the whole multipart body; no body limit in `Caddyfile.prod` or the app. An authenticated caller can post a huge file to `/api/imports*` before the check runs. | `backend/app/routers/imports.py:44-50`; `grep` for `request_body`/`max_size`/`Content-Length` found none | Caddy `request_body { max_size 3MB }` on `/api/imports*`, or check `Content-Length` first. | New (confirmed) |
| 5 | Med | CI / hygiene | No Python lint/typecheck, no JS lint script, no vulnerability audit step, no Dependabot (`.github/` has only `workflows/`). | `ls .github`; `package.json` scripts; `ci.yml` | Add `ruff check`, `pip-audit`, `npm audit --omit=dev` (non-blocking first) and `.github/dependabot.yml`. | Still open (run 1 #3) |
| 6 | Low | Auth | Rate-limit state is a per-process `defaultdict(deque)` that never deletes keys, so memory grows with distinct client keys (worse with #1). Counters reset on restart. | `rate_limit.py:23,36-40` | Delete empty keys after pruning; cap entries. | New (confirmed) |
| 7 | Low | Imports | Descriptions starting `= + - @` are stored verbatim; formula injection if data is ever exported to a spreadsheet. No export endpoint seen, so latent. | `importer.py:272-284`, `routers/imports.py:215` (per review, not re-read) | Prefix with `'` on export, not on import. | New (reported, not re-verified) |
| 8 | Low | Auth | No Origin/CSRF check on `POST /login` (login CSRF); `SameSite=lax` mitigates. Logout `delete_cookie` omits secure/httponly/samesite. | `routers/auth.py:30,84` (per review) | Optional. | New (suspected) |
| 9 | Low | Dependencies | Updates available: playwright, react-query (minor); react 19, vite 8, vitest 5, typescript 7 (majors). | `npm outdated` (run 1) | Minors now; each major separately. | Not re-checked this run |
| 10 | Low | Dead code | Unused-code scans not run. | tools missing | Install once, scan, decide on CI. | Still open (run 1 #5) |

Resolved this run: run 1 #7 (`cookie_secure`): `config.py:84` returns `env == "prod"` and `compose.prod.yaml:66` sets `ENV: prod`. Run 1 #6 (dynamic SQL) unchanged, still fine.

## Checks run / not run

| Check | Result | Notes |
|---|---|---|
| `npm audit --omit=dev` | 2 moderate | #2 |
| `tsc --noEmit` | Pass | |
| `vitest run` | 109 passed | |
| `pytest -q -rs` | 173 passed, 312 skipped | #3 |
| Port 5433 owner | `iron-log-db-1` | |
| Router auth map | Every router except auth/health has session + CSRF | per subagent, `main.py:37-61` |
| `npm outdated` | Not re-run | run 1 result stands |
| ruff, mypy, pyright, vulture, deptry, pip-audit, knip, depcheck, JS lint | Not run: missing | |

## Delegated skills

- Security review: done by a read-only `feature-dev:code-reviewer` subagent on auth, sessions, rate limit, uploads, config. The skills `security-review` / `security-audit` work on a diff or are heavier, so the subagent stood in. Its claims for #1, #4, #6 were re-checked against the code by me; #7 and #8 were not.
- `/repo-reality-audit`: slash-only, not run. Suggest `/repo-reality-audit` for docs-vs-reality.
- `code-review`, `simplify`, `change-surface-audit`, `repo-scanner`: not run (no diff to review; hotspots not analysed).

## Not verified

- Actual behaviour of the rate limiter under a spoofed header (#1): needs a test against the running stack.
- Caddy and Cloudflare headers beyond what the config files show.
- Whether the real-stack CI job currently passes.
- Docs/ADRs vs code beyond the README's docs-location note.
- Everything outside auth, uploads and config: transactions, budgets, reconcile logic.
