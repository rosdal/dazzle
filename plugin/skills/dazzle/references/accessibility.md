---
name: accessibility
description: Reduced motion as a designed version, scroll control without traps, readable text over motion, keyboard and screen-reader basics for motion-heavy sites. Load for every build at layer 2 and before handover, and whenever a request mentions accessibility, reduced motion, keyboard or contrast.
---

# Accessibility

Motion-heavy sites fail accessibility in predictable places: scroll they hijack, content that only exists after an animation, text over moving scenes, and a reduced-motion mode that is just a broken page. Treat the reduced-motion version as a second design of the same story, and keep every part of the site reachable by keyboard.

## Principles

1. Reduced motion is designed, not disabled. Under `prefers-reduced-motion: reduce`, the story still reads in order with intentional static frames, crossfades and instant states.
2. The user owns the scroll. Smooth scroll may ease the scroll, but never block it, trap it or change its direction against the input. Keyboard, anchor links and the scrollbar always work.
3. Content exists before motion. Everything is in the DOM, visible and readable with JavaScript off and before any reveal runs.
4. Text stays readable at every frame. Contrast, size and stillness of text are checked over the moving content behind it.
5. Keyboard reaches everything a pointer can, in a logical order, with a visible focus state.
6. Semantics first. Use real headings, landmarks, buttons and links; ARIA only fills gaps.

## Defaults

| Setting | Value |
| --- | --- |
| Reduced-motion check | `prefers-reduced-motion: reduce` in CSS and `matchMedia` in JS, read once and on change |
| Reduced-motion transitions | Opacity crossfades ≤ 200 ms; no translate, scale, parallax or scrubbed timelines |
| Autoplay motion | Stops or can be paused within 5 s; a visible pause control for anything longer |
| Flashing | Never more than 3 flashes per second |
| Pinned section length | ≤ 300 vh; reachable past with keyboard (Page Down, Space, Tab) |
| Text over motion | ≥ 14 px, contrast ≥ 4.5:1 at the brightest frame, text itself not moving while being read |
| Focus ring | 2–3 px, contrast ≥ 3:1, never removed |
| Touch targets | ≥ 44 × 44 px |
| Heading levels | One `h1`, no skipped levels |
| axe-core result | 0 serious or critical issues |
| Smooth scroll under reduced motion | Off (native scroll) |

## Do

- Write the reduced-motion version of each section in `STORY.md` next to the full version: "Pinned product turn → three static frames side by side."
- Wrap every GSAP and ScrollTrigger setup in `gsap.matchMedia()` with a `(prefers-reduced-motion: reduce)` branch that sets final states.
- Destroy Lenis (or never start it) under reduced motion, and keep `scroll-behavior: auto`.
- Keep anchor links and in-page navigation working with smooth scroll: route them through the scroll library's `scrollTo` so positions stay correct.
- Show a static, intentional poster frame when WebGL is off or motion is reduced.
- Add a skip link to the main content and label landmarks (`header`, `nav`, `main`, `footer`).
- Give canvases and decorative scenes `aria-hidden="true"` and describe meaningful 3D content in nearby text.
- Test the full page with only the keyboard and with reduced motion on before handover.
- Set `lang` on `html`, give images meaningful `alt` text (empty `alt=""` for decorative ones), and keep link text meaningful out of context.

## Don't

- Don't capture wheel or touch events to replace native scrolling with a fixed-step slideshow.
- Don't pin a section so long that keyboard users can't tell they are still moving.
- Don't start content at `opacity: 0` in CSS and rely on JavaScript to reveal it.
- Don't set body text over video or WebGL without a scrim, and don't animate text while it must be read.
- Don't auto-play audio, or video with sound.
- Don't use `outline: none` without a replacement focus style.
- Don't treat `aria-hidden` or `display: none` as a fix for content that is hard to make accessible.

## Patterns

Pattern cards arrive with the corpus (Todo 10). Planned cards for this domain: `reduced-motion-storyboard`, `poster-frame-fallback`, `escapable-pin`.

## Recipes

Recipes arrive with Todo 3. Every recipe ships a reduced-motion behaviour in its manifest; check it for `smooth-scroll`, `pinned-scene` and `horizontal-scroll` first, since they affect scrolling.

## Checks

- `cliche/scroll-jack-trap`, `cliche/small-text-over-webgl`, `cliche/hover-only-content`, `cliche/autoplay-sound`
- `quality/content-hidden-at-rest`, `quality/low-contrast`, `quality/skipped-heading`, `quality/tiny-text`
- `craft/no-webgl-fallback`
- Budgets: `budget/reduced-motion`, `budget/a11y`, `budget/no-webgl`
