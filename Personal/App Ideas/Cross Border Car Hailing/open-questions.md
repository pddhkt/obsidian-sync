---
type: decisions
project: Cross Border Car Hailing
status: open
date: 2026-05-26
tags:
  - car-hailing
  - questions
  - product-decisions
---

# Open Questions

Use this note to drive the next product discussion. The app should not be fully designed until these business rules are clearer.

## Answered decisions

| Question | Decision |
|---|---|
| V1 route scope | Hong Kong airport to Shenzhen, Hong Kong city to Shenzhen, and Hong Kong to Guangzhou. |
| Reservation discount | Reservation is 20% cheaper than instant booking reference price. |
| Driver supply model | Open marketplace drivers. |
| V1 customer payment | Reservation: Stripe charge at booking in HKD. Instant: Stripe authorization hold/manual capture. |
| Bidding visibility | Customer sees the top 5 driver choices, not every bid. |
| Payment capture | Reservation captures immediately when booking is confirmed. Instant captures after ride completion. |
| Reservation early cancellation fee | If customer cancels more than 24 hours before pickup, keep 15% and refund 85%. |
| Reservation within-24h cancellation fee | Keep 15% and refund 85%. |
| Instant cancellation before arrival | Free within 10 minutes after driver accepts. After 10 minutes, capture 10% only if driver ETA is 10 minutes or less; otherwise release the hold. |
| Instant after-arrival cancellation fee | If customer cancels more than 5 minutes after driver arrival, capture 10% from the hold. |
| Reservation after-arrival cancellation fee | If customer cancels more than 5 minutes after driver arrival, retain 30% and refund 70%. |
| Offer collection window | Drivers have 2 minutes to submit offers before the top 5 is generated. |
| Top-5 ranking | Balanced value score combining reliability, price, vehicle fit, availability, language, and platform quality. |
| Fare currency | HKD. |
| V1 direction | Supports both Hong Kong to Mainland and Mainland to Hong Kong. |
| Hong Kong service area | Every Hong Kong area. |
| Mainland service area | Shenzhen and Guangzhou areas. |
| Fewer than 5 offers | Show fewer choices. If customer refuses all, create a new request. |
| Driver bid pricing | Platform does not control driver price in v1. |
| Instant 10% cancellation fee split | 70% driver, 30% platform. |
| Reservation window | Minimum 2 hours before pickup and maximum 30 days ahead. [ASSUMPTION] |
| Mainland district coverage | All Shenzhen and Guangzhou areas first. |
| Map provider | AMap is the authoritative map/routing provider because it can handle both Hong Kong and Mainland paths. |
| KMP map approach | KMP shared logic plus native map SDK wrappers per platform/provider. |
| Driver documents | All core driver, vehicle, cross-border permit, insurance, ID, and business/fleet registration documents. |
| Driver account types | Individual drivers and fleet/company accounts are allowed. |
| Driver direction eligibility | Driver can serve both directions if verified, but only receives orders from the driver's current pickup-side area. |
| Driver cancellation penalty | Within 5 minutes after accepting is logged only; after 5 minutes is warning/penalty; more than 3 late cancellations triggers 5-hour temporary ban. |
| Driver cancellation rolling window | Weekly. |
| Active-trip support channel | In-app chat. |
| Support join | Support joins the active customer-driver chat when help is requested. |
| Active-trip support SLA | Under 5 minutes. |
| Support operating hours | 09:00 to 00:00. |
| Support staffing | Admin staff: initially co-founders or staff from Kevin Tsang. |
| Chat translation | Auto-translation available through a button. |
| Stripe merchant entity | Hong Kong company. |
| Driver payout rail | Platform pays drivers outside Stripe in v1. |
| Driver payout cadence | Every Friday: all eligible completed rides since the previous Friday. |
| Driver payout method | Bank transfer. |
| Platform commission | Deduct 10% from driver's submitted price; do not add it on top of customer-visible fare. |
| Customer card handling | Reservation charges card at booking; instant booking authorizes a hold and captures later. |
| Mainland cloud day-one requirement | No. |
| Driver document legal names | Kevin's team will confirm exact legal names. Generic document categories stay in scope for planning. |
| Border crossings | Support all cross-border vehicle crossings in v1 through backend configuration. |
| Instant Stripe hold window | Online card authorizations are typically about 7 days; use Stripe `capture_before` as authoritative. Visa MIT can be shorter at about 5 days. |

