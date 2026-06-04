---
type: project-index
project: Pet Social Vlog
status: idea
date: 2026-05-22
tags:
  - app-idea
  - pet
  - social
  - fitness
aliases:
  - Pet Setlog App
  - Pet Vlog Walking App
---

# Pet Social Vlog — Project Home

> A daily companion app for active urban dog parents. Two sharpened value props: **routine accountability** for the walk + **a curation engine** for the photos. See [[value-props]].

---

## 🎯 One-line

> A daily companion for active urban dog parents that turns the walk you were going to take anyway into a routine you actually keep, and the photos you were going to take anyway into a video worth watching.

Lead segment, positioning, and sub-segment expansion order: [[concept]].
Two sharpened value props in detail: [[value-props]].
Shareable one-file product and business summary: [[shareable-summary]].

---

## 🧱 Where things live

```
Pet Social Vlog/
├── _index.md           ← you are here
├── concept.md          ← positioning, lead segment, three pillars
├── value-props.md      ← three value props in detail
├── shareable-summary.md ← single-file product + business brief
├── roadmap.md          ← full vision + v1.0 → v2.0 phasing
├── mvp.md              ← v1.0 — smallest useful loop
├── data-model.md       ← all entities in one place
├── README.md           ← raw concept dump (legacy, kept as source)
│
├── features/           ← one node per feature (11 nodes)
├── retention/          ← engagement & habit mechanics — discussion
├── decisions/          ← open product questions
└── visual/             ← mockups + visual concept notes
```

---

## 🏛 Three pillars

The product has three pillars sharing one engine. See [[concept]] and [[value-props]].

| Pillar | Job | Core feature |
|---|---|---|
| **1. Routine Accountability** | Walk your dog enough | [[features/breed-aware-activity-targets]] |
| **2. Curation Engine** | Make the photos watchable | [[features/auto-vlog-export]] |
| **3. Health Intelligence** | Feed right · know they're healthy | [[features/food-and-nutrition-tracking]] |

---

## 🧩 Features (11 nodes, grouped by pillar)

### Pillar 1 — Routine

| Feature | Ships in | Notes |
|---|---|---|
| [[features/pet-profile]] | v1.0 | Identity anchor |
| [[features/breed-aware-activity-targets]] | v1.0 | The Pillar 1 wedge |
| [[features/pet-walking-activity]] | v1.0 | GPS walks |
| [[features/daily-pet-log]] | v1.0 | Timeline base |
| [[features/media-capture-modes]] | v1.0 | Layered capture |
| [[features/privacy-controls]] | v1.0 | Visibility gate |

### Pillar 2 — Curation

| Feature | Ships in | Notes |
|---|---|---|
| [[features/auto-vlog-export]] | v1.0 | The Pillar 2 deliverable |

### Pillar 3 — Health

| Feature | Ships in | Notes |
|---|---|---|
| [[features/food-and-nutrition-tracking]] | v1.2 → v1.4 | Food log → vet PDF → Diet Library |

### Cross-pillar

| Feature | Ships in | Notes |
|---|---|---|
| [[features/social-sharing]] | v1.1 | Friends + household |
| [[features/friends-walking-chart]] | v1.1 → v1.4 | Avatar list → House-to-pet |
| [[features/dog-walker-mode]] | v2.0 | Service tier |

> [!tip] Full vision + version sequencing
> See [[roadmap]] for what's in each release, success criteria per phase, and the explicit list of things we don't build.

---

## 🔁 Retention — how do we make people come back?

The user's central question. Five loops to play together:

1. [[retention/_index|Overview — the 3 loops + framework]]
2. [[retention/1-hook-model|Hook Model applied to a pet app]]
3. [[retention/2-daily-loop|Daily loop — streaks, triggers, variable rewards]]
4. [[retention/3-social-loop|Social loop — leaderboards, groups, FOMO]]
5. [[retention/4-progression-loop|Progression loop — pet character, collections, milestones]]
6. [[retention/5-ethical-guardrails|Ethical guardrails — addiction vs. healthy habit]]

> [!tip] Start here for the discussion
> Read [[retention/_index]] for the map, then [[retention/2-daily-loop]] is the highest-leverage one for an MVP.

---

## 📐 Data model

All entities consolidated in [[data-model]]:

User · Pet · Daily Log Entry · Walk Activity · Friend Distance Chart · Dog Walker Job · Vlog Export

---

## ❓ Open questions

See [[decisions/_index]] for unresolved product calls (privacy defaults, owner-vs-pet-centric account, free vs paid cosmetics, leaderboard ranking unit, dog-walker monetization, etc.).

---

## 🚀 Next steps

1. ✅ ~~Pick a positioning angle~~ — three pillars, [[concept]].
2. ✅ ~~Decide food/nutrition strategic positioning~~ — Pillar 3, ships v1.2 per [[roadmap]].
3. Confirm the MVP loop in [[mvp]].
4. Pick 2–3 retention mechanics from [[retention/_index]] for v1.0.
5. Resolve top 3 open questions in [[decisions/_index]].
6. Sketch screens for the MVP user flow.
