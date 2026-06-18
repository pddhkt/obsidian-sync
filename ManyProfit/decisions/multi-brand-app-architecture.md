---
type: grill-session
project: Many Profit 萬利嘉
status: resolved
created: 2026-06-15
---

# Multi-Brand App Architecture (Many Profit + Imarflex) — Grill Session

## Summary
**Many Profit 萬利嘉** (parent distributor, 8 brands) and **Imarflex** (one of those brands) will run as **two channels on one shared platform** — the existing `imarflex-app`, refactored into a multi-channel app (neutral rename; live data names kept).

One Cloudflare Worker + one `cms` D1 + one `customers` D1 + one R2 + one Airwallex back a **shared product catalog**. A `channels` / `brands` / `listings` model publishes each product to each channel as **buyable** or **link-out**. Many Profit sells the **7 non-Imarflex brands** directly; **Imarflex** products appear on Many Profit but their "Buy" **deep-links to the Imarflex storefront PDP** (canonical there).

Both storefronts run from **one Vercel project**, resolved per-domain by `Host`. Channel is detected on **both tiers** — Vercel `middleware.ts` **rewrites** `host → /[channel]` (so each channel gets its own layout + route tree, not just a recolor), and the Hono middleware sets the `channelId` that every query scopes by (the single leak-prevention seam). The frontend uses **full per-channel layouts** under `app/[channel]/*` drawing on a shared `components/commerce/*` library; the **CMS is one admin with a channel switcher** over a shared catalog + per-channel publishing/content. Customers are **one shared identity**, channel-tagged.

**Next:** Phase 0 refactor (rename + channel/brand/listing schema + backfill Imarflex as channel `imarflex`) → CMS channel-awareness → Many Profit storefront → data import → launch. Client asks + rollout below.

## Context established (pre-grill)
- **Many Profit 萬利嘉 is the parent distributor**, not a second Imarflex storefront. It carries ~8 brands: **Imarflex, Bello, Excel, GermanHome, Fujira, HannesMüller, Sigma, Famous** (+ "Others"). Imarflex is one brand under it.
- **manyprofit.com today** = bilingual (中/EN) corporate + catalog site. ~260 products across 4 categories (Home Appliances 123 / Cooking 101 / Large 22 / Accessories 14), shown with prices + "sold out" flags. "Online Shopping" redirects to **imarflex.net** for actual checkout. Sections: About Us, Product Introduction, Online Shopping, Latest News (FB), Warranty Registration, Contact Us. Markets: HK + Macau.
- **`imarflex-app` actual stack** (vault `_index.md` is STALE — says Payload, wrong): pnpm monorepo →
  - Storefront: **Next.js 16**, App Router, `src/app/(storefront)`, Tailwind 4, theme tokens hardcoded in `globals.css` (`--heritage-blue #1E4B7A` etc.), site config hardcoded in `src/config/site.ts`.
  - Backend/CMS: **Cloudflare Workers + Hono**, **D1 SQLite via Drizzle** (`workers/api/`). Two D1 DBs: `imarflex-cms`, `imarflex-customers`. R2 bucket `imarflex-media`. Durable Objects for inventory/checkout/cart.
  - Admin: **React 18 + Vite + TanStack Router** SPA (`apps/admin-ui`), single admin table, JWT auth, no brand switcher.
  - **Zero multi-tenant fields** anywhere. Handles/SKUs globally unique. Singletons `storeSettings`, `pageContent`. Everything hardcoded `imarflex.*` (domains, email from-addr, bucket, DB names).

