# Imarflex Business Focus — Operating Manual

呢個 skill 負責 [[Imarflex/online-marketing/business-focus]] 入面嘅 monthly / quarterly focus docs。佢哋係 [[Imarflex/online-marketing/topic-research-workflow]] **Step 1「先定 business focus」嘅輸出位**,亦係 Step 4 topic scoring 對 "Business relevance" 評分嘅 rubric。

Upstream input 嚟自 **Step 0(Market intelligence scan)**,由 sibling skill `imarflex-research/market-scan` + `imarflex-market-scout` agent 負責 — output 係 5-10 條 macro market bullet,直接 paste 入 focus doc 嘅 `## Market context` section。冇 Step 0 input,Step 1 嘅 category 選擇就會變返「client 想 sell 咩 + 季節」嘅 closed loop。

> [!important]
> Business focus = 向前定方向(research / scoring 之前)。Reports = 向後檢討(performance review,事後)。兩者唔好混。

## Hard rules

1. **LIHKG / Reddit / 論壇 sentiment 永遠唔得進入 focus doc 嘅 client-facing section。** 當 paste market scan output 入 `## Market context` 嗰陣,**任何**由 LIHKG / Reddit / HK 論壇 source 嘅 bullet 都要:
   - 標 `(internal-only)` prefix
   - 唔可以 quote / paraphrase 名人 / 用戶 named handle
   - 只可以做 aggregate sentiment 描述(eg「過去 90 日見集中提及 X 痛點」),唔好寫具體 thread 內容
   - 唔可以propagate 落 brief / blog / PDP / social / pitch deck 任何下游 deliverable
   - 只有 brand-self mention(Imarflex / 伊瑪牌)先可以驅動 actionable bullet;競品 brand sentiment 留做 internal observation
2. **冇 evidence marker 嘅 bullet 一律唔可以寫。** 寧願 ⚠️ 都唔好 unmarked。
3. **冇 market scan output 唔可以寫 focus doc 嘅 Market context section。** 詳見 `Workflow` 入面 "如未有 prior scan" 嘅處理。
4. **Pitch stage 唔等於空白 ⚠️**:可以 ⚠️ heavy,但要喺 pre-engagement checklist 對得返 client day-1 ask。

呢 4 條 rule 喺 SKILL.md + agent 都有 mirror。Agent 違反 → 即時 stop + report。

## Two-level model — quarter vs monthly

| Level | 角色 | 內容重點 | 換頻率 |
|---|---|---|---|
| **Quarter focus** (`yyyy-qx-focus.md`) | Thesis | 邊 3 個月嘅 bets、季節 arc、evergreen pillars、DTC moats(2 年保養 / parts-finder / WhatsApp) | 每季 |
| **Monthly focus** (`yyyy-mm-focus.md`) | Bet placement | 今月實際 promo / SKU、今月 ship 緊邊啲 content、同上月 diff | 每月 |

**Monthly 唔可以憑空寫**——必須對返當季 quarter focus,聲明今月 in scope 同 out of scope。

## Evidence markers(每個 claim 要標)

每一段 business-focus 內容都要標其中一個 marker。Skill 唔接受 unmarked claims。

| Marker | 意思 | 例子 |
|---|---|---|
| ✅ | 有實據 | 自家網店 promo snapshot、已 publish 內容、產品線、季節事實 |
| ⚠️ | 未有實據,等資料 confirm | 未拎到嘅 GSC query、site search、WhatsApp log、實際 margin / 庫存 |
| 🔒 | Agency-decided / foundation(用得少,通常喺 DTC moat 段) | 2 年保養登記、parts-finder |
| 💡 | 我哋 propose,等 client business choice | 風扇旺季先食流量;或某 SKU 做 hero |
| 🟡 | 兩個方案之間揀緊 | IRC-20IH vs IRC-22KS 邊個做 hero |
| ❌ | Client / agency 決定唔做 | 暫時唔推某 category |

> [!warning]
> Pitch stage(未簽)= 大部分 customer / search signal 都係 ⚠️。 唔好用 ✅ 偽裝有數據——標 ⚠️ 反而證明流程嚴謹。

## Naming convention

| Type | Pattern | Example |
|---|---|---|
| Quarter focus | `yyyy-qx-focus.md` | `2026-q2-focus.md` |
| Month focus | `yyyy-mm-focus.md` | `2026-05-focus.md` |

兩種檔都放喺 `Imarflex/online-marketing/business-focus/`。

## Mandatory sections

### Quarterly focus

讀 `references/quarterly-template.md` 做 starter。基本 sections:

