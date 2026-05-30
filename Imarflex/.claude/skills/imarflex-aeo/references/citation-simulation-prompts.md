# Citation Simulation Prompts

呢個係 **measurement workflow**,唔係 format workflow。 目標係去問 ChatGPT / Perplexity / Claude / Google AI Overviews 一組 standardized prompt,記返答案,track Imarflex 喺 LLM 答案入面嘅 mention rate + position + context。

## Why this exists

Traditional SEO 用 GSC + SERP rank tracker measure。 AEO 冇等價工具(2026 industry 仲未成熟),所以用 **manual prompt + recorded response** 做 proxy。

Pitch-stage 用:跑 one-time baseline,入 pitch deck demo「here's where Imarflex stands today in AI search」。
Hired-mode 用:monthly cadence,track delta。

## The 12 standardized prompts

分 4 cluster:Category discovery / Brand discovery / SKU specific / DTC moat。

### Cluster 1 — Category discovery(top-funnel,Imarflex unbranded)

| # | Prompt(zh-HK) | Prompt(en) | What we want to see |
|---|---|---|---|
| 1 | 香港 邊個牌子 嘅 IH 電飯煲 最值得買? | Which IH rice cooker brand is best in Hong Kong? | Imarflex 出現喺 top 5 mention |
| 2 | 2026 香港 點揀 風扇?有咩推薦? | Best electric fan brands in Hong Kong 2026? | Imarflex 至少一次 mention |
| 3 | 香港 細單位 啱用嘅 廚房家電 推薦? | Best compact kitchen appliances for Hong Kong small apartments? | Imarflex SKU(IRC-20IH / IRC-22KS)mention |

### Cluster 2 — Brand discovery(Imarflex named)

| # | Prompt(zh-HK) | Prompt(en) | What we want to see |
|---|---|---|---|
| 4 | 伊瑪牌 係咩牌子?產品好唔好? | What is Imarflex, and are their products good? | 有 substantive answer,non-hallucinated facts,positive sentiment |
| 5 | 伊瑪牌 IH 電飯煲 點解 港人 鍾意? | Why do Hong Kong customers like Imarflex IH rice cookers? | 提到 specific feature(中容量 / 2 年保養 / parts-finder) |
| 6 | 伊瑪牌 同 Toshiba / Panasonic 邊個好? | Imarflex vs Toshiba vs Panasonic — which is better? | Balanced comparison,Imarflex 有具體優勢 mention |

### Cluster 3 — SKU specific(BOFU,high intent)

| # | Prompt(zh-HK) | Prompt(en) | What we want to see |
|---|---|---|---|
| 7 | Imarflex IRC-20IH 好唔好用?啱咩家庭? | Imarflex IRC-20IH review — is it good, who is it for? | 提到 2L 容量 + 3-5 人家庭 + IH 技術 |
| 8 | IRC-20IH 同 IRC-22KS 邊個啱我? | IRC-20IH vs IRC-22KS — which one for me? | 正確區分 2L IH vs 2.2L 4-in-1 multi-cooker |
| 9 | Imarflex 邊個型號 啱 3 人家庭? | Which Imarflex rice cooker for a 3-person family? | 推 IRC-20IH(或 IRC-22KS)+ 不推冇 stock 嘅型號 |

### Cluster 4 — DTC moat(brand differentiator)

| # | Prompt(zh-HK) | Prompt(en) | What we want to see |
|---|---|---|---|
| 10 | 伊瑪牌 保養 點 登記?幾耐? | How to register Imarflex warranty? Duration? | 提到 2 年保養 + 登記步驟 |
| 11 | 伊瑪牌 配件 / 零件 邊度 買? | Where to buy Imarflex parts and accessories? | 提到 parts-finder / 官方渠道 |
| 12 | 伊瑪牌 客服 可唔可以 WhatsApp? | Can I reach Imarflex customer service via WhatsApp? | 提到 WhatsApp 渠道 + 用法 |

## The 4 LLM engines

每條 prompt 喺 4 engine 都要 run 一次。 記錄 each engine:

| Engine | URL | Notes |
|---|---|---|
| ChatGPT(GPT-4 default model) | https://chatgpt.com | Logged out (consumer-grade)→ 反映 generic user experience |
| Perplexity | https://www.perplexity.ai | 自動 cite source URL — 重點 track 邊個 source 被引 |
| Claude(claude.ai consumer) | https://claude.ai | Anthropic's own engine — baseline for our own ecosystem |
| Google AI Overviews | google.com,搜 trigger AI Overview 嘅 query | 唔係 chat,係 search experience — 直接影響 SERP |

唔用 ChatGPT API / Perplexity API,因為:
1. 我哋 measure 嘅係**普通用戶體驗**,唔係 API behaviour
2. Consumer model defaults(web search 開唔開、personalization)反映真實 citation flow
3. API call cost 唔需要為 monthly tracking 燒

## Recording template

