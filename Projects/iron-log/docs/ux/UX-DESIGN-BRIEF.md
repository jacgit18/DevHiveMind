# Iron Log: UX design brief
_Last reviewed 2026-10-10. Source of truth for behaviour is [[feature-map|feature map]]; this file is the "who and why". Read before any UI change._

## Who it is for
A person following a weekly strength program (one owner today, a few early accounts), logging on a phone in the gym, often with sweaty hands, between sets, sometimes offline.

## Problem
Paper and spreadsheets lose the plan, miss stalls, and don't adapt when a day is skipped. The app keeps the week's board, logs sets fast, suggests the next weight, and warns about back-to-back repeats.

## What the user must be able to do
1. See today's workout and tick things off (one tap).
2. Log sets with the target prefilled (a few taps).
3. Move, swap or skip a day without breaking the week.
4. See progress: stalls, weight changes, muscle heatmap, goals.
5. Keep data safe: offline use, sync, export, backup.

## Principles
- **Fast on a phone:** one day at a time, 44×44 px targets, prefilled values, undo for every uncheck.
- **Never lose data:** no exercise lost or duplicated on reorder; destructive actions need a second tap.
- **Accessible (WCAG 2.2 AAA target; automated axe tests cover A and AA only, see [[DESIGN-SYSTEM|design system]]):** 7:1 text contrast in light and dark, keyboard and screen-reader complete, nothing shown by colour alone, no time limits.
- **Quiet suggestions:** the app suggests (notice with actions), the user decides.
- **Works offline, installs as a PWA.**

## Not in scope
Social features, coaching content, native apps, a second visual theme beyond light/dark. See [[ROADMAP|roadmap]].

Related: [[USERFLOW|userflow]] · [[DESIGN-SYSTEM|design system]] · [[COMPONENTS|components]] · [[SCREEN-SPECS|screen specs]]
