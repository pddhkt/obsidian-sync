# Imarflex 伊瑪牌 — Internal Master Document

**內部使用 / 完整 spec / 你 review 用**

> **Legend:**
> - 🟢 **CONFIRMED** — 已同你傾過,確認方向
> - 🔵 **RECOMMENDATION** — 我嘅建議,等你 review
> - 🟡 **DECISION NEEDED** — 必須揀,影響後續嘢
> - 🟠 **OPEN QUESTION** — 仲未傾過,要諗
> - ❌ **NOT IN SCOPE** — 唔做
> - 🆕 **NEW** — 呢輪更新加入

---

## 目錄

0. Client background(公開資料,已 fact-check)🆕
1. 戰略 frame(品牌 4 維度)
2. Funnel section(6 階段 + iframe demo)🆕
3. Stack 決定(完整版)
4. Migration plan(Shopline → Payload)
5. 平台架構 + 完整 Features list 🆕
6. Voice 部分完整 spec 🆕
7. 顧客生命週期 + Retention(含 referral trigger)🆕
8. 客服 + Chatbot 架構
9. SEO 計劃
10. 品牌指引交付物
11. 服務範圍 + Phase 拆解
12. 成本 + 報價
13. KPI + 預期成效
14. 風險 + 假設
15. Add-on 處理(connection to 獨立 doc)🆕
16. Open Questions(等你答)

---

## 0. Client Background(公開資料,已 fact-check)🆕

> 來源:[[external-research-imarflex]](2026-06-12 multi-agent web fact-check pass)。
> 全部係公開 source — 落 pitch 前唔使再 verify,但 brand 口徑(尤其 heritage 字眼)落 deliverable 前同 client 過一次。

**品牌:**

- 日本品牌,**1973 年大阪成立**,parent 係 Osaka Imanishi Metal Industry Co., Ltd.(大阪今西金屬工業)— 官方品牌故事頁原文證實。⚠️ 「1956 年大阪工坊」係 LLM hallucination,永遠唔好用(見 [[imarflex-founding-year-unverified]])
- 品牌哲學(官方口徑):匠人精神、所有產品由工程師監督生產
- 1980s 香港引入**電子瓦罉**(起家品類)+ 自稱第一個將**微波爐**帶入香港嘅品牌

**香港實體(我哋實際對口嘅生意):**

- 香港總經銷:**萬利嘉實業有限公司(MANY PROFIT INDUSTRIAL LIMITED**,CR no. 0522967**)** — 1992 開業,1995 註冊,2010 正式成為日本 Imarflex 總經銷。⚠️ 唔係「宏利嘉」/「Wan Lee Ka」(舊 draft 嘅假資料,已更正)
- Service centre:葵涌禾塘咀街 31-39 號 香港毛紡工業大廈 2102 室
- 保養:Imarflex 品牌產品 2 年(代理嘅其他品牌 1 年)
- 🟠 OPEN:萬利嘉 vs Imarflex Japan 嘅關係 — 影響 brand asset 使用權,要問 client

**渠道現狀:**

- Retail footprint 強:Fortress、Pricerite、HKTVmall(多個 reseller)、ElecBoy、Built-In Pro、Sunrich、日本城等(全部 2026-06 verify 過有貨)
- 自家網店 imarflex.net 行 Shopline,~200 SKUs — 即係 DTC site 要同 retail channel 分工,避免價格戰

---

## 1. 戰略 Frame

### 🟢 CONFIRMED:外型 / 言行 / 價值 / 行動 metaphor

呢個係 pitch 嘅核心 frame,所有嘢繞住佢轉。

- **外型(Outfit)** — 視覺、UI、設計
- **言行(Voice)** — 文案、tone、blog
- **價值(Value)** — 產品、保養、口碑、referral amplify
- **行動(Action)** — 日常 marketing 執行 / 系統自動運行

### 🟢 CONFIRMED:我哋負責邊兩樣

