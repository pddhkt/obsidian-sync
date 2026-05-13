# Imarflex 伊瑪牌 — App Feature Spe

## Stack

- Next.js 15 (App Router), TypeScript, Tailwind CSS 4, pnpm
- Shopify Storefront API (GraphQL) for products, cart, checkout
- PostHog for analytics + feature flags
- Shopify Payments + Airwallex for payments
- Vercel deployment
- Resend for transactional emails

---

## Global Layout

### Header (Desktop)

- Logo left, nav center, search bar + account icon + cart icon right
- Nav links: 所有產品 · 廚房電器 · 家居電器 · 大型電器 · 限時優惠 · 清貨專區
- Search bar visible (not just icon), ~220px, placeholder "搜尋產品..."
- Cart icon shows item count badge
- Sticky on scroll

### Header (Mobile)

- Logo centered only — no hamburger, no nav links, no search icon
- All navigation handled by bottom nav bar

### Bottom Nav (Mobile Only)

- Sticky at bottom, hidden on desktop (md: breakpoint)
- 4 tabs: 首頁 (Home) · 分類 (Categories) · 搜尋 (Search) · 購物車 (Cart)
- Cart tab shows item count badge
- Active tab highlighted, inactive muted
- Safe area padding for notched phones
- On PDP pages, replaced by sticky purchase bar (price left + "加入購物車" button right)

### Announcement Bar

- Full-width top bar: "全單滿 HK$500 免運費 ｜ 全線產品兩年保養 ｜ 日本品牌 自1973年"
- Dismissible (✕ button), remembers dismissal via cookie

### Footer

- 4 columns: brand info + socials, shop links, customer service links, contact info (phone 2422 1244, WhatsApp 9140 6664, address)
- Bottom bar: copyright (Many Profit Industrial Limited) + payment icons (Visa, Mastercard, FPS, AlipayHK, Apple Pay, PayMe)

### Breadcrumbs

- Present on all pages except homepage
- Format: 首頁 > 廚房電器 > 電飯煲 > IRC-20IH

---

## Pages

### 1. Homepage `/`

- ISR revalidate 3600s

**Sections (in order, max 5 below header):**

1. **Hero — single product focus**
    
    - One flagship/seasonal product, center-aligned
    - Category label (small muted), product name (large bold), one-line benefit text, price (with compare-at if on sale), "立即選購" CTA button, color options as text links
    - Product image in lifestyle setting (kitchen context), not floating on white
    - Hero product from Shopify collection tagged `homepage-hero`
    - Seasonal rotation: fans in summer, heaters in winter, rice cookers year-round
2. **Trust bar**
    
    - 4 items horizontal: 🇯🇵 日本品牌 自1973年 · 🛡️ 全線兩年保養 · 🚚 滿HK$500免費送貨 · 🔄 14天退換保障
    - Line-style icons, muted colors
3. **Shop by Category — bento grid**
    
    - Non-uniform tile layout, varied sizes
    - Tiles: 廚房電器 (large), 風扇及冷氣, 煮食爐具, 家居電器, 大型電器
    - Each tile: lifestyle product image background, category name overlay, product count
    - Clickable, subtle zoom on hover
    - Mobile: 2 columns, large tile spans full width
4. **Time-limited deals**
    
    - Visually differentiated background section
    - Countdown timer (DD:HH:MM:SS, updates every second) — end time from Shopify collection metafield `imarflex.deals_end_time`
    - 3 product cards: product image, "限時優惠" badge, original price crossed out, sale price, savings percentage, "加入購物車" button
    - Products from collection tagged `deals`
    - Mobile: horizontal scrollable cards
5. **Most popular products**
    
    - Section title "最受歡迎產品" with "查看全部 →" link
    - 4 product cards with "已售出 500+" badge (from metafield `imarflex.sales_count`), star rating, review count
    - Quick add-to-cart icon button on hover
    - Mobile: 2-column grid

**Not on homepage:** No brand logo carousel, no "about us", no newsletter signup, no blog preview.

**PostHog events:** `hero_cta_clicked`, `category_tile_clicked`, `deal_product_viewed`, `deal_add_to_cart`

---

### 2. Collection Page `/collections/[handle]`

- ISR revalidate 3600s

**Features:**

