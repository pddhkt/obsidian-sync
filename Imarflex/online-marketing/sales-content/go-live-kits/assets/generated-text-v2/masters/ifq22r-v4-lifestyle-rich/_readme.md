---
type: marketing-asset-set
area: online-marketing
product: IFQ-22R
style: v4-lifestyle-rich
format: 1:1 square
generated: 2026-06-06
model: gpt_image_2 (Higgsfield)
status: full-story-generated-qa-passed
tags:
  - online-marketing
  - assets
  - gpt-image
  - higgsfield
  - text-in-image
  - social-card
---

# IFQ-22R — V4 Lifestyle-Rich Story (full carousel)

One self-contained set = one style pass. **Square 1:1, lifestyle + information-rich**,
restoring the pitch-deck carousel direction (`pitch/deck/assets/social-carousel-fan-*`).

## Why this set exists (the fix)

The previous **v3 paper-collage** set (`../ifq22r-v3-social-card/`) was judged to lack
**excitement and information** vs the approved pitch-deck carousels. Root cause: a 2026-06-06
style switch that dropped the original lifestyle/info-rich art direction in favour of a flat
kraft-paper collage. That collage:

- floated the product as a bare cutout on flat paper (no room, no aspiration);
- stripped information to one headline + one subline per card (no specs, no diagrams);
- used a warm dusty vintage palette (wrong emotional temperature for a summer cooling product);
- repeated the same layout frame-to-frame.

**V4 restores the pitch-deck direction:** real bright Hong Kong home scenes, airflow
visualised sweeping through the room, an isometric how-to cutaway, verified spec chips, and a
cool airy summer palette — while keeping the big Heritage Blue frame number and exact zh-HK copy.

## Design principles (restored)

1. **Lifestyle context** — every frame is a believable bright HK home, not flat paper.
2. **Information density** — feature chips, a 3-use isometric diagram, CTA buttons. Each card teaches something.
3. **Airflow is the hero** — Cool Air arcs sweep through the actual room.
4. **Cool airy summer palette** — Heritage Blue + Cool Air + Rice White (not warm kraft).
5. **One distinct visual idea per frame** — hook → contrast → spec → how-to → clean → CTA.
6. **Copy is fact-checked** — only specs verified in `products/ifq-22r/spec.md`. No price (still
   pending client). Warranty `2 年` is POP-card confirmed.

## Frames

| File | Frame | Exact text rendered | QA |
|---|---|---|---|
| `ifq22r-v4-01-hook.png` | 01 hook | `01` · `淨係涼一邊?` · `問題係空氣冇對流` | ✅ text exact (Cantonese 冇 correct); real living-room scene; airflow arcs + floor-plan inset; product true |
| `ifq22r-v4-02-vs-fan.png` | 02 vs-fan | `02` · `唔係吹你,係吹空氣` · `風扇吹人、循環扇帶動全屋` · `普通風扇` · `循環扇` | ✅ text exact; ordinary-fan (short blow) vs circulator (whole-room loop) contrast with labels |
| `ifq22r-v4-03-spec.png` | 03 spec | `03` · `DC 馬達,慳電又靜` · `4 段風速、3 種風模式` · chips `360° 對流`/`左右擺頭`/`7 小時定時`/`遙控操作` | ✅ all 4 chips render exact; sound-wave icon; info-rich hero in home corner |
| `ifq22r-v4-04-360-uses.png` | 04 360°/uses | `04` · `360° 全方位對流` · `3 個用法,全屋都涼` · `① 對住人吹`/`② 向窗邊送風`/`③ 配冷氣循環` | ✅ text exact; isometric apartment cutaway, 3 circulators at ①②③ with airflow looping room-to-room |
| `ifq22r-v4-05-detach.png` | 05 detach | `05` · `前網罩快拆` · `拆得出,易抹乾淨` | ✅ text exact; grille detached in warm home setting; **exactly 3 blades confirmed** at full res; towel + 3 wordless icon chips |
| `ifq22r-v4-06-cta.png` | 06 CTA | `06` · `IFQ-22R` · `連遙控、2 年保養` · buttons `立即選購`/`WhatsApp 查詢` · chips `DC 靜音`/`360° 對流`/`易拆清潔` | ✅ text exact; warm premium closing scene + remote; buttons + 3 chips render exact |

