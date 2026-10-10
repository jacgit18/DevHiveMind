# Iron Log: design system
_Last reviewed 2026-10-10. Values come from `src/styles.css`; if they differ, the CSS wins and this file is stale. One stylesheet, CSS custom properties, no UI framework._

## Colour tokens (light; dark follows `prefers-color-scheme` and `[data-theme]`)
| Token | Light | Use |
|---|---|---|
| `--bg` / `--surface` / `--sunk` | #EEF0EC / #FFFFFF / #E3E6E1 | page / cards, sheets / wells, tab strip |
| `--ink` / `--muted` / `--line` | #1A1E1C / #454C48 / #D2D7D1 | text / secondary text / borders |
| `--accent` / `--accent-ink` | #1B5250 / #FFFFFF | primary actions, selected state, focus ring |
| `--field-line` | #808E7E | input borders (non-text contrast) |
| `--warn-bg` / `--warn-ink` | #FFF4D6 / #6B4E00 | notices |
| `--up` / `--down` | #008A7E / #C4561F | gain / loss |
| Phase pairs | `--str` #882B1E, `--hyp` #244B8B, `--iso` #5F4600, `--exp` #215837, `--none` #454C48 (each with `-bg`) | Strength, Hypertrophy, Isometric, Explosive, none. Always paired with a text label. |
| Heatmap | `--m0`…`--m4` | muscle volume scale |
Dark values are in the same file (e.g. bg #121614, accent #78BFBA). Text pairs checked by calculation 2026-10-10 all reach 7:1 or more (lowest: muted on sunk 7.0, red on its tint 7.05); input borders (`--field-line`) are 3:1 as non-text contrast.

## Type
- Body: Barlow, 15px, line-height 1.5, tabular numbers. Headings and big numbers: Barlow Condensed (`h1-h3`, `.cond`, timer 40px/700).
- Size-matched fallback fonts are defined to avoid layout shift; keep them when changing fonts.
- Inputs 16px (stops iOS zoom).

## Spacing, shape, elevation
Page padding 16px; gaps 4/6/8/10/12px; radius 8px (buttons, fields), 10px (cards), 14px (sheets), 999px (chips, pills); shadow `0 1px 2px rgba(20,30,25,.08)` (none in dark).

## Interaction rules
- Minimum target 44×44 px for buttons, tabs, chips, inputs.
- Focus: `:focus-visible` 2px accent outline, 2px offset.
- Motion: transitions off under `prefers-reduced-motion`.
- State is never colour alone (done = strikethrough, skipped = dashed border, stalled = tag).
- Breakpoints: ≤700px phone layout (one day at a time, bottom nav), ≤900px stacks the muscle and settings grids.

Components: [[COMPONENTS|components]]. `e2e/a11y.spec.js` runs axe with tags wcag2a, wcag2aa, wcag21a, wcag21aa only. It does **not** test the AAA 7:1 contrast or the 44 px target size, so those two rules are held by the CSS and by hand; the test would need the `color-contrast-enhanced` rule to enforce 7:1.