1. 證據程度 banner(✅ / ⚠️ 列表)
2. 季節背景
3. **Market context(Step 0 output)** — 5-10 條 macro market bullet,marker + source + implication,由 `imarflex-market-scout` agent paste 入
4. 今季要推邊個 category?(每個 bullet 都標 marker,reasoning 引用 Market context bullet)
5. 有冇新品 / 清貨 / 高 margin SKU?(**hero 候選必須附 6-dim scoring per `references/hero-sku-rubric.md`;只有 ≥ 15/18 + 無 DQ 嘅 SKU 可入 hero subsection**)
6. 客戶最近問得最多係咩?
7. 有冇季節性需求?
8. DTC moat / 差異化點(2 年保養 / parts-finder / WhatsApp)
9. 內容最後要導去邊?
10. 一句總結方向

### Monthly focus

讀 `references/monthly-template.md` 做 starter。**比 quarterly 多三類 sections**(Market context refresh + Diff from quarter + Out of scope),呢三項唔可以省:

1. 證據程度 banner
2. 季節背景
3. **Market context(refresh from Step 0)** — 只補季初 scan 之後嘅 delta;若無新變動,寫「沿用 [[yyyy-qx-focus]] market context」
4. 今個月要推邊個 category?
5. 有冇新品 / 清貨 / 高 margin SKU?(**hero 候選必須附 6-dim scoring per `references/hero-sku-rubric.md`;只有 ≥ 15/18 + 無 DQ 嘅 SKU 可入 hero subsection**)
6. 客戶最近問得最多係咩?
7. 有冇季節性需求?
8. 內容最後要導去邊?
9. **Diff from quarter focus**(mandatory) — 列今月 IN scope、OUT scope、點解
10. **Out of scope this month**(mandatory) — 列今月**唔做**嘅嘢 + 點解(eg「抽濕機:延後到 6 月雨季高峰先做」)
11. 本月 content 對齊(用已有 sample / 排住寫嘅 sample)
12. 一句總結方向

> [!important]
> Diff from quarter + Out of scope 唔係 nice-to-have。冇咗,下個月 report 就冇得 validate 今月決定。Skill 同 agent 都要 enforce。
>
> Real example:當前 2026-Q2 focus 列風扇 / 抽濕機 / 氣炸鍋 / IH(4 categories)+ 法國合作 mosquito killer;2026-05 focus 靜雞雞 drop 咗抽濕機同滅蚊燈。冇 "Diff from quarter" 嗰 section,睇唔出係刻意延後定漏咗。呢個正係 section 出嚟救嘅 case。

## Workflow

### 開新 quarter focus

1. **Read** 上一季 focus(`Glob business-focus/*-q*-focus.md`,讀最新嗰個)睇上季 thesis、上季 ⚠️ 有冇 upgrade 到 ✅
2. **Read** 上一季最後一個月嘅 monthly focus,睇執行收咩尾、有冇延後落 next quarter 嘅 item
3. **Read** 今季 market-scan output(`business-focus/yyyy-qx-market-scan.md`)。如未有,prompt user 先用 `imarflex-market-scout` agent 行一次 quarterly full scan,**唔好跳過直接寫 focus**
4. **Read** `business-focus/_readme.md` 攞最新 template / naming
5. Copy `references/quarterly-template.md` 做底
6. 填內容:`## Market context` section paste 自 market-scan output;每 bullet 標 marker;category reasoning 引用返 Market context
7. 過 `references/pre-engagement-checklist.md`,⚠️ items 要寫低需要 client 提供咩
8. 出 draft 去 `business-focus/yyyy-qx-focus.md`

### 開新 monthly focus

1. **Read** 當季 quarter focus(包括其 `## Market context` section)
2. **Read** 上個月 monthly focus(睇上月 out of scope 有冇 carry over,上月有冇 ⚠️ 已 upgrade)
3. **Read** 今月 market-scan refresh(`business-focus/yyyy-mm-market-scan.md`,如有)。如冇,prompt user 行 `imarflex-market-scout` monthly refresh;如確認本月無 delta,直接喺 monthly focus 寫「沿用 quarter market context」
4. **Read** `business-focus/_readme.md`
5. Copy `references/monthly-template.md` 做底
6. 填內容,**Market context refresh** + **Diff from quarter** + **Out of scope this month** 三 section 必填
7. ⚠️ items 入 pre-engagement checklist
8. 出 draft 去 `business-focus/yyyy-mm-focus.md`

### Updating an existing focus

- `status: active` 期內可以加 bullet / 改 marker(eg ⚠️ upgrade 去 ✅ when 拎到數據)
- Period 結束 → `status: archived`,**唔好删** ⚠️ items,留低做 audit
- 後續 month 想 backfill 一個被 drop 嘅 category(eg 抽濕機 6 月先做),要喺 next monthly 嘅 "Diff from quarter" 寫返「上月延後,本月補做」

## How this feeds topic-research-workflow Step 4

