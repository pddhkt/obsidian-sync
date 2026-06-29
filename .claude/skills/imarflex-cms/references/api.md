# imarflex-cms — API reference

Copy-pasteable `curl` for every `/cms` endpoint group. All examples assume:

```bash
export CMS="http://localhost:8787"        # prod = https://imarflex-checkout.pddhkt.workers.dev
export TOKEN="$(cat /home/lmt/Projects/personal/imarflex-app/workers/api/.agent-api-token)"
H_AUTH="Authorization: Bearer $TOKEN"
H_CHAN="X-Channel-Id: imarflex"           # or: manyprofit
```

Both headers go on **every** request. Never print `$TOKEN`. For multipart uploads
(`/cms/media`) do **not** set `Content-Type` manually — let `curl -F` do it.

A reusable wrapper is in `cms.sh` (`cms.sh GET /cms/content-items?...`).

---

## Posts — content_items

### List (calendar range, ≤62 days)
```bash
curl -s -H "$H_AUTH" -H "$H_CHAN" \
  "$CMS/cms/content-items?from=2026-06-01&to=2026-06-30"
# → { docs:[{ ...fields, reactions:{up,down,mine}, commentCount,
#             assetFeedback:{assetCount,commentCount,up,down,latestActivityAt},
#             assets:[...], skus:[...], blogPostTitle }], blogPosts:[...] }
```

### Get one (with assets + textVersions)
```bash
curl -s -H "$H_AUTH" -H "$H_CHAN" "$CMS/cms/content-items/$ID"
# → { doc:{ ...fields, assets:[...], textVersions:[...] } }
```

### Create  → 201
```bash
curl -s -X POST -H "$H_AUTH" -H "$H_CHAN" -H "Content-Type: application/json" \
  "$CMS/cms/content-items" -d '{
    "title": "點揀電飯煲:IH、微壓、球釜",
    "description": "...",
    "aiPrompt": "...",
    "contentType": "blog",
    "direction": "buying-guide",
    "salesPurpose": "decision-confidence",
    "ctaText": "睇電飯煲系列",
    "status": "in-production",
    "scheduledDate": "2026-07-08",
    "tags": ["電飯煲","buying-guide"],
    "skuIds": []
  }'
# Required: contentType, direction (slug), scheduledDate "YYYY-MM-DD".
# Optional: title(default ""), description, aiPrompt, images:[{mediaId}],
#           tags:[], salesPurpose, ctaText, status(default "idea"), blogPostId, skuIds:[]
# → 201 { doc }
```

### Patch (any subset) / Delete
```bash
curl -s -X PATCH -H "$H_AUTH" -H "$H_CHAN" -H "Content-Type: application/json" \
  "$CMS/cms/content-items/$ID" -d '{ "status": "confirmed" }'      # → { doc }

curl -s -X DELETE -H "$H_AUTH" -H "$H_CHAN" "$CMS/cms/content-items/$ID"  # → { ok:true }
```

### Reactions (post level)
```bash
curl -s -X PUT    -H "$H_AUTH" -H "$H_CHAN" -H "Content-Type: application/json" \
  "$CMS/cms/content-items/$ID/reaction" -d '{ "reaction": 1 }'     # 1 = 👍, -1 = 👎
curl -s -X DELETE -H "$H_AUTH" -H "$H_CHAN" "$CMS/cms/content-items/$ID/reaction"
```

### Comments (post level)
```bash
curl -s            -H "$H_AUTH" -H "$H_CHAN" "$CMS/cms/content-items/$ID/comments"
curl -s -X POST    -H "$H_AUTH" -H "$H_CHAN" -H "Content-Type: application/json" \
  "$CMS/cms/content-items/$ID/comments" -d '{ "body": "標題再短啲" }'
curl -s -X DELETE  -H "$H_AUTH" -H "$H_CHAN" "$CMS/cms/content-items/$ID/comments/$COMMENT_ID"
```

---

## Images — media + versioned assets

