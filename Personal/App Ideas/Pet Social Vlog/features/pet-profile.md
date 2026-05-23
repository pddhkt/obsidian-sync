---
type: feature
project: Pet Social Vlog
mvp: true
priority: high
tags:
  - pet-app
  - feature
---

# Pet Profile

The identity anchor. Every log entry, walk, and vlog hangs off a pet — not a user.

## What it does

- Create one or more pet profiles per user.
- Choose how the pet appears in the app:
  - Upload a real pet photo.
  - Use the pet's real head photo as an avatar (cropped).
  - Select a virtual illustrated pet look.
  - Mix real photos with stylized stickers or frames.
- Visual styles: sketch · soft 3D · cartoon · pixel · sticker.
- Update the pet look without changing historical walking data.

## Why it matters

- The pet is the *character* of the app — users emotionally invest in the avatar more than their own profile. See [[retention/4-progression-loop]].
- Customization is a cheap, high-engagement retention lever (cosmetic unlocks via walking milestones).
- Multi-pet support unlocks households and multi-dog walks.

## Data

See [[data-model#Pet]].

## Related

- [[features/daily-pet-log]] — entries are tagged with a pet.
- [[features/friends-walking-chart]] — leaderboard avatars come from here.
- [[retention/4-progression-loop]] — pet-as-character mechanic.

## Open questions

- Should the account be centered around the **owner** or the **pet**? (Affects URL structure, sharing, and what "profile page" means.)
- Should virtual pet looks be **free**, **paid cosmetic**, or **earned through walking achievements**?
