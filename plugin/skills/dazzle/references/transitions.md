---
name: transitions
description: Page and route transitions with the View Transitions API, route-change choreography, and loaders with their 3-second limit. Load when adding page transitions, shared-element morphs, a preloader, or when navigation feels abrupt.
---

# Transitions

A transition connects two pages so the site feels like one place. On award-level sites the best transitions are short and carry one element across; the worst are long curtains that make every click cost two seconds.

## Principles

1. A transition is a bridge, not a show. It should be shorter than the attention it costs.
2. Carry something across. A shared element (title, image, product) morphing between pages beats a full-screen wipe.
3. The browser does it first. Use the View Transitions API where it exists; fall back to an instant navigation, never to a broken one.
4. A loader is a promise with a deadline: under 3 seconds, with progress after 1 second.
5. Clean up the old page completely before the new one animates in.

## Defaults

| Setting | Value |
| --- | --- |
| Route transition total | 400–900 ms |
| Exit phase | 200–350 ms |
| Enter phase | 300–600 ms |
| Shared-element morph | 400–700 ms, `power3.inOut` |
| Full-screen wipe | ≤ 800 ms total, signature directions only |
| Loader visible | ≤ 3 s; show progress after 1 s; skip on repeat visits within the session |
| Loader minimum display | 0 ms (never hold a loader to show off its animation) |

## Do

- Use same-document View Transitions in SPAs and cross-document ones in multi-page sites:

```js
// SPA route change
if (document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.startViewTransition(() => router.navigate(url));
} else {
  router.navigate(url);
}
```

```css
/* Multi-page: opt in on both pages */
@view-transition { navigation: auto; }
.case-title { view-transition-name: case-title; }
::view-transition-group(case-title) { animation-duration: 0.5s; }
```

- Give each shared element a unique `view-transition-name` on both pages; names must be unique per page.
- In GSAP-driven transitions, run the exit, swap content, reset scroll to the top, run `ScrollTrigger.refresh()`, then run the enter.
- Revert the old page's `gsap.context()`, dispose its WebGL objects and kill its triggers before the enter starts.
- Move focus to the new page's `h1` or main landmark after navigation, and update `document.title`.
- Make the loader a real progress indicator tied to font, model and texture loading, and let content appear as soon as the first viewport is ready.

## Don't

- Don't show a loader for a page that can render its first viewport in under 1 s.
- Don't block interaction during a transition for more than 900 ms.
- Don't animate the transition under `prefers-reduced-motion: reduce`; cross-fade in ≤ 200 ms or swap instantly.
- Don't use the same curtain wipe for every link, including footer and legal links.
- Don't break the back button, middle-click or open-in-new-tab.
- Don't hold `view-transition-name` on elements that are not shared; duplicate names abort the transition.
- Don't animate a full-page WebGL canvas through a View Transition snapshot; fade the canvas out first and restart it on the new page.

## Patterns

Pattern cards arrive with the corpus (Todo 10). Planned cards for this domain: `shared-title-morph`, `image-to-hero-expand`, `progress-loader`.

## Recipes

Recipes arrive with Todo 3. Planned recipes for this domain: `view-transition`, `page-transition`.

## Checks

- `cliche/long-loader`
- `craft/leaked-scrolltrigger`, `craft/render-when-hidden`
- `quality/content-hidden-at-rest`, `quality/script-error`
- Budgets: `budget/lcp`, `budget/inp`, `budget/reduced-motion`, `budget/a11y`
