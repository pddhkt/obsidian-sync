---
type: skill-reference
skill: imarflex-market-scan
area: cadence-and-triggers
tags:
  - online-marketing
  - market-intelligence
---

# Cadence + trigger rules + noise filter

呢個 file 答兩條問題:

1. **幾耐做一次?** — Quarterly full / Monthly light / Ad-hoc 三種 cadence 嘅 rule
2. **咩先算 signal,咩係 noise?** — Macro-signal threshold,避免每個小 wobble 都 record

---

## Cadence rules

### Quarterly full scan(主 cadence)

| Item | Rule |
|---|---|
| Trigger | 每季開始前 2-3 週(eg Q2 = 3 月中至月尾、Q3 = 6 月中至月尾)|
| Sources | **Default 6 sources**:1, 2, 4, 5, 6, 7。Source 3(小紅書 / 抖音)opt-in only(要 user 提供 manual evidence)。Source 8(paid)optional |
| 時長 | ~2 小時(取決 fetch 速度)|
| Output | `business-focus/yyyy-qx-market-scan.md` + paste-in snippet |
| 下游 | 餵 quarterly focus 寫之前嘅「Market context」 |

**順序**:`market-scan` → `business-focus`(quarterly)→ 然後每週 `signal-gather`。

### Monthly light refresh

| Item | Rule |
|---|---|
| Trigger | 每月 1 號 ± 1 週,寫 monthly focus 之前 |
| Sources | 只 re-check 3 個易變 source: |
| | - Source 1(Google Trends)— check 過去 30 日 inflection |
| | - Source 4(競品新品)— check 過去 30 日有冇 launch |
| | - Source 5(HK 媒體)— check 過去 30 日有冇 listicle update |
| 時長 | ~20 分鐘 |
| Output | 兩種選擇:|
| | a) 如無重大變化 → 喺 monthly focus 嘅 Market context section 寫「沿用 [[yyyy-qx-market-scan]],無重大 update」|
| | b) 如有變化 → Edit 季度 market-scan 加 dated bullet,並寫 short `yyyy-mm-market-scan.md` 講變化 |

**唔好 monthly 跑齊 default 6 source**。每月跑齊 = waste,而且容易 over-react noise。

### Ad-hoc trigger scan

只喺以下 trigger 出現時跑:

| Trigger | 例子 | Scope |
|---|---|---|
| **競品 surprise launch** | Panasonic 突發推新 IH SKU 直撞 IRC-20IH | Sources 4 + 1 + 5(深 dive 嗰個 category)|
| **Viral 文化 / 社交 cluster** | 突發 HK 紅了「{category} 收納櫃」 → 抖音 / 小紅書 cluster spike | Sources 3 + 1 + 2 |
| **Client 問起** | Client 問「我哋係咪應該推暖風機?」 | Sources 1 + 2 + 5 嗰個 category |
| **Retailer big shift** | HKTVmall bestseller 連續 2 週見巨大 shift(eg 氣炸鍋全部跌出 top 20)| Sources 2 + 1 + 6 |
| **Season anomaly** | 4 月忽然冷返,影響原本 5 月風扇 push timing | Sources 1 + 2 + 季節 cross-check |

| Item | Rule |
|---|---|
| Sources | 視 trigger 揀 2-4 個 relevant source,通常包 1 + 2 |
| 時長 | ~30 分鐘 |
| Output | 1-3 條 bullet append 入當季 market-scan,加 dated section |
| 例 | `## Ad-hoc update — 2026-04-22: Panasonic SR-CX 新品反應` |

**唔好用 ad-hoc 取代 quarterly**。Ad-hoc 係 supplement,quarterly 仍要按時。

---

## Macro signal threshold(咩先算 signal)

每個 source 都有 threshold,**過唔到 threshold 就唔當 signal,唔記入 raw notes**。

### Source 1 — Google Trends HK

| Pattern | Threshold | 點處理 |
|---|---|---|
| 升勢 | 12 個月 vs baseline +50% 以上 OR 5 年首次 break baseline | ✅ |
| 30-day single peak ≥ 90(out of 100) | 拎 calendar 對:有冇對應 cultural moment(eg 母親節 5 月)| ✅ if 對得返,seasonal-bound;⚠️ if 完全 unexplained |
| Related Rising — Breakout | 任何 emerging brand / SKU spec / problem term 喺 Breakout | ✅ priority — 直接喺 raw notes,標明係 brand entry / commoditisation / parts-replacement intent |
| Related Rising — +N% | +50% 以上 持續多 query 出現同 cluster | ✅;單 query <+50% → ⚠️ |
| 跌勢 | 12 個月 vs baseline -30% 以上 持續 ≥ 6 個月 | ⚠️(可能 category 萎縮)|
| Single-month spike | < +50% 單月升 | ❌ noise,唔記 |
| Event-driven spike | 颱風 / 新聞 / KOL 事件 | 標 ⚠️ "event-driven",唔當 structural |
| Low baseline | Keyword baseline < 25(Google Trends scale)| Data noisy,標 ⚠️ data quality;常見於 model number(eg IRC-20IH)|

