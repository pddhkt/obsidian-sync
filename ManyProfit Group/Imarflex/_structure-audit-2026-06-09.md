# Imarflex 伊瑪牌 Vault — Folder-Structure Audit (FINAL)

_Audit date: 2026-06-09 · 21 folder clusters profiled against the live filesystem_

## 1. TL;DR

- **Two HIGH-severity duplications dominate.** (1) `backups/` is a verified archive of **stale duplicates** — its pitch doc (480 lines) is an older copy of `reference/pitch.md` (447 lines), plus superseded copies of `features/` and `site-migration/` work, with **no marker telling readers it is dead**. (2) **Brand imagery is physically copied across 4+ trees** with md5-confirmed identical files (e.g. `imarflex pitch deck/assets/moodboard-overview.png` == `Brand Guideline/Moodboard/...`; the wordmark PNG is stored **3×** inside `Brand Guideline/` alone). There is **no single canonical image store**.
- **The pitch deliverable is scattered across 3 places** — `imarflex pitch deck/` (Sales-Strategy deck), `online-marketing/pitch/` (a *different* Methodology/AEO deck), and `reference/pitch.md` (the source script) — with no cross-links, so "which is canonical" is genuinely confusing.
- **_readme coverage gap: 9 of 21 cluster roots lack a readme**, and the project mixes **three conventions** (`_readme.md` vs `_index.md` vs capital `README.md`). Worst gaps: `backups/` (undeclared archive), both pitch folders, and the core data folders `features/`, `funnel/`, `reference/`.
- **A phantom-folder bug is live:** `_index.md` and `_open-questions.base` reference `decisions/` and `canvas/`, **neither of which exists** — so `_open-questions.base` (which filters `file.inFolder("Imarflex/decisions")`) renders permanently empty. The real decision log is misfiled at `reference/session-decisions-2026-05.md`.
- **Minor hygiene (NOT a breach):** `客戶報價問題回覆-2026-05-26.md` contains a *demo trial* CMS login (`https://imarflex-checkout.pddhkt.workers.dev`, password literally `password`) deliberately shared with the client to try the admin. It is a throwaway demo account, not a production secret — but a live URL + login sitting in a git-tracked vault is still worth not committing. Low priority.
- **Top recommendation / priority order:** (1) delete-or-mark `backups/`, (2) de-duplicate brand imagery to a single canonical `Brand Guideline/` store, (3) make `decisions/` real and repoint the broken base, (4) clean up the pitch-deliverable scatter and the empty/mis-scoped OM stub folders.

> The vault is **broadly healthy and well-documented** — most flagged "overlaps" are intentional, governed splits (working `brand/` vs final `Brand Guideline/`, `features/` vs its `.base` views, `products/` source vs `assets/` campaign output, `research-inbox/` vs `content-briefs/`). The real problems are concentrated, not systemic.

---

## 2. Duplication & Overlap Map

Lead with the high-severity items. "Fix" column = **merge / canonicalize / split / archive**.

