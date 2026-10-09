# Security audit: iron-log (run-1)

**Profile:** standard, full repository scope. **Source ref:** `979f6ea920b44302abea3b394f402ebd66179c2e` (clean worktree). **Budget:** none set; about 57 agent invocations (4 reconnaissance, 20 hunters in 8 waves, 14 coverage critics, 12 candidate verifiers, 7 final-record verifiers). **Execution:** sandboxed source and local only (bubblewrap: no network, read-only source, scratch-only writes, empty environment). No deployed endpoint, Neon database, GCP project, GitHub setting or credential was contacted or read. `.env` (which points at Neon) was never exposed. **Prior runs:** none; no carried confirmations. **Run status:** complete. Both `validate-findings.cjs` and `validate-coverage-ledger.cjs` pass.

Not covered: anything that exists only in the live deployment (Cloud Run IAM and ingress, live secrets and env values, the Neon role and plan, GitHub environment reviewers, GCS bucket settings). Those appear as NEEDS VALIDATION leads below. Tests that need Postgres (the RLS, command and auth suites) could not run in the sandbox, so database behaviour was established from SQL and source, not by execution. Host Node is 20 while the project targets 22.

## Security posture

No critical, high or medium issue was found. The core boundaries held under review: Google-only better-auth sessions, a per-transaction `app.user_id` with row-level security on every user table, user-scoped queries in all 20 write commands, exact-match confirm words on erase and delete, constant identifiers in every dynamic SQL path, a CSRF guard backed by SameSite cookies, and a dev-user header that is eliminated from the production bundle and ignored by the production server. The two confirmed findings are both low and need a user to do something unusual (import a hostile file, or switch accounts in a second tab). The five open leads are availability, cost and compliance questions that depend on deployment facts.

## Confirmed findings

| Severity | Title | Boundary | Observed result |
|---|---|---|---|
| low | CSV export does not neutralise spreadsheet formula prefixes in imported notes and exercise names | Imported file to spreadsheet application | Source-level demonstration, consistent with the hunter's sandbox artifact (agents/hunt-client3-w3/artifacts/out/check-2.txt): csvCell passes a note beginning with = throu |
| low | Sync gate latches 'verified' and never re-checks identity, so a tab keeps syncing after the browser's session switches to another account | Another account on the same browser | Re-run in the sandbox (vitest, src/sync/zz_v10.test.ts, copied from the hunter's test). Bob's server holds client id 'ann-private'. Ann's snapshot of weeks/2026-10-04 con |

### 1. CSV export does not neutralise spreadsheet formula prefixes in imported notes and exercise names

- **Fingerprint:** `export.buildCsv.csv-formula-injection-unneutralised-cells`
- **Severity:** low (likelihood low: Requires the victim to import an untrusted file, export a CSV, open it in a spreadsheet and often accept a warning or click. The app has no sharing between users, so the only source is a file the user chooses to import. Impact low: Formula runs in the victim's spreadsheet only. Most payloads need acknowledgement, and the data in the CSV is the user's own training log. No server or other user data is reachable from the app.)
- **Description:** buildCsv writes free-text fields (log note, custom exercise name) through csvCell, which only quotes values containing comma, double quote, CR or LF. A value starting with =, +, - or @ is emitted as a live formula cell. Those fields are only length-capped when imported from a JSON data file, Excel workbook or CSV export, so a hostile file supplied to the user can plant formula text that runs when the user later exports a CSV and opens it in Excel, LibreOffice or Sheets. The XLSX builders are not affected because SheetJS writes strings as t:'s' cells. Impact is limited and needs user interaction: the user must import an untrusted file, export CSV, open it in a spreadsheet and accept any prompts.
- **Root cause:** csvCell escapes only CSV structural characters. It has no OWASP-style formula neutralisation (a leading apostrophe or tab before cells starting with = + - @ or CR/TAB). Import normalisation (text() in validate.ts) only truncates length, so formula-leading strings survive into the store and the export.
- **Conditions:** Victim imports an attacker-supplied data file, workbook or CSV, then exports CSV and opens it in a spreadsheet application.; Spreadsheet may show a warning (e.g. DDE or external-content prompt) that the victim must accept for some payloads; HYPERLINK-style formulas need a click.; Spreadsheet application evaluates leading = + - @ cells from a .csv file (default behaviour in Excel and LibreOffice).
- **Bounded reproduction:** Craft a data file whose log entry has n set to a string starting with '='. Victim imports the file (normEntry keeps n, length-capped only). Victim triggers Export CSV; buildCsv emits the note unquoted/unprefixed in the note column. Victim opens the CSV in a spreadsheet; the cell is interpreted as a formula.
- **Actual result:** Source-level demonstration, consistent with the hunter's sandbox artifact (agents/hunt-client3-w3/artifacts/out/check-2.txt): csvCell passes a note beginning with = through unchanged, e.g. CSV row ...,=cmd|' /C calc'!A0,, and the exercise name =HYPERLINK(...) is only quoted because of its embedded quotes and commas, not neutralised. The xlsx cells came out as t:'s' strings, so only the CSV path is affected. I did not re-execute it; the code path is short and fully visible in source.
- **Source trace:**
1. `src/lib/export.ts:191` (entrypoint) Untrusted imported file contents (logs, custom exercise config) are passed to normalisation; this is the lower-trust input from whoever supplied the file.
2. `src/shared/validate.ts:84` (propagation) Note e.n is kept via text(e.n, LIMITS.text.note), which only slices to a max length (text() at line 64). A leading =, +, - or @ is preserved.
3. `src/store/useAppStore.ts:794` (propagation) User-triggered CSV export passes the snapshot (including imported logs and cfg) to buildCsv.
4. `src/lib/export.ts:33` (propagation) Row includes exInfo(cfg,id).n (exercise name) and noteOf(e) (note) as raw strings.
5. `src/lib/export.ts:28` (sink) Only quotes for , " CR LF; does not prefix cells beginning with = + - @, so formula text reaches the CSV unneutralised.
- **Smallest source fix:** In csvCell, prefix any string cell whose first character is =, +, -, @, tab or CR with a single quote (and still apply CSV quoting). Apply it only to text fields (exercise name, note, set_detail, muscle names), so numeric columns such as negative weights stay numeric. Optionally strip or reject leading formula characters in normEntry for note and in exercise-name normalisation.

