---
type: feature
project: Pet Social Vlog
mvp: false
priority: medium
tags:
  - pet-app
  - feature
  - social
---

# Social Sharing

The layer above private logging — friends, groups, reactions.

## What it does

- Follow other users or pet profiles.
- Share public walking activities.
- Share a daily vlog inside the app.
- React / comment on activities.
- Create friend groups for private sharing.
- Invite friends to a group.
- Group-hosted shared walks or challenges.

## Why it matters

- Unlocks [[features/friends-walking-chart]] (needs a friend graph).
- Group challenges drive repeat behaviour. See [[retention/3-social-loop#Group challenges]].
- Comments / reactions are cheap dopamine — but only work at network density.

## MVP positioning

- **Not MVP.** Requires a friend graph that doesn't exist yet on day 1.
- Ship MVP with private-by-default. Add friends in v1.1 via contact invite + QR code.
- Public discovery feed is **v2 or later** — cold-start problem is expensive.

## Data

See [[data-model#User]] for friends / groups.

## Related

- [[features/friends-walking-chart]] — depends on this.
- [[features/privacy-controls]] — gates every social action.
- [[retention/3-social-loop]] — social mechanics.

## Open questions

- Public discovery: show **people**, **pets**, **routes**, or **vlog posts**?
- Should groups work like **friend circles**, **clubs**, or **event hosts**?
- Reaction system: emoji palette (IG-style) or custom pet-themed (paw, bone, treat)?
