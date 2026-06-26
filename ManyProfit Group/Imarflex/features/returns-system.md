---
type: feature
tier: base
category: ops
funnel-stage: [repeat]
decision: suggested
status: not-started
priority: medium
phase: 1
setup-cost-hkd: 0
monthly-cost-hkd: 0
depends-on: [customer-account, checkout-airwallex]
metric: "減客服查詢, 退款自動化"
---

# Returns / 退換系統

## 解決咩問題
- 退換要打電話,客戶體驗差
- Admin 手動處理慢

## 流程
1. 客戶喺 `/account/orders` 揀訂單 → 申請退換
2. 揀原因 + 上載相
3. 通知 admin
4. Admin 喺 Payload review → approve / reject
5. Approve → 生成 RMA + email 客戶
6. 客戶寄返 → admin mark received → 自動退款 (via Airwallex API)

## 🟠 Open question
- 退換政策具體 terms 要 client confirm

## 對應 funnel
- [[5-repeat]]

## Reference
- [[internal-master#5-platform-features]]
