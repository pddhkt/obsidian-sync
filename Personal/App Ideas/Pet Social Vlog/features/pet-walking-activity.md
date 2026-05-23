---
type: feature
project: Pet Social Vlog
mvp: true
priority: high
tags:
  - pet-app
  - feature
---

# Pet Walking Activity

GPS-tracked walks — the killer feature borrowed from Strava. Most measurable input the app captures.

## What it does

- Start/stop a pet walk.
- Track route, distance, duration, pace, time.
- Attach photos or videos during the walk.
- Show a map of the walking path.
- Save walking history per pet.
- Weekly and monthly walking stats.

## Why it matters

- **Quantification = retention.** Numbers go up, users come back. See [[retention/2-daily-loop]].
- Feeds the [[features/friends-walking-chart|leaderboard]] — biggest social-pressure lever.
- Walks are when pet photos happen anyway → natural integration with [[features/daily-pet-log]].
- Provides activity stats for [[features/auto-vlog-export]] overlays.

## Interaction notes

- Big "Start walk" button must be **one tap from app open**.
- Background GPS tracking (with battery-friendly defaults).
- Auto-detect walk end (no movement for N minutes) — recover from forgotten stops.
- Photo capture while walking should never stop the timer.

## Data

See [[data-model#Walk Activity]].

## Related

- [[features/friends-walking-chart]] — aggregates walk distances.
- [[features/dog-walker-mode]] — walker uses the same flow.
- [[features/privacy-controls]] — location privacy is sensitive.
- [[retention/2-daily-loop]] — streak counting hinges on walks.

## Open questions

- Should walking data be **accurate fitness data** (calibrated, calorie estimates) or **casual memory data**?
- Auto-pause when the dog stops to sniff? Strava-style auto-pause, or count it as part of the walk?
