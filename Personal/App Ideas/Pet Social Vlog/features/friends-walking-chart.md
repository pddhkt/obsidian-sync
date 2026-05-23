---
type: feature
project: Pet Social Vlog
mvp: false
priority: high
tags:
  - pet-app
  - feature
  - social
---

# Friends Walking Chart

The social-pressure engine. A leaderboard for pet walking distance among friends or group members.

## What it does

- Compare how many kilometers each user walked with their pet.
- Periods: daily · weekly · monthly · challenge.
- Display each row as a "walking lane":
  - Pet avatar on the left.
  - Pet name and owner name.
  - Distance line showing relative progress.
  - Total distance in kilometers.
- Mixed avatar styles in the same chart — real photos, hand-drawn, virtual, sticker.

## Why it matters

- Single highest-leverage social mechanic. See [[retention/3-social-loop#Leaderboards]].
- "I haven't walked the dog today and Mochi is ahead of me" → walks happen.
- Mixed avatars make the chart feel like *characters*, not just bars — increases emotional pull.

## Visual concepts

### Version 1 — Avatar List

![[friends-walks-avatar-list.png]]

Vertical list. Each row = one pet. Avatar, owner name, horizontal distance line, kilometers. Longer walks = longer lines.

### Version 2 — House-To-Pet Progress

![[friends-walks-house-progress.png]]

Each row starts from a small house on the left. The pet stands on the distance line at the point they reached this period — as if the pet walked away from home and stopped there.

> [!tip] Recommended
> Version 2 is more emotional ("look how far my dog went") and more shareable as a screenshot.

See [[visual/friends-walking-chart]] for sample data.

## Data

See [[data-model#Friend Distance Chart Row]].

## Related

- [[features/pet-walking-activity]] — provides distance data.
- [[features/social-sharing]] — group membership.
- [[retention/3-social-loop]] — social-pressure mechanics.

## Open questions

- Rank by **owner**, by **pet**, or by **household**? (Households with 2 dogs would dominate single-dog leaderboards.)
- Allow users to hide their distance from leaderboards while still sharing walks?
- Should client dog walks (via [[features/dog-walker-mode]]) count toward leaderboards?
