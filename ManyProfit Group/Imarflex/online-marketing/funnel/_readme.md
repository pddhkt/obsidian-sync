---
type: folder-readme
area: funnel
status: active
tags:
  - funnel
  - journey
---

# Funnel

The 6 customer-journey funnel-stage notes for the Imarflex pitch — each stage mapped to a demo URL, target KPI, and the features that serve it.

## What lives here

- `1-awareness.md` → `2-interest.md` → `3-consideration.md` → `4-purchase.md` → `5-repeat.md` → `6-advocacy.md`: one note per funnel stage (bilingual 中/EN).
- Each note carries frontmatter (`type: funnel-stage`, `order`, `iframe-url`, `expected-impact`), a mermaid funnel diagram highlighting the current stage, a "what we built" summary, and feature links grouped by priority (🔒 Must-have / 💡 Suggested / 🟡 Decisions / 🟠 Add-ons).

## Naming convention

`{order}-{stage-en}.md`, lowercase, ordered 1–6. Keep the `order` frontmatter in sync with the filename prefix.

## Do NOT put here

- Feature spec notes → those live in `../features/` (this folder only *links* to them via `[[feature-name]]`).
- The master strategy doc → that is `../reference/internal-master.md`; funnel notes reference its sections, they do not copy it.
