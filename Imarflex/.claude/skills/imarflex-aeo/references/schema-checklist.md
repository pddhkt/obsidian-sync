# Schema Markup Checklist

Schema.org structured data = LLM / search engine machine-read content 嘅 layer。 冇 schema = LLM 要靠 NLP 推測 → citation 機會低。 但 schema 講假 = Google penalty + brand 信譽。

## 4 種 schema type,按 content type pick

| Content type | Minimum schema | Optional add-on |
|---|---|---|
| Buying guide blog | Article + FAQPage | HowTo(if 有 step-by-step) |
| Comparison blog | Article + FAQPage | Product(×2,每個 compare 對象一個) |
| Maintenance blog(拆洗、保養) | Article + HowTo | FAQPage |
| Recipe blog | Article + Recipe | HowTo + FAQPage |
| Product PDP | Product | FAQPage + Review(if 真 review) |
| Brand / service page(保養登記、parts finder) | Article + WebPage | FAQPage + Service |

唔好 default 全部都 stack。 Stack 多 type 但 spec 唔對 PDP / blog 真實內容 → 觸發 hard rule #1 → DQ。

## Product schema — minimum fields(PDP 用)

```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Imarflex IRC-20IH 2L IH 電飯煲",
  "brand": {
    "@type": "Brand",
    "name": "Imarflex 伊瑪牌"
  },
  "model": "IRC-20IH",
  "description": "2L 容量 IH 電飯煲,啱 3-5 人家庭。",
  "image": "https://imarflex.com.hk/images/IRC-20IH.jpg",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "HKD",
    "price": "X980",
    "availability": "https://schema.org/InStock",
    "url": "https://imarflex.com.hk/products/IRC-20IH"
  }
}
```

**Mandatory fields:** name, brand, model, description, image, offers (price + currency + availability + url)。

**Optional 但建議加:**
- `gtin13` / `mpn`(if 有)— LLM 用 product identifier 串 cross-source 引用
- `aggregateRating` — **only if** PDP 上真係有 review system + 真數據;否則唔加(false fact = DQ)

## FAQPage schema — minimum(blog FAQ section 用)

每篇 blog / 長 PDP 都有 FAQ section(passage-qa-rubric.md 講過)。 對應 schema:

```json
{
  "@context": "https://schema.org/",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "IRC-20IH 啱幾多人食?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IRC-20IH 容量 2L,啱 3-5 人家庭日常食。"
      }
    },
    {
      "@type": "Question",
      "name": "IRC-20IH 同 Panasonic SR-CC10 邊個好?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IRC-20IH 容量 2L 大過 Panasonic SR-CC10 (1L),啱中型家庭;Panasonic SR-CC10 則啱 1-2 人。價錢 Imarflex 較親民。"
      }
    }
  ]
}
```

**Mandatory:** 每個 Question.name 同 blog 入面真 H3 一字不差。 Schema text 同 blog inline answer 一字不差(LLM cross-check)。 唔可以 schema 寫一個版本、HTML 另一版本。

**最少 3 條 Q&A 先值得加 FAQPage schema;少於 3 唔加。**

## HowTo schema — minimum(maintenance / recipe blog 用)

```json
{
  "@context": "https://schema.org/",
  "@type": "HowTo",
  "name": "點樣拆洗 Imarflex 風扇",
  "totalTime": "PT15M",
  "step": [
    {
      "@type": "HowToStep",
      "name": "斷電",
      "text": "拔電源插頭,等扇葉完全停止。",
      "image": "https://imarflex.com.hk/images/fan-step-1.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "拆網罩",
      "text": "..."
    }
  ]
}
```

**Mandatory:** 每個 step 對 blog 入面真 step 一字不差。 至少 3 個 step。 If step 包含 image,真係要有對應 image URL — false image URL = DQ。

## Article schema — minimum(blog 用)

```json
{
  "@context": "https://schema.org/",
  "@type": "Article",
  "headline": "2026 點揀電飯煲|完整指南",
  "datePublished": "2026-MM-DDT09:00:00+08:00",
  "dateModified": "2026-MM-DDT09:00:00+08:00",
  "author": {
    "@type": "Person",
    "name": "[Named author]",
    "jobTitle": "Imarflex 產品經理",
    "url": "https://www.linkedin.com/in/..."
  },
  "publisher": {
    "@type": "Organization",
    "name": "Imarflex 伊瑪牌",
    "logo": {
      "@type": "ImageObject",
      "url": "https://imarflex.com.hk/logo.png"
    }
  },
  "image": "https://imarflex.com.hk/images/article-hero.jpg"
}
```

**Mandatory:** 真實 author name + role + URL。 Generic「編輯部」唔過 — 觸發 audit rubric Axis 3 = 1 分(if 內容涉及 health/safety → DQ)。

`dateModified` 同 frontmatter 嘅 `updated_at` 一致。 漏 update = audit Axis 5 = 1 分。

## Review schema — only if 真有 review system

```json
{
  "@type": "Review",
  "itemReviewed": { "@type": "Product", "name": "IRC-20IH" },
  "reviewRating": { "@type": "Rating", "ratingValue": "5" },
  "author": { "@type": "Person", "name": "Real reviewer name" }
}
```

**🚨 False review = DQ。** Pitch-stage(Imarflex PDP 未必上線 review 系統)→ **唔加** Review schema。 寧願冇 schema,都唔可以 invent 5-star review。

## Validation workflow

寫完 schema:
1. Paste 落 [Google Rich Results Test](https://search.google.com/test/rich-results) → 必須 pass
2. Paste 落 [Schema Markup Validator](https://validator.schema.org/) → 必須 0 error
3. Self-check:每個 field 嘅 value 同 blog / PDP 真實內容對唔對得返(spot check 3-5 個 random field)
4. 如有 Product schema,sanity-check `price`、`availability`、`model` — 呢三項最容易 stale

## False-fact red flags(audit 嗰時要 catch)

| Red flag | Fix |
|---|---|
| `aggregateRating` 但 PDP 冇 review system | 刪 schema 入面嘅 `aggregateRating` |
| Price stale(過咗 promo,schema 仲寫舊價) | 同 PDP 真 price sync,or 用 `priceValidUntil` |
| `availability: InStock` 但實際 backorder | 改 `BackOrder` 或 `PreOrder` |
| Author 寫真名但其實係 ghostwriter / generic | Hard rule violation。 改回 generic? 都唔可以(generic 又觸發 Axis 3) → 真係搵 named author |
| FAQ schema 入面嘅 Q 同 HTML 唔同 | Sync 返(LLM cross-check 唔過) |

## Pitch-stage schema spec

Pitch deck 入面只 demo:**「呢度係我哋 brief 入面已預設嘅 schema spec,deployment 由 client engineering team 落實,我哋負責 spec + audit。」**

唔可以 commit 「我哋 deploy schema」—— deployment 屬後端工程,係 post-engagement scope。

Spec deliverable for pitch:
- 1 個 sample blog 嘅完整 schema(Article + FAQPage)
- 1 個 sample PDP 嘅完整 schema(Product)
- Schema validation screenshot(過 Google Rich Results Test)
- Audit rubric Axis 2 = 3 分嘅證明

## Pre-engagement schema asks(入 day-1 list)

- Client backend 用咩 platform(Shopify / Shopline / WordPress / custom)— 影響 schema injection 方法
- 有冇現有 review system + ratings data
- Real promo / price refresh cadence(自動 sync 定 manual)
- Author bio 落地頁 URL pattern(LinkedIn / employees page)
- Image CDN URL pattern(schema image field 用)
