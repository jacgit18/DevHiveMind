# TODO

Work through these from the top: bugs first, then the backend and its load-bearing decisions, then what follows them, then UX and optional ideas. Completed sections are at the bottom. Item numbers are labels only, not an order; check for bugs after each item.

**Convention: all new code is TypeScript** (`.ts`/`.tsx`, strict). Do not add `.js` or `.jsx` files; core types are in `src/types.ts` and `src/store/types.ts`. Run `npm run typecheck` with the other checks. _Last reviewed against the code: 2026-10-06 (see the review notes at the end)._

## Phase F follow-ups (added 2026-10-08, when Phase F was closed; see [[build-spec]], [[deploy-runbook]])

Live since 2026-10-08: revision `iron-log-00005-wvl`, deployed by CI. These are what Phase F left behind.

- [x] (checked 2026-10-08: the owner's row, id 1, already had `is_admin = true`; two other accounts have signed up, neither admin) Set `is_admin` on the owner's row in production by hand (B2f): `update users set is_admin = true where auth_user_id = (select id from auth."user" where email = '<email>')`. The app role cannot do this.
- [x] Stale branches (done 2026-10-08): 89 remote and all local branches deleted, including the old `import-fixes`, `pwa`, `react-conversion`, `wcag-aaa` and the unpushed spike branch `spike-s0-signin`. Left on GitHub: `main`, `data` (backups), `pr-screenshots` (the screenshots workflow). Names and commit ids are in `restore_remote.txt` and `restore_local.txt` in this folder, if one is needed back.
#todo/priority/High
- [ ] **First installed-iPhone PWA sign-in** (open S0 item below). Add to Home Screen, open from the icon, sign in with Google, close and reopen, still signed in. If it fails, reopen ADR 004 and the same-origin choice in ADR 010.
- [ ] Confirm the Neon **owner** password was rotated (it lives only in the local `.env`; the app and CI use `ironlog_app`).
- [ ] Rehearse a Neon restore and a failing migration on a Neon branch (FM-20, FM-21, FM-24). Phase F listed both; they were not done.
- [ ] Watch for a missed nightly backup: the alert cannot cover "no backup for a day". Look now and then at `PROJECT_ID=iron-log-jacgit18 scripts/backup-cloud-run.sh list`.
- [ ] GitHub Actions: `ubuntu-latest` moves to Ubuntu 26 on 2026-10-19 (notice in the deploy log). Run the workflows once after that date, or pin `ubuntu-24.04`.
- [ ] Personal defaults must not leak into a new account (item under Multi-user readiness below). **Audit 2026-10-08, no code changed yet.** `DEFAULT_CFG` is clean. The leak is `PROGRAM_A`/`PROGRAM_B` and `EX` in `src/lib/data.ts` (about 65 cards with the owner's starting weights, boxing moves, the "Shadow box" warm-up), plus the default backup repo names in `export.ts`. A signed-in account with no `programs/A` document falls back to them (`loadProgram` -> `resolveProgram` -> `BUILTIN`, `useAppStore.ts` db-mode loader). **Why it is not a one-line change:** (1) `programs[k] !== BUILTIN[k]` means "unmodified" in six places (Editor, export, settingsSlice, editorSlice, ...) and the "Original program · built in" library row also offers the owner's program; (2) 16 test files use the built-ins; (3) **two other accounts already exist**, and unedited programs were never saved, so they are showing the built-in cards today and their logs point at those cards; blanking the fallback would make their cards vanish. Proposed order: first save the current program into those accounts' own documents (or only blank for accounts with no log entries), then add a blank program for new accounts, then make "Original" mean blank in sync mode, then remove the personal backup defaults. Decision recorded in [[016-new-account-starting-state]] (accepted 2026-10-08; the exercise library `EX` stays as it is for now).
#todo/priority/Low
- [ ] Update ADR 004 (sign-in) with what the deploy showed, and record the iPhone result.
- [ ] Decide the tombstone purge window and the refused-writes retention (open in [[data-model/iron-log]]).
- [ ] Required reviewers on the GitHub `production` environment, at least for the first few CI deploys.
- [ ] Turn on "Automatically delete head branches" in the GitHub repo settings, so merged branches stop piling up.
- [ ] The README screenshots bot adds a commit to every PR branch even when only a few bytes of a PNG change (noise, and it makes the branch move under you: it rejected a push on #127). Only commit when the image really differs.
- [ ] Flaky test: `src/lib/planOrder.test.js` "on random programs ..." takes about 6 s on this machine against the 5 s default. Give it a longer timeout (do not change what it checks: the reorder tests must stay).
- [ ] The build warns that a chunk is over 500 kB; split the largest (lazy-load the tabs) if load time on a phone matters.
- [ ] Lint: `Supplements.tsx:83` warns `set-state-in-effect` (known, one warning).
- [ ] CI deploy rough edges found on the first run, now fixed (#128, #129): the Google sign-in file made the tree dirty; the deployer needed `storage.buckets.list`; the build ran as the Editor-role default account. Notes in [[deploy-runbook]] §10.
- [ ] Spike clean-up (S0): delete the Artifact Registry repo `cloud-run-source-deploy` in `iron-log-spike` (about 345 MB: `gcloud artifacts repositories delete cloud-run-source-deploy --location us-central1 --project iron-log-spike`), the Neon `spike-s0` branch (Neon console, Branches; look at it first), and then consider deleting the `iron-log-spike` project (`gcloud projects delete iron-log-spike`; Google keeps a deleted project 30 days; do it last, the registry repo lives in it). The local `spike-s0-signin` branch is already deleted (2026-10-08; its commit was `70f1187`, never pushed). Before rotating or deleting a Google OAuth client secret, check which client production uses (secret `iron-log-google-client-id`); rotating that one signs everyone out until the secret is updated.

## Bugs

Found in the 2026-10-05 bug sweep and re-checked against the code on 2026-10-06 (all still present; the TypeScript conversion changed none of them, only renamed files). The high and medium ones are fixed (#67), plus import-replace atomicity and the empty-repo GitHub backup (PR in review). These are what's left.

#todo/priority/High
- [ ] `bestLift` can show the wrong date when entries aren't in date order (`addEntry` and `mergeEntries` sort; a JSON replace import and database snapshots do not, `normEntries` keeps the file's order). Simplest fix: sort in `normEntries`.
- [ ] CSV export: a leading `=`, `+`, `-` or `@` in a note or exercise name runs as a formula in Excel. CSV import also drops the exercise id (`exId` column is empty), so a renamed custom exercise duplicates.
#todo/priority/Low
- [ ] Deleting a stretch and re-adding one with the same name brings old check-offs back in earlier weeks (ids are slugs of the name).
- [ ] Merge-import orphans stretch check-offs when the stretch matches by name but has a different id.
- [ ] Rest timer: the manual Rest button uses `restSecs() || 90`, so a Rest setting of 0 runs 90 s while holds treat 0 as no rest. Decide which is intended.
- [ ] Wake lock can leak if `stop()` or a restart lands before the lock request resolves (`src/store/useTimerStore.ts`). Track the pending promise.
- [ ] Excel notes: an entry with both a note and `auto` loses `auto` on re-import (`noteOf` in `src/lib/export.ts`).
- [ ] Small leaks: `UpdateBanner` hourly interval never cleared, `useTooltips` doesn't clear its hide timer, `initPwa` adds listeners on every call, theme-color meta doesn't follow an OS theme change.
- [ ] GitHub rate-limit message always says "paste your token first", even when a token is set (`explain` in `src/lib/github.ts`).
- [ ] `screenshots.yml` fails on fork PRs (read-only token on `git push`), and its `git clone || git init` fallback hides real clone errors.
- [ ] Experiment excercises only show 5 days on dropdown

## 3. Backend, database and Google login (together)

> 2026-10-08: a landing page now hides the app from people who are not signed in (the deployed build only). Still to decide: the `plan` column (beta, free, paid), a signup cap, publishing the consent screen.

- [x] Choose a backend. Accepted for now (2026-10-06): own API server in Docker on Neon Postgres, with a separate auth provider (ADR 001 draft, [[001-backend-shape]], 2026-10-05). Firebase and Supabase were considered; Supabase is the fallback. This replaces the earlier Firebase lean once confirmed. Remaining stack decisions (datastore, sync, auth, language, framework, hosting) are still being walked.
- [x] Pick the API language: TypeScript on Node (ADR 005). **Lean TypeScript:** the API can import `src/types.ts` and run the same `validate.ts` cleaners (`normEntry`, `normProgram`, `normLibrary`, `normBody`) and `normalizeData`/`DataFile` on the server, so client and server cannot disagree on a document's shape. The docs are already versioned (`SCHEMA_VERSION`) and stamped (`updatedAt`). Another language means re-implementing and re-testing all of that. Needs a shared types package or a monorepo layout.
#todo/priority/High
- [ ] Add Google login. Each user's data is tied to their account.
  - [ ] **S0 iPhone test (parked 2026-10-07; the user will do it later).** Google login passed on the desktop locally, and the spike also ran on Cloud Run. **The Cloud Run service and its four secrets were deleted on 2026-10-07**, so the test needs one redeploy first: on the local branch `spike-s0-signin` (the spike code exists only there, never pushed) fill `spike/.env`, run `./spike/deploy.sh`, then `BASE_URL_OVERRIDE=<service URL> ./spike/deploy.sh`; the OAuth client already allows `https://iron-log-spike-1088998530888.us-central1.run.app`. Then on the iPhone, in Safari: Add to Home Screen, launch from the icon (page must say `display-mode standalone: true`), sign in with Google, note where you land afterwards, check `/api/me`, close and reopen the app, check `/api/me` again, and record the iOS version. Pass/fail rules are in [[build-spec]] section 4. Record the result in ADR 004 and 010. If it fails, try popup versus redirect and Google's ID-token flow before reopening the same-origin choice.
  - [ ] **S0 cleanup, what is left (done 2026-10-07: Cloud Run service and 4 secrets).** After the iPhone test: delete the Artifact Registry repo `cloud-run-source-deploy` (about 345 MB of images, a small storage cost), the Neon `spike-s0` branch, the local branch `spike-s0-signin` (never merge it), consider deleting the `iron-log-spike` project, and rotate or delete the Google OAuth client secret. Keep the budget alert.
  - [ ] **Not a gate any more (2026-10-07):** we assume iPhone sign-in works and verify it at the first real deploy (see the build spec drift log). B1 stays open until that result is recorded. (Earlier wording follows.) B1 stays open until the iPhone result is recorded. B2 (real sign-in in the API) needs it, so Phase B is blocked on this. Phase C does not need it.
- [ ] Keep it offline-first for gym use: queue saves and sync them later, building on `makeSaveQueue`.
- [ ] Add a one-time "upload my existing data" step so data already on the phone isn't lost. (Smaller now: `buildDataFile`/`normalizeData` already produce and check a typed `DataFile`, which is exactly what to upload.)
#todo/priority/Low
- [ ] Possibly exercise catalog what api to use any free options
  - If the app goes multi-user this is close to required: use it to prefill muscles, equipment and video links so new users don't type every exercise.

### Backend stack walkthrough (2026-10-06, one ADR per decision, free tiers only)

Run with `/tech-decision-walkthrough`. Handoff: `iron-log/.claude/handoffs/handoff-backend-stack-walkthrough-2026-10-06.md`.

- [x] 1. Backend shape: own API in Docker (ADR 001)
- [x] 2. Datastore: Neon Postgres, database-first migrations (ADR 002)
- [x] 3. Sync, ADR 003 [[003-sync-versioned-rows]] accepted (design B agreed: per-row server versions, stale edits refused and re-merged on the phone, `deletedAt` tombstones, idempotent client-id creates, server-stamped time, short history table, change-feed pull later). Failure-mode register done ([[failure-modes/sync]], register only) and ADR 003 accepted. Was: failure-mode analysis (5x5 grid; inventory gaps to add: "error reporting (none yet)", "backups and restore" (check Neon's free restore window), "where sync errors show" (server logs plus a user-visible message when a write keeps failing)), then write ADR 003 and log any amendments to [[backend-data-rules]] section 7.
- [x] 4. Auth: Better Auth inside our API, Google login first, email/password deferred (ADR 004 [[004-auth-better-auth]]). Own `users` table, provider id in one column, token check in one module; one admin flag with a logged path; row-level security backstop; sharing later via opt-in grants. Open spikes: iOS cookie behavior across sites (settle at decision 9) and Google OAuth in an installed iOS PWA.
- [x] 5. Language/runtime: TypeScript (`strict`) on Node LTS, types and validation shared with the client (ADR 005 [[005-language-typescript-node]]). Go and Python lost on rule drift and Better Auth; revisit if footprint hurts at decision 9.
- [x] 6. Web framework: Express 5, thin routes, rules in the shared framework-free module (ADR 007 [[007-web-framework-express]]). Hono is the fallback.
- [x] 7. API style: command endpoints over plain JSON HTTP (`POST /api/commands/<name>`, `GET /api/sync?since=`), one response envelope, shared contract module (ADR 008 [[008-api-style-commands-json-http]]).
- [x] 8. Data-access layer: Kysely typed query builder, raw `sql` escape hatch, types generated from the database, explicit transactions (ADR 009 [[009-data-access-kysely]]). Migration tool still open.
- [x] 9. Hosting: Google Cloud Run (max one instance, budget alert), Express serves the PWA from one origin; Render free is the no-card fallback (ADR 010 [[010-hosting-cloud-run]]). Prices from aggregator sites, confirm on provider pages. Open spike: Google sign-in in an installed iOS PWA.
- [x] 10. One-time upload: one `import-legacy` command, empty account only, dedupe by client id, check legacy hash collisions first (note in [[iron-log/docs/architecture/stack-walkthrough|stack-walkthrough]]).
- [x] 11. lb/kg storage unit: canonical pounds, `numeric` 4 dp in `weight_lb`-style columns, one conversion module, display-only toggle (ADR 006 [[006-weight-unit-canonical-lb]]). Table design is now unblocked.
- [x] Table design via `relational-modeling`: [[data-model/iron-log]] written 2026-10-06 (bigint ids plus unique client id, jsonb documents, per-user change counter, history trigger, RLS). Open: tombstone purge window, refused-writes retention, migration tool.
- [x] Closeout (written in [[iron-log/docs/architecture/stack-walkthrough|stack-walkthrough]]): summary table; cross-cutting obligations (HTTPS, rate limits, backups, CI, secrets, migrations tool, error reporting, privacy policy and data-deletion path); cost-cap check; deferred list; missed-decision audit
#todo/priority/Low
- [ ] Verify Neon free-tier numbers at neon.com (1 GB per project, 100 CU-hours per month; from aggregator pages)
- [ ] Verify iOS Safari storage eviction for non-installed PWAs (offline up to about 2 days)
- [ ] Then type `/system-design-communication` (once the stack is settled) and `/decision-journal` for any decision to revisit

### Open after the backend stack walkthrough (2026-10-06; details in [[iron-log/docs/architecture/stack-walkthrough|stack-walkthrough]])

Short ADRs still to write:
- [x] Date and timezone policy (FM-12): local calendar dates as data, Sunday-start week, server validates (ADR 011 [[011-date-and-week-policy]]).
- [x] Migration tool: dbmate, plain SQL files (ADR 012 [[012-migrations-dbmate]]).
- [x] Error reporting and logging: Cloud Run logging plus our own client-error endpoint, Sentry as the upgrade (ADR 013 [[013-error-reporting-cloud-logging]]).
- [x] Backend test tooling: Vitest plus a real Postgres in a throwaway container (ADR 014 [[014-backend-test-tooling]]).
- [x] Shared code layout: one package, `src/shared/` plus `server/`, workspaces as the planned next step (ADR 015 [[015-shared-code-layout]]).

Values to set:
#todo/priority/Low
- [ ] Tombstone purge window and refused-writes retention (open in [[data-model/iron-log]]).

Spikes and checks (do early):
- [x] Count legacy `k`+hash id collisions in a real export before building `import-legacy`. (2026-10-08: the 2026-10-07 export has 53 entries and 0 collisions; the old `iron-log-data.json` has 1, `dip` and `kneeraise` on 2026-09-28: the hash ignores the exercise and ids are unique per user across exercises, so the importer gives the later one a `-2` suffix in input order.)
#todo/priority/High
- [ ] Google sign-in inside an installed iOS PWA, on a real iPhone. If it fails, reopen ADR 004 and the same-origin choice in ADR 010.
- [ ] Rehearse a Neon restore (FM-20, FM-24) and a failing migration on a Neon branch (FM-21).
#todo/priority/Low
- [ ] Confirm on provider pages: Cloud Run quota and pricing, Neon free-tier numbers and restore window, Better Auth advisories (GitHub Security tab), current Express 5, Kysely and Better Auth versions.
- [ ] Turn on Neon **branch protection** for `production`, if the Free plan allows it, so it cannot be deleted by hand in the console. Checked 2026-10-08: `production` is the default branch with no expiry (only `dev` and `spike-s0` expire, on 2026-10-14, from the 7-day rule in `neon.ts`) but shows `protected: false`. Plan availability is not verified: look for the toggle in the Neon console (branch settings) and, if it is paid-only, note that and rely on the nightly backups instead ([[iron-log/docs/deploy-runbook|deploy-runbook]] section 7).

### Multi-user readiness (if the app is opened to other people)

The app began as a single-user gym app. These are the gaps that only matter once other people use it. Do them with step 3 unless noted.

- [x] Auto-progression suggestions ("you hit 3×8, try +5 lb"): `progressionOf`/`targetOf` suggest "up from N lb" after two full sessions, and a stalled lift gets a back-off (#76). Left: show it more prominently if wanted.
- [x] Account screen: profile, sign out, last-synced time and a visible offline/sync status. (B2e: Settings → Account and Sync; PR #118.)
- [x] Privacy policy and terms, with a clear data-deletion path (see step 4). Needed before launch because of Google login and body-weight data. (2026-10-08, PR in review: `public/privacy.html` and `terms.html` drafted against GDPR/UK GDPR, CCPA and other US state laws and Washington's health-data law; Settings → Delete my data erases everything or deletes the account for good, backups age out in 30 days. **Still recommended before opening signup to the public: a lawyer's review, and a decision on the governing-law clause, which was left out on purpose.**)
#todo/priority/High
- [ ] Check that no personal defaults (exercises, 1RMs, weight goals, phase names, Day 5/6 subtitles) leak into a new account's starting state. Known ones in code: the built-in programs A/B and `EX` catalog (`data.ts`), `DEFAULT_CFG`, and the backup defaults `jacgit18/iron-log-data` (`backupCfg`) and `jacgit18/iron-log` (`ghCfg`) plus the `Composio For You` connector name in `export.ts`. The backup ones disappear with step 4.
- [ ] Conflict handling when one account is used on two devices, so last-write-wins doesn't silently lose a workout.
#todo/priority/Low
- [ ] Starter programs for new users (PPL, upper/lower, full body, 5x5) and a "build my own" flow, with a choice of days per week. The board currently assumes a fixed 7-day layout.
- [ ] Move the first-run guide (item 58) into this step instead of after the backend.
- [ ] Explain jargon in the app (phase, superset, "Same as last", 1RM) with one-line tooltips or a glossary.
- [ ] In-app "report a problem" that attaches the app version and sync state (alongside the feedback form link at the bottom).
- [ ] Week-start choice (Sunday or Monday) and locale date formats. lb/kg (62) becomes required, not optional.
- [ ] Screen-reader testing of the log flow with real devices.
- [ ] Opt-in, privacy-respecting analytics and crash reporting, so problems new users hit are visible.
- [ ] Test the install prompt and update banner with people unfamiliar with the app.
- [ ] Exercise catalog (revisit; idea saved 2026-10-08, see [[exercise-catalog-idea]]): keep private custom exercises, add a read-only global catalog imported from a free dataset (check licenses), and maybe a suggest-and-approve step later. Needs stable exercise ids first (ids are name slugs today), and an ADR before building.
- [ ] Optional, only for growth: share or import a program by link or file; coach or training-partner view. Skip public profiles and leaderboards until the basics work.

## 4. Remove the stand-in features (only once the backend is working)

#todo/priority/High
- [ ] Turn "Erase data" into "delete my account data". Launch-blocking if other people use the app.
#todo/priority/Low
- [ ] Remove GitHub backup and restore (#18).
- [ ] Remove JSON import.
- [ ] Stop using localStorage as the main place data is saved.
- [ ] Update the README and the training skill with each removal so they stay in sync.

## 5. Advanced features and integrations (post-backend)

- [x] Weight goals feature (set targets and track progress).
- [x] supplement log (Supplements tab with schedule and water log, #61, #79)
- [x] Plateau/deload hint: `stallOf` judges each lift per week and `backoffOf` suggests a back-off (#76).
#todo/priority/Low
- [ ] Google Fit API integration to pull activity and weight data.
- [ ] Import medical records and add AI assessment of medical information. Decide whether to build this at all before multi-user launch: it brings health-data regulation, disclaimers and the highest risk of the list.
- [ ] **Social feed, privacy-light (idea saved 2026-10-08).** Let people follow friends and see short activity posts: "Sam trained 14 times this month", "Alex hit a new best on Hack Squat". It is less invasive than most fitness social features because it only says *that* someone lifted and how they did, never *where*: no gym, location, map, route or check-in, ever. Design notes so the idea is not lost:
  - **Opt-in and private by default.** Nothing is shared until a person turns it on, and they choose who sees it. Sharing is a grant a person can revoke at any time, as ADR 004 already planned for sharing ([[004-auth-better-auth]]: a user-owned `share_grants(owner_id, viewer_id, scope)` row, one `canRead(viewer, row)` check, and a matching row-level-security read policy). No public profiles or leaderboards, in line with the "skip them" note under multi-user readiness.
  - **Milestones and totals, not raw logs.** Posts are generated by the app from a person's own data (sessions this month, a new best on an exercise, a streak), so a friend sees the headline and not every set. **Body weight, notes and photos are never in a post.** Treat it as health-adjacent: it is not used for advertising or ranking people.
  - **No location, by construction.** The app does not collect it, so a post cannot leak it; keep it that way (no gym names, no timestamps finer than the day, nothing from the device).
  - **Before building it:** (1) update the privacy policy and terms: today they say data goes only to the service providers, so sharing with other users is a new purpose and needs the person's explicit consent (GDPR Art. 9 for health-related data); (2) add the safety basics: block, mute, report, and the ability to leave without a trace; (3) make delete-my-data and account deletion also remove a person's posts and grants everywhere, including from other people's feeds; (4) it is 16 and over only, as the terms already say; (5) decide whether it needs a moderation and abuse plan before more than a handful of friends use it; (6) check what the rate limits and the free-tier database can carry once feeds exist.
  - **Cheapest first test:** a read-only "training partner" view for one person you invite, showing only the monthly session count and new bests, before any feed exists.
- [ ] Warn when you skip an exercise too many times that's on your program.
- [ ] Improve weight entry UX: catch and prevent common mistakes (e.g., wrong weight entered for an exercise). Partly done: range limits and messages for sets, body weight and 1RM are central in `validate.ts` (#77). Left: flag a weight that is far from the last session for that exercise.

## 6. UX improvements and fixes

- [x] Keep the tab and the phone day picker across a page refresh (per browser tab; a fresh open starts clean).
- [x] Always open on the current week, and an app left open past the end of the week moves on to the new one.

## 7. Optional UI improvements (not decided yet)

From a review of the current screens. None of these are committed to: pick what you want, and move it into the numbered steps above. The numbers match the list from that review so they can be referred to. Where each one goes relative to the backend (step 3):

#todo/priority/Low
- [ ] Midnight behavior for check-offs (idea, not decided): a check-off belongs to the current day. If at least one item was ticked before midnight, flag the rest at midnight or move them to the next day where they can be skipped or kept, so exercises don't span multiple days. Today nothing is restricted. See ADR 011.

- **Before the backend** if it changes what gets stored.
- **Any time** if it is only how things look. These don't touch saving, so they can go before or after.
- **After the backend** if it depends on the backend, or gets reshuffled by step 4.

### Before the backend (changes what is stored)

- [x] 55. Exercise library page: every exercise with its equipment, video link, default phase, 1RM and muscle tags, edited in one place. On the Program tab. Per-exercise settings stay in `cfg.ex`, `cfg.exPh`, `cfg.rm` and `cfg.muscleMap`.
- [x] 33. Undo after unchecking something you logged: the board shows how many entries were removed with an Undo that puts back the entries and the tick.
#todo/priority/High
- [ ] 62. lb/kg unit toggle. Canonical unit settled: pounds, stored as `numeric` 4 dp (ADR 006); the toggle is display and input only, and progression steps become unit-aware. Types do not enforce units (all are plain `number`), so list every `lb`/`Lb` place (limits in `validate.ts`, labels, exports, plate calculator) before starting; a branded `Lb`/`Kg` type is optional.
#todo/priority/Low
- [ ] 38. A tick per set in the Log sheet (and start the rest timer between sets). Changes the shape of a logged entry. Safer now: add the field to `LogSet` in `types.ts` and `tsc` lists every reader and writer; also update `normSet` in `validate.ts` and the Excel/CSV sheets.
- [ ] 61. Per-exercise notes ("seat at 4, elbows tucked"), shown in the Log sheet. Adds a field to each exercise's stored settings.

### Any time: phone and board layout (most useful first)

#todo/priority/Low
- [ ] 1. Show the first exercise sooner on phones: less above the day tabs.
- [ ] 2. Slim down the top of each day column (rest day, add buttons, swap arrows, warm-up).
- [ ] 3. Stop the Rest timer button covering cards and the add buttons.
- [ ] 4. Mark today: highlight today's column on desktop, open on today's tab on phones.
- [ ] 60. "Gym mode" on phones: only today's exercises, big checkboxes and the timer.
- [ ] 25. Fit all 7 days on desktop (narrower columns or a compact density) with clear scrolling.

### Any time: header, week bar and notices

#todo/priority/Low
- [ ] 6. Remove the repeated program/mode between the header pills and the week bar.
- [ ] 7. Move the mode dropdown into Settings.
- [ ] 8. Put "Set by month" next to the A/B toggle it explains.
- [ ] 9. Fold overall progress into the week title on phones ("Sep 20 – 26 · 17/62").
- [ ] 10. Shrink the "This week" button.
- [ ] 11. Smaller leftovers notice: a one-line strip that opens the choices.
- [ ] 12. Show the move heads-up near the moved card, or as a short message at the bottom, instead of pushing the board down.

### Any time: body weight row and sort/filter

#todo/priority/Low
- [ ] 13. Make the body weight row compact on desktop.
- [ ] 14. Once logged, show it as one line ("195 lb · −2 · Goal: 15 to go").
- [ ] 15. Fix the body weight input showing "lb" twice.
- [ ] 16. One "Sort & filter" button instead of two large dropdowns.
- [ ] 17. Show active sort/filter as removable chips.
- [ ] 18. Quick search to jump to an exercise by name.

### Any time: day columns and cards

#todo/priority/Low
- [ ] 19. Group the column controls (rest day, swap, only this week) into a "⋯" menu.
- [ ] 20. Move "+ Add exercise" to the bottom of the column.
- [ ] 21. Bigger or menu-based swap arrows.
- [ ] 22. Collapse the warm-up once it's done.
- [ ] 23. Collapse finished days into a summary.
- [ ] 69. Session summary after finishing a day (total volume, PRs, time). Item 23 collapses finished days but doesn't summarize them.
- [ ] 24. Explain an empty day ("Nothing planned · + Add exercise") instead of 0/0.
- [ ] 26. Let section headings (Regular, Supersets, Home) collapse.
- [ ] 27. Make Details a small icon next to the name.
- [ ] 28. Keep exercise names on one line where possible.
- [ ] 29. Make phase easier to see without relying on color (letter or icon).
- [ ] 30. Put target weight, sets × reps and last time on one line.
- [ ] 31. Shrink finished cards to the name and a tick.
- [ ] 32. Show the tag line ("Primary · Superset") only when it matters, or as a colored card edge.
- [ ] 40. Rename "Same as last" on the card to show what it logs ("Repeat 320×6").
- [ ] 56. One button style for the two add buttons.

### Any time: Log sheet and timer

#todo/priority/Low
- [ ] 34. Put rarely used fields (1RM, video link, equipment, default-phase boxes) under "More options".
- [ ] 35. Date as a small "Today ▾" chip.
- [ ] 36. Keep Save and Cancel pinned to the bottom of the sheet.
- [ ] 37. Fix the "up from 320 lb" note floating to the right of the target.
- [ ] 39. +/− 5 lb and +/− 1 rep buttons.
- [ ] 41. Dock or shrink the Rest timer button, and move it up when a sheet opens.
- [ ] 42. Show the running time on the Rest timer button.
- [ ] 63. Plate calculator: show plates per side ("45 + 25 + 5") next to the target weight, and flag weights that can't be loaded (helps catch wrong-weight entries, see step 5).
- [ ] 64. Warm-up set generator: suggest ramp-up sets (e.g. 50/70/85%) from the target weight or 1RM.
- [ ] 65. Show estimated 1RM live in the Log sheet from weight × reps, so a PR is visible before saving.
- [ ] 66. Settings toggle for timer vibration (it is always on now).

### Any time: Progress, Muscles and Program tabs

#todo/priority/Low
- [ ] 43. Fill the empty gap in the Progress layout.
- [ ] 44. Move body weight and the goal up next to the other numbers.
- [ ] 45. Draw the weight goal as a dashed target line on the chart.
- [ ] 46. Add a phase legend to "Weight change by exercise".
- [ ] 47. Hide the "Sets, last 4 weeks" explanation until it's useful.
- [ ] 48. Tap an exercise in the weight change list to open its history.
- [ ] 49. Muscles: a "this week vs planned" toggle.
- [ ] 50. Muscles: mark low or untrained muscles on the body diagram itself.
- [ ] 51. Program: drag cards to reorder.
- [ ] 52. Program: a whole-week overview next to the one-day editor.
- [ ] 53. Program: show which program is being edited and which is on the board.
- [ ] 67. Charts: a "view as table" toggle and a text summary for each chart, for screen readers (WCAG AAA).

### Any time: across the app

#todo/priority/High
- [ ] 71. React error boundary with a "Something went wrong, export your data" fallback, so a render error isn't a white screen.
#todo/priority/Low
- [ ] 57. Messages: short notices at the bottom of the screen, with Undo where it applies, instead of the easy-to-miss line under the header.
- [ ] 59. Recheck dark mode and contrast for the newer pieces (Mobility purple, equipment labels, goal bar).
- [ ] 68. PR celebration: a badge or toast on save when a set beats the best weight or estimated 1RM.
- [ ] 70. Helpful empty states on Progress, Muscles and Trends instead of blank charts.
- [ ] 72. Code-split the heavy tabs (Progress, Muscles, Settings). The xlsx library is already lazy (`loadXLSX`, its own 160 kB gzip chunk). The main bundle is about 158 kB gzip and the app is cached offline, so the gain is small; low priority.
- [ ] 73. Keyboard shortcuts on desktop (e.g. L to log, T for the timer) with a list in Settings.
- [ ] 74. Printable week view, or share a session summary with `navigator.share`.

### After the backend

#todo/priority/Low
- [ ] 54. Regroup Settings into Training, Data and App. Do this after step 4, because the Data section changes when GitHub backup and JSON import are removed. If the app goes multi-user, do it before launch, since an Account section will crowd Settings.
- [ ] 58. First-run guide (pick a program, log a set, check a day). Do this once sign-in exists, so it can include signing in and syncing. If the app goes multi-user, it moves into the "Multi-user readiness" list under step 3.
- [ ] Feature to add excercise to experiment and remove from program

## Anytime

#todo/priority/Low
- [ ] Add a link to a Google feedback form in Settings.

### TypeScript migration (leftovers; the main work is done, see [[typescript-migration]])

#todo/priority/Low
- [ ] Convert `App.jsx` and `main.jsx` to TypeScript, and change `index.html` to `/src/main.tsx` in the same PR. Gives a fully TypeScript source tree (apart from `fonts.js`, the tests and tooling).
- [ ] Convert the remaining presentational components when next edited: `Daily`, `Medical`, `LineChart`, `Muscles`, `TimerBar`, `UpdateBanner`.
- [ ] Try TypeScript lint rules to stop new `any` (`oxlint-tsgolint`): costs one dev dependency and some CI time; worth it now that component `any` is down to 2.
- [ ] Tighten `any` in `lib/` and the store only when a function is edited anyway (38 in `lib/`, 37 in the store). Most are untrusted-input cleaners and the host's db/mcp handles, which should stay loose. `normWeek(w?: any)` could take a `RawWeek` type.
- [ ] `SlotSheet`'s clone of a program slot is the last component `any`.
- Decided against: converting tests, e2e, configs and scripts; `noUncheckedIndexedAccess` (321 new errors, little gain).

## 1. Fix imports and pick one file format (before the backend)

- [x] Excel import bug: no failing file turned up (the re-saved-dates bug was already fixed in #16). The real gap was that workbooks only brought back part of the data; see the next item.
- [x] Make Excel (.xlsx) the one format for both export and import. Programs, saved versions, check-offs, config, sessions and body weight each have a sheet, and an exported workbook imports back the same as the JSON file.
  - Still to do: remove the old partial-import path for workbooks made before this change, once nobody has those.
- [x] Accept CSV as an import fallback only (sessions only).
- [x] Keep JSON import until the backend exists, because it is the only full-detail backup for now. It gets removed in step 4.

## 2. Board and exercise changes (before the backend)

These change how days and exercises are stored. Do them together so the data structure is settled before it goes into a database.

- [x] Add a Day 7 to the board. It starts empty, and exercises can be added whenever.
- [x] Add a Rest day checkbox to each day. Ticking it inserts a rest day there and moves the later workouts one day later (blocked while Day 7 has exercises). A rest day counts as a complete day, and its exercises aren't in it, so volume numbers aren't inflated.
- [x] Add an exercise to the current day from the board.
- [x] Add stretches to the board, as a card type that doesn't need weight or reps.
- [x] Add an optional video link to each exercise.
- [x] Specify equipment for each exercise (dumbbell, bar, machine, bodyweight, etc.).
- [x] Add a Filter to sort exercises on the board by muscle group.
- [x] Set a default phase for an exercise that applies to all future instances of that exercise.
- [x] Add spinal waves as a bodyweight mobility exercise.

## Done

- [x] Convert to React, meet WCAG 2.2 AAA, make it an installable offline PWA (#14)

## Review notes (2026-10-06)

Checked the feature, bug and architecture items against the code after the TypeScript migration (#80, #81, #82). The pure layout items (1-74) were not re-checked one by one, so a few of those may also be built already.

- **Reduced by TypeScript:** backend language/shape work (shared types and validation, smaller upload step), per-set ticks (#38) and the unit toggle (#62) as refactors (the compiler lists what to change), and stale `.js` paths in the notes.
- **Not reduced (types do not fix behavior or design):** every bug in the Bugs list, all layout and UX items (1-74 except the ones noted), Google login and sync, multi-user items, the stand-in removals in step 4, and error handling (#71 error boundary does not exist yet).
- **Marked done (they were built but never ticked):** plateau/deload hint, auto-progression suggestions, supplement log.
- **Spot-checked as not built:** feedback-form link, error boundary (#71), gym mode (#60), mark today (#4), first-run guide (#58), lb/kg (#62), skip-too-often warning, per-set ticks (#38).
- **Worth doing early because they are small and unblock other work:** sort in `normEntries` (fixes the `bestLift` date), the rest-timer 0 decision, and the personal-defaults list before any multi-user work.
