---
type: skill-reference
skill: imarflex-research/market-scan
area: google-trends-seed-list
tags:
  - online-marketing
  - market-intelligence
  - google-trends
---

# Google Trends HK — Seed Keyword List

24 seed queries × (10 Rising + 10 Top related) = ~480 keyword signals per quarterly scan。

> [!info] 用法
> 每條 seed 用 agent-browser CLI fetch(見 `sources-public.md` §1 working access pattern)。Capture:30-day series + Related Rising 10 + Related Top 10。每 query ~30 秒 + 30 秒 sleep 防 429。一次 quarterly full run ~25-30 分鐘。

> [!important] 為何唔可以淨係用 generic「電飯煲」
> Google Trends 係 **seed-expansion 工具**,唔係 idea-discovery tool。Generic「電飯煲」query 只 expose category-level Rising queries。要拎到 brand-level / competitor-level / long-tail intent / comparison 信號,需要 cover 多個 angle。本 list 嘅 24 seeds 對應 Imarflex 9 個 active categories + 5 competitor brands + 5 head-to-head comparisons + 5 problem-intent queries,確保 macro scan 唔會有 blind spot。

## URL pattern reference

| Mode | Template |
|---|---|
| Single keyword 30-day | `https://trends.google.com/trends/explore?geo=HK&q={kw_urlencoded}&date=today%201-m` |
| Single keyword 12-month | `https://trends.google.com/trends/explore?geo=HK&q={kw_urlencoded}&date=today%2012-m` |
| Compare ≤ 5 keywords | `https://trends.google.com/trends/explore?geo=HK&q={kw1},{kw2},{kw3},{kw4},{kw5}&date=today%2012-m` |

**Default = 30-day(`date=today%201-m`)。**12-month / 5-year query 觸發 heavier rate-limit (見 cadence-and-triggers.md 嘅 rate-limit handling)。 30-day 先用嚟拎 baseline,12-month 只喺需要 seasonal pattern confirmation 時用 (eg 風扇旺季)。

---

## Group 1 — Category seeds (9 queries,對齊 Imarflex active categories)

| # | Seed (zh-HK) | 對齊 Imarflex | 目標捕捉 |
|---|---|---|---|
| 1 | 電飯煲 | IRC 系列 generic | Category-level Rising → competitor brand entry、replacement / parts intent |
| 2 | IH 電飯煲 | IRC-20IH | IH 細分需求、技術差異化角度 |
| 3 | 風扇 | 風扇 generic | 季節 peak 點、fan-type 分佈 (循環 / 立 / 手提 / 水冷) |
| 4 | 循環扇 | 風扇 hero 候選 | 2026 HK 主流 type(scan 確認)|
| 5 | 手提扇 | 手提扇 hero 候選 | YOHO 14 款 listicle 對標 |
| 6 | 抽濕機 | 抽濕機 | 雨季 peak 點、competitor brand 動向 |
| 7 | 氣炸鍋 | IAF 系列 | 容量 cluster (≤ 5L vs > 5L)、少油 / 唔開火 angle |
| 8 | 滅蚊燈 | 法國合作 SKU | 夏天 seasonal peak、捕蚊 vs 誘蚊 term-of-art |
| 9 | 冷風機 | ICF-140R 監察 | LIHKG-flagged category 嘅 search-volume reality check |

## Group 2 — Brand seeds (5,brand mindshare radar)

| # | Seed | 目標 |
|---|---|---|
| 10 | Imarflex 電飯煲 | Imarflex 英文 brand mention 量 + Rising sub-queries |
| 11 | 伊瑪牌 電飯煲 | 中文 brand mindshare (vs 英文);本地用戶用咩字搵 Imarflex |
| 12 | Toshiba 電飯煲 | Toshiba 30-day 動向 + Rising sub-queries (新 launch / parts / 評價)|
| 13 | Panasonic 電飯煲 | Panasonic 動向(同上)|
| 14 | Tiger 電飯煲 | Tiger 動向(同上)|

