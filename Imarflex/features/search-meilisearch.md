---
type: feature
tier: base
category: commerce
funnel-stage: [interest, consideration]
decision: decision-needed
priority: medium
phase: 1
setup-cost-hkd: 0
monthly-cost-hkd: 30
depends-on: []
metric: "Search-to-purchase conversion"
---

# Search / Meilisearch

## 解決咩問題
- 200+ SKU,客戶搵唔到啱嘅型號
- Shopline 搜尋對中文支援差

## 點 work
- Meilisearch Cloud 做 backend
- Predictive search dialog (instant results as you type)
- 中文 tokenization
- Filter / facet (type, price range, capacity)
- Synonyms (e.g. 「電飯煲 = rice cooker」)

## 🟡 Decision needed
**Meilisearch vs Algolia** (影響月費 ~$30 vs ~$200)
→ 我推薦 Meilisearch (中文好、平、predictive 強)
See [[decision-search-engine]]

## 對應 funnel
- [[2-interest]]
- [[3-consideration]]

## Reference
- [[internal-master#3-stack]]
