---
type: technical-decision
project: TimeKids
status: private-beta-plan
date: 2026-06-25
tags:
  - app-idea
  - tech-stack
  - react-native
  - kmp
  - rive
  - mobile
---

# TimeKids — App Technical Stack

## Decision under discussion

The original demo brief used Next.js because it was optimized for a quick browser demo. For the real app, the current candidates are:

- **React Native**
- **Kotlin Multiplatform / Compose Multiplatform**

## Recommendation

Use **React Native for the first mobile app**, with Rive for Timi/key animations and normal optimized image/SVG assets for story scenes.

Keep KMP as a later option if the product becomes deeply native, Android-heavy, or needs a larger native mobile team.

## Private beta implementation spine

The beta build should follow:

- Screen scope: [[private-beta-screen-plan]]
- Data and motion contracts: [[implementation-contracts]]
- Test gates: [[private-beta-test-plan]]

The private beta target is not a paid public release. Avoid teacher dashboard, paywall, reward shop, full subscription management, and advanced classroom tooling until beta feedback proves the loop.

## Why React Native first

TimeKids' first risk is **product/content quality**, not raw native performance.

React Native is likely faster for v1 because:

- one TypeScript stack can cover mobile app logic, content schemas, and later web/admin tooling,
- Rive has an official React Native runtime,
- the team can iterate UI quickly,
- parent report and child app can share components/state patterns,
- it is easier to keep a later web dashboard close to the app data model.

## Where KMP is stronger

KMP is stronger if:

- the team is already Kotlin-native,
- Android is the dominant target,
- the product needs deep native audio/storage/background behavior,
- the plan is long-term native engineering quality over fastest first launch,
- the team is comfortable bridging platform-specific animation and speech libraries.

Google says KMP is stable and production-ready for sharing business logic between Android and iOS, and JetBrains' Compose Multiplatform can share UI across Android/iOS/desktop/web. That makes KMP viable, but it may slow the first product proof.

Sources:

- [Android Developers — Kotlin Multiplatform](https://developer.android.com/kotlin/multiplatform)
- [Kotlin — Compose Multiplatform](https://kotlinlang.org/compose-multiplatform/)

## Rive implications

Rive supports React Native through an official runtime. It is a wrapper around native iOS/Android Rive runtimes.

Rive also has native Android and iOS runtimes. With KMP, that likely means using native/platform integration for Rive rather than assuming a single common KMP animation layer.

Sources:

- [Rive React Native runtime](https://rive.app/docs/runtimes/react-native)
- [Rive Android runtime](https://github.com/rive-app/rive-android)
- [Rive iOS runtime](https://github.com/rive-app/rive-ios)

## Suggested architecture

```text
React Native mobile app
  Kid Home Hub
  Story Player
  Chat / Voice / Quiz
  Reward
  Parent Report

Shared TypeScript packages
  Story content schema
  Lesson scripts
  Quiz definitions
  Report summary types
  API client

Backend
  Auth / parent accounts
  Session storage
  AI chat/summary
  Cantonese speech provider proxy if needed

Later web dashboard
  Parent/teacher reporting
  Content admin
```

## Graphics stack in React Native

| Need | Tool |
|---|---|
| Timi animation | Rive React Native |
| Home hub background | PNG/WebP/SVG layers |
| Story scenes | PNG/WebP/SVG layers |
| UI motion | Reanimated or React Native animation library |
| Confetti/rewards | Native/RN confetti library plus Lottie/Rive reward assets |
| Parent report | Native React Native screens first; web dashboard later |

## Lottie experiment checkpoint

The LottieFiles `motion-design` skill was installed and a small Timi idle-loop Lottie prototype was created under `design-research/lottie-prototype/`.

Result:

- Lottie works for simple mascot loops and small delight moments.
- Lottie can be a good fallback if a designer/export workflow exists.
- Manually writing Lottie JSON is not a realistic route to Duolingo-level quality.
- For v1, React Native + Rive remains the main interactive mascot recommendation; Lottie can sit beside it for rewards, loading, and simple exported loops.

## Rive vs Lottie app spike

Spend one week comparing the same beta-critical motion in the real app stack:

| Test asset | Rive version | Lottie/dotLottie version | Compare on |
|---|---|---|---|
| Timi idle/blink | Rive state machine | Lottie loop or dotLottie state | File size, smoothness, export workflow |
| Timi talking/listening | App-driven Rive inputs | Switched Lottie loops | App-state control, mouth/listening timing |
| Reward/sticker claim | Rive sticker pop | Lottie/dotLottie burst | Delight, bundle size, production speed |
| Hotspot reaction | Rive trigger | Layer motion or Lottie loop | Tap responsiveness, integration friction |

Default after prior research: **Rive for stateful Timi**, **Lottie/dotLottie for one-off delight/reward loops**. If both slow production, use sprite sheets for Timi in beta.

## Duolingo-style house/path screen implementation

Reference: `design-research/images/27-map-edu-duolingo-abc-house-path.webp`.

This kind of screen is not a complex 3D/game scene. It is a **2D layered illustration** with interactive hotspots:

1. background/floor texture,
2. path and locked nodes,
3. foreground house base/door/shutters,
4. mascot overlay,
5. tappable invisible hit areas,
6. small UI buttons on top.

### React Native implementation

Use:

- `View`/`Image`/`Pressable` for screen structure,
- absolute-positioned layers inside an aspect-ratio container,
- WebP/PNG/SVG for floor, path, door, and story objects,
- Rive React Native for Timi,
- Reanimated for bounce, press, door open, path-node wiggle,
- optional React Native Skia only if procedural drawing or shader-like effects are needed.

Example layer model:

```text
HomeHubScreen
  SafeAreaView
    AspectRatioScene
      Image floorBackground
      Image pathAndLocks
      Pressable hotspot AncientEgypt
      Pressable hotspot AncientChina
      Pressable hotspot HongKongHarbour
      Image foregroundHouseBase
      Rive Timi
      TopButtons back/settings
```

For v1, do not draw the floor and door with code. Export them as art assets. Code should position, animate, and handle taps.

### KMP / Compose implementation

Use:

- `Box` for layered screen composition,
- `Image(painterResource(...))` for background/foreground art,
- `Canvas` / `drawBehind` only for simple procedural paths or overlays,
- `Modifier.offset`, `graphicsLayer`, and Compose animations for movement,
- native Rive Android/iOS integration if Rive is required,
- shared Compose resources for bundled images.

Example layer model:

```text
@Composable HomeHubScreen
  Box(aspectRatio)
    Image(floorBackground)
    Image(pathAndLocks)
    Hotspot(...)
    Image(foregroundHouseBase)
    PlatformRiveTimi(...)
    TopButtons(...)
```

KMP can render this style well. The heavier part is integrating and maintaining platform-specific Rive/audio/speech pieces if they are not cleanly supported from common code.

## Platform comparison for graphic-heavy UI

| Concern | React Native | KMP / Compose Multiplatform |
|---|---|---|
| Rendering the house/path scene | Good: layered images + Pressables + Reanimated | Good: Box/Image/Canvas/graphicsLayer |
| Timi Rive animation | Stronger first path: official React Native runtime | Possible, but likely via native Android/iOS Rive runtimes and wrappers |
| Floor/door artwork | Exported WebP/PNG/SVG layers | Exported WebP/PNG/SVG layers |
| Procedural vector/path drawing | React Native Skia or SVG | Compose Canvas/drawBehind |
| Touch hotspots | Pressable absolute regions | clickable composables / pointer input |
| Performance risk | JS thread if too much state/render work; avoid by using Reanimated/Rive/native assets | Strong native rendering; risk is integration complexity across iOS/Android |
| AI-assisted development | Easier: more examples, TypeScript/React patterns, faster iteration | Harder: more specialized KMP/iOS interop knowledge |
| Best v1 fit | Faster polished product proof | Strong if team is Kotlin-native and accepts slower iteration |

## Performance rules

Regardless of platform:

- Keep the scene as a fixed-aspect-ratio composition.
- Use exported art layers instead of drawing complex artwork in code.
- Keep large backgrounds compressed and correctly sized for target iPad resolution.
- Avoid re-rendering the whole scene on every animation frame.
- Use animation systems that run off the main JS/business logic path:
  - React Native: Rive/Reanimated/Skia.
  - KMP: Compose graphics layers/native runtime animation.
- Make hotspots separate from art so design can change without rewriting app logic.
- Use 2–3 scene layers, not 20+ layers, unless profiling proves it is fine.
- Test on the oldest iPad target early.

## Decision checkpoint

Recommended v1 decision:

> React Native first. Use Rive for Timi and key animated objects. Keep KMP as a future option, not the first build path.
