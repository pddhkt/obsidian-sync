---
type: image-generation-qa
status: rate-limited
sku: IFQ-22R
date: 2026-06-05
tags:
  - online-marketing
  - products
  - IFQ-22R
  - image-generation
  - product-qa
---

# IFQ-22R Pose Calibration Test

## Purpose

Generate a small pose-calibration sheet before full carousel generation. The goal is to test whether GPT-image can preserve IFQ-22R geometry when the product appears from front, rear-side, detach/open-front, and parts-layout views.

Use this before spending attempts on full Instagram carousel frames.

## Current Status

| Attempt | Date | Result | Notes |
|---|---:|---|---|
| v1 | 2026-06-05 | Rate-limited | Built-in GPT-image returned `TooManyRequests` before an image was produced. |
| v2 | 2026-06-05 | Rate-limited | Retry with visible product references and saved calibration prompt also returned `TooManyRequests`. |

## Scene-To-Reference Matrix

| Tile | Purpose | Required View | Required Parts | Available References | Missing References | Drift Risk | Safer Composition |
|---|---|---|---|---|---|---|---|
| 01 | Front-safe assembled view | Front / slight 3/4 | Full body, front grille, base, wood-tone supports | `images/source/IFQ-22R.png` | None for front-safe view | Low | Keep mostly front-facing |
| 02 | Rear-side assembled approximation | Rear-side | Rear body, yoke, wood-tone supports, base | `images/source/ifq-22r-part-body-rear-side.jpg`, `images/reference/ifq-22r-ref-body-rear-side-gpt-upscaled.png` | True assembled rear/side product photo | Medium | Keep as cautious rear-side approximation |
| 03 | Detach/open-front test | Open front / front grille detached | Body, detached grille, exposed 3-blade fan blade | `images/source/IFQ-22R.png`, `images/source/ifq-22r-part-fan-blade-3pp.jpg`, `images/reference/ifq-22r-ref-fan-blade-3pp-gpt-upscaled.png`, `images/source/ifq-22r-part-rear-grille.jpg` | True open-front assembled photo | Medium-high | Show parts cleanly, avoid complex hand interaction |
| 04 | Part truth still life | Parts layout | Fan blade, rear grille, rear-side body module | All standalone part references | None for parts-only layout | Low-medium | Keep as reference board, not final ad |

## Prompt: v1 Pose Calibration Sheet

```text
Use case: ads-marketing / product-reference calibration.
Asset type: IFQ-22R product pose calibration sheet for later Instagram carousel generation. Square 1:1 master, clean high-resolution bitmap.

Primary request:
Create a single square visual board with 4 controlled product pose tiles for the Imarflex IFQ-22R air circulator, using the product reference images visible in this conversation as the source of truth. This is NOT a final ad; it is a product-geometry calibration sheet for judging whether later carousel frames can be generated accurately.

Input images and roles:
- Assembled IFQ-22R front hero reference: source of truth for front silhouette, spiral/radial white grille, wood-tone circular center cap, two vertical wood-tone support arms, rounded white oval base, pale grey inner yoke, button layout, and compact round circulator proportions.
- Upscaled 3-blade fan blade reference: source of truth for exposed fan blade. Any exposed fan blade must show exactly 3 broad white PP blades, not 4, not 5.
- Upscaled rear grille reference: source of truth for rear grille/rib geometry and rear mounting panel details.
- Upscaled body rear-side reference: source of truth for rear-side body casing, yoke/bracket depth, wood-tone support loop/arms, rounded base, shaft, and rear panel geometry.
- Pitch-deck social carousel examples: style direction only: square social-card system, Heritage Blue accents, paper/photo-card layout. Do not copy their product.

Board composition:
A warm Rice White background with a subtle paper texture. Four neat photo-card tiles arranged 2x2, each tile with a thin white border and soft natural shadow. Use small Heritage Blue corner marks and tiny labels only: "01", "02", "03", "04". Do not add any other text.

Tile 01: front-safe assembled view.
Show the IFQ-22R mostly front-facing, slightly 3/4, matching the assembled hero: white compact round spiral grille, wood-tone center cap, two wood-tone support arms, rounded white oval base, dark IR receiver slot on base, pale grey yoke behind the head.

Tile 02: rear-side assembled approximation.
Show a cautious rear-side view based on the rear-side body reference: white rear casing with vents/panel geometry, pale grey yoke/bracket, wood-tone support loop/arms, rounded white oval base. Keep it conservative; do not invent dramatic hidden geometry.

Tile 03: detach/open-front test.
Show the front grille removed and placed beside the body. The fan body remains on the base with the exposed fan blade visible. The exposed fan blade must show exactly 3 broad white blades. The detached grille should be round white plastic, clean, and believable. Keep parts aligned and not broken.

Tile 04: part truth still life.
Show separate clean product parts on a neutral surface: the 3-blade white fan blade, the rear grille/housing, and the body rear-side module. Make the parts match the references, not generic fan parts.

Product truth constraints:
- IFQ-22R is a white compact round-grille air circulator, not a pedestal fan and not a generic table fan.
- Front grille has curved spiral/radial white ribs.
- Center cap is circular wood-tone on assembled front view.
- Exactly two vertical wood-tone support arms / loop supports hold the fan head.
- Rounded white oval base with small touch buttons and a dark IR receiver slot.
- Exposed blade scenes must show exactly 3 broad white blades.
- Rear/side geometry must be cautious and reference-based.

Style:
Designed product reference board with subtle pitch-deck social-card energy: Heritage Blue accents, clean square feed-card discipline, warm practical Imarflex tone, premium but not luxury. Product should remain the focus.

Avoid:
Misspelled text, extra labels, fake Chinese, fake English, fake model text, fake URL, fake QR code, fake price, extra logos, random badges, random measurements, 4-blade fan, 5-blade fan, extra blades, black fan body, metal pedestal stand, wrong base shape, wrong wood supports, distorted grille, broken parts, excessive lifestyle props, dark dramatic lighting, stock-photo clutter.
```

## Decision Rule

If Tile 02 or Tile 03 drifts too far from the reference pack, generate the real carousel with front-safe or parts-only compositions until the client provides:

- True assembled left/right side view.
- True assembled rear view.
- Front grille removed while blade remains installed.
- Detached front grille beside the assembled body.
