---
type: aeo-audit
status: complete
audited-file: ../../../blog/samples/buying-guide-rice-cooker-2026-ih-vs-pressure.md
audited-date: 2026-05-30
auditor: imarflex-aeo-auditor
stage: pitch
verdict: rewrite-needed-for-AEO-compliance
total-score: 8/15
dq-flag: borderline-axis-3
tags:
  - online-marketing
  - aeo
  - audit
---

# AEO Audit Report — 2026 點揀電飯煲 (Buying Guide)

**File audited:** [[buying-guide-rice-cooker-2026-ih-vs-pressure]]
**Audited:** 2026-05-30
**Auditor:** `imarflex-aeo-auditor`
**Stage:** Pitch (no client-side data; baseline audit only)

> [!warning] Verdict
> ❌ **Rewrite needed for AEO compliance — Total score 8/15** + Axis 3 DQ-borderline flag.
>
> Content is editorially strong (brand voice ✅, SEO keyword targeting ✅, factual structure ✅) but **does not meet 2026 AEO standards**. Predates the `imarflex-aeo` skill. Demonstrates exactly the kind of gap the new auditor surfaces.

## Pre-flight checks (DQ triggers)

| Check | Status |
|---|---|
| LIHKG / Reddit / 論壇 source | ✅ Pass — no forum sources |
| Fabricated citation (claim without URL/date) | ⚠️ Partial — multiple unsourced numbers ("50 年", "日本家庭 IH 滲透率 80%+", "鍋身 >2mm") |
| Health/safety + generic author | 🚨 **Borderline DQ** — see Axis 3 + 糖尿病 mention |
| False schema fact | N/A — no schema in source markdown |

## 5-axis score

| Axis | Score | Reasoning | Fix |
|---|---|---|---|
| **Passage-Q&A structure** | **2/3** | Title is question-form ✅. TL;DR block provides citation-friendly answers ✅. But every H2 is statement-form (eg「1. 加熱方式 — 真正影響飯口感嘅關鍵」), and first sentence of each section is narrative, not ≤ 50 字 direct-answer. | Rewrite every H2 as user-phrased question. First sentence under each H2 = ≤ 50 字 direct-answer. Add FAQ section H2 「常見問題」+ 5 Q&A pairs at end. |
| **Schema markup** | **1/3** | No structured data declared in source markdown. (Schema lives in HTML output, not assessable from markdown source alone — but the brief should specify schema spec.) | Add `schema-spec:` block to frontmatter. Specify: Article + Product (IRC-20IH) + FAQPage schema. Validate via Google Rich Results Test before deployment. |
| **Author identity + E-E-A-T** | **1/3** | No byline. Voice claims "Imarflex 50 年廚電經驗" (corporate) but no named individual author. | **Critical:** Client must provide named author with credential (Imarflex 產品經理 + 廚電 R&D background). Pitch-stage draft can use `⚠️ TBD` placeholder — but **production blocks here**. |
| **Statement-fact pairing** | **2/3** | Some numbers present ("2mm 起跳", "80%+ 滲透率") but most without source URL. One good outbound link to 消費者委員會. Pricing table dated "2026 Q1" ✅. | Add inline source URLs for: 「50 年」(Imarflex 公司歷史 page), 「日本家庭 IH 滲透率」(METI 或 industry research URL), 「鍋身 >2mm」(Imarflex spec sheet — flag as internal testing). |
| **Freshness signal** | **2/3** | Frontmatter has `created: 2026-05-14` ✅. No `updated_at`, no review cadence visible in body. | Add `dateModified` to frontmatter + body footer「最後更新:2026-MM」+「下次 review:2026-MM」. Set quarterly review cadence. |

**Total: 8 / 15**

## DQ flag (Axis 3) — detailed assessment

**Trigger:** Per `audit-scorecard.md` auto-DQ rule: 「Axis 3 = 1 + content involves medical/食療/safety angle」.

**Content review:**
- Section 4 contains: 「**無糖飯模式**(分離澱粉,糖尿病友適合)」
- This is **feature mention**, not medical recommendation. Borderline.
- Strict interpretation: ANY 糖尿病 mention + generic author = DQ. Conservative.
- Liberal interpretation: Feature exists for purpose X, not a health claim being made. OK to ship with named author.

**Decision:** Flag as **borderline DQ**. Two acceptable fixes:
1. **(Preferred)** Add named author with credential — clears Axis 3 to 3/3, neutralises DQ
2. **(Alternate)** Remove 糖尿病 reference and reframe as "為飲食控制人士設計" — neutralises by removing trigger content

## Specific issues + fixes (numbered)