- Collection header: title, subtitle, product count
- Filter + sort bar: filter button with active count badge, active filter tags with remove (✕), sort dropdown (推薦, 價格低至高, 價格高至低, 最新上架)
- Filter sidebar (desktop 240px, mobile slide-up drawer):
    - 系列/類型 (checkboxes with counts)
    - 價格範圍 (min/max inputs)
    - 容量/尺寸 (checkboxes, product-type dependent)
    - 有貨 (toggle)
- Filter state stored in URL via `nuqs` (e.g. `/collections/rice-cookers?sort=price-asc&minPrice=500`)
- Product grid: 3 columns desktop, 2 mobile
- Product cards: image, "新品"/"優惠" badge, product name, model number (muted), price, star rating, hover "加入購物車"
- Pagination (cursor-based)
- Empty state when no products match filters

**PostHog events:** `filter_applied`, `sort_changed`

---

### 3. Product Detail Page (PDP) `/products/[handle]`

- SSG with `generateStaticParams` + ISR fallback

**Left column (55%):**

- Image gallery: main image + thumbnail row (5 images)
- Click main image for fullscreen lightbox
- Mobile: horizontal swipeable carousel with dot indicators

**Right column (45%):**

- Brand: "Imarflex 伊瑪牌" with accent
- Title + model number
- Star rating + review count
- Price block: current price (bold) + compare-at crossed out + savings badge
- Variant selector: color swatches (selected has border), size options if applicable
- Quantity selector + "加入購物車" full-width button
- "加入願望清單 ♡" outline button [GATED]
- Trust badges: 🇯🇵 日本品牌 · 🛡️ 兩年保養 · 🚚 免運費 · 🔄 14天退換

**"查看其他購買地點" section:**

- Collapsible, below trust badges
- Shows retail partner rows: 豐澤 Fortress, 百老匯 Broadway, 實惠 Pricerite
- Each: small logo + name + "前往選購 →" link (opens new tab)
- Data from product metafield `imarflex.retail_links` (JSON: `[{name, url, logo}]`)
- Hidden if no retail links set for this product
- Styled subtly — not competing with Add to Cart

**Product details — tabs or accordion:**

- 產品特點: feature highlights with icons
- 產品規格: specs table (容量, 功率, 尺寸, 重量, 保養期)
- 送貨及退換: shipping/returns info

**相關配件 section:**

- Query products in "配件及零件" collection where `imarflex.compatible_models` contains current product's model number
- Shows compatible parts grid with images, names, prices, "加入購物車"
- "查看所有配件 →" link to `/parts-finder?model=XXX`
- Hidden if no compatible parts found

**Related products:**

- "你可能也喜歡" — 4 product cards from same collection

**Mobile:** Image carousel on top, info stacked below, sticky bottom bar (price + "加入購物車") replaces bottom nav

**PostHog events:** `product_viewed`, `variant_selected`, `add_to_cart`, `retail_link_clicked`

---

### 4. Search

**Search dialog** (`components/search/search-dialog.tsx`):

- Triggered by header search icon (desktop) or bottom nav search tab (mobile) or Cmd+K
- Large search input, auto-focused, placeholder: "搜尋產品（如：電飯煲、風扇、電磁爐）..."
- Before typing: "熱門搜尋" tag pills (電飯煲, 風扇, 空氣炸鍋, 電熱水壺, 吸塵機, 電磁爐)
- As user types: instant predictive results (debounced 300ms) via Shopify Predictive Search API (supports Chinese natively)
- Result rows: thumbnail, product name (matching text highlighted), price
- Press Enter → full search results page
- Mobile: full-screen overlay

**Search results page** `/search`:

- Full product grid with same filter/sort as collection page
- "X 個結果：'query'" header
- Empty state with suggestions

**PostHog events:** `search_performed`, `search_result_clicked`

---

### 5. Cart

**Cart drawer** (`components/cart/cart-drawer.tsx`):

- Slides from right on item add or cart icon click
- Header: "購物車" + item count + close button
- Line items: product image, name + variant, quantity stepper (- 1 +), line price, "移除" link
- **Free shipping progress bar**: if subtotal < HK$500: "距離免費送貨還差 HK$XX" with progress bar. If ≥ HK$500: "✓ 已達免費送貨門檻" in green
- Subtotal + "運費及稅項將於結帳時計算"
- "前往結帳 →" button → redirects to Shopify Checkout (`cart.checkoutUrl`)
- "← 繼續購物" link
- Empty cart state
- Width: ~420px desktop, full-width mobile

