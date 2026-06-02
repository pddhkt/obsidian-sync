---
type: product-spec
project: Cross Border Car Hailing
status: draft
date: 2026-05-26
tags:
  - car-hailing
  - payment
  - stripe
  - cancellation
  - product-logic
---

# Payment and Cancellation

V1 customer payment is credit card only in HKD through Stripe. Payment behavior depends on booking type:

| Booking type | Stripe behavior | When money is captured |
|---|---|---|
| Reservation booking | Charge at booking with immediate capture. | When booking is confirmed. |
| Instant booking | Authorization hold with manual capture. | After ride completion, or partial capture for late customer cancellation. |

## Reservation: Stripe charge-at-booking flow

Use Stripe PaymentIntents with immediate capture at booking for reservation bookings.

Recommended flow:

1. Customer selects one driver from the top 5 choices.
2. Backend creates a Stripe PaymentIntent in HKD for the selected full fare.
3. Customer completes card payment and any required authentication.
4. Stripe captures the payment immediately.
5. Booking moves to `payment_paid`.
6. Driver receives the paid booking.
7. Driver can see the customer information needed to execute the trip.
8. Driver completes the ride.
9. Driver payout moves to weekly outside-Stripe bank-transfer settlement.

Product rule: the customer must provide card information at booking because the booking is paid immediately.

## Instant: Stripe authorization-hold flow

Use Stripe PaymentIntents with manual capture for instant bookings.

Recommended flow:

1. Customer selects or is matched with an instant booking driver.
2. Backend creates a Stripe PaymentIntent in HKD for the selected full fare.
3. PaymentIntent uses manual capture so the card is authorized but not captured yet.
4. Customer completes any required card authentication.
5. Booking moves to `payment_authorized`.
6. Driver receives the authorized instant booking.
7. Driver completes the ride.
8. Backend captures the authorized PaymentIntent after ride completion.
9. Driver payout moves to weekly outside-Stripe bank-transfer settlement.

If the ride is cancelled under a free-cancellation condition, cancel the uncaptured PaymentIntent and release the hold. If the driver has arrived and the customer cancels after the five-minute grace window, capture only the late-cancellation fee and release the remaining authorization.

### Instant hold validity

Stripe's current documentation says online card authorizations are typically valid for about 7 days. The exact expiry is available from `payment_method_details.card.capture_before` and must be treated as authoritative. Visa merchant-initiated transactions can have a shorter window of about 5 days.

This works for instant rides because the ride should finish within the authorization window. Reservation bookings can be scheduled much further ahead, so reservation payment stays charge-at-booking instead of using a long card hold.

