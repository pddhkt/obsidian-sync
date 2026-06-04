---
type: concept
project: Pet Social Vlog
status: idea
tags:
  - pet-app
  - positioning
---

# Concept & Positioning

## What it is, in one sentence

> A daily health companion for active urban dog parents — built around the walk you were going to take, the photos you were going to capture, and the food you were going to give.

Three value props (see [[value-props]] for detail):

1. **Routine accountability** — for the walk (not measurement for its own sake).
2. **Curation engine** — for the memory (not photo storage).
3. **Health intelligence** — for the food, body, and vet visit (not medical advice).

## The three pillars

| Pillar | Job | Built from |
|---|---|---|
| 1. **Routine Accountability** | Walk your dog enough | [[features/pet-walking-activity]], [[features/breed-aware-activity-targets]], streaks |
| 2. **Curation Engine** | Turn your phone's mess into a watchable artifact | [[features/auto-vlog-export]], [[features/media-capture-modes]], [[features/daily-pet-log]] |
| 3. **Health Intelligence** | Feed right, weigh right, give the vet what they need | [[features/food-and-nutrition-tracking]], weight + BCS tracking, vet PDF |

> [!important] One engine across all three pillars
> All three pillars use the same calibration spine — *this specific dog* (breed, age, weight, conditions, activity history). Activity data informs food targets. Food and walk data both enrich the daily vlog. The vlog rewards the routine. **One product, three jobs, each reinforcing the others.**

> [!tip] Positioning vs execution
> The three-pillar story is the *positioning* from day 1 — we are a pet health companion. The *execution* is phased: Pillars 1 + 2 ship in the MVP; Pillar 3 lands in v1.2. See [[roadmap]] for the full schedule.

## Lead segment — Active Urban Dog Parents

A behavioural definition, not a demographic one. Someone is in the segment if all of these are true:

- Owns a dog.
- Lives in a city or dense suburb.
- Walks the dog *most* days (≥4/week).
- Takes phone photos of the dog *most* days.
- Already uses some daily-habit app (fitness tracker, Duolingo, IG Stories — any of them).
- Cares whether they're doing right by the dog.

This is who we design the MVP for. The value props above both fire for them on day one.

> [!tip] Why this segment over the alternatives
> - **Working-breed owners** — sharper pain (huskies need 2hr+/day) but smaller TAM. They become a power-user sub-segment, not the lead.
> - **Multi-person households** — uniquely valuable shared timeline, but it's an unlock — needs 2+ users in the same household to enroll. Lead with single-user value, expand to households in v1.1.
> - **Dog walkers / service workers** — high WTP, tiny TAM, different product. Wait until consumer side has traction.
> - **Competitive friend groups** — strong loop, but requires network density at launch. Cold-start problem. Add when friend graph is mature.
> - **Pet-content-on-IG creators** — already happy with IG. Don't compete head-on; let them flow in via the auto-vlog export.

## Sub-segments we should win in order

1. **MVP — Active Urban Dog Parents (single user).** Routine + curation pulls them in.
2. **v1.1 — Multi-person households** (couples, families, roommates sharing one dog). Shared timeline.
3. **v1.2 — Working-breed owners.** Breed-aware activity targets ([[features/breed-aware-activity-targets]]) is the hook.
4. **v1.3 — Friend circles.** Leaderboards + group challenges activate once 5+ friends are on.
5. **v2.x — Dog walkers / service.** [[features/dog-walker-mode]] as a paid extension.

## Anti-segments — explicitly NOT for

- Cat-only owners. (Different behaviour: no walks, less daily logging. Don't dilute the brand.)
- Owners of brachycephalic / very small breeds who don't really walk. (App is most useful when there's a daily walk to anchor it.)
- Dog enthusiasts without a dog (vicarious viewers). The product is *for owners doing the thing*, not feed-consumers.

## Three positionings — kept for reference

We picked the hybrid, but the three pure positionings show the design pull:

> [!example] A — Private memory tool
> "A daily diary for you and your pet."
> *Pull:* private timeline, auto-recaps, year-in-review.
> *Weakness:* low growth — nothing pulls new users in.

> [!example] B — Social pet app
> "Instagram for dogs, with friend leaderboards."
> *Pull:* friend graph, group challenges, public discovery.
> *Weakness:* needs network density on day one.

> [!example] C — Pet fitness tracker (Strava for dogs)
> "Strava for pet walks, with daily pet vlogs."
> *Pull:* walking accuracy, streaks, weekly stats, clubs.
> *Weakness:* only resonates with active walkers; cat owners excluded.

**We pick: C as the spine + A as the default state + B as the unlock.** Lead with measurable activity (C), default everything to private memory (A), let friends/groups (B) light up as the user invites people in. This mirrors how Strava grew: fitness first, social second.

## Main user value (revised)

In priority order, grouped by pillar:

**Pillar 1 — Routine**
1. **Know you're doing right by your dog.** Activity guidance calibrated to *your* dog ([[features/breed-aware-activity-targets]]) — not a generic step count.
2. **A daily nudge to walk** without nagging or guilt. Streaks + weekly framing.

**Pillar 2 — Curation**
3. **Get a video at the end of the day you actually want to watch.** Auto-curated daily recap ([[features/auto-vlog-export]]).
4. **A pet-centric timeline you can scroll** without wading through screenshots, receipts, and lunches ([[features/daily-pet-log]]).
5. **A year-in-review you didn't have to make.** Spotify Wrapped for pets.

**Pillar 3 — Health**
6. **Feed the right amount** for *this dog* — calibrated by breed, age, weight, and yesterday's walks ([[features/food-and-nutrition-tracking]]).
7. **Prevent double-feeding in multi-person households.** "Mochi ate at 7:12 — confirm second meal?"
8. **Give your vet a structured report** instead of vague answers. Vet PDF.

**Cross-pillar**
9. **A shared timeline for households** (v1.1). Both partners contribute, both see everything, both log walks and meals.
10. **Friendly competition that gets you out the door** (v1.1). Friend leaderboards.
11. **Proof and reports when someone else walks the dog** (v2.0). [[features/dog-walker-mode]].

## Why now

- Phones full of pet photos with no destination — camera roll bloat is a real, daily friction point.
- Strava-style social fitness is a proven retention model.
- Short-form vertical video (Reels / TikTok / Stories) gave auto-vlogs a real export target.
- Dog ownership grew sharply 2020–2024; that cohort is now 4–6 years in and wants tools.
- LLM + on-device vision means we can do meaningful auto-curation cheaply.

## See also

- [[value-props]] — the two sharpened value props in detail.
- [[mvp]] — smallest useful loop.
- [[retention/_index]] — engagement mechanics.
- [[decisions/_index]] — open product questions.
