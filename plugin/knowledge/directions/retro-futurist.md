---
id: retro-futurist
name: Retro-Futurist
idea: The future as an earlier era imagined it, with instrument panels, scan lines and confident technical type.
mood: [technical, nostalgic, bold, mechanical, optimistic]
---

# Retro-Futurist

## Idea

The page looks like a control panel or a mission document from a future that never happened: technical typography, instrument readouts, grids of data, warm phosphor or space-age colour. It suits hardware and synth makers, space and aviation, games, developer tools with personality, music producers and launches that want to feel like an event.

## Mood words

technical, nostalgic, bold, mechanical, optimistic. Not: vaporwave, glitch-for-its-own-sake, cyberpunk-neon, kitsch.

## Type pairings

Pick one. Scale ratio 1.5, display line height 0.95, display tracking 0 to +0.02 em (wide technical faces need air); labels in uppercase at +0.1 em.

| Display | Text | Why it works | Licence source |
| --- | --- | --- | --- |
| Panchang (Bold 700) | Space Grotesk (Regular 400) | Wide, engineered display like equipment lettering, with a technical text face | Fontshare (Panchang), ITF Free Font Licence; Google Fonts (Space Grotesk), OFL |
| Big Shoulders Display (Bold 700) | IBM Plex Mono (Regular 400) | Condensed industrial headlines with a terminal-style mono for readouts | Google Fonts, OFL |
| Orbitron (Medium 500) | JetBrains Mono (Regular 400) | Geometric space-age display; use only for short titles and pair with a sober mono | Google Fonts, OFL |

## Palette strategy

One warm display colour on a dark instrument background, or a printed-manual look on off-white with one signal colour.

| Role | Value | Rule |
| --- | --- | --- |
| Background | #141310 (panel) or #EAE6DA (manual paper) | Pick one per site |
| Display colour | #FFB000 (amber phosphor) or #FF5A1F (signal orange) | Readouts, key numbers, active states; contrast with the background ≥ 7:1 |
| Text | #E8E2D0 on dark, #1D1B16 on light | Contrast ≥ 11:1 |
| Secondary | #6FA8A0 (instrument teal) | Charts and diagrams only; never paired with violet |
| Muted | #8C8676 | Labels; contrast ≥ 4.5:1 |

## Spacing rhythm

Modular panels: content in bordered modules with 1 px rules and corner ticks, gutters of 16–24 px, labels in the module corners. Dense inside modules, generous between them (10–14 vh).

## Motion character

- Ease family: `power4.out` and `steps()` for readouts; motion is precise and instrument-like.
- Duration band: 0.3–0.7 s for UI, 1.0–1.8 s for the signature moment.
- Stagger band: 20–40 ms, like a display refreshing line by line.
- Numbers roll, gauges sweep, text types on at 30–60 characters per second for one moment only.

## Texture

Fine scan lines at 3–6 % on dark backgrounds, a slight phosphor bloom on the display colour only, registration marks and corner ticks on panels. Never on body text.

## Signature moments

- A boot sequence: panels power on module by module, readouts counting up to real product specs.
- A product rendered as a technical diagram whose callouts draw themselves as you scroll.
- An oscilloscope or waveform that reacts to the cursor or to scroll speed.

## Recipes it favours

`counter-roll`, `pinned-scene`, `shader-gradient`, `split-reveal`, `scroll-progress` (planned in Todo 3).

## Avoid

- A loader that runs the boot sequence for more than 3 s (`cliche/long-loader`).
- Decorative grid backgrounds behind everything (`slop/codex-grid-background`).
- Blinking cursors as decoration (`slop/blinking-cursor`).
- Neon glow shadows around modules (`slop/dark-glow`).
- Running text set in capitals (`quality/all-caps-body`).
