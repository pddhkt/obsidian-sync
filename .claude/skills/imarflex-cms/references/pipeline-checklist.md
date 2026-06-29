# imarflex-cms — per-batch pipeline checklist

Run this when turning a batch of approved briefs into calendar posts and carrying them
through review → delivery. Maps 1:1 to the 7 stages in [[cms-content-pipeline]].

## Pre-flight (once per session)

- [ ] `CMS` set (local `http://localhost:8787`, or prod `https://imarflex-checkout.pddhkt.workers.dev`).
- [ ] `TOKEN` loaded from `imarflex-app/workers/api/.agent-api-token` (never printed/committed).
- [ ] `X-Channel-Id` correct: `imarflex` vs `manyprofit`.
- [ ] `GET /cms/content-categories?active=1` → cache the live `direction` slugs (don't hardcode).
- [ ] No LIHKG / Reddit / 論壇 sentiment in any copy that will become a post.

## Stage 1-2 — Research + Draft (vault, not CMS)

- [ ] Brief exists (via [[topic-research-workflow]] + `imarflex-research`, SEO via Ahrefs).
- [ ] Copy drafted with `imarflex-copywriter` conventions.
- [ ] Images generated (`imarflex-gpt-image-posters` / `codex-image-workflow`); **md5-dedup** parallel output, regenerate collisions.

## Stage 3 — Upload

- [ ] `POST /cms/content-items` with `status:"in-production"`, valid `contentType` + `direction` slug + `scheduledDate`.
- [ ] `POST /cms/media` for each image (multipart, no manual Content-Type) → keep each `doc.id`.
- [ ] `POST …/assets` per slot, with `initialVersion.promptJson` = the generation prompt-JSON.
- [ ] Did NOT hand-edit `content_items.images` (it's derived from asset current versions).

## Stage 4 — Review (read it back)

- [ ] `GET /cms/content-items?from=&to=` → scan `reactions`, `commentCount`, `assetFeedback`.
- [ ] For flagged items: `GET …/comments` + `GET …/assets/:assetId/comments` to read per-image notes.

## Stage 5 — Iterate

- [ ] **Snapshot text first**: `POST …/text-versions` (omit fields → snapshots live row).
- [ ] `PATCH /cms/content-items/:id` with revised copy.
- [ ] `POST …/assets/:assetId/versions` for new image variants (carry new `promptJson`).
- [ ] (If a revision went wrong: `POST …/text-versions/:versionId/restore` — reversible.)

## Stage 6 — Finalize

- [ ] `PUT …/assets/:assetId/current { versionId }` for each slot's winning variant.
- [ ] `PATCH /cms/content-items/:id { status:"confirmed" }` (Jack has signed off).

## Stage 7 — Deliver

- [ ] **blog** → `POST /cms/blog-posts` (publishedAt past = live) → `PATCH …/:id { blogPostId, status:"published" }`.
- [ ] **IG / FB** → export approved copy + assets → post **MANUALLY** → `PATCH …/:id { status:"published" }`.
- [ ] ⚠️ Reminder: there is **no automated social posting**. `published` on an IG/FB item only records that a human posted it.

## Enum cheat-sheet

```
status        idea → reserved → in-production → confirmed → published
contentType   ig-carousel | ig-reel | ig-story | fb-link | blog
salesPurpose  decision-confidence | direct-purchase | lead-capture | trust-reduction | discovery-retention
reaction      1 = 👍   -1 = 👎
direction     RUNTIME — GET /cms/content-categories. Default 8:
              buying-guide · product-showcase · pain-point · comparison ·
              recipe-use-case · care-maintenance · trust-service · festival-seasonal
```

> `direction` slugs are NOT a fixed enum — they live in the admin "Content categories"
> screen and change at runtime. Fetch `GET /cms/content-categories` every batch; a slug
> you remember may be renamed, deactivated, or newly added.
