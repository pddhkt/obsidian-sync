---
type: marketing-asset-set
area: online-marketing
product: IFQ-22R
style: v5-hk-summer-airflow-lab
format: 1:1 square
created: 2026-06-06
status: frame-01-03-tests-generated
tags:
  - online-marketing
  - assets
  - gpt-image
  - text-in-image
  - social-card
---

# IFQ-22R - V5 HK Summer Airflow Lab

This is a new carousel content pass for IFQ-22R after V4 was judged not strong enough.

## Direction

Core sales angle:

> Not "more wind"; the point is moving room air correctly.

Visual theme:

> HK Summer Airflow Lab - compact Hong Kong room fragments, bold Heritage Blue social-card structure, airflow diagrams, product photo modules, short Cantonese hooks, and proof-oriented close-ups.

This should feel more like a designed saveable social carousel than a calm poster. Use the pitch-deck carousel examples as the benchmark for social-card rhythm, but keep the product scenes practical and product-truth constrained.

## Product Truth

- White compact round-grille IFQ-22R air circulator.
- White spiral/radial front grille.
- Circular wood-tone center cap; do not invent readable logo text.
- Exactly two vertical wood-tone support arms.
- Rounded white oval base with small touch buttons and dark IR receiver slot.
- Slim white remote may appear only on remote/CTA frames.
- Exposed blade scenes must show exactly 3 broad white blades.
- Keep product mostly front-facing or front 3/4. Side/rear geometry is candidate-only unless client supplies true side/back photos.
- Do not claim `全拆式`; current public copy follows POP card: `易拆式前網罩`.

## Frame Plan

| Frame | Purpose | Exact on-image text | Product / visual angle | Risk |
|---|---|---|---|---|
| 01 | Hook: hot room despite fan | `01` / `開咗風扇都焗?` / `可能係空氣冇郁` | Front 3/4 IFQ in compact HK living room, airflow loop starting from fan | Low |
| 02 | Explain circulator vs fan | `02` / `唔係吹人咁簡單` / `循環扇係帶動空氣` | Two-panel airflow comparison; IFQ front-safe product module | Medium, avoid generic/incorrect fan |
| 03 | Placement guide | `03` / `擺位啱,成間房先舒服` / `對窗、對角、配冷氣都得` | Product plus mini room map / 3 icon-only placement cards | Low-medium, diagram text must not drift |
| 04 | Long-use comfort | `04` / `長開都要舒服` / `DC 節能電機 + 遙控操作` | Product/base/remote close-up, quiet home corner | Low |
| 05 | Easy cleaning proof | `05` / `前網罩快拆` / `拆得出,抹得淨` | Open-front detach proof; detached grille + towel | Medium-high, exposed blade must show exactly 3 blades |
| 06 | Decision CTA | `06` / `IFQ-22R` / `360° 對流 + 易拆清潔 + 2 年保養` | Clean product hero + CTA-style button shapes without URL/QR | Low, warranty still needs final client/PDP check before paid use |

## Test Batch

Generate only Frame 01 and Frame 03 first.

| File | Status | QA |
|---|---|---|
| `ifq22r-v5-01-airflow-lab-hook-v1-text-drift.png` | generated, not approved | Stronger V5 room/airflow social-card energy; product front 3/4 shape is usable; headline appears close; subline drifted from `可能係空氣冇郁` to wrong characters, so this is style evidence only. |
| `ifq22r-v5-01-airflow-lab-hook-v2-text-drift.png` | generated, not approved | Targeted text retry still drifted on the subline; same conclusion: keep visual direction, do not approve text-in-image. |
| `ifq22r-v5-03-airflow-lab-placement.png` | generated, candidate | Placement-guide concept works: product module + room-map module + icon chips. Headline/subline appear usable on first QA; product remains front-safe with two wood-tone supports and rounded base. Re-check text at final approval size. |

![[online-marketing/assets/2026-07-go-live-kits/generated-text-v2/masters/ifq22r-v5-airflow-lab/ifq22r-v5-01-airflow-lab-hook-v1-text-drift.png|300]]
![[online-marketing/assets/2026-07-go-live-kits/generated-text-v2/masters/ifq22r-v5-airflow-lab/ifq22r-v5-03-airflow-lab-placement.png|300]]

## Test QA

- V5 theme is stronger than V4 for "social-card feel": bolder number blocks, clearer diagram modules, and more practical airflow storytelling.
- Frame 03 is the better successful test. It changes the carousel content in a useful way instead of repeating another product spec card.
- Frame 01 exposed the text risk: the Cantonese subline `可能係空氣冇郁` failed twice, even with stricter prompting. For production, either:
  - change the subline to easier copy, e.g. `空氣未對流`; or
  - generate a no/low-text master and apply final Traditional Chinese typography locally.
- Product geometry is acceptable for these two front-safe frames. Do not use rear/side hero angles until true client side/back photos exist.

## Prompt - Frame 01 Hook

