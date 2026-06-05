---
type: image-generation-handoff
status: ready-for-external-generation
sku: IFQ-22R
date: 2026-06-05
tags:
  - online-marketing
  - products
  - IFQ-22R
  - image-generation
  - prompts
---

# IFQ-22R External Model Prompt Handoff

Use these prompts when GPT-image is rate-limited and generation needs to be tested in another image model.

Important: this note is for downstream carousel/social-card generation. If the product shape is still uncertain, use `ifq-22r-product-shape-reconstruction-prompts-2026-06-05.md` first to generate and approve missing product-angle candidates.

## Reference Image Rule

If the model accepts many image references, upload the full core pack for the first calibration test:

| Ref ID | File                                                                                             | Role                                                                                  |
| ------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `P1`   | `online-marketing/products/ifq-22r/images/source/IFQ-22R.png`                                    | Main product truth: grille, wood cap, support arms, base, close product details       |
| `P2`   | `online-marketing/assets/2026-07-go-live-kits/reference/ifq22r-hero-original.jpg`                | Full assembled product silhouette with whitespace                                     |
| `P3-source` | `online-marketing/products/ifq-22r/images/source/ifq-22r-part-fan-blade-3pp.jpg` | Original standalone fan blade source image; geometry truth for exposed 3-blade part |
| `P3`   | `online-marketing/products/ifq-22r/images/reference/ifq-22r-ref-fan-blade-3pp-gpt-upscaled.png`  | Clean/upscaled fan blade clarity reference; exposed blade must show exactly 3 broad white blades |
| `P4-source` | `online-marketing/products/ifq-22r/images/source/ifq-22r-part-rear-grille.jpg` | Original standalone rear grille source image; geometry truth for rear grille / housing |
| `P4`   | `online-marketing/products/ifq-22r/images/reference/ifq-22r-ref-rear-grille-gpt-upscaled.png`    | Clean/upscaled rear grille clarity reference                                          |
| `P5-source` | `online-marketing/products/ifq-22r/images/source/ifq-22r-part-body-rear-side.jpg` | Original standalone body rear-side source image; geometry truth for rear-side body, yoke, support, base |
| `P5`   | `online-marketing/products/ifq-22r/images/reference/ifq-22r-ref-body-rear-side-gpt-upscaled.png` | Clean/upscaled body rear-side clarity reference                                       |
| `S1`   | `imarflex pitch deck/assets/social-carousel-fan-1.png`                                           | Social-card style reference: fan airflow, big number, blue graphics                   |
| `S2`   | `imarflex pitch deck/assets/social-carousel-airfryer-2.png`                                      | Social-card style reference: collage, callouts, product module                        |
| `S3`   | `imarflex pitch deck/assets/social-carousel-fan-2.png`                                           | Optional social-card style reference                                                  |
| `R1`   | `online-marketing/assets/2026-07-go-live-kits/reference/ifq22r-gallery-01.jpg`                   | Optional remote/spec source; use only if the model can ignore existing text and price |

If the model gets confused by too many references, use only the minimum references listed under each prompt.

For part-heavy prompts, provide each standalone part as its own separate image when the model supports it:

- fan blade: upload `P3-source` plus `P3`
- rear grille: upload `P4-source` plus `P4`
- rear-side body: upload `P5-source` plus `P5`

The `*-source` files are the geometry truth. The upscaled `P3`, `P4`, and `P5` files are clarity aids for the model to read small details.

Avoid uploading `R1` unless needed for the remote or warranty CTA frame. It contains many printed words and a large price, so weak models may copy unwanted text.

## Global Product Truth

Use this product truth in every prompt:

```text
The product is Imarflex IFQ-22R, a compact white round-grille air circulator. It has a curved spiral/radial white front grille, a circular wood-tone center cap, two vertical wood-tone support arms, a pale grey yoke/bracket behind the fan head, and a rounded white oval base with small touch buttons and a dark IR receiver slot. It is not a pedestal fan, not a generic table fan, and not an air conditioner. Any exposed fan blade must show exactly 3 broad white PP blades.
```

