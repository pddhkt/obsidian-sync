# 網站重建方案書 — Development Spec for Claude Code

## Overview

Generate a professional client proposal in both **PDF (A4)** and **PPTX (16:9)** format, fully in **Traditional Chinese**. The proposal pitches a digital sales strategy for Imarflex 伊瑪牌 (Many Profit Industrial Limited) — a Japanese home appliance brand — with the website as the foundation, connected to warranty registration, parts/accessories sales, and SEO content marketing.

Title: **數碼銷售策略方案書** (not just a website rebuild proposal — it's a business strategy document)

Use Chinese font: **Noto Sans CJK HK** (available at `/usr/share/fonts/opentype/noto/`). For PPTX use `pptxgenjs`. For PDF, convert the PPTX to PDF using LibreOffice (`soffice --headless --convert-to pdf`), as reportlab has issues with CJK font embedding.

---

## Design System

### Color Palette (Warm Japanese Heritage theme)

|Name|Hex|Usage|
|---|---|---|
|Warm Charcoal|`292524`|Cover/closing slide backgrounds|
|Primary Red|`B91C1C`|Headers, accent bars, icons, CTA|
|Light Red|`FEE2E2`|Subtle backgrounds, highlights|
|Gold/Amber|`D97706`|Deals, countdown, sale elements|
|Cream|`FFFBF5`|Light page backgrounds|
|White|`FFFFFF`|Card backgrounds, content pages|
|Text|`292524`|Body text (warm charcoal)|
|Muted|`78716C`|Subtitles, descriptions, secondary text|
|Success|`15803D`|Positive comparison items (✓)|
|Danger|`DC2626`|Negative comparison items (✗)|
|Card BG|`F5F5F4`|Card/table row backgrounds|
|Border|`E7E5E4`|Table borders|

### Typography

- Font: `Noto Sans CJK HK` (Regular + Bold)
- Slide titles: 28–32pt bold
- Section headers: 14–16pt bold
- Body text: 10–12pt regular
- Captions/muted: 9–10pt

### Layout Patterns

- Cards with left color accent bar (3–4px wide) in primary red
- Numbered circles for list items (primary red)
- Warm charcoal backgrounds for cover and closing slides
- Top accent bar (primary red strip) on content pages
- Shadow on cards: outer, blur 6, offset 2, angle 135, opacity 0.12
- Rounded corners (4–8px) for a warmer feel

---

## Content — 11 Pages/Slides

### Page 1: 封面

- Dark background (warm charcoal `292524`)
- Top accent bar (primary red `B91C1C`)
- Title: **數碼銷售策略方案書** (large, 38–42pt, white, bold)
- Subtitle: **以官方網站為核心，建立品牌與顧客的直接關係** (light red accent `FEE2E2`)
- Divider line (primary red)
- Fields:
    - 客戶：Imarflex 伊瑪牌 (Many Profit Industrial Limited)
    - 日期：2026 年 4 月
    - 準備：[您的名稱]

---

### Page 2: 了解現況與機遇

- Title: 了解現況與機遇
- Subtitle: 伊瑪牌的數碼轉型契機
- 4 cards, each with red accent bar and numbered circle:

**Card 1: 缺乏直接顧客關係** 目前主要透過豐澤、百老匯等零售商銷售，品牌與最終顧客之間沒有直接聯繫。無法獲取顧客的電郵、購買記錄或偏好，難以進行再行銷。

**Card 2: 產品線未被完整展示** 零售商僅上架 30–50 款熱門型號，而伊瑪牌擁有超過 200 款產品。大量特色產品、配件及零件無法觸及消費者。

**Card 3: 配件及零件無銷售渠道** 更換內膽、濾網、刀片等配件需求龐大，但零售商不會上架。顧客找不到購買渠道，品牌錯失高毛利的重複性收入。

**Card 4: 品牌內容缺乏搜尋曝光** 當顧客搜尋「電飯煲推薦」或「邊隻空氣炸鍋好」時，伊瑪牌的內容無法出現在搜尋結果中，流失大量潛在顧客。

---

### Page 3: 數碼策略總覽

- Title: 數碼策略總覽
    
- Subtitle: 以官方網站為核心的顧客經營飛輪
    
- Visual diagram showing the flywheel cycle (use shapes/arrows):
    
    ```
    顧客於零售商購買 → 於官網登記保養 → 進入顧客資料庫
         ↓                                        ↓
    日後需要配件/零件 → 於官網購買（高毛利）      ↓
         ↓                                        ↓
    收到新產品推廣 ← 顧客數據驅動電郵行銷 ←←←←←←←
         ↓
    直接於官網購買升級產品
         ↑
    新顧客經 Google 搜尋發現品牌文章 → 進入官網
         ↓                                 ↓
    於官網直接購買            或透過「購買地點」前往零售商
    ```
    
- Below diagram, one-line summary in bold: "網站不只是網店，而是連接保養登記、配件銷售、品牌內容和顧客關係的數碼中樞。"
    
- Note: DTC 銷售維持與零售商相同建議零售價，不會構成渠道衝突。產品頁面同時提供零售商購買連結，為偏好門市購物的顧客提供方便，同時鞏固與零售夥伴的合作關係。
    

---

### Page 4: 網站核心功能

- Title: 網站核心功能
- Subtitle: 五大功能板塊
- 5 items, each with icon + title + description (stacked layout, not 2x2):

**1. 全線產品官方網店** 完整展示 200+ 款產品，以建議零售價銷售，不會與零售夥伴構成價格競爭。顧客可瀏覽完整產品系列，包括零售商未上架的特色型號。每個產品頁面同時顯示「其他購買地點」，連結至豐澤、百老匯、實惠等授權零售商的產品頁面，方便偏好門市購物的顧客。支援 Visa、Mastercard、FPS、AlipayHK、WeChat Pay 等付款方式。

**2. 配件及零件專區** 專屬「配件及零件」分類，提供內膽、濾網、刀片、遙控器等替換配件。內置「找配件」工具：顧客選擇產品型號，即時顯示所有相容配件。每個產品頁面底部亦會展示適用配件。

**3. 保養登記系統** 顧客（無論從任何渠道購買）均可於官網登記產品保養。登記時收集：姓名、電郵、電話、產品型號、購買日期、購買地點。每次登記 = 一筆新顧客記錄，為日後行銷建立數據基礎。

**4. 品牌內容中心「伊瑪生活」** 定期發佈 SEO 優化文章：選購攻略、煮食教學、家居貼士、產品評測。目標：當顧客搜尋「電飯煲推薦」時，伊瑪牌的文章出現在搜尋結果首頁。

**5. PostHog 數據分析** 追蹤購物漏斗、用戶行為、搜尋數據和轉換率。了解顧客如何瀏覽網站、在哪個環節流失、哪些產品最受關注。數據驅動的經營決策。

---

### Page 5: PostHog 數據分析詳解

- Dedicated page explaining PostHog value with 6 items
- Use icon + title + description layout

**購物漏斗分析** 追蹤客戶從首頁 → 分類頁 → 產品頁 → 加入購物車 → 結帳 → 付款的完整路徑。精確找出客戶在哪個環節流失，針對性優化。

**用戶錄影回放** 觀看真實客戶的瀏覽錄影，了解他們在網站上的實際操作。發現導航混亂、找不到按鈕、手機版問題等 UX 障礙。

**熱點圖** 以視覺化方式呈現頁面上哪些區域獲得最多點擊和注意力。了解客戶是否忽略促銷橫幅，或點擊了不可點擊的元素。

**A/B 測試** 同時測試兩個版本的產品頁面、結帳按鈕顏色或首頁佈局。用真實數據衡量哪個版本轉換更好，而非靠猜測。

**自訂事件追蹤** 追蹤業務專屬的操作：使用搜尋、套用篩選、點擊 WhatsApp 諮詢、瀏覽配件頁面、完成保養登記等。建立專屬分析儀表板。

**留存分析** 了解首次購買的客戶有多少會回購，以及回購的時間間隔。幫助制定精準的電郵推廣和促銷活動時機。

---

### Page 6: 功能對比表

- Table with 3 columns: 功能 | Shopline 現況 | 自訂方案
- Use ✗ (red/danger), △ (gold), ✓ (green/success) indicators
- Header row: primary red background, white text
- Alternating row backgrounds

|功能|Shopline 現況|自訂方案|
|---|---|---|
|設計自訂程度|✗ 僅限模板修改|✓ 完全自訂|
|數據分析|✗ 基本 GA4（需付費方案）|✓ PostHog 全功能|
|SEO 控制|△ 有限（模板約束）|✓ 完全控制|
|頁面載入速度|△ 一般|✓ 極速（SSR/SSG）|
|支付方式|✓ Visa、FPS、AlipayHK 等|✓ 同等覆蓋 + Shop Pay|
|交易佣金|✗ 0.8%–3% 每筆訂單|✓ 0%（Shopify Payments）|
|月費|HK$899+/月|~HK$226/月（Shopify Basic）|
|配件/零件專區|✗ 無專屬功能|✓ 找配件工具 + 型號配對|
|保養登記系統|✗ 需外部系統|✓ 內建，自動收集顧客數據|
|零售商購買連結|✗ 無此功能|✓ 產品頁連結至豐澤、百老匯等|
|品牌獨特性|✗ 與同業網站相似|✓ 日本品牌專屬設計|

---

### Page 7: 成本節省計算

- Subtitle: 假設每月營業額 HK$200,000（以 Shopline eCommerce Starter 方案計算）
- Two side-by-side cards:

**Left card — Shopline 目前成本** (red header)

|Item|Cost|
|---|---|
|月費|HK$899|
|交易佣金（0.8%）|HK$1,600|
|每月平台支出|**HK$2,499**|
|每年平台支出|**HK$29,988**|

Note: credit card processing fees (~3.3%) excluded as both solutions incur similar rates.

**Right card — 自訂方案成本** (green header)

|Item|Cost|
|---|---|
|Shopify Basic 月費|HK$226|
|交易佣金|HK$0|
|每月平台支出|**HK$226**|
|每年平台支出|**HK$2,712**|

**Bottom highlight banner** (dark background): 每年節省約 HK$27,276 ｜ 配件銷售可帶來額外高毛利收入

Footnote:

- 以上不含信用卡處理費（兩方案相近，約 3.3%–3.4%）
- 維護費用按需收費，非固定月費
- 配件及零件毛利通常高於主機產品，為網站帶來額外收入來源
- 營業額越高，節省越顯著

---

### Page 8: 項目時間表與報價

- Two phase cards:

**Phase 1: 設計、開發與整合** (color: Primary Red)

- Duration: 5–7 週
- Price: HK$55,000–80,000
- Deliverables:
    - AI 輔助 UI/UX 設計（日式暖調風格）
    - Next.js 自訂前端開發
    - Shopify 商品、購物車與結帳整合
    - 配件及零件專區 +「找配件」工具
    - 保養登記系統
    - 支付閘道設定（Shopify Payments + Airwallex）
    - PostHog 數據分析設定
    - SEO 設定（結構化數據、Sitemap）
    - 響應式設計（手機/平板/桌面）

**Phase 2: 內容遷移與上線** (color: Success Green)

- Duration: 2–3 週
- Price: HK$15,000–25,000
- Deliverables:
    - 200+ 產品數據遷移
    - 配件數據整理及型號配對
    - 「伊瑪生活」博客設定
    - 功能測試與除錯
    - 上線前性能優化
    - 上線支援與監控

**Total bar** (dark background): 總計：HK$70,000 – 105,000

**Maintenance section:**

- 按需收費：小型修改 HK$300–500/次 ｜ 中型修改 HK$1,000–3,000/次 ｜ 大型功能另行報價
- 年度維護計劃（可選）：HK$2,000/年，包含安全更新、Shopify 依賴更新、4 小時小型修改、1 次數據分析回顧

---

### Page 9: 增值服務（按需加購）

- Cards for each add-on:

**AI 客服聊天機器人** — HK$8,000–15,000 + ~HK$200–500/月 API 費用 自動回答常見問題（保養查詢、產品比較推薦、配件查詢、送貨時間），減少人手客服負擔。

**AI 內容生成系統** — HK$5,000–10,000（一次性設定） 輸入產品資料或主題，自動生成繁體中文 SEO 文章（選購攻略、煮食教學、產品評測）。每月可產出 4–8 篇，持續為「伊瑪生活」帶來自然流量。

**電郵自動化** — HK$3,000–5,000 保養登記確認郵件、保養即將到期提醒（第22個月）、新產品上架推廣。自動化建立持續的顧客關係。

**會員積分 / 忠誠度系統** — HK$10,000–20,000 購物積分、推薦獎賞、分級會員制度，提升回購率和客戶黏性。

**SEO 內容套件** — HK$3,000/季 每季關鍵字研究報告、4 篇 AI 輔助文章草稿、Google Search Console 健康檢查、可行優化建議。

---

### Page 10: 客戶需提供的資料

- 7 items with numbered circles:

1. **品牌素材** — Logo（高解析度）、品牌色彩指引、字型偏好
2. **產品資料** — 產品圖片、名稱、描述、價格、分類、庫存數量（可提供 CSV 批量導入）
3. **配件及零件清單** — 各型號的相容配件列表、配件圖片及價格
4. **網域管理** — 現有網域 (imarflex.net) 的 DNS 管理權限
5. **內容文案** — 「關於我們」、退換貨政策、FAQ、保養條款等頁面文字
6. **支付帳戶** — Shopify Payments 及 Airwallex 的商業帳戶註冊
7. **現有保養登記數據** — 如需從現有系統遷移顧客保養記錄

---

### Page 11: 下一步

- Dark background (warm charcoal `292524`)
- Top accent bar (primary red)
- Title: **下一步** (large, white, bold)
- 4 numbered steps with red accent numbers:

01 — 確認合作意向，安排啟動會議 02 — 支付 30%–50% 項目訂金 03 — 提供品牌素材、產品資料與配件清單 04 — 設計稿確認後進入開發階段

- Divider line
- 聯絡方式：[您的電郵 / 電話]

---

## Technical Notes

### PPTX Generation

- Use `pptxgenjs` (Node.js)
- Layout: `LAYOUT_16x9` (10" × 5.625")
- Font: `Noto Sans CJK HK`
- Use `react-icons` for icons (fa set): FaChartLine, FaShieldAlt, FaRocket, FaCogs, FaMoneyBillWave, FaClock, FaArrowRight, FaCheckCircle, FaTimesCircle, FaComments, FaRobot, FaSearch, FaEye, FaMousePointer, FaFlask, FaBell, FaUsers, FaWrench, FaTools, FaClipboardCheck, FaSync, FaPenFancy, FaStore, FaDatabase
- Rasterize icons to PNG via `sharp` before adding to slides
- Never use `#` prefix in hex colors
- Never reuse option objects (create factory functions for shadows)
- Use `breakLine: true` between text array items

### PDF Generation

- Convert the PPTX to PDF using LibreOffice:
    
    ```bash
    soffice --headless --convert-to pdf proposal.pptx
    ```
    
- This preserves Chinese font rendering correctly
- Do NOT use reportlab with CID fonts for this project (rendering issues with CJK)

### Output Files

- `數碼銷售策略方案書.pptx` — editable presentation (11 slides)
- `數碼銷售策略方案書.pdf` — for sending to client

### QA Checklist

- All Chinese text renders correctly (no boxes or missing glyphs)
- Cards have consistent spacing and alignment
- Comparison table rows alternate background colors
- Cost numbers are accurate and match between slides
- No overlapping elements
- Flywheel diagram on Page 3 is readable and arrows flow correctly
- Placeholder text [您的名稱] and [您的電郵 / 電話] is present
- Colors match the warm red/charcoal design system
- 11 pages total: cover, situation, strategy overview, core features, PostHog, comparison, cost, timeline, add-ons, client provides, next steps