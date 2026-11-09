---
name: layout
description: "Composition for expressive sites: editorial grids, asymmetry, full-bleed versus contained sections, section rhythm and one focal point per viewport. Load when planning the story's sections, building layer 1, or when a page looks centred, boxed or monotonous."
---

# Layout

Award-level layouts read as composed, not stacked. They use a strict grid and then break it on purpose, vary the width and density of sections, and give each viewport one place for the eye to land. Generic sites centre everything in one container at one rhythm.

## Principles

1. Grid first, then tension. Set a 12-column grid, place most content on it, and break it deliberately at one or two points per page (an image bleeding off the edge, a headline crossing columns).
2. Asymmetry by default. Offset columns (for example 5 + 7, or start at column 3) read as designed; centred blocks read as a template. Centre only for a single statement or the CTA.
3. Vary the container. Alternate full-bleed, wide and narrow sections so the page has a pulse. Never three sections in a row at the same width and density.
4. One focal point per viewport. At any scroll position there is one element that is clearly first: largest, highest contrast or moving. Everything else supports it.
5. Space carries meaning. Use smaller gaps inside a group and larger gaps between groups, so proximity explains structure.
6. Design the mobile composition, not a collapsed desktop. Re-place the focal point at 390 px; don't just stack the columns.

## Defaults

| Setting | Value |
| --- | --- |
| Grid | 12 columns desktop, 8 tablet, 4 mobile |
| Gutter | 16–24 px mobile, 24–32 px desktop |
| Page margin | `clamp(1rem, 4vw, 4rem)`; never under 16 px |
| Max content width | 1440–1600 px for full layouts; text columns by measure (≤ 66ch) |
| Spacing scale | 4 px base; steps 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192 |
| Section padding | 12–20 vh desktop, 8–14 vh mobile; signature section may take 100–300 vh when pinned |
| Gap ratio, between groups to within | ≥ 2:1 |
| Widths per page | ≥ 3 distinct section widths (full-bleed, wide, narrow) |
| Same-width sections in a row | ≤ 2 |
| Focal points per viewport | 1 |
| Grid breaks per page | 1–3 |
| Image ratios | Pick 2–3 (for example 3:2, 4:5, 21:9) and reuse them |
| Hero on mobile | Headline plus one line of support visible at 390 × 844 without scrolling |

## Do

- Write the grid and spacing scale as tokens in `dazzle.config.ts` and use only those values.
- Sketch each section in `STORY.md` as a one-line composition: "Full-bleed image, headline bottom-left on columns 1–7, caption right on 10–12."
- Use CSS Grid with named lines or explicit column spans for editorial placement; use `subgrid` to align nested content to the page grid.
- Let one element per page break the grid: bleed an image to the viewport edge, overlap a headline onto an image by 1–2 lines, or hang a numeral in the margin.
- Pair dense sections with quiet ones; follow a strong section with at least one calm section.
- Check every section at 390, 834 and 1440 px and confirm the focal point survives each width.
- Reserve space for media (`aspect-ratio` or width and height attributes) so nothing shifts on load.

## Don't

- Don't put every section in one centred `max-width` container.
- Don't use a three-card row as the default answer to "features" or "services"; find a composition that fits the content.
- Don't nest cards, or box content that has no reason to be boxed.
- Don't use one gap value for every relationship in a section.
- Don't let body text touch the viewport edge on mobile, or let a column stretch the first viewport.
- Don't break the grid in more than three places; past that it reads as broken, not designed.
- Don't place two competing focal points in one viewport (a moving scene next to a large headline that also animates).

## Patterns

Pattern cards arrive with the corpus (Todo 10). Planned cards for this domain: `offset-editorial-grid`, `bleed-image-break`, `pinned-horizontal-gallery`.

## Recipes

Recipes arrive with Todo 3. Planned recipes that shape layout: `horizontal-scroll`, `pinned-scene`, `image-reveal-mask`, `parallax-layer`.

## Checks

- `slop/monotonous-spacing`, `slop/nested-cards`, `slop/icon-tile-stack`, `slop/oversized-h1`
- `quality/cramped-padding`, `quality/body-text-viewport-edge`, `quality/text-overflow`, `quality/text-occlusion`, `quality/heading-rhythm`
- Budgets: `budget/cls`
- The critic scores composition: deliberate grid use and tension, whitespace that frames, one focal point per viewport.
