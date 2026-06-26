---
type: production-plan
project: TimeKids
status: private-beta-plan
date: 2026-06-25
tags:
  - app-idea
  - timi
  - animation
  - lottie
  - rive
  - production
---

# TimeKids — Timi Layered Animation Plan

## Decision

Final Timi animation should be created from **layered source art**, not from one flat generated image and not from hand-coded vector shapes.

The current Lottie prototype proves the technical path, but the visual target is the GPT-generated Timi reference.

## Recommended layer set

Minimum practical layer set:

- body base,
- left ear,
- right ear,
- ear inner shapes,
- face cream patches,
- left eye,
- right eye,
- pupils / highlights,
- blink eyelids,
- mouth closed,
- mouth open / talking shape,
- cheek blush,
- left paw,
- right paw,
- feet,
- scarf band,
- scarf tail,
- badge / star,
- tail if visible,
- soft shadow.

## Why this matters

Layered art allows:

- blinking without redrawing the whole mascot,
- mouth/talking states,
- happy jumps and squash/stretch,
- waving paw animation,
- scarf and badge secondary motion,
- reuse across story scenes,
- export to either Rive or Lottie.

## Tool direction

Best v1 route:

1. Generate or draw a clean front-facing Timi reference.
2. Recreate/clean it as layered vector or high-resolution layered raster art.
3. Rig Timi in Rive for app-driven states:
   - idle,
   - blink,
   - talking,
   - listening,
   - happy,
   - thinking,
   - wave.
4. Export simple non-interactive loops to Lottie/dotLottie where useful:
   - reward sticker,
   - loading sparkle,
   - badge pop,
   - simple idle fallback.

## Private beta motion rule

For private beta:

- Rive owns Timi's stateful app-driven states: idle, blink, talking, listening, happy, thinking, wave.
- Lottie/dotLottie owns one-off delight: loading sparkles, sticker bursts, badge pops, fallback loops.
- Sprite sheets are acceptable for Timi if Rive and Lottie both slow the production schedule.
- Every state must have a reduced-motion fallback.

The app-facing contract is documented in [[implementation-contracts]].

## Lottie-specific note

Lottie can absolutely be created layer by layer if the source comes from After Effects, Figma/LottieFiles workflows, or another proper exporter.

Avoid hand-writing production Lottie JSON. It is useful for a spike, but it is too brittle for final mascot quality.

## Current prototype

See [[Personal/App Ideas/TimeKids/design-research/lottie-prototype/README|TimeKids Lottie Prototype — Timi Idle Loop]].
