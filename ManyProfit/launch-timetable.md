---
type: timetable
project: Many Profit 萬利嘉
status: draft
created: 2026-06-17
client: 萬利嘉實業有限公司 · Many Profit Industrial Limited
target-go-live: 2026-07-mid
---

# 上線時間表 · Launch Timetable

> 兩個網店（[[Imarflex/_index|Imarflex 伊瑪牌]] + Many Profit 萬利嘉）+ 共用 CMS，目標 **7 月中上線（待定）**。網站同後台已經起好，7 月做嘅係**微調 + 入資料 + 設定收款 / email + 上線**。詳細收費見 [[decisions/website-engagement-pricing]]。
>
> **客戶版 landscape deck（送出用）:** `ManyProfit/launch-timetable-deck.html` → `ManyProfit-Launch-Timetable-2026-06-17.pdf`（5 張:封面 · Gantt 時間表 · 逐週行事曆 · 客戶準備/我哋負責 · 結尾）。呢個 .md 係內容來源。

## 01 · 總時間表（並行軌道）

> 真正開始嘅 gate = **客戶交產品資料**。資料一到手，網站微調 · 資料匯入 · 收款 · email 四條線**同時並行**，唔使排隊。

| 軌道 | 內容 | 時長 | 負責 |
|---|---|---|---|
| 🔑 客戶準備（gate） | 產品資料 / SKU、品牌素材、兩站 DNS 授權、Airwallex 申請、email 決定 | 越早越好 | **客戶** |
| 收款 · Airwallex | 申請 → 約 48 小時批核（預留 1–2 週） | ~1–2 週 | 客戶申請 / 我哋整合 |
| 網站微調 ×2 | 兩個前台按客戶意見微調（Imarflex + Many Profit 都接近完成） | ~2 週 | 我哋 |
| 資料匯入 | 產品 / SKU 入共用 catalog（數量待客戶確認） | ~4 日 | 我哋 |
| Email 設定 | Resend 域名驗證（DNS ~24–48h）+ 交易 / 通知 email 接線 | 並行 | 我哋 |
| 域名 / 遷移 | 兩站域名指去新站；Shopline 遷移方式敲定 | 並行 | 一齊傾 |
| 🚀 上線 GO LIVE | 兩個站上線 → 6 個月推廣 trial M1 開跑 | ~7 月中 | 我哋 |

## 02 · 行事曆 · Calendar（6 月中 → 7 月中）

| 週 | 日期 | 客戶行動 | 我哋執行 |
|---|---|---|---|
| 第 1 週 | 6/16–6/22（本週） | 付訂金 · 開始準備產品資料 · 申請 Airwallex · 授權兩站 DNS · 決定 email 安排 | Kickoff · 開工準備 · 確認 SKU 範圍 |
| 第 2 週 | 6/23–6/29 | **交產品資料 ← gate 開** · 交品牌素材 · 確認 from-address / reply-to inbox | 開始資料匯入 + 網站微調 · Resend 域名驗證 · Airwallex 整合 |
| 第 3 週 | 6/30–7/6 | 一輪微調意見 · 敲定 Shopline 遷移方式 | 微調 ×2 完成 · 資料匯入完成 · email triggers 接好 · staging review |
| 第 4 週 | 7/7–7/13 | UAT 試用 · 最後確認 | 最終 QA · Shopline 內容 + 301 redirect 遷移 · 上線前檢查 |
| 第 5 週 | **~7/14–7/18** | — | 🚀 **GO LIVE 兩個站** · 6 個月推廣 trial 開跑 |

> ⚠️ **目標 7 月中，但可能順延** —— 視乎①產品資料到手時間（gate）②Airwallex 批核快慢③域名轉移有冇問題。任何一項遲，上線日順延，但我哋以 **7 月中** 為目標推進。

## 03 · 客戶開始前要準備嘅嘢

1. **兩個網域 + DNS 管理權** — Imarflex + Many Profit 兩站（用嚟設定 email 記錄 + 上線指向）。
2. **Email 安排** — 每站 from-address（寄件地址）+ reply-to（客戶回覆去邊個現有 inbox）+ 而家用緊邊個 email host。詳見下面「email 點解決」。
3. **Airwallex 申請** — 香港有限公司文件：公司註冊證書、授權人身份證、UBO（持股 ≥25%）身份證。網上申請約 5 分鐘，~48 小時批核，預留 1–2 週。
4. **產品資料 / SKU**（真正 gate）— 規格、圖片、價錢、SKU code、margin、庫存 status。**SKU 總數待確認。**
5. **品牌素材** — Many Profit + 旗下其他品牌 logo / 色彩 / 字型；About / 政策 / FAQ 文案。
6. **Shopline 遷移選擇** — ① 兩站並行（新站先行，Shopline 繼續一段時間，風險低）或 ② 全面 cutover（~7 月中切去新站）。遷移流程：Shopline 匯出 → 下載圖片 / 規格資產（cutover 前必做）→ 匯入新站。
7. **未來 90 日 promo 時間表** — 用嚟排節日 / 旺季內容檔期。

## 04 · Email 點解決（「收到但寄唔到俾客」）

- **保留現有 email 收件**（員工 inbox 唔郁）——只係新加一條**寄件**路徑。
- **用 Resend**（我哋而家用緊嘅）寄交易 + 推廣 email（落單 / 出貨 / 保養 / win-back），用**子網域**寄（如 `mail.imarflex…` / `send.manyprofit…`），唔影響主域名現有郵件信譽。
- **客戶回覆 → 自動入返你哋現有 inbox**；網站查詢表格都 forward 去嗰個 inbox。客戶照樣喺原本地方收到你哋。
- 加上正確 SPF / DKIM / DMARC 驗證 → 直接解決「寄唔到俾客」（呢個多數係域名未驗證 / 冇寄件服務嘅問題）。

## 05 · 我哋負責執行
網站微調 ×2 · 產品資料匯入 · Airwallex 收款整合 · Email（Resend）設定 · Shopline 遷移 + 301 redirect · 測試 / 性能 · 後台 training · 上線 · 上線當日起 6 個月推廣 trial（blog 4 篇/月 + 每週 3 IG + 2 FB）。
