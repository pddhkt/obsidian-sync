---
type: visual-direction
project: Cross Border Car Hailing
status: draft
date: 2026-06-02
tags:
  - car-hailing
  - customer-app
  - illustration
  - visual-direction
aliases:
  - Customer App Illustration Direction
  - Customer App Decorative Artwork
---

# Customer App Illustration Direction

> [!abstract] Purpose
> Use lightweight decorative drawings to make the customer app feel polished and recognizable without making the reservation flow harder to scan. The app should still feel map-first, practical, and trustworthy for foreign travelers.

## Recommended visual language

Use a mix of:

- **Transparent outline patterns** behind otherwise-empty areas.
- **Flat filled spot illustrations** for welcome, confirmation, and empty states.
- **Small travel icon clusters** near lightweight section headings or onboarding copy.

The first exploration uses:

| Role | Color | Hex |
|---|---|---|
| Primary outline | Deep teal | `#143D4A` |
| Secondary line and fill | Muted blue | `#5B8FA8` |
| Warm accent | Coral | `#E97862` |
| Small highlight | Warm yellow | `#F4C95D` |
| Light vehicle fill | Off-white | `#F8FAF9` |

> [!note] Transparent-background rule
> Decorative artwork should be exported as transparent `PNG` for the visual prototype and preferably redrawn as `SVG` before production. It should sit directly on the app background without a rectangular image background, banner, or card.

## Generated look-and-feel previews

### Integrated HTML mock

[Open the one-page customer app mock](customer-app-illustration-mock.html)

This page shows the transparent illustrations inside four app screens: route search, top driver choices, booking confirmation, and live trip support.

### 1. Route-line background pattern

![[assets/customer-app-illustrations/route-pattern-generated.png|800]]

Use this direction as a faint background motif on the customer home screen and reservation progress screens. Keep opacity around `5-12%` when it sits near functional content.

### 2. MPV and cross-border skyline motif

![[assets/customer-app-illustrations/mpv-skyline-generated.png|800]]

Use this direction for the welcome screen, booking-confirmed screen, or a compact header illustration. Keep the skyline abstract: the purpose is cross-border travel recognition, not geographic accuracy.

### 3. Travel icon cluster

![[assets/customer-app-illustrations/travel-icons-generated.png|800]]

Use individual motifs from this direction around onboarding, reservation benefits, and empty states. Do not place the entire cluster behind buttons or form fields.

### 4. Booking-confirmed spot illustration

![[assets/customer-app-illustrations/booking-confirmed-generated.png|800]]

Use this direction after payment succeeds and the reservation is locked to a driver. It is intentionally more prominent than a background pattern, but it should still sit above or beside the confirmation summary rather than behind text.

> [!warning] Exploration status
> These are generated raster previews for visual-direction review. They are not final production artwork. Before app implementation, select the preferred direction, redraw the accepted assets as clean vectors, and test them against the actual light and dark app backgrounds.

## Customer app placement map

| Screen or state | Artwork | Background-free treatment |
|---|---|---|
| Welcome | MPV traveling between abstract HK and Mainland skyline outlines | One filled spot illustration with generous empty space |
| Home and route search | Curved route line, two pins, bridge outline, sparse clouds | Very low-opacity pattern behind non-interactive space |
| Reservation booking | Calendar, car, luggage, and location-pin motifs | Small cluster near the screen heading |
| Waiting for offers | Several route pins and small responding-car motifs | Subtle loop or static empty-space illustration |
| Booking confirmed | Traveler meeting driver beside MPV | Medium spot illustration above the confirmation summary |
| No offers | Quiet route line with pin and refresh motif | Compact empty-state illustration |
| Payment success | Card, shield, and check motif | Small success-state illustration |
| Support chat | Speech bubbles and translation motif | Small illustration inside the support empty state |
| Border delay | MPV, bridge, and clock motif | Compact status illustration; keep the operational message dominant |
| Empty trip history | Suitcase beside an unused route line | Compact empty-state illustration |

## MVP illustration asset backlog

Start with `8-10` reusable assets:

- [x] Route-line transparent background pattern exploration.
- [x] MPV and skyline transparent motif exploration.
- [x] Travel icon cluster exploration.
- [x] Booking-confirmed spot illustration.
- [ ] Waiting-for-offers illustration.
- [ ] No-offers empty-state illustration.
- [ ] Support-chat empty-state illustration.
- [ ] Border-delay status illustration.
- [ ] Empty-trip-history illustration.
- [ ] Payment-success illustration.

## Interface rules

- Keep decorative patterns out of the interactive map layer.
- Do not place illustration details underneath text, buttons, or form controls.
- Use `5-12%` opacity for background patterns and full opacity for isolated spot illustrations.
- Use at most one major illustration and one subtle pattern on a screen.
- Keep the border-road and skyline motifs abstract to avoid inaccurate route promises.
- Avoid embedded text, political symbols, dense city detail, passport imagery, and artificial luxury cues.
- Mark purely decorative images as accessibility-hidden. If an illustration communicates a state, provide localized screen text rather than relying on the image.

## Next design review

Decide:

1. Whether the style should remain **minimal and professional** or become slightly more **premium**.
2. Whether spot illustrations should include human characters.
3. Whether the final palette should stay teal / muted blue / coral / yellow or follow an existing logo.
4. Whether the same illustration system should be reused in the driver app with fewer decorative elements.

## Related notes

- [[_index]]
- [[interfaces#Customer app]]
- [[app-summary#Customer app]]