- ✅ **外型(完整)** — 設計 + brand guideline + UI + 社交 post 風格參考圖
- ✅ **言行 — 基礎指引(完整)** — Tone、framework、Crisis tone
- ✅ **言行 — 內容(add-on)** — Blog 文章
- ✅ **價值 — 系統化展示** — Reviews 系統、保養 system、referral 機制
- ✅ **行動 — 系統自動化部分** — Email 自動化、retention、loyalty backend
- ❌ **行動 — 外部執行** — Social、paid ads、KOL

---

## 2. Funnel Section(6 階段 + iframe Demo)🆕

### 🟢 CONFIRMED:6 個階段 + Loop

```
認知 → 興趣 → 考慮 → 購買 → 重複購買 → 倡導
                                          ↓
                                 (返去推動「認知」,形成 loop)
```

### 🟢 CONFIRMED:iframe demo + flywheel fallback

- **Desktop:**Click 階段 → iframe embed `imarflex-app.vercel.app` 即場 demo
- **Mobile (<768px):**Flywheel 圓環視覺,純文字 expand

### 🟢 CONFIRMED:每階段 mapping(based on real demo site)

| # | 階段 | iframe URL | 預期影響 | 我哋整咗咩 |
|---|------|-----------|---------|----------|
| 1 | 認知 | `/blog` | Organic +50%、品牌搜尋 +30% | SEO 基礎、blog SEO、Core Web Vitals、speed |
| 2 | 興趣 | `/` | Bounce -20%、Session +40% | 視覺一致、heritage、bento layout |
| 3 | 考慮 | `/products/iaf-30e-air-fryer` | Add-to-cart +25% | PDP 文案、reviews(add-on)、retail links、Trade-in |
| 4 | 購買 | `/cart` | CR +20-40%、棄單 -15% | 自建 checkout、Airwallex、cart drawer、search |
| 5 | 重複 | `/parts-finder` | 重複率 0% → 15-20%、LTV +50% | 找配件、保養、Email 自動化、loyalty(add-on) |
| 6 | 倡導 | `/products/iaf-30e-air-fryer` (reviews 區) | Referral 5-10% | Reviews(add-on)、Referral(add-on)、UGC(included) |

> 詳細 HTML 實現喺獨立 doc:`imarflex-funnel-demo-spec.md`

### 🆕 倡導階段 3 條細項

倡導唔係單一動作,係 3 件事配合:
1. 📝 **Reviews 系統**(add-on)— 信任建立 + SEO rich snippets
2. 🎁 **推薦獎賞 / Referral**(add-on,獨立或包 loyalty)— 直接帶新客
3. 📸 **UGC 收集 + share 機制**(included)— Hashtag、share button、客戶相收集

---

## 3. Stack 決定

### 🟢 CONFIRMED:Payload-only(完全冇 Shopify)

| 層 | 技術 | 點解 |
|----|------|------|
| 前端 | Next.js 15 App Router | SEO、speed、ecosystem |
| 後台 + Commerce + CMS | Payload v3 | 一站式、self-host、完全擁有 |
| 資料庫 | PostgreSQL(via Supabase / Neon) | Production-ready、易 backup |
| 檔案儲存 | Cloudflare R2 | 平、零 egress 費 |
| 支付 | Airwallex | FPS / AlipayHK / WeChat / 信用卡 / 分期 |
| 分析 | PostHog | Funnel、replay、A/B、flags |
| 搜尋 | Meilisearch Cloud 🔵 | 中文好、平、predictive 強 |
| 認證 | Payload built-in auth | 客戶 + admin 同一系統 |
| Email(交易 + 營銷) | Resend + Resend Audiences 🔵 | 統一一個 vendor |
| Hosting(前端) | Vercel | 最快 deploy Next.js |
| Hosting(後端 + DB) | Railway / Fly.io | 平、易 scale |

### 🟡 仲要 final confirm

- [ ] 搜尋:Meilisearch vs Algolia(影響月費 ~$30 vs ~$200)
- [ ] Email 營銷:Resend Audiences vs Loops(都平,UI 唔同)
- [ ] Checkout:自建 + Airwallex Drop-in vs Hosted Payment Page

我建議自建 + Airwallex Drop-in(UX 完全控制)。

---

## 4. Migration Plan(Shopline → Payload)