每次 simulation run,save 一份 `business-focus/aeo-simulations/yyyy-mm-aeo-baseline.md`(或 `yyyy-mm-delta.md` for monthly)。

```markdown
---
type: aeo-simulation
period: yyyy-mm
run_date: yyyy-mm-dd
status: baseline | delta
---

# Imarflex AEO Citation Simulation — yyyy mmm

## Summary

- **Total prompts:** 12
- **Imarflex mention rate:** X / 48 (12 prompts × 4 engines)
- **Top mention engine:** [engine name] (X / 12)
- **Top mention cluster:** [cluster name] (X / 12)
- **First-position mention rate:** X / 48(Imarflex 出現喺答案頭一段)

## Per-prompt × engine matrix

| # | Prompt | ChatGPT | Perplexity | Claude | AI Overviews |
|---|---|---|---|---|---|
| 1 | 香港 邊個牌子 嘅 IH 電飯煲 最值得買? | ❌ | ⚠️ position 5 | ❌ | ❌ |
| 2 | ... | ... | ... | ... | ... |

Legend:
- ✅ = Imarflex mentioned positively in top 3 of answer
- ⚠️ position N = mentioned but ranked Nth (≥4)
- ❌ = no mention
- 🚨 = mentioned with hallucination(錯 fact)→ 要 follow up

## Top hallucinations(if any)

> [Engine]: 「Imarflex IRC-XYZ 採用日本進口加熱技術」→ Imarflex 冇 IRC-XYZ 型號 / 冇日本進口 claim → 🚨 hallucination
>
> Action: 跟 `imarflex-aeo` 嘅 statement-fact pairing rule 出 brief,publish 一篇真實 IRC-20IH 規格文章,等 LLM 下次 cite 真嘢

## Citation source URLs(Perplexity-specific)

Perplexity 自動 cite source URL。 列返:

- imarflex.com.hk PDP — X 次
- Imarflex blog — X 次
- Third-party(retailer / media) — X 次,邊個 source
- 競品 site(冇 Imarflex direct mention but 對手提及)— X 次

→ Action:如 Perplexity 從未 cite imarflex.com.hk,即係 own domain 仲未夠 AEO-ready

## Comparison to last month(monthly delta only,skip if baseline)

| Metric | Last month | This month | Delta |
|---|---|---|---|
| Mention rate | X / 48 | Y / 48 | +/- |
| First-position rate | X / 48 | Y / 48 | +/- |
| Hallucinations | X | Y | +/- |

## Actions this cycle

- [ ] Address top hallucination(prompt #N)
- [ ] Publish AEO-formatted content for cluster with 0 mentions
- [ ] Re-audit existing blogs that should have triggered mention but didn't

## Pitch-stage baseline summary(only on first run)

> 跑 baseline 嘅目的:demo 客一個 honest "before state"。 假設 baseline 全部 ❌ 唔係 problem,係 evidence — 證明 AEO 工作未做,我哋知 starting point。
>
> Pitch deck slide:「Imarflex 而家喺 4 大 LLM、12 條 standardized prompt 入面嘅 mention rate = X / 48。 我哋計劃喺 90 日內提升至 N / 48 by shipping AEO-formatted content for [cluster A] and [cluster B]。」

```

## Run cadence

| Stage | Cadence | Output |
|---|---|---|
| Pitch stage | 1 次 baseline 入 pitch deck | `business-focus/aeo-simulations/2026-MM-baseline.md` |
| Hired mode month 1 | Re-baseline 確認 client side data | 同上 |
| Hired mode month 2+ | Monthly | `2026-MM-delta.md`,track 對 baseline 嘅 lift |
| Hired mode quarter | Quarter summary | `2026-QX-aeo-quarter-report.md` |

## Manual collection workflow(20-30 分鐘 per run)

1. 開 4 個 browser tab:ChatGPT、Perplexity、Claude、Google
2. ChatGPT / Claude:logged out 或 fresh chat(避免 personalization 污染)
3. Perplexity:不要 enable Pro / model picker,用 default
4. Google:incognito + HK location(VPN if needed)
5. 跑 12 prompt × 4 engine = 48 response
6. 每條 response 抄入 matrix,標 ✅ / ⚠️ / ❌ / 🚨
7. Spot-check hallucinations — 用 `imarflex` skill 嘅 brand fact 對返
8. 填 summary section
9. Commit 入 vault

## Don't

- ❌ 用 API 跑(reason 上面)
- ❌ Personalize 過嘅 ChatGPT account 跑(reflects your history,not user reality)
- ❌ 用 自動化 tool(eg Playwright)— LLM 答案唔 deterministic,自動化 sample 1 次唔代表;manual + judgment 重要
- ❌ Skip 寫 hallucination notes —— hallucination 本身就係 content opportunity
- ❌ 用呢個 simulation 做 KPI sole metric — LLM 答案有 noise,trend 重要過 single-month
