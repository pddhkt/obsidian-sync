---
name: imarflex-gpt-image-posters
description: Create Imarflex GPT-image social poster prompts and generated assets for Instagram, Facebook, Story, and campaign demo posts. Use when producing Imarflex product visuals, especially text-in-image posters, July go-live kits, pitch-deck-style social cards, Muji-style minimal posters, Kinfolk/Monocle-style editorial layouts, product source-image audits, client product-photo request lists, or when product shape/spec accuracy must be locked before image generation.
---

# Imarflex GPT-image Posters

Use this skill to produce social poster prompts and generated image assets for Imarflex campaigns. The default output is a durable Obsidian prompt/register note plus workspace-saved generated assets.

## Intake Rules

Ask only for missing decision-critical inputs. Before asking, inspect the vault for likely product notes, source images, post records, and prompt registers.

Ask a concise question when any of these are missing:

- Product/SKU: which product is being handled, or which `online-marketing/products/<sku>/` note/folder should be used.
- Content source: which carousel/post/go-live-kit Markdown note contains the frame copy and purpose.
- Visual direction: whether the run is strict production, product-truth testing, or broader social-card exploration.
- Output scope: which frames/channels to generate now.

If the user does not provide a product source pack, audit what already exists under `online-marketing/products/<sku>/images/source/`, then state what product angles/parts are missing before generating.

## Workflow

1. Read the campaign note, post record, asset tracker, product note, and product reference images before writing prompts.
2. Extract the exact on-image text from the copy table or post brief. Preserve punctuation, casing, numbers, and Traditional Chinese wording.
3. Audit product source images. Identify usable angles/parts and missing client assets. If a scene needs an unsupported angle, mark product-drift risk before generation.
4. Convert each content frame into a scene plan: frame purpose, required product angle/parts, required references, style direction, graphic elements, and QA risks.
5. Choose one or more style directions:
   - Pitch-deck social card: square or feed-friendly social-card template, big frame number, strong Heritage Blue shapes, CTA buttons, icon rows, callout chips, taped/photo-card collage, more energetic composition.
   - Muji-style minimal poster: quiet product-first composition, warm neutral background, generous white space, simple grid, restrained typography.
   - Kinfolk/Monocle base: editorial still life, natural light, practical Hong Kong home context, magazine-like hierarchy, premium but not luxury.
   For testing, generate multiple style directions when the user asks to explore possibilities.
6. Build a master/variant plan before generating:
   - Generate one GPT-image master per unique scene + message.
   - Export crop/size variants locally when only the aspect ratio, safe area, or channel size changes.
   - Regenerate separately only when the text, product pose, background, or message hierarchy must change.
7. Write every master prompt as a production spec with: use case, asset ratio, exact text, product truth, required references, composition, typography, palette, avoid list, and QA checklist.
8. Generate with GPT-image or the available image generation tool. Do not avoid text just because older image models struggled with text.
9. Save generated masters and derived exports into separate campaign folders. Do not leave project-bound assets only in a temporary or Codex-generated location.
10. QA every output against text accuracy, social-card direction, and product truth before marking it ready.

## Product Truth Rules

- Never treat a product as a generic appliance if a real SKU reference exists.
- Mention visible shape constraints directly in prompts when they are easy to drift.
- Use product names, model numbers, warranty terms, prices, and specs only when the campaign note already confirms them or marks them as intentionally allowed.
- Avoid fake logos, fake control panel text, fake model labels, fake safety/spec badges, and invented numerical claims.
- For text-heavy posters, ask for clean printed poster typography, not decorative handwriting, unless the brief explicitly requires handwriting.

For current July demo product details, read `references/product-truth.md`.

## Product Reference Pack Rules

Read `references/product-reference-pack.md` when the task involves source-image auditing, client image requests, extracting parts from a product source board, or deciding whether a frame has enough product references.

