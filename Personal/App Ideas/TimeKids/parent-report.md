---
type: product-spec
project: TimeKids
status: private-beta-plan
date: 2026-06-25
tags:
  - app-idea
  - parent-report
  - ai-summary
  - edtech
---

# TimeKids — Parent Report

## Purpose

The parent report proves that TimeKids is **better screen time**, not passive entertainment.

After a child finishes a story, the parent should quickly see:

- what the child explored,
- what the child seemed interested in,
- whether the child understood the main lesson goal,
- one simple way to talk to the child about it.

## First-launch report sections

| Section | Purpose |
|---|---|
| Story completed | Shows which story the child finished |
| Sticker earned | Gives parent-visible reward context |
| AI insight summary | Supportive session summary based on story progress, choices, chat, and quiz |
| Learning check | One parent-led question or mini activity to confirm the key lesson |
| Quiz evidence | Gentle wording: first try / after a little help / revisited together |
| Child interests | Simple observed signals, e.g. boats, animals, pyramids, rockets |
| Suggested follow-up | One short dinner/car/walk question |
| Details | Optional transcript and quiz attempts |

## AI summary rules

The AI summary must be:

- supportive,
- specific to this session,
- short,
- non-diagnostic,
- based on observed behavior only,
- written for a parent, not a clinician or teacher.

Avoid:

- ability labels,
- intelligence judgments,
- deficit language,
- clinical terms,
- "behind," "struggling," "attention issue," or similar language,
- percentages as the main frame.

Good style:

> Timi explored the Nile with your child today. They noticed the boat and picked the river picture after a little help, which is a good topic to revisit together.

## No-key fallback summary

The parent report must feel complete even when AI summaries are unavailable.

If there is no API key or the network is unavailable, generate a template summary from:

- story completed,
- reward earned,
- interaction choices,
- quiz attempts,
- saved interests,
- the story's `parentReportSeed`.

The fallback report should never mention API keys, model errors, or "AI unavailable" to parents. It should simply read as a normal concise progress note.

Implementation contract: [[implementation-contracts]].

## Learning check

The learning check is a parent-led confirmation prompt. It should feel like a short conversation or game, not a school test.

For each story, include:

- **Main learning goal:** the one thing we wanted the child to understand.
- **Ask your child:** one simple question.
- **Look for:** 1–2 acceptable answer ideas.
- **Try together:** optional mini activity that can happen outside the app or inside the app.

Example:

| Field | Example |
|---|---|
| Main learning goal | The Nile helped people, animals, and boats in Ancient Egypt. |
| Ask your child | "Can you show me which picture is the river?" |
| Look for | Child points to river/water/boat, or says boat/river/water. |
| Try together | Draw a blue river line and put a boat sticker on it. |

## Optional child response

The parent should be able to use the learning check without making the child enter anything into the app.

If the parent wants to capture a response, the child can answer by:

- speaking,
- typing.

Drawing should be real-world paper first, not an in-app canvas for v1.

Voice can also become a parent memory feature: the parent may want to replay the child's answer later. This should be **explicit opt-in**, not default recording. If voice is used only for AI/transcription, raw audio should be discarded after transcription unless the parent taps a separate save action.

See [[voice-memory-and-child-audio]].

This should be optional. The main job is to help the parent talk with the child, not force another graded activity.

## Parent report copy principles

- Say "ask your child" rather than "test your child" in the UI.
- Keep it warm and useful.
- Give parents one concrete action, not a long report.
- Let "try together" happen offline or in-app.
- Treat saved child voice as an explicit parent-controlled memory, not default analytics data.
- Make transcript/details optional.
- Use Traditional Chinese and English.
