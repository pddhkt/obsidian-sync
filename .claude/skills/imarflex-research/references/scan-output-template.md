---
type: skill-reference
skill: imarflex-research/market-scan
area: output-template
tags:
  - online-marketing
  - market-intelligence
---

# Scan output template + worked examples

呢個 file 講最重要嘅嘢:**Step 0 最終出嚟畀 focus doc 用嘅嗰 5-10 條 bullet 點寫**。

## Output 檔案 structure

```markdown
---
type: market-scan
period: yyyy-Qx                 # or yyyy-mm for monthly refresh
status: active                  # active | archived
scan-date: yyyy-mm-dd
prior-scan: yyyy-qx | none (first scan)   # 第一次做就寫 "none (first scan)"
sources-used:                   # MANDATORY — 每個 source 加 status + brief note
  - google-trends         # ⚠️ 429 / JS-only, % data unavailable
  - hktvmall-bestseller   # ⚠️ SPA, used Google site search; no 8-week rank
  - fortress-bestseller   # ❌ 403 on direct, used site search only
  - competitor-launch     # ⚠️ Panasonic / Toshiba via site search; Tiger / Iris HK DNS dead, used regional fallback
  - hk-media              # ✅ multiple HK editorial confirmations
  - lihkg                 # ⚠️ direct search blocked, one brand-reputation signal via Google
  - amazon-jp             # ⚠️ direct 503, used WebSearch summary
  - amazon-tw             # ❌ DNS / blocked
  # xiaohongshu        # ❌ opt-in only — agent fetch returns shell pages, requires user manual evidence
tags:
  - online-marketing
  - market-intelligence
---

# yyyy Qx Market Scan

> [!info] Scan 方法
> Sources 跑咗:{列上面 sources-used list}。Noise filter 已 enforce(見 `cadence-and-triggers.md`)。Output 5-10 條 distilled bullet,每條一句 + marker + source + implication。
>
> 呢個 scan 嘅 output **直接 paste 入 [[yyyy-qx-focus.md]] 嘅 "Market context" 段**。下游 skill = `imarflex-research/business-focus`。

## Market context for yyyy-Qx

{5-10 條 bullet — 每條:marker + source + implication}

## Raw notes(scan 過程入面 capture 嘅 background,唔 paste 落 focus doc)

{逐 source 嘅 raw observation,供之後 audit / 回溯}

### Source 1 — Google Trends
...

### Source 2 — Retailer bestseller
...

(餘下 sources)
```

> [!important] `sources-used:` frontmatter 係 mandatory
> 每次 scan 寫 output 必須出齊 `sources-used:` block。每個 entry = source name + ✅ / ⚠️ / ❌ marker + brief note 解釋 fetch quality。咁讀者一眼睇得出邊條 bullet 後面係實 fetch、邊條係 proxy / weak evidence。
>
> 同 SKILL.md / `sources-public.md` 對齊:default scan = 6 sources(1, 2, 4, 5, 6, 7);小紅書 / 抖音 opt-in only(要 user 提供 manual evidence 先列入 `sources-used:`)。
>
> Frontmatter status marker 同個別 bullet marker **唔一定一一對應** — 一條 ✅ bullet 可以由 ⚠️ source pool 入面攞到(因為跨 source confirm),但 source 全 ❌ 嘅情況下嗰類 signal 唔可以出 ✅ bullet。

> [!important]
> Output 檔頭嘅 5-10 bullet **獨立 paste-able**。下半截 "Raw notes" 係 audit trail,唔係 focus doc input。

## 每條 bullet 嘅 4-part shape

```
{marker} {source identifier} {observation with timeframe and number} → {implication for focus doc}
```

| Part | 規則 |
|---|---|
| **Marker** | ✅(雙 source 以上 confirm)/ ⚠️(單 source 或 leading indicator)。**唔可以全部 ✅** — 至少 1 條 ⚠️。 |
| **Source identifier** | 「Google Trends HK」/「HKTVmall bestseller」/「Panasonic HK」/「Amazon JP」— 寫明邊個 source,唔好寫「市場數據」呢類含糊字 |
| **Observation** | 必要有 timeframe(過去 12 個月 / 過去 8 週)+ number(%、count、rank)。冇 number 嘅唔係 macro signal |
| **Implication** | 用「→」分隔,寫一句 actionable hint(eg「Q3 風扇主力中加水冷扇 sub-category」)。**唔係結論**,係畀 focus doc 作者用嘅 input |

## Anti-pattern bullet(唔好咁寫)

❌ 「✅ 風扇市場升緊」 — 冇 source、冇 timeframe、冇 number、冇 implication
❌ 「Google Trends 顯示氣炸鍋好熱」 — 冇 marker、冇 number、implication 模糊
❌ 「⚠️ 抽濕機可能會跌」 — speculation,冇 evidence。要 ⚠️ 都要寫低 source(eg「⚠️ 抽濕機 — Google Trends 過去 24 月跌 35%,但係雨季前可能反彈,先 ⚠️ 觀察」)
❌ 全部 ✅ 或全部 ⚠️ — 違反 evidence discipline

## Worked examples — shape demos only

> [!warning] ILLUSTRATIVE FORMATS ONLY — these are placeholders to show shape, NOT confirmed Imarflex findings
> 以下 4 個 worked example 入面嘅 category / brand / SKU / 數字**全部係 fictional placeholder**,專門 demo bullet 結構,**唔係 real scan finding**。Eval(2026-05)確認:之前版本嘅例子(「水冷扇 +180%」/「Panasonic SR-CX 撞 IRC-20IH」)會誤導 agent 當成真實 baseline copy。每次 scan **必須產出 fresh evidence**,唔好直接 reuse 呢度啲數字 / SKU 名。