> [!info] 點解唔 query「Cuckoo / 美的 / 小米 / 松井」?
> 呢啲係 emerging brand,通常自己唔會出現喺 generic「電飯煲」嘅 Related Rising(我哋已經由 query 1 拎到佢哋 Breakout)。 需要單獨深 dive 嗰陣先 ad-hoc query,唔入 default seed list 慳 budget。

## Group 3 — Comparison runs (5,head-to-head visualisation)

Trends compare mode plot 多條 line 同一 chart,直接 visualise relative interest 比例。

| # | Compare set | 目標 |
|---|---|---|
| 15 | Imarflex 電飯煲 vs Toshiba 電飯煲 vs Panasonic 電飯煲 vs Tiger 電飯煲 | 4-way mindshare share %(Imarflex 預期最低,quantify gap)|
| 16 | IH 電飯煲 vs 微壓 電飯煲 vs 球釜 電飯煲 | IH 技術 vs 競品技術 嘅 user interest split |
| 17 | 循環扇 vs 座地扇 vs 水冷扇 vs 無葉風扇 vs 手提扇 | Fan type demand split → confirm Q2 hero 選擇 |
| 18 | 抽濕機 vs 除濕機 | Term-of-art preference (HK 用「抽」/「除」)→ SEO + AEO heading wording 決定 |
| 19 | 氣炸鍋 vs 空氣炸鍋 | 同上 — generic vs full-term preference |

## Group 4 — Long-tail problem seeds (5,user-intent driven)

呢類 query 嘅 Related Rising 通常直接 surface 真實 user pain point + decision factors,係 content topic 嘅 raw material。

| # | Seed | 目標 |
|---|---|---|
| 20 | 電飯煲 點揀 | Buying-guide intent;Rising = 真實 decision factors HK 用戶考慮緊邊啲 |
| 21 | 風扇 點拆洗 | Maintenance content topic + parts-finder cross-validation |
| 22 | 抽濕機 邊隻好 | Comparison-intent;競品 SERP 重疊度 |
| 23 | 氣炸鍋 唔健康 | Anti-claim / negation angle;myth-busting content opportunity(健康 angle 但避開「降糖」commoditised trap)|
| 24 | 電飯煲 內膽 | Parts / replacement intent → **parts-finder DTC moat validation**(已喺 2026-05-27 scan 確認 panasonic 電飯煲 內膽 Breakout)|

---

## Run protocol

1. 順序 fetch via agent-browser CLI(`sources-public.md` §1 working access pattern)
2. 每 query 之間 **sleep 30 seconds**(防 IP-level 429 rate limit)
3. 每 query capture:
   - 30-day time series (date, value 0-100)
   - Related Rising 10 (query name, status: Breakout / +N%)
   - Related Top 10 (query name, score 0-100)
4. Raw notes 寫入 scan output(`business-focus/yyyy-qx-market-scan.md`)入面 `## Per-seed raw data` section
5. Distill:每個 Group 揀 1-3 條最 actionable 寫入 final 5-10 bullet「Market context」output

## Per-quarter dropout / rotation rules

- **Dropout:** seed 連續 2 季 0 actionable Rising / 完全 flat → 暫時 rotate out,space 留畀 ad-hoc seeds
- **Rotation in:** ad-hoc scan 發現 emergent category(eg 「氣炸鍋 烤盤」)有 3 個月以上 sustained signal → 升級入 next quarter default seed list
- **Cap:** total seeds ≤ 30 per quarterly scan(fetch budget + 30s sleep 之間 hard limit ~30 分鐘 active time)

## What this seed list does NOT cover

- ❌ Outside-HK Trends (US / UK / JP / TW) — 用 Source 7 (Amazon JP / TW) 接呢 layer
- ❌ Realtime trending searches — 用 `https://trends.google.com/trending?geo=HK&category={code}` (separate workflow,monthly category-filter sweep,見 sources-public.md §1)
- ❌ Keyword search volume (Google Ads Keyword Planner) — Trends 係 relative interest,唔係 absolute volume
- ❌ Specific SKU model numbers (eg IRC-20IH) — model number search volume 通常太低(< 25 baseline)、Trends data noisy。 改用 GSC(hired mode)或 retailer site search snapshot
