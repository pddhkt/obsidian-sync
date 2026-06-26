---
type: feature
tier: base
category: conversion
funnel-stage: [consideration]
decision: suggested
status: shipped
priority: medium
phase: 1
setup-cost-hkd: 0
monthly-cost-hkd: 0
depends-on: [email-automation]
metric: "Recover lost demand on stockouts"
---

# 缺貨通知 / Back-in-stock

## 解決咩問題
- 缺貨 → 客戶走咗 → 就算翻貨都 lose 咗呢批
- 唔知客戶想等 vs 想轉買

## 點 work
- 缺貨 PDP 顯示「翻貨通知我」→ email 留低
- Admin 入貨返,觸發 email 自動發畀 waitlist
- Optional: 留低嘅人有 priority window (24hr) 訂

## 對應 funnel
- [[3-consideration]]

## Reference
- [[internal-master#5-platform-features]] §Conversion Booster Features
