---
type: gpt-image-prompt-register
status: ifq-carousel-generated
area: online-marketing
publish-month: 2026-07
campaigns:
  - IFQ-22R
  - ICF-140R
asset-folder: online-marketing/assets/2026-07-go-live-kits/generated-text-v2
asset-policy: master-first
local-proof-status: generated
gpt-master-status: partial-ifq-carousel-generated
source-kits:
  - 2026-06-ifq-22r-circulator-buying-guide
  - 2026-06-icf-140r-cooler-trust
tags:
  - online-marketing
  - sales-content
  - gpt-image
  - text-in-image
---

# 2026-07 GPT-image Text Overlay Prompts

This is the v2 image-generation layer for the July demo product posts. The original generated assets intentionally avoided text; this register asks GPT-image to render the post text directly in the image. Local proof exports have also been generated from the existing no-text images as deterministic fallback references.

Related:

- [[2026-06-ifq-22r-circulator-buying-guide]]
- [[2026-06-icf-140r-cooler-trust]]
- [[production-tracker-2026-07]]
- [[online-marketing/assets/2026-07-go-live-kits/_readme]]
- [[online-marketing/assets/2026-07-go-live-kits/generated-text-v2/_readme]]
- IFQ-22R product source: [[../../products/ifq-22r/_index]], [[../../products/ifq-22r/spec]], [[../../products/ifq-22r/assets]]
- ICF-140R product source: [[../../products/icf-140r/_index]], [[../../products/icf-140r/spec]], [[../../products/icf-140r/assets]]

## Global Rules

- Use GPT-image text rendering. Do not remove text from prompts just because older models struggled with Chinese copy.
- Render only the exact text in each prompt. No extra English labels, fake model text, fake prices, fake QR codes, fake URLs, or random UI text.
- Generate one master image per unique scene + message. If only the crop or channel size changes, export the variant locally from the master instead of regenerating the same visual.
- For this v2 pass, do **not** regenerate blog-size duplicates. The text-in-image work targets social post images; blog images can continue using the existing no-text images or local crops from social/no-text masters.
- Use the approved Imarflex palette: Heritage Blue `#1E4B7A`, Rice White `#F7F6F2`, Clay Beige `#E7D7C1`, Steam Grey `#DCE1E6`, Soft Charcoal `#3C3F42`, Cool Air `#BFD7E6`.
- Approved styles:
  - **Muji-style minimal poster** for feature cards, hook cards, checklist cards, CTA cards.
  - **Kinfolk/Monocle base** for lifestyle, Facebook, and Story key visuals.
- Product truth:
  - IFQ-22R must read as a white round-grille circulator with spiral grille ribs, twin wood-tone support arms, rounded white base, and slim remote. When blades are visible, show exactly **3 white fan blades**.
  - ICF-140R must read as a slim upright white tower cooler with black top/front grille, blue water/filter cues, wheels/casters, and black remote. Keep it in ventilated personal-zone scenes, never as a sealed-room aircon replacement.

## Efficiency Plan

Previous generated stills created several concept repeats across blog / IG / FB / Story. The v2 rule is:

| Need | Efficient handling |
|---|---|
| Blog hero / inline images | Keep existing no-text assets, or crop from a matching master; no new v2 social-text generation |
| IG carousel frames | Generate as text masters because each frame has distinct copy |
| FB link images | Generate only when the Facebook message differs from the IG copy |
| Story key frames | Generate only when the Story message or safe area differs materially |
| Same master needed in multiple sizes | Store GPT-image result in `masters/`, export resized/cropped files to `exports/` |

Target folders:

```text
online-marketing/assets/2026-07-go-live-kits/generated-text-v2/
  masters/
  exports/
  _readme.md
```

## Asset Register

