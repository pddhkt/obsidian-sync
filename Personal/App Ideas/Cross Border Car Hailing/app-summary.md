---
type: product-summary
project: Cross Border Car Hailing
status: draft
date: 2026-05-28
tags:
  - car-hailing
  - cross-border
  - product-summary
  - functional-spec
aliases:
  - App Summary
  - Functional Spec Summary
---

# Cross Border Car Hailing - App Summary

> Cross-border car booking for foreign travelers moving between Hong Kong and Mainland China. Two mobile apps (customer + driver) backed by a reservation-first marketplace, top-5 driver choice, Stripe payment in HKD, and admin/ops controls.

## 1. Product info

| Item | Value |
|---|---|
| Target customer | Foreign travelers, business visitors, expats, non-local customers between HK and Mainland China. |
| v1 routes | HK Airport ↔ Shenzhen, HK City ↔ Shenzhen, HK ↔ Guangzhou (both directions). |
| Service coverage | All HK areas; all Shenzhen and Guangzhou areas. |
| Booking model (v1) | Reservation-first marketplace with top-5 driver choices. |
| Driver supply | Open marketplace — individual drivers and fleet/company accounts. |
| Mobile stack | Kotlin Multiplatform (KMP), native UI per platform. |
| Map/routing | AMap (authoritative for HK + Mainland routing and fare distance). |
| Payment | Stripe credit card, HKD, HK merchant entity. |
| Driver payout | Weekly bank transfer outside Stripe. |
| Support hours | In-app chat 09:00–00:00, target response < 5 min on active trips. |
| Languages | English, Traditional Chinese, Simplified Chinese. |

## 2. Roles

- **Customer** — search, book, pay, track, chat, review.
- **Driver** — verify, set availability, submit offers, execute trips, get paid.
- **Admin/Ops** — verify drivers, configure pricing/areas, monitor bookings, override.
- **Support agent** — joins chat by request, handles cancellations, refunds, emergencies.

## 3. Core app behaviour

### Customer journey (reservation, v1)

1. Choose language and contact method.
2. Enter pickup, dropoff, date/time, passengers, luggage, vehicle class, special needs.
3. System validates route support and shows reference fare, included/excluded fees, cancellation policy, offer expiry.
4. Eligible marketplace drivers have **2 minutes** to submit offers.
5. System ranks offers by balanced value and shows up to **top 5** choices (fewer if not enough offers).
6. Customer selects one driver — or rejects all and creates a new request.
7. Customer pays the **full fare** by Stripe credit card in HKD.
8. Booking confirmed only after payment succeeds.
9. Customer tracks driver: en route → arrived → trip started → border crossing → completed.
10. Receipt, optional review, support ticket if needed.

### Driver journey

1. Complete identity, vehicle, cross-border, insurance, business document verification.
2. Set availability and service routes; backend also checks **current area**.
3. Receive eligible reservation request (filtered before display).
4. Submit offer (own price) or decline within the 2-minute window.
5. If selected, receive confirmed job and customer execution info (only after payment succeeds).
6. Navigate to pickup → mark arrived → start trip → update border crossing → complete dropoff.
7. View payout state; settled weekly by bank transfer.

## 4. Functional spec

### 4.1 Booking models

- **Reservation (v1)** — advance booking, full charge at booking. Reservation fare = `instant_reference_fare × 0.8` (20% discount).
- **Instant (post-MVP)** — Stripe authorization hold + manual capture after ride.
- **Bidding (filtered)** — drivers set own price; platform filters by eligibility/quality and shows top 5 only.

### 4.2 Top-5 ranking

Hard eligibility filters first, then weighted scoring:

| Signal | Weight |
|---|---:|
| Driver reliability & completed trips | 30% |
| Price/value vs reference fare | 25% |
| Vehicle fit & service class | 20% |
| Availability/wait confidence | 15% |
| Language/support fit | 10% |

Backend (not the app) generates the visible set. Each visible choice shows: final price, vehicle class + photo, driver rating + completed trip count, pickup readiness, included/excluded fees, luggage/passenger fit, language, cancellation summary.

### 4.3 Driver eligibility

A driver must be:

- Account, vehicle, and cross-border documents verified.
- Direction-capable and **currently in the pickup-side area**.
- Border-route capable.
- Capacity-fit for passengers + luggage.
- Available, no conflicting booking.
- Above rating/quality threshold.
- Not under temporary ban.

### 4.4 Fare engine (configurable per route/class/time)

```text
fare =
  base_fare
  + distance_km * per_km_rate
  + estimated_time_min * per_min_rate
  + tolls_and_route_fees
  + border_service_fee
  + vehicle_class_fee
  + luggage_or_special_request_fee
  + demand_adjustment
  - reservation_discount
```

Distance is authoritative from AMap.

### 4.5 Payment rules

| Event | Action |
|---|---|
| Reservation: customer selects driver | Create Stripe PaymentIntent (HKD), capture immediately. |
| Reservation: payment succeeds | Booking → `payment_paid`, locked to driver. |
| Instant: customer confirms | Create manual-capture PaymentIntent, authorize. |
| Instant: trip completes | Capture authorized amount. |
| Reservation: cancel > 24h before pickup | Refund 85%, keep 15% fee. |
| Reservation: cancel < 24h before pickup | **Open decision.** |
| Reservation: cancel after driver arrival | **Open decision.** |
| Instant: cancel before driver arrival | Cancel PaymentIntent, release hold. |
| Instant: cancel > 5 min after driver arrived | Capture 10% fee, release 90%. |
| Driver cancels (no replacement) | Full refund / support replacement; log + penalty. |
| Trip completes | Move driver payout to weekly bank transfer. |

### 4.6 Driver cancellation policy

