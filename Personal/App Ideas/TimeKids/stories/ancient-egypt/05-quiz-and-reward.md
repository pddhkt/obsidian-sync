---
type: quiz-reward-plan
project: TimeKids
story: Ancient Egypt
storyId: ancient-egypt
status: private-beta-demo
date: 2026-06-25
tags:
  - app-idea
  - timekids
  - quiz
  - reward
  - ancient-egypt
---

# Ancient Egypt — Quiz and Reward

## Picture quiz

| Question ID | Prompt | Choices | Correct | Gentle retry | Celebration |
|---|---|---|---|---|---|
| AE-Q01 | Which picture is the Nile River? | river, pyramid, bird | river | Good looking. Try the big blue water. | Yes, that's the Nile River. |
| AE-Q02 | What can travel on the river? | boat, rocket, drum | boat | Look for something that floats on water. | Yes, the boat travels on the river. |
| AE-Q03 | Which shape is the pyramid? | pyramid, fish, market basket | pyramid | Try the big triangle stone building. | You found the pyramid. |

## Reward

| Reward ID | Name | Asset | Trigger |
|---|---|---|---|
| AE-R01 | Nile Boat Sticker | `08-assets/shared/reward/ae-r01-nile-boat-sticker.webp` | After quiz completion. |

Reward copy:

- Cantonese: 送你一張尼羅河小船貼紙！
- English: You earned a Nile Boat sticker!

## Reward behavior

- Lottie/dotLottie burst or small Rive pop if available.
- Static sticker reveal if reduced motion is enabled.
- Add sticker to Time Museum after claim.

