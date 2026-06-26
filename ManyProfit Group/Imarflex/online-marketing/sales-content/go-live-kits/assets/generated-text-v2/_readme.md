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

Illustration asset guideline: [[online-marketing/sales-content/go-live-kits/assets/generated-text-v2/illustration-asset-guidelines]]

Reusable asset system: [[online-marketing/sales-content/go-live-kits/assets/generated-text-v2/asset-system/_index]]

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

![[online-marketing/sales-content/go-live-kits/assets/generated-text-v2/exports/ifq22r-v2-ig-carousel-gpt-contact-sheet.jpg]]

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

### Feature Summary Card Drafts

Generated 2026-06-10 as first-pass text-in-image cards for the client request: one frame showing the core product features. These are draft assets, not QA-approved final posts.

| Master | Size | Derived export | QA |
|---|---:|---|---|
| `masters/feature-summary-cards/ifq22r-feature-summary-card-v1-raw.png` | 1003 x 1568 | `exports/ifq22r-feature-summary-card-v1-4x5.png` | Product silhouette good; no phone number / price / QR / fake URL observed; exact text QA still needed |
| `masters/feature-summary-cards/icf140r-feature-summary-card-v1-raw.png` | 1024 x 1536 | `exports/icf140r-feature-summary-card-v1-4x5.png` | Product silhouette good; personal-zone framing acceptable; no phone number / price / QR / fake URL observed; exact text QA still needed |

### IFQ-22R FB + Story Masters

Generated 2026-06-06 via `gpt_image_2` (text-in-image), replacing the earlier local-proof-only status. Both passed text QA.

| Master | Size | Channel | QA |
|---|---:|---|---|
| `masters/ifq22r-v2-fb-lifestyle-gpt.png` | 1744 × 2336 | Facebook (3:4 nearest enum to 4:5) | Text exact (`淨係涼一邊？` / `問題係空氣冇對流`, Cantonese 冇 correct); product truth good; front grille on |
| `masters/ifq22r-v2-story-detach-gpt.png` | 1520 × 2688 | Story 9:16 | Text exact (`IFQ-22R` / `DC 靜音 + 全方位 + 易拆前網罩`); mid-detach with hand; exactly 3 blades visible; clean Story-UI space |

## V4 Lifestyle-Rich Story (superseded for exploration)

**Superseded V3 on 2026-06-06.** The v3 paper-collage set was judged to lack excitement and information versus the approved pitch-deck carousels (`pitch/deck/assets/social-carousel-fan-*`). V4 restored the pitch-deck direction — real bright HK home scenes, airflow visualised through the room, an isometric 3-use cutaway, verified spec chips, CTA buttons, and a cool airy summer palette — while keeping the big Heritage Blue frame number and exact zh-HK copy. Full 6-frame set + reproducible prompts: [`masters/ifq22r-v4-lifestyle-rich/`](masters/ifq22r-v4-lifestyle-rich/_readme.md) (square 1:1, frames 01–06, `gpt_image_2` via Higgsfield with the IFQ-22R product reference, all text QA-passed). V4 is kept as traceable prior output while V5 explores a stronger content/theme direction.

## V5 HK Summer Airflow Lab (new exploration)

Started after V4 was judged not strong enough. V5 changes the content angle to "not more wind; move room air correctly" and uses a bolder social-card / airflow-lab system. Test frames: [`masters/ifq22r-v5-airflow-lab/`](masters/ifq22r-v5-airflow-lab/_readme.md).

Current test result:

- Frame 03 placement guide is the strongest candidate so far.
- Frame 01 visual direction works, but the exact Cantonese subline `可能係空氣冇郁` drifted twice, so it is not approved. Use easier copy or local deterministic typography for final.

## V6 Concept-Only Airflow Lab (fake-product theme test)

V6 intentionally removes real IFQ product binding to judge theme, layout, and social-card energy first. Generated concept tests: [`masters/ifq22r-v6-concept-airflow-lab/`](masters/ifq22r-v6-concept-airflow-lab/_readme.md).

Current result:

- V6 is the strongest creative direction so far for airflow storytelling and carousel variety.
- All product forms in V6 are fake/generic placeholders and must not be treated as product-approved.
- If approved, use the V6 layout/theme as the brief for client product-photo requests and product-bound regeneration.

## V7 Illustrated Airflow Ribbon (alternate style comparison)

V7 keeps the same concept-only/fake-product workflow but replaces the earlier modern-design direction with an illustration-led product/social-card system. Generated test frames: [`masters/ifq22r-v7-illustrated-airflow-ribbon/`](masters/ifq22r-v7-illustrated-airflow-ribbon/_readme.md).

Current result:

- V7 now removes visible frame numbers and uses a product cutout + flat HK home illustration + recurring Cool Air blue ribbon.
- Hook frame generated successfully and is closer to the intended illustration language than V7 modern.
- Placement frame generated after a shorter retry. It has the right no-number structure and room logic, but is more soft isometric/3D than pure flat vector and still changes the subline separator punctuation.
- Product remains intentionally generic and must be product-bound later if the direction is approved.

## V8 Feature Card Surprise Concepts

Generated after the safe IFQ / ICF feature-card drafts looked too normal. V8 tests three concept-only IFQ single-frame feature-card routes with a generic product placeholder and short direct feature labels: product diagram laboratory, Japanese design magazine cover, and campaign moodboard collage.

Entry point: [`masters/ifq22r-v8-feature-card-surprise/`](masters/ifq22r-v8-feature-card-surprise/_readme.md).

Current result:

- V8-01 product diagram laboratory is the strongest feature-proof route.
- V8-03 campaign moodboard collage is the strongest social-surprise route.
- V8-02 magazine cover is tasteful but less feature-rich.
- All three are concept-only and need product binding + exact text QA before production use.

