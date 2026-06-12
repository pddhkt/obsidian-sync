---
type: sales-content-assumptions
status: active
area: online-marketing
updated: 2026-06-04
tags:
  - online-marketing
  - sales-content
  - assumptions
---

# Sales Content Assumptions

This note records the assumptions behind the sales-focused content system. Keep assumptions visible so we can replace guesses with real data from GSC, PostHog, Meta, site search, WhatsApp, and actual sales.

## Assumption register

| ID | Assumption | Evidence level | How to validate | Decision impact |
|---|---|---|---|---|
| A1 | 4 blog posts / month is enough for a Standard organic SEO cadence. | Medium | Track blog impressions, clicks, CTR, ranking movement, and blog -> PDP clicks for 90-180 days. | Keep 4/month unless quality suffers or growth needs more volume. |
| A2 | IG should carry more visual education than FB for home appliances. | Medium | Compare IG saves, shares, profile clicks, Reel completion, and product-link clicks. | Use IG for carousel, Reel, demo, recipe, product proof. |
| A3 | FB is better for link distribution, trust, promotion, and older customer segments. | Medium | Compare FB link clicks, comments, post saves, and WhatsApp enquiries. | Use FB for blog summaries, promo posts, warranty/service trust content. |
| A4 | Posting every day is only useful if posts are helpful, varied, and not repetitive. | High | Track engagement decay, unfollows, low reach, and repeated caption formats. | Start with 3 IG feed/Reel posts per week and 2 FB posts per week. Scale only if engagement supports it. |
| A5 | Sales content must map to a product destination, not only traffic. | High | Track PDP clicks, add-to-cart, WhatsApp enquiries, warranty/parts clicks, and assisted sales. | Reject topics with no destination unless they support trust or retention. |
| A6 | Small paid tests are useful, but heavy ad spend should wait until tracking is ready. | High | Confirm Pixel / conversion events / UTM / PostHog events before scaling ads. | Start with small bursts around hero products and retargeting. |
| A7 | Better topics come from market + customer + search signals, not from posting frequency alone. | High | Compare scored topics vs unscored posts on reach, saves, clicks, and enquiries. | Every topic should pass [[../../topic-research-workflow]]. |
| A8 | Product education can reduce purchase anxiety for appliances. | Medium | Track comments, WhatsApp pre-sales questions, PDP conversion rate, and FAQ clicks. | Prioritize comparison, buying guide, maintenance, service, and product proof. |

## Evidence levels

| Level | Meaning |
|---|---|
| High | Strong strategic logic, existing workflow support, or current platform guidance. |
| Medium | Reasonable assumption but needs Imarflex data. |
| Low | Weak assumption; do not use for major decisions until tested. |

## Validation sources to collect

| Source | What it replaces |
|---|---|
| Google Search Console | Keyword/search-demand assumptions |
| PostHog / GA4 | Blog -> PDP, collection -> cart, source/channel conversion |
| Meta Ads Manager | Paid reach, click, conversion, frequency, ad fatigue |
| Instagram / Facebook insights | Saves, shares, comments, link clicks, reach decay |
| WhatsApp / customer service | Real customer questions, objections, product language |
| Sales / inventory / margin data | Which product should become the weekly hero |