| # | Overlapping folder set | What overlaps | Severity | Recommended fix |
|---|---|---|---|---|
| 1 | `imarflex pitch deck` · `Brand Guideline` · `brand` · `online-marketing/assets` · `blog` | **Brand imagery copied across 4+ trees.** md5-verified identical: pitch-deck `moodboard-overview.png` == `Brand Guideline/Moodboard/...`. `Brand Guideline/` alone stores `imarflex-wordmark.png` **3×** (Logos/, Color Palettes/, Moodboard/) and `imarflex-mark.png` **2×**. No single canonical image store. | **HIGH** | **Canonicalize.** Make `Brand Guideline/` the single store for finished logos+palette+moodboard. **Delete** the stray duplicate logo PNGs from `Color Palettes/` and `Moodboard/` (keep only `Logos/`). For the pitch deck, either reference the canonical files or accept it as a deliberate self-contained export bundle **and say so in a pitch-deck `_readme.md`**. Campaign art (`online-marketing/assets`, `blog/samples/images`) is legitimately separate output — **leave it**, but each `_readme` must say brand-primitive art is pulled from `Brand Guideline/`, not re-generated. |
| 2 | `backups` (vs `reference` · `features` · `site-migration`) | `backups/` is a **confirmed archive of stale duplicates**: its pitch doc (480 lines) is byte-for-opening-identical to `reference/pitch.md` (447 lines); `— App Feature Spe.md` is superseded by the 31 per-feature nodes in `features/`; `# 網站重建方案書 …` overlaps live `site-migration/`. **No "superseded" marker** anywhere. | **HIGH** | **Archive or delete.** Prefer **DELETE** (git already preserves this history). If retained, rename to `_archive/` (or `archive/`), add a `_readme.md` stating every file is superseded and pointing to its canonical replacement (`pitch→reference/pitch.md`, `app-feature-spec→features/`, `website-rebuild-spec→site-migration/`+`reference/`), and **fix the literal `# ` prefix and `Spe` truncation** in the filenames. Do NOT keep as-is — lowest-health folder (38) and the pitch copy will silently drift. |
| 3 | `imarflex pitch deck` · `online-marketing/pitch` · `reference/pitch.md` | **Pitch deliverables in 3 locations.** (1) `imarflex pitch deck/` = the 21-slide Sales-Strategy web deck whose speaker notes mirror `reference/pitch.md`. (2) `online-marketing/pitch/` = a **different** Methodology/7-step-AEO deck with its own HTML+PDF. (3) `reference/pitch.md` = the markdown source for deck #1. The two HTML decks sit in different trees with no cross-links. | **MEDIUM** | **Do NOT merge — split is genuine.** Canonicalize the *source* relationship instead: add a header note in `reference/pitch.md` pointing to `imarflex pitch deck/Imarflex Pitch Deck.html`, and a one-line cross-reference between the two deck READMEs clarifying Sales-Strategy deck vs Methodology/AEO deck. Consider relocating both under a shared `pitch/` (or `deliverables/`) umbrella so they live as siblings. |
| 4 | `brand` · `Brand Guideline` | **One genuine content dup: the color palette.** `brand/visual-color-palette.md` (working draft + shadcn/Tailwind CSS-var mapping) and `Brand Guideline/Color Palettes/Imarflex Color Palette.md` (canonical token+hex) both define the same swatches (Heritage Blue / Rice White / Clay Beige / Steam Grey / Soft Charcoal / Cool Air…) — **hand-synced**. Logo usage is similarly forked. | **MEDIUM** | **Keep the split, declare one source of truth.** The working/final split is documented and intentional. Make `Brand Guideline/Color Palettes/Imarflex Color Palette.md` **canonical for hex values**; have `brand/visual-color-palette.md` link to it and keep only the shadcn/Tailwind mapping locally. Removes manual drift while preserving draft-vs-deliverable separation. |
| 5 | `online-marketing/published-content` · `sales-content` · `reports` · `blog` | **`published-content/` is mis-scoped.** Its `_readme` promises a published blog/IG/FB archive but holds **zero published logs** — only one AEO audit (`aeo-audits/2026-05-30-buying-guide-rice-cooker-audit.md`) scoring a *draft* blog file. Real "published" records live in `sales-content/posts/` (status: published). AEO audits also overlap conceptually with `reports/`. | **MEDIUM** | **Rename to reflect reality.** Either rename `published-content/` → `aeo-audits/` (promote its only real content), OR move the audit under `reports/` and let `published-content/` become a true archive once content actually ships. Update its `_readme` to stop describing content that doesn't exist. Confirm `sales-content/posts/` is the single home for published IG/FB records. |
| 6 | `reference` · `features` · `online-marketing` | **Narrative overlap, not byte dup.** `reference/internal-master.md` §5 holds a prose Features list while `_features.base`+`features/` are the structured catalogue. `reference/methodology-summary.md` narrates the same 7-step workflow operationalized in OM process playbooks and re-rendered in the Methodology deck — **same methodology in 3+ places.** | **LOW** | **Point, don't restate.** Treat `features/` (+ `.base` views) as the ONLY feature source of truth; trim `internal-master.md` §5 to a pointer. Pick one canonical home for the 7-step methodology (the OM process docs are operational truth) and have `methodology-summary.md` + the pitch deck reference it. |
| 7 | `online-marketing/seo-research` · `research-inbox` · `online-marketing` | **Template duplicated + empty stub.** The `type: seo-research` template in `seo-research/_readme.md` also appears in parent `seo-keyword-research.md` and `topic-research-workflow.md`. `seo-research/` is otherwise **empty** (706-byte `_readme` only, score 42), while the raw signal it should organize lives in `research-inbox/`. | **LOW** | **Consolidate the template** into one parent process doc; have the folder `_readme` link to it. Leave `seo-research/` as a scaffolded-but-empty stage (acceptable early) or fold into `research-inbox/` until there's enough output to justify a separate tier. |