### 🟠 OPEN QUESTION:Shopline 而家狀態確認

需要 client confirm:
- [ ] 而家有幾多 SKU?
- [ ] 而家月銷售額幾多?
- [ ] 而家用緊邊個 Shopline 方案?
- [ ] 客戶帳戶幾多個?
- [ ] 訂單歷史幾多年?
- [ ] 而家邊啲 URL 排緊 Google page 1-2?
- [ ] Shopline 用緊咩 plugin / addon?

### 🔵 RECOMMENDATION:Migration 步驟

**Pre-migration(Phase 2 開頭)**
1. Audit Shopline export 能力
2. Audit SEO 現況(Ahrefs / SEMrush / GSC)
3. 建立完整 URL mapping
4. Customer password 處理(force reset + email 通知)

**Migration 過程**
5. Products(CSV → transform → Payload)
6. Orders(歷史 archive read-only)
7. Customers(email + 基本資料)
8. Media(R2 batch upload)
9. Pages(static pages 重整)

**Cutover**
10. 凍結 Shopline 落單 24 hrs
11. Final sync
12. DNS 切換
13. 301 redirect 全套
14. Submit new sitemap to GSC
15. 監控 24-48 小時

**Post-migration(Week 1-4)**
16. GSC ranking 監察
17. 識別 broken redirect → 補
18. Email 通知客戶 + reset password
19. 客服快速 response

### 🔴 風險警告

- Shopline export 限制(early audit)
- SEO ranking 短期跌(2-4 週)— Q1 報告 set 預期
- Customer password 反彈 — communication 重要

---

## 5. 平台架構 + 完整 Features List 🆕

### 🟢 CONFIRMED:Pages list

| Page | Route |
|------|-------|
| Homepage | `/` |
| Collections | `/collections/[handle]` |
| PDP | `/products/[handle]` |
| Search | `/search` + dialog |
| Cart | drawer + `/cart` |
| Checkout | `/checkout` |
| Warranty | `/warranty` |
| Parts Finder | `/parts-finder` |
| Blog | `/blog` + `/blog/[handle]` |
| Account | `/account/*` |
| Pages | `/pages/[handle]` |
| Returns | `/account/returns` |

### 🟢 CONFIRMED:商業核心 Features

- 全線產品官方網店(200+ SKU)
- PDP retail links(豐澤 / 百老匯 / 實惠)
- 配件及零件專區 + 找配件工具
- 保養登記系統 + retention loop
- Trade-in 舊機回收 flow(已喺 demo 見到)
- 顧客帳戶 + 訂單追蹤
- 退換系統(自助 + admin review)
- PostHog 完整整合

### 🆕 新增 Conversion Booster Features(全部 included)

| Feature | 點解重要 |
|---------|---------|
| **庫存狀態顯示** | 「現貨 / 剩 X 件 / 缺貨」直接影響購買決策 |
| **產品 bundle / 套裝** | AOV +15-20% 嘅最簡單方法 |
| **「一齊買埋」cross-sell** | PDP 加 1 個 section 就可以 |
| **最近瀏覽** | 鼓勵返訪 |
| **缺貨通知**(back-in-stock) | 唔好俾走潛在客 |
| **首次訪客 popup** | Email capture + 折扣,行業標配 |
| **訂單通知中心** | 客戶 self-service,減客服負擔 |
| **管理員後台 dashboard** | Imarflex staff 用嘅訂單 / 客戶管理界面 |
| **Promotional engine** | 限時、滿減、會員價 — 旺季必需 |
| **Accessibility(a11y)** | Alt text、keyboard nav,HK 越來越睇重 |

### 🆕 Services 層(included)

- ❌ ~~Hypercare 30 日~~(你 confirm 唔要)
- ✅ Admin training(交班 + video walkthrough)
- ✅ 月度 reporting(Phase 3 retainer 包)
- ✅ Quarterly strategy review(retainer 包)
- ✅ Backup + DR(每日自動 backup)
- ✅ Performance monitoring + alert
- ✅ Security(HTTPS、DDoS、rate limiting)

### 🟡 DECISION NEEDED:Checkout 方案

