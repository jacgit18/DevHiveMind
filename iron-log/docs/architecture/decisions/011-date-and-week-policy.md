# 011. Date and week policy: local calendar dates as data, Sunday-start week

Status: accepted by the user, 2026-10-06
Depth class: load-bearing (it defines which week a workout belongs to)

## Context

FM-12: a week derived the wrong way can put a workout in the wrong week and trip the one-check-off-per-card-and-week rule. How it works today (`src/lib/dates.ts`, `logic.ts`): each entry has a calendar date `d` (`YYYY-MM-DD`, the phone's local date) and `wk`, the **Sunday** that starts its week; the week runs Sunday to Saturday. The helper is misleadingly named `monday()` but returns a Sunday. A check-off stamps `d` with `defaultLogDate`: today if the viewed week is the current one, otherwise the Sunday of the viewed week. All values are plain date strings, not timestamps. The phone logs offline for up to about 2 days and the server never trusts client clocks for ordering (ADR 003).

The user is the only user so far, has placed no restrictions on late-night ticking, and has not hit the midnight edge case.

## Decision

1. **Keep local calendar dates as data.** The phone sets `d` from its local date; `wk` is the Sunday of that week. The server validates them and never derives them from a clock or a timezone.
2. **One shared function** derives the week start from a date (Sunday start). Rename the misleading `monday()` helper when it is next touched (suggested `weekStartOf`). Client and server use the same function, with tests around midnight and the week boundary.
3. **The server validates** that `wk` is a real Sunday and consistent with `d`, and refuses otherwise instead of silently correcting. The existing case where `wk` differs from the date's week (a deliberate late log against an earlier week) stays allowed within a limit set at build time.
4. **No day-rollover hour.** A workout ticked just after midnight takes the new date; the user can edit `d`.
5. **Week start as a user setting (Sunday or Monday)** is deferred to multi-user readiness (backlog); the default stays Sunday.

## Alternatives considered

- **Stored user timezone with server-derived dates.** One rule across devices, but needs a trusted timestamp, breaks offline writes and changes meaning on travel. Lost on offline and stability.
- **UTC timestamps only, day derived on read.** Day boundaries would differ per viewer, so a workout could shift weeks, and it breaks the imported plain dates. Lost.

## Deciding axes

1. Works offline. 2. An old row never changes week. 3. Fits existing data and import. 4. One definition across devices.

## Consequences

- A tick just after midnight lands in the next day (and, on Saturday night, the next week); this is accepted for now.
- Travel does not change old rows; new rows use the new local date.
- Imports keep original `d` and `wk` (decision 10 note).
- No recurring cost.

## Revisit when

- Midnight ticking becomes a real annoyance, or more users make the week-start setting necessary. The user's preferred shape if it is ever restricted: a check-off belongs to the current day; if at least one item is ticked before midnight, the remaining items are flagged at midnight or move to the next day where the user can choose to skip them, so exercises don't span multiple days (backlog item).

## Spec amendment

Backlog: add the midnight behavior as a UX idea; week-start setting stays in multi-user readiness. [[iron-log/docs/data-model/iron-log]] line 101 corrected from "Monday" to Sunday.
