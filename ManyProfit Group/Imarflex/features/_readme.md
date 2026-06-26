---
type: folder-readme
area: features
status: active
tags:
  - features
  - catalogue
---

# Features

One concise node per platform feature — the single source of truth powering the `_features.base` and `_addons.base` dashboards at the vault root.

## What lives here

- 31 feature-node `.md` files, one feature each (e.g. `checkout-airwallex.md`, `loyalty-system.md`).
- Each has YAML frontmatter (`type: feature`, `tier: base|addon`, `category`, `funnel-stage`, `decision`, `status`, `priority`, `phase`, cost fields, `metric`, `depends-on`) plus a Cantonese body: 解決咩問題 / 帶嚟咩好處 / how-it-works / pricing / pitch line.
- 23 `tier: base` (foundation) + 8 `tier: addon` (suggested upsells).

## Naming convention

- kebab-case, descriptive: `<feature-name>.md`. No dates. Flat — no subfolders.

## Conventions

- `status` must be one of: `shipped`, `in-progress`, `not-started`, `n-a` (anything else renders blank in the Base views).
- New nodes: copy the feature-node template in root `_index.md`.

## Do NOT put here

- The `.base` dashboard definitions live at the vault root (`_features.base`, `_addons.base`), not here.
- Funnel-stage notes belong in `funnel/` (this folder is only *linked from* them).
