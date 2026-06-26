---
type: story-definition-map
project: TimeKids
story: Ancient Egypt
storyId: ancient-egypt
status: private-beta-demo
date: 2026-06-25
tags:
  - app-idea
  - timekids
  - story-definition
  - ancient-egypt
---

# Ancient Egypt — StoryDefinition Map

This file maps the Obsidian source content into the app-facing `StoryDefinition` from [[../../implementation-contracts]].

It is not final JSON yet. It is the bridge between story production and implementation.

## StoryDefinition summary

| Field | Value |
|---|---|
| `id` | `ancient-egypt` |
| `tier` | `flagship` |
| `languages` | `zh-Hant-HK`, `en` |
| `sideCharacter.id` | `nila` |
| `reward.id` | `AE-R01` |

## Scene mapping

| Scene ID | Script refs | Background asset | Hotspots |
|---|---|---|---|
| AE-S01 | AE-S01-L01, AE-S01-L02, AE-S01-L03 | `08-assets/scene-01-nile-arrival/selected/ae-s01-bg-main.webp` | river, boat |
| AE-S02 | AE-S02-L01, AE-S02-L02, AE-S02-L03 | `08-assets/scene-02-meet-nila/selected/ae-s02-bg-main.webp` | boat, animal |
| AE-S03 | AE-S03-L01, AE-S03-L02, AE-S03-L03 | `08-assets/scene-03-pyramid-builders/selected/ae-s03-bg-main.webp` | pyramid, builders |
| AE-S04 | AE-S04-L01, AE-S04-L02, AE-S04-L03 | `08-assets/scene-04-river-boats-and-animals/selected/ae-s04-bg-main.webp` | boat, animals |
| AE-S05 | AE-S05-L01, AE-S05-L02, AE-S05-L03 | `08-assets/scene-05-wrap-up/selected/ae-s05-bg-main.webp` | reward |

## Interaction mapping

| ID | Source | Type | Saves |
|---|---|---|---|
| AE-I01 | [[04-interactions-and-chat#Mid-story interactions]] | picture choice | interest signal |
| AE-I02 | [[04-interactions-and-chat#Mid-story interactions]] | picture choice | pyramid recognition |
| AE-C01 | [[04-interactions-and-chat#Bounded Timi chat]] | bounded chat | interest signal |
| AE-C02 | [[04-interactions-and-chat#Bounded Timi chat]] | bounded chat | learning signal |

## Quiz mapping

Quiz source: [[05-quiz-and-reward#Picture quiz]]

| ID | Correct answer |
|---|---|
| AE-Q01 | river |
| AE-Q02 | boat |
| AE-Q03 | pyramid |

## Parent report mapping

Parent report source: [[06-parent-report-seed]]

Fields to map:

- `explored`
- `noticedSignals`
- `quizEvidenceTemplate`
- `summarySeed`
- `learningCheckQuestion`
- `acceptableAnswerSignals`
- `tryTogether`
- `suggestedRevisit`

