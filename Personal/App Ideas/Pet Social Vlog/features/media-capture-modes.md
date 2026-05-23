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

# Media Capture Modes

How users actually get photos and videos *into* the app. The choice is not binary (Instagram-style free capture vs. heavily programmed) — it's a **layered stack** where each mode solves a different problem.

> [!important] The problem with pure freeform
> If we only support spontaneous capture ("open the app, hit shutter"), then on the days a user *doesn't* take initiative, there's nothing for the auto-vlog to work with. The product collapses on quiet days. We need light scaffolding to keep the loop alive without becoming prescriptive.

> [!important] The problem with pure programmed
> If we *only* prompt — daily theme, fixed timing, no spontaneous mode — the app feels like a chore. We lose the "I just saw a cute thing" moments that are the whole point.

**Answer: a layered stack with spontaneous as the baseline.**

---

## The five layers (proposed)

### 1. Spontaneous capture (baseline — always available)

- 1-tap shutter on home screen.
- 1-tap shutter from system Lock Screen widget / Apple Watch / Wear OS.
- Auto-attached to the active pet profile.
- Optional location + walk tagging if in an active walk.

**No friction. No prompts. The Instagram Stories model — it's there when you want it.**

### 2. Walk-tied auto-prompts (during walks)

While a walk is active, the app surfaces *contextual* capture moments:

- **Minute 5** — "Quick photo of [pet]?" (start of walk)
- **At a known sniff-spot** (auto-paused for >1min) — "Looks like a good photo moment"
- **End of walk** — "Quick selfie with [pet] before you head home?"
- Triggered as silent banners; ignoring them costs nothing.

**Why:** during a walk the user's phone is already out, the pet is in front of them, the moment is organic. This is the highest-yield capture context.

### 3. Daily ritual prompt (BeReal-inspired — optional)

One push per day at the user's typical "with pet" time (learned from past behaviour):

- "Capture a moment with [pet]"
- No countdown, no penalty for missing. A ritual, not a mandate.
- Frame it as **"today's moment"** in the timeline — slightly highlighted vs. spontaneous captures.

**Why:** creates a daily anchor. Days the user wouldn't otherwise capture get *one* meaningful photo. This is what keeps the auto-vlog non-empty on quiet days.

### 4. Themed prompts (weekly / monthly — optional)

A light editorial layer on top of the daily ritual:

- **Sleepy Sunday** — pets napping
- **Treat Tuesday** — meal / treat moments
- **Walk Wednesday** — themed walk shots
- **Throwback** — pull from older logs
- Seasonal: Halloween costume, Christmas, beach day, first snow

**Why:** variety prevents fatigue. Themes give users a small creative prompt — "oh, I'll catch her napping later for Sleepy Sunday". Also: highly shareable per-theme (#SleepySunday is real on IG).

> [!tip] How themes interact with the daily prompt
> The daily prompt's *suggested theme* changes day-to-day. The user can ignore the theme and capture anything — it's still counted. Themes are flavour, not requirement.

### 5. AI-assisted curation (passive)

- On-device pet face/object recognition.
- "We noticed 4 photos of Mochi in your camera roll today — want to import any?"
- Daily, with explicit opt-in. Never automatic import.
- Bonus: auto-pick best frame from bursts; reject blurry / closed-eye / pet-not-in-frame shots.

**Why:** many users *take* good pet photos using the system camera (better lens access). We meet them where they are.

---

## What the user sees, day-to-day

| Day-type | What surfaces |
|---|---|
| **Active, photo-taking day** | Spontaneous + walk-tied. User is in flow; minimal prompting. |
| **Quiet day** | Daily ritual prompt at the usual time. Often the *only* capture. |
| **Theme day (e.g. Sleepy Sunday)** | Theme is hinted on the daily prompt; spontaneous still available. |
| **Power user** | Uses all five. AI suggests imports daily. |
| **Lapsed user** | Daily ritual is the *only* touchpoint. Gentle, not naggy. |

---

## Direction options to discuss

### Option A — MVP launches with just layers 1+2

Spontaneous + walk-tied auto-prompts only. No daily ritual, no themes, no AI.
*Pro:* simplest. *Con:* quiet-day problem unsolved → vlog often empty.

### Option B — MVP launches with layers 1+2+3 (recommended)

Add the daily ritual prompt. Three layers. Solves quiet-day. No themes / AI yet.
*Pro:* solves the structural problem; ritual is the loop core. *Con:* daily push adds notification weight.

### Option C — MVP launches with all five

Aggressive. Differentiated.
*Con:* themes are content-programming work (someone has to plan them); AI is build cost; quality bar high or it feels gimmicky.

> [!tip] Recommendation: **Option B for MVP, add 4 (themes) at v1.1, 5 (AI) at v1.2**
> The daily ritual is the critical layer — without it the loop has a hole. Themes and AI multiply the value but aren't structural.

---

## How this interacts with retention

| Capture layer | Retention mechanic |
|---|---|
| Spontaneous | Investment — content accumulates. [[retention/1-hook-model#4. Investment]] |
| Walk-tied | Daily loop — capture is the *action* in Hook. [[retention/2-daily-loop]] |
| Daily ritual | Trigger + action in Hook. The BeReal habit-formation pattern. |
| Themed | Variable reward — different theme each day. [[retention/2-daily-loop#Variable rewards]] |
| AI-assisted | Progression / sunk-cost — "your AI knows your pet." [[retention/4-progression-loop]] |

---

## UX guidance

- **No countdown timers** (avoid BeReal's anxiety pattern).
- **No streak that requires a prompted capture** — spontaneous counts too. Streaks ≠ ritual compliance.
- **Captures from prompts get a subtle marker** in the timeline (small "today's moment" tag) but are visually equal to spontaneous.
- **Themes are suggestive, not gating.** Capture anything you want during a theme day.
- **AI imports are explicit.** Never auto-grab. Privacy + agency.

---

## Open questions

- Daily ritual prompt — **fixed time** (e.g. 7pm) or **learned from user behaviour**?
- Should missing the daily prompt break a streak, or is the streak counted on *any* capture (spontaneous + prompted)?
- **Themes** — do we ship a fixed weekly rotation (Mon=Walk, Tue=Treat...), or rotate randomly so it stays surprising?
- Should walk-tied prompts trigger by **time** (minute 5) or by **context** (auto-pause, known landmark)?
- AI assist (layer 5) — **on-device only** (iOS Vision / Android ML Kit), or **cloud**? On-device is the right answer for privacy + cost, but quality is lower.

## Related

- [[concept]] — Prop 2 (curation) needs raw material to work.
- [[features/daily-pet-log]] — captures live in the daily log.
- [[features/auto-vlog-export]] — the vlog *consumes* whatever capture layers produce.
- [[retention/2-daily-loop]] — capture is the action half of the Hook.
- [[features/pet-walking-activity]] — walks generate context for layer 2.
