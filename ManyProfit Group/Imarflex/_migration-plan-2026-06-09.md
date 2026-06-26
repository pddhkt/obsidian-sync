---
type: migration-plan
project: Imarflex 伊瑪牌
status: proposed
created: 2026-06-09
companion: "[[_structure-audit-2026-06-09]]"
---

# Imarflex Vault — Structure Migration Plan

> Companion to `_structure-audit-2026-06-09.md`. **Nothing here has been executed** — this is a reviewable, ordered runbook. Phases are sorted lowest-risk → highest-risk; you can stop after any phase and the vault is still consistent.

## ⚠️ Read first — Obsidian link safety

This is an Obsidian vault, so `[[wikilinks]]` and embeds point between notes.

- **Moving/renaming a NOTE from the CLI (`git mv`) does NOT update inbound `[[links]]`.** For note-heavy moves, do the move **inside Obsidian** (drag in the file explorer, or right-click → Rename) so Obsidian rewrites the links — then `git add -A` to stage what it changed. Alternatively, run the CLI move and fix links manually (each move below lists an inbound-link check).
- Moves of **non-note assets** (HTML decks, PNG/PDF, `.json`, `.py`) are CLI-safe — almost nothing uses `[[ ]]` to reach them.
- `.base` files reference folders by **string path** (`file.inFolder("Imarflex/…")`), not wikilinks — update those by hand (Phase 3 + any folder a base scans).

**Before starting:**
```bash
cd "/home/lmt/Projects/personal/obsidian-sync/Imarflex"
git switch -c chore/vault-restructure        # work on a branch
git status                                    # confirm clean starting point
```
Roll back any phase with `git restore .` (unstaged) or `git reset --hard HEAD` (committed-to-branch). Commit after each phase so rollback is granular.

---

## Phase 1 — Zero-risk doc edits (no moves, no deletes)

Do these first; they fix live bugs and cost nothing.

1. **Fix `_index.md` drift.**
   - Remove the phantom `decisions/` and `canvas/` lines from the "Where things live" tree (Phase 3 makes `decisions/` real; `canvas/` was never built — delete the reference and the "build canvas" next-step).
   - Feature count: **32 → 31** (verified actual node count).
   - Update the brand link target if/when Phase 4 runs (`brand/_index` → `brand/final/`).
2. **Register the methodology pitch** in `online-marketing/_index.md` — add a `pitch/` row to the "Storage folders" / folder map (it is currently unlisted → orphan).
3. **Cross-link the two pitch decks** so "which is canonical" is unambiguous:
   - `reference/pitch.md` → header note: "Rendered deck: `imarflex pitch deck/Imarflex Pitch Deck.html`".
   - one line in each pitch `_readme.md` pointing at the other (strategy deck ⇄ methodology deck). *(readmes created 2026-06-09 already state this.)*
4. **Fix invalid frontmatter** so the Bases render every node:
   - `features/seo-content-pack.md` `status:` is a non-enum string (`"draft / review / published"`) → set to a single valid value (`in-progress`).
   - Backfill `type:`/`status:` on the 4 un-frontmattered `reference/` originals.
5. **Reference doc count** in any index that says "4 reference docs" → **8**.

✅ Commit: `git commit -am "docs: fix _index drift, register om/pitch, cross-link decks, fix frontmatter enums"`

---

## Phase 2 — De-duplicate identical assets (deletes; git preserves history)

All targets below are **byte-identical** (md5-verified) duplicates — no information is lost.

```bash
# Canonical logos stay in Brand Guideline/Logos/. Delete the strays:
git rm "Brand Guideline/Color Palettes/imarflex-mark.png" \
       "Brand Guideline/Color Palettes/imarflex-wordmark.png" \
       "Brand Guideline/Moodboard/imarflex-wordmark.png"
```
- Verify nothing embeds the deleted copies first:
  ```bash
  grep -rn "Color Palettes/imarflex-\|Moodboard/imarflex-wordmark" . --include=*.md --include=*.html
  ```
  If a palette/moodboard board embeds the wordmark, repoint it to `../Logos/imarflex-wordmark.png` before deleting.
- **`imarflex pitch deck/uploads/`** — confirm unreferenced, then remove:
  ```bash
  grep -rn "uploads/" "imarflex pitch deck"/*.html "imarflex pitch deck"/*.js
  git rm -r "imarflex pitch deck/uploads"   # only if grep returns nothing
  ```

✅ Commit: `git commit -m "chore: remove byte-identical duplicate logo PNGs + unused uploads"`

---

## Phase 3 — Make `decisions/` real (fixes the empty Base)

