---
type: feature
tier: addon
category: content
funnel-stage: [awareness]
decision: suggested
status: in-progress
priority: low
phase: 3
best-phase: "同 [[content-production]] 一齊"
setup-cost-hkd: 0
monthly-cost-hkd: 1000
depends-on: [content-production]
metric: "Quarterly keyword research, AI-assisted articles"
---

# SEO 內容套件 (季度服務)

> 月費以季度 HK$3,000 / 3 攤分顯示。
> 呢個 add-on 唔係代替 [[content-production]],而係幫 blog 有策略、有 keyword、有追蹤,避免「有寫文但冇排名」。

## 解決咩問題
- Blog 寫咗,但冇 keyword 策略,容易變成「有內容但冇搜尋需求」
- 唔知競爭對手做緊咩 SEO,冇辦法判斷邊啲 topic 值得追
- Google Search Console 有 data,但冇人定期睇 query、CTR、排名變化
- Blog 題目靠靈感,冇季度 content calendar,寫到後面會斷 momentum
- SEO meta、internal link、schema、image alt text 冇 checklist,每篇質素唔穩定
- 舊文冇 refresh 機制,排名跌咗先發現

## 帶嚟咩好處
- **季度 keyword research 報告** — 知道下一季應該攻邊啲搜尋需求
- **4 篇 AI 輔助文章草稿** — 額外於 Blog 月費,可作為下季 editorial backlog
- **GSC 健康檢查** — 追 query、CTR、indexing、page experience、404 / redirect 問題
- **競爭對手 gap 分析** — 睇 Panasonic、Rasonic、德國寶、消委會內容覆蓋咗咩,Imarflex 應該點切入
- **可行優化建議** — 唔只俾 report,而係列出下一季可以做嘅 title、meta、internal link、舊文 refresh 任務
- **內容變成可管理資產** — 每篇文都有 target keyword、intent、cluster、CTA、PDP link、衡量指標

## 適合幾時加
- **最好同 [[content-production]] 一齊買** — content-production 負責出文,SEO 內容套件負責決定寫咩、點寫先有排名機會
- **Phase 3 開始最合理** — 網站、blog、GSC、sitemap 穩定後,先開始季度節奏
- 如果 launch 前已經有舊 blog / Shopline 內容,可以喺 migration 前做一次 baseline audit
- 如客戶內部已有 SEO 人手,可以唔買;但仍建議保留 quarterly review,確保技術 SEO 同內容策略同步

## 範圍

### 包含
- 季度 keyword research
- Search intent mapping: informational / commercial / transactional / navigational
- Content gap 分析
- 4 篇 blog article brief + AI-assisted first draft
- 每篇 draft 包 SEO meta title、meta description、URL slug、H2/H3 outline、internal link 建議
- GSC quarterly health check
- Sitemap / indexing / crawl issue quick review
- 舊文 refresh 建議
- 下一季 content calendar
- 30-45 分鐘 quarterly review call / Loom walkthrough

### 不包含
- 每月固定寫 blog;呢部分屬 [[content-production]]
- 技術 SEO 大型修復,例如整個 URL 架構重做、migration redirect 大工程
- 外鏈建設 / PR outreach
- Paid search / Google Ads
- 多語 SEO 翻譯
- 對競爭對手做 paid tool 深度 espionage report

## 點樣實作

### 1. 建立 SEO baseline

**目的:**先知道而家起點,否則之後冇法量度 organic 有冇進步。

需要 setup / 收集:
- Google Search Console property
- GA4 或 PostHog traffic baseline
- Sitemap URL,例如 `/sitemap.xml`
- Robots.txt
- 現有 blog / PDP URL list
- 主要產品 category list:電飯煲、氣炸鍋、風扇、電熱水壺、煮食爐、空氣清新機等
- 主要競爭對手 / reference sites

輸出:
- Top queries
- Top pages
- Pages with high impressions but low CTR
- Pages ranking position 8-20,適合 quick win refresh
- Indexing / 404 / redirect issue list
- Baseline KPI snapshot

