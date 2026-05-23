---
type: retention-direction
project: Pet Social Vlog
mechanic: daily-loop
status: direction
tags:
  - pet-app
  - retention
  - daily-habit
---

# Daily Loop — Streaks, Triggers, Variable Rewards

The smallest, tightest loop. Operates within a single day. Goal: get the user to log *something* (photo or walk) every day.

---

## The loop

```
Morning trigger → 1-tap photo or walk → Auto-vlog at end of day → Streak +1
```

**One day at a time.** If the user does this 7 days in a row, the habit forms. If they miss day 3, give them a forgiveness mechanic (see streak freezes below) so they don't rage-quit.

---

## Streaks

Loss aversion is twice as powerful as reward — losing a 30-day streak hurts more than gaining a new badge feels good. Use it.

### Mechanics to ship

- **Daily log streak** — at least one photo or walk per day. Easy to maintain.
- **Walking streak** — at least one tracked walk per day. Harder, more meaningful.
- **Weekly walking streak** — N walks per week, more forgiving for cat / small-pet owners.
- **Streak counter on home screen** — always visible, with the pet's avatar next to it.

### Streak freezes (CRITICAL)

> [!tip] Duolingo's lesson
> Without freezes, users who miss a day quit forever (sunk-cost gone → why bother). With freezes, they come back.

- **Free freeze: 1 per week**, auto-applied if the streak would break.
- **Earned freezes** — extra freezes from milestones, group activity, etc.
- **No paywall on freezes in MVP.** Charging for freezes is the start of dark patterns. See [[5-ethical-guardrails]].

### Streak warnings

- **6 hours before end-of-day**: gentle push: "Mochi hasn't walked today."
- **2 hours before**: "Your 14-day streak ends at midnight."
- **At midnight if broken**: empathetic message ("Streaks reset — your memories don't"), not a guilt trip.

---

## Triggers

When does the user get nudged?

### Smart time-of-day

Learn the user's typical walk time. If walks happen between 7–8am most days, push at 7:15 if no walk by 7:30. **One push per day max.** Two pushes feels desperate.

### Contextual

- **Weather** — "Sunny and 22° — perfect walk weather."
- **Location** — when the user is near a park they've walked before, on a day with no walk yet.

### Social

- **Friend activity** — "Biscuit just walked 3.2km. Your turn?" *Cap this — daily, max 1.*
- **Group challenge** — "Group is 5km from this week's goal."

### Loss

- **Streak at risk** — see above.

### Anti-pattern checklist

- ❌ Push at 11pm "you didn't walk today" — pure guilt, no value.
- ❌ Push from multiple sources stacking up.
- ❌ Push on rest days the user explicitly set.
- ✅ Always: one channel, one push, opt-out visible.

---

## Variable rewards in the daily loop

### Auto-vlog (the big one)

The recap is generated automatically at end-of-day, but the user doesn't know exactly what it'll look like:

- **Template variation** — daily template picks from a pool of 5–8 styles. Weighted by season, day-of-week, content type.
- **Random highlight pick** — when 20 photos go in, the algorithm picks 8. Each day's pick feels different.
- **Surprise overlays** — milestone hits get a special overlay ("100km this month!").
- **Music variation** — background track changes; the user can lock a favourite but the default is variable.

> [!example] Why this works
> The user *expects* a recap will come. They *don't know* if it'll be the "playful" or "cinematic" template, or whether their best photo will be the opener. That gap = anticipation = dopamine.

### Memory resurfacing

- "1 year ago today" — pull a daily log entry from the same date last year. Surprise nostalgia.
- "First walk on this route" — recognize repeat routes and surface the original.

### "Pet of the day" prompt

Once a day, randomly pick a moment from the last 7 days and ask "Want to add this to your favourites?" — turns passive scroll into an action with a tiny reward.

---

## What I'd ship with the MVP

1. **Walking streak** + 1-freeze-per-week.
2. **Auto-vlog with 5 templates** chosen randomly per day.
3. **One smart time-of-day notification.**
4. **Streak counter on home screen.**

That's enough to test whether the habit forms. Add memory resurfacing and pet-of-the-day in v1.1.

---

## See also

- [[1-hook-model]] — framework
- [[3-social-loop]] — when the daily loop intersects with friends
- [[5-ethical-guardrails]] — what NOT to do with streaks and notifications
- [[../features/auto-vlog-export]]
- [[../features/pet-walking-activity]]
