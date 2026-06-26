---
type: brand-guideline
section: logos
status: in-progress
priority: high
---

# Logos / 商標資產

> 🟡 In-progress — 已收到 mark + wordmark PNG(由 `imarflex-app/public/brand/` copy 過嚟)。仲等 SVG / mono / favicon / print PDF。
> 使用規則去 [[brand/visual-logo-usage]]。

---

## 📦 Current files (已 drop)

| File | Type | Source |
|---|---|---|
| `imarflex-mark.png` | Symbol only | `imarflex-app/public/brand/imarflex-mark.png` |
| `imarflex-wordmark.png` | Wordmark only | `imarflex-app/public/brand/imarflex-wordmark.png` |

![[imarflex-mark.png|200]]
![[imarflex-wordmark.png|300]]

---

## 📥 應該放啲咩入嚟

| File | Naming convention | Note |
|---|---|---|
| Master logo (full color) | `imarflex-logo-master-color.svg` | Vector preferred |
| Master logo PNG | `imarflex-logo-master-color@1x.png` / `@2x.png` / `@3x.png` | Raster fallback |
| Monochrome — white on dark | `imarflex-logo-mono-white.svg` | Dark backgrounds |
| Monochrome — black on light | `imarflex-logo-mono-black.svg` | Light backgrounds |
| Wordmark only | `imarflex-wordmark.svg` | 無 symbol 嗰版 |
| Symbol only | `imarflex-symbol.svg` | Favicon / app icon source |
| Favicon | `imarflex-favicon.ico` | 32px / 16px |
| Print PDF | `imarflex-logo-master.pdf` | CMYK,印刷用 |

---

## ✅ Approved formats

- `.svg` — web / digital primary
- `.png` — @1x / @2x / @3x for raster needs
- `.pdf` — print (CMYK)
- `.ico` — favicon
- `.eps` — 舊 printer 要求先製作

---

## 📐 Usage rules (摘要)

> 完整規則睇 [[brand/visual-logo-usage]]

> [!info] Clear space
> 四邊預留 ≥ logo x-height 嘅 padding。

> [!info] Minimum size
> Digital: 24px height for symbol, 80px width for wordmark.
> Print: 8mm height for symbol, 25mm width for wordmark.

> [!warning] 唔好做
> - 唔好 stretch / skew / rotate
> - 唔好換顏色(除非用 approved monochrome variant)
> - 唔好疊喺 busy / low-contrast 背景
> - 唔好加 drop shadow / glow / outline

---

## 🎨 顏色配搭

- Master logo on Rice White (`#F7F6F2`) ✅ 主用法
- Master logo on Heritage Blue (`#1E4B7A`) — 用 white monochrome 版
- Master logo on Clay Beige (`#E7D7C1`) ✅ 暖色 surface
- 唔好放喺 destructive red / saturated color 上

→ 完整 palette 睇 [[brand/guideline/color-palettes/Imarflex Color Palette]]

---

## 📋 File checklist

- [x] `imarflex-mark.png` — symbol PNG (from imarflex-app)
- [x] `imarflex-wordmark.png` — wordmark PNG (from imarflex-app)
- [ ] `imarflex-logo-master-color.svg` — vector master
- [ ] `imarflex-logo-mono-white.svg` — white on dark
- [ ] `imarflex-logo-mono-black.svg` — black on light
- [ ] `imarflex-wordmark.svg` — wordmark vector
- [ ] `imarflex-symbol.svg` — symbol vector
- [ ] `imarflex-favicon.ico` — 32 / 16
- [ ] `imarflex-logo-master.pdf` — CMYK print

---

## Reference

- [[brand/guideline/README|brand/guideline index]]
- [[brand/visual-logo-usage]]
- [[reference/internal-master#10-brand-guidelines]]