### 2. 做 keyword research

每季按 5 個 [[../brand/content-blog-direction|Blog Direction]] cluster 拆 keyword:

| Cluster | Keyword 例子 | Search intent | 內容形式 |
|---|---|---|---|
| 食譜 | 氣炸鍋蝦多士、氣炸鍋叉燒、氣炸鍋蛋撻 | Informational | Recipe guide |
| 選購攻略 | 電飯煲推薦、點揀氣炸鍋、風扇推薦 | Commercial investigation | Buying guide |
| 產品比較 | IH vs 微壓、Imarflex vs Panasonic | Commercial investigation | Comparison |
| 保養貼士 | 電飯煲內膽清潔、風扇點拆洗 | Informational / retention | How-to |
| 新品介紹 | Imarflex IH 電飯煲、伊瑪牌新款氣炸鍋 | Navigational / branded | Launch story |

Keyword research 每個 keyword 要記:
- Primary keyword
- Secondary keywords
- Search intent
- Suggested title
- Funnel stage
- Suggested product / PDP link
- Difficulty estimate:low / medium / high
- Business value:low / medium / high
- Recommended priority

### 2A. 點樣搵對生意有幫助嘅 keyword

Keyword 唔係 search volume 越高越好。對 Imarflex 嚟講,最有價值嘅 keyword 係「有搜尋需求 + 同產品有關 + 有機會導去 PDP / collection / WhatsApp 查詢」。

#### 先由生意目標倒推

每季 keyword research 前,先問 5 條 business 問題:

- 今季最想推邊啲 category?例如 IH 電飯煲、氣炸鍋、風扇、空氣清新機
- 邊啲 SKU margin 高 / 庫存多 / 新品要 launch?
- 邊啲產品客戶最常問,但網站解釋唔清楚?
- 邊啲 category 有季節性?例如夏天風扇、冬天電暖爐、農曆年前廚房電器
- 邊啲搜尋者最接近購買?例如「電飯煲推薦」通常比「電飯煲原理」更接近 conversion

呢一步要同 sales / customer service / product owner 傾,唔好淨係用 SEO tool。

#### Keyword 來源

| 來源 | 點樣搵 | 會搵到咩 |
|---|---|---|
| Google Search Console | 睇 impressions 高、CTR 低、position 8-20 嘅 query | 已經有機會排名嘅 quick win |
| Website search / Meilisearch logs | 睇用戶喺站內 search 咩字 | 真正有購買意圖嘅 product language |
| PostHog / analytics | 睇 blog → PDP、collection → PDP、search → cart path | 邊啲內容真係推動 funnel |
| Customer service / WhatsApp | 整理常見問題 | FAQ、保養、比較、troubleshooting keyword |
| Product catalog | 由 category、功能、spec、痛點拆字 | SKU-linked commercial keyword |
| Retailer / marketplace pages | 睇豐澤、百老匯、實惠點樣命名 category | 香港用戶熟悉嘅叫法 |
| Competitor SERP | Google 搜目標字,睇 page 1 有咩 content type | 內容格式、角度、缺口 |
| Seasonal calendar | 按月份 / 節日 / 天氣拆 topic | 提早 6-8 週準備 seasonal content |

#### 商業價值 keyword 類型

| 類型 | Keyword pattern | 商業價值 | 內容應該點做 |
|---|---|---|---|
| Category buying | `電飯煲推薦`、`氣炸鍋推薦`、`風扇推薦` | 高 | Buying guide + collection CTA |
| Comparison | `IH vs 微壓`、`氣炸鍋 vs 焗爐`、`Imarflex vs Panasonic` | 高 | 中立比較 + PDP / collection link |
| Problem-led | `電飯煲飯硬`、`風扇好嘈`、`氣炸鍋痴底` | 中至高 | Troubleshooting + relevant product / parts link |
| Use-case | `細廚房氣炸鍋`、`一家四口電飯煲容量` | 高 | Scenario guide + product recommendation |
| Maintenance | `電飯煲內膽清潔`、`風扇點拆洗` | 中 | How-to + parts / warranty / replacement CTA |
| Recipe | `氣炸鍋蝦多士`、`氣炸鍋叉燒` | 中 | Recipe + soft product CTA |
| Branded | `Imarflex 電飯煲`、`伊瑪牌保養` | 高 | Official answer page / PDP / support link |
| Pure information | `IH 原理`、`氣炸鍋原理` | 低至中 | 只做 supporting content,唔好佔太多 quota |

