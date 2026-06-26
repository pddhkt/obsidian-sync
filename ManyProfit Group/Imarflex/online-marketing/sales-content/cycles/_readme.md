---
type: folder-readme
area: sales-content-cycles
status: active
tags:
  - online-marketing
  - sales-content
  - cycles
---

# Content Cycles

One folder per **monthly production cycle** (`yyyy-mm/`). A cycle is the unit we plan, produce, ship, and review together — so everything that belongs to one month lives (or is linked) in one place, and old months archive cleanly as a whole folder.

> [!info] Folders = lifecycle, frontmatter = views
> Platform (IG / FB / blog) and week are **frontmatter fields**, not folders. [[../../_sales-content.base|the Base]] gives the per-platform and per-status views across all cycles — you never need to duplicate that dimension with folders. The folder only answers "which month does this belong to".

## Anatomy of a cycle folder

| File | Purpose | When |
|---|---|---|
| `_overview.md` | **The one-page period overview**: focus, shipments table, per-platform results, findings | Created at cycle start, completed at review |
| `social-post-plan-yyyy-mm.md` | The IG / FB / blog schedule for the month | Planning |
| `production-volume-targets-yyyy-mm.md` | Required counts (signals, topics, posts, ad candidates) | Planning |
| `production-timeline-gantt-yyyy-mm.md` | Production timeline | Planning (optional) |
| `posts/` | One record per content item (campaign bundles + individual posts) | Production |
| `kits/` | Shipment kits — full multi-channel drops (blog + IG + FB + Reel + Story + image prompts) | Production (2026-07 kits still live in [[../go-live-kits/_readme|go-live-kits]]; new kits go here) |

Findings with a longer shelf life still go to their stage folders — raw signals to `research-inbox`, keyword evidence to `seo-research`, the month review to `reports` — but `_overview.md` must **link** to all of them so the cycle reads as one story.

## Post records (`posts/`)

One Markdown note per content item. These notes power [[../../_sales-content.base]].

### Status values

| Status | Meaning |
|---|---|
| idea | Captured, not approved |
| planned | Approved for a week/month |
| drafting | Being produced |
| draft-ready | Content exists but is not published |
| scheduled | Scheduled to publish |
| published | Live post |
| archived | No longer active |

### Required frontmatter

- `type: sales-content-post`
- `content-level`: `campaign` or `social-post`
- `status`
- `publish-month`
- `publish-week`
- `channel`
- `format`
- `topic-type`
- `sales-purpose`
- `product-category`
- `destination`
- `primary-cta`
- `ad-support`

### Naming

Filenames stay **dated and globally unique** (never `plan.md` / `post-1.md`) so basename wikilinks keep resolving if a file ever moves.

| Level | Pattern | Example |
|---|---|---|
| Campaign bundle | `yyyy-mm-wx-short-topic.md` | `2026-06-w1-rice-cooker-capacity.md` |
| Individual post | `yyyy-mm-dd-channel-short-topic.md` | `2026-06-12-ig-rice-capacity-table.md` |

## Where generated content lives

Cycle folders stay **text-only**. Binaries go to their owner:

- SKU-evergreen renders (reusable product shots) → `../../products/<sku>/images/generated/`
- Campaign-specific creative → `../../assets/<yyyy-mm>-<campaign>/` (e.g. `assets/2026-07-go-live-kits/`)
- Blog drafts + illustrations → `../../blog/samples/`

The cycle `_overview.md` links to the asset folders used that month.

## Starting a new cycle

1. Copy the structure of the latest `yyyy-mm/` folder (or just create `_overview.md` from the headings in an existing one).
2. Pick the cycle focus from [[../../business-focus/_readme|business-focus]].
3. Write the post plan + targets, create post records from [[../_system/post-card-template|post-card-template]].
4. At month end: fill `_overview.md` results, write the review in `../../reports/`, run the cleanup checklist in [[../../content-storage-system]].
