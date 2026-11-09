---
name: threejs
description: three.js renderer setup, DPR cap, GPU tiers, asset formats (glTF, KTX2, Draco, Meshopt), dispose and visibility pause. Load when building or changing a 3D scene, loading a model, or when a WebGL page is slow or leaks memory.
---

# three.js

The WebGL scene is usually the signature moment, so it must be the best-made thing on the page. Most AI-built scenes fail on the basics: uncapped pixel ratio, uncompressed assets, render loops that never stop, and no fallback.

## Principles

1. One scene, one job. The 3D layer serves the signature moment; it is not a background for every section.
2. Tier first, then design. Decide what high, mid, low and no-WebGL visitors see before writing the scene.
3. Content never waits for WebGL. The page renders and reads without the canvas; the scene initialises after first paint.
4. Render only when it matters: pause when hidden, off-screen or idle.
5. Every GPU object has an owner who disposes it.

## Defaults

| Setting | Value |
| --- | --- |
| Pixel ratio | `Math.min(devicePixelRatio, 2)` high tier, 1.5 mid, 1 low |
| Antialias | On for high tier; off and use FXAA or none on mid and low |
| Draw calls per frame | ≤ 100 high, ≤ 50 mid, ≤ 25 low |
| Triangles on screen | ≤ 500 k high, ≤ 200 k mid, ≤ 80 k low |
| Model file | ≤ 2 MB per model after Draco or Meshopt compression |
| Textures | KTX2 (Basis), ≤ 2048 px high, ≤ 1024 px low; power-of-two sizes |
| Environment map | ≤ 1 k HDR or prefiltered KTX2 |
| Post-processing passes | ≤ 2 high, ≤ 1 mid, 0 low |
| Scene init | After first paint, in `requestIdleCallback` or on approach |

GPU tiers (detect with `detect-gpu` or a short benchmark, cache the result in `sessionStorage`):

| Tier | Gets |
| --- | --- |
| High | Full scene, post-processing, DPR 2 |
| Mid | Simplified materials, 1 pass, DPR 1.5 |
| Low | Static lighting, no post, DPR 1, fewer particles |
| None | The static fallback image, designed as part of the direction |

## Do

- Set up the renderer once and size it from its container:

```js
const renderer = new THREE.WebGLRenderer({ canvas, antialias: tier === "high", alpha: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr[tier]));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
new ResizeObserver(([e]) => {
  const { width, height } = e.contentRect;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}).observe(canvas.parentElement);
```

- Load models with `GLTFLoader` plus `DRACOLoader` or `MeshoptDecoder`, and textures with `KTX2Loader`; host the decoders locally.
- Pause rendering when the canvas leaves the viewport or the tab hides:

```js
// Two separate flags: switching back to the tab must not restart a canvas that is scrolled away.
let onScreen = true;
new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }).observe(canvas);
renderer.setAnimationLoop(() => {
  if (onScreen && !document.hidden) renderer.render(scene, camera);
});
```

- Dispose on teardown: traverse the scene, call `geometry.dispose()`, `material.dispose()` and each texture's `dispose()`, then `renderer.dispose()` and `renderer.setAnimationLoop(null)`.
- Expose camera positions, light intensities, colours and speeds as levers.
- Render a static fallback (`<img>` or `<picture>`) in the HTML and replace it only after the first WebGL frame renders.

## Don't

- Don't use `devicePixelRatio` uncapped, or render at DPR 3 on phones.
- Don't ship `.glb` files with uncompressed geometry or PNG and JPEG textures over 512 KB.
- Don't create geometries, materials or textures inside the render loop.
- Don't run more than one `WebGLRenderer` per page; share one canvas across sections if needed.
- Don't block the main thread with a model parse during the first viewport's reveal.
- Don't put essential text inside the canvas; text lives in HTML.

## Patterns

Pattern cards arrive with the corpus (Todo 10). Planned cards for this domain: `pinned-product-turn`, `lit-object-hero`, `particle-field`.

## Recipes

Recipes arrive with Todo 3. Planned recipes for this domain: `model-viewer`, `pinned-scene`, `light-sweep`, `fluid-glass`.

## Checks

- `craft/uncapped-dpr`, `craft/heavy-texture`, `craft/no-webgl-fallback`, `craft/render-when-hidden`, `craft/leaked-scrolltrigger`
- `cliche/small-text-over-webgl`
- Budgets: `budget/fps`, `budget/3d-assets`, `budget/initial-js`, `budget/no-webgl`, `budget/lcp`, `budget/lever-range`
