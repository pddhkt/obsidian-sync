---
type: decision
area: payment
status: open
blocks: "[[subscription-products]]"
recommendation: "確認 Airwallex 香港版支唔支援 recurring billing 先,再決定 subscription add-on 用 Airwallex 定第三方"
tags:
  - decision
  - stack
  - payment
---

# Decision — Airwallex HK recurring billing support

## Question

訂閱式重複購買 (配件 / 濾芯 / 清潔劑) 需要 recurring billing。**Airwallex 香港版本支唔支援 recurring / subscription billing?** 如果唔支援,subscription add-on 要揀第三方 (e.g. Stripe Billing) 定自建排程扣款。

## Why it's open

- `subscription-products` 係 Q3 add-on (一年數據後先加),所以未 urgent。
- 但係 add-on 報價同可行性取決於呢個答案 → pitch 講之前要 confirm。

## Recommendation

先向 Airwallex 確認 HK recurring billing 能力 + 收費,再決定 architecture。未 confirm 前,subscription add-on 維持 `suggested / not-started`。

## Blocks

- [[subscription-products]] (add-on, phase 3)

## Reference

- [[checkout-airwallex]]
