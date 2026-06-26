---
type: product-brief
project: TimeKids
status: private-beta-plan
date: 2026-06-25
tags:
  - app-idea
  - edtech
  - kids
  - ai
  - b2c
  - b2b
---

# TimeKids — Product Brief and Gathered Ideas

## One-line

An iPad-first interactive history app where young children learn through a friendly cartoon character who tells a story, chats safely with them, asks tap-the-picture questions, and produces supportive progress summaries for adults.

## First launch buyer

Hong Kong bilingual parents with children aged 4–6 who already pay for enrichment or educational apps and have an iPad/tablet at home.

The first promise is not "history class at home." The sharper promise is: **better screen time that feels magical to the child and gives the parent visible learning evidence.**

## Private beta target

The next milestone is a **private beta**, not a full paid public launch.

Private beta target:

- 5-10 Hong Kong bilingual families,
- children aged 4-6,
- Traditional Chinese/Cantonese-first experience with English available,
- enough product to test the child loop and the parent report value,
- no teacher dashboard, paywall, reward shop, full subscription management, or advanced classroom tools yet.

Screen scope: [[private-beta-screen-plan]].
Implementation contracts: [[implementation-contracts]].
Test gates: [[private-beta-test-plan]].

## Core child loop

1. Pick a story or character.
2. Watch/listen to a short animated story.
3. Chat with the same character through picture choices, voice, or text.
4. Answer a short tap-the-picture quiz.
5. Earn a sticker/reward.
6. Adult sees transcript, quiz results, and a gentle summary.

## Private beta content scope

Private beta should include **10 stories**, with **Traditional Chinese/Cantonese + English included**.

Use a tiered structure:

- 3 **flagship stories** with the full story → mid-story interaction → bounded Timi chat → quiz → reward → parent report loop.
- 7 **simple complete stories** with narration, one mid-story interaction, picture quiz, reward, and short report seed.

Ten full AI-chat lessons at equal polish is too much for a first proof unless the content pipeline becomes extremely fast. The launch needs to feel substantial to parents, but the production load should stay focused on proving the flagship experience.

Private beta story set: [[launch-story-set]].
Story production template: [[story-script-templates]].

## Private beta build target

The private beta still needs one story implemented end-to-end first before scaling:

- **First flagship lesson:** Ancient Egypt.
- **Character:** original friendly history guide or young pharaoh-style character.
- **Flow:** language/setup → profile → Timi house → story preview → time travel → story scenes → picture interaction → bounded chat → picture quiz → reward → museum → parent report.
- **Adult side:** parent report first; teacher dashboard later.
- **No API key requirement:** scripted fallback chat and sample summaries must make the demo feel complete.

## First launch language package

Launch with:

- UI: Traditional Chinese + English.
- Narration/character voice: Cantonese + English.
- Parent report: Traditional Chinese + English.
- Child choices: Traditional Chinese + English labels, spoken in the selected language.
- Mandarin/Simplified Chinese: later.

Technical caveat: Cantonese realtime AI must be validated before provider lock-in. See [[cantonese-realtime-ai-research]].

## Kid design rules

- No reading required.
- Audio-first with replay everywhere.
- Huge touch targets.
- No punishment, red X, timers, or game-over states.
- Wrong taps get gentle retry feedback.
- Correct taps get big positive feedback.
- Character always feels alive through idle motion, blinking, talking, and celebration states.
- Maximum 3 choices per turn/question.
- Linear path with one obvious next action.

## AI/chat requirements

- The character must stay continuous from story narration into chat.
- Every character line is spoken and shown as transcript.
- Child reply modes:
  - picture choice buttons as the reliable primary path,
  - push-to-talk voice as best-effort only,
  - text input as secondary/assisted path.
- Chat is short and bounded, then steers to quiz.
- Guardrails: age-appropriate, no frightening detail, no personal-info collection, redirect off-topic, supportive if the child seems upset.
- With `ANTHROPIC_API_KEY`, server-side routes can call Claude.
- Without the key, scripted fallback must work.

## Character architecture

Use **one recurring TimeKids mascot** as the brand anchor. Timi is a simple non-human hamster-style mascot who lives in a hamster house/playground. The mascot visits each story world and meets **local side characters** who represent the specific time/place.

Why this structure:

- Children get continuity from one familiar friend.
- The brand has one recognizable face for app icon, marketing, stickers, and rewards.
- The home screen gets a concrete navigation metaphor: Timi's hamster house/playground.
- Each story still gets cultural flavor through a local side character.
- Production is easier because the recurring mascot can reuse the same rig, voice, behavior states, and safety prompt.
- The app avoids impersonating real historical figures.

Working model:

| Layer | Job | Example |
|---|---|---|
| Main mascot | Recurring guide, narrator, and emotional anchor | Timi, a bilingual hamster-style time guide |
| Local side character | Story-world friend who introduces local details | Egypt scribe helper, Ancient China inventor helper, HK harbour guide |
| Background characters | Non-chat visual flavor only | Builders, travelers, market people, astronauts |

