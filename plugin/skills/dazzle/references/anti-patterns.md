---
name: anti-patterns
description: The slop baseline and the award-site clichés, with the rule ids the check engine reports. Load before writing any markup, and whenever a check reports a rule hit.
---

# Anti-patterns

Two lists decide what never ships. The slop baseline catches the tells of generic AI output. The award-site clichés catch the opposite failure: a site that copies the Awwwards look without its discipline. Every rule has an id; `dazzle check` reports hits by that id, and every reference's Checks section names the ids it is responsible for.

The slop baseline is adapted from impeccable's detector rules (Apache License 2.0, see `NOTICE`). The ids are kept so results compare across both tools; the wording, thresholds and severities are Dazzle's, because an expressive site legitimately does some things a product UI should not.

## Principles

1. Treat a rule hit as evidence, not taste. Fix it, or record in `.dazzle/DIRECTION.md` why the direction overrides it. Never silence a hit without a written reason.
2. Severity follows the direction. A rule marked `direction` is an error unless the chosen direction names it as part of its language (for example oversized display type in Kinetic Type). One override per rule, written down.
3. A cliché is a technique used without a reason. The same effect in service of the signature moment is fine; repeated on every section, it is a hit.
4. Fix the cause, not the detector. Replacing `border-left: 4px` with a `box-shadow` that looks the same is still the side-tab pattern.

## Defaults

| Threshold | Value |
| --- | --- |
| Body text size | ≥ 16 px (mobile and desktop) |
| Functional UI text (labels, captions, nav) | ≥ 13 px |
| Text over moving WebGL or video | ≥ 14 px and contrast ≥ 4.5:1 against the brightest frame |
| Body line length | 45–75 characters, 66 ideal |
| Body line height | 1.4–1.7 |
| Body tracking | −0.01 em to +0.02 em |
| Display tracking floor | −0.06 em (below that letters collide at large sizes) |
| Body contrast | ≥ 4.5:1; large text (≥ 24 px, or ≥ 19 px bold) ≥ 3:1 |
| Loader visible | ≤ 3 s on a fast connection, with progress after 1 s |
| Marquees per page | ≤ 1 |
| Parallax layers per viewport | ≤ 2 |
| Em dashes in copy | ≤ 1 per 150 words |
| Card nesting depth | 1 |
| Distinct spacing values in a section | ≥ 3 (one repeated gap everywhere reads as monotonous) |

## Do

- Read this file before writing layer 1 markup, and again before handover.
- Prefer one strong, specific choice over three safe ones: a single accent colour used with intent beats a balanced five-colour palette.
- Give every effect a job you can state in one sentence ("the pinned product turns so you see the ports").
- Keep the corrected version: when you fix a hit, check that the replacement isn't another rule on this list.

## Don't

- Don't ship any `error` rule from the index below.
- Don't decorate with geometry: grid-line backgrounds, radial halos behind headlines, repeating stripes, blobs assembled from CSS shapes.
- Don't use marketing filler: "unlock", "elevate", "seamless", "supercharge", "next-level", "revolutionize", or three-beat aphorisms ("Fast. Simple. Yours.").
- Don't label sections with tiny kickers or numbers ("01 — About") unless the direction's grid system makes numbering structural.
- Don't hide content at rest waiting for an animation; content must be readable with JavaScript off and before any reveal fires.
- Don't fake depth with a hairline border plus a wide soft shadow on every card.

## Patterns

Pattern cards arrive with the corpus (Todo 10). Until then, use the rule index below as the reference set.

## Recipes

No recipe exists to fix an anti-pattern; fixes are edits. Recipes themselves must pass every rule here on all three GPU tiers before they enter the library.

## Checks

The index below is the canonical list of rule ids. Severity: `error` blocks handover, `warn` is reported, `direction` is an error unless the direction overrides it in writing.

### Slop baseline (adapted from impeccable)

