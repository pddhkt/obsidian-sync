---
type: interaction-plan
project: TimeKids
story: Ancient China
storyId: ancient-china
status: private-beta-demo
date: 2026-06-26
tags:
  - app-idea
  - timekids
  - interactions
  - chat
  - ancient-china
---

# Ancient China — Interactions and Chat

## Interaction rules

- Picture choices are the reliable path.
- Voice is optional and never required.
- No freeform chat is needed for the private beta demo.
- If AI is unavailable, use the scripted fallback lines below.
- Wrong choices get gentle retry, never a red X or failure.

## Mid-story interactions

| Interaction ID | Scene | Prompt script ref | Choices | Target | Timi response | Session signals |
|---|---|---|---|---|---|---|
| AC-I01 | AC-S02 | AC-S02-L03 | kite, lantern | Any choice accepted | Great choice. Let's look closely. | `interest:kites` or `interest:lanterns` |
| AC-I02 | AC-S03 | AC-S03-L03 | wall, lantern, kite | wall | Yes, that long wall is the Great Wall. | `quiz_precheck:greatwall` |

## Bounded Timi chat

| Chat ID | Timi prompt | Child picture replies | Fallback response | Signals |
|---|---|---|---|---|
| AC-C01 | Which thing should we remember from Ancient China? | kite, lantern, wall | I like that one too. Ancient China had many clever ideas. | `interest:*` |
| AC-C02 | What did people use to make kites and lanterns? | paper, stone, water | They used paper to make many clever things. | `learning:paper-making` |

## Gentle redirect lines

| Case | Timi line |
|---|---|
| Off-topic answer | Let's come back to our China adventure. Can you pick one picture for Timi? |
| Mic unavailable | That's okay. You can tap a picture instead. |
| No AI key | Use scripted chat choices; do not show any API wording. |
