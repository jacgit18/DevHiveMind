# Security audit

Full source audit of iron-log, run with the `security-audit` skill. Source only plus sandboxed local checks; no live system was touched.

## Run 1 (2026-10-08 to 2026-10-09)

Commit `979f6ea920b44302abea3b394f402ebd66179c2e`, profile standard, whole repository. Result: no critical, high or medium finding; 2 confirmed low; 5 open leads that depend on live deployment facts; 5 candidates examined and rejected; about 40 hardening notes.

- [[REPORT|REPORT]]: summary, the two confirmed findings with fixes, the open leads, hardening notes, coverage.
- [[NEEDS-VALIDATION|NEEDS-VALIDATION]]: the five open leads with the exact blocker and a safe check for each.
- [[VALIDATION-2026-10-09|VALIDATION-2026-10-09]]: the follow-up the next day: the sync finding fixed on a branch, and the open leads measured on a local Postgres (the unbounded `/api/auth` body is **reproduced** and fixed on a branch; storage growth, `import-legacy` and the rate-limiter bypass are reproduced; the backup bucket check is still the owner's). Read this after the report: it changes the status of most open leads.
- [[FINDINGS-DETAIL|FINDINGS-DETAIL]]: empty (nothing medium or above) as of the first report; see the validation note for the one lead that now looks higher.
- [[Projects/iron-log/docs/security-audit/run-1/architecture|architecture]]: the architecture summary the hunters worked from.
- Machine-readable: `run-1/findings.json` (12 records), `run-1/coverage-ledger.json` (39 units), `run-1/run-metadata.json`.
- Evidence: `run-1/agents/*/artifacts/out/` (the promoted sandbox outputs the findings cite), `run-1/candidates/` (what each verifier was given), `run-1/results/` (each verifier's decision).
- `run-1/tools/`: the sandbox runner (`sbx.sh`), the evidence-promotion script (`promote.py`) and the ledger and prompt builders, so a second run can reuse them. Their paths point at `~/security-audit-skill/iron-log/run-1/`; change the `OUT` variable first.

Not kept here: the per-agent scratch copies of the source (about 58 MB) and the generated hunter prompts. The original run folder is still at `~/security-audit-skill/iron-log/run-1/` until you delete it.

## What to do with it

The follow-up work is in [[Vault Backlog]] under "Security audit follow-ups". The related existing docs are [[deploy-runbook]], [[iron-log]], [[build-spec]] and [[feature-flags]].

## Limits to remember when reading it

- Tests that need Postgres could not run in the sandbox, so database behaviour was read from the SQL and source. A second run with a local Postgres in the sandbox would turn several open leads into measured results.
- The two confirmed findings are low. The sync one was reproduced with fake servers, not a real browser. The CSV one was shown from the code and a hunter's sandbox output; the verifiers did not re-run it.
- Nothing about the live Cloud Run, Neon, GCS or GitHub settings is known from this audit. The open leads list exactly which fact each one needs.
