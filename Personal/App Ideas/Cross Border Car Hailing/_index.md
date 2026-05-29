---
type: project-index
project: Cross Border Car Hailing
status: idea
date: 2026-05-26
tags:
  - app-idea
  - car-hailing
  - cross-border
  - product-logic
  - kmp
aliases:
  - HK Mainland Car Hailing
  - Cross-Border Ride Booking App
---

# Cross Border Car Hailing - Project Home

> Cross-border car booking for foreign travelers moving between Hong Kong and Mainland China, with separate customer and driver interfaces backed by clear booking, pricing, dispatch, payment, and compliance rules.

## Starting assumptions

- The app has two mobile interfaces: customer app and driver app.
- The v1 route set supports both directions between Hong Kong and Mainland China for Hong Kong airport/city, Shenzhen, and Guangzhou.
- The main customer segment is foreign travelers, business visitors, expats, and non-local customers who need clearer booking support.
- Kotlin Multiplatform (KMP) is the preferred mobile approach over React Native.
- Booking should use a reservation-first marketplace model where eligible open-marketplace drivers submit offers and the customer sees the top 5 choices.
- Reservation pricing is 20% cheaper than the instant booking reference price.
- Customer payment starts with credit card only.
- Driver supply is open marketplace drivers, not only company-owned fleet drivers.
- Driver accounts can be individual drivers or fleet/company accounts with multiple drivers.
- Map provider is AMap for routing and fare distance because it can handle both Hong Kong and Mainland paths.
- Active-trip support is in-app chat during 09:00 to 00:00, support joins by help request, and chat has button-triggered auto-translation.
- Tencent Cloud may be needed for Mainland users, Mainland infrastructure, Tencent Maps, WeChat ecosystem access, or data residency.

> [!important] Product direction
> Start by defining the business logic before screen design. The app needs a stable booking state machine, fare rules, driver eligibility rules, payment/refund logic, and operational controls before customer and driver UI can be reliable.

## Where things live

```
Cross Border Car Hailing/
├── _index.md                  <- project home
├── teammate-overview.md       <- visual team briefing (diagrams + image prompts)
├── app-summary.md             <- full functional spec summary
├── product-logic.md           <- what the app needs to understand
├── interfaces.md              <- customer app, driver app, admin support
├── mvp.md                     <- first useful release
├── data-model.md              <- business entities and relationships
├── payment-and-cancellation.md <- Stripe charge, refund, cancellation fee
├── architecture-and-cloud.md  <- KMP, backend, cloud, Mainland questions
├── tech-decisions.md          <- open infra decisions for the next meeting
└── open-questions.md          <- questions to answer before implementation
```

## Product areas to elaborate

| Area | Why the app needs it |
|---|---|
| [[teammate-overview|Teammate overview]] | Visual, plain-language briefing of stack + behaviour for the team (with AI image prompts). |
| [[product-logic#Booking models|Booking models]] | Defines reservation, instant booking, and bidding behavior. |
| [[product-logic#Fare and pricing engine|Fare engine]] | Prevents unclear pricing, driver disputes, and refund confusion. |
| [[product-logic#Dispatch and driver matching|Dispatch rules]] | Decides which drivers can receive which trips. |
| [[product-logic#Cross-border trip rules|Cross-border rules]] | Handles border, route, permit, passenger, and document constraints. |
| [[interfaces#Customer app|Customer app]] | Lets foreign customers search, book, pay, track, and get help. |
| [[interfaces#Driver app|Driver app]] | Lets drivers verify, accept jobs, execute trips, and receive payout. |
| [[data-model|Data model]] | Gives the backend and app a shared language. |
| [[payment-and-cancellation|Payment and cancellation]] | Defines Stripe charge-at-booking, refund, and cancellation fee rules. |
| [[architecture-and-cloud|Architecture and cloud]] | Decides KMP structure, backend services, maps, payments, and Tencent Cloud scope. |
| [[tech-decisions|Tech decisions]] | Open infra decisions (hosting, iOS/Android distribution, ICP) for the next meeting. |
| [[open-questions|Open questions]] | Keeps unresolved product/business decisions visible. |

## Recommended v1 stance

For v1, avoid pure instant matching as the only mode. Cross-border car hailing has operational risk: driver permits, border timing, language support, payment settlement, cancellations, and route uncertainty.

Recommended first release:

1. Reservation-first booking for the three v1 route groups.
2. Fixed reference fare with a confirmed 20% reservation discount against instant booking.
3. Eligible open-marketplace drivers submit offers for two minutes.
4. Customer sees up to the top 5 ranked driver choices. If fewer than 5 offers are available, show fewer.
5. Customer selects one driver choice or rejects all offers and creates a new request.
6. Stripe charges the full fare at booking in HKD.
7. Driver can only receive orders that start from the driver's current area.
8. Clear cancellation/refund/driver-penalty rules.
9. In-app support and trip monitoring.

After supply, compliance, and support workflows are stable, add:

- Instant booking for approved high-supply routes. Instant booking uses Stripe authorization hold/manual capture instead of reservation charge-at-booking.
- More advanced bidding controls for special trips, premium vehicles, long-distance trips, or low-supply time windows.

## Next steps

1. Resolve the remaining compliance and route-zone questions in [[open-questions#Remaining questions to answer first]].
2. Confirm the top-5 ranking rules in [[product-logic#Customer-visible top 5 choices]].
3. Convert [[product-logic#Fare and pricing engine]] into an actual pricing formula.
4. Convert [[payment-and-cancellation#Stripe charge-at-booking flow]] into backend tickets.
5. Sketch customer and driver screens only after the states and rules are stable.
