---
type: folder-readme
area: online-marketing
status: active
tags:
  - online-marketing
  - pitch
---

# pitch — Online Marketing Methodology pitch (rendered deliverable)

Client-facing pitch deck for Imarflex's "Online Marketing Methodology": the 7-step content/AEO workflow plus a 6-month SEO launch schedule. This is the **rendered output** (HTML + PDF), not strategy source notes.

## What lives here

- `Imarflex-Methodology-Pitch.html` (EN) + `-zhHK.html` — the methodology deck sources.
- `Imarflex-Launch-Schedule-zhHK.html` — 上線時間表 + 6-month SEO plan.
- `Imarflex-Content-Directions-zhHK.html` — 內容方向菜單 + 每週內容節奏 (8 content directions + weekly cadence; supersedes the month-batch Gantt story for content delivery). Planning source: `content-delivery-v2-doc-plan-2026-06-10.md`.
- `*-YYYY-MM-DD.pdf` — chromium-rendered PDF exports (current client copies; latest dated = authoritative).
- `image-prompts.md` — GPT-image prompt spec + naming/path rules for the deck imagery.
- `images/` — generated 16:9 hero PNGs (`imarflex-pitch-NN-<slot>.png`).

## Naming convention

`Imarflex-<DeckName>[-zhHK].html`; PDFs add `-YYYY-MM-DD`.

## Do NOT put here

The **earlier** sales-strategy deck (數碼銷售策略方案) lives in top-level `../../pitch/deck/`, with its source markdown in `../../reference/pitch.md`. Keep that lineage separate; only the *methodology* pitch belongs here. (Note: this folder is currently unlisted in `../_index.md` — register it there.)
