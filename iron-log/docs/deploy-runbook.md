# Deploy runbook: Iron Log on Google Cloud Run + Neon

_Written 2026-10-08 (Phase F, first step). Decisions: ADR 010 (Cloud Run, one origin), ADR 002 (Neon), ADR 004 (sign-in). Script: `scripts/deploy-cloud-run.sh` in the repo. Project id: `iron-log-jacgit18` (created and billing linked 2026-10-08; `iron-log` was taken), billing account `014669-B7DC54-EF6F5B`._

Who does what: **you** do the steps that spend money, create accounts or touch secrets and the production database; **Claude** wrote the script and checks the results you paste back (never paste a password or a key into chat: the script reads them from your shell).

## 0. Before you start

- A card is needed on the Google billing account (ADR 010). Spend should stay at $0 at this scale: `max-instances=1`, `min-instances=0`, and a budget alert. **A budget alert warns, it does not stop spending**; the instance cap is what limits it.
- Neon production already holds migrations 001-009 and the `ironlog_app` role (no login yet). Check: `dbmate status` against the **unpooled** owner URL shows nine applied. Do **not** run `dbmate up` there again unless a new migration exists.
- `gcloud` is installed and logged in as joshuaxcarpentier@gmail.com (`gcloud auth list`). Its default project is still the old `iron-log-spike`; the script always passes `--project`, so it does not matter.

## 1. Google Cloud project and billing (you)

```bash
gcloud projects create iron-log-jacgit18     # DONE 2026-10-08 (iron-log was taken)
gcloud billing projects link iron-log-jacgit18 --billing-account=014669-B7DC54-EF6F5B   # DONE 2026-10-08
```

Budget alert (console is fine: Billing → Budgets & alerts → Create budget → project `iron-log-jacgit18` only, amount **$3**, alerts at 50% and 100%, email to you). Or:

```bash
gcloud services enable billingbudgets.googleapis.com --project iron-log-jacgit18
gcloud billing budgets create --billing-account=014669-B7DC54-EF6F5B --display-name=iron-log \
  --budget-amount=3USD --filter-projects=projects/iron-log-jacgit18 \
  --threshold-rule=percent=0.5 --threshold-rule=percent=1.0
```

Confirm to Claude when both are done ("billing linked, budget set"): the deploy waits for that.

## 2. Neon production: let the API log in (you)

The API connects as `ironlog_app` (row-level security applies to it; the server refuses to run in production as the owner or a superuser). The role exists but has no login. In a shell, with the **owner, unpooled** production URL in `OWNER_URL` (typed or pasted into your own shell, not into chat):

```bash
read -rsp "New ironlog_app password: " PW; echo
psql "$OWNER_URL" -c "ALTER ROLE ironlog_app LOGIN PASSWORD '$PW'"
```

Then build the **pooled** URL for the same branch (host has `-pooler`, user `ironlog_app`, same database, `sslmode=require`) and keep it in the shell for step 4:

```bash
export APP_DATABASE_URL="postgres://ironlog_app:$PW@<pooled host>/<database>?sslmode=require"
unset PW
```

(`node scripts/check-pooled-rls.mjs` already proved the pooler keeps the per-request setting on a scratch branch; it needs no rerun here.)

## 3. Google sign-in client (you)