`_open-questions.base` filters `file.inFolder("Imarflex/decisions")` against a folder that doesn't exist → it renders permanently empty.

```bash
mkdir decisions
```
1. Create `decisions/_readme.md` (purpose: structured `type: decision` notes — the open-questions the Base expects).
2. Seed 3–5 `decisions/<area>-<slug>.md` notes derived from `reference/session-decisions-2026-05.md` (keep the narrative log in `reference/` as the source; the decision notes are the structured records).
3. Confirm `_open-questions.base` now populates. Each seed note needs frontmatter `type: decision` + whatever fields the base columns expect (open the `.base` to read its column defs).

✅ Commit: `git commit -am "feat: create decisions/ folder so _open-questions.base populates"`

---

## Phase 4 — Folder consolidation (structural moves)

Each move: **(a)** check inbound `[[links]]`, **(b)** move (Obsidian for notes, CLI for assets), **(c)** update `_index.md` / readmes / `.base` paths.

### 4a. One canonical `pitch/`  *(mostly assets — CLI-safe)*
```bash
mkdir -p pitch
git mv "imarflex pitch deck"      pitch/strategy-deck
git mv online-marketing/pitch     pitch/methodology-deck
mkdir -p pitch/methodology-deck/exports
git mv pitch/methodology-deck/*.pdf pitch/methodology-deck/exports/   # isolate 20MB+ PDFs
```
- Create `pitch/_index.md`: which deck is which, which is the **current** client version.
- Rename the deck HTML to kebab-case (`Imarflex Pitch Deck.html` → `imarflex-pitch-deck.html`); update any `<a href>`/scripts that load it.
- Update `reference/pitch.md` header link → `pitch/strategy-deck/…`.
- Remove the `pitch/` row you added in Phase 1 from `online-marketing/_index.md` (it now lives at top level), or repoint it.
- Inbound check: `grep -rn "imarflex pitch deck\|online-marketing/pitch" . --include=*.md`

### 4b. Merge `Brand Guideline/` into `brand/final/`  *(assets + a few notes)*
```bash
mkdir -p brand/final
git mv "Brand Guideline/Logos"          brand/final/logos
git mv "Brand Guideline/Color Palettes" brand/final/color-palette
git mv "Brand Guideline/Moodboard"      brand/final/moodboard
git mv "Brand Guideline/README.md"      brand/final/_readme.md
rmdir "Brand Guideline"
# separate code from prose:
mkdir -p brand/pipelines
git mv brand/scripts    brand/pipelines/logo-generator
git mv brand/templates  brand/pipelines/carousel-renderer
# group the 15 guideline notes:
mkdir -p brand/guidelines
git mv brand/voice-*.md brand/visual-*.md brand/content-*.md brand/guidelines/
```
- Declare `brand/final/color-palette/Imarflex Color Palette.md` the **canonical hex source**; trim `brand/guidelines/visual-color-palette.md` to a link + the shadcn/Tailwind mapping only.
- Update `brand/_index.md` + root `_index.md` "Final brand assets" link → `brand/final/`.
- Inbound check (this one has the most links): `grep -rn "Brand Guideline\|brand/visual-\|brand/voice-\|brand/content-\|brand/scripts\|brand/templates" . --include=*.md`
- ⚠️ Prefer doing the `brand/*.md` → `guidelines/` moves **inside Obsidian** to auto-fix `[[voice-tone-of-voice]]`-style links.