#### Keyword scoring 方法

每個 keyword 用 1-5 分評估,最後揀總分高但競爭未必最高嘅題目。

| Score | 1 分 | 3 分 | 5 分 |
|---|---|---|---|
| Search demand | 幾乎冇人 search | 有穩定需求 | 高需求 / seasonal peak |
| Business relevance | 同產品弱相關 | 可 link 到 category | 可直接 link 到 priority SKU |
| Purchase intent | 純學術 / 好奇 | 比較中 | 明顯準備買 / 查價 / 查推薦 |
| Ranking chance | Page 1 全部大媒體 | 有中型網站 | SERP 有 forum / thin content / 舊文 |
| Content fit | Imarflex 唔適合講 | 可中立分享 | Imarflex 有經驗 / 有產品 / 有保養角度 |
| Internal link value | 冇地方可導 | 可導 blog cluster | 可導 PDP、collection、parts、warranty |

簡單公式:

```text
Priority = Demand + Business relevance + Purchase intent + Ranking chance + Content fit + Internal link value
```

優先處理:
- **24 分以上:**下季必寫
- **18-23 分:**排入 backlog,等季節 / SKU priority 配合
- **17 分或以下:**只做 FAQ / supporting section,唔一定獨立成文

#### 例子:點樣由 business goal 變 keyword

| Business goal | Seed keyword | Expand 成可寫題目 | CTA |
|---|---|---|---|
| 推 IH 電飯煲 | IH 電飯煲 | `2026 點揀電飯煲?IH、微壓、球釜一篇講清楚` | IH 電飯煲 collection / IRC-20IH PDP |
| 夏天推風扇 | 風扇清潔 | `風扇換季深層清潔:拆網、抹扇葉、安全注意事項` | 風扇 collection / replacement parts |
| 推氣炸鍋 | 氣炸鍋食譜 | `氣炸鍋蝦多士做法:少油版週末 brunch` | 氣炸鍋 PDP |
| 減少客服查詢 | 伊瑪牌保養 | `Imarflex 保養點登記?購買後 5 分鐘完成教學` | Warranty registration |
| 推配件 / retention | 電飯煲內膽 | `電飯煲內膽甩塗層仲用唔用得?清潔同更換指南` | Parts finder / replacement inner pot |

#### 最後要過濾走嘅 keyword

- Search volume 高,但同 Imarflex 冇產品關係
- 只會帶嚟低意圖 traffic,例如純百科式 topic
- 要講醫療 / 安全絕對 claim 先有排名嘅 topic
- 需要大量實驗數據但我哋冇 data support 嘅 topic
- 只係追 competitor brand,但冇辦法中立比較嘅 topic

#### Keyword research step-by-step

呢個係實際做 research 嗰陣可以跟嘅順序。目標係由「一堆 keyword」整理成「下一季值得寫嘅內容清單」。

1. **定今季 business priority**
   - 問 client / sales / product owner:今季最想賣咩、邊啲 SKU 要清貨、邊啲新品要 launch
   - 輸出 3-5 個 priority category,例如 `IH 電飯煲`、`氣炸鍋`、`風扇`

2. **列 seed keywords**
   - 每個 priority category 寫 10-20 個 seed keyword
   - 包 category 名、產品功能、痛點、使用場景、常見問題
   - 例:`電飯煲推薦`、`IH 電飯煲`、`一家四口電飯煲容量`、`電飯煲飯硬`

