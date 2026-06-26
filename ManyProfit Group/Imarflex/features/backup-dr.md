---
type: feature
tier: base
category: ops
funnel-stage: []
decision: must-have
status: n-a
priority: high
phase: 1
setup-cost-hkd: 0
monthly-cost-hkd: 0
depends-on: []
metric: "RPO 24hr, RTO 4hr"
---

# Backup + Disaster Recovery

## 解決咩問題
- 數據丟失 / 平台 down → 完全 catastrophic
- Shopline 嗰邊我哋唔擁有 data

## 點 work
- Postgres 每日 automated backup → S3-compatible storage
- Media (R2) versioning
- 月度 restore test (validate backup 唔係 silent corrupt)
- Documented runbook (邊個按咩 button 復原)

## 對應 funnel
- 內部 ops (唔對應客戶 funnel)

## Reference
- [[internal-master#5-platform-features]] §Services 層
