---
type: asset-system-index
area: online-marketing
campaign: 2026-07-go-live-kits
status: draft
created: 2026-06-09
scope:
  - IFQ-22R
  - ICF-140R
tags:
  - online-marketing
  - assets
  - illustration-system
  - social-carousel
  - versioning
---

# July Product Post Asset System

This folder organises reusable **inside-post assets** and examples for July product social posts.

The goal is to stop treating every post image as a totally new composition. Instead, build reusable asset families that can be combined across tips, direct-selling posts, product proof, CTA frames, and carousel sequences.

Related:

- [[online-marketing/sales-content/go-live-kits/assets/generated-text-v2/illustration-asset-guidelines]]
- [[examples/ifq22r-direct-sell-feature-showcase]]
- [[generated-bitmap/v01-creative-space-assets/_readme]]
- [[online-marketing/sales-content/go-live-kits/assets/generated-text-v2/masters/ifq22r-direct-sell-feature-showcase-v1/_readme]]
- [[online-marketing/sales-content/go-live-kits/assets/generated-text-v2/_readme]]

Contact sheet:

![[online-marketing/sales-content/go-live-kits/assets/generated-text-v2/asset-system/asset-system-v01-contact-sheet.png]]

Source SVG: `asset-system-v01-contact-sheet.svg`.

## Folder Model

```text
asset-system/
  _index.md
  examples/
    ifq22r-direct-sell-feature-showcase.md
  families/                 # create when individual assets are produced
    airflow-ribbon/
      airflow-ribbon-v01.md
      airflow-ribbon-v02.md
    feature-icons/
      quiet-icon-v01.md
      remote-icon-v01.md
    room-maps/
      hk-living-room-ac-placement-v01.md
  generated-bitmap/          # GPT-image raster modules for richer social-card assets
    v01-creative-space-assets/
      source-chroma/
      transparent/
      _readme.md
```

Do not create a new family for every post. Create a family when the asset can be reused in at least three situations.

## Asset Family Definition

An asset family is a reusable design element with variants.

| Family | Purpose | Example Variants |
|---|---|---|
| `airflow-ribbon` | Shows IFQ circulation / room movement | loop, diagonal route, window route, AC-assisted loop |
| `cool-mist-ribbon` | Shows ICF water-assisted personal cooling | desk zone, bedside zone, open-window zone |
| `heat-patch` | Shows hot/stuffy problem state | sofa patch, window patch, work-corner patch |
| `feature-icons` | Recaps benefits | quiet, remote, easy-clean, DC, water tank, filter, caster |
| `room-maps` | Explains placement or airflow logic | window route, diagonal route, AC loop, before/after |
| `detail-insets` | Shows product-specific proof | grille, blade, remote, base controls, filter, tank, wheels |
| `comparison-modules` | Shows before/after or fan-vs-circulator | straight-vs-loop, wrong-vs-right placement, sealed-vs-ventilated |

## Versioning Rules

Use `v01`, `v02`, `v03` for asset-family variants, not for random regenerated duplicates.

| Version Change | Make New Version? | Example |
|---|---|---|
| Same asset, just exported to a new size | No | `airflow-ribbon-v01` exported to 1:1 and 4:5 |
| Same asset, color/line style refined | Yes | `airflow-ribbon-v02` with softer taper |
| Same icon idea, clearer shape | Yes | `remote-icon-v02` after v01 was unclear |
| Same layout but different post text | No | local text overlay variant, not a new asset |
| Different product-specific geometry | Yes | `ifq-grille-detail-v01` vs `icf-filter-detail-v01` |
| New scenario or behavior | Yes | window route vs AC-assisted route |

## Naming Convention

Use this pattern:

```text
<product-or-shared>-<asset-family>-<scenario>-v<nn>.<ext>
```

Examples:

```text
shared-airflow-ribbon-loop-v01.svg
ifq22r-room-map-ac-placement-v01.svg
ifq22r-detail-grille-detach-v01.png
icf140r-cool-mist-desk-zone-v01.svg
shared-feature-icon-remote-v01.svg
```

For generated examples:

```text
masters/ifq22r-direct-sell-feature-showcase-v1/
  ifq22r-direct-sell-single-card-v1.png
  _readme.md
```

## Generated Examples

| Example | Format | Status | Link |
|---|---|---|---|
| IFQ-22R direct-sell feature showcase | Single card | generated concept candidate | [[online-marketing/sales-content/go-live-kits/assets/generated-text-v2/masters/ifq22r-direct-sell-feature-showcase-v1/_readme]] |

## Generated Bitmap Asset Pack V01