The mascot should be able to speak Cantonese and English, but local side characters can have lighter scripted lines so the production load stays controlled. Timi should also create **mid-story interaction moments**: short pauses where the child taps a picture choice, answers a simple observation prompt, or helps Timi choose what to look at next.

Flagship story structure:

- 4–5 short scenes.
- 2 mid-story interaction moments.
- 2–3 turn post-story chat.
- 3-question picture quiz.
- reward/sticker.

Simpler-story structure:

- 3 short scenes.
- 1 mid-story tap interaction.
- no live/freeform chat.
- local side character gets 1–2 scripted lines.
- 2-question picture quiz.
- reward/sticker.

Current mascot direction: **simple hamster-style time guide**. Home hub direction: [[home-hub]]. Character spec: [[characters-and-avatars]].

## Adult reporting

The first adult surface is a **parent report**. A teacher dashboard comes later for classroom pilots. Same data, different framing.

| Data | Parent framing | Teacher framing |
|---|---|---|
| Lesson completion | What your child explored | Class progress |
| Quiz attempts | What to revisit together | Comprehension evidence |
| Conversation signals | Interests and curiosity | Engagement and lesson signals |
| Transcript | Optional review | Ground truth behind summary |
| Summary | Warm progress note | Supportive, non-diagnostic classroom insight |

First launch parent report should include:

- stories completed,
- stickers/rewards earned,
- quiz result summary,
- child interests and curiosity signals,
- AI-generated supportive insight summary,
- parent-led check-in question/activity to confirm the child understood the main lesson goal; optional activity can happen outside the app or inside the app, with child response by speaking or typing; drawing is real-world paper first,
- optional parent-controlled voice memory, if consent/retention/delete UX is ready,
- optional transcript review.

See [[parent-report]].
Voice memory privacy stance: [[voice-memory-and-child-audio]].

The full teacher roster, class-level analytics, and multi-child classroom management should wait until there is kindergarten pilot demand.

## Strategic options

### B2B-first thesis

Land in kindergartens, use classroom credibility and concentrated usage as the acquisition channel for home subscriptions.

Pros:

- Strong credibility if schools validate it.
- Teachers give structured feedback.
- Classroom use can lower parent acquisition cost later.
- School relationships and curriculum fit can become a moat.

Risks:

- Harder sales cycle.
- Needs more polished teacher operations.
- Requires stronger proof and connections than currently available.
- Schools may need discounts/free pilots at the start.

### B2C-first thesis

Launch first for parents to prove child engagement and gather usage traction, then pitch schools with evidence.

Pros:

- Faster to test.
- Less dependency on school connections.
- Early App Store/social proof helps later school pitches.
- Parent dashboard can be simpler than full teacher roster/admin.

Risks:

- Parent acquisition can be expensive.
- Compliance and app-store polish matter earlier.
- Without school channel, traction may be noisy.
- Could drift into consumer entertainment unless learning outcomes are clear.

## First monetization sequence

1. **Private beta:** free for 5–10 families, in exchange for feedback and permission to use anonymized testimonials or quotes.
2. **Founding parent plan:** low-price consumer plan after initial proof. Working range: HK$28–38/month or HK$198–298/year.
3. **Kindergarten pilots:** discounted or free pilot after B2C evidence exists, using parent traction and product usage as proof.

Do not start with full-price subscriptions or school sales as the main ask. The first commercial job is to prove that children repeat the loop and parents understand the learning value.

## Kindergarten pitch gate

Pitch kindergartens after the family beta can show:

- 5–10 family beta users,
- 60–70% of children completing one full story loop,
- 3–5 children returning for a second session,
- 3 parent quotes/testimonials,
- one clear parent report example,
- Cantonese voice quality tested enough that the demo feels credible.

The kindergarten pitch should be evidence-based: kids use it, parents understand the value, the adult report is visible, and Cantonese does not feel like a weak point.

## Current launch decision

Start **B2C-first**, with the product kept B2B-ready and built on one shared product core.

For launch, make a home/kid demo/app with a B2B-ready backend/data model:

- Kid experience ships first.
- Parent progress view ships as the adult surface.
- Teacher dashboard stays as a near-term pilot adaptation, not a separate product from day one.
- The architecture keeps `Kid`, `Session`, `Message`, `QuizResult`, and `Summary`, so classroom roster can be added without rework.

## Later pipeline ideas

- SVG/in-code character → HeyGen or similar avatar video for story.
- Browser TTS → ElevenLabs designed voice or consenting voice actor, not cloned public figures.
- Browser STT → privacy-safe STT later.
- SVG/emoji pictures → consistent generated stills.
- Scripted fallback → Claude live chat and summaries.
- SQLite demo → Postgres/Supabase/Convex production store.

## Safety and privacy stance

- Store transcripts and quiz results only because adults need them for learning review.
- Do not store raw voice audio by default. If voice memories are offered, they must be explicit parent-controlled saves with delete/export/retention controls.
- Do not ask for personal details in child chat.
- Adult dashboard requires gate/auth.
- Summaries must be supportive, specific, and strictly non-diagnostic.
- Production needs parent/teacher consent, retention limits, and child-data policy review.
