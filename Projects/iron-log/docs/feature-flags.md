# Feature flags: how they work

## What a flag is

An `if` in your code that reads its value from somewhere you can change without redeploying. Something outside the code sets the value. The code only asks "is this on for this user or environment?"

## Who or what flips it

- **A person**, through a dashboard or config file (LaunchDarkly, Unleash, a JSON file, an env var). This is the most common case.
- **Targeting rules** that decide per user: percentage rollouts, specific user IDs, beta groups, or environment (on in dev, off in prod).
- **Automation.** For example, a kill switch that turns a feature off when the error rate spikes. This is the exception, not the default. A flag is not normally switched by an event trigger.

## Testing overrides

A browser extension, a `?flag=foo` query param, a localStorage value, or a hidden debug panel. These override the flag locally so both states can be tested without touching prod config. Keep them dev-only or gated so users can't flip them.

## Flag types

| Type | Lifespan | Purpose |
|---|---|---|
| Release | Temporary | Hide unfinished work; remove after rollout |
| Ops | Often long-lived | Kill switches |
| Experiment | Per test | A/B tests |
| Permission | Long-lived | Gate paid or beta features |

## In iron-log

For a solo app, a flag is usually a constant, an env var, or a localStorage boolean. The one flag is **API sync** (`src/sync/flag.ts`): a release flag, off by default, on at build time with
`VITE_API_SYNC=true` or in one browser with `localStorage` `ironlog:flag:apiSync` = `true` (`false` forces it off). It is
removed once syncing is trusted. See [[feature-map]] 1.25 and 1.27.

## Admin-only features (2026-10-09)

A second kind of flag: **who** sees a feature, not which build. `src/features.ts` has a registry, one line per feature that is not for everyone yet:

```ts
export const FEATURES = { myNewThing: 'admin' } // 'admin' | 'all' | 'off'; not listed = everyone
```

In a component: `const on = useFeature('myNewThing')`. To open it to everyone, change `'admin'` to `'all'` (or delete the line and the check once you are done with it).

- **Who is an admin:** the server's `ADMIN_EMAILS` env var (comma-separated, any case). A Google account matches by its *verified* email; a development user is `dev:<name>`. Unset means nobody. Set it on Cloud Run like any other variable (see [[deploy-runbook]]).
- **How the app learns it:** `/api/me` returns `account.isAdmin`. `main.jsx` asks once when the app opens (syncing on only) and `setAdmin` keeps the answer in `ironlog:session/admin`, so an admin still sees the feature offline. Any doubt means "not an admin". Signing out, or a definite 401, clears it. With syncing off (GitHub Pages) there is no account, so admin features are hidden.
- **Hiding is not security.** A feature with an API route must also put `requireAdmin` (`server/admin.ts`, answers 403) on that route. A feature that writes new fields into shared documents still reaches non-admin devices through sync; see [[backend-data-rules]].
- **Each flag needs a removal condition.** Write it next to the registry line. Release flags that outlive their feature are clutter.
- **Local testing:** add `dev:owner` to `ADMIN_EMAILS` in `.env`, then `?devUser=owner` is an admin and `?devUser=guest` is not.

**Development builds start as a stranger (2026-10-08).** With syncing on in a development build you get the landing page and the real Google sign-in, like a visitor to the live site. To get in without Google as a fake user, press **Skip: continue as the development user** on the landing page (development builds only), or open the app once at `http://localhost:3002/?devUser=dev` (or any plain lowercase name). `?devUser=off` goes back to being a stranger. The choice is kept in `ironlog:flag:apiUser`. The real Google sign-in works locally because `http://localhost:3002/api/auth/callback/google` is on the OAuth client. All of it needs the real API running against the **local** database: `DATABASE_URL='postgres://ironlog:ironlog@127.0.0.1:5433/ironlog?sslmode=disable' npm run dev:server`, never the production URL in `.env`. A production build ignores all of this.
