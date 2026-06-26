---
type: quiz-reward-plan
project: TimeKids
story: Ancient China
storyId: ancient-china
status: private-beta-demo
date: 2026-06-26
tags:
  - app-idea
  - timekids
  - quiz
  - reward
  - ancient-china
---

# Ancient China — Quiz and Reward

## Picture quiz

| Question ID | Prompt | Choices | Correct | Gentle retry | Celebration |
|---|---|---|---|---|---|
| AC-Q01 | Which picture is the Great Wall? | wall, lantern, kite | wall | Look for the long stone wall on the hills. | Yes, that's the Great Wall. |
| AC-Q02 | What can fly in the sky? | kite, wall, drum | kite | Look for something that floats up in the wind. | Yes, the kite flies in the sky. |
| AC-Q03 | Which one is a lantern? | lantern, fish, basket | lantern | Try the round red glowing one. | You found the lantern. |

## Reward

| Reward ID | Name | Asset | Trigger |
|---|---|---|---|
| AC-R01 | Kite Sticker | `08-assets/shared/reward/ac-r01-kite-sticker.webp` | After quiz completion. |

Reward copy:

- Cantonese: 送你一張風箏貼紙！
- English: You earned a Kite sticker!

## Reward behavior

- Lottie/dotLottie burst or small Rive pop if available.
- Static sticker reveal if reduced motion is enabled.
- Add sticker to Time Museum after claim.
