# Phase 9 spec — Plaid bank sync (sandbox first)

Written 2026-10-03 via `spec-drift-gate`. Lives in the DevHiveMind copy of the docs (the repo
copy is frozen as of this date). Builds **after Phase 8** (CI/CD); see [[phase8-spec]].

**Build has not started.** Decision on record: `decisions-log.md` entry
`D-2026-10-03-plaid-over-webull` (Plaid over Webull, "probably", no confidence stated).

## Assumptions (the owner skipped the scoping questions — correct any that are wrong)

1. **Data:** Plaid **sandbox only** (fake institutions, fake data). Connecting real bank
   accounts is a separate, later decision and needs its own amendment to this spec.
2. **Sync trigger:** manual "Sync now" button only. No scheduler.
3. **Duplicates:** a synced row that matches an existing row is skipped automatically, using
   the ADR-0005 dedupe key. No review screen this phase.
4. **Token storage:** Plaid access tokens encrypted at rest in Postgres; the encryption key
   comes from `.env` like the other secrets (ADR-0014). Tokens never reach the browser.
5. **Spend cap:** $0. If sandbox needs a card or a paid plan, stop.
6. **UI:** one new "Linked accounts" screen (link, sync, unlink) plus a sync-status line on
   the Import page. No other redesign this phase.
7. **Reconciliation invariant:** adopted (below).

## Problem

Transactions get into the dashboard by manual entry or CSV export from the bank. That is
slow and gets skipped, so balances drift from reality. Plaid can deliver accounts and
transactions directly. The owner also wants real experience integrating a third-party
financial API (token handling, sync cursors, idempotent ingest) — a career-learning goal, per
the standing axis, which is why sandbox counts as a win here.

## Tradeoffs actually weighed

| Option | Why it lost / won |
|---|---|
| **Plaid sandbox, manual sync** (chosen) | Free, no real data leaves the machine, exercises the whole integration shape. |
| Plaid live data from day one | Real transaction text and balances pass through a third party and tokens live on the VPS. Collides with the privacy line already drawn for Sentry ([[paid-options]]). Possible later, as an amendment. |
| Keep CSV only | Zero risk and zero cost, but no new capability or integration experience. |
| Webull (brokerage) | Different product (holdings, not budgeting); owner chose Plaid. Not rejected forever. |
| Scheduled background sync | Needs a worker/scheduler and failure handling the single-owner app has none of. Manual sync proves the pipeline first. |

## Scope boundary

### In scope
- Backend: Plaid client wrapper; Link token endpoint; public-token exchange; encrypted
  `plaid_items` table (migration); `POST /api/plaid/sync` using Plaid's transactions-sync
  cursor; mapping Plaid accounts to `accounts` and Plaid transactions to `transactions`
  with the ADR-0005 dedupe key; unlink endpoint that revokes the item and deletes the stored token.
- Frontend: "Linked accounts" page (Plaid Link, per-item sync, unlink) and a sync-status line
  on Import. Meets the AAA / Lighthouse rules in `.claude/rules/web-accessibility-and-lighthouse.md`.
- Docs: new ADR (next number, 0023: Plaid as the bank-connectivity provider and how tokens
  are stored), [[paid-options]] "Bank connectivity" row updated, [[EndToEnd-App-with-AI-Using-skills/finance-dashboard/docs/backlog|backlog]] Phase 9 note.
- Tests: backend (mocked Plaid), frontend, axe at 1280px and 320px for the new page.

### Out of scope (this phase)
- Real bank accounts / Plaid production or development keys.
- Scheduled or webhook-driven sync.
- A duplicate-review UI, pending-to-posted transaction handling beyond what the cursor gives for free.
- Investments, liabilities, identity, income, or any Plaid product beyond transactions.
- Webull, Bigdata.com, and the broader "revisit UI" redesign — separate later decisions.
- Multi-user support; Plaid items belong to the single owner.
- Rewriting CSV import. It keeps working unchanged.

## Reconciliation invariant

For every account, **displayed balance = starting balance + sum of its transactions**, with
synced and CSV-imported rows counted once each. This is the first slice's test, and it reuses
the existing `reconcile.py` check. Syncing the same Plaid data twice must change nothing.

## Controlled-experiment slice

Slice 1 is **backend only, run from a script/test, no UI**: exchange a sandbox public token,
pull transactions with the sync cursor, and ingest them with dedupe. Cheap to discard. It
answers the uncertain questions first: what Plaid's sandbox really returns, how the cursor
behaves, and whether the dedupe key collides with Plaid rows.

## Slices

1. Backend experiment: sandbox token exchange + sync cursor + ingest + the invariant test;
   run twice to prove idempotence.
2. `plaid_items` migration, token encryption, config keys; ADR 0023.
3. Link-token, exchange, sync and unlink endpoints with tests (Plaid mocked).
4. "Linked accounts" page + Import status line; axe and Lighthouse on both.
5. Docs closeout: [[paid-options]], [[EndToEnd-App-with-AI-Using-skills/finance-dashboard/docs/backlog|backlog]], verification record; deliver per
   `incremental-build-pacing`.

## Tripwires (stop and ask)

- Sandbox needs a card, a paid tier, or approval/production review → stop (spend cap is $0).
- Any wish to connect a real bank account → stop; that is an amendment, not a default.
- Plaid transactions that cannot map cleanly onto `transactions` (pending vs posted, sign
  convention, currency) or that collide with the ADR-0005 dedupe key → the money-representation
  rule (ADR-0005) decides; if it doesn't, ask.
- Where the encryption key lives, or any pressure to log or return a token → stop.
- Anything in the sync response worth storing beyond what the existing columns hold (merchant
  names, categories, location) → new scope; ask.

## Progress

Not started. Waiting on Phase 8 and the owner's go.
