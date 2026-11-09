---
name: interaction
description: Hover states, magnetic and cursor effects (desktop only), focus states and touch equivalents. Load when adding hover or cursor effects, buttons and links, or when an interaction feels dead, gimmicky or broken on touch.
---

# Interaction

Interaction is where a site feels responsive or dead. Good hover and focus states answer within 100 ms and match the direction's motion character; gimmicks (cursor trails, everything magnetic) cost attention and break on touch. Every pointer effect needs a touch and keyboard equivalent, or it carries no information.

## Principles

1. Feedback is immediate. A hover, press or focus responds within 100 ms; the visual change may take longer, but it starts at once.
2. Pointer effects are desktop-only. Gate cursor, magnetic and hover-reveal effects behind `@media (hover: hover) and (pointer: fine)` and their JS equivalent `matchMedia('(hover: hover) and (pointer: fine)')`.
3. Nothing is hover-only. Any information or action shown on hover is also reachable by tap and by keyboard focus.
4. Focus is designed, not removed. Every interactive element has a visible focus state at least as clear as its hover state.
5. One cursor idea per site, if any. A custom cursor must do a job (show a drag affordance, preview a project, show play), not just follow.
6. Motion character carries over. Hover eases and durations come from the direction's UI ease family, shorter than reveals.

## Defaults

| Setting | Value |
| --- | --- |
| Feedback start | ≤ 100 ms after input |
| Hover transition | 150–300 ms, `power2.out` or `cubic-bezier(0.2, 0, 0, 1)` |
| Press (active) state | 80–120 ms, scale 0.97–0.98 or a 1–2 px shift |
| Magnetic pull | 0.2–0.4 of the pointer offset, radius ≤ 1.5× the element size, return in 0.6–0.9 s with `power3.out` |
| Magnetic elements per page | ≤ 3 (primary CTAs, not every link) |
| Cursor follower lag | 0.1–0.2 lerp per frame; size 8–16 px dot or 40–80 px ring |
| Touch target size | ≥ 44 × 44 px (≥ 24 × 24 px absolute minimum) |
| Focus ring | 2–3 px solid, offset 2–4 px, contrast ≥ 3:1 against both the element and the background |
| Hover image preview | ≤ 400 px wide, appears within 150 ms, follows with 0.15 lerp |
| Link underline hover | Thickness 1–2 px, offset 0.15–0.25 em, animated by `background-size` or `scaleX` |

## Do

- Build every state: default, hover, focus-visible, active, disabled, and loading where it applies.
- Use `:focus-visible` for the focus ring, so mouse clicks don't show it but keyboard focus always does.
- Animate only `transform` and `opacity` for hover effects; keep layout stable.
- Give touch devices a designed equivalent: a tap reveals the hover content, a project list shows its preview images inline, a drag affordance shows a visible handle.
- Keep the native cursor available: a custom cursor sits on top with `pointer-events: none` and never replaces the text caret in inputs.
- Store hover durations, magnetic strength and cursor lerp as levers in `dazzle.config.ts`.
- Turn off magnetic and follower motion under `prefers-reduced-motion: reduce`; keep colour and underline feedback.
- Remove pointer listeners and cancel the cursor loop on route change and when the effect's element leaves the page.

## Don't

- Don't render a custom cursor, or hide the native one, on touch devices.
- Don't make every link and button magnetic.
- Don't use bounce or elastic easing on buttons and links.
- Don't change an element's size or position on hover in a way that moves its neighbours.
- Don't remove outlines without a replacement focus state.
- Don't hide navigation, prices or key content behind hover.
- Don't attach `mousemove` handlers that write layout every event; batch them in one `requestAnimationFrame` loop.
- Don't add cursor trails, sparkles or blend-mode cursors that invert the whole page; they cost attention and read as a template.

## Patterns

Pattern cards arrive with the corpus (Todo 10). Planned cards for this domain: `magnetic-cta`, `hover-project-preview`, `drag-affordance-cursor`.

## Recipes

Recipes arrive with Todo 3. Planned recipes for this domain: `magnetic-button`, `cursor-follower`, `image-reveal-mask`.

## Checks

- `cliche/touch-cursor`, `cliche/hover-only-content`
- `slop/bounce-easing`, `slop/blinking-cursor`, `slop/pulsing-dot`
- `craft/animate-layout-property`, `craft/will-change-left-on`
- `quality/undersized-ui-text`
- Budgets: `budget/inp`, `budget/a11y`
