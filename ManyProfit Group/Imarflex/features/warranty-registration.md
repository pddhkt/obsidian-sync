---
type: feature
tier: base
category: retention
funnel-stage: [repeat]
decision: must-have
status: shipped
priority: high
phase: 1
setup-cost-hkd: 0
monthly-cost-hkd: 0
depends-on: [customer-account, email-automation]
metric: "重複率 0% → 15-20%, retention loop driver"
---

# Warranty Registration / 保養登記系統

## 解決咩問題
- 客戶買咗機冇登記 → Imarflex 完全 lose contact
- 保養到期前唔知,客戶過咗保先發現
- 無 trigger 推 cross-sell / 換新機

## 點 work
- 購買後自動發 link → 一鍵登記 (連結訂單)
- 客戶喺 `/account` 睇所有已登記機 + 保養狀態
- 到期前 30 / 7 日自動 email (升級新機 / 提醒)

## 對應 funnel
- [[5-repeat]]

## Reference
- [[internal-master#5-platform-features]]
- [[internal-master#7-customer-lifecycle]]
