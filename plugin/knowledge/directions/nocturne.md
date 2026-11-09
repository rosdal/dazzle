---
id: nocturne
name: Nocturne
idea: A dark, cinematic stage where light is rationed and one lit object carries the story.
mood: [cinematic, nocturnal, precise, hushed, expensive]
---

# Nocturne

## Idea

The page is a dark room and the content is lit, not placed. Near-black surfaces, a single warm or acid light colour, and slow camera-like motion make every reveal feel like a scene change. It suits hardware launches, audio and music products, films, fragrances and studios that want gravity.

## Mood words

cinematic, nocturnal, precise, hushed, expensive. Not: gothic, neon, gamer, spooky.

## Type pairings

Pick one. Scale ratio 1.5, display line height 0.9, display tracking −0.03 to −0.045 em.

| Display | Text | Why it works | Licence source |
| --- | --- | --- | --- |
| Clash Display (Medium 500) | Satoshi (Regular 400) | Tight, engineered display against a calm geometric text face | Fontshare, ITF Free Font Licence |
| Fraunces (variable, opsz 144, weight 300) | Inter Tight (Regular 400) | High-contrast serif catches light like a title card; neutral text stays out of the way | Google Fonts, OFL |
| Space Grotesk (Medium 500) | IBM Plex Sans (Regular 400) | Technical, slightly mechanical; right for instruments and hardware | Google Fonts, OFL |

## Palette strategy

Dark base, one light colour, nothing else saturated.

| Role | Value | Rule |
| --- | --- | --- |
| Background | #0B0B0C to #121214 | Never pure #000; it crushes gradients and shows banding |
| Surface | Background + 4–6 % lightness | Used for one level of elevation only |
| Text | #EDEBE6 | Contrast ≥ 12:1 on the background |
| Muted text | #9A978F | Contrast ≥ 4.5:1; never below |
| Light colour | One of #B7F25A (acid), #F2A65A (tungsten), #8FB8FF (moonlight) | ≤ 5 % of the viewport; used for the signature light, focus and one CTA |

Check every text colour against the brightest frame of any WebGL or video behind it, not against the flat background.

## Spacing rhythm

Generous and vertical. Section padding 20–30 vh on desktop, 12–16 vh on mobile; content columns narrow (6 of 12 columns) so the dark space frames them.

## Motion character

- Ease family: `expo.out` and `power3.inOut` for camera moves; no bounce, no elastic.
- Duration band: 0.9–1.6 s for reveals, 1.5–3 s for camera and light moves.
- Stagger band: 60–120 ms.
- Motion reads as light changing or a camera moving, not as elements flying in. Fades from black and slow dolly-ins over translate-ups.

## Texture

Film grain at 3–5 % opacity, animated at 8–12 fps (not every frame). A soft vignette on the hero only. No glass, no blur panels.

## Signature moments

- A product or object lit by one moving light that follows the scroll, rendered in three.js with an HDR environment dimmed to near zero.
- A pinned section where the light sweeps across a headline, revealing it letter by letter.
- A slow dolly through a dark scene that ends on the CTA.

## Recipes it favours

`split-reveal`, `pinned-scene`, `light-sweep`, `grain-overlay`, `smooth-scroll` (planned in Todo 3).

## Avoid

- Neon glows and coloured shadows around cards (`slop/dark-glow`).
- More than one light colour, or a purple-to-blue gradient (`slop/ai-color-palette`).
- Grey text on the dark surface below 4.5:1 (`quality/low-contrast`).
- Small text over the moving scene (`cliche/small-text-over-webgl`).
