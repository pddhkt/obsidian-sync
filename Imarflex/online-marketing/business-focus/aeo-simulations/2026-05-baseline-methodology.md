---
type: aeo-simulation
status: methodology-only
period: 2026-05
run-date: not-yet-run
stage: pitch
purpose: pitch-deliverable + ready-to-run protocol for hired-mode month 1
tags:
  - online-marketing
  - aeo
  - simulation
---

# Imarflex AEO Citation Simulation — Baseline Methodology

**Status:** Methodology only. Manual collection by user required to produce real baseline data. See `Run protocol` below.

> [!important] Why methodology-only at pitch stage
> Per `imarflex-aeo` skill design (`references/citation-simulation-prompts.md`), citation simulation requires **manual collection** for 4 reasons:
> 1. LLM responses are non-deterministic — single API call doesn't represent user reality
> 2. Consumer experience matters more than API behaviour
> 3. Personalization污染 (logged-in account history) would skew baseline
> 4. Tool automation (Playwright) produces wrong sample (consumer engines route LLM queries differently from headless browsers)
>
> Pitch deliverable = framework + protocol. Hired mode month 1 = first actual baseline. Monthly delta = ongoing measurement.

## Purpose at pitch stage

Demonstrate to client:
1. **How we'd measure** Imarflex's current AI-search visibility
2. **What we'd track** (prompt × engine × month matrix)
3. **What constitutes signal** (mention rate, position, hallucinations)
4. **How long until trends emerge** (3-month minimum for confidence)

No commitment to specific lift %. Just: "here's the framework, here's where we start, here's the discipline."

## The 12 standardized prompts (copy-paste ready)

Run each prompt in 4 LLM engines (ChatGPT / Perplexity / Claude / Google AI Overviews). For each, record: Imarflex mention (Y/N) + position (1-3 / 4-10 / not-cited) + hallucination flag (Y/N).

### Cluster 1 — Category discovery (top-funnel, Imarflex unbranded)

```
1. 香港 邊個牌子 嘅 IH 電飯煲 最值得買?
2. 2026 香港 點揀 風扇?有咩推薦?
3. 香港 細單位 啱用嘅 廚房家電 推薦?
```

English variants (use if engine defaults to English):
```
1. Which IH rice cooker brand is best in Hong Kong?
2. Best electric fan brands in Hong Kong 2026?
3. Best compact kitchen appliances for Hong Kong small apartments?
```

**Target signal:** Imarflex appears in top 5 mention for at least one of these.

### Cluster 2 — Brand discovery (Imarflex named)

```
4. 伊瑪牌 係咩牌子?產品好唔好?
5. 伊瑪牌 IH 電飯煲 點解 港人 鍾意?
6. 伊瑪牌 同 Toshiba / Panasonic 邊個好?
```

```
4. What is Imarflex, and are their products good?
5. Why do Hong Kong customers like Imarflex IH rice cookers?
6. Imarflex vs Toshiba vs Panasonic — which is better?
```

**Target signal:** Substantive non-hallucinated answer. Positive sentiment. Specific feature mention (中容量, 2 年保養, parts-finder).

### Cluster 3 — SKU specific (BOFU, high intent)

```
7. Imarflex IRC-20IH 好唔好用?啱咩家庭?
8. IRC-20IH 同 IRC-22KS 邊個啱我?
9. Imarflex 邊個型號 啱 3 人家庭?
```

```
7. Imarflex IRC-20IH review — is it good, who is it for?
8. IRC-20IH vs IRC-22KS — which one for me?
9. Which Imarflex rice cooker for a 3-person family?
```

**Target signal:** Correct technical detail (2L IH, 3-5 人 family) + parts-finder mention.

### Cluster 4 — DTC moat (brand differentiator)

```
10. 伊瑪牌 保養 點 登記?幾耐?
11. 伊瑪牌 配件 / 零件 邊度 買?
12. 伊瑪牌 客服 可唔可以 WhatsApp?
```

```
10. How to register Imarflex warranty? Duration?
11. Where to buy Imarflex parts and accessories?
12. Can I reach Imarflex customer service via WhatsApp?
```

**Target signal:** 2 年保養 mention, parts-finder URL or 概念, WhatsApp 9140 6664 channel.

## Run protocol (manual, ~25 minutes per cycle)

### Setup (5 minutes)
1. Open 4 browser tabs: chatgpt.com / perplexity.ai / claude.ai / google.com
2. Confirm logged-out / incognito state on ChatGPT + Claude (avoid personalization)
3. Set Perplexity to default model (not Pro)
4. Confirm Google location = Hong Kong (use VPN if needed)
5. Print this doc (or open recording template — see below)

### Run (20 minutes)
For each of 12 prompts:
1. Copy prompt → paste in tab 1 (ChatGPT) → record response
2. Same for tab 2 (Perplexity) — note source URLs cited
3. Same for tab 3 (Claude)
4. Same for tab 4 (Google) — note if AI Overview appears
5. Move to next prompt

