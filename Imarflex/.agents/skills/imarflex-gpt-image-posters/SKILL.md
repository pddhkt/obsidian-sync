---
name: imarflex-gpt-image-posters
description: Create Imarflex GPT-image social poster prompts and generated assets for Instagram, Facebook, Story, and campaign demo posts. Use when producing Imarflex product visuals, especially text-in-image posters, July go-live kits, Muji-style minimal posters, Kinfolk/Monocle-style editorial layouts, or when product shape/spec accuracy must be locked before image generation.
---

# Imarflex GPT-image Posters

Use this skill to produce social poster prompts and generated image assets for Imarflex campaigns. The default output is a durable Obsidian prompt/register note plus workspace-saved generated assets.

## Workflow

1. Read the campaign note, post record, asset tracker, and product reference images before writing prompts.
2. Extract the exact on-image text from the copy table or post brief. Preserve punctuation, casing, numbers, and Traditional Chinese wording.
3. Inspect product truth from reference photos or official product cards. If a product detail affects image accuracy, state it in the prompt.
4. Choose one approved style direction:
   - Muji-style minimal poster: quiet product-first composition, warm neutral background, generous white space, simple grid, restrained typography.
   - Kinfolk/Monocle base: editorial still life, natural light, practical Hong Kong home context, magazine-like hierarchy, premium but not luxury.
5. Build a master/variant plan before generating:
   - Generate one GPT-image master per unique scene + message.
   - Export crop/size variants locally when only the aspect ratio, safe area, or channel size changes.
   - Regenerate separately only when the text, product pose, background, or message hierarchy must change.
6. Write every master prompt as a production spec with: use case, asset ratio, exact text, product truth, composition, typography, palette, avoid list, and QA checklist.
7. Generate with GPT-image or the available image generation tool. Do not avoid text just because older image models struggled with text.
8. Save generated masters and derived exports into separate campaign folders. Do not leave project-bound assets only in a temporary or Codex-generated location.
9. QA every output against text accuracy and product truth before marking it ready.

## Product Truth Rules

- Never treat a product as a generic appliance if a real SKU reference exists.
- Mention visible shape constraints directly in prompts when they are easy to drift.
- Use product names, model numbers, warranty terms, prices, and specs only when the campaign note already confirms them or marks them as intentionally allowed.
- Avoid fake logos, fake control panel text, fake model labels, fake safety/spec badges, and invented numerical claims.
- For text-heavy posters, ask for clean printed poster typography, not decorative handwriting, unless the brief explicitly requires handwriting.

For current July demo product details, read `references/product-truth.md`.

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
- IFQ-22R visible blade scenes show exactly 3 fan blades.
- ICF-140R does not imply it replaces air conditioning or cools a sealed whole room.
- No fake brand badge/model text/spec number appears unless explicitly requested.
- Ratio fits the intended channel.
- Palette matches Imarflex campaign colors.
- Output is saved in the workspace and referenced from the relevant Obsidian note.