[[Imarflex/online-marketing/topic-research-workflow]] Step 4 嘅 "Business relevance" 評 1-5 分,用呢度做 rubric:

| Topic 同 focus 嘅關係 | Business relevance score |
|---|---|
| 完全 off-topic(eg 寫吸塵機,而 focus 係風扇 / 抽濕機 / IH) | 1 |
| 可 link 到 category 但唔係今期主力 | 2-3 |
| 啱當季 category,但唔係 priority SKU | 3-4 |
| 直接推 priority SKU(eg IRC-20IH)或 DTC moat(保養 / parts-finder) | 5 |

寫 brief 之前要 sanity-check 個 topic 同當月 focus 對唔對。如果 focus 已 archive,唔可以攞嚟用——要對返當期。

## Pitch-stage vs hired-mode

| Aspect | Pitch stage(未簽) | Hired mode(已簽) |
|---|---|---|
| Customer signal | ⚠️ 全部標 ⚠️,用 workflow 通用 FAQ + 品類推斷 | ✅ 用 GSC / site search / WhatsApp 真數據 |
| Promo / SKU 排序 | ⚠️ 推斷 from 自家網店 snapshot | ✅ Client 每月提供 promo list + margin |
| Output | 同樣係 complete 嘅 focus doc,但 ⚠️ 多;附 pre-engagement checklist | ⚠️ 應該大幅減少;checklist 收尾 |
| 用途 | Demo 流程嚴謹度、demo 點樣用真數據會更準 | 真正 drive research + content |

**Pitch stage 唔等於空白**——係**有結構咁標明乜嘢未有數據**。呢個正係 skill 要 enforce 嘅嘢。

## Operations — common tasks

### 寫 new quarterly focus

1. Read `_readme.md` + 上季 focus(`Glob business-focus/*-q*-focus.md`)
2. Copy `references/quarterly-template.md`
3. 每 section 標 marker
4. Run pre-engagement checklist:列出所有 ⚠️ items,annotate「需要 client 提供 X」
5. Write 去 `business-focus/yyyy-qx-focus.md`
6. 喺 `_index.md` 同 [[topic-research-workflow]] 唔需要改連結(naming convention 已預留)

### 寫 new monthly focus

同上,但用 `references/monthly-template.md`,**必填 Diff from quarter + Out of scope**。

### 翻新 ⚠️ items(拎到新數據之後)

1. Read 對應 focus doc
2. 將 ⚠️ marker 改 ✅
3. 喺 bullet 後面加 source / date(eg「✅ Source: GSC 2026-05 export」)
4. 唔需要重寫,只係 upgrade evidence

### 跨期延後決定 audit

1. Read 上月 monthly focus 嘅 "Out of scope this month"
2. Read 本月 monthly focus 嘅 "Diff from quarter"
3. 對比:上月延後嘅 item 有冇喺本月補做?如冇,問用戶決定 carry 落 next month 定 drop。

## Reference files

- `references/quarterly-template.md` — quarterly 模板 + 證據 markers + Market context section
- `references/monthly-template.md` — monthly 模板 + Market context refresh + Diff from quarter + Out of scope
- `references/pre-engagement-checklist.md` — pitch stage ⚠️ items 對應 day-1 要 client 開咩 access / data
- `references/hero-sku-rubric.md` — 6-dim hero SKU scoring rubric + worked examples(IRC-20IH 16/18,降糖 IH DQ)

## Sibling skills (workflow neighbours)

- **`imarflex-research/market-scan`** (Step 0,upstream) — macro market intelligence playbook。Output(5-10 bullet)直接 feed 入 focus doc `## Market context` section。Agent: `imarflex-market-scout`。
- **`imarflex-research/signal-gather`** (Step 2,downstream) — tactical topic-level signal gathering。Consume focus doc 嘅 thesis 去 weight 邊啲 signal 重要。Agent: `imarflex-signal-scout`。

唔好將 Step 0 同 Step 2 撈埋——cadence 唔同(Step 0 = quarterly,Step 2 = weekly),output 落點唔同(Step 0 → focus doc,Step 2 → research-inbox),答嘅問題層級唔同(押邊個 category vs 寫咩 blog)。

## What this skill does NOT do

- 唔負責寫 blog / PDP / social caption — 用 `imarflex-copywriter` agent
- 唔負責 keyword research / SERP analysis — 用 `seo-research/` folder
- 唔負責 monthly performance review — 用 `reports/` folder
- 唔可以無 source 咁標 ✅ — 任何 ✅ 都要附 source link / date / file ref

## Companion agent

For interactive drafting walkthrough(問 user 一段一段答),用 `imarflex-business-focus-planner` agent。Agent 會 enforce 證據 markers + Diff from quarter + Out of scope 三個關鍵 rule,亦會幫手 maintain pre-engagement checklist。
