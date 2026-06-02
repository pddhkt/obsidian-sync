---
type: product-spec
project: Cross Border Car Hailing
status: draft
date: 2026-05-26
tags:
  - car-hailing
  - customer-app
  - driver-app
  - admin
---

# Interfaces

The product has two main mobile interfaces, but the business logic also requires an admin/ops interface.

## Customer app

The customer app should focus on clarity and confidence for foreign travelers.

### Customer modules

| Module | Required business logic |
|---|---|
| Onboarding | Language, international phone/email, location permission, payment setup. |
| Route search | Pickup/dropoff validation, supported service areas, border route eligibility. |
| Quote | HKD reference fare, offer expiry, included/excluded fees, confirmed 20% reservation discount. |
| Booking | Passenger count, luggage, vehicle class, special needs, scheduled time. |
| Driver choices | Up to 5 marketplace driver choices after two minutes, ranked by balanced value across eligibility, reliability, price, vehicle fit, and availability. |
| Payment | Reservation: Stripe charge at booking. Instant: Stripe authorization hold/manual capture. HKD only, with refund and cancellation fee display. |
| Driver confirmation | Selected driver identity, vehicle, permit confidence indicators, ETA. |
| Trip tracking | Driver en route, arrived, trip started, border crossing, completed. |
| Messaging | Customer-driver/support chat with button-triggered auto-translation. |
| Support | In-app chat during 09:00-00:00 operating hours, support joins by help request, cancellation, refund, pickup problem, delay, emergency, complaint, under-5-minute active-trip response target. Initially staffed by co-founders/admin staff or staff from Kevin Tsang. |
| Profile | Contact info, payment methods, saved locations, booking history. |

### Customer screen flow

1. Choose language and contact method.
2. Enter pickup and destination.
3. Select date/time and vehicle class.
4. Add passenger/luggage details.
5. Review reference fare, included fees, and offer expiry.
6. Wait for marketplace driver offers.
7. Compare up to 5 driver choices.
8. Select one driver, or reject all choices and create a new request.
9. Pay full fare by credit card.
10. Track driver and trip status.
11. Complete trip and review.

## Driver app

The driver app should focus on job clarity, eligibility, and settlement.

### Driver modules

| Module | Required business logic |
|---|---|
| Driver onboarding | Identity, vehicle, cross-border documents, payout account, language. |
| Availability | Online/offline, reservation calendar, service zones, current area, vehicle status. |
| Job feed | Only eligible reservation requests shown, filtered by current pickup-side area, route, time, passengers, luggage, and expected customer needs; customer language hidden before payment. |
| Offer submission | Offer amount, included fees, expiry, availability, and customer selection state. |
| Accept/decline | Offer deadline, 5-minute cancellation grace after acceptance, penalty record, conflict check. |
| Navigation handoff | Pickup, border crossing, dropoff, region-aware map provider routing. |
| Trip execution | Arrived, start trip, border crossing, complete trip. |
| Earnings | Completed jobs, pending payout, deductions, platform fee, bonuses. |
| Support | Report customer no-show, route issue, border delay, payment issue. |
| Documents | Expiry alerts, re-upload, compliance status. |

### Driver screen flow

1. Verify driver and vehicle.
2. Set availability and service routes; backend also checks current area.
3. Receive eligible reservation request.
4. Submit offer or decline.
5. If selected by the customer, receive confirmed job.
6. See customer execution info after customer accepts and payment succeeds.
7. Navigate to pickup.
8. Mark arrival, which may start a customer-cancellation timer depending on final cancellation rule.
9. Update border crossing if needed.
10. Complete dropoff.
11. Review payout and submit issue if needed.

### Driver cancellation behavior

- Cancellation within 5 minutes after accepting is allowed but logged.
- Cancellation after 5 minutes creates a warning/penalty record.
- More than 3 late cancellations triggers a 5-hour temporary ban from receiving new orders.

## Admin and operations interface

This is required for v1 even if it starts as a simple web dashboard.

### Admin modules

- Driver verification queue.
- Vehicle verification queue.
- Document expiry dashboard.
- Booking search and timeline.
- Marketplace offer monitoring.
- Top-5 ranking override.
- Fare rule editor.
- Service area editor.
- Refund and cancellation override.
- Dispute and support ticket queue.
- Driver quality and incident notes.
- Audit log.

## Shared interface rules

The customer and driver apps should share the same backend booking states.

Do not let the customer app and driver app define separate state names. If customer sees `driver_confirmed`, driver should be in the matching operational state. This keeps support, notifications, analytics, and settlement consistent.

## Localization requirements

Minimum language set to consider:

- English for foreign customers.
- Traditional Chinese for Hong Kong users and support.
- Simplified Chinese for Mainland users and drivers.

Information that must be localization-ready:

- Fare explanation.
- Cancellation rules.
- Pickup instructions.
- Border delay message.
- Driver/customer support templates.
- Payment/refund messages.
