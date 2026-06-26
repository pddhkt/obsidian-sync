---
type: grill-session
project: TimeKids
status: in-progress
created: 2026-06-22
tags:
  - app-idea
  - grill-session
  - edtech
  - kids
  - ai
---

# TimeKids — Grill Session

## Summary

(written at wrap-up)

## Decisions

| # | Question | Decision | Rationale |
|---|---|---|---|
| 1 | What is the product concept? | Audio-first interactive history app for young children with story, character chat, quiz, reward, and adult progress summary. | This is the common thread across the build brief, competitive ideas, and roadmap. |
| 2 | Should real public-figure voice cloning be core? | No for the initial product. Use original characters or designed/consented voices. | Public figures create consent, platform policy, and safety risk; original IP is more defensible. |
| 3 | Should the first technical demo require paid API keys? | No. The demo must run fully with scripted fallback and sample summaries. | Zero-key demo reduces sales friction and keeps development/test loops reliable. |
| 4 | Is the first launch B2C-first, B2B-first, or hybrid? | B2C-first, with the product kept B2B-ready. | Current priority is to gain traction and proof before pitching kindergartens. A full classroom-first build needs stronger school access and could slow the first proof. |
| 5 | Should TimeKids be one shared app/core or separate B2C and B2B apps? | One shared app/core. Ship Home mode first; add Classroom mode later. | Separate B2C/B2B apps would duplicate login, content, analytics, QA, and maintenance before either market is proven. |
| 6 | Who is the first B2C buyer segment? | Hong Kong bilingual parents of children aged 4–6 who already pay for enrichment or educational apps and have an iPad/tablet at home. | This segment matches the later kindergarten path, values educational screen time, and gives localization a real advantage instead of competing as a generic global kids app. |
| 7 | What is the smallest first-launch content scope? | At least 10 stories, with Chinese included. | For B2C parents, one lesson may feel like a demo rather than a product. Chinese support is required for the HK bilingual parent segment. The tradeoff is production load, so the 10-story scope needs tiering: a few flagship stories deeply polished, with the rest simpler but complete. |
| 8 | Should all 10 launch stories be equally polished? | No. Use 2–3 flagship stories plus 7–8 simpler complete stories. | This preserves parent-perceived value while keeping first launch feasible. Flagship stories prove the full product magic; simpler stories make the catalog feel substantial without multiplying AI-chat production cost too early. |
| 9 | Which language package launches first? | Traditional Chinese + Cantonese voice first, with English available as a toggle; Mandarin/Simplified Chinese later. | Cantonese audio is the strongest HK differentiation. English is useful for bilingual families. Mandarin/Simplified targets a different market and would add production burden too early. |
| 10 | What adult dashboard should launch first? | Parent report first; teacher roster/dashboard later. | Parent report proves B2C value and can reuse the same session, quiz, transcript, and summary data that later powers the teacher dashboard. Full classroom roster/admin would slow the first consumer proof. |
| 11 | What is the first monetization ask? | Free private beta, then low-price founding parent plan, then later discounted/free kindergarten pilot. | The product needs proof that children repeat sessions and parents see value before charging seriously. School pricing should wait until there is B2C evidence to make the pilot pitch credible. |
| 12 | What proof is needed before pitching kindergartens? | 5–10 family beta users; 60–70% child completion of one full loop; 3–5 children returning for a second session; 3 parent quotes/testimonials; one clear parent report example; Cantonese voice quality tested enough for demo confidence. | This turns the school pitch from an idea into evidence: kids use it, parents understand it, the report is visible, and the Cantonese demo will not undermine credibility. |
| 13 | Should each story have its own AI avatar, or should there be a recurring mascot? | Use one recurring TimeKids mascot who visits each story and meets local side characters. | The mascot becomes the brand anchor and gives children continuity across stories, while local side characters add cultural flavor without making every lesson depend on a new main persona. |
| 14 | Should the recurring mascot be child-like or abstract/magical? | Child-like time explorer. | Children aged 4–6 can mirror and trust a child-like peer guide more easily than an abstract narrator. It also keeps the app warm and grounded while still allowing magical time-travel framing. |
| 15 | Should the working mascot name be Timi? | Yes, use Timi first as the working mascot name. | Timi is short, easy in English/Cantonese contexts, brandable, and good enough to move forward. It can still be tested or renamed later if families react poorly. |
| 16 | Who carries the main AI chat and lesson interaction? | Timi is the guide and main AI chat avatar. Timi guides the child through each section, interacts with local side characters, and creates child interaction moments during the story. Side characters are mostly scripted/light-interaction participants. | This preserves a single trusted guide and simpler safety model while still making each story feel alive. Mid-story interactions keep children engaged before the post-story chat/quiz. |
| 17 | How interactive should each flagship story be? | Each flagship story should have 4–5 short scenes, 2 mid-story interaction moments, a 2–3 turn post-story chat, a 3-question picture quiz, and a reward/sticker. | Two mid-story interactions are enough to keep ages 4–6 engaged without breaking story flow. The structure stays repeatable for content production and gives parents a clearly complete experience. |
| 18 | What should the simpler non-flagship stories include? | Each simpler story should have 3 short scenes, 1 mid-story tap interaction, a 2-question picture quiz, and a reward/sticker, with no live/freeform chat. Timi still narrates and reacts; the local side character gets 1–2 scripted lines. | This lets the first launch offer 10 stories without turning every story into a full flagship build. The stories still feel complete, but production stays feasible. |
| 19 | What are the first 10 launch stories and flagship split? | Flagship: Ancient Egypt, Ancient China, Hong Kong Old Harbour. Simpler: Silk Road, Terracotta Army, Greek Olympics, Roman Roads, Viking Ships, Leonardo's Workshop, Moon Landing. | The split gives the launch global wonder, Chinese relevance, and local Hong Kong differentiation as the deepest experiences, while the simpler set provides catalog breadth without overloading production. |
| 20 | What is the first content production order? | Build Ancient Egypt flagship first, Hong Kong Old Harbour flagship second, Ancient China flagship third, then produce the seven simpler stories from the template. | Egypt is the easiest visual full-loop demo; Hong Kong proves local positioning and Cantonese-first value; Ancient China proves the Chinese cultural content lane. The simpler stories should move faster after the flagship template is proven. |
| 21 | What script workflow should be used? | Use fixed Chinese-first bilingual templates for all stories. Write Traditional Chinese/Cantonese first, then English. | A fixed template keeps the 10-story launch producible and consistent. Chinese-first prevents the Cantonese experience from feeling like a translation of an English product. |
| 22 | What should the first parent report include? | Parent report should include an AI-generated supportive insight summary plus a parent-led check-in question/activity to confirm the child understood the lesson goal. | Parents need visible value after screen time. The AI summary explains what happened; the check-in gives parents a simple way to ask the child and confirm the learning outcome without turning it into a stressful test. |
| 23 | What format should the parent-led learning check use? | Each report should include one parent question plus an optional "try together" activity. The activity can happen outside the app or inside the app, and the child can answer by speaking, drawing, or typing. | This keeps the check flexible for real family use and avoids forcing extra screen input. It also lets parents confirm understanding naturally while preserving an optional in-app artifact when useful. |
| 24 | Should drawing and voice memories be captured in-app? | Drawing should be real-world/offline first. Voice can become an optional parent-controlled memory feature, but audio should not be saved by default. For learning checks, default to parent conversation and, if voice is used for AI, transcribe then discard audio unless the parent explicitly saves a clip. | Paper drawing avoids unnecessary app complexity. Child voice recordings can be emotionally valuable for parents but are sensitive personal data, so they need explicit opt-in, delete controls, retention rules, and a clear separation from AI/transcription processing. |
| 25 | When should saved voice memories ship? | Post-beta, not core v1. | V1 should prove the learning loop, Cantonese experience, and parent report first. Saved child audio needs stronger consent, retention, delete, export, and storage UX before it is safe to ship broadly. |
| 26 | What should Timi's final visual direction be? | Timi should be a simple, cute, non-human hamster-style mascot. The home/story navigation should be Timi's hamster house/playground, where rooms/objects lead to different story worlds. | A hamster mascot is more reusable than a human child avatar for logo, app icon, stickers, and UI. The house/playground gives the home screen a concrete, playful navigation metaphor instead of a generic story grid. |
| 27 | Should Lottie replace Rive for Timi and the graphic-heavy UI? | Not as the primary system for Timi. Use Lottie/dotLottie as a secondary tool for lightweight loops, rewards, sticker bursts, loading, and fallback mascot states; keep Rive as the stronger first choice for app-driven Timi states. | The LottieFiles motion-design skill was installed and a hand-built Timi idle Lottie prototype was rendered. It proved Lottie can create simple alive motion, but manual Lottie JSON is too brittle and not close to Duolingo-quality. To reach that quality with Lottie, the team would need a real designer/export workflow, not code-authored JSON. |
| 28 | Should Timi be created layer by layer? | Yes. Final Timi should be authored as layered source art, then rigged/animated in Rive or exported into Lottie loops where appropriate. | Layered parts let Timi blink, talk, wave, squash/stretch, and react while preserving the GPT-generated visual quality. A flat PNG can only bob as one piece; hand-coded shapes do not match the desired mascot look. |
| 29 | What is the next build target? | Private beta for 5-10 Hong Kong bilingual families, not a full paid launch. Build exactly the 16 screens/states in [[private-beta-screen-plan]]. | The product needs proof that children complete the loop and parents see value before paywall, subscription management, teacher dashboard, reward shop, or advanced classroom tools. |
| 30 | What contracts should drive the beta build? | Use `StoryDefinition`, `StorySession`, and `MotionAsset` contracts, with reports generated from `StorySession + parentReportSeed`. | This keeps story production, runtime evidence, parent reports, no-key fallback, and motion implementation consistent before scaling to 10 stories. |

