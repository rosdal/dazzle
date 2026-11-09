---
name: dazzle
description: Art direction and build system for expressive, award-level websites. Use whenever the user wants to design, build, restyle, animate or critique a website or web page — landing pages, portfolios, product launch and marketing sites, hero sections, agency or studio sites — or asks for scroll animation, GSAP, ScrollTrigger, Lenis, page transitions, three.js, WebGL or shaders, or says "make it look better", "make it feel premium", "more cinematic", "award-winning" or "Awwwards-level". Not for backend, API, database or build tooling work, and not for questions about non-visual code.
user-invocable: false
---

# Dazzle

Dazzle turns a short brief into an original, award-level site, then keeps it tunable. You art-direct first, build from tested recipes in four checked layers, and hand over honestly. This file is the router: read it fully, then load only the references a request needs.

## When to use

- A new site or page from a brief ("a launch site for a modular synth, dark and tactile").
- A change to the look or feel of an existing site ("make the hero more cinematic", "warmer palette", "add a case-study page").
- Motion, scroll, transitions, 3D, WebGL or shaders on a web page.
- A design review of a site or URL (`/dazzle review [url]`).
- Vague quality asks about a web page's look ("make my landing page feel premium").

Not for: backend or API code, data work, CI, or a UI question unrelated to the visual design of a site (for example a form validation bug). Answer those without this skill.

## Arguments from /dazzle

The `/dazzle` command hands over one of three forms:

- `mode: studio` → open Dazzle Studio (see Tools).
- `mode: review`, optional `url` → run the review flow on that URL or, without one, on this project.
- `mode: request` with the user's words → the main flow below. An empty request means: read `.dazzle/` and continue where the project left off, or ask what to build.

When the skill loads from a plain request instead of the command, treat it as `mode: request`.

## Before anything else

1. Look for `.dazzle/` and `dazzle.config.ts` in the project root.
2. If `.dazzle/` doesn't exist, ask the user once: "Dazzle isn't set up here yet. Run `npx @rosdal/dazzle init`?" Run it only after a yes. If the user declines, work without project files and say that levers and checks are unavailable.
3. If the project already has code, read it first (framework, styling, routes, existing tokens) and adapt to it. Never start over in an existing project unless asked.

## The flow

Each step reads and writes plain files, so a new session resumes from them. Never skip a step on a new site; on a change, start at the first step the change affects.

| Step | You do | Reads | Writes |
| --- | --- | --- | --- |
| 1. Brief | Ask up to four questions in one message: audience, three mood words, must-have sections or content, assets (logo, photos, copy). Unknown answers are fine | The request | `.dazzle/BRIEF.md` |
| 2. Directions | Write three distinct directions from the archetypes, each with type, palette, motion character, texture and one signature moment. The user picks, mixes or asks for more | `BRIEF.md`, archetypes, `art-direction.md` | `.dazzle/directions/`, then `.dazzle/DIRECTION.md` |
| 3. Story | Draft the scroll narrative: sections in order, what moves in each, where the signature moment sits, keyframes for the filmstrip | `DIRECTION.md`, `layout.md`, `motion.md`, `scroll.md` | `.dazzle/STORY.md` |
| 4. Build | Four layers, each checked before the next: layout and type → motion → WebGL → polish | `STORY.md`, the references for that layer | Source, `dazzle.config.ts`, `.dazzle/PLACEHOLDERS.md` |
| 5. Check | Run `npx @rosdal/dazzle check` after every layer and every change; fix `error` hits before continuing | `.dazzle/checks/latest/report.md` | Fixes |
| 6. Handover | Report in the format below | Everything | Chat message |

Get the user's approval on the direction (step 2) and the story (step 3) before writing markup. On a request that only changes an existing site, confirm the direction still holds and go straight to the affected layer.

### Layers and their gates

