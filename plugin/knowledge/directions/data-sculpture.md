---
id: data-sculpture
name: Data Sculpture
idea: Real data turned into form, so numbers become fields of points, lines and surfaces you move through.
mood: [precise, revealing, systematic, immersive, intelligent]
---

# Data Sculpture

## Idea

The signature is data made physical: particle fields, extruded maps, flowing lines and surfaces built from real numbers the user supplies. Type and layout are restrained and annotative, like a scientific figure. It suits climate and research organisations, data and analytics products, infrastructure and energy companies, annual reports and journalism.

## Mood words

precise, revealing, systematic, immersive, intelligent. Not: dashboard, sci-fi, decorative-particles, hacker.

## Type pairings

Pick one. Scale ratio 1.333, display line height 1.0, display tracking −0.02 em; numerals always tabular.

| Display | Text | Why it works | Licence source |
| --- | --- | --- | --- |
| Inter Tight (Semibold 600) | IBM Plex Mono (Regular 400) | Compact headlines with a mono for values, units and annotations | Google Fonts, OFL |
| Instrument Sans (Medium 500) | Geist Mono (Regular 400) | Calm, precise sans with a modern mono for data labels | Google Fonts, OFL |
| Sentient (Medium 500) | Switzer (Regular 400) | A serif for headline claims gives findings weight; sans for annotations | Fontshare, ITF Free Font Licence |

## Palette strategy

A neutral field with a sequential or diverging scale chosen for the data, plus one highlight for the finding.

| Role | Value | Rule |
| --- | --- | --- |
| Background | #0D1117 or #F7F7F5 | Dark for particle and light work, light for print-like figures |
| Text | #E6EDF3 or #15171A | Contrast ≥ 13:1 |
| Data scale | Sequential: #1B4D5C → #3E8E7E → #B8D8A0 → #F2E9A6 | Perceptually ordered; test in greyscale and for colour-vision deficiency |
| Highlight | #FF6A3D | The one value the story is about; ≤ 2 % of points |
| Muted text and axes | #8B949E or #6A6F76 | Contrast ≥ 4.5:1 |

## Spacing rhythm

Figure-like. Visualisations span 12 columns and 80–100 vh; annotations sit in a narrow 3–4 column margin, aligned to the data they describe. Sections are chapters of a finding, each with one claim.

## Motion character

- Ease family: `power3.inOut` for transitions between states; linear for scroll-scrubbed data changes.
- Duration band: 1.0–2.0 s for state changes; scrubbed sections follow scroll.
- Stagger band: 5–20 ms across points, by data order (time, value or region), never random.
- Motion always means something: points move because the data changes state (by year, by category).

## Texture

The data is the texture. Points sized 1–3 px with additive blending on dark backgrounds; thin axis lines and ticks. No grain over the data.

## Signature moments

- A field of thousands of points that reorganises from a map into a chart as you scroll, each point a real record.
- A timeline scrubbed by scroll where a surface rises and falls with the values.
- A single highlighted point that the camera follows through the dataset to its story.

## Recipes it favours

`pinned-scene`, `counter-roll`, `scroll-progress`, `noise-displacement`, `smooth-scroll` (planned in Todo 3).

## Avoid

- Invented data: use the user's numbers or clearly labelled sample data.
- Coloured glow around the visualisation instead of meaning in the data (`slop/dark-glow`).
- Small labels over the moving visualisation (`cliche/small-text-over-webgl`).
- A render loop running off-screen (`craft/render-when-hidden`).
- No static fallback image of the chart (`craft/no-webgl-fallback`).
