---
type: scene-production-map
project: TimeKids
story: Ancient China
storyId: ancient-china
status: private-beta-demo
date: 2026-06-26
tags:
  - app-idea
  - timekids
  - scenes
  - hotspots
  - ancient-china
---

# Ancient China — Scenes and Hotspots

This file maps the script into visuals, image references, tappable hotspots, and app behavior.

Do not duplicate the full script here. Reference script line IDs from:

- [[02-scripts/script-v1/01-chinese|Script v1 Chinese]]
- [[02-scripts/script-v1/02-english|Script v1 English]]

## Asset reference rule

Scene Markdown should reference **selected** images, not every generated version.

Generated versions live in:

```text
08-assets/scene-XX-name/generated/
```

Current story/app choices live in:

```text
08-assets/scene-XX-name/selected/
```

## Scene 01 — Arrival (Village & Lanterns)

Source script:

- [[02-scripts/script-v1/01-chinese#Scene 01 — Arrival (Village & Lanterns)]]
- [[02-scripts/script-v1/02-english#Scene 01 — Arrival (Village & Lanterns)]]

Selected scene art:

![[08-assets/scene-01-arrival-lanterns/selected/ac-s01-bg-main.webp|600]]

| Beat | Script refs | Visual direction | Selected asset reference | App behavior |
|---|---|---|---|---|
| Arrival | AC-S01-L01 | Timi appears at the edge of a bright ancient Chinese town with red lanterns. | `08-assets/scene-01-arrival-lanterns/selected/ac-s01-bg-main.webp` | Play arrival line; fade in background. |
| Town intro | AC-S01-L02 | Lanterns glow; townspeople do crafts in the distance. | `08-assets/scene-01-arrival-lanterns/selected/ac-s01-town-highlight.webp` | Tap town replays short clever-makers line. |
| Lantern prompt | AC-S01-L03 | Lantern hotspot pulses gently. | `08-assets/scene-01-arrival-lanterns/selected/ac-s01-lantern-hotspot.webp` | Tap logs `hotspot_lantern`; Timi gives happy reaction. |

Hotspots:

| Hotspot ID | Target asset | Script ref | Session signal |
|---|---|---|---|
| AC-S01-H01-town | ![[08-assets/scene-01-arrival-lanterns/selected/ac-s01-town-hotspot.webp|120]] | AC-S01-L02 | `interest:china-town` |
| AC-S01-H02-lantern | ![[08-assets/scene-01-arrival-lanterns/selected/ac-s01-lantern-hotspot.webp|120]] | AC-S01-L03 | `interest:lanterns` |

## Scene 02 — Meet A-Yu

Source script:

- [[02-scripts/script-v1/01-chinese#Scene 02 — Meet A-Yu]]
- [[02-scripts/script-v1/02-english#Scene 02 — Meet A-Yu]]

Selected scene art:

![[08-assets/scene-02-meet-a-yu/selected/ac-s02-bg-main.webp|600]]

| Beat | Script refs | Visual direction | Selected asset reference | App behavior |
|---|---|---|---|---|
| A-Yu intro | AC-S02-L01 | A-Yu waves near a craft table. | `08-assets/scene-02-meet-a-yu/selected/ac-s02-a-yu-wave.webp` | Play A-Yu intro line. |
| Clever makers | AC-S02-L02 | Simple icons: paper, kite, lantern. | `08-assets/scene-02-meet-a-yu/selected/ac-s02-craft-icons.webp` | Optional tap labels. |
| Choice setup | AC-S02-L03 | Two large picture choices: kite or lantern. | `08-assets/scene-02-meet-a-yu/selected/ac-s02-choice-kite.webp` | Starts interaction AC-I01. |

## Scene 03 — Great Wall Builders

Source script:

- [[02-scripts/script-v1/01-chinese#Scene 03 — Great Wall Builders]]
- [[02-scripts/script-v1/02-english#Scene 03 — Great Wall Builders]]

Selected scene art:

![[08-assets/scene-03-great-wall-builders/selected/ac-s03-bg-main.webp|600]]

| Beat | Script refs | Visual direction | Selected asset reference | App behavior |
|---|---|---|---|---|
| Wall reveal | AC-S03-L01 | Great Wall appears winding over hills; no scary or military imagery. | `08-assets/scene-03-great-wall-builders/selected/ac-s03-bg-main.webp` | Timi points to the Great Wall. |
| Teamwork | AC-S03-L02 | Friendly workers carrying bricks together. | `08-assets/scene-03-great-wall-builders/selected/ac-s03-builders.webp` | Optional tap shows teamwork line. |
| Find Great Wall | AC-S03-L03 | Three picture choices: wall, lantern, kite. | `08-assets/scene-03-great-wall-builders/selected/ac-s03-wall-choice.webp` | Starts interaction AC-I02. |

## Scene 04 — Kites, Lanterns, and Paper

Source script:

- [[02-scripts/script-v1/01-chinese#Scene 04 — Kites, Lanterns, and Paper]]
- [[02-scripts/script-v1/02-english#Scene 04 — Kites, Lanterns, and Paper]]

Selected scene art:

![[08-assets/scene-04-kites-lanterns-paper/selected/ac-s04-bg-main.webp|600]]

| Beat | Script refs | Visual direction | Selected asset reference | App behavior |
|---|---|---|---|---|
| Kite in sky | AC-S04-L01 | Kite drifts in the sky; gentle breeze. | `08-assets/scene-04-kites-lanterns-paper/selected/ac-s04-kite.webp` | Play wind ambience if available. |
| Making things | AC-S04-L02 | Paper turning into kites and lanterns. | `08-assets/scene-04-kites-lanterns-paper/selected/ac-s04-making.webp` | Tap logs craft interest. |
| Memory picture | AC-S04-L03 | Picture reply choices: kite, lantern, wall. | `08-assets/scene-04-kites-lanterns-paper/selected/ac-s04-memory-choices.webp` | Starts bounded chat AC-C01. |

## Scene 05 — Wrap-Up

Source script:

- [[02-scripts/script-v1/01-chinese#Scene 05 — Wrap-Up]]
- [[02-scripts/script-v1/02-english#Scene 05 — Wrap-Up]]

Selected scene art:

![[08-assets/scene-05-wrap-up/selected/ac-s05-bg-main.webp|600]]

| Beat | Script refs | Visual direction | Selected asset reference | App behavior |
|---|---|---|---|---|
| Recap | AC-S05-L01 | Three memory bubbles: lantern, kite, Great Wall. | `08-assets/scene-05-wrap-up/selected/ac-s05-memory-bubbles.webp` | Replay recap. |
| Learning goal | AC-S05-L02 | Timi points to a line connecting all memory bubbles. | `08-assets/scene-05-wrap-up/selected/ac-s05-creativity-summary.webp` | Save completion signal. |
| Reward | AC-S05-L03 | Kite sticker pops into collection. | `08-assets/shared/reward/ac-r01-kite-sticker.webp` | Claim reward AC-R01. |
