---
id: brutalist
name: Brutalist
idea: Raw structure on show, with heavy type, hard edges and default-looking elements used on purpose.
mood: [raw, blunt, loud, honest, unpolished]
---

# Brutalist

## Idea

The page refuses polish. Borders are thick, type is huge and heavy, colours clash on purpose, and the structure of HTML is left visible. Done well it reads as confident and honest; done lazily it reads as broken, so every rough choice must be deliberate. It suits independent labels, zines, art collectives, fashion with an edge, event lineups and developer-culture brands.

## Mood words

raw, blunt, loud, honest, unpolished. Not: broken, messy, retro-web, ironic for its own sake.

## Type pairings

Pick one. Scale ratio 2.0 or a free display size, display line height 0.85, display tracking −0.04 em; mono text at 0 em.

| Display | Text | Why it works | Licence source |
| --- | --- | --- | --- |
| Anton (Regular 400) | Space Mono (Regular 400) | Compressed, poster-weight headlines against a typewriter-like mono | Google Fonts, OFL |
| Tanker (Regular 400) | JetBrains Mono (Regular 400) | Heavy stencil-like display with a utilitarian mono for everything else | Fontshare (Tanker), ITF Free Font Licence; Google Fonts (JetBrains Mono), OFL |
| Archivo (Black 900, condensed width) | Archivo (Regular 400) | One family pushed to its extremes: black condensed headlines, plain text | Google Fonts, OFL |

## Palette strategy

Two or three flat colours at full strength, with hard borders and no gradients.

| Role | Value | Rule |
| --- | --- | --- |
| Background | #FFFFFF or #E8E8E8 | Flat; sections may switch to a full accent field |
| Text and borders | #000000 | Borders 2–4 px, solid |
| Accent A | #FF3D00 (orange) or #00FF66 (green) | Full fields and hover states; black text on it ≥ 7:1 |
| Accent B | #2400FF (blue) | Optional second clash colour; white text on it ≥ 7:1 |
| Muted | none | Brutalism doesn't do grey text; use size and weight for hierarchy |

## Spacing rhythm

Tight and blocky. Elements butt against each other inside bordered boxes; gaps of 0, 4 or 32 px and nothing in between. Sections are separated by full-width rules, not by whitespace.

## Motion character

- Ease family: `none` (linear) and `steps(4–8)`; motion is abrupt and mechanical.
- Duration band: 0.15–0.4 s; nothing lingers.
- Stagger band: 0–30 ms, or none at all.
- Hover states snap: instant colour inversions, hard offsets of 4–8 px, no fades.

## Texture

Visible structure instead of texture: borders, table cells, raw link underlines, a monospaced status bar. Optional halftone or photocopy treatment on images, applied consistently.

## Signature moments

- A full-viewport word in the display face that inverts colour block by block as you scroll.
- A lineup or catalogue as a giant bordered table whose rows snap open on click.
- A cursor-sized box that follows the pointer and inverts whatever it covers, on desktop only.

## Recipes it favours

`marquee-strip`, `split-reveal`, `cursor-follower`, `horizontal-scroll`, `counter-roll` (planned in Todo 3).

## Avoid

- More than one marquee on the page (`cliche/multiple-marquees`).
- Tracking so tight the heavy letters collide (`slop/extreme-negative-tracking`).
- Content that only appears on hover (`cliche/hover-only-content`).
- Custom cursors on touch devices (`cliche/touch-cursor`).
- Running text in capitals (`quality/all-caps-body`).
