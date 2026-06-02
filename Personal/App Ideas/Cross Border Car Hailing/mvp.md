---
type: mvp
project: Cross Border Car Hailing
status: draft
date: 2026-05-26
tags:
  - car-hailing
  - mvp
  - reservation
  - product-logic
---

# MVP - Smallest Useful Release

The first release should prove that customers can book cross-border trips and drivers can complete them with clear pricing, assignment, and support.

## Recommended MVP scope

Use reservation-first booking with customer-visible top 5 marketplace driver choices.

Why:

- Cross-border trips require more planning than normal city rides.
- Driver eligibility matters more than driver proximity.
- Foreign customers need confidence before paying.
- Open-marketplace supply gives the customer choice without requiring the business to own the full driver fleet.
- Admin can still rescue edge cases while the ranking and compliance rules are being learned.

## V1 route scope

- Hong Kong airport to Shenzhen, both directions.
- Hong Kong city to Shenzhen, both directions.
- Hong Kong to Guangzhou, both directions.
- Hong Kong pickup/dropoff coverage: every Hong Kong area.
- Mainland pickup/dropoff coverage: all Shenzhen and Guangzhou areas.

## Reservation window

- Minimum reservation lead time: 2 hours before pickup. [ASSUMPTION]
- Maximum reservation window: 30 days ahead. [ASSUMPTION]

## Customer loop

1. Customer chooses language and contact method.
2. Customer enters pickup, dropoff, date/time, passengers, luggage, and vehicle class.
3. System validates whether the route is supported.
4. System shows reference fare, included fees, cancellation policy, and offer expiry.
5. Eligible marketplace drivers have two minutes to submit offers.
6. System ranks offers by balanced value and shows up to the top 5 choices.
7. Customer compares price, driver rating, vehicle, included fees, and availability.
8. Customer selects one driver choice, or rejects all choices and creates a new request.
9. Customer pays the full fare by Stripe credit card in HKD.
10. Booking is confirmed after payment succeeds.
11. Customer tracks pickup and trip state.
12. Trip completes.
13. Customer receives receipt and can review or request support.

## Driver loop

1. Driver completes verification.
2. Driver sets availability and supported routes.
3. Driver receives an eligible reservation request.
4. Driver reviews route, time, payout, passengers, luggage, and special notes.
5. Driver submits an offer or declines.
6. If selected, driver receives confirmed booking.
7. Driver goes to pickup.
8. Driver updates trip states.
9. Driver completes dropoff.
10. Driver sees payout state.

## Backend logic needed for MVP

- User auth and role separation.
- Customer profile.
- Driver profile.
- Vehicle profile.
- Driver document verification status.
- Supported service area rules.
- Current-area driver eligibility rules.
- Reservation booking creation.
- Fare quote generation.
- Quote expiry.
- Marketplace driver offer collection.
- Top-5 offer ranking.
- Fewer-than-5 offer display.
- Customer reject-all and re-request flow.
- Customer driver-choice selection.
- Reservation Stripe credit-card charge at booking.
- Instant Stripe authorization hold/manual capture for post-MVP instant flow.
- Refund handling with 15% cancellation fee more than 24 hours before pickup.
- Booking state machine.
- Driver selection and lock.
- Trip state updates.
- Cancellation and refund rules.
- 10% platform commission deducted from driver-submitted price.
- Friday outside-Stripe driver payout batch for all eligible completed rides since previous Friday.
- Driver cancellation penalty rules.
- In-app support chat with under-5-minute response target.
- Button-triggered auto-translation in chat.
- Admin manual override.
- Notification sending.
- Trip receipt.
- Basic review/support ticket.

## Explicitly out of MVP

- Fully automatic instant dispatch.
- Showing every marketplace bid to the customer.
- Real-time price negotiation.
- Complex surge pricing.
- Corporate account billing.
- Loyalty program.
- Multi-stop route planning.
- In-app wallet.
- Advanced fraud detection.
- Fully automated compliance decisioning.

## MVP success criteria

Use operational metrics, not only downloads.

- At least 60% of started quotes convert into completed booking requests.
- At least 80% of valid requests receive 3 or more eligible driver offers.
- At least 60% of valid requests receive 5 eligible driver choices.
- At least 90% of valid requests with fewer than 5 offers still show the available choices clearly.
- At least 50% of top-5 views convert into a selected driver.
- At least 90% of selected-driver bookings complete Stripe payment successfully.
- Less than 10% driver cancellation after acceptance.
- 100% of driver cancellations after acceptance are logged.
- Drivers with more than 3 late cancellations are blocked from new orders for 5 hours.
- Less than 5% customer refund/dispute rate caused by unclear pricing.
- Median support response time under 5 minutes during active trips.
- At least 30% of completed customers make a second booking or save the app/contact.

## Next implementation sequence

1. Build data model and booking state machine.
2. Build fare quote service with configurable rules.
3. Build customer reservation flow.
4. Build driver verification and marketplace offer submission.
5. Build top-5 ranking and customer selection.
6. Add reservation Stripe charge-at-booking plus instant hold/capture, refund, and cancellation-fee handling.
7. Build admin marketplace monitoring and override.
8. Add notifications, in-app support chat, and auto-translation button.
9. Add live trip state updates.
10. Add analytics for funnel and operational failures.
