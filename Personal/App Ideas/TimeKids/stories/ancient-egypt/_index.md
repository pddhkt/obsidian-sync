---
type: story-folder-index
project: TimeKids
story: Ancient Egypt
storyId: ancient-egypt
tier: flagship
status: private-beta-demo
date: 2026-06-25
tags:
  - app-idea
  - timekids
  - story
  - ancient-egypt
  - private-beta
aliases:
  - Ancient Egypt Demo Story
  - TimeKids Ancient Egypt
---

# Ancient Egypt — Private Beta Demo Story

This folder is the first TimeKids story workspace. Mark it as **private beta demo**, not the full polished paid-launch version.

The goal is to prove the complete child loop:

```text
Timi house
  -> story preview
  -> time-travel transition
  -> story scenes with hotspots
  -> mid-story picture interactions
  -> bounded Timi chat
  -> picture quiz
  -> reward sticker
  -> parent report
```

## Folder structure

```text
ancient-egypt/
  _index.md
  01-story-brief.md
  02-scripts/
    _index.md
    script-v1/
      _index.md
      01-chinese.md
      02-english.md
  03-scenes-and-hotspots.md
  04-interactions-and-chat.md
  05-quiz-and-reward.md
  06-parent-report-seed.md
  07-assets-and-prompts.md
  08-assets/
    _index.md
    shared/
      _index.md
      nila/
        _index.md
      reward/
        _index.md
    scene-01-nile-arrival/
      01-prompts.md
      02-notes.md
      generated/
        _index.md
      selected/
        _index.md
    scene-02-meet-nila/
      01-prompts.md
      02-notes.md
      generated/
        _index.md
      selected/
        _index.md
    scene-03-pyramid-builders/
      01-prompts.md
      02-notes.md
      generated/
        _index.md
      selected/
        _index.md
    scene-04-river-boats-and-animals/
      01-prompts.md
      02-notes.md
      generated/
        _index.md
      selected/
        _index.md
    scene-05-wrap-up/
      01-prompts.md
      02-notes.md
      generated/
        _index.md
      selected/
        _index.md
  09-story-definition-map.md
  10-test-notes.md
```

## How the content connects

Use stable IDs so every layer can reference the others.

```text
script line ID
  -> scene beat
  -> selected image asset
  -> hotspot behavior
  -> StoryDefinition map
  -> StorySession evidence
  -> parent report seed
```

Example:

```text
AE-S01-L03
  -> Scene 01 boat-finding prompt
  -> 08-assets/scene-01-nile-arrival/selected/ae-s01-boat-hotspot.webp
  -> interaction_choice: "boat"
  -> parent report interest signal: "boats"
```

## File roles

| File | Purpose |
|---|---|
| [[01-story-brief]] | North star: beta status, learning goal, side character, vocabulary, reward, production limits. |
| [[02-scripts/_index|02-scripts/]] | Versioned story scripts. Each version has Chinese and English files. |
| [[02-scripts/script-v1/01-chinese|script-v1/chinese]] | Primary script source. Write Traditional Chinese/Cantonese first. |
| [[02-scripts/script-v1/02-english|script-v1/english]] | English adaptation using the same scene and line IDs. |
| [[03-scenes-and-hotspots]] | Production map for visuals, script references, image references, tappable objects, and app behavior. |
| [[04-interactions-and-chat]] | Mid-story picture choices, bounded Timi chat, fallback lines, and gentle redirects. |
| [[05-quiz-and-reward]] | Picture quiz, retry/celebration lines, and sticker/artifact reward. |
| [[06-parent-report-seed]] | Summary seed, quiz evidence wording, interest signals, and parent learning check. |
| [[07-assets-and-prompts]] | Cross-scene asset inventory, generation prompts, selected versions, and open asset needs. |
| [[09-story-definition-map]] | Bridge from Obsidian story content to the app-facing `StoryDefinition`. |
| [[10-test-notes]] | Private beta observations and changes from real child/parent testing. |

## Asset rules

- Store every generated image attempt inside the matching scene's `generated/` folder.
- Store only current app/story choices inside the matching scene's `selected/` folder.
- Reference selected images from [[03-scenes-and-hotspots]].
- Keep image names stable and readable: `ae-s01-bg-v001.png`, `ae-s01-bg-main.webp`, `ae-s01-boat-hotspot.webp`.
- Do not delete rejected generated images during beta; use the scene `02-notes.md` file to mark why they were rejected.

## Current beta story direction

Ancient Egypt should focus on **the Nile as the living center**: river, boats, animals, people, and pyramids nearby. Pyramids are the hook, but the learning goal should be that the Nile helped people live, travel, and build.

Related project notes:

- [[../../launch-story-set|Private beta story set]]
- [[../../story-script-templates|Story script templates]]
- [[../../implementation-contracts|Implementation contracts]]
- [[../../private-beta-test-plan|Private beta test plan]]
