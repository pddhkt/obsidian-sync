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

---

## 🧱 Where things live

```
Pet Social Vlog/
├── _index.md           ← you are here
├── concept.md          ← positioning, lead segment, expansion order
├── value-props.md      ← two sharpened value props
├── mvp.md              ← smallest useful loop
├── data-model.md       ← all entities in one place
├── README.md           ← raw concept dump (legacy, kept as source)
│
├── features/           ← one node per feature (10 nodes)
├── retention/          ← engagement & "addiction" mechanics — discussion
├── decisions/          ← open product questions
└── visual/             ← mockups + visual concept notes
```

---

## 🧩 Features (10 nodes)

| Feature | MVP? | Why it matters |
|---|---|---|
| [[features/pet-profile]] | ✅ | Identity anchor — every record hangs off a pet |
| [[features/breed-aware-activity-targets]] | ✅ | The Prop 1 wedge — makes the km number meaningful |
| [[features/daily-pet-log]] | ✅ | The raw input. Photos + captions throughout the day |
| [[features/media-capture-modes]] | ✅ | Layered capture — spontaneous + walk-tied + daily ritual |
| [[features/pet-walking-activity]] | ✅ | GPS-tracked walk = killer feature + retention hook |
| [[features/auto-vlog-export]] | ✅ | The Prop 2 deliverable. Variable reward + growth channel |
| [[features/privacy-controls]] | ✅ | Foundational — gates everything social |
| [[features/social-sharing]] | ⏳ | Friends, groups, reactions, comments |
| [[features/friends-walking-chart]] | ⏳ | The leaderboard — social-pressure engine |
| [[features/dog-walker-mode]] | ❌ | Secondary persona — paid walker workflow |

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

1. Pick a positioning angle in [[concept]] (private memory tool vs social pet app vs pet fitness tracker — these pull the design in different directions).
2. Confirm the MVP loop in [[mvp]].
3. Pick 2–3 retention mechanics from [[retention/_index]] that should ship with the MVP.
4. Resolve top 3 open questions in [[decisions/_index]].
5. Sketch screens for the MVP user flow.
