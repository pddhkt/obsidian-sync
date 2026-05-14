# Stack snapshot

Current technical decisions for the rebuild. Source of truth: `reference/internal-master.md` §3 Stack.

## Locked stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js 15 App Router | SEO, speed, ecosystem |
| CMS + Commerce | Payload v3 | one-stop, self-host, fully owned |
| Database | PostgreSQL (Supabase / Neon) | production-ready, easy backup |
| Storage | Cloudflare R2 | cheap, zero egress fees |
| Payment | Airwallex | FPS / AlipayHK / WeChat / credit / installment |
| Analytics | PostHog | funnel, replay, A/B, flags |
| Auth | Payload built-in | customer + admin in one |
| Hosting (frontend) | Vercel | fastest Next.js deploy |
| Hosting (backend + DB) | Railway / Fly.io | cheap, easy scale |

## Pending decisions (🟡)

Each has a paired note in `decisions/` once that folder is seeded:

### Search engine
**Meilisearch Cloud vs Algolia**
- Cost: ~$30/mo vs ~$200/mo
- Chinese tokenization: Meilisearch better
- Predictive UX: Meilisearch strong
- Maturity: Algolia more battle-tested
- **Recommendation:** Meilisearch — feature [[search-meilisearch]] tagged `decision-needed`

### Email vendor
**Resend Audiences vs Loops**
- Both similar pricing
- Resend: cleaner DX, unified transactional + marketing in one vendor
- Loops: more polished UI for marketers
- **Recommendation:** Resend (one vendor for transactional + marketing)

### Checkout
**Self-built + Airwallex Drop-in vs Hosted Payment Page**
- Self-built: full UX control, Airwallex still handles PCI
- Hosted: simpler, slightly worse UX
- **Recommendation:** Self-built — feature [[checkout-airwallex]] tagged `must-have` but build/hosted choice is internal

## Migration source

- **From:** Shopline (current platform, ~HK$2,499/mo)
- **To:** Payload-only stack (~HK$650/mo ongoing)
- **Migration phase:** Phase 2 (2-3 weeks)
- **Risks:** SEO ranking dip (2-4 weeks), customer password reset friction, Shopline export limits

## Ongoing cost target

~HK$650/mo for platform, vs ~HK$2,499/mo Shopline — net ~HK$22k/yr savings.