## Decisions
| # | Question | Decision | Rationale |
|---|---|---|---|
| 0 | Where do these notes live? | New `ManyProfit/` folder (parallel to `Imarflex/`); this grill at `ManyProfit/decisions/multi-brand-app-architecture.md`, cross-linked from Imarflex | Many Profit is the parent distributor with 8 brands; it will grow its own brand/content/marketing notes. Filing it under one of its own brands (Imarflex) would be backwards. |
| 1 | What is the MP site for? | **Multi-brand e-commerce.** MP sells the 7 non-Imarflex brands directly (own checkout). Imarflex-brand products appear in MP catalog but "Buy" **deep-links to the Imarflex storefront**. Both sites share **one CMS + one Airwallex**. | User intent. Keeps the Imarflex brand experience (warranty, brand site) on its own storefront while MP monetizes the rest of the distribution portfolio. One company → one Airwallex merchant, so payments stay single-account. |
| 2 | Two axes, not one | **Channel** (`imarflex`, `manyprofit`) = the switchable storefront/tenant (domain, theme, lang, emails, order stream). **Brand** (8 values) = product attribute. "Buyable here vs link-out" is a per-product, per-channel listing flag. | User's "switch between manyprofit/imarflex" = switching *channels*; the 8 brands are *data*. Conflating them would wreck the schema. Shared-catalog + multiple-sales-channels pattern. |
| 3 | How physically separate? | **One shared backend, channel-scoped (Option A).** Single Worker, single `cms` + `customers` D1, single R2, single Airwallex. Channel resolved by hostname; scoping enforced in one query layer. | Only option that makes the shared catalog (Imarflex products on MP) a free `SELECT` instead of cross-DB sync, and fits "same CMS + Airwallex". Accepts shared blast radius as a discipline cost. |
| 4 | Customer accounts shared or separate? | **Shared identity, channel-tagged data.** One `customers` table; same login both stores; orders/warranties/carts carry `channelId` for branded views. Guest checkout either way. | Single customer view + cross-sell for one company; least code. MP accounts can launch lighter than Imarflex. |
| 5 | Core schema shape | **Accepted (see Proposed design).** New: `channels`, `brands`, `listings(product×channel, buyable\|link_out)`. Changed: `products.brandId`; `channelId` on orders/carts/collections/blogPosts/pages; per-channel rows for `storeSettings`/`pageContent`; shared `media`; channel-agnostic inventory DOs. | Shared product pool + per-channel publishing is the marketplace/sales-channel pattern. Global-unique handle kept (one product, many listings). |
| 6 | CMS switcher UX | **Shared catalog + channel switcher.** One global product list (edited once); per-product "Channels" panel = publish/buyable/link-out/price per channel. Channel-shaped things (home, nav, news, theme, orders, settings) behind a top-bar channel selector. Add `admins.channelScope` (null=all) now for future MP-only staff. | Matches the shared-pool reality; avoids the "editing on MP silently changes Imarflex" confusion of channel-scoped workspaces. |
| 7 | Domains & deploy topology | **One Worker, two separate custom domains, host-based channel routing.** Storefront stays on **Vercel** (`vercel.json` present) as one project serving both apex domains; CF API Worker bound to both channel hostnames. Channel resolved from `Host` on **both** tiers (Next `middleware.ts` + Hono middleware = the scoping seam). **Rename code/Worker identity to neutral; keep physical D1/R2 names** (user deferred naming). | User: separate domains, same Worker. Vercel(storefront)+CF(API) split already exists; both just become host-aware. Neutral name reflects parent-platform reality; keeping data names avoids migrating live Imarflex data. |
| 8 | API attach mechanism | **Per-channel API subdomains** (`api.imarflex.com.hk`, `api.manyprofit.com`) → same Worker; channel from `Host`. | Spoof-resistant, zero trust in the caller, cleanest match to host-based channel routing. |
| 9 | Storefront divergence level | **Full per-channel layouts.** Every route composed per channel under `app/[channel]/*` (own layout/nav/homepage/route set; channel-only routes via `notFound()`). Still draws from one shared `components/commerce/*` library + shared commerce logic — "full" = composition freedom, NOT duplicated checkout/PDP/cart. | User wants max freedom for two genuinely different sites (single-brand store vs 8-brand distributor IA). Shared component lib keeps logic single-sourced; only page composition diverges. |
| 10 | Imarflex deep-link from MP | MP shows Imarflex products w/ price + **"View on Imarflex" CTA → Imarflex storefront PDP** (not cart), no cross-domain cart. `rel=canonical` on MP's Imarflex listings → Imarflex PDP; 7 MP-exclusive brands canonical = MP. | Keeps Imarflex brand experience (full PDP + warranty) on its own domain; avoids cross-domain cart complexity; prevents duplicate-content SEO penalty. |

## Proposed design (accepted so far)
**Backend:** one CF Worker, one `cms` D1 + one `customers` D1, one R2, one Airwallex. Channel resolved by **hostname** at the edge; a single Drizzle query layer always injects `channelId` scope (the leak-prevention seam).

**New tables**
- `channels` — `id, slug, name, primary_domain, theme_key, default_lang, email_from, logo_ref, active`
- `brands` — `id, slug, name, logo_ref, blurb` (seed 8: Imarflex, Bello, Excel, GermanHome, Fujira, HannesMüller, Sigma, Famous)
- `listings` — `id, productId, channelId, mode('buyable'|'link_out'), external_url?, price_override_cents?, visible, featured, sort` · UNIQUE(productId, channelId)

**Changed tables** — `products.brandId`; `channelId` on `orders`/`carts`/`collections`/`blogPosts`/`pages`; per-channel rows for `storeSettings`/`pageContent`; shared `media` (+optional `brandId` tag); inventory/checkout/cart DOs channel-agnostic (keyed by SKU/session).

**Customers** — shared `customers` table; data tagged by `channelId`.

## Day-1 client asks (⚠️ need Many Profit / Imarflex side)
- [ ] **Many Profit brand kit** — logo, colour palette, fonts, tone → seeds the `channels.imarflex`/`channels.manyprofit` config + MP theme tokens.
- [ ] **7 brands' assets** — logo + short blurb for Bello, Excel, GermanHome, Fujira, HannesMüller, Sigma, Famous → `brands` rows + brand landing pages.
- [ ] **Product data** — the ~260 MP products across 8 brands: title, specs, images, price (HKD), inventory, category. Source + format? (export from current manyprofit.com / supplier sheets / scrape-then-verify)
- [ ] **Domains/DNS** — access to point `manyprofit.com` + `api.manyprofit.com` at Vercel / Cloudflare.
- [ ] **Airwallex** — confirm ONE account/merchant covers both channels (or separate sub-accounts?). Affects payout/reporting wiring.
- [ ] **Fulfillment & ops** — confirm one team/warehouse fulfils both channels (orders just tagged); returns + warranty handling per brand.
- [ ] **Macau** — site serves HK + Macau; any shipping/tax/payment differences to model per channel?
- [ ] **MP content** — About/milestones copy, news source (current site links FB), contact details.

