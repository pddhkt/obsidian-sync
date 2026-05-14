---
name: imarflex
description: Imarflex 伊瑪牌 project operating manual — vault map, feature catalogue, decision states, 6-stage funnel, add-on combos, brand deliverables. Use when working anywhere in Imarflex/, asking about base plan vs add-ons, querying feature status, adding or updating feature/decision/brand nodes, or referencing the project's pitch / internal-master / add-ons-discussion docs. Triggers on "Imarflex", "伊瑪牌", "imarflex feature", "add a feature", "base plan", "add-on combo", and any specific feature name (checkout-airwallex, parts-finder, reviews-system, ai-chatbot, loyalty-system, referral-program, etc.).
paths: Imarflex/**
allowed-tools: Read, Glob, Grep, Edit, Write
---

# Imarflex Project — Operating Manual

This is the D2C site rebuild + brand digital strategy project for Imarflex 伊瑪牌 (HK home appliance brand, 50-year heritage, ~200 SKUs migrating off Shopline).

## Vault map

```
Imarflex/
├── _index.md                ← project home + master funnel mermaid
├── _features.base           ← 32 feature nodes (DB view)
├── _addons.base             ← 9 add-on subset
├── _open-questions.base     ← decisions tracker
│
├── features/                ← one node per feature
├── funnel/                  ← 6 stage notes with per-stage mermaid + feature lists
├── brand/                   ← voice + visual + content + social-samples/
│   ├── _deliverables.base
│   └── social-samples/{product,lifestyle,carousel}/
├── decisions/               ← open questions / stack decisions
├── reference/               ← long-form docs (do not fragment these)
│   ├── pitch.md
│   ├── internal-master.md
│   ├── add-ons-discussion.md
│   └── funnel-demo-spec.md
└── canvas/                  ← visual feature ↔ funnel maps
```

Reference docs are the **single source of truth** for narrative content. Nodes link into them; do not duplicate prose.

## Feature frontmatter schema

Every file in `features/` has this frontmatter:

```yaml
type: feature
tier: base                # base | addon
category: commerce        # commerce | conversion | retention | content | ops
funnel-stage: [purchase]  # awareness | interest | consideration | purchase | repeat | advocacy
decision: must-have       # must-have | suggested | decision-needed | confirmed | declined
priority: high            # high | medium | low
phase: 1                  # 1 (build) | 2 (migration) | 3 (retainer)
setup-cost-hkd: 0
monthly-cost-hkd: 0
depends-on: []            # list of other feature filenames (without .md)
metric: ""                # expected business metric
best-phase: ""            # add-ons only: when to add (e.g. "Q2-Q3")
```

When adding a new feature: use this exact schema, name the file in kebab-case, and link it from the relevant funnel-stage note.

## Decision legend

The `decision` field tracks who decides what:

| Value | Icon | Meaning |
|---|---|---|
| `must-have` | 🔒 | Foundation. Agency-decided. Will be built. |
| `suggested` | 💡 | We propose — **client business choice** |
| `decision-needed` | 🟡 | Pick between alternatives (e.g. Meilisearch vs Algolia) |
| `confirmed` | ✅ | Client said yes |
| `declined` | ❌ | Client said no for this engagement |

**Suggested ≠ optional.** Suggested = the answer depends on Imarflex's business model. Examples: trade-in (do they want to support it?), parts-finder (do they have full SKU data?), stock-display (operationally feasible?). We can build any of them — client tells us which.

When client signs off a `suggested` item → flip to `confirmed`. The Bases views update automatically.

See `references/decision-flow.md` for the full decision lifecycle.

## Current counts (snapshot)

- **32 features total:** 23 base + 9 add-ons
- **11 must-have** (foundation), **20 suggested** (client choice), **1 decision-needed** (search engine)
- **6 funnel stages** with KPIs (Awareness → Interest → Consideration → Purchase → Repeat → Advocacy → loops back)
- **15 brand deliverables** in `brand/` (6 voice drafted + 7 visual placeholders + 2 content + social-samples/)

## The 6-stage funnel + KPIs

| Stage | KPI target | Demo URL |
|---|---|---|
| 1. 認知 / Awareness | Organic +50%, brand search +30% | `/blog` |
| 2. 興趣 / Interest | Bounce -20%, session +40% | `/` |
| 3. 考慮 / Consideration | Add-to-cart +25% | `/products/iaf-30e-air-fryer` |
| 4. 購買 / Purchase | CR +20-40%, abandonment -15% | `/cart` |
| 5. 重複 / Repeat | Repeat 0% → 15-20%, LTV +50% | `/parts-finder` |
| 6. 倡導 / Advocacy | Referral 5-10% of new customers | (reviews 區) |

Stage 6 loops back to Stage 1 via reviews + referral + UGC.

## Stack snapshot

- **Frontend:** Next.js 15 App Router
- **Backend / CMS / Commerce:** Payload v3
- **DB:** PostgreSQL (Supabase / Neon)
- **Storage:** Cloudflare R2
- **Payment:** Airwallex (Drop-in)
- **Analytics:** PostHog
- **Search:** Meilisearch Cloud 🟡 (vs Algolia — pending decision)
- **Email:** Resend + Resend Audiences 🟡
- **Hosting:** Vercel (frontend) + Railway/Fly.io (backend)

Full details: `reference/internal-master.md` §3 Stack, and `references/stack-snapshot.md`.

## Add-on combos (4 client packages)

When client asks "which add-ons should I take?" map them to one of these:

| Combo | Theme | Add-ons | First-mo investment |
|---|---|---|---|
| **A** | Quick wins (Q4 ready) | Blog Standard + Reviews + Referral + AI Chatbot | ~$26.5k + $4k/mo |
| **B** | Long-term assets | Blog Aggressive + Reviews + Loyalty + SEO pack | ~$23k + $5.5k/mo |
| **C** | Reduce internal load | AI Chatbot + AI Copywriting + Reviews | ~$27.5k + $0.8k/mo |
| **D** | Budget-tight | Blog Light + Reviews | ~$8k + $2k/mo |

Full numbers + variations: `reference/add-ons-discussion.md` §組合.

## Operations — common tasks

### Adding a new feature

1. Decide tier (base / addon), category, funnel-stage, decision.
2. Create `features/<kebab-case-name>.md` using the frontmatter schema above.
3. Add a wikilink from the relevant `funnel/N-stage.md` under the matching decision section.
4. If it depends on another feature, fill `depends-on:`.
5. The `_features.base` and `_addons.base` Bases pick it up automatically (no view edit needed).

See `references/feature-template.md` for a copy-paste starter.

### Adding a decision / open question

1. Create `decisions/<short-question>.md` with `type: decision`, `status: open | decision-needed | resolved`, `area`, `recommendation`, `blocks` (list of features it blocks).
2. The `_open-questions.base` will pick it up.

### Flipping a decision state

Edit the feature/decision frontmatter directly. Bases re-render on next view.

## Cross-tool delegation

This skill is **inline reference**. For any task that produces *copy* — PDP, email, blog post, social caption, image-gen prompt, crisis statement, CS reply — delegate to the **`imarflex-copywriter` agent** (lives in `.claude/agents/`).

The copywriter has the full brand voice (tone, anti-patterns, Do/Don't, PDP framework, crisis playbook, product-naming rules), color palette tokens, and the 5 blog clusters preloaded. It returns brand-aligned copy without polluting the main session with voice rules.

How to invoke:

```
Use the imarflex-copywriter agent to write a PDP for IRC-20IH.
```

Or simply: ask for the copy — the agent's description auto-triggers on PDP / email / blog / caption / image-prompt / crisis requests.

## Reference docs (don't fragment)

These remain as long-form narrative — link to them from nodes:

- `reference/pitch.md` — client-facing pitch
- `reference/internal-master.md` — full internal spec
- `reference/add-ons-discussion.md` — 8 add-ons with pricing + 4 combos
- `reference/funnel-demo-spec.md` — HTML/iframe demo spec for pitch deck

## Additional reference files in this skill

- `references/feature-template.md` — copy-paste new feature template
- `references/decision-flow.md` — lifecycle: suggested → confirmed / declined
- `references/stack-snapshot.md` — stack + open stack decisions

## What this skill does NOT do

- Does not write brand-aligned copy → use `imarflex-copywriter` agent
- Does not run the Bases views → that's Obsidian's job
- Does not modify reference docs (internal-master, pitch, etc.) without explicit user permission