- **自建 + Airwallex Drop-in** 🔵 推薦 — UX 完全控制,Airwallex 處理 PCI
- Airwallex Hosted Payment Page — 簡單但 UX 略差

### 🔵 RECOMMENDATION:退換系統流程

1. 客戶喺 `/account/orders` 揀訂單 → 申請退換
2. 揀原因 + 上載相
3. 通知 admin
4. Admin 喺 Payload review → approve / reject
5. Approve → 生成 RMA + email 客戶
6. 客戶寄返 → admin mark received → 自動退款(via Airwallex API)

---

## 6. Voice 部分完整 Spec 🆕

呢個係 included deliverable 嘅 Voice 部分嘅完整 list。

### 🟢 CONFIRMED:Tone of Voice 指引

**品牌個性 5 個形容詞:**
- 可靠(50 年品牌底氣)
- 溫暖(像家人朋友)
- 專業(技術可信)
- 貼地(講人話)
- 日式精緻(細節用心)

**Anti-pattern 3 個:**
- ❌ 過份 hype(「最強」「破天荒」)
- ❌ 機械術語堆砌(「智能演算法優化體驗」)
- ❌ 冷漠官腔(「為配合公司政策」)

**Do / Don't 例子:**
- ✅「開箱即用」 ❌「人性化操作體驗」
- ✅「3 步輕鬆煲靚飯」 ❌「採用先進智能演算法」
- ✅「壞咗?WhatsApp 我」 ❌「請通過官方渠道進行報修」

> 參考 demo site 個 brand voice:「日本起點 · 香港日常」、「由大阪的工坊， 到深水埗的廚房」、「煲、壺、扇」— 已經做得啱方向。

### 🟢 CONFIRMED:PDP 文案 framework

每 PDP 跟一致格式:
1. **Hook** — 一句問題 / scenario(「煲開飯成日燶底?」)
2. **Benefit** — 解決方法(「IH 加熱均勻,飯粒粒分明」)
3. **Spec** — 技術支撐(「10 層厚釜內膽 / 24 小時預約」)
4. **Trust** — 保養 + Trade-in
5. **Social proof** — Reviews(add-on)

### 🟢 CONFIRMED:Email tone 規範

- **交易 email** — 簡潔、清楚、實用、minimal design(訂單確認、出貨)
- **營銷 email** — 溫暖、有故仔、唔催谷(welcome、新品、保養提醒)
- 每封都要有可以即時 reply 嘅 reply-to(WhatsApp link 或者 email)

### 🟢 CONFIRMED:客服回覆語氣

- 友善但唔過份親切
- 承認問題唔狡辯
- 主動解決方案
- 識用 emoji 但唔濫用
- 簽名統一(店員姓名 + 部門)

### 🆕 Crisis Communication Tone

點解需要:出事嗰陣(產品召回、批量延遲、退款爭議)係品牌最考人嘅時刻。冇預先 framework,反應慢 / 講錯嘢都會放大傷害。

**情況 1:產品問題 / 召回**
- 第一時間承認 + 道歉
- 講清楚影響邊啲型號 / batch
- 明確補救方案(免費換、退款、補償)
- 唔好用法律語言遮醜

**情況 2:大批延遲送貨**
- 主動通知(唔好等客戶問)
- 講明原因(物流問題?庫存?)
- 預計新時間 + 補償(運費 waive、credit)

**情況 3:退款 / 爭議**
- 唔好爭辯先,先聆聽
- 24 小時內第一回覆
- 解決方案明確 + 時間表

**情況 4:Social media 負評**
- 公開回應(顯示處理態度)+ 私訊跟進
- 唔刪 comment(除非違規)
- 真誠道歉 > 公關語

### 🆕 產品命名規則

統一格式減少混亂:
- **PDP 標題:**「Imarflex 伊瑪牌 [類別] [型號](容量/規格)」
- **例:**「Imarflex 伊瑪牌 IH 電飯煲 IRC-20IH(2L)」
- **SEO meta:**前置 benefit「2L IH 電飯煲|10層厚釜均勻加熱|IRC-20IH」
- **URL slug:**用型號(`irc-20ih-rice-cooker`)

