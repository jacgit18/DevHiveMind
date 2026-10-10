# Codebase audit: finance-dashboard, 2026-10-10

Stack: FastAPI + SQLAlchemy/Alembic + Postgres (uv, Python >=3.13; venv 3.14), React 18 + Vite 5 + TypeScript (npm), Docker Compose + Caddy, GitHub Actions CI.
Scope: `finance-dashboard/` (backend, frontend, CI). Repo-root skill catalog out of scope.
Commit: 3ed667c (main, clean tree). First audit; no previous report to compare.

## Summary

- Top risks: 2 moderate `react-router` advisories with no fix inside the 6.x line; local backend run skips 312 of 485 tests (64%) because the local Postgres is not reachable.
- Health: frontend typecheck and 109 unit tests pass; backend 173 pass; CI is broad (DB-backed tests, build, Playwright+axe, real-stack Lighthouse) but has no lint and no dependency-vulnerability step.
- Not run: ruff, mypy/pyright, vulture, deptry, pip-audit, knip, depcheck (none installed; not installed by this audit). No JS lint script exists.

## Findings, ranked

| # | Severity | Area | Finding | Evidence | Suggested fix | Status |
|---|---|---|---|---|---|---|
| 1 | Med | Dependencies | `react-router` / `react-router-dom` 6.30.6 flagged by `npm audit --omit=dev`: open redirect via backslash in `<Link>`/`useNavigate` (GHSA-wrjc-x8rr-h8h6) and constructor injection in `deserializeErrors()` SSR hydration (GHSA-337j-9hxr-rhxg). npm lists the affected range as 6.0.0-7.17.0; the only fix offered is 7.18.4 (breaking). | `npm audit` output: "2 moderate severity vulnerabilities" | Confirmed present. Likely low real exposure (suspected): the app is a client-only SPA so the SSR advisory looks unreachable, and the redirect advisory matters only if a link target comes from user input. Check both, then plan the v7 upgrade as its own PR. | New |
| 2 | Med | Tests | Local `pytest -q`: 173 passed, 312 skipped. Skips are the DB-backed suite, reason: Postgres at localhost:5433 refused the connection, "password authentication failed for user finance". `docker ps` shows no `finance-dashboard-db`; `iron-log-db-1` and `finance-prod-db-1` are up. | `uv run --frozen pytest -q -rs`; `conftest.py:75` | Confirmed: a green local run proves little. CI is protected (`REQUIRE_DB=1` makes skips fail, `conftest.py:75`). Suspected: something else owns port 5433 locally. Start the project DB (compose) before trusting a local pass, or set `REQUIRE_DB=1` locally so skips fail loudly. | New |
| 3 | Med | CI / hygiene | CI has no Python lint or typecheck, no JS lint script, no `npm audit` / `pip-audit` step, and no Dependabot config (`.github/` holds only `workflows/`). Finding 1 would have surfaced automatically with an audit step. | `grep` of `.github/workflows/*.yml`; `package.json` scripts; `ls .github` | Add `ruff check` + `pip-audit` (backend) and `npm audit --omit=dev` (frontend) as non-blocking steps first, plus `.github/dependabot.yml` for npm, pip/uv and github-actions. | New |
| 4 | Low | Dependencies | Minor/patch updates available: `@playwright/test` 1.63.0 to 1.64.0, `@tanstack/react-query` 5.102.8 to 5.104.1, `@types/node` 22.20.2 to 22.20.5. Majors behind: react 18 to 19, vite 5 to 8, vitest 2 to 5, typescript 5.9 to 7, jsdom 25 to 30, lighthouse 12 to 13. | `npm outdated` | Take the minors now. Treat each major as its own change. Do not batch. | New |
| 5 | Low | Dead code | Unused-code and unused-dependency scans did not run. Neither `knip` nor `depcheck` is installed locally, and the Python tools are missing too. | `ls node_modules/.bin`; `command -v` for each tool | Run once with the tools available, then decide whether to add to CI. | New (not run) |
| 6 | Info | Security | Dynamic SQL in `routers/dashboard.py` uses f-strings, but the interpolated `_range_sql()` returns only constant fragments (`"t.date >= :start"` plus optionally `" AND t.date < :end"`) and values are bound through `params`. Not injectable as written. | `dashboard.py:30-32`, `:44-78`, `:128-140` | None. Keep the helper constant-only; a reviewer should reject any change that passes user input into it. | Confirmed OK |
| 7 | Info | Security | Session cookie sets `httponly=True` and `samesite="lax"`; `secure` comes from `settings.cookie_secure`. No `CORSMiddleware` found. The `cookie_secure` default and prod value were not checked. | `routers/auth.py:53-59`; `grep CORSMiddleware app` | Verify `cookie_secure` is true in `compose.prod.yaml` / prod env (see Not verified). | Suspected gap in evidence |

Checked and clean: no tracked `.env` (only `.env.example`, `backend/.env.example`, `backend/.env.docker.example`), no key-shaped strings in tracked files, no tracked `dist/`, `node_modules/`, `backups/` or `lighthouse-reports/`, both lockfiles committed, no remote branches merged but undeleted, 1 TODO/FIXME in the tree, largest tracked files are lockfiles (220 KB, 188 KB).

## Checks run / not run

| Check | Result | Notes |
|---|---|---|
| `npm audit --omit=dev` | 2 moderate | Finding 1 |
| `npm outdated` | 16 packages behind | Finding 4 |
| `tsc --noEmit` | Pass (exit 0) | Run with `npx --no-install` |
| `vitest run` | 109 passed, 11 files | |
| `pytest -q` | 173 passed, 312 skipped | Finding 2 |
| Secrets / tracked env / big files / lockfiles / TODO count | Clean | See list above |
| Merged-but-undeleted remote branches | None | |
| CI covers tests | Yes | Backend (real Postgres, `REQUIRE_DB=1`), frontend test + build, e2e + axe, real-stack Lighthouse |
| CI covers lint | No | Finding 3 |
| `knip` / `depcheck` | Not run: missing | |
| `ruff`, `mypy`, `pyright` | Not run: missing | |
| `vulture`, `deptry`, `pip-audit` | Not run: missing | |
| JS lint | Not run: no script or eslint installed | |
| `/repo-reality-audit` | Not run | Slash-only; see below |

## Delegated skills

- `repo-reality-audit`: slash-only, so not invoked. Run `/repo-reality-audit` for the docs-vs-reality pass.
- `repo-scanner`, `security-review`, `security-audit`, `code-review`, `simplify`, `change-surface-audit`: not invoked this run. Inline fallbacks used and they are shallow: churn list, a read of the SQL and cookie code, and the CI file. Highest-churn files (90 days): `docs/spec.md`, `docs/backlog.md`, `README.md`, `frontend/src/App.tsx` (11), `frontend/src/api/client.ts` (10), `backend/app/main.py` (10).

## Not verified

- Production `cookie_secure` value and Caddy security headers.
- Auth flow, rate limiting (`app/rate_limit.py`), the CSV import path and the session model: not reviewed.
- Whether the docs and ADRs match the code: not checked beyond the README's docs-location note, which is accurate.
- Whether the real-stack job and Lighthouse pass currently: CI results not fetched.
- Which process owns local port 5433.
- Whether the react-router advisories are reachable in this app's code.
