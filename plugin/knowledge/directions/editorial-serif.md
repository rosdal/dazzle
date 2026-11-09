---
id: editorial-serif
name: Editorial Serif
idea: A magazine spread on the web, where a confident serif and generous margins make the content feel worth reading.
mood: [literate, considered, warm, authoritative, unhurried]
---

# Editorial Serif

## Idea

The page reads like a well-made print feature. A high-contrast serif sets the voice, the text column is narrow and comfortable, and images sit in the grid like plates in a book. It suits publishers, writers, architecture and interior studios, cultural institutions, wine and food brands, and long-form product stories.

## Mood words

literate, considered, warm, authoritative, unhurried. Not: vintage, ornate, wedding, academic-dry.

## Type pairings

Pick one. Scale ratio 1.414, display line height 1.0–1.05, display tracking −0.01 to −0.025 em (serifs need less than sans).

| Display | Text | Why it works | Licence source |
| --- | --- | --- | --- |
| Newsreader (Display opsz, Light 300) | Newsreader (Text opsz, Regular 400) | One family with real optical sizes, so display and text feel related but each is tuned for its size | Google Fonts, OFL |
| Instrument Serif (Regular 400) | Instrument Sans (Regular 400) | Condensed, sharp serif headlines with a matching, quiet sans for captions and UI | Google Fonts, OFL |
| Gambetta (Medium 500) | Switzer (Regular 400) | Bookish serif with character, balanced by a neutral grotesque for navigation and metadata | Fontshare, ITF Free Font Licence |

## Palette strategy

Paper and ink, with one editorial accent used like a spot colour.

| Role | Value | Rule |
| --- | --- | --- |
| Background | #F4F1EA (paper) or #FFFFFF | Warm paper only when the brand is warm; never a beige default |
| Text | #1A1A1A | Contrast ≥ 14:1 on the background |
| Muted text | #5E5B55 | Captions and metadata; contrast ≥ 5:1 |
| Rule lines | #1A1A1A at 15 % | Hairlines between sections and in tables, 1 px |
| Accent | #B3261E (vermilion) or #1F3A5F (ink blue) | Drop caps, pull-quote marks, links; ≤ 3 % of the viewport |

## Spacing rhythm

Classic and measured. Body measure 62–68 characters, baseline grid of 8 px, section padding 14–20 vh. Asymmetric margins: text column offset to 2 of 12 or 3 of 12, with a hanging column for captions and notes.

## Motion character

- Ease family: `power2.out` and `sine.inOut`; motion is a page turning, not a stage effect.
- Duration band: 0.6–1.0 s for reveals, 0.3–0.5 s for image fades.
- Stagger band: 40–80 ms, by line, never by character.
- Most motion is in images: slow masks and a 3–6 % scale drift as they enter.

## Texture

Optional paper grain at 2–3 % on light backgrounds. Hairline rules, real footnotes, small caps for labels. No shadows, no glass.

## Signature moments

- An opening spread: a full-height headline set across 9 columns with a single image plate and a drop cap starting the first paragraph.
- Pull quotes that set themselves at display size as you reach them, with the attribution sliding in a beat later.
- A table of contents that stays pinned on wide screens and marks the current chapter.

## Recipes it favours

`split-reveal`, `image-reveal-mask`, `scroll-progress`, `smooth-scroll`, `view-transition` (planned in Todo 3).

## Avoid

- An italic serif headline as the only editorial idea (`slop/italic-serif-display`).
- Cream page with brown text as a lazy warm palette (`slop/cream-palette`).
- Kicker labels above every heading (`slop/kicker-above-heading`).
- Justified text without hyphenation (`quality/justified-text`).
- Long lines in the reading column (`quality/line-length`).
