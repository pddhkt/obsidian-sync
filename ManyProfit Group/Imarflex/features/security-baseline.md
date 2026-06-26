---
type: feature
tier: base
category: ops
funnel-stage: []
decision: must-have
status: in-progress
priority: high
phase: 1
setup-cost-hkd: 0
monthly-cost-hkd: 0
depends-on: []
metric: "0 security incidents, PCI offloaded to Airwallex"
---

# Security Baseline

## 解決咩問題
- E-commerce 係 high-target,attack 必然
- PCI compliance 自己做太貴 → offload Airwallex

## 點 work
- HTTPS everywhere (Vercel cert auto)
- DDoS protection (Cloudflare front)
- Rate limiting (API + auth endpoints)
- Session security (httpOnly, sameSite, rotation)
- 卡資料完全唔接觸 (Airwallex Drop-in handles PCI)
- Regular dep audit (Phase 3 retainer)

## 對應 funnel
- 內部 ops

## Reference
- [[internal-master#5-platform-features]] §Services 層
