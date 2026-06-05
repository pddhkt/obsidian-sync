---
type: marketing-asset-folder
status: ifq-carousel-generated
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

## GPT-image Masters

The built-in GPT-image path was tested again on 2026-06-05 using the new product source image for IFQ-22R. The rate limit cleared and the IFQ-22R IG carousel pass was generated as one master per frame/message.

![[online-marketing/assets/2026-07-go-live-kits/generated-text-v2/exports/ifq22r-v2-ig-carousel-gpt-contact-sheet.jpg]]

| Master | Size | Derived export | QA |
|---|---:|---|---|
| `masters/ifq22r-v2-ig-frame1-hook-gpt.png` | 1092 × 1440 | `exports/ifq22r-v2-ig-frame1-hook-gpt-export.png` | product shape good; text appears readable; formal QA still needed |
| `masters/ifq22r-v2-ig-frame2-vs-fan-gpt.png` | 1003 × 1568 | `exports/ifq22r-v2-ig-frame2-vs-fan-gpt-export.png` | comparison reads clearly; punctuation needs formal QA |
| `masters/ifq22r-v2-ig-frame3-dc-quiet-gpt.png` | 1003 × 1568 | `exports/ifq22r-v2-ig-frame3-dc-quiet-gpt-export.png` | product shape good; text appears close; formal QA still needed |
| `masters/ifq22r-v2-ig-frame4-omnidirectional-gpt.png` | 1003 × 1568 | `exports/ifq22r-v2-ig-frame4-omnidirectional-gpt-export-top.png` | use top crop; center crop has unwanted prop text |
| `masters/ifq22r-v2-ig-frame5-detach-gpt.png` | 1024 × 1536 | `exports/ifq22r-v2-ig-frame5-detach-gpt-export.png` | front grille detached; exactly 3 blades visible; formal QA still needed |
| `masters/ifq22r-v2-ig-frame6-cta-gpt-v2.png` | 1024 × 1536 | `exports/ifq22r-v2-ig-frame6-cta-gpt-v2-export.png` | use v2; v1 crop had unwanted prop text / tight crop |

Draft variants kept for traceability:

- `exports/ifq22r-v2-ig-frame4-omnidirectional-gpt-export.png` — center crop with unwanted prop text.
- `masters/ifq22r-v2-ig-frame6-cta-gpt.png` and its exports — first CTA draft with unwanted prop text / tight top crop.

## V3 Social-Card Exploration

These masters test the more energetic pitch-deck social-card direction using the product-shape candidate workflow. They are not replacements for the v2 carousel until reviewed.

| Master | Size | Derived export | QA |
|---|---:|---|---|
| `masters/ifq22r-v3-social-card-frame5-detach-gpt-test.png` | 1254 × 1254 | none yet | Frame 05 social-card test; text appears exact; exactly 3 exposed blades visible; product is based on `online-marketing/products/ifq-22r/images/generated/ifq-22r-candidate-open-front-v1.png` and needs product-shape review before approval |

## Local Proof Exports

The local `exports/*-local.png` files are deterministic overlays built from the existing clean no-text stills. Keep them as fallback/proof references; do not count them as GPT-image masters.

![[online-marketing/assets/2026-07-go-live-kits/generated-text-v2/exports/text-v2-local-contact-sheet.jpg]]

| Output | Size | Source |
|---|---:|---|
| `ifq22r-v2-ig-frame1-hook-local.png` | 1080 × 1350 | `../generated/ifq22r-ig-frame1-hook.png` |
| `ifq22r-v2-ig-frame1-hook-gpt-export.png` | 1080 × 1350 | `../generated-text-v2/masters/ifq22r-v2-ig-frame1-hook-gpt.png` |
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
