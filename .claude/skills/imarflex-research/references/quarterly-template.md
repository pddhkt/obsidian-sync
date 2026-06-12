# Quarterly Business Focus — Template

Copy 由 `---` 開始去到底,新檔 save 做 `Imarflex/online-marketing/business-focus/yyyy-qx-focus.md`。

**寫嘅時候**:每個 bullet 起首要有 marker(✅ / ⚠️ / 🔒 / 💡 / 🟡 / ❌)。Marker legend 喺 SKILL.md。

---

```markdown
---
type: business-focus
period: yyyy-Qx
status: active
tags:
  - online-marketing
  - planning
---

# yyyy Qx Business Focus

> [!warning] 證據程度
> ✅ 有實據:(列出今季依賴嘅實據,eg 自家網店 promo snapshot、產品線、季節事實、已 publish 嘅 sample blog)
> ⚠️ 未有實據:(列出未拎到但會用嘅 data source,eg GSC query、site search、WhatsApp log、實際 margin / 庫存 / 清貨 SKU)
> 標 ⚠️ 嗰啲要用真數據 confirm — 見 pre-engagement checklist。

> 季節背景:(2-3 句講 Qx 香港季節 / 天氣 / 節日 arc,影響邊啲 category)

## Market context(Step 0 output)

> 5-10 條 bullet,每條:marker + source + finding → implication。詳細 source playbook 同 cadence 喺 `imarflex-research/market-scan` skill。所有 source 公開,pitch stage 可以做晒。Paste 自 `business-focus/yyyy-qx-market-scan.md`(由 `imarflex-market-scout` agent 出)。

- ✅ / ⚠️ (Google Trends HK,eg「水冷扇」過去 12 個月升 X%)→ implication for category bet
- ✅ / ⚠️ (HKTVmall / 豐澤 bestseller,eg 連續 8 週嘅 sub-category leader)→ implication
- ✅ / ⚠️ (競品新品 / launch,eg Panasonic / Toshiba 月度 SKU diff)→ implication
- ✅ / ⚠️ (小紅書 / 抖音 cluster,eg「香港細廚房家電」)→ implication
- ✅ / ⚠️ (HK media editorial / Amazon JP / TW leading indicator) → implication
- ⚠️ (未 validate 嘅 signal,留落季中 / 下季 confirm)

## 今季要推邊個 category?

> 每個 bullet 起首標 marker。 排序由主力到 evergreen。

1. **(Category 主力)** — ✅ / ⚠️ marker + 點解係主力(季節 / promo / 流量 signal)
2. **(次主力)** — marker + 理由
3. **(機會位)** — marker + 理由
4. **(Evergreen)** — marker + 理由(全年高 intent、用嚟做穩定 convert)

## 有冇新品 / 清貨 / 高 margin SKU?

> 每個 hero candidate 必須先過 6-dim scoring(`references/hero-sku-rubric.md`)。只有 ≥ 15/18 + 無 DQ 入 hero;11-14 secondary;≤ 10 唔 push。

### Hero scoring per category

#### (Category 1,eg IH 電飯煲)
- **(SKU A,eg IRC-20IH)— X/18 ✅ HERO / Secondary / DQ** — M×I ⚠️X / Demand X / Diff X / Content X / DTC X / Brand X — 一句 reasoning
- **(SKU B,eg 降糖 IH 一般)— X/18 / DQ** — 同上格式 + 一句 reasoning

#### (Category 2,eg 風扇)
- **(SKU C)— X/18** — score breakdown + reasoning
- **(❌ SKU D)— DQ** — 邊軸 1 分 + reason(eg Brand safety 1 — LIHKG signal)

### SKU 角色(經 scoring 之後嘅最終 hero subsection)

- **旗艦 / 高 margin hero:** (score ≥ 15 嘅 SKU + marker)
- **Health / hero angle:** (score ≥ 15 嘅 SKU + marker;如冇,寫「本季冇 health hero candidate pass rubric」)
- **入門引流:** (secondary 11-14 SKU + marker)
- ⚠️ 季尾清貨 SKU、實際 margin 排序、庫存 → 等 client confirm(直接影響 M×I scoring)

## 客戶最近問得最多係咩?

> Pitch stage 通常全部 ⚠️(用 workflow 通用 FAQ + 品類推斷)。Hired mode 應該 ✅(GSC / site search / WhatsApp log)。

- ⚠️ / ✅ (保養 / 2 年保養點登記 → [[warranty-registration]])
- ⚠️ / ✅ (配件 / 零件邊度買 → [[parts-finder]])
- ⚠️ / ✅ (容量點揀)
- ⚠️ / ✅ (清潔 / 點拆洗)

## 有冇季節性需求?

> 列出今季每個月嘅季節 trigger,同提前 6-8 週要鋪嘅 backlog。

- **(Month range):** (Season trigger + category)
- **(Month range):** ...
- **提前 6-8 週鋪 backlog:** (下季要準備嘅 category)

## DTC moat / 差異化點

> 用嚟避免同 Fortress / HKTVmall / 百老匯 等 retail channel 打價格戰。

- 🔒 / ✅ 2 年保養登記([[warranty-registration]])
- 🔒 / ✅ Parts finder([[parts-finder]])
- ✅ WhatsApp 高 intent 查詢 / 報價
- 💡 (其他今季想 push 嘅 DTC angle,eg 降糖 IH 健康定位)

## 內容最後要導去邊?

- (Category 1)PDP + collection page
- (SKU)PDP
- [[warranty-registration]]
- [[parts-finder]]
- WhatsApp(高 intent 查詢 / 報價)

## 一句總結方向

(一句講晒今季 thesis:主力 + evergreen + DTC moat。)

```

---

## 寫完之後 checklist

- [ ] 每個 bullet 都有 marker
- [ ] 證據程度 banner 同 ⚠️ items 對得返(banner 列嘅每個 ⚠️ source 都要喺正文出現過)
- [ ] DTC moat section 出現過 [[warranty-registration]] + [[parts-finder]]
- [ ] 過 `pre-engagement-checklist.md`:⚠️ items 已列入 day-1 ask
- [ ] 一句總結方向收得返晒主力 + evergreen + DTC moat 三件事