## V9 Full Detach Cleaning Display

Generated after the client direction to demonstrate the product's detachable form in one frame. V9 uses a product-bound no-text GPT-image master plus local deterministic Traditional Chinese overlay.

Entry point: [`masters/ifq22r-v9-full-detach-cleaning-display/`](masters/ifq22r-v9-full-detach-cleaning-display/_readme.md).

Current result:

- Final 4:5 export: `exports/ifq22r-v9-full-detach-cleaning-display-4x5.png`.
- Visual angle: customer-facing detachable cleaning display, not engineering teardown.
- Local overlay copy is exact: `IFQ-22R 全拆式設計`, `前網 · 扇葉 · 後網 · 機身`, `拆件清潔，更易打理`, `睇 IFQ-22R 詳情`.
- QA status: visually strong draft; client/SKU approval still needed for the detachable-part representation.

## V10 Japanese Magazine Detach

Generated after V9 review noted that the local overlay placement felt off. V10 uses the earlier V8 Japanese design magazine direction, with GPT-image rendering the poster typography directly inside the image.

Entry point: [`masters/ifq22r-v10-japanese-magazine-detach/`](masters/ifq22r-v10-japanese-magazine-detach/_readme.md).

Current result:

- GPT text master: `masters/ifq22r-v10-japanese-magazine-detach/ifq22r-v10-japanese-magazine-detach-gpt-text.png`.
- 4:5 review export: `exports/ifq22r-v10-japanese-magazine-detach-gpt-text-4x5.png`.
- Visual angle: premium Japanese home-design magazine cover, using a clean detachable-parts still life.
- GPT-generated copy appears correct on first visual QA: `IFQ-22R`, `全拆式設計`, `前網 · 扇葉 · 後網 · 機身`, `拆件清潔，更易打理`, `睇 IFQ-22R 詳情`.
- No phone number, contact detail, price, QR code, fake URL, or warranty badge observed.
- QA status: strongest current route for text placement and mood; still needs final human character QA and client/SKU approval.

## V11 Japanese Magazine Badge Detach

Generated after V10 review requested bolder text and feature badges with icons. V11 keeps the Japanese design magazine mood, enlarges the headline, and adds a 2x2 badge grid for mixed core features.

Entry point: [`masters/ifq22r-v11-japanese-magazine-badge-detach/`](masters/ifq22r-v11-japanese-magazine-badge-detach/_readme.md).

Current result:

- GPT text master: `masters/ifq22r-v11-japanese-magazine-badge-detach/ifq22r-v11-japanese-magazine-badge-detach-gpt-text.png`.
- 4:5 review export: `exports/ifq22r-v11-japanese-magazine-badge-detach-gpt-text-4x5.png`.
- Visual angle: premium Japanese home-design magazine cover plus clean feature-badge proof.
- GPT-generated main copy appears correct on first visual QA: `IFQ-22R`, `全拆式設計`, `拆件清潔，更易打理`, `睇 IFQ-22R 詳情`.
- GPT-generated badge copy appears correct on first visual QA: `全拆清潔`, `360° 對流`, `DC 節能`, `遙控操作`.
- No phone number, contact detail, price, QR code, fake URL, or warranty badge observed.
- QA status: strongest current route for combined mood + feature clarity; still needs final human character QA and client/SKU approval.

## Direct-Sell Feature Showcase Example

Added a direct product-selling example to demonstrate a post that sells IFQ-22R's product reasons directly, instead of only giving tips/topic angles.

Links:

- Brief: [[online-marketing/sales-content/go-live-kits/assets/generated-text-v2/asset-system/examples/ifq22r-direct-sell-feature-showcase]]
- Generated concept: [[online-marketing/sales-content/go-live-kits/assets/generated-text-v2/masters/ifq22r-direct-sell-feature-showcase-v1/_readme]]

Current result:

- Single-card direct-sell demo generated.
- It uses product hero, feature icon chips, grille-detail inset, and airflow ribbon as inside-post assets.
- Product shape is close to the IFQ source image; text is readable but should be overlaid locally for production precision.

## Reusable Asset System V01

Generated deterministic SVG assets for the first reusable inside-post kit:

- airflow ribbons,
- cool mist ribbon,
- heat patch,
- feature icons,
- room map,
- product-detail insets,
- comparison module,
- contact sheet.

Entry point: [[online-marketing/sales-content/go-live-kits/assets/generated-text-v2/asset-system/_index]]

## Generated Bitmap Asset Pack V01

Added generated raster assets for richer creative-space layouts, based on the strongest local carousel references:

- `brand/social-samples/carousel/carousel-air-fryer-editorial-board`
- `brand/social-samples/carousel/carousel-fan-cool-air-diagram`

Pack: [[online-marketing/sales-content/go-live-kits/assets/generated-text-v2/asset-system/generated-bitmap/v01-creative-space-assets/_readme]]

Current assets:

- Cool Air ribbon loop,
- editorial board cluster,
- IFQ room airflow diagram card,
- IFQ feature proof chip cluster.

The pack keeps `source-chroma/` files and transparent PNGs. It is intended for cropable post composition, client visual options, and future product-bound regeneration after client product angles are available.

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

![[online-marketing/sales-content/go-live-kits/assets/generated-text-v2/exports/text-v2-local-contact-sheet.jpg]]

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
bash online-marketing/sales-content/go-live-kits/assets/generated-text-v2/build-local-overlays.sh
```

## QA

- Text must match the prompt exactly.
- IFQ-22R visible blade scenes must show exactly 3 fan blades.
- ICF-140R scenes must stay local / ventilated / personal-zone, not sealed-room aircon replacement.
- No fake logos, fake model text, fake prices, fake URLs, QR codes, or random extra words.