### Worked example 1 — Category X(seasonal 旺季)

```markdown
- ✅ Google Trends HK「Category X」過去 12 個月 +Y%,Q{n} 出現新 seasonal peak(過去 5 年首次 break baseline)→ 下季主力中加 Category X sub-category,鋪 buying-guide

- ✅ Amazon JP「Category X」過去 6 個月 top 50 持續見 N 款不同 brand → 日本領先 HK 通常 6-12 個月,leading indicator confirm 上條 Trends signal

- ⚠️ HK-tagged「sub-cluster Z」近 90 日 N 條 organic post 跨 K KOL,主題集中喺 sub-spec A + sub-spec B → leading indicator,⚠️ 未 confirm convert HK Google 搜尋
```

(這只係 shape demo — 你嘅實際 scan 應該有自己嘅 source citation)

### Worked example 2 — Category Y(夏天 evergreen + 容量 gap)

```markdown
- ✅ {Retailer} {category} 連續 N 週見 Category Y 占 top 10 一半,但 SKU 集中喺 ≥ ZL 大容量 → 細容量(A-B L)有 gap,啱 SKU-A 入門款 push 細家庭 angle

- ✅ HK 媒體 {timeframe} 期間 N 間 outlet 出「Category Y 邊隻好」listicle,但 Imarflex 嘅 SKU-A 全部缺席 → buying-guide blog + 媒體 PR 投稿要爭呢個位

- ⚠️ Amazon TW「sub-cluster Y」top 50 見 M 款 SKU 持續 K 週,HK retailer 而家全部 mainstream → 標 ⚠️,下季 cross-check
```

(這只係 shape demo — 你嘅實際 scan 應該有自己嘅 source citation)

### Worked example 3 — Hero SKU 競爭加劇(直接 positioning clash)

```markdown
- ✅ Brand Z HK yyyy-mm 推 Model M 新款(spec A + spec B),直接撞 SKU-A 嘅 positioning → buying-guide 必加對比 H2,PDP 加 differentiator

- ✅ Google Trends HK「{health/lifestyle keyword}」過去 24 個月 +X%,plateau 但仍喺 high baseline → 健康角度仍有效,SKU-A 嘅 USP 維持 evergreen content cluster

- ⚠️ LIHKG 過去 90 日「{category}推介」相關 thread N 條,brand mention X% 係 Brand A / Brand B / Brand C,Imarflex 缺席 → brand mindshare 弱,需要 technical-depth buying guide 切入,⚠️ 唔可以直接 quote thread

- ⚠️ Amazon JP {category} top 50 過去 6 個月新功能 cluster = {feature F},HK 未跟 → leading indicator,{future quarter} 可能要 update PDP feature 對齊
```

(這只係 shape demo — 你嘅實際 scan 應該有自己嘅 source citation)

### Worked example 4 — Seasonal 穩定品類(觀察萎縮 risk)

```markdown
- ✅ Google Trends HK「Category W」過去 5 年每年 Q{n} 有 stable peak,當年 baseline 同上年持平 → 季節 push 仍然啱 timing,但唔係 structural 升勢,當穩定品類

- ⚠️ {Retailer} Category W top 10 過去 8 週 X% 係 Brand A / Brand B,Imarflex 未上榜 → 直接打 price 唔贏,要 reposition(細空間 / 經濟款 / 靜音)

- ✅ LIHKG 過去 60 日見 N 條 thread 集中講「{pain point}」痛點 → PDP 要強調 {dimension D} + {dimension E} spec,呢個係 free positioning

- ⚠️ Paid report 未借到 — 無法 confirm Category W HK total market 係收縮定增長,標 ⚠️,等 client 簽約後拎報告
```

(這只係 shape demo — 你嘅實際 scan 應該有自己嘅 source citation)

## Distillation 流程 — 由 raw signal pool → 5-10 bullet

```
Step 1. Default 6 sources 跑完 → 通常有 12-20 條 raw observation
Step 2. Cluster by category(風扇 / 氣炸鍋 / IH / 抽濕機 ...)
Step 3. 每個 category 入面挑 1-3 條最有 implication 嘅 — 唔好同 category 出 5 條,稀釋
Step 4. 確保最終 list:
        - 跨 ≥ 3 個 source type(唔好全部 Google Trends)
        - 至少 1 條 ⚠️(evidence discipline)
        - 至少 1 條 leading indicator(Amazon JP/TW 或 小紅書)
        - 至少 1 條對應已 confirmed 嘅 Imarflex hero SKU(eg IRC-20IH)
Step 5. Output 排序 — 排「最影響 focus 決定」嘅在前
```

## Paste-into-focus-doc snippet

寫完 market-scan doc 之後,output 呢個 snippet 畀 user(可直接 paste 入 `yyyy-qx-focus.md` 嘅 "Market context" section):

```markdown
## Market context for {period}

> Source: [[{yyyy-qx-market-scan}]](full scan {scan-date},sources used: {list})

{paste 5-10 條 bullet}
```

Snippet 落 focus doc 嘅位置:**喺「證據程度 banner」之後、「季節背景」之前**。咁 focus 作者讀完證據程度就知 macro context,再讀季節背景同自家網店 promo。

> [!important]
> `imarflex-research/business-focus` skill 嘅 quarterly-template.md / monthly-template.md 目前**未有** "Market context" section。本 skill 落地時要請 user 順便 update 嗰兩個 template 加 section(或本 skill 嘅 agent 喺 hand-over 時主動提)。