- Inspect available product source images before generating.
- If source images contain multiple product parts/views in one image, extract padded crops into a reference folder before using them as generation references.
- Upscale/clean extracted crops only as supporting references; do not treat them as final campaign assets.
- Do not invent hidden geometry. If only a front view exists, keep the generated product mostly front-facing. If the scene requires side/back visibility, ask for side/back product references or mark the frame as high drift risk.
- Build a scene-to-reference matrix for carousel frames: frame purpose, required angle/parts, available references, missing references, and risk level.

## Text-In-Image Rules

- Put exact overlay copy in a clearly labeled prompt field: `Exact text to render: "..."`
- Keep per-image text short. If the post needs more than one line, specify line breaks.
- Specify typography and contrast: dark Soft Charcoal text on Rice White/neutral cards, Heritage Blue for emphasis.
- Ask for the text to be part of the designed poster, clean and readable, with no extra text.
- Include `Avoid: misspelled Chinese, extra English, random labels, fake prices, fake QR codes, fake website URLs`.

## Efficient Asset Generation

Use this decision rule before every batch:

| Situation | Action |
|---|---|
| Same visual scene and same text, different crop/size | Generate once, export variants locally |
| Same scene but different text or headline hierarchy | Prefer one clean master plus local text layout if exact typography is critical; otherwise generate separate text masters |
| Same product but different use case or pose | Generate separate master |
| Blog/FB/IG need the same no-text visual | Generate one no-text master and export 16:9, 1.91:1, 4:5, or 9:16 variants |
| Text-heavy Chinese poster | Keep the text short and generate a dedicated master for that exact text |

Recommended folder structure:

```text
generated-text-v2/
  masters/   # GPT-image outputs, one per unique scene + message
  exports/   # mechanically cropped/resized variants for channel placement
  _readme.md # register of master -> export relationships
```

Do not count a local crop as a new AI-generated asset. Track it as an export derived from a master.

## Style Directions

Read `references/social-card-style.md` when matching the Imarflex pitch-deck carousel examples or exploring more energetic social-card directions.

### Pitch-Deck Social Card

Use for testing, carousel systems, and posts that should feel like designed social cards rather than calm product posters.

- Format: square-first unless the content brief requires 4:5; use local exports for alternate feed ratios.
- Structure: big frame number, strong headline, small subtitle, product/photo module, callout chips, icon rows, CTA buttons on CTA frames.
- Graphics: Heritage Blue corner shapes, Cool Air ribbons, dotted grids, simple line icons, taped-photo or paper-card collage elements.
- Mood: practical, energetic, saveable, designed for IG scanning.
- Avoid over-rigid minimalism, empty poster layouts, generic stock photo staging, and invented product text.

### Muji-Style Minimal Poster

Use for product-feature cards, simple hooks, checklists, and CTA frames.

- Background: Rice White, Steam Grey, or warm Clay Beige.
- Composition: centered or rule-of-thirds product, large calm white space, one clear headline block.
- Typography: clean modern sans-serif, editorial print spacing, no noisy sticker look.
- Mood: practical, calm, honest, everyday home appliance.

### Kinfolk/Monocle Base

Use for lifestyle frames, Facebook hero images, story key frames, and editorial product context.

- Setting: compact Hong Kong home, kitchen counter, window-side study, tiled living room, or neutral studio.
- Light: soft natural daylight, window direction visible, gentle shadows.
- Styling: warm textiles, ceramic cup, notebook, remote, water glass, towel; keep props sparse and purposeful.
- Mood: editorial, trustworthy, lived-in, premium without looking like a fashion ad.

## QA Checklist

- Text is present, exact, readable, and not duplicated.
- Product silhouette matches the reference.
- Any visible side/back/inside product geometry is backed by source references, or the frame is marked high product-drift risk.
- IFQ-22R visible blade scenes show exactly 3 fan blades.
- ICF-140R does not imply it replaces air conditioning or cools a sealed whole room.
- No fake brand badge/model text/spec number appears unless explicitly requested.
- Ratio fits the intended channel.
- Palette matches Imarflex campaign colors.
- Output is saved in the workspace and referenced from the relevant Obsidian note.
