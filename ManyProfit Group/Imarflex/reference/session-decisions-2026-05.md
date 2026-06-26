---
type: reference
area: online-marketing
status: active
date: 2026-05-30
period: 2026-05-23 to 2026-05-30
tags:
  - decisions
  - methodology
  - session-log
---

# Session Decisions — 2026-05 Imarflex Online-Marketing Sprint

Captures the *reasoning* behind decisions made during the 2026-05 pitch-prep sprint. The output artifacts (focus doc, skills, agents) show **what** was decided; this doc explains **why** — so future me, the user, or the client can audit the logic without re-running our chain of thought.

## Context recap

Pitch-stage engagement with Imarflex 伊瑪牌 (HK home appliance brand, 50-year heritage, ~200 SKUs). Not signed yet. All work = pitch material to win the engagement. No client data access (no GSC, site search, WhatsApp logs, real promo/margin/inventory).

## Decision 1 — Add Step 0 (Market intelligence scan) to the workflow

**Original workflow** went straight from "client picks SKUs" + "season" → Step 1 business focus. **Identified gap:** no external market input → closed-loop reasoning.

**Decision:** Add Step 0 macro scan before Step 1. Built as `imarflex-market-scan` skill + `imarflex-market-scout` agent.

**Why:**
- Without macro scan, focus doc inherits all of client's blindspots
- Pitch-stage doable — all 7 default sources are public (Google Trends, retailer bestsellers, competitor SKU launches, HK media editorial, LIHKG sentiment, Amazon JP/TW, optional GfK)
- Output is short (5-10 distilled bullets) so the focus doc author isn't drowned in raw signal

**Consequence:** Q2 focus now has a `## Market context` section with 11 distilled bullets (9 ✅ + 2 ⚠️). Without it, we'd have missed the "Pana/Toshiba IH concentrate at 0.45-1.0L mini" finding that drove the IRC-20IH hero rationale.

## Decision 2 — DQ 降糖 IH as Q2 hero candidate

**Setup:** Original Q2 thinking had 降糖 IH as a health-angle hero. Market scan + Trends data showed Toshiba RC-10IRPH (35% sugar reduction), Thanko, plus 2026 retest showing cuckoo / 美的 / 松井 / tefal / 小米 IH all entering same window.

**Decision:** DQ via hero-SKU rubric, **Diff axis = 1** (auto-DQ regardless of total score).

**Why:**
- Rubric Diff axis asks "how differentiated is this SKU's angle vs market" — NOT "how much demand exists"
- 5+ competitors selling same 35% reduction = generic 低糖 is no longer differentiation
- Pushing this means competing for same query as better-resourced brands — guaranteed loss

**Door left open:** If Imarflex finds a *specific* USP (米種, 內膽 patent, 中醫食療), Diff goes 1 → 2/3 and SKU can re-enter rubric.

**Wider principle codified:** *Auto-DQ on any axis = 1* is now hard rule in `references/hero-sku-rubric.md`. Prevents emotional pushes ("but we want it!") from overriding structural reality.

## Decision 3 — Hard rule: LIHKG / Reddit internal-only

**Setup:** LIHKG is the strongest HK consumer-sentiment signal source. Tempting to use forum quotes in client-facing content (brief, blog, pitch deck).

**Decision:** Hard rule — LIHKG / Reddit / 論壇 content **never** enters client-facing deliverable. Aggregate sentiment only, brand-self mention only, internal-scan-doc only.

**Why:**
- Legal risk — quoting individual users without consent
- ToS violation risk for Imarflex if quotes surface in marketing
- E-E-A-T penalty — Google March 2026 update penalises unsourced/unverified claims
- Brand 信譽 risk if competitor brand sentiment is used as marketing ammunition

**Mirrored across:** `imarflex-business-focus`, `imarflex-market-scan`, `imarflex-aeo` skills + corresponding agents + `feedback_imarflex_lihkg_internal_only.md` memory. Three-layer enforcement.

## Decision 4 — Google Trends working access pattern via Playwright

**Initial state:** 3 tools tried (agent-browser, browser-use, raw Playwright + stealth) all hit HTTP 429 on `/explore` endpoint. Documented as "best-effort, often unavailable" in the scan skill.

