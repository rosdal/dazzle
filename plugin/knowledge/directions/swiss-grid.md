---
id: swiss-grid
name: Swiss Grid
idea: Rigorous grid, objective sans and flat colour, where order itself is the beauty.
mood: [rational, clear, structured, confident, functional]
---

# Swiss Grid

## Idea

Everything sits on a visible system: a 12-column grid, a strict type scale and flat fields of colour. Hierarchy comes from size, position and weight, never from decoration. It suits design studios, architecture practices, developer tools, infrastructure companies, conferences and anything that wants to look precise and trustworthy.

## Mood words

rational, clear, structured, confident, functional. Not: cold, corporate, bland, minimal-empty.

## Type pairings

Pick one. Scale ratio 1.5 to 1.618, display line height 0.95, display tracking −0.03 em; small labels set in the text face at +0.02 em.

| Display | Text | Why it works | Licence source |
| --- | --- | --- | --- |
| Schibsted Grotesk (Bold 700) | Schibsted Grotesk (Regular 400) | A sturdy grotesque with enough weight range to build hierarchy from one family | Google Fonts, OFL |
| Switzer (Semibold 600) | Switzer (Regular 400) | Neo-grotesque in the classic tradition, crisp at every size | Fontshare, ITF Free Font Licence |
| Archivo (Expanded 700) | IBM Plex Mono (Regular 400) | Wide display against a mono for data, specs and labels | Google Fonts, OFL |

## Palette strategy

White or black field, black type, one primary colour used as a large flat area rather than as a highlight.

| Role | Value | Rule |
| --- | --- | --- |
| Background | #FFFFFF | Pure white is right here; the grid needs maximum clarity |
| Text | #000000 or #111111 | Contrast ≥ 18:1 |
| Grid and rules | #000000 at 100 %, 1–2 px | Rules are structural, never decorative |
| Primary field | #E30613 (signal red), #0047FF (blue) or #FFD400 (yellow) | Used as full blocks of colour (a whole section or column); text on it ≥ 4.5:1 |
| Muted text | #6B6B6B | Labels and metadata only; contrast ≥ 5:1 |

## Spacing rhythm

Strict modular rhythm: 8 px base, spacing tokens 8, 16, 24, 48, 96, 192. Columns 12 with 24 px gutters on desktop, 4 columns on mobile. Elements hang from shared top lines; asymmetric placement inside the grid is encouraged.

## Motion character

- Ease family: `power4.inOut` and `steps()` for mechanical moments; motion is precise and short.
- Duration band: 0.4–0.8 s.
- Stagger band: 30–50 ms, along the grid order (left to right, top to bottom).
- Movement follows grid lines: wipes along columns, blocks of colour sliding in on one axis.

## Texture

None. Flat colour, hairline rules, visible grid overlays only when they carry meaning (for example an index).

## Signature moments

- A grid that draws itself on load: column lines wipe in, then content snaps into its cells.
- A large index or numbered list where hovering a row floods it with the primary colour.
- A horizontal section where projects slide past in exact column steps.

## Recipes it favours

`split-reveal`, `horizontal-scroll`, `counter-roll`, `scroll-progress`, `page-transition` (planned in Todo 3).

## Avoid

- Decorative grid backgrounds with no structural role (`slop/codex-grid-background`).
- Numbered section labels that don't index anything (`slop/numbered-section-labels`).
- Soft shadows and hairline-border cards (`slop/gpt-thin-border-wide-shadow`).
- One gap value for every relationship (`slop/monotonous-spacing`).
- Bounce or elastic easing (`slop/bounce-easing`).
