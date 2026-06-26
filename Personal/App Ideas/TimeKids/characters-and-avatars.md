---
type: character-roster
project: TimeKids
status: private-beta-plan
date: 2026-06-25
tags:
  - app-idea
  - characters
  - avatars
  - edtech
---

# TimeKids — Characters and AI Avatars

## Character architecture

TimeKids uses **one recurring non-human mascot** who travels through story worlds and meets **local side characters**.

This keeps the experience familiar for young children while giving each story its own cultural flavor.

## Main mascot

| Attribute | Direction |
|---|---|
| Working name | Timi |
| Role | Recurring bilingual time-travel friend |
| Type | Simple hamster-style mascot |
| Personality | Warm, curious, playful, gentle, never teacher-like |
| Visual anchor | Rounded hamster-like body, big expressive eyes, tiny paws, soft ears, small glowing time badge or compass |
| Voice | Cantonese-first, gentle and bright; English toggle keeps same personality |
| Job in lesson | Greets child, sets up the story, introduces local side character, guides chat, quiz, and reward |
| Home base | Timi's hamster house/playground, used as the story navigation hub |

## Visual references

### Mascot exploration reference v1

The selected direction is the right-hand hamster/cloud-like mascot.

![[assets/timi-mascot-exploration-reference-v1.png]]

### Timi hamster turnaround v1

![[assets/timi-hamster-turnaround-v1.png]]

## Interaction model

Timi is the main guide and main AI chat avatar.

During each story:

1. Timi welcomes the child and opens the time-travel scene.
2. Timi introduces the local side character.
3. Timi narrates short story beats.
4. The local side character adds short, scripted lines or reactions.
5. Timi pauses for child interaction moments in the middle of the story.
6. The child responds through picture choices first, with optional voice/text.
7. Timi reacts warmly and continues.
8. After the story, Timi carries the bounded chat and leads into the quiz/reward.

This makes the story interactive throughout, not just a passive narration followed by a quiz.

## Flagship story structure

Each flagship story should use:

1. 4–5 short story scenes.
2. 2 mid-story interaction moments.
3. 1 post-story chat with 2–3 turns.
4. 3 tap-the-picture quiz questions.
5. 1 reward/sticker moment.

Avoid interaction on every scene. For ages 4–6, too many prompts can interrupt the story and increase production cost.

## Simpler story structure

Each simpler non-flagship story should use:

1. 3 short scenes.
2. 1 mid-story tap interaction.
3. 1–2 scripted local side-character lines.
4. No live/freeform chat.
5. 2 tap-the-picture quiz questions.
6. 1 reward/sticker moment.

Timi still narrates and reacts, so the story feels complete even without live chat.

## Why hamster-style

- A hamster-like mascot is cute, simple, and easy to reuse as a logo, app icon, sticker, loading state, and avatar.
- It avoids the ambiguity and identity issues of a human child mascot.
- It gives the app a natural home metaphor: Timi's hamster house/playground.
- A rounded non-human shape can stay consistent across Cantonese and English.
- It can still act like a warm guide without pretending to be a real historical figure.

## Home hub

Timi's home screen should be a hamster house/playground where children tap visual objects to enter stories.

See [[home-hub]].

## Launch side characters

| Story | Local side character | Role |
|---|---|---|
| Ancient Egypt | Nila | Young Nile helper who shows pyramids, boats, animals, and daily life |
| Ancient China | A-Yu | Little inventor who introduces paper, lanterns, kites, and the Great Wall |
| Silk Road | Lina | Map messenger who carries stories, fabric, spices, and friendly greetings between places |
| Terracotta Army | Tao | Clay helper/museum friend who explains clay soldiers and archaeology safely |
| Greek Olympics | Theo | Games coach focused on running, jumping, teamwork, and celebration |
| Roman Roads | Rosa | Road-builder apprentice who shows roads, arches, bridges, and travel |
| Viking Ships | Freya | Star navigator who explains boats, stars, sea travel, and courage |
| Leonardo's Workshop | Leo | Workshop apprentice inspired by Renaissance invention and art, not Leonardo himself |
| Moon Landing | Nova | Space cadet who introduces rockets, teamwork, moon steps, and curiosity |
| Hong Kong Old Harbour | Hei Hei | Local harbour guide showing boats, markets, trams, and old/new Hong Kong |

## Flagship avatar priority

First flagship set:

1. **Timi + Nila** for Ancient Egypt.
2. **Timi + A-Yu** for Ancient China.
3. **Timi + Hei Hei** for Hong Kong Old Harbour.

This gives the private beta a mix of global wonder, Chinese relevance, and local Hong Kong differentiation.

Private beta story and side-character set: [[launch-story-set]].

## Open character decisions

- Should **Timi** stay final after family testing, or be renamed?
- What exact hamster silhouette should Timi use?
- How simple should the app-icon version be versus the animated in-app version?
- What exact visual style should each local side character use?
