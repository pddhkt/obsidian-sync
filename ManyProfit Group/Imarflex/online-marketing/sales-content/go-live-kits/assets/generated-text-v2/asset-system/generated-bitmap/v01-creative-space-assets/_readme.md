---
type: generated-bitmap-asset-pack
area: online-marketing
campaign: 2026-07-go-live-kits
status: draft-review
created: 2026-06-09
generation: gpt-image-built-in
post-processing: imagemagick-chroma-key
scope:
  - reusable-social-card-assets
  - IFQ-22R
tags:
  - generated-assets
  - bitmap
  - transparent-png
  - social-carousel
  - asset-system
---

# V01 Creative Space Bitmap Assets

This pack is the generated-bitmap counterpart to the deterministic SVG v01 kit.

Use these when the post needs richer raster quality, moodboard depth, painterly airflow, or creative use of social-card space. The files are intentionally product-light or productless so they can be combined with real product photos later.

Reference direction:

- [[brand/social-samples/carousel/carousel-air-fryer-editorial-board]]
- [[brand/social-samples/carousel/carousel-fan-cool-air-diagram]]

Contact sheet:

![[online-marketing/sales-content/go-live-kits/assets/generated-text-v2/asset-system/generated-bitmap/v01-creative-space-assets/v01-bitmap-asset-contact-sheet.png]]

## Folder Model

```text
v01-creative-space-assets/
  _readme.md
  source-chroma/   # generated source files with removable magenta background
  transparent/     # alpha PNGs for post composition
  v01-bitmap-asset-contact-sheet.png
```

Do not delete `source-chroma/`. The source files are useful if the transparent edge needs to be keyed again for a different background.

## Assets

| Asset | Transparent PNG | Source | Best Use |
|---|---|---|---|
| Cool Air ribbon loop | `transparent/shared-cool-air-ribbon-loop-v01.png` | `source-chroma/shared-cool-air-ribbon-loop-v01-source.png` | Behind/around product cutouts, hook frames, direct-sell feature cards |
| Editorial board cluster | `transparent/shared-editorial-board-cluster-v01.png` | `source-chroma/shared-editorial-board-cluster-v01-source.png` | Moodboard layouts, product proof boards, combined-story cards |
| IFQ room airflow diagram card | `transparent/ifq22r-room-airflow-diagram-card-v01.png` | `source-chroma/ifq22r-room-airflow-diagram-card-v01-source.png` | Placement tips, AC/window airflow education, carousel explanation frames |
| IFQ feature proof chip cluster | `transparent/ifq22r-feature-proof-chip-cluster-v01.png` | `source-chroma/ifq22r-feature-proof-chip-cluster-v01-source.png` | Direct-selling posts, feature stack summaries, product proof modules |

## Why Bitmap Instead Of SVG

SVG is still useful for deterministic icons, overlays, and local typography. This pack uses image generation because the user-facing sample needs richer texture and more creative spatial composition:

- paper-card depth,
- taped editorial board language,
- room-diagram illustration with atmosphere,
- painterly airflow movement,
- feature-chip modules that feel like finished social assets.

The tradeoff is less deterministic geometry. For product-truth-critical frames, use these as supporting assets and place real client product imagery separately.

## Usage Guidance

### Good Situations

Use these assets when:

- the post needs to feel closer to `carousel-air-fryer-editorial-board` or `carousel-fan-cool-air-diagram`,
- the product image is not ready but the visual system needs exploration,
- the post combines a mood/image panel with a proof/explanation panel,
- the content angle is direct selling and needs feature chips around a product hero,
- the same visual asset can be reused across multiple frames.

### Avoid

Avoid using these as product proof by themselves:

- the room card has no real product,
- the feature-chip cluster uses illustrative icons,
- the detachable-grille mini icon is illustrative and should not replace a real IFQ product detail photo,
- final product-bound posts should use client-approved product photos for exact side/back/detail geometry.

## Product Truth Notes

- The three-blade proof chip in `ifq22r-feature-proof-chip-cluster-v01` shows exactly three broad fan blades.
- The room card intentionally leaves blank product-placement space instead of inventing IFQ side/back geometry.
- For production IFQ frames, ask the client for front, 3/4 side, side, back, grille-off, detached-grille, base/control, and remote photos before generating product-bound variants.
- If a frame needs the IFQ at an angle where the back or side is visible, do not use a guessed AI product. Use a client photo or mark the frame as high product-drift risk.

## Generation Notes

- Built-in GPT-image generation was used.
- Each source was generated on a flat `#ff00ff` chroma-key background.
- Local transparency was produced with ImageMagick because the installed Python chroma helper required Pillow, which was not present in this environment.
- Thin magenta edge remnants can appear if the asset is placed on a dark background at very large scale. If needed, re-key from `source-chroma/` with a stronger tolerance or locally contract the edge.
- No generated Chinese/English text is used inside these assets; final copy should be overlaid locally.

## Prompt Seeds

These are shortened prompt seeds for future v02/v03 generations.

### Cool Air Ribbon Loop

```text
Create one reusable opaque Cool Air blue airflow ribbon module for Imarflex social carousel posts. Use a wide loop plus one diagonal route, clean tapering arrowheads, blue-and-white painted texture, crisp edges, no product, no room, no text. Style: premium bitmap social-card asset, Heritage Blue and Cool Air, energetic but clean. Generate on flat #ff00ff chroma-key background with no shadow or reflection.
```

### Editorial Board Cluster

```text
Create one editorial product-board cluster: layered Rice White and Clay Beige paper cards, blank photo frames, beige and Cool Air blue tape, Heritage Blue dotted grid, callout lines, swatch strip, no text and no product. Style: Kinfolk/Monocle editorial board with Imarflex social-card energy. Generate on flat #ff00ff chroma-key background with no shadow touching the background.
```

### IFQ Room Airflow Diagram Card

```text
Create one compact Hong Kong room airflow diagram card: isometric/top-down room, window, wall AC, sofa/bed, table, TV cabinet, blue loop arrows, diagonal sweep, blank placement markers, empty product-placement zone. No fake fan, no text, no labels. Style: technical editorial fan airflow diagram. Generate on flat #ff00ff chroma-key background.
```

### IFQ Feature Proof Chip Cluster

```text
Create one feature-proof chip cluster with four white paper chips and blue pictorial icons only: quiet airflow, remote/control, detachable grille, and a fan-face proof icon with exactly three broad blades. Include callout dots and connector lines, no text, no product render, no logos. Style: Imarflex diagram-card social asset. Generate on flat #ff00ff chroma-key background.
```
