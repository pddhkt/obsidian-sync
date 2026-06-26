---
type: reference
project: Imarflex 伊瑪牌
status: draft
created: 2026-06-25
tags:
  - design-spec
  - product-card
  - storefront
  - 電器
---

# Product Card Spec — Imarflex 產品卡

Component definition for the **listing / collection card** used in category pages, search results, cross-sell rails, and recently-viewed. Synthesised from the [[ManyProfit Group/Design References/_index|Design References]] library — see [[ManyProfit Group/Design References/Gallery - Product Cards|Product Cards gallery]], [[ManyProfit Group/Design References/Gallery - Live 電器 Card Grids|Live 電器 Card Grids]], and [[ManyProfit Group/Design References/Gallery - Mobbin Collections|Collections]].

Mapped to live Imarflex features: `stock-status-display`, `back-in-stock-notify`, `pdp-retail-links`, `cross-sell-pdp`, `warranty-registration`, `reviews-system` (pending), `recently-viewed` (pending).

## 1. Where it's used

- Category / collection listing (主要) — facet sidebar + grid, like [[ManyProfit Group/Design References/live-sites/card-grids/fortress-grid|Fortress]] / [[ManyProfit Group/Design References/live-sites/card-grids/broadway-grid|Broadway]]
- Search results
- `cross-sell-pdp` rail ("配搭使用 / 相關產品")
- `recently-viewed` rail

## 2. Anatomy (top → bottom)

| Element | Rule | Imarflex note |
|---|---|---|
| **Image** | 1:1 or 4:5, white/neutral bg, lazy-loaded | 電器 product on white — match Fortress/Broadway convention |
| **Badge(s)** (top-left) | max 1–2; see §4 | 減價 / 新品 / 暢銷 / 套裝 |
| **Wishlist heart** (top-right) | optional, Phase 2 | tie to account |
| **Brand / 型號** | small caps label | model no. matters for 電器 (e.g. `IRC-20IH`) |
| **Title** | 2-line clamp | clear product name 中文+English |
| **Key spec line** | 1 line, 電器-specific | 容量 / 能源標籤 / 功率 — *differentiator vs fashion cards* |
| **Price** | bold; show 原價 strikethrough if on sale | HK$ + optional 分期 |
| **Rating** | stars + count | Phase 2 — `reviews-system` not built yet |
| **Stock status** | in-stock / low / out | `stock-status-display` (shipped) |
| **Primary action** | see §5 | Add to cart **or** Where-to-buy |

## 3. States

- **Default** — static, all of §2.
- **Hover (desktop)** — elevate + reveal quick action (see [[ManyProfit Group/Design References/mobbin/product-cards/hover-states/faire-hover-quickadd|Faire]], [[ManyProfit Group/Design References/mobbin/product-cards/hover-states/ubereats-quickadd-plus|Uber Eats +Add]]). Keep it subtle — 電器 shoppers compare, don't impulse-add.
- **Out of stock** — dim image, replace CTA with **「缺貨 · 通知我」** → `back-in-stock-notify` (shipped).
- **Loading** — skeleton card (image block + 2 text bars).

## 4. Badge system (max 2, priority order)

1. `減價 -XX%` (red) — strongest, top-left corner like Fortress
2. `新品` / `暢銷` / `編輯推介`
3. `套裝` / `送贈品` (promo) — `product-bundles` (pending)

Never stack more than 2; promo pills go under price, not on image.

## 5. Primary action — two variants

Imarflex sells **both** direct (`checkout-airwallex`, shipped) and via retail partners (`pdp-retail-links`, shipped). The card CTA must support either per-product:

- **Direct:** `加入購物車` button (quick-add on hover desktop / always-visible mobile).
- **Retail-only:** `查看發售點 / Where to buy` link instead of add-to-cart.

Decide per-product via a `purchase_mode` field. Reference quick-add overlays: [[ManyProfit Group/Design References/mobbin/product-cards/web-walmart-quickadd|Walmart]], spec-rich card: [[ManyProfit Group/Design References/mobbin/product-cards/web-hims-detailed-card|Hims]].

## 6. 電器-specific guidance (the differentiator)

Appliance shoppers scan **specs + price + availability**, not lifestyle imagery. Surface on-card:

- **容量 / 尺寸 / 功率** key spec (1 line) — Fortress shows model + size inline.
- **能源標籤** (HK energy label grade) if applicable — trust signal.
- **型號** always visible — drives `parts-finder` (shipped) & comparison.
- **分期** price hint if offered.
- Consider a **compare** checkbox (IKEA pattern: [[ManyProfit Group/Design References/mobbin/product-cards/hover-states/ikea-filter-open-variants|IKEA]]) — high value for 電器.

## 7. Responsive grid

| Breakpoint | Columns |
|---|---|
| Desktop ≥1280 | 4 (sidebar) / 5 (no sidebar) |
| Tablet | 3 |
| Mobile | 2 |

## 8. Anti-patterns

- ❌ No key spec / model on card (fails 電器 comparison shopping).
- ❌ More than 2 badges or badge + heart + promo all on image.
- ❌ Aggressive hover that hides info — keep price/title always readable.
- ❌ Ratings shown before `reviews-system` ships (don't fake social proof).

## Visual references

**Real HK 電器 grid to match:**
![[ManyProfit Group/Design References/live-sites/card-grids/fortress-grid.png|460]]

**Spec-rich card pattern (tags + structured info):**
![[ManyProfit Group/Design References/mobbin/product-cards/web-hims-detailed-card.webp|360]]