## Rollout plan
- **Phase 0 — Foundation refactor (invisible).** Neutral rename; add `channels`/`brands`/`listings`; backfill existing data as channel `imarflex` + brand `imarflex`; introduce the channel-scoping query seam; Host→channel middleware on both tiers. Imarflex site behaves identically; MP not live yet.
- **Phase 1 — CMS channel-awareness.** Admin channel switcher; per-product "Channels" panel (publish / buyable / link-out / price override); per-channel settings/pages/blocks; `admins.channelScope`.
- **Phase 2 — Many Profit storefront.** `app/[channel]/...` MP layout, 8-brand mega-nav, homepage, brand landings, About/news; wire `api.manyprofit.com`; MP theme; emails/analytics/search channel-tagged.
- **Phase 3 — Data import.** 8 brands + ~260 products + media into shared catalog; create MP listings (7 brands buyable, Imarflex link-out).
- **Phase 4 — Launch.** Point `manyprofit.com` at Vercel; go live; monitor; iterate.

## Cross-cutting channel-awareness checklist (touch during refactor)
`packages/emails` (per-channel from-addr + branding) · PostHog (tag events w/ channel) · Meilisearch (filter by channel) · sitemap/robots per domain · media URLs · warranty (Imarflex-only) · 中/EN i18n on both.

## Phase 0 — landed (2026-06-16)

**Implementation:** branch `feat/phase0-multichannel-foundation` in `imarflex-app`.

**Schema:** new tables `channels`, `brands`, `listings`; new nullable `channel_id` on `collections`, `blog_posts`, `pages`, `page_content`, `store_settings`; `brand_id` on `products`; `channel_id` on `orders` (customers D1). `channels.id` and `brands.id` ARE the slug (e.g. `'imarflex'`).

**Migrations** (hand-written; drizzle journal stops at 0009):
- `migrations-cms/0012_channels_brands_listings` — new tables.
- `0013_seed_channels_brands` — seeds `imarflex` channel + 8 brands (Bello, Excel, GermanHome, Fujira, HannesMüller, Sigma, Famous).
- `0014_backfill_listings` — one buyable listing per product.
- `migrations/0002_orders_channel` — orders D1.
All existing rows backfilled to channel/brand `'imarflex'`.

**Seam:** `workers/api/src/cms/channel.ts` (resolveChannelId from Host, static `HOST_TO_CHANNEL` map, `DEFAULT_CHANNEL='imarflex'`) + `workers/api/src/cms/catalog/scope.ts` (`productInChannel` = correlated EXISTS on `listings.visible`; `byChannel` = eq on a `channel_id` column), mounted `app.use('*', resolveChannel)` in `createCmsApp`.

**Storefront content reads scoped by channel:**
- `content-catalog.ts` — products via EXISTS, collections.
- `content-pages.ts` — pages, page-content.
- `content.ts` — blog.
- `content-commerce.ts` left global (bundles/promotions/discount-codes have no `channel_id` by design).
- `/media` stays global.

**Products:**
- POST auto-creates the resolved channel's buyable listing.
- DELETE removes listings first (FK).
- `brand_id` wired through zod + create/patch.

**Verified:** 341 existing vitest tests pass, worker bundles, migrations apply to local D1, backfill idempotent.

**Deferred to later phases:** storefront `app/[channel]` restructure + Next.js Host→channel middleware, neutral code/Worker rename, CMS admin channel switcher + per-product Channels panel (Phase 1), threading channel through the checkout Durable Object (orders default to `'imarflex'` for now).

## Phase 1 — landed (2026-06-16)

**Implementation:** branch `feat/phase1-cms-channel-awareness` in `imarflex-app` (off the Phase 0 branch), commit `8fe5e0e`. Focused slice of Phase 1 — switcher + Channels panel + `channelScope` foundation; per-channel **filtering/403 enforcement** of admin reads/writes deferred (see below).

**`admins.channelScope`** (migration `0015`, `NULL` = all-channels super-user — *not* defaulted to `'imarflex'`): round-trips through the admin JWT (`AdminClaims`), the login + `/auth/me` bodies, and admins create/patch + DTO.