| Layer | Build | Gate |
| --- | --- | --- |
| 1. Layout and type | Semantic HTML for every section, type scale, grid, spacing, colour tokens, real or placeholder content, all breakpoints | Screenshots at 390, 834 and 1440 px read well; no layout shift; no accessibility errors |
| 2. Motion | Smooth scroll, reveals, pinning, scroll timelines, hover states, through recipes and levers | Story plays as planned; reduced-motion version complete; 60 fps on desktop |
| 3. WebGL | The signature scene: renderer, shaders, post-processing, GPU tiers, static fallback | FPS targets per tier; WebGL-off fallback looks intentional; JS and GPU budgets met |
| 4. Polish | Loader, page transitions, cursor and micro-interactions where the direction calls for them, meta and OG image, favicon | Full check passes |

Skip layer 3 when the direction has no WebGL moment. Never add WebGL to fill a gap in the direction.

## The eight principles (hard rules)

1. **Direction before code.** No markup before an approved direction and story.
2. **One signature moment.** One big idea per site. Everything else is calm. At most one strong motion per viewport.
3. **Recipes over improvisation.** Use a tested recipe for scroll engines, shaders and transitions when one exists. Compose and tune; don't reinvent.
4. **Everything tunable is a lever.** Timings, eases, colours and shader uniforms are named parameters in `dazzle.config.ts`, never literals buried in components.
5. **Layered build.** Layout and type, then motion, then WebGL, then polish. Each layer passes its gate first.
6. **Nothing ships unchecked.** Render, measure and critique every change before you present it.
7. **The user owns the output.** Recipes are copied in as readable source. Production builds contain no Dazzle code.
8. **Few commands, many words.** Don't ask the user to run commands you can run; don't invent new commands.

## Never

- Never clone, recreate or imitate a named site, brand or designer's work, even when asked ("make it look like apple.com"). Offer an original direction that captures the qualities they admire instead.
- Never invent stock photos or present generated images as real photography. Use the user's assets, abstract generated art that fits the direction, or labelled placeholders such as `[Product photo, 3:2]`, each listed in `PLACEHOLDERS.md`.
- Never skip the check, and never hide a failed check. Anything below target goes in the handover.
- Never use unlicensed fonts or assets taken from another site.
- Never hide content behind JavaScript: everything is readable before any animation runs.

## Router

Load a reference when the request touches its topic. Most requests need two or three. Always load `anti-patterns.md` before writing layer 1 and before handover.

| The request is about | Load |
| --- | --- |
| Choosing or changing a direction, mood, "make it feel …", coherence, restraint | `${CLAUDE_SKILL_DIR}/references/art-direction.md` |
| Fonts, type scale, headlines, readability of text | `${CLAUDE_SKILL_DIR}/references/typography.md` |
| Grid, composition, section order and rhythm, whitespace, focal points | `${CLAUDE_SKILL_DIR}/references/layout.md` |
| Palette, dark themes, contrast, glow, grain, gradients, lighting | `${CLAUDE_SKILL_DIR}/references/color-light.md` |
| Animation, easing, timing, stagger, reveals, choreography | `${CLAUDE_SKILL_DIR}/references/motion.md` |
| Smooth scroll, ScrollTrigger, pinning, scrubbing, parallax, Lenis | `${CLAUDE_SKILL_DIR}/references/scroll.md` |
| three.js, 3D scenes, models, renderer, GPU tiers | `${CLAUDE_SKILL_DIR}/references/threejs.md` |
| Shaders, GLSL, noise, displacement, gradients in WebGL | `${CLAUDE_SKILL_DIR}/references/shaders.md` |
| Page transitions, route changes, loaders, View Transitions | `${CLAUDE_SKILL_DIR}/references/transitions.md` |
| Hover, cursor, magnetic buttons, focus states, touch | `${CLAUDE_SKILL_DIR}/references/interaction.md` |
| Speed, budgets, image and font loading, lazy WebGL | `${CLAUDE_SKILL_DIR}/references/performance.md` |
| Reduced motion, keyboard, screen readers, scroll-jacking, contrast | `${CLAUDE_SKILL_DIR}/references/accessibility.md` |
| Generic or "AI-looking" output, rule hits from a check, clichés | `${CLAUDE_SKILL_DIR}/references/anti-patterns.md` |
| Writing directions | `${CLAUDE_PLUGIN_ROOT}/knowledge/directions/` (read the frontmatter of all 12, then the full files of the 3 you build on) |