| Pack | Method | Status | Link |
|---|---|---|---|
| Creative space bitmap assets | GPT-image + chroma-key transparent PNGs | draft review | [[generated-bitmap/v01-creative-space-assets/_readme]] |

Use the bitmap pack when the post needs the richer raster feeling from the reference carousels:

- editorial board / paper-card depth,
- painterly airflow ribbons,
- room diagram cards,
- social-card feature-chip modules.

Use the SVG kit when the post needs deterministic overlays, clean local iconography, or precise geometry. The two systems should work together: bitmap assets create richer space; SVG/local overlays keep exact text and proof details controlled.

## Generated V01 Asset Kit

| Family | Status | Assets |
|---|---|---|
| [[families/airflow-ribbon/_readme|airflow-ribbon]] | v01 generated | loop, diagonal route, AC-assisted loop |
| [[families/cool-mist-ribbon/_readme|cool-mist-ribbon]] | v01 generated | ICF local-zone mist ribbon |
| [[families/heat-patch/_readme|heat-patch]] | v01 generated | soft orange heat haze |
| [[families/feature-icons/_readme|feature-icons]] | v01 generated | quiet, circulation, easy-clean, remote, DC, window, AC, diagonal route, water tank, filter, caster |
| [[families/room-maps/_readme|room-maps]] | v01 generated | IFQ living-room AC placement map |
| [[families/detail-insets/_readme|detail-insets]] | v01 generated | IFQ grille, IFQ three-blade, IFQ remote, ICF filter |
| [[families/comparison-modules/_readme|comparison-modules]] | v01 generated | IFQ straight-vs-loop comparison |

The v01 kit is intentionally deterministic SVG. Use these as local overlays or as references inside future image prompts.

## Reuse Matrix

| Asset Family | Tips / Education | Direct Selling | Product Proof | CTA | Story | FB |
|---|---:|---:|---:|---:|---:|---:|
| Airflow ribbon | High | High | Medium | Medium | High | High |
| Cool mist ribbon | High | High | Medium | Medium | High | High |
| Heat patch | High | Medium | Low | Low | High | Medium |
| Feature icons | Medium | High | High | High | High | High |
| Room maps | High | Medium | Medium | Low | Medium | Low |
| Detail insets | Low | High | High | Medium | Medium | Medium |
| Comparison modules | High | Medium | Medium | Low | Low | Medium |

## Post-Type System

Do not limit July posts to tips and topic angles. Add direct product-selling formats.

| Post Type | Purpose | Best Format | Asset Mix |
|---|---|---|---|
| Tips / education | Build usefulness and save value | Carousel | Room map, comparison module, icons |
| Direct product sell | Make product desire and feature stack obvious | Single card or combined card | Product hero, feature icons, detail inset, ribbon |
| Product proof | Show a feature is real | Carousel or single proof card | Product-detail inset, callout arrow, exact product reference |
| Use-case sell | Connect feature to a room/life moment | Single card or FB | Mood image, product hero, one primary asset |
| CTA / offer | Push action without overexplaining | Single card or last carousel frame | Product hero, benefit chips, CTA text |
| Myth correction | Correct wrong expectation | Carousel | Comparison module, state cue, concise copy |

## Showcase Formats

### Single-Card Format

One image carries the whole selling message.

Use when:

- the feature stack is short,
- product recognition matters,
- the channel is FB, Story, or a standalone IG post.

Structure:

- Product hero: 50-65%.
- Headline: large.
- Feature chips: 3-4.
- One detail inset or ribbon.

### Combined-Story Card Format

One image combines multiple slide roles into one designed card: mood image + product proof + description panel.

Use when:

- the product needs emotional context and feature proof at once,
- you want a carousel feel but only have one feed image,
- the post is a product-selling summary.

Structure:

- Mood panel: room / lifestyle / problem state.
- Product panel: hero cutout.
- Detail panel: feature proof inset.
- Description panel: short copy and icon chips.

### Carousel Format

Multiple frames let the story breathe.

Use when:

- the topic needs explanation,
- product proof needs several angles,
- users should save the post as a guide.

Typical direct-selling sequence:

1. Product promise.
2. Feature stack.
3. Feature proof.
4. Room/use-case proof.
5. CTA / warranty / model recap.

## Decision Rule

Choose the smallest format that can sell the point clearly.

| Need | Use |
|---|---|
| One strong feature or CTA | Single card |
| Mood + product + specs in one feed post | Combined-story card |
| Multiple proof points or education | Carousel |
| Exact product geometry missing | Use front-safe product hero + illustration assets |
| Exact Chinese text/punctuation required | Use local text overlay |
