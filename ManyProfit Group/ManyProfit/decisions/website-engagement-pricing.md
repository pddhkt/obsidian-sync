---
type: decision
area: commercial
project: Many Profit 萬利嘉
status: scope-agreed-invoice-pending
created: 2026-06-17
client: 萬利嘉實業有限公司 · Many Profit Industrial Limited
contact: Derek
---

# Website Project — Pricing & Engagement

> Commercial record for the website-revamp engagement. Architecture lives in [[multi-brand-app-architecture]]; this note is the **money + scope** side. Reconciles against the earlier draft quote **IMX-2026-Q01**.

## Status — 2026-06-17
- After the **Sat 2026-06-14** meeting, the client confirmed they want to engage Jack to revamp the website. Decision effectively made.
- Price probed ("現在的價錢是否已經最低？"). Jack held the value and offered a goodwill move.
- **Price: HK$50,000 → agreed HK$45,000** — a HK$5,000 partnership discount, framed as a relationship gesture and anchored as final. Jack has **sent the offer** (message below).
- **Scope, marketing, and old-contract questions resolved** (below). Remaining: issue the invoice with two payment options.

## Scope of the HK$45,000 (CONFIRMED)
- **Two storefronts** — Imarflex channel + Many Profit channel (two complete sites).
- **Shared multi-channel CMS** — one admin, operable by the client's own staff.
- **Online marketing — 6-month trial, included** — content + strategy, at the standing cadence (see below).

**Why two sites at the same price isn't underpriced:** the Many Profit store is built on the **same codebase** as Imarflex (the multi-channel platform — see [[multi-brand-app-architecture]]) and is **almost finished**. The second site is derived, not built from zero, so $45k for both holds.

## Marketing trial — standing cadence (from [[content-calendar]])
Standard monthly mix (the "how we do it now" record):
- **Site blog** — 4 posts / month
- **Instagram** — 8–12 posts / month
- **Facebook** — 4–8 posts / month
- **Stories / short updates** — optional weekly
- **Refresh old content** — 1–2 pages / month

6 months included in the $45k as a trial; thereafter an optional paid retainer.

### Post-trial retainer — pricing (precedent + recommendation)
Documented precedent (all client-seen):
- **Bare maintenance (3.1)** — HK$1,000/mo (維護 + 安全 + 監察 + 月報 + 季度 review + 小改). No content engine. (IMX-2026-Q01)
- **All-in 全包 retainer** — ~HK$2,500/mo at Standard (`客戶報價問題回覆-2026-05-18`), = maintenance + content/SEO engine + quarterly strategy. ~1/3 cheaper than buying itemized (~HK$3,500+).
- **Volume tier table** (`客戶報價問題回覆-2026-05-18`): Light 2 篇 ~$1,500 · Standard 4 篇 ~$2,000 · Aggressive 6 篇 ~$2,500. Mechanic: **+2 posts/mo ≈ +HK$500**; strategy fee flat across tiers.
- **Campaign work** — flat HK$1,000 each (multi-asset, AI-leveraged). Out-of-scope revisions HK$600/hr.

⚠️ **The tiers above price BLOG count only.** Current declared cadence (2026-06-10 directions deck) = **4 blogs/mo + 3 IG + 2 FB/week ≈ 12–15 social/mo** — well beyond the "Standard 4 blogs + captions" that anchored ~$2,500. So the post-trial all-in should be set **above $2,500** to reflect the weekly social engine.
- **Recommendation (confirm with Jack):** post-trial all-in **from ~HK$3,000/mo** (current weekly cadence), tiered up for higher volume; or bare maintenance HK$1,000/mo if they drop the content engine. Final tier confirmed at trial-end (established pattern: "試用尾揀 tier 3.1 vs 全包").

## Old contract — cleared
"舊合約未結束" = the client's **Shopline** subscription (their current platform), **not a Jack contract**. So no double-billing / overlap with our work; the new site migrates off Shopline.

