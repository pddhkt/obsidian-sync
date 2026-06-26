---
type: image-generation-qa
status: ready-for-external-generation
sku: IFQ-22R
date: 2026-06-05
tags:
  - online-marketing
  - products
  - IFQ-22R
  - image-generation
  - product-shape
  - reconstruction
---

# IFQ-22R Product Shape Reconstruction Prompts

Use this before generating carousel frames.

The goal is to test whether an image model can understand the whole IFQ-22R product shape from the current product/part references, especially the missing side, rear, and open-front views.

These outputs are not campaign assets. They are synthetic product reference candidates. Accept them only if the shape matches the source references.

## Available Input References

| Ref ID      | File                                                                                             | Role                                                                        |
| ----------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| `P1`        | `online-marketing/products/ifq-22r/images/source/IFQ-22R.png`                                    | Main product truth: close front grille, wood cap, wood supports, base, yoke |
| `P2`        | `online-marketing/sales-content/go-live-kits/assets/reference/ifq22r-hero-original.jpg`                | Full assembled product silhouette and proportions                           |
| `P3-source` | `online-marketing/products/ifq-22r/images/source/ifq-22r-part-fan-blade-3pp.jpg`                 | Original standalone fan blade source; geometry truth                        |
| `P3`        | `online-marketing/products/ifq-22r/images/reference/ifq-22r-ref-fan-blade-3pp-gpt-upscaled.png`  | Clean/upscaled fan blade clarity reference                                  |
| `P4-source` | `online-marketing/products/ifq-22r/images/source/ifq-22r-part-rear-grille.jpg`                   | Original standalone rear grille / housing source; geometry truth            |
| `P4`        | `online-marketing/products/ifq-22r/images/reference/ifq-22r-ref-rear-grille-gpt-upscaled.png`    | Clean/upscaled rear grille clarity reference                                |
| `P5-source` | `online-marketing/products/ifq-22r/images/source/ifq-22r-part-body-rear-side.jpg`                | Original standalone rear-side body source; geometry truth                   |
| `P5`        | `online-marketing/products/ifq-22r/images/reference/ifq-22r-ref-body-rear-side-gpt-upscaled.png` | Clean/upscaled rear-side body clarity reference                             |

For part-heavy prompts, upload each original source part and its upscaled reference as separate images when the model supports it. Use the `*-source` image as geometry truth and the upscaled image as detail clarity only.

## Global Product Truth

Use this in every prompt:

```text
The product is Imarflex IFQ-22R, a compact white round-grille air circulator. It has a curved spiral/radial white front grille, a circular wood-tone center cap on the assembled front grille, two vertical wood-tone support arms holding the fan head, a pale grey yoke/bracket behind the head, and a rounded white oval base with small touch buttons and a dark IR receiver slot. It is not a pedestal fan, not a generic table fan, not a bladeless fan, and not an air conditioner. Any exposed fan blade must show exactly 3 broad white PP blades.
```

## Global Output Style

Use this style in every prompt:

```text
Neutral product-reference image, not a social post and not a poster. Clean studio lighting, plain light grey or warm white background, no marketing design, no text, no labels, no logo recreation beyond what naturally appears on the referenced product, no price, no QR code, no props unless explicitly requested. The output should look like a product reference photo used to verify geometry.
```

## QA Gate

Reject any generated candidate if it has:

- wrong number of exposed blades
- generic fan grille instead of IFQ-22R spiral/radial grille
- missing or incorrect two wood-tone support arms
- pedestal pole stand instead of rounded oval base
- incorrect side/rear casing depth
- invented display, fake model label, fake price, QR code, or extra text
- rear or open-front geometry that does not plausibly connect to the source references

## Generated Candidate Log

| Candidate | Prompt | Date | File | Status | Initial QA Notes |
|---|---|---:|---|---|---|
| open-front-v1 | Prompt 4 | 2026-06-05 | `../generated/ifq-22r-candidate-open-front-v1.png` | candidate-review | Passes main visible gates: detached grille, open front, exactly 3 broad blades, two wood-tone supports, rounded oval base, no extra text. Needs user/client review: detached grille center area and inner open-front housing are AI-interpreted, not official product geometry. |

## Recommended Test Order

1. Generate `Prompt 1` and `Prompt 2` first: side/three-quarter whole-product shape.
2. If those look good, generate `Prompt 3`: rear assembled view.
3. Then generate `Prompt 4`: open-front assembled view with exactly 3 blades.
4. Then generate `Prompt 5`: detached/exploded parts layout.
5. Only after approved shape candidates exist, use them as references for carousel/social-card generation.

