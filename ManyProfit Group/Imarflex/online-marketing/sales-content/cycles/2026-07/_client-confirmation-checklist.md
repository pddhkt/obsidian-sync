---
type: client-confirmation-checklist
cycle: 2026-07
status: open
date: 2026-06-10
scope: IFQ-22R + ICF-140R go-live demo (kits + 8 posts)
tags:
  - online-marketing
  - sales-content
  - client-confirm
  - fact-check
---

# July Demo — Client Fact-Confirmation Checklist

Output of **Phase A** (extract → classify-vs-spec → fact-safety audit) over both July go-live kits + 8 post records. This is the human checkpoint before Phase B (post generation): **every item below is an input we need from the client (or a fix) before the July content is publish-ready.**

> [!info] How the facts break down
> 74 claims extracted. **IFQ-22R:** 5 card-sourced, 6 needs-confirm. **ICF-140R:** 20 card-sourced, 17 needs-confirm, 1 derived. Product specs trace to the official product-card image (`spec-source`), so they're well-grounded — the gaps are contact info, a few spec *labels*, third-party citations, URLs, and the founding year (already neutralized). The pipeline's value: it caught a contact number asserted as fact that isn't in any source file.

## 🔴 Must-fix before the demo (fact-safety violations)

These are places where an **unverified fact is stated to the reader as plain fact** (not wrapped in a placeholder). Verified by an adversarial Opus pass.

### 1. WhatsApp number `9140 6664` — printed bare in BOTH kits (highest priority)
- Original Phase A finding: it appeared **hardcoded ~5–7×** in each kit (blog FAQ, blog CTA, IG caption, FB copy, Reel caption + **burned-in on-screen end-card**, and inside the **JSON-LD FAQPage** structured data) — and it is **not in any source-of-truth file** (`spec.md` / `_index.md`).
- 2026-06-10 working decision: **do not mention WhatsApp on post-facing social copy**. Social-plan CTAs now point to PDP, blog, or warranty-registration instead. Remaining kit/blog/JSON-LD mentions should be handled separately if those surfaces go live.
- **Client ask:** what is the authoritative WhatsApp sales/support number + wa.me link?
- **Until confirmed:** replace every `9140 6664` with `【待客戶確認:WhatsApp 號碼】` (and a `{{whatsapp}}` slot in the JSON-LD). **Do not render the Reel video with the number burned in** until confirmed.

### 2. ICF third-party citations — live-link them or placeholder them
- `YOHO 冷風機選購指南 2026` (`yohohongkong.com/.../post/1577`), `ezone 冷風機選購指南` (`ezone.hk/article/20037103`), and `消費者委員會家用電器選購/保養指引` (`consumer.org.hk`) are presented as real, current sources with clickable links. The降溫 ranges (1–2 / 4–6 / 8–10°C) are *sourced to these* (and are correctly wrapped as 公開參考/視乎環境 — that part is handled).
- **Client/our ask:** verify each URL resolves live, the article title matches, and the cooling ranges are still quoted there. If any can't be verified, mark the citation `【待客戶確認:來源】` and the figures lose their backing.

## 🟡 Product facts to confirm / reconcile

### IFQ-22R — 4 open conflicts (spec.md flags all as pending)
| Item | Conflict | Client ask |
|---|---|---|
| Price | POP card **HK$449** (建議零售價) vs live webshop **HK$499** | Which price do we quote? |
| Product name | Card 『**極・龍卷**』 vs PDP 『龍卷』 (no 極・) | Canonical product name? |
| Fan size | Card **8吋** vs PDP URL slug `87-inch` (**8.7吋**) | Canonical size? |
| Cleaning scope | Card **易拆式前網罩** (front grille only) vs `_index` / PDP **全拆式** (fully detachable) | Front-grille-only or fully detachable? *(the Reel demo is built around front-grille-only — this one gates the video)* |