> [!warning] Rate-limit operational rules
> Default fetch tool = agent-browser(Playwright)。 詳細 working pattern + fallback 喺 `sources-public.md` §1。 跑 seed list 嗰陣:
>
> - Per-query 30 秒 sleep — non-negotiable
> - Default `?date=today 1-m`(30-day)— 12-month / 5-year 只喺需要 seasonal confirmation 用,分批 + 60 秒 cooldown
> - 連續 ≥ 10 queries 加 1 次 60 秒 cooldown
> - 唔好換 tool(agent-browser ↔ browser-use ↔ raw playwright)重試同條 429 — 三者 share IP-level rate limit window
> - 真係鎖死 → wait ≥ 60 分鐘,或 fallback 去 `/trending?geo=HK` 攞 partial signal,嗰啲 bullet 自動 ⚠️

### Source 2 — Retailer bestseller

| Pattern | Threshold | 點處理 |
|---|---|---|
| Sustained rank | ≥ 8 週連續 top 10 / 連續 +5 位 | ✅ |
| 容量 / 規格 cluster gap | Top 10 入面 ≥ 70% 集中喺一個 spec band,反面有 gap | ✅ |
| Single-week rank jump | 單週 spike | ❌ noise(可能 pricing / placement)|
| Same-brand 多 SKU 連續上榜 | 1 brand 占 top 10 > 60% | ⚠️ brand push 唔係 organic demand |
| 大促後 rank 反彈 | 雙 11 / 書展 / 年中 後 1 週 | ❌ exclude |

### Source 3 — 小紅書 / 抖音

| Pattern | Threshold | 點處理 |
|---|---|---|
| Cluster signal | ≥ 5 條 same-theme post 近 90 日,跨 ≥ 2 KOL,有 HK tag / 地理 | ⚠️ leading indicator(因為唔代表 HK Google 搜尋)|
| Cross-platform | 同 cluster 喺 小紅書 + 抖音 + Instagram HK 都見 | ✅ |
| Single viral post | 1 條 post 爆紅 | ❌ noise |
| 純 mainland China | 冇 HK tag / 地點 / 用戶 | ❌(但可入 Amazon JP/TW 之類 leading indicator pool)|
| KOL paid sponsor | 有 #廣告 / #ad / #PR | ❌ exclude |

### Source 4 — 競品新品

| Pattern | Threshold | 點處理 |
|---|---|---|
| HK SKU listed | Brand HK 官網 + ≥ 1 HK retailer | ✅ |
| Global launch HK 未上 | Brand global 出 PR、HK 未跟 | ⚠️ leading indicator |
| 重包裝舊 SKU | 同 spec 唔同 colorway / 包裝 | ❌ exclude(check 之前 SKU 對比)|
| 純 PR / 未開賣 | 未喺 HK retailer 上架 | ❌ noise |
| Direct positioning clash | 新 SKU 撞 Imarflex hero SKU(eg IRC-20IH)spec / price band | ✅ priority bullet |

### Source 5 — HK 媒體 editorial

| Pattern | Threshold | 點處理 |
|---|---|---|
| Editorial cluster | ≥ 2 outlet 同月覆蓋同 category | ✅ |
| Big-outlet single piece | 1 間大 outlet(UPower / Cosmo)單篇 listicle | ⚠️ |
| 純 advertorial | 有「贊助」/「Sponsored」/「廣告編輯」標 | ❌ exclude |
| Outlet 抄 outlet | 內容雷同 ≥ 70% | 算同一 piece |
| Imarflex 缺席 listicle | Brand 在 listicle 入面冇出現 | ✅(media PR action item)|

### Source 6 — LIHKG / Reddit

| Pattern | Threshold | 點處理 |
|---|---|---|
| Pain-point cluster | ≥ 3 thread / post 同樣痛點近 90 日 | ✅ aggregate |
| Brand reputation shift | Brand 突發集中負評 ≥ 5 mention 近 60 日 | ⚠️ alert |
| Single thread heat | 單一 viral thread | ❌ noise |
| Brand mindshare ratio | Imarflex mention vs 主要競品 mention % | 純參考,唔當 signal |
| 政治 / 不相關 | Off-topic thread | ❌ exclude |
| **Quote 個別 post 做 content** | — | ❌ **永遠唔可以**(法律 / 私隱 / ToS)|

### Source 7 — Amazon JP / TW

| Pattern | Threshold | 點處理 |
|---|---|---|
| Sub-cluster signal | Top 50 同 sub-category ≥ 3 款 SKU,持續 ≥ 4 週 | ✅ leading indicator |
| Single hit SKU | 1 款 SKU 短時間入 top 50 | ❌ noise |
| 大促後 rank | Amazon Prime Day / 雙 11 / 黑五 後 1 週 | ❌ exclude |
| Brand 集中 | 1 brand 占 top 50 > 60% | ⚠️ brand push 嫌疑 |
| 純 JP / TW 文化品 | 日式 / 台式 特殊 SKU(eg 茶器、特殊調理具)| ❌(HK 唔跟)|
| 新功能持續多 SKU | 同新功能(eg 米種 preset)出現喺 ≥ 3 SKU top 50,持續 ≥ 4 週 | ✅ future-spec leading indicator |

