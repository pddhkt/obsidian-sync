---
type: feature
tier: base
category: conversion
funnel-stage: [consideration, purchase]
decision: suggested
status: shipped
priority: high
phase: 1
setup-cost-hkd: 0
monthly-cost-hkd: 0
depends-on: []
metric: "Conversion uplift via scarcity + clarity"
---

# 庫存狀態顯示 / Stock Status

## 解決咩問題
- 客戶唔知有冇貨 → 猶豫 → 走
- 「剩 X 件」嘅 scarcity 效應 capture 唔到

## 點 work
- PDP 顯示: 現貨 / 剩 X 件 / 缺貨
- 缺貨自動顯示 [[back-in-stock-notify]] CTA
- Admin Payload 入面設 threshold (低過幾多顯示「剩 X 件」)

## 對應 funnel
- [[3-consideration]]
- [[4-purchase]]

## Reference
- [[internal-master#5-platform-features]] §Conversion Booster Features
