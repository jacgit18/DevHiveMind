# Iron Log: priority read
_Last reviewed 2026-10-09. About 150 files in this folder; roughly 100 are generated security-audit output. Ranked from each doc's opening lines and how often others link to it._

## Read first
1. [[Iron Log Design Mind Map.canvas|Design mind map]] (`architecture/Iron Log Design Mind Map.canvas`): the whole design on one page, links out to everything below.
2. [[Projects/iron-log/docs/backlog|backlog]]: source of truth for intent and what is next (Phase F follow-ups and security follow-ups at the top).
3. [[feature-map|feature map]]: what the app does, where it lives in code, and the 21-entry conflict register. Read the conflicts before touching the board, log or imports.
4. [[Projects/iron-log/docs/architecture/stack-walkthrough|stack walkthrough]]: all 16 backend decisions (ADR 017, release strategy, is newer) in one table, plus cross-cutting obligations.
5. [[deploy-runbook|deploy runbook]]: how production runs (Cloud Run + Neon), who does which step.

## Agent guardrails (short, read at session start)
[[ROADMAP|ROADMAP]] (what to build, out of scope), [[Projects/iron-log/docs/ARCHITECTURE|ARCHITECTURE]] (where code lives), [[DECISIONS|DECISIONS]] (ADR index), [[CHANGELOG|CHANGELOG]] (what changed). README is in the repo. UI work: read the five in `ux/` first ([[UX-DESIGN-BRIEF|brief]], [[USERFLOW|userflow]], [[DESIGN-SYSTEM|design system]], [[COMPONENTS|components]], [[SCREEN-SPECS|screen specs]]).

## Read when you touch...
- **Data or sync:** [[backend-data-rules|backend data rules]], [[iron-log|data model]], [[sync|sync failure modes]].
- **A backend decision:** ADRs in `architecture/decisions/` (001 to 017); start with 003 (sync), 004 (auth), 009 (data access). [[build-spec|build spec]] links them all.
- **Security:** [[Projects/iron-log/docs/security-audit/README|security audit README]] then [[REPORT|run-1 REPORT]]; open leads in `NEEDS-VALIDATION.md`.
- **Feature flags:** [[feature-flags|feature flags]].
- **Tests:** [[playwright-implementation|Playwright guide]].
- **Neon workflow:** [[neon-setup-and-workflow|Neon setup]].

## Reference and history (only when asked why)
- `superpowers/specs/` and `superpowers/plans/`: the Oct 1-5 board feature designs (day 7, swap days, day dates, experiment board, card moves). Shipped; the feature map is the current truth.
- [[phase-b-brief|phase B brief]], [[phase-d-brief|phase D brief]], [[typescript-migration|TypeScript migration]]: finished phases.
- [[exercise-catalog-idea|exercise catalog idea]]: not started.
- `restore_local.txt`, `restore_remote.txt`: backup restore snippets.

## Generated bulk (skip unless auditing)
- `security-audit/run-1/` except `REPORT.md`, `FINDINGS-DETAIL.md`, `NEEDS-VALIDATION.md`: candidate/result JSON, agent artifacts, ingest scripts.
- `images/`: screenshots used by the README.

## Where truth lives
Feature map wins over the README on behaviour; ADRs win over the walkthrough on a decision. This `docs/` folder in the vault is live; any copy inside the project repo is frozen.
