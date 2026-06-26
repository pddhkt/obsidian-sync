---
type: story-folder-index
project: TimeKids
story: Ancient China
storyId: ancient-china
tier: flagship
status: private-beta-demo
date: 2026-06-26
tags:
  - app-idea
  - timekids
  - story
  - ancient-china
  - private-beta
aliases:
  - Ancient China Demo Story
  - TimeKids Ancient China
---

# Ancient China — Private Beta Flagship Story

This is the **second** TimeKids flagship story workspace, built to the same structure as
[[../ancient-egypt/_index|Ancient Egypt]]. Mark it as **private beta demo**, not the full polished
paid-launch version.

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
ancient-china/
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
      a-yu/
        _index.md
      reward/
        _index.md
    scene-01-arrival-lanterns/
      01-prompts.md
      02-notes.md
      generated/
        _index.md
      selected/
        _index.md
    scene-02-meet-a-yu/
      01-prompts.md
      02-notes.md
      generated/
        _index.md
      selected/
        _index.md
    scene-03-great-wall-builders/
      01-prompts.md
      02-notes.md
      generated/
        _index.md
      selected/
        _index.md
    scene-04-kites-lanterns-paper/
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
AC-S03-L03
  -> Scene 03 Great-Wall-finding prompt
  -> 08-assets/scene-03-great-wall-builders/selected/ac-s03-wall-hotspot.webp
  -> interaction_choice: "wall"
  -> parent report interest signal: "greatwall"
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
- Keep image names stable and readable: `ac-s01-bg-v001.png`, `ac-s01-bg-main.webp`, `ac-s01-lantern-hotspot.webp`.
- Do not delete rejected generated images during beta; use the scene `02-notes.md` file to mark why they were rejected.

## Current beta story direction

Ancient China should focus on **clever ideas and working together**: paper, kites, lanterns, and
the Great Wall. The Great Wall is the visual hook, but the learning goal should be that ancient
Chinese people were creative and cooperated to make and build things. Keep it bright and friendly —
no war, weapons, or battles.

Related project notes:

- [[../../launch-story-set|Private beta story set]]
- [[../../story-script-templates|Story script templates]]
- [[../../implementation-contracts|Implementation contracts]]
- [[../../private-beta-test-plan|Private beta test plan]]
- [[../ancient-egypt/_index|Ancient Egypt (first flagship, structural model)]]
