---
type: brand-guideline
section: color-palette
status: draft
priority: high
aliases:
  - Color Palette
  - Heritage Blue Palette
  - Imarflex Palette
---

# Imarflex Color Palette / 伊瑪牌色彩系統

> 完整 token 同 hex,share-ready。
> 呢頁係 **canonical reference** — 任何地方用到顏色都跟呢度。
> Working draft + shadcn CSS variable mapping 喺 [[brand/visual-color-palette]]。

---

## 🧭 命名邏輯

跟 brand voice「**日本起點 · 香港日常**」嘅 metaphor:

| Family | 意思 |
|---|---|
| **Heritage Blue** | 日式藍 / 50 年品牌可靠感 |
| **Rice White** | 米白 / 飯粒 / 純淨 |
| **Clay Beige** | 陶土米 / 工藝感 |
| **Steam Grey** | 蒸氣灰 / 廚房氛圍 |
| **Soft Charcoal** | 墨黑 / 文字 |
| **Cool Air** | 涼氣藍 / 風扇 / 空氣 |
| **Bg Tint / Rule** | 背景 + 分隔 |

---

## 🎨 Full token table

## 🖼️ Client visual boards

| File | Use |
|---|---|
| `imarflex-color-palette-overview.png` | GPT-image generated one-page palette overview for client presentation |
| `imarflex-color-palette-pairings.png` | GPT-image generated usage pairings and do-not-overuse summary |

> [!note]
> PNG boards are client-facing visual references generated with GPT-image. Exact token names and hex values remain canonical in the table below.

![[imarflex-color-palette-overview.png]]

![[imarflex-color-palette-pairings.png]]

### 🔵 Heritage Blue — Primary

| Token | Hex | Swatch | Role |
|---|---|---|---|
| `--heritage-blue` | `#1E4B7A` | <span style="background:#1E4B7A;color:#fff;padding:2px 10px;border-radius:3px">#1E4B7A</span> | Primary CTA / accent / ring / chart-1 |
| `--heritage-blue-2` | `#163A5F` | <span style="background:#163A5F;color:#fff;padding:2px 10px;border-radius:3px">#163A5F</span> | Darker primary / secondary-foreground |
| `--heritage-blue-3` | `#2C5F8F` | <span style="background:#2C5F8F;color:#fff;padding:2px 10px;border-radius:3px">#2C5F8F</span> | Lighter primary / eyebrow text / chart-2 |

### 🍚 Rice White — Surfaces

| Token | Hex | Swatch | Role |
|---|---|---|---|
| `--rice-white` | `#F7F6F2` | <span style="background:#F7F6F2;color:#3C3F42;padding:2px 10px;border-radius:3px;border:1px solid #E5E1D9">#F7F6F2</span> | App background / primary-foreground |
| `--rice-white-2` | `#FFFFFF` | <span style="background:#FFFFFF;color:#3C3F42;padding:2px 10px;border-radius:3px;border:1px solid #E5E1D9">#FFFFFF</span> | Card / popover / sidebar surface |

### 🟤 Clay Beige — Warm Accent

| Token | Hex | Swatch | Role |
|---|---|---|---|
| `--clay-beige` | `#E7D7C1` | <span style="background:#E7D7C1;color:#3C3F42;padding:2px 10px;border-radius:3px">#E7D7C1</span> | Warm accent |
| `--clay-beige-2` | `#D9C5A6` | <span style="background:#D9C5A6;color:#3C3F42;padding:2px 10px;border-radius:3px">#D9C5A6</span> | Warm accent (deeper) / chart-3 |

### 💨 Steam Grey — Cool Neutral

| Token | Hex | Swatch | Role |
|---|---|---|---|
| `--steam-grey` | `#DCE1E6` | <span style="background:#DCE1E6;color:#3C3F42;padding:2px 10px;border-radius:3px">#DCE1E6</span> | Cool neutral |
| `--steam-grey-2` | `#C5CCD3` | <span style="background:#C5CCD3;color:#3C3F42;padding:2px 10px;border-radius:3px">#C5CCD3</span> | Cool neutral (deeper) / chart-4 |

### 🖤 Soft Charcoal — Text

| Token | Hex | Swatch | Role |
|---|---|---|---|
| `--soft-charcoal` | `#3C3F42` | <span style="background:#3C3F42;color:#fff;padding:2px 10px;border-radius:3px">#3C3F42</span> | Foreground / body text |
| `--soft-charcoal-2` | `#5A5E62` | <span style="background:#5A5E62;color:#fff;padding:2px 10px;border-radius:3px">#5A5E62</span> | Muted-foreground (`--fg-2`) |
| `--soft-charcoal-3` | `#8A8E92` | <span style="background:#8A8E92;color:#fff;padding:2px 10px;border-radius:3px">#8A8E92</span> | Tertiary text (`--fg-3`) / chart-5 |

### 🌫️ Cool Air — Light Blue Tint

| Token | Hex | Swatch | Role |
|---|---|---|---|
| `--cool-air` | `#BFD7E6` | <span style="background:#BFD7E6;color:#3C3F42;padding:2px 10px;border-radius:3px">#BFD7E6</span> | Light blue tint |
| `--cool-air-2` | `#DCE9F1` | <span style="background:#DCE9F1;color:#3C3F42;padding:2px 10px;border-radius:3px">#DCE9F1</span> | Secondary surface / sidebar-accent (`--accent-soft`) |

### 🟫 Bg Tint / Rule — Borders & Dividers

