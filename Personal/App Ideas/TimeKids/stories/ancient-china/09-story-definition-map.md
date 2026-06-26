---
type: story-definition-map
project: TimeKids
story: Ancient China
storyId: ancient-china
status: private-beta-demo
date: 2026-06-26
tags:
  - app-idea
  - timekids
  - story-definition
  - ancient-china
---

# Ancient China — StoryDefinition Map

This file maps the Obsidian source content into the app-facing `StoryDefinition` from [[../../implementation-contracts]].

It is not final JSON yet. It is the bridge between story production and implementation.

## StoryDefinition summary

| Field | Value |
|---|---|
| `id` | `ancient-china` |
| `tier` | `flagship` |
| `languages` | `zh-Hant-HK`, `en` |
| `sideCharacter.id` | `a-yu` |
| `reward.id` | `AC-R01` |

## Scene mapping

| Scene ID | Script refs | Background asset | Hotspots |
|---|---|---|---|
| AC-S01 | AC-S01-L01, AC-S01-L02, AC-S01-L03 | `08-assets/scene-01-arrival-lanterns/selected/ac-s01-bg-main.webp` | town, lantern |
| AC-S02 | AC-S02-L01, AC-S02-L02, AC-S02-L03 | `08-assets/scene-02-meet-a-yu/selected/ac-s02-bg-main.webp` | kite, lantern |
| AC-S03 | AC-S03-L01, AC-S03-L02, AC-S03-L03 | `08-assets/scene-03-great-wall-builders/selected/ac-s03-bg-main.webp` | wall, builders |
| AC-S04 | AC-S04-L01, AC-S04-L02, AC-S04-L03 | `08-assets/scene-04-kites-lanterns-paper/selected/ac-s04-bg-main.webp` | kite, lantern |
| AC-S05 | AC-S05-L01, AC-S05-L02, AC-S05-L03 | `08-assets/scene-05-wrap-up/selected/ac-s05-bg-main.webp` | reward |

## Interaction mapping

| ID | Source | Type | Saves |
|---|---|---|---|
| AC-I01 | [[04-interactions-and-chat#Mid-story interactions]] | picture choice | interest signal |
| AC-I02 | [[04-interactions-and-chat#Mid-story interactions]] | picture choice | Great Wall recognition |
| AC-C01 | [[04-interactions-and-chat#Bounded Timi chat]] | bounded chat | interest signal |
| AC-C02 | [[04-interactions-and-chat#Bounded Timi chat]] | bounded chat | learning signal |

## Quiz mapping

Quiz source: [[05-quiz-and-reward#Picture quiz]]

| ID | Correct answer |
|---|---|
| AC-Q01 | wall |
| AC-Q02 | kite |
| AC-Q03 | lantern |

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
