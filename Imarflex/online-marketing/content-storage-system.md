---
type: marketing-process
area: storage
status: draft
tags:
  - online-marketing
  - storage
  - workflow
---

# Content Storage System

呢個 note 規定 online marketing work 應該放邊,避免 research、brief、caption、report 散落喺 chat response 或臨時文件。

## Folder map

| Folder | Purpose | Move out when |
|---|---|---|
| [[research-inbox/_readme|research-inbox]] | 未整理 raw material | 已 scoring / merged into topic |
| [[seo-research/_readme|seo-research]] | Keyword、SERP、GSC、site search、competitor research | 變成 content brief |
| [[content-briefs/_readme|content-briefs]] | Approved / candidate content briefs | 已 published |
| [[published-content/_readme|published-content]] | Published URL + performance notes | Never, this is archive |
| [[assets/_readme|assets]] | Image briefs、caption drafts、creative references | Used / archived |
| [[reports/_readme|reports]] | Weekly、monthly、quarterly reports | Never, this is archive |

## Naming convention

Use simple lowercase file names:

| Type | Pattern | Example |
|---|---|---|
| Raw research | `yyyy-mm-dd-topic-source.md` | `2026-06-03-air-fryer-whatsapp.md` |
| SEO research | `yyyy-qx-topic-keywords.md` | `2026-q3-rice-cooker-keywords.md` |
| Content brief | `topic-brief.md` | `air-fryer-shrimp-toast-brief.md` |
| Published log | `yyyy-mm-published-content.md` | `2026-06-published-content.md` |
| Report | `yyyy-mm-marketing-report.md` | `2026-06-marketing-report.md` |

## Required frontmatter

For content brief:

```yaml
---
type: content-brief
status: brief-ready
channel:
  - blog
  - instagram
  - facebook
topic:
primary-keyword:
destination:
publish-month:
tags:
  - online-marketing
---
```

For research:

```yaml
---
type: research-note
status: raw
source:
topic:
date:
tags:
  - online-marketing
  - research
---
```

## Status values

| Status | Meaning |
|---|---|
| `raw` | Captured but not reviewed |
| `researching` | Being checked |
| `scored` | Has priority score |
| `brief-ready` | Ready for production |
| `drafting` | Blog / social copy in progress |
| `scheduled` | Approved and scheduled |
| `published` | Live |
| `refresh-needed` | Existing content needs update |
| `archived` | Keep for record, no action |

## Storage rule

- If it is a raw idea, store in [[research-inbox/_readme]]
- If it has keyword / SERP evidence, store in [[seo-research/_readme]]
- If it has title, outline, CTA, and channel plan, store in [[content-briefs/_readme]]
- If it is live, log it in [[published-content/_readme]]
- If it is performance data, store in [[reports/_readme]]
- If it is image / caption / creative reference, store in [[assets/_readme]]

## Monthly cleanup

At month end:

- [ ] Move useful raw notes into SEO research or content briefs
- [ ] Archive weak / duplicate ideas
- [ ] Update published-content log
- [ ] Add performance notes to report
- [ ] Mark refresh-needed content
- [ ] Add next month candidates to [[content-calendar]]
