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

- [[brand/guideline/logos/README|🏷️ Logos]] — Master logo + variants、clear-space、approved formats
- [[brand/guideline/color-palettes/Imarflex Color Palette|🎨 Color Palettes]] — Heritage Blue / Rice White / Clay Beige / Steam Grey 完整 token + hex
- [[brand/guideline/moodboard/README|🖼️ Moodboard]] — 視覺方向參考圖(日式精緻 × 香港日常)

## 🖼️ Client-ready visual files

| File | Section |
|---|---|
| `color-palettes/imarflex-color-palette-overview.png` | Palette overview |
| `color-palettes/imarflex-color-palette-pairings.png` | Palette usage pairings |
| `moodboard/moodboard-japanese-hk-daily-overview.png` | Moodboard summary |

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

## 🧭 brand/ 同 guideline/ 嘅分工

依家 guideline 係 `brand/` 嘅 subfolder,一個 brand home,兩層用途:

- **`brand/`**(上一層)— internal working notes,跟 base / deliverables tracker,有 frontmatter status (draft / placeholder / final)。設計師同 copywriter 喺度迭代。
- **`brand/guideline/`**(呢度)— final, share-ready 資產 + 一頁概覽。客戶 / 外判 partner 開呢度就夠。

當 working note(例如 `brand/visual-logo-usage`)由 `placeholder` 變 `final`,正式文件就 drop 入 `brand/guideline/` 對應 subfolder(`logos/` / `color-palettes/` / `moodboard/`)。

> [!note] Asset 收齊狀態
> `brand/assets/visual-logo-usage/` 入面已經有齊 SVG / mono / favicon / print PDF — 最終 client-facing 版以 `guideline/logos/` 為準,兩邊重複嘅可以淨保留 guideline 版。

---

## 📌 Usage rules (跨 section 共通)

> [!warning] 唔好做嘅嘢
> - 唔好改 hex / token name — 跟 [[brand/guideline/color-palettes/Imarflex Color Palette|color palette note]] 為準
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