## Global Style Direction

Use this style direction in every carousel prompt:

```text
Designed Instagram social card, not a calm product poster. Square 1:1 feed-card template like the Imarflex pitch-deck carousel examples: large frame number in Heritage Blue, strong Traditional Chinese headline, product/photo module, callout chips, line icons, subtle dotted grid, soft paper-card collage, Cool Air blue airflow graphics where relevant. Warm practical Hong Kong home-appliance tone. Rice White background, Heritage Blue accents, Soft Charcoal text, light Clay Beige paper/card elements. Energetic and saveable, but still clean and premium.
```

## Text Rule

For each frame, render only:

- the frame number, such as `01`
- the exact Traditional Chinese copy listed in the prompt
- no fake URL, no QR code, no random labels, no fake prices, no extra English

If the model is weak at Traditional Chinese text, generate a no-text version with clear empty text areas, then add the copy locally.

## Prompt 0: Pose Calibration Sheet

Use this before generating the carousel if you want to judge product geometry first.

Minimum references: `P1`, `P3`, `P4`, `P5`, `S1`, `S2`.

```text
Create a single square 1:1 product pose calibration board for the Imarflex IFQ-22R air circulator. Use the uploaded product references as product truth and the uploaded social-carousel examples as style direction only.

This is not a final advertisement. It is a product-geometry test sheet with four controlled tiles arranged 2x2 on a warm Rice White paper background. Use thin white photo-card borders, soft natural shadows, small Heritage Blue corner marks, and only these tiny labels: "01", "02", "03", "04". No other text.

Tile 01: front-safe assembled view. Show IFQ-22R mostly front-facing, slightly 3/4, matching the assembled reference: white compact round spiral grille, wood-tone circular center cap, two vertical wood-tone support arms, rounded white oval base, dark IR receiver slot on the base, and pale grey yoke behind the fan head.

Tile 02: cautious rear-side assembled approximation. Show the rear-side body based on the rear-side body reference: white rear casing with vents and panel geometry, pale grey yoke/bracket, wood-tone support arms, rounded white oval base. Keep it conservative; do not invent dramatic hidden side/back geometry.

Tile 03: detach/open-front test. Show the front grille removed and placed beside the body. The fan body remains on the base with the exposed fan blade visible. The exposed fan blade must show exactly 3 broad white blades, not 4 or 5. The detached grille should be round white plastic, clean, aligned, and not broken.

Tile 04: part truth still life. Show separate clean product parts on a neutral surface: the 3-blade white fan blade, the rear grille/housing, and the body rear-side module. Make the parts match the uploaded references, not generic fan parts.

Avoid: misspelled text, extra labels, fake Chinese, fake English, fake model text, fake URL, fake QR code, fake price, extra logos, random badges, random measurements, 4-blade fan, 5-blade fan, extra blades, black fan body, metal pedestal stand, wrong base shape, wrong wood supports, distorted grille, broken parts, excessive lifestyle props, dark dramatic lighting, stock-photo clutter.
```

## Prompt 1: Carousel Frame 01 Hook

Minimum references: `P1`, `P2`, `S1`, `S2`.

Exact text:

```text
循環扇點揀?
睇呢 3 個 icon 就夠
```

Prompt:

```text
Create a square 1:1 Instagram carousel social card for Imarflex IFQ-22R. Use the uploaded IFQ-22R product images as product truth and the uploaded Imarflex pitch-deck carousel examples as style reference only.

Render only this text: large frame number "01" and the exact Traditional Chinese copy:
"循環扇點揀?"
"睇呢 3 個 icon 就夠"

Composition: large Heritage Blue "01" in the upper-left with thin blue rules. Big bold Traditional Chinese headline on the left. Product/photo module on the right or lower-right showing IFQ-22R mostly front-facing with correct white spiral grille, wood-tone center cap, two wood-tone support arms, rounded white oval base, and pale grey yoke. Add three clean line icons as visual chips for quiet, oscillation, and easy-clean, but no extra text labels. Add light blue airflow ribbons and a subtle dotted grid. Warm Rice White paper background with Clay Beige paper-card fragments.

Product truth: IFQ-22R compact white round-grille air circulator, not a pedestal fan. Preserve spiral/radial front grille, wood-tone cap, two wood-tone support arms, rounded base, and dark IR receiver slot.

Avoid: extra Chinese, extra English, fake labels, fake model text, fake price, QR code, URL, wrong fan shape, metal stand, extra blades visible through the grille, dark dramatic styling, calm empty Muji poster layout.
```

