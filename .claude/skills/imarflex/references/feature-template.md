# Feature node template

Copy this into `Imarflex/features/<kebab-case-name>.md`:

```markdown
---
type: feature
tier: base                # base | addon
category: commerce        # commerce | conversion | retention | content | ops
funnel-stage: [purchase]  # any of: awareness, interest, consideration, purchase, repeat, advocacy
decision: must-have       # must-have | suggested | decision-needed | confirmed | declined
priority: high            # high | medium | low
phase: 1                  # 1 (build) | 2 (migration) | 3 (retainer)
setup-cost-hkd: 0
monthly-cost-hkd: 0
depends-on: []            # list of other feature filenames (no .md ext)
metric: ""                # expected business metric
---

# Feature Name (English) / 中文名

## 解決咩問題
- bullet 1
- bullet 2

## 帶嚟咩好處
- benefit 1
- benefit 2

## 點 work
short description of mechanism

## 對應 funnel
- [[N-stage-name]]

## Related
- [[other-feature-1]]
- [[other-feature-2]]

## Reference
- `reference/internal-master.md` §section
```

## Add-on extras

For `tier: addon`, also add:

```yaml
best-phase: "Q2-Q3"       # when to add
```

And inside the body, add these sections:

```markdown
## 適合幾時加
**Q2 之後** — reasoning

## 報價
- Setup: HK$X,000-Y,000
- 月費: HK$Z

## Pitch 講法
> 「短句 quote」
```

## After creating

1. Add a wikilink from `Imarflex/online-marketing/funnel/N-stage.md` (the matching stage) under the right decision section
2. If you added a dependency, ensure the dependency feature exists
3. Open `_features.base` in Obsidian to confirm the new node appears