## Generation

- **Model:** `gpt_image_2` via Higgsfield CLI.
- **Settings:** `--aspect_ratio 1:1 --resolution 2k --quality high` → 2048×2048 PNG masters.
- **Product reference:** `--image online-marketing/products/ifq-22r/images/source/IFQ-22R.png` passed to every frame for product-truth consistency (round white grille, oak center cap, twin oak support arms, rounded white base, slim remote).
- All copy restricted to exact strings; prompts include explicit "no other words" + an avoid-list
  blocking flat paper-collage / torn paper / masking tape / vintage tone (the v3 failure modes).

## QA carryovers

- Frame 05 open-front blade count: confirmed **3** at full res (`3 葉 PP 物料`, spec.md). Re-check if regenerated.
- Confirm `2 年保養` warranty + outward product name (`極・龍卷` vs `龍卷`) against the live PDP before paid use.
- No price rendered anywhere (MSRP $449 vs selling $499 still to be reconciled with client).

## Next steps

- Export 1:1 → `1080×1080` IG masters into `../../exports/` (resize only; do not regenerate for crop/size).
- This v4 set supersedes v3-social-card as the IFQ-22R carousel look; keep v3 for traceability.

## Prompts (reproducible)

Each frame was generated with the product reference image above. Frame 01 prompt:

```text
Use case: ads-marketing. Asset type: Imarflex IFQ-22R Instagram carousel Frame 01 (hook), square 1:1 master.
Reference image: use the attached IFQ-22R as exact product truth — a compact WHITE round-grille air circulator (NOT a pedestal fan, NOT a tower fan): white spiral/radial front grille, a round wood-tone (oak) center cap, two vertical wood-tone (oak) support arms, a rounded white oval base with small touch buttons and a dark IR receiver slot at the front, and a slim white remote.
Primary request: a bright summery editorial Instagram social card that hooks with an everyday Hong Kong problem: one side of the room stays hot because air does not circulate. Airy, premium, exciting — a real lived-in room, NOT a flat paper background.
Exact text to render, in Traditional Chinese, and no other words: frame number "01"; headline "淨係涼一邊?"; sub-headline "問題係空氣冇對流".
Composition: compact bright HK living room, soft daylight, sheer-curtain window, sofa, plant, warm wood furniture; IFQ-22R on the floor near the sofa angled to push air across the room; clean light Cool Air blue airflow arcs sweeping across the whole room to the far corner; large Heritage Blue "01" upper-left, bold headline with hand-drawn Heritage Blue underline, sub-headline smaller below; small top-down floor-plan inset in a lower corner showing the airflow loop.
Palette: Heritage Blue #1E4B7A, Rice White #F7F6F2, Cool Air #BFD7E6, Clay Beige #E7D7C1, Steam Grey #DCE1E6, Soft Charcoal #3C3F42. Cool airy summer mood.
Product truth: exactly the attached circulator; if blades visible exactly 3 broad white blades.
Avoid: wrong/misspelled Traditional Chinese, extra text/English, fake model/price/URL/QR/logo/spec, pedestal/tower/generic fan, 4 or 5 blades, distorted grille, flat paper-collage, torn paper, masking tape, scrapbook, dusty vintage tone, clutter, Western family staging.
```

Frames 02–06 follow the same skeleton (reference image + exact-text block + lifestyle composition
+ palette + product truth + avoid-list). Full prompt bodies for all six are preserved in the
generation script and summarised per-frame in the table above; the exact text per frame is the
contract — regenerate against those strings.