## Prompt 1: Left Three-Quarter Whole Product

Minimum references: `P1`, `P2`, `P5-source`, `P5`.

```text
Create a neutral product-reference photo of the Imarflex IFQ-22R air circulator from a left three-quarter angle.

Use the uploaded front product image as the truth for the front grille, wood-tone center cap, two wood-tone support arms, rounded white oval base, and button/IR receiver placement. Use the uploaded rear-side body references as the truth for the side thickness, rear casing, pale grey yoke/bracket, support-arm attachment, and base connection.

Output: one full assembled IFQ-22R product on a plain warm white or light grey studio background. No text, no labels, no marketing graphics, no props. Show the fan head turned slightly so the viewer sees both the front spiral/radial grille and some side/rear casing depth. Keep the product compact, with exactly two vertical wood-tone support arms and the rounded white oval base.

Important shape constraints:
- white round fan head with curved spiral/radial front grille
- circular wood-tone center cap on the front grille
- exactly two vertical wood-tone support arms
- pale grey yoke/bracket behind the fan head
- rounded white oval base with small touch buttons and dark IR receiver slot
- not a pedestal fan, not a tall fan, not a generic table fan

Avoid: wrong base, metal pole stand, missing wood supports, extra support legs, distorted grille, generic straight grille, fake model text, fake price, QR code, extra labels, extra props, 4-blade or 5-blade visible fan.
```

## Prompt 2: Right Three-Quarter Whole Product

Minimum references: `P1`, `P2`, `P5-source`, `P5`.

```text
Create a neutral product-reference photo of the Imarflex IFQ-22R air circulator from a right three-quarter angle.

Use the uploaded front product image as the truth for the front grille, wood-tone center cap, two wood-tone support arms, rounded white oval base, and button/IR receiver placement. Use the uploaded rear-side body references as the truth for the side thickness, rear casing, pale grey yoke/bracket, support-arm attachment, and base connection.

Output: one full assembled IFQ-22R product on a plain warm white or light grey studio background. No text, no labels, no marketing graphics, no props. Show the fan head turned slightly so the viewer sees both the front spiral/radial grille and some side/rear casing depth from the opposite side of Prompt 1. Keep the product compact, balanced, and believable.

Important shape constraints:
- white round fan head with curved spiral/radial front grille
- circular wood-tone center cap on the front grille
- exactly two vertical wood-tone support arms
- pale grey yoke/bracket behind the fan head
- rounded white oval base with small touch buttons and dark IR receiver slot
- side/back details must stay conservative and based on the uploaded rear-side body references

Avoid: mirrored impossible geometry, wrong base, pedestal stand, missing wood supports, extra support legs, distorted grille, fake model text, fake price, QR code, extra labels, extra props, 4-blade or 5-blade visible fan.
```

## Prompt 3: Rear Assembled Whole Product

Minimum references: `P1`, `P2`, `P4-source`, `P4`, `P5-source`, `P5`.

```text
Create a neutral product-reference photo of the fully assembled Imarflex IFQ-22R air circulator from the rear.

Use the uploaded rear grille / rear housing references as the truth for rear grille ribs, rear mounting panel, vents, and housing structure. Use the uploaded rear-side body references as the truth for the casing depth, pale grey yoke/bracket, shaft area, wood-tone support arms, and rounded white base. Use the front assembled references only for overall proportions and base/support placement.

Output: one full assembled product from a rear or rear three-quarter angle on a plain warm white or light grey studio background. No text, no labels, no marketing graphics, no props. The rear view should show the white rear grille/housing integrated into the fan head, connected naturally to the yoke, two wood-tone support arms, and rounded white oval base.

Important shape constraints:
- rear fan head is round and white, with rear grille/housing details based on uploaded rear references
- pale grey yoke/bracket connects the head to the base/support structure
- exactly two vertical wood-tone support arms
- rounded white oval base, not a pole stand
- rear geometry must look like the back of the same compact product, not a different fan

Avoid: front grille copied onto the rear, generic pedestal fan rear, square body, wrong vents, fake labels, fake screws exaggerated into random hardware, price text, QR code, extra logos, added handles that are not in the references.
```

## Prompt 4: Open-Front Assembled Product

