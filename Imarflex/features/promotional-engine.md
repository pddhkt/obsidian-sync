---
type: feature
tier: base
category: conversion
funnel-stage: [purchase]
decision: suggested
priority: high
phase: 1
setup-cost-hkd: 0
monthly-cost-hkd: 0
depends-on: []
metric: "Q4 旺季必需, AOV uplift"
---

# Promotional Engine / 促銷引擎

## 解決咩問題
- 限時 / 滿減 / 會員價要動態管理
- Shopline 嘅 promo 設定限制多

## 點 work
- Admin 喺 Payload 開 promo rule:
  - 限時 (date range)
  - 滿減 ($X off when cart > $Y)
  - 會員專屬 (configured by [[loyalty-system]] tier)
  - 折扣 code
- Cart 自動 apply 最優惠 (避免 stack)
- Email 嗌客戶 + homepage banner 自動同步

## 對應 funnel
- [[4-purchase]]

## Reference
- [[internal-master#5-platform-features]] §Conversion Booster Features
