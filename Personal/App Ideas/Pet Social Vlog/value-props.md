---
type: value-props
project: Pet Social Vlog
status: direction
tags:
  - pet-app
  - positioning
  - value
---

# Value Props — Sharpened

Three value props, each tied to a real pain the user already has. Each section follows the job-to-be-done frame: *what's the user trying to do, what's broken about the status quo, what we deliver*.

> [!important] The frame
> We don't promise "track your walks", "remember your pet", or "log food" — those are descriptions, not benefits. We promise **routine accountability**, **a curation engine**, and **health intelligence**. Those are jobs.

> [!tip] One product, three pillars, one engine
> The three pillars share a single engine — *calibrated to your specific dog* (breed, age, weight, activity). Activity data informs the food target. Food and walk data both enrich the vlog and the year-in-review. Each pillar makes the others stronger.

---

## Prop 1 — Routine Accountability

> **"Walk your dog enough — without nagging yourself about it."**

### The job

An active urban dog parent wants to be a good dog parent. They want to walk the dog enough, often enough. They don't actually want to know whether today's walk was 1.4km or 1.7km — that number alone is meaningless. They want to know: **am I doing this right, week over week, for *my specific dog*?**

### Why the status quo fails

| Status quo | What it doesn't do |
|---|---|
| **Apple Health step count** | Counts owner's steps, not dog's walks. No distinction between "walked the dog" and "walked to the bus." |
| **Strava** | Built for athletes. The unit of analysis is *the workout*, not the dog. No pet-aware reporting. |
| **Memory / vague self-tracking** | "I think I walked him enough this week" — humans systematically over-estimate. |
| **Generic "walk your dog more" advice** | One-size-fits-all. A pug and a husky need very different things. |
| **Vet check-ins (twice a year)** | Too infrequent to drive routine. |

### How we deliver

- **GPS-tracked walks** ([[features/pet-walking-activity]]) — clean, pet-tagged, separate from owner's own exercise.
- **Breed- and dog-aware activity targets** ([[features/breed-aware-activity-targets]]) — "your husky needs 90 more minutes this week" vs. "your pug should rest in heat above 28°."
- **Weekly framing, not daily** — daily targets create guilt; weekly lets life happen.
- **Streak + freeze mechanic** ([[retention/2-daily-loop]]) — accountability without rage-quit.
- **Friend / household visibility** (later) — gentle social pressure when wanted.

### Honest risk

A casual owner who's not currently feeling guilty about under-walking the dog has no pain to solve. We're sharper when the user *suspects* they're falling short — that's our wedge. Onboarding should surface this gap on day 1 (e.g. "based on your dog's breed and age, the typical weekly target is 7 walks / 14km — let's see how this week goes").

---

## Prop 2 — Curation Engine

> **"Turn your camera roll's worth of pet pics into a 20-second video you actually want to watch."**

### The job

The user takes a lot of pet photos. Most of them sit in their camera roll forever. Once in a while they'd love to scroll through "this year with the dog" or share something with family — but doing that manually is too much work, so they don't.

The job isn't *storage* (Photos already stores them). The job is **curation** — turning the mess into something watchable.

### Why the status quo fails

| Status quo | What it doesn't do |
|---|---|
| **iOS / Google Photos** | Storage + search + auto-Memories, but Memories include colleagues, lunches, screenshots. Not pet-only. |
| **Instagram** | Highlight reel only — top 5%. The mundane texture of pet life never gets posted, and disappears. |
| **CapCut / VN / video editors** | Powerful but high friction. 95% of users never finish a project. |
| **Manual albums / journals** | Discipline-dependent. Nobody actually does it. |
| **iOS Pet-recognition (face)** | Detects the dog, doesn't *curate* into a story. |

### How we deliver

- **Daily auto-vlog** ([[features/auto-vlog-export]]) — opinionated, 15-20s, ready to watch at 9pm. No editing needed.
- **Walk-end recap** — immediately after a walk, a short montage of that walk's photos + stats.
- **Layered capture modes** ([[features/media-capture-modes]]) — spontaneous + prompted + walk-tied, so the daily vlog *always has something to work with*.
- **Year-in-review** ([[retention/4-progression-loop]]) — the big annual moment. Spotify Wrapped for pets.
- **Milestone montages** — first 100 walks, pet's birthday, adoption anniversary.
- **Pet-only curation** — the algorithm picks frames *with the pet in them*. No colleagues, no lunches.

### Honest risk

If the auto-vlog isn't good enough, the value prop collapses. Quality bar must be high from day 1 — bad recaps will teach users to ignore the daily notification. **Better 3 great templates than 12 mediocre ones at launch.**

---

## Prop 3 — Health Intelligence

> **"Feed your dog the right amount of the right thing — and know your dog is healthy."**

### The job