**2026-05-27 retest:** agent-browser CLI + `?date=today 1-m` (30-day window) worked. `/explore` returned proper title + full data. Possible explanations: IP rate-limit window reset; 30-day query lighter than default 12-month.

**Decision:** Updated `sources-public.md` §1 — Playwright via agent-browser is now **primary** for this source. WebFetch deprecated. Default 30-day window first, 12-month only when seasonal pattern confirmation needed.

**Hard operational rules now baked in:**
- Per-query 30s sleep
- ≥10 queries → add 60s cooldown
- Tool-swapping (agent-browser ↔ browser-use ↔ raw playwright) doesn't help — they share IP rate-limit window
- Fallback path: `/trending?geo=HK` partial signal if `/explore` blocked

**Tested 2026-05-27 + 2026-05-30:** working for both `/trending` (HK realtime trends with category filter) and `/explore` (30-day series + Related Rising/Top queries).

## Decision 5 — 24-seed Google Trends keyword list

**Setup:** Trends is a **seed-expansion tool**, not idea-discovery. Generic "電飯煲" query only exposes category-level signals. Need diverse seeds to cover blindspots.

**Decision:** Designed 24-seed list (saved as `references/seed-list-hk.md`):
- 9 category seeds (matching Imarflex active SKUs)
- 5 brand seeds (Imarflex + 4 main competitors)
- 5 comparison runs (head-to-head compare mode)
- 5 long-tail problem seeds (point of intent)

**Math:** 24 queries × (10 Rising + 10 Top related) = ~480 keyword signals per quarterly scan. Run time ~25-30 minutes per quarter.

**Why this shape, not more:**
- Hard limit ~30 queries due to 30s sleep budget
- Quarter-over-quarter comparability matters more than breadth
- Rotation rule: 2 seasons of no actionable Rising → swap out

## Decision 6 — 中容量 IH gap reframed as product-shelf gap (not search-demand gap)

**Initial Q2 thesis:** "Pana/Toshiba IH concentrate 0.45-1.0L mini → IRC-20IH (2L) + IRC-22KS (2.2L) in 1.5-2.2L gap is undertapped."

**2026-05-30 compare test:** 電飯煲 vs 迷你 電飯煲 vs 2L 電飯煲 on Trends HK 30-day:
- 電飯煲: average 63 (daily 37-100)
- 迷你 電飯煲: average 1 (mostly 0)
- 2L 電飯煲: average 1 (one spike to 41 on May 11)

**Decision:** Reframe — the gap **exists**, but it's a *product-shelf gap*, not a *search-demand gap*. HK users don't search by capacity phrase; they search generic 電飯煲 and filter on PDP/retailer page.

**Consequence:**
- IRC-20IH Demand axis upgrade 2 → 3, total score 16/18 → **17/18 ✅ HERO**
- Content angle changes: write "電飯煲 容量 點揀" / "幾多人食邊個容量" buying-guide (captures generic searcher) — do NOT write "2L 電飯煲 點揀" (zero search volume)
- All IH content must funnel through the **generic 電飯煲 query**, with family-size argument inside

**Wider principle:** When demand signal looks weak, check whether the *phrase* is wrong, not just the *concept*.

## Decision 7 — Built AEO skill + auditor agent (2026-05-27)

**Why:** Industry benchmark (2026-strategy-benchmark.md) identified AEO as highest-leverage missing pillar. Mid-size HK brand with low query volume + high consideration + competitor-dominated SERP = AEO is the work-around path to citation visibility.

**Skill design choices:**
- **5 axes, not 7+** — passage-Q&A / schema / author / statement-fact / freshness. Industry converges on these 5. More axes = analysis paralysis.
- **Auto-DQ when axis=1 + health/safety/electrical** — mirrors hero-SKU rubric auto-DQ. YMYL content + generic author = real Google penalty + legal risk.
- **LIHKG redaction mirrored as hard rule #3** — auditor rejects any LIHKG-sourced claim before scoring.
- **Citation simulation is manual, not automated** — LLM responses non-deterministic; consumer experience matters more than API behaviour. Agent processes responses, doesn't run browsers.
- **Pitch-stage handling baked everywhere** — `⚠️ TBD` author placeholder is acceptable (still 12/15 score possible); 90-day plan instead of lift commitments; baseline becomes pitch slide.

