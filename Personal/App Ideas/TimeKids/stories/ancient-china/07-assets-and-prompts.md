---
type: asset-inventory
project: TimeKids
story: Ancient China
storyId: ancient-china
status: private-beta-demo
date: 2026-06-26
tags:
  - app-idea
  - timekids
  - assets
  - prompts
  - ancient-china
---

# Ancient China — Assets and Prompts

Use this file for cross-scene inventory. Scene-specific image attempts and prompts live inside each scene asset folder.

## Global art direction

- Bright, warm, non-scary ancient China.
- Age 4-6 friendly.
- No war, weapons, battles, or scary dragons/fighting for beta; the Great Wall is shown as cheerful teamwork, not military.
- Lots of red lanterns, curved tiled roofs, kites, paper, and green hills.
- Timi remains the recurring animated mascot.
- A-Yu is a friendly local kid inventor, mostly scripted.

## Character note — A-Yu

Young ancient-Chinese kid inventor, about 6-8 years old, warm light skin, black hair in two small
round buns or a little topknot, simple cheerful cross-collar Han-style tunic (warm red and teal with
a soft sash), curious and bright, often holding a little paper kite or a writing brush. Same cute
kawaii cartoon style as Timi.

## First look-and-feel pass

Concept frames (2 takes per scene, characters composed in) live in
`08-assets/_look-and-feel-2026-06-26/`. See its `_index.md` for the A/B review. Once picks are
locked, promote winners into each scene's `selected/` folder and re-generate clean production
backgrounds (Timi/A-Yu are separate animated layers).

## Scene asset folders

| Scene | Folder | Main selected asset |
|---|---|---|
| AC-S01 Arrival (Village & Lanterns) | `08-assets/scene-01-arrival-lanterns/` | `selected/ac-s01-bg-main.webp` |
| AC-S02 Meet A-Yu | `08-assets/scene-02-meet-a-yu/` | `selected/ac-s02-bg-main.webp` |
| AC-S03 Great Wall Builders | `08-assets/scene-03-great-wall-builders/` | `selected/ac-s03-bg-main.webp` |
| AC-S04 Kites, Lanterns, and Paper | `08-assets/scene-04-kites-lanterns-paper/` | `selected/ac-s04-bg-main.webp` |
| AC-S05 Wrap-Up | `08-assets/scene-05-wrap-up/` | `selected/ac-s05-bg-main.webp` |

## Shared assets

| Asset | Folder | Notes |
|---|---|---|
| A-Yu poses | `08-assets/shared/a-yu/` | Wave, point, happy. |
| Kite Sticker | `08-assets/shared/reward/` | Reward AC-R01. |

## Naming convention

Use:

```text
ac-s01-bg-v001.png
ac-s01-bg-v002.png
ac-s01-bg-main.webp
ac-s01-lantern-hotspot.webp
```

Rules:

- `generated/` keeps all attempts.
- `selected/` keeps only current app/story choices.
- Use `.webp` for selected app assets when practical.
- Use `02-notes.md` in the scene folder to explain selected/rejected decisions.