| Rule id | What it catches | Severity |
| --- | --- | --- |
| `slop/side-tab` | Thick coloured border on one side of a card or callout | error |
| `slop/border-accent-on-rounded` | Accent border on a rounded element, so the corner bends the stripe | error |
| `slop/overused-font` | Inter, Roboto, Open Sans, Poppins, Montserrat or the system stack as the display face | direction |
| `slop/flat-type-hierarchy` | Display-to-body size ratio under 2.5, so nothing leads | error |
| `slop/gradient-text` | Gradient fill on headline text | direction |
| `slop/ai-color-palette` | Purple-to-blue gradients, indigo accents on near-black, teal plus violet | error |
| `slop/cream-palette` | Beige or cream page with brown text as a default "warm" choice | direction |
| `slop/nested-cards` | A card inside a card | error |
| `slop/monotonous-spacing` | One gap value repeated for every relationship in a section | error |
| `slop/bounce-easing` | Bounce or elastic easing on UI and reveals | direction |
| `slop/pulsing-dot` | Pulsing "live" status dot as decoration | error |
| `slop/blinking-cursor` | Decorative blinking text cursor | error |
| `slop/shape-assembled-illustration` | Illustrations built from CSS circles and rounded rectangles | error |
| `slop/dark-glow` | Coloured glow shadows around cards and buttons | direction |
| `slop/radial-halo` | Radial-gradient halo behind a headline or product | direction |
| `slop/marquee` | Auto-scrolling logo or word marquee | direction |
| `slop/icon-tile-stack` | Icon in a rounded tile above every card heading | error |
| `slop/italic-serif-display` | Italic serif display headline as the default "editorial" move | direction |
| `slop/hero-eyebrow-chip` | Pill-shaped chip above the hero headline ("New · v2 is here") | error |
| `slop/kicker-above-heading` | Small uppercase label above every heading | error |
| `slop/numbered-section-labels` | "01 / 02 / 03" labels with no structural role | direction |
| `slop/em-dash-overuse` | More than one em dash per 150 words of copy | warn |
| `slop/marketing-buzzword` | Filler words listed under Don't | error |
| `slop/aphoristic-cadence` | Three-beat slogans and "It's not X. It's Y." copy | warn |
| `slop/oversized-h1` | Hero headline so large it pushes all content below the fold on mobile | direction |
| `slop/extreme-negative-tracking` | Tracking below −0.06 em, letters touching | error |
| `slop/gpt-thin-border-wide-shadow` | 1 px border plus a wide, soft shadow on every surface | error |
| `slop/repeating-stripes-gradient` | Repeating-gradient stripe backgrounds | error |
| `slop/codex-grid-background` | Decorative grid-line background | error |
| `slop/theater-slop-phrase` | Theatrical framing copy ("Welcome to the future of…") | error |
| `quality/content-hidden-at-rest` | Content at opacity 0 or off-screen until JS runs | error |
| `quality/low-contrast` | Text below the contrast defaults above | error |
| `quality/gray-on-color` | Grey text on a coloured background | error |
| `quality/line-length` | Body lines over 75 characters | error |
| `quality/tight-leading` | Body line height under 1.4 | error |
| `quality/tiny-text` | Body text under 16 px | error |
| `quality/undersized-ui-text` | Functional text under 13 px | error |
| `quality/all-caps-body` | Running text set in capitals | error |
| `quality/wide-tracking` | Body tracking over +0.05 em | error |
| `quality/justified-text` | Justified body text without hyphenation | warn |
| `quality/skipped-heading` | Heading levels that skip (h1 to h3) | error |
| `quality/heading-rhythm` | Heading closer to the block above than to its own text | warn |
| `quality/straggler` | Last line of a headline holding one short word | warn |
| `quality/text-overflow` | Text overflowing its container at any tested width | error |
| `quality/text-occlusion` | Text covered by another element | error |
| `quality/body-text-viewport-edge` | Body text touching the viewport edge on mobile | error |
| `quality/cramped-padding` | Padding under 16 px inside a bordered or filled box | error |
| `quality/broken-image` | Broken or empty image | error |
| `quality/script-error` | Uncaught error on load | error |

### Award-site clichés

| Rule id | What it catches | Severity |
| --- | --- | --- |
| `cliche/touch-cursor` | Custom cursor rendered on touch devices, or the native cursor hidden on them | error |
| `cliche/scroll-jack-trap` | Scroll-jacking with no way out: keyboard, anchor links or reduced motion cannot move past it | error |
| `cliche/small-text-over-webgl` | Text under 14 px over a moving WebGL or video layer | error |
| `cliche/long-loader` | Loader visible longer than 3 s | error |
| `cliche/parallax-everywhere` | Parallax on more than 2 layers in a viewport, or on most sections | error |
| `cliche/multiple-marquees` | More than one marquee on a page | error |
| `cliche/split-everything` | Split-text reveal on more than one heading per viewport | warn |
| `cliche/hover-only-content` | Information reachable only by hovering | error |
| `cliche/autoplay-sound` | Audio that starts without a user gesture | error |

### Craft

| Rule id | What it catches | Severity |
| --- | --- | --- |
| `craft/animate-layout-property` | Animating `top`, `left`, `width`, `height`, `margin` or `padding` instead of transforms | error |
| `craft/leaked-scrolltrigger` | GSAP tweens or ScrollTriggers not killed on route change or unmount | error |
| `craft/heavy-texture` | Uncompressed texture over 1 MB, or any texture without KTX2 when over 512 KB | error |
| `craft/uncapped-dpr` | Renderer pixel ratio above 2 | error |
| `craft/will-change-left-on` | `will-change` left set after an animation ends, or on more than 10 elements | warn |
| `craft/no-webgl-fallback` | WebGL scene with no static fallback when WebGL is unavailable | error |
| `craft/render-when-hidden` | Render loop running while the canvas is off-screen or the tab is hidden | error |
| `craft/font-swap-shift` | Text reveal starting before fonts load, so lines reflow mid-animation | error |
