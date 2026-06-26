---
type: scene-production-map
project: TimeKids
story: Ancient Egypt
storyId: ancient-egypt
status: private-beta-demo
date: 2026-06-25
tags:
  - app-idea
  - timekids
  - scenes
  - hotspots
  - ancient-egypt
---

# Ancient Egypt — Scenes and Hotspots

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

## Scene 01 — Nile Arrival

Source script:

- [[02-scripts/script-v1/01-chinese#Scene 01 — Nile Arrival]]
- [[02-scripts/script-v1/02-english#Scene 01 — Nile Arrival]]

Selected scene art:

![[08-assets/scene-01-nile-arrival/selected/ae-s01-bg-main.webp|600]]

| Beat | Script refs | Visual direction | Selected asset reference | App behavior |
|---|---|---|---|---|
| Arrival | AE-S01-L01 | Timi appears at the edge of a bright Nile river scene. | `08-assets/scene-01-nile-arrival/selected/ae-s01-bg-main.webp` | Play arrival line; fade in background. |
| Nile intro | AE-S01-L02 | River glows softly; boats move slowly in the distance. | `08-assets/scene-01-nile-arrival/selected/ae-s01-river-highlight.webp` | Tap river replays short Nile explanation. |
| Boat prompt | AE-S01-L03 | Boat hotspot pulses gently. | `08-assets/scene-01-nile-arrival/selected/ae-s01-boat-hotspot.webp` | Tap logs `hotspot_boat`; Timi gives happy reaction. |

Hotspots:

| Hotspot ID | Target asset | Script ref | Session signal |
|---|---|---|---|
| AE-S01-H01-river | ![[08-assets/scene-01-nile-arrival/selected/ae-s01-river-hotspot.webp|120]] | AE-S01-L02 | `interest:nile` |
| AE-S01-H02-boat | ![[08-assets/scene-01-nile-arrival/selected/ae-s01-boat-hotspot.webp|120]] | AE-S01-L03 | `interest:boats` |

## Scene 02 — Meet Nila

Source script:

- [[02-scripts/script-v1/01-chinese#Scene 02 — Meet Nila]]
- [[02-scripts/script-v1/02-english#Scene 02 — Meet Nila]]

Selected scene art:

![[08-assets/scene-02-meet-nila/selected/ae-s02-bg-main.webp|600]]

| Beat | Script refs | Visual direction | Selected asset reference | App behavior |
|---|---|---|---|---|
| Nila intro | AE-S02-L01 | Nila waves near riverbank reeds. | `08-assets/scene-02-meet-nila/selected/ae-s02-nila-wave.webp` | Play Nila intro line. |
| River helps | AE-S02-L02 | Simple icons: food basket, boat, market cloth. | `08-assets/scene-02-meet-nila/selected/ae-s02-river-life-icons.webp` | Optional tap labels. |
| Choice setup | AE-S02-L03 | Two large picture choices: boats or animals. | `08-assets/scene-02-meet-nila/selected/ae-s02-choice-boats.webp` | Starts interaction AE-I01. |

## Scene 03 — Pyramid Builders

Source script:

- [[02-scripts/script-v1/01-chinese#Scene 03 — Pyramid Builders]]
- [[02-scripts/script-v1/02-english#Scene 03 — Pyramid Builders]]

Selected scene art:

![[08-assets/scene-03-pyramid-builders/selected/ae-s03-bg-main.webp|600]]

| Beat | Script refs | Visual direction | Selected asset reference | App behavior |
|---|---|---|---|---|
| Pyramid reveal | AE-S03-L01 | Warm pyramid appears in the distance; no scary tomb imagery. | `08-assets/scene-03-pyramid-builders/selected/ae-s03-bg-main.webp` | Timi points to pyramid. |
| Teamwork | AE-S03-L02 | Friendly workers moving blocks together. | `08-assets/scene-03-pyramid-builders/selected/ae-s03-builders.webp` | Optional tap shows teamwork line. |
| Find pyramid | AE-S03-L03 | Three picture choices: pyramid, boat, bird. | `08-assets/scene-03-pyramid-builders/selected/ae-s03-pyramid-choice.webp` | Starts interaction AE-I02. |

## Scene 04 — River, Boats, and Animals

Source script:

- [[02-scripts/script-v1/01-chinese#Scene 04 — River, Boats, and Animals]]
- [[02-scripts/script-v1/02-english#Scene 04 — River, Boats, and Animals]]

Selected scene art:

![[08-assets/scene-04-river-boats-and-animals/selected/ae-s04-bg-main.webp|600]]

| Beat | Script refs | Visual direction | Selected asset reference | App behavior |
|---|---|---|---|---|
| River sound | AE-S04-L01 | Boat drifts; water shimmer is subtle. | `08-assets/scene-04-river-boats-and-animals/selected/ae-s04-boat.webp` | Play water ambience if available. |
| Animals | AE-S04-L02 | Birds and fish near the river. | `08-assets/scene-04-river-boats-and-animals/selected/ae-s04-animals.webp` | Tap logs animal interest. |
| Memory picture | AE-S04-L03 | Picture reply choices: boat, bird, pyramid. | `08-assets/scene-04-river-boats-and-animals/selected/ae-s04-memory-choices.webp` | Starts bounded chat AE-C01. |

## Scene 05 — Wrap-Up

Source script:

- [[02-scripts/script-v1/01-chinese#Scene 05 — Wrap-Up]]
- [[02-scripts/script-v1/02-english#Scene 05 — Wrap-Up]]

Selected scene art:

![[08-assets/scene-05-wrap-up/selected/ae-s05-bg-main.webp|600]]

| Beat | Script refs | Visual direction | Selected asset reference | App behavior |
|---|---|---|---|---|
| Recap | AE-S05-L01 | Three memory bubbles: river, boat, pyramid. | `08-assets/scene-05-wrap-up/selected/ae-s05-memory-bubbles.webp` | Replay recap. |
| Learning goal | AE-S05-L02 | Timi points to river line connecting all memory bubbles. | `08-assets/scene-05-wrap-up/selected/ae-s05-nile-summary.webp` | Save completion signal. |
| Reward | AE-S05-L03 | Nile Boat sticker pops into collection. | `08-assets/shared/reward/ae-r01-nile-boat-sticker.webp` | Claim reward AE-R01. |
