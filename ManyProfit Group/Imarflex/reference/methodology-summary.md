---
type: reference
area: online-marketing
status: active
date: 2026-05-30
tags:
  - methodology
  - pitch
  - workflow
---

# Imarflex Online-Marketing Methodology — Pitch Summary

The 7-step workflow we'd run for Imarflex from Day 1, with the skill / agent / rubric system that enforces it. Built specifically for HK home-appliance DTC at mid-size brand scale, 2026 AI-search landscape, pitch-to-engagement transition.

## Why this exists (the operating philosophy)

Three commitments that show up in every step:

1. **Evidence over assertion.** Every claim labelled ✅ (sourced) / ⚠️ (unsourced — converts to client ask) / 🔒 / 💡 / 🟡 / ❌. No unmarked claims permitted. At pitch stage, ⚠️-heavy is *correct*, not weakness — it makes scope honest.
2. **Discipline over volume.** Hero-SKU concentration via 6-dim rubric. Any axis = 1 → auto-DQ. We'd rather push 1 great SKU than 5 mediocre ones.
3. **Hard rules over soft preferences.** LIHKG / Reddit content stays internal — never enters client-facing deliverable. No fabricated citations. No false schema. Rules enforced by the skill files themselves, not just team norms.

## The 7-step workflow

```
Step 0: Market intelligence scan           ← imarflex-research/market-scan + scout agent
   ↓ (5-10 bullet "Market context")
Step 1: Business focus                     ← imarflex-research/business-focus + planner agent
   ↓ (Q2/Q3 focus doc with hero scoring)
Step 2: Gather signals                     ← imarflex-research/signal-gather + scout agent
   ↓ (raw notes in research-inbox/)
Step 3: Raw topic capture                  ← same scout agent
   ↓ (9-field capture)
Step 4: Topic scoring                      ← 6-factor rubric
   ↓ (24+ = into next month's calendar)
Step 4.5: AEO format audit                 ← imarflex-aeo + auditor agent (built 2026-05)
   ↓ (5-axis rubric, score ≥ 13/15 to publish)
Step 5: Topic-to-content decision          ← brief authoring
   ↓ (content brief with AEO requirements baked in)
Step 6: Production                         ← imarflex-copywriter agent
   ↓ (blog + PDP + IG carousel + Reel script + FB / WhatsApp output)
```

Each step has:
- A **skill** (the reference manual — `.claude/skills/imarflex-{step}/SKILL.md`)
- An **agent** (the executor — `.claude/agents/imarflex-{step}-{role}.md`)
- A **reference template** (the artifact pattern)
- A **hard rule set** (what we refuse to do, even if asked)

## Step-by-step summary

### Step 0 — Market intelligence scan

**Question answered:** Which category should we even bet on this quarter?

**7 sources (6 default + 1 opt-in):**
1. Google Trends HK (24 seeds × Rising/Top = ~480 keyword signals per quarterly scan)
2. HKTVmall / 豐澤 / 百老匯 / 實惠 bestsellers
3. 小紅書 / 抖音 HK-tagged (opt-in only — pitch-stage requires manual evidence)
4. Competitor SKU launches (Panasonic, Toshiba, Sharp, Tiger, Zojirushi, Iris Ohyama HK)
5. HK media editorial agenda (U Lifestyle / Mill MK / FashionOne / Yahoo Style HK)
6. LIHKG / Reddit aggregate sentiment (**internal-only**, never propagates)
7. Amazon JP / TW bestseller (6-12 month leading indicator for HK)

**Cadence:** quarterly full scan (~2 hrs) + monthly light refresh (~20 min) + ad-hoc trigger.

**Output:** 5-10 distilled bullets, marker + source + implication. Pastes directly into Step 1 focus doc.

### Step 1 — Business focus

**Question answered:** Given the macro picture, what's our quarter's thesis?