## Remaining questions to answer first

1. What exact legal names should Kevin's team provide for required driver/vehicle/cross-border documents?
2. What operational steps and approval checks should run before the Friday bank-transfer batch is released?

## Customer segment

- Are customers mainly tourists, business travelers, expats, students, or cross-border residents?
- Are they booking before arrival or while already in Hong Kong/Mainland?
- Do they speak English only, or should the app support other languages at launch?
- Are they price-sensitive or reliability-sensitive?
- Are they usually going to airport, hotel, exhibition center, factory, office, or home?
- AMap is the authoritative map/routing provider for v1.

## Booking model

- Reservation is the default for v1.
- Should instant booking appear only when drivers are actually nearby?
- Customer-visible bidding is part of v1, but only as top 5 ranked choices.
- Can drivers reject bookings freely?
- Customers can choose one of the top 5 driver choices.
- If customers reject all shown offers, a new request is created.
- Reservation window is assumed to be 2 hours minimum lead time and 30 days maximum.
- Driver can only receive orders starting from the driver's current pickup-side area.

## Pricing

- What is the base fare?
- AMap route distance is authoritative for fare distance.
- Are tolls and bridge fees included?
- Is border waiting time included?
- What is the free waiting period at pickup?
- What happens if the customer is late?
- What happens if the border crossing takes much longer than expected?
- Platform commission is deducted as 10% of the driver's submitted price.
- Are discounts funded by platform margin, driver margin, or marketing budget?
- Instant after-arrival cancellation fee is confirmed at 10% from the authorization hold.
- Reservation after-arrival cancellation keeps 30% and refunds 70%; retained fee is split 70% driver and 30% platform.

## Driver operations

- Individual driver accounts and fleet/company accounts are both allowed.
- How are drivers onboarded?
- Who verifies their documents?
- How often do documents expire?
- Can drivers serve all routes or only selected routes?
- Drivers can set their own price; the platform does not control bid price in v1.
- Drivers cannot see customer language before customer accepts and pays.
- Drivers can see required customer execution info after customer accepts and pays.
- Driver cancellation within 5 minutes after accepting is logged only.
- Driver cancellation after 5 minutes creates a warning/penalty.
- More than 3 late cancellations triggers a 5-hour temporary ban from receiving orders.
- The cancellation count window is weekly.

## Cross-border constraints

- All cross-border vehicle crossings are supported through backend configuration.
- Are there vehicle quota or permit limits?
- What happens if a passenger is rejected or delayed at the border?
- Are child seats, pets, wheelchairs, or large luggage allowed?

## Payments and refunds

- Reservation uses Stripe charge-at-booking.
- Instant booking uses Stripe authorization hold/manual capture.
- Stripe merchant entity is the Hong Kong company.
- Credit card is required for launch.
- Reservation customer pays by card when booking is confirmed.
- Instant customer authorizes a card hold when booking is confirmed.
- Fare is charged in HKD.
- WeChat Pay and Alipay are not v1 customer payment methods unless scope changes.
- Cash is out of v1 unless the business explicitly changes payment scope.
- Reservation payment is captured immediately at booking.
- Instant payment is captured after ride completion.
- Customer cancellation more than 24 hours before pickup keeps 15% cancellation fee and refunds 85%.
- Reservation cancellation within 24 hours keeps 15% and refunds 85%.
- Instant cancellation is free within 10 minutes after driver acceptance.
- Instant cancellation after 10 minutes captures 10% only if driver ETA is 10 minutes or less; otherwise release the hold.
- Instant customer late-cancel after driver arrival plus 5 minutes captures 10% from the hold.
- Instant 10% cancellation fee split is 70% driver and 30% platform.
- Reservation cancellation after driver arrival plus 5 minutes keeps 30% and refunds 70%.
- Reservation after-arrival retained fee split is 70% driver and 30% platform.
- What requires manual approval?
- Platform pays drivers outside Stripe in v1.
- Platform deducts 10% from the driver's submitted price; it is not added on top of customer-visible fare.
- Driver payout cadence is every Friday for all eligible completed rides since the previous Friday.
- Driver payout method is bank transfer.
- Receipts should show HKD.