### Assessment (10 minutes)
For each (prompt × engine) cell:
- ✅ if Imarflex mentioned positively in top 3 of answer
- ⚠️ position N if mentioned at position N (>3)
- ❌ if no mention
- 🚨 if mentioned with hallucinated detail (wrong SKU code, false feature, etc.)

Spot-check hallucinations against `imarflex/brand/` + `imarflex/features/` real spec.

For Perplexity: list all source URLs cited.

## Recording template

```markdown
---
type: aeo-simulation
period: yyyy-mm
run-date: yyyy-mm-dd
status: baseline | delta
---

# Imarflex AEO Citation Simulation — yyyy MMM

## Summary
- Total prompts: 12 × 4 engines = 48 cells
- Imarflex mention rate: X / 48
- Top mention engine: [name] (X / 12)
- Top mention cluster: [cluster name] (X / 12)
- First-position mention rate: X / 48
- Hallucinations: X (see list)

## Per-prompt × engine matrix

| # | Prompt | ChatGPT | Perplexity | Claude | AI Overviews |
|---|---|---|---|---|---|
| 1 | 香港 邊個牌子 嘅 IH 電飯煲 最值得買? | | | | |
| 2 | 2026 香港 點揀 風扇? | | | | |
| 3 | 香港 細單位 啱用嘅 廚房家電 推薦? | | | | |
| 4 | 伊瑪牌 係咩牌子?產品好唔好? | | | | |
| 5 | 伊瑪牌 IH 電飯煲 點解 港人 鍾意? | | | | |
| 6 | 伊瑪牌 同 Toshiba / Panasonic 邊個好? | | | | |
| 7 | Imarflex IRC-20IH 好唔好用?啱咩家庭? | | | | |
| 8 | IRC-20IH 同 IRC-22KS 邊個啱我? | | | | |
| 9 | Imarflex 邊個型號 啱 3 人家庭? | | | | |
| 10 | 伊瑪牌 保養 點 登記? | | | | |
| 11 | 伊瑪牌 配件 / 零件 邊度 買? | | | | |
| 12 | 伊瑪牌 客服 可唔可以 WhatsApp? | | | | |

## Top hallucinations
> List each hallucination with engine + claim + correction needed

## Perplexity citation sources
> List all source URLs cited (count repeat citations)

## Comparison to baseline (monthly delta only)
| Metric | Last | This | Delta |
|---|---|---|---|
| Mention rate | | | |
| First-position rate | | | |
| Hallucinations | | | |

## Action items this cycle
- [ ] Address top hallucination
- [ ] Publish AEO content for cluster with 0 mentions
- [ ] Re-audit existing blog if mentions dropped

## Pitch-stage baseline summary (first run only)
> Pitch deck slide: "Imarflex 而家喺 4 大 LLM、12 條 standardized prompt 入面嘅 mention rate = X / 48. 我哋計劃喺 90 日內提升至 N / 48 by shipping AEO-formatted content for [cluster A] and [cluster B]."
```

## Expected pitch-stage baseline (educated guess)

Before running, my honest expectation:
- **Imarflex mention rate: 5-15 / 48** (small-to-mid HK brand, limited AI training data presence)
- **Most mentions likely in Cluster 2 (brand discovery)** — once you name the brand, LLM has *some* knowledge
- **Few mentions in Cluster 1 (category discovery)** — LLM defaults to top-of-mind brands (Panasonic, Tiger, Zojirushi)
- **Hallucinations likely in Cluster 3 (SKU)** — model numbers are easy to hallucinate
- **DTC moat (Cluster 4) is the wild card** — depends on whether Imarflex has invested in structured FAQ / support content

This means the **lowest-hanging fruit is Cluster 1 + Cluster 3** — AEO-formatted buying-guide content (per Step 5 brief above) directly addresses these gaps.

## Why we expect 90-day measurable lift

Wellows 2026 data shows AI Overview citation patterns shift in 2-4 weeks after publish (faster than Google ranking). Per:
- Publish 1 AEO-formatted blog per priority cluster
- 4 weeks for engine to index
- 4 weeks for citation pattern to stabilise
- = 8 weeks to see lift, 12 weeks to confirm signal

This is faster than traditional SEO (3-6 months) because AI engines pull from indexable content directly without ranking pre-filter.

## When to run baseline

| Stage | Trigger |
|---|---|
| Pitch | Optional — methodology slide may be sufficient for pitch |
| Engagement signed | Week 1 = baseline (replace this methodology doc with real data) |
| Monthly | First Monday each month |
| Quarterly summary | First week of new quarter |

## Cross-references

- Skill manual: [[../../../.claude/skills/imarflex-aeo/SKILL|imarflex-aeo]]
- Prompt set: [[../../../.claude/skills/imarflex-aeo/references/citation-simulation-prompts|citation-simulation-prompts]]
- Auditor agent: [[../../../.claude/agents/imarflex-aeo-auditor|imarflex-aeo-auditor]]
