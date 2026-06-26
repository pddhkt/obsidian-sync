---
type: technical-spec
project: TimeKids
status: private-beta-plan
date: 2026-06-25
tags:
  - app-idea
  - private-beta
  - data-model
  - motion
  - edtech
aliases:
  - TimeKids Implementation Contracts
---

# TimeKids — Implementation Contracts

## Contract goals

The private beta should use stable contracts before content scales to 10 stories.

The first build should make these invariants true:

- every story is a typed `StoryDefinition`,
- every child run creates a `StorySession`,
- every report is generated from `StorySession + parentReportSeed`,
- AI chat and AI summaries are optional upgrades,
- no-key and no-internet fallbacks still feel complete,
- motion assets declare their engine and fallback explicitly.

## StoryDefinition

`StoryDefinition` is the source of truth for content. Write the source note in Obsidian first, then convert it into typed app data.

```ts
type StoryTier = "flagship" | "simple";
type LanguageCode = "zh-Hant-HK" | "en";

type StoryScene = {
  id: string;
  order: number;
  narration: Record<LanguageCode, string>;
  timiLine?: Record<LanguageCode, string>;
  sideCharacterLine?: Record<LanguageCode, string>;
  backgroundAssetId: string;
  hotspots: Array<{
    id: string;
    assetId?: string;
    label: Record<LanguageCode, string>;
    audioCue?: Record<LanguageCode, string>;
  }>;
};

type StoryInteraction = {
  id: string;
  sceneId: string;
  prompt: Record<LanguageCode, string>;
  choices: Array<{
    id: string;
    imageAssetId: string;
    label: Record<LanguageCode, string>;
    target?: boolean;
  }>;
  timiResponse: Record<LanguageCode, string>;
};

type StoryChatTurn = {
  id: string;
  timiPrompt: Record<LanguageCode, string>;
  childChoices: Array<{
    id: string;
    imageAssetId: string;
    label: Record<LanguageCode, string>;
    interestTag?: string;
  }>;
  fallbackResponse: Record<LanguageCode, string>;
};

type StoryQuizQuestion = {
  id: string;
  prompt: Record<LanguageCode, string>;
  choices: Array<{
    id: string;
    imageAssetId: string;
    label: Record<LanguageCode, string>;
    correct: boolean;
  }>;
  gentleRetryLine: Record<LanguageCode, string>;
  celebrationLine: Record<LanguageCode, string>;
};

type StoryReward = {
  id: string;
  name: Record<LanguageCode, string>;
  stickerAssetId: string;
  motionAssetId?: string;
};

type ParentReportSeed = {
  explored: Record<LanguageCode, string>;
  noticedSignals: string[];
  quizEvidenceTemplate: Record<LanguageCode, string>;
  summarySeed: Record<LanguageCode, string>;
  learningCheckQuestion: Record<LanguageCode, string>;
  acceptableAnswerSignals: string[];
  tryTogether?: Record<LanguageCode, string>;
  suggestedRevisit?: Record<LanguageCode, string>;
};

type StoryDefinition = {
  id: string;
  tier: StoryTier;
  languages: LanguageCode[];
  title: Record<LanguageCode, string>;
  goal: Record<LanguageCode, string>;
  sideCharacter: {
    id: string;
    name: Record<LanguageCode, string>;
    role: Record<LanguageCode, string>;
  };
  vocabulary: Array<{
    id: string;
    zhHant: string;
    cantoneseCue?: string;
    english: string;
    imageAssetId: string;
  }>;
  scenes: StoryScene[];
  interactions: StoryInteraction[];
  chatTurns: StoryChatTurn[];
  quiz: StoryQuizQuestion[];
  reward: StoryReward;
  parentReportSeed: ParentReportSeed;
};
```

## StorySession

`StorySession` is the durable runtime record. It should not depend on AI output existing.

```ts
type StorySession = {
  id: string;
  childId: string;
  storyId: string;
  startedAt: string;
  completedAt?: string;
  events: Array<{
    type:
      | "story_started"
      | "scene_viewed"
      | "hotspot_tapped"
      | "interaction_choice"
      | "chat_turn"
      | "quiz_attempt"
      | "reward_claimed"
      | "fallback_used";
    at: string;
    payload: Record<string, unknown>;
  }>;
  choices: Array<{
    interactionId: string;
    choiceId: string;
    at: string;
  }>;
  quizAttempts: Array<{
    questionId: string;
    choiceId: string;
    correct: boolean;
    attemptNumber: number;
    at: string;
  }>;
  chatTranscript: Array<{
    speaker: "timi" | "child" | "side_character" | "system";
    mode: "scripted" | "picture_choice" | "voice_transcript" | "text" | "ai";
    content: string;
    at: string;
  }>;
  interests: string[];
  rewardId?: string;
};
```

## MotionAsset

Motion is part of the product contract because Timi carries the child experience.

```ts
type MotionAsset = {
  id: string;
  engine: "rive" | "lottie" | "sprite";
  states: Array<
    | "idle"
    | "blink"
    | "talking"
    | "listening"
    | "happy"
    | "thinking"
    | "wave"
    | "loading"
    | "reward"
  >;
  inputs?: Array<{
    name: string;
    type: "boolean" | "number" | "trigger";
  }>;
  fallback: {
    engine: "lottie" | "sprite" | "static";
    assetId: string;
  };
};
```

Motion rules:

- Use **Rive** for stateful Timi: idle, blink, talking, listening, happy, thinking, wave.
- Use **Lottie/dotLottie** for loading sparkles, sticker bursts, badge pops, and fallback loops.
- Use sprite sheets for Timi in beta if Rive and Lottie both slow production.
- Every animated state needs a reduced-motion path.

## Report generation

Parent reports are generated from `StorySession + parentReportSeed`.

Required report sections:

- story completed,
- sticker earned,
- supportive insight summary,
- child interests,
- quiz evidence,
- transcript/detail,
- learning check question,
- acceptable answer signals,
- one suggested follow-up.

AI summary is optional. If no AI key exists, render a template summary from:

- story goal,
- scenes completed,
- interaction choices,
- quiz attempts,
- saved interests,
- reward claimed.

## No-key fallback

The no-key path must still feel like a finished product:

- flagship chat uses scripted Timi turns plus picture choices,
- parent report uses a deterministic template summary,
- the app records a `fallback_used` event,
- the UI does not expose developer/API wording to parents or children.

## No-internet fallback

Downloaded/bundled story content should remain playable.

When the network fails:

- child story scene, quiz, and reward stay available,
- AI chat switches to scripted mode,
- report detail uses template summary,
- sync queues until connection returns,
- one large retry action appears only where network is required.

## Story production contract

See [[story-script-templates]] for the authoring template.

Before private beta, each of the 10 stories must have:

- Traditional Chinese/Cantonese-first title and narration,
- English version,
- vocabulary,
- scene list,
- picture interaction(s),
- picture quiz,
- reward/sticker,
- parent report seed.

Flagship stories also need bounded Timi chat. Simple stories can use no chat or one scripted line.
