# Run 1: follow-up validation (2026-10-09)

After the first audit, the sync finding was fixed on a branch and the open leads in [[NEEDS-VALIDATION|NEEDS-VALIDATION]] were measured where a local Postgres and Docker could do it. Everything ran on this machine: the project's own Postgres container (loopback, port 5433), scratch databases that were dropped afterwards, and the production image's Node (22.23.3). No deployed service, Neon database, GCP project or credential was touched. The probes are kept in `run-1/validation/` (saved as `.txt` so they are not picked up as tests).

## Summary

| Lead | Result | What is still unknown |
|---|---|---|
| Sync identity latch (confirmed, low) | **Fixed on a branch**, 3 new tests that fail without the fix. | The server-side expected-user header (the stronger fix) is not built. |
| Unbounded `/api/auth` body | **Reproduced.** 16 concurrent 32 MiB anonymous bodies killed the server in a 512 MiB container. **Fixed on a branch and re-measured.** | Whether Cloud Run's front end forwards bodies that large to the container; restart time. |
| Rate limiter with rotating IPv6 keys | **Bypass reproduced**; the scan cost is real but small. | Whether the live service gets IPv6 clients and what `X-Forwarded-For` it sees. |
| Per-account storage growth | **Reproduced**: growth is linear in the size of what is sent, with no cap or pruning. | Neon's storage ceiling; whether sign-up is open to anyone (the Google consent screen may still be in testing mode). |
| `import-legacy` holds a connection | **Reproduced**: 2,000 commands hold one connection about 4.4 s; one account starved other users for the whole run. | Real pool settings and database latency in production; the "fails on the last command, then repeat" variant was not reproduced. |
| Backup bucket soft delete | **Confirmed 2026-10-09 with one read-only `gcloud storage buckets describe`**: soft delete is on at 7 days (`retentionDurationSeconds: 604800`), so a dump deleted by the 30-day rule is recoverable until about day 37. Privacy policy and the Delete-my-data note say 30. | A decision: turn soft delete off, or change the wording to 37 days. |

## 1. Sync identity latch (fixed on branch `f-sync-recheck-identity`, not committed)

`src/sync/apiDb.ts`: `verified` is now cleared whenever the app wakes (tab becomes visible, network comes back, sign-in resumes) and on every poll tick, so the next pull or send asks who is signed in first. Three tests in `src/sync/apiDb.test.ts` (waking as Ann after another tab switched the cookie to Bob; the timer, which a hidden tab skips; and the same account carrying on, asking once per wake). All three fail without the change. Full checks pass: typecheck, 1,590 tests, lint (only the known `Supplements.tsx` warning), build, and `e2e:sync` (8 real-stack and 6 accounts tests, including "a second account on the same device is held back").

What it does not do: a tab that stays visible and keeps being edited while another window switches the account is covered only at the next poll (at most one minute). Closing that fully needs the server to refuse a request whose expected user differs from the session user (an `X-Expected-User` header and a 409), so the client pauses with "account". That is a small server change plus a transport change; it is in [[Vault Backlog]].

The change is saved as a stash on that branch and as `run-1/validation/sync-recheck-identity.patch`.

## 2. Unbounded `/api/auth` body (fixed on branch `f-auth-body-cap`, not committed)

Setup: the production image's Node (`iron-log:d5`, Node 22.23.3) running the current server build, `NODE_ENV=production`, `--memory 512m --memory-swap 512m`, on a scratch database, with the real production role check, sent anonymous `POST /api/auth/sign-out` bodies of 32 MiB. (The sign-in routes answered 429 first: the 10 per minute limit stops a flood there. The other auth routes allow 120 a minute and buffer the body just the same.)

| Concurrent 32 MiB bodies | Result |
|---|---|
| 1 | 200, peak about 142 MiB |
| 4 | all 200, peak about 261 MiB |
| 8 | all 200, peak about 303 MiB |
| 16 | **server killed**: exit 137, `OOMKilled: true`, every request dropped |
| 24 | server already down (connection refused) |

So memory grows with the total of the bodies in flight, roughly one for one. Cloud Run allows 40 concurrent requests per instance and the service is one 512Mi instance, so the same shape applies there if Cloud Run forwards 32 MiB bodies (about the HTTP/1 limit; not tested). That makes it an unauthenticated remote stop of the whole service; each restart is a cold start and an attacker can repeat it.