**Cart page** `/cart`:

- Full-page version of cart drawer for users who prefer it

**Cart state:** Stored in cookie (`cartId`), created lazily on first add-to-cart

**PostHog events:** `cart_viewed`, `checkout_started`, `cart_item_removed`, `quantity_changed`

---

### 6. Warranty Registration `/warranty`

- Static page (form, no ISR needed)
- Prominent placement: header nav, footer, every PDP, post-purchase email

**Form fields:**

- 姓名 (required)
- 電郵 (required)
- 電話 (required)
- 產品型號 (searchable dropdown from Shopify product list, required)
- 購買日期 (date picker, required)
- 購買地點 (dropdown: 豐澤, 百老匯, 實惠, Imarflex 官方網店, 其他, required)
- 收據照片 (file upload, optional)

**On submit:**

- Create/update Shopify customer record with warranty data in metafield `warranty.registrations` (JSON array)
- Send confirmation email with warranty details via Resend
- Show success state: "保養登記成功！" with summary + "瀏覽配件" CTA linking to compatible parts

**PostHog events:** `warranty_registered` (with product_model, purchase_channel)

---

### 7. Parts Finder `/parts-finder`

- Static page with client-side interactivity

**Flow:**

1. Customer selects product category (dropdown: 電飯煲, 電熱水壺, 吸塵機, etc.)
2. Customer selects specific model (filtered dropdown based on category)
3. Page displays grid of compatible parts/accessories with images, names, prices, "加入購物車"

**Data:** Products in "配件及零件" collection with metafield `imarflex.compatible_models` containing the selected model number.

**Empty state:** "找不到相關配件？請 WhatsApp 聯絡我們查詢" with WhatsApp link (wa.me/85291406664)

**URL support:** `/parts-finder?model=IRC-20IH` — pre-selects model from URL param (used by PDP "查看所有配件" link)

**PostHog events:** `parts_finder_used`, `parts_finder_result_clicked`

---

### 8. Blog "伊瑪生活" `/blog` [GATED]

- ISR revalidate 3600s
- Data source: Shopify Blog API

**Blog listing:**

- Page title "伊瑪生活" with subtitle "煮食教學 · 產品攻略 · 家居貼士"
- Featured article hero card (large, top)
- Below: 3-column grid of blog cards (image, category tag, title, excerpt, date, reading time)
- Categories: 選購攻略, 煮食教學, 家居貼士, 產品評測

**Blog article `/blog/[handle]`:**

- Back link "← 返回伊瑪生活"
- Title, meta (date, reading time), hero image
- Article body (rendered HTML) with embedded product recommendation cards (image, name, price, "查看產品 →")
- Desktop sidebar: "相關文章" (3 small cards)
- Bottom: "相關產品" row (4 product cards)

---

### 9. Customer Account `/account` [GATED]

- Auth via Shopify Customer Account API
- Token stored in httpOnly cookie

**Pages:**

- `/account` — dashboard: name, email, saved addresses
- `/account/orders` — order history with status and tracking
- `/account/wishlist` — saved products grid

**Components:** login form, register form, order card, wishlist button (heart icon on PDPs)

---

### 10. Static Pages `/pages/[handle]`

- ISR revalidate 86400s (24 hours)
- Data source: Shopify Pages
- Pages: 關於我們, 常見問題 (FAQ), 送貨資訊, 退換政策, 產品保養條款, 私隱政策, 使用條款

---

## Checkout

Not custom-built. Redirects to Shopify hosted checkout via `cart.checkoutUrl`. Shopify handles customer info, shipping selection, and payment processing (PCI compliant). Supported payment methods via Shopify Payments (Visa, Mastercard, Amex, UnionPay, Apple Pay, Google Pay, Shop Pay) + Airwallex (FPS, AlipayHK, WeChat Pay).

---

## SEO

- `generateMetadata` on every page: unique title, description, canonical URL, Open Graph
- JSON-LD structured data: Product (on PDP), BreadcrumbList (all pages), Organization (homepage)
- Dynamic sitemap at `/sitemap.xml` from all products + collections + blog articles
- `/robots.txt` with sitemap reference
- Next.js Image component for all product images (WebP, responsive sizes)

