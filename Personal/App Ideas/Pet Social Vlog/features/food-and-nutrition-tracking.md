---
type: feature
project: Pet Social Vlog
mvp: false
priority: high
status: confirmed
pillar: 3
ships-in: v1.2
tags:
  - pet-app
  - feature
  - design-brief
  - health
---

# Food & Nutrition Tracking — Design Brief

Log what the pet eats. Recommend portions calibrated to the dog. Generate a vet-friendly PDF. Share *diets* (not day-by-day diaries) for community reference.

> [!success] Strategic position — confirmed
> This is **Pillar 3 — Health Intelligence**. We position from day 1 as a pet health companion ([[concept]], [[value-props]]). The feature itself ships post-MVP — see [[roadmap]]: Pillar 3 lands in **v1.2**, weight + BCS + vet PDF in **v1.3**, Diet Library in **v1.4**.

---

## What it does (full vision)

1. **Daily food log** — record meals: kibble, wet food, treats, table scraps, supplements.
2. **Smart input** — quick-add favourites + barcode scan + manual fallback. Photo recognition + voice in later versions.
3. **Portion recommendations** — calorie target calibrated to weight + breed + activity + life stage. Same logic spine as [[features/breed-aware-activity-targets]].
4. **Nutrition report** — weekly/monthly summary: calories vs target, macros, treat ratio, brand history.
5. **Vet PDF** — exportable structured report the owner emails or AirDrops to their vet. Standardised format. **No clinic-side integration at launch** — just a PDF the vet reads.
6. **Diet Library** — anonymised reference: "what do other shibas, 8 kg, 3 years old, actually eat?" Browsable aggregate; users opt-in to publish their dog's diet for others to reference.
7. **Multi-person households** — both partners log; the app prevents double-feeding ("dog already ate at 7am — confirm second serving?").
8. **Reminders** — meal-time push (opt-in, gentle, never guilt-tense).

---

## Why this matters