Minimum references: `P1`, `P2`, `P3-source`, `P3`, `P4-source`, `P4`, `P5-source`, `P5`.

```text
Create a neutral product-reference photo of the Imarflex IFQ-22R with the front grille removed.

Use the uploaded front assembled images as the truth for the body, supports, base, and front grille shape. Use the uploaded fan blade references as the truth for the exposed blade. Use the uploaded rear-side and rear-grille references as the truth for the open body depth and inner housing.

Output: one IFQ-22R product standing on its rounded white oval base, with the front grille removed and placed beside the body on the same neutral studio surface. The fan body remains assembled on the two wood-tone support arms. The exposed fan blade is visible in the open front and must show exactly 3 broad white blades. No text, no labels, no marketing graphics, no props.

Important shape constraints:
- front opening is round and aligned with the original fan head
- exposed blade has exactly 3 broad white PP blades
- detached front grille is a round white plastic spiral/radial grille matching the original assembled front
- two wood-tone support arms remain attached to the body/base
- rounded white oval base remains visible
- open-front body must be clean and plausible, not broken

Avoid: 4-blade fan, 5-blade fan, extra blades, blade count hidden by blur, broken grille, jagged plastic, missing supports, pedestal stand, fake labels, fake warning stickers, fake model text, fake price, QR code, dirty repair scene, hand interaction.
```

## Prompt 5: Detached Parts Layout

Minimum references: `P1`, `P3-source`, `P3`, `P4-source`, `P4`, `P5-source`, `P5`.

```text
Create a neutral product-reference parts layout for the Imarflex IFQ-22R air circulator.

Use the uploaded standalone part images as the truth for each part shape. Use the assembled product reference only for overall product identity and how the parts relate to the whole product.

Output: a clean studio tabletop layout showing separate product parts as reference objects, not an advertisement:
1. the full assembled IFQ-22R body/base module from a cautious rear-side angle,
2. the detached round white front grille,
3. the 3-blade white fan blade,
4. the rear grille / rear housing component.

No text, no labels, no marketing graphics, no price, no QR code, no props. Use plain warm white or light grey background and soft shadow. Arrange the parts clearly with generous spacing so a reviewer can judge the shapes.

Important shape constraints:
- fan blade has exactly 3 broad white blades
- front grille is round white plastic with spiral/radial ribs
- rear grille / housing follows the uploaded rear references
- body/base module retains two wood-tone support arms and rounded white oval base
- parts should look like they belong to the same compact IFQ-22R product

Avoid: generic fan parts, extra blades, extra screws/hardware, fake labels, fake diagrams, fake arrows, fake Chinese or English text, exploded engineering drawing style, random accessory parts not in the references.
```

## Prompt 6: Product Turntable Contact Sheet

Use this only after at least two individual candidate angle images look good. Upload the original references plus the approved generated candidate angles as references.

Minimum references: `P1`, `P2`, `P3`, `P4`, `P5`, plus approved outputs from Prompts 1-5.

```text
Create a neutral product-reference turntable contact sheet for the Imarflex IFQ-22R air circulator.

Use the uploaded original references and approved generated candidate angles as the product truth. Do not invent a new design. The goal is to present a consistent product model across multiple views.

Output: one clean 2x3 contact sheet on a light grey studio background with six product views:
1. front view,
2. left three-quarter view,
3. right three-quarter view,
4. rear view,
5. open-front view with exactly 3 blades,
6. detached parts layout.

Use only tiny view numbers "01", "02", "03", "04", "05", "06" if needed; no other text. Keep all views visually consistent: same white body, same spiral front grille, same wood-tone support arms, same rounded white oval base, same pale grey yoke, same compact proportions.

Avoid: changing the product between views, extra text, fake model labels, fake prices, QR code, inconsistent base shape, inconsistent support arms, wrong blade count, generic pedestal fan, dramatic marketing styling.
```

## After Generation

When a candidate is accepted, save it under:

```text
online-marketing/products/ifq-22r/images/generated/
```

Suggested filenames:

```text
ifq-22r-candidate-left-3q-v1.png
ifq-22r-candidate-right-3q-v1.png
ifq-22r-candidate-rear-v1.png
ifq-22r-candidate-open-front-v1.png
ifq-22r-candidate-parts-layout-v1.png
ifq-22r-candidate-turntable-v1.png
```

Record accepted/rejected status in this note or in `assets.md`. Do not use a generated candidate as campaign reference unless it passes the QA gate above.
