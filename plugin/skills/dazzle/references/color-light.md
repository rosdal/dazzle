---
name: color-light
description: Palette roles, dark-theme contrast, glow, grain and gradients that don't read as AI output, and how to check contrast against moving backgrounds. Load when choosing or changing a palette, lighting a scene, or when colours look generic or text is hard to read.
---

# Colour and light

Treat colour as lighting, not decoration. A strong site has few colours with clear jobs, and its mood comes from value (light and dark) more than from hue. Generic sites spread many saturated colours evenly and add glows to compensate.

## Principles

1. Assign roles, not swatches. Every colour has one job: background, surface, text, muted text, accent, line. A colour without a role is removed.
2. Value before hue. Get the light-to-dark structure right in greyscale first; hue comes second. If the page doesn't work in greyscale, colour won't save it.
3. One accent, used sparingly. The accent marks the signature light, focus and one primary action. Its rarity is what makes it visible.
4. Light has a source. Glows, gradients and highlights come from somewhere in the scene (a lit object, a window, a screen). Light without a source is decoration.
5. Check contrast where the text actually sits: over the brightest frame of any video or WebGL behind it, not over the flat background colour.

## Defaults

| Setting | Value |
| --- | --- |
| Roles | background, surface, text, muted text, accent, line (6 max; a 7th needs a reason in `DIRECTION.md`) |
| Accent coverage | ≤ 5 % of any viewport |
| Body text contrast | ≥ 4.5:1 (aim for ≥ 7:1) |
| Large text (≥ 24 px, or ≥ 19 px bold) | ≥ 3:1 |
| UI components and focus rings | ≥ 3:1 against adjacent colours |
| Dark background | Lightness 4–9 % (#0B0B0C to #17171A); never pure #000 behind gradients |
| Dark-theme text | Off-white, lightness 88–94 %; not pure #FFF on near-black for long text |
| Light background | Lightness 94–99 %; avoid the default cream #F5F0E8 unless the direction is warm on purpose |
| Surface elevation step (dark) | +3 to +6 % lightness per level, ≤ 2 levels |
| Grain opacity | 2–6 %, animated at 8–12 fps or static |
| Glow (if the direction allows) | One source per viewport, blur 40–120 px, opacity ≤ 35 % |
| Gradient | 2–3 stops, adjacent hues (≤ 60° apart) or one hue across lightness; add dither or grain to stop banding |

## Do

- Define colours in OKLCH in `dazzle.config.ts` tokens, so lightness steps are even and contrast is predictable.
- Build the palette in this order: background, text, muted text, accent, then surface and line from the background.
- Test every text and background pair with a contrast calculator, and list the ratios in `DIRECTION.md`.
- Over WebGL or video, sample the brightest frame of the region behind the text; if contrast fails, add a scrim (a gradient from the background at 40–70 % opacity) or move the text.
- Use grain to remove banding and add tactility: one full-viewport overlay with `pointer-events: none`, not per-element filters.
- Make light motivated: a key light in the 3D scene, a gradient that reads as a window, a highlight that follows the cursor on one element.
- Provide a static, intentional colour state for reduced motion and no-WebGL (for example the gradient's first frame).
- Check the palette in greyscale (a `filter: grayscale(1)` screenshot) at each layer gate; the focal point must still lead.

## Don't

- Don't use purple-to-blue gradients, indigo on near-black, or teal plus violet as a palette.
- Don't put grey text on a coloured background; use a tint of the background's hue at the right lightness instead.
- Don't add glows or coloured shadows to cards and buttons to make them "pop".
- Don't put a radial halo behind the headline or the product.
- Don't use gradient-filled headline text unless the direction names it as its language.
- Don't let text sit on a moving scene below 4.5:1 at any frame.
- Don't rely on colour alone to carry meaning (state, errors, links in text).
- Don't stack grain, blur and a gradient on the same surface; one treatment per surface.

## Patterns

Pattern cards arrive with the corpus (Todo 10). Planned cards for this domain: `single-accent-light`, `grain-over-gradient`, `scrim-over-scene`.

## Recipes

Recipes arrive with Todo 3. Planned recipes for this domain: `grain-overlay`, `shader-gradient`, `light-sweep`.

## Checks

- `slop/ai-color-palette`, `slop/cream-palette`, `slop/dark-glow`, `slop/radial-halo`, `slop/gradient-text`, `slop/gpt-thin-border-wide-shadow`, `slop/repeating-stripes-gradient`
- `quality/low-contrast`, `quality/gray-on-color`
- `cliche/small-text-over-webgl`
- Budgets: `budget/a11y`, `budget/no-webgl`
