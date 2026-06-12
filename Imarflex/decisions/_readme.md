---
type: folder-readme
area: decisions
status: active
tags:
  - decisions
---

# decisions

Structured `type: decision` notes — the open questions and decisions-of-record for the build. This folder is what `_open-questions.base` scans (`file.inFolder("Imarflex/decisions")`), so a note only shows up in that dashboard if it lives here.

## What lives here

One `.md` per decision, named so feature nodes can link to it by basename (e.g. `decision-search-engine.md` ← `[[decision-search-engine]]`).

Required frontmatter (drives the Base columns):

```yaml
---
type: decision          # must be exactly "decision"
area: stack             # grouping column (stack / payment / commerce / online-marketing …)
status: decision-needed # open 🟠 | decision-needed 🟡 | resolved ✅
blocks: "[[feature-node]]"   # what this decision is holding up
recommendation: "…"     # our recommended answer
---
```

## Naming convention

- Decisions that a feature links to: match the wikilink basename (`decision-<slug>.md`).
- Standalone questions: `<area>-<slug>.md`.

## Do NOT put here

- The narrative rationale log for a whole sprint → that stays in `../reference/session-decisions-2026-05.md`. This folder holds the structured, one-per-decision records the Base reads.