## Open questions

- [ ] Validate the Cantonese realtime voice stack with sample adult and child audio before locking provider choice.
- [ ] Define Timi's final voice, personality, and Cantonese/English speaking style.
- [ ] Define the hamster house/playground navigation map and which objects unlock which stories.
- [x] Decide whether Rive is the primary interactive animation tool for Timi and key home-hub objects.
- [ ] Decide whether the first mobile build uses React Native or KMP.
- [ ] Define child-audio retention, deletion, export, and consent UX before saving any audio.
- [ ] Run the one-week Rive vs Lottie/dotLottie comparison in the real app stack.

## Log

- 2026-06-22 session start; captured the provided v2 build brief, previous product-roadmap ideas, and the new concern that B2C-first may be better before kindergarten pitching.
- 2026-06-22 checkpoint; decided first launch should be B2C-first while keeping the product B2B-ready for later kindergarten pilots.
- 2026-06-22 checkpoint; decided TimeKids should use one shared product core, with Home mode first and Classroom mode later.
- 2026-06-22 checkpoint; defined the first B2C buyer as HK bilingual parents of ages 4–6 with existing enrichment/app spending and tablet access.
- 2026-06-23 checkpoint; first-launch content scope changed from one polished lesson to at least 10 stories, with Chinese included.
- 2026-06-23 checkpoint; decided first launch should use 2–3 flagship stories plus 7–8 simpler complete stories, not 10 equally polished flagship lessons.
- 2026-06-23 checkpoint; decided first launch language package should be Traditional Chinese + Cantonese voice with English toggle, while Mandarin/Simplified Chinese comes later.
- 2026-06-23 checkpoint; decided first adult surface should be a parent report, with teacher roster/dashboard added later for B2B pilots.
- 2026-06-24 checkpoint; decided monetization should sequence from free private beta to low-price founding parent plan, with kindergarten pilots later.
- 2026-06-24 checkpoint; defined the kindergarten pitch gate as family beta usage proof, parent quotes, a parent report example, and Cantonese voice demo confidence.
- 2026-06-24 checkpoint; decided the avatar architecture should use one recurring mascot who meets story-specific local side characters.
- 2026-06-24 checkpoint; decided the recurring mascot should be a child-like time explorer rather than an abstract magical guide.
- 2026-06-24 checkpoint; locked Timi as the working mascot name for now, with room to rename after family testing.
- 2026-06-24 checkpoint; decided Timi should be the guide/main AI chat avatar, interacting with side characters and giving children mid-story interaction moments.
- 2026-06-24 checkpoint; decided each flagship story should use 4–5 scenes, 2 mid-story interactions, short post-story chat, 3-question picture quiz, and reward.
- 2026-06-24 checkpoint; decided simpler launch stories should use 3 scenes, 1 mid-story tap interaction, 2-question picture quiz, and reward, with no live/freeform chat.
- 2026-06-24 checkpoint; locked the first 10 launch stories and marked Ancient Egypt, Ancient China, and Hong Kong Old Harbour as flagship stories.
- 2026-06-24 checkpoint; set production order as Ancient Egypt flagship, Hong Kong Old Harbour flagship, Ancient China flagship, then the seven simpler stories.
- 2026-06-24 checkpoint; decided all stories should use fixed Chinese-first bilingual templates, with Traditional Chinese/Cantonese written before English.
- 2026-06-24 checkpoint; decided the parent report should include an AI insight summary plus a parent-led check-in question/activity to confirm the child understood the lesson goal.
- 2026-06-24 checkpoint; decided each parent report should include one parent question plus an optional try-together activity that can happen offline or in-app, with child response by speaking, drawing, or typing.
- 2026-06-24 checkpoint; clarified drawing is real-world paper first and voice memories should be optional parent-controlled saves, not default audio retention.
- 2026-06-24 checkpoint; decided saved voice memories should be post-beta, not a core v1 feature.
- 2026-06-24 checkpoint; decided Timi should be a simple non-human hamster-style mascot, with Timi's hamster house/playground as the story navigation hub.
- 2026-06-24 opened UI graphic production branch; recommended mixed stack with Rive for interactive Timi/hub animation, image/SVG layers for scene art, and CSS/framer-motion for app UI motion.
- 2026-06-25 installed the LottieFiles `motion-design` Codex skill and created/rendered a local Lottie prototype for Timi's idle loop at [[Personal/App Ideas/TimeKids/design-research/lottie-prototype/README|TimeKids Lottie Prototype — Timi Idle Loop]]. Result: Lottie is useful for simple loops/rewards, but Rive remains the recommended primary system for Timi's interactive state machine.
- 2026-06-25 fixed the Lottie HTML preview so it works when opened directly, added an actual-Timi-art image-layer Lottie comparison, and checkpointed [[Personal/App Ideas/TimeKids/timi-layered-animation-plan|TimeKids — Timi Layered Animation Plan]] as the production direction.
- 2026-06-25 checkpoint; locked the next build as private beta for 5-10 HK bilingual families, with exactly 16 screens/states documented in [[private-beta-screen-plan]].
- 2026-06-25 checkpoint; added [[implementation-contracts]] for `StoryDefinition`, `StorySession`, `MotionAsset`, report generation, and no-key/no-internet fallback behavior.
- 2026-06-25 checkpoint; added [[private-beta-test-plan]] with Ancient Egypt no-reading completion, Rive/Lottie comparison, 10-story readiness, parent report value, and recovery tests.
- 2026-06-25 checkpoint; aligned [[ui-graphic-production]] with the React Native/Reanimated private-beta stack while keeping Rive for stateful Timi and Lottie/dotLottie for one-off delight.
