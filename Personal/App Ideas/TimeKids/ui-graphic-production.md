---
type: product-spec
project: TimeKids
status: private-beta-plan
date: 2026-06-25
tags:
  - app-idea
  - ui
  - ux
  - graphics
  - animation
  - rive
  - edtech
---

# TimeKids — UI Graphic Production Approach

## Main concern

The app needs a heavy graphic, playful, Duolingo-like feel without becoming impossible to build.

The UI should not feel like a normal web app with cards. For children aged 4–6, the app should feel like a living illustrated place:

- Timi's hamster house/playground as the home hub.
- Large tappable illustrated objects instead of text menus.
- Timi always alive through idle motion, blinking, waving, and reactions.
- Story worlds built from illustrated layers, not generic cards.
- Parent report remains calm and adult-readable.

## Recommended rendering stack

Use a mixed stack, not one technology for everything. For private beta, interpret this as the **React Native app stack** from [[app-technical-stack]], not a web-only prototype stack.

| Need | Recommended tool | Why |
|---|---|---|
| Core app UI, layout, buttons, parent report | React Native + TypeScript | Shared app logic, native mobile shell, easier iPad testing |
| UI transitions and button motion | Reanimated + React Native transforms | Smooth app-side motion without pushing all animation into Timi assets |
| Timi mascot animation | Rive | Interactive state machine: idle, blink, talk, happy, wave, thinking |
| Home hub animated hotspots | Rive or SVG/PNG layers + Reanimated | Rive for interactive objects; normal layers for simpler objects |
| Story scene art | SVG/PNG/WebP layered illustrations | Easier to produce and optimize than animating everything |
| Scene motion | Reanimated on layers | Parallax, bounce-in, wiggle, reveal, scale |
| One-off non-interactive animations | Lottie/dotLottie if needed | Good for exported motion graphics that do not need much logic |
| Rewards/confetti | small Rive/Lottie stickers or native/RN confetti | Simple and joyful |
| Full video/avatar later | Video/HeyGen style pipeline | Only for later story video, not v1 core UI |

## What Rive is for

Use Rive for **stateful interactive animation**, especially Timi.

Good Rive use cases:

- Timi idle/breathing.
- Timi blink.
- Timi talking/mouth open.
- Timi happy jump.
- Timi thinking.
- Timi wave.
- Hotspot object hover/tap state.
- Portal open/close.
- Reward sticker pop.

Rive is useful because state machines let animation logic respond to app state and user input. Official Rive docs describe state machines as a way to connect animations and define transition logic for interactive motion graphics. The Rive Web runtime also supports loading artboards, animations, and state machines through JS/WASM.

Sources:

- [Rive state machine docs](https://rive.app/docs/editor/state-machine/state-machine)
- [Rive Web runtime](https://github.com/rive-app/rive-wasm)

## What Rive is not for

Do not build the entire app as one giant Rive file.

Avoid:

- one huge Rive scene containing the whole app,
- story text inside Rive,
- parent dashboard in Rive,
- large background paintings in Rive if static images are enough,
- data-heavy UI in canvas-only graphics.

Reason: the app still needs normal React state, accessibility, routing, translations, audio controls, and parent reporting.

## Alternatives to Rive

Rive is not the only option. These are the practical alternatives for TimeKids.

| Option | Best for | Weakness | Fit for TimeKids |
|---|---|---|---|
| Lottie / dotLottie | Pre-made loops, transitions, sticker bursts, decorative motion | Traditional Lottie is less natural for complex app-driven mascot state; dotLottie state machines are promising but should be tested in React Native | Good alternative if the team prefers After Effects/Lottie workflow |
| SVG + Reanimated | Simple character parts, doors, hotspots, path/node motion | Manual rigging and animation logic; can become tedious for expressive mascot states | Good for the house UI and simple object animation |
| React Native Skia + Reanimated | High-performance 2D drawing, particle effects, custom paths, procedural animation | More engineering-heavy; less designer-friendly for mascot authoring | Good for special effects, not first choice for Timi's whole personality |
| Sprite sheets / animated WebP | Predictable loops such as idle, wave, happy | Less flexible; larger assets; state transitions can feel less smooth | Very practical fallback for v1 if Rive/Lottie slows us down |
| Cocos Creator | Game-like 2D scenes and mini-games | Adds a separate engine/toolchain; app/dashboard integration gets heavier | Consider only if TimeKids becomes more game than app |
| Unity | Full game engine, 2D/3D mini-games | Heavy runtime and workflow for this app; overkill for v1 | Avoid for v1 |
| Native platform animation | Best native control | Duplicated work across iOS/Android, slower with AI-assisted development | Avoid unless a specific native feature demands it |

## Alternative recommendation

If avoiding Rive, use this stack:

1. **Timi mascot:** dotLottie/Lottie if state-machine support tests well; otherwise sprite sheets for v1.
2. **House hub:** SVG/PNG/WebP layers + Reanimated.
3. **Story scenes:** layered PNG/WebP/SVG + Reanimated.
4. **Special effects:** React Native Skia only where needed.
5. **Rewards:** Lottie/dotLottie or sprite bursts.

This gives most of the graphic-heavy feel without betting the whole app on Rive.

## Lowest-risk v1 path without Rive

Use **sprite sheets / short animation clips for Timi**:

- `idle`
- `blink`
- `talking`
- `happy`
- `wave`
- `thinking`

The app chooses which animation to play based on state. This is less elegant than a Rive state machine, but it is predictable, easy to replace, and easy for AI-assisted development.

## SVG/PNG/WebP role

Use normal image assets for most large illustrated environments.

Examples:

- hamster house background,
- Egypt scene background,
- harbour background,
- story object icons,
- sticker book items,
- quiz picture choices.

Recommended approach:

- Produce final illustrations as SVG where they are simple/vector-like.
- Use optimized PNG/WebP for painterly backgrounds or generated art.
- Separate backgrounds into layers when motion is needed:
  - far background,
  - mid objects,
  - foreground objects,
  - tappable hotspots.

Then animate layers with Reanimated in the mobile app, or Framer Motion only in web prototypes.

## Lottie role

Use Lottie/dotLottie only for non-interactive or lightly interactive exported animations.

Good use cases:

- loading sparkles,
- reward sticker burst,
- small decorative loops,
- simple scene transitions.

Not ideal for:

- Timi's main AI avatar state machine,
- complex interactive story logic,
- app navigation.

Official dotLottie web docs show a canvas-based player with autoplay, loop, layout, speed, and render configuration. It is good for shipping prepared animation assets, but Rive is better when the animation needs app-driven states.

Source: [dotLottie web docs](https://developers.lottiefiles.com/docs/dotlottie-player/dotlottie-web/)

## Lottie prototype result

The LottieFiles `motion-design` Codex skill was installed from `lottiefiles/motion-design-skill`.
It is a motion-quality guide, not a one-click animation generator.

A local Timi idle-loop test was created here:

- [[Personal/App Ideas/TimeKids/design-research/lottie-prototype/README|TimeKids Lottie Prototype — Timi Idle Loop]]
- `design-research/lottie-prototype/timi-idle-loop.lottie.json`
- `design-research/lottie-prototype/timi-reference-art-loop.lottie.json`
- `design-research/lottie-prototype/preview.html`

Rendered screenshot:

![[Personal/App Ideas/TimeKids/design-research/lottie-prototype/preview-screenshot.png]]

Observed result:

- Lottie can render lightweight Timi-like idle motion: bobbing, blink, sparkle.
- An image-layer Lottie using the actual generated Timi art is visually much closer than the hand-built vector test.
- Hand-authored Lottie JSON is brittle; visual layering/order issues appeared immediately and had to be corrected.
- The result is acceptable as a technical spike, but not close to Duolingo-quality without a real motion-design/export workflow.
- Lottie is still very useful for reward loops, loading, sticker bursts, and optional fallback mascot states.
- Rive remains the better primary tool for Timi's app-driven states: idle, talking, listening, happy, thinking, wave, and scene reactions.

## Layered Timi production rule

Final Timi should be built from layered art parts, then animated.

See [[Personal/App Ideas/TimeKids/timi-layered-animation-plan|TimeKids — Timi Layered Animation Plan]].

Core idea:

- keep the GPT image as visual reference,
- recreate/clean Timi as layered source art,
- separate eyes, eyelids, mouth, paws, scarf, badge, body, ears, and shadow,
- rig those layers in Rive for app-driven states,
- export Lottie loops only for simple non-interactive moments.

## CSS / styling role

For a web prototype, CSS/Tailwind should handle:

- layout,
- responsive sizing,
- safe areas,
- large touch targets,
- colors/themes,
- button states,
- simple transitions,
- parent report and adult screens.

CSS alone should not carry the heavy character/world art. It is good for structure and simple motion, not for rich mascot animation.

For the React Native private beta, the equivalent layer is React Native styling plus optional NativeWind/design tokens if the team wants Tailwind-like ergonomics.

## App motion role

Use Reanimated in the mobile app, or Framer Motion in web prototypes, for:

- card/object press squish,
- scene entry/exit,
- parallax layer movement,
- gentle wiggles,
- progress sticker pop,
- parent report drawer transitions.

Keep motion purposeful. Children need liveliness, not constant noise.

## Recommended v1 production pipeline

1. Design Timi as a simple mascot mark.
2. Create Timi Rive file with 5–6 states:
   - idle,
   - blink,
   - talking,
   - happy,
   - thinking,
   - wave.
3. Design hamster house hub as an illustration with 10 tappable story objects.
4. Implement house hub in React Native:
   - static layered background,
   - story hotspots as accessible buttons,
   - Timi Rive overlay,
   - Reanimated for object tap/hover.
5. Build Ancient Egypt as first scene set:
   - 4–5 layered illustrations,
   - Timi Rive persists as guide,
   - side character as static or lightly animated SVG/PNG,
   - interactions as big visual choices.
6. Reuse the same scene template for Hong Kong Old Harbour and Ancient China.
7. Produce simpler stories with fewer scenes and no live chat.

## Duolingo-style house/path screen

The reference style should be implemented as **layered 2D art**, not CSS-only and not a full game engine.

For the floor and door:

- draw/design them in an illustration tool or generate/refine them as image assets,
- export floor/background as WebP/PNG or SVG,
- export door/shutters/foreground base as a separate foreground layer,
- place invisible tappable hotspots over the artwork,
- animate door/tap states with Rive or platform animation,
- keep the UI buttons as native app UI.

This gives the app the graphic-heavy feel while keeping the code maintainable.

## UI architecture rule

The child app can be highly graphical, but the underlying structure should still be normal app screens:

```text
HomeHub
  -> StoryScene
  -> InteractionMoment
  -> ChatMoment
  -> Quiz
  -> Reward
  -> ParentReport
```

The visuals are rich, but the state machine stays simple.

## Key decision to make

Should TimeKids commit to **Rive as the primary interactive animation tool** for Timi and key home-hub objects?

Recommendation: yes. Use Rive for Timi and key interactive animations, but keep large scene art as normal optimized image/SVG layers.