### 🆕 社交 Post 風格參考

**呢個 deliverable 喺 slide 入面要有參考圖。**

俾 Imarflex social team 跟,而家位 placeholder 入面我建議放:
- 3-4 張產品攝影 reference(光線、角度、構圖)
- 2-3 張 lifestyle reference(廚房 / 家居場景)
- 1-2 張 Carousel post layout(賣點 → 產品 → CTA)
- 字體 / 顏色 overlay 標準

### 🟢 CONFIRMED:Blog 內容方向(Add-on)

詳見 `imarflex-add-ons-discussion.md`,5 大主題 cluster:
1. 食譜
2. 選購攻略
3. 產品比較
4. 保養貼士
5. 新品介紹

### ❌ 暫時唔加

- 雙語規則(你 confirm 唔需要)— 但 platform 留住雙語架構,將來易加

---

## 7. 顧客生命週期 + Retention(含 Referral Trigger)🆕

### 🟢 CONFIRMED:完整 lifecycle(8 個 trigger,included)

| 觸發 | Email | 目的 |
|------|-------|------|
| 註冊帳戶 | Welcome series(3 封) | 介紹品牌、保養登記、首次折扣 |
| 棄單 1hr / 24hr / 72hr | 棄單提醒 | Recover 銷售 |
| 首次購買後 7 日 | Review request | 收 reviews |
| 首次購買後 14 日 | 相容配件推薦 | Cross-sell |
| 60 / 90 / 180 日無消費 | Win-back series | 重新激活 |
| 保養到期前 30 日 | 提醒 + 升級新機 | Cross-sell |
| 保養到期前 7 日 | 最後提醒 | 緊急感 |
| 生日 + 會員週年 | 折扣 / 獎賞 | 情感連繫 |

### 🆕 新增 Trigger:Referral 邀請

**首次 review 提交後 7 日 → 邀請 referral**

- 利用客戶最 happy 嘅時刻(剛 review 完 = 滿意)
- 整合入既有 email engine,唔需要額外系統
- 即使無 loyalty 都 work — 純 referral incentive 已夠
- 配合 Referral add-on 用,效果倍增

---

## 8. 客服 + Chatbot 架構

### 🔵 RECOMMENDATION:三層客服架構

**Layer 1:自助(全部客戶)— included**
- FAQ page
- 訂單追蹤
- 保養記錄查閱
- 退換申請
- Parts finder

**Layer 2:AI Chatbot(Add-on)**
- Claude API
- Context: 產品庫 + FAQ + 訂單狀態
- 答唔到自動 escalate

**Layer 3:真人 WhatsApp(Imarflex 已有 9140 6664)**
- Chatbot escalate 自動 link
- 帶 context(訂單號、對話記錄)
- Imarflex staff 接

### 🟠 OPEN QUESTION

- Imarflex 內部有冇人 staff WhatsApp?
- 可以加 WhatsApp Business API + Slack 統一 inbox?

---

## 9. SEO 計劃

### 🟢 CONFIRMED:技術 SEO 基礎(Phase 1 包)

- Schema markup
- Sitemap.xml
- Core Web Vitals
- Canonical URLs
- Hreflang(if 雙語)
- Open Graph + Twitter Cards
- Internal linking

### 🟢 CONFIRMED:Migration SEO 救命包(Phase 2)

- 完整 URL mapping
- 301 redirect
- GSC monitoring
- Sitemap re-submit
- 舊 backlink audit(可選)

### 🆕 Content SEO(Blog Add-on)

主題 cluster + 頻率,詳見 `imarflex-add-ons-discussion.md`。

### 🟠 OPEN QUESTION:Imarflex 而家 SEO ranking?

要早日 audit,影響 migration 風險評估。

---

## 10. 品牌指引交付物

### 🟢 CONFIRMED:Deliverables list

#### 視覺(Outfit)
- [ ] Logo usage guide
- [ ] Color palette
- [ ] Typography scale
- [ ] Photography style guide
- [ ] Iconography style
- [ ] Spacing system
- [ ] Component library(Storybook)
- [ ] **🆕 社交 post 風格參考圖**(俾 Imarflex social team 用)

