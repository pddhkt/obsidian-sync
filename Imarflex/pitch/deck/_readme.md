---
type: folder-readme
area: pitch
status: active
tags:
  - pitch
  - deck
---

# pitch/deck

The presentable HTML pitch deck for the Imarflex 伊瑪牌 digital-sales-strategy proposal (the **rendered** slides and original quotation sheet, not the source script).

## What lives here

- `Imarflex Pitch Deck.html` — 21-slide Cantonese deck; embedded JSON speaker notes (~20 min). Open in a browser.
- `Imarflex 報價單-print.html` — original A4 print quotation sheet for the strategy deck.
- `deck-stage.js` — reusable `<deck-stage>` web component (nav, speaker notes, auto-scale, print, thumbnail rail).
- `animations.jsx` — reusable React Stage/Sprite/easing animation library.
- `tokens.css` — Heritage Blue / HK-daily design tokens (shadcn-mapped).
- `assets/` — logo, color-palette, moodboard and social-carousel imagery embedded by the deck.
- `uploads/` — stray pasted images; nothing referenced (likely deletable).

## Naming convention

Assets use kebab-case (`social-carousel-airfryer-1.png`). Keep new assets kebab-cased. (Folder name itself has a space — flagged for rename to `pitch/strategy-deck/` in the structure audit.)

## Do NOT put here

- The markdown pitch **script** — that is `../../reference/pitch.md` (this deck renders it).
- Methodology / launch schedule / content direction decks — those live in sibling folders under `../` and do not use `deck-stage.js`.
- New quotation versions such as IMX-2026-Q02 — those live in `../quotation/`.
