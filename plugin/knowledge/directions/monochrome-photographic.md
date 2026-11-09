---
id: monochrome-photographic
name: Monochrome Photographic
idea: Large black-and-white photography leads, and the interface steps back to frame it like a gallery wall.
mood: [documentary, quiet, honest, timeless, focused]
---

# Monochrome Photographic

## Idea

Photography is the content and the design gets out of its way. Images are large, black and white or heavily desaturated, and arranged with gallery spacing; type is small, precise and set apart from the pictures. It suits photographers, filmmakers, architecture and craft studios, fashion lookbooks and brands with strong real imagery. It only works with real photographs supplied by the user.

## Mood words

documentary, quiet, honest, timeless, focused. Not: moody-filter, nostalgic, sepia, stock.

## Type pairings

Pick one. Scale ratio 1.25 to 1.333 (type stays modest next to the images), display line height 1.05, display tracking −0.015 em; captions at +0.02 em.

| Display | Text | Why it works | Licence source |
| --- | --- | --- | --- |
| Geist (Medium 500) | Geist Mono (Regular 400) | Clean, small-sized sans with a mono for captions, dates and camera data | Google Fonts, OFL |
| Sentient (Regular 400) | Switzer (Regular 400) | A quiet serif for titles that adds warmth beside cold photographs | Fontshare, ITF Free Font Licence |
| Familjen Grotesk (Medium 500) | Familjen Grotesk (Regular 400) | Slightly humanist grotesque that labels without competing | Google Fonts, OFL |

## Palette strategy

Greyscale only; the photographs supply all the tone.

| Role | Value | Rule |
| --- | --- | --- |
| Background | #FFFFFF or #111111 | Choose by the photographs: light for bright work, dark for night or studio work |
| Text | #111111 or #F2F2F2 | Contrast ≥ 15:1 |
| Muted text | #767676 on white, #9E9E9E on dark | Captions only; contrast ≥ 4.5:1 |
| Image treatment | Greyscale, contrast +5 to +15 % | Apply the same treatment to every image; never mix colour and mono at random |
| Accent | none, or one colour photograph | Colour, if any, is a single deliberate image |

## Spacing rhythm

Gallery spacing: images separated by 8–16 vh, one image per viewport at key moments, captions hung 16–24 px below the image edge. Grid of 12 with images spanning 6, 8 or 12 columns and offset to create a walk.

## Motion character

- Ease family: `power2.inOut` for masks, `none` for scroll-linked scale.
- Duration band: 0.8–1.4 s for image reveals.
- Stagger band: 80–150 ms between images in a group.
- Images reveal through a mask (clip-path wipe) and drift 3–8 % in scale with scroll; type barely moves.

## Texture

Real photographic grain from the images themselves. No added overlays, blurs or glows.

## Signature moments

- A full-bleed photograph pinned while the caption and the next image scroll over it.
- A contact-sheet index where hovering a frame enlarges it and dims the rest.
- A slow, scroll-scrubbed zoom into one image that ends on a detail.

## Recipes it favours

`image-reveal-mask`, `pinned-scene`, `parallax-layer`, `smooth-scroll`, `view-transition` (planned in Todo 3).

## Avoid

- Invented or stock photography; use the user's images or labelled placeholders.
- Images hidden until a script runs (`quality/content-hidden-at-rest`).
- Titles laid over a photograph where they cover its subject (`quality/text-occlusion`).
- Captions below 13 px (`quality/undersized-ui-text`).
- Parallax on every image (`cliche/parallax-everywhere`).
