---
type: brand-guideline
section: index
status: draft
priority: high
---

# Brand Guideline / 品牌資產庫

> 客戶交付 + 對外用嘅 brand asset library。
> Working guidelines(voice / visual draft notes)仍然住喺 [[brand/_index|brand/]]。
> 呢個 folder 係 **final assets** — logos、color palette reference、moodboard ref images。

---

## 📁 Sections

- [[Brand Guideline/Logos/README|🏷️ Logos]] — Master logo + variants、clear-space、approved formats
- [[Brand Guideline/Color Palettes/Imarflex Color Palette|🎨 Color Palettes]] — Heritage Blue / Rice White / Clay Beige / Steam Grey 完整 token + hex
- [[Brand Guideline/Moodboard/README|🖼️ Moodboard]] — 視覺方向參考圖(日式精緻 × 香港日常)

## 🖼️ Client-ready visual files

| File | Section |
|---|---|
| `Color Palettes/imarflex-color-palette-overview.png` | Palette overview |
| `Color Palettes/imarflex-color-palette-pairings.png` | Palette usage pairings |
| `Moodboard/moodboard-japanese-hk-daily-overview.png` | Moodboard summary |

---

## 🔗 Related working notes

呢個 section 同 `brand/` working drafts 嘅關係:

| 呢度有 | Working draft 喺邊 |
|---|---|
| Logo files (.svg / .png / .pdf) | [[brand/visual-logo-usage]] — 使用規則 |
| Color tokens + swatches | [[brand/visual-color-palette]] — 完整 token + shadcn mapping |
| Moodboard ref images | [[brand/visual-photography-style]] — 攝影方向 |
| | [[brand/social-samples/_index]] — Social post sample 儲位 |

---

## 🧭 點解分開兩個 folder

- **`brand/`** — internal working notes,跟 base / deliverables tracker,有 frontmatter status (draft / placeholder / final)。設計師同 copywriter 喺度迭代。
- **`Brand Guideline/`** — final, share-ready 資產 + 一頁概覽。客戶 / 外判 partner 開呢度就夠。

當 `brand/visual-logo-usage` 由 `placeholder` 變 `final`,正式 logo 文件就 drop 入 `Brand Guideline/Logos/`。

---

## 📌 Usage rules (跨 section 共通)

> [!warning] 唔好做嘅嘢
> - 唔好改 hex / token name — 跟 [[Brand Guideline/Color Palettes/Imarflex Color Palette|color palette note]] 為準
> - 唔好 export 低解像度 logo 出去(< 1x PNG)
> - 唔好用 moodboard ref 圖做 final marketing asset — 嗰啲只係 direction

> [!tip] 要做嘅嘢
> - 新 asset drop 入對應 folder 之後,update README 嘅 file list
> - File naming:`imarflex-{type}-{variant}-{size}.{ext}` (e.g. `imarflex-logo-master-color.svg`)
> - Final 出街前 cross-check [[brand/voice-tone-of-voice|tone-of-voice]] 5 個 adjectives:可靠 / 溫暖 / 專業 / 貼地 / 日式精緻

---

## Reference

- [[_index|Project home]]
- [[brand/_index|Brand working notes]]
- [[reference/internal-master#10-brand-guidelines]]