## Cloud and compliance

- Where is the company operating entity?
- Where are drivers located?
- Where are customers located at booking time?
- Does the business require Mainland app distribution?
- Does the driver app need to be reliably available inside Mainland China?
- Which data must stay in Mainland infrastructure, if any?
- Who will confirm legal, licensing, payment, data privacy, and cross-border data requirements?
- Mainland cloud is not required from day one.

## Product defaults if unanswered

Use these as temporary defaults for early planning:

- v1 is reservation-first.
- v1 routes are Hong Kong airport to Shenzhen, Hong Kong city to Shenzhen, and Hong Kong to Guangzhou.
- v1 supports both Hong Kong to Mainland and Mainland to Hong Kong.
- Hong Kong service area is every Hong Kong area.
- Mainland service area is Shenzhen and Guangzhou areas.
- Reservation window is assumed to be 2 hours minimum lead time and 30 days maximum.
- Fare uses a reference quote plus marketplace driver offers.
- Reservation price is 20% cheaper than instant reference fare.
- Bidding is customer-visible as a top-5 ranked list.
- Drivers have two minutes to submit offers before the top 5 is generated.
- If fewer than 5 offers are available, show fewer choices.
- If the customer refuses all choices, create a new request.
- Platform does not control driver bid price in v1.
- Top 5 uses a balanced value score.
- Drivers are open marketplace drivers.
- Reservation customer payment is Stripe credit-card charge at booking in HKD.
- Instant customer payment is Stripe credit-card authorization hold/manual capture in HKD.
- Customer cancellation more than 24 hours before pickup keeps 15% cancellation fee and refunds 85%.
- Reservation cancellation within 24 hours keeps 15% and refunds 85%.
- Reservation cancellation after driver arrival plus five minutes keeps 30% and refunds 70%.
- Reservation after-arrival retained fee split is 70% driver and 30% platform.
- Instant cancellation is free within 10 minutes after driver accepts.
- Instant cancellation after 10 minutes captures 10% only if driver ETA is 10 minutes or less; otherwise release the hold.
- Instant after-arrival cancellation captures 10% from the hold after driver arrival plus 5 minutes.
- Instant 10% cancellation fee split is 70% driver and 30% platform.
- Drivers must be verified before seeing cross-border jobs.
- Admin can monitor, suppress, or override marketplace offers.
- Customer app supports English first, then Traditional Chinese and Simplified Chinese.
- Driver app supports Traditional Chinese and Simplified Chinese first, then English if needed.
- Chat has button-triggered auto-translation.
- Active-trip support is in-app chat with under-5-minute response target during 09:00 to 00:00.
- Support joins the active customer-driver chat when help is requested.
- Map provider is AMap for routing and fare distance in v1.
- Stripe merchant entity is the Hong Kong company.
- Stripe charges reservation customers when booking is confirmed.
- Stripe holds instant booking payment and captures after ride completion.
- Platform commission is deducted as 10% of the driver's submitted price and is not added on top of customer-visible fare.
- Driver payouts are outside Stripe and paid every Friday by bank transfer for all eligible completed rides since the previous Friday.
- Mainland cloud is not required from day one.
- Drivers can register as individuals or under fleet/company accounts.
- Drivers only receive orders starting from their current pickup-side area.
- Driver cancellation after accepting is logged; late cancellation after 5 minutes creates penalty; more than 3 late cancellations in a weekly window causes a 5-hour temporary ban.
- All cross-border vehicle crossings are supported through backend configuration.
- Backend owns pricing, dispatch, payment, and booking state.
- Mobile apps render state and collect inputs.

## Questions for next conversation

Please answer these first:

1. What exact legal document names should Kevin's team provide for driver, vehicle, cross-border permit, insurance, ID, and fleet/company verification?
2. What operational steps and approval checks should run before the Friday bank-transfer batch is released?