### 4c. Rename `published-content/` → `quality/`
```bash
mkdir -p online-marketing/quality
git mv online-marketing/published-content/aeo-audits online-marketing/quality/aeo-audits
mkdir -p online-marketing/quality/published-log     # real published records land here when content ships
git rm online-marketing/published-content/_readme.md # superseded; write online-marketing/quality/_readme.md
rmdir online-marketing/published-content
```
- Update `online-marketing/_index.md` storage-folder table (`published-content` → `quality`).
- *(Lighter alternative if you don't want a new folder: just move the lone audit to `reports/` and leave `published-content/` as a true empty archive — pick one.)*

### 4d. Client correspondence out of root  *(notes — watch links)*
```bash
mkdir -p client-correspondence/exports
git mv 客戶報價問題回覆-2026-05-18.md  client-correspondence/2026-05-18-quote-reply.md
git mv 客戶報價問題回覆-2026-05-26.md  client-correspondence/2026-05-26-quote-reply.md
git mv 客戶跟進問題-2026-05-26.md      client-correspondence/2026-05-26-followup-questions.md
git mv 客戶報價問題回覆-2026-05-26.pdf client-correspondence/exports/
```
- Create `client-correspondence/_readme.md`.
- **(Optional, low priority)** edit `2026-05-26-quote-reply.md` to drop the demo-trial CMS login (`https://imarflex-checkout.pddhkt.workers.dev` / `password`) — throwaway demo account, not a real secret, but no reason to keep a live URL+login in the vault.
- Inbound check: `grep -rn "客戶報價問題\|客戶跟進問題" . --include=*.md`

### 4e. `backups/` → `archive/`
```bash
mkdir -p archive/2026-05-superseded
git mv backups/*.md archive/2026-05-superseded/
git mv "archive/2026-05-superseded/# 網站重建方案書 — Development Spec for Claude Code.md" \
       archive/2026-05-superseded/website-rebuild-spec.md     # strip stray "# " + spaces
git mv backups/_readme.md archive/_readme.md                  # readme already written 2026-06-09
rmdir backups
```
- *(Or simply `git rm -r backups/` — every file is a verified stale duplicate and git keeps the history. Archive only if you want them browsable.)*

### 4f. Flatten `blog/`  *(notes — watch links)*
```bash
git mv blog/samples/* blog/
rmdir blog/samples
```
- Do in Obsidian if `[[buying-guide-rice-cooker-…]]`-style links exist (`grep -rn "blog/samples" . --include=*.md`).
- `blog/_readme.md` (written 2026-06-09) already documents the flattened layout — adjust the `samples/` references after the move.

✅ Commit each sub-step separately (`git commit -am "refactor: consolidate pitch decks under pitch/"`, etc.) so any one is independently revertible.

---

## Phase 5 — Naming normalization (low-risk, do alongside Phase 4)

- **Folders:** kebab-case, **no spaces, no CJK**. The space/CJK offenders are resolved by Phase 4 (`imarflex pitch deck`, `Brand Guideline`, `Color Palettes`).
- **One hub file per folder:** standardize on `_readme.md` for plain doc folders, `_index.md` for interactive map/dashboard folders (root, `brand/`, `online-marketing/`, `pitch/`, SKU roots) — never both. Drop capital `README.md` (Phase 4b renames the Brand Guideline one).
- **SKU keys:** `IFQ-22R`/`ICF-140R` in frontmatter & prose, `ifq-22r`/`icf-140r` in paths — ban the unhyphenated `ifq22r` (appears in `online-marketing/assets/.../masters/ifq22r-*`).
- **Pick one spelling** of `char-siu`/`cha-siu` and apply to both filename and `[[wikilinks]]` in `blog/`.
- **Dates:** `YYYY-MM-DD-slug` (day), `YYYY-MM-slug` (month), `YYYY-QX-slug` (quarter), `YYYY-MM-wX-slug` (week). Evergreen files carry no date.

---

## Phase 6 — Optional: heavy-binary hygiene

The vault holds ~80MB of generated PNGs + 20–40MB of PDFs in git. If repo size matters:
- Move rendered exports into `exports/` subfolders (done for pitch PDFs in 4a) and add a `.gitignore` rule, **or** adopt git-LFS for `*.png`/`*.pdf` under asset folders.
- `online-marketing/assets/.../masters/` retired versions (`ifq22r-v3 … v6`) can be moved to an `archive/` sibling once `v7` is final.

---

## Execution checklist

- [ ] Phase 1 — `_index.md` drift, register om/pitch, deck cross-links, frontmatter enums
- [ ] Phase 2 — delete 3 duplicate logo PNGs (+ verify/remove `uploads/`)
- [ ] Phase 3 — create `decisions/` + seed, confirm `_open-questions.base` populates
- [ ] Phase 4a — consolidate pitch → `pitch/strategy-deck` + `pitch/methodology-deck`
- [ ] Phase 4b — merge `Brand Guideline/` → `brand/final/`, split code → `brand/pipelines/`, notes → `brand/guidelines/`
- [ ] Phase 4c — `published-content/` → `quality/`
- [ ] Phase 4d — client docs → `client-correspondence/` (+ optional login redact)
- [ ] Phase 4e — `backups/` → `archive/` (or delete)
- [ ] Phase 4f — flatten `blog/samples/` → `blog/`
- [ ] Phase 5 — naming normalization
- [ ] Phase 6 — (optional) binary hygiene
- [ ] Final — update root `_index.md` "Where things live" tree to the new layout; `git merge` the branch

**Highest-leverage first three:** Phase 1 (#1 fixes the broken Base reference in the index), Phase 3 (makes the Base actually populate), Phase 2 (kills the verified dup logos). Those three are fast, safe, and remove the live bugs.