| Filename | Channel | Ratio | Style | Role | Status |
|---|---|---|---|---|---|
| `ifq22r-v2-ig-frame1-hook` | IG carousel | 4:5 | Muji minimal | master | GPT master generated; 4:5 export generated; formal QA needed |
| `ifq22r-v2-ig-frame2-vs-fan` | IG carousel | 4:5 | Muji minimal | master | GPT master generated; 4:5 export generated; punctuation QA needed |
| `ifq22r-v2-ig-frame3-dc-quiet` | IG carousel | 4:5 | Muji minimal | master | GPT master generated; 4:5 export generated; formal QA needed |
| `ifq22r-v2-ig-frame4-omnidirectional` | IG carousel | 4:5 | Kinfolk/Monocle | master | GPT master generated; preferred top crop generated; center crop has unwanted prop text |
| `ifq22r-v2-ig-frame5-detach` | IG carousel | 4:5 | Muji minimal | master | GPT master generated; 4:5 export generated; 3-blade visual check passed; v3 square social-card test generated; formal QA needed |
| `ifq22r-v2-ig-frame6-cta` | IG carousel | 4:5 | Kinfolk/Monocle | master | GPT v2 master generated; 4:5 export generated; text spacing QA needed |
| `ifq22r-v2-fb-lifestyle` | Facebook | 4:5 | Kinfolk/Monocle | master | prompt ready; local proof generated |
| `ifq22r-v2-story-detach` | Story | 9:16 | Kinfolk/Monocle | master | prompt ready; local proof generated |
| `icf140r-v2-ig-frame1-hook` | IG carousel | 4:5 | Kinfolk/Monocle | master | prompt ready; local proof generated |
| `icf140r-v2-ig-frame2-principle` | IG carousel | 4:5 | Muji minimal | master | prompt ready; local proof generated |
| `icf140r-v2-ig-frame3-checklist` | IG carousel | 4:5 | Muji minimal | master | prompt ready; local proof generated |
| `icf140r-v2-ig-frame4-range-spec` | IG carousel | 4:5 | Muji minimal | master | prompt ready; local proof generated |
| `icf140r-v2-ig-frame5-cta` | IG carousel | 4:5 | Kinfolk/Monocle | master | prompt ready; local proof generated |
| `icf140r-v2-fb-hero` | Facebook | 1.91:1 | Kinfolk/Monocle | master | prompt ready; local proof generated |
| `icf140r-v2-story-9x16` | Story | 9:16 | Kinfolk/Monocle | master | prompt ready; local proof generated |

## IFQ-22R Prompts

### `ifq22r-v2-ig-frame1-hook`

Use case: ads-marketing.
Asset type: Instagram carousel frame, 4:5 portrait poster.
Style: Muji-style minimal poster.
Exact text to render:

```text
循環扇點揀?
睇呢 3 個 icon 就夠
```

Prompt:

Create a clean 4:5 Instagram poster for Imarflex. Show the IFQ-22R air circulator as a white compact round-grille desktop circulator with spiral grille ribs, twin wood-tone support arms, rounded white base, and slim white remote. Use a Rice White `#F7F6F2` background, generous negative space, and three tiny Heritage Blue line icons for quiet / oscillation / easy-clean. Render the exact Traditional Chinese text above in large clean printed sans-serif typography, Soft Charcoal headline with Heritage Blue accent. Make the text crisp, readable, and part of the poster design. No other text. Avoid: misspelled Chinese, extra English labels, fake model text, fake price, fake QR code, fake logo badge, generic fan shape, extra fan blades, saturated red, clutter.

### `ifq22r-v2-ig-frame2-vs-fan`

Use case: ads-marketing.
Asset type: Instagram carousel frame, 4:5 portrait poster.
Style: Muji-style minimal poster.
Exact text to render:

```text
唔係吹你,係吹空氣
風扇吹人 / 循環扇帶對流
```

Prompt:

Create a clean 4:5 explanatory Instagram poster. On the left, show a simple ordinary table fan with one straight Cool Air line; on the right, show the real IFQ-22R silhouette: white round spiral grille, twin wood-tone support arms, rounded white base. Add a gentle looping Cool Air `#BFD7E6` airflow line around the IFQ-22R only. Use a Steam Grey `#DCE1E6` and Rice White `#F7F6F2` minimal background. Render the exact Traditional Chinese text above as two lines, large and readable, with the first line as the main headline. No other text. Avoid: misspelled Chinese, extra labels, fake model text, fake numbers, busy infographic clutter, distorted grille, extra fan blades, aircon imagery.

