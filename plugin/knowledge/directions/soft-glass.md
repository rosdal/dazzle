---
id: soft-glass
name: Soft Glass
idea: Light passing through layered, frosted surfaces, so the interface feels like a physical, calm object.
mood: [airy, luminous, calm, tactile, optimistic]
---

# Soft Glass

## Idea

Content floats on translucent layers over a slowly moving field of colour. Depth comes from blur, refraction and soft light, not from shadows. It suits consumer apps, wellness and health products, consumer hardware, fintech that wants warmth, and AI products that should feel gentle rather than technical.

## Mood words

airy, luminous, calm, tactile, optimistic. Not: frosty-corporate, neon, futuristic, sugary.

## Type pairings

Pick one. Scale ratio 1.333, display line height 1.0, display tracking −0.025 em.

| Display | Text | Why it works | Licence source |
| --- | --- | --- | --- |
| General Sans (Medium 500) | General Sans (Regular 400) | Soft, rounded geometry that matches frosted surfaces without looking childish | Fontshare, ITF Free Font Licence |
| Manrope (Semibold 600) | Manrope (Regular 400) | Open apertures stay legible over blurred, moving backgrounds | Google Fonts, OFL |
| Outfit (Medium 500) | Hanken Grotesk (Regular 400) | Friendly geometric display with a more neutral reading face | Google Fonts, OFL |

## Palette strategy

A pale base field with two or three soft, related hues moving behind glass; text stays dark and solid.

| Role | Value | Rule |
| --- | --- | --- |
| Base field | #F3F5FA | Light and cool; the colour lives in the moving field, not the base |
| Field hues | #CFE3FF, #FFD9C7, #D8F2E4 | Low saturation (≤ 40 %), adjacent on the colour wheel, never purple-to-blue |
| Glass surface | #FFFFFF at 45–60 % with `backdrop-filter: blur(24px) saturate(140%)` | Always test text contrast on the glass over the most saturated part of the field |
| Text | #14161B | Contrast ≥ 7:1 on the glass at its worst point |
| Accent | #2B59FF | Buttons and focus only; ≤ 3 % of the viewport |

## Spacing rhythm

Rounded and roomy. Radii 20–32 px on panels (inner elements radius minus padding), padding 24–40 px inside glass, section padding 12–18 vh. One level of glass only; never glass on glass.

## Motion character

- Ease family: `power2.out` for reveals, `sine.inOut` for ambient drift.
- Duration band: 0.6–0.9 s for reveals; the background field drifts over 12–20 s loops.
- Stagger band: 50–90 ms.
- Panels rise 12–24 px while blurring in from 8 px to 0; nothing flies far.

## Texture

Blur and refraction, a 2 % noise layer on glass to avoid banding, soft specular highlight along the top edge of panels. No hard shadows, no grain on text.

## Signature moments

- A slow shader gradient field behind the hero that bends around the cursor on desktop.
- A product panel that refracts the field behind it as it scrolls past, like a lens.
- Cards that tilt 2–4 degrees toward the pointer with a moving highlight.

## Recipes it favours

`fluid-glass`, `shader-gradient`, `magnetic-button`, `smooth-scroll`, `split-reveal` (planned in Todo 3).

## Avoid

- Purple-to-blue gradient fields (`slop/ai-color-palette`).
- Coloured glow shadows around panels (`slop/dark-glow`).
- Glass inside glass (`slop/nested-cards`).
- Grey text on the coloured field (`quality/gray-on-color`).
- Text that loses contrast where the field is brightest (`quality/low-contrast`).
