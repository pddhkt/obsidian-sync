# imarflex.net catalog scrape — for site migration off Shopline

Scraped on 2026-05-27 from https://imarflex.net (Shopline-hosted).

## Files

- `imarflex_products.csv` — main deliverable. 336 unique products × 11 columns. Open in Excel/Sheets.
- `imarflex_products.json` — same data as JSON (better fidelity for description_html, no CSV-escaping quirks). Use this as the source for the new site DB import.
- `categories.json` — 79 category slugs + display names.
- `scrape.py` — the scraper. Re-runnable; HTML is cached in `/tmp/imarflex_scrape/cache/` (delete to force re-fetch).

## CSV columns

| column | notes |
|---|---|
| `category_slug` | `\|`-separated list — a product can appear in multiple categories (e.g. a hair dryer is in `mother-days-gifts` AND `negative-ion-hair-dryer-series`) |
| `category_name` | parallel list of Chinese display names |
| `product_url` | live PDP on imarflex.net |
| `product_slug` | unique key |
| `name` | full Chinese product name (e.g. `"伊瑪牌" 1600W負離子電風筒(粉紅)`) |
| `model` | SKU code (e.g. `IHD-1600PN`, `IRC-IH40`) |
| `price_hkd` | text like `HK$399.00`, sometimes a price range, occasionally blank for sold-out items |
| `hero_image` | full-size cover image URL on shoplineapp.com — still hosted by Shopline, you'll want to download these before migrating away |
| `gallery_images` | `\|`-separated list of "了解更多" image URLs. **This is where Imarflex puts the spec sheet — most products have NO HTML description, just an image sequence.** Order matters: it's the same order as on the live PDP. |
| `description_text` | text content of the `商品描述` block. **Empty for ~91% of products** because Imarflex doesn't author HTML descriptions — they bake everything into the gallery images. |
| `description_html` | raw HTML of the `商品描述` block, including Shopline's `<!-- START SHOPLINE RICH CONTENT -->` wrapper. Mostly empty bodies, but where present, preserves formatting. |

## Key findings for the migration

1. **Spec sheets are images, not data.** Imarflex never moved their PDPs to structured spec tables — every product spec (capacity, wattage, dimensions, features) lives inside the gallery JPGs. Migration options:
   - **Quick path:** re-host the gallery images on your new site and lay them out the same way. Functionally identical to the current PDP. No retyping.
   - **Better path:** OCR the gallery images per product to lift specs into a real spec table — but that's a follow-up project, not a blocker for launch.
2. **Image hosting is on Shopline CDN.** Every `hero_image` and `gallery_images` URL is on `shoplineapp.com` / `shoplineimg.com`. If you cut Shopline off, those URLs die. **You must download these assets before the cutover.** Easy to add a `--download-assets` flag to `scrape.py` when you're ready.
3. **One product, many categories.** 79 categories but only 336 unique products — lots of cross-listing (one fan can sit under `fan`, `floor-fan`, `air-circulator-fan-series`). The CSV preserves all memberships in the `category_slug` column. Your new site's data model needs many-to-many product↔category.
4. **Sub-brand SKUs exist.** Not everything is `IMARFLEX/伊瑪牌` — there's also `FAMOUS / 名家`, `FUJIRA / 富士樂`, `ZIGMA / 適瑪`. Treat brand as a field, don't assume it from the site name.
5. **Prices are HKD text, not numbers.** Output is the as-displayed string (`HK$399.00`, occasionally with a range or sale crossed-out price). The new site will want a cleaned `decimal` field — easy to derive with `int(re.sub(r"[^0-9]", "", price))`.

## How to re-run

```bash
cd site-migration
python3 -m venv venv
./venv/bin/pip install requests beautifulsoup4 lxml
./venv/bin/python scrape.py
```

Cached HTML lives under `/tmp/imarflex_scrape/cache/`. Delete the cache to force a fresh fetch (e.g. to pick up new products before cutover).