### `ifq22r-v2-ig-frame3-dc-quiet`

Use case: ads-marketing.
Asset type: Instagram carousel frame, 4:5 portrait poster.
Style: Muji-style minimal poster.
Exact text to render:

```text
DC 馬達
相對 AC 更靜、更慳電
```

Prompt:

Create a quiet 4:5 Instagram poster. Show the IFQ-22R in a calm side/rear three-quarter angle with its white round housing, spiral grille edge, twin wood-tone support arms, rounded white base, and small remote. Use soft window light, Rice White background, Steam Grey textile prop, and a minimal Heritage Blue sound-wave icon. Render the exact text above in clean printed Traditional Chinese typography, with "DC 馬達" large and the second line smaller. No other text or numbers. Avoid: misspelled Chinese, fake decibel values, fake wattage, fake model labels, dark navy body, extra blades, bedroom clutter, saturated red.

### `ifq22r-v2-ig-frame4-omnidirectional`

Use case: ads-marketing.
Asset type: Instagram carousel frame, 4:5 portrait poster.
Style: Kinfolk/Monocle base.
Exact text to render:

```text
360° 全方位對流
氣流去到房尾
```

Prompt:

Create an editorial 4:5 Instagram poster in a compact Hong Kong home corner with soft natural daylight. Show the IFQ-22R tilted slightly upward, keeping the true white round spiral grille, twin wood-tone support arms, rounded white base, and remote. Add subtle Cool Air arc lines to suggest 360° circulation with left-right oscillation across the room. Use Kinfolk/Monocle editorial styling: practical, warm, sparse, premium but not luxury. Render the exact Traditional Chinese text above in a clean poster block with Soft Charcoal text and Heritage Blue emphasis. No other text. Avoid: misspelled Chinese, fake specs, exaggerated motion blur, aircon unit, distorted grille, extra fan blades, stock-model staging.

### `ifq22r-v2-ig-frame5-detach`

Use case: ads-marketing.
Asset type: Instagram carousel frame, 4:5 portrait poster.
Style: Muji-style minimal poster.
Exact text to render:

```text
前網罩快拆
前網罩拆得出易抹
```

Prompt:

Create a clean proof-style 4:5 Instagram poster. Show the IFQ-22R with its round white front grille detached and set beside the body on a Clay Beige surface: the round white front grille off to one side, and the white body with twin wood-tone support arms and rounded base still holding the fan blade, with exactly 3 white blades visible through the open front. Add a folded Steam Grey towel and no unnecessary props. Render the exact Traditional Chinese text above in large clean printed typography, with plenty of negative space. No other text. Avoid: misspelled Chinese, extra English, broken parts, jagged parts, five-blade fan, extra blades, fake model labels, fake logo badge, dirty alarmist styling.

### `ifq22r-v2-ig-frame6-cta`

Use case: ads-marketing.
Asset type: Instagram carousel frame, 4:5 portrait poster.
Style: Kinfolk/Monocle base.
Exact text to render:

```text
IFQ-22R
連遙控 + 2 年保養
```

Prompt:

Create a warm closing 4:5 Instagram poster. Show the IFQ-22R fully assembled in a calm Hong Kong home corner, white round spiral grille, twin wood-tone support arms, rounded white base, slim white remote in front. Use soft natural golden window light, Rice White wall, Clay Beige ceramic tray, and restrained Kinfolk/Monocle editorial composition. Render the exact text above as a crisp poster CTA, "IFQ-22R" large and "連遙控 + 2 年保養" smaller. No other text. Avoid: misspelled Chinese, fake price, fake URL, fake QR code, fake logo badge, distorted fan, extra fan blades, Western family staging.

### `ifq22r-v2-fb-lifestyle`

Use case: ads-marketing.
Asset type: Facebook feed image, 4:5 portrait.
Style: Kinfolk/Monocle base.
Exact text to render:

```text
淨係涼一邊?
問題係空氣冇對流
```

Prompt:

Create a Kinfolk/Monocle-style 4:5 Facebook poster in a compact Hong Kong living room. Show the IFQ-22R on the floor near a sofa, angled to circulate air across the room. Product truth: white round spiral grille, twin wood-tone support arms, rounded white base, slim remote. Use natural afternoon window light, Rice White walls, Clay Beige and Steam Grey furnishings, and subtle Cool Air airflow cues. Render the exact Traditional Chinese text above in a clean editorial headline area with strong readability. No other text. Avoid: misspelled Chinese, fake model labels, fake prices, aircon unit, exaggerated cooling claim, generic pedestal fan, extra fan blades.

### `ifq22r-v2-story-detach`

Use case: ads-marketing.
Asset type: Instagram Story key frame, 9:16 vertical.
Style: Kinfolk/Monocle base.
Exact text to render:

```text
IFQ-22R
DC 靜音 + 全方位 + 易拆前網罩
```

Prompt:

Create a 9:16 vertical Story poster. Show the IFQ-22R mid-detach, with a hand lifting the round white front grille to reveal exactly 3 white fan blades inside. Keep the real product look: white spiral grille, twin wood-tone support arms, rounded white base, slim white remote nearby. Use natural window light, Rice White background, Clay Beige surface, folded Steam Grey towel, and clean space for Story UI. Render the exact text above in a clear poster block, readable on mobile. No other text. Avoid: misspelled Chinese, extra labels, fake stickers, fake prices, broken parts, extra blades, distorted hands, clutter.

## ICF-140R Prompts

### `icf140r-v2-ig-frame1-hook`

Use case: ads-marketing.
Asset type: Instagram carousel frame, 4:5 portrait poster.
Style: Kinfolk/Monocle base.
Exact text to render:

```text
冷風機=平價冷氣?
先搞清楚一件事
```

Prompt:

Create a 4:5 Instagram poster in a window-side Hong Kong study corner. Show the ICF-140R as a slim upright white tower cooling fan with black top control panel, tall dark front grille with vertical slats, white side panels, caster wheels, and black remote. Keep the window open with a sheer Steam Grey curtain to signal ventilation. Use Kinfolk/Monocle editorial styling, natural daylight, Rice White wall, Cool Air accents. Render the exact Traditional Chinese text above, crisp and readable, with headline hierarchy. No other text. Avoid: misspelled Chinese, air-conditioner unit, sealed whole-room cooling implication, frost blast, fake price, fake model label, fake UI text.

### `icf140r-v2-ig-frame2-principle`

Use case: ads-marketing.
Asset type: Instagram carousel frame, 4:5 portrait poster.
Style: Muji-style minimal poster.
Exact text to render:

```text
水蒸發 = 吹涼風
注水 → 水簾 → 出風
```

Prompt:

Create a Muji-style minimal 4:5 explanatory poster. Show a clear three-step still life: water poured into a transparent tank, a blue water-curtain/filter panel, and a soft Cool Air stream toward a paper pinwheel. Include a partial ICF-140R silhouette at the side: slim white tower, black front grille, blue water/filter cue, wheels. Render the exact Traditional Chinese text above in clean printed typography. No other text. Avoid: misspelled Chinese, random labels, fake arrows with text, snowflakes, ice explosion, aircon imagery, fake spec numbers.

### `icf140r-v2-ig-frame3-checklist`

Use case: ads-marketing.
Asset type: Instagram carousel frame, 4:5 portrait poster.
Style: Muji-style minimal poster.
Exact text to render:

```text
啱唔啱用?
✅ 通風
✅ 較乾爽
✅ 局部
❌ 追冷氣感
```

Prompt:

Create a Muji-style minimal checklist poster, 4:5 portrait. Use Rice White cards on a Clay Beige linen surface, with a Heritage Blue pen and sparse product cue: small cropped ICF-140R tower cooler edge with black grille and white side panel. Render the exact checklist text above as clean readable printed Traditional Chinese, with check and cross symbols. Keep layout simple, calm, and trustworthy. No other text. Avoid: misspelled Chinese, extra checklist items, fake UI screen, aircon unit, sealed living room, alarmist red crosses, clutter.

