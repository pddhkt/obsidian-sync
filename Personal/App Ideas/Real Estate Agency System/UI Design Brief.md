---
type: design-brief
project: Real Estate Agency System (friend's app)
status: ready-to-design
created: 2026-06-16
audience: UI-building agent (frontend-design / ui-ux-pro-max / fresh Claude session)
source: "[[Real Estate Agency System]] (grill-session — full decisions + rationale)"
---

# Real Estate Agency System — UI Design Brief

> **Hand this file to the UI agent.** It is self-contained: everything needed to build a clickable
> **UI demo** (mock data, no backend). Rationale for any choice lives in [[Real Estate Agency System]].

## 1. What we're building
An **internal web app for a small Hong Kong residential estate agency**. Agents manage both sides of
a deal — **業主 owners** and **客戶 customers** — around a central **盤源 property listing**, match
customers to flats, run **viewings (睇樓)**, push **EAA forms** for e-signature, and get **notifications**.
**Leasing-first** (sale flows exist later — design leasing screens now).

**Demo goal:** a clickable, bilingual, responsive UI with realistic mock HK property data. No real auth,
no real backend, no real e-sign — fake the data and the transitions.

## 2. Users & roles
- **Agent (地產代理)** — day-to-day user. Sees the whole shared pool; each record shows its owning agent.
- **Admin (boss)** — everything an agent sees, plus user management and the ability to reassign records.
- Clients (owners/customers) **never log in** — they only ever see a single public form page (see §6.3).

## 3. Language (critical)
- **Bilingual 繁體中文 + English**, with a **per-user toggle**. **繁中 is the default.**
- Design every screen to hold **both** comfortably — Chinese is more compact vertically, English wider.
  Show realistic mixed content in mockups (e.g. `沙田 First City 第3座 中層 · 2房 · 實用 484呎`).
- HK property conventions to render correctly: **實用面積 (saleable area, in 呎)**, **管理費**, **校網**,
  rent like `$18,000/月`, district names in Chinese, `連租約 / 交吉` status.

## 4. Sitemap / navigation
Primary nav (left sidebar or top bar):
```
Dashboard 主頁
盤源 Listings
客戶 Customers
睇樓 Viewings
表格 Forms
通知 Notifications (bell + count)
─────────────
Settings ⚙  (language · link Telegram · Users[admin])
Account / logout
```

## 5. Screens (build these)
Each = **purpose · key UI · primary actions**.

**5.1 Login** — username + password, language toggle, agency logo placeholder. Clean, single card.

**5.2 Dashboard 主頁** — the morning landing page. Cards/sections:
- **Today's viewings** (睇樓 list with time, flat, customer).
- **New matches** — "X new listings match your waiting customers" → click through.
- **Pending forms** — sent-but-unsigned form links.
- **Recent notifications** preview.
- Quick actions: + 盤源, + 客戶, + 睇樓.

**5.3 Listings 盤源 — list** — table **and** card/grid toggle. Filters: 地區, sale/lease, 價/租 range,
房數, 實用面積 range, status. Each row/card: thumbnail, address, 實用呎, 房/廳, price/rent, **status chip**
(可租/可售 · 已落訂 · 成交 · 收回), owning-agent badge, "matches N customers" pill.

**5.4 Listing detail 盤源詳情** — the hub. Layout = main column + right rail:
- Header: address, status chip, price/rent, owning agent, edit button.
- **Media gallery**: photos + **平面圖 floor plan**.
- **Spec block**: 實用面積, 房/廳, 朝向, 樓齡, 管理費, 校網, 連租約/交吉, plus flags (凶宅, 入伙紙/OP, 會所,
  管理公司, 銀行估價).
- **業主 owner** card (contact, viewing/key consent state).
- **Matched customers** — ranked list of waiting customers this flat fits → "send 睇樓 / notify".
- **Viewings** of this flat (with outcomes).
- **Forms** attached (放盤紙 status, etc.).
- **Comments / activity timeline** (right rail) — see §7. Includes **rolled-up** notes from this flat's
  viewings & deal, not just direct notes.

**5.5 Add / Edit listing** — sectioned form mirroring the spec block; media upload (drag-drop, mock);
owner picker (existing or new); sale/lease toggle reveals relevant price/rent fields.

**5.6 Customers 客戶 — list** — table. Columns: name, looking-to (rent/buy), budget, target 地區/房數,
status (active/搵緊 · 已成交 · 暫停), owning agent, "N matching listings" pill.

**5.7 Customer detail 客戶詳情** — mirror of the listing hub:
- Profile + contact.
- **搵盤 requirement** block (budget, 地區, 實用面積, 房數, sale/lease, must-haves) — **editable**; this
  drives matching.
- **Matched listings** — ranked flats that fit, with quick "send 睇樓紙 / arrange viewing".
- **Viewings** this customer has done (with their feedback).
- **Comments / timeline** with roll-up (their viewing notes appear here too).

**5.8 Add / Edit customer** — contact fields + the 搵盤 requirement form.

**5.9 Matching view** — two entry points, same component:
- From a **customer** → ranked listings that fit their requirement (show match reasons: "✓ 地區 ✓ 預算 ✓ 房數").
- From a **listing** → waiting customers it fits.
- A "new listing just matched these customers" banner state for the notification click-through.

**5.10 Viewings 睇樓 — calendar + list** — toggle calendar/list. Viewing detail: flat + customer + time +
agent + **outcome/feedback** field (post-viewing note that rolls up to both flat & customer).

**5.11 Forms hub 表格** — list of form instances across records with status chips
(草稿 draft · 已發送待簽 sent-awaiting-sign · 已簽 signed · 已過期 expired). Filter by type:
放盤紙 (Form 5) · 睇樓紙 (Form 6) · 物業資料 (Form 2) · 臨時租約.

**5.12 Form-send flow (agent side)** — agent picks a form for a listing/customer → **pre-filled** with
property + commercial terms → review → **Generate link**. Show the generated one-time link + share buttons
(WhatsApp / email / copy) and an expiry indicator (72h).

**5.13 Public e-sign page (client-facing, NO login)** — *the standout screen.* A clean, mobile-first,
**bilingual** page the owner/customer opens from the link:
- Shows the pre-filled form (read-only property/terms).
- Client fills **only their identity fields** (姓名, 身份證號碼 HKID, 聯絡, 地址).
- **Signature pad** — draw with finger/mouse.
- Submit → confirmation screen ("已簽妥 / Signed — 多謝").
- States to mock: valid link, already-signed, expired link.

**5.14 Notification center 通知** — in-app feed + the header bell with unread count. Notification types to
show: new match, form signed, viewing reminder, reassignment, @mention. Each links to its record.

**5.15 Settings** — language toggle, **link Telegram** (show a "connect" state with a code), and (admin only)
**Users** management (add agent, set role, reset password).

## 6. Key flows to make clickable
1. **New listing → match → viewing**: add a 盤源 → dashboard shows "matches 3 customers" → open one →
   "send 睇樓紙" → arrange viewing → viewing appears on dashboard.
2. **Magic-link e-sign**: agent opens a listing → send 放盤紙 → generate link → (switch to) public e-sign
   page → owner fills + draws signature → submit → back in app the form shows **已簽** + a notification fires.
3. **Comment + @mention**: on a flat, agent writes a note mentioning `@另一位代理` → that agent's bell pings.

## 7. Reusable components (design once, use everywhere)
- **Status chip** set (listing status, form status, customer status) — consistent color coding.
- **Comment / activity timeline panel** — author avatar + name + timestamp + text + @mention; newest at
  bottom; **roll-up** items visually tagged with their source ("from viewing · Flat B").
- **Signature pad** (draw area + clear/redo).
- **Bilingual form renderer** — renders an EAA form with Chinese + English side by side / stacked; also the
  basis for the HTML→PDF output later.
- **Data table** with filter bar + card/grid toggle.
- **Media gallery** (photos + floor plan, lightbox).
- **Match-reasons pill** ("✓ 地區 ✓ 預算").
- **Notification bell + dropdown**.
- **Owning-agent badge**.

## 8. Data entities & fields (for realistic mock data)
- **User**: name, username, role (admin/agent), avatar, telegram-linked?(bool).
- **Listing 盤源**: address(屋苑/座/樓層 zone 高中低/flat), 地區, 實用面積(呎), 房/廳, 朝向, 樓齡, 管理費,
  校網, dealType(lease/sale/both), rent, price, 連租約|交吉, status, ownerId, owningAgentId,
  flags{凶宅, 入伙紙OP, 會所, 銀行估價, 管理公司}, photos[], floorPlan, keyConsent(bool).
- **Owner 業主**: name, phone, email, listings[].
- **Customer 客戶**: name, phone, email, owningAgentId, status; **Requirement**: dealType, budgetMin/Max,
  districts[], 實用面積Min/Max, rooms, mustHaves[].
- **Viewing 睇樓**: listingId, customerId, agentId, datetime, status, outcome/feedback.
- **Deal 成交**: listingId, customerId, agentId, stage, linked 臨時租約.
- **FormInstance**: type(放盤紙/睇樓紙/物業資料/臨租), recordRef, status, link, expiresAt, signedAt, signerName.
- **Comment**: authorId, body, createdAt, parentType+parentId (polymorphic), mentions[].
- **Notification**: type, recipientId, refLink, read?, createdAt.

## 9. Design direction
- **Internal CRM tone**: information-dense but calm and scannable — agents live in this all day. Prioritize
  fast scanning of listings/customers and one-tap actions over decorative flourish.
- **Responsive / mobile-aware**: agents use it out on viewings — the public e-sign page and key actions must
  work great on a phone. (Mobile push comes later via PWA — design can hint at "installable".)
- **Trust on the form/e-sign pages**: these are legal documents — make the public e-sign page feel official
  and clear (agency name, form title, clear consent, clean signature step).
- Color-code status consistently across listings/forms/customers.
- Neutral, professional palette (no strong brand yet — leave room; a property-trust blue/green is a safe
  default). Designer has aesthetic freedom within these constraints.

## 10. Demo scope
**In:** all §5 screens with mock data + the §6 flows clickable, bilingual toggle, responsive, the e-sign page.
**Out (don't build):** real auth/backend, real PDF generation, real Telegram/email, the **sale-side** forms,
native mobile app, full auto-match engine. Stub these as static states where they appear.
