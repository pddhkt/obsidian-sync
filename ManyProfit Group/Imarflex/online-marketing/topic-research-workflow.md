---
type: marketing-process
area: topic-research
status: draft
tags:
  - online-marketing
  - research
  - content-planning
---

# Topic Research Workflow

Topic research 目標唔係「諗多啲題目」,而係搵到同 Imarflex 生意、產品、客戶問題、搜尋需求有關嘅題目。Workflow 由 **Step 0(市場掃描)**起跳,確保每次 focus 都有外部 market input,唔係淨係靠「client 想 sell 咩 + 季節」推出嚟。

## 0. Market intelligence scan

每次寫 monthly / quarterly business focus 之前,先做一次 macro 市場掃描。呢步**唔需要 client data**(所有 source 都係公開),output 係 5-10 條 bullet,寫入 focus doc 嘅 `## Market context` section,做 Step 1 嘅 input。

| Source | 用嚟答 | Cadence |
|---|---|---|
| Google Trends(HK 地區) | 邊個 category / keyword 升 / 跌 | Quarterly |
| HKTVmall / 豐澤 / 百老匯 / 實惠 bestseller | 邊個 SKU / sub-category 啱啱熱 | 8-week rolling |
| 小紅書 / 抖音(HK) | 文化 / lifestyle cluster(例:細廚房、宿舍家電) | Quarterly |
| 競品新品(Panasonic HK / Toshiba HK / Sharp HK / Tiger / Zojirushi / Iris Ohyama) | 大牌押咩注、撞咗 Imarflex 邊個 SKU | Monthly |
| HK media(U Lifestyle / Mill MK / FashionOne / Yahoo Style HK) | 邊類 listicle / review 正在 trend | Monthly |
| LIHKG / Reddit r/HongKong 家電 / 煮食 thread | 真實討論、痛點 trend | Monthly |
| Amazon JP / TW bestseller | 領先指標(日系家電通常 JP / TW 先紅 6-12 個月) | Quarterly |
| Industry report(GfK / Euromonitor / HKPC 等) | 大盤 category sizing(optional / paid) | Quarterly |

詳細 playbook 同 output template 喺 `imarflex-research/market-scan` skill;用 `imarflex-market-scout` agent 走一次完成 quarterly full scan / monthly refresh。

> [!important]
> Step 0 同 Step 2 唔好混淆。
> - **Step 0(Market scan)= Macro / strategic** — 答「押邊個 category」,output 5-10 bullet 入 focus doc 嘅 `## Market context`
> - **Step 2(Signal gather)= Tactical / topic-level** — 答「呢個 category 寫咩 blog / IG / FB」,output raw topic notes 入 `research-inbox/`

## 1. 先定 business focus

每次 research 前,先寫低今個月 / 今季最重要嘅方向,寫入 [[business-focus/_readme|business-focus]](`yyyy-mm-focus.md` / `yyyy-qx-focus.md`)。Topic scoring(Step 4)嗰陣用返呢個方向對「Business relevance」。**寫之前先睇 Step 0 嘅 market-scan output**,將 5-10 bullet 入 `## Market context` section。

| 問題                        | 例子                                            |
| ------------------------- | --------------------------------------------- |
| 今季要推邊個 category?          | 電飯煲、氣炸鍋、風扇                                    |
| 有冇新品 / 清貨 / 高 margin SKU? | IRC-20IH、IAF 系列                               |
| 客戶最近問得最多係咩?               | 保養、配件、容量、清潔                                   |
| 有冇季節性需求?                  | 夏天風扇、農曆年前廚房電器                                 |
| 內容最後要導去邊?                 | PDP、collection、WhatsApp、warranty、parts finder |

## 2. Gather signals

每個 signal 都先放入 [[research-inbox/_readme|research-inbox]],未需要即刻判斷好壞。

| Source | 要收集咩 | 點樣用 |
|---|---|---|
| Customer service / WhatsApp | 常見問題、用語、投訴、比較問題 | 變 FAQ、how-to、problem-led topics |
| Google Search Console | impressions、CTR、position 8-20 query | 搵 quick win SEO topic |
| Site search / Meilisearch | 站內搜尋字 | 搵 high-intent product language |
| PostHog / analytics | Blog to PDP、search to cart path | 判斷邊啲 topic 真係推 funnel |
| Competitor SERP | Page 1 內容類型、標題、missing angle | 判斷 Google 想要咩格式 |
| Retailer / marketplace | 豐澤、百老匯、實惠 category wording | 搵香港用戶常用字 |
| Product catalog | SKU、功能、容量、痛點 | 連接 topic 到 PDP / collection |
| Seasonal calendar | 天氣、節日、launch date | 提前 6-8 週準備 topic |

## 3. Raw topic capture format

每條 topic idea 最少要有以下資料。

```markdown
## Topic idea

- Source:
- Raw wording:
- Product / category:
- Customer problem:
- Possible keyword:
- Search intent:
- Destination / CTA:
- Evidence:
- Notes:
```

## 4. Topic scoring

整理完 raw ideas 後,用 1-5 分評估。

| Score area | 1 分 | 3 分 | 5 分 |
|---|---|---|---|
| Business relevance | 弱相關 | 可 link 到 category | 可直接推 priority SKU |
| Search demand | 未見需求 | 有少量 signal | GSC / SERP / customer 都有 signal |
| Purchase intent | 純好奇 | 比較中 | 明顯接近購買 |
| Content fit | Imarflex 難講 | 可一般分享 | Imarflex 有產品 / 經驗 / support angle |
| Repurpose value | 只適合一篇文 | 可出 blog + social | 可拆成 blog、IG carousel、FB、FAQ |
| Ranking chance | Page 1 太強 | 有空間 | SERP 內容薄、舊、唔夠本地化 |

Priority formula:

```text
Priority = Business relevance + Search demand + Purchase intent + Content fit + Repurpose value + Ranking chance
```

| Total score | Action |
|---|---|
| 24+ | 入下月 calendar |
| 18-23 | 放入 backlog,等季節 / SKU priority |
| 17 或以下 | 只做 FAQ、caption、supporting section |

## 5. Topic to content decision

| Topic 類型 | 最適合格式 | Example |
|---|---|---|
| Buying guide | Blog + FB link post | `2026 點揀電飯煲` |
| Comparison | Blog + IG carousel | `IH vs 微壓 vs 球釜` |
| Problem-led | Blog + FAQ + short social | `電飯煲飯硬點算` |
| Maintenance | Blog + IG step carousel | `風扇點拆洗` |
| Recipe | Blog + IG carousel / reel angle | `氣炸鍋蝦多士` |
| Brand / service | Support page + FB | `伊瑪牌保養點登記` |

## 6. Weekly checklist

- [ ] Export / check GSC quick-win queries
- [ ] Check site search terms
- [ ] Review 10-20 recent WhatsApp / customer questions
- [ ] Search 3-5 competitor / SERP topics
- [ ] Add raw notes to [[research-inbox/_readme]]
- [ ] Score the best ideas
- [ ] Move selected ideas into [[content-briefs/_readme]]
- [ ] Add approved topics to [[content-calendar]]