## Reconcile against prior quote IMX-2026-Q01 (2026-05-17, DRAFT, unsigned)
- That draft = Imarflex single site: Phase 1 build **$40k** + Phase 2 migrate/launch **$10k** = **$50k**; Phase 3 retainer (6 mo free → $1k/mo); payment **50/30/20**; excluded daily social ops + add-on features (separate SOW). Stack line said "Payload" — **stale**, actual = Next.js + CF Workers/Hono + D1/Drizzle.
- New invoice supersedes it: same $50k headline → **$45k**, now **two storefronts** + **marketing trial folded in** (old quote excluded daily social; this deal includes a 6-month marketing trial).

## Carry-forward exclusions (confirm)
- Product data + brand assets (logos, CSV, copy) — **client provides** (the "8 啟動素材" list).
- 3rd-party / hosting fees (Vercel, Cloudflare, Airwallex %, domains) — **client's running cost**, not the build fee.
- Add-on features (reviews / referral / loyalty / live chat / AI chatbot / blog system) — separate SOW.

## Payment — two options for client to choose (circle one)
- **Option A — 50 / 30 / 20:** $22,500 deposit · $13,500 at design+dev midpoint · $9,000 within 7 days of launch.
- **Option B — 50 / 50:** $22,500 deposit · $22,500 on launch delivery.

**Bank (for client to pay):**
- HANG SENG BANK
- Leung Man Hin
- 768 578726 668

## Email delivery — problem + solution
**Client's problem:** they can **receive** mail from customers but **cannot send** mail to customers. This is an outbound deliverability/authentication gap (no proper sending service + likely missing SPF/DKIM/DMARC), not a mailbox problem.
**Confirmed scope (2026-06-17):** the client's "can't send" = **case (b) — staff can't send manual emails from their own mailbox** (they're on Outlook, possibly also a Google service). Fixing the staff mailbox is an **off-invoice goodwill help** (not a line item, per Jack) — diagnose their mail host (Microsoft 365 vs Google Workspace), fix SPF/DKIM/DMARC or consolidate provider. **Separate** from the app's transactional email (Resend), which IS part of the build. Domain registrar/DNS = **GoDaddy**.

