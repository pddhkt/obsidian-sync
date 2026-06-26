---
type: design-reference-index
project: Many Profit Group
status: active
created: 2026-06-23
tags:
  - design-reference
  - imarflex
  - manyprofit
  - ecommerce
aliases:
  - 電器 design references
  - E-commerce UI references
---

# Design References — 電器 / E-commerce

UI reference library for the [[ManyProfit Group/Imarflex/_index|Imarflex]] and [[ManyProfit Group/ManyProfit/_index|Many Profit]] website builds. Screens are from the **Mobbin MCP** (curated app/web design library) plus **live full-height captures** of real 電器 (home-appliance) retailer sites.

## Galleries

- [[ManyProfit Group/Design References/Gallery - Live 電器 Homepages|Live 電器 Homepages]] — 8 real appliance-store homepages (Fortress, Broadway, Suning, LG, Samsung, Panasonic, JD, price.com.hk)
- [[ManyProfit Group/Design References/Gallery - Live 電器 PDPs|Live 電器 PDPs]] — 4 real product pages (incl. Panasonic washing machine ⭐)
- [[ManyProfit Group/Design References/Gallery - Mobbin Landing Pages|Mobbin Landing Pages]] — by category (beauty / electronics / home / appliances)
- [[ManyProfit Group/Design References/Gallery - Mobbin Collections|Mobbin Collections]] — category/listing pages with filters
- [[ManyProfit Group/Design References/Gallery - Mobbin PDPs|Mobbin PDPs]] — mobile + web product-detail patterns
- [[ManyProfit Group/Design References/Gallery - Product Cards|Product Cards]] — product-card component inspiration (badges, swatches, quick-add, rating/stock, spec cards) + hover/interaction states
- [[ManyProfit Group/Design References/Gallery - Live 電器 Card Grids|Live 電器 Card Grids]] — real HK/CN appliance listing grids (Fortress, Broadway, Suning)
- ➡️ Synthesised into [[ManyProfit Group/Imarflex/reference/product-card-spec|Imarflex Product Card spec]]
- [[ManyProfit Group/Design References/Gallery - Mobbin Purchase Flows|Mobbin Purchase Flows]] — full checkout step sequences (adidas, Walmart, Apple, Hims, UO, Amazon)
- [[ManyProfit Group/Design References/Gallery - Mobbin UO Homepage Set|Mobbin UO Homepage Set]] — one brand's complete screen set

## Folder structure

```
Design References/
├── live-sites/{homepages, pdp, card-grids}   ← real full-height 電器 captures
├── mobbin/{homepages-landing, collections, pdp, product-cards, purchase-flows, urban-outfitters-home}
└── _scripts/                         ← Playwright capture scripts
```

## Best 電器 references for Imarflex/ManyProfit

- `live-sites/homepages/fortress.png` — Fortress 豐澤 full storefront
- `live-sites/homepages/broadway.png` — Broadway 百老滙
- `live-sites/pdp/broadway-pdp.png` — Panasonic washing machine PDP (closest to an Imarflex product page)

## Caveats / provenance

- **Mobbin has no dedicated 電器 retailers** — its appliance coverage is marketplace sections (Amazon/IKEA/Klarna) and DTC electronics (Apple/Stripe/Shopify). For genuine appliance-store UI, use the **`live-sites/`** captures.
- `live-sites/pdp/lg-pdp.png` resolved to a TV *remote* (valid PDP, trivial product) — LG's full appliance PDPs were slow and timed out.
- **Dyson** (Cloudflare bot wall) and **Best Buy** (US-only geo) could not be captured headlessly.
- Live captures are 1440px-wide, full-page, of the *current live site* as of 2026-06-23.
- Mobbin screenshots are copyrighted app captures — use as **pattern reference**, not asset reuse.
