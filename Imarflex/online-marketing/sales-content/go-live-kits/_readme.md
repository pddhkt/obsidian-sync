---
type: sales-content-readme
status: active
area: go-live-kits
tags:
  - online-marketing
  - sales-content
  - go-live-kit
---

# Go-Live Content Kits

Each file here is a **complete, ready-to-publish multi-channel kit** for one product: blog + Instagram + Facebook + Reel + Story, plus a GPT-image prompt for every visual and a pre-publish "待客戶確認" checklist.

These are the full creative output. They are produced by the standard pipeline:

```
imarflex-signal-scout  → campaign brief + topic score + day-1 client ask list
        ↓
imarflex-copywriter    → the 5 channel outputs + image prompts (brand voice)
        ↓
imarflex-aeo-auditor   → citation-readiness score + fixes (appended to each kit)
```

## How to reuse

1. Copy a kit file, swap the product, re-run the three agents with the new brief.
2. The frontmatter (`topic-type`, `sales-purpose`, `hero-sku`, `destination`, `primary-cta`, `utm-campaign`) lets each kit slot into [[../../_sales-content.base|Sales Content Base]] for counting.
3. To count individual channel posts in the Base, fan a kit out into per-channel post cards under [[../posts/_readme|posts/]] using [[../post-card-template]].

## Index & tracking

- **Post index (July):** [[../social-post-plan-2026-07]] — human-readable schedule of every post.
- **Production tracker:** [[production-tracker-2026-07]] — the 10-step checklist + GPT-image asset register (what still needs generating before go-live).
- **Live dashboard:** [[../../_sales-content.base]] — auto-counts the per-channel post cards in `posts/`.

## Hard rules baked into every kit

- No fabricated specs / prices / numbers — unknowns are left as `【待客戶確認:…】` slots.
- No LIHKG / Reddit / forum sentiment anywhere client-facing.
- Brand voice + palette-anchored image prompts only (no SVG / rendered art).

## Current kits

| Kit | Product | Topic type | Sales purpose | AEO (blog) | Status |
|---|---|---|---|---|---|
| [[2026-06-ifq-22r-circulator-buying-guide]] | IFQ-22R 8.7吋全拆式遙控循環扇 | buying-guide | decision-confidence | 8/15 pass-with-fixes (quick-fixes applied) | drafting |
| [[2026-06-icf-140r-cooler-trust]] | ICF-140R 14L 冰冷風機 | trust-service | trust-reduction | 10/15 pass-with-fixes (quick-fixes applied) | drafting |

> AEO quick-fixes applied 2026-06-05: question-form H3s + answer-first lines, author/reviewer + date byline, 降溫-range citation (ICF), JSON-LD schema stubs (Article + FAQPage + Product, no aggregateRating). Remaining to lift to 14–15/15 = client-supplied named author + on-page publish date + schema deployment.
