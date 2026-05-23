---
type: feature
project: Pet Social Vlog
mvp: true
priority: high
status: direction
tags:
  - pet-app
  - feature
  - design-brief
---

# Breed-Aware Activity Targets

A *target* (not a quota) for how much the user's specific dog should be walking, calibrated to the dog — not a generic step count.

> [!important] This is the wedge for Prop 1
> Without this, the walking-distance number is meaningless ("you walked 12km this week — is that good?"). With it, the number is *interpretable* against a relevant baseline. This is the single thing that separates us from Apple Health.

---

## What it does

- During onboarding, capture: **breed (or primary breed mix), age, weight, known health conditions**.
- Compute a **weekly activity target** (minutes + walks per week) calibrated to that profile.
- Show progress against the target on the home screen.
- Adjust target when the dog ages, gains/loses weight, or has a recovery period.
- Surface **safety warnings** when conditions warrant *less* activity (heat, brachycephalic breeds, post-op).
- Allow **vet override** — owner can override the default with a number their vet gave them.

## Why this matters

- **Makes the distance number meaningful.** "You walked 12km this week" → "You walked 12km of a 20km weekly target for your border collie."
- **Differentiated from Apple Health / Strava.** Nobody else does pet-specific targets.
- **Self-reinforcing for the routine prop.** When a user sees their husky is "behind target", they walk. When their pug is "ahead of target in 30° heat", they rest.
- **Onboarding hook.** Asking for breed signals "this app understands your dog." Builds trust.

---

## Target framework (illustrative — needs vet review before launch)

Two axes: **breed energy level** × **life stage**.

### Breed energy bands

| Band | Examples | Typical weekly target |
|---|---|---|
| **Very high** | Border Collie, Husky, Belgian Malinois, Vizsla | 14–20 hr/week |
| **High** | Labrador, Golden, Standard Poodle, Aussie | 7–14 hr/week |
| **Medium** | Beagle, Cocker, Schnauzer, mixed-medium | 5–7 hr/week |
| **Low** | Chihuahua, Pug, Shih Tzu, French Bulldog | 2–4 hr/week + indoor play |
| **Very low / restricted** | Senior dogs, post-op, severe brachycephalic in summer | Per-case; vet-defined |

### Life stage modifiers

- **Puppy (< 12mo)** — short, frequent walks. Cap single-walk length (joint growth).
- **Adult (1–7y)** — full band target.
- **Senior (7y+)** — reduce by 20–40%, prioritise low-impact.
- **Recovery** — vet-defined; usually time-boxed.

### Hard safety overrides

- **Brachycephalic breeds in heat** (Pug, Bulldog, French Bulldog) — block targets above N minutes when temperature > 28°C. Show a *warning*, not a guilt nudge.
- **Puppy single-walk cap** — 5 min per month of age, twice a day (common vet rule of thumb).
- **Post-op** — until owner clears the flag, target is "what the vet said" only.

> [!warning] Liability framing
> Always present targets as **guidance, not medical advice**. Onboarding copy: "Targets are a starting point. Your vet knows your dog — defer to them."

---

## Direction options to discuss

### Option A — Required breed at onboarding

User must select a breed (or "mixed") before the app works. Pro: targets always calibrated. Con: friction in onboarding; mixed-breed owners feel boxed in.

### Option B — Optional breed; generic default until provided

Default to a "medium energy adult" target. Surface a "tell us your dog so we can personalise" nudge. Pro: zero onboarding friction. Con: most users won't set it; targets stay generic.

### Option C — Conversational onboarding

3 short questions ("What kind of dog? How old? How big?") with visual options. Adaptive — if breed is selected, skip size. Pro: feels personal; collects what we need. Con: 30s onboarding instead of instant.

> [!tip] Recommendation: **C**
> Conversational onboarding is the small cost that unlocks the entire Prop 1 value. Worth the 30 seconds. It also primes the user for the personalisation theme that runs through the product.

---

## UX guidance

- **Weekly framing, not daily.** "You're 2 walks behind this week" beats "You missed today" — fits real life, reduces guilt notifications.
- **Visual: filling, not depleting.** Progress bar fills toward target. Don't show a depleting "energy meter" that creates anxiety.
- **Surface the *why*.** "Border Collies need 2hr+ daily — high stimulation needs." Builds trust + educates.
- **Celebrate hitting target.** Once per week, a "Mochi got her exercise this week" notification + badge.
- **Don't punish over-target.** Some weeks are big. Show it as "ahead of schedule", not "you walked too much."

---

## Edge cases

| Case | Handling |
|---|---|
| **Mixed breed** | Ask for "primary breed mix" + size band. Or "mixed-medium / mixed-large" if unknown. |
| **Working dog as pet** | (e.g. husky living in HK apartment) — still target high, but surface the "this breed needs a LOT" message clearly. |
| **Brachycephalic** | Lower targets, heat warnings, indoor-play credit. |
| **Multi-pet household** | Per-pet target. Household view sums them. |
| **Dog walker walks** | Count toward the dog's target. Owner sees credit. |
| **Senior dog declining** | Allow manual target reduction with a "discussed with vet" toggle. |

---

## Data needed

Adds to [[data-model#Pet]]:

- `breed_primary` · `breed_secondary` (for mixes)
- `birthday_or_age_estimate`
- `weight_kg`
- `health_flags` — list (post_op, arthritis, heart_condition, brachycephalic, etc.)
- `vet_override_weekly_minutes` (optional)

Adds a derived/computed field per pet:

- `weekly_target_minutes`
- `weekly_target_walks`

---

## Open questions

- Required breed at onboarding (A/B/C above)?
- Do we ship with a **single energy band per breed**, or also incorporate **temperament variance within breeds** (e.g. show range)?
- Should the activity target also feed [[features/friends-walking-chart|friend leaderboard]] as a *percentage-of-target* metric — so a chihuahua walking 100% of target can compete with a husky walking 100% of target?
- **Liability** — do we need a legal sign-off before showing breed-specific advice? (Probably yes for production launch.)

## Related

- [[concept]] — sub-segment #3 (working-breed owners).
- [[value-props#Prop 1 — Routine Accountability]] — this is the operationalisation.
- [[features/pet-walking-activity]] — walks measured against target.
- [[features/pet-profile]] — breed lives on pet profile.
