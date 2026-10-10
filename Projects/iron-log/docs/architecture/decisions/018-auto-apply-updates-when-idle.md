# 018. A waiting app update is applied by itself when the app is idle

Status: accepted by the user, 2026-10-10 (audience: everyone, no admin-first flag)
Depth class: product and release

## Context

Iron Log is a PWA: a service worker caches the whole app, so after a deploy the old version keeps running until the new service worker is activated. Until now `registerType: 'prompt'` showed a *Reload now / Later* banner and nothing reloaded until the user tapped. That protects a workout (a reload stops the rest timer and drops a half-typed value) but means every deploy asks the user to press a button, and an app opened once a week may sit on an old version, which matters now that the API can refuse a client that is too old to sync (426, [[017-release-and-deployment-strategy]]).

## Decision

1. **Keep `registerType: 'prompt'` and the banner.** The banner is the fallback and the manual path.
2. **Add an automatic apply.** While an update is waiting (`needRefresh`), `UpdateBanner` checks every 5 s whether the app is idle (`canAutoReload`, `src/lib/updateIdle.ts`) and, when it is, calls `updateServiceWorker(true)`. Idle means all of: no rest or hold timer running, no sheet open, no import under review, no refused write held in memory (`unsaved`), no text field focused, no tap or key for 15 s, and no automatic reload in this tab in the last 60 s (loop guard).
3. **Busy means the banner, unchanged.** *Later* clears the waiting flag, so the automatic apply stops until the next version is detected. The "Update needed" alert (API 426) is unchanged and is also applied automatically once idle.
4. **Look for updates when the app is opened again.** Becoming visible after 10 minutes without a check triggers `registration.update()`, besides the existing hourly check, so the update is usually found at launch, before anything is in progress.
5. **No admin-first flag.** The user chose release to everyone at once (overrides the "new feature = admin-only first" rule for this change). Nothing is stored or written; the change is client-only.

## Alternatives considered

- **`autoUpdate` (skip waiting, reload at once).** Simplest, but reloads mid-workout. Lost.
- **Apply on the next cold start only.** Never interrupts, but can leave the app on stale code for days, which conflicts with the 426 case. Lost.
- **Banner only (status quo).** Safe, but needs a tap on every deploy. Kept as the fallback.

## Deciding axes

Safety of a workout in progress outweighs convenience, so every sign of use blocks the reload and the banner remains. Data is already persisted locally and refused writes block the reload, so an automatic reload does not lose data.

## Consequences

An update can now arrive while the app sits open and untouched; the user sees the app reload on its own. The 15 s quiet time and the focus check are heuristics: a user reading the board without tapping for 15 s can be reloaded (no data lost, timer excluded). Tuning lives in `QUIET_MS` and `LOOP_GUARD_MS`.
