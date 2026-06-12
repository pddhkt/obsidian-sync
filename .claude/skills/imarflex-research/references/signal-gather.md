# Imarflex Signal Gather

呢個 skill 係 [[topic-research-workflow]] Step 2 (Gather signals) + Step 3 (Raw topic capture) 嘅執行手冊。**唔做** keyword research、唔做 scoring、唔寫 brief — 嗰啲係下游 (seo-keyword-research、Step 4 scoring、content-briefs) 嘅工作。Signal-gather 只係**將 signal 變成 raw note 入 research-inbox**。

## When to use

- 每週一(Monday)做 signal sweep — 對應 [[../online-marketing/_index|online-marketing/_index]] 嘅 weekly rhythm
- 開新 category / SKU push 之前要 backlog signal
- 客戶有新 promo / 季節變化 → re-sweep 相關 source
- Pitch demo 想 show 「我哋每週點搵 topic」嘅 process

## Pitch stage vs post-engagement

**呢個 project 而家係 pitch stage** — 我哋未 hire,client 嘅 GSC / WhatsApp / site search / PostHog 都未開。Skill 必須兩種模式都做到。

| 模式 | 可用 source | 輸出 |
|---|---|---|
| **Pitch (而家)** | Competitor SERP、Retailer/marketplace、Product catalog、Seasonal calendar | Raw note × 4 source + 一份「day-1 要 request 嘅 data list」 |
| **Post-engagement (簽咗之後)** | 上面 4 個 + Customer service/WhatsApp + GSC + Site search/Meilisearch + PostHog | Raw note × 8 source |

| Source | Pitch 可用? | Reference |
|---|---|---|
| Competitor SERP | ✅ | `references/sources-pitch-mode.md` §1 |
| Retailer / marketplace (豐澤 / 百老匯 / 實惠 / HKTVmall) | ✅ | `references/sources-pitch-mode.md` §2 |
| Product catalog (Imarflex shopline) | ✅ | `references/sources-pitch-mode.md` §3 |
| Seasonal calendar | ✅ | `references/sources-pitch-mode.md` §4 |
| Customer service / WhatsApp | 🔒 client data | `references/sources-client-data.md` §1 |
| Google Search Console | 🔒 client data | `references/sources-client-data.md` §2 |
| Site search / Meilisearch | 🔒 client data | `references/sources-client-data.md` §3 |
| PostHog / analytics | 🔒 client data | `references/sources-client-data.md` §4 |

## Reading order before running a sweep

1. **Current business focus** — `Imarflex/online-marketing/business-focus/yyyy-mm-focus.md`(本月)+ `yyyy-qx-focus.md`(本季)。Signal 一律按 focus 過濾 — 唔在 focus 入面嘅 source signal 入 backlog,唔入今週 sweep。
2. **Last week's research-inbox** — `Imarflex/online-marketing/research-inbox/` glob 過去 7 日嘅 note,避免重覆 capture。
3. **`references/sources-pitch-mode.md`** — 4 個 pitch-available source 嘅 playbook、URL 清單、SERP 讀法。
4. **`references/sources-client-data.md`** — 4 個 gated source 嘅 access 要求 + 上線後做咩。
5. **`references/capture-template.md`** — Step 3 嘅 raw topic capture 格式 + 2-3 個 Imarflex worked example。

## Sweep workflow

### Pitch-stage sweep (而家用呢個)

```
1. 讀 business-focus → 列出今月 priority category / SKU / season
2. 對每個 priority category,run:
   a. Competitor SERP playbook   → 1-3 raw captures
   b. Retailer / marketplace     → 1-3 raw captures
   c. Product catalog walk       → 1-2 raw captures (用 Imarflex 自己 shopline page)
   d. Seasonal calendar check    → 0-2 raw captures (6-8 週 lead time)
3. 每條 signal 寫做一個 raw note,放入 research-inbox/YYYY-MM/yyyy-mm-dd-source-short.md(month subfolder,冇就開)
4. End: 列出「Day-1 要 request 嘅 client data」清單(由 sources-client-data.md 抽)
```

目標一週 sweep:**5-10 raw note**(同 `online-marketing/_index.md` cadence 對齊)。

### Post-engagement sweep (簽咗之後)