**Solution (recommended — don't migrate their mailbox):**
- **Keep their existing email for receiving** (staff inbox / MX untouched).
- **Add Resend** (what imarflex-app already uses, `packages/emails`) for the app's outbound transactional + marketing mail (order/shipping/warranty/win-back), authenticated on a **sending subdomain** per channel (e.g. `mail.imarflex…` / `send.manyprofit…`) so it doesn't disturb the root domain's existing mail reputation.
- **Reply-to → their existing inbox**, and site contact-form → forwards to that inbox. So customers still reach them where they already read mail; only the *sending* path is new.
- This directly fixes "can't send to customers": Resend + a properly authenticated domain = deliverable mail.
**Client provides:** DNS access on both domains (to add Resend SPF/DKIM/DMARC); the from-addresses per channel; the reply-to/monitored inbox; current email host (so DMARC won't break existing mail). **Cost:** Resend free tier covers low volume, paid later — passthrough infra cost (like the ~HK$200/mo platform cost), not a build fee.

## Launch timetable
See [[launch-timetable]] — target **GO LIVE ~mid-July 2026**, gated on product-data handover; postpone risk = data timing / Airwallex approval / domain-transfer issues.

## Message sent to client — 2026-06-17 (verbatim, for record)
```
Hi Derek，

多謝你哋上星期六抽時間傾，亦多謝你對我嘅信任 🙏

原本 $50,000 包含：
* 兩個前台網店 – 數量上係兩個完整網站；
* 兩站共用嘅 CMS 後台 – 可以由自己同事操作；
* Marketing 內容 + 策略 – 持續6個月。

以呢個工作量、質素，再加埋 marketing 策略一齊計，$50,000 已經係一個實惠嘅價錢。

不過我都好重視同你哋嘅長期合作， 所以我可以做到 $45,000，係我嘅一份誠意，呢個亦都係我可以俾到嘅最好價錢。

如果方向 OK，我哋就可以開始傾埋落實嘅細節同時間表 👍
```

## Confirmed for invoice (2026-06-17)
- **Total:** HK$45,000 (package). **Post-trial:** all-in retainer from **HK$3,000/mo** (tiered by post volume) or bare maintenance HK$1,000/mo; final tier at trial-end.
- **Quote no.:** IMX-2026-Q02 (keeps lineage with Q01). Doc now at `ManyProfit Group/Imarflex/pitch/quotation/2026-q02/Imarflex 報價單-Q02-print.html` (+ PDF) — relocated in the 2026-06 vault pitch reorg; HTML's `tokens.css` link already repointed to `../../deck/tokens.css`.
- **Bank:** Hang Seng · Leung Man Hin · 768 578726 668 (client circles a payment option).
- **Email:** case (b) staff-mailbox = off-invoice help (not on quote); app transactional via Resend = in build. Registrar = GoDaddy.
- **Migration:** likely full Shopline→new-site cutover (Jack's read); kept as an open choice in [[launch-timetable]].

## Log
- 2026-06-17 Price agreed HK$45,000 (from $50k; $5k partnership discount). Jack sent the offer (message recorded). Scope confirmed = 2 storefronts + shared CMS + 6-month marketing trial; second site shares the Imarflex codebase (near-done), so not underpriced. "舊合約" = client's Shopline, no conflict.
- 2026-06-17 Finalized invoice inputs: post-trial from $3k/mo, bank details, email case (b) off-invoice, GoDaddy registrar, quote IMX-2026-Q02. Built quotation doc + launch timetable.
- 2026-06-17 **Quotation IMX-2026-Q02 PDF generated** (2 clean A4 pages, figures verified): `ManyProfit Group/Imarflex/pitch/deck/Imarflex 報價單-Q02-print.html` → `ManyProfit Group/Imarflex/pitch/deck/Imarflex-報價單-IMX-2026-Q02-2026-06-17.pdf`. Client edits applied (header "Jack Leung"; dropped volume-grading line; removed Blog 系統 from add-ons; standup = 面對面/視像 1–2h; ④ 上線 待定).
- 2026-06-17 **Launch timetable deck generated** (Option B — 5-slide landscape, matches Launch-Schedule style): `ManyProfit Group/ManyProfit/launch-timetable-deck.html` → `ManyProfit Group/ManyProfit/ManyProfit-Launch-Timetable-2026-06-17.pdf`. Gantt + 逐週 calendar + client-prep/we-deliver + email-fix + Shopline-choice callouts; mid-July target marked 待定.
- 2026-06-18 **Quote expanded to 3 pages** for contract clarity (client asked to spell out 條款 / scope / retainer instead of assuming prior-chat knowledge). Found the Q02 file had been moved to `ManyProfit Group/Imarflex/pitch/quotation/2026-q02/` in the pitch reorg. Changes: (Page 2) fixed scope — **產品資料匯入 moved from 不包 → 包括** (client supplies raw content, Jack imports; 不包 now = 產品相片拍攝), pointers to Page 3 on 修改範圍/第三方費用. New **Page 3 (附件 B · 服務定義與收費)**: plain-language definitions (email/SEO/analytics/data-split), third-party fee table (帳戶客戶開戶+付費, Jack 設定, 100% client-owned), 修改範圍 definition (major vs minor, 階段=Phase, 2 rounds + $600/hr quote-first), 基本維護-vs-全包 retainer comparison. Confirmed decisions: data-import included · client opens/pays 3rd-party accounts · 2 major/phase + written definition · detail on Page 3. Rendered + verified 3 clean A4 pages. **Still open:** off-invoice staff-email (case b) fix once GoDaddy/mail-host access available.