Google Cloud console → APIs & Services → Credentials → your OAuth client (reuse the spike's, or make a new "Web application" one).

1. Print the service address (works before the first deploy): `PROJECT_ID=iron-log-jacgit18 scripts/deploy-cloud-run.sh url`
2. Under **Authorized redirect URIs** add `<that address>/api/auth/callback/google`. Under **Authorized JavaScript origins** add `<that address>`.
3. Keep the client id and secret for step 4. The consent screen must allow your Google account as a test user (or be published).

## 4. Deploy (you run, Claude reads the output)

```bash
export PROJECT_ID=iron-log-jacgit18
read -rp "Google client id: " GOOGLE_CLIENT_ID; export GOOGLE_CLIENT_ID
read -rsp "Google client secret: " GOOGLE_CLIENT_SECRET; echo; export GOOGLE_CLIENT_SECRET
scripts/deploy-cloud-run.sh setup      # enables APIs, makes the image repository and the service account
scripts/deploy-cloud-run.sh secrets    # stores the four secrets; refuses a non-ironlog_app or local database URL
scripts/deploy-cloud-run.sh deploy     # builds from the committed code and deploys; prints the address
```

`deploy` refuses to run with uncommitted changes and builds exactly the current commit (its commit time becomes the app version, which the update gate uses). Run it from `main` after a merge.

## 5. Check it

```bash
curl -s <address>/api/health          # {"ok":true}
curl -s <address>/api/health/db       # {"ok":true}: the pooled login works
gcloud run services logs read iron-log --project iron-log-jacgit18 --region us-central1 --limit 30   # "sign-in is on", no "row-level security is not protecting"
```

Then in a desktop browser: open the address, **Settings**, turn the sync flag on (in this build: console `localStorage.setItem('ironlog:flag:apiSync','true')`, reload), **Sign in with Google**.

1. Make yourself admin, once, against production (owner URL, in psql): `update users set is_admin = true where auth_user_id = (select id::text from auth."user" where email = '<your email>');`
2. Settings → Account → **Upload from an export file**: pick a **fresh** export from the GitHub Pages copy (made just before, so nothing newer is left behind).
3. **iPhone** (the check everything has been waiting on): open the address in Safari, Share → Add to Home Screen, open it from the home screen, enable sync, sign in with Google. Record pass or fail in [[iron-log/docs/backlog|backlog]] (spikes: Google sign-in in an installed iOS PWA). If it fails, reopen ADR 004 and the same-origin choice in ADR 010.
4. Watch the browser console on the installed app for CSP errors (not yet seen against a real PWA).

## 6. After it works

- GitHub Pages keeps serving the old stand-alone copy until you decide otherwise; both can coexist. The new address is the real app.
- Rollback: `gcloud run services update-traffic iron-log --project iron-log-jacgit18 --region us-central1 --to-revisions <previous>=100` (revisions: `gcloud run revisions list ...`). Data is untouched by a rollback.
  - **A rollback pins traffic** to that revision: a later deploy would be ready but get no traffic. Undo it with `PROJECT_ID=iron-log-jacgit18 scripts/deploy-cloud-run.sh restore` once the fix is ready (the manual `deploy` command does this itself; the CI flow sets traffic explicitly each time). Added 2026-10-09, [[017-release-and-deployment-strategy]].
- Cost check after a week: Billing → Reports for project `iron-log-jacgit18`.
- Still to do in Phase F: CI deploy automation, rate limits on commands, client-error endpoint and logs (ADR 013), backups and a restore rehearsal, a failing-migration rehearsal on a Neon branch, retention values, privacy policy and delete-my-data.

## 7. Backups (Phase F; written 2026-10-08)

**Why:** your Neon project is on the Free plan: **6 hours** of point-in-time history (checked against the Neon docs and `describe_project`: `history_retention_seconds` = 21600), **one** manual snapshot, **no** scheduled snapshots, and none taken. A mistake you notice tomorrow cannot be undone from Neon alone. So there is a second copy outside Neon.

**What it is:** a nightly `pg_dump` (custom format) plus a manifest of every table's row count, written by a Cloud Run Job to a **private** Cloud Storage bucket (`<project>-iron-log-backups`, access only for you, public access prevented, files deleted after 30 days by the bucket itself). Left out on purpose: the contents of `auth.session` and `auth.verification`, so a backup cannot be used to sign in as someone. The job's service account can create files in the bucket and nothing else.

**Your steps** (all inside the free tiers; the budget alert covers them). Run from `main` in your terminal, each as one command because exports do not carry over between `!` commands:

1. `PROJECT_ID=iron-log-jacgit18 scripts/backup-cloud-run.sh setup`
2. Store the database URL the job reads. It is the **unpooled owner** URL of production (pg_dump needs a real session, not the pooler). Row-level security does not apply to the table owner, which is why the owner can dump every row:
   ```bash
   cd ~/Videos/iron-log && BACKUP_DATABASE_URL=$(grep '^DATABASE_URL_UNPOOLED=' .env | cut -d= -f2- | tr -d "\"'") PROJECT_ID=iron-log-jacgit18 scripts/backup-cloud-run.sh secret
   ```
3. `PROJECT_ID=iron-log-jacgit18 scripts/backup-cloud-run.sh deploy` (builds the image, creates the job, schedules it for 3:15 AM New York every night)
4. `PROJECT_ID=iron-log-jacgit18 scripts/backup-cloud-run.sh run`, then `... list` to see the files.
5. **The rehearsal that makes it a backup:** `... fetch` then `scripts/restore-check.sh backups/ironlog-<time>.dump`. It restores into a throwaway PostgreSQL 18 container on your machine and compares every table's row count with the manifest. It must print `RESTORE OK`. Do this once now and then every month or two.

**Also:** Neon's one free manual snapshot is worth using before anything risky (a big migration): console → Backup & restore → Create snapshot.

**Known limits, accepted for now:**
- The job's secret is the database owner's URL (the highest-privilege secret in the project, readable only by the backup service account). A dedicated read-only role with row-security bypass would be tighter; do that if more people than you will ever manage this.
- Nothing yet **alerts** you if a night's backup fails (ADR 013's one alert is still to do). Until then run `... list` now and then: you should see a new pair of files every day.
- A backup holds everyone's data, including the second account's. Treat the bucket like the database: tell users it exists in the privacy policy (still to write), and delete-my-data must also age out of backups (30 days).
- Restoring production from a dump is a manual, deliberate procedure (restore into a new Neon branch, check it, then point the app at it); it is not scripted, because doing it by accident is worse than doing it slowly.


