---
type: brand
section: visual
status: in-progress
priority: high
images:
  - assets/visual-logo-usage/logo-usage-variant-grid.png
  - assets/visual-logo-usage/logo-usage-clear-space.png
  - assets/visual-logo-usage/logo-usage-min-size.png
  - assets/visual-logo-usage/logo-usage-on-backgrounds.png
  - assets/visual-logo-usage/logo-usage-do-dont.png
  - assets/visual-logo-usage/logo-usage-favicon-mockup.png
generation: deterministic-composite
generator: scripts/generate_logo_usage_images.py
source-logos:
  - "brand/guideline/logos/imarflex-mark.png"
  - "brand/guideline/logos/imarflex-wordmark.png"
---

# Logo Usage / Logo 使用規則

> 🟡 In-progress — usage rules + reference images 已完成。仲等設計師交 vector master(SVG / ICO / PDF)先可以收尾 `status: final`。
> Source logos: `brand/guideline/logos/imarflex-mark.png` + `imarflex-wordmark.png` ([[../brand/guideline/logos/README|asset list]]).

## Logo variants

![[assets/visual-logo-usage/logo-usage-variant-grid.png]]

| Variant | When to use |
|---|---|
| **Master · color** | 預設 logo,放喺 Rice White / Clay Beige surface |
| **Mono · white** | Heritage Blue / 深色相 / 深色 product surface |
| **Mono · black** | 單色 print / 淺色低對比 surface |
| **Wordmark only** | Header / footer / 闊度有限制 |
| **Symbol only** | Favicon、App icon、Social avatar、loading state |

## Clear space

![[assets/visual-logo-usage/logo-usage-clear-space.png|640]]

四邊必須預留 **≥ 1× 嘅 symbol x-height** 嘅空白。
唔好放任何 graphic / typography 入呢個 zone。

## Minimum size

![[assets/visual-logo-usage/logo-usage-min-size.png]]

| Format | Digital | Print |
|---|---|---|
| Symbol height | **≥ 24px** (favicon 例外) | ≥ 8mm |
| Wordmark width | **≥ 80px** | ≥ 25mm |

低過呢啲 size 嘅情景:用 symbol-only 代替,唔好強行縮 wordmark。

## On backgrounds

![[assets/visual-logo-usage/logo-usage-on-backgrounds.png]]

| Background | Variant | Note |
|---|---|---|
| Rice White `#F7F6F2` | Master · color | ✓ Primary surface |
| Clay Beige `#E7D7C1` | Master · color | ✓ Warm surface |
| Heritage Blue `#1E4B7A` | Mono · white | ✓ |
| Soft Charcoal `#3C3F42` | Mono · white | ✓ |
| Cool Air `#BFD7E6` | Mono · black | ✓ |
| Saturated red / orange | — | ✗ Never — conflicts with red dot |

## Do / Don't

![[assets/visual-logo-usage/logo-usage-do-dont.png]]

| ✅ Do | ❌ Don't |
|---|---|
| 用提供嘅 master files | 唔好 stretch / skew / rotate |
| Clear space ≥ symbol x-height | 唔好換顏色(用 approved monochrome variant) |
| Mono variant 用喺單色 print | 唔好加 drop shadow / glow / outline |
| 揀啱 approved background | 唔好疊喺 busy / low-contrast 背景 |

## Favicon & app icon

![[assets/visual-logo-usage/logo-usage-favicon-mockup.png]]

- **Favicon (browser tab)**:`imarflex-mark` 用喺 32 / 16 px。Render 喺 ICO + PNG (32, 16) + SVG 三種 fallback。
- **App icon**:rounded square,Heritage Blue `#1E4B7A` 背景 + mono-white symbol(symbol 佔 icon 高度約 65%)。iOS @1x 180px / @2x 120px。

## File outputs

`scripts/generate_logo_usage_images.py` 自動產生 stand-in deliverable files,放喺 `assets/visual-logo-usage/`。Designer ship 真 vector / CMYK 後就 swap 出舊嘅。

### ✅ Ready (real master quality)

| File | Notes |
|---|---|
| `brand/guideline/logos/imarflex-mark.png` | Symbol PNG (1024px, designer-provided) |
| `brand/guideline/logos/imarflex-wordmark.png` | Wordmark PNG (1849x851, designer-provided) |
| `assets/visual-logo-usage/imarflex-favicon.ico` | Multi-size ICO: 16 / 32 / 48 / 64 / 128 / 256 px. Heritage Blue rounded-square + mono-white symbol. Production-ready. |