Source: [Stripe - Place a hold on a payment method](https://docs.stripe.com/payments/place-a-hold-on-a-payment-method)

## Cancellation payment rules

### Reservation cancellation rules

These rules apply after the customer has already been charged at booking.

### Customer refund more than 24 hours before pickup

If the customer requests a refund more than 24 hours before pickup, keep a 15% cancellation fee and refund the remaining 85%.

Fee rule:

```text
early_customer_cancel_fee = full_fare * 0.15
customer_refund_amount = full_fare * 0.85
```

Backend action: create a partial Stripe refund for 85% of the full fare and keep 15%.

### Customer cancellation within 24 hours

Launch rule: retain 15% of the full fare and refund the remaining 85%.

```text
within_24h_reservation_cancel_fee = full_fare * 0.15
customer_refund_amount = full_fare - within_24h_reservation_cancel_fee
```

### Reservation late customer cancellation after driver arrival

If the driver has arrived and the customer cancels after the five-minute grace window, retain 30% of the full fare and refund the remaining 70%.

```text
reservation_after_arrival_cancel_fee = full_fare * 0.30
customer_refund_amount = full_fare * 0.70
```

Fee split:

```text
driver_share = reservation_after_arrival_cancel_fee * 0.70
platform_share = reservation_after_arrival_cancel_fee * 0.30
```

### Instant cancellation hold-release rules

These rules apply while the instant booking payment is still an authorization hold.

Release the payment authorization when:

- Customer cancels within 10 minutes after the driver accepts.
- Customer cancels more than 10 minutes after driver acceptance but the driver is still more than 10 minutes away from pickup.
- Driver cancels before pickup.
- Admin cancels for operational reasons.
- Ride cannot proceed for a reason covered by the free-cancellation policy.

Backend action: cancel the uncaptured PaymentIntent and release the hold.

### Instant 10% cancellation fee

Charge a cancellation fee when:

1. More than 10 minutes have passed since the driver accepted and the driver is within 10 minutes ETA of pickup; or
2. The driver has arrived and the customer cancels after the five-minute grace window.

Fee rule:

```text
instant_late_customer_cancel_fee = full_fare * 0.10
```

Backend action: capture 10% of the authorized amount and release the remaining 90%.

Fee split:

```text
driver_share = instant_late_customer_cancel_fee * 0.70
platform_share = instant_late_customer_cancel_fee * 0.30
```

### Driver cancellation

If the driver cancels and no replacement driver is selected, the default customer-safe behavior should be full refund or support-assisted replacement. The exact driver penalty is covered in [[product-logic#Driver cancellation policy]].

## Driver payout

Driver payouts are outside Stripe in v1. Every Friday, operations pays all eligible completed rides since the previous Friday by bank transfer after admin/system settlement.

Platform commission:

```text
platform_commission = driver_submitted_price * 0.10
driver_net_payout = driver_submitted_price - platform_commission
```

The 10% platform commission is deducted from the driver's submitted price. It is not added on top of the customer-visible price.

## Payment state machine

```text
payment_not_started
payment_processing
payment_requires_action
payment_authorized
payment_paid
payment_captured
payment_released
refund_requested
refund_review_required
refund_partial_85_percent
refund_full
cancellation_fee_retained_15_percent
instant_late_cancel_fee_captured_10_percent
payment_failed
payment_disputed
```

## Booking and payment event mapping

| Booking event | Payment action |
|---|---|
| Reservation customer selects driver | Create and capture Stripe PaymentIntent immediately. |
| Reservation card payment succeeds | Move booking to `payment_paid`. |
| Instant customer confirms driver/match | Create manual-capture Stripe PaymentIntent. |
| Instant card authorization succeeds | Move booking to `payment_authorized`. |
| Reservation customer cancels more than 24 hours before pickup | Refund 85%, keep 15% cancellation fee. |
| Reservation customer cancels within 24 hours before pickup | Refund 85%, keep 15% cancellation fee. |
| Reservation customer cancels after driver arrived + 5 minutes | Refund 70%, retain 30%; split retained fee 70% driver / 30% platform. |
| Instant customer cancels within 10 minutes after driver accepts | Cancel PaymentIntent and release hold. |
| Instant customer cancels after 10 minutes while driver ETA is more than 10 minutes | Cancel PaymentIntent and release hold. |
| Instant customer cancels after 10 minutes while driver ETA is 10 minutes or less | Capture 10% cancellation fee, release remaining 90%. |
| Driver arrives for instant booking | Start five-minute customer-cancellation timer. |
| Instant customer cancels after driver arrived + 5 minutes | Capture 10% cancellation fee, release remaining 90%. |
| Driver cancels within 5 minutes after accepting | Refund or support-assisted replacement if no replacement is selected; log event. |
| Driver cancels more than 5 minutes after accepting | Refund or support-assisted replacement if no replacement is selected; create warning/penalty record. |
| Reservation trip completes | Mark captured payment as earned and include eligible driver payout in the next Friday bank-transfer batch. |
| Instant trip completes | Capture authorized PaymentIntent, then include eligible driver payout in the next Friday bank-transfer batch. |

## Product copy requirements

The customer app must explain before payment:

- Reservation bookings are charged when the booking is confirmed.
- Instant bookings place a card hold first, then capture after the ride is completed.
- Instant booking holds are released when cancellation is free.
- For instant bookings, a 10% cancellation fee applies if the customer cancels more than five minutes after the driver arrives.
- For reservation bookings, if the customer cancels more than 24 hours before pickup, 15% is kept as the cancellation fee and 85% is refunded.
- Reservation cancellation within 24 hours keeps 15% and refunds 85%.
- Reservation cancellation more than five minutes after driver arrival keeps 30% and refunds 70%.
- Instant cancellation is free within 10 minutes after driver acceptance.
- For instant booking, a 10% fee applies after 10 minutes if the driver is within 10 minutes ETA of pickup.
- The final charge is in HKD.

The driver app must explain:

- The booking is not final until customer payment succeeds.
- Driver can see customer details only after the customer accepts and pays.
- The driver arrival timestamp starts the five-minute late-cancellation timer.
- False arrival marking should be penalized because it can trigger customer fees.

## Admin controls

Admin needs:

- View Stripe PaymentIntent status.
- Capture authorized instant booking payment.
- Release instant booking authorization hold.
- Issue full refund.
- Issue partial refund.
- Override cancellation fee.
- Add dispute note.
- Audit log for every payment override.

## Remaining payment implementation questions

- What operational steps and approval checks should run before the Friday bank-transfer batch is released?