**Two-level model:**
- Quarter focus = thesis (categories, hero SKUs, evergreen pillars, DTC moats)
- Monthly focus = bet placement (this month's promo, content, diff from quarter)

**Hero SKU 6-dim rubric** — every candidate scored 1-3 on:
- M×I (margin × inventory)
- Demand
- Diff (differentiation)
- Content readiness
- DTC moat fit
- Brand safety

Pass thresholds: 13-15 publish-ready, 9-12 revise, ≤ 8 rewrite. **Any axis = 1 → auto-DQ**.

**Mandatory reconciliation sections (monthly):**
- `Diff from quarter focus` — every category named in quarter focus must appear with IN/OUT decision + reason
- `Out of scope this month` — explicit list of NOT-doing items + reason

These exist to catch silent-drop bugs (e.g., quarter focus says push 抽濕機, monthly silently drops it = audit failure).

### Step 2 — Gather signals

**Question answered:** Within our chosen categories, what should we actually write?

**Weekly Monday sweep** across 8 sources (post-engagement; 4 sources at pitch stage). Includes: customer service / WhatsApp, GSC, site search, PostHog, competitor SERP, retailer/marketplace, product catalog, seasonal calendar.

### Step 3 — Raw topic capture

Every topic logged with 9 fields: source, raw wording, product/category, customer problem, possible keyword, search intent, destination / CTA, evidence, notes. Lives in `research-inbox/`.

### Step 4 — Topic scoring

6-factor rubric, each 1-5:
- Business relevance
- Search demand
- Purchase intent
- Content fit
- Repurpose value
- Ranking chance

Total ≥ 24 = next month's calendar. 18-23 = backlog. ≤ 17 = FAQ/caption only.

### Step 4.5 — AEO format audit (added 2026-05)

**Why it exists:** Wellows 2026 data shows AI Overview citations decoupling from Google ranking (76% → 38% in 8 months). 37% of product discovery now starts in AI interfaces. For mid-size HK brand with low query volume + competitor-dominated SERP, AEO = highest-leverage gap.

**5-axis rubric, each 1-3:**
- Passage-Q&A structure (50-word direct answer at top of every H2)
- Schema markup (Product / FAQPage / HowTo / Article — no fabricated structured data)
- Author identity + E-E-A-T (named author + credentials; generic "編輯部" auto-DQ for health/safety content)
- Statement-fact pairing (every concrete claim has number + source + date)
- Freshness signal (publish + updated + review cadence)

Pass thresholds: 13-15 publish-ready, 9-12 revise, ≤ 8 rewrite. Auto-DQ on any axis = 1 + content involves health/safety/electrical.

**Citation simulation:** 12 standardized prompts × 4 LLM engines (ChatGPT / Perplexity / Claude / Google AI Overviews) — monthly cadence. Baseline at pitch stage, monthly delta post-engagement.

### Step 5 — Topic-to-content decision

| Topic type | Format | Example |
|---|---|---|
| Buying guide | Blog + FB link post + Reel | `2026 點揀電飯煲` |
| Comparison | Blog + IG carousel + Reel | `IH vs 微壓 vs 球釜` |
| Problem-led | Blog + FAQ + short social | `電飯煲飯硬點算` |
| Maintenance | Blog + IG step carousel + Reel demo | `風扇點拆洗` |
| Recipe | Blog + IG carousel + Reel | `氣炸鍋蝦多士` |
| Brand / service | Support page + FB | `伊瑪牌保養點登記` |

### Step 6 — Production

Per-format outputs by `imarflex-copywriter` agent. Output channels:
- Blog (zh-HK), with AEO-formatted Q&A structure + schema spec
- PDP copy
- IG carousel (script + image prompts)
- FB post
- Reel script (15-30s demo)
- Short explainer (90s)
- WhatsApp broadcast
- Email lifecycle flow (post-engagement)

## Differentiators vs generic 2026 agency playbook

| Area | Generic agency | Our workflow |
|---|---|---|
| Topic discovery | Keyword volume → topic | Business focus + macro scan → topic |
| Hero SKU | All catalog promoted | 1 hero per category, 6-dim scored, auto-DQ rule |
| Evidence | Implicit | Explicit ✅ / ⚠️ marker on every claim |
| LIHKG / forum | Direct quotes | Internal-only, aggregate-only, hard rule |
| AEO | Bolt-on or absent | Step 4.5, dedicated rubric + auditor agent |
| Pitch deliverable | Slide deck | Working artifacts (focus doc, brief, sample blog, audit report) |

## Skills + agents (5 + 5)

| Skill | Purpose | Companion agent |
|---|---|---|
| `imarflex` | Master project map | (used by all agents) |
| `imarflex-research/business-focus` | Step 1 manual + hero rubric | `imarflex-business-focus-planner` |
| `imarflex-research/market-scan` | Step 0 manual + 7 sources + 24 seeds | `imarflex-market-scout` |
| `imarflex-research/signal-gather` | Step 2 manual | `imarflex-signal-scout` |
| `imarflex-aeo` | Step 4.5 manual + rubric + citation simulation | `imarflex-aeo-auditor` |
| (extends across all) | Brand voice + production | `imarflex-copywriter` |

Each skill has SKILL.md (always loaded) + references/ (loaded per-task). Hard rules mirrored across relevant skills (e.g., LIHKG internal-only appears in 3 skills + 2 memory files).

## Pitch-stage vs hired-mode (the same workflow, two modes)

| Aspect | Pitch stage | Hired mode |
|---|---|---|
| Macro scan sources | Same 6 default + opt-in 小紅書 | Same |
| Evidence markers | Mostly ⚠️ (no client data) | Mostly ✅ (GSC, WhatsApp, etc.) |
| Hero SKU | Placeholder codes; client confirms | Real SKUs with verified margin |
| AEO author | `⚠️ TBD` placeholder | Real named author with credentials |
| Citation simulation | One-time baseline | Monthly delta tracking |
| Schema | Spec only (deployment is post-engagement) | Deployed + Search Console monitored |
| Owned-list growth | Spec only | Live target |

The transition from pitch to hired is **upgrading ⚠️ to ✅**, not redoing the work.

## What pitch buys you (deliverables)

A real, working, **already-running** marketing operation built specifically for your category. Not a slide deck of "what we'd do" — a system of skills, agents, rubrics, and templates that has already produced:

- 1 quarterly market scan (Q2 2026)
- 1 quarterly business focus doc with hero SKU scoring + DTC moat
- 3 sample blogs (one buying guide, one maintenance, one recipe)
- AEO audit framework + citation simulation methodology
- 24-seed Google Trends keyword list for ongoing scans
- Pre-engagement checklist (every ⚠️ already mapped to a Day-1 ask)

After signing, Day-1 = client provides the ⚠️ items, we upgrade to ✅, and the same machine starts producing weekly research + monthly content + quarterly thesis updates.

## What's still TBD (honest)

- **Lifecycle skill** (email + WhatsApp post-purchase flows) — designed, not built
- **KOL skill** (HK micro-creator shortlist + brief) — designed, not built
- **Reel/Short format extension to copywriter** — designed, not built
- **Programmatic SEO trial** — Q3 go/no-go after engagement
- **Workflow A/B pitch run** (our workflow vs generic agency baseline on same brief) — proposed, would be Week 1 of engagement

## Related docs

- `reference/2026-strategy-benchmark.md` — full industry comparison
- `reference/session-decisions-2026-05.md` — reasoning behind every decision in this build
- `online-marketing/topic-research-workflow.md` — the canonical 7-step workflow doc
- `online-marketing/business-focus/2026-q2-focus.md` — live Q2 focus example
