# Running the backend tests

Most backend tests are integration tests (FastAPI `TestClient` against a real, migrated
Postgres). Pure unit tests (`test_money`, `test_config`, `test_importer`, `test_sentry`) need no DB.

```bash
# 1. Database (Compose `db` service, published on localhost:5433)
docker compose -f finance-dashboard/compose.yaml up -d db

# 2. Migrate (from finance-dashboard/backend/; needs backend/.env or AUTH_EMAIL,
#    AUTH_PASSWORD_HASH, SESSION_SECRET set, because Settings validates them)
PYTHONPATH=. uv run alembic upgrade head

# 3. Test
uv run --frozen pytest -q
```

Throwaway DB that cannot touch real data: add `-p tmpproj` to the compose commands and finish
with `docker compose -p tmpproj -f finance-dashboard/compose.yaml down -v`.

## When the DB is missing

`backend/tests/conftest.py` probes the `DATABASE_URL` host/port once per session (1s socket
timeout), then checks that `alembic_version` exists. The header line shows
`postgres reachable and migrated: yes|no - <reason>`.

- **Default:** unit tests run; every DB-backed module (one that imports `app.db.SessionLocal`) is
  **skipped** with one reason, and the run exits 0:
  `Postgres not reachable at localhost:5433 — start it: docker compose -f finance-dashboard/compose.yaml up -d db && (cd finance-dashboard/backend && PYTHONPATH=. uv run alembic upgrade head)`
  A reachable but unmigrated DB skips with `... has no migrated schema — run: ... alembic upgrade head`.
- **`CI=1` or `REQUIRE_DB=1`:** the same condition aborts the session with exit code 1 and the
  message, so CI can never silently skip the integration suite.

Reference counts (2026-10-03): no DB, 173 passed / 312 skipped; migrated DB, 485 passed.

# Running the frontend browser tests (ADR-0023)

From `finance-dashboard/frontend/`. No backend needed: the API is mocked inside the browser.

```bash
npx playwright install chromium   # once
npm run e2e                       # builds, serves on 127.0.0.1:4173, runs e2e/*.spec.js
# Real stack (production compose, throwaway DB, port 8081); needs docker + uv:
#   finance-dashboard/scripts/real-stack.sh up && set -a && . finance-dashboard/.real-stack.env && set +a
#   npm run e2e:real && npm run lighthouse:real ; finance-dashboard/scripts/real-stack.sh down
npx playwright test a11y          # just the axe scans
npx playwright show-report        # after a CI failure: download the playwright-report artifact first
npm run build && npm run screenshots   # preview PNGs in screenshots/ (CI's are the committed ones)
```
