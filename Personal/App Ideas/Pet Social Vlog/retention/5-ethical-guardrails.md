---
type: retention-direction
project: Pet Social Vlog
mechanic: ethics
status: direction
tags:
  - pet-app
  - retention
  - ethics
---

# Ethical Guardrails — Addiction vs. Healthy Habit

> [!warning] Read this before building anything in [[2-daily-loop]] or [[3-social-loop]]
> Every retention mechanic in this folder can be weaponized. The same streak that builds a walking habit can also make a user feel awful at 11:55pm. We need to decide, up front, which side of the line we're on.

---

## The line

**Healthy habit:** the user feels good about opening the app a week later. The app helped them do something they wanted to do anyway (walk the dog, remember the year).

**Compulsion:** the user opens the app even when they don't want to, because skipping feels worse than opening. The app extracts attention without giving value back.

Same mechanics. The difference is whether they're tuned to serve the user or extract from them.

---

## Hard rules — never violate

### 1. No infinite scroll in MVP

- Daily log = bounded by the day.
- Walks = bounded by the walk.
- Friend feed = chronological, with a clear "you're caught up" end-state.
- No autoplay video chains.

> [!quote] Why
> Infinite scroll is the single most attention-toxic UI pattern of the last decade. We don't need it. Our content has natural endpoints.

### 2. Streak freezes are free

- 1 free freeze per week, auto-applied.
- Earnable additional freezes (group challenges, milestones).
- **Never paywalled.** The moment you charge for freezes, you're charging users to avoid emotional pain you manufactured.

### 3. One push per day, hard cap

- Smart-time walk reminder = 1.
- Streak warning = 1 (only if streak is genuinely at risk).
- Friend activity = 0 by default; opt-in to 1/day.
- Group challenge = 1/week max.
- **Daily push budget: 1.** No exceptions in MVP.

### 4. No fake numbers, ever

- Don't show "12 friends online now" if it's actually 3.
- Don't show a fake progress bar that nudges higher to manufacture FOMO.
- Don't show "limited time" if it's not limited.
- Don't inflate leaderboard counts with bots.

### 5. No retroactive guilt notifications

- ❌ "You didn't walk today" at 11pm.
- ❌ "Your dog is sad" because you missed a day.
- ❌ "Friends walked while you didn't."
- ✅ Future-tense, opt-in nudges only. Never punishment-tense.

### 6. Cosmetic monetization has limits

- No pay-to-win on leaderboards. Distance can't be bought.
- No pet "loot boxes" — outfit unlocks should be earned, not gachaed.
- If outfits cost money, the price is transparent and one-time, not subscription-locked.
- No "your pet looks sad without the premium outfit" messaging.

### 7. Privacy defaults err private

- See [[../features/privacy-controls]]. Default visibility = private, route hidden.
- Surfacing the "go public" option is fine. Defaulting to it is not.

---

## Yellow flags — proceed with care

### Leaderboards

Even small-N leaderboards can hurt:

- Users at the bottom may feel worse than no leaderboard at all.
- Heavy-walker households dominate; casual users disengage.

**Mitigations:**
- Multiple leaderboards (distance, consistency, longest single walk) so different users win different boards.
- Opt-out without penalty — hide from leaderboard while still sharing walks.
- "Personal best" framing alongside competition.

### Streaks

Loss aversion is powerful — that's the danger:

- Users who lose a 100-day streak can rage-quit forever.
- Users on vacation, sick, or in mourning feel guilt.

**Mitigations:**
- Freezes (above).
- "Pause mode" — explicit pause for travel / illness / mourning. Streak resumes when unpaused.
- Streak loss messaging: empathetic, not punishing.

### Auto-vlog as variable reward

Variable rewards are the slot-machine mechanic:

- Risk: the user opens the app *to see what the vlog looks like*, not for the pet content.
- Risk: user starts gaming the input (taking photos just to feed the vlog) instead of living with the pet.

**Mitigations:**
- Vlog is generated even with 1 photo + 1 walk. No "minimum content for a good recap" pressure.
- Tone of generated vlogs is celebratory, never critical ("only 2 walks this week!").
- User can disable auto-generation entirely.

---

## How to measure if we're on the right side

After 3 months, ask 100 active users:

- "How do you feel after using the app?" — net-positive mood required.
- "Have you ever skipped time with your real pet to update the app?" — should be ~0%.
- "Would you recommend the app to a friend with a pet?" — proxy for healthy use.
- "Do you ever feel anxious about opening the app?" — should be ~0%.

If any of these break, retire the mechanic causing it, even if it's a top-engagement driver.

---

## What we will NOT build, ever

- Endless feed with algorithmic ranking.
- Pet "needs" that decay (Tamagotchi guilt — "you didn't feed me").
- Push notifications tied to anxiety ("your dog is sad").
- Pay-to-streak-freeze.
- Loot boxes for cosmetics.
- Comparison notifications that punish ("Mochi walked further than you today").

---

## The framing for the product

> [!tip] The healthy framing
> *"We want our users to walk their dog more, remember the year better, and share the joy of pet life with friends. The app should make those things easier and more rewarding — and it should never make a user feel bad about themselves or their pet."*

If a mechanic doesn't pass that smell test, it doesn't ship — no matter what the engagement numbers say.

---

## See also

- [[1-hook-model]] — the framework can be tuned ethical or extractive
- [[2-daily-loop]] — streaks and notifications, the most-abused mechanics
- [[3-social-loop]] — leaderboards and FOMO, also high-risk
- [[4-progression-loop]] — cosmetic monetization considerations
