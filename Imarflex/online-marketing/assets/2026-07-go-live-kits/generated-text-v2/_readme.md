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

### IFQ-22R FB + Story Masters

Generated 2026-06-06 via `gpt_image_2` (text-in-image), replacing the earlier local-proof-only status. Both passed text QA.

| Master | Size | Channel | QA |
|---|---:|---|---|
| `masters/ifq22r-v2-fb-lifestyle-gpt.png` | 1744 × 2336 | Facebook (3:4 nearest enum to 4:5) | Text exact (`淨係涼一邊？` / `問題係空氣冇對流`, Cantonese 冇 correct); product truth good; front grille on |
| `masters/ifq22r-v2-story-detach-gpt.png` | 1520 × 2688 | Story 9:16 | Text exact (`IFQ-22R` / `DC 靜音 + 全方位 + 易拆前網罩`); mid-detach with hand; exactly 3 blades visible; clean Story-UI space |

## V4 Lifestyle-Rich Story (current chosen direction)

**Superseded V3 on 2026-06-06.** The v3 paper-collage set was judged to lack excitement and information versus the approved pitch-deck carousels (`imarflex pitch deck/assets/social-carousel-fan-*`). V4 restores the pitch-deck direction — real bright HK home scenes, airflow visualised through the room, an isometric 3-use cutaway, verified spec chips, CTA buttons, and a cool airy summer palette — while keeping the big Heritage Blue frame number and exact zh-HK copy. Full 6-frame set + reproducible prompts: [`masters/ifq22r-v4-lifestyle-rich/`](masters/ifq22r-v4-lifestyle-rich/_readme.md) (square 1:1, frames 01–06, `gpt_image_2` via Higgsfield with the IFQ-22R product reference, all text QA-passed). **This is now the IFQ-22R carousel look.**

## V3 Social-Card Exploration (retired)

**Retired 2026-06-06 — replaced by V4 above; kept for traceability.** The paper-collage social-card style was briefly the IFQ-22R carousel look. The full 6-frame story is in [`masters/ifq22r-v3-social-card/`](masters/ifq22r-v3-social-card/_readme.md) (square 1:1, frames 01–06, all text QA-passed). New rule: one set = one subfolder, so different-date/style passes no longer share the flat `masters/` dump.

The single-frame masters below were the earlier exploration that led to that choice. The `bold-diagram` alternate was not chosen.

| Master | Size | Derived export | QA |
|---|---:|---|---|
| `masters/ifq22r-v3-social-card-frame5-detach-gpt-test.png` | 1254 × 1254 | none yet | Frame 05 social-card test; text appears exact; exactly 3 exposed blades visible; product is based on `online-marketing/products/ifq-22r/images/generated/ifq-22r-candidate-open-front-v1.png` and needs product-shape review before approval |
| `masters/ifq22r-v3-bold-diagram-frame5-detach-gpt-test.png` | 1254 × 1254 | none yet | Frame 05 bold diagram-card alternate; text appears exact; exactly 3 exposed blades visible; stronger blue panel and step/callout structure; product is based on the synthetic open-front candidate and needs product-shape review before approval |

### Alternate Style: Bold Diagram Card

Status: generated on 2026-06-06 as `masters/ifq22r-v3-bold-diagram-frame5-detach-gpt-test.png`.

```text
Use case: ads-marketing.
Asset type: IFQ-22R Instagram carousel Frame 05 alternative style test, square 1:1 master.

Use the visible images as references:
- IFQ-22R open-front candidate: product module reference for detached front grille, open front, exactly 3 broad white blades, two wood-tone support arms, rounded white oval base.
- IFQ-22R assembled front source: product truth for the spiral/radial grille, wood-tone center cap style, white casing, wood-tone support arms, pale grey yoke, rounded base, and dark IR receiver slot.
- Imarflex pitch-deck carousel examples: broad social-card family style only.
- Previous Frame 05 social-card test: contrast reference. Create a different style from it: less scrapbook/tape, less soft paper collage, more bold diagram/instruction card.

Primary request:
Create a square 1:1 Instagram carousel social card for Imarflex IFQ-22R in a BOLD DIAGRAM CARD style. It should feel like a clear saveable maintenance diagram, not a calm poster and not the same paper-collage layout as the previous test.

Exact text to render, and no other words:
Large frame number: "05"
Headline line 1: "前網罩快拆"
Supporting line 2: "前網罩拆得出易抹"

Composition direction:
Use a strong graphic template with a large Heritage Blue vertical panel or corner block, a crisp white technical-card area, and a clear product demonstration zone. Put the large "05" in Heritage Blue in the upper-left or inside the blue panel. Put the bold Traditional Chinese headline in high-contrast Soft Charcoal on a clean white area. Use the product as a structured demo: IFQ-22R open front on the right, detached grille separated on the left or bottom-left, with thin blue callout arrows connecting grille -> open body -> towel/cleaning icon. Add 2-3 simple circular icon chips without extra words, a small step-like visual rhythm using numbers or dots only, and a light dotted grid. Use fewer decorative torn-paper/tape elements than the previous version; this should look more diagrammatic, modern, and high-impact.

Product truth:
- IFQ-22R is a compact white round-grille air circulator, not a pedestal fan and not a generic table fan.
- Open front must remain round and aligned with the fan head.
- Exposed blade must show exactly 3 broad white PP blades, not 4, not 5.
- Detached front grille must be round white plastic with spiral/radial ribs matching the source product.
- Two vertical wood-tone support arms remain attached to the body/base.
- Rounded white oval base remains visible, with small touch buttons and dark IR receiver slot.
- Pale grey yoke/bracket behind the fan head remains plausible.

Style:
Bold diagram-card social layout: Heritage Blue blocks and rules, clean white product card, technical callout lines, icon chips, sharp hierarchy, strong contrast, still warm and practical. Use Rice White, Heritage Blue, Soft Charcoal, very light Cool Air blue, and small Clay Beige accents only if needed. The result should feel more graphic and instructional than the previous paper-collage test.

Avoid:
Wrong Chinese text, misspelled Traditional Chinese, extra text, extra English, fake labels, fake model text, fake price, fake URL, fake QR code, fake warranty badges, 4-blade fan, 5-blade fan, extra blades, broken grille, jagged plastic, missing wood supports, pedestal stand, wrong base shape, generic fan parts, dirty repair scene, hand interaction, copying text from the style references, repeating the exact layout of the previous Frame 05 test.
```

