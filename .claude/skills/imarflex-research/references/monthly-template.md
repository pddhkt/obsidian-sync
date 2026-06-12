# Monthly Business Focus — Template

Copy 由 `---` 開始去到底,新檔 save 做 `Imarflex/online-marketing/business-focus/yyyy-mm-focus.md`。

**寫嘅時候**:每個 bullet 起首要有 marker(✅ / ⚠️ / 🔒 / 💡 / 🟡 / ❌)。Marker legend 喺 SKILL.md。

> [!important]
> Monthly 同 Quarterly 唔同——以下兩個 section **必填**,唔可以省:
>
> - `## Diff from quarter focus` — 今月 IN / OUT,點解
> - `## Out of scope this month` — 今月唔做嘅嘢 + 點解
>
> 冇咗呢兩 section,後續 report 同下月 audit 都做唔到。

---

```markdown
---
type: business-focus
period: yyyy-mm
status: active
tags:
  - online-marketing
  - planning
---

# yyyy mmm Business Focus

> [!warning] 證據程度
> ✅ 有實據:(列出今月依賴嘅實據,eg 已寫好嘅 sample blog、自家網店本月 campaign、產品線、季節事實)
> ⚠️ 未有實據:(本月實際 promo / 清貨 SKU、GSC / site search / WhatsApp 真數據)
> 標 ⚠️ 嗰啲要 confirm — 見 pre-engagement checklist。
>
> 本月 = [[yyyy-qx-focus]] 嘅落地執行。

> 季節背景:(2-3 句講本月香港季節 / 天氣 / 節日,影響邊啲 category)

## Market context(refresh from Step 0)

> 月度只更新季初 market scan 之後嘅 delta(競品 launch、viral trend、bestseller 排名變動)。如果無新變動,寫「沿用 [[yyyy-qx-focus]] 嘅 market context」,唔需要重 paste。詳細 playbook 喺 `imarflex-research/market-scan` skill。

- ✅ / ⚠️ (Delta 1,eg 競品本月新 launch + 撞 SKU)→ implication for this month
- ✅ / ⚠️ (Delta 2,eg 突發 viral topic / cultural moment)→ implication
- (若無新變動)沿用 [[yyyy-qx-focus]] 嘅 market context

## 今個月要推邊個 category?

> 排序由本月主推到 evergreen convert。每個 bullet 起首標 marker。

1. **(Category 主推)** — marker + 點解(eg 旺季啟動、先食流量)
2. **(機會位)** — marker + 理由(eg 夏天角度、接住已出 sample 推第二篇)
3. **(Evergreen convert)** — marker + 理由

## 有冇新品 / 清貨 / 高 margin SKU?

> 月度可以**沿用 quarter 嘅 hero scoring**,如有 SKU 變動(新 launch / 清貨 / 反 brand-safety signal)就 re-score;否則寫「沿用 [[yyyy-qx-focus]] hero scoring」。Scoring rubric:`references/hero-sku-rubric.md`。

### 本月 hero 狀態

- **(Category 1 hero,eg IH IRC-20IH)— 沿用 Q-x score X/18 ✅ HERO** / **重 score:新 X/18**(如有變動寫返新 reasoning)
- **(Category 2 hero)— 同上格式**
- ⚠️ 本月變動 / 新 launch / 反 brand-safety signal → 觸發 re-score

### 本月實際 push

- ✅ / 💡 (本月主推 SKU + score pass status + 一句點解)
- ✅ / 💡 入門引流 SKU
- ⚠️ 本月具體 promo / 清貨 SKU → client confirm(影響 M×I 分,可能 trigger re-score)

## 客戶最近問得最多係咩?

> Pitch stage 通常全部 ⚠️。Hired mode 應該 ✅(GSC / site search / WhatsApp log)。

- ⚠️ / ✅ (FAQ topic 1,e.g. 風扇點拆洗)
- ⚠️ / ✅ (FAQ topic 2,e.g. 電飯煲容量點揀)
- ⚠️ / ✅ (FAQ topic 3,e.g. 保養登記、配件邊度買)

## 有冇季節性需求?

- ✅ (今月季節 trigger 1)
- ✅ (今月季節 trigger 2)
- ✅ (月底節日 / 節氣)

## 內容最後要導去邊?

- (主推 category)PDP + collection
- (機會位 category)PDP
- (Evergreen SKU)PDP
- [[warranty-registration]] / [[parts-finder]]

## Diff from quarter focus

> **必填**。Reconcile 今月 vs [[yyyy-qx-focus]] 季度 thesis。

| Quarter 列嘅 category / SKU | 本月狀態 | 原因 |
|---|---|---|
| (Category A,例:風扇) | ✅ IN | 旺季啟動 |
| (Category B,例:氣炸鍋) | ✅ IN | 接住已出食譜 sample |
| (Category C,例:IH 電飯煲) | ✅ IN | Evergreen convert |
| (Category D,例:抽濕機) | ❌ OUT | 延後到 6 月雨季高峰先做 |
| (Category E,例:法國合作 mosquito killer) | ❌ OUT | 等 SKU + creative confirm |

> 如果 quarter focus 有寫嘅 item 而今月唔提,**必須**喺呢度標 OUT + 寫原因。

## Out of scope this month

> **必填**。列今月**唔做**嘅嘢 + 點解。將來 report / 下月 audit 用嚟 validate 決定。

- ❌ (例:抽濕機 cluster)— 延後到 6 月雨季高峰先做,避免太早 push 流量分散
- ❌ (例:滅蚊燈)— 等 SKU + creative confirm,本月 placeholder
- ❌ (例:暖風機 / 秋冬廚房)— 太早,8 月先 backlog
- ⚠️ (其他暫緩 item)— 原因

## 本月 content 對齊

> 用返已有 sample / 排住寫嘅 sample,對應本月 cluster。

| Cluster | 用咩 sample / brief | 動作 |
|---|---|---|
| 選購攻略 | [[buying-guide-...]] | 出街,CTA 導 (SKU) PDP |
| 保養貼士 | [[maintenance-...]] | 出街 + 拆 IG carousel |
| 食譜 | [[recipe-...]] | 出街,排第二篇 brief |
| 產品比較 / 新品 | (未有 / 排緊) | 寫 brief |

## 一句總結方向

(一句講晒今月主推 + evergreen + 已 ship 嘅 sample 點配合。)

```

---

## 寫完之後 checklist

- [ ] 每個 bullet 都有 marker
- [ ] 證據程度 banner 同 ⚠️ items 對得返
- [ ] 開頭 banner 寫咗「本月 = [[yyyy-qx-focus]] 嘅落地執行」+ 加上正確 wikilink
- [ ] **Diff from quarter focus** section 入面,quarter focus 列嘅每個 category / SKU 都有出現過(IN 或 OUT)
- [ ] **Out of scope this month** section 唔係空,每個 OUT item 都有原因
- [ ] 本月 content 對齊 table 至少 reference 一個已有 sample(避免每月由零起)
- [ ] 過 `pre-engagement-checklist.md`:⚠️ items 已列入 day-1 ask