### Issue 1 — H2 structure not AEO-aligned
- **Where:** All H2 sections (H1 OK as title)
- **Problem:** Statement form; first sentence is narrative not direct-answer
- **Fix:** Rewrite each H2 as `?`-suffix question. Move concrete answer to first sentence ≤ 50 字. Example:
  - ❌ `## 1. 加熱方式 — 真正影響飯口感嘅關鍵`
  - ✅ `## 邊種加熱方式最影響飯口感?`
    + first sentence: 「IH > 微壓 > 傳統電熱板。預算夠就直接揀 IH。」(≤ 50 字)
- **Owner:** copywriter

### Issue 2 — Missing schema spec
- **Where:** Frontmatter / output spec
- **Problem:** No schema declared
- **Fix:** Add to frontmatter:
  ```yaml
  schema-spec:
    - Article
    - Product (IRC-20IH)
    - FAQPage (5 Q&A pairs mirrored to FAQ section)
  ```
- **Owner:** copywriter (spec) + engineering (deployment)

### Issue 3 — Missing FAQ section
- **Where:** End of article
- **Problem:** No `## 常見問題` section → can't mirror to FAQPage schema → axes 1 + 2 both lose points
- **Fix:** Add FAQ H2 with 5 Q&A pairs. Mirror exact wording to FAQPage schema.
- **Owner:** copywriter

### Issue 4 — Generic / missing author byline
- **Where:** Article frontmatter + body byline
- **Problem:** `author:` field absent; voice attributes claim to corporate identity
- **Fix:** Client provides named author with role + credential + LinkedIn URL
- **Owner:** **CLIENT (Day-1 ask)** + copywriter integration

### Issue 5 — Unsourced statistical claims
- **Where:** Section 1 (「日本家庭 IH 滲透率 80%+」), Section 2 (「鍋身 >2mm 起跳」), opening (「Imarflex 1956 年由大阪工坊開始, 50 年廚電經驗」)
- **Problem:** Plausible but no inline source URL
- **Fix:** Add inline link or footnote citation per claim. For Imarflex-internal claims, label as「Imarflex internal data, 2026」
- **Owner:** copywriter

### Issue 6 — Borderline health-angle DQ
- **Where:** Section 4「無糖飯模式(分離澱粉,糖尿病友適合)」
- **Problem:** Touches medical/食療 angle + generic author = DQ trigger
- **Fix:** Either (a) add named author (preferred — neutralises Axis 3) or (b) remove 糖尿病 reference
- **Owner:** copywriter + client (depending on which fix)

### Issue 7 — Missing freshness signals
- **Where:** Frontmatter + body footer
- **Problem:** No `dateModified` / review cadence
- **Fix:** Add `dateModified: 2026-MM-DD` to frontmatter. Add body footer「最後更新:2026-MM」+「下次 review:2026-MM」(quarterly cadence)
- **Owner:** copywriter

## Day-1 client asks (extracted from audit)

- [ ] Named author with role + credential + LinkedIn URL (blocks Axis 3 = 3 + neutralises DQ)
- [ ] Imarflex 公司 history page URL for 「50 年」claim sourcing
- [ ] IRC-20IH real spec sheet for 「鍋身 厚度」claim sourcing
- [ ] Approval to label internal claims as 「Imarflex internal data, 2026」
- [ ] Backend platform confirmation (Shopline / Shopify / custom) for schema deployment route

## Sign-off

❌ **DO NOT PUBLISH AS-IS.** Return to copywriter with this 7-issue fix list. Re-audit after fixes; target ≥ 13/15.

## What this audit demonstrates (pitch use)

This blog was **published-ready by traditional SEO standards** (good keyword targeting, brand voice, factual structure, internal links, outbound citation). The 8/15 AEO score reveals the **delta from 2024-era SEO to 2026-era AEO**:

- Traditional SEO optimises for ranking
- AEO optimises for **citation by ChatGPT / Perplexity / Claude / Google AI Overviews**
- 76% → 38% citation/ranking decoupling means good SEO no longer guarantees AI visibility

The 7-issue fix list is what separates "ranks on Google" from "gets cited by AI engines". Both matter in 2026; only one of them was being built before this skill existed.

## Cross-references

- AEO rubric: [[../../../.claude/skills/imarflex-aeo/references/audit-scorecard|audit-scorecard]]
- Passage-Q&A guide: [[../../../.claude/skills/imarflex-aeo/references/passage-qa-rubric|passage-qa-rubric]]
- Schema templates: [[../../../.claude/skills/imarflex-aeo/references/schema-checklist|schema-checklist]]
- Auditor agent: [[../../../.claude/agents/imarflex-aeo-auditor|imarflex-aeo-auditor]]
