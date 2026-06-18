---
type: grill-session
project: Syntax Gym
status: resolved
created: 2026-06-12
---

# Syntax Gym — Gamified Programming Learning Site — Grill Session

> [!abstract] The pitch
> A website that teaches programming languages in a game-like, fun way — inspired by [Brilliant](https://brilliant.org). Jack wants to learn **Go** and **Java**, plus a **TypeScript reminder/refresher** component (he already knows TS).

## Summary

**Syntax Gym** is a *personal, local-first* daily-practice web app — Brilliant-style interactive micro-lessons for **language mastery aimed at interviews and future jobs** (the real goal, clarified mid-session). Every screen makes Jack *do* something: MCQ, predict-the-output, fill-in-the-blank, fix-the-bug, or run-code in a CodeMirror mock editor whose Run button shells out to local `go run` / `java` / `tsx`. A light streak/XP layer plus a **spaced-repetition deck for TypeScript retention** share one daily session. Content is **LLM-generated offline with Claude, human-curated, committed as static structured files** — Jack is the curator, not the author. Stack is the dogfooding play: **Go backend (chi + SQLite, mirroring the QHMS work stack) + React/TS/Vite frontend** — building the app is itself lesson zero of the Go track. Ship order: **Go track → TS SRS deck → Java track**. DS&A stays on LeetCode.

**Next actions:**
1. ✅ ~~Scaffold repo~~ — done 2026-06-12 at `/home/lmt/Projects/personal/syntax-gym` (Go chi API + Vite React player, all 5 exercise types working, runner verified for Go/Java; first lesson: slices & maps internals). `make dev` to run.
2. ✅ ~~Pedagogy fix~~ — learn→do interleaved (decision #14), Go track restarted from zero (decision #15).
3. 🔄 **Review the syllabus → [[Go Syllabus]]** (drafted 2026-06-13, 28 lessons / 7 stages). Resolve its open questions, then author stage by stage.
4. Then: TS SRS deck; then Java track.

## Decisions
| # | Question | Decision | Rationale |
|---|---|---|---|
| 1 | Audience | **Personal tool, just Jack** | Optimize purely for own learning; no auth/payments/content treadmill. Can productize later if it proves itself. |
| 2 | Core game loop | **Brilliant-style interactive micro-lessons** + light streak/XP meta-layer | Every screen makes you *do* something (predict output, fix bug, fill blank, reorder code) with instant feedback. Streaks/XP are retention seasoning, not the core. |
| 3 | TypeScript "reminder" | **Spaced-repetition review deck** (SM-2 style), same interactive card format | Jack already knows TS — goal is retention of tricky parts, not lessons. Plugs into the same daily session/streak as Go & Java: one habit feeds all three. |
| 4 | Content authoring | **LLM-generated offline, human-curated, committed as static structured files (JSON/MDX)** | Jack curates rather than authors. Free at runtime, quality-controlled, versionable. Authoring pipeline (Claude Code) becomes part of the project. Runtime-LLM rejected: cost/latency/un-reviewed errors in the core loop. |
| 5 | Code execution | **Yes, from day 1** — in-browser mock editor (CodeMirror), Run button triggers backend script, result shown in UI | Jack's own proposal: "type in web as a mock of editor, save, UI triggers the script to run and get the result." Real execution > static-only checking for his learning style. |
| 6 | Hosting model | **Local-first** — site runs on Jack's machine, backend shells out to `go run` / `java` / `tsx` directly. *Amended 2026-06-12:* `make dev-vpn` binds to the WireGuard IP (10.8.0.3), so VPN peers (phone) can reach it at `http://10.8.0.3:5190`. | Simplest, safest runner: own code on own machine, zero sandboxing. VPN binding restores phone access without exposing `/api/run` to LAN/internet — never bind 0.0.0.0. |
| 7 | Progress data | **Local SQLite file** for streak/XP/SRS state (default, follows from #6) | Local-first removes any need for hosted DB or auth; single file is easy to back up. |
| 8 | Why Go & Java | **Interviews + future job readiness** (not hobby) | Reframes curriculum toward interview-relevant material. Bonus: "predict the output" interaction format literally rehearses the interview question format. |
| 9 | MVP order | **Go → TS deck → Java** | Go has double payoff: interview prep + immediate practice surface at work (QHMS backend is Go/chi). TS SRS deck is a small engine add-on once lesson UI exists. Java once format is proven. |
| 10 | Curriculum scope | **Language mastery only — no DS&A units** | Syllabus ≈ Tour of Go / Go by Example, weighted to interview-bait (slices internals, maps, interfaces, goroutines/channels, defer/panic/recover, error idioms). DS&A grinding stays on LeetCode — don't rebuild what it does better. |
| 11 | Tech stack | **Go backend (chi + SQLite) + React/TS/Vite frontend, CodeMirror editor** | Dogfooding: building the app IS the first Go practice, and mirrors the QHMS work stack so knowledge transfers both ways. Frontend stays in fluent territory so the project doesn't stall. |
| 12 | v1 exercise types | **All 5: MCQ, predict-output, fill-blank, fix-the-bug, run-code** | Ordered by authoring cheapness + interview relevance. Reorder-the-lines deferred — fiddly UI for marginal learning value. |
| 13 | Name | **Syntax Gym** | Daily reps for language mastery — says exactly what it is. ("Code Quest" placeholder retired.) |
| 14 | Lesson pedagogy | **Interleaved learn cards (Brilliant rule: never test the untaught)** — lessons alternate short concept cards (explainer + runnable example, GOT IT →) with exercises testing exactly that concept | Jack's v0 feedback: "I'm guessing, not learning." Test-first works for the TS *review* deck but not for acquiring Go from zero. Learn cards don't count toward accuracy/XP. |
| 15 | Go syllabus start | **Restart from zero** — Unit 1 = hello world / variables / functions; interview-bait (slice internals etc.) re-filed to later units | v0 lesson 01 (slice headers) was demo content pitched at unit-5 level. Ramp matters more than flash. |

## Open questions
- [ ] (pre-build) Go syllabus unit list — generate with Claude, curate before authoring exercises

## Log
- 2026-06-12 session start — idea captured from /grill-me prompt
- 2026-06-12 checkpoint #1 — decisions 1–4 resolved (audience, core loop, TS deck, content pipeline)
- 2026-06-12 checkpoint #2 — decisions 5–7 resolved (real code execution in-app, local-first hosting, local SQLite state)
- 2026-06-12 checkpoint #3 — decisions 8–11 resolved; goal clarified: learning Go/Java is for interviews + future jobs, not hobby
- 2026-06-12 wrap-up — decisions 12–13 (exercise types, name), renamed Code Quest → Syntax Gym, status resolved
- 2026-06-12 amendment — decision 6: added `make dev-vpn` (binds WireGuard IP 10.8.0.3) so phone-on-VPN can reach the app; partially reverses the "no phone access" trade-off while keeping the runner off LAN/internet
- 2026-06-12 design pass — Jack found the v0 UI flat ("not like game"); rebuilt as retro arcade CRT theme (phosphor green/amber, pixel HUD, combo/XP juice, S–C grade results, audio bleeps); added lesson 2 (append/copy/growth) so level select has real choices
- 2026-06-13 pedagogy pass — Jack: "I'm guessing, not learning" → decisions 14–15: interleaved learn cards (teach-then-test), Go track restarted from zero (Getting Started unit shipped; slices re-filed as advanced). Syllabus curation is now the critical next step.
