# ADR 0023 — Browser tests, accessibility scans and screenshots in CI

- **Status:** Accepted
- **Date:** 2026-10-03
- **Deciders:** the owner
- **Supersedes in part:** ADR-0015 ("one Playwright path, run locally") and ADR-0016
  ("Playwright is not in CI"). The rest of both stands.

## Context

ADR-0015/0016 kept Playwright out of CI because the MVP had no browser infra and one smoke
path was enough. Since then the frontend has grown to seven routes, and the accessibility
policy (`.claude/rules/web-accessibility-and-lighthouse.md`, WCAG 2.2 AAA target) asks for
axe on every route and state after any UI change. The 2026-10-03 accessibility pass ran those
scans by hand-written script, so nothing reran them on the next change. The owner asked for
the Playwright setup used in another project: E2E specs, axe scans, generated screenshots,
and CI for both.

## Decision

1. **Playwright E2E in CI** (`e2e` job in `ci.yml`, alongside the unit/build job), against the
   production build (`vite build` + `vite preview`), Chromium at 1440x900, clock frozen at
   2026-10-15 12:00 America/New_York.
2. **The API is mocked inside the browser** (`frontend/e2e/mock-api.js` via `page.route()`),
   seeded from `e2e/seed.js`. It keeps the contract the SPA depends on: money as strings,
   401 without a session, 403 without the CSRF header, dashboard totals computed the way
   `routers/dashboard.py` computes them.
3. **axe on every route and key state** (`e2e/a11y.spec.js`): AAA + best-practice tags,
   desktop and 320px, light and dark colour schemes, plus a check that the page never
   scrolls sideways.
4. **Screenshots workflow** (`screenshots.yml`, frontend changes only): 14 PNGs. A push to
   `main` publishes them as the baseline (`screenshots-data:main/`). A PR regenerates them,
   diffs against that baseline with pixelmatch, publishes before/after/diff to
   `screenshots-data:pr-<n>/<sha>/`, and keeps one PR comment updated in place. **Nothing is
   committed to the PR branch or to `main`.**

## Alternatives considered

- **Real stack in CI (Postgres + FastAPI + Caddy behind the browser).** Truer, and the
  ADR-0015 smoke path's original intent. Lost on cost and determinism for this pass: it needs
  a login secret, migrations and seeded rows per test, and screenshots would depend on DB
  state. Backend behaviour is already covered by pytest against real Postgres. **Gap kept
  open:** nothing exercises browser → Caddy → FastAPI → Postgres automatically; a single
  real-stack smoke remains a local pre-release step.
  **Closed 2026-10-03 (follow-up):** the `real-stack` CI job. `compose.prod.yaml` +
  `compose.ci.yaml` (own project name, port 8081, random per-run login, no repo secrets),
  brought up by `scripts/real-stack.sh`. It runs one smoke spec (`e2e-real/`, sign in → add
  account → add transaction → dashboard, plus 401 and wrong-password checks) and then
  Lighthouse on all 7 routes × mobile/desktop, signed in, failing under 100 (median of 3
  runs when the first is below 100, for the known 99/100 mobile flicker). The mocked suite
  stays as the fast, deterministic PR gate; this job is the slower truth check.
- **AA-only axe tags** (the source project's set). Rejected: the repo policy targets AAA.
- **Visual assertions (`toHaveScreenshot`) instead of a review workflow.** Rejected for now:
  this app's style is still changing, and a failing pixel test on each restyle is noise. The
  PR comment shows changes for a human to judge.
- **Commit screenshots back to the PR branch** (the source project's pattern). Built first and
  run on PR #156, then dropped. A `GITHUB_TOKEN` push triggers no PR-linked CI. GitHub queued
  the bot commit's `pull_request` run as "approval required", and check runs from a
  `workflow_dispatch` run do not count for the PR. So `main`'s required checks blocked the
  merge. Workarounds were a PAT/App-token secret or a manual "Approve and run" on every push.
  The data-branch baseline needs neither and keeps PNGs out of `main`'s history.
- **Separate `test.yml`** (as in the source project). Rejected: `ci.yml` already runs the unit
  tests and build; a second workflow would run them twice.

## Consequences

- The first run found real defects the manual pass missed: voided and archived rows used
  `opacity: 0.55`, taking text below 7:1 and buttons below 4.5:1. Fixed with a muted text
  colour (`MUTED_ROW`, `src/a11y.tsx`).
- About 2 minutes of extra CI per PR; free while the repo is public (paid-options.md, CI row).
- `screenshots-data` grows by roughly 0.1 to 1 MB per PR push that changes pixels. Prune old
  `pr-*` folders when it gets large. Deleting the branch is fine too: rerun the workflow on
  `main` (workflow_dispatch) to restore the baseline.
- Screenshots are only stable when generated in CI (fonts differ per machine). Local
  `npm run screenshots` output is gitignored and for preview only.
- No dark-scheme screenshots: the app declares no `color-scheme`, so they matched the light
  ones pixel for pixel. The dark axe scans are kept so a future dark theme is covered at once.
- The mock is a second copy of the API contract. A backend change that the mock does not
  mirror passes E2E. The backend's own tests and the client unit tests are the guard there.
- The `e2e` job is a required check on `main` (added 2026-10-03, after PR #156 merged), with
  the other three. A PR whose CI does not run it will wait on it forever.
- A pass is regression evidence, not an accessibility conformance claim (repo policy).