- **Strongest unmet need in pet ownership beyond walking.** Owners constantly ask: "Am I feeding the right amount? The right kind? Is he gaining/losing weight?"
- **Vet partnership opportunity.** Vets currently get vague verbal answers ("I think he eats two cups a day?"). A clean intake log changes the consultation.
- **Disease management.** Diabetic, allergic, kidney-disease, obese dogs *require* food tracking. This is a real, high-stakes use case.
- **Multi-person households.** Preventing double-feeding alone is worth the feature. Real daily pain point.
- **Compounding investment.** A year of food logs is hard to recreate elsewhere — deepens the moat described in [[retention/1-hook-model#4. Investment]].
- **Differentiation.** Strava doesn't do this. Apple Health doesn't do this. iOS Memories doesn't do this. Nobody does it well for pets.

---

## Strategic position — resolved

> [!success] Decision (locked in)
> **Strategically: Pillar 3 — Health Intelligence** ([[concept]], [[value-props]]). We position from day 1 as a pet health companion.
> **Tactically: phased build.** Food logging + portion targets ship in **v1.2**, vet PDF + weight/BCS in **v1.3**, Diet Library in **v1.4**. See [[roadmap]] for the full schedule.
>
> The framing change is free — it costs nothing to say "we're a pet health companion" from day 1. The implementation is heavy and follows the MVP loop validation.

---

## Direction options for the feature itself

### A — Input model

This is the make-or-break decision. Food logging is famously the #1 churn driver in MyFitnessPal — people quit because logging is too tedious. Same problem here, possibly worse (pet food brands are messier than human food).

| Option | Friction | Coverage | Build cost |
|---|---|---|---|
| **Manual entry (brand + grams)** | High — kills retention | 100% | Low |
| **Barcode scan** | Low for packaged food | ~70% (covers kibble / canned) | Low–medium (need product DB) |
| **Photo recognition** | Very low | ~40% (wet food + treats hard) | High (ML model) |
| **Quick-add favourites** | Lowest — "same as yesterday" | 90% for routine eaters | Low |
| **Voice ("Mochi just had her dinner")** | Low | All food | Medium (NLU) |
| **Smart feeder API** | Zero (passive) | ~5% of users have one | Low (integration) |

> [!tip] Recommended stack
> **Quick-add favourites (default) + Barcode scan (for new foods) + Manual (escape hatch)**. Photo recognition and voice are nice but defer until the baseline works. The quick-add covers 90% of usage — most dogs eat the same brand twice a day.

### B — Recommendation engine

How does the app decide what to recommend?

- **Calorie target** = base metabolic rate × activity multiplier × life-stage modifier × condition modifier. Standard veterinary formula (RER = 70 × kg^0.75, then MER multiplier).
- **Per-pet calibration** — uses the same data we already collect for [[features/breed-aware-activity-targets]]. No extra onboarding.
- **Activity-coupled** — high-walk days warrant more calories; rest days less. *This is unique to us because we already have the activity data.*
- **Surfacing** — daily and weekly views. "Mochi has eaten 80% of her daily calories — one more meal expected."
- **Always defer to vet** — same liability framing as breed targets. "Guidance, not medical advice."

> [!important] Activity-coupled is the moat
> Standalone food trackers can't adjust for activity. *We can.* If the dog walked 5km today, calorie target adjusts. This is something only an app with both food + activity data can offer.

### C — Vet PDF

> [!success] Confirmed scope at launch
> **PDF only.** No clinic-side integration, no portal, no API partnership. The user generates a PDF, emails or AirDrops it to their vet, the vet reads it. Clinic / partnership integrations are post-traction.

Contents of the PDF:

- Time period (week / month / 3-month before visit; user picks).
- Daily intake by food type.
- Calorie totals + treat ratio.
- Adherence to recommended target (or to vet-prescribed plan, if entered).
- Weight + Body Condition Score trend (if logged).
- Notable deviations (skipped meals, vomiting flags, anomalies).
- Free-text notes section the owner can fill in.
- Pet profile summary (breed, age, weight, conditions).
- Pet photo at the top — it's a vet report, but it should still feel like *this dog*.

**Design the layout with vets, not engineers.** Pilot with 5–10 vets before shipping — but for *layout review*, not for any integration.

### D — Diet sharing — the **Diet Library**

The user's clarification: it's *diets*, not *diaries*. We share *what kind of food this dog eats* (brand, type, portion size, schedule) — as a reference for owners of similar dogs. Not day-by-day intake logs.

> [!success] Confirmed direction
> **Anonymised community database** — the Diet Library — where users browse "what do dogs like mine actually eat?" Users opt-in to publish their own dog's current diet for others to reference. Diet ≠ diary.

How it works:

- Browse view: filter by breed, age band, weight, conditions → see aggregate ("Most common foods for shibas, 8 kg, 3 yrs: Brand A 32%, Brand B 18%, Brand C 14%").
- Detail view: anonymised diet cards. "Female husky, 22 kg, 4 yrs, no conditions → 240g Brand X morning + 240g evening + 1 dental treat."
- Opt-in publishing: user toggles "publish my dog's diet to the Library." Identity stripped; pet name optionally hidden; only the structured diet data shared.
- No prices, no affiliate links, no influencer content in MVP. **Strictly reference data**, not commerce or social.

Why this shape:
- "Friend-only diet sharing" — low value; not enough variety to be useful.
- "Vlog-style food posts" — opens the door to paid placements and fad diets. We don't want that.
- The Library is a *Wikipedia for pet diets*, not a TikTok for pet food.

Ships **v1.4** — needs aggregate data volume to be useful. A library with 10 huskies in it is useless; with 10,000, it's powerful.

### E — Disease support

> [!warning] We are not a medical app. We never diagnose.
> Three things we *can* do safely:
> 1. **Cleanly present data** for the vet to interpret.
> 2. **Flag deviations** ("usually eats 2 meals; only 1 in the last 3 days") — observation, not diagnosis.
> 3. **Track adherence** to a vet-prescribed plan (the vet sets the plan; we just measure compliance).

What we should NOT do:
- ❌ Suggest the dog has a condition based on intake patterns.
- ❌ Recommend prescription diets.
- ❌ Allow user-generated "this food cured my dog of X" content without moderation.

---

## What gets logged (data model additions)

```
Meal Entry
- date_time
- pet_id
- food_id (FK to Food)
- portion_grams (or units: cups, scoops, count)
- meal_type — breakfast / dinner / treat / supplement
- given_by — user_id (which household member fed)
- notes (optional)

Food
- brand
- product_name
- type — dry kibble / wet / treat / raw / homemade / supplement
- kcal_per_100g
- macros (protein / fat / carb %)
- barcode
- ingredients (optional)
- vet_prescription (boolean)

Weight Entry (optional, separate)
- date
- pet_id
- weight_kg
- body_condition_score (optional, 1–9 scale)
- notes

Vet Report
- pet_id
- period_start / period_end
- generated_at
- shared_with — vet email or link
- expires_at
- contents (snapshot JSON)
```

---

## UX guidance

- **Quick-add is the default entry point.** Home screen shows "Add meal: morning kibble (same as yesterday)". 1 tap.
- **Never gamify food logging.** No streaks tied to logging. No "you forgot to log dinner!" guilt notifications. Food is sensitive — easy to slip into eating-disorder territory if mistuned.
- **Anti-double-feeding alert.** "Mochi was fed at 7:12am by Anna — confirm second meal?" Low-friction, high-value.
- **Weekly summary, not daily obsession.** Daily numbers fluctuate; weekly averages are the actual signal.
- **Pet-first framing.** "Mochi got 95% of her calories this week" — not "you fed her correctly this week."
- **Body condition score (BCS) is the gold standard**, not weight alone. Educate users on it gently.

---

## How it interacts with everything else

| Module | Interaction |
|---|---|
| [[features/breed-aware-activity-targets]] | Shares pet data + life-stage + breed logic. Activity drives calorie target. |
| [[features/pet-walking-activity]] | High-walk days adjust calorie target up. |
| [[features/daily-pet-log]] | Meal entries become part of the daily timeline. |
| [[features/auto-vlog-export]] | Sample template: "Mochi's week — 7 walks, 47 meals, 1 trip to the beach." Food adds richness, not centrepiece. |
| [[features/privacy-controls]] | Vet-share is a new visibility tier ("shared with vet"). |
| [[features/dog-walker-mode]] | Dog walker can log "fed at 12:30" if owner permits. Closes the household-feeding-confusion loop for service users. |
| [[retention/2-daily-loop]] | Meal-log is another daily ritual hook (carefully — see "never gamify" above). |
| [[retention/4-progression-loop]] | Year-in-review: "Mochi ate 47kg of kibble this year, walked 832km — that's 18m per kibble piece." Fun + sticky. |

---

## Open questions

- **Strategic** — Option 1, 2, or 3 above? (This is the call that gates everything else.)
- **Input model** — confirm "quick-add + barcode + manual" baseline, or push to include photo recognition at MVP?
- **Food database** — do we license one (e.g. Open Pet Food Facts, if it exists) or build our own crowd-sourced?
- **Recommendation source** — RER × MER formula (industry standard), or partner with a veterinary nutritionist for proprietary algorithm?
- **Vet partnerships** — do we need a vet advisory board before launching the recommendation engine?
- **Diary sharing** — community database (recommended), friend-only, both, or none?
- **Treat tracking** — sub-category of food, or separate? (Owners often want this — "am I over-treating?")
- **Water tracking** — include or skip? (Hard to measure; only matters for specific conditions.)
- **Smart feeder integrations** — partner with Petnet / Petlibro / SureFlap on day 1, or wait?
- **Liability** — do we need professional indemnity insurance before shipping recommendations?

## Related

- [[concept]] — would expand to a third pillar
- [[value-props]] — candidate **Prop 3 — Health Intelligence**
- [[features/breed-aware-activity-targets]] — shares the calibration engine
- [[features/pet-walking-activity]] — provides activity data to adjust calorie target
- [[features/dog-walker-mode]] — household feeding coordination
- [[retention/5-ethical-guardrails]] — food tracking has serious ethical considerations