### Upload a media file (multipart — no manual Content-Type)
```bash
curl -s -X POST -H "$H_AUTH" -H "$H_CHAN" \
  -F "file=@/path/to/poster.png" -F "alt=電飯煲對比圖" \
  "$CMS/cms/media"
# → { doc:{ id, filename, url, thumbnailUrl, previewUrl, alt, ... } }   # use doc.id as mediaId

curl -s -H "$H_AUTH" -H "$H_CHAN" "$CMS/cms/media?page=1&perPage=20&q=電飯煲"
```

### Versioned assets (preferred way to attach images)
Once an item has assets, `content_items.images` is **derived** from assets' current
versions — do NOT hand-edit `images` after that.

```bash
# Create an asset slot, optionally seeding the first version (carry the prompt-JSON!)
curl -s -X POST -H "$H_AUTH" -H "$H_CHAN" -H "Content-Type: application/json" \
  "$CMS/cms/content-items/$ID/assets" -d '{
    "slotKey": "hero",
    "label": "Hero 對比圖",
    "sortOrder": 0,
    "initialVersion": { "mediaId": "'"$MEDIA_ID"'",
      "promptJson": { "model":"gpt-image","prompt":"...","size":"1024x1024" },
      "note": "v1 codex output" }
  }'   # → { doc }

# Push a NEW version of an existing asset (setCurrent defaults true)
curl -s -X POST -H "$H_AUTH" -H "$H_CHAN" -H "Content-Type: application/json" \
  "$CMS/cms/content-items/$ID/assets/$ASSET_ID/versions" -d '{
    "mediaId": "'"$MEDIA_ID2"'",
    "promptJson": { "prompt":"...revised..." },
    "note": "addressed feedback: 字太細",
    "setCurrent": true
  }'   # → { doc:version, asset }

# Pick the winning variant as current
curl -s -X PUT -H "$H_AUTH" -H "$H_CHAN" -H "Content-Type: application/json" \
  "$CMS/cms/content-items/$ID/assets/$ASSET_ID/current" -d '{ "versionId": "'"$VERSION_ID"'" }'
# → { doc }

# List / patch / delete assets
curl -s           -H "$H_AUTH" -H "$H_CHAN" "$CMS/cms/content-items/$ID/assets"
curl -s -X PATCH  -H "$H_AUTH" -H "$H_CHAN" -H "Content-Type: application/json" \
  "$CMS/cms/content-items/$ID/assets/$ASSET_ID" -d '{ "label": "新標題" }'
curl -s -X DELETE -H "$H_AUTH" -H "$H_CHAN" "$CMS/cms/content-items/$ID/assets/$ASSET_ID"

# Per-image-variant reactions + comments (this is the per-image review loop)
curl -s -X PUT    -H "$H_AUTH" -H "$H_CHAN" -H "Content-Type: application/json" \
  "$CMS/cms/content-items/$ID/assets/$ASSET_ID/reaction" -d '{ "reaction": 1 }'
curl -s -X DELETE -H "$H_AUTH" -H "$H_CHAN" "$CMS/cms/content-items/$ID/assets/$ASSET_ID/reaction"
curl -s           -H "$H_AUTH" -H "$H_CHAN" "$CMS/cms/content-items/$ID/assets/$ASSET_ID/comments"
curl -s -X POST   -H "$H_AUTH" -H "$H_CHAN" -H "Content-Type: application/json" \
  "$CMS/cms/content-items/$ID/assets/$ASSET_ID/comments" -d '{ "body":"呢個 variant 好啲","versionId":"'"$VERSION_ID"'" }'
```

---

## Templates — content_patterns