### Pending Alternate Style: Pop-Out Teardown Social Card

Status: rate-limited on 2026-06-06. Retry when GPT-image quota is available.

```text
Use case: ads-marketing.
Asset type: IFQ-22R Instagram carousel Frame 05 style exploration, square 1:1 master.

Use the visible images as references:
- IFQ-22R open-front candidate: primary product module reference for the detached front grille, open front, exactly 3 broad white blades, two wood-tone support arms, rounded white oval base, and dark IR receiver slot.
- IFQ-22R assembled front source: product truth for the round white spiral/radial grille, white casing, wood-tone support arms, pale grey yoke, rounded white base, and front grille shape.
- Existing paper-collage Frame 05 and bold diagram-card Frame 05: contrast references only. Create a third distinct layout, not a repeat.
- Imarflex pitch-deck carousel examples: broad social-card family style only: big number, strong blue anchors, product/photo modules, callouts, dotted grids, light collage energy.

Primary request:
Create a square 1:1 Instagram carousel social card for Imarflex IFQ-22R in a POP-OUT TEARDOWN SOCIAL CARD style. It should feel more exciting and campaign-ready than a calm poster: a graphic product demo card with cutout depth, layered panels, a dramatic product/photo module, and energetic but clean social-carousel hierarchy.

Exact text to render, and no other words:
Large frame number: "05"
Headline line 1: "前網罩快拆"
Supporting line 2: "前網罩拆得出易抹"

Composition direction:
Make the product feel like it is popping out from a clean white/cream product card. Put the large "05" in a Heritage Blue corner badge or oversized cropped number block. Put the headline in bold Traditional Chinese, large and readable, with the supporting line below it. Use the IFQ-22R open-front body as the main hero on the right or lower-right, front-facing to slight three-quarter only. Place the detached round front grille as a separate floating/cutout part on the left or lower-left, slightly overlapping a light Clay Beige paper/photo panel. Add a small folded towel prop or cleaning sparkle icon, but keep it secondary. Use 2-3 blue callout dots/lines pointing at the open front, the detached grille, and the towel/cleaning cue. Include subtle Cool Air blue swoosh ribbons, dotted grid micro-patterns, and one or two angled paper-card layers. The layout should be more dynamic and dimensional than the bold diagram version, but still clean, readable, and saveable.

Product truth:
- IFQ-22R is a compact white round-grille air circulator, not a pedestal fan and not a generic desk fan.
- Open fan head must remain round, white, and aligned with the body.
- Exposed blade must show exactly 3 broad white PP blades, not 4, not 5.
- Detached front grille must be round white plastic with spiral/radial ribs matching the source product.
- Two vertical wood-tone support arms must remain attached to the body/base.
- Rounded white oval base remains visible with small touch buttons and a dark IR receiver slot.
- Pale grey rear yoke/bracket behind the fan head remains plausible.
- Keep the product mostly front-facing because side/back references are limited.

Style:
Pitch-deck social-card energy, pop-out product teardown, warm practical appliance campaign. Palette: Heritage Blue `#1E4B7A`, Rice White `#F7F6F2`, Soft Charcoal `#3C3F42`, Cool Air `#BFD7E6`, small Clay Beige `#E7D7C1` accents. Use clean printed sans-serif typography, strong hierarchy, and crisp poster graphics.

Avoid:
Wrong Chinese text, misspelled Traditional Chinese, extra text, extra English, fake labels, fake model text, fake price, fake URL, fake QR code, fake warranty badge, copied text from references, 4-blade fan, 5-blade fan, extra blades, broken grille, jagged plastic, missing wood supports, pedestal stand, wrong base shape, generic fan parts, dirty repair scene, hand interaction, repeating the exact previous paper-collage layout, repeating the exact bold blue vertical-panel diagram layout.
```

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
