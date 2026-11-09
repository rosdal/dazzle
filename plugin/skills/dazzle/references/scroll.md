---
name: scroll
description: Lenis plus ScrollTrigger setup, pinning, scrub versus toggle, scroll length per section and mobile behaviour. Load when adding smooth scroll, scroll-driven animation, pinned sections, parallax or horizontal scroll.
---

# Scroll

Scroll is the timeline of an award-level site: the visitor controls the playhead. Smooth scroll and scroll-driven animation make the story feel directed; done badly they trap the visitor and break the browser's own scrolling.

## Principles

1. The visitor always owns the scroll. Never take control away; smooth it, don't hijack it.
2. Scroll length is a pacing decision. A pinned section that takes 400 % of the viewport to finish must earn every screen of it.
3. Scrub what is spatial, toggle what is an event. A camera move follows the scroll; a headline reveal plays once.
4. One scroll engine. Lenis drives ScrollTrigger through one ticker; never run two smoothers.
5. Mobile is a different medium: native touch scroll, fewer pins, shorter sections.

## Defaults

| Setting | Value |
| --- | --- |
| Lenis `lerp` | 0.08–0.12 (0.1 default); lower feels heavier |
| Lenis `wheelMultiplier` | 1 |
| Lenis on touch | Off (`syncTouch: false`); native touch scroll |
| Scrub smoothing | `scrub: 0.5` to `scrub: 1` (seconds of catch-up); `true` for direct |
| Toggle reveal trigger | `start: "top 80%"`, plays once |
| Pinned section length, desktop | 100–300 % of viewport height; 400 % only for the signature moment |
| Pinned section length, mobile | ≤ 150 %, or unpinned |
| Pinned sections per page | ≤ 2 |
| Horizontal scroll sections per page | ≤ 1 |
| Parallax speed difference | 5–20 % of scroll speed; ≤ 2 layers per viewport |

## Do

- Wire Lenis into GSAP's ticker so both share one frame:

```js
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({ lerp: levers.scroll.lerp, syncTouch: false });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

- Skip Lenis entirely under `prefers-reduced-motion: reduce`; ScrollTrigger still works on native scroll.
- Use `pin: true` with `anticipatePin: 1` and give pinned content a fixed height so nothing reflows.
- Call `ScrollTrigger.refresh()` after fonts, images and the WebGL canvas have sized; never during an animation.
- Kill every trigger on route change: `ScrollTrigger.getAll().forEach((t) => t.kill())`, or revert the component's `gsap.context()`.
- Keep anchor links, the keyboard (Space, Page Down, arrow keys) and `scrollIntoView` working: test each past every pinned section.
- Use `ScrollTrigger.matchMedia` or `gsap.matchMedia()` to unpin or shorten sections under 768 px.
- Write `STORY.md` keyframes as scroll positions (for example "keyframe 3: 45 % through section Product") so checks can capture them.
- Use `ScrollTrigger.normalizeScroll(false)` (the default) on mobile; address-bar resizes are handled by `ignoreMobileResize: true` in `ScrollTrigger.config`.
- Give every pinned or scrubbed section a visible progress cue (a counter, a bar, a changing label) so the visitor knows it ends.

## Don't

- Don't scroll-jack: no snapping that ignores intent, no locking scroll until an animation ends.
- Don't pin more than two sections, or pin back to back.
- Don't parallax every section or more than two layers in a viewport.
- Don't run scroll listeners outside the ticker; no `window.addEventListener("scroll", …)` that animates.
- Don't make a horizontal scroll section the only path to content; its items stay reachable by keyboard.
- Don't scrub text reveals; text that only appears at a scroll position is unreadable when the visitor stops.

## Patterns

Pattern cards arrive with the corpus (Todo 10). Planned cards for this domain: `pinned-product-turn`, `horizontal-gallery`, `scrubbed-camera-path`.

## Recipes

Recipes arrive with Todo 3. Planned recipes for this domain: `smooth-scroll`, `pinned-scene`, `horizontal-scroll`, `parallax-layer`, `scroll-progress`.

## Checks

- `cliche/scroll-jack-trap`, `cliche/parallax-everywhere`
- `craft/leaked-scrolltrigger`, `craft/animate-layout-property`
- `quality/content-hidden-at-rest`
- Budgets: `budget/fps`, `budget/reduced-motion`, `budget/cls`, `budget/lever-range`