```text
Use case: ads-marketing.
Asset type: Imarflex IFQ-22R Instagram carousel Frame 01, V5 HK Summer Airflow Lab, square 1:1 master.

Use the visible images as references:
- IFQ-22R assembled product source: exact product truth for white round spiral/radial grille, wood-tone circular center cap, two vertical wood-tone support arms, rounded white oval base, small touch buttons, dark IR receiver slot, and compact air-circulator proportions.
- IFQ-22R pose calibration board: supporting reference for front 3/4 product pose and product consistency only.
- Pitch-deck social carousel examples: style benchmark only, not product reference.
- V4 examples: contrast reference; create a sharper, more graphic social card, not a soft lifestyle poster.

Primary request:
Create a square Instagram social card in a HK Summer Airflow Lab style. The card should hook the buyer with the everyday Hong Kong problem: the fan is on, but the room still feels stuffy because the air is not moving around the room.

Exact text to render, and no other words:
Large frame number: "01"
Headline: "開咗風扇都焗?"
Subline: "可能係空氣冇郁"

Composition:
Use a bright compact Hong Kong living room fragment: sofa edge, window light, small coffee table, pale wall, tidy summer home. Place the IFQ-22R as a strong product/photo module in the lower-left or lower-right, front 3/4 view, large enough to inspect the round grille, wood-tone support arms, and oval base. Add a clean Cool Air blue airflow loop sweeping across the room, with one subtle warm/stuffy zone fading away. Add a large Heritage Blue "01" block, bold Traditional Chinese headline, one underline/rule, dotted grid micro-patterns, and a small diagram inset with arrows only. Make it feel like a designed Instagram social card, not a calm product poster and not a stock lifestyle photo.

Product truth:
- IFQ-22R is a compact white round-grille air circulator, not a pedestal fan, tower fan, air conditioner, or generic desk fan.
- Front grille must remain white, round, and spiral/radial.
- Keep exactly two wood-tone vertical support arms.
- Rounded white oval base must be visible with small buttons and a dark IR receiver slot.
- If any blade is visible through the grille, it must imply exactly 3 broad white blades.
- Do not invent readable logo text, model labels, spec labels, prices, URLs, or QR codes.

Style:
Bold but warm pitch-deck social-card system. Heritage Blue #1E4B7A anchors, Rice White #F7F6F2 background, Cool Air #BFD7E6 airflow ribbons, Soft Charcoal #3C3F42 text, small Clay Beige #E7D7C1 home details. Clean printed sans-serif typography, high contrast, scan-friendly hierarchy.

Avoid:
Wrong or misspelled Traditional Chinese, extra text, extra English, fake labels, fake model text, fake price, fake URL, fake QR code, fake warranty badge, generic fan, pedestal fan, tower fan, black fan body, missing wood supports, distorted grille, 4-blade fan, 5-blade fan, cluttered room, dark dramatic lighting, copying V4 layout.
```

## Prompt - Frame 03 Placement Guide

```text
Use case: ads-marketing.
Asset type: Imarflex IFQ-22R Instagram carousel Frame 03, V5 HK Summer Airflow Lab, square 1:1 master.

Use the visible images as references:
- IFQ-22R assembled product source: exact product truth for white round spiral/radial grille, wood-tone circular center cap, two vertical wood-tone support arms, rounded white oval base, small touch buttons, dark IR receiver slot, and compact air-circulator proportions.
- IFQ-22R pose calibration board: supporting reference for safe front 3/4 product angle and product consistency only.
- Pitch-deck social carousel examples: style benchmark only.
- V4 examples: contrast reference; avoid the soft generic spec-card look.

Primary request:
Create a square Instagram social card in a HK Summer Airflow Lab style. The card should teach a practical placement idea: the IFQ-22R works best when positioned to move air through the room, such as toward a window, across a corner, or together with air conditioning.

Exact text to render, and no other words:
Large frame number: "03"
Headline: "擺位啱,成間房先舒服"
Subline: "對窗、對角、配冷氣都得"

Composition:
Use a graphic product + placement guide layout. Put the IFQ-22R front 3/4 product module on one side, clean and inspectable. On the other side, place a simplified isometric/top-down mini room map with blue airflow arrows looping through a window, across a corner, and near an air-conditioner area. Use three small icon-only placement cards or chips with no text: window icon, diagonal corner arrow icon, AC/snowflake icon. Add a large Heritage Blue "03", bold headline, subline, dotted grid micro-patterns, thin blue connector lines, and Cool Air ribbons. This should feel like a practical saveable social-card guide, not an empty poster.

Product truth:
- IFQ-22R is a compact white round-grille air circulator, not a pedestal fan, tower fan, air conditioner, or generic desk fan.
- Keep the product mostly front-facing / front 3/4, because side/back references are limited.
- Front grille must be white, round, and spiral/radial.
- Keep exactly two wood-tone vertical support arms.
- Rounded white oval base must be visible with small buttons and a dark IR receiver slot.
- If any blade is visible through the grille, it must imply exactly 3 broad white blades.
- Do not invent side/back product geometry as the main hero.

Style:
Designed Instagram social card, HK Summer Airflow Lab. Heritage Blue #1E4B7A headline/number/rules, Rice White #F7F6F2 card background, Cool Air #BFD7E6 arrows/ribbons, Soft Charcoal #3C3F42 text, light Clay Beige #E7D7C1 home accents. Product photo module plus diagram module, sharp hierarchy, clean and energetic.

Avoid:
Wrong or misspelled Traditional Chinese, extra text, extra English, fake labels, fake model text, fake price, fake URL, fake QR code, fake warranty badge, generic fan, pedestal fan, tower fan, air conditioner as the main product, black fan body, missing wood supports, distorted grille, 4-blade fan, 5-blade fan, clutter, dark lighting, copying V4 layout, writing labels inside the three icon chips.
```
