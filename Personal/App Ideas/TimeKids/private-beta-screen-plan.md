---
type: product-spec
project: TimeKids
status: locked-draft
date: 2026-06-25
tags:
  - app-idea
  - private-beta
  - screens
  - ux
  - edtech
aliases:
  - TimeKids Private Beta Screen Plan
---

# TimeKids — Private Beta Screen Plan

## Scope decision

The next build target is a **private beta**, not a full paid public launch.

Private beta means enough product for **5-10 Hong Kong bilingual families** to test:

- whether children aged 4-6 can finish the loop mostly by listening and tapping,
- whether Timi feels alive enough to carry the experience,
- whether parents understand the learning value from the report,
- whether Cantonese-first content feels credible.

Do not build these before beta:

- teacher dashboard,
- paywall,
- reward shop,
- full subscription management,
- advanced classroom tools,
- saved child voice memories,
- broad content admin.

## Beta child and parent flow

```text
Language setup
  -> parent consent + child profile
  -> profile picker
  -> Timi hamster house
  -> story preview
  -> time-travel transition
  -> story scene player
  -> mid-story picture interaction
  -> bounded Timi chat
  -> picture quiz
  -> reward claim
  -> time museum
  -> parent gate
  -> parent report dashboard
  -> parent report detail
  -> settings
```

## The 16 screens/states

Build exactly these 16 screens/states for v1 private beta.

| # | Screen/state | Job | Beta acceptance |
|---:|---|---|---|
| 1 | Language + grown-up setup | Let the parent choose Traditional Chinese/Cantonese or English setup and establish that an adult is configuring the app. | Parent can pick language without account/payment friction; child-facing copy follows the selected language. |
| 2 | Parent consent + child profile | Capture minimum consent and a child nickname/avatar/profile. | No child can start until parent consent exists; no unnecessary personal data is requested. |
| 3 | Profile picker | Let the family choose the child profile. | A child can recognize their profile visually; parent can reach settings through a small adult route. |
| 4 | Timi hamster house home hub | Main child home: Timi's illustrated house/playground with 10 story objects. | Story entry is visual and tappable; Ancient Egypt is available first; completed stories decorate the house. |
| 5 | Story preview/start | Show the story title, Timi, local side character, reward, and start action. | Child can start by tapping one obvious visual button; parent can understand the lesson goal from the preview if present. |
| 6 | Time-travel transition | Move from house to story world with Timi. | Works with normal motion and reduced motion; transition is short enough not to block repeat testing. |
| 7 | Story scene player with tappable hotspots | Audio-first story scene with Timi, side character, scene art, replay, and hotspots. | Child can progress with listening and tapping; hotspots are large and visually clear. |
| 8 | Mid-story picture interaction | Observation prompt inside the story, using 2-3 large picture choices. | No reading required; wrong taps get gentle retry; choice is logged to session data. |
| 9 | Bounded Timi chat with picture replies | 2-3 turn post-story chat for flagship stories; picture replies are the reliable path. | Chat never becomes open-ended by default; off-topic replies redirect gently back to picture choices. |
| 10 | Picture quiz | 2-3 picture questions depending on story tier. | Child can answer by tapping images; attempts are recorded without shaming copy. |
| 11 | Reward/sticker claim | Celebrate completion and award one sticker/artifact. | Reward appears reliably offline; animation has reduced-motion fallback. |
| 12 | Time museum/sticker collection | Show earned stickers/artifacts and locked future items. | Parent and child can see what was earned; empty/locked state feels inviting, not punitive. |
| 13 | Parent gate | Keep adult report/settings behind a simple grown-up gate. | Child cannot accidentally access transcript/settings; gate is not a heavy login wall for beta. |
| 14 | Parent report dashboard | Adult overview of recent sessions, completed stories, rewards, and learning signals. | Parent can understand value in under 2 minutes. |
| 15 | Parent report detail: transcript, quiz evidence, learning check | Session detail for one story: summary, transcript, quiz attempts, interests, check-in question. | Report uses supportive, non-diagnostic wording and works without AI summary. |
| 16 | Settings: language, audio, privacy/delete-data basics | Parent controls for language, audio, reduced motion, privacy, and delete-data basics. | Parent can change language/audio, enable reduced motion, and find delete-data/privacy controls. |

## Required embedded states

These are not extra screens. They must appear inside the 16-screen plan above.

| State | Where it appears | Rule |
|---|---|---|
| Loading | Home hub, story scene, report, animation assets | Use short Timi/sparkle loops; do not block the child with text-heavy loading copy. |
| No-key fallback | Chat, parent report detail | Scripted chat and template reports must feel complete without an AI API key. |
| No-internet retry | Home hub, story start, chat/report if server route is unavailable | Keep downloaded/local story loop usable; offer one large retry action for network-only features. |
| Mic/listening | Bounded chat and optional learning check response | Picture replies remain primary; mic denied falls back to tapping. |
| Gentle AI redirect | Bounded chat | Timi redirects off-topic or unsafe replies back to safe story choices; no scolding. |
| Reduced-motion | Transition, scene motion, reward, collection | Replace travel/reward animation with short fades or static sticker reveal. |

## Screen-level build order

1. Build the app shell with screens 1-6 and 13/16.
2. Build Ancient Egypt full child loop across screens 7-12.
3. Build report dashboard/detail across screens 14-15 from real `StorySession` data.
4. Add the other 9 story entries and simpler story loops using the same screen components.
5. Run the fallback/accessibility pass across all embedded states.

## Beta readiness gate

The screen plan is beta-ready only when:

- Ancient Egypt is complete end-to-end,
- all 10 stories appear in the home hub,
- each story has quiz, reward, and parent report seed data,
- every failure state above has a designed fallback,
- a parent can reach report detail after a completed story without developer help.