3. **拉現有 data**
   - GSC:export 最近 3 個月 queries / pages
   - Site search:export 站內搜尋字
   - PostHog / analytics:睇 blog、search、collection 到 PDP / cart 嘅路徑
   - WhatsApp / CS:整理最近 20-50 條常見查詢

4. **Google SERP 手動檢查**
   - 用 incognito / clean browser 搜每個主要 seed keyword
   - 記低 page 1 係咩類型:blog、retailer、forum、YouTube、消委會、competitor PDP
   - 睇 People Also Ask、related searches、autocomplete
   - 判斷 Google 想要嘅內容格式,唔好硬寫錯 format

5. **擴展 long-tail keyword**
   - 用 pattern 擴字:
     - `產品 + 推薦`,例如 `氣炸鍋推薦`
     - `產品 + 點揀`,例如 `點揀電飯煲`
     - `產品 + 問題`,例如 `風扇好嘈`
     - `產品 + 場景`,例如 `細廚房氣炸鍋`
     - `產品 + 比較`,例如 `IH vs 微壓`
     - `品牌 + 服務`,例如 `伊瑪牌保養`
   - Long-tail search volume 可能低,但 conversion intent 通常高

6. **標記 search intent**
   - Informational:想學,例如 `氣炸鍋原理`
   - Commercial investigation:比較緊,例如 `電飯煲推薦`
   - Transactional:準備買,例如 `Imarflex IRC-20IH 價錢`
   - Navigational:搵官方資訊,例如 `伊瑪牌保養`
   - 優先做 commercial / transactional / high-value informational

7. **配對到 business destination**
   - 每個 keyword 都要問:如果文章排到,讀者下一步去邊?
   - 可配對 destination:
     - PDP
     - Collection
     - Parts finder
     - Warranty registration
     - WhatsApp enquiry
     - Email signup
   - 配唔到 destination 嘅 keyword,通常唔應該排高 priority

8. **評分同排序**
   - 用上面 scoring table 逐個 keyword 打分
   - 唔好俾 search volume 單一因素主導
   - 優先揀「分數高 + ranking chance 中等或以上 + 有清楚 CTA」嘅 keyword

9. **決定內容格式**
   - Buying guide:適合 `推薦`、`點揀`
   - Comparison:適合 `vs`、`比較`
   - How-to:適合 `清潔`、`維修`、`點用`
   - Recipe:適合 `做法`、`食譜`
   - FAQ / support page:適合 branded service keyword
   - 唔同 intent 要用唔同 format,否則即使寫得好都難排名

10. **做 keyword-to-content map**
   - 將 keyword group 成一篇篇 content,避免每個 keyword 都開一篇
   - 一篇文只揀 1 個 primary keyword
   - Secondary keywords 放入 H2 / H3 / FAQ
   - 同一 cluster 文章要互相 internal link

11. **揀下季 4 篇 draft**
   - 每季先揀 4 篇,唔好一次過開太多
   - 建議 mix:
     - 1 篇 high-intent buying guide
     - 1 篇 comparison
     - 1 篇 how-to / troubleshooting
     - 1 篇 recipe / seasonal content

12. **寫 brief 前做 final validation**
   - 確認 target keyword 真係有人 search
   - 確認 Imarflex 有產品 / 經驗支撐呢篇內容
   - 確認有 PDP / collection / service CTA
   - 確認冇 high-risk claims
   - 確認題目唔同現有文章 cannibalize

輸出格式可以用呢張表:

| Keyword | Intent | Destination | Business value | Ranking chance | Priority | Content format | Notes |
|---|---|---|---|---|---|---|---|
| 電飯煲推薦 | Commercial | Collection / PDP | High | Medium | 27 | Buying guide | Q1 必寫 |
| 電飯煲飯硬 | Problem-led | Blog / PDP / CS | Medium | High | 24 | Troubleshooting | 可加 FAQ |
| IH 原理 | Informational | Blog cluster | Low | Medium | 15 | Supporting section | 唔獨立成文 |

### 3. 揀 4 篇季度 draft 題目

每季唔係揀 search volume 最大,而係用呢個 priority matrix:

