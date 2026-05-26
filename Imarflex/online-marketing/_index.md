---
type: marketing-index
project: Imarflex 伊瑪牌
status: draft
owner: marketing
tags:
  - online-marketing
  - seo
  - content
---

# Online Marketing 工作區

呢個 folder 用嚟將 SEO research、topic planning、blog、Instagram、Facebook、report 同已收集資料變成一個可持續運作嘅系統。

> [!info]
> [[../features/seo-content-pack|SEO 內容套件]] 負責「揀咩 topic 值得做」,[[../features/content-production|內容製作]] 負責「將 topic 寫成 blog / PDP / social caption」。呢個 folder 係兩者之間嘅工作區。

## Folder 目的

- 收集市場、客戶、搜尋、競爭對手資料
- 將資料整理成 keyword / topic / content brief
- 排定 blog、Instagram、Facebook 發佈節奏
- 儲存每次 research、brief、published content、asset、report
- 方便之後追蹤邊啲 topic 有 SEO / social / business value

## 工作流程

```mermaid
flowchart LR
    A[Gather signals] --> B[Topic research]
    B --> C[SEO keyword mapping]
    C --> D[Content brief]
    D --> E[Blog / IG / FB production]
    E --> F[Publish]
    F --> G[Report + refresh backlog]
    G --> B
```

## 核心文件

| 文件 | 用途 | 何時使用 |
|---|---|---|
| [[topic-research-workflow]] | 教點樣收集 topic 資料 | 每週 gather idea / 每次開新 topic |
| [[seo-keyword-research]] | 教點樣為 topic 做 SEO | 每個 topic 變成 blog 前 |
| [[content-calendar]] | 安排 research、writing、social posting | 每週 / 每月 planning |
| [[channel-production-workflow]] | 一個 topic 拆成 blog、IG、FB | 寫作同排程前 |
| [[content-storage-system]] | 規定資料放邊、點命名 | 每次收集或輸出內容時 |

## Storage folders

| Folder | 放咩 | 例子 |
|---|---|---|
| [[business-focus/_readme|business-focus]] | 每月 / 每季方向(research 前定) | `2026-q2-focus.md`、`2026-05-focus.md` |
| [[research-inbox/_readme|research-inbox]] | 未整理資料 | 客戶問題、competitor link、SERP screenshot note |
| [[seo-research/_readme|seo-research]] | Keyword、SERP、GSC、site search 整理 | `2026-Q3-air-fryer-keywords.md` |
| [[content-briefs/_readme|content-briefs]] | 已決定要做嘅 topic brief | `air-fryer-shrimp-toast-brief.md` |
| [[published-content/_readme|published-content]] | 已發佈內容紀錄 | Blog URL、IG post、FB post |
| [[assets/_readme|assets]] | 圖片、caption draft、creative reference | Blog image brief、carousel copy |
| [[reports/_readme|reports]] | Weekly / monthly / quarterly review | GSC review、social report |

## Operating cadence

| 節奏 | 要做咩 | 輸出 |
|---|---|---|
| Monthly / Quarterly | research 前定 business focus | [[business-focus/_readme|business-focus]] note |
| Weekly | 收集 customer / search / competitor signals | 5-10 個 raw topic notes |
| Weekly | 排下週 blog / IG / FB | 1 個 weekly content plan |
| Monthly | 選 4-8 個 priority topics | Content calendar + briefs |
| Monthly | 檢查 blog / social 表現 | Monthly report |
| Quarterly | SEO keyword research + content gap | Next-quarter SEO roadmap |

## Recommended weekly rhythm

| Day | Work | Folder |
|---|---|---|
| Monday | Gather SEO / customer / competitor signals | [[research-inbox/_readme]] |
| Tuesday | 做 keyword + SERP review | [[seo-research/_readme]] |
| Wednesday | 寫 blog brief + social angle | [[content-briefs/_readme]] |
| Thursday | Production: blog draft、IG carousel、FB post | [[assets/_readme]] |
| Friday | Publish / schedule / review last week | [[published-content/_readme]], [[reports/_readme]] |

## Related vault notes

- [[../features/seo-content-pack]]
- [[../features/content-production]]
- [[../brand/content-blog-direction]]
- [[../brand/content-pillars]]
- [[../brand/voice-tone-of-voice]]
- [[../brand/voice-pdp-copy-framework]]
- [[../funnel/1-awareness]]
- [[../funnel/3-consideration]]