---

## 3. Folder Health Ranking (best → worst)

| Rank | Folder | Grade | Score | One-line reason |
|---|---|---|---|---|
| 1 | `site-migration` | A | 90 | Crisp single purpose (one-shot catalog scrape), accurate README, consistent kebab-case, verified counts (336/336/79) match docs exactly. |
| 2 | `online-marketing/research-inbox` | A | 88 | Clean inbox purpose, accurate `_readme` + capture template, consistent `YYYY-MM-DD` naming; thin only because it's an inbox by design. |
| 3 | `online-marketing/products` | A | 87 | Canonical SKU source-of-truth, accurate `_readme`, disciplined no-duplicate-images rule; only ding: `icf-140r` scaffolded-but-empty, SKU-root leans on `_index`. |
| 4 | `online-marketing/assets` | B | 85 | Accurate readmes throughout, well-governed campaign store; inflated by deep 4-level nesting, ~80MB binaries in git, retired masters left in place. |
| 5 | `funnel` | B | 84 | Self-explanatory numbered stage notes, uniform schema, resolving wikilinks; gap is **no `_readme`** + heavy dependence on `features/`+`reference/`. |
| 6 | `online-marketing/business-focus` | B | 82 | Accurate `_readme`, clear forward-planning purpose; a demo market-scan artifact co-mingles with live planning, period docs not yet flipped to archived. |
| 7 | `online-marketing/content-briefs` | B | 82 | Accurate `_readme` with full brief template, clean lifecycle boundary; only one brief exists so file-naming convention is undocumented. |
| 8 | `online-marketing/reports` | B | 81 | Accurate `_readme`, clear retrospective purpose, consistent naming; the single report is a `status:planned` scaffold, template embedded in readme. |
| 9 | `online-marketing` (root) | B | 80 | Thorough, accurate `_index` hub for the marketing OS; uses `_index` not `_readme`, and `pitch/` is an orphan (no readme, unlisted in folder map). |
| 10 | `online-marketing/sales-content` | C | 79 | Strong system, accurate subfolder readmes, Base dashboard; root uses `_index` not `_readme`, SKU/channel naming inconsistent (`ifq22r` vs `IFQ-22R`). |
| 11 | `brand` | C | 76 | Has readme but `_index` drift (placeholder vs final), three hub-file conventions, **untracked undocumented `templates/`** holding the newest work. |
| 12 | `Brand Guideline` | C | 73 | Accurate root README, clear deliverable purpose; **duplicate logo PNGs in 3 places**, stray logos in `Color Palettes/`, stale placeholder frontmatter in Moodboard. |
| 13 | `features` | C | 72 | Tight single-purpose catalogue powering two Bases; **no `_readme`**, index count drift (says 32, has 31), an invalid status enum, a 20KB outlier node. |
| 14 | `blog` | C | 67 | Accurate readme one level down in `samples/`; **`blog/` root is an empty undocumented shell**, `cha-siu`/`char-siu` + prefix/slug naming mismatches. |
| 15 | root (loose files) | C | 65 | Decent `_index` home page but **broken refs to nonexistent `decisions/`+`canvas/`** (orphaned base verified), feature-count drift, and a demo-trial CMS login committed in a client doc (low severity, not a real secret). |
| 16 | `reference` | C | 66 | Canonical narrative library; **no readme**, two metadata generations, mixed language/permissions, index undercounts (says 4, has 8). |
| 17 | `imarflex pitch deck` | D | 62 | Self-contained working deck but **no readme**, space+CJK folder/file names, orphaned `uploads/` JPEG, confusing overlap with `online-marketing/pitch`. |
| 18 | `online-marketing/pitch` | D | 61 | Coherent methodology-pitch deliverable but **no readme**, orphaned from the marketing `_index` folder map, asymmetric EN/zhHK naming, 20MB+ PDFs in vault. |
| 19 | `online-marketing/seo-research` | F | 44 | Effectively empty (706-byte aspirational `_readme`), zero of six promised outputs exist, SEO spec duplicated across three locations. |
| 20 | `online-marketing/published-content` | F | 40 | Readme/content mismatch: framed as a published archive but holds zero published logs and one AEO audit of a draft; role redundant to `sales-content/posts/`. |
| 21 | `backups` | F | 38 | Stale archive of superseded duplicates, **no readme declaring it an archive**, a filename literally starting with `# `, verified outdated copy of `reference/pitch.md`. |

