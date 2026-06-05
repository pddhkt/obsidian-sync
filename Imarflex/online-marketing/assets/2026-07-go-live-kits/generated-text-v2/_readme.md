---
type: marketing-asset-folder
status: proof-ready
area: online-marketing
campaigns:
  - IFQ-22R
  - ICF-140R
asset-policy: master-first
tags:
  - online-marketing
  - assets
  - gpt-image
  - text-in-image
---

# Generated Text V2 Assets

This folder is for the July 2026 text-in-image social poster pass.

Prompt register: [[online-marketing/sales-content/go-live-kits/text-overlay-prompts-2026-07]]

## Folder Rules

| Folder | Meaning |
|---|---|
| `masters/` | GPT-image outputs. One file per unique scene + exact message. |
| `exports/` | Local crop/resize/layout exports derived from a master. |

Do not regenerate the same scene only to change crop or size. Use a master image and export variants locally unless the text, pose, product angle, or message hierarchy changes.

## Current V2 Scope

- Generate social text posters only.
- Do not regenerate blog hero / inline duplicates in this pass.
- Keep existing no-text blog assets in `../generated/` unless a future layout specifically requires a text-in-image blog variant.

## Local Proof Exports

The current `exports/` files are deterministic local overlays built from the existing clean no-text stills while GPT-image generation is rate-limited.

![[online-marketing/assets/2026-07-go-live-kits/generated-text-v2/exports/text-v2-local-contact-sheet.jpg]]

| Output | Size | Source |
|---|---:|---|
| `ifq22r-v2-ig-frame1-hook-local.png` | 1080 × 1350 | `../generated/ifq22r-ig-frame1-hook.png` |
| `ifq22r-v2-ig-frame2-vs-fan-local.png` | 1080 × 1350 | `../generated/ifq22r-ig-frame2-vs-fan.png` |
| `ifq22r-v2-ig-frame3-dc-quiet-local.png` | 1080 × 1350 | `../generated/ifq22r-ig-frame3-dc-quiet.png` |
| `ifq22r-v2-ig-frame4-omnidirectional-local.png` | 1080 × 1350 | `../generated/ifq22r-ig-frame4-omnidirectional.png` |
| `ifq22r-v2-ig-frame5-detach-local.png` | 1080 × 1350 | `../generated/ifq22r-ig-frame5-detach.png` |
| `ifq22r-v2-ig-frame6-cta-local.png` | 1080 × 1350 | `../generated/ifq22r-ig-frame6-cta.png` |
| `ifq22r-v2-fb-lifestyle-local.png` | 1080 × 1350 | `../generated/ifq22r-fb-lifestyle.png` |
| `ifq22r-v2-story-detach-local.png` | 1080 × 1920 | `../generated/ifq22r-story-detach.png` |
| `icf140r-v2-ig-frame1-hook-local.png` | 1080 × 1350 | `../generated/icf140r-ig-frame1-hook.png` |
| `icf140r-v2-ig-frame2-principle-local.png` | 1080 × 1350 | `../generated/icf140r-ig-frame2-principle.png` |
| `icf140r-v2-ig-frame3-checklist-local.png` | 1080 × 1350 | `../generated/icf140r-ig-frame3-checklist.png` |
| `icf140r-v2-ig-frame4-range-spec-local.png` | 1080 × 1350 | `../generated/icf140r-ig-frame4-range-spec.png` |
| `icf140r-v2-ig-frame5-cta-local.png` | 1080 × 1350 | `../generated/icf140r-ig-frame5-cta.png` |
| `icf140r-v2-fb-hero-local.png` | 1200 × 628 | `../generated/icf140r-fb-hero.png` |
| `icf140r-v2-story-9x16-local.png` | 1080 × 1920 | `../generated/icf140r-story-9x16.png` |

Build command:

```bash
bash online-marketing/assets/2026-07-go-live-kits/generated-text-v2/build-local-overlays.sh
```

## QA

- Text must match the prompt exactly.
- IFQ-22R visible blade scenes must show exactly 3 fan blades.
- ICF-140R scenes must stay local / ventilated / personal-zone, not sealed-room aircon replacement.
- No fake logos, fake model text, fake prices, fake URLs, QR codes, or random extra words.