**Admin channel-override seam:** the admin SPA is one Host, so `resolveChannel` always yields `imarflex` there; admins instead pick a channel sent as the `X-Channel-Id` header. `requireAdmin` (auth.ts) applies pure `resolveAdminChannel(hostChannel, scope, header)` (channel.ts) — a **scoped** admin is *forced* to their scope (header ignored, so a forged header can't escape); an **all-channels** admin honours a known header (static `KNOWN_CHANNELS = {imarflex, manyprofit}`) else falls back to Host. Storefront/signed routes never call `requireAdmin`, so they stay Host-only.

**Per-product Channels panel:** `GET /products/:id` now returns every channel's `listings[]` (via `loadProductDetail`, also used by POST/PATCH so the editor cache keeps the full shape); `PUT /products/:id/listings` replaces the full desired set atomically with `db.batch` (`onConflictDoUpdate` keyed on `(product_id, channel_id)` + delete-removed). New `GET /channels` + `GET /brands` metadata. Admin UI: TopBar **ChannelSwitcher** (dropdown for all-channels admins, locked label when scoped; channel persisted to `localStorage` → `X-Channel-Id`), a per-product **Channels panel** (mode buyable|link_out / external URL / price override / visible / featured / sort), and a **brand selector**.

**Migration `0016`** seeds a minimal placeholder `manyprofit` channel (`active=1`) so the switcher/panel have a second channel.

**Verified:** 365 worker + 188 admin-ui vitest pass; `admin-ui` `tsc --noEmit` clean; worker bundles; migrations `0015`+`0016` apply to local D1 (channels = imarflex + manyprofit, existing admins `channel_scope` NULL). A 4-lens adversarial review ran on the diff — 3 confirmed findings fixed (JWT `channelScope` undefined→null normalize; ChannelsPanel re-seed clobbering unsaved edits → ref-gated to once-per-product-id; `setChannel` `useCallback`).

**Deferred (Phase 1.5):** per-channel FILTERING + 403 enforcement of admin reads/writes for products-list / pages / blog-posts / settings / page-content. ⚠️ The JWT `channelScope` is a **soft UI override only** today — enforcement work must re-read scope from the DB (the cookie lives up to the 7-day TTL after a scope change) and must NOT trust the claim. Also still deferred from Phase 0: storefront `app/[channel]` restructure + Next.js Host→channel middleware, neutral rename, channel through the checkout DO.

## Phase 1.5 — landed (2026-06-16, uncommitted)

**Implementation:** branch `feat/phase1.5-enforcement-phase2-scaffold` in `imarflex-app` (off the Phase 1 branch). Two parts: (1) per-channel admin **enforcement**, (2) Phase 2 **separate-deploy storefront scaffold**. Built via an ultracode workflow (foundation → fan-out enforce → tests → 4-lens adversarial review → fix). NOT yet committed; nothing pushed; no remote D1 change.

**Enforcement model — hybrid "All + per-channel".** A super-admin (`channel_scope` NULL) gets a switcher with **All Channels** (global, unfiltered) PLUS each channel (filtered drill-down); a scoped admin is locked to their one channel. Owner gets both global and per-channel views.

**The seam (DB-authoritative).**
- `requireAdmin` (auth.ts) now **re-reads `admins.channel_scope` + `is_active` from D1** on every cookie request — the JWT `channelScope` claim is NOT trusted (the cookie can outlive a scope/deactivation change up to the 7-day TTL). Deleted/deactivated admin ⇒ 401. The Bearer/agent identity stays all-channels (no DB read).
- New `channel.ts` pure helpers: `ALL_CHANNELS = "__all__"` sentinel; `resolveAdminScope(host, scope, header) → { writeChannel, filter }` (scoped ⇒ forced; super + `__all__` ⇒ filter null; super + known/host ⇒ that channel); `assertChannelAccess(adminScope, resourceChannel)`. Two context vars now: `channelId` = concrete write/target (stamps creates + singletons), `channelFilter` = list filter (slug | null).
- Catalog helpers: `productInChannelAdmin` (EXISTS on listings WITHOUT `visible=1` — admins see delisted-but-present), `listingsToDeleteScoped` (scoped admin only deletes its own channel's stale listing).

**Per-route enforcement.**
- **products**: list filtered by `productInChannelAdmin` when filter≠null; GET/PATCH/DELETE `/:id` 403 (`productHasListingInScope`) when a scoped admin targets a product not in their channel; `detail.listings` filtered to scope (super-admin keeps all for the Channels panel); **PUT `/:id/listings`** — membership gate (must already be in scope) + every desired entry's channel must equal scope + `listingsToDeleteScoped` so other channels' listings are never touched. *(The membership gate closed a real **HIGH** the review caught: without it a scoped admin could attach an arbitrary foreign product into their channel and escalate to full read/write on it.)*
- **variants** *(landed 2026-06-17, follow-up on top of `ae07a07`, uncommitted)*: variants carry no `channel_id` — membership is the parent product's. List filtered by new `variantInChannelAdmin(channelFilter)` (EXISTS on `listings` keyed by `variants.product_id`, no `visible=1`); GET/POST/PATCH/DELETE `/:id` 403 via `productHasListingInScope(parentProductId)`; **PATCH also re-checks the *destination* product on reparent** so a scoped admin can't move a variant onto a foreign product; `resync-snapshots` (cross-channel maintenance) restricted to **super-admins only**. `productHasListingInScope` + `FORBIDDEN_BODY` were moved to the seam modules (`catalog/scope.ts` / `channel.ts`) so products + variants share one copy. +2 pure SQL-shape tests in `tests/workers/cms-catalog-scope.test.ts` (assert the EXISTS correlates on `variants.product_id`, not `products.id`).
- **pages / blog-posts / collections**: list filtered by `byChannel`; GET/PATCH/DELETE `/:id` 403 via `assertChannelAccess`; POST stamps `channelId`.
- **settings / page-content**: now **per-channel** — `getOrCreate(db, channelId)` keyed by `channel_id` (finds the existing imarflex `singleton` row by channel; seeds new channels as `singleton:<channel>`). No migration needed.

**Admin UI.** Switcher gains a **"全部渠道 · All Channels"** option (`__all__`); super-admins default to All; scoped admins still locked. List queries now key on the active channel so switching refetches. New test asserts the `__all__` header is sent.

**Verified.** Root vitest 379 pass (59 files, +14 pure-helper tests in `tests/workers/admin-channel-scope.test.ts`); admin-ui vitest 191 pass + `tsc` clean; `wrangler deploy --dry-run` bundles; storefront `next build` passes its TypeScript phase (full SSG needs CMS env vars — environmental). *This branch also FIXED a pre-existing `settings.ts` `channelId` type error that broke the Phase-1 base build's TS phase.* 4-lens adversarial review (channel-leak / correctness / render-parity / types) ran on the diff: 1 HIGH + 1 MED + 8 LOW — HIGH fixed, rest fixed or documented.

**Phase 2 scaffold — separate-deploy refinement (⚠️ REFINES D7/D9).** Storefront now deploys as **two Vercel projects from one repo**, each pinned by `NEXT_PUBLIC_CHANNEL`, with **flat routes** (no `/[channel]/` segment) and branding from a new `src/config/channels.ts` registry (`getChannelConfig()`; imarflex = today's config byte-identical, manyprofit = placeholder). `src/config/site.ts` is now a thin re-export over the active channel (imarflex render unchanged). Per-channel route divergence via in-route guards (`notFound()` when `ACTIVE_CHANNEL !== "imarflex"`, on warranty + parts-finder) instead of a `[channel]` URL segment. Root layout title/lang driven by the channel config. `HOST_TO_CHANNEL` gains the MP hosts (inert until DNS; see the coupling warning in channel.ts). **No `src/middleware.ts`** — an env-pinned channel makes a Host→`[channel]` rewrite unnecessary. Backend (Worker/D1/R2/Airwallex) stays shared, as resolved.
→ Supersedes D7/D9's "one Vercel project + `app/[channel]/*` + Next middleware rewrite": **same end-state** (two branded storefronts, shared component lib, full per-channel layout freedom) but **separately deployable**, simpler routing, and zero risk to the live Imarflex render.

**Deferred / known gaps.**
- ~~**`variants.ts` is still channel-blind**~~ — **CLOSED 2026-06-17** (see the *variants* bullet under Per-route enforcement). The last admin-side channel leak is gone, so a scoped admin can now be provisioned safely.
- **`publish/store.ts`** still reads `page_content` by `id='singleton'` (imarflex) — fine until MP content goes live; make it channel-qualified then.
- `admins.ts` + orders/dashboard channel-scoping; a per-channel picker on the settings screen (super-admin "All" edits imarflex's settings by default); root-layout `themeKey` not yet wired to a theme.

## Per-channel checkout secret + signed-channel resolution — landed (2026-06-17)

**Implementation:** branch `feat/per-channel-checkout-secret` in `imarflex-app`, commit `f20ed49`, **shipped to `master`** (FF from `8ead0d5`). Two outcomes in one change: (1) resolves the long-standing **channel.ts X-Channel-Id coupling** (signed content reads are no longer Host-only), and (2) gives each channel its **own checkout shared secret** — so Many Profit needs a *fresh* secret of its own, **not** a copy of Imarflex's.

**Why this was forced.** Tried to copy `CHECKOUT_WORKER_SHARED_SECRET` from `imarflex-app` → `manyprofit` Vercel and found it **unrecoverable everywhere**: it's a Vercel *Sensitive* var (pull returns empty), a write-only CF Worker secret, and a write-only GH Actions secret (set 2026-05-05). Not in the codebase, git history, `.dev.vars` (dev placeholder only), or shell history. The one shared Worker (`imarflex-checkout`) verifies every storefront→Worker call against a **single global** secret (HMAC over `timestamp.body` — channel NOT signed), so MP literally could not authenticate without Imarflex's value. Per-channel secrets give blast-radius isolation + independent rotation **and dissolve the blocker** (MP gets a brand-new secret; Imarflex untouched).

**The seam (worker, `cms/channel.ts`).**
- `secretForChannel(env, channelId)` → `CHECKOUT_WORKER_SHARED_SECRET_<CHANNEL>` (slug upper-cased) with fallback to the base `CHECKOUT_WORKER_SHARED_SECRET`. **Imarflex has no override ⇒ keeps the existing secret, zero rotation, zero downtime.** Adding a channel = one new env var. (Slugs must stay `[A-Z0-9_]` upper-cased — env var names carry no hyphens.)
- `resolveSignedChannel(req)` → validated `X-Channel-Id` header → Host map → default. Trusting the header is safe: the secret is keyed by that same channel, so forging it still requires that channel's secret.
- `verifySignedStorefront` middleware — one shared channel-aware guard replacing **4 byte-identical** per-router copies (content / content-catalog / content-commerce / content-pages); also pins `channelId` to the signed channel, so **MP signed content reads now scope to `manyprofit`** even though `CHECKOUT_WORKER_URL` points at the shared workers.dev host (the coupling fix the channel.ts comment prescribed).
- Cart/inventory (`index.ts`) + checkout (`customers/routes/checkout.ts`) `verifyWorkerRequest` pick the per-channel secret too.

**App side.** The 3 signed clients (`src/lib/cms/client.ts`, `cart/worker-client.ts`, `checkout-service/client.ts`) send `X-Channel-Id: ACTIVE_CHANNEL` (`src/config/channels.ts`; unset deploy ⇒ `imarflex`). Worker Env types + `.dev.vars` + `.env.example` document `CHECKOUT_WORKER_SHARED_SECRET_MANYPROFIT`.

**Backward-compatible / rollout order-independent for Imarflex:** Imarflex app (header `imarflex`, or absent → Host→default) resolves to the base secret + imarflex scope = identical behavior, whichever of Worker/Vercel deploys first.

**Verified.** Root vitest **390 pass** (+9 new `secretForChannel`/`resolveSignedChannel` cases in `tests/workers/channel-scope.test.ts`); `tsc --noEmit` adds **0** errors (the 10 pre-existing `cms-*.test.ts` fixture errors confirmed identical on the stashed base commit); eslint 0 errors. **Post-deploy prod smoke:** Worker `/cms/health` → 200; live `imarflex.lemanspace.cc/` + `/blog` (both make server-side signed CMS reads) → 200, proving the per-channel path works end-to-end on the base secret. Worker CI (`deploy-api-worker.yml`) + Vercel `imarflex-app` both deployed green.

**Outbound callback — DONE (2026-06-18, commit `1e2175f`, committed not yet deployed).** The Worker→app order-confirmation callback now threads the channel through checkout session → order (`orders.channel_id` stamped) → payment webhook, signing with + posting to the order's own channel via `secretForChannel` + new `payloadSyncUrlForChannel` (`PAYLOAD_SYNC_URL_<CHANNEL>` → base fallback). Old in-flight sessions default to imarflex; `channel.ts` gained a shared `perChannelEnv` helper. **The per-channel checkout seam is now complete in BOTH directions** (inbound `f20ed49` live; outbound `1e2175f` committed).

**MP activation checklist (config only — no more code).** (1) generate a fresh secret; (2) set `CHECKOUT_WORKER_SHARED_SECRET_MANYPROFIT` on the Worker (GH Actions secret); (3) set the `manyprofit` Vercel project's `CHECKOUT_WORKER_SHARED_SECRET` = that same value (+ `NEXT_PUBLIC_CHANNEL=manyprofit`); (4) for MP order-confirmation emails, add a `PAYLOAD_SYNC_URL_MANYPROFIT` GitHub **repo variable** (the workflow uploads it as a Worker secret via its vars list) → the MP app's `/api/internal/checkout-sync`. → The old "copy Imarflex's secret" step in the 2026-06-17 MP-storefront log entry is obsolete; the callback CODE is no longer a launch task.

## MP storefront on fake data (LOCAL) — landed (2026-06-18)

**Goal:** prove the `manyprofit` storefront actually renders end-to-end before touching prod. Done **locally** (uncommitted, in `imarflex-app`). Built via an ultracode plan→workflow run (3 parallel author agents + verify), then a cache-bug fix + live local verification.

**What was built.**
- **`workers/api/scripts/seed-manyprofit-catalog.ts`** (new) — idempotent fake catalog scoped to `manyprofit`: 10 products across the 7 MP brands, 10 variants (HKD cents, several with strike-through), 10 visible listings (4 featured), **4 collections** (kitchen-appliances / home-appliances / mp-seasonal / deals), 14 product_collections links, **7 pages** (about/contact/shipping/returns/faq/terms/privacy), and a `page_content` row with authored homepage blocks (hero + collectionBento + bestsellers + trustBar). Run: `pnpm tsx workers/api/scripts/seed-manyprofit-catalog.ts [--local|--remote]`.
- **`src/config/channels.ts`** — `manyprofit` config fleshed out from "即將推出 · Coming soon" placeholder → live store (real announcement, 6 nav links, full footer, trust bar w/ only valid icon keys, search terms, metadata). imarflex object byte-unchanged.
- **`.env.local`** (gitignored) — pins storefront to manyprofit against the local worker.

**KEY FINDING #1 — multi-channel cache-isolation bug (FIXED).** All storefront CMS reads wrap signed worker fetches in `unstable_cache`, but the **key arrays omitted the channel**, and `signedGetJson` is `cache:"no-store"` so `unstable_cache` is the *only* cache layer. On the shared 2-channel backend this **leaks content across channels** — the MP homepage rendered Imarflex's cached `page-content` (empty blocks → a "Test Scroll proof" dev mock). Fixed by appending `ACTIVE_CHANNEL` to **all 10** keys in `src/lib/cms/{homepage,catalog,blog,pages}.ts` (`cms:page-content`, `cms:catalog:{products-index,collections,product}`, `cms:blog:{post,handles,list,lastmod}`, `cms:pages:{page,handles}`). Real product correctness fix, not just local.

**KEY FINDING #2 — images.** The worker media serializer builds every product image URL from `MEDIA_PUBLIC_URL` (`imarflex-media.lemanspace.cc`) + `/media/<filename>`, **ignoring** the stored `media.url`. So seeding fake `media` rows yields broken `<Image>` srcs regardless of host. The seed uses `images:'[]'`; cards degrade to a clean "IM" placeholder, PDP gallery renders none. Real MP images require uploading bytes to the R2 bucket — not a seed change.

**Idempotency.** Seed uses **deterministic ids** (`mpseed:<natural-key>`), NOT random ULIDs — random ULIDs broke re-runs (parent `ON CONFLICT` keeps the original id while children referenced a fresh id → FK failure). Re-run-safe now (verified twice).

**Verified locally** (worker `wrangler dev` :8787 + storefront `pnpm dev` as manyprofit): homepage renders MP hero/bento/bestsellers + featured products; `/collections` + `/collections/{kitchen-appliances,deals}` + PDPs (with price/variant) + `/pages/{about,shipping}` all 200 with MP data; `/warranty` + `/parts-finder` render the not-found UI (form not accessible — guard works; HTTP status is 200 in dev, a pre-existing Next streaming quirk). `tsc` 0 new errors, eslint clean.

**⚠️ STAGE-2 (prod) BLOCKER the local run masked.** `pages.handle` and `collections.handle` carry **GLOBAL UNIQUE** indexes (not `(handle, channel)`). Locally imarflex's pages/collections tables were empty, so the MP seed's bare handles (`about`, `contact`, `kitchen-appliances`, …) inserted fine. **On prod, imarflex already owns those handles** → the seed's channel-guarded `ON CONFLICT … WHERE channel_id='manyprofit'` becomes a NO-OP → MP gets **no** about/contact pages and **no** collections → those nav links 404 / collections empty. Fix before remote seed: either (a) channel-prefix MP handles (`mp-about`, `mp-kitchen-appliances`, …) **and** update the `manyprofit` links in `channels.ts`, or (b) migrate the unique indexes to `(handle, channel_id)` (also lets both channels share clean handles — preferred long-term).

**Stage 2 remaining (prod, gated):** deploy `1e2175f`; set MP secret (Worker GH secret + MP Vercel `CHECKOUT_WORKER_SHARED_SECRET`); resolve the handle-uniqueness blocker above; seed remote D1 (`--remote`); set `NEXT_PUBLIC_CHANNEL=manyprofit` + Framework=Next.js on the `manyprofit` Vercel project and deploy (replaces coming-soon); verify `manyprofit.vercel.app`.

## Parked / future
- Roles beyond `channelScope` (MP-only staff RBAC) — schema reserved, build later.
- More brands / channels later — model already supports N (`channels` + `brands` are data, not code).
- Optional: migrate physical D1/R2 names to neutral (cosmetic; deferred).

## Log
- 2026-06-15 session start; established Many Profit = parent multi-brand distributor (not 2nd storefront); corrected stack (custom CF/D1/Hono, not Payload); resolved note placement → new `ManyProfit/` folder.
- 2026-06-15 resolved MP scope (D1): multi-brand commerce, MP sells 7 brands, Imarflex deep-links to its storefront, shared CMS + Airwallex. Surfaced Channel vs Brand two-axis model (D2). Next: confirm model + DB layout.
- 2026-06-15 resolved D3: shared backend, channel-scoped (Option A). Next: schema spine + customer-account fork.
- 2026-06-15 resolved D4 (shared customer identity) + D5 (schema spine accepted; recorded under Proposed design). Next: CMS switcher UX.
- 2026-06-15 resolved D6 (shared catalog + channel switcher) + D7 (one Worker / two domains / host-based; storefront on Vercel; neutral rename) + D8 (per-channel API subdomains). User pushed back: storefronts need different *layout + info*, not just color. Reframed "same base" = shared component library + commerce engine; per-channel = layout/nav/route tree via middleware **rewrite** to `/[channel]` segment + per-channel CMS blocks. Next: pick divergence level (D9).
- 2026-06-15 resolved D9 (full per-channel layouts, shared component lib) + D10 (Imarflex deep-link → PDP, canonical). All architecture branches resolved → **status: resolved**. Wrote Summary + day-1 client asks + 5-phase rollout + cross-cutting checklist. Next physical step: Phase 0 schema migration in `imarflex-app`.
- 2026-06-16 Phase 0 landed (commit `230d23b`). See "Phase 0 — landed".
- 2026-06-16 Phase 1 landed — focused slice (switcher + Channels panel + `channelScope` foundation), commit `8fe5e0e`. Per-channel filtering/403 enforcement deferred to Phase 1.5. See "Phase 1 — landed". Next: Phase 1.5 enforcement, or Phase 2 (Many Profit storefront).
- 2026-06-16 Phase 1.5 landed (uncommitted, branch `feat/phase1.5-enforcement-phase2-scaffold`) — hybrid All+per-channel admin enforcement (DB-authoritative scope re-read; per-route 403/filter; per-channel settings/page-content) + Phase 2 separate-deploy storefront scaffold (refines D7/D9: two Vercel deploys, env-pinned, flat routes, no `[channel]` segment). ultracode workflow; adversarial review caught + fixed a HIGH (PUT-listings attach-escalation). 379 + 191 tests green. Next: commit; close the `variants.ts` gap; Phase 2 content when client assets land. See "Phase 1.5 — landed".
- 2026-06-17 `variants.ts` channel-leak **closed** (same branch, follow-up on top of `ae07a07`, uncommitted) — list filter (`variantInChannelAdmin`) + parent-product 403 on GET/POST/PATCH/DELETE + reparent destination check + super-admin-only `resync-snapshots`; shared predicates (`productHasListingInScope`, `FORBIDDEN_BODY`) moved to the seam modules. Verified: root vitest **381** pass (+2), admin-ui 191 + `tsc` clean, `wrangler deploy --dry-run` bundles, eslint clean. This was the last admin-side leak. Next: commit; ship Phase 1.5 (no remote D1 migration needed) on confirmation.
- 2026-06-17 **SHIPPED to production** — pushed `feat/phase1.5-enforcement-phase2-scaffold` → `master` (FF; prod was 16 commits behind: the 4 multichannel + ~12 accumulated admin-ui/calendar commits). CI (`deploy-api-worker.yml`) applied the 5 pending remote CMS migrations `0012–0016` (channels/brands/listings tables + backfill all Imarflex products → Imarflex listings + `admins.channel_scope` + **Many Profit channel seed**) and deployed the Worker `imarflex-checkout` @ `https://imarflex-checkout.pddhkt.workers.dev` (admin SPA at `/admin`). **Verified in prod D1:** channels = imarflex(active) + manyprofit(active); 8 products, all 8 still Imarflex-listed (backfill clean, live store intact), manyprofit 0 products (awaits content). **CMS is now ready for both brands.** Remaining for the MP storefront URL: a second Vercel project pinned `NEXT_PUBLIC_CHANNEL=manyprofit`. Note the channel.ts coupling caveat — until `api.manyprofit.com` DNS or X-Channel-Id on signed reads, an MP deploy whose `CHECKOUT_WORKER_URL` = the imarflex-checkout host resolves content reads to the imarflex channel, so the first MP deploy is a branded "Coming soon" page, not a scoped MP catalog.
- 2026-06-17 **MP storefront URL delivered (coming-soon placeholder).** Created Vercel project `manyprofit` (scope `pddhkts-projects`, account pddhkt). Set 7 production env vars for the future full storefront: `NEXT_PUBLIC_CHANNEL=manyprofit`, `CHECKOUT_WORKER_URL=https://imarflex-checkout.pddhkt.workers.dev`, `SITE_URL`/`NEXT_PUBLIC_SITE_URL=https://manyprofit.com`, `SHIPPING_FLAT_RATE_CENTS=5000`, `SHIPPING_FREE_THRESHOLD_CENTS=50000`, `NEXT_PUBLIC_AIRWALLEX_ENV=demo`. **The full Next.js storefront could NOT deploy** — it needs the 8th env `CHECKOUT_WORKER_SHARED_SECRET` (HMAC-signs the CMS reads in `src/lib/cms/client.ts`; the list endpoints don't degrade on non-404, and `getHomepageContent`/`getHeroProduct` throw on an empty catalog — MP has 0 products), and that secret is a **USER-ONLY** step: the agent's `vercel env pull` and a targeted API decrypt-and-copy were both blocked by the permission classifier as unauthorized prod-secret reads. **So delivered the appropriate Phase-2 artifact instead:** a static branded "即將推出 · Coming Soon" page (matches the `manyprofit` channels.ts config) deployed to the `manyprofit` project → **LIVE at https://manyprofit.vercel.app** (HTTP 200, public). **To swap in the full storefront later:** user adds `CHECKOUT_WORKER_SHARED_SECRET` (copy from `imarflex-app` env) on the `manyprofit` project, ensures its Framework Preset = Next.js, deploys the repo's Next.js app → replaces the coming-soon. Still needs MP content (0 products) + `manyprofit.com` DNS + the channel.ts X-Channel-Id/DNS fix (else reads resolve to the imarflex channel). *(Partly superseded same day — see next entry: the X-Channel-Id fix is DONE; MP uses its own `CHECKOUT_WORKER_SHARED_SECRET_MANYPROFIT`, not a copy of Imarflex's.)*
- 2026-06-17 **Per-channel checkout secret + X-Channel-Id signed-channel resolution SHIPPED** (branch `feat/per-channel-checkout-secret`, commit `f20ed49` → `master`, FF from `8ead0d5`; Worker CI + Vercel `imarflex-app` both green; prod smoke `/cms/health` + storefront `/` + `/blog` all 200). Each storefront now authenticates with its own `CHECKOUT_WORKER_SHARED_SECRET_<CHANNEL>` (fallback to base ⇒ **Imarflex untouched, no rotation**), signs with `X-Channel-Id`, and the Worker scopes signed content reads by that channel — **resolves the channel.ts coupling** (MP reads no longer resolve to imarflex) and **dissolves the "MP needs Imarflex's secret" blocker** (the prod secret is write-only/unrecoverable everywhere; MP gets its own fresh one). 390 vitest green; 0 new tsc errors. Deferred: outbound order-confirmation callback per-channel routing (MP launch). See "Per-channel checkout secret + signed-channel resolution — landed".
- 2026-06-18 **Outbound order-confirmation callback made channel-aware** (commit `1e2175f` on `feat/per-channel-checkout-secret`, **committed, NOT yet deployed** — `origin/master` still `f20ed49`). Threads channel through checkout-start → `CheckoutSession.channelId` → `orders.channel_id` → payment webhook; the callback signs with + posts to the order's own channel (`secretForChannel` + new `payloadSyncUrlForChannel`; `PAYLOAD_SYNC_URL_<CHANNEL>` → base). imarflex unchanged (base secret + base URL); old in-flight sessions default to imarflex. 393 vitest green, 0 new tsc errors, eslint clean. **Per-channel checkout seam now complete both directions.** Next goal: stand up the MP storefront with **fake seed data** (see new goal below).
- 2026-06-18 **MP storefront renders on fake data — LOCALLY (uncommitted).** ultracode plan→workflow: 3 parallel author agents (seed script / `channels.ts` config / `.env.local`) + verify, then fixed the real blocker. New `workers/api/scripts/seed-manyprofit-catalog.ts` (10 products / 4 collections / 7 pages / authored homepage blocks; deterministic `mpseed:` ids; idempotent). **Found + fixed a multi-channel cache-isolation bug**: every `unstable_cache` CMS key omitted the channel → MP homepage served Imarflex's cached content; appended `ACTIVE_CHANNEL` to all 10 keys in `src/lib/cms/{homepage,catalog,blog,pages}.ts`. Verified live (worker :8787 + `pnpm dev` as manyprofit): homepage hero/bento/bestsellers + products, /collections + collection pages + deals + PDPs + static pages all render MP data; imarflex-only routes guarded. **Surfaced a Stage-2 prod blocker** (global-unique `pages.handle`/`collections.handle` → MP can't reuse imarflex's bare handles on prod). See "MP storefront on fake data (LOCAL) — landed". Changes uncommitted; Stage 2 (prod) not started. Next: commit; then Stage 2 on go-ahead.
