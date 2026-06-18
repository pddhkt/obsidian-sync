---
type: project-index
project: Many Profit 萬利嘉
status: scoping
created: 2026-06-15
---

# Many Profit 萬利嘉 — Project Home

> **萬利嘉** is the Hong Kong + Macau distributor that carries the [[Imarflex/_index|Imarflex 伊瑪牌]] brand — and 7 others: **Bello, Excel, GermanHome, Fujira, HannesMüller, Sigma, Famous** (+ Others). Imarflex is one brand *under* Many Profit, not a sibling.
>
> manyprofit.com today = bilingual (中/EN) corporate + catalog site (~260 products, 4 categories), with "Online Shopping" handing off to imarflex.net for checkout.

## Goal
Build Many Profit a new website + commerce, and run it on the **same platform** as Imarflex — one shared CMS + one Airwallex — as a second **channel**, not a second codebase.

## Key decisions
- 🧱 [[decisions/multi-brand-app-architecture]] — **the architecture grill** (resolved): two channels on one shared backend; `channels`/`brands`/`listings` model; full per-channel layouts on a shared component library; one Vercel project + one Cloudflare Worker, routed by host. Start here.
- 💰 [[decisions/website-engagement-pricing]] — **pricing & engagement** (price agreed, scope pending): HK$50,000 → **$45,000** (partnership discount); invoice being scoped; reconcile vs prior draft quote IMX-2026-Q01.

## Relationship to Imarflex
- The build extends the existing `~/Projects/personal/imarflex-app` (to be renamed neutral) into a multi-channel app.
- Imarflex stays its own storefront/domain; Many Profit sells the other 7 brands and **deep-links Imarflex products back to the Imarflex store**.
- See [[Imarflex/_index|Imarflex project home]] for the Imarflex-side build/pitch context.