| Score | 問題 |
|---|---|
| Demand | 有冇真實搜尋需求? |
| Relevance | 同 Imarflex 產品有幾相關? |
| Conversion | 可唔可以自然 link 去 PDP / collection? |
| Authority | Imarflex 有冇資格講? |
| Competition | 有冇機會排到? |
| Seasonality | 是否即將踏入旺季? |

建議季度分配:
- 1 篇 buyer-intent 選購攻略
- 1 篇產品比較 / category comparison
- 1 篇食譜或使用教學
- 1 篇保養 / troubleshooting / seasonal guide

例:
- `2026 點揀電飯煲?IH、微壓、球釜一篇講清楚`
- `氣炸鍋 vs 焗爐:香港細廚房邊樣實用啲?`
- `氣炸鍋蝦多士做法:少油版週末 brunch`
- `風扇換季深層清潔:拆網、抹扇葉、安全注意事項`

### 4. 寫 article brief

每篇文章 draft 前先寫 brief,避免 AI 出文離題。

Brief template:

```markdown
## Article Brief
- Cluster:
- Target reader:
- Primary keyword:
- Secondary keywords:
- Search intent:
- Funnel stage:
- Suggested title:
- URL slug:
- Meta title:
- Meta description:
- Target word count:
- Required product links:
- Required internal links:
- Required outbound authority link:
- CTA:
- Image needs:
- Tone notes:
- Must mention:
- Must avoid:
```

### 5. AI-assisted first draft

AI 草稿唔可以直接 publish,必須經 editorial QA。

Draft 要求:
- 600-1200 字,跟 [[../brand/content-blog-direction|Blog Direction]] sweet spot
- 標題含 primary keyword
- 至少 1 個 H2、3-5 個 H3
- 首 100 字內清楚回答搜尋意圖
- 每段短,適合 mobile reading
- 至少 2 個 internal links
- 至少 1 個 PDP / collection CTA
- 1 個 outbound authority link,例如消委會或安全標準資料
- 唔講競爭對手壞話,只做中立比較
- 不誇大 spec / benefit,跟 [[../brand/content-pillars|Content Pillars]] 底線

Editorial QA checklist:
- [ ] Keyword 自然出現,冇 keyword stuffing
- [ ] Title / meta / slug 齊
- [ ] H2 / H3 結構清楚
- [ ] Internal links 正確
- [ ] PDP CTA 唔硬銷
- [ ] Product spec 經人手 fact-check
- [ ] 競爭對手資料冇失實
- [ ] 圖片 alt text 齊
- [ ] FAQ / schema 如適用已加

### 6. CMS / Next.js 實作要求

Blog collection 建議至少有以下欄位:

```yaml
title: string
slug: string
cluster: select
excerpt: textarea
heroImage: upload
content: richText / markdown
seo:
  metaTitle: string
  metaDescription: textarea
  primaryKeyword: string
  secondaryKeywords: array
  canonicalUrl: string
  noIndex: boolean
relatedProducts: relationship
relatedPosts: relationship
publishedAt: date
updatedAt: date
author: relationship
status: draft / review / published
```

Frontend 要處理:
- Blog listing page: `/blog`
- Blog detail page: `/blog/[slug]`
- Dynamic meta title / description
- Open Graph image
- Canonical URL
- JSON-LD Article schema
- Breadcrumb schema
- Sitemap inclusion
- RSS feed 如 scope 允許
- Image alt text
- Internal related posts / related products section
- 301 redirect 支援,特別係 migration 後舊 URL

### 7. 每季 GSC health check

每季固定睇:
- Total clicks
- Total impressions
- Average CTR
- Average position
- Branded vs non-branded query ratio
- Top 20 query
- Top 20 page
- Position 4-10 keywords:可用 meta / content refresh 推上 top 3
- Position 11-20 keywords:可用 content expansion / internal link 推上 page 1
- Indexed pages vs submitted sitemap
- Crawled but not indexed
- 404 / soft 404
- Duplicate title / meta
- Core Web Vitals warning

