---
type: decision-agenda
project: Cross Border Car Hailing
status: draft
date: 2026-05-29
tags:
  - car-hailing
  - architecture
  - decisions
  - meeting
  - hosting
  - app-distribution
aliases:
  - Tech Decisions to Discuss
  - Meeting Agenda - Tech
---

# Tech Decisions to Discuss

> Open infrastructure decisions to settle at the next meeting, with the context, options, and trade-offs already gathered so we can decide rather than re-derive. See [[architecture-and-cloud]] for the longer technical background and [[open-questions]] for product/business open items.

> [!question] The one question that unblocks almost everything
> **Where are our drivers physically, and how will they install the driver app — through HK/overseas app stores (because they are cross-border 中港车 drivers with HK phones/Apple IDs), or do they need to install it *inside* mainland China?**
> The answer to this decides the **server location** *and* both **app-distribution** problems below. Answer this first.

---

## Already locked (for context)

| Decision | Choice | Note |
|---|---|---|
| Mobile framework | **Kotlin Multiplatform (KMP)**, native UI per platform | Shares logic across iOS + Android. |
| Database | **PostgreSQL + PostGIS** | PostGIS needed for service-area / route / location queries. |
| Maps / routing | **AMap (高德)** | Works both sides of the border; distance drives the fare. |
| Payments | **Stripe**, HKD, HK merchant | Card-only for v1. |
| Backend (leaning) | **Ktor (Kotlin), Dockerized** | To confirm — see Decision 5. |
| Cloudflare as *primary* backend | **Likely dropped** | Durable Objects don't run in mainland China; China Network needs Enterprise + ICP and excludes DO/D1/Hyperdrive. May still be useful as a cheap customer-side edge + R2 file storage. |

---

## Decision 1 — Where do we host the server?

**Why it matters:** sets latency, cost, compliance, and whether we need a China entity. Foreign customers and mainland drivers pull in opposite directions.

| Option | Good for | Trade-off |
|---|---|---|
| **HK-primary** (AWS ap-east-1 / GCP HK) | Foreign + HK customers; simplest, cheapest, fastest to ship; no ICP | Mainland-driver access may be slower/less reliable (acceptable for reservation-first?) |
| **Mainland-primary** (Tencent / Alibaba Cloud) | Drivers in Shenzhen/Guangzhou; real-time performance | Needs **ICP + China entity**; **international customer access out of mainland can be slow**; more ops |
| **Hybrid** (HK/global customer edge + mainland driver ops) | Best of both | ~2× infra & ops complexity; still needs ICP for the mainland half |

> [!tip] Recommendation
> If drivers are reachable via HK (cross-border drivers), go **HK-primary for v1** and revisit mainland only when validated. If we must serve mainland-only drivers in real time, plan **Mainland-primary (Tencent/Alibaba) + ICP** now. **Cloudflare is not the primary backend** either way (mainland limitations), but could front the customer side cheaply later.

---

## Decision 2 — How do we solve iOS app distribution?

**Background fact:** Apple's **China App Store requires an ICP filing** tied to the app. Overseas + HK App Stores do not.

- **Customer app** (overseas + HK users) → **no problem**, ships on the normal/HK App Store.
- **Driver app** → depends on the unblocking question:
  - Drivers use HK/overseas Apple IDs → **ship on HK App Store, no ICP**.
  - Drivers need the China App Store → **ICP filing required** for the app.
  - Fallback for a small driver pool → Apple **ad-hoc / enterprise / TestFlight** distribution (limited seats, not for scale).

> [!todo] To decide
> Which App Store(s) does the **driver** app target, and do we therefore need an ICP filing for it?

---

## Decision 3 — How do we solve Android app distribution?

**Background fact:** **Google Play is blocked in mainland China.** Reaching mainland Android users means using **Chinese app stores** (Huawei AppGallery, Xiaomi, OPPO, Vivo, Tencent MyApp…) and completing the **MIIT app filing (备案)** now required for apps distributed in China.

- **Customer app** (overseas + HK users) → **Google Play works**, no problem.
- **Driver app** → depends on the unblocking question:
  - Drivers use HK/overseas phones → **Google Play (HK/overseas), no Chinese stores, no 备案**.
  - Drivers are on mainland Android → **multi-store Chinese distribution + 备案 filing** (significant ongoing effort), or controlled **direct APK / sideload** to onboarded drivers (simpler, but weaker updates/trust and store-policy risk).

> [!todo] To decide
> Do mainland drivers exist on Android, and if so: Chinese app stores + 备案, or direct/controlled APK distribution?

---

## Decision 4 — ICP filing + China business entity

**Why it matters:** ICP (and the app 备案) generally require a **mainland China company** (or a local partner/agent who sponsors it) and take **weeks**, not hours. This gates Mainland-primary hosting, the China App Store, and Chinese Android stores all at once.

> [!todo] To decide
> Do we have, or will we set up, a China entity + ICP? If not for v1, that effectively forces **HK-primary + overseas/HK distribution** as the v1 path.

---

## Decision 5 — Confirm backend runtime (Ktor vs Go)

**Why it matters:** the backend owns all authoritative logic (pricing, ranking, payments, trip state).

- **Ktor (Kotlin), Dockerized — recommended.** Shares the **same Kotlin domain module** as the KMP apps: one definition of `Booking`/`FareQuote`/`Bid`/`Trip`, validation written once and enforced on both client and server, the booking state machine as a single source of truth, and a shared API contract. No model/rule drift across iOS + Android + server.
- **Go** — leaner memory/cold-start and simple ops, but **no code-sharing** with the mobile apps (every model/rule maintained twice).
- Both Dockerize cleanly; Kotlin can use **GraalVM native image** later if cold-start/memory ever matter.

> [!todo] To decide
> Lock **Ktor (Kotlin)** to get the KMP code-sharing benefit?

---

## Decision 6 — How much real-time does v1 actually need?

**Why it matters:** if real-time needs are light, mainland latency matters less and HK-primary gets easier.

- Reservation-first booking is **not** live dispatch — the only real-time pieces are **live trip tracking** and **in-app chat**.
- Options for those: simple **polling**, a **managed realtime service**, or stateful coordination (the kind of thing Durable Objects do well — but **not in mainland China**).

> [!todo] To decide
> Are tracking + chat light enough (polling / managed service) that a HK-primary server is fine for mainland drivers in v1?

---

## Suggested meeting order

1. Answer the unblocking question (driver location + driver-app channel).
2. Decision 4 (ICP/entity) — yes/no often forces the rest.
3. Decision 1 (hosting).
4. Decisions 2 & 3 (iOS + Android distribution).
5. Decisions 5 & 6 (backend runtime, real-time scope).

---

## Background sources

- [Cloudflare China Network — available products](https://developers.cloudflare.com/china-network/reference/available-products/) (Workers/KV yes; DO/D1/Hyperdrive no)
- [Cloudflare China Network — ICP requirements](https://developers.cloudflare.com/china-network/concepts/icp/)
- [Durable Objects — data location & jurisdictions](https://developers.cloudflare.com/durable-objects/reference/data-location/) (no China location)

## Related notes

- [[architecture-and-cloud]] · [[teammate-overview]] · [[open-questions]] · [[_index]]