### ⚠️ Stand-in (auto-generated, designer must replace)

| File | What it actually is | Replace when |
|---|---|---|
| `assets/visual-logo-usage/imarflex-logo-master.pdf` | A4 raster-embedded RGB PDF, 300dpi. Fine for proofing / digital handoff. **Not press-grade CMYK.** | Press job — get designer's vector PDF with CMYK ICC profile. |
| `assets/visual-logo-usage/imarflex-symbol.svg` | PNG embedded inside `<svg><image href="data:..."/></svg>`. Valid SVG, scales for web. **Not hand-drawn bezier paths.** | Designer ships true vector. Re-run script — it skips files whose top banner is missing (= real vector). |
| `assets/visual-logo-usage/imarflex-symbol-mono-white.svg` | Mono-white recolor, raster-embedded | Same as above |
| `assets/visual-logo-usage/imarflex-symbol-mono-black.svg` | Mono-black recolor, raster-embedded | Same as above |
| `assets/visual-logo-usage/imarflex-wordmark.svg` | Wordmark raster-embedded | Same as above |
| `assets/visual-logo-usage/imarflex-wordmark-mono-white.svg` | Wordmark mono-white, raster-embedded | Same as above |
| `assets/visual-logo-usage/imarflex-logo-master-color.svg` | Mark + wordmark horizontal lockup, raster-embedded | Same as above |
| `assets/visual-logo-usage/imarflex-logo-mono-white.svg` | Mono-white lockup, raster-embedded | Same as above |
| `assets/visual-logo-usage/imarflex-logo-mono-black.svg` | Mono-black lockup, raster-embedded | Same as above |

> ⚠️ **Why "stand-in" matters**: A raster-embedded SVG is a real SVG file that deploys to web fine — but if you zoom into it, you'll see the same pixels as the source PNG, not the crisp bezier curves of a designer's master. For favicon, navbar, and most digital placements it's invisible. For large print (poster, billboard) or any case where someone might inspect the curves, ship the designer's real vector.

### 📋 Still needed from the designer (true vector)

The designer's final handoff should still include:

- [ ] `imarflex-logo-master-color.svg` — hand-drawn bezier paths (replace auto-gen)
- [ ] `imarflex-logo-mono-white.svg` — same
- [ ] `imarflex-logo-mono-black.svg` — same
- [ ] `imarflex-symbol.svg` — same
- [ ] `imarflex-wordmark.svg` — same
- [ ] `imarflex-logo-master.pdf` — CMYK with ICC profile for press
- [ ] (Optional) `imarflex-logo.eps` — for legacy print vendors

When the real vectors land, drop them into `brand/guideline/logos/` and re-run `scripts/generate_logo_usage_images.py`. The script detects the auto-generated banner (`<!-- AUTO-GENERATED raster-embedded SVG... -->`) — files without it are left untouched.

→ Master logo source assets live at [[../brand/guideline/logos/README|brand/guideline/logos/]]

## Image generation

呢 doc 入面 6 張 reference image **唔係用 GPT-image 生成**。原因:GPT-image 會畫一個*similar-looking*嘅 logo,唔會 byte-identical 還原我哋自己嘅 master file — 對 usage guideline 嚟講係錯嘅。

實際做法:用 `scripts/generate_logo_usage_images.py` script,讀真 logo PNG,deterministically composite 出 6 張 example。Pillow,冇 AI。

```bash
uv tool run --with pillow python3 "ManyProfit Group/Imarflex/brand/scripts/generate_logo_usage_images.py"
```

之後設計師交 vector master,可以同樣 script 重新 generate 一次 (或者改 script 改用 SVG 源)。

> ⚠️ 從 [[../.claude/agents/imarflex-copywriter]]:**任何時候唔好用 AI generate logo 本身**。Lifestyle / context shot 想加 logo,要 GPT-image 出無 logo 嘅 scene,再 composite 真 logo 入去(Photoshop / Pillow)。

## Reference

- [[../brand/guideline/logos/README|brand/guideline/logos]] — master logo assets
- [[visual-color-palette]] — palette tokens used in reference images
- [[../reference/internal-master#10-brand-guidelines]]