## Prompt 2: Carousel Frame 02 Air Circulation

Minimum references: `P1`, `P2`, `S1`, `S2`.

Exact text:

```text
唔係吹你,係吹空氣
風扇吹人 / 循環扇帶對流
```

Prompt:

```text
Create a square 1:1 Instagram carousel social card for Imarflex IFQ-22R, in the same pitch-deck social-card style as the uploaded examples.

Render only this text: large frame number "02" and the exact Traditional Chinese copy:
"唔係吹你,係吹空氣"
"風扇吹人 / 循環扇帶對流"

Composition: educational comparison card. Left side shows a small simple ordinary table fan silhouette with one straight airflow line. Right side shows the real IFQ-22R product/photo module with correct white round spiral grille, wood-tone center cap, two wood-tone support arms, rounded white oval base. Around IFQ-22R, show looping Cool Air blue airflow ribbons and a small simplified room-flow diagram, matching the pitch-deck fan carousel mood. Use big "02" in Heritage Blue, bold headline, paper-card collage shapes, dotted grid, and thin blue callout lines without extra words.

Product truth: keep IFQ-22R front-safe and mostly front-facing. Do not show hidden side/back details unless supported by the reference.

Avoid: extra text, fake labels, fake numbers, air conditioner imagery, frost effects, generic pedestal fan, distorted grille, wrong base, wrong wood supports, extra blades, cluttered technical infographic.
```

## Prompt 3: Carousel Frame 03 DC Motor

Minimum references: `P1`, `P2`, `P5`, `S2`.

Exact text:

```text
DC 馬達
相對 AC 更靜、更慳電
```

Prompt:

```text
Create a square 1:1 Instagram carousel social card for Imarflex IFQ-22R, with energetic pitch-deck social-card styling.

Render only this text: large frame number "03" and the exact Traditional Chinese copy:
"DC 馬達"
"相對 AC 更靜、更慳電"

Composition: product feature card. Use a large Heritage Blue "03" on the left/top. Place a front-safe IFQ-22R product/photo module as the main object, with a small secondary rear-side detail crop/card inspired by the uploaded rear-side body reference. Add quiet sound-wave line icon, moon/sleep icon, small blue callout chips without words, and a soft paper collage block. Use Rice White, Heritage Blue, Soft Charcoal, and light Clay Beige.

Product truth: IFQ-22R is white, compact, round-grille, with spiral front grille, wood-tone center cap, two wood-tone support arms, pale grey yoke, and rounded white oval base. Rear-side detail must stay conservative and reference-based.

Avoid: fake decibel values, fake wattage, fake technical badges, extra text, random English, fake model labels, black body, wrong side geometry, extra blades, dark bedroom scene, generic motor diagram that changes the product.
```

## Prompt 4: Carousel Frame 04 360 Airflow

Minimum references: `P1`, `P2`, `S1`, `S2`.

Exact text:

```text
360° 全方位對流
氣流去到房尾
```

Prompt:

```text
Create a square 1:1 Instagram carousel social card for Imarflex IFQ-22R, matching the uploaded pitch-deck fan carousel style.

Render only this text: large frame number "04" and the exact Traditional Chinese copy:
"360° 全方位對流"
"氣流去到房尾"

Composition: airflow explainer card. Show IFQ-22R as a front-safe product/photo module in a compact Hong Kong room corner, angled slightly upward but not exposing unsupported side/back geometry. Use large pale Cool Air blue airflow arrows looping around the room, a small light-blue floorplan/room diagram, dotted grid accents, and strong Heritage Blue frame number. Keep a warm Rice White paper-card background with subtle Clay Beige collage pieces.

Product truth: preserve the true white round spiral grille, wood-tone center cap, two wood-tone support arms, rounded white oval base, dark IR receiver slot, and pale grey yoke. Keep product mostly front-facing if side details are uncertain.

Avoid: extra text, fake specs, fake numbers beyond the exact "360°" copy, exaggerated cyclone effects, motion blur, aircon unit, Western stock-home staging, distorted grille, wrong stand/base, extra blades.
```