## Session retrospective

### What worked
- **Sub-agents for skill building** — `imarflex-business-focus`, `imarflex-market-scan`, `imarflex-signal-gather` skill+agent pairs built in parallel by sub-agents. Main agent stayed on user discussion.
- **Eval-then-fix** — running the market-scan eval on real signals exposed 9 specific gaps. Fixed via second sub-agent pass.
- **Hard rules over soft preferences** — LIHKG hard rule pattern cleanly transfers between skills (now in 3 skills + 2 memory files). Soft preferences would have eroded.
- **Trends iteration** — refusing to accept "best-effort, often unavailable" as final state. Retest 4 days later → working access pattern documented + 24-seed list designed.

### What we learned about pitch-stage workflow
- **⚠️-heavy is correct, not a failure** — stage-aware rule means pitch-stage scans expect mostly ⚠️ because client data is absent. Fail trigger is "0 ✅" not "any ⚠️".
- **Methodology is the pitch deliverable** — at pitch stage we can't show outcomes; we show *structure* (rubrics, checklists, evidence markers, hard rules). Client buys the discipline, not the data.
- **Every ⚠️ converts to a day-1 ask** — pre-engagement checklist auto-maps unresolved items into client-onboarding requests. The ⚠️ count becomes a *scope clarification mechanism*, not weakness.

### What we'd do differently
- **Build AEO earlier** — should have been a Day-1 skill, not a Day-7 addition. Would have shaped how the existing 3 sample blogs were drafted.
- **Run signal sweep earlier** — `imarflex-signal-gather` skill exists but never used to populate `research-inbox/`. Step 2 demo missing from cycle.
- **Run AEO audit on existing samples** — sample blogs predate AEO skill; auditing them shows the "delta" from old-way to new-way (still doable).

## Day-1 client asks generated by this session

All ⚠️ items now map to specific onboarding requests. Listed by source area:

| Area | Day-1 ask |
|---|---|
| SKU codes | Real SKU codes per priority category (placeholder IRC-20IH used pitch-side) |
| Margin / inventory | Per-SKU monthly margin + sustained-stock status |
| Promo schedule | Forward 90-day promo + clearance roadmap |
| GSC / analytics | GSC export, site search log, PostHog access (replace ⚠️ FAQ assumptions with ✅ data) |
| WhatsApp log | Sample 30 days of customer-service WhatsApp conversations |
| AEO authorship | Named author with credentials per content piece (blocks AEO Axis 3 = 3) |
| Engineering | Backend platform confirmation (Shopify/Shopline/custom) for schema deployment |
| Review system | Existing review data, if any, for Review schema markup |
| LinkedIn / employee page URL pattern | For schema Author field |

## Files written / modified this session

| File | Purpose |
|---|---|
| `online-marketing/topic-research-workflow.md` | Added Step 0 |
| `online-marketing/business-focus/2026-q2-focus.md` | Live Q2 focus with hero scoring + market context |
| `online-marketing/business-focus/2026-q2-market-scan-demo.md` | Q2 macro scan |
| `.claude/skills/imarflex-business-focus/` (5 files) | Step 1 manual + templates + rubric |
| `.claude/skills/imarflex-market-scan/` (6 files) | Step 0 manual + sources + cadence + seed list |
| `.claude/skills/imarflex-signal-gather/` (multiple) | Step 2 manual |
| `.claude/skills/imarflex-aeo/` (5 files) | Step 4.5 manual + rubric + schema + simulation prompts |
| `.claude/agents/imarflex-{business-focus-planner,market-scout,signal-scout,copywriter,aeo-auditor}.md` | 5 agents |
| `~/.claude/projects/.../memory/` (3 entries) | Persistent context across sessions |
| `reference/2026-strategy-benchmark.md` | Industry benchmark report |
| `reference/methodology-summary.md` | Pitch-friendly methodology summary |