---

## 多 source confirm 規則(決定 ✅ vs ⚠️)

| 情境 | Marker |
|---|---|
| 雙 source(以上)同方向 confirm | ✅ |
| 單 source signal 過 threshold,但無其他 source confirm | ⚠️ |
| Leading indicator(Amazon JP / TW、小紅書、競品 global PR)— 即使 sustained | ⚠️ |
| 數據 quality issue(low baseline、event-driven、brand push 嫌疑) | ⚠️ |
| 直接威脅 Imarflex hero SKU | ✅ priority(即使單 source 都升 ✅,因為 actionable)|

---

## Stage-aware ⚠️ vs ✅ rule(pitch stage 同 hired mode 期望唔同)

Pitch stage(冇 client retailer access、Google Trends 經常 429、SPA WebFetch 攞 shell)嘅 real-world fetch landscape 令 ⚠️ 偏多係 **normal、expected**。**唔好為咗湊靚 ratio 而 fabricate ✅**;亦**唔好**因為 ⚠️ heavy 就 fail 一個 honest pitch scan。

| Stage | ⚠️ vs ✅ expectation | Failure trigger |
|---|---|---|
| **Pitch stage**(default,本 skill 主要場景)| ⚠️ heavy 正常(eg 5 ⚠️ + 2 ✅)| **Fail only if 0 ✅**(即冇 source confirm 到任何 signal)|
| **Hired mode**(client 提供 GfK / retailer authenticated session / GSC / WhatsApp data)| ✅ heavy 正常(eg 6-7 ✅ + 2-3 ⚠️)| **Fail if ⚠️ heavy 連續 2 季**(代表 data access regressing,要 escalate)|

> [!important]
> 本 skill **唔可以**因 pitch stage scan ⚠️ heavy 就標 fail。如 pitch scan 至少有 1 條 ✅(任何 source confirm 到一個 signal),就視為 healthy scan。
>
> 反之,hired mode 連續 2 季 ⚠️ heavy = data pipeline 出問題,要報。

---

## 「Macro signal worth recording」最終 sanity-check

每條 distilled bullet 寫完之前問自己:

- ✅ 有 source identifier(唔係「市場」呢類)
- ✅ 有 timeframe(過去 X 個月 / X 週)
- ✅ 有 number(%、count、rank、N 條)
- ✅ 過咗 threshold(唔係 single-week / single-post noise)
- ✅ Implication 對得返 Imarflex category / SKU
- ✅ Marker 對(✅ 要雙 source、⚠️ 要 honest)

如有任何一條過唔到,**唔好寫入 5-10 bullet output**。可以留喺 raw notes 入面以後 re-check。

---

## Anti-pattern cadence

❌ 每週做一次 full scan — overkill,signal 出 noise
❌ 每月跑齊 6 source — 浪費時間,信號變化唔會月度 dramatic shift
❌ 季尾先做 scan — 太遲,focus doc 已經寫晒 / 內容已 publish
❌ Skip 季度 scan,純靠 monthly refresh — 失去 baseline,無法判斷 inflection
❌ 一個 trigger 出現就跑齊 default sources full scan — ad-hoc 應該窄,2-4 source 夠

---

## 同 `imarflex-signal-gather` 嘅 cadence 對比(避免撈亂)

| Cadence item | market-scan(本 skill,Step 0) | signal-gather(Step 2) |
|---|---|---|
| 主頻率 | 季度 + 月度 light + ad-hoc | 每週(Monday)|
| 時長 | 2 小時 / 20 分鐘 / 30 分鐘 | 1-2 小時 / 週 |
| 5 月 sample | quarterly = 3 月尾 / 4 月初做完,monthly refresh 5 月 1 號 | 5 月每個 Monday 都 sweep |
| Source 重疊? | Sources 4 + 5(競品 / 媒體)同 Step 2 有少許重疊但**層級不同** — Step 0 睇 macro launch / editorial agenda,Step 2 睇 keyword-level SERP | — |

> [!important]
> Step 0 sources 4 + 5 vs Step 2 sources 1(SERP)— 兩者**唔係重複**:
> - Step 0 source 4「競品新品」= 邊個 brand 上邊隻新 SKU(macro launch list)
> - Step 2 source 1「Competitor SERP」= 「氣炸鍋推介 2026」呢條 keyword 邊個 brand rank Page 1(topic-level SERP)
> - Step 0 source 5「HK 媒體 editorial agenda」= 過去 3 個月有冇 outlet 寫 listicle(macro pattern)
> - Step 2 source 1 入面睇到嘅 media 結果係已 rank 嘅 specific article(tactical)
