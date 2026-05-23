---
type: retention-direction
project: Pet Social Vlog
mechanic: progression-loop
status: direction
tags:
  - pet-app
  - retention
  - progression
---

# Progression Loop — Pet Character, Collections, Milestones

The loop that pulls users back because *they're 80% of the way to something*. Operates on weeks-to-months. The slowest loop, but the **deepest investment**.

---

## Pet as character (Tamagotchi loop)

The pet is not a record — it's a **character that grows with the user**.

### Mechanics

- **Pet mood indicator** — happy / restless / lonely, based on walking frequency. Subtle UI cue, not a guilt trip.
- **Pet "energy" or fitness level** — visualizes consistency over the past 2 weeks.
- **Virtual pet wardrobe** — bandanas, frames, seasonal outfits unlocked through walking.
- **Pet's "world" or home screen** — a small illustrated scene around the avatar that grows with activity (first a doormat, then a bed, then a yard, then a park).

> [!example] The Strava lesson + the Pokémon Go lesson
> Strava taught us that quantification + leaderboards retain. Pokémon Go taught us that *collecting and growing a creature* drives 10× longer engagement than tracking alone. Pet apps should marry these.

### Important distinction

- **Real pet** = the dog/cat in your house. Not represented digitally beyond a photo.
- **Pet avatar / character** = the in-app representation that progresses.

The user invests in the avatar BECAUSE it represents their real pet. The two are linked but not identical — this is what makes virtual cosmetics feel meaningful.

---

## Collections

Humans are completionists. Give them sets to fill.

### Place collections

- **Parks visited** — each unique park (geofenced) becomes a stamp. "Visited 12 of 47 nearby parks."
- **Cities walked in** — for travelers, a passport of cities.
- **Route variants** — recognize unique routes from home; reward exploration.

### Time collections

- **Sunrise walks** — walks before 7am.
- **Rainy day walks** — auto-detected via weather API.
- **Beach walks** — geofenced.
- **Night walks** — after sunset.

### Pet-specific collections

- **First walk of every season.**
- **Birthday walks** — first walk on the pet's birthday.
- **Walks with each friend's dog** — co-located with a different friend each time.

### Why this works

- Completion progress (12/47) creates a goal even when no walk is "needed."
- Drives **exploration** behaviour — users walk somewhere new just for the stamp.
- Cheap content to manufacture — geofences, weather flags, date checks.

---

## Milestones

One-off achievements that feel like landmarks.

### Distance

- First 1km · 10km · 100km · 1000km lifetime.
- Marathon-equivalent (42km in a month).
- Half-circumference of the Earth (eventually).

### Consistency

- 7-day streak · 30-day · 100-day · 365-day.
- "Walked every day this month."
- "Walked at least 3x/week for 6 weeks."

### Social

- First friend added.
- First group challenge completed.
- First walk shared publicly.

### Pet life

- 1 year on the app.
- Pet's first birthday on the app.
- Adoption anniversary (user sets the date).

### Mechanics

- **Milestone unlock = automatic vlog generation** with a special template.
- **Permanent badge** on the pet profile.
- **Shareable certificate** — high-impact growth artifact.

---

## Year-in-review

Spotify Wrapped, but for pets. The single largest re-engagement spike of the year.

### Structure

- Total distance walked.
- Number of walks.
- Best photo of the year (engagement-ranked or user-picked).
- Favourite park.
- Walking buddy (friend you walked with most).
- Longest walk · earliest walk · most photos in one day.
- One auto-generated montage video covering the whole year.

### When to ship

- **December 28** — same week as Spotify Wrapped. Ride the cultural moment.
- **Pet's anniversary on the app** — personalized version year-round.

### Why it's huge

- **Lapsed users re-open** — they get a notification "your 2026 pet recap is ready" and come back.
- **Share-by-default** — the recap is designed to be screenshotted / posted.
- **Sunk-cost reinforcement** — a year of memories is hard to walk away from. Investment compounds.

---

## Compounding investment

Each progression-loop entry deepens investment in [[1-hook-model#4. Investment]]:

- Badges + collections = reputation.
- Pet world = customization.
- Year-in-review = content history.
- Milestones = data accumulated.

After 6 months, a user has a pet character with custom outfits, 30 badges, 12 park stamps, a 90-day streak, and a year-in-review waiting in December. **That's the moat.**

---

## What I'd ship in v1.0 / v1.1

**v1.0 (MVP):**
- 4 distance milestones (1, 10, 100, 1000 km) — auto-unlock.
- Basic badge wall on pet profile.

**v1.1:**
- Park-visited stamps (geofence-based).
- Sunrise / night / rainy day collections.
- Pet world v1 (3-stage illustration).

**v1.2:**
- Cosmetic unlocks (bandanas, frames).
- Year-in-review (timed for December).

Defer pet mood, full Tamagotchi loop, route variants until traction is proven — these are expensive to build.

---

## See also

- [[1-hook-model]] — progression = investment
- [[2-daily-loop]] — the daily inputs that drive progression
- [[3-social-loop]] — collections become shareable
- [[5-ethical-guardrails]] — cosmetic monetization has ethical implications
- [[../features/pet-profile]]
