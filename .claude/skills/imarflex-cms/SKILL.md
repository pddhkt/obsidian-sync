---
name: imarflex-cms
description: Operating the imarflex-app CMS content calendar via API — create/edit posts, upload + version images, manage post categories, read review feedback (comments + 👍/👎), version/restore post text, publish blog. Use whenever you need to push Imarflex/ManyProfit marketing content into the admin panel or read what reviewers said back. Triggers on "upload to CMS", "create calendar post", "imarflex CMS", "content calendar API", "push post to admin panel", "read post feedback", "publish blog post", "content-items API", "上載到 CMS", "排 calendar post".
paths: Imarflex/online-marketing/**
allowed-tools: Read, Glob, Grep, Bash, WebFetch, Write
---

# Imarflex CMS — Content Calendar API

Operate the **imarflex-app CMS content calendar** (admin panel) over HTTP. This skill
is the API mechanics for the pipeline described in
`Imarflex/online-marketing/cms-content-pipeline.md` ([[cms-content-pipeline]]) — read
that note for the *why / who*, read this for the *how*.

Backend + admin UI are **built and verified** (bearer-token auth confirmed end to end).
Treat this as a working system.

## Auth & base URL

Every request hits `/cms` on the imarflex-app worker and needs **both** headers:

```
Authorization: Bearer <token>
X-Channel-Id: imarflex          # or: manyprofit
```

- **Token**: read it at call time from `imarflex-app/workers/api/.agent-api-token`
  (local dev: `AGENT_API_TOKEN` in `imarflex-app/workers/api/.dev.vars`).
  **Never echo, print, or commit the token value** — not into notes, logs, or files.
- **Base URL** (`$CMS`):
  - Local dev → `http://localhost:8787`
  - Production → `<PROD_CMS_ORIGIN>` ⚠️ **placeholder — must be confirmed.** It is the
    deployed imarflex-checkout worker origin that serves `/admin` + `/cms`.

Load both into env before any call (see `references/cms.sh` for a wrapper):

```bash
export CMS="http://localhost:8787"
export TOKEN="$(cat /home/lmt/Projects/personal/imarflex-app/workers/api/.agent-api-token)"
```

## Lifecycle & enums

```
status:       idea → reserved → in-production → confirmed → published
contentType:  ig-carousel | ig-reel | ig-story | fb-link | blog
salesPurpose: decision-confidence | direct-purchase | lead-capture | trust-reduction | discovery-retention
direction:    runtime-editable — ALWAYS fetch via GET /cms/content-categories, never hardcode.
              Default 8 slugs: buying-guide, product-showcase, pain-point, comparison,
              recipe-use-case, care-maintenance, trust-service, festival-seasonal
```

## 7-step pipeline runbook

Mirrors the 7 stages in [[cms-content-pipeline]]. Stages 1-2 happen in the vault
(research + draft); stages 3-7 are this skill:

1. **Research** — vault only: [[topic-research-workflow]] + `imarflex-research` skill + Ahrefs → brief.
2. **Draft** — vault only: copy via `imarflex-copywriter`; images via `imarflex-gpt-image-posters` / `codex-image-workflow` (md5-dedup parallel output).
3. **Upload** — `POST /cms/content-items` (status `in-production`) → `POST /cms/media` for each image → `POST …/assets` with `initialVersion.promptJson` (the generation prompt-JSON travels WITH the image version).
4. **Review** — Jack + client use the admin calendar UI. You read it back: `GET /cms/content-items?from=&to=` surfaces `reactions`, `commentCount`, `assetFeedback`; drill in with `GET …/comments` and `GET …/assets`.
5. **Iterate** — `POST …/text-versions` to **snapshot copy before editing** → `PATCH /cms/content-items/:id` for the new copy → `POST …/assets/:assetId/versions` to push new image variants.
6. **Finalize** — `PUT …/assets/:assetId/current { versionId }` to pick the winner → `PATCH /cms/content-items/:id { status:"confirmed" }`.
7. **Deliver** — `blog`: `POST /cms/blog-posts` then `PATCH …/:id { blogPostId, status:"published" }`. IG/FB: export approved copy + assets, post **manually**, then `PATCH …/:id { status:"published" }`.

> [!warning]
> **No automated social posting.** Only `blog` items auto-publish (to the storefront).
> IG/FB delivery is manual — the CMS only exports approved copy + assets. Setting an
> IG/FB item to `published` records that *you* posted it, it does not post for you.

## References

- `references/api.md` — copy-pasteable `curl` for every endpoint group (`$CMS` + `$TOKEN`).
- `references/pipeline-checklist.md` — per-batch checklist mapped to the 7 stages + enum cheat-sheet.
- `references/cms.sh` — tiny wrapper: `cms.sh METHOD PATH [json]` injects the auth headers.

## Standing rules

- Imarflex established **1973**.
- **LIHKG / Reddit / 論壇 sentiment is internal-only** — never upload it as client-facing post copy.
- Engagement is **pitch-stage aware** — confirm `<PROD_CMS_ORIGIN>` and that client review access is set up before treating prod calendar as live.
