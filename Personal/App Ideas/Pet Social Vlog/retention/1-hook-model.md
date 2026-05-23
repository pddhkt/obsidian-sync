---
type: retention-direction
project: Pet Social Vlog
mechanic: hook-model
status: direction
tags:
  - pet-app
  - retention
  - framework
---

# Hook Model Applied to a Pet App

Nir Eyal's four-step loop. Each cycle deepens the habit.

```
   Trigger  ─►  Action  ─►  Variable Reward  ─►  Investment
      ▲                                                 │
      └─────────────────────────────────────────────────┘
```

---

## 1. Trigger

The cue that says "open the app *now*".

| Trigger type | Pet-app examples |
|---|---|
| **External — time** | Push at the user's typical walk time. Morning walk reminder. |
| **External — context** | Weather: "Sunny and 22° — Mochi wants to walk." |
| **External — social** | "Biscuit just finished a 3.2km walk." |
| **External — loss** | "Your 14-day streak ends in 3 hours." |
| **Internal — emotion** | Boredom, guilt about not walking the dog, wanting to share a cute moment. *This is the prize.* When the internal trigger fires by itself, the habit is formed. |

> [!tip] Goal of trigger design
> Use external triggers in weeks 1–4 to train the user, then *let them fade*. By week 8 the user should feel the internal trigger ("the dog hasn't walked, I should open the app") without prompting.

---

## 2. Action

The simplest behaviour the user does in anticipation of a reward.

**Two key actions to keep frictionless:**

| Action | Friction budget | How to keep it cheap |
|---|---|---|
| **Add a photo to today's log** | 1 tap from app open | Big shutter button on home screen; system-camera shortcut |
| **Start a walk** | 1 tap from app open | Sticky "Start walk" button on home; Apple Watch / wear-OS complication |

Anything more than 1 tap dies. Onboarding flows that ask for pet name + breed + photo + birthday before letting the user log anything are retention killers.

---

## 3. Variable reward

The dopamine hit. **Variability is the engine** — predictable rewards lose their pull.

| Reward type | Eyal's term | Pet-app examples |
|---|---|---|
| **Rewards of the tribe** | social | Friend reaction on your walk, comment from group, climbing the leaderboard |
| **Rewards of the hunt** | resources | New badge unlocked, distance milestone, cosmetic frame earned |
| **Rewards of the self** | mastery | Auto-vlog turning out beautifully, "best photo of the week", year-in-review surprise |

**The auto-vlog is the perfect variable reward** — the user doesn't know exactly what it'll look like, but they know it'll be cute. Each daily recap is slightly different (template choice, clip order, overlay), so the user *can't predict* the exact output. That's the slot-machine architecture, used for a healthy behaviour.

---

## 4. Investment

The user puts something *into* the app, which makes the next loop more rewarding.

| Investment type | Pet-app examples |
|---|---|
| **Content** | Daily photos, walk routes, captions — accumulating history |
| **Data** | Pet profile, breed, birthday — personalization |
| **Followers** | Friend graph, group membership |
| **Reputation** | Leaderboard position, total km, badges earned |
| **Customization** | Pet avatar style, frames, stickers, virtual pet look |

> [!important] Investment is what makes apps sticky
> A 6-month-old user has 6 months of pet memories, a streak of 45 walks, a friend group, and 17 badges. They will not switch apps. Investment is the moat.

---

## Designing a new mechanic

Sanity-check it against the four steps:

- [ ] Is there a clear trigger that fires this?
- [ ] Can the user act in one tap?
- [ ] Is the reward *variable* enough to stay interesting?
- [ ] Does it accumulate *investment* in the app?

If you can't answer all four, the mechanic won't drive habit.

---

## See also

- [[2-daily-loop]] — Daily Hook applied
- [[3-social-loop]] — Social rewards
- [[4-progression-loop]] — Investment compounding
- [[5-ethical-guardrails]] — Where Hook becomes manipulation