## 8. Applying a new database migration to production (added 2026-10-08, migration 010)

A migration that **adds** things (a column with a default, new functions) is safe to apply **before** the code that uses it is deployed, and the old code keeps working. So the order is: migrate first, then deploy. Migration 010 (erase and delete functions, `users.data_epoch`) is the first one since production was set up; the new code selects `data_epoch`, so deploying it **before** migrating would break every pull.

1. Check what is applied (read-only; prints a list with `[ ]` for what is pending):
   ```bash
   cd ~/Videos/iron-log && DATABASE_URL=$(grep '^DATABASE_URL_UNPOOLED=' .env | cut -d= -f2- | tr -d "\"'") DBMATE_NO_DUMP_SCHEMA=true DBMATE_MIGRATIONS_DIR=db/migrations npx dbmate status
   ```
   Expect ten files, nine `[X]` and `20261008000003_erase_and_delete_account.sql` as `[ ]`.
2. Take Neon's one free manual snapshot first if you want an undo point (console → Backup & restore → Create snapshot), and run a backup now: `PROJECT_ID=iron-log-jacgit18 scripts/backup-cloud-run.sh run`.
3. Apply it (the same command with `up`). It runs as the owner, in one transaction, and only adds:
   ```bash
   cd ~/Videos/iron-log && DATABASE_URL=$(grep '^DATABASE_URL_UNPOOLED=' .env | cut -d= -f2- | tr -d "\"'") DBMATE_NO_DUMP_SCHEMA=true DBMATE_MIGRATIONS_DIR=db/migrations npx dbmate up
   ```
4. Then deploy as usual. Check afterwards: sign in, and Settings → Delete my data is there (do not press anything in it).

## 9. Alerts (Phase F; written 2026-10-08)

Three email alerts, from `scripts/alerts-cloud-run.sh` (free at this size): **(1)** a nightly backup run failed, **(2)** Cloud Scheduler could not start the backup, **(3)** 5 or more server errors (5xx) within 5 minutes. Each carries instructions in its text (what to run to see why, how to roll back).

Not covered, on purpose: "no backup for a day" (Cloud Monitoring cannot watch a gap that long reliably). `scripts/backup-cloud-run.sh list` should show a new pair of files every day; look now and then.

Steps (each its own `!` command, from `main`):
1. `cd ~/Videos/iron-log && PROJECT_ID=iron-log-jacgit18 ALERT_EMAIL=joshuaxcarpentier@gmail.com scripts/alerts-cloud-run.sh setup` (makes the email channel and the three policies; safe to run again)
2. `PROJECT_ID=iron-log-jacgit18 scripts/alerts-cloud-run.sh list` shows the channel's `verification=` status. If it is not `VERIFIED`: `... verify` emails a code, then `... verify <code>` confirms it.
3. Check it reaches you: Google Cloud console → Monitoring → Alerting → Edit notification channels → your email channel → **Send test notification**.

