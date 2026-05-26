---
type: folder-readme
area: business-focus
status: active
tags:
  - online-marketing
  - planning
---

# Business Focus

放每月 / 每季 research 前定低嘅方向。呢度係 [[topic-research-workflow]] **Step 1「先定 business focus」嘅輸出位**。

> [!important]
> 同 [[reports/_readme|reports]] 分清楚:
> - **business-focus = 向前定方向**(research / scoring 之前)
> - **reports = 向後檢討**(performance review,事後)

## What goes here

- 今季最重要嘅 category / SKU priority
- 今個月要推咩、季節性需求
- 內容最後要導去邊(PDP / collection / WhatsApp / warranty / parts finder）

## 點用

1. 每月 / 每季 research 之前,開一個 focus 檔,答晒下面 template 啲問題。
2. Research 同 topic scoring(workflow Step 4)嗰陣,用呢個方向對返「Business relevance」分數。
3. Period 完咗就 `status: archived`,留低做紀錄,睇返每季方向點變。

## Naming convention

| Type | Pattern | Example |
|---|---|---|
| Quarter focus | `yyyy-qx-focus.md` | `2026-q2-focus.md` |
| Month focus | `yyyy-mm-focus.md` | `2026-05-focus.md` |

## Template

```markdown
---
type: business-focus
period: 2026-Q2
status: active
tags:
  - online-marketing
  - planning
---

# 2026 Q2 / May Business Focus

## 今季 / 今個月要推邊個 category?
- (例:電飯煲、氣炸鍋、風扇)

## 有冇新品 / 清貨 / 高 margin SKU?
- (例:IRC-20IH、IAF 系列)

## 客戶最近問得最多係咩?
- (例:保養、配件、容量、清潔)

## 有冇季節性需求?
- (例:夏天風扇、農曆年前廚房電器)

## 內容最後要導去邊?
- (例:PDP、collection、WhatsApp、warranty、parts finder)

## 一句總結方向
-
```
