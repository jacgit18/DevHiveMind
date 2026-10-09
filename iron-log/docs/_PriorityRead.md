# Iron Log: priority read
_Last reviewed 2026-10-09. About 150 files in this folder; roughly 100 are generated security-audit output. Ranked from each doc's opening lines and how often others link to it._

## Read first
1. [[iron-log/docs/architecture/Iron Log Design Mind Map.canvas|Design mind map]] (`architecture/Iron Log Design Mind Map.canvas`): the whole design on one page, links out to everything below.
2. [[iron-log/docs/backlog|backlog]]: source of truth for intent and what is next (Phase F follow-ups and security follow-ups at the top).
3. [[iron-log/docs/feature-map|feature map]]: what the app does, where it lives in code, and the 21-entry conflict register. Read the conflicts before touching the board, log or imports.
4. [[iron-log/docs/architecture/stack-walkthrough|stack walkthrough]]: all 16 backend decisions in one table, plus cross-cutting obligations.
5. [[iron-log/docs/deploy-runbook|deploy runbook]]: how production runs (Cloud Run + Neon), who does which step.

## Read when you touch...
- **Data or sync:** [[iron-log/docs/backend-data-rules|backend data rules]], [[iron-log/docs/data-model/iron-log|data model]], [[iron-log/docs/architecture/failure-modes/sync|sync failure modes]].
- **A backend decision:** ADRs in `architecture/decisions/` (001 to 016); start with 003 (sync), 004 (auth), 009 (data access). [[iron-log/docs/build-spec|build spec]] links them all.
- **Security:** [[iron-log/docs/security-audit/README|security audit README]] then [[iron-log/docs/security-audit/run-1/REPORT|run-1 REPORT]]; open leads in `NEEDS-VALIDATION.md`.
- **Feature flags:** [[iron-log/docs/feature-flags|feature flags]].
- **Tests:** [[iron-log/docs/playwright-implementation|Playwright guide]].
- **Neon workflow:** [[iron-log/docs/neon-setup-and-workflow|Neon setup]].

## Reference and history (only when asked why)
- `superpowers/specs/` and `superpowers/plans/`: the Oct 1-5 board feature designs (day 7, swap days, day dates, experiment board, card moves). Shipped; the feature map is the current truth.
- [[iron-log/docs/phase-b-brief|phase B brief]], [[iron-log/docs/phase-d-brief|phase D brief]], [[iron-log/docs/typescript-migration|TypeScript migration]]: finished phases.
- [[iron-log/docs/exercise-catalog-idea|exercise catalog idea]]: not started.
- `restore_local.txt`, `restore_remote.txt`: backup restore snippets.

## Generated bulk (skip unless auditing)
- `security-audit/run-1/` except `REPORT.md`, `FINDINGS-DETAIL.md`, `NEEDS-VALIDATION.md`: candidate/result JSON, agent artifacts, ingest scripts.
- `images/`: screenshots used by the README.

## Where truth lives
Feature map wins over the README on behaviour; ADRs win over the walkthrough on a decision. This `docs/` folder in the vault is live; any copy inside the project repo is frozen.