## Prompt 5: Carousel Frame 05 Detachable Grille

Minimum references: `P1`, `P3`, `P4`, `P5`, `S2`.

Exact text:

```text
前網罩快拆
前網罩拆得出易抹
```

Prompt:

```text
Create a square 1:1 Instagram carousel social card for Imarflex IFQ-22R, in a proof/demo layout similar to the uploaded pitch-deck social-card examples.

Render only this text: large frame number "05" and the exact Traditional Chinese copy:
"前網罩快拆"
"前網罩拆得出易抹"

Composition: clean maintenance demo card. Show IFQ-22R on a warm neutral surface with the round white front grille detached and placed beside the body. The body remains on the rounded white oval base with two wood-tone support arms. Show the exposed fan blade inside the open front with exactly 3 broad white blades. Add a folded Steam Grey towel, blue check/line icons without words, thin blue callout lines, and small paper-card collage fragments. Use a large Heritage Blue "05" and bold headline hierarchy.

Product truth: detached grille should be round white plastic and derived from the assembled front grille reference. Exposed fan blade must match the uploaded 3-blade reference exactly in blade count. Rear/body/yoke/support geometry should follow the uploaded rear-side references and stay conservative.

Avoid: 4-blade fan, 5-blade fan, extra blades, broken parts, jagged grille, dirty alarmist styling, fake labels, random Chinese, random English, fake model text, fake price, fake QR code, wrong base shape, wrong wood supports, hand interaction unless the hand looks natural and does not hide the product.
```

## Prompt 6: Carousel Frame 06 CTA

Minimum references: `P1`, `P2`, `S1`, `S2`. Optional: `R1` only if the model can use it for the small remote and ignore all source-card text.

Exact text:

```text
IFQ-22R
連遙控 + 2 年保養
```

Prompt:

```text
Create a square 1:1 closing Instagram carousel CTA card for Imarflex IFQ-22R, matching the uploaded pitch-deck social-card examples but cleaner and more product-led.

Render only this text: large frame number "06" and the exact copy:
"IFQ-22R"
"連遙控 + 2 年保養"

Composition: strong final product hero card. Place IFQ-22R large on the right or center-right, front-safe, with correct white spiral grille, wood-tone center cap, two wood-tone support arms, rounded white oval base, dark IR receiver slot, and pale grey yoke. Add a small slim white remote near the base only if the uploaded reference supports it; otherwise keep the remote very simple and secondary. Add CTA button-like shapes in Heritage Blue and Clay Beige, but do not put extra words inside them. Add benefit icon footer with simple icons only, no labels. Use a large Heritage Blue "06", warm Rice White background, blue corner shapes, dotted grid, and light airflow ribbon.

Product truth: preserve the IFQ-22R product silhouette and do not add fake product badges. The warranty copy must be exactly "連遙控 + 2 年保養".

Avoid: fake price, fake URL, fake QR code, fake WhatsApp number, fake website, fake model labels, extra English, random Chinese, copying source-card price text, distorted fan, extra blades, wrong stand/base, luxury fashion styling.
```

## Recommended Test Order

1. Generate `Prompt 0` first if you are judging product geometry.
2. If `Prompt 0` looks acceptable, generate `Prompt 1` and `Prompt 5`.
3. If both pass style and product QA, generate the remaining frames.

Do not treat any side/rear/open-front output as production-ready unless it matches the reference pack. If side/rear/open-front geometry drifts, keep the real carousel front-facing or ask the client for true side, rear, and open-front photos.
