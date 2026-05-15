---
type: feature
tier: base
category: retention
funnel-stage: [purchase, repeat]
decision: must-have
status: not-started
priority: medium
phase: 1
setup-cost-hkd: 0
monthly-cost-hkd: 0
depends-on: [customer-account]
metric: "減客服查詢量"
---

# 訂單通知中心 / Order Notification Center

## 解決咩問題
- 客戶要打電話 / email 問訂單狀態 → 客服負擔重
- 訂單 status update 客戶唔知

## 點 work
- `/account/orders` self-service 查 status
- Email + (optional) WhatsApp 自動發 status change
- Admin 入後台 mark shipped → 自動觸發

## 對應 funnel
- [[4-purchase]]
- [[5-repeat]]

## Reference
- [[internal-master#5-platform-features]] §Conversion Booster Features