### `icf140r-v2-ig-frame4-range-spec`

Use case: ads-marketing.
Asset type: Instagram carousel frame, 4:5 portrait poster.
Style: Muji-style minimal poster.
Exact text to render:

```text
真實降溫期望
加水 4–6°C
加冰 8–10°C
視乎環境
```

Prompt:

Create a measured 4:5 Instagram poster for the ICF-140R. Show the slim white tower cooler with black front grille and caster wheels beside an open window, plus three small blank folded reference cards to suggest a range. Use Steam Grey surface, Cool Air highlights, and Heritage Blue accents. Render the exact Traditional Chinese text and numbers above, crisp and readable, with "視乎環境" visibly smaller as a caveat. No other text. Avoid: misspelled Chinese, fake guarantee language, extra numbers, frost blast, air-conditioner units, sealed-room implication, fake price, fake URL.

### `icf140r-v2-ig-frame5-cta`

Use case: ads-marketing.
Asset type: Instagram carousel frame, 4:5 portrait poster.
Style: Kinfolk/Monocle base.
Exact text to render:

```text
買得明白
用得長久
登記 2 年保養
```

Prompt:

Create a warm 4:5 CTA poster. Show the ICF-140R softly in the background beside an open window, with the correct slim white tower body, black top/front grille, wheels, and black remote. Foreground: Rice White warranty card and smartphone with a blank form silhouette, no readable UI text. Use Kinfolk/Monocle natural-light styling with Clay Beige and Cool Air accents. Render the exact Traditional Chinese text above in a clean poster block, readable and calm. No other text. Avoid: misspelled Chinese, fake form fields, fake URLs, QR code, fake price, aircon unit, exaggerated cooling claim.

### `icf140r-v2-fb-hero`

Use case: ads-marketing.
Asset type: Facebook link post image, 1.91:1 landscape.
Style: Kinfolk/Monocle base.
Exact text to render:

```text
冷風機≠冷氣
局部降溫要通風
```

Prompt:

Create a 1.91:1 Facebook hero poster. Show the ICF-140R in a ventilated Hong Kong personal corner beside an open window and small writing desk. Product truth: slim upright white tower cooler, black top control panel, tall dark front grille with vertical slats, caster wheels, black remote. Use soft natural daylight, moving sheer curtain, Rice White wall, Heritage Blue and Cool Air accents. Leave one side for the exact text above, rendered large, crisp, and readable. No other text. Avoid: misspelled Chinese, aircon unit, sealed room, whole-home cooling implication, frost graphics, fake price, fake URL, fake model label.

### `icf140r-v2-story-9x16`

Use case: ads-marketing.
Asset type: Instagram Story key frame, 9:16 vertical.
Style: Kinfolk/Monocle base.
Exact text to render:

```text
你以為冷風機=冷氣嗎?
局部降溫,要通風
```

Prompt:

Create a 9:16 Story poster. Show the ICF-140R beside an open window in a compact Hong Kong personal corner: slim upright white tower cooler, black top and front grille, wheels/casters, black remote nearby, cup of iced water on a small stool. Use natural daylight, sheer curtain moving, Rice White wall, Clay Beige and Cool Air accents. Render the exact Traditional Chinese text above in a clear mobile-readable poster block. No other text. Avoid: misspelled Chinese, fake stickers, fake poll text, aircon units, sealed-room cooling implication, frost blast, fake model label, fake price.

## QA After Generation

- Text must be exact. If a frame misspells Traditional Chinese or adds random text, regenerate.
- IFQ-22R exposed blade views must show exactly 3 blades.
- IFQ-22R should stay white with wood-tone supports and white base.
- ICF-140R should stay a white upright tower cooler with black front/top grille and wheels.
- ICF-140R frames must communicate local / ventilated / personal-zone cooling, not aircon replacement.
- Save final images under `online-marketing/assets/2026-07-go-live-kits/generated-text-v2/`.
