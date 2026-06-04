---
type: website-concept
status: draft
date: 2026-06-01
tags:
  - personal-website
  - website-strategy
  - concept
  - content
---

# Website Concept & Section Content

Everything we decided for the website, plus the **content of each section** — written so you can read it and sketch your own layouts from it. The visual system (colors, type, motifs, motion) lives in [[_index]]; the interactive spec boards are the `board-*.html` files (open [[index|the navigator]]).

> [!note] How to read this
> **Real** = drawn from your CV / experience notes. **[placeholder]** = invented copy to fill the layout — rewrite in your own voice. **[anonymized]** = client names hidden on purpose (see open decisions).

---

## 1. The concept in one line

> **Structures → Systems.** An ex-structural engineer who now builds software. The site is presented like an engineer's *drawing set* — clean and modern — so it reads as a builder with an engineer's discipline, not a civil-engineering firm.

Engineering is a **supporting thread**: the metaphor lives in the chrome (annotations, grid, sheet tags, title block, motion) and the Journey page, while content always leads with software & product.

## 2. Decisions we locked

| Decision | Choice |
|---|---|
| Primary goal | **Builder identity** (long-term), with a scroll-told journey + projects showcase |
| Site feel | **Portfolio + notebook** (polished case studies *and* a living writing stream) |
| App ideas | **Selectively summarized** — teaser concepts, no sensitive detail |
| Engineering background | **Supporting thread** (woven into the story, not a separate pillar) |
| About page | **No separate About** — the Journey page *is* the about story |
| CV & Contact | **Demoted to footer** + a home CTA (not in the top nav) |
| Extra pages | **/now** and **/uses** included in v1 |
| Language | **English only** for v1 |
| Visual direction | **Technical Minimal, light** (off-white, blueprint blue, hairlines) |
| Type | **IBM Plex Sans + IBM Plex Mono** (engineered feel; mono = the "engineer" tell) |

## 3. Sitemap & navigation

**Top nav (lean, 5 items):** `Home · Journey · Projects · Writing · Ideas`
**Footer:** CV (PDF) · Email · LinkedIn · GitHub · /now · /uses

| Sheet | Page | Drawing-sheet name | Job |
|---|---|---|---|
| A-00 | Home | Title Block / Index | Hook in 5s; signpost everywhere |
| A-01 | Journey | As-Built | The cross-discipline story, told on scroll |
| A-02 | Projects | Drawing Set | Curated case studies that prove execution |
| A-03 | Writing | Field Notes | Build notes, essays, product analysis |
| A-04 | Ideas | Concept Sketches | Summarized app-idea teasers |
| A-05 | Now | Current Works | What you're building/learning right now |
| A-06 | Uses | Equipment Schedule | Your stack & tools |

---

## 4. Section content

### A-00 · Home — Title Block / Index
**Job:** concise hub — who you are, what you build, where to go next.

**Hero**
- Kicker: `DEVELOPER · BUILDER`
- Headline: **"Engineering judgment, applied to software."**
- Sub: "Ex-structural engineer. I turn messy problems into systems that stand up." *[placeholder — rewrite in your voice]*
- CTAs: `See the journey →` · `View projects`
- Stack chips: TypeScript · React / Next.js · React Native · Cloudflare · Convex · Python
- **Signature visual:** the **orbital spine** — a diagonal load-path line (Structures) crossed by nested orbits (Systems); the orbiting nodes *are* the nav (Journey, Projects, Writing, Ideas).

**What I build** (4 capability cards)
- Frontend — production React / Next.js & React Native interfaces
- Full-stack & data — Python, Laravel, Convex, Supabase, SQL
- Cloud & infra — edge-first systems on Cloudflare Workers
- Product & UX — idea & Figma flows to a shipped product

**Selected projects** (2–3 featured cards → Projects): Buddy Ride · Contact-centre suite · Yeslend
**The short version** (about blurb → Journey): "I started as a structural engineer designing 39-storey towers, then taught myself to ship software, co-founded two ventures, and now build enterprise products at CTINT." *[real basis — tighten in your voice]*
**Latest writing** (2–3 post links) · **Contact CTA** + footer

---

### A-01 · Journey — As-Built
**Job:** the centrepiece. Your career as a structure that assembles on scroll — foundation (engineering) up to the roof (now).
**Signature interaction:** scroll-driven; a column line (load path) tracks scroll progress, each floor plots on as you reach it.

Milestones (all **real**):

