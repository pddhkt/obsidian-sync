---
type: interaction-plan
project: TimeKids
story: Ancient Egypt
storyId: ancient-egypt
status: private-beta-demo
date: 2026-06-25
tags:
  - app-idea
  - timekids
  - interactions
  - chat
  - ancient-egypt
---

# Ancient Egypt — Interactions and Chat

## Interaction rules

- Picture choices are the reliable path.
- Voice is optional and never required.
- No freeform chat is needed for the private beta demo.
- If AI is unavailable, use the scripted fallback lines below.
- Wrong choices get gentle retry, never a red X or failure.

## Mid-story interactions

| Interaction ID | Scene | Prompt script ref | Choices | Target | Timi response | Session signals |
|---|---|---|---|---|---|---|
| AE-I01 | AE-S02 | AE-S02-L03 | boat, animal | Any choice accepted | Great choice. Let's look closely. | `interest:boats` or `interest:animals` |
| AE-I02 | AE-S03 | AE-S03-L03 | pyramid, boat, bird | pyramid | Yes, that big triangle shape is the pyramid. | `quiz_precheck:pyramid` |

## Bounded Timi chat

| Chat ID | Timi prompt | Child picture replies | Fallback response | Signals |
|---|---|---|---|---|
| AE-C01 | Which thing should we remember from the Nile? | boat, bird, pyramid | I like that one too. The Nile helped people see and use many things. | `interest:*` |
| AE-C02 | What helped people travel in Ancient Egypt? | river, road, rocket | The river helped boats move from place to place. | `learning:nile-travel` |

## Gentle redirect lines

| Case | Timi line |
|---|---|
| Off-topic answer | Let's come back to our Egypt adventure. Can you pick one picture for Timi? |
| Mic unavailable | That's okay. You can tap a picture instead. |
| No AI key | Use scripted chat choices; do not show any API wording. |

