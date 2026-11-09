---
name: shaders
description: Noise families, displacement, fresnel, gradients that don't look like slop, uniforms as levers, and precision. Load when writing or tuning GLSL, a shader background, image distortion or a WebGL gradient.
---

# Shaders

A good shader looks like a material or light; a slop shader looks like a screensaver. The difference is restraint in colour, motion slow enough to feel physical, and every number exposed as a lever so it can be tuned by eye.

## Principles

1. Shader in service of the direction. Pick the noise and palette from the direction's mood, not from the last demo you saw.
2. Slow and low. Physical materials move at 0.05–0.3 units per second; fast churning noise reads as cheap.
3. Every magic number is a uniform, and every uniform is a lever in `dazzle.config.ts`.
4. Colour comes from the palette tokens, passed in as uniforms; never hard-code a rainbow.
5. Cost scales with pixels: a full-screen fragment shader runs millions of times per frame.

## Defaults

| Setting | Value |
| --- | --- |
| Time speed | 0.05–0.3 per second for backgrounds; ≤ 1.0 for interaction responses |
| Noise octaves (fbm) | 3–5 high tier, 2–3 low tier |
| Displacement amount | 0.01–0.08 of UV space for images; 0.05–0.3 units for geometry |
| Fresnel power | 2–5 |
| Gradient colour stops | 2–3 from the palette, plus grain |
| Grain amount | 0.03–0.06 |
| Full-screen render scale | 1.0 high, 0.75 mid, 0.5 low (render to a smaller target and upscale) |
| Precision | `highp` for positions and time; `mediump` acceptable for colour on mobile |
| Texture lookups per fragment | ≤ 8 |

Noise families:

| Family | Looks like | Use for |
| --- | --- | --- |
| Simplex / Perlin | Smooth hills, soft flow | Gradients, slow backgrounds, liquid |
| fbm (layered simplex) | Clouds, smoke, terrain | Atmosphere, fog, organic surfaces |
| Domain-warped fbm | Marbling, ink, silk | Luxury and organic signature moments |
| Worley / cellular | Cells, caustics, stone | Water caustics, tactile and sci-fi textures |
| Value noise + grain | Film, paper | Texture overlays at low amounts |

## Do

- Declare uniforms with defaults that match the lever defaults:

```glsl
precision highp float;
uniform float uTime;
uniform float uSpeed;      // lever: 0.05–0.3
uniform float uDistortion; // lever: 0–0.1
uniform vec3 uColorA;      // token: palette.base
uniform vec3 uColorB;      // token: palette.light
varying vec2 vUv;
```

- Keep `uTime` from growing without bound: wrap it (`mod(time, 1000.0)`) to avoid precision loss after long sessions.
- Add grain and slight dithering to gradients to prevent banding on 8-bit displays.
- Use fresnel (`pow(1.0 - dot(normal, viewDir), uPower)`) for rim light on objects; it reads as craft with almost no cost.
- Drive displacement from the scroll or pointer with damping (lerp 0.05–0.15 per frame), not directly.
- Test the shader at 0.5 render scale; if it still looks right, ship that scale on mid and low tiers.
- Provide a CSS gradient or image that matches the shader's first frame as the fallback and LCP element.

## Don't

- Don't use purple-to-blue, rainbow hue cycles or neon on black unless the direction's palette is exactly that.
- Don't animate hue; animate position, scale and distortion within fixed palette colours.
- Don't loop branches or use dynamic loop counts on low tier; unroll or reduce octaves.
- Don't sample textures in a dependent chain more than twice.
- Don't put text inside the shader where an HTML layer would do.
- Don't let a background shader respond to every mouse move at full strength; damp and cap it.

## Patterns

Pattern cards arrive with the corpus (Todo 10). Planned cards for this domain: `domain-warp-gradient`, `image-hover-displacement`, `fresnel-rim-object`.

## Recipes

Recipes arrive with Todo 3. Planned recipes for this domain: `shader-gradient`, `noise-displacement`, `fluid-glass`, `grain-overlay`.

## Checks

- `slop/ai-color-palette`, `slop/radial-halo`, `slop/dark-glow`
- `cliche/small-text-over-webgl`
- `craft/uncapped-dpr`, `craft/render-when-hidden`, `craft/no-webgl-fallback`
- Budgets: `budget/fps`, `budget/no-webgl`, `budget/lever-range`
