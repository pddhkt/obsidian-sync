---
name: imarflex-research
description: Imarflex 伊瑪牌 topic-research workflow — one skill covering all three research stages that feed content production. Step 0 market scan (Google Trends HK, retailer bestsellers, competitor SKU launches, HK media, LIHKG/Reddit aggregate sentiment, Amazon JP/TW leading indicators → 5-10 bullet "Market context" block), Step 1 business focus (drafting/updating monthly `yyyy-mm-focus.md` and quarterly `yyyy-qx-focus.md` docs, 業務方向), and Step 2+3 signal gathering (weekly Monday sweep across competitor SERP, retailer/marketplace, catalog, seasonal calendar, plus client-gated GSC/site-search/PostHog/WhatsApp → raw topic captures in research-inbox). Use for any Imarflex research, planning, or topic-discovery task. Triggers on "market scan", "市場掃描", "trending category", "should we push X", "business focus", "monthly focus", "quarterly focus", "Q3 focus", "業務方向", "今個月要推", "gather signals", "signal sweep", "Monday signal", "research inbox", "topic ideas", "信號收集", "topic research", "what should we write next".
paths: Imarflex/online-marketing/**
allowed-tools: Read, Glob, Grep, Edit, Write, WebFetch, WebSearch
---

# Imarflex Research — Topic-Research Workflow

One skill, three stages. The full pipeline is described in
`Imarflex/online-marketing/topic-research-workflow.md`; this skill bundles the
operating manual for each stage. Read **only the reference for the stage you're
running** — each is a complete standalone manual:

| Stage | When | Manual |
|---|---|---|
| **Step 0 — Market scan** | Quarterly, or "which category should we bet on" questions | `references/market-scan.md` |
| **Step 1 — Business focus** | Drafting/updating monthly or quarterly focus docs | `references/business-focus.md` |
| **Step 2+3 — Signal gather** | Weekly Monday sweep + raw topic capture | `references/signal-gather.md` |

How the stages feed each other:

- Market scan output (the "Market context" block) goes **into** the
  business-focus doc — run Step 0 before drafting a quarterly focus.
- The business-focus doc decides which categories signal-gathering prioritizes.
- Signal-gather captures land in `Imarflex/online-marketing/research-inbox/`
  and become content-brief candidates.

## File locations & versioning

- Focus docs: `Imarflex/online-marketing/business-focus/yyyy-qx-focus.md` / `yyyy-mm-focus.md`
- Research captures: `Imarflex/online-marketing/research-inbox/YYYY-MM/<capture>.md` — month subfolder, create it if missing
- Reports/reviews: `Imarflex/online-marketing/reports/YYYY-MM/<report>.md` — same month-subfolder convention

## Shared rules (apply at every stage)

- **Pitch-stage aware**: client data (GSC, PostHog, WhatsApp, site search) is 🔒
  gated — run what's public, and output a "request from client" list for the rest.
  ⚠️-heavy fetch results are normal (SPA / 429 / DNS-dead).
- **LIHKG/Reddit sentiment is internal-only** — it informs research docs, never
  client-facing content.
- 小紅書/抖音 are opt-in only, via user-provided manual evidence.

Shared templates and source lists live alongside the stage manuals in
`references/` (e.g. `monthly-template.md`, `sources-public.md`,
`capture-template.md`, `seed-list-hk.md`).
