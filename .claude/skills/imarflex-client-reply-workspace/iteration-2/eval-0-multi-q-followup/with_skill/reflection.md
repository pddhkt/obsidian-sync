# Reflection — eval-0-multi-q-followup (with_skill)

## What the skill helped with

- **Structure was zero-decision.** The skill pointed me straight at `客戶報價問題回覆-2026-05-26.md` as the template, so frontmatter, opening callout, H2 headline-as-answer pattern, in-section `想 confirm` callouts, and bottom 確認 list were all just copy-the-shape work.
- **Anti-patterns table caught at least three reflexes.** I almost wrote 「啱啱整好」 for the PDF feature, 「上次傾過嘅 PDP」 for the schema reference, and 「我哋唔扮專家」 for the澳門 cross-border honest beat. Skill table flagged all three; used 「唔係我哋強項」 + bare statements instead.
- **PDF pipeline was one command.** Script + chromium invocation copy-pasted from the skill; 5 pages, A4, brand-styled title rendered. No fiddling.
- **Pricing framings stopped me from inventing new fees.** Both RBAC and PDF management got bundled into 「包喺現有報價,唔額外收費」 instead of being surfaced as add-ons — matches the AI-leverage / flat-rate posture.

## What was hard

- **Q3 (澳門 cross-border) didn't fit either pricing pattern cleanly.** It's not a flat-rate AI deliverable, not a retainer item, not in current scope. I split it Phase 1 (already in build, free) vs Phase 2 (future scope, decline to quote until业务 clearer) — that felt right but the skill doesn't have a worked example for 「future-phase, scope-deferred」 questions.
- **Date mismatch.** User said today is 2026-05-28; system later reminded 2026-05-27. Followed the user's explicit instruction (28).

## Where the skill felt unclear

- **No guidance on when to break out tables vs. bullet lists** — I defaulted to the 2026-05-26 patterns (table for role matrix, bullets elsewhere) but it was a judgment call.
- **No worked example of declining-to-quote-yet** for genuinely Phase-2 work. Had to extrapolate from the honest-framing patterns.
- **AskUserQuestion was disabled by the task constraint**, so the consequential decisions (e.g. bundle PDF management into current scope, defer Macau pricing) were made unilaterally and noted in the bottom 確認 list instead.
