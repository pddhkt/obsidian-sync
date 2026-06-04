---
type: mvp
project: Pet Social Vlog
status: idea
tags:
  - pet-app
  - mvp
---

# MVP (v1.0) — Smallest Useful Loop

The first version focuses on the smallest loop that delivers real value to a single user, without depending on a friend network. **Pillars 1 + 2 baseline only.** Pillar 3 (Health) is positioned in marketing from day 1 but not built until v1.2 — see [[roadmap]] for the full phasing.

## The loop

1. Create a [[features/pet-profile|pet profile]].
2. Add photos or videos during the day → [[features/daily-pet-log|daily log]].
3. Track a walk with GPS → [[features/pet-walking-activity|walk activity]].
4. Attach media to the walk.
5. Generate a daily recap video → [[features/auto-vlog-export|auto vlog export]].
6. Export the recap through the phone share sheet.
7. Choose private / friends / public → [[features/privacy-controls|privacy controls]].

## MVP retention layer

The MVP needs at least one retention hook, otherwise the loop is a one-shot. From [[retention/_index]] pick:

- **Daily walking streak** ([[retention/2-daily-loop]]) — single biggest behaviour driver, costs almost nothing to build.
- **Auto-vlog as variable reward** ([[retention/2-daily-loop]]) — the recap is already in the loop; just make it feel like a surprise gift.
- **Friend leaderboard** ([[retention/3-social-loop]]) — only if we can seed a friend graph.

Recommend shipping with the first two. Hold leaderboard for v1.1 once we have invite mechanics.

## Explicitly OUT of MVP

- [[features/dog-walker-mode|Dog walker mode]] — different persona, separate product.
- [[features/social-sharing|Public discovery feed]] — cold-start problem, expensive to seed.
- Multi-pet households — single-pet only at v1.
- AI-generated captions — template overlays only.
- Group challenges — needs a friend graph.

## Success criteria

If 100 beta users use the MVP for 30 days, we want to see:

- **≥40%** complete the onboarding loop (profile → first walk → first vlog) on day 1.
- **≥25%** active on day 7.
- **≥50%** of week-1 walks have media attached (proves photos + walk pair naturally).
- **≥20%** export at least one vlog externally (proves growth channel).
- **Median 3+ walks/week** for retained users.

If we can't hit those, the loop isn't tight enough — revisit the retention layer before adding features.
