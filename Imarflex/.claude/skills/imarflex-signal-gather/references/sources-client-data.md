---
type: skill-reference
skill: imarflex-signal-gather
area: client-data-sources
tags:
  - online-marketing
  - research
  - onboarding
---

# Client-data signal sources (gated until hired)

呢 4 個 source 需要 client 開 access / 提供 export 我哋先用得。每個 section 入面:

1. **要 request 咩** — 具體 access / file / cadence
2. **拎到之後做咩** — workflow + example
3. **Request line** — 可以直接 paste 入 client onboarding doc 或 kickoff email 嘅一句

> [!info]
> 呢個 file 同時係 **「Day-1 client request list」** 嘅 single source of truth。每次 pitch-mode sweep 結尾,將呢 4 個 request line 一齊 paste 畀 user。

---

## 1. 🔒 Customer service / WhatsApp log

### 要 request 咩

| 項目 | 具體 ask |
|---|---|
| Access | WhatsApp Business export(過去 90 日所有對話)或 CS team 每週 share summary |
| 格式 | `.zip` of WhatsApp chat export(text + media)或 Google Sheet(date / customer / question / category / resolution) |
| Cadence | 一次性 90 日 backfill + 之後每週 share 上週對話 |
| 涉及隱私 | 客人 phone / name 唔需要 — 我哋只要 question text + product + 日期 |
| 涉及人員 | CS team lead 一個 contact point;每週 30 分鐘 sync |

### 拎到之後做咩

**Workflow:**

1. 過濾近 90 日,按 product category 分類
2. 抽 top 20 recurring questions(出現 ≥ 3 次)
3. 抽 top 10 complaint / friction(投訴、退貨、保養問題)
4. 每條 question / complaint → 寫做 raw note 入 research-inbox,source = `whatsapp`
5. 用 question wording 直接做 `Raw wording:`(HK 客嘅 real language,無得 fake)

**Example raw capture:**

```
Source: whatsapp
Raw wording: 「電飯煲煮完飯底成日燶,洗極都唔甩」
Product / category: 電飯煲
Customer problem: 內膽塗層老化 / 火候控制 / 唔識用 keep-warm
Possible keyword: 電飯煲飯底燶、電飯煲內膽清潔
Search intent: informational (problem-led)
Destination / CTA: parts finder(換內膽)+ how-to blog
Evidence: WhatsApp log 2026-04-15 / 2026-04-22 / 2026-05-02(3 個獨立客)
Notes: 高頻 — 排入 Q3 maintenance content
```

### Request line(paste-ready)

> 我哋需要:WhatsApp Business 過去 90 日對話 export(`.zip` 或 CSV),之後每週由 CS team lead 提供上週對話 summary(Google Sheet:日期 / question / product / resolution)。客人姓名電話可以 redact。一次 onboarding session 同 CS team 對齊分類 standard。

---

## 2. 🔒 Google Search Console (GSC)

### 要 request 咩

| 項目 | 具體 ask |
|---|---|
| Access | GSC property "Restricted user" access for 我哋兩個 email(read-only OK)|
| Property | `https://imarflex.com.hk/` 嘅 GSC property(Domain property 最好,covers 所有 subdomain) |
| Backfill | 過去 16 個月 query / page / country 數據(GSC 上限)|
| Cadence | Access 開咗就一直有 — 每週一自己 pull |
| Optional | API access(BigQuery export)如要做大量分析 |

### 拎到之後做咩

**Workflow(每週):**

1. Performance → Queries → filter HK only,過去 28 日
2. 抽 **quick-win** queries:
   - Impressions > 100
   - Position 8-20(Page 1 邊緣)
   - CTR < 5%(title / meta 可以優化)
3. 抽 **rising** queries:相對上 28 日 impressions +50% 嘅
4. 抽 **brand vs non-brand** ratio — non-brand query 升 = SEO 攻勢有效
5. 每條 quick-win → raw note,source = `gsc`,evidence 寫低 (impressions, position, CTR)

**Example:**

```
Source: gsc
Raw wording: "點揀電飯煲 香港"
Product / category: 電飯煲(IRC-20IH)
Customer problem: 唔識揀 IH vs 微壓 vs 微電腦
Possible keyword: 點揀電飯煲 香港 / 電飯煲推薦 2026
Search intent: commercial (buying guide intent)
Destination / CTA: IRC-20IH PDP + buying-guide blog
Evidence: GSC 28d — impressions 1,420, position 11.3, CTR 1.8%, clicks 26
Notes: Page 1 邊緣 — refresh title + add meta description 應可推上 top 5
```

### Request line(paste-ready)

> 我哋需要:Google Search Console property(`imarflex.com.hk` Domain property)Restricted user access for {email1}, {email2}。如未 verify Domain property,可先用 URL prefix property + DNS TXT verification(15 分鐘整好)。Access 之後唔需 client 操作,我哋自己 pull 數據。

---

## 3. 🔒 Site search / Meilisearch

### 要 request 咩

| 項目 | 具體 ask |
|---|---|
| Access | Meilisearch dashboard read-only key OR 後台 search log export(CSV)|
| Backfill | 過去 6 個月 site search query log |
| 欄位 | timestamp、query、results_count、clicked_result(如有)、session_id(不需身份)|
| Cadence | 一次性 backfill + 每週一份 weekly CSV(7 日 query log)|
| Stack note | Imarflex 而家 shopline 自帶 search;遷移後行 Meilisearch — 兩個都要 |

