---
type: test-plan
project: TimeKids
status: private-beta-plan
date: 2026-06-25
tags:
  - app-idea
  - private-beta
  - testing
  - edtech
aliases:
  - TimeKids Private Beta Test Plan
---

# TimeKids — Private Beta Test Plan

## Test purpose

Private beta tests whether the child loop and parent value work for **5-10 Hong Kong bilingual families**.

This is not a public launch test. The goal is to learn whether the core loop is worth polishing and charging for later.

## Required product tests

| Test | Steps | Pass criteria | Evidence to capture |
|---|---|---|---|
| Ancient Egypt no-reading completion | Give the child the iPad and start Ancient Egypt with audio on. Parent helps only if stuck. | Child can complete story, interaction, quiz, and reward using listening and tapping. | Completion event, where help was needed, parent observation. |
| Timi state comparison | Build the same idle/talk/reward/hotspot test in Rive and Lottie/dotLottie inside the app stack. | Team can compare quality, file size, iPad performance, workflow speed, and app-state control. | Screen recording, asset size, notes on integration friction. |
| 10-story readiness | Open every story card/object from the home hub. | Each story has Traditional Chinese/Cantonese, English, quiz, reward, and parent report seed. | Story checklist against [[launch-story-set]]. |
| Parent report value | Parent reads dashboard and one report detail after child completes a session. | Parent can explain what the child learned and what to ask next in under 2 minutes. | Parent quote, timing, report comprehension notes. |
| No diagnostic language | Review report copy and generated/template summaries. | Report never uses diagnostic, deficit, or ability-ranking language. | Copy audit checklist. |

## Required recovery tests

| Case | Expected recovery |
|---|---|
| No API key | Scripted chat and template report still work; no developer-facing key error appears. |
| No internet | Downloaded/bundled story loop continues; AI features switch to fallback; sync retries later. |
| Wrong quiz tap | Timi gives gentle retry; no red X, timer, punishment, or failure screen. |
| Off-topic child reply | Timi redirects to a safe picture choice or story-related prompt. |
| Mic denied | Picture replies remain available; child can complete without voice. |
| Reduced motion enabled | Time travel, reward, and scene transitions become short fades/static reveals. |

## Beta readiness checklist

- [ ] [[private-beta-screen-plan]] has all 16 screens accounted for in the app.
- [ ] Ancient Egypt flagship loop is complete end-to-end.
- [ ] Hong Kong Old Harbour and Ancient China are ready as flagship scripts/assets or clear sprint tasks.
- [ ] Seven simple stories are complete enough for narration, interaction, quiz, reward, and report seed.
- [ ] Parent report dashboard and detail use real `StorySession` data.
- [ ] No-key fallback is tested.
- [ ] No-internet fallback is tested.
- [ ] Cantonese voice provider spike has been run with adult and child-like samples.
- [ ] iPad visual polish pass is complete.
- [ ] Parent consent, privacy/delete-data basics, and parent gate are present.

## Pilot metrics

| Metric | Target for private beta |
|---|---|
| Family beta users | 5-10 |
| Child completion of one full story loop | 60-70% |
| Children returning for a second session | 3-5 children |
| Parent quotes/testimonials | 3 usable quotes |
| Parent report example | 1 clear shareable example |
| Cantonese voice confidence | Good enough that the demo does not feel weak or foreign to HK parents |

## Post-beta decision gate

Move to founding parent offer prep only if:

- children complete and repeat the loop,
- parents understand the value without long explanation,
- the report creates a reason to pay,
- Cantonese voice quality is credible,
- no-key/no-internet/mic-denied cases do not break trust.
