# 006. Weight unit: canonical pounds, display-only toggle

Status: accepted by the user, 2026-10-06
Depth class: load-bearing

## Context

Backlog item 62 adds a lb/kg toggle, and the stored unit has to be fixed before table design. Changing it later means rewriting every weight row, which is a conflict-prone bulk edit with offline phones and per-row versions (ADR 003).

Today every weight is a plain `number` in pounds, "lb" is hard-coded in about 20 labels and sheets, the limits in [[backend-data-rules]] are in pounds (set weight under 5000 lb, body weight under 1500 lb, lift goal under 5000 lb), and the progression logic assumes pound steps (`round()` snaps to 2.5 or 5 lb; `step()` is 2.5 under 50 lb, else 5). The only existing data is in pounds. Sharing between users with different units is a planned feature (ADR 004).

## Decision

Four parts, one ADR:

1. **Canonical stored unit: pounds.** Every weight in the database is pounds.
2. **Representation: exact decimal, not float.** `numeric` with 4 decimal places, in columns named with the unit (`weight_lb`, `body_weight_lb`, `one_rm_lb`, `goal_lb`). At that precision the conversion error is far below anything a person types or sees, so one canonical unit loses nothing in practice.
3. **Conversion lives in one module.** It converts to the display unit, applies the plate step (2.5 or 5 lb; 1.25 or 2.5 kg), and converts back. A branded `Lb` type makes a missing conversion a compile error.
4. **The toggle is display and input only.** Switching units never rewrites stored rows, so it is safe with offline devices and per-row versions.

## Alternatives considered

- **Canonical kilograms.** The cleaner database if starting from scratch. Lost because every existing number and limit would have to be converted and re-checked for a user who lifts in pounds, and the one-time upload (decision 10) would need conversion.
- **Store as entered, with a unit on every row.** Lossless to what was typed. Lost because every weight field needs a unit, totals and charts must convert at read time, mixed-unit history is confusing, and the progression logic must handle both.

## Deciding axes

1. Migration and rewrite risk. 2. Lossless round trip. 3. Correctness of progression logic. 4. Sharing between users with different units. Cost was cut: all options are $0.

## Consequences

- Raw database values and exports for kg users are in pounds (60 kg is stored as 132.2774). Mitigations: unit-suffixed column names, the branded type, the single conversion module. An export must say its unit.
- Progression steps, `round()`, `step()`, the plate calculator and every "lb" label become unit-aware. That is app work under backlog item 62: list every `lb`/`Lb` occurrence first.
- The Node Postgres driver returns `numeric` as a string. The data-access decision (decision 8) must parse it, and the shared types should treat it as a number only after parsing.
- The one-time upload (decision 10) needs no conversion, and the existing validation limits stay as written.
- Sharing later works without conversion in the database; each viewer's display unit is applied at read time.
- Kilograms would have been the better choice if the audience were mostly metric from day one.

## Revisit when

- Most users turn out to be metric and the pound-flavoured raw values cause real mistakes (conversion missed in a query or report).
- A lifter needs a fractional precision beyond 4 decimal places (unlikely).

## Spec amendment

Backlog item 62 (lb/kg toggle) is amended: "store one canonical unit" is now fixed as pounds, stored as `numeric(.., 4)`, with a display-only toggle. [[backend-data-rules]] limits stay in pounds.
