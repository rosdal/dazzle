---
id: playful-3d
name: Playful 3D
idea: Chunky, toy-like 3D objects in bright colour that react to you, so the site feels like something to play with.
mood: [joyful, bouncy, bright, friendly, curious]
---

# Playful 3D

## Idea

Soft, rounded 3D objects with clay or plastic materials float, tumble and respond to the cursor and to scroll. Colours are bright but controlled, type is round and friendly. It suits consumer apps, games, kids and family products, snacks and drinks, creative tools and community platforms.

## Mood words

joyful, bouncy, bright, friendly, curious. Not: childish, cluttered, cartoonish, candy-overload.

## Type pairings

Pick one. Scale ratio 1.5, display line height 0.95, display tracking −0.02 em.

| Display | Text | Why it works | Licence source |
| --- | --- | --- | --- |
| Chillax (Semibold 600) | General Sans (Regular 400) | Rounded, relaxed display that matches soft 3D forms | Fontshare, ITF Free Font Licence |
| Fredoka (Semibold 600) | Nunito (Regular 400) | Round terminals throughout; friendly without losing legibility | Google Fonts, OFL |
| Rubik Mono One (Regular 400) | Outfit (Regular 400) | Chunky, toy-block headlines for short words; plain geometric text | Google Fonts, OFL |

## Palette strategy

A light base with three saturated, distinct hues assigned to objects, not to text.

| Role | Value | Rule |
| --- | --- | --- |
| Background | #FFF8EF or #F1F4FF | Light, slightly tinted; never pure white behind 3D |
| Object colours | #FF6B4A (coral), #FFC93C (sun), #3DD6A6 (mint) | Saturation 60–80 %; one colour per object; no purple-to-blue gradients |
| Text | #1C1A2E | Contrast ≥ 12:1 |
| CTA | #1C1A2E fill with white text | Contrast ≥ 12:1; objects carry the colour, buttons stay calm |
| Muted text | #5C5970 | Contrast ≥ 5:1 |

## Spacing rhythm

Bouncy and open. Large radii (24–40 px), generous padding (32–48 px), sections of 80–100 vh so objects have room to move. Objects may overlap section edges.

## Motion character

- Ease family: `back.out(1.4)` and spring physics for objects only; `power2.out` for UI and text.
- Duration band: 0.5–0.9 s for UI; object springs settle in 0.8–1.5 s.
- Stagger band: 60–100 ms.
- Objects have mass: they lag, overshoot slightly and settle. Text never bounces.

## Texture

Soft materials: matte clay (roughness 0.6–0.8) or glossy plastic (roughness 0.2–0.3), soft contact shadows under objects, simple 3-point lighting. No grain, no glass blur.

## Signature moments

- Objects that tumble into the hero and settle into a composition, then scatter away from the cursor.
- A scroll section where an object transforms into the next one (morphing shapes or swapping colours).
- A pile of objects you can drag and throw, with physics, on desktop.

## Recipes it favours

`model-viewer`, `magnetic-button`, `pinned-scene`, `smooth-scroll`, `page-transition` (planned in Todo 3).

## Avoid

- Bounce easing on text and UI elements; it belongs to objects only (`slop/bounce-easing`).
- Illustrations built from CSS shapes instead of real 3D or drawn art (`slop/shape-assembled-illustration`).
- Pixel ratio above 2 on the 3D canvas (`craft/uncapped-dpr`).
- A render loop running while the scene is off-screen (`craft/render-when-hidden`).
- No static fallback when WebGL is unavailable (`craft/no-webgl-fallback`).
