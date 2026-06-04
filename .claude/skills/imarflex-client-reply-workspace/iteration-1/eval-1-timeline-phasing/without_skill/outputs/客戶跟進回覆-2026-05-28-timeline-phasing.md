---
type: client-reply
project: Imarflex 伊瑪牌
date: 2026-05-28
re: Timeline + Phasing — 跟進 board meeting 兩條問題
related: [[客戶報價問題回覆-2026-05-26]]
status: draft
---

# 回覆 — 2026-05-28(Timeline + Phasing)

> Hi Derek,多謝 board meeting 之後即刻同我哋同步。兩條問題逐條答清楚,連住建議方案。
> 任何一條想開會 walk-through,話聲就安排(office / Zoom / Teams 都得)。

---

## Q1)11 月之前上線 — 時間夠唔夠?critical milestones 係咩?

**夠 —— 而且仲有 buffer。** 報價單入面 Phase 1 + Phase 2 合共需時 **7–10 週**(Phase 1 設計 / 開發 5–7 週 + Phase 2 遷移 / 上線 2–3 週)。

由今日(2026-05-28)起到 11 月初,大約有 **22 週空間**,扣埋 buffer / 假期 / 客戶內部 review 時間都好充裕。

### 兩個推薦上線時間

| 方案                        | Kickoff 截止        | 預計上線         | Buffer            |
| ------------------------- | ---------------- | ------------ | ----------------- |
| **Comfortable**(建議)       | 2026-07-01 前確認落實 | 2026-09 月中   | 約 6–7 週 buffer    |
| **With marketing runway** | 2026-06-15 前確認落實 | 2026-08 月底   | 10 月可以做 pre-launch 推廣 |

> 如果 Imarflex 想 **趕住喺 10 月做 pre-launch 推廣**(例如新網站上線預告、會員回贈、reactivation email),建議用 **第二個方案** —— 8 月底上線,留 2 個月 warm up 流量同 SEO indexing,11 月旺季就食到 organic traffic。

### Critical milestones — Imarflex 要配合嘅 4 個 checkpoint

我哋 dev 嘅部分自己 own,但有 4 個位置**一定要 Imarflex 同事配合**,如果其中一個 slip,後面就會壓住:

| #   | Milestone                       | Imarflex 要交嘅嘢                                              | 預計時間        | 如果遲咗會點         |
| --- | ------------------------------- | --------------------------------------------------------- | ----------- | -------------- |
| M1  | **Kickoff + 啟動素材**(Week 0)     | 8 項啟動素材:logo / brand 檔、產品清單 + spec、產品相、Shopline export、domain DNS 管理權、Airwallex 開戶資料、聯絡人名單、payment / 退換政策文件 | 簽合約後 1 週內   | 直接拖慢 Phase 1 開始 |
| M2  | **設計稿確認**(Week 2–3)            | 同事(包括 Derek + 操作 / sales lead)睇設計稿、出 feedback、最後 sign-off | 收稿後 5–7 個工作天 | 拖一週 = launch 拖一週 |
| M3  | **內容 review + UAT**(Week 6–8)  | 操作同事入後台試流程(訂單、上架、改 PDP、寫 blog),揾 bug、確認文案 / 規格 / 價錢正確    | 約 2 週,每日 1–2 小時 | UAT 唔做齊,launch 後出事 |
| M4  | **Shopline cut-over 決定**(Week 8–10) | 揀 Option A(並行)定 Option B(直接取代),確認 Shopline 合約完約日 + 切換窗口  | Launch 前 2 週敲定 | 影響 301 + DNS 切換時機 |

### 你哋呢邊建議而家就 lock 嘅嘢

1. **board approval + 簽合約嘅 deadline** —— 揀邊個方案(comfortable / with runway),反推 kickoff 日。
2. **指派一個 Imarflex 內部 PM / 對接人** —— 唔需要係技術人,but 要有 authority 即日做小決定(例如改文案、approve 設計細節),避免 email 一去一回三日。
3. **safeguard 假期 / 同事休假** —— 如果有同事 7–9 月放長假(尤其要 sign-off 嘅人),早啲 flag 出嚟,我哋安排前後序。

> **底線:11 月絕對做到。我哋 own delivery,你哋 own 4 個 checkpoint。如果 6 月中前 kickoff,8 月底上線 + 2 個月 marketing warm-up,係最理想嘅 path。**