### 拎到之後做咩

**Workflow:**

1. **Zero-result query** — 客有搵但搵唔到 → 高 intent 缺貨 / 缺內容
   - e.g. 客搵「降糖」但搜尋拎唔到任何 SKU = PDP keyword 缺失
2. **High-volume query** — top 50 search term → 知客戶用咩字搵嘢
   - 通常同 GSC query 唔同 — site search = 已喺 site 上嘅 buying intent
3. **Search-to-click ratio low** — 有 search 但 click rate 低 = product title / image 無得 match
4. 每條 zero-result / top query → raw note,source = `sitesearch`

**Example:**

```
Source: sitesearch
Raw wording: "降糖"
Product / category: IH 電飯煲(降糖系列)
Customer problem: 搵唔到我哋已經有嘅降糖 SKU
Possible keyword: 降糖電飯煲 / 低 GI 電飯煲
Search intent: transactional (已喺 site 上找)
Destination / CTA: 降糖 IH 電飯煲 PDP — 但 PDP title 冇「降糖」keyword
Evidence: Site search log 2026-05 — 47 query for "降糖",results_count = 0
Notes: ⚠️ urgent — PDP keyword fix(改 title + tag + collection)
```

### Request line(paste-ready)

> 我哋需要:站內 search log 過去 6 個月 CSV export(欄位:timestamp / query / results_count / clicked_result_url),加 之後每週 7 日 log export。如已上 Meilisearch,可改用 dashboard read-only API key。不需 user identifying info。

---

## 4. 🔒 PostHog / analytics

### 要 request 咩

| 項目 | 具體 ask |
|---|---|
| Access | PostHog project — member access(Analyst role,read + create insight,no admin)|
| Project | Imarflex 主站 PostHog project |
| Backfill | 過去 6-12 個月 event data(視乎 retention 設定)|
| Event schema | Page view、product view(PDP)、add-to-cart、checkout 各 step、search、blog read 完成 — 確認已 instrument |
| Cadence | Access 之後自己 pull |

### 拎到之後做咩

**Workflow:**

1. **Blog → PDP funnel** — 每篇 blog 帶咗幾多 PDP 流量?bounce rate?
   - 篩出 top performer → 重複格式
   - 篩出 high traffic but low PDP click → title 啱但 CTA 弱
2. **Search → cart path** — 用 site search 嘅人有冇 convert?幾大 lift?
3. **Category drop-off** — 邊個 category page bounce 最高?可能要新 content angle
4. **Returning visitor topic affinity** — 重複客睇咩 blog?→ retention content angle
5. 每條 insight → raw note,source = `posthog`

**Example:**

```
Source: posthog
Raw wording: (PostHog insight ID #142)
Product / category: 氣炸鍋(IAF 系列)
Customer problem: blog 蝦多士食譜 traffic 高但 PDP click rate 1.8%
Possible keyword: 氣炸鍋食譜 / 氣炸蝦多士
Search intent: informational(已 reach informational 客)
Destination / CTA: 食譜 blog → 氣炸鍋 PDP — CTA 改為「即睇 IAF-30E」+ 加 mid-article PDP card
Evidence: PostHog 30d — blog 4,200 views, PDP clicks 76, CR 1.8% (benchmark 5%)
Notes: 唔係 topic 問題,係 CTA placement 問題 — 入 content production refresh queue
```

### Request line(paste-ready)

> 我哋需要:PostHog project member access(Analyst role)for {email1}, {email2}。如未 instrument PDP view / add-to-cart / search event,onboarding 第一週我哋會 spec 出標準 event schema,由 dev team 加 SDK call。無需 client 自己操作。

---

## Day-1 request list(paste-ready,合 4 個 source)

跑完每次 pitch-mode sweep,將呢個 block paste 出嚟畀 user(可直接寄畀 client):

```markdown
## Day-1 data requests — Imarflex marketing engagement

簽約後第一日希望開以下 4 個 access / data export,等我哋可以由「pitch-mode 4-source sweep」升級到「full 8-source sweep」:

1. **WhatsApp Business 對話 export**
   - 過去 90 日 .zip 或 CSV(redact 客人姓名 / 電話 OK)
   - 之後每週由 CS team lead share 上週 summary Google Sheet
   - Contact: CS team lead

2. **Google Search Console — Restricted user access**
   - Property: imarflex.com.hk(建議 Domain property)
   - Read-only OK,我哋自己 pull
   - 兩個 email:{email1}, {email2}

3. **站內 search log export**
   - 過去 6 個月 CSV(timestamp / query / results_count / clicked_result)
   - 每週 7 日 log
   - 上 Meilisearch 後改 read-only API key
   - Contact: tech / dev team

4. **PostHog project — Analyst access**
   - Read + insight,no admin
   - 兩個 email:{email1}, {email2}
   - 第一週 review event schema,如有缺項由 dev team 加
   - Contact: tech / dev team
```

呢份 request list 應該入 onboarding doc / kickoff agenda,client confirm 之後填入 `Imarflex/decisions/` 或 contract appendix。
