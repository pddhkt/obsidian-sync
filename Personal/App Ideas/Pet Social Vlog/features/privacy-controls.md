---
type: feature
project: Pet Social Vlog
mvp: true
priority: high
tags:
  - pet-app
  - feature
  - privacy
---

# Privacy Controls

Foundational. Every shareable artifact has a visibility setting.

## Visibility tiers

| Tier | Visible to |
|---|---|
| **Private** | Only the owner |
| **Friends** | Approved friends only |
| **Group** | Selected group members |
| **Public** | Anyone |

Applies to: daily log entries, walks, vlogs.

## Location privacy

GPS tracks reveal home address by default. Extra controls needed:

- **Hide exact start and end point** — fuzz the first and last 200m of the route.
- **Blur home-area location** — define a "home zone" radius that's never shown.
- **Share route only with friends or groups** — public posts show distance + map preview but no polyline.
- **Strip route on external export** — vlogs exported to IG / TikTok never include the GPS polyline.

## Why it matters

- Without strong defaults, users won't share *anything* — kills the social layer.
- Without strong defaults, users will accidentally dox themselves — kills trust.
- Privacy defaults shape the product. If default = private, growth is slow but safe. If default = friends, the social layer fills naturally.

## Recommended defaults

> [!tip] Start strict, surface the upgrade
> - Daily log: **Private**
> - Walks: **Friends**, route hidden outside home zone
> - Vlogs: **Private** (export is explicit)
> - Surface visibility on the post-walk screen so users actively choose.

## Related

- All sharing features depend on this.
- [[features/social-sharing]]
- [[features/friends-walking-chart]]

## Open questions

- How aggressive should the "home zone" auto-detection be? Manual setting only, or learn from frequent start points?
- Should the user be able to retroactively change visibility of past posts? (Yes, obviously — but flagged here as a UX requirement.)
