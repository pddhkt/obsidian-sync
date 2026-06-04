---
type: website-design-system
status: draft
date: 2026-06-01
tags:
  - personal-website
  - design-system
  - website-strategy
---

# Website Design System — "Structures → Systems"

Design spec + interactive spec boards for the personal website. These are **design artifacts** (look & feel + the drawing/loop algorithms), not the production site. Open the `.html` files in a browser.

## Theme

> My work is one continuum: from designing physical **structures that must stand up** to engineering software **systems that must bear real-world use.** The site is presented like an engineer's drawing set — kept clean and modern, so it reads as a builder with an engineer's discipline, not a civil-engineering firm.

Engineering stays a **supporting thread**: the metaphor lives in the *chrome* (annotations, grid, sheet tags, title block, motion) and the Journey page, while *content* always leads with software & product.

## Visual language (Direction A — Technical Minimal, light)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FAFAF7` | off-white canvas |
| `--ink` | `#14140F` | text |
| `--muted` / `--muted2` | `#6A685E` / `#4A4840` | secondary text |
| `--rule` / `--rule2` | `#E3E1D8` / `#C9C7BD` | hairlines, borders |
| `--accent` | `#2D5BFF` | blueprint blue — one accent only |
| `--orbit` | `#B2AEA2` | faint structural lines |

- **Type:** IBM Plex Sans (body/display) + IBM Plex Mono (labels, metadata, code). Mono = the "engineer" tell.
- **Layout:** generous whitespace, hairline rules as structure, faint blueprint dot-grid for atmosphere, left-aligned, max ~1040–1080px.

## Motif kit

Dimension lines · annotation + leader · sheet numbers · title block · load-path spine · section markers · blueprint grid · CONCEPT stamp · spec chips.

## Voice — every page is a drawing sheet

| Page | Sheet | Drawing-sheet name |
|---|---|---|
| Home | A-00 | Title Block / Index |
| Journey | A-01 | As-Built |
| Projects | A-02 | Drawing Set |
| Writing | A-03 | Field Notes |
| Ideas | A-04 | Concept Sketches |
| Now | A-05 | Current Works |
| Uses | A-06 | Equipment Schedule |

## Motion — the scroll means "construction"

**The one draw primitive, reused everywhere:**
`L = path.getTotalLength(); strokeDasharray = L; strokeDashoffset = L → 0`.
Lines *plot on* (like a plotter drawing) rather than fade. Precise easing, no bounce. Always honor `prefers-reduced-motion`.

## Spec boards

- [[board-a00-home-hero|A-00 · Home]] — orbital spine hero (parametric orbits + rAF loop)
- [[board-a01-journey|A-01 · Journey]] — As-Built tower assembling on scroll
- [[board-a02-projects|A-02 · Projects]] — drawing-set sheets + system mini-diagrams
- [[board-a03-writing|A-03 · Writing]] — field notes + dimension-line dividers
- [[board-a04-ideas|A-04 · Ideas]] — concept sketches + CONCEPT stamp
- [[board-a05-now|A-05 · Now]] — current works
- [[board-a06-uses|A-06 · Uses]] — equipment schedule
- `theme-system.html` — the theme declaration board

## Related

- [[concept|Website concept & section content]] — the concept + per-section content (read this to sketch)
- [[index|Spec-board navigator]] — click through all 8 boards
- [[Personal/Personal Website/website-direction|Website direction]]
- [[Personal/Personal Website/open-questions|Open questions]]
