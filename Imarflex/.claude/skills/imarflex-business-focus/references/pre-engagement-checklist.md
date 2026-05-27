# Pre-engagement Checklist — Upgrade ⚠️ → ✅

呢個 checklist 列出每一個喺 business-focus docs 度標 ⚠️ 嘅 data source,對應 day-1(client 簽咗之後)要 ask 啲咩。每一行嘅目標係將 ⚠️ upgrade 去 ✅。

> [!info]
> 用法:寫完一個 focus doc(quarterly / monthly)之後,過呢個 checklist。每一個 doc 入面出現過嘅 ⚠️ item,都應該對得返一行 client ask。如果對唔返,即係 marker 太籠統,要 split 開。

## Pitch-stage 現有 ⚠️ items mapping

呢度 enumerate 當前(2026-Q2 + 2026-05)兩份 focus 入面出現過嘅每個 ⚠️ source,同對應嘅 day-1 ask。

### 1. ⚠️ Google Search Console (GSC) query data

- **依賴 section:** 客戶最近問得最多係咩、有冇季節性需求
- **Day-1 ask:**
  - Add `marketing@<agency>` 做 GSC property 嘅 Restricted / Full user
  - Export 過去 12 個月 query × page CSV(預設 1000 rows / day)
  - 設 monthly auto-export(BigQuery export 或 manual download cadence)
- **Upgrade 條件:** 拎到首份 export → 將「客戶最近問得最多」、「Quick win SEO」相關 ⚠️ 改 ✅
- **Owner:** Client IT / marketing manager

### 2. ⚠️ Site search / Meilisearch logs

- **依賴 section:** 客戶最近問得最多係咩(用戶用咩字搵)
- **Day-1 ask:**
  - 確認 site search 引擎(Shopline 現有 vs 將來 Meilisearch)
  - Shopline period:出 site search top queries report(過去 90 日)
  - 將來:設 Meilisearch query logging + monthly export
- **Upgrade 條件:** 拎到 site search top queries → ⚠️ FAQ / wording → ✅
- **Owner:** Client e-commerce manager

### 3. ⚠️ WhatsApp / customer service log

- **依賴 section:** 客戶最近問得最多係咩、Topic 4 problem-led
- **Day-1 ask:**
  - Access to WhatsApp Business API archive(或 manual export 過去 90 日 chat transcripts)
  - 同 CS team 開 30 分鐘 sync,拎佢哋 top 10 重複問題清單
  - Set monthly cadence:CS team 每月 forward top 20 queries
- **Upgrade 條件:** 拎到 transcript / CS list → ⚠️ FAQ → ✅
- **Owner:** Client CS lead

### 4. ⚠️ 實際 promo / 清貨 SKU list(每月)

- **依賴 section:** 有冇新品 / 清貨 / 高 margin SKU
- **Day-1 ask:**
  - 設 monthly promo planning sync(每月 25 號定 next month)
  - Template:SKU + start / end date + 折扣 + 預期 push channel
  - Confirm 邊個 SKU 屬 hero / clear-out / cross-sell
- **Upgrade 條件:** 拎到 monthly promo sheet → monthly focus 嘅「主推 SKU」由 ⚠️ → ✅
- **Owner:** Client commercial / merchandising lead

### 5. ⚠️ Margin / 庫存數據

- **依賴 section:** 有冇新品 / 清貨 / 高 margin SKU
- **Day-1 ask:**
  - Margin tier 分級(eg High / Mid / Low,唔需要絕對數)
  - 庫存 snapshot(月頭、月中、月尾)— 至少 priority SKU
  - Access to ERP 或 monthly export
- **Upgrade 條件:** 拎到 margin tier 表 → ⚠️ 高 margin SKU → ✅
- **Owner:** Client finance / ops

### 6. ⚠️ PostHog / analytics(blog → PDP → cart path)

- **依賴 section:** Topic scoring 嘅 purchase intent、內容導去邊
- **Day-1 ask:**
  - Add agency 做 PostHog member(或設 dedicated dashboard)
  - 設定 funnel:blog → PDP → add-to-cart → checkout
  - 確保 event taxonomy(`blog_view`、`pdp_view`、`add_to_cart`)已 fire
- **Upgrade 條件:** 拎到首份 funnel 數據 → ⚠️ content path 假設 → ✅
- **Owner:** Client e-commerce / data

### 7. ⚠️ Competitor SERP / monitoring(輕度)

- **依賴 section:** Ranking chance scoring
- **Day-1 ask:**
  - 唔需要 client 提供 — agency 自己做
  - 但 client 要 confirm「主要視為 competitor」嘅 brand list(Panasonic / Rasonic / 德國寶 / Tiger / Zojirushi / etc.)
- **Upgrade 條件:** Confirm 咗 competitor list → SERP 觀察可以聚焦
- **Owner:** Agency,但要 client confirm list

### 8. ⚠️ Retailer / marketplace wording(Fortress / 豐澤 / 百老匯 / HKTVmall / 實惠)

- **依賴 section:** 內容點用 HK 用戶語言
- **Day-1 ask:**
  - 唔需要 client 提供 — agency 自己 scrape / 觀察
  - Client 要 confirm「Imarflex 真正放喺邊啲 retailer / marketplace」最新清單
- **Upgrade 條件:** Confirm channel list → wording 觀察可以對得返真實 channel
- **Owner:** Agency + client commercial confirm

### 9. ⚠️ 季尾清貨 / 季節 SKU 排序

- **依賴 section:** Quarterly focus 嘅「有冇清貨 SKU」
- **Day-1 ask:**
  - Quarterly planning sync(每季 confirm 下季 clear-out 候選)
  - 同 #4 monthly promo list 銜接
- **Upgrade 條件:** 拎到 quarterly clear-out plan → ⚠️ → ✅
- **Owner:** Client merchandising

## Output 格式建議

寫完一個 focus doc 後,可以將呢段 paste 落 client email / Slack:

```markdown
## Day-1 Asks(由 yyyy-qx-focus / yyyy-mm-focus ⚠️ items 衍生)

| Ask | Owner | Cadence | Upgrade 邊個 marker |
|---|---|---|---|
| GSC export access | (client IT) | monthly | 客戶問得最多 + ranking chance |
| Site search top queries | (e-com) | monthly | 客戶問得最多 |
| WhatsApp / CS top 20 questions | (CS lead) | monthly | FAQ + problem-led topic |
| Monthly promo / clear-out sheet | (commercial) | monthly | 主推 / 清貨 SKU |
| Margin tier 表 | (finance) | quarterly | 高 margin SKU |
| PostHog member access | (data) | one-off | Funnel / path 假設 |
| Confirm competitor list | (marketing) | one-off | Ranking chance |
| Confirm retailer / marketplace list | (commercial) | quarterly | HK wording |
| Quarterly clear-out plan | (merchandising) | quarterly | 季尾清貨 |
```

## 點樣 audit checklist coverage

每次 draft 新 focus,做以下 sanity check:

1. **Grep ⚠️ count** — 數一數個 doc 入面 ⚠️ 出現次數
2. **Map 返呢個 checklist** — 每個 ⚠️ 都應該對應到上面其中一條 ask
3. **如果對唔返** — 即係要新增一條 ask(更新呢個 checklist),或者個 marker 太籠統,要 split 開
4. **Pitch-stage doc 嘅 ⚠️ 數目應該係兩位數** — 太少證明可能過度標 ✅
5. **Hired-mode doc 嘅 ⚠️ 數目應該每月遞減** — 太多證明 client data pipeline 未 set up,要 chase
