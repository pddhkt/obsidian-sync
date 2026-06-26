---
type: content-plan
project: TimeKids
status: private-beta-plan
date: 2026-06-25
tags:
  - app-idea
  - stories
  - content
  - edtech
---

# TimeKids — Private Beta Story Set

## Private beta structure

Private beta includes **10 stories**:

- **3 flagship stories** with full interaction and short AI chat.
- **7 simpler complete stories** with narration, one interaction, quiz, and reward.

Timi is the recurring guide across all stories. Each story has one local side character.

## Flagship stories

| # | Story | Avatar pair | Why flagship |
|---|---|---|---|
| 1 | [[stories/ancient-egypt/_index|Ancient Egypt]] | Timi + Nila | Global wonder: pyramids, Nile, boats, animals, daily life |
| 2 | [[stories/ancient-china/_index|Ancient China]] | Timi + A-Yu | Chinese relevance: inventions, lanterns, kites, Great Wall |
| 3 | Hong Kong Old Harbour | Timi + Hei Hei | Local HK differentiation: boats, markets, trams, old/new Hong Kong |

## Simpler complete stories

| # | Story | Avatar pair | Core child-friendly angle |
|---|---|---|---|
| 4 | Silk Road | Timi + Lina | Travel, maps, sharing cultures, goods moving between places |
| 5 | Terracotta Army | Timi + Tao | Clay soldiers, archaeology, museums, careful discovery |
| 6 | Greek Olympics | Timi + Theo | Sports, teamwork, running, jumping, celebration |
| 7 | Roman Roads | Timi + Rosa | Roads, bridges, builders, travel |
| 8 | Viking Ships | Timi + Freya | Boats, stars, navigation, exploring |
| 9 | Leonardo's Workshop | Timi + Leo | Art, invention, curiosity, sketching ideas |
| 10 | Moon Landing | Timi + Nova | Rockets, teamwork, space exploration, the Moon |

## Flagship format

- 4–5 short scenes.
- 2 mid-story interaction moments.
- 2–3 turn post-story chat.
- 3-question picture quiz.
- reward/sticker.

## Simpler format

- 3 short scenes.
- 1 mid-story tap interaction.
- no live/freeform chat.
- 1–2 scripted side-character lines.
- 2-question picture quiz.
- reward/sticker.

## Production notes

- Write scripts in Traditional Chinese/Cantonese first, then English.
- Use the fixed templates in [[story-script-templates]].
- Convert each source note into a typed `StoryDefinition`; see [[implementation-contracts]].
- Keep each scene short enough for young children to follow by listening.
- Avoid real-person impersonation. Leonardo's Workshop should use Leo as a workshop apprentice, not Leonardo da Vinci as the speaking AI avatar.
- Timi should carry live/AI interaction. Side characters should mostly be scripted unless later testing proves children strongly want to talk to them.

## Beta readiness checklist per story

Each story must have these pieces before private beta:

| Required piece | Flagship stories | Simple stories |
|---|---|---|
| Story setup | Title, goal, side character, reward | Same |
| Vocabulary | 3 concrete words | 2-3 concrete words |
| Scenes | 4-5 scenes | 3 scenes |
| Mid-story interaction | 2 prompts | 1 prompt |
| Post-story chat | 2-3 bounded turns | None or 1 scripted line |
| Quiz | 3 picture questions | 2 picture questions |
| Reward | 1 sticker/artifact | 1 sticker/artifact |
| Parent report seed | Full summary seed | Short summary seed |
| Languages | Traditional Chinese/Cantonese first, English second | Same |

## Production order

1. **[[stories/ancient-egypt/_index|Ancient Egypt flagship]]** first: prove the full loop with Timi, side character, story scenes, mid-story interactions, chat, quiz, reward, and parent report.
2. **Hong Kong Old Harbour flagship** second: prove local HK differentiation and Cantonese-first feel.
3. **Ancient China flagship** third: prove Chinese cultural content and another strong parent-facing story.
4. **Seven simpler stories** after the flagship template is stable: Silk Road, Terracotta Army, Greek Olympics, Roman Roads, Viking Ships, Leonardo's Workshop, Moon Landing.
