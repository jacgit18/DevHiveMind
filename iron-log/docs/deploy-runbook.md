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
3. **iPhone** (the check everything has been waiting on): open the address in Safari, Share → Add to Home Screen, open it from the home screen, enable sync, sign in with Google. Record pass or fail in [[backlog]] (spikes: Google sign-in in an installed iOS PWA). If it fails, reopen ADR 004 and the same-origin choice in ADR 010.
4. Watch the browser console on the installed app for CSP errors (not yet seen against a real PWA).

## 6. After it works

- GitHub Pages keeps serving the old stand-alone copy until you decide otherwise; both can coexist. The new address is the real app.
- Rollback: `gcloud run services update-traffic iron-log --project iron-log-jacgit18 --region us-central1 --to-revisions <previous>=100` (revisions: `gcloud run revisions list ...`). Data is untouched by a rollback.
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
