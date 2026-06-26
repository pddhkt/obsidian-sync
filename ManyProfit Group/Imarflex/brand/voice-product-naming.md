---
type: brand
section: voice
status: draft
priority: high
---

# Product Naming Rule / 產品命名規則

統一格式減少混亂。

## 規則

| 場景 | 格式 | 例 |
|---|---|---|
| **PDP 標題** | Imarflex 伊瑪牌 [類別] [型號](容量/規格) | Imarflex 伊瑪牌 IH 電飯煲 IRC-20IH(2L) |
| **SEO meta title** | 前置 benefit \| 型號 | 2L IH 電飯煲\|10層厚釜均勻加熱\|IRC-20IH |
| **URL slug** | 型號 (kebab-case) | `irc-20ih-rice-cooker` |
| **產品 SKU code** | 原廠型號(大寫) | `IRC-20IH` |

## 為何

- PDP 標題:客戶搵型號搵得到,又見到品牌
- SEO meta:Google 結果有 benefit 字眼,CTR 上升
- URL slug:短、含型號、Google 易 index
- 中英並列(伊瑪牌 + Imarflex):雙語客戶都搵到

## Anti-pattern

❌ `2024年新款日式智能電飯煲香港行貨原裝正品` — Shopline 嘅命名陷阱
❌ URL `/products/12345-imarflex-rice-cooker-2l-new-2024` — 太長 + 含數字 ID

## Related
- [[voice-pdp-copy-framework]]
- [[search-meilisearch]] — 搜尋要 match 型號

## Reference
- [[internal-master#6-voice]] §產品命名規則