#### 文字(Voice)
- [ ] Tone of voice 5 個形容詞 + 3 個 anti-pattern
- [ ] Do / Don't 例子
- [ ] 產品文案 framework
- [ ] PDP 文案 template
- [ ] Email tone(交易 vs 營銷)
- [ ] 客服 reply tone
- [ ] **🆕 Crisis communication tone**(4 種情況 framework)
- [ ] **🆕 產品命名規則**(SKU 標題格式)

#### 內容方向
- [ ] Content pillars
- [ ] 品牌底線
- [ ] Blog 編輯 guideline(如 add-on)

#### 交付格式
Notion(易 maintain)+ PDF(易分享)

---

## 11. 服務範圍 + Phase 拆解

### 🟢 CONFIRMED:三個 Phase

**Phase 1:Build(5-7 週)— HK$55,000-80,000**
- Platform 全棧開發
- 設計系統
- 全部核心 features(包括 conversion boosters)
- 整合(Airwallex、PostHog、Resend、Meilisearch)
- Email 自動化第一階段
- SEO 技術基礎
- Responsive

**Phase 2:Migration + Launch(2-3 週)— HK$15,000-25,000**
- 數據 migration
- URL redirect 全套
- 內容遷移
- 配件型號配對
- Email 自動化全部觸發 setup
- 上線測試 + 性能優化

**Phase 3:12 個月 retainer(可選)— HK$5,000-8,000/月**
- 月度 reporting
- 季度 strategy review
- CRO 實驗
- 維護 + 安全更新
- 4-8 hrs 月度修改 quota

### 🟢 CONFIRMED:Add-ons(獨立報價)

詳見 `imarflex-add-ons-discussion.md`。

### ❌ NOT IN SCOPE

- Social media 發 post / 互動
- Paid ads 投放管理
- KOL outreach
- PR
- 攝影 / 影片製作

---

## 12. 成本 + 報價

詳見 pitch document。重點:
- Phase 1 + 2:HK$70,000-105,000
- Phase 3:HK$5,000-8,000/月
- Platform ongoing:~HK$650/月
- vs Shopline 而家 ~HK$2,499/月

### 🟠 OPEN QUESTION:Imarflex 而家月銷售?

成本對比要更新基準。

---

## 13. KPI + 預期成效

### 🟠 OPEN QUESTION:Baseline 數字

需要 client 提供:
- 月訪客 / D2C 月銷售 / CR / AOV / Email list / 重複購買率

### 🔵 RECOMMENDATION:12 個月 target

參考 pitch document Section 3 個 funnel + Section 11 預期成效。

---

## 14. 風險 + 假設

### 🔴 主要風險

1. **SEO ranking 短期跌**(2-4 週)— Mitigation:redirect、GSC 監察
2. **Customer password reset 反彈** — Mitigation:預先 communication
3. **Shopline export 限制** — Mitigation:早日 audit
4. **Imarflex 內部 marketing capability 不足** — Mitigation:早日 align、介紹 partner
5. **配件 SKU 數據不齊全** — Mitigation:Phase 2 早期確認
6. **🆕 iframe embed 失敗(pitch 時)** — Mitigation:預錄 6 張 screenshot backup

### 🔵 假設

- 客戶有完整產品 data
- 客戶有 brand asset
- 客戶 Imarflex 內部有專人 communicate
- 12 個月內唔會做大規模 brand refresh
- 🆕 imarflex-app.vercel.app 喺 pitch 前唔會大改 layout

---

## 15. Add-on 處理 🆕

### 🟢 CONFIRMED:Add-on 結構

呢輪重組:之前散落各處嘅 add-on,而家統一到 `imarflex-add-ons-discussion.md`。每個 add-on 答 4 條:
1. 解決咩問題
2. 帶嚟咩好處(具體 metric)
3. 適合幾時加
4. 報價

### 🟢 CONFIRMED:8 個 Add-on

1. Blog 內容創作
2. Reviews / Ratings 系統
3. 推薦獎賞 / Referral(獨立或包 loyalty)🆕
4. Loyalty 系統
5. AI Chatbot + WhatsApp 接駁
6. AI 產品文案生成
7. Live chat(PDP)🆕(由 main 移落 add-on)
8. 訂閱式重複購買產品 🆕

