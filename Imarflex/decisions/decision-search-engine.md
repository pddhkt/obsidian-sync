---
type: decision
area: stack
status: decision-needed
blocks: "[[search-meilisearch]]"
recommendation: "Meilisearch — 中文 tokenization 好、predictive 強、月費平 (~$30 vs Algolia ~$200)"
tags:
  - decision
  - stack
  - search
---

# Decision — Search engine: Meilisearch vs Algolia

## Question

200+ SKU 需要 instant / predictive search + 中文 facet。揀邊個 search backend?

## Options

| Option | 月費 (approx) | 中文支援 | Notes |
|---|---|---|---|
| **Meilisearch Cloud** | ~HK$30 | 好 (built-in tokenization, synonyms) | Predictive dialog 強、平、self-host 得 |
| Algolia | ~HK$200 | 好但貴 | 成熟 ecosystem、analytics 強,但成本高 8× |

## Recommendation

**Meilisearch** — 中文好、predictive 強、月費 ~$30 vs Algolia ~$200。對 200-SKU catalogue 嘅 search-to-purchase 已經足夠。

## Blocks

- [[search-meilisearch]] (status: in-progress — implementation waits on this pick)

## Reference

- [[internal-master#3-stack]]
