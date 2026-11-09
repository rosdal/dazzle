---
name: typography
description: Type for expressive sites — display versus text roles, scale ratios, fluid clamp() sizing, tracking by size, line length and licence-safe font sources. Load when choosing fonts, setting a type scale, or when type looks flat or generic.
---

# Typography

On an award-level site the type is the art direction more often than the imagery is. The display face carries the mood; the text face carries the reading. Most generic sites fail by using one competent sans for both at a timid scale.

## Principles

1. Split the roles. Pick a display face for headlines and moments, and a text face for everything read in paragraphs. They may be one family only when its widths or optical sizes differ enough to act as two.
2. Make the jump obvious. The display size should be at least 2.5× the body size on mobile and 4× on desktop. Hierarchy that needs a second look is not hierarchy.
3. Set by size, not by habit. Tracking, line height and weight all change with size: tight and dense at display sizes, open and even at text sizes.
4. Let the measure decide the column. Size the text column from the line length, not from the grid.
5. Load before you move. No text animation starts until its font has loaded; a reflow mid-reveal is a craft error.

## Defaults

| Setting | Value |
| --- | --- |
| Body size | 17–20 px desktop, 16–18 px mobile |
| Body line height | 1.45–1.6 (lower end for larger sizes) |
| Body measure | 60–70 characters (`max-width: 66ch`) |
| Scale ratio, editorial and luxury | 1.333 (perfect fourth) to 1.5 |
| Scale ratio, kinetic and brutalist | 1.618 to 2.0, or a free display size outside the scale |
| Display size, hero | `clamp(3rem, 8vw + 1rem, 11rem)` as a starting point |
| Display line height | 0.85–1.0 for sizes over 80 px; 1.05–1.15 for 40–80 px |
| Display tracking | −0.02 em at 40 px, −0.03 to −0.04 em at 80 px, −0.04 to −0.05 em over 120 px; never below −0.06 em |
| Uppercase tracking | +0.04 to +0.12 em, more at smaller sizes |
| Small text (12–14 px) tracking | +0.01 to +0.03 em |
| Weights per page | ≤ 4 across both families |
| Font files on first load | ≤ 4, ≤ 150 kB woff2 total, subset to used scripts |
| Headline lines on mobile | ≤ 4 for the hero |

Fluid sizes use `clamp(min, preferred, max)` with the preferred value in `vw` plus a `rem` term, so text still scales with browser zoom. Check every clamp at 390, 834 and 1440 px.

## Do

- Write the scale as tokens in `dazzle.config.ts` (`--text-xs` … `--display-xl`) and use only tokens in components.
- Use `text-wrap: balance` on headlines and `text-wrap: pretty` on paragraphs.
- Use optical sizes (`font-optical-sizing: auto`) or the display cut of a family at large sizes when it exists.
- Use tabular numerals (`font-variant-numeric: tabular-nums`) for any number that changes or aligns: counters, prices, data.
- Preload the display font and the regular text weight; load the rest with `font-display: swap`.
- Pick fonts from licence-safe sources only: Google Fonts, Fontshare (ITF Free Font Licence), fonts with an OFL licence from a foundry's own site, or files the user supplies. Record the source and licence in `.dazzle/DIRECTION.md`.
- Set one typographic moment per page that breaks the scale on purpose (a 30 vw word, a vertical line, a single huge numeral) and keep the rest disciplined.

## Don't

- Don't use Inter, Roboto, Open Sans, Poppins, Montserrat or the system stack as the display face unless the direction asks for neutrality on purpose and says so.
- Don't fake italics or bold; load the real style or don't use it.
- Don't set body text in a display face, in all caps, in a light weight under 400, or under 16 px.
- Don't track display type so tight that letters touch, or track body text wider than +0.05 em.
- Don't let a headline end on one short word; rebalance or rewrite.
- Don't use more than two families. A third face is almost always a sign that the first two weren't chosen well.
- Don't use commercial fonts the user hasn't licensed, and don't load fonts from a site you're studying.

## Patterns

Pattern cards arrive with the corpus (Todo 10). Planned cards for this domain: `kinetic-headline-reveal`, `oversized-word-wall`, `variable-weight-scroll`.

## Recipes

Recipes arrive with Todo 3. Planned recipes for this domain: `split-reveal` (line, word or character reveal with levers for duration, ease, stagger and distance) and `variable-font-scroll`.

## Checks

- `slop/overused-font`, `slop/flat-type-hierarchy`, `slop/extreme-negative-tracking`, `slop/italic-serif-display`, `slop/oversized-h1`
- `quality/tiny-text`, `quality/undersized-ui-text`, `quality/line-length`, `quality/tight-leading`, `quality/all-caps-body`, `quality/wide-tracking`, `quality/justified-text`, `quality/straggler`, `quality/heading-rhythm`
- `craft/font-swap-shift`
- Budgets: `budget/font-bytes`, `budget/cls`
