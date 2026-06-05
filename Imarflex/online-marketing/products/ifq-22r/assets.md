---
type: product-assets
status: draft
sku: IFQ-22R
tags:
  - online-marketing
  - products
  - assets
  - IFQ-22R
---

# IFQ-22R Assets

## Product-Level Folders

| Folder | Use |
|---|---|
| `images/source/` | Official PDP/spec-card images. |
| `images/reference/` | Approved product reference photos for prompt/QA. |
| `images/generated/` | Reusable product images not tied to one campaign. |
| `images/qa/` | Contact sheets and visual QA evidence. |

## Source Images

| File | Use | Notes |
|---|---|---|
| `images/source/IFQ-22R.png` | assembled hero/reference | front 3/4 product view; good for front silhouette, grille, base, support arms |
| `images/source/1778642026731.jpg` | POP/spec card | printed source for product copy/spec checks |
| `images/source/IFQ-22R_POP_R.pdf` | POP/spec PDF | source document |
| `images/source/ifq-22r-part-fan-blade-3pp.jpg` | blade reference | standalone 3-blade fan blade; use for detach/open-front scenes |
| `images/source/ifq-22r-part-rear-grille.jpg` | rear grille reference | standalone rear grille / rear housing geometry reference |
| `images/source/ifq-22r-part-body-rear-side.jpg` | body rear-side reference | rear-side body, yoke, base, support-arm geometry reference |

## Reference Images

GPT-image upscaled references are clarity aids for later generation. Use the original source images above as the geometry truth, then use these files to help GPT-image read small part details more clearly.

| File | Use | Notes |
|---|---|---|
| `images/reference/ifq-22r-ref-fan-blade-3pp-gpt-upscaled.png` | GPT-image upscaled blade reference | cleaner standalone 3-blade fan blade; cross-check blade count and hub shape against source |
| `images/reference/ifq-22r-ref-rear-grille-gpt-upscaled.png` | GPT-image upscaled rear grille reference | cleaner rear grille / rear housing reference; cross-check bracket and rib layout against source |
| `images/reference/ifq-22r-ref-body-rear-side-gpt-upscaled.png` | GPT-image upscaled body rear-side reference | cleaner rear-side body, yoke, base, and support-arm reference; use for side/back prompts with source cross-check |
| `images/reference/ifq-22r-part-body-rear-side-upscaled-2x.png` | upscaled body rear-side reference | existing 2x upscaled support file; keep as secondary reference |

## Current Linked Campaign References

Do not copy these unless they become approved evergreen product references.

![[online-marketing/assets/2026-07-go-live-kits/reference/ifq22r-hero-original.jpg|300]]
![[online-marketing/assets/2026-07-go-live-kits/reference/ifq22r-gallery-01.jpg|300]]

## Current Campaign Generated Images

- Reference folder: `online-marketing/assets/2026-07-go-live-kits/reference/`
- First-pass generated stills: `online-marketing/assets/2026-07-go-live-kits/generated/`
- Text v2 local proofs: `online-marketing/assets/2026-07-go-live-kits/generated-text-v2/exports/`

## QA Notes

- `images/qa/ifq-22r-product-shape-reconstruction-prompts-2026-06-05.md` - upstream prompt pack for generating candidate missing product angles/parts before carousel production.
- `images/qa/ifq-22r-pose-calibration-2026-06-05.md` - pose-calibration prompt and scene-to-reference matrix for testing front, rear-side, detach/open-front, and parts-layout generation before full carousel production.
- `images/qa/ifq-22r-external-model-prompt-handoff-2026-06-05.md` - external-model prompt pack with required reference images for pose calibration and six pitch-deck-style carousel frames.

## QA Reminders

- Product should remain white with wood-tone supports and rounded white base.
- Exposed blades must show exactly 3 blades.
- No fake logo/model/spec text.
