---
type: feature
tier: base
category: commerce
funnel-stage: [purchase]
decision: must-have
status: shipped
priority: high
phase: 1
setup-cost-hkd: 0
monthly-cost-hkd: 0
depends-on: []
metric: "CR +20-40%, cart abandonment -15%"
---

# Checkout — Airwallex

## 解決咩問題
- 唔可以用 Shopline 嘅 hosted checkout(已換 stack)
- 香港客戶需要 FPS / AlipayHK / WeChat / 信用卡 / 分期

## 點 work
- 自建 checkout flow 喺 Next.js
- Airwallex Drop-in 處理 PCI(我哋唔接觸卡資料)
- 退款 via Airwallex API(配合 [[returns-system]])

## 🟡 Decision
- [[search-meilisearch]] 同 [[checkout-build-vs-hosted]] 等 client confirm

## 對應 funnel
- [[4-purchase]]

## Reference
- [[internal-master#5-platform-features]] §Checkout 方案
