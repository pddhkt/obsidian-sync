---
type: design-test
project: TimeKids
status: draft
date: 2026-06-25
tags:
  - app-idea
  - lottie
  - motion-design
  - prototype
  - timi
---

# TimeKids Lottie Prototype — Timi Idle Loop

This folder is a small Lottie test for Timi's mascot motion.

## Files

- `timi-idle-loop.lottie.json` — hand-built Lottie JSON prototype.
- `timi-idle-loop-data.js` — inline JS version so `preview.html` works when opened directly.
- `timi-reference-art-loop.lottie.json` — image-layer Lottie using the actual generated Timi art.
- `timi-reference-art-loop-data.js` — inline JS version of the reference-art Lottie.
- `timi-reference-cutout.png` — quick crop from the selected GPT-generated Timi reference.
- `lottie.min.js` — local `lottie-web` runtime so the preview can open directly without CDN loading.
- `preview.html` — browser preview using local `lottie-web`.
- `preview-screenshot.png` — rendered screenshot captured with Playwright/Chromium.

## Rendered preview

![[Personal/App Ideas/TimeKids/design-research/lottie-prototype/preview-screenshot.png]]

## How to preview

The preview now works when opened directly as a local HTML file.

If the browser blocks local scripts for any reason, serve it locally from this folder:

```bash
python -m http.server 4177
```

Then open:

```text
http://localhost:4177/preview.html
```

## What this tests

- Actual Timi reference art animated as an image-layer Lottie.
- Hand-built vector Timi as a technical rig test.
- Idle breathing/bobbing.
- Blink timing on the technical rig.
- Small badge sparkle.
- Whether Lottie can give enough "alive" feeling for lightweight mascot loops.

## Motion-design skill notes

The installed LottieFiles `motion-design` skill is a motion-quality guide, not a full asset generator.
For this prototype, the relevant rules are:

- Playful personality.
- 150-300ms for small interaction feedback.
- 3000-5000ms for ambient floating/breathing loops.
- Primary + secondary + ambient layers.
- Transform/opacity animation only where possible.

## Early judgement

Lottie is good enough for:

- idle loops,
- loading/sparkle/reward animations,
- simple scene stickers,
- quick static-to-animated experiments.

Lottie is not as good as Rive for:

- app-driven Timi state machine,
- live talking mouth states,
- complex child interaction states,
- reusable character rig logic across many scenes.

Recommended v1 position:

> Keep Rive as the first choice for Timi's main interactive mascot, but use Lottie/dotLottie as a cheaper parallel test for reward loops, sticker bursts, and possible fallback mascot states.

## Layer-by-layer production note

Yes, final Timi should be created layer by layer.

The actual production source should separate body, ears, eyes, eyelids, mouth shapes, paws, scarf, badge, and shadow. Then Rive or Lottie can animate those parts while preserving the real Timi art quality.

See [[Personal/App Ideas/TimeKids/timi-layered-animation-plan|TimeKids — Timi Layered Animation Plan]].