## 10. Deploying from GitHub (CI deploy; written 2026-10-08)

After a merge to `main`, the **Tests** workflow runs again on that exact commit; when it passes, **Deploy to Cloud Run** waits for your approval (required reviewer on the `production` environment), then builds the image and deploys it as a **tagged revision with no traffic** (`scripts/deploy-cloud-run.sh candidate`). It checks that revision on its own address (API, database login, the app's files, an anonymous call refused). If the check fails the revision never gets traffic and nothing needs rolling back. If it passes, `promote` sends it all traffic, the live service is checked again, and **traffic goes back to the previous revision if that second check fails** (ADR 017, changed 2026-10-09). Sign-in does not work on the tagged address, so the first check is anonymous only. "What is live now" is the revision that has the traffic, not the latest one. No key is stored in GitHub: it signs in to Google by Workload Identity Federation, and Google only accepts this repository on its main branch. The deployer account can build, deploy and move traffic, and act as the app's runtime account; it cannot read the database, the secrets or the backups, or change who may call the service.

**Migrations still come first, by hand.** CI never holds the database password. When migrations were added since the live revision, the workflow stops with "A database migration is waiting". Apply them (section 8), then Actions → Deploy to Cloud Run → Run workflow → tick "I have applied any new database migration".

**One-time setup (yours):**
1. `cd ~/Videos/iron-log && git checkout main && git pull && PROJECT_ID=iron-log-jacgit18 GITHUB_REPO=jacgit18/iron-log scripts/ci-deploy-setup.sh` (makes the identity pool, the provider locked to this repository and branch, and the deployer account; safe to run again). It ends by printing three `gh variable set ...` commands.
2. Run those three commands (or add the three **variables**, not secrets, in GitHub → Settings → Secrets and variables → Actions → Variables).
3. Optional but recommended at first: GitHub → Settings → Environments → production → **Required reviewers** → you, so each deploy waits for one click. Remove it when you trust it.
4. Prove it: Actions → Deploy to Cloud Run → Run workflow (leave the box empty). It should deploy the current `main` and pass the check.

**The two accounts, and why (first run, 2026-10-08).** The image build does not run as the deployer. `ci-deploy-setup.sh` also makes **`iron-log-build`**: it can write build logs, push to the `iron-log` image repository and read the `iron-log-jacgit18_cloudbuild` upload bucket, and nothing else. The deployer may act as it, and as the app's runtime account, and as no other. Without it Cloud Build runs as the project's default Compute account, which has the broad **Editor** role; letting CI act as that would undo the limits above, so do not grant it as a shortcut. The workflow names the build account in `BUILD_SA` (the deployer cannot look accounts up); on your own machine `deploy-cloud-run.sh` uses it when it exists.

The deployer also holds a custom role, **`ironLogBucketLister`** (only `storage.buckets.list`, names of buckets, no objects): `gcloud builds submit` lists the project's buckets to check the upload bucket is its own, and without it the build stops with "forbidden from accessing the bucket".

**If the first deploy fails, in the order it did here:**
- "The working tree has uncommitted changes" — the Google sign-in writes `gha-creds-*.json` into the checkout; it is in `.gitignore` and `.dockerignore`.
- "forbidden from accessing the bucket" — the bucket-lister role is missing; re-run `ci-deploy-setup.sh`.
- "caller does not have permission to act as service account ...-compute@developer" — the build account is missing or `BUILD_SA` is not set; re-run `ci-deploy-setup.sh`.

The manual command (`scripts/deploy-cloud-run.sh deploy`) keeps working, for emergencies or if GitHub is down.


## 11. Measuring dropped requests during a deploy (added 2026-10-09)

`scripts/deploy-probe.sh <service address> [seconds]` asks `/api/health` and `/api/health/db` once a second and prints each answer, marking any that is not 200 (`DROP`) or slower than 3 s, then a summary. Start it before approving a deploy and leave it until the deploy finishes. Record the result in [[017-release-and-deployment-strategy]]: if nothing dropped, say so; if something did, add a startup probe on `/api/health/db` to the deploy and measure again.