### 🟢 CONFIRMED:4 個 Add-on 組合(俾客戶揀)

- A:快速見效(Q4 旺季前)
- B:長遠資產(Year 2 organic 主導)
- C:減內部負擔(自動化先行)
- D:Budget 緊(essential 先做)

---

## 16. Open Questions(等你答)

### Stack 層
- [ ] 🟡 搜尋:Meilisearch vs Algolia?(我建議 Meilisearch)
- [ ] 🟡 Email 營銷:Resend Audiences vs Loops?(我建議 Resend)
- [ ] 🟡 Checkout:自建 + Airwallex Drop-in vs Hosted?(我建議自建)

### 客戶資料層(要 Imarflex confirm)
- [ ] 🟠 而家 Shopline 用緊邊個方案?
- [ ] 🟠 而家月銷售 / 訪客 / CR / AOV?
- [ ] 🟠 SKU 總數?客戶數?訂單歷史?
- [ ] 🟠 而家 SEO ranking 點?
- [ ] 🟠 而家用緊邊啲 Shopline plugin?
- [ ] 🟠 而家 marketing team 點 structure?
- [ ] 🟠 Imarflex 內部有冇 WhatsApp 真人 staff?

### 業務層
- [ ] 🟠 ICP 同 customer segment 點定?
- [ ] 🟠 同 Rasonic / 德國寶 / Panasonic 嘅 differentiation?
- [ ] 🟠 退換政策具體 terms?
- [ ] 🟠 物流合作伙伴?
- [ ] 🟠 有冇 testimonial / case study 用得?(影響 reviews 推法)
- [ ] 🟠 邊啲 SKU 有 consumable(影響訂閱式 add-on)?
- [ ] 🟠 Airwallex 香港版有冇 recurring billing(訂閱式技術前提)?

### 商業條款層
- [ ] 🟠 Phase 1 + 2 項目期(45 / 60 / 90 日)?
- [ ] 🟠 Phase 3 retainer 12 個月 commit 定 month-to-month?

### Pitch 策略層
- [ ] 🟠 第一次 pitch 想揀邊一兩個 add-on 重點推?
- [ ] 🟠 想唔想 prepare 多 demo / mockup?
- [ ] 🟠 Pitch 同一日傾 add-on,定分開兩 meeting?
- [ ] 🟠 要唔要先做免費 audit(吸引客戶)?

### 技術層(Pitch 前要解決)🆕
- [ ] 🟠 imarflex-app.vercel.app 嘅 X-Frame-Options 設定 — 可唔可以 embed?
- [ ] 🟠 Demo 失敗 backup screenshot 邊個整?
- [ ] 🟠 Pitch 嗰陣用咩設備 demo(電腦 / iPad / TV cast)?

---

## 17. 檔案結構參考

呢個項目嘅相關文件:

| File | 用途 |
|------|------|
| `imarflex-pitch.md` | Client-facing,pitch 用 |
| `imarflex-pitch-script-cantonese.md` | 廣東話講稿 |
| `imarflex-add-ons-discussion.md` | Pitch 後 add-on brainstorm |
| `imarflex-funnel-demo-spec.md` | HTML slide funnel section 實現 spec |
| `imarflex-internal-master.md` | (本檔)完整 spec + open questions |

---

## 18. 後續工作優先順序

### 🔥 即刻
1. 答 Stack 層 3 個 decision(搜尋 / Email / Checkout)
2. 測試 imarflex-app.vercel.app iframe embed
3. 同 Imarflex 開 discovery call 攞客戶數字

### 🟡 近期
4. 用真實 KPI baseline 更新 pitch 嘅成本對比
5. 整 HTML slide deck prototype(funnel section 為核心)
6. 拍 6 張 demo backup screenshot
7. 準備 add-on 組合 quote(4 個 tier)

### 🟢 中期
8. 排練 pitch + iframe demo flow
9. 確認 Phase 報價同付款條款
10. Final pitch 演示
