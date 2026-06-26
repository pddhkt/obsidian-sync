---
type: research-note
project: TimeKids
status: draft
date: 2026-06-23
tags:
  - app-idea
  - ai
  - speech
  - cantonese
  - edtech
---

# TimeKids — Cantonese Realtime AI Research

## Short answer

Yes, Cantonese realtime voice is technically possible, but it should be treated as a **voice pipeline** decision, not a single all-in-one model decision.

For TimeKids, the practical first-launch stance should be:

- Ship Cantonese primarily through **pre-scripted narration + generated/streamed Cantonese TTS**.
- Keep child voice input **best-effort only**, never required for quiz or progression.
- Use picture choices as the reliable child input path.
- Run a Cantonese STT/TTS provider spike before choosing the production stack.

## Why this matters

English realtime voice is relatively mature. Cantonese is available, but the product risk is different:

- Hong Kong Cantonese has mixed written/spoken forms.
- Children aged 4–6 have less predictable pronunciation.
- Family/home audio can be noisy.
- Code-switching with English is common.
- If STT fails, the child experience must still work.

## Candidate stack options

| Provider | Cantonese STT | Cantonese TTS | Realtime fit | Notes |
|---|---:|---:|---|---|
| OpenAI Realtime | Possible via realtime transcription/language hints, but no Cantonese-specific guarantee found in docs | General Chinese support, optimized voices skew English | Good for all-in-one voice-agent experiments | Needs real Cantonese testing before relying on it. |
| Google Cloud | Yes: `yue-Hant-HK` Speech-to-Text V2 | Yes: `yue-HK` Cloud Text-to-Speech voices | Strong candidate | Clear Cantonese STT/TTS coverage. |
| Azure Speech | Yes: `zh-HK` Cantonese STT | Yes: `zh-HK` neural voices | Strong candidate | Clear Cantonese STT/TTS coverage and custom speech options. |
| Deepgram | Yes: `zh-HK` in Nova-3/Nova-2 STT | Not the main reason to use it | Strong STT candidate | Good if we want streaming transcription specialist. |
| ElevenLabs | STT includes Cantonese (`yue`) via Scribe v2/realtime | TTS docs list Chinese broadly, not Cantonese-specific on the checked page | Strong TTS/agent platform, but verify Cantonese voice quality | Do not assume Cantonese TTS quality without sample tests. |
| Browser SpeechSynthesis | Depends on installed device voices | Depends on iPad/browser voices | Good free fallback only | Not reliable enough as the production Cantonese voice plan. |

## Source checks

- OpenAI Realtime supports voice-agent, realtime translation, and realtime transcription sessions. Its docs say `gpt-realtime-whisper` is for live transcription and has a language hint field, but the checked pages did not list Cantonese specifically. Source: [OpenAI Realtime overview](https://developers.openai.com/api/docs/guides/realtime), [OpenAI realtime transcription](https://developers.openai.com/api/docs/guides/realtime-transcription).
- OpenAI speech-to-text and text-to-speech docs list "Chinese" in supported languages, but not Cantonese specifically. Source: [OpenAI speech to text](https://developers.openai.com/api/docs/guides/speech-to-text), [OpenAI text to speech](https://developers.openai.com/api/docs/guides/text-to-speech).
- Google Cloud Speech-to-Text V2 lists "Chinese, Cantonese (Traditional Hong Kong)" with code `yue-Hant-HK`. Source: [Google Cloud STT supported languages](https://docs.cloud.google.com/speech-to-text/docs/speech-to-text-supported-languages).
- Google Cloud Text-to-Speech lists `yue-HK` Chinese (Hong Kong) voices, including premium Chirp3-HD and standard voices. Source: [Google Cloud TTS voices](https://docs.cloud.google.com/text-to-speech/docs/list-voices-and-types).
- Azure Speech lists `zh-HK` Chinese (Cantonese, Traditional) for speech-to-text, custom speech, language identification, and neural TTS voices. Source: [Azure Speech language support](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=stt).
- Deepgram lists `zh-HK` Chinese (Cantonese, Traditional) under Nova-3 and Nova-2 speech-to-text languages. Source: [Deepgram models and languages](https://developers.deepgram.com/docs/models-languages-overview).
- ElevenLabs Scribe v2 and Scribe v2 Realtime support 90+ languages and list Cantonese (`yue`) for speech-to-text. The checked TTS page lists Chinese broadly, so Cantonese TTS quality still needs sample testing. Source: [ElevenLabs speech to text](https://elevenlabs.io/docs/overview/capabilities/speech-to-text), [ElevenLabs text to speech](https://elevenlabs.io/docs/overview/capabilities/text-to-speech).
- Browser SpeechSynthesis exposes voices installed on the current device, so voice availability is device-dependent. Source: [MDN SpeechSynthesis getVoices](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices).

## Recommended technical decision

For first production-quality Cantonese:

1. **Narration/TTS:** shortlist Google Cloud TTS `yue-HK` and Azure `zh-HK` neural voices first.
2. **Child voice input/STT:** test Google STT `yue-Hant-HK`, Azure `zh-HK`, Deepgram `zh-HK`, ElevenLabs Scribe v2 Realtime, and OpenAI realtime transcription with actual HK Cantonese samples.
3. **Conversation brain:** keep Claude/OpenAI/other LLM provider swappable behind `/api/chat`; do not tie business logic to the speech vendor.
4. **Fallback:** picture choices always remain the primary input path. Voice failure should never block lesson progress.

## Validation plan

Before provider choice:

1. Record 20–30 short Cantonese test utterances:
   - 10 adult clean samples,
   - 10 adult noisy-home samples,
   - 10 child-like or actual child samples if legally/ethically allowed with consent.
2. Include history/story terms, simple child answers, mixed Cantonese/English, and noisy pronunciation.
3. Compare providers on:
   - transcript accuracy,
   - latency,
   - handling of code-switching,
   - confidence/partial transcript behavior,
   - privacy and data-retention terms,
   - cost.
4. Pick the provider only after testing, not from docs alone.

## Product implication

Cantonese should stay in first launch, but **voice input must remain optional**. The child can complete everything by listening and tapping. This protects the product from Cantonese STT variance and young-child speech recognition issues.
