---
type: sales-content-system
status: active
area: online-marketing
tags:
  - online-marketing
  - sales-content
  - content-tracking
---

# Sales Content System

This folder tracks the sales-oriented content strategy in a way that can be counted later. Two halves: **`_system/`** holds the timeless definitions (assumptions, taxonomies, templates); **`cycles/`** holds one folder per monthly production cycle (plan, post records, shipments, overview).

> [!info]
> Markdown notes are the source of truth. [[../_sales-content.base|Sales Content Base]] is only the dashboard view for filtering and counting. Platform / week / status are frontmatter fields the Base reads — folders only encode the month.

## What this system answers

| Question | Where to look |
|---|---|
| What assumptions are we making? | [[_system/assumptions\|assumptions]] |
| How many topic types do we use? | [[_system/topic-types\|topic-types]] |
| How many sales purposes do we track? | [[_system/sales-purposes\|sales-purposes]] |
| What posts have been planned / drafted / published? | [[../_sales-content.base]] (all cycles) |
| What happened in month X? | `cycles/yyyy-mm/_overview.md` (plan → shipments → results → findings) |
| Which topic type supports which sales purpose? | [[_system/topic-sales-matrix\|topic-sales-matrix]] |

## Current structure

| Folder / file | Purpose |
|---|---|
| [[_system/_readme\|_system/]] | Timeless definitions: [[_system/assumptions\|assumptions]], [[_system/topic-types\|topic-types]], [[_system/sales-purposes\|sales-purposes]], [[_system/topic-sales-matrix\|topic-sales-matrix]], [[_system/post-card-template\|post-card-template]] |
| [[cycles/_readme\|cycles/]] | One folder per monthly cycle: `_overview.md` + plan + targets + `posts/` |
| [[cycles/2026-06/_overview\|cycles/2026-06/]] | June cycle — 4 weekly campaigns (rice cooker, air fryer, fan cleaning, warranty) |
| [[cycles/2026-07/_overview\|cycles/2026-07/]] | July cycle — IFQ-22R + ICF-140R go-live |
| [[go-live-kits/_readme\|go-live-kits/]] | July shipment kits + [[go-live-kits/production-tracker-2026-07\|production tracker]] (future kits go in `cycles/yyyy-mm/kits/`) |
| [[../_sales-content.base]] | Base dashboard grouped by status, channel, topic type, sales purpose, and ad support |

## Operating rule

Every content item should have one post record before production starts. If it has no clear `topic-type`, `sales-purpose`, `destination`, and `primary-cta`, it should not be produced yet.

## Minimal weekly workflow

1. Pick one priority product/category from [[../business-focus/_readme]].
2. Choose one topic type from [[_system/topic-types|topic-types]].
3. Choose one sales purpose from [[_system/sales-purposes|sales-purposes]].
4. Create a post record in `cycles/yyyy-mm/posts/` using [[_system/post-card-template|post-card-template]].
5. Produce the channel outputs: blog, IG, FB, Reel, Story, or ad.
6. Update `status`, `published-url`, and KPI fields after publishing; reflect shipments in the cycle's `_overview.md`.