---

## Q2)Budget 有壓力 — 係咪一定要全部 phase 一齊?可唔可以慳啲先?

**完全明白,而且絕對可以分階段做。** 但要先講清楚:**有啲嘢可以 defer,有啲唔可以 split** —— 拆錯會搞到後面要重做、貴過一齊做。等我分開講邊樣可以拆、邊樣唔建議拆。

---

### 點解 Phase 1 + Phase 2 一齊做最抵 —— 唔係 sales talk,係技術現實

報價單 Phase 1(HK$40,000)+ Phase 2(HK$10,000)= **HK$50,000 一次性**。呢 50K 入面包嘅嘢係**新網站嘅地基**:

- Next.js + Payload CMS 全棧(前後台)
- Airwallex checkout(收款)
- 由 Shopline 完整 migrate(產品 / 客戶 / 訂單)
- **301 redirect**(SEO 保命 —— 唔做就排名跌晒)
- Email 自動化(訂單 / 出貨 / 棄單)
- 上線測試 + 性能優化

呢啲係**「有網站」嘅最低門檻** —— 拆走任何一塊都唔係慳錢,係**整個新網站根本上唔到線**。所以呢 50K 唔建議再 split。

> 但有兩個方向可以幫 Imarflex **減低現金流壓力 / 慳起步成本**,以下逐個講。

---

### 方向 A — **唔減 scope,只係將付款拆鬆啲**(推薦)

報價單原本付款係 50% / 30% / 20%。如果現金流係主要痛點(scope OK,只係唔想一次過俾大舊),我哋可以**將付款攤細**,每個 milestone 結一次,等 Imarflex 每個月嘅 cash out 平均啲:

| 原方案                       | 建議拆分(更平均)                          |
| ------------------------- | --------------------------------- |
| 訂金 50%(HK$25,000)        | 訂金 30%(HK$15,000) — 簽約時          |
| 中期 30%(HK$15,000) — 設計確認 | Phase 1 設計 sign-off 25%(HK$12,500) |
| 尾數 20%(HK$10,000) — 上線後 7 日 | Phase 1 開發完成 25%(HK$12,500)       |
|                           | Phase 2 上線交付後 20%(HK$10,000)      |

**特點:**

- **總價一樣 HK$50,000,scope 一樣完整。**
- 但 cash out 由「一次過俾 25K」變成「4 次每次 10–15K」,**對 budget cycle 友善好多**。
- 適合:scope 冇問題,只係想 cashflow smooth 啲。

---

### 方向 B — **MVP launch + post-launch add-on**(真正想慳起步成本)

如果係**真係想第一階段砌一個 lean version 上線,之後分批 add**,可以咁拆:

#### Stage 1 — Core MVP(必做,~HK$50K)

維持原報價 Phase 1 + 2 嘅核心 stack —— 因為呢部分係新網站存在嘅前提(見上文)。

#### Stage 2 — Enhancement features(可 defer 到上線後 1–3 個月)

呢啲係**「可以唔影響 launch」嘅嘢**,上線之後逐個加都得:

| Feature                          | 上線時必要?   | 建議時間                  | 備註                                |
| -------------------------------- | -------- | --------------------- | --------------------------------- |
| **AI chatbot**(客服 bot)           | 否        | Launch + 2 個月內加      | 上線初期人手回覆,睇實際 query pattern 先 train AI |
| **Reviews system**(產品評分)        | 否        | Launch + 1 個月內加      | 上線初期暫用「聯絡我哋分享評價」CTA               |
| **進階 Live chat**(超越 WhatsApp link) | 否     | Launch + 2 個月內按需加     | 起步用 WhatsApp Business 已足夠         |
| **Reviews / Loyalty 系統深化**       | 否        | Launch + 3 個月         | 累積到一定客戶量再做先有意義                    |
| **Admin dashboard 進階分析**         | 否        | Launch + 1 個月         | 基本 dashboard launch 已有,進階係優化      |
| **OCR 文件數碼化**                    | 否        | 按需                    | 退到 retainer 內,有需要先做               |

> **每個 add-on feature 之後可以單獨報價 / 結算**,Imarflex 隨時可以喺 board approve 預算後逐個加,唔需要而家一次過 commit。