The fix is `server/bodyLimit.ts`, mounted on `/api/auth` after the rate limits: a body that declares more than 16 KiB, or has no length (chunked), gets a 413 before anything is read. It does not listen to the stream (that would start it flowing before Better Auth is ready). Re-run of the same flood against the rebuilt server: 16 and 24 concurrent 32 MiB bodies all answered 413, peak memory about 50 MiB, no kill; a normal sign-in start and sign-out still worked. 4 new unit tests. Checks: typecheck, 1,594 tests, lint, `e2e:sync` all pass (the accounts suite signs in through `/api/auth`).

Also seen: Better Auth's own limiter logs "could not determine a client IP and is falling back to a single shared per-path bucket" when a request has no forwarded-address header (it had none in this test). On Cloud Run the header is present; worth one look in the live logs for that warning.

## 3. Rate limiter

Real `createApp` with `trustProxy: 1`, on `/api/client-errors` (20 a minute per address):

- one address: 20 accepted, 5 limited;
- a different IPv6 address each time: **25 of 25 accepted**, nothing limited;
- median time of an ordinary request: 0.3 ms with 5,000 live keys, 0.9 ms with 15,000, 1.8 ms with 40,000.

So per-address limits (including the 10 a minute on sign-in) are bypassed by any client that can present many addresses, and the whole-map scan past 10,000 keys is a measurable but modest cost. Whether the live service can see many distinct client addresses is the open fact.

## 4. Storage growth from one account

Real app, real migrations, as a normal signed-in user (dev header, same code path as a session user):

- 100 saves of a config document of about 52 KB (distinct content each time): all accepted in 2.6 s; `row_history` grew from 32 KB to **5.7 MB** (99 rows, about one copy of the old row per update).
- 100 refused requests of about 80 KB each (a malformed envelope): `refused_writes` grew from 32 KB to **8.5 MB**, each stored in full.

Growth is linear in what is sent, with nothing that caps or prunes it. At the 600 a minute command limit and 100 KB a request that is about 60 MB a minute from one account. What decides how bad this is: the Neon plan's storage limit, and who can sign in (the backlog says the Google consent screen is not yet published, which would limit this to listed test users).

## 5. `import-legacy`

- 2,000 valid commands: one request, one connection held for **4.4 s** (so about 44 s for the 20,000 allowed, on a local database with no network latency).
- Pool of 2, two accounts importing, a third user asking `/api/me`: that user waited 3.7 s.
- Pool of 3, **one account** sending 3 concurrent imports (inside its 10 an hour): the first succeeded, the other two waited on the user lock while holding their connections and then got 409; another user's `/api/me` waited **3.9 s**, the length of the first import.

Production's pool is 10 and its latency to Neon is higher, so the same pattern would hold the pool longer. Not reproduced: the "invalid last command rolls everything back, so it can be repeated" variant. The invalid command I used (a negative weight) is quietly cleaned instead of refused, so nothing rolled back; a command that really fails part-way was not tried.

## 6. Backup bucket soft delete (checked on the live bucket, read-only)

`gcloud storage buckets describe gs://iron-log-jacgit18-iron-log-backups --project iron-log-jacgit18`: created 2026-10-08, location US-CENTRAL1, public access prevention enforced, uniform access on, one lifecycle rule (delete at age 30 days), and `soft_delete_policy.retentionDurationSeconds: 604800` (7 days). The setup script never sets a soft-delete duration, so Google's default applied.

Effect: the lifecycle rule deletes a dump at day 30, but it stays recoverable (by project principals only; the backup job's account can only create objects) for 7 more days, so an erased user's data can remain in a backup for up to about 37 days. `privacy.html` and `DeleteMyData.tsx` promise 30. The gap is 7 days and the readers are the owner, but the written promise is not what the bucket does.

Two ways to close it, owner's choice:
- Keep the promise: `gcloud storage buckets update gs://iron-log-jacgit18-iron-log-backups --clear-soft-delete`, put `--soft-delete-duration=0` in `scripts/backup-cloud-run.sh` (create and update), and add a check to `server/legal.test.ts`. Cost: no 7-day undo if a backup is deleted by mistake (the backup job cannot delete, so only an operator could).
- Change the words to "within 37 days" in `privacy.html` and `DeleteMyData.tsx`, and keep the undo.

## Cleaned up

The scratch databases and the test container were removed; the dev role `ironlog_app` was put back to no login. The only thing left running is the project's own `iron-log-db-1` container, which `npm run db:start` brought up. The temporary probe test file was taken out of the repo.