```bash
curl -s          -H "$H_AUTH" -H "$H_CHAN" "$CMS/cms/content-patterns"
curl -s          -H "$H_AUTH" -H "$H_CHAN" "$CMS/cms/content-patterns/$PATTERN_ID"

curl -s -X POST  -H "$H_AUTH" -H "$H_CHAN" -H "Content-Type: application/json" \
  "$CMS/cms/content-patterns" -d '{
    "name": "Standard month",
    "description": "4 blog + IG/FB cadence",
    "slots": [
      { "week":1, "weekday":2, "contentType":"blog",        "direction":"buying-guide", "status":"reserved", "title":"" },
      { "week":1, "weekday":4, "contentType":"ig-carousel", "direction":"comparison",   "status":"idea" }
    ],
    "sortOrder": 0
  }'
# slots[].week 1-4, weekday 1-7, status idea|reserved

curl -s -X PATCH  -H "$H_AUTH" -H "$H_CHAN" -H "Content-Type: application/json" \
  "$CMS/cms/content-patterns/$PATTERN_ID" -d '{ "name":"..." }'
curl -s -X DELETE -H "$H_AUTH" -H "$H_CHAN" "$CMS/cms/content-patterns/$PATTERN_ID"

# Bulk-create a month of placeholder items from a pattern
curl -s -X POST   -H "$H_AUTH" -H "$H_CHAN" -H "Content-Type: application/json" \
  "$CMS/cms/content-patterns/$PATTERN_ID/apply" -d '{ "month":"2026-07" }'
# → { created, replaced, docs }
```

> The built-in **"Festival Events"** system pattern is read-only.

---

## Categories — post directions (runtime-editable)

```bash
curl -s -H "$H_AUTH" -H "$H_CHAN" "$CMS/cms/content-categories?active=1"
# → { docs:[{ id(slug), labelTc, labelEn, color, sortOrder, active }] }
curl -s -H "$H_AUTH" -H "$H_CHAN" "$CMS/cms/content-categories/$SLUG"

# Create (slug must be kebab-case; 409 on dup) → 201
curl -s -X POST -H "$H_AUTH" -H "$H_CHAN" -H "Content-Type: application/json" \
  "$CMS/cms/content-categories" -d '{
    "slug":"gift-guide", "labelTc":"送禮指南", "labelEn":"Gift Guide",
    "color":"#C77", "sortOrder":9, "active":true
  }'

# Patch (slug immutable)
curl -s -X PATCH  -H "$H_AUTH" -H "$H_CHAN" -H "Content-Type: application/json" \
  "$CMS/cms/content-categories/$SLUG" -d '{ "labelEn":"Gifting", "active":false }'

# Delete → { ok:true } if unused, else { softDeleted:true, inUse:n }
curl -s -X DELETE -H "$H_AUTH" -H "$H_CHAN" "$CMS/cms/content-categories/$SLUG"
```

**Always fetch this list before assigning `direction` on a new post** — slugs are
runtime-managed in the admin "Content categories" screen, not hardcoded.

---

## Text versions — post text history

```bash
curl -s -H "$H_AUTH" -H "$H_CHAN" "$CMS/cms/content-items/$ID/text-versions"
# → { docs:[{ id, versionNumber, title, description, aiPrompt, ctaText, note,
#             createdBy, createdByName, createdAt }] }

# Snapshot — omit fields to snapshot the CURRENT live row (do this BEFORE editing copy)
curl -s -X POST -H "$H_AUTH" -H "$H_CHAN" -H "Content-Type: application/json" \
  "$CMS/cms/content-items/$ID/text-versions" -d '{ "note":"before round-2 edit" }'

# Restore a prior version (copies fields back; auto-snapshots pre-restore state → reversible)
curl -s -X POST -H "$H_AUTH" -H "$H_CHAN" \
  "$CMS/cms/content-items/$ID/text-versions/$VERSION_ID/restore"   # → { doc }
```

---

## Blog publish — blog-type items

```bash
# publishedAt in the PAST = live; in the FUTURE = draft
curl -s -X POST -H "$H_AUTH" -H "$H_CHAN" -H "Content-Type: application/json" \
  "$CMS/cms/blog-posts" -d '{
    "handle": "how-to-choose-rice-cooker",
    "title": "點揀電飯煲:IH、微壓、球釜一篇講清楚",
    "body": "<full html/markdown body>",
    "excerpt": "...",
    "heroImageId": "'"$MEDIA_ID"'",
    "publishedAt": "2026-07-08T09:00:00Z",
    "seoTitle": "...", "seoDescription": "..."
  }'
# → { doc }

# Link the blog post back to the calendar item, then mark published
curl -s -X PATCH -H "$H_AUTH" -H "$H_CHAN" -H "Content-Type: application/json" \
  "$CMS/cms/content-items/$ID" -d '{ "blogPostId":"'"$BLOG_POST_ID"'", "status":"published" }'
```