The user wants their dog to be healthy. Daily, that decomposes into: am I feeding the right amount? The right kind? At the right schedule? Is the dog's weight okay? If something seems off, can the vet help me figure it out? Right now, owners guess from a vague vet visit twice a year and a feeding chart on the back of a kibble bag.

### Why the status quo fails

| Status quo | What it doesn't do |
|---|---|
| **Vet visit 2x/year** | Far too sparse to inform daily decisions. |
| **Bag-of-kibble feeding chart** | Generic by weight. Ignores activity level, age, breed, condition. |
| **MyFitnessPal-style food trackers** | Built for humans. Wrong food database. No recommendations. |
| **Smart bowls** | Fragmented hardware, expensive, single-use. No reporting. |
| **Spreadsheets / paper logs** | Discipline-dependent. Nobody actually keeps them. |
| **Asking the internet** | "How much should my husky eat?" → 47 contradictory answers. |

### How we deliver

- **Quick-add food logging** ([[features/food-and-nutrition-tracking]]) — 1-tap for "same as yesterday" (90% of meals). Barcode for new foods. Manual as the escape hatch.
- **Portion recommendations** — calibrated to weight × breed × activity × life-stage. Industry-standard RER × MER formula at launch.
- **Activity-coupled** — *this is the moat*. High-walk days adjust the calorie target up. Rest days down. Only we can do this, because we already have activity data from Pillar 1.
- **Multi-person anti-double-feed alert** — "Mochi was fed at 7:12am by Anna. Confirm second meal?" Closes a real, daily household pain point.
- **Weight + Body Condition Score** tracking — the actual gold-standard health metrics.
- **Vet PDF report** — structured weekly/monthly summary, exportable as PDF the owner emails to their vet. Standardised format.
- **Diet Library** — anonymised reference: "what do other shibas, 8kg, 3 years old, actually eat?" Browsable; opt-in to contribute your own dog's diet.
- **Always defers to the vet** for medical questions. We surface signal; the vet interprets.

### Honest risk

- **Liability** — recommendations are medical-adjacent. Need vet sign-off on the formula and clear "guidance, not medical advice" framing.
- **Food logging fatigue** — the #1 churn driver in MyFitnessPal. Mitigated by quick-add as the default, weekly framing instead of daily nagging, and never gamifying meal compliance.
- **Brand drift** — being "a health app" carries clinical seriousness that can clash with the playful daily-companion vibe. We address this by *never* gating Pillars 1 and 2 behind health onboarding.

---

## How the three pillars reinforce each other

These are not three separate apps stapled together. They share one daily ritual and one engine:

```
                            Pet profile
                  (breed · age · weight · conditions)
                                │
                                ▼
        ┌───────────────────────┴───────────────────────┐
        │                       │                       │
   Pillar 1                Pillar 2                Pillar 3
   ROUTINE                 CURATION                HEALTH
        │                       │                       │
   Walk activity           Daily log               Food log
   Activity target         Capture modes           Portion target
        │                       │                       │
        └──────► Activity data ─┴─── adjusts ────► Calorie target
                                │
                                ▼
                    Daily vlog at 9pm (P2)
                       includes walks + meals
                                │
                                ▼
                Streak +1 (P1) · Weekly health summary (P3)
                                │
                                ▼
                  Year-in-review: walks + meals + memories
                                │
                                ▼
                       Vet PDF (P3) — annual or on-demand
```

- The **walk** is when the photos happen → feeds Pillar 2.
- The **activity data** adjusts the **calorie target** → P1 enables P3.
- The **food log** + **walks** enrich the **vlog and year-in-review** → P3 feeds P2.
- The **vet PDF** closes the loop on the health pillar — turns daily logging into something useful at the medical level.

**One product, three jobs, each making the others stronger.**

---

## What we explicitly do NOT promise

- ❌ Photo storage / backup. (Photos / iCloud / Google handle this. We're not competing.)
- ❌ Fitness coaching for the owner. (We're about the dog; owner steps incidental.)
- ❌ Pet social network with strangers. (Friends only by design; Diet Library is anonymised aggregate.)
- ❌ **Pet diagnosis or medical advice.** (We surface signal. The vet interprets. Always.)
- ❌ Prescription diets / medication recommendations. (Vet-prescribed only.)
- ❌ A marketplace for dog walkers (at launch — see [[features/dog-walker-mode]] for later).

---

## See also

- [[concept]] — positioning & target segment, three-pillar mental model.
- [[roadmap]] — how the three pillars phase in across versions.
- [[mvp]] — smallest loop that delivers Pillars 1 and 2.
- [[features/breed-aware-activity-targets]] — operationalises Prop 1.
- [[features/auto-vlog-export]] — operationalises Prop 2.
- [[features/media-capture-modes]] — feeds Prop 2.
- [[features/food-and-nutrition-tracking]] — operationalises Prop 3.
