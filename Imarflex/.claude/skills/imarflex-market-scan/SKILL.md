---
name: imarflex-market-scan
description: Imarflex 伊瑪牌 macro market-scan playbook for topic-research-workflow Step 0 — collects category-level market intelligence (Google Trends HK, retailer bestsellers, competitor SKU launches, HK media editorial agenda, LIHKG/Reddit aggregate sentiment, Amazon JP/TW leading indicators, optional GfK/Euromonitor reports; 小紅書/抖音 opt-in only via user-provided manual evidence) and distills them into a 5-10 bullet "Market context" block that feeds the upstream business-focus doc's "which category should we even bet on" decision. Default scan = 6 public sources. Pitch-stage friendly but ⚠️-heavy is normal (SPA / 429 / DNS-dead are real-world fetch landscape). Triggers on "market scan", "market intelligence", "macro signals", "trending product", "trending topic", "Google Trends", "competitor launch", "Step 0", "市場掃描", "市場趨勢", "category bet", "should we push X", "rising category", "market context for Q".
paths: Imarflex/online-marketing/business-focus/**
allowed-tools: Read, Glob, Grep, Edit, Write, WebFetch, WebSearch
---

# Imarflex Market Scan — Operating Manual

呢個 skill 係 [[Imarflex/online-marketing/topic-research-workflow]] **Step 0「Macro market scan」嘅執行手冊**。Step 0 喺 Step 1(business-focus)**之前**做,負責答「我哋今季 / 今月應該押邊個 category」呢條根本問題。

## Hard rules

呢啲 rule **non-negotiable**,違反即刻 fail scan,亦會影響 downstream(business-focus / copywriter)信任度。

1. **Never invent data.** 冇真係跑過嘅 source = 唔可以寫 bullet。Bullet 內嘅 number / timeframe / SKU 名 必須 from 真實 fetch,唔可以 reuse `references/scan-output-template.md` 嘅 placeholder。
2. **Always cite source.** Raw notes 入面每條 observation 都要 URL + date + 數字。
3. **Mix marker(stage-aware).** Pitch stage ⚠️-heavy 正常,fail 只係 0 ✅ 嗰時;hired mode ✅-heavy 正常 — 詳見 `references/cadence-and-triggers.md`。
4. **Noise filter enforced.** 每條 bullet 寫之前過 `references/cadence-and-triggers.md` 嘅 threshold。
5. **LIHKG / Reddit findings stay internal only — 絕對唔出 client-facing 文檔。**
   - **唔可以**進入 brief、blog、PDP copy、social caption、pitch deck、client report、proposal、annual report、PR、任何 client 會見到嘅文檔
   - **唔可以**quote / paraphrase 任何 named user(handle / username / 用戶名)
   - **只可以**做 aggregate sentiment trend reading(eg「N 條 thread 提到 痛點 X」)
   - **Brand-self mention(Imarflex)**係唯一可以驅動 bullet 嘅嘢 — 即係「Imarflex {sub-category} reputation observation」可以做 finding bullet。**Competitor brand sentiment(eg Panasonic 過去 60 日負評集中)只可以做 internal observation,唔可以進入 client-facing 文檔**
   - LIHKG / Reddit 嘅 findings 只可以入 `business-focus/yyyy-qx-market-scan.md`(internal scan file),**唔可以 propagate downstream**(focus doc 嘅 Market context section 引用 scan file 嗰陣,要將呢類 bullet 內部 redact / paraphrase 做「internal community signal」而唔出原 quote)
6. **Filename convention.** `yyyy-qx-market-scan.md`(quarterly)/ `yyyy-mm-market-scan.md`(monthly,只 delta)。
7. **First scan = no prior baseline.** 第一次做 scan 冇上季 file = `prior-scan: none (first scan)` 寫入 frontmatter,**唔好 error / abort**。

> [!important]
> 冇 Step 0,workflow 就會由「client 話推 X」+ 季節 → focus → topic signals,closed-loop。Step 0 出嚟救嘅 case = client 話推「電飯煲」但 Google Trends HK 過去 12 個月 -30%、HKTVmall bestseller 已連續 8 週畀氣炸鍋擠走 — 我哋有責任喺寫 focus 前知道。

## Step 0 vs Step 2 — macro 同 tactical 嘅明確分界

| Aspect | Step 0(本 skill — market-scan) | Step 2(sibling — signal-gather) |
|---|---|---|
| **層級** | Category 層 / 市場層 | Topic 層 / keyword 層 |
| **問題** | 邊個 category 值得押? | 押咗呢個 category 之後要寫邊條 topic? |
| **頻率** | 季度 full + 月度 light + ad-hoc | 每週 sweep |
| **Source** | Google Trends、retailer bestseller rank、小紅書 cluster、競品新品、HK 媒體 editorial agenda、LIHKG sentiment、Amazon JP/TW leading indicator、(optional) GfK | Competitor SERP、retailer category wording、shopline PDP、season calendar、(post-engagement)WhatsApp / GSC / site search / PostHog |
| **時間窗** | 8 週 - 5 年 trend / inflection | 過去 7 - 28 日 query / page level |
| **輸出位** | `business-focus/yyyy-mm-market-scan.md` → paste 入 focus doc 嘅 "Market context" 段 | `research-inbox/*.md` raw notes(9-field capture) |
| **下游** | 餵 `imarflex-business-focus` skill 寫 focus | 餵 Step 4 scoring → seo-keyword-research → content-briefs |

> [!warning]
> 兩個 skill **唔可以撈亂**。如果你而家寫緊嘅嘢係「氣炸鍋蝦多士食譜」嘅 keyword / SERP — 嗰個係 Step 2,用 `imarflex-signal-gather`。本 skill 只回答「氣炸鍋呢個 category 喺香港 macro 上面係咪上緊」。

## Pitch-stage usability(關鍵賣點)

**Default 6 source(1, 2, 4, 5, 6, 7)全部 public**,唔需要 client 開任何 access。即係:

- ✅ Pitch stage(未簽)即刻做到完整 scan
- ✅ 可以喺 pitch deck demo:「呢度係我哋未收你錢前已經做好嘅 Q3 market scan」
- ⚠️ Pitch stage **⚠️-heavy 係 normal**(SPA / 429 / DNS-dead 都係 real-world fetch landscape)— stage-aware rule(`cadence-and-triggers.md`)講明 pitch fail only if 0 ✅
- ✅ Onboarding 之後 default 仍然係呢 6 個 source(unchanged),hired mode 加 GfK / retailer authenticated session / GSC,⚠️ 開始 upgrade 做 ✅

所以 Step 0 係**整套 workflow 入面唯一一個 pitch / hired 兩個模式都 run 同一個 default source 表嘅 step**。

## The macro signal sources(6 default + 1 opt-in + 1 paid)

| # | Source | Default scan? | Pitch 可用? | Reference |
|---|---|---|---|---|
| 1 | Google Trends(HK 區)| ✅ default | ⚠️(429 / JS-only 常見,有 fallback)| `references/sources-public.md` §1 |
| 2 | HKTVmall / 豐澤 / 百老匯 / 實惠 bestseller | ✅ default | ⚠️(SPA,Google site-search primary;冇 8-week rank persistence)| `references/sources-public.md` §2 |
| 3 | 小紅書 / 抖音(HK-tagged 文化 cluster)| ❌ **Opt-in only**(agent fetch return shell pages)| 只有 user 手動提供 evidence 先用 | `references/sources-public.md` §3 |
| 4 | 競品新品 watch(Panasonic / Toshiba / Sharp / Tiger / Zojirushi / Iris Ohyama HK)| ✅ default | ⚠️(Tiger / Iris HK domain DNS dead,要靠 Google site-search + 地區 fallback)| `references/sources-public.md` §4 |
| 5 | HK media editorial agenda(U Lifestyle / Mill MK / FashionOne / Yahoo Style HK)| ✅ default | ✅ | `references/sources-public.md` §5 |
| 6 | LIHKG / Reddit 家電 / 煮食 sentiment(**internal-only output** — 見 Hard rules)| ✅ default | ⚠️(direct search 通常 blocked,Google index 拎少量)| `references/sources-public.md` §6 |
| 7 | Amazon JP / TW bestseller(6-12 月 leading indicator)| ✅ default | ⚠️(JP direct fetch 易 503,用 WebSearch summary 補)| `references/sources-public.md` §7 |
| 8 | GfK / Euromonitor / HKPC industry reports | ❌ optional | ⚠️ 付費,通常 hired mode 借 client subscription | `references/sources-paid.md` |

> **Default quarterly scan = 6 sources(1, 2, 4, 5, 6, 7)。** 小紅書 / 抖音(Source 3)經 eval 確認 agent fetch return shell pages,opt-in only。Source 8 通常付費,pitch 標 ⚠️。
>
> Pitch stage 同 hired mode ✅ / ⚠️ expectation 唔同 — 詳見 `references/cadence-and-triggers.md` 嘅 "Stage-aware ⚠️ rule"。

## Cadence

| Cadence | 做咩 | 時長 | 觸發 |
|---|---|---|---|
| **Quarterly full scan** | 跑齊 default 6 sources(1, 2, 4, 5, 6, 7),Source 3 opt-in,Source 8 if available。寫完整 `yyyy-qx-market-scan.md` | ~2 小時 | 每季開始(eg Q2 = 3 月尾 / 4 月初)|
| **Monthly light refresh** | 只 re-check changed source(通常 Google Trends + 競品新品 + 媒體 listicle)| ~20 分鐘 | 每月寫 monthly focus 之前 |
| **Ad-hoc trigger** | 單一 category 深 scan | ~30 分鐘 | 競品突發新品 / 突發 viral trend / client 問起某 category |

詳細 rules + ad-hoc trigger threshold → `references/cadence-and-triggers.md`。

## Output format — 5-10 bullet "Market context" block

Step 0 嘅 deliverable **唔係**長 report。係**直接 paste 入 focus doc 嘅 Market context 段**。每條 bullet:

- 一句講完
- ✅ / ⚠️ marker(同 Step 1 一致)
- Named source(寫得清係邊個 source 講)
- Named implication(focus doc 作者讀完知點用)

```markdown
## Market context for 2026-Q3
> Source: market-scan/2026-Q3-market-scan.md (full scan, 2026-06-28)

- ✅ Google Trends HK「水冷扇」過去 12 個月升 180%,2026 Q2 確認 seasonal peak signal → 可考慮 Q3 風扇主力中加水冷扇 sub-category
- ✅ Panasonic HK 2026-04 推 SR-CX 新款 IH,直接撞 IRC-20IH 嘅 positioning → IH 電飯煲 buying-guide 要寫對比段
- ✅ HKTVmall 廚電 bestseller 連續 8 週見氣炸鍋,但 SKU 集中喺細容量 → 細容量氣炸鍋(IAF 入門款)有 gap 可推
- ⚠️ 小紅書「香港細廚房家電」cluster 升緊,未 confirm convert HK Google 搜尋 → 標 ⚠️,下季再 validate
- ✅ Amazon JP「冷風扇」過去 6 個月 top 50 bestseller × 3 → 日本領先 6-12 個月,HK 2026-Q4 / 2027-Q1 可能跟風,Q3 鋪 backlog 試水
```

Worked examples + template details → `references/scan-output-template.md`。

## Workflow

### Quarterly full scan(每季)

1. **Read** 上季 market-scan(`Glob business-focus/*-q*-market-scan.md`)— 睇上季 thesis 同 ⚠️ items 而家點。**如冇 prior file**(第一次做 scan)→ frontmatter `prior-scan: none (first scan)`,skip diff step,**唔好 abort**
2. **Read** 當前 `yyyy-qx-focus.md`(如已有)— 知 focus 已揀咗邊個 category,scan 時 weight 多啲
3. 跑 default 6 sources(1, 2, 4, 5, 6, 7)playbook(`references/sources-public.md`),每個 source capture 1-3 條 raw signal。Source 3(小紅書)只有 user 提供 manual evidence 先入
4. 過 `references/cadence-and-triggers.md` 嘅 noise filter — 唔係每個 wobble 都係 signal
5. Distill 去 5-10 bullet(macro implication)
6. Write 去 `business-focus/yyyy-qx-market-scan.md`
7. 出「paste-into-focus-doc」snippet 畀 user,提示佢 hand over 去 `imarflex-business-focus` skill

### Monthly light refresh(每月)

1. **Read** 當季 quarter market-scan
2. 只 re-check 3 個易變 source:
   - Google Trends — 過去 30 日有冇 inflection
   - 競品新品 — 過去 30 日有冇 new launch
   - HK 媒體 editorial — 過去 30 日有冇 listicle update
3. 如有變化 → update 季度 market-scan 嘅 bullet(改 marker 或加 bullet)
4. 如無重大變化 → 喺 monthly focus 嘅 Market context 段寫「沿用 [[yyyy-qx-market-scan]],無重大 update」

### Ad-hoc trigger scan(突發)

對單一 category 跑 sources 1, 2, 4, 5(Google Trends + retailer bestseller + 競品 + 媒體),~30 分鐘。輸出 1-3 條 bullet append 入當季 market-scan,加 timestamp。

詳細 trigger rules → `references/cadence-and-triggers.md`。

## Anti-noise rules

> [!warning] Macro signal worth recording — 唔係每個 wobble 都係 signal
> - Google Trends:單月升幅 < 30% 唔算 signal — 要係 vs 12 個月 baseline 至少 +50% 或新 peak / trough
> - 零售 bestseller:單週 rank 跳唔算 — 要連續 ≥ 8 週 sustained 或 rank top 10 維持先算
> - 小紅書 / 抖音:單條 viral 唔算 — 要係 cluster(≥ 5 條 organic post 同主題,跨 ≥ 2 個 KOL)
> - 競品新品:要 SKU 已上 brand HK 官網或本地 retailer,唔係 global launch 新聞
> - HK 媒體:單篇文唔算 — 要 ≥ 2 間 outlet 同月覆蓋,或大 outlet listicle 進入前 5 位置
> - LIHKG / Reddit:只睇 aggregate sentiment trend,**永遠唔做 quote source**(法律 / 私隱 / ToS),findings 只入 internal scan file,**唔下傳 client-facing 文檔**(見 Hard rules §5)
> - Amazon JP / TW:單款 hit 唔算 — 要 top 50 bestseller 入面同 category 出現 ≥ 3 款,持續 ≥ 4 週

詳細 noise filter → `references/cadence-and-triggers.md`。

## Naming convention

| Type | Pattern | Example |
|---|---|---|
| Quarter scan | `yyyy-qx-market-scan.md` | `2026-q2-market-scan.md` |
| Monthly refresh | `yyyy-mm-market-scan.md`(只有當月有 update 先寫) | `2026-05-market-scan.md` |
| Ad-hoc | append 入 quarter scan,加 timestamp section | — |

兩種檔放喺 `Imarflex/online-marketing/business-focus/` 同 focus doc 並排。

## Evidence discipline — 必出 ✅ + ⚠️ 兩種

每次 scan 嘅 output 必須**同時出現 ✅ + ⚠️ bullet**:

- 全部 ✅ = 你 overstate evidence。Macro scan 一定有未 confirm 嘅 cross-region / cross-platform 假設。
- 全部 ⚠️ = scan 失敗或 noise filter 太嚴。要 re-check sources。

實際比例參考:**6-7 條 ✅ + 2-3 條 ⚠️** = healthy quarterly scan。

## How this feeds `imarflex-business-focus`

呢個 skill 嘅 5-10 bullet 直接喂入 `business-focus/yyyy-qx-focus.md` 入面新加嘅 **"Market context" section**(放喺 "證據程度 banner" 同 "季節背景" 之間)。

```
business-focus doc 結構:
├── 證據程度 banner
├── 季節背景
├── ★ Market context(由 imarflex-market-scan 提供)  ← 新加
├── 今季要推邊個 category?
├── 有冇新品 / 清貨 / 高 margin SKU?
├── ...
```

> [!info]
> `imarflex-business-focus` skill 嘅 quarterly / monthly template 需要喺日後 update 加入 Market context section。本 skill 嘅 `references/scan-output-template.md` 已預備好 paste-in 格式。

## Operations — common tasks

### 開新 quarterly market scan

1. Read 上季 market-scan(如有);**冇 prior file 就 frontmatter `prior-scan: none (first scan)`,繼續做**
2. Read 本季已有 `yyyy-qx-focus.md`(如有)— 知 focus 已揀邊個 category
3. 跑 default 6 sources(1, 2, 4, 5, 6, 7)playbook(`references/sources-public.md`)
4. Distill 去 5-10 bullet,enforce stage-aware ✅ / ⚠️ mix(pitch stage ⚠️ heavy 正常)
5. Write `business-focus/yyyy-qx-market-scan.md`(frontmatter 必 include `sources-used:` block + 每 source 嘅 ✅/⚠️/❌ + note)
6. 提示 user paste 入 focus doc 嘅 "Market context" section

### 跑 monthly light refresh

1. Read 當季 market-scan
2. 只 re-check 3 個易變 source(Trends / 競品 / 媒體)
3. 如有 update → Edit 季度 market-scan 加 timestamp bullet
4. 寫 short monthly note 入 `yyyy-mm-market-scan.md` 或直接 inline 入 monthly focus

### Ad-hoc trigger scan

1. User 講出 category(eg「忽然多人問水冷扇」)
2. 跑 sources 1, 2, 4, 5
3. 輸出 1-3 bullet,append 落當季 market-scan + timestamp section

## What this skill does NOT do

- ❌ 唔做 keyword-level / topic-level signal — 用 `imarflex-signal-gather`
- ❌ 唔寫 business focus — 用 `imarflex-business-focus` skill;本 skill 只係餵 input
- ❌ 唔寫 blog / PDP / caption — 用 `imarflex-copywriter` agent
- ❌ 唔做 SEO keyword volume / difficulty — 嗰個係 seo-keyword-research folder 嘅事
- ❌ 唔 quote LIHKG / Reddit 個別 post / named user — 只睇 aggregate sentiment trend(見 Hard rules §5);**LIHKG / Reddit findings 唔可以下傳 client-facing 文檔**
- ❌ 唔可以無 source 咁標 ✅ — 任何 ✅ 都要附 source URL / date / data point

## Reference files

- `references/sources-public.md` — sources playbook(default 6 + 小紅書 opt-in)(URL、search pattern、inflection 讀法、capture mapping、stale-URL fallback、agent-browser working access pattern for Google Trends)
- `references/seed-list-hk.md` — Google Trends HK 24-seed list(9 category + 5 brand + 5 comparison + 5 long-tail problem)+ run protocol。 跑 Source 1 嗰陣跟呢 list,唔好 ad-hoc 寫 keyword
- `references/sources-paid.md` — source 8(industry reports)— 點時用、用乜、client 未 subscribe 時嘅 request line
- `references/scan-output-template.md` — 5-10 bullet output format + 4 個 worked example(風扇 / 氣炸鍋 / IH 電飯煲 / 抽濕機)
- `references/cadence-and-triggers.md` — quarterly / monthly / ad-hoc 三種 cadence 嘅 rule + noise filter threshold + rate-limit operational rules

## Companion agent

`imarflex-market-scout` agent — 真正同 user 一齊跑 scan 嘅執行者(WebFetch + WebSearch 跑 default 6 source,寫埋 output doc)。呢個 skill 係 reference manual;agent 係執行。
