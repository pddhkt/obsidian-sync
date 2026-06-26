---
type: content-template
project: TimeKids
status: private-beta-plan
date: 2026-06-25
tags:
  - app-idea
  - content
  - template
  - cantonese
  - edtech
---

# TimeKids — Story Script Templates

## Rule

Write **Traditional Chinese/Cantonese first**, then English.

The product should feel native to Hong Kong bilingual families, not like an English app translated into Chinese.

## Beta lesson production contract

Use one repeatable template so 10 private beta stories are realistic: **3 flagship stories** plus **7 simpler complete stories**.

| Lesson section | Flagship stories | Simple stories | Tools / build method |
|---|---:|---:|---|
| Story setup | Title, goal, side character, reward | Same | Obsidian source note -> typed `StoryDefinition` |
| Vocabulary | 3 concrete words | 2-3 words | Traditional Chinese/Cantonese first, English second |
| Scenes | 4-5 scenes | 3 scenes | Layered PNG/WebP/SVG, React Native layout, Reanimated scene motion |
| Mid-story interaction | 2 prompts | 1 prompt | Big picture choices, no required reading, `Pressable` hotspots |
| Post-story chat | 2-3 bounded turns | None or scripted line only | Scripted fallback first; AI optional behind server route |
| Quiz | 3 picture questions | 2 picture questions | Reusable picture-card quiz component, gentle retry |
| Reward | 1 sticker/artifact | 1 sticker/artifact | Lottie/dotLottie burst or small Rive sticker pop |
| Parent report seed | Full summary seed | Short summary seed | Structured session data + fallback template summary |

Related app contracts: [[implementation-contracts]].

## Flagship story template

Use for:

- Ancient Egypt
- Hong Kong Old Harbour
- Ancient China

### 1. Story setup

| Field | Notes |
|---|---|
| Story title | Traditional Chinese + English |
| Story goal | What the child should understand by the end |
| Timi role | What Timi is helping the child notice |
| Local side character | Name, role, personality |
| Reward sticker | Sticker name and visual idea |

### 2. Vocabulary

| Type | Traditional Chinese/Cantonese | English |
|---|---|---|
| Word 1 |  |  |
| Word 2 |  |  |
| Word 3 |  |  |

Keep vocabulary concrete: places, objects, actions, animals, food, tools, vehicles.

### 3. Scenes

Each scene should be short enough to listen to comfortably.

| Scene | Purpose | Timi line | Side character line | Visual/action |
|---|---|---|---|---|
| 1 | Arrival / meet side character |  |  |  |
| 2 | Discover object/place |  |  |  |
| 3 | Daily life / action |  |  |  |
| 4 | Big idea / wonder moment |  |  |  |
| 5 | Wrap-up |  |  |  |

### 4. Mid-story interactions

| Interaction | Prompt | Choices | Correct/target behavior | Timi response |
|---|---|---|---|---|
| 1 |  | 2–3 picture choices |  |  |
| 2 |  | 2–3 picture choices |  |  |

Use observation prompts, not tests:

- "What should we look at first?"
- "Can you help Timi find the boat?"
- "Which picture looks like the thing Nila showed us?"

### 5. Post-story chat

2–3 bounded turns. Timi carries the chat.

| Turn | Timi says | Child choices | Signals to save |
|---|---|---|---|
| 1 |  | 2–3 choices |  |
| 2 |  | 2–3 choices |  |
| 3 | Optional | 2–3 choices |  |

### 6. Quiz

| Question | Choices | Correct answer | Gentle retry line | Celebration line |
|---|---|---|---|---|
| 1 | 2–3 picture choices |  |  |  |
| 2 | 2–3 picture choices |  |  |  |
| 3 | 2–3 picture choices |  |  |  |

### 7. Parent report seed

| Field | Draft |
|---|---|
| What they explored |  |
| What they noticed |  |
| Quiz evidence |  |
| AI insight summary seed |  |
| Learning check question |  |
| Acceptable answer signals |  |
| Optional parent-child mini activity | Offline first; in-app only if useful |
| Optional in-app response modes | Speaking / typing; drawing happens on paper |
| Suggested revisit |  |

## Simpler story template

Use for the seven non-flagship launch stories.

### 1. Story setup

| Field | Notes |
|---|---|
| Story title | Traditional Chinese + English |
| Story goal | One concrete idea |
| Local side character | Name, role |
| Reward sticker | Sticker name and visual idea |

### 2. Scenes

| Scene | Purpose | Timi line | Side character line | Visual/action |
|---|---|---|---|---|
| 1 | Arrival |  |  |  |
| 2 | Main discovery |  |  |  |
| 3 | Wrap-up |  |  |  |

### 3. Mid-story interaction

| Prompt | Choices | Timi response |
|---|---|---|
|  | 2–3 picture choices |  |

### 4. Quiz

| Question | Choices | Correct answer | Gentle retry line | Celebration line |
|---|---|---|---|---|
| 1 | 2–3 picture choices |  |  |  |
| 2 | 2–3 picture choices |  |  |  |

### 5. Parent report seed

| Field | Draft |
|---|---|
| What they explored |  |
| What they noticed |  |
| Quiz evidence |  |
| AI insight summary seed |  |
| Learning check question |  |
| Acceptable answer signals |  |
| Optional parent-child mini activity | Offline first; in-app only if useful |
| Optional in-app response modes | Speaking / typing; drawing happens on paper |
