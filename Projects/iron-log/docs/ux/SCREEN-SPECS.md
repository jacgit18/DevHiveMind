# Iron Log: screen specs
_Last reviewed 2026-10-10. Phone = ≤700px. Every screen also has a dark theme and a loading state (blank until `ready`, then content)._

## Board (`BoardTab.tsx`, `Board.tsx`)
- **Layout:** header (title, status pill, tabs); body weight row; stretches and workout sub-views; one column per day, Sunday to Saturday. **Phone:** one day at a time, swipe between days, bottom navigation.
- **Main action:** tick a card or open the log sheet.
- **Also:** rest-day checkbox, swap arrows, + Add exercise, experiments list, notices (clash, leftovers).
- **Empty/first run:** first-run prompt; no board until loaded.

## Daily (`Daily.jsx`)
Stretches (`Stretches.tsx`: weekly grid, warm-up, own experiments), Supplements (water log: size buttons, goal bar, last 7 days, hot day), Medical (placeholder only: a heading and "Nothing here yet"; layout to be decided when there is data to track). Main action: tick a stretch or add water.

## Progress (`Progress.tsx`, `Trends.tsx`, `LiftGoal.tsx`)
Headline numbers, sets per week, weight change by exercise, muscle-by-week heatmap, per-lift chart, body weight goal, lift goals. Main action: open a lift and set a goal. Phone: single column.

## Program (`Editor.tsx`, libraries)
Day-by-day editor for programs A and B, exercise/stretch/supplement libraries (search, filter), saved versions, new program sheet. Main action: edit an exercise.

## Settings (`Settings.tsx`)
Panels: account, sync status, export/upload, appearance, app install, timers, 1RMs, erase / delete my data. Grid stacks under 900px. Main action: export or sign in/out. Always available, even while loading.

## Sheets (modals)
Log sheet (one row per set, prefilled, "Same as last"), exercise, details, import review, new program, stretch/supplement, tag, help. Layout: centered ≤480px (bottom-aligned on phone), 18px padding. Main action: Save; Esc/scrim closes.

## Landing / sign-in (`Landing.tsx`, `SignInCard.tsx`)
Signed-out visitors: H1 "A weekly training board that remembers your lifts.", a lead paragraph, a primary "Sign in with Google" button (label becomes "Opening Google…" while busy), an offline notice (role=status) and an error notice (role=alert), a development-only "continue as the development user" button, legal links with "Free during the beta. For people aged 16 and over.", a screenshot (`picture`), a "What it does" list of five points, and a not-medical-advice / no-tracking statement. Loading state: "Loading…" (role=status).

Flows: [[USERFLOW|userflow]]. Parts: [[COMPONENTS|components]]. Screenshots: `images/`.
