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

This folder tracks the sales-oriented content strategy in a way that can be counted later: assumptions, topic types, sales purposes, and one post record per content item.

> [!info]
> Markdown notes are the source of truth. [[../_sales-content.base|Sales Content Base]] is only the dashboard view for filtering and counting.

## What this system answers

| Question | Where to look |
|---|---|
| What assumptions are we making? | [[assumptions]] |
| How many topic types do we use? | [[topic-types]] |
| How many sales purposes do we track? | [[sales-purposes]] |
| What posts have been planned / drafted / published? | [[../_sales-content.base]] or [[posts/_readme]] |
| Which topic type supports which sales purpose? | [[topic-types]] |
| Which posts should get ad support? | Post records in [[posts/_readme]] |

## Current structure

| Folder / file | Purpose |
|---|---|
| [[assumptions]] | Strategy assumptions, evidence level, and how to validate them |
| [[topic-types]] | 8 repeatable content topic types |
| [[sales-purposes]] | 6 sales purposes used for tracking |
| [[topic-sales-matrix]] | Clear mapping from topic type to sales purpose, IG example, FB example, CTA, and ad fit |
| [[social-post-plan-2026-06]] | Actual June IG / FB social post schedule |
| [[social-post-plan-2026-07]] | July IG / FB schedule (IFQ-22R + ICF-140R go-live kits) |
| [[go-live-kits/_readme]] | Full multi-channel content kits (blog + IG + FB + Reel + Story + image prompts) |
| [[go-live-kits/production-tracker-2026-07]] | 10-step production checklist + GPT-image asset register |
| [[production-volume-targets-2026-06]] | Required counts for signals, topic ideas, campaign topics, social posts, and ad candidates |
| [[production-timeline-gantt-2026-06]] | Mermaid Gantt timeline from setup to monthly review |
| [[post-card-template]] | Template for one content item |
| [[first-cycle-walkthrough-2026-06]] | First dry run from topic selection to production timeline and missing-input review |
| [[posts/_readme]] | Instructions for post records |
| [[../_sales-content.base]] | Obsidian Base dashboard grouped by status, channel, topic type, sales purpose, and ad support |

## Operating rule

Every content item should have one post record before production starts. If it has no clear `topic-type`, `sales-purpose`, `destination`, and `primary-cta`, it should not be produced yet.

## Minimal weekly workflow

1. Pick one priority product/category from [[../business-focus/_readme]].
2. Choose one topic type from [[topic-types]].
3. Choose one sales purpose from [[sales-purposes]].
4. Create a post record using [[post-card-template]].
5. Produce the channel outputs: blog, IG, FB, Reel, Story, or ad.
6. Update `status`, `published-url`, and KPI fields after publishing.
