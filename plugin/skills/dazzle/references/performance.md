---
name: performance
description: Budgets from the check engine, lazy-init of WebGL, image formats and font loading. Load when adding heavy assets, WebGL or fonts, when a check reports a budget miss, or when the site feels slow.
---

# Performance

An award-level site that stutters is not award-level. Budgets are part of the design: they decide how many fonts, how big the hero image and when the 3D scene may start. The check engine measures every budget below; the targets are defaults, overridable in `dazzle.config.ts`.

## Principles

1. The first viewport is sacred. HTML, CSS, the display font and the LCP image load first; everything else waits.
2. WebGL is progressive enhancement. It starts after first paint and never delays LCP.
3. Measure on a real GPU and a throttled phone profile, not on the development machine alone.
4. Spend the budget on the signature moment. Cut elsewhere before cutting there.
5. Frame rate is a feature: a 30 fps scroll on mid-range hardware is a bug.

## Defaults

| Asset | Target |
| --- | --- |
| Hero image | AVIF, WebP fallback; ≤ 200 kB at 1440 px; `fetchpriority="high"` |
| Other images | AVIF or WebP, `loading="lazy"`, `decoding="async"`, explicit `width` and `height` |
| Responsive images | `srcset` at 640, 960, 1440, 2048 px; `sizes` set |
| Fonts | woff2 only, ≤ 4 files and ≤ 150 kB on first load, subset, `font-display: swap` |
| Video | ≤ 2 MB for loops, H.264 MP4 plus AV1 or VP9, `muted playsinline`, poster image |
| Initial JS | ≤ 250 kB gzipped, including GSAP and Lenis |
| three.js and scene code | Loaded as a separate chunk after first paint |
| 3D assets | Streamed after first paint; ≤ 5 MB total on high tier, ≤ 2 MB on low |

## Do

- Preload the LCP image and the display font in `<head>`; nothing else.
- Lazy-init WebGL when the scene's section approaches, or in `requestIdleCallback` after load:

```js
const io = new IntersectionObserver(async ([e]) => {
  if (!e.isIntersecting) return;
  io.disconnect();
  const { initScene } = await import("./scene.js");
  initScene(canvas, tier);
}, { rootMargin: "100% 0px" });
io.observe(canvas);
```

- Code-split per route; import GSAP plugins only where used.
- Reserve space for every image, video, canvas and embed with `aspect-ratio` or explicit dimensions.
- Use `content-visibility: auto` with `contain-intrinsic-size` on long below-the-fold sections.
- Debounce resize work and run it in the GSAP ticker or `requestAnimationFrame`.
- Record the measured numbers in the handover, per tier, from the check report.

## Don't

- Don't import all of three.js examples or a full GSAP bundle in the entry chunk.
- Don't load fonts, models or textures from a third-party CDN at runtime; bundle or self-host them.
- Don't use PNG for photos or GIF for animation.
- Don't run layout reads and writes in the same frame inside scroll handlers.
- Don't fake a passing frame rate; on a machine without a GPU the FPS check is skipped and reported as skipped.

## Patterns

Pattern cards arrive with the corpus (Todo 10). Planned cards for this domain: `lazy-webgl-on-approach`, `lcp-poster-swap`.

## Recipes

Recipes arrive with Todo 3. Every recipe's manifest lists its JS kB and GPU cost, so choose recipes against the budget. Planned recipes most relevant here: `model-viewer`, `smooth-scroll`, `image-reveal-mask`.

## Checks

The budget ids below are the canonical list, used by every reference's Checks section.

| Budget id | Target | Measured by |
| --- | --- | --- |
| `budget/fps` | 5th-percentile FPS ≥ 55 high tier, ≥ 45 mid, ≥ 30 low | Scripted scroll in real Chrome on a GPU; skipped without one |
| `budget/lcp` | LCP ≤ 2.5 s | Lighthouse, mobile profile, production build |
| `budget/cls` | CLS ≤ 0.1 | Lighthouse, mobile profile |
| `budget/inp` | INP ≤ 200 ms | Lighthouse, mobile profile |
| `budget/initial-js` | Initial JS ≤ 250 kB gzipped | Production bundle analysis |
| `budget/font-bytes` | ≤ 150 kB woff2 and ≤ 4 files on first load | Network trace |
| `budget/image-bytes` | LCP image ≤ 200 kB; no image over 500 kB | Network trace |
| `budget/3d-assets` | 3D assets streamed after first paint; ≤ 5 MB high, ≤ 2 MB low | Network trace |
| `budget/reduced-motion` | No scroll-jacking, no autoplay motion over 5 s, all content reachable | `prefers-reduced-motion: reduce` run |
| `budget/no-webgl` | Static fallback renders; layout intact | WebGL disabled run |
| `budget/a11y` | No serious or critical axe issues; focus always visible | axe-core plus keyboard tab-through |
| `budget/lever-range` | Lever values inside their `seen` ranges (warning only) | Lever values against recipe manifests |

Rule ids: `craft/heavy-texture`, `craft/uncapped-dpr`, `craft/render-when-hidden`, `craft/font-swap-shift`, `quality/broken-image`, `quality/script-error`, `cliche/long-loader`.
