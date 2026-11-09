---
id: kinetic-type
name: Kinetic Type
idea: Typography is the image and the motion, so words move, stretch and assemble as the page scrolls.
mood: [energetic, bold, rhythmic, playful, loud]
---

# Kinetic Type

## Idea

There are few or no images; the headlines are the visuals. Variable fonts change weight and width with scroll, lines slide and stack, and single words fill the screen. It suits agencies and studios, music and festivals, sports, launches with a strong slogan and personal portfolios where the voice matters more than the pictures.

## Mood words

energetic, bold, rhythmic, playful, loud. Not: chaotic, gimmicky, unreadable, noisy.

## Type pairings

Pick one. Free display sizes (10–30 vw) outside the scale for key words, scale ratio 1.618 for the rest, display line height 0.82–0.9, display tracking −0.03 to −0.05 em.

| Display | Text | Why it works | Licence source |
| --- | --- | --- | --- |
| Bricolage Grotesque (variable, width and weight axes) | Bricolage Grotesque (Regular 400, text opsz) | Width, weight and optical axes give the motion something to animate, and the text cut stays readable | Google Fonts, OFL |
| Unbounded (variable weight, Black 900) | Hanken Grotesk (Regular 400) | Wide, round display that holds attention at huge sizes; calm text face beside it | Google Fonts, OFL |
| Cabinet Grotesk (Extrabold 800) | Satoshi (Regular 400) | Characterful grotesque that stays legible when stretched across a screen | Fontshare, ITF Free Font Licence |

## Palette strategy

High contrast and few colours, so the type shapes do the work.

| Role | Value | Rule |
| --- | --- | --- |
| Background | #0E0E0E or #F5F3EE | Pick one per site; sections may invert |
| Text | #F5F3EE on dark, #0E0E0E on light | Contrast ≥ 15:1 |
| Accent | #FF4F1F (flare) or #D6FF3D (lime) | One word per section at most; contrast with the background ≥ 3:1 at display size |
| Outline type | Text colour as a 1–1.5 px stroke | Only at display sizes over 80 px |

## Spacing rhythm

Dense words, open sections. Headline lines touch or nearly touch (line height under 0.9); around them 20–40 vh of space so each word gets the stage. Body copy in short 40–55 character blocks.

## Motion character

- Ease family: `expo.out` for entries, `power3.inOut` for scroll-linked morphs.
- Duration band: 0.8–1.4 s for reveals; scroll-scrubbed morphs follow the scroll.
- Stagger band: 30–60 ms by character for one hero word only; by line elsewhere.
- Variable axes animate within the font's real range (for example weight 300 to 900, width 75 to 125).

## Texture

None, or a fine grain at 3 % on dark backgrounds. The texture comes from the letterforms.

## Signature moments

- A hero word that changes width and weight with scroll position until it fills the viewport edge to edge.
- A pinned section where a sentence assembles word by word, each word arriving from a different axis.
- A single line of type that travels horizontally while the page scrolls vertically.

## Recipes it favours

`variable-font-scroll`, `split-reveal`, `pinned-scene`, `horizontal-scroll`, `marquee-strip` (planned in Todo 3).

## Avoid

- Split-text reveals on every heading (`cliche/split-everything`).
- Letters colliding at display sizes (`slop/extreme-negative-tracking`).
- Headlines so big the mobile hero has no content (`slop/oversized-h1`).
- Lines reflowing because the reveal started before the font loaded (`craft/font-swap-shift`).
- Animating font size instead of transforms or font axes (`craft/animate-layout-property`).
