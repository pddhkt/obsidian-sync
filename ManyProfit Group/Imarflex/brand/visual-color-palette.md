---
type: brand
section: visual
status: draft
priority: high
---

# Color Palette / 色彩系統

## Palette name 命名邏輯

跟 brand voice「日本起點 · 香港日常」嘅 metaphor:
- **Heritage Blue** — 日式藍 / 50 年品牌可靠感
- **Rice White** — 米白 / 飯粒 / 純淨
- **Clay Beige** — 陶土米 / 工藝感
- **Steam Grey** — 蒸氣灰 / 廚房氛圍
- **Soft Charcoal** — 墨黑 / 文字
- **Cool Air** — 涼氣藍 / 風扇 / 空氣
- **Bg Tint / Rule** — 背景 + 分隔

---

## Tokens

### 🔵 Heritage Blue (Primary)

| Token | Hex | Swatch | Role |
|---|---|---|---|
| `--heritage-blue` | `#1E4B7A` | <span style="background:#1E4B7A;color:#fff;padding:2px 10px;border-radius:3px">#1E4B7A</span> | Primary / accent / ring / chart-1 |
| `--heritage-blue-2` | `#163A5F` | <span style="background:#163A5F;color:#fff;padding:2px 10px;border-radius:3px">#163A5F</span> | Darker primary, secondary-foreground |
| `--heritage-blue-3` | `#2C5F8F` | <span style="background:#2C5F8F;color:#fff;padding:2px 10px;border-radius:3px">#2C5F8F</span> | Lighter primary, eyebrow text, chart-2 |

### 🍚 Rice White (Surfaces)

| Token | Hex | Swatch | Role |
|---|---|---|---|
| `--rice-white` | `#F7F6F2` | <span style="background:#F7F6F2;color:#3C3F42;padding:2px 10px;border-radius:3px;border:1px solid #E5E1D9">#F7F6F2</span> | App background, primary-foreground |
| `--rice-white-2` | `#FFFFFF` | <span style="background:#FFFFFF;color:#3C3F42;padding:2px 10px;border-radius:3px;border:1px solid #E5E1D9">#FFFFFF</span> | Card / popover / sidebar surface |

### 🟤 Clay Beige (Warm Accent)

| Token | Hex | Swatch | Role |
|---|---|---|---|
| `--clay-beige` | `#E7D7C1` | <span style="background:#E7D7C1;color:#3C3F42;padding:2px 10px;border-radius:3px">#E7D7C1</span> | Warm accent |
| `--clay-beige-2` | `#D9C5A6` | <span style="background:#D9C5A6;color:#3C3F42;padding:2px 10px;border-radius:3px">#D9C5A6</span> | Warm accent (deeper), chart-3 |

### 💨 Steam Grey (Cool Neutral)

| Token | Hex | Swatch | Role |
|---|---|---|---|
| `--steam-grey` | `#DCE1E6` | <span style="background:#DCE1E6;color:#3C3F42;padding:2px 10px;border-radius:3px">#DCE1E6</span> | Cool neutral |
| `--steam-grey-2` | `#C5CCD3` | <span style="background:#C5CCD3;color:#3C3F42;padding:2px 10px;border-radius:3px">#C5CCD3</span> | Cool neutral (deeper), chart-4 |

### 🖤 Soft Charcoal (Text)

| Token | Hex | Swatch | Role |
|---|---|---|---|
| `--soft-charcoal` | `#3C3F42` | <span style="background:#3C3F42;color:#fff;padding:2px 10px;border-radius:3px">#3C3F42</span> | Foreground / body text |
| `--soft-charcoal-2` | `#5A5E62` | <span style="background:#5A5E62;color:#fff;padding:2px 10px;border-radius:3px">#5A5E62</span> | `--fg-2`, muted-foreground |
| `--soft-charcoal-3` | `#8A8E92` | <span style="background:#8A8E92;color:#fff;padding:2px 10px;border-radius:3px">#8A8E92</span> | `--fg-3`, chart-5 |

### 🌫️ Cool Air (Light Blue Tint)

