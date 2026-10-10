# 010. Hosting: Google Cloud Run, API serves the PWA from one origin

Status: accepted by the user, 2026-10-06
Depth class: structural

## Context

The API (Express in a Docker container, ADR 001, 007) needs a host. Cap: free tiers only. Prices were checked 2026-10-06 from aggregator and review sites, not provider pages; **confirm each on the provider's own pricing page before relying on it**. Findings:
- Google Cloud Run: any container, scales to zero, monthly free quota of 2M requests, 180k vCPU-seconds, 360k GiB-seconds; needs a billing account with a card.
- Render free web service: 512 MB, 0.1 CPU, 750 hours a month, sleeps after 15 minutes idle, 30 to 60 s wake. No card needed (not verified).
- Koyeb: one free instance, scales to zero after 1 hour; sources conflict on whether a card and a $29/month default plan are now required.
- Railway: $5 one-time trial credit, then $1 a month free credit; real use is the $5/month Hobby plan. Fails the cap.
- Fly.io: no free tier for new accounts; about $5/month pay-as-you-go. Fails the cap.

The phone is offline-first and sync runs in the background (ADR 003, 008), so a slow first request delays a sync but loses nothing, provided the queue uses a long timeout and never discards on a timeout (FM-02). Neon also scales to zero (ADR 002), so cold starts can stack.

Better Auth uses cookies (ADR 004). If the PWA and API are on different sites, iOS Safari can treat the API cookie as third-party and block it.

## Decision

1. **Run the API on Google Cloud Run** in a Docker container.
2. **Same origin:** the Express app also serves the built PWA files, so the app and the API share one origin and cookies are first-party. This avoids a custom domain (not free) and the cross-site cookie problem.
3. **Guard the cap** (a card is on the billing account): `max-instances=1`, and a budget alert at a few dollars. Spend should be $0 at this scale.
4. **Fallback:** Render free web service, no card, accepting the 30 to 60 s wake. Same Docker image.

## Alternatives considered

- **Render free.** Fallback. No card and no overage risk, but an up-to-a-minute wake is worse for a manual "sync now". Lost on cold start and production relevance.
- **Koyeb.** Terms unclear and reportedly now card-gated with a paid default plan. Not chosen.
- **Railway, Fly.io.** Break the $0 cap. Paid alternatives (below).

## Deciding axes

1. Cost cap and billing risk. 2. Cold start against the sync queue. 3. Same origin with the PWA. 4. Learning and production relevance. 5. Ease of switching (all use the same Docker image).

## Cost

- **User's plan:** tens of users, a few hundred requests a day, far inside the free quota. $0.
- **Realistic scale (unverified estimate, for learning):** about 50k active users at about 20 requests a day is roughly 30M requests a month, about 15x the free quota; low tens of dollars a month on Cloud Run, or about $7 a month on a small always-on Render instance. At that scale an always-on host wins.
- **Paid alternatives:** Railway Hobby or Fly.io at about $5/month (unverified). Trigger: the free host's cold start or quota hurts real users.

## Consequences

- A card is on a billing account; mitigated by the instance cap and budget alert. This is a small, real risk against a "free tiers only" cap, accepted by the user.
- One deploy covers app and API, so they are coupled: a PWA-only change redeploys the API. Accepted for first-party cookies.
- Service worker and cache headers for the PWA files are now the API's job (check at build time).
- Stacked cold starts (Cloud Run, then Neon wake): the queue timeout must be long, and a timeout never discards (ADR 003 FM-02, ADR 008).
- ADR 005's footprint question: re-check image size and cold start once built; Cloud Run starts a container per instance.
- **Still open, an early spike:** whether Google sign-in works inside an *installed* iOS PWA. Research cannot settle this; test on a real iPhone before building more auth.
- Image, config and deploy scripts stay in the repo; nothing depends on the console alone.

## Revisit when

- A real user hits a cold-start or quota problem (switch to a paid always-on host).
- The card requirement or the free quota changes.
- The iOS sign-in spike fails (revisit ADR 004 and the same-origin choice).

## Spec amendment

None. Backlog step 3 item "Hosting" is settled; the iOS sign-in spike is carried as an open item.
