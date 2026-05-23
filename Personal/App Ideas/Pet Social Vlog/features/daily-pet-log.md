---
type: feature
project: Pet Social Vlog
mvp: true
priority: high
tags:
  - pet-app
  - feature
---

# Daily Pet Log

The raw input layer. Without this there's nothing to vlog.

## What it does

- Add photos and videos throughout the day.
- Add short captions or notes per moment.
- Group each day into a timeline.
- Display the day as a story-like feed.
- Let users select which moments feed the daily vlog.

## Why it matters

- Replaces "camera roll bloat" — the pet photos people take but never do anything with.
- Provides the source material for [[features/auto-vlog-export]].
- Lightweight daily input → enables the streak mechanic in [[retention/2-daily-loop]].

## Interaction notes

- Capture should be **1-tap from the home screen** — every extra step kills the streak.
- Auto-suggest "add to today's log" when the user takes a photo with the system camera (iOS Live Activity / Android shortcut).
- Pet auto-tagging via on-device face recognition (later — not MVP).

## Data

See [[data-model#Daily Log Entry]].

## Related

- [[features/auto-vlog-export]] — consumes these entries.
- [[features/pet-walking-activity]] — walk media is a special-case entry.
- [[retention/2-daily-loop]] — daily logging is the core habit.

## Open questions

- Cap on entries per day? (Performance + curation incentive.)
- Should video clips be **clipped at upload** (max 15s) or stored full-length and trimmed at vlog generation?