| Token | Hex | Swatch | Role |
|---|---|---|---|
| `--cool-air` | `#BFD7E6` | <span style="background:#BFD7E6;color:#3C3F42;padding:2px 10px;border-radius:3px">#BFD7E6</span> | Light blue tint |
| `--cool-air-2` | `#DCE9F1` | <span style="background:#DCE9F1;color:#3C3F42;padding:2px 10px;border-radius:3px">#DCE9F1</span> | Secondary / sidebar-accent, `--accent-soft` |

### 🟫 Bg Tint / Rule

| Token | Hex | Swatch | Role |
|---|---|---|---|
| `--bg-tint` | `#F0EBE3` | <span style="background:#F0EBE3;color:#3C3F42;padding:2px 10px;border-radius:3px">#F0EBE3</span> | Muted surface |
| `--rule` | `#E5E1D9` | <span style="background:#E5E1D9;color:#3C3F42;padding:2px 10px;border-radius:3px">#E5E1D9</span> | Borders / inputs / dividers |
| `--rule-strong` | `#C8C2B5` | <span style="background:#C8C2B5;color:#3C3F42;padding:2px 10px;border-radius:3px">#C8C2B5</span> | Stronger divider |

### ⚠️ Destructive

| Token | Value | Role |
|---|---|---|
| `--destructive` | `oklch(0.577 0.245 27.325)` | Errors / destructive |

> Destructive uses `oklch` for perceptually-uniform red across light/dark themes. Approx hex equivalent: <span style="background:#C7383E;color:#fff;padding:2px 10px;border-radius:3px">#C7383E</span>

---

## shadcn / Tailwind mapping

呢個 palette 對應 shadcn-ui 嘅 CSS variable system:

```css
:root {
  --background: var(--rice-white);
  --foreground: var(--soft-charcoal);
  --card: var(--rice-white-2);
  --card-foreground: var(--soft-charcoal);
  --popover: var(--rice-white-2);
  --popover-foreground: var(--soft-charcoal);
  --primary: var(--heritage-blue);
  --primary-foreground: var(--rice-white);
  --secondary: var(--cool-air-2);
  --secondary-foreground: var(--heritage-blue-2);
  --muted: var(--bg-tint);
  --muted-foreground: var(--soft-charcoal-2);
  --accent: var(--clay-beige);
  --accent-foreground: var(--soft-charcoal);
  --accent-soft: var(--cool-air-2);
  --destructive: oklch(0.577 0.245 27.325);
  --border: var(--rule);
  --input: var(--rule);
  --ring: var(--heritage-blue);

  /* Charts */
  --chart-1: var(--heritage-blue);
  --chart-2: var(--heritage-blue-3);
  --chart-3: var(--clay-beige-2);
  --chart-4: var(--steam-grey-2);
  --chart-5: var(--soft-charcoal-3);

  /* Sidebar */
  --sidebar: var(--rice-white-2);
  --sidebar-accent: var(--cool-air-2);

  /* Foreground hierarchy */
  --fg: var(--soft-charcoal);
  --fg-2: var(--soft-charcoal-2);
  --fg-3: var(--soft-charcoal-3);
}
```

---

## Accessibility checks

| Pair | Use | Contrast | Pass? |
|---|---|---|---|
| `--soft-charcoal` on `--rice-white` | Body text | ~11:1 | ✅ AAA |
| `--soft-charcoal-2` on `--rice-white` | Muted text | ~7:1 | ✅ AAA |
| `--heritage-blue` on `--rice-white` | Primary CTA, links | ~8:1 | ✅ AAA |
| `--rice-white` on `--heritage-blue` | Button text | ~8:1 | ✅ AAA |
| `--soft-charcoal-3` on `--rice-white` | Tertiary text | ~4:1 | ⚠️ Large text only |
| `--soft-charcoal` on `--clay-beige` | Text on warm accent | ~9:1 | ✅ AAA |

> Avoid: `--soft-charcoal-3` on small body text(only use for large headings or chart labels).

---

## Dark mode

> 待 final 設計階段 confirm。Likely approach:
> - `--background` → swap to `--heritage-blue-2` 或更深
> - `--foreground` → `--rice-white`
> - Adjust chart palette for dark contrast

---

## Related
- [[visual-typography]]
- [[visual-component-library]] — Components 用呢套 token
- [[accessibility]] — WCAG AA / AAA 要求

## Reference
- [[internal-master#10-brand-guidelines]]
