---
name: imarflex-aeo
description: Imarflex 伊瑪牌 AEO / GEO (Answer Engine Optimisation / Generative Engine Optimisation) operating manual — formats briefs, blogs, PDP, FAQ so that ChatGPT / Perplexity / Claude / Google AI Overviews will cite Imarflex, not just rank it. Use when writing or auditing any client-facing content for AI-search citation readiness, when the user mentions "AEO", "GEO", "AI Overviews", "ChatGPT citation", "Perplexity", "LLM SEO", "passage Q&A", "schema markup", "E-E-A-T", or "AI search". Triggers on "AEO audit", "is this blog AI-ready", "format for citation", "schema check", "author bio", "AI citation baseline", "run citation simulation", "格式 AI 搜尋".
paths: Imarflex/online-marketing/**
allowed-tools: Read, Glob, Grep, Edit, Write, WebFetch
---

# Imarflex AEO — Operating Manual

呢個 skill 負責**令 Imarflex content 被 AI 搜尋引擎 cite**。Traditional SEO 目標係 "rank top 10";AEO/GEO 目標係 "be the cited source" — ChatGPT 答 "邊個 IH 電飯煲 啱港人?"嗰陣,我哋要係嗰個被 quote 嘅源頭。

呢個 skill 唔 replace `seo-keyword-research.md` —— 兩者並存:
- **SEO** 答「搜咩字、邊條 keyword 入 brief、SERP intent 點」
- **AEO** 答「同樣份 brief / blog / PDP,結構點寫 LLM 先肯 cite」

落地位:
- 寫 brief 嗰陣(Step 4.5,介乎 scoring 同 brief 完成之間)→ AEO formatting requirements 入 brief
- 寫 blog / PDP / FAQ 嗰陣 → 跟 passage-Q&A + schema + author identity 三件套
- 出街前 → `imarflex-aeo-auditor` agent run 一次 audit,score < 13/15 唔出街
- 出街後 → 每月一次 citation simulation,track Imarflex 喺 LLM 答案入面出現頻率

## Why this skill exists

2025-2026 industry data:
- Top-10 Google rankers 喺 mid-2025 仲 share AI Overview citation 76%,到 early 2026 跌到 ~38%(Wellows 2026)—— ranking 同 citation 開始 decouple
- 37% product discovery queries 而家由 AI interface 啟動;ChatGPT referral conversion ~15.9% vs Google organic 1.76%(Inspired Monks 2026)
- Google March 2026 E-E-A-T update penalise 缺 experience signal / unsourced claim 嘅內容(Digital Applied 2026)

對 Imarflex 呢隻 mid-size HK brand 嚟講,呢個係 **highest-leverage gap**:query volume 低、consideration 重、competitor brand mindshare 主導 SERP(Q2 scan 已 confirm ElecBoy / Beauty Review 360 / HK01 listicle 完全冇 Imarflex)。AEO 係 work-around 路徑。

## Hard rules

1. **唔可以為咗 schema 寫假 structured data。** Schema 入面嘅 spec(`brand`、`model`、`offers`、`aggregateRating`)如果 mismatch PDP 真實內容 → Google penalty + brand 信譽 risk。寧願冇 schema,都好過 schema 講假。
2. **唔可以 fabricate citation source。** 寫 "according to 2026 HK consumer report" 而冇得引返條 source URL → ❌。要 cite 就要 URL + date + 1 行 quote 喺 brief / blog draft 入面。
3. **LIHKG / Reddit / 論壇 sentiment 永遠唔得入 AEO content。** 同 `imarflex-business-focus` 嘅 hard rule mirror —— LIHKG 引語就算 paraphrase 都唔可以入 blog / PDP / FAQ。如果 audit 時發現 source attribution 指向 LIHKG / Reddit,**即時 reject**,寫返 issue 入 audit report。
4. **Pitch stage 唔可以承諾 citation lift。** 我哋未 ship、未量度 → 只可以 demo baseline + rubric + 我哋會點 measure。 唔可以講「我哋幫你 lift X% citation」。
5. **Author identity 要係真人。** 唔可以用 generic「Imarflex 編輯部」做 author bio — Google E-E-A-T 同 LLM 都 weighted real-person credentials。Pitch stage 用 placeholder(eg「Author: [TBD 由 client 提供具產品經驗嘅 named author]」)+ 入 day-1 ask。

呢 5 條 rule 喺 SKILL.md + auditor agent 都有 mirror。違反 → 即時 stop + report。

## The 5 AEO axes(audit 用呢個,rubric 喺 `references/audit-scorecard.md`)

| Axis | 1 分 | 2 分 | 3 分 |
|---|---|---|---|
| **Passage-Q&A structure** | Prose-only,冇 question heading | H2/H3 部分用 question,但 answer 埋喺 paragraph 中段 | Direct-answer-first(≤ 50 字)頂上,evidence / 拓展放下面 |
| **Schema markup** | 冇 structured data | 基本 Product 或 Article schema | Layered:Product + FAQPage + HowTo / Review(applicable 嗰時),valid syntax,無 false fact |
| **Author identity + E-E-A-T** | 冇 byline,或「Admin」/「編輯部」 | Named author,冇 credential | Named author + role + 相關 credential + 可 link out(LinkedIn / 員工介紹頁) |
| **Statement-fact pairing** | Prose claim 冇 number / source | 有 number,冇 source | 每個 concrete claim 有 number + source URL + date(或寫明「Imarflex internal testing 2026-MM」) |
| **Freshness signal** | 冇 date | 只有 publish date | Publish + "last updated" + 寫低 review cadence(eg「Reviewed 2026-05」) |

**Pass thresholds:**
- **13-15 / 15:** AI-citation-ready,可出街
- **9-12 / 15:** Needs revision,標明邊軸唔夠分,返去改
- **≤ 8 / 15:** Rewrite — 唔係 polish 問題,結構唔啱

**Auto-DQ rules:**
- 任何 axis 1 分 + claim category 屬 health / safety / electrical(eg 降糖 IH 健康 claim、風扇 dB 數據、IH 耗電 W 數)→ **DQ**,唔可以出街
- Schema 入面有 false structured fact(eg 標 5-star rating 但 PDP 冇 review system)→ **DQ**
- Author 係 generic「編輯部」+ claim 涉及醫學 / 食療角度 → **DQ**

## Workflow — 寫 brief 嗰陣加 AEO requirement(Step 4.5)

落 [[topic-research-workflow]] Step 4(scoring 過咗)同 Step 5(topic-to-content decision)之間。

1. Read 個 brief draft
2. 跟 `references/passage-qa-rubric.md` 改 outline:每個 H2 / H3 都要可以答到一條 user-phrased question
3. 跟 `references/schema-checklist.md` 喺 brief 末加 "Schema requirements" section
4. 喺 brief frontmatter 加 `author:` field — 名 + role + credential。冇就 ⚠️ TBD + 入 day-1 ask
5. 喺 brief body 列每個 claim 嘅 source(URL + date)。冇就標 ⚠️ + 入 day-1 ask
6. Brief 至少要寫低 publish date + "last updated" 預設位 + review cadence

## Workflow — 寫 blog / PDP / FAQ

1. Open brief
2. 跟 AEO requirements section 嘅 5 axes 落 draft
3. Direct answer 首句(≤ 50 字)— LLM 拎呢句做 quote candidate
4. Concrete number + source 同段出 — LLM 用呢類 statement-fact pair 做 citation
5. Schema 喺 PDP / blog template 入面已預設,fill in real data only
6. 寫完 self-audit 一次 against rubric;score ≥ 13 先 ship 去 `published-content/`

## Workflow — Audit 已存在 content

由 `imarflex-aeo-auditor` agent 做。Agent 行:
1. Read content file
2. Score 5 axes(1-3 each)
3. Apply DQ rules
4. 出 audit report:total score、per-axis breakdown + 具體 fix 建議、DQ flags
5. Score < 13 → 唔 publish;返去改
6. Audit report 寫返入 content file frontmatter(`aeo_score: X/15` + `aeo_audited: yyyy-mm-dd`)做 trail

## Workflow — Citation simulation(monthly cadence)

呢個係 measure work,唔係 format work。Tool = 直接問 ChatGPT / Perplexity / Claude / Google AI Overviews 一組 standardized prompt,記返答案,睇 Imarflex 有冇被 mention。

詳細 prompt set + recording template 喺 `references/citation-simulation-prompts.md`。

Pitch-stage handling:
- 跑一次 baseline(即係而家 Imarflex 喺 LLM 答案入面**幾乎冇 mention**,就咁 document 落嚟)
- 入 pitch deck 做「here's where we start, here's what we'll measure」
- ⚠️ 唔可以 commit「我哋會 lift X% citation」—— 未 ship、未 measure

Post-engagement:
- 每月 run 一次,track delta
- 出 monthly report 入 `reports/`,column = prompt × LLM × month,cell = Imarflex mention(Y/N)+ position + 1 行 context

## Pitch-stage vs hired-mode

| Aspect | Pitch stage(未簽) | Hired mode(已簽) |
|---|---|---|
| Author identity | ⚠️ TBD placeholder + day-1 ask | ✅ Real named author + LinkedIn / 員工頁 |
| Source for claim | ⚠️ 公開 source only(HK media / govt / brand spec sheet) | ✅ + 加 internal testing data(實驗室 dB / W 數 / 容量) |
| Citation simulation | One-time baseline,入 pitch deck | Monthly,入 `reports/` |
| Schema | 寫入 brief / template,but PDP 未上線就 placeholder | 部署 + Search Console 監察 |
| Output | Brief + sample blog with AEO formatting + baseline simulation report | + monthly citation tracking + schema deployed |

## How this feeds / interacts with other skills

| Skill / agent | Relationship |
|---|---|
| `imarflex-copywriter` | **Reads `imarflex-aeo` skill。**寫 blog / PDP 嗰陣直接跟 5 axes 落 draft,唔等 auditor 嚟講先改 |
| `imarflex-business-focus` | Focus doc 入面嘅 ⚠️ author identity / source TBD 自動入 pre-engagement checklist |
| `imarflex-aeo-auditor` agent | **執行 arm。**Run audit + simulation。本 skill 係 reference manual |
| `seo-keyword-research.md` | 並行:SEO 解決「咩 keyword」,AEO 解決「呢條 keyword 嘅 content 點寫先 cite-able」。Brief 入面兩者都要有 |

## Reference files

- `references/audit-scorecard.md` — 5-axis rubric + DQ rules + worked example(audit 一篇 sample 降糖 IH blog 嘅 before / after score)
- `references/passage-qa-rubric.md` — point question heading 點寫、direct-answer-first 嘅 50-字 quote candidate 點 craft、evidence block 點 layer
- `references/schema-checklist.md` — Product / FAQPage / HowTo / Review schema 嘅 minimum field + validation checklist + false-fact red flag
- `references/citation-simulation-prompts.md` — 12 條 standardized prompt(中英 mix)+ 4 LLM × monthly recording template + pitch-stage one-time baseline format

## What this skill does NOT do

- 唔做 keyword research — 去 `seo-keyword-research.md`
- 唔寫 prose / 文案 — 去 `imarflex-copywriter`
- 唔負責 PDP schema deployment(後端工程嘅事)— skill 只負責定 schema spec
- 唔做 backlinks / domain authority / off-page SEO — out of scope
- 唔負責 image SEO / alt text style — `imarflex-copywriter` 已有
- 唔做 monthly performance review — 去 `reports/`

## Companion agent

`imarflex-aeo-auditor` agent 係 execution arm:
- Audit 任何 brief / blog / PDP / FAQ against 5 axes
- Run monthly citation simulation
- 將 audit score 寫返入 content file frontmatter
- 違反 hard rule(LIHKG source / fabricated citation / false schema)即時 stop + report
