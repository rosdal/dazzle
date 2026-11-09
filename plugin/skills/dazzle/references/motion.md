---
name: motion
description: Easing families, duration bands, stagger, choreography and the motion budget. Load when adding or tuning any animation, reveal or hover motion, or when motion feels sluggish, jumpy or busy.
---

# Motion

Motion on an award-level site is direction, not decoration: it tells the eye where to look next and sets the pace of the story. Generic sites fail by animating everything the same way, at the same speed, all the time.

## Principles

1. Every movement has a job you can name in one sentence: reveal, guide, respond or connect. No job, no motion.
2. One strong motion per viewport. The signature moment gets the stage to itself; everything around it is quiet.
3. The direction owns the ease. Pick one ease family per site for reveals and one for camera-like moves, and use only those.
4. Animate transforms and opacity only. Layout properties stutter and shift content.
5. Motion enhances what is already visible. Content is readable before any animation runs.
6. Reduced motion is a designed version, not a switch-off: keep the order and emphasis, drop the travel.

## Defaults

| Setting | Value |
| --- | --- |
| Micro-interaction (hover, press, toggle) | 120–220 ms |
| Small reveal (text line, card, icon) | 500–900 ms |
| Hero and headline reveal | 0.9–1.6 s |
| Camera, light or scene move | 1.5–3 s |
| Exit before an entrance | 60–70 % of the entrance duration |
| Stagger, characters | 15–30 ms |
| Stagger, words | 30–60 ms |
| Stagger, lines and cards | 40–120 ms |
| Total stagger for a group | ≤ 600 ms (cut the stagger, not the group) |
| Reveal travel distance | 20–60 px, or 100–110 % for masked line reveals |
| Strong motions per viewport | 1 |
| Concurrent animated elements | ≤ 12 |

Ease families and when to use them:

| Family | GSAP | Use for |
| --- | --- | --- |
| Expo out | `expo.out` | Editorial and luxury reveals: fast start, long settle |
| Power 3–4 out | `power3.out`, `power4.out` | General reveals, cards, images |
| Power in-out | `power2.inOut`, `power3.inOut` | Camera moves, scene changes, page transitions |
| Linear | `none` | Scrubbed scroll timelines (the scroll is the ease) |
| Custom | `CustomEase` | Only when the direction defines one curve and reuses it everywhere |

Bounce, elastic and back eases are off by default (`slop/bounce-easing`); only Playful 3D style directions may use them, and only on objects, never on text.

## Do

- Put every duration, ease, stagger and distance in `dazzle.config.ts` as levers and read them in code.
- Choreograph in order: container first, then headline, then body, then supporting media. Start each 100–200 ms after the previous begins, not after it ends.
- Use `gsap.matchMedia()` so the reduced-motion version is written next to the full one:

```js
const mm = gsap.matchMedia();
mm.add(
  { full: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" },
  (ctx) => {
    const { full } = ctx.conditions;
    gsap.from(".hero-line", {
      yPercent: full ? 110 : 0,
      opacity: full ? 1 : 0,
      duration: full ? levers.hero.duration : 0.4,
      ease: levers.hero.ease,
      stagger: full ? levers.hero.stagger : 0,
    });
  },
);
```

- Wrap component animations in `gsap.context()` and call `ctx.revert()` on unmount or route change.
- Wait for `document.fonts.ready` before splitting or measuring text.
- Set `will-change: transform` only for the duration of an animation and remove it after.
- Leave 1–2 calm viewports between strong moments so the next one lands.

## Don't

- Don't animate `top`, `left`, `width`, `height`, `margin` or `padding`.
- Don't reveal every element on scroll; reveal the first element of each group and let the rest be present.
- Don't use more than two ease families on one page.
- Don't start content at `opacity: 0` in CSS; set the from-state in JavaScript so content shows without it.
- Don't loop decorative motion forever; autoplay motion stops or settles within 5 s.
- Don't let hover motion move layout or neighbouring elements.

## Patterns

Pattern cards arrive with the corpus (Todo 10). Planned cards for this domain: `kinetic-headline-reveal`, `staggered-card-cascade`, `masked-image-reveal`.

## Recipes

Recipes arrive with Todo 3. Planned recipes for this domain: `split-reveal`, `image-reveal-mask`, `counter-roll`, `scroll-progress`.

## Checks

- `slop/bounce-easing`, `slop/pulsing-dot`, `slop/blinking-cursor`, `slop/marquee`
- `cliche/split-everything`, `cliche/parallax-everywhere`, `cliche/multiple-marquees`
- `craft/animate-layout-property`, `craft/leaked-scrolltrigger`, `craft/will-change-left-on`, `craft/font-swap-shift`
- `quality/content-hidden-at-rest`
- Budgets: `budget/fps`, `budget/reduced-motion`, `budget/lever-range`
