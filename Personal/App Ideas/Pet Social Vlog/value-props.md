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

Two value props, each tied to a real pain the user already has. Each section follows the job-to-be-done frame: *what's the user trying to do, what's broken about the status quo, what we deliver*.

> [!important] The frame
> We don't promise "track your walks" or "remember your pet" — those are descriptions, not benefits. We promise **routine accountability** and **a curation engine**. Those are jobs.

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

## How the two props reinforce each other

These are not two separate apps stapled together. They share the same daily ritual:

```
Walk the dog (routine)  →  Take photos along the way (capture)
       │                              │
       └──────► End of walk ◄─────────┘
                    │
            Walk recap video (curation)
                    │
            End of day vlog (curation)
                    │
            Streak +1  (routine accountability)
```

The walk is when the photos happen. The photos feed the vlog. The vlog rewards the routine. **One loop, two payoffs.**

---

## What we explicitly do NOT promise

- ❌ Photo storage / backup. (Photos / iCloud / Google handle this. We're not competing.)
- ❌ Fitness coaching for the owner. (We're about the dog; owner steps incidental.)
- ❌ Pet social network with strangers. (Friends only, by design.)
- ❌ Pet health diagnosis. (Activity guidance ≠ medical advice. Always defer to vet.)
- ❌ A marketplace for dog walkers (at launch). (See [[features/dog-walker-mode]] for later.)

---

## See also

- [[concept]] — positioning & target segment.
- [[mvp]] — smallest loop that delivers both props.
- [[features/breed-aware-activity-targets]] — operationalizes Prop 1.
- [[features/auto-vlog-export]] — operationalizes Prop 2.
- [[features/media-capture-modes]] — feeds Prop 2.