## Direction archetypes

Twelve starting points live in `${CLAUDE_PLUGIN_ROOT}/knowledge/directions/`: Editorial Serif, Swiss Grid, Nocturne, Soft Glass, Brutalist, Kinetic Type, Monochrome Photographic, Tactile Organic, Retro-Futurist, Playful 3D, Luxury Minimal and Data Sculpture. An archetype is a starting point, not a template: each of the three directions you write must change at least the type pairing, palette or signature moment to fit the brief, and the three must differ from each other in at least two of type, palette and motion character.

## Project files

| File | Holds | Commit |
| --- | --- | --- |
| `dazzle.config.ts` | Tokens and lever values: the site's whole feel in one typed file | Yes |
| `.dazzle/BRIEF.md` | What, who, mood words, must-haves, assets | Yes |
| `.dazzle/DIRECTION.md` | The chosen direction, why, font sources and licences, rule overrides with reasons | Yes |
| `.dazzle/directions/` | All proposed directions and their style frames | Text yes, images no |
| `.dazzle/STORY.md` | The scroll narrative, section by section, with keyframes | Yes |
| `.dazzle/PLACEHOLDERS.md` | Copy and assets still to replace | Yes |
| `.dazzle/queue.json` | Studio requests waiting for you | No |
| `.dazzle/checks/` | `latest/report.json`, `latest/report.md`, keyframes, recording, `history.jsonl` | No |
| `src/dazzle/recipes/` | Copied-in recipe source, the user's to edit | Yes |

Write tunable values into `dazzle.config.ts` under `tokens` and `levers`, keyed by instance (for example `'hero.title'`), and read them in code from there.

## Tools

CLI commands, all through `npx @rosdal/dazzle`:

| Command | Use | Arrives in |
| --- | --- | --- |
| `init` | Set up `.dazzle/`, `dazzle.config.ts`, the Vite plugin and `.gitignore` entries | Todo 3 |
| `check` | Measure the site; writes `.dazzle/checks/latest/report.md` | Todo 6 |
| `studio` | Start Dazzle Studio on top of the running dev site | Todo 8 |
| `add <recipe>` | Copy a recipe's source and levers into the project | Todo 3 |
| `frames`, `tokens`, `story` | Render style frames, read or write tokens, render the story filmstrip | Later todos |

A command that prints "not implemented yet" is not available in this version. Say so in one line, do the step by hand where you can (for example, review screenshots yourself instead of `check`), and note it in the handover. MCP tools (`wait_for_request`, `reply`, `check`, `screenshot`) arrive with Todo 8.

## Review mode

For `/dazzle review [url]`: open the page (the URL, or the local dev server), capture it at 390, 834 and 1440 px, and score it 1–5 on direction coherence, typography, composition, motion, signature moment, content and polish, and performance and access. Give evidence for each score ("1440 px, hero: headline breaks into 5 lines") and rank the three highest-impact fixes. On another site's URL, critique only; never copy its code, assets or design into this project.

## Handover format

End every build or change with:

1. **What changed**: one line per layer or file group.
2. **Check result**: pass or fail per check, with the numbers (FPS per tier, LCP, CLS, initial JS), and every `error` hit still open, by rule id.
3. **Below target**: anything under 4 of 5 or over budget, and why. Never omit this; write "Nothing" when it's empty.
4. **Placeholders**: everything in `PLACEHOLDERS.md`.
5. **Try next**: two or three levers or requests worth trying.