---

## Analytics — PostHog

- Initialised via reverse proxy (`/api/posthog` route) to avoid ad blockers
- `capture_pageview: false` — manual pageview capture for SPA navigation
- Session recording enabled (`maskAllInputs: true` for privacy)
- Feature flags for gating: customer-accounts, wishlist, blog, ai-chatbot, email-automation, loyalty-program, product-reviews
- Local flag defaults in `config/features.ts` as fallback when PostHog unavailable

**Dashboards to configure post-launch:**

- Purchase funnel (homepage → collection → PDP → cart → checkout)
- Product performance (most viewed, best converting, most searched)
- User behavior (session duration, device breakdown, top entry/exit pages)
- Search insights (top queries, zero-result queries, search→purchase rate)
- Warranty registrations (by channel, by product, conversion rate)
- Parts finder usage (which models searched, click-through to purchase)

---

## ISR Revalidation

Shopify webhooks → `/api/revalidate` route → `revalidateTag()`:

- `products/create`, `products/update`, `products/delete` → revalidate `products` + `product-{handle}`
- `collections/create`, `collections/update`, `collections/delete` → revalidate `collections` + `collection-{handle}`
- Webhook signature verified via HMAC

---

## Shopify Metafields

### Product metafields (namespace: `imarflex`)

|Key|Type|Purpose|
|---|---|---|
|`model_number`|single_line_text|Product model e.g. "IRC-20IH"|
|`compatible_models`|list.single_line_text|For accessories: models this part fits e.g. ["IRC-20IH","IRC-15IH"]|
|`sales_count`|number_integer|For "已售出 500+" badges|
|`warranty_years`|number_integer|Warranty period (default 2)|
|`power_wattage`|single_line_text|e.g. "1000W"|
|`capacity`|single_line_text|e.g. "1.8公升"|
|`retail_links`|json|Where to buy: [{name,url,logo}] for Fortress, Broadway, Pricerite|

### Collection metafields (namespace: `imarflex`)

|Key|Type|Purpose|
|---|---|---|
|`deals_end_time`|date_time|Countdown timer end time for deals section|

### Customer metafields (namespace: `warranty`)

|Key|Type|Purpose|
|---|---|---|
|`registrations`|json|Array of {model, purchase_date, purchase_channel, receipt_url, registered_at}|

---

## Shopify Collections

|Collection|Purpose|
|---|---|
|廚房電器|Rice cookers, kettles, ovens, air fryers, induction cookers, stew cookers, microwaves, blenders|
|風扇及冷氣|Floor fans, desk fans, wall fans, circulation fans, water-cooled fans, portable AC|
|煮食爐具|Induction cookers, ceramic cookers, IR cookers, built-in cookers|
|家居電器|Vacuum cleaners, heaters, air purifiers, dehumidifiers, irons, hair dryers|
|大型電器|Range hoods, washing machines, water heaters, freezers|
|配件及零件|Replacement inner pots, filters, blades, lids, remote controls, cookware|
|法國名家|"Famous" sub-brand products|
|限時優惠|Currently on sale (tagged, with deals_end_time metafield)|
|清貨專區|Clearance items|
|homepage-hero|Single product for homepage hero (manual, 1 product)|

---

## Gated Features (built but disabled via PostHog feature flags)

|Feature|Flag Key|Notes|
|---|---|---|
|Customer accounts|`customer-accounts`|Login, register, order history|
|Wishlist|`wishlist`|Heart icon on PDP, saved products page|
|Blog|`blog`|伊瑪生活 blog listing + articles|
|AI chatbot|`ai-chatbot`|Claude API, floating widget, answers warranty/product/parts questions|
|Email automation|`email-automation`|Warranty confirmation, expiry reminder (month 22), new product announcements, abandoned cart|
|Loyalty program|`loyalty-program`|Points, tiers, Shopify discount code redemption|
|Product reviews|`product-reviews`|Customer review section on PDP|

---

## Environment Variables

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=imarflex-hk.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxxx
SHOPIFY_REVALIDATION_SECRET=xxxxx
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
NEXT_PUBLIC_SITE_URL=https://www.imarflex.net
NEXT_PUBLIC_SITE_NAME=Imarflex 伊瑪牌
```