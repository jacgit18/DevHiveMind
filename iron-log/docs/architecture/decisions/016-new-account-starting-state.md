# 016. What a new account starts with: a blank program, not the owner's

Status: accepted by the user, 2026-10-08
Depth class: product and data

## Context

Iron Log is live for more than its owner (Phase F closed 2026-10-08; two other accounts have signed in). An account with no saved program falls back to `BUILTIN`, Programs A and B in `src/lib/data.ts`: the owner's own plan (about 65 cards, their starting weights, boxing moves, a "Shadow box" warm-up). `DEFAULT_CFG` is clean; the leak is the built-in programs and, smaller, the default backup repo names in `src/lib/export.ts` (`jacgit18/iron-log-data`, `jacgit18/iron-log`, the `Composio For You` connector).

Why a one-line change is wrong:
- `programs[k] !== BUILTIN[k]` is the app's test for "unmodified" (Editor, export, `settingsSlice`, `editorSlice`). The "Original program · built in" library row also offers the owner's program to anyone.
- 16 test files use the built-ins, and the board reorder and log write paths must keep their tests green (no exercise lost or duplicated).
- Unedited programs were never saved. The two existing accounts are therefore showing the built-in cards today, and their log entries point at those cards. A blank fallback would make their cards disappear.

## Decision

1. **A brand-new account starts with a blank program**: seven empty days and a "build my own" prompt. No starting weights, no exercises on the board, no warm-up taken from the owner.
2. **An account that already has data keeps what it shows today.** The rule, decided on the client once both the programs and the logs have loaded: use the blank program only when the account has **no program document and no log entries**. Otherwise fall back to `BUILTIN` as before. No data of any account is written or moved to make this work, and nobody's cards change.
3. **`BUILTIN` stays as it is.** It remains the "unmodified" marker and is not emptied. The local-only build (GitHub Pages, no sync) is unchanged for now.
4. **"Original program · built in" means the blank program in sync mode** once step 2 below is done, so the owner's plan is not offered to anyone as a library entry. In local mode it stays.
5. **The exercise library (`EX`) is left as it is for now** (decided by the user, 2026-10-08). It is a catalogue of names and equipment, not a plan; it is revisited with the exercise catalog idea ([[exercise-catalog-idea]], which needs stable exercise ids first).
6. **The personal backup repo names and the connector name are removed** from `export.ts` defaults. They disappear with the stand-in GitHub backup (backlog §4) if that is removed first.

Order, one PR each, no behavior change inside a refactor:
1. The blank program and the rule in (2), in the sync-mode program loader (`useAppStore.ts`, `db.collection('programs').onSnapshot`). Tests: new account gets blank; account with a log entry or a saved program keeps its program; a pending local edit still wins; reload and offline start; `planFix`, `mutateChecks`, `autoLogs`, `addEntry` and the reorder tests unchanged and green.
2. "Original" means blank in sync mode (Editor, `editorSlice`, `settingsSlice` reset paths).
3. The empty-board first-run prompt ("Add your first exercise", pick days per week), which overlaps backlog "Starter programs for new users" and "first-run guide".
4. Remove the personal defaults in `export.ts`.

**Extension, 2026-10-09 (asked for by the user): stretches.** The default stretch routine is also the owner's (19 stretches with their links and notes), so it follows the same rule with the same protections. A stretch list with no saved document is empty when the account has **no log entries and no stretch-week records**, and the default routine when it has either; decided once the list, the logs and the stretch weeks have loaded, in the same update that marks them ready, in both directions; a saved or just-edited list is never replaced; no account is written to. The empty list shows a *Build your stretch routine* prompt. Supplements and the experiment lists have no owner defaults of this kind (not checked in detail; revisit if they do).

## Alternatives considered

- **Empty `BUILTIN` for everyone.** Simplest to say, but it makes the two existing accounts lose their cards and touches every test. Lost on risk.
- **Write `BUILTIN` into the two existing accounts' program documents first.** Safe for them, but it means changing other people's data from the operator side to fix a default. Lost on privacy and on cost; the client-side rule needs no writes.
- **A neutral starter (push/pull/legs).** Needs program design and invites "why this plan"; kept as step 3's follow-up (backlog: starter programs), not a prerequisite.
- **An opt-in "try the example" button with the owner's program.** Still ships the owner's weights and exercises to everyone; lost.

## Deciding axes

1. No loss for existing users. 2. No personal data shown to others. 3. Risk to the board and log write paths. 4. Size of each change. 5. No writes to other people's data.

## Consequences

- An existing account that never logged anything and never edited its program (no log entries, no program document) counts as new and gets the blank board. Accepted: nothing of theirs is lost, and the old plan is not lost either if "Original" is still offered in step 2 before it changes meaning, so do step 2 only after the two existing accounts have been asked or checked.
- The rule depends on knowing the logs have loaded; if the logs are slow, the programs must wait for them (a short loading state), or the owner's own phone could flash a blank board. The first PR has to test that order.
- `export.ts` and the Editor treat the blank program as custom (`!== BUILTIN`); an export of a blank program is empty rows, which is fine.

## Revisit when

- Starter programs ship (backlog §"Multi-user readiness"), or the exercise catalog with stable ids is built.

## Spec amendment

None to [[build-spec]]; the work is tracked in [[backlog]] under "Phase F follow-ups".
