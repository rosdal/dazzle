---
id: tactile-organic
name: Tactile Organic
idea: Natural materials and hand-made warmth, so the page feels like paper, clay and linen you could touch.
mood: [warm, grounded, crafted, gentle, natural]
---

# Tactile Organic

## Idea

Surfaces have material: paper fibre, clay, plaster, linen. Colours come from earth and plants, shapes are softly irregular, and motion is slow and weighted like something physical. It suits food and drink producers, ceramics and craft, skincare and botanicals, hospitality, sustainable brands and slow-living products.

## Mood words

warm, grounded, crafted, gentle, natural. Not: rustic-cliché, boho, beige-default, hippie.

## Type pairings

Pick one. Scale ratio 1.333, display line height 1.0–1.05, display tracking −0.02 em.

| Display | Text | Why it works | Licence source |
| --- | --- | --- | --- |
| Fraunces (variable, SOFT 100, WONK 1, Regular 400) | Manrope (Regular 400) | A soft, slightly wonky serif with real warmth; the sans keeps reading easy | Google Fonts, OFL |
| Erode (Medium 500) | General Sans (Regular 400) | Organic serif with ink-trap warmth beside a friendly sans | Fontshare, ITF Free Font Licence |
| Boska (Medium 500) | Satoshi (Regular 400) | Calligraphic contrast for headlines, calm geometry for text | Fontshare, ITF Free Font Licence |

## Palette strategy

Earth tones with one living colour; avoid the generic beige-and-brown default by choosing a specific material.

| Role | Value | Rule |
| --- | --- | --- |
| Background | #EDE6DA (unbleached paper) or #E4E8DF (sage plaster) | Pick from the product's real material |
| Text | #2A2622 | Contrast ≥ 11:1 |
| Secondary surface | #D9CBB5 (clay) | Large blocks and image mats only |
| Living colour | #4E6B3A (olive), #C2562F (terracotta) or #2F4F5C (river) | One per site; links, CTA, small illustrations |
| Muted text | #6A6259 | Contrast ≥ 4.5:1 |

## Spacing rhythm

Relaxed and slightly irregular. Section padding 14–20 vh; images set at gentle offsets of 1 column; radii vary between 4 and 24 px only where the material would be rounded.

## Motion character

- Ease family: `power2.out` and `sine.inOut`; motion has weight, like something settling.
- Duration band: 0.8–1.2 s for reveals, 6–10 s for ambient loops.
- Stagger band: 70–120 ms.
- Elements settle into place with a 1–2 degree rotation easing to 0; images rise 20–40 px and stop softly.

## Texture

Paper fibre or plaster texture at 4–8 % on large surfaces, as a real tiled image, not a CSS noise generator. Deckled or torn edges as SVG masks on 1–2 images at most. Hand-drawn line illustrations if the user supplies them.

## Signature moments

- A product shown on a textured surface where a soft shadow and the light angle shift with scroll.
- An ingredient or material section where illustrations draw themselves as SVG strokes.
- A ceramic or object turntable rendered in 3D with a clay material, rotated by scroll.

## Recipes it favours

`image-reveal-mask`, `noise-displacement`, `model-viewer`, `smooth-scroll`, `parallax-layer` (planned in Todo 3).

## Avoid

- Beige with brown text as the default warm palette (`slop/cream-palette`).
- Blobs and organic shapes built from CSS circles (`slop/shape-assembled-illustration`).
- Bounce or elastic easing (`slop/bounce-easing`).
- Grey text on the coloured surfaces (`quality/gray-on-color`).
- Texture images over 1 MB (`craft/heavy-texture`).
