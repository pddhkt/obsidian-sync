---
type: skill-reference
skill: imarflex-signal-gather
area: pitch-mode-sources
tags:
  - online-marketing
  - research
---

# Pitch-mode signal sources

呢 4 個 source 唔需要 client access,即刻可以做。每個 source 有:
- 點解要做(signal type)
- 具體 URL / 工具
- 點 read(揀咩 signal)
- 寫成 raw note 嘅 mapping

> [!info] 通用提醒
> 用 incognito / clean browser,Google search 設 region = HK + 語言 = 繁體中文。手動做嘅好過 SEO tool — 我哋要嘅係 user-language signal,唔係 keyword volume。

---

## 1. Competitor SERP playbook

### 目的

睇 Google 對某個 keyword 想要乜嘅內容格式、邊個競爭對手已經 rank、有冇缺口。

### 邊個算 competitor

| 類別 | 例子 | 點解 |
|---|---|---|
| Direct brand SERP rivals | Panasonic HK、Toshiba HK、Tiger HK、Zojirushi HK | 同 category、同價位,搶同一啲 keyword |
| HK retailers (categories rank) | Fortress 豐澤、Broadway 百老匯、Pricerite 實惠、HKTVmall | category page 經常 rank Page 1 |
| Content / lifestyle SERP | UPower、HK01 飲食、Cosmo HK、Esquire HK | 食譜 / 推介文 rank 高 |
| YouTube / blog creators | 香港 KOL 食譜頻道、廚具開箱 blog | Google 會夾入 SERP |

### Search URL 範本

```
https://www.google.com/search?q={keyword}&hl=zh-TW&gl=hk
```

或者直接 incognito Google.com.hk → 搜尋(設語言中文繁體)。

### 要 capture 嘅 keyword pattern(對齊 [[../../../online-marketing/seo-keyword-research|seo-keyword-research]] §2)

| Pattern | Example |
|---|---|
| 產品 + 推薦 | `氣炸鍋推薦`、`電飯煲推薦 香港` |
| 產品 + 點揀 | `點揀電飯煲`、`點揀風扇` |
| 產品 + 問題 | `風扇好嘈`、`電飯煲飯硬` |
| 產品 + 場景 | `細廚房氣炸鍋`、`劏房抽濕機` |
| 產品 + 比較 | `IH vs 微壓`、`氣炸鍋 vs 焗爐` |
| 品牌 + 服務 | `伊瑪牌保養`、`Panasonic 配件` |
| 產品 + 清潔保養 | `風扇拆洗`、`電飯煲內膽清潔` |

### Read SERP — checklist

對每個 keyword,記低:

1. **Top 10 result types** — blog / PDP / forum / YouTube / recipe / comparison?
2. **Strong competitor** — 邊個 brand / site 鎖咗 top 3?
3. **Weak / outdated result** — 有冇 2019 舊文 rank?有冇純抄維基?→ 機會位
4. **People Also Ask** — Google 顯示嘅問題就係 user real question
5. **Related searches** — 底部 8 個 suggestion
6. **Local HK content** — 多唔多?HK 結果少 = 我哋 angle 易切入
7. **Content format gap** — 例:全部都係 list-style「10 大推薦」,冇 step-by-step 教學 → 機會

### Mapping → raw note

| SERP observation | 入 raw note 邊個欄位 |
|---|---|
| Keyword | `Possible keyword:` |
| 我哋睇 SERP 嘅 query | `Raw wording:` |
| SERP top result type | `Search intent:`(informational / commercial / transactional / navigational) |
| Missing angle | `Notes:`(寫低 「SERP 缺 XX,Imarflex 可做」) |
| Imarflex 對應產品 | `Product / category:` + `Destination / CTA:` |
| SERP screenshot 或 URL | `Evidence:`(貼 3-5 條 top result URL) |

### Tool 用法

- 用 `WebSearch` query keyword,記 top result title / URL / snippet
- 用 `WebFetch` 拎個別 competitor page 嘅 content 再分析 angle
- 一次 sweep 唔好做超過 5 條 keyword — 質 > 量

---

## 2. Retailer / marketplace playbook

### 目的

睇香港人實際**買嘢時用嘅字**(category 名、filter、product title wording)。SEO keyword 嚟自 Google,但**用戶語言**嚟自 retailer。

### 主力 retailer + URL

