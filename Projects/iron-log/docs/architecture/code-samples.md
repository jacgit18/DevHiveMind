# Code samples for the backend decisions

Illustrative sketches written 2026-10-06 during the stack walkthrough. **Not from the repo and not run.** Table, helper and library call names are placeholders; check the library docs (Better Auth, Express 5, the Postgres driver) before copying. Each sample names the ADR it illustrates.

## 1. REST versus command (ADR 008)

Scenario: the user hand-logs a session for an exercise already ticked this week. Rule: the hand-logged session replaces the check-off.

REST, the client orchestrates two calls. If the app dies between them the check-off is gone and the session is unsaved (lost workout), or the order is reversed and there is a duplicate.

```ts
await fetch(`/log-entries/${checkOffId}`, { method: 'DELETE' });
await fetch('/log-entries', { method: 'POST', body: JSON.stringify(session) });
```

Command, one call, one transaction, rule on the server:

```ts
// shared contract (client and API both import it)
export const logSession = {
  name: 'log-session',
  parse: (raw: unknown): LogSessionInput => validateLogSession(raw), // shared validator
};
export type LogSessionInput = { clientId: string; exerciseId: number; wk: string; sets: Set[] };

// phone: the offline queue stores exactly this and replays it unchanged
const queued = { name: 'log-session', clientId: 'a1b2', baseVersion: 3, input: { /* ... */ } };
await fetch('/api/commands/log-session', { method: 'POST', body: JSON.stringify(queued) });

// server (Express 5)
app.post('/api/commands/log-session', async (req, res) => {
  const input = logSession.parse(req.body.input);             // 422 if invalid
  const result = await db.transaction(async (tx) => {
    const existing = await findByClientId(tx, req.user.id, input.clientId);
    if (existing) return { rows: [existing] };                // retry: already applied
    const seq = await bumpChangeSeq(tx, req.user.id);         // users.change_seq
    const checkOff = await findCheckOff(tx, req.user.id, input.exerciseId, input.wk);
    if (checkOff && checkOff.version !== req.body.baseVersion) {
      return { refused: 'stale', current: checkOff };         // phone re-merges and resends
    }
    const rows = [];
    if (checkOff) rows.push(await tombstone(tx, checkOff, seq)); // the replace rule
    rows.push(await insertEntry(tx, req.user.id, input, seq));
    return { rows, cursor: seq };
  });
  res.status('refused' in result ? 409 : 200).json(result);
});
```

## 2. Thin routes, rules in a shared module (ADR 005, 007)

The framework only routes, authenticates and shapes errors. Rules are plain functions with no Express import, so a move to Hono later changes only this file.

```ts
// shared/rules/logSession.ts: no framework imports
export function applyLogSession(state: SessionState, input: LogSessionInput): RowChanges { /* ... */ }

// api/validate.ts: the one validation middleware
export const command = (c: Command<unknown>) => (req, res, next) => {
  try { req.input = c.parse(req.body.input); next(); }
  catch (e) { res.status(422).json({ refused: 'invalid', detail: scrub(e) }); }
};

// api/errors.ts: the one error handler (Express 5 passes async errors here)
app.use((err, req, res, _next) => {
  logRefusedOrError(req, err);            // refused-writes table, scrubbed (FM-22)
  res.status(500).json({ refused: 'server_error' }); // phone pauses the queue, never discards
});
```

## 3. Mounting Better Auth on Express (ADR 004, 007)

Order matters: Better Auth's handler goes **before** `express.json()`. Route pattern shown is the Express 5 form; confirm against the Better Auth docs.

```ts
import express from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth';

const app = express();
app.all('/api/auth/*splat', toNodeHandler(auth)); // before the body parser
app.use(express.json());                          // after

app.use(async (req, res, next) => {               // resolve the user once, in one module
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
  if (!session) return res.status(401).json({ refused: 'unauthenticated' });
  req.user = await userFromProviderId(session.user.id); // our own users table (FM-19)
  next();
});
```

## 4. Pull endpoint (ADR 003, 008, data model)

```ts
app.get('/api/sync', async (req, res) => {
  const since = BigInt(String(req.query.since ?? '0'));
  const rows = await db.query(
    `SELECT * FROM log_entries WHERE user_id = $1 AND seq > $2 ORDER BY seq LIMIT 500`,
    [req.user.id, since],
  ); // same shape per table; tombstones included (deleted_at set)
  res.json({ rows, cursor: rows.at(-1)?.seq ?? since, more: rows.length === 500 });
});
```

## 5. Phone queue replay (ADR 003 FM-02, ADR 008)

```ts
async function flush(queue: QueuedCommand[]) {
  for (const cmd of queue) {
    const res = await fetch(`/api/commands/${cmd.name}`, { method: 'POST', /* ... */ });
    if (res.ok) { dequeue(cmd); continue; }                    // applied or already applied
    if (res.status === 409) { const { current } = await res.json(); remerge(cmd, current); continue; }
    if (res.status === 422) { quarantine(cmd); continue; }     // shown in "not saved", exportable
    return;                                                    // 401 and 5xx: pause, never discard
  }
}
```

## 6. Weight in pounds, `numeric` as string (ADR 006)

The Postgres driver returns `numeric` as a string. Parse it in one place, and convert units in one module.

```ts
// shared/units.ts: the only conversion code
export const lbToKg = (lb: number) => lb * 0.45359237;
export const kgToLb = (kg: number) => kg / 0.45359237;

// data-access: parse numeric once at the boundary
const toLb = (v: string | null) => (v === null ? null : Number(v)); // 4 dp fits a double
```

## 7. Kysely with a raw `sql` escape hatch (ADR 009)

Placeholder names; confirm Kysely's current API when scaffolding. The builder handles the plain queries, and `sql` handles the database-specific ones.

```ts
import { sql } from 'kysely';

await db.transaction().execute(async (tx) => {
  // row-level security: set the user for this transaction only (ADR 004)
  await sql`SELECT set_config('app.user_id', ${String(userId)}, true)`.execute(tx);

  // plain query, typed from the generated database types: a typo or renamed column fails the build
  const existing = await tx.selectFrom('log_entries')
    .selectAll().where('user_id', '=', userId).where('client_id', '=', clientId)
    .executeTakeFirst();

  // database-specific: bump the per-user counter and get the new value back
  const { change_seq } = await tx.updateTable('users')
    .set({ change_seq: sql`change_seq + 1` }).where('id', '=', userId)
    .returning('change_seq').executeTakeFirstOrThrow();

  // idempotent create: insert, or do nothing if (user_id, client_id) already exists
  await tx.insertInto('log_entries')
    .values({ user_id: userId, client_id: clientId, seq: change_seq /* ... */ })
    .onConflict((oc) => oc.columns(['user_id', 'client_id']).doNothing())
    .execute();
});
```
