---
type: decisions-index
project: Pet Social Vlog
status: open
tags:
  - pet-app
  - decisions
---

# Open Product Questions

Unresolved calls that should be made before / during MVP design. Each is small enough to be a single decision, but each pulls the product in a different direction.

---

## Positioning & scope

- [ ] Is the app primarily a **private memory tool**, a **social pet app**, or a **pet fitness tracker**? — see [[../concept]] for the three framings.
- [ ] Should the account be centered around the **owner** or the **pet profile**?
- [ ] Should social export be **the main growth channel** (watermarked vlogs)?

## Walking & data

- [ ] Should walking data be **accurate fitness data** or **casual memory data**?
- [ ] Auto-pause behaviour: Strava-style pause when stopped, or count sniff-stops as part of the walk?

## Social & sharing

- [ ] Should public discovery show **people**, **pets**, **routes**, or **vlog posts**?
- [ ] How much route detail public by default? (Privacy-vs-discovery tradeoff.)
- [ ] Should groups work like **friend circles**, **clubs**, or **event hosts**?
- [ ] Should the friends walking chart rank by **owner**, by **pet**, or by **household**?
- [ ] Allow users to hide their distance from leaderboards while still sharing walks?

## Customization & monetization

- [ ] Should virtual pet looks be **free customization**, **paid cosmetic items**, or **earned through walking achievements**?
- [ ] Free unlimited vlog exports vs paywall premium templates / no-watermark?
- [ ] Subscription, one-time purchases, or both?

## Dog walker mode

- [ ] **Full marketplace** (discovery + payment + ratings) or **private tool** for existing walker-owner relationships only?
- [ ] In-app payment, or stay outside the app at first?
- [ ] Walker permissions: start walks · upload media · view pet history · message owner · invite other walkers — which subset?
- [ ] Should client walks count toward public leaderboards, private reports only, or both?

## Retention mechanics

- [ ] Which 2–3 retention mechanics from [[../retention/_index]] ship with MVP?
- [ ] Streak unit: **daily log**, **daily walk**, or **weekly walks**?
- [ ] Notification budget for v1: 1/day hard cap, or per-channel opt-in?

## Breed-aware activity targets ([[../features/breed-aware-activity-targets]])

- [ ] Breed onboarding: **required**, **optional**, or **conversational**?
- [ ] Single energy band per breed, or show temperament range?
- [ ] Leaderboards rank by absolute km or by **% of target** (so small breeds can compete)?
- [ ] Legal sign-off needed before shipping breed-specific guidance?

## Capture modes ([[../features/media-capture-modes]])

- [ ] MVP capture stack: just **spontaneous + walk-tied**, or include **daily ritual prompt**?
- [ ] Daily ritual time: **fixed (9pm)**, **learned**, or **user-set**?
- [ ] Should missing the prompt break a streak, or does any spontaneous capture count?
- [ ] Themed prompts at launch (Sleepy Sunday etc.) or v1.1?
- [ ] AI-assisted import from camera roll: **on-device only** or **cloud**?

## Auto-vlog ([[../features/auto-vlog-export]])

- [ ] Number of templates at launch: **3, 5, or 10+**?
- [ ] Daily vlog delivery time: **fixed 9pm**, **learned**, or **user-set**?
- [ ] Walk-end recap: **always delivered**, **opt-in**, or **on-demand only**?
- [ ] Music: **licensed library only**, or allow user-upload?
- [ ] Render: **on-device**, **cloud**, or **hybrid**?
- [ ] Regenerate button: unlimited or capped per day?
- [ ] Watermark for free tier — yes/no?
- [ ] Failure mode when a day has 1 photo and no walk?

---

## Decision template

When resolving any of the above, create a decision note next to this one:

```markdown
---
type: decision
project: Pet Social Vlog
question: <the question>
status: decided     # open | decided | revisited
decided-on: 2026-MM-DD
---

# <Question>

## Options considered
1. ...
2. ...

## Decision
...

## Why
...

## Implications
- ...
```
