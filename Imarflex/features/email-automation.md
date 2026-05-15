---
type: feature
tier: base
category: retention
funnel-stage: [purchase, repeat, advocacy]
decision: must-have
status: in-progress
priority: high
phase: 1
setup-cost-hkd: 0
monthly-cost-hkd: 0
depends-on: [customer-account]
metric: "LTV +50%, recovers abandoned carts"
---

# Email Lifecycle Automation (8 Triggers)

## 解決咩問題
- 棄單冇追 → 直接 lose 銷售
- 客戶買完之後完全冇 follow-up
- Cross-sell / win-back 完全冇做

## 8 個 Trigger (included in base plan)

| 觸發 | Email | 目的 |
|------|-------|------|
| 註冊帳戶 | Welcome series (3 封) | 介紹品牌、保養登記、首次折扣 |
| 棄單 1hr / 24hr / 72hr | 棄單提醒 | Recover 銷售 |
| 首次購買後 7 日 | Review request | 收 reviews |
| 首次購買後 14 日 | 相容配件推薦 | Cross-sell |
| 60 / 90 / 180 日無消費 | Win-back series | 重新激活 |
| 保養到期前 30 日 | 提醒 + 升級新機 | Cross-sell |
| 保養到期前 7 日 | 最後提醒 | 緊急感 |
| 生日 + 會員週年 | 折扣 / 獎賞 | 情感連繫 |

## 🆕 Referral Trigger
首次 review 提交後 7 日 → 邀請 referral (配合 [[referral-program]])

## Stack
- Resend + Resend Audiences (🟡 decision: vs Loops)

## 對應 funnel
- [[4-purchase]]
- [[5-repeat]]
- [[6-advocacy]]

## Reference
- [[internal-master#7-customer-lifecycle]]
