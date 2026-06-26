---
type: product-spec
project: TimeKids
status: draft
date: 2026-06-24
tags:
  - app-idea
  - child-audio
  - privacy
  - parent-report
  - edtech
---

# TimeKids — Voice Memory and Child Audio

## Product stance

Child voice recording can be a strong emotional feature for parents, but it should not be the default data path.

Default:

- Parent asks the child the learning-check question.
- Child can answer naturally by mouth.
- If the app uses voice for AI/transcription, convert voice to text and discard raw audio.

Optional memory mode:

- Parent can explicitly save a short voice clip as a family memory.
- Saved clips are parent-controlled.
- Saved clips are not required for learning progress.

## Drawing stance

Drawing should be real-world paper first.

The "try together" activity can say things like:

- "Draw a blue river on paper."
- "Point to the boat."
- "Make a quick rocket picture together."

The app does not need an in-app drawing canvas for v1.

## Voice memory rules

If voice memories are included:

- Off by default.
- Parent must actively tap **Save this voice memory**.
- Explain clearly what is being saved.
- Do not save background audio.
- Keep clips short.
- Let parent replay, delete, and export.
- Provide per-child delete-all.
- Do not use saved clips for training.
- Do not share clips with third parties except required storage/transcription processors.
- Separate "voice for learning transcription" from "voice saved as memory."

## Recommended v1 behavior

For beta/v1, use:

- voice answer: optional,
- transcription: optional,
- raw audio: discarded after transcription by default,
- saved voice memory: post-beta, not core v1.

When saved voice memory ships later, keep it behind parent gate/settings, not in the child flow.

## Why the bar is high

Regulators treat child voice recordings as sensitive personal data. The FTC COPPA FAQ says photos, videos, and audio recordings containing a child's image or voice are personal information. Hong Kong PCPD child privacy guidance also emphasizes children's vulnerability and age-appropriate protection when collecting personal data.

## Open decisions

- Is saved voice memory a free trust-building feature or a premium family-memory feature after beta?
- Is audio stored locally/on-device first, or in cloud storage?
- What is the default retention period?
- How does the parent delete all child audio?
- Can parent export a memory clip?