輸出格式:

| Finding | Impact | Action | Owner | Priority |
|---|---|---|---|---|
| `/blog/how-to-choose-rice-cooker` impressions 高但 CTR 低 | 浪費排名曝光 | 改 title + meta description | Content | High |
| 5 個舊 Shopline URL 404 | SEO loss | 補 301 redirect | Dev | High |
| 風扇清潔文排名 12 | Quick win | 加 FAQ + internal links | Content | Medium |

## 交付物

每季交:

1. **Keyword research sheet**
   - 30-50 個 keyword idea
   - 按 cluster / intent / priority 分組

2. **Content calendar**
   - 下一季 4-8 個建議題目
   - 標明邊 4 篇會先 draft

3. **4 篇 article brief + first draft**
   - 可直接交俾 editor / client review
   - 包 SEO meta、slug、internal link、CTA

4. **GSC health check report**
   - 主要 query / page / CTR / indexing issue

5. **Action list**
   - Dev tasks
   - Content tasks
   - Client fact-check tasks

## 實作節奏

### Quarter 0:首次 setup
- Week 1:接入 GSC / sitemap / current URL list
- Week 1:確認產品 category、priority SKU、競爭對手
- Week 2:完成 baseline audit
- Week 2:完成第一份 keyword research
- Week 3:出 4 篇 article brief
- Week 4:出 4 篇 AI-assisted draft + review checklist

### 每季固定流程
- Week 1:上一季 GSC report + ranking review
- Week 1:keyword refresh + competitor scan
- Week 2:決定下一季 4 篇主題
- Week 2-3:brief + draft
- Week 4:review call + handover action list

### 每月輕量檢查(如有 retainer)
- 新 publish 文章 indexing status
- 有冇 404 / redirect issue
- Top query 有冇異常跌幅
- 是否需要 refresh title / meta

## 分工

| Role | 負責 |
|---|---|
| Client / Imarflex | 提供產品資料、spec fact-check、確認禁忌 claims |
| Content team | Keyword research、brief、draft、editorial QA |
| Developer | Blog schema、meta、sitemap、redirect、schema markup、GSC technical fix |
| Project lead | Quarterly review、priority 排序、scope 控制 |

## KPI

首 3 個月唔應該用 revenue 判斷,應該睇 leading indicators:

- GSC impressions
- Non-branded clicks
- Blog indexed pages
- Ranking keywords 數量
- Average CTR
- Blog → PDP click-through
- Email capture from blog
- Assisted conversion from blog sessions

6-12 個月後先睇:
- Organic traffic growth
- Top 10 ranking keyword 數量
- Blog-assisted revenue
- Branded search lift
- PDP organic landing sessions

## 風險 / 注意

- SEO 有滯後效應,通常 3-6 個月先見到方向,6-12 個月先見複利
- AI draft 容易寫錯 spec,所有產品資料必須人工 fact-check
- 唔可以為咗 SEO 寫同品牌無關嘅 topic,否則 traffic 有但 conversion 低
- Migration 期間 301 redirect 係高風險項,要同技術 SEO 一齊處理
- Blog 題目要避開醫療、安全、法律等高風險 claim,例如「治療」、「保證」、「最安全」等絕對字眼

## 報價
- HK$3,000 / 季

## Pitch 講法
> 「Blog 內容係引擎,SEO 內容套件係導航。冇 keyword research,就好似日日開車但唔知去邊。每季我哋幫你睇 GSC、睇競爭對手、揀下季最值得寫嘅 topic,再出 4 篇可 review 草稿,等內容唔係靠靈感,而係跟住搜尋需求累積。」

## 對應 funnel
- [[1-awareness]]

## Related
- [[content-production]]
- [[../brand/content-blog-direction]]
- [[../brand/content-pillars]]
- [[../online-marketing/blog/samples/_readme]]
- [[posthog-analytics]]
- [[accessibility]]

## Reference
- [[add-ons-discussion#9-seo-content-pack]]
- [[internal-master#9-seo]]