- ≤ 5 min after accept → allowed but logged.
- > 5 min after accept → warning/penalty record.
- > 3 late cancellations in rolling week → 5-hour temporary ban.

### 4.7 Booking state machine (backend-owned)

```text
draft → quote_generated → collecting_driver_offers → offers_ready
  → customer_selecting_driver → driver_selected → payment_pending
  → payment_paid (or payment_authorized for instant)
  → driver_confirmed → customer_confirmed
  → driver_en_route → driver_arrived → trip_started
  → border_crossing → trip_completed → settlement_pending → settled
Side states: quote_expired, payment_failed,
  cancelled_by_customer / driver / admin, refunded, disputed
```

### 4.8 Payment state machine

```text
payment_not_started → payment_processing → payment_requires_action
  → payment_authorized | payment_paid → payment_captured | payment_released
Side states: refund_requested, refund_review_required,
  refund_partial_85_percent, refund_full,
  cancellation_fee_retained_15_percent,
  instant_late_cancel_fee_captured_10_percent,
  payment_failed, payment_disputed
```

### 4.9 Customer info visibility to driver

- **Before** customer accepts and pays: only operational booking details. **No** nationality, no language.
- **After** payment succeeds: full execution info (name, contact, pickup notes).

### 4.10 Support and chat

- In-app customer ↔ driver chat, support joins by help request.
- Button-triggered auto-translation.
- Operating hours 09:00–00:00; active-trip response target < 5 minutes.
- Emergency contact workflow.

### 4.11 Admin capabilities (v1)

Driver/vehicle verification, document expiry tracking, fare rule editor, service area editor, booking timeline, marketplace offer monitoring, top-5 override/suppression, payment/refund override, support tickets, driver quality flags, audit log.

## 5. Feature checklist

### Customer app

- [ ] Language + contact onboarding (EN / TC / SC, international phone).
- [ ] Route search with service-area validation.
- [ ] Fare quote with included/excluded fees + offer expiry.
- [ ] Reservation booking form (passengers, luggage, vehicle class, special needs).
- [ ] 2-minute offer collection with progress indicator.
- [ ] Top-5 driver choices view (compare price, rating, vehicle, fees, availability).
- [ ] Select one driver / reject all + restart.
- [ ] Stripe credit-card payment in HKD.
- [ ] Live trip tracking (en route, arrived, started, border, completed).
- [ ] In-app chat with auto-translate button + support join.
- [ ] Booking history, receipts, ratings.
- [ ] Cancellation flow with policy display.

### Driver app

- [ ] Onboarding with full document set (identity, license, vehicle, permit, insurance, business).
- [ ] Availability + service zone + current-area state.
- [ ] Filtered eligible job feed.
- [ ] Offer submission (price, included fees, availability).
- [ ] Accept/decline + 5-minute grace window.
- [ ] Confirmed-job detail post-payment.
- [ ] Navigation handoff (AMap native).
- [ ] Trip state updates (arrived, start, border, complete).
- [ ] Earnings + weekly payout view.
- [ ] Issue reporting (no-show, route, border delay, payment).
- [ ] Document expiry alerts.

### Admin/ops dashboard

- [ ] Verification queues (driver, vehicle, documents).
- [ ] Document expiry dashboard.
- [ ] Booking search + timeline.
- [ ] Marketplace offer monitoring + top-5 override.
- [ ] Fare + service area editors.
- [ ] Refund/cancellation override + Stripe PaymentIntent view.
- [ ] Support ticket queue.
- [ ] Driver quality flags + temporary ban controls.
- [ ] Audit log.

## 6. Non-functional + architecture

- **Mobile** — KMP shared modules: `auth`, `booking`, `pricing`, `driver-offers`, `trip-state`, `profile`, `payments`, `notifications`, `localization`, `map-provider`, `api-client`. Native UI + native AMap SDK per platform.
- **Backend modules** — auth, customer, driver, vehicle/document, booking, pricing, dispatch, offer-ranking, payment, trip-tracking, notification, support, admin, audit. Runtime leaning Ktor (Kotlin) to share the domain module with KMP — to confirm; see [[tech-decisions]].
- **Data store** — PostgreSQL + PostGIS (PostGIS for service-area, route, and location queries).
- **Cloud (v1)** — HK / global hosting is acceptable for v1. Mainland deployment only if legal/network/distribution forces it. Hybrid kept as an option. Server hosting location and iOS/Android app distribution (incl. possible ICP / 备案) are still open — see [[tech-decisions]].
- **Business rules in backend config**, not mobile — fare rates, route support, vehicle classes, reservation discount, ranking weights, Stripe rules, cancellation rules, driver eligibility, border crossings, map provider selection, notification templates.

## 7. Out of MVP

Fully automatic instant dispatch, showing every bid to customer, real-time price negotiation, complex surge, corporate billing, loyalty program, multi-stop routes, in-app wallet, advanced fraud detection, fully automated compliance decisioning.

## 8. Open decisions still blocking implementation

- Cancellation/refund rule for customer cancel **within 24h** before pickup.
- Cancellation/refund rule for **reservation after-arrival** cancellation.
- Bank-transfer process for weekly driver payout.
- Address normalization across EN / TC / SC.
- Final legal naming for required cross-border permits.
- **Infrastructure decisions** — server hosting location, iOS/Android app distribution, ICP / 备案, China entity, backend runtime, and v1 real-time scope. Tracked in [[tech-decisions]].

## 9. Related notes

- [[_index]]
- [[teammate-overview]]
- [[product-logic]]
- [[interfaces]]
- [[mvp]]
- [[data-model]]
- [[payment-and-cancellation]]
- [[architecture-and-cloud]]
- [[tech-decisions]]
- [[open-questions]]
