---
name: imarflex-client-reply
description: Imarflex 伊瑪牌 client Q&A reply playbook — drafts, revises, and PDF-exports the formal reply doc when the Imarflex client side (currently Derek Chong) sends follow-up questions on the 網站重建項目 quote / proposal. Use whenever the user pastes Imarflex client questions, asks to draft / amend / regenerate a 客戶報價問題回覆 doc, says "回覆 Derek", "answer Imarflex follow-up", "regenerate the Imarflex reply PDF", or works on any `Imarflex/客戶*` file. Covers the established doc structure (frontmatter + A/B-grouped Q sections + comparison tables + 想 confirm callouts + bottom 確認 list), the brand voice (Cantonese + EN technical, 坦白講 honest framing), the anti-patterns that have each been corrected once already (no self-criticism, no "啱啱建置完成 / 今日先 wrap 好" framing, no 上次 Q3 已提過 callbacks, no jargon without inline explanation, no overpromised expertise, no surfacing hour caps as constraints, no third-party referrals without explicit user authorization, no performative 唔扮專業 / 唔扮專家), and the pricing framings learned (flat AI-leveraged rates priced per campaign not per item, attach the 首 6 個月免費 trial to the all-in retainer not the bare maintenance one, always show comparison context, do not surface caps unprompted). Also covers regenerating the brand-styled PDF via chromium headless using the bundled script. Triggers on phrases like "draft Imarflex client reply", "回覆 Imarflex 客戶", "客戶報價問題", "Derek 跟進問題", "answer Imarflex follow-up", "regenerate the reply PDF", "客戶 Q&A doc", "更新報價回覆", or any prompt where the user is working inside `Imarflex/客戶*` files.
paths: Imarflex/**
allowed-tools: Read, Glob, Grep, Edit, Write, Bash, AskUserQuestion
---

# Imarflex Client Reply — Drafting, Revision, PDF Playbook

Captures everything learned across the 2026-05-18 → 2026-05-27 reply cycles to Derek Chong (Imarflex) on the 網站重建項目 quote. The goal: future incoming client questions can be turned into a polished, brand-aligned reply doc + PDF without re-discovering the same patterns.

## When to use this skill

- A client message arrives (WhatsApp / email) with follow-up questions on the quote / proposal
- User asks to draft, revise, amend, or PDF-export a `客戶報價問題回覆` doc
- User says "regenerate the PDF" / "update the reply" in an Imarflex context
- User is editing any `Imarflex/客戶*.md` file

For pure marketing copy (PDP, blog, social, email broadcasts), defer to the `imarflex-copywriter` agent instead — that's a different beast.

## End-to-end workflow

1. **Log the incoming questions** — save the client's verbatim message into `Imarflex/客戶跟進問題-YYYY-MM-DD.md`. Wrap each question in a blockquote so original wording is preserved (translations / paraphrases drift over time).
2. **Discuss approach with the user** — for each question, propose an angle (recommended direction + 1–2 alternatives). For *consequential* decisions (pricing / scope / capability claims), use `AskUserQuestion` with structured options. Don't ask about tone or format — those follow the established conventions.
3. **Draft the reply doc** — `Imarflex/客戶報價問題回覆-YYYY-MM-DD.md`, mirroring the structure below.
4. **Generate the PDF** — using the bundled `scripts/md-to-pdf.js` + chromium headless (see PDF section).
5. **Commit** — under an `Imarflex: ...` commit prefix (see Commit section).

## Reply doc structure

**Before drafting from scratch, read `Imarflex/客戶報價問題回覆-2026-05-26.md` and use it as your structural template.** Clone its shape — frontmatter, opening callout, A-cluster (and B-cluster if needed) numbered Q sections, in-section `想 confirm` callouts where relevant, bottom `需要 Imarflex 確認 / 回覆嘅事項` numbered list. The patterns below are the rules; that file is the worked example.

### Frontmatter (use exactly this shape)

```yaml
---
type: client-reply
project: Imarflex 伊瑪牌
date: YYYY-MM-DD
re: 報價跟進問題 — 第 N 輪
related: [[客戶報價問題回覆-previous-date]]
status: draft
---
```

The PDF generator reads `date:`, `re:`, and `project:` to populate the page header — so keep them populated.

### Body skeleton

```
# 報價問題跟進回覆 — YYYY-MM-DD

> 多謝跟進,以下逐條答覆。部分上次傾過嘅,呢度再講清楚少少;新嘅問題盡量答到實。
> 任何一條想再開會 walk-through 或 demo,隨時話聲。

---

## A1)<question topic, answered in headline form>

<answer body>

---

## A2)...

---

## B1)...     ← use B group only if there's a second cluster (e.g. 網站 vs 拓展服務)

---

## 需要 Imarflex 確認 / 回覆嘅事項

1. **A1 — ...:** <single concrete ask>
2. **A4 — ...:** <ask>
...
```

Group questions by topic cluster (A = 網站, B = 拓展 / 設計 / IT 等), number sequentially matching the client's original numbering. **H2 headline = the question answered in one line** (not the raw question — e.g. `A2)3.1 月度 Retainer 包唔包產品 / 內容更新?` already half-answers itself). Then: bolded opening one-liner (yes/no/depends), substance, closing `>` callout if needed. Use tables for comparisons; use `>` callouts sparingly.

## Voice & anti-patterns

This extends the base brand voice in `Imarflex/brand/voice-tone-of-voice.md` with Q&A-specific learnings. **Every anti-pattern below was corrected at least once in past rounds — none should recur.**

### Phrases — say this, not that

Glance-reference. These exact substitutions have each been corrected at least once. Use the right column verbatim — the left column reads worse to this client.

| ❌ Don't say | ✅ Say instead | Why |
|---|---|---|
| 唔扮專業 / 唔扮專家 / 唔扮全能 | **唔係呢方面嘅專家** / **唔係我哋強項** | Left reads as performative humble-brag; right is just a fact. **This one has slipped before — double-check before sending.** |
| 係我哋嘅疏忽 / 我哋大意 / 我哋忽略咗 | (just state the correction directly) | Self-criticism reads weak; clients want a confident partner |
| 啱啱建置完成 / 今日先 wrap 好 / 啱啱整好 | (just say it's ready / available) | Sounds rushed, undermines confidence in the product |
| 上次 Q3 已提過, 呢度重申 / 上次傾過 | (just restate cleanly, no callback) | Calling out that they missed it makes the client feel dumb |

### Voice (do)

- Cantonese 粵語 mixed with English technical terms inline — CMS, retainer, UTM, checkout, conversion, etc. — terms stay in English where that's how a HK reader would actually say them.
- Direct, no fluff, no marketing copy register.
- "**坦白講**" / "**老實講**" when entering honest mode (limits, scoping, pricing).
- Use 我哋 / Imarflex / 同事. Use second-person 你哋 only when addressing the client side directly.

### Anti-patterns (don't — each fixed already)

| Anti-pattern | Why | Do instead |
|---|---|---|
| Self-criticism: 「係我哋嘅疏忽」「我哋大意」 | Reads weak; clients want a confident partner, not someone who flagellates | Just state the correction / clarification directly |
| 「啱啱建置完成 / 今日先 wrap 好」framing | Sounds rushed, undermines confidence in product readiness | Just say it's ready / available |
| 「上次 Q3 已提過, 呢度重申」callbacks | Clients miss things; calling it out makes them feel dumb | Just restate cleanly, no callback |
| Jargon without inline explanation (Brand HQ, UTM, 301 redirect, CRO, retainer) | Decision-makers are non-technical | Use the term, then a short parenthetical or bullet sub-explanation. UTM in the 05-26 reply is a model example. |
| Surfacing hour caps as constraints ("最多 4–8 小時,超出加錢") | Reads transactional / nickel-and-diming | Frame as "包嘅日常用途" with concrete examples; only mention the cap if asked directly |
| Overpromising capability (claiming IT / packaging expertise we don't have) | Future scope creep + reputational risk | "坦白講... 唔係我哋強項" + clearly bound what we DO do |
| Third-party referrals (IT partner, packaging printer, etc.) | User has explicitly removed these | Do **not** offer to introduce / vet / coordinate partners unless the user has said it's OK for that particular service |
| Performative 唔扮專業 / 唔扮專家 / 唔扮全能 | Reads humble-brag, slightly defensive | Use 「唔係呢方面嘅專家」 — flatter, less performative |
| Adding 建議下一步 / next-step subsections inside every answer | Creates structural noise; the bottom 確認 list already does this job | Keep one consolidated 確認 list at the end of the doc |
| Dragging old options into a new answer (e.g. repeating Shopline Option A / B subsections) | Bloats unrelated context | Reference by [[wikilink]] or one line if needed; don't repeat the structure |
| Splitting bills nickel-and-dime style (per-leaflet, per-banner, per-POP) | Undermines the AI-leverage / speed positioning | Bundle by campaign at a flat rate (see Pricing below) |

### Honest-framing patterns (use these)

- **「坦白講」** opens an honest scope / limits beat. Signals "I'm leaving the sales register."
- **「唔係我哋強項」** for capability limits — gentle, not performative.
- **「我哋同 AI 一齊出 — 快、多稿、brand 一致」** — for any AI-assisted deliverable. Owns the leverage instead of hiding it.
- **「想 confirm 一樣嘢」** callout for in-section ask-backs (different from the bottom 確認 list — these are scoped to one Q).
- **「二揀其一,睇邊個方便」** — when offering the client genuine flexibility (e.g. self-serve admin vs. we-do-it).

## Pricing framings (established defaults)

Apply unless the user overrides on a specific question.

### 1. The free trial attaches to the meaningful retainer

The "首 6 個月免費" promo lives on the **全包 retainer (~HK$2,500/月)** — the one with blog + SEO + content — **not** on the bare HK$1,000/月 maintenance retainer. Free trials only matter where the client is undecided about value; bare maintenance isn't undecided.

### 2. AI-assisted services = flat rate, bundle by campaign

When pricing a service we deliver via AI tooling (design, copy variants, image generation), use a **flat per-campaign rate (currently HK$1,000 / campaign)** that bundles all related deliverables — banner + leaflet + POP + email header etc. — under one fee. Per-item pricing reads as nickel-and-diming and contradicts the speed/leverage story.

### 3. Always show comparison context

Whenever quoting a tier or retainer, include a comparison row/table (tier-vs-tier, bare-vs-bundled, manual-vs-bundled). The 3.1 retainer vs 全包 retainer table in the 2026-05-26 A2 is the canonical example. Single price points without comparison context read as "take it or leave it"; comparison context reads as "here's why this bundle makes sense."

### 4. Don't surface soft caps unprompted

For services with a soft cap (4–8h/月 修改), don't lead with the cap. List what's included with concrete examples (上架產品, 加 banner, 改文案, 加最新消息). Only acknowledge the cap if the client asks "what happens if we go over?" — and even then frame as "case-by-case 加 buffer hours" not "extra charges."

## AskUserQuestion — when to use

Use `AskUserQuestion` before drafting when a decision is **consequential** — i.e. it changes scope, price, or capability claim:

- Free vs. paid framing for a new feature (e.g. 門市 locator: included or Phase 2 add-on?)
- How aggressive to position on adjacent services (IT, design — bounded vs. open-ended vs. polite decline?)
- Pricing model (per-project quote vs. flat menu vs. retainer?)
- Whether to absorb a soft cap silently or surface transparently
- Whether to offer ongoing community management as a separate add-on

Don't ask about: tone preferences, table-vs-list, link wording, document file naming — those follow established convention.

When asking, default the user's recommended option first with `(Recommended)` suffix, and keep options ≤4. See the 2026-05-26 round for examples of how this was used.

## PDF generation

The reply doc is delivered to the client as a brand-styled A4 PDF.

### Tools required (confirmed available)

- `chromium` at `/usr/bin/chromium`
- Noto Sans CJK HK / TC fonts at `/usr/share/fonts/noto-cjk/`
- `node` (any recent version)
- `marked` library — already bundled inside `@google/gemini-cli` at `/home/lmt/.npm-global/lib/node_modules/@google/gemini-cli/node_modules/marked`. The bundled script references it directly — no `npm install` needed.

### Running it

The bundled `scripts/md-to-pdf.js` reads the markdown, strips the frontmatter, pulls `date:` / `re:` / `project:` from the frontmatter to populate the page header, converts the body to HTML wrapped in the brand-styled template, then writes the HTML. Chromium headless prints it to PDF.

```bash
SKILL_DIR="/home/lmt/Projects/personal/obsidian-sync/.claude/skills/imarflex-client-reply"
DATE="YYYY-MM-DD"
node "$SKILL_DIR/scripts/md-to-pdf.js" \
  "Imarflex/客戶報價問題回覆-$DATE.md" \
  "/tmp/imarflex-reply-$DATE.html"

chromium --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf="Imarflex/客戶報價問題回覆-$DATE.pdf" \
  "file:///tmp/imarflex-reply-$DATE.html"
```

The PDF intentionally has **no footer** (removed 2026-05-27 per client preference). Don't add one back unless the user explicitly asks.

### Verification

After generating, sanity-check page count and metadata with:

```bash
pdfinfo "Imarflex/客戶報價問題回覆-$DATE.pdf" | grep -E "Pages|Title"
```

A normal reply lands at 5–8 A4 pages. Anything significantly outside that range probably means the markdown has a structural issue worth re-reading.

### Brand palette (in the PDF CSS)

| Token | Hex | Use |
|---|---|---|
| Heritage Blue | `#0F2E4C` | H1 + H2 + table header + `<strong>` |
| Heritage Blue 2 | `#1B4068` | H3 + links + table header right border |
| Rice White | `#F7F4ED` | H2 background + blockquote / callout background + pre background |
| Clay Beige | `#E7DFC8` | Code chips + blockquote left border + `<hr>` |
| Steam Grey | `#C9D3DA` | Reserved, currently unused |
| Soft Charcoal | `#2A2D31` | Body text |
| Hairline | `#D7D0BC` | Table cell borders |

Fonts: Noto Sans CJK HK for body, Noto Serif CJK HK for H1 / H2 / brand line.

## File naming conventions

- Questions log: `Imarflex/客戶跟進問題-YYYY-MM-DD.md`
- Reply doc: `Imarflex/客戶報價問題回覆-YYYY-MM-DD.md`
- Reply PDF: `Imarflex/客戶報價問題回覆-YYYY-MM-DD.pdf`

Use `YYYY-MM-DD`. Questions and reply docs cross-link via `related:` in frontmatter and inline `[[wikilinks]]`.

## Commit conventions

Match the existing log (`git log --oneline -- Imarflex/`):

| Pattern | Use for |
|---|---|
| `Imarflex: add YYYY-MM-DD client follow-up Q&A reply + PDF` | Initial drop of a new round |
| `Imarflex: amend YYYY-MM-DD client reply per review` | Multi-point revisions |
| `Imarflex: tighten <section> in YYYY-MM-DD client reply` | Small targeted fixes (e.g. tightening B1+B2) |
| `Imarflex: remove footer from YYYY-MM-DD client reply PDF` | PDF-only changes |

When staging, name files explicitly: `git add "客戶報價問題回覆-YYYY-MM-DD.md" "客戶報價問題回覆-YYYY-MM-DD.pdf"`. **Do not** `git add -A` — there's usually unrelated Personal/* work in the vault.

Include the `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>` trailer.

## Canonical references

Read these when context is needed:

- `Imarflex/客戶報價問題回覆-2026-05-18.md` — first-round reply. Examples: combined SEO+blog framing, quarterly→monthly cost breakdown, 301 redirect inline explanation, Shopline vs new platform comparison table.
- `Imarflex/客戶報價問題回覆-2026-05-26.md` — second-round reply (canonical voice + structure reference). Examples: custom CMS framing, all-in retainer free trial, UTM inline explanation, honest IT/design positioning, per-campaign design pricing, login credentials in code chips.
- `Imarflex/客戶跟進問題-2026-05-26.md` — questions-log format with the decisions table mapping each Q to the chosen angle.
- `Imarflex/brand/voice-tone-of-voice.md` — base brand voice (this skill extends it for Q&A).
- `Imarflex/pitch/deck/Imarflex 報價單-print.html` — the original quote document; useful when the client references a specific line item (e.g. "3.1 月度 retainer") and you need to ground the answer in what was actually quoted.
- `.claude/agents/imarflex-copywriter.md` — for marketing copy work, distinct from Q&A replies.
