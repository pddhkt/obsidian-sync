---
type: visual-concept
project: Pet Social Vlog
status: concept
tags:
  - pet-app
  - visual
  - leaderboard
---

# Friends Walking Chart — Visual Concept

Two layout candidates for [[../features/friends-walking-chart]]. See that note for the feature spec.

## Version 1 — Avatar List

![[friends-walks-avatar-list.png]]

Vertical list. Each row represents one pet and owner with different avatar style and distance.

| Pet | Avatar Style | Distance |
| --- | --- | ---: |
| Mochi | Real pet head photo | 18.4 km |
| Biscuit | Hand-drawn pet avatar | 15.2 km |
| Luna | Soft virtual pet look | 12.7 km |
| Peanut | Sticker-style pet head | 9.8 km |
| Coco | Real pet photo with frame | 6.3 km |

Each row shows the pet avatar, owner name, a horizontal distance line, and the kilometer number. Longer walks → longer lines.

## Version 2 — House-To-Pet Progress

![[friends-walks-house-progress.png]]

Each row starts from a small house on the left. The pet stands on the distance line at the point they reached this period — as if the pet walked away from home and stopped there.

## Comparison

| Aspect | V1 — Avatar List | V2 — House-to-Pet |
|---|---|---|
| Clarity | High — clean ranking | Medium — needs explanation |
| Emotional pull | Medium | High — feels like a journey |
| Shareability (screenshot) | Good | Better |
| Implementation cost | Low | Medium |
| Scales to N users | Easy | Harder past 10 rows |

> [!tip] Recommendation
> Ship **V1 as the default view** (clarity for daily use), offer **V2 as a "summary" view** for end-of-week recaps and screenshots. Best of both.

## Related

- [[../features/friends-walking-chart]] — feature spec.
- [[../retention/3-social-loop]] — why leaderboards work.