```
1-2. 同上
3. 加埋:
   e. WhatsApp / CS log     → 過去 7 日 question / complaint
   f. GSC quick-win export  → impressions > 100, position 8-20, CTR < 5% 嘅 query
   g. Site search log       → top 50 zero-result + top 50 high-volume search
   h. PostHog funnel        → blog→PDP path, search→cart path
4. 仍然 → research-inbox/(naming 用 source short name)
```

## Capture format

每個 raw signal 寫做一個 markdown file 入 `research-inbox/YYYY-MM/`(month subfolder),filename:

```
yyyy-mm-dd-{source-short}-{topic-slug}.md
```

例:

```
2026-05-26-serp-air-fryer-shrimp-toast.md
2026-05-26-fortress-fan-category-wording.md
2026-05-26-shopline-irc20ih-pdp-language.md
2026-05-26-season-typhoon-prep-q3.md
```

`source-short` 用:`serp`、`fortress`、`broadway`、`pricerite`、`hktvmall`、`shopline`、`season`、`whatsapp`、`gsc`、`sitesearch`、`posthog`。

### Frontmatter + body

兩種格式選一 — **預設用 frontmatter 版**(同 `research-inbox/_readme.md` 一致,而且方便日後 Bases 過濾 / Step 4 scoring 拎)。Bullet-only 版適合手 jot 跟住 paste 入 inbox。

```markdown
---
type: research-note
status: raw
source: serp                  # serp | fortress | broadway | pricerite | hktvmall | shopline | season | whatsapp | gsc | sitesearch | posthog
topic: 氣炸鍋蝦多士
date: 2026-05-26
category: 氣炸鍋
focus-month: 2026-05
tags:
  - online-marketing
  - research
---

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

`category`、`focus-month` 兩個 field 係用嚟以後 filter「呢條 signal 對應邊個 focus 月」+「邊個 SKU cluster」。

詳細欄位定義 + worked example → `references/capture-template.md`。

## How this skill fits the bigger workflow

```
business-focus  ─►  imarflex-research/signal-gather  ─►  research-inbox  ─►  Step 4 scoring  ─►  seo-keyword-research  ─►  content-briefs  ─►  imarflex-copywriter (產出)
                    (呢個 skill)               (我哋嘅 output)
```

- **Upstream:** `business-focus/yyyy-mm-focus.md` 話畀我哋知今月推咩 — signal sweep 只 capture 同 focus 有關嘅 signal。
- **Downstream — scoring:** Step 4(`topic-research-workflow.md` §4)會用 1-5 分 score 我哋 capture 嘅 signal。
- **Downstream — SEO:** 高分 signal 入 [[../online-marketing/seo-keyword-research|seo-keyword-research]] 做 keyword + SERP review,**呢個 skill 唔做 keyword research**,只係餵 input。
- **Downstream — copy:** 最終高 priority topic 變 brief,由 `imarflex-copywriter` agent 寫稿。

## What this skill does NOT do

- ❌ 唔做 keyword volume / difficulty 評估 → 入 `seo-keyword-research`
- ❌ 唔做 topic scoring(Step 4 1-5 分)→ 由 user 或下一個 skill 做
- ❌ 唔寫 content brief、唔寫 blog → 用 `imarflex-copywriter` agent
- ❌ 唔改 `business-focus/` 內容 — focus 係 user 定,我哋只係讀
- ❌ Pitch stage 唔好假裝有 GSC / WhatsApp / PostHog 數據 — 冇就標 ⚠️ 入 request list

## Cross-tool delegation

- **`imarflex-signal-scout` agent** — 同 user 一齊 walk through 一次 sweep,真正去 fetch SERP、retailer page、shopline。呢個 skill 係 reference,agent 係執行者。
- **`imarflex-research/business-focus` skill** — 如要更新本月 focus,delegate 出去。
- **`imarflex-copywriter` agent** — 唔關事(下游)。

## Pitch-mode reminder

> [!warning]
> 而家 client 未 hire,**所有 raw note 唔好寫成「我哋睇到 GSC 顯示...」**。冇 GSC 就唔好 fake GSC。
> Pitch stage 主力:competitor / retailer / shopline / season — 呢 4 個我哋手動做到。
> 每次 sweep 結尾要 output **request list**:寫明簽約後第一日要拎邊啲 access / export,等之後可以 unlock 完整流程。