---

## 4. _readme Coverage

**Cluster-root coverage: 12 of 21 clusters have a root readme; 9 do not.**

- **Has a true `_readme.md` / README.md root:** `site-migration` (README.md), `Brand Guideline` (README.md), `online-marketing/assets`, `business-focus`, `content-briefs`, `products`, `published-content`, `reports`, `research-inbox`, `seo-research`. Plus `blog` — but only one level down in `samples/`.
- **Uses `_index.md` as the de-facto hub (not `_readme.md`):** root (loose), `online-marketing` root, `online-marketing/sales-content`, `brand`.
- **Missing any root readme/index entirely:** `features`, `funnel`, `reference`, `backups`, `imarflex pitch deck`, `online-marketing/pitch`.

> **Convention inconsistency is the dominant theme.** Most well-run folders use `_readme.md`, but root / OM-root / sales-content / brand fall back to `_index.md` and `Brand Guideline` uses capital `README.md` — three styles. This breaks uniformity and makes coverage hard to audit. **Standardize on the underscore-prefixed convention** (see naming rules below).

### Folders/subfolders still missing a readme — grouped by area

**Vault root & core data**
- `/Imarflex/.` (root) — needs a refreshed `_index.md` (also fixes phantom-folder refs)
- `/Imarflex/features` — *one node per feature (31 nodes), frontmatter powers `_features.base` + `_addons.base`*
- `/Imarflex/funnel` — *six stage notes (1-awareness … 6-advocacy), per-stage KPIs + mermaid flow, linked from `_index.md`*
- `/Imarflex/reference` — *long-form narrative source docs: pitch, internal master spec, add-ons discussion, funnel-demo spec*
- `/Imarflex/backups` — *(should become an archive `_readme` declaring every file superseded — or delete the folder)*
- `/Imarflex/blog` — *blog drafts/content for the Imarflex site; root is currently an empty shell over `samples/`*

