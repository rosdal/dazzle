---
id: luxury-minimal
name: Luxury Minimal
idea: Extreme restraint and space, where the few things on the page feel rare and precisely placed.
mood: [refined, restrained, rare, poised, silent]
---

# Luxury Minimal

## Idea

Almost nothing is on the page, and everything that is has been placed with care. Thin, high-contrast type, vast whitespace, one product image at a time and motion so slow it is almost felt rather than seen. It suits jewellery and watches, fashion houses, fragrance, hotels and residences, premium automotive and high-end services.

## Mood words

refined, restrained, rare, poised, silent. Not: empty, cold, sterile, generic-minimal.

## Type pairings

Pick one. Scale ratio 1.25 to 1.333 (luxury whispers), display line height 1.1, display tracking 0 to +0.01 em; uppercase labels at +0.15 to +0.25 em.

| Display | Text | Why it works | Licence source |
| --- | --- | --- | --- |
| Bodoni Moda (Regular 400, opsz 96) | Hanken Grotesk (Light 300 for 18 px and up, Regular 400 below) | Didone contrast is the classic signal of luxury; the sans stays light and quiet | Google Fonts, OFL |
| Cormorant (Light 300) | Switzer (Regular 400) | Elegant, narrow serif for short titles; neutral sans for details | Google Fonts (Cormorant), OFL; Fontshare (Switzer), ITF Free Font Licence |
| Zodiak (Light 300) | Supreme (Regular 400) | Sharp contemporary serif with a precise sans for small uppercase labels | Fontshare, ITF Free Font Licence |

## Palette strategy

Near-monochrome with a material accent, used in tiny amounts.

| Role | Value | Rule |
| --- | --- | --- |
| Background | #FAFAF8 or #0F0F0F | One per site; product photography decides |
| Text | #121212 or #F2F0EC | Contrast ≥ 15:1 |
| Muted text | #6F6C66 | Contrast ≥ 4.5:1; used for labels only |
| Material accent | #B08D57 (brass) or #7A1E2C (oxblood) | ≤ 1 % of the viewport: a rule, a single word, the active state |
| Lines | Text colour at 12 % | 0.5–1 px hairlines |

## Spacing rhythm

Vast. Section padding 25–40 vh, content columns of 4–5 of 12, one focal element per viewport. Small type sits far from big images; nothing is crowded, and nothing is centred by default.

## Motion character

- Ease family: `power2.inOut` and `sine.inOut` only.
- Duration band: 1.2–2.0 s for reveals, 0.4–0.6 s for hovers.
- Stagger band: 120–200 ms.
- Motion is opacity and slow 2–4 % scale; no translations over 24 px, no character splits.

## Texture

None, or very fine grain on photographs. Hairline rules, real small caps, generous letter-spaced labels.

## Signature moments

- One product image that slowly reveals through a vertical mask as the headline fades in beside it.
- A collection where scrolling advances one piece at a time, each centred in silence with a single line of text.
- A quiet hover that brings a material close-up into view under the cursor, on desktop.

## Recipes it favours

`image-reveal-mask`, `smooth-scroll`, `view-transition`, `pinned-scene`, `grain-overlay` (planned in Todo 3).

## Avoid

- Marquees of any kind (`slop/marquee`).
- Uppercase labels over every heading (`slop/kicker-above-heading`).
- Thin text below 16 px or below 4.5:1 contrast (`quality/tiny-text`, `quality/low-contrast`).
- Hero headlines in italic serif as the only idea (`slop/italic-serif-display`).
- Loaders that make the first view wait (`cliche/long-loader`).
