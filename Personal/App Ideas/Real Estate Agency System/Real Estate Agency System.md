---
type: grill-session
project: Real Estate Agency System (friend's app)
status: resolved
created: 2026-06-16
---

# Real Estate Agency System — Grill Session

## Summary
An **internal web app for a small HK residential estate agency** (the friend is the **owner/operator**, not a server host), built **API-first** on Jack's Cloudflare stack (Next.js + Workers/Hono + D1/Drizzle + R2), **bilingual 繁中/EN**. Agents work a **shared pool** (roles: admin + agent) and manage both **業主** and **客戶** around a central **盤源 listing**. They match customers to listings via structured **搵盤 requirements** (flagship "new match → notify" alert), run **viewings**, and drive a full **EAA form trail**: the agent pre-fills a form and sends a **one-time magic link** for the client to add personal info and **draw-sign** (放盤紙/睇樓紙 e-signed with audit PDF; 物業資料 auto-filled; 臨時租約 generated + wet-signed). Agent alerts go to **in-app + email + Telegram**; mobile push comes later via **PWA + Web Push**. Agents **comment on any record** with **roll-up** visibility (a viewing note surfaces on both the flat and the client) and **@mention → notify**. **POC depth = leasing**; the sale side is data-model-ready but built later.

### Next actions
- [ ] Draft the **Drizzle/D1 schema**: User, Listing, Owner, Customer (+Requirement), Viewing, Deal, Comment (polymorphic), Notification, FormInstance + SignatureAudit.
- [ ] Build the **bilingual EAA form templates** as HTML→PDF (Form 5 放盤紙, Form 6 睇樓紙, Form 2 物業資料, 臨時租約).
- [ ] Spike the **magic-link e-sign flow** (one-time token + 72h expiry, draw-signature, locked PDF, timestamp/IP audit) → R2.
- [ ] Wire the **Telegram bot** + in-app notification center; implement the 4 POC triggers (new-match, form-signed, viewing reminder, reassignment) + @mention.
- [ ] Stand up **custom user/pass auth** (admin-provisioned, argon2id/bcrypt, secure session cookies, rate-limit).
- [ ] Confirm with the friend: **media scope** (videos / 則王?), exact **transaction mix**, and that **@mention-notify** stays in the POC.

**Hand-off:** [[UI Design Brief]] — self-contained brief to give a UI-building agent ("Claude design") to build the clickable demo (sitemap, per-screen spec, flows, components, mock-data entities). Share that file, not this decision log.

## POC MVP feature list (synthesized)
**In the POC (leasing-first):**
1. **Auth & users** — custom username/password, admin-provisioned, roles admin/agent (D11).
2. **Listings 盤源** — CRUD, media on R2, status lifecycle, key/viewing consent, owner link (D13).
3. **Owners 業主 & Customers 客 (+搵盤 requirement)** — CRUD, owning-agent attribution (D6, D13).
4. **Matching** — filter/rank listings vs requirement; new listing → "matches N waiting customers" (D3).
5. **Viewings 睇樓** — schedule, outcome, reminders (D8).
6. **Forms & e-sign** — 放盤紙/睇樓紙 prefilled magic-link draw-sign + audit PDF; 物業資料 auto-fill; 臨時租約 generate + store; all signed PDFs on R2 (D4, D5).
7. **Notifications** — in-app center + email + Telegram; 4 triggers; channel-pluggable for Web Push later (D7, D8, D12).
8. **Comments** — polymorphic, **roll-up** visibility, @mention → notify (D14).
9. **i18n** — 繁中 default + EN toggle, bilingual form output (D9).
10. **Deals 成交 (minimal)** — close an opportunity → generate 臨時租約.

**Phase 2 / later:** sale-side workflow (Forms 3/4/1 + 臨買賣) · full auto-match engine + saved searches · phone OTP on e-sign + 2FA/SSO · PWA + Web Push, then native app (RN/Flutter/KMP) · activity timeline (comments + system events merged) · extra triggers (unsigned/expiring link, price/status change).

## Background / Brief
Jack is helping a friend build an **internal system for a small HK real estate agency**.
- Web app for now; must be **workable as a POC**, self-hosted by the friend's small team.
- Agents manage **both sides**: 業主 (owner/vendor/landlord) + 客戶 (buyer/tenant).
- Needs **forms** — incl. owner's permission to enter property for viewing (HK-specific).
- **Bilingual**: Traditional Chinese + English.
- **Notifications** between agents + anything an agent needs to be alerted about.

## HK estate-agency forms (research 2026-06-16)
EAA prescribed forms for **residential** properties (Estate Agents Ordinance):
| Form | 俗稱 | Signed by | Purpose |
|---|---|---|---|
| Form 3 | 放盤紙 (sale) | Owner/Vendor | Listing agreement; **owner consents to viewing + handing keys to agent** |
| Form 5 | 租盤紙 (lease) | Landlord | Listing agreement for leasing; same viewing/key consent |
| Form 4 | 睇樓紙 (sale) | Buyer | Buyer's agency agreement before viewing; commission, ~3-mo validity |
| Form 6 | 睇樓紙 (lease) | Tenant | Tenant's agency agreement before viewing |
| Form 1 | 物業資料表格 (sale) | Agent → Buyer | Property Information Form (disclosure) |
| Form 2 | 物業資料表格 (lease) | Agent → Tenant | Property Information Form (disclosure) |
- Deal close (non-prescribed but standard): 臨時買賣合約 (Provisional S&P) / 臨時租約 (Provisional Tenancy).
- "Permission to enter the house" = the viewing/key-custody clause inside **Form 3 / Form 5**, not a separate form.
- Sources: eaa.org.hk Prescribed forms; spacious.hk 睇樓紙/放盤紙 guides; centanet.com 6份表格.

## Decisions
| # | Question | Decision | Rationale |
|---|---|---|---|
| 1 | Transaction scope | Residential, **both sale & lease**. Build shared data spine (listing/owner/customer/viewing); POC goes **deep on leasing** first, sale is model-ready but light. | Most common small-agency reality; ~80% shared model; one deep loop beats two half-built ones. |
| 2 | Client access model | **Internal logins for agents + admin only.** Clients never get accounts. Owners/customers receive a **magic link to a pre-filled form** → fill personal info → **e-sign**. No full client portal. | Matches "internal system"; friend's concrete requirement is link-sent, pre-filled, owner-signable forms. Form-link-signing is a first-class subsystem. |
| 3 | Customer↔listing matching | **Structured requirement + simple match.** Each customer has a 搵盤 requirement (budget/district/面積/rooms/sale-lease); app filters & ranks listings, and flags when a new listing matches waiting customers. Transparent filters, not AI. | The single feature that makes an agent open the app daily; barely harder than manual linking. Full auto-match engine deferred to Phase 2. |
| 4 | POC form set (leasing) | **Full paper trail:** 放盤紙 Form 5 (landlord, e-sign, incl. viewing/key consent) → 睇樓紙 Form 6 (tenant, e-sign) → 物業資料 Form 2 (auto-filled from listing, no signature) → 臨時租約 (generated + stored, **wet-signed offline**, not e-signed per ETO risk). Sale-side equivalents (3/4/1 + 臨買賣) model-ready, built later. | Friend wants a complete trail. E-sign limited to agency agreements (legally safe); 臨約 kept wet per HK practice. |
| 5 | E-sign flow & rigor | **Prefill split:** agent fills property + commercial terms; client fills only identity fields (name, HKID, contact, address) + **draws signature**. **Identity/audit:** one-time link token (propose 72h expiry) → drawn signature → lock PDF capturing timestamp + IP + token. **No OTP** for POC (Phase-2 hardening). Signed PDF stored + attached to the listing/customer/deal. | Defensible + self-hostable with no SMS cost; agent stays fast, client does minimal. |
| 6 | Roles & visibility | **Shared pool + attribution.** Roles: **admin** (friend/boss) + **agent** (team-lead later). All agents see all listings/customers; each record tagged with owning agent; matching spans whole pool; admin sees all + can reassign. | Small trusted team; maximizes matching value; keeps a commission/accountability trail. |
| 7 | Notification channels | **Agent alerts:** in-app notification center + email + **Telegram bot** (agent links their Telegram once). **Client form-link delivery:** agent shares generated link via WhatsApp click-to-send / email / copy-link (clients not on team Telegram). | Telegram Bot API = free, push-capable, no approval/cost → ideal self-hosted POC; reaches agents when out. WhatsApp stays the HK client-facing share channel. |
| 8 | Notification triggers (POC) | **All four are must-have:** (1) new listing matches a waiting customer → owning agent; (2) client e-signed a form → sending agent; (3) viewing reminder → agent on the viewing; (4) admin assignment/reassignment → receiving agent. **Phase 2:** form-link opened-but-unsigned / about-to-expire, listing price/status change, @mention/internal note. | Covers the flagship match alert + closes the e-sign loop + operational reminders + the reassignment path implied by D6. |
| 9 | Bilingual / i18n | **Full bilingual UI**, 繁中 default + per-user EN toggle; built with an i18n library from day 1 (no hardcoded strings). Forms output in official **bilingual EAA layout**. User-entered data stored as typed (no auto-translation). | HK agents work in 繁中; proper i18n from the start avoids a painful retrofit; EAA forms are inherently bilingual. |
| 10 | Tech stack & hosting | **Reuse Jack's Cloudflare stack** (separate codebase): Next.js + Workers/Hono + D1/Drizzle + R2, **API-first** (Hono REST → any future client). Friend = owner/operator of the account (managed, ops-light). PDPO via **D1 + R2 APAC location hints**. Bilingual PDF via Cloudflare **Browser Rendering** or `pdf-lib`. | Jack productive day 1; cheap; API-first keeps RN/Flutter/KMP/Rust future open; managed = low ops for a small team. |
| 11 | Auth | **Custom username + password** to start. Accounts **admin-provisioned** (no public signup). Guardrails: hash with **argon2id/bcrypt**, secure **httpOnly/secure/sameSite session cookies**, **rate-limit** login. 2FA / SSO = later. | Simplest for a small internal team; admin controls who gets in; guardrails because it stores PDPO personal data. |
| 12 | Notification delivery (refines D7/D8) | **Web-first in-app** notification center now (+ Telegram + email per D7). System is **channel-pluggable** so **Web Push / mobile push** can be added later, **gated on user opt-in** ("if turned on"). Cheapest first mobile step = **PWA + Web Push** (no native app needed). | Matches web-first build; PWA+Web Push gets "mobile notifications" without an app store or RN; native app deferred until real demand. |
| 13 | Listing data model & media | **Listing (盤源):** address (屋苑→座→樓層 zone 高/中/低→flat), 地區, **實用面積**, 房/廳, 朝向, 樓齡, 管理費, 校網, sale and/or lease, price/rent, 連租約 vs 交吉, status (available/已落訂/成交/收回), owner, owning agent, viewing/key consent. **Confirmed extras:** 凶宅 flag, 銀行估價, 入伙紙/OP, 會所, 管理公司. Other entities: Owner, Customer+搵盤 requirement, Viewing, Deal. **Media on R2:** photos + 平面圖 floor plan + signed-PDF trail (videos / 則王 = Phase 2, assumed — confirm). | HK leasing-first norms + matching fields; 實用面積 is the legal standard since 2013; R2 already in stack. |
| 14 | Comments | **Polymorphic comments** attachable to any core record (Listing / Customer / Viewing / Deal), stored once. **Roll-up visibility:** a comment surfaces in the timelines of related records (e.g. a viewing note appears on both the flat AND the client) — single source of truth, no duplication. **@mention → Telegram/in-app notify.** Upgrade path: merge with system events into a full activity timeline later. | Shared pool = comments are team collaboration; roll-up removes hunting; @mention makes them actionable; one reusable system. |

## Open questions
- [x] Tech branch RESOLVED → D10 (Cloudflare/API-first), D11 (custom user/pass auth), D12 (web-first notif, PWA+Web Push later). Multiplatform stays open via the REST API; KMP/Rust = future client options, not POC; Rust = overkill for this app; PDF via Browser Rendering/pdf-lib (HTML→PDF reuses web 繁中 styling).
- [x] Listing data model RESOLVED → D13 (fields + 凶宅/銀行估價/入伙紙/會所/管理公司 extras; media = photos/floor plan/signed PDFs, videos Phase 2).
- [x] Comments branch RESOLVED → D14 (polymorphic, roll-up visibility, @mention→notify).

**All branches resolved — session complete.** See Summary + POC MVP feature list above.

## Log
- 2026-06-16 session start; HK forms research captured
- 2026-06-16 D1 (scope) + D2 (client access = internal + magic-link e-sign) resolved; form-signing promoted to first-class branch
- 2026-06-16 D3 (matching = structured requirement) + D4 (full leasing form set) + D5 (e-sign flow: drawn sig + audit, no OTP) resolved; forms branch closed
- 2026-06-16 D6 (roles = shared pool + attribution) + D7 (channels = in-app/email/Telegram) + D8 (4 must-have triggers) resolved; notifications branch closed
- 2026-06-16 D9 (i18n) resolved. Tech branch: corrected misread — "hosted by him" = owner/operator, managed OK (not bare-metal). D10 (reuse Cloudflare stack, API-first) + D11 (custom user/pass auth) + D12 (web-first notif, PWA+Web Push later) resolved. Last branch: listing data model + media.
- 2026-06-16 D13 (listing data model + media) + D14 (comments = roll-up + @mention-notify) resolved. **Status → resolved.** Summary + POC MVP feature list written. 14 decisions locked.