| Retailer | Category root URL 模式 | 點解 |
|---|---|---|
| 豐澤 Fortress | `https://www.fortress.com.hk/zh/category/{category}` | HK 最大連鎖,category wording 標準 |
| 百老匯 Broadway | `https://www.broadway.com.hk/zh-hk/products/{category}` | 同 Fortress 互補,有時 wording 唔同 |
| 實惠 Pricerite | `https://www.pricerite.com.hk/zh/category-小型家電` | 中低價位、實用導向 |
| HKTVmall | `https://www.hktvmall.com/hktv/zh/search?q={keyword}` | 價格、product title、user review 全部齊 |
| 蘇寧 / Suning HK | (如仍 active) | 補充 |

### 每個 priority category(由 business-focus 決定)要 capture

| 觀察 | 點用 |
|---|---|
| Category 點命名 | 例:Fortress 叫「電飯煲」/「壓力鍋」/「IH 電飯煲」— 三層 nesting |
| Filter / facet 用咩字 | 例:容量 0.6L / 0.8L / 1L / 2L、IH / 微壓 / 球釜 / 微電腦 — 即 user 揀嘢嘅 dimension |
| Product title pattern | 例:「Panasonic SR-CX188 微電腦電飯煲 1.8L」— brand + model + tech + capacity |
| Price banding | 入門 / 中端 / 旗艦 各個 price tier — Imarflex 落邊個 band? |
| User review 用字(HKTVmall) | 「飯軟硬」「容易清潔」「夠唔夠大」— customer pain points 直接 quote |
| Promo wording | 「父親節」「夏日特價」「限時」「換購」— 季節 + 銷售角度 |
| Bundle | 邊個 retailer 用咩 SKU 配搭做 bundle — angle for 內容 |

### Mapping → raw note

| Retailer observation | 入 raw note |
|---|---|
| Retailer category wording | `Raw wording:`(直接 quote) |
| User review pain phrase | `Customer problem:` |
| Filter dimension(容量 / IH 類別) | `Possible keyword:`(衍生 keyword) |
| Product title 寫法 | `Notes:`(可 inform Imarflex PDP title) |
| Retailer page URL | `Evidence:` |

### Tool 用法

- `WebFetch` retailer category page → 抽 product titles + filter labels
- HKTVmall 用 search URL 拎 review snippet
- 一個 category 用 2-3 個 retailer cross-reference 已足夠

---

## 3. Product catalog playbook(Imarflex 自家 shopline)

### 目的

睇 Imarflex 自己網店每個 priority SKU 嘅 PDP wording、規格、客戶可能會問嘅嘢。內容最後要導 PDP / collection,所以**內容必須對得返 PDP 嘅 language**。

### 來源

- 主站(shopline):`https://imarflex.com.hk/` 同 `/products/{slug}` / `/collections/{slug}`
- 已 capture 嘅 SKU(由 `business-focus/yyyy-qx-focus.md` 列):
  - **IRC-20IH** — 2L IH 電飯煲(旗艦 / 高 margin)
  - **降糖 IH 電飯煲系列** — health hero(見 `Imarflex/reference/external-research-imarflex`)
  - **IRC-22KS** — 4-in-1 multi-cooker 2.2L
  - **IAF 系列** — 氣炸鍋
  - **風扇系列** — 座枱 / 座地 / 循環 / 水冷 / USB 迷你
  - **抽濕機**、**滅蚊燈**(法國合作)

### 每個 PDP walk 要 capture

| 觀察 | 點用 |
|---|---|
| Product title 用字 | 對得返 SEO title?有冇 keyword? |
| Spec table(容量 / wattage / mode) | 寫 content 嗰陣可以引用 — **唔好 invent** |
| Bullet feature wording | 例:「降糖 IH」「球釜內膽」「自動排氣」— 變 PDP-aligned keyword |
| 客戶可能誤解嘅 spec | 例:容量 0.8L 對應幾多人?— FAQ / how-to topic |
| 缺 vs retailer 嘅 angle | 例:Fortress 強調保養,Imarflex PDP 冇講 → 加 trust angle |
| 內鏈現狀 | PDP 有冇連 warranty / parts finder?如果冇 → blog 可以做呢個導流 |
| Image / lifestyle 角度 | 影相喺廚房 / lifestyle?— inform 之後 IG carousel direction |

### Mapping → raw note

| Catalog observation | 入 raw note |
|---|---|
| PDP 用字 | `Raw wording:` |
| Spec / feature | `Notes:`(record exact spec — 之後 copywriter 會引) |
| 估計客戶會問嘅 question | `Customer problem:` |
| 對應 keyword pattern | `Possible keyword:` |
| Imarflex SKU + URL | `Product / category:` + `Destination / CTA:`(PDP URL) |

### Tool 用法