**Pitch deliverables**
- `/Imarflex/imarflex pitch deck` — needs a `_readme` (self-contained working deck; state it's the Sales-Strategy deck)
- `/Imarflex/imarflex pitch deck/assets` — *brand/moodboard/social-carousel images embedded by the deck + quotation HTML*
- `/Imarflex/imarflex pitch deck/uploads` — *stray pasted images, referenced by nothing — verify, likely deletable*
- `/Imarflex/online-marketing/pitch` — *exported pitch/methodology deliverables (PDF+HTML decks, launch schedule, image prompts); also register it in `online-marketing/_index.md`*
- `/Imarflex/online-marketing/pitch/images` — *generated hero images (`imarflex-pitch-NN-<slot>.png`) from `../image-prompts.md`; no source/brand assets here*

**Brand**
- `/Imarflex/brand/social-samples` — *GPT-image reference samples (product/lifestyle/carousel); uses `_index.md` as hub*
- `/Imarflex/brand/scripts` — *Python scripts generating brand assets (logo-usage PNGs) into `brand/assets/`*
- `/Imarflex/brand/templates` — *Node render templates (`render.mjs` + `tokens.css`) overlaying text/diagram layers; output to `_proof/` — **currently untracked in git***
- `/Imarflex/Brand Guideline/Color Palettes` — *canonical color tokens + hex + client palette boards; logo files do NOT belong here (see `Logos/`)*

**Online-marketing (OM)**
- `/Imarflex/online-marketing` (root) — *currently `_index.md`; covers SEO research, calendar, social/blog workflow, reports, go-live kits*
- `/Imarflex/online-marketing/sales-content` — *sales-content taxonomy + post tracker (`posts/` feed `_sales-content.base`); currently `_index.md`, 44 files*
- `/Imarflex/online-marketing/business-focus/aeo-simulations` — *AEO citation simulations: prompt baselines + monthly mention-rate deltas (ChatGPT/Perplexity/Claude/Google AI Overviews)*
- `/Imarflex/online-marketing/products/ifq-22r` — *IFQ-22R circulator-fan SKU source-of-truth (record, spec, visual-truth, tiered images)*
- `/Imarflex/online-marketing/products/icf-140r` — *ICF-140R evaporative-cooler SKU source-of-truth (record, spec, visual-truth, tiered images)*
- `/Imarflex/online-marketing/published-content/aeo-audits` — *AEO audit reports (imarflex-aeo 5-axis rubric), one per piece, `YYYY-MM-DD-topic-audit.md`*

**Dot-tooling (low priority / out of scope, but undocumented):** `/Imarflex/.claude`, `/Imarflex/.agents`, `/Imarflex/.codex`.

---

## 5. Recommended Target Structure

### 5.1 Target tree

```
Imarflex/
├── _index.md                      ← vault home (rewritten; fixes phantom-folder refs)
├── _features.base                 ← feature catalogue DB view
├── _addons.base                   ← add-on catalogue DB view
├── _open-questions.base           ← REPOINTED to decisions/
│
├── features/                      ← one node per feature (+ _readme.md)
├── funnel/                        ← 6 funnel-stage notes (+ _readme.md)
│
├── decisions/                     ← NEW: the structured open-questions the base expects
│   ├── _readme.md
│   └── <area>-<slug>.md           ← type: decision notes (seeded from session log)
│
├── brand/                         ← SINGLE brand home (working + final merged)
│   ├── _index.md
│   ├── _deliverables.base
│   ├── guidelines/                ← the 15 voice/visual/content .md notes
│   ├── assets/                    ← working generated assets (+ _readme.md)
│   ├── final/                     ← was "Brand Guideline/"
│   │   ├── logos/                 ← mark + wordmark (CANONICAL only)
│   │   ├── color-palette/         ← palette .md + 2 client boards
│   │   └── moodboard/             ← 6 moodboard PNGs (+ _readme.md)
│   ├── social-samples/            ← GPT-image reference samples (_index.md)
│   └── pipelines/                 ← was scripts/ + templates/
│       ├── logo-generator/        ← generate_logo_usage_images.py
│       └── carousel-renderer/     ← render.mjs, tokens.css, _proof/
│
├── online-marketing/              ← operating-system hub (largely unchanged)
│   ├── _index.md
│   ├── business-focus/  research-inbox/  seo-research/  content-briefs/
│   ├── products/  sales-content/  reports/
│   ├── assets/                    ← generated campaign imagery (go-live kits)
│   └── quality/                   ← NEW: was published-content/ + aeo-audits/
│       ├── published-log/         ← when records exist
│       └── aeo-audits/
│
├── blog/                          ← samples promoted up one level (shell removed)
│   ├── _readme.md   images/   *-sample.md
│
├── pitch/                         ← SINGLE canonical pitch home (was 2 folders)
│   ├── _index.md                  ← which deck is which / which is current
│   ├── strategy-deck/             ← was "imarflex pitch deck/"
│   └── methodology-deck/          ← was online-marketing/pitch/
│       └── exports/               ← the 20-21MB PDFs (isolated for .gitignore)
│
├── reference/                     ← long-form narrative library (+ _readme.md)
├── site-migration/                ← scraper + snapshot dataset (unchanged; clean)
│
├── client-correspondence/         ← NEW: dated client Q&A out of root
│   ├── _readme.md
│   ├── 2026-05-18-quote-reply.md  …  2026-05-26-followup-questions.md
│   └── exports/                   ← the 1.1MB PDF lives here, not at root
│
└── archive/                       ← NEW: explicit graveyard for superseded docs
    ├── _readme.md
    └── 2026-05-superseded/        ← was backups/ (clearly labelled stale dupes)
```
`.git`, `.claude`, `.agents`, `.codex` stay as-is (dot-tooling, out of scope).

### 5.2 Migration table

| From | To | Action | Why |
|---|---|---|---|
| `decisions/` (phantom in `_index.md`) | `decisions/` (real folder + `_readme.md`) | **create** | `_open-questions.base` filters `file.inFolder("Imarflex/decisions")` — base is permanently empty until this folder exists with `type: decision` notes. |
| `reference/session-decisions-2026-05.md` | seed `decisions/<area>-<slug>.md` | **move (derive)** | Convert the narrative log into the structured records the base expects; keep prose log in `reference/` as source. |
| `canvas/` (phantom in `_index.md`) | — | **delete (from index)** | Never built. Remove the reference + the "build canvas" next-step rather than carry a dead promise. |
| `Brand Guideline/` | `brand/final/` | **move + rename** | Eliminates the space-in-name hazard; collapses two brand homes into one tree, keeping working-vs-final as a subfolder. |
| `Brand Guideline/Color Palettes/imarflex-mark.png` + `…-wordmark.png` | — | **delete** | Stray md5-confirmed dupes; canonical copies live in `logos/`. |
| `Brand Guideline/Moodboard/imarflex-wordmark.png` | — | **delete** | Same stray-dupe issue. |
| `brand/scripts/` + `brand/templates/` | `brand/pipelines/{logo-generator,carousel-renderer}/` | **move** | Separates executable code from prose; gives the untracked `templates/` work a documented, git-tracked home. |
| `brand/*.md` (15 guideline notes at brand root) | `brand/guidelines/` | **move** | Stops 15 prose notes crowding the brand hub root alongside subfolders. |
| `blog/samples/*` | `blog/*` (promote up one level) | **move** | `blog/` root was an empty shell with one child; flatten so `blog/` is the real folder with its own `_readme.md`. |
| `imarflex pitch deck/` | `pitch/strategy-deck/` | **move + rename** | Kills the space-in-name; establishes one canonical `pitch/` parent. Rename HTML to kebab-case. |
| `online-marketing/pitch/` | `pitch/methodology-deck/` | **move** | Resolves the two-pitch-homes overlap; removes the orphan (unlisted in `online-marketing/_index.md`). |
| `pitch/methodology-deck/*.pdf` (20-21MB) | `pitch/methodology-deck/exports/` | **move** | Isolate heavy rendered binaries so they can be `.gitignore`d / managed separately from HTML sources. |
| `online-marketing/published-content/` | `online-marketing/quality/published-log/` | **rename + move** | Readme promised a published archive but it only holds AEO audits; rename to reflect reality. |
| `online-marketing/published-content/aeo-audits/` | `online-marketing/quality/aeo-audits/` | **move** | Co-locate evaluation artifacts under one `quality/` concern. |
| `backups/` | `archive/2026-05-superseded/` | **archive + rename** | Explicitly mark as superseded dupes (nothing currently tells a reader they're stale). |
| `backups/數碼銷售策略方案書.md` | keep in archive only | **archive** | Verified older 480-line copy of `reference/pitch.md` (447 lines); reference is canonical — quarantine, don't delete. |
| `backups/# 網站重建方案書 — ….md` | `archive/2026-05-superseded/website-rebuild-spec.md` | **rename** | Strip the leading `# ` heading-char and spaces. |
| `客戶報價問題回覆-*.md` (3 client `.md`) | `client-correspondence/2026-05-18-quote-reply.md` etc. | **move + rename** | Get dated correspondence out of the meta-index root; romanize filenames for tooling. |
| `客戶報價問題回覆-2026-05-26.pdf` (1.1MB) | `client-correspondence/exports/` | **move** | Separate export binary from its source `.md`; not at vault root. |
| `客戶報價問題回覆-2026-05-26.md` (demo-trial login) | move (optionally redact) | **rename + (edit)** | Contains a throwaway demo CMS login (`password`); consider removing the live URL+login when moving. Low priority. |
| `online-marketing/{sales-content, products, assets, business-focus, research-inbox, content-briefs, reports}` | unchanged | **keep** | Already high-scoring (79-88), accurate readmes, clean conventions. |
| `features/`, `funnel/` | add `_readme.md` only | **keep** | Self-explanatory + base-coupled; just close the documentation gap. |
| `site-migration/` | unchanged | **keep** | Highest score (90); self-contained, accurate README. |
| `online-marketing/seo-research/` | keep, or **merge** into `research-inbox/` if still empty next quarter | **keep (watch)** | Near-empty spec shell; don't delete a documented stage, but flag for merge if unused. |

### 5.3 Naming-convention rules

**Folders** — `kebab-case`, lowercase, **no spaces, no CJK** (fixes `Brand Guideline/`, `Color Palettes/`, `imarflex pitch deck/`). Hub file is `_index.md` for interactive map/dashboard folders (vault root, `brand/`, `online-marketing/`, `pitch/`) and `_readme.md` for plain doc folders — **one per folder, never both.** Drop capital `README.md`.

**Files** — `kebab-case.md`, no spaces/CJK in the *filename* (CJK belongs in the H1/body). Dates: `YYYY-MM-DD-<slug>` for day-level events (correspondence, audits, posts), `YYYY-MM-<slug>` for monthly (focus docs, reports, published logs), `YYYY-QX-<slug>` for quarterly, `YYYY-MM-wX-<slug>` for week-level. Evergreen/template files carry no date. **SKU keys: `IFQ-22R` in frontmatter/prose, `ifq-22r` in paths — ban the unhyphenated `ifq22r`.** Pick `char-siu` (or `cha-siu`) once and apply to both filenames and wikilinks. Export/rendered binaries live in an `exports/` (or `_proof/`) subfolder, never beside loose meta files.

**Frontmatter** — every `.md` carries `type:` + `status:` + (where time-relevant) `date:`/`period:`. Backfill the 4 un-frontmattered `reference/` originals. Fix the invalid `seo-content-pack.md` status `"draft / review / published"` → a real enum (`in-progress`) so `_addons.base` renders it.

### 5.4 Top 5 highest-leverage moves (do these first)

1. **Move client docs out of root.** Move all three Chinese client `.md` files + the 1.1MB PDF into `client-correspondence/`. While doing so, optionally strip the demo-trial CMS login from `客戶報價問題回覆-2026-05-26.md` (it's a throwaway `password` account, low risk, but no reason to keep a live URL+login in the vault). De-clutters root.
2. **Make `decisions/` real and repoint the orphaned base.** Create `decisions/` with a `_readme.md` and seed 3-5 `type: decision` notes derived from `reference/session-decisions-2026-05.md`. The single change that turns `_open-questions.base` from permanently-empty into functional.
3. **Collapse the two pitch homes into `pitch/`.** Move `imarflex pitch deck/` → `pitch/strategy-deck/` and `online-marketing/pitch/` → `pitch/methodology-deck/`, add `pitch/_index.md` stating which deck is which and which is the current client version. Kills the space/orphan problems and the "which is canonical" confusion at once.
4. **Rewrite `_index.md` to match reality.** Remove the phantom `decisions/`+`canvas/` tree entries and the "build canvas / seed decisions" next-steps, fix the feature count (**31, not 32**), refresh the build snapshot, and update the brand link to `brand/final/`.
5. **Unify the brand domain and delete the duplicate logos.** Move `Brand Guideline/` → `brand/final/`, delete the 3 stray `imarflex-wordmark.png` + 2 stray `imarflex-mark.png` dupes (canonical copies stay in `final/logos/`), relocate `scripts/`+`templates/` to `brand/pipelines/`, fix `brand/_index.md` status drift. One brand home, one logo source of truth, code separated from prose.

---

## 6. Next Actions Checklist

### ✅ SAFE / non-destructive — do anytime (no decision needed)

- [ ] **Create the 9 missing cluster-root readmes** using the purposes in §4: `features/`, `funnel/`, `reference/`, `blog/` (root), `imarflex pitch deck/`, `online-marketing/pitch/` — and the `_index`-only roots can keep `_index` for now.
- [ ] **Create the missing subfolder readmes** in §4 (e.g. `brand/social-samples`, `brand/scripts`, `brand/templates`, `Brand Guideline/Color Palettes`, `online-marketing/products/ifq-22r` + `icf-140r`, `…/business-focus/aeo-simulations`, `…/pitch/images`, `…/published-content/aeo-audits`).
- [ ] **Register `online-marketing/pitch/` in `online-marketing/_index.md`** (it is unlisted in the folder map).
- [ ] **Fix the feature-count drift** in `_index.md` (says 32 → actual **31**) and the `reference` count (says 4 → actual **8**).
- [ ] **Fix invalid frontmatter:** `seo-content-pack.md` status enum, and the literal `# ` prefix + `Spe` truncation in the `backups/` filenames (if archiving rather than deleting).
- [ ] **Add cross-reference notes** between the two pitch decks and from `reference/pitch.md` → its rendered HTML deck.
- [ ] **Add `_readme` notes** to campaign-asset folders stating brand-primitive art comes from the canonical brand store (not re-generated).
- [ ] **Track the untracked `brand/templates/` work** in git (currently the newest active work — Jun 8 IFQ-22R carousel renderer — is entirely untracked and undocumented).

### ⚠️ NEEDS DECISION — owner sign-off before executing (destructive / structural)

- [ ] **(Optional, low priority) Remove the demo-trial CMS login** (`https://imarflex-checkout.pddhkt.workers.dev` / `password`) from `客戶報價問題回覆-2026-05-26.md`. It's a deliberately-shared throwaway demo account, not a real secret — clean up only if you'd rather not keep a live URL+login in a git-tracked vault.
- [ ] **Delete or archive `backups/`** → `archive/2026-05-superseded/` with a `_readme` manifest pointing each file to its canonical replacement. (git already preserves the history.)
- [ ] **De-duplicate brand imagery:** delete the 3 stray wordmark + 2 stray mark PNGs inside `Brand Guideline/`; decide whether the pitch deck references canonical art or stays a documented self-contained bundle.
- [ ] **Create `decisions/`** and migrate `reference/session-decisions-2026-05.md` into it; remove the phantom `canvas/` references from `_index.md` and `_open-questions.base`.
- [ ] **Collapse pitch into `pitch/`** (`strategy-deck/` + `methodology-deck/`), isolate 20-21MB PDFs into `exports/` for `.gitignore`.
- [ ] **Move client Q&A docs** + 1.1MB PDF into `client-correspondence/` (and `exports/`).
- [ ] **Rename `online-marketing/published-content/`** → `quality/` (with `published-log/` + `aeo-audits/`), OR move the lone audit to `reports/`.
- [ ] **Merge `brand/` + `Brand Guideline/`** into one tree (working + `final/`), declare `Brand Guideline/Color Palettes/Imarflex Color Palette.md` the canonical hex source; relocate `scripts/`+`templates/` → `brand/pipelines/`.
- [ ] **Watch `online-marketing/seo-research/`** — keep as a scaffolded stage, or fold into `research-inbox/` if still empty next quarter.