| Level | What | Role · Years | Detail |
|---|---|---|---|
| Foundation | **Structural Engineering — CM Wong & Associates** | Structural Engineer · 2018–2021 | Designed 39-storey residential towers; ETABS / SAFE / SADS modelling, wind & RC design |
| L1 | **Fractal Technologies — Yeslend + automation** | Co-founder · 2022–2025 | Yeslend fintech loan site (Next.js, Payload CMS); Python tooling that auto-generates SAP2000 structural models |
| L2 | **Buddy Ride — cross-border ride-sharing** | Co-founder · 2024–2025 | HK ↔ Macau; Next.js web + React Native apps on Cloudflare Workers & Convex |
| L3 | **Contact-centre suite — CTINT** | Frontend Developer · 2025–present | Enterprise CDSS: TTS portal w/ version control, email auto-reply, customer tagging |
| Roof | **Now** | Developer / Builder | Engineering judgment, applied to software — still building upward |

> Open: **narrative direction** — *descend from Now → Foundation* vs *build up from Foundation → Now* (see §5).

---

### A-02 · Projects — Drawing Set
**Job:** curated case studies. Each project = a "drawing sheet" card with a mini title block + a small system diagram that draws on.

Lead set:
- **Buddy Ride** — cross-border ride matching & real-time trips. Stack: Next.js · React Native · Cloudflare Workers · Convex. *Outcome: [placeholder]*
- **Contact-centre suite** — TTS portal + email auto-reply + customer tagging for **[a CRM platform / anonymized client]**. Stack: React · TypeScript · CDSS. *Outcome: [placeholder]*
- **Yeslend** — fintech loan platform UI + site. Stack: Next.js · Payload CMS. *Outcome: [placeholder]*
- **Structural automation** — auto-generate structural models. Stack: Python · SAP2000. *(reinforces the engineer-builder thread)*

Per case study: context/problem · your role · approach · stack · outcome · visuals.

---

### A-03 · Writing — Field Notes
**Job:** the notebook. Entries with mono datestamps + category tags, separated by dimension-line dividers.

Starter entries (**titles are real-adjacent placeholders** — tied to your actual work):
- "Automating structural calculations with Python + SAP2000" — *Build notes*
- "Shipping a cross-border app on Cloudflare + Convex" — *Essay*
- "Designing a TTS portal with version control" — *Product*
- "From load paths to data flows: what civil engineering taught me about software" — *Essay*

> Decide first 3 themes + publishing rhythm (see [[Personal/Personal Website/open-questions|open questions]]).

---

### A-04 · Ideas — Concept Sketches
**Job:** show you generate & shape ideas, without giving everything away. Looser, "sketchy" cards with a CONCEPT stamp + status tag.
**Framing line:** "Explorations, not commitments."

- **Pet Social Vlog** — a social + vlog space for pet owners. Status: *Exploring*
- **Cross-Border Car Hailing** — cross-border ride-hailing concept. Status: *Concept*
- **Your next idea** — placeholder. Status: *Open*

> Teaser one-liners only — no sensitive detail.

---

### A-05 · Now — Current Works
**Job:** a short, honest "workbench" snapshot with a "last updated" date and one gently pulsing "active" marker.

Current items *[placeholders — edit freely]*:
- Building enterprise contact-centre products at CTINT
- Prototyping app ideas (see Concept Sketches)
- Learning: deeper motion / GSAP + edge architectures

---

### A-06 · Uses — Equipment Schedule
**Job:** your stack rendered as an engineering equipment/materials schedule (TAG · ITEM · ROLE · NOTES), rows tally in on load.

All **real**, grouped:
- **Frontend** — TypeScript, React, Next.js, React Native
- **Backend & Data** — Python, PHP, Laravel, Convex, Supabase, SQL
- **Cloud** — Cloudflare Workers
- **Tools & AI** — Figma, GitHub, LangChain, Claude Code, Cursor
- **Engineering (legacy)** — AutoCAD, SAP2000, ETABS, SADS, MATLAB

Languages: Cantonese · Mandarin · English.

---

## 5. Open decisions (still yours to make)

- [ ] **Journey narrative:** descend from Now → Foundation, or build up from Foundation → Now?
- [ ] **Brand name:** "Jack", "Leung Man Hin", or both?
- [ ] **Domain name.**
- [ ] **Client confidentiality:** can real client names appear, or stay anonymized?
- [ ] **Build approach:** static site from Markdown, CMS-backed, or custom app?
- [ ] **Contact method:** email / LinkedIn / form?
- [ ] **Writing:** first 3 themes + realistic publishing rhythm.
- [ ] **Measurable outcomes** to add to each project (numbers where possible).

## Related
- [[_index|Design system]] — theme, color/type tokens, motif kit, motion primitive
- [[index|Spec-board navigator]] — click through all 8 boards
- [[Personal/Personal Website/website-direction|Website direction]] · [[Personal/Personal Website/open-questions|Open questions]] · [[Personal/Personal Website/profile/master-profile|Master profile]]