#### Stage 3 — 內容 SEO 服務(已經免費試用半年)

呢個部分 **Imarflex 唔需要諗** —— 上次報價已經講明:**內容 SEO 服務(Standard tier)首 6 個月免費試用**。即係上線後頭半年:

- 照常出 blog(每月 4 篇)+ 配套社交 caption
- 季度 keyword research + 策略
- **Imarflex 零成本**,用實際流量數據判斷係咪繼續

**第 7 個月起**先決定用邊個 tier(Light / Standard / Aggressive)或者唔續 —— 呢個係**最低風險嘅試用安排**,Imarflex 唔需要而家就 commit 內容 SEO 嘅長期月費。

#### Stage 4 — 月度 Retainer(已經免費試用半年)

報價單 3.1 retainer(維護 + CRO + A/B test)**首 6 個月免費**,第 7 個月起 HK$1,000 / 月。即係上線後頭半年 retainer **唔使俾錢**,有半年時間判斷係咪繼續。

---

### 方向 C — **唔削功能,但延後 Phase 2 嘅 timing**(較少推薦)

理論上 Phase 1(設計 + 開發,HK$40K)可以做完先停低,Phase 2(遷移 + 上線,HK$10K)等下個 budget cycle 先做。但**唔建議**,因為:

- Phase 1 做完冇 launch = 個網站 sit 喺度,**冇 traffic、冇生意、冇 SEO 累積**,但你已經俾咗 80% 嘅錢。
- Shopline 繼續行 = 繼續俾 0.8% 平台佣金(~HK$1,600/月 @ $200K 銷售)+ 月費(~HK$2,499/月)。**Delay launch 1 個月 = 額外蝕 ~HK$4,000 Shopline 成本。**
- 切咗 dev 又重啟 = context switching cost,我哋要重新熟悉,時間 / 質素都會打折。

**只有當 Imarflex board 真係要分兩個財年俾錢嘅時候,呢個方案先值得考慮 —— 否則方向 A 或 B 抵啲。**

---

## 我哋嘅建議

睇 Derek 兩條問題嘅 context,我哋估計 Imarflex 嘅實際情況係:**scope 想保住,只係想 cashflow 鬆啲 + 想知有冇得後補嘅 feature 可以 defer**。基於此:

> **建議行 「方向 A(付款拆 4 期)+ 方向 B Stage 2 嘅 defer 清單」組合:**
>
> 1. **核心 50K 唔削**,新網站完整 launch,SEO / 排名 / 速度 / migration 一次過做齊,**11 月上線無風險**。
> 2. **付款拆 4 期**,每期 10–15K,Imarflex 每月 cash out 平均、唔會一次過俾大舊。
> 3. **AI chatbot / Reviews / 進階 dashboard / OCR 等 enhancement,defer 到上線後分批加**,每個獨立報價,board 隨時 approve 隨時做。
> 4. **內容 SEO + retainer 首 6 個月免費試用**,Imarflex 上線後頭半年零月費,用實際數據判斷續唔續。
>
> **= 起步 cashflow 最鬆 + 上線時間最緊湊 + 風險最低 + 後續 scope 完全 flexible。**

---

## 需要 Imarflex 確認 / 回覆嘅事項

1. **Q1 — 揀邊個 timeline?** Comfortable(9 月中上線)定 With runway(8 月底上線 + 10 月 pre-launch 推廣)?
2. **Q1 — 指派內部 PM / 對接人** —— 一個 authority 即日做小決定嘅同事,避免決策 lag。
3. **Q2 — Cashflow 緊定 scope 緊?** 揀方向(A / B / A+B 組合 / C),我哋出修訂版報價單同 milestone schedule。
4. **Q2 — Enhancement defer 清單**:Reviews / AI chatbot / 進階 dashboard / OCR —— Imarflex 想邊啲 launch 必有、邊啲可以後補?
5. **下一步建議**:約 30 分鐘 call 過一次方向、敲 kickoff 日。確認後我哋 48 小時內出 **修訂版報價單 + milestone schedule + 付款攤分表**。

> Derek 話「唔趕」,我哋唔催 —— 但**為咗 11 月上線安全 buffer,建議 6 月底前定落來**,Phase 1 可以 7 月初 kickoff。