### ICF-140R — spec labels + claims to confirm
| Item | Issue | Client ask |
|---|---|---|
| Price | **HK$1,999** from card, `needs-live-pdp-check` | Confirm vs live PDP |
| Wind modes | Kit says "**3 段風速**" but card reads "**3 段加濕出風及乾風選擇**" (humidified/dry modes, NOT 3 wind speeds) | Fix the label — likely a misread |
| Oscillation | Card = **自動搖擺左右送風** (horizontal only); kit adds "**上下吹風角度可調**" (vertical) | Drop the vertical claim unless the client confirms it |
| Filter claim | Card "**特效抗菌及淨化空氣**" — `spec.md` Pending Check #5 asks whether to use verbatim or soften | Use as-is, or soften? |
| Filter upkeep | Replacement **frequency** + replacement **part SKU/URL** unresolved (`spec.md` Pending #3–4); content references them | Provide both |
| Core specs | 14L / 10.5 m/s / 1000 m³·h⁻¹ / 8hr / 52×24cm filter / W286×D400×H950mm — all card-sourced | Confirm against live PDP (batch OK) |

## 🟡 Editorial / governance (both blogs)
- **Author** name + title, **reviewer** name, **publish date** — currently `【待客戶確認】` / `{{...}}` placeholders (correctly held). Needed for the AEO author-identity axis.
- **Founding year / 年資 / origin** — already neutralized (1956 = confirmed hallucination, 1973 also unverified). Provide the real founding year if heritage framing is wanted; otherwise we keep the non-numeric phrasing. See [[imarflex-founding-year-unverified]].

## 🟡 URLs to provision
- `warranty-registration` page (ICF primary CTA 登記 2 年保養 — referenced ~4× + JSON-LD)
- `parts-finder` page (濾網 / parts)
- Blog canonical URLs (both kits — FB + Story posts link to them)
- PDP live-check: `imarflex.net/.../ifq-22r` and `.../icf-140r` (exist in `_index`, confirm live + price)

## 🟢 Already handled well (no action)
- **All referenced static images exist on disk** (11 IFQ + 11 ICF in `assets/2026-07-go-live-kits/generated/`).
- ICF 降溫 ranges consistently wrapped 公開參考/非保證/視乎環境.
- Hard specs (price, dB, W, dimensions, founding year) are held in `【待客戶確認】`/`{{}}` slots **except** the WhatsApp leak above.
- `utm-campaign` / `publish-week` aligned across kits + posts (fixed 2026-06-10).

## 🎬 Asset gaps (not images — video)
- **IFQ Reel** (07-10): only an **expiring CloudFront URL** exists → download the `.mp4` into `assets/2026-07-go-live-kits/` + QA the detach action / 3-blade-grille truth.
- **ICF Reel** (07-17): b-roll **not produced** — needs a 6-shot shoot or AI-video before the date.

## Per-post readiness matrix

| Post | Images | Copy | Blocked on |
|---|---|---|---|
| IFQ kit (blog) | ✓ | ✓ | WhatsApp in blog/JSON-LD · price · name/size/scope · author+date · URLs |
| 07-08 IG carousel | ✓ | in kit | price / feature-summary update |
| 07-09 FB link | ✓ | in kit | blog URL / PDP link |
| 07-10 Reel | n/a | script ✓ | **video (expiring URL)** · cleaning-scope |
| 07-11 Story poll | ✓ | in kit | PDP link |
| ICF kit (blog) | ✓ | ✓ | WhatsApp in blog/JSON-LD · price · wind-mode/oscillation labels · 抗菌 claim · citations · filter upkeep · author+date · warranty+parts URLs |
| 07-15 IG carousel | ✓ | in kit | spec-label fixes / feature-summary update |
| 07-16 FB link | ✓ | in kit | blog URL / warranty URL |
| 07-17 Reel | n/a | script ✓ | **video (unproduced)** |
| 07-18 Story poll | ✓ | in kit | warranty URL |

## Next step
Take this list to the client. Once the 🔴 items + product facts come back, run **Phase B** (generate finished post copy using confirmed facts only, placeholders for anything still open).
