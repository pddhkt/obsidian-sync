---
type: feature
tier: base
category: ops
funnel-stage: []
decision: must-have
priority: high
phase: 1
setup-cost-hkd: 0
monthly-cost-hkd: 0
depends-on: []
metric: "Uptime > 99.9%, alert response < 15min"
---

# Performance Monitoring + Alerts

## 解決咩問題
- 平台 down 嗰陣冇人知,客戶投訴先發現
- 慢慢變慢冇 baseline 比較

## 點 work
- Uptime monitoring (5min checks)
- Core Web Vitals tracking
- Error tracking (Sentry-like)
- Alert channels: email + (optional) WhatsApp / Slack
- Monthly performance report (Phase 3 retainer 包)

## 對應 funnel
- 內部 ops

## Reference
- [[internal-master#5-platform-features]] §Services 層