- 如果 user 提供 PDP URL → `WebFetch` 拎 page text
- 否則先 `Glob` `Imarflex/features/**` 同 `Imarflex/reference/external-research-imarflex*` 拎已記低嘅 SKU info
- ⚠️ Pitch stage 我哋唔有 Imarflex 後台 access — 只睇 public PDP / sitemap

---

## 4. Seasonal calendar playbook

### 目的

香港季節 / 節日 / 天氣 → 推邊個 product 嘅 timing。**Topic backlog 要提前 6-8 週鋪**(對齊 `topic-research-workflow.md` §2)。

### HK 季節 × Imarflex product 對照

| 月份 | 季節 / 節日 | Priority category | Topic angle |
|---|---|---|---|
| 1 月 | 農曆年前(食) | 電飯煲、多功能煲、蒸鍋 | 「年廿八掃廚」清潔保養 + 團年飯食譜 |
| 2 月 | 農曆年後、情人節 | 電飯煲、煲湯、小家電 gift | 新婚 / 細家庭入廚電器揀選 |
| 3 月 | 回南天起 | 抽濕機、防潮、衣物乾衣 | 「衫晾唔乾」抽濕 + 風扇預熱 |
| 4 月 | 復活節、回南 | 抽濕機、風扇起動 | 雨季抽濕教學、風扇開箱前 deep clean |
| 5 月 | 轉熱、母親節、雨季 | **風扇旺季啟動**、抽濕、氣炸鍋 | 風扇選購、母親節廚電 gift、氣炸夏日食譜 |
| 6 月 | 端午、潮濕 + 熱 | 風扇、抽濕、蒸鍋(端午糭) | 端午糭蒸法、夏天少油食譜 |
| 7 月 | 盛夏 + 暑假 + 颱風季 | 風扇、滅蚊燈、氣炸 | 颱風預備、滅蚊燈夏夜場景、暑期親子食譜 |
| 8 月 | 盛夏 + 颱風 | 風扇、抽濕、滅蚊 | (沿用 7 月)+ 鋪 9 月開學 / 中秋 |
| 9 月 | 中秋、開學、轉涼始 | 多功能煲(中秋宴)、電飯煲、學生細家電 | 中秋家庭飯、學生細家電(細廚房氣炸 / IRC-22KS) |
| 10 月 | 涼、雙 11 鋪 | 電飯煲、多功能煲、氣炸 | 雙 11 攻略、入秋滋補食譜 |
| 11 月 | 雙 11、轉冷 | 電飯煲、氣炸、暖風機 | 冬季煲湯 / 燉、暖風機選購 |
| 12 月 | 聖誕、冬至、年尾 gift | 暖風機、氣炸、電飯煲 gift | 聖誕家宴、冬至湯圓、年尾廚電 gift guide |

### 6-8 週 lead time 規則

| 出街月 | 而家(May 2026)要鋪邊 |
|---|---|
| 5 月 | 已出(風扇 / 氣炸)|
| 6 月 | 端午糭 / 父親節 gift / 抽濕(已遲)|
| 7 月 | 颱風 + 暑假親子 + 滅蚊 — **而家 capture signal** |
| 8 月 | 中秋預熱、9 月開學 — **而家鋪 backlog** |

### Mapping → raw note

| Seasonal observation | 入 raw note |
|---|---|
| 季節 / 節日 trigger | `Raw wording:`(e.g.「7 月颱風季」)|
| 對應 product | `Product / category:` |
| 用戶痛點 | `Customer problem:` |
| 估計 keyword | `Possible keyword:`(e.g.「颱風前準備家電」)|
| Lead time | `Notes:`(寫「lead time 6 週,brief deadline = yyyy-mm-dd」)|
| 來源 | `Source:` = `season` |
| Evidence | HK Observatory、過去年 retailer promo time、社交媒體 trend |

### Tool 用法

- `WebSearch` 香港天文台 / 過去年同期 retailer promo,confirm timing
- 唔需要 fetch — 季節 signal 主要靠呢個 table + business-focus + 用戶感覺

---

## 一次 pitch-mode sweep 嘅 minimum output

跑完 4 個 source,research-inbox 應該多 5-10 個 file,並包含:

- ≥ 2 個 SERP-based(有 SERP URL evidence)
- ≥ 2 個 retailer-based(有 retailer category URL)
- ≥ 1 個 shopline catalog-based(有 Imarflex PDP URL)
- ≥ 1 個 seasonal(有 lead time 寫清)

仲要喺最後 chat 出一份「Day-1 request list」— 見 `sources-client-data.md` §請款式 request list。
