---
type: architecture-note
project: Cross Border Car Hailing
status: draft
date: 2026-05-26
tags:
  - car-hailing
  - architecture
  - kmp
  - tencent-cloud
  - backend
---

# Architecture and Cloud

This note captures the technical product direction for the app and backend.

## Mobile recommendation: KMP over React Native

Kotlin Multiplatform is a reasonable choice if the product needs strong shared business logic across customer and driver apps.

Good KMP fit:

- Shared booking state machine.
- Shared fare quote parsing.
- Shared validation rules.
- Shared API client.
- Shared localization keys.
- Shared authentication/session logic.
- Shared map-provider selection rules.
- Native map, payment, push notification, and platform integrations where needed.

React Native may be faster for a single UI-heavy prototype, but this product has important domain logic, payment, maps, location, and driver workflows. KMP lets Android and iOS share logic while keeping native UI and native platform integration.

## App structure

Recommended apps:

- Customer mobile app.
- Driver mobile app.
- Admin/ops web dashboard.

Recommended shared KMP modules:

- `auth`
- `booking`
- `pricing`
- `driver-offers`
- `trip-state`
- `profile`
- `payments`
- `notifications`
- `localization`
- `map-provider`
- `api-client`

The mobile apps should not contain final pricing or driver eligibility decisions. They can preview and validate, but backend services should own authoritative decisions.

## Backend services

Start with a modular backend, even if it deploys as one service at v1.

Core modules:

- Auth service.
- Customer service.
- Driver service.
- Vehicle/document service.
- Booking service.
- Pricing service.
- Dispatch service.
- Offer ranking service.
- Payment service.
- Trip tracking service.
- Notification service.
- Support service.
- Admin service.
- Audit log.

## Cloud options

### Option A: Mainland-primary deployment

Use this if most users, drivers, maps, payments, and operations need to work smoothly inside Mainland China.

Likely advantages:

- Better Mainland network performance.
- Easier Tencent Maps and WeChat ecosystem integration.
- Better fit if Mainland driver operations are central.

Risks/questions:

- Mainland regulatory, hosting, data, and app distribution requirements need professional review.
- Cross-border data movement rules need review.
- International customer access from outside Mainland needs testing.

### Option B: Hong Kong-primary deployment

Use this if the company, operations, and foreign customer acquisition are Hong Kong-centered.

Likely advantages:

- Easier starting point for international-facing customer app.
- Cleaner integration with international payment and support tools.
- May be simpler for early validation.

Risks/questions:

- Mainland user and driver access may be slower or inconsistent.
- Mainland maps, push, and payment integrations may need special handling.

### Option C: Hybrid deployment

Use this if customer acquisition is international/Hong Kong but driver operations and maps need Mainland performance.

Possible split:

- Hong Kong/global edge for foreign customer access.
- Mainland deployment for driver app, maps, route validation, and Mainland operations.
- Strict data classification for identity, location, payment, and trip records.

Recommended next step: decide where the business legally operates first, then choose cloud architecture. Do not choose cloud only by engineering preference.

## Map and location provider

The app needs a maps strategy before implementation.

Confirmed direction:

- Use AMap/高德地图 as the authoritative map and routing provider because it can handle both Hong Kong and Mainland paths.
- AMap route distance should be authoritative for fare distance in v1.
- KMP can support this architecture, but the map UI should be implemented with native SDK wrappers per platform/provider. Shared KMP code should own provider selection, route/business data models, permission state, and API abstractions.

KMP implementation direction:

- Android native layer: AMap Android SDK.
- iOS native layer: AMap iOS SDK.
- Shared KMP layer: `MapProvider`, `LocationPoint`, `RouteRequest`, `RouteEstimate`, address normalization, provider selection, and fallback rules.

Questions still open:

- How will addresses be normalized across English, Traditional Chinese, and Simplified Chinese?
- Should customer and driver be allowed to open a different map app manually for navigation handoff?
- What fallback is used if AMap does not resolve an English address well?

## Payment provider strategy

Payment must match the target customer.

For foreign customers:

- Credit card only for v1.
- Stripe PaymentIntents charged at booking for reservation bookings.
- Stripe PaymentIntents with manual capture/authorization hold for instant bookings.
- HKD display and HKD charge.
- Stripe merchant entity should be the Hong Kong company.

For Mainland users/drivers:

- WeChat Pay / Alipay are not v1 customer payment methods unless the scope changes.
- Driver payout rails must be defined separately from customer payment.

The payment provider decision affects backend architecture, refund rules, currency handling, and customer trust.

Recommended Stripe reservation flow:

1. Customer selects one of the top 5 driver offers.
2. Backend creates and captures a Stripe PaymentIntent in HKD.
3. Customer completes card authentication if required.
4. Backend stores payment status.
5. Booking becomes confirmed after payment succeeds.
6. Backend issues partial/full refunds according to the cancellation policy.

Recommended Stripe instant flow:

1. Customer confirms an instant booking.
2. Backend creates a manual-capture Stripe PaymentIntent in HKD.
3. Customer completes card authorization.
4. Backend stores authorization status.
5. Booking becomes confirmed after authorization succeeds.
6. Backend captures the authorized amount after ride completion.
7. Backend cancels the uncaptured PaymentIntent to release the hold when cancellation is free.
8. Backend captures 10% if the customer cancels more than five minutes after driver arrival.

Marketplace payout note:

- Driver payouts are outside Stripe in v1.
- Driver payout cadence is weekly.
- Driver payout method is bank transfer.
- Store driver payout status separately from customer payment status.
- Stripe Connect can remain a post-MVP option if automated marketplace payout becomes necessary.

Cloud decision:

- Mainland cloud deployment is not required from day one.
- Hong Kong/global hosting can be used for v1 validation unless later legal, network, or app-distribution requirements force Mainland deployment.

## Data classification

Before writing production code, classify data:

- Account data.
- Identity or travel document data.
- Driver document data.
- Vehicle document data.
- Location and route traces.
- Payment records.
- Support messages.
- Audit logs.

Each class needs retention, access control, storage location, and deletion rules.

## Implementation principle

Put mutable business rules in backend configuration:

- Fare rates.
- Route support.
- Vehicle classes.
- Reservation discount.
- Top-5 marketplace offer ranking.
- Stripe charge and refund policy.
- Cancellation policy.
- Driver eligibility.
- Border crossing options.
- Map provider selection.
- Notification templates.

This avoids mobile app releases every time operations changes a route, fee, or policy.
