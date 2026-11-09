---
name: art-direction
description: Turning mood words into a direction, keeping every section coherent with it, choosing one signature moment and spending a restraint budget. Load when writing or changing directions, or when a request is about how the site should feel.
---

# Art direction

A direction is a set of decisions that make every later choice easy: one type pairing, one palette strategy, one motion character, one texture and one signature moment. Generic sites have no direction, only defaults. Write the direction before any markup, and test every section against it.

## Principles

1. Start from the brief's mood words, not from a favourite look. Each mood word must map to at least one concrete decision (a font, a colour value, an ease, a texture).
2. Build from an archetype in `${CLAUDE_PLUGIN_ROOT}/knowledge/directions/`, then change at least one of type pairing, palette or signature moment to fit this brief. An unchanged archetype is a template, not a direction.
3. One signature moment per site. Name it in one sentence, place it in the story, and give it the stage: no other strong motion in its viewport or the one before it.
4. Coherence beats variety. Every section uses the same type roles, palette roles, ease family and texture. A section that needs a different language is a different site.
5. Restraint is a budget, not a mood. Count the effects; when the budget is spent, cut.
6. Original only. When the user names a site they admire, extract the qualities (pace, contrast, density) and write an original direction with them. Never reproduce its layout, type, assets or signature.

## Defaults

| Setting | Value |
| --- | --- |
| Directions offered per brief | 3 |
| Mood words per direction | 3–5, plus 2–4 "not" words that rule out the nearby cliché |
| Differences between the 3 directions | At least 2 of: type pairing, palette strategy, motion character |
| Type families | 2 (display and text) |
| Saturated colours | 1 accent, ≤ 5 % of any viewport |
| Ease families | 1 primary plus 1 for hover and UI |
| Textures | 1 (grain, glass, paper, halftone or none) |
| Signature moments | 1 per site; a multi-page site may echo it once per page at smaller scale |
| Strong motions per viewport | ≤ 1 |
| Restraint budget per page | ≤ 5 "effects" total (each pinned section, WebGL scene, marquee, split reveal family, custom cursor, parallax group counts as 1) |
| Calm sections | ≥ 1 calm section after every strong one |

## Do

- Write each direction in the schema: name and one-line idea, mood words, type pairing with roles and scale ratio, palette with roles and contrast checked, spacing rhythm, motion character (ease family, duration band, stagger band), texture, signature moment, recipes it favours.
- Translate each mood word into numbers. "Tactile" becomes grain at 4 % and 1.2 s `power2.out` reveals; "precise" becomes a 12-column grid and 0.6 s `expo.out`.
- Make the three directions genuinely different bets, for example one typographic, one image-led, one spatial (WebGL).
- Describe each direction's hero in two sentences the user can picture before any frame exists.
- Record the chosen direction, why it won, font sources and licences, and every rule override with its reason in `.dazzle/DIRECTION.md`.
- On "mix 1 with the type from 3", swap the named part only and re-check contrast, scale and motion against the new combination.
- Test coherence before handover: cover the section headings and ask whether each screenshot could belong to another direction. If yes, it is generic; fix it.
- Keep a running effect count in `STORY.md` against the restraint budget; when a new effect is proposed, name the one it replaces.
- When the brief has no mood words, propose three sets of three in the brief question rather than guessing one.

## Don't

- Don't offer three variations of one direction (three dark themes with different accents).
- Don't pick a direction because the technique is impressive. The signature moment must serve the content: the product, the work or the message.
- Don't add a second signature moment to "use" an idea; save it for a later page or drop it.
- Don't mix textures (grain plus glass plus noise gradient).
- Don't name a direction after a real brand, studio or site, or describe it as "like X".
- Don't let placeholder content set the direction; design for the real content the brief describes.
- Don't change the direction silently during the build. A change of type, palette or motion character goes back to the user.

## Patterns

Pattern cards arrive with the corpus (Todo 10). Planned cards for this domain: `single-light-hero`, `type-as-image`, `calm-after-signature`.

## Recipes

Recipes arrive with Todo 3. A direction lists the recipes it favours; common anchors are `pinned-scene`, `split-reveal`, `shader-gradient` and `grain-overlay`.

## Checks

- `slop/ai-color-palette`, `slop/overused-font`, `slop/flat-type-hierarchy`, `slop/cream-palette`, `slop/dark-glow`, `slop/radial-halo`
- `cliche/parallax-everywhere`, `cliche/multiple-marquees`, `cliche/split-everything`
- Budgets: `budget/lever-range`
- The critic scores direction coherence and signature moment; anything under 4 of 5 goes in the handover.