| Token | Hex | Swatch | Role |
|---|---|---|---|
| `--bg-tint` | `#F0EBE3` | <span style="background:#F0EBE3;color:#3C3F42;padding:2px 10px;border-radius:3px">#F0EBE3</span> | Muted surface |
| `--rule` | `#E5E1D9` | <span style="background:#E5E1D9;color:#3C3F42;padding:2px 10px;border-radius:3px">#E5E1D9</span> | Borders / inputs / dividers |
| `--rule-strong` | `#C8C2B5` | <span style="background:#C8C2B5;color:#3C3F42;padding:2px 10px;border-radius:3px">#C8C2B5</span> | Stronger divider |

### ⚠️ Destructive — Errors

| Token | Value | Approx Hex | Role |
|---|---|---|---|
| `--destructive` | `oklch(0.577 0.245 27.325)` | <span style="background:#C7383E;color:#fff;padding:2px 10px;border-radius:3px">#C7383E</span> | Errors / destructive actions |

> Destructive 用 `oklch` 喺 light/dark 都 perceptually-uniform。Hex 只係 fallback approximation。

---

## ✅ Usage rules

### 主用法 (default pairings)

| Surface | Text | Use case |
|---|---|---|
| `--rice-white` `#F7F6F2` | `--soft-charcoal` `#3C3F42` | Body / page background |
| `--rice-white-2` `#FFFFFF` | `--soft-charcoal` `#3C3F42` | Card / popover |
| `--heritage-blue` `#1E4B7A` | `--rice-white` `#F7F6F2` | Primary button / hero CTA |
| `--clay-beige` `#E7D7C1` | `--soft-charcoal` `#3C3F42` | Warm accent block |
| `--cool-air-2` `#DCE9F1` | `--heritage-blue-2` `#163A5F` | Secondary button / sidebar |

### Color hierarchy

1. **Primary** Heritage Blue family — CTA、link、icon active state
2. **Surface** Rice White family — 90% 嘅 background
3. **Warm accent** Clay Beige — 用於 emotional / 食物 / lifestyle block
4. **Cool accent** Cool Air / Steam Grey — 用於 product / spec / 涼氣產品(風扇 / 冷氣)
5. **Text** Soft Charcoal family,3 levels of hierarchy
6. **Destructive** 只用喺 error / delete confirm

### ⚠️ 唔好做

- 唔好用 `--soft-charcoal-3` `#8A8E92` 做 small body text(只 pass large-text contrast)
- 唔好擺 destructive red 喺 marketing block — 只屬 system feedback
- 唔好同時用 Clay Beige + Cool Air 大面積(暖+冷會打架);揀其中一個做 dominant
- 唔好改 hex / token name — 任何 deviation 要 update 呢頁先
- 唔好用 saturated / neon 顏色 — 違反「日式精緻」brand adjective

---

## 📐 Accessibility (WCAG)

| Pair | Use | Contrast | Pass |
|---|---|---|---|
| `--soft-charcoal` on `--rice-white` | Body text | ~11:1 | ✅ AAA |
| `--soft-charcoal-2` on `--rice-white` | Muted text | ~7:1 | ✅ AAA |
| `--heritage-blue` on `--rice-white` | Primary CTA / links | ~8:1 | ✅ AAA |
| `--rice-white` on `--heritage-blue` | Button text | ~8:1 | ✅ AAA |
| `--soft-charcoal-3` on `--rice-white` | Tertiary text | ~4:1 | ⚠️ Large text only |
| `--soft-charcoal` on `--clay-beige` | Text on warm accent | ~9:1 | ✅ AAA |

---

## 🌙 Dark mode

> 🟡 待 final 設計階段 confirm。Likely approach:
> - `--background` → swap to `--heritage-blue-2` `#163A5F` 或更深
> - `--foreground` → `--rice-white` `#F7F6F2`
> - Adjust chart palette for dark contrast

---

## 🔗 Image-gen prompt usage

當寫 image-gen prompt(GPT-image / Midjourney / etc.),引用 palette 嘅標準寫法:

> "color grading lifted from the Imarflex palette: Heritage Blue `#1E4B7A`, Rice White `#F7F6F2`, Clay Beige `#E7D7C1`, Steam Grey `#DCE1E6`, Soft Charcoal `#3C3F42`"

詳細 prompt template 喺 copywriter agent — 睇 [[.claude/agents/imarflex-copywriter|imarflex-copywriter]] §Image-generation prompt。

---

## 🧪 shadcn / Tailwind mapping

CSS variable mapping(畀 frontend implement)喺 working note:
→ [[brand/visual-color-palette#shadcn-tailwind-mapping]]

---

## 📚 Where this palette appears

呢個 palette 已經喺以下文件引用:

- [[brand/visual-color-palette]] — Canonical working draft + shadcn mapping
- [[brand/visual-photography-style]] — 攝影色調方向
- [[.claude/agents/imarflex-copywriter|imarflex-copywriter agent]] — Image-gen prompt palette tokens
- [[brand/social-samples/carousel/carousel-irc20ih-gpt-image]] — Carousel 樣本
- [[brand/social-samples/carousel/carousel-air-fryer-editorial-board]] — Carousel 樣本
- [[brand/social-samples/carousel/carousel-air-fryer-gpt-image]] — Carousel 樣本
- [[brand/social-samples/carousel/carousel-fan-cool-air-diagram]] — Carousel 樣本
- [[reference/internal-master#10-brand-guidelines]] — Master spec
- [[reference/pitch]] — Client pitch
- [[# 網站重建方案書 — Development Spec for Claude Code]] — Dev spec

---

## Reference

- [[Brand Guideline/README|Brand Guideline index]]
- [[brand/visual-color-palette|Working draft + shadcn mapping]]
- [[reference/internal-master#10-brand-guidelines]]