### 2. Sync gate latches 'verified' and never re-checks identity, so a tab keeps syncing after the browser's session switches to another account

- **Fingerprint:** `sync.apiDb.gate-verified-latch-cross-account-mixing`
- **Severity:** low (likelihood low: Needs the sync flag on, two tabs of one browser profile, and a manual account switch in the other tab while the first stays open. Shared-profile account switching is uncommon. Impact medium: Cross-account confidentiality and integrity break on the device. One user's private logs are written into another user's server account, and the other user's rows appear in the first user's mirror. The user who performs the switch is the person at the device, and the scope is one dataset.)
- **Description:** createApiDb checks who is signed in only until it sets verified=true. After that, gate() returns ok without calling identity() again. The flag is cleared only when sync pauses for 'auth' or 'account'. The session cookie is shared by every tab of the browser, and each request carries it with no user-id binding. If another tab of the same browser signs out and signs in as a different Google user, the already-open tab gets no 401. It does not reload, and its minute poll and wake events never re-run the identity check. From then on it sends the first user's unsent and new log entries to the second user's server account. It also pulls the second user's rows into the first user's mirror under the old cursor, and the status stays idle. The code's own comment at apiDb.ts:138-139 says this mixing is what the account check is meant to prevent. Impact is bounded: it needs a shared browser profile, the sync flag on, and a user-driven account switch in another tab.
- **Root cause:** The account-ownership check is a one-time latch (verified) rather than a per-request or per-session binding. Requests authenticate by ambient cookie only. Neither the client nor the API ties a request to the userId that was verified when the latch was set, so a cookie swap by another tab goes undetected.
- **Conditions:** The sync flag (apiSync) is on. It is off by default and on in the Cloud Run build.; The same browser profile has two tabs open. In the other tab the user signs out and signs in as a different Google account, or signs in again, while the first tab stays open and makes no failing request.; The first tab has new or unsent log entries, or simply polls, after the switch.
- **Bounded reproduction:** Start createApiDb with identity returning ann and a transport bound to the ann server, then run start(). Switch the transport's session to the bob server and identity to bob. This simulates the shared cookie changing without any 401 in this tab. Call set() on a log document, then syncNow(). Read the bob server's rows and the doc('weeks/2026-10-04') snapshot.
- **Actual result:** Re-run in the sandbox (vitest, src/sync/zz_v10.test.ts, copied from the hunter's test). Bob's server holds client id 'ann-private'. Ann's snapshot of weeks/2026-10-04 contains bob's data ({prog:'B',done:{'bobsecret:0':true}}). Sync state is idle with pausedBecause null, and no account pause was raised. The harness stands in for the browser cookie and does not drive a real browser; the source shows requests carry only the cookie, so the same behavior follows.
- **Source trace:**
1. `src/sync/browser.ts:21` (entrypoint) Browser wiring. The wake and visibility handlers (line 21) and the 60s poll (apiDb.ts:422) call syncNow(). The only identity source is account.me, which reads the shared cookie session.
2. `src/sync/apiDb.ts:152` (propagation) Returns {ok:true} immediately when verified is true. identity() is not called again.
3. `src/sync/apiDb.ts:132` (propagation) verified is reset to false only on a pause for 'auth' or 'account'. A cookie switch to another valid user produces neither.
4. `src/sync/apiDb.ts:238` (propagation) Pull proceeds after the latched gate and merges the new session's rows into the old account's mirror.
5. `src/sync/transport.ts:97` (propagation) Requests carry only the ambient cookie plus a dev header. There is no per-request user binding, so the server answers as whoever the cookie now names.
6. `src/sync/apiDb.ts:292` (propagation) Calls gate() on each loop pass. The latched gate passes and the outbox document is planned for sending.
7. `src/sync/apiDb.ts:320` (sink) transport.command posts the first user's new log entry to the server under the second user's session. It is stored in the second user's account.
- **Smallest source fix:** Re-verify identity on every send and pull, or on wake. For example, clear verified in the wake and visibilitychange handlers, and re-check on a timer. Better, bind each request to the verified user: send an x-expected-user header and have the API return 409/401 when it does not match the session user. The client then pauses with 'account' and the outbox is not sent.

## NEEDS VALIDATION

These are unresolved leads, not confirmed vulnerabilities, and carry no severity. Details and plans are in `NEEDS-VALIDATION.md`.

| Title | Trace | Exact blocker | Local next step | Owner-observed check |
|---|---|---|---|---|
| Anonymous unbounded request body on the better-auth mount may exhaust memory on the single 512Mi Cloud Run instance | `server/app.ts:83` to `node_modules/better-call/dist/router.mjs:67` | Whether Cloud Run's front end rejects or buffers oversized requests before the container, and the exact cap (about 32 MiB for HTTP/1), cannot be observed from source or locally. | Non-destructive: run the real server/app.ts createApp with the better-auth in-memory adapter and the Node 22 production Dockerfile image if available. Cap the process heap and memory to 512 MiB (for e | Owner-run on a staging Cloud Run service with the same 512Mi/concurrency-40 config, never production. Send a bounded set of 6-10 concurrent 20-30 MiB POSTs to /api/auth/sign-in/social from one test IP |
| Backup bucket soft-delete period is not set, so erased users' dumps may be recoverable past the promised 30 days | `src/components/settings/DeleteMyData.tsx:85` to `scripts/backup-cloud-run.sh:38` | The live bucket's soft_delete_policy (retentionDurationSeconds) cannot be observed from source. It may be the 7-day default, 0 if set out of band, or overridden by a project or organization default. | No local reproduction is possible: this is Cloud Storage behaviour. Source review confirms nothing in the repository disables or sets the soft-delete duration. | Project owner runs the read-only command `gcloud storage buckets describe gs://$BUCKET --format='value(soft_delete_policy)'` and checks for retentionDurationSeconds greater than 0. If it is non-zero,  |
| import-legacy runs up to 20,000 commands in one transaction on one pooled DB connection with no timeouts, so a few concurrent requests from one signed-in account can exhaust the 10-connection pool | `server/app.ts:139` to `server/auth.ts:33` | Import wall-clock time for a 20,000-command payload against the deployed Cloud Run to Neon pooled path is unknown. Per-query latency decides whether the pool is held for seconds or minutes. | On a scratch local Postgres with migrations applied, using a dedicated test user and the dev header: build a 20,000-command payload of valid log-body-weight (or other cheap create) commands with disti | Owner-observed and non-destructive: on a staging or throwaway Neon branch with the same role and pooled URL, run the same timing with one import only. Check `SHOW statement_timeout`, `SHOW lock_timeou |
| Signed-in user can grow shared Postgres storage without a byte, row or retention cap | `server/app.ts:123` to `db/migrations/20261008000003_erase_and_delete_account.sql:17` | The Neon plan's storage ceiling and quota behavior are not observable from source or the sandbox, and this decides whether growth becomes an outage, a cost spike or a throttle. | On a scratch Postgres with the migrations applied, create one dummy user. Save a roughly 100 KB config document 100 times and send 100 invalid envelopes. Then compare pg_total_relation_size for row_hi | The owner should check the Neon project's storage limit and alerting. They should also check whether sign-up is restricted to an allowlist, and whether a periodic prune of row_history and refused_writ |
| In-memory rate limiter sweeps its whole map on every request once more than 10,000 live per-IP keys exist, and a rotating IPv6 source gets a fresh bucket each time | `server/app.ts:119` to `server/rateLimit.ts:26` | Whether the deployed Cloud Run URL accepts IPv6 clients, or whether an attacker can otherwise present more than 10,000 distinct req.ip values within one 60-second window. This is deployment and network routing, not visible in source. | Start the real createApp with trustProxy set to 1 and a stubbed database, and use the existing server/rateLimit.test.ts pattern. Send requests with distinct X-Forwarded-For IPv6 values (2001:db8::N, N | The deployment owner checks the Cloud Run service's IPv6 reachability (for example whether the run.app hostname has AAAA records) and uses a harmless header-echo endpoint on a staging copy to see whic |

## Hardening notes and positive patterns

**Positive patterns:** row-level security enabled with matching USING and WITH CHECK policies on all nine data tables plus `users`, `refused_writes` and `row_history`; a startup refusal when the production DB role can bypass RLS; definer functions that take no caller-chosen target and are revoked from PUBLIC; server-side session rows with no cookie cache, so revocation is immediate; OAuth state with PKCE; encrypted provider tokens; lockfile integrity on every package including the `xlsx` tarball; OIDC deploys with no stored cloud keys; `NODE_ENV=production` set both in the image and at deploy; `gha-creds` and `.env` excluded from git and Docker contexts.

**Hardening (not findings):**
- ci-deploy.sh add --no-renames
- refuse non-ancestor head_sha on re-run
- pass steps outputs via env
- configure production environment reviewers and WIF condition
- move pages/id-token write to deploy job; SHA pins
- namespace concurrency group by repo
- gh pr list match head owner
- pin actions by SHA
- persist-credentials false in screenshots.yml
- base image digest
- search_path public,pg_temp and schema-qualify in definer functions; revoke TEMP
- rls.test.ts should assert policy predicate
- pooled RLS check covers only log_entries
- ironlog_app full CRUD on auth schema; consider separate role
- backup secret holds DB owner URL; use dedicated read role
- re-assert bucket settings idempotently
- CMEK and audit logs not configured
- restore-check trusts newest name
- privacy promise to re-apply deletions on restore has no tooling
- slice before mask in clientErrors
- provider update-oidc and repository_id binding
- pin deploy-job actions
- role.ts pg_has_role
- --set-env-vars drops MIN_CLIENT_VERSION
- two pg pools
- BACKUP_BUCKET encoding
- reject host/hostaddr/service params and PGHOST env in e2e-sync.mjs guard
- Gate CSP skip to /dev/auth in development only
- Require Origin when session cookie present
- ensure_user race recreate empty users row
- better-auth default XFF ip source
- replay asymmetry: document saves revive tombstones on null baseVersion
- tick-card restore does not check auto flag
- erase/delete do not take users row lock
- commands carry no data_epoch
- normConfigDoc spreads unknown keys
- import-legacy 4mb parsed before IP limiter and sessionAuth
- fixed-window 2x burst
- erase/delete limiters separate
- SECURITY DEFINER search_path public,pg_temp
- erase_my_data take users row lock
- delete_my_account does not purge auth-state verification rows
- MIN_CLIENT_VERSION not set by deploy script
- validate --to against auth.user in seedTestUser.ts
- normConfig does not apply goodUrl to cfg.ex[].url or backup.last.url
- gh token key not cleared on account change
- applyImport cfg[k]=v with __proto__
- Pages build lacks CSP
- supplement id charset/length
- normTakenDay key restriction
- export gh token in data file
- outbox/mirror carry no owner id
- offline fallback after sign-out shows cached data (documented)
- runtime assert in setDevUser
- validRepo reject dot segments
- encode path in readFile
- size cap before JSON.parse
- Add protocol check on out.url before location.assign
- Apply goodUrl to cfg.ex[].url
- Drop rows when cleaner returns null in rows.ts

**Candidates examined and rejected** (not findings): `auth-verification-oauth-state-rows-never-expire`, `ci-deployer-builds-editor-default-build-sa-escalation`, `ci-deployer-run-developer-backup-job-override`, `excelImport.readWeeks.warm.inherited-builtin-member-write`, `health-db-before-api-rate-limit`. Each was refuted from source: the CI deployer-role leads have no lower-trust entry point (only this repo's main-branch workflow can assume the identity, and that identity can already deploy code as the runtime account); better-auth does sweep expired verification rows; the health probe is a constant `select 1`; the `.xlsx` prototype write only toggles a boolean on a built-in function in the importing tab.

## Coverage summary

39 ledger units over 8 hunter waves. Status counts: {'covered': 31, 'candidate': 8}. Units with candidates: 8 (the units that produced the retained records). Deferred: 0. Out of scope: 0. Blocked: 0. Companion classes selected: web and auth, client-side, data isolation and lifecycle, supply chain, cloud and deployment, resource exhaustion. Excluded with reasons: memory safety (no native code), AI and LLM (no model surface), protocols and messaging (plain JSON over HTTP), desktop and mobile IPC (web PWA only). The final two coverage critics (a post-wave critic and a distinct final-clean critic) both returned no missing units and no reassignments after wave 8. This is bounded, evidence-linked coverage, not a claim that no vulnerability exists.
