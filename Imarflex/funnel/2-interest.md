---
type: funnel-stage
order: 2
iframe-url: /
expected-impact: "Bounce -20%, session +40%"
---

# 2. 興趣 / Interest

**URL in demo:** `/`
**KPI 預期:** Bounce -20%、Session +40%

## Position in funnel

```mermaid
flowchart LR
    A[1.認知<br/>Awareness] --> B[2.興趣<br/>Interest]:::current
    B --> C[3.考慮<br/>Consideration]
    C --> D[4.購買<br/>Purchase]
    D --> E[5.重複<br/>Repeat]
    E --> F[6.倡導<br/>Advocacy]
    F -.->|loop| A
    classDef current fill:#fde68a,stroke:#d97706,stroke-width:3px,color:#000
```

## 我哋整咗咩
視覺一致、heritage、bento layout、homepage、品牌設計系統

## 對應 features

### 🔒 Must-have
- [[posthog-analytics]] — bounce / session metric
- [[accessibility]] — 影響第一印象

### 💡 Suggested
- [[first-visit-popup]] — email capture + 首單折扣 (鼓勵 stay)

### 🟡 Decisions
- [[search-meilisearch]] — 搜尋體驗影響興趣轉化

## Reference
- [[internal-master#2-funnel-section]]
- [[internal-master#10-brand-guidelines]]
