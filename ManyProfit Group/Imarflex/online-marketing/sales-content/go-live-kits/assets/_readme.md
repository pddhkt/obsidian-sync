---
type: marketing-asset-folder
status: draft
area: online-marketing
campaigns:
  - IFQ-22R
  - ICF-140R
tags:
  - online-marketing
  - assets
  - go-live-kit
---

# 2026-07 Go-Live Kit Assets

Assets for the two demo go-live content kits:

- [[online-marketing/sales-content/go-live-kits/2026-06-ifq-22r-circulator-buying-guide|IFQ-22R 循環扇]]
- [[online-marketing/sales-content/go-live-kits/2026-06-icf-140r-cooler-trust|ICF-140R 冷風機]]
- Tracker: [[online-marketing/sales-content/go-live-kits/production-tracker-2026-07]]

> [!note] Storage convention
> Campaign-specific generated images live here, with the campaign. Product-level approved SKU photos / spec-card source images live in `online-marketing/products/<sku>/images/` — link to them, don't copy.

## Status

| Area | Status | Notes |
|---|---|---|
| Product references | ✅ saved | Scraped Shopline/PDP reference images in `reference/` |
| Generated stills | ✅ 21 / 21 | Saved in `generated/` |
| Text-in-image v2 | ✅ GPT draft masters / ☐ formal QA | Master-first social poster pass in `generated-text-v2/`, including IFQ feature-card and ICF feature-card drafts |
| Reel b-roll | ☐ 0 / 2 | Needs real footage or AI-video workflow, not single still generation |
| Human QA | ☐ | Contact-sheet check done only; client/SKU approval still needed |
| Layout placement | ☐ | CMS / IG / FB layouts not assembled yet |

## Contact Sheets

![[online-marketing/sales-content/go-live-kits/assets/generated/ifq22r-contact-sheet.jpg]]

![[online-marketing/sales-content/go-live-kits/assets/generated/icf140r-contact-sheet.jpg]]

## Reference Contact Sheet

![[online-marketing/sales-content/go-live-kits/assets/reference/reference-contact-sheet.jpg]]

## Folder Structure

| Folder | Purpose |
|---|---|
| `reference/` | Downloaded product reference images from the scraped migration catalog |
| `generated/` | Generated still images named to match the production tracker |
| `generated-text-v2/masters/` | GPT-image text-in-image masters, one per unique scene + exact message |
| `generated-text-v2/exports/` | Local crop/resize exports derived from v2 masters |

## QA Notes

- All generated stills avoid readable AI-generated text; add copy, prices, model labels, and CTA overlays during layout.
- IFQ-22R stills were generated against the real reference silhouette: round white grille, wood supports, white circular base.
- ICF-140R stills were generated against the real reference silhouette: slim white tower cooler, dark front grille, blue accents, caster wheels.
- Formal QA should still check: real SKU accuracy, no fake logo/model text, no extra fan blades, no misleading cooling claims, and ICF visuals staying in the "local/personal-zone" positioning.
- Text-in-image v2 should use a master-first rule: generate once per unique scene + exact message, then derive channel crops locally when only size changes.
