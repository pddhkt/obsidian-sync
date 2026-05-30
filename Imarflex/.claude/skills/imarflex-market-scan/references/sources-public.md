---
type: skill-reference
skill: imarflex-market-scan
area: public-sources
tags:
  - online-marketing
  - market-intelligence
---

# Public market-scan sources

呢啲 source 全部 public,pitch stage 已經做到。每個 source 有:
- 目的(咩 signal type)
- 具體 URL / search 模式 / what-to-click
- 點 read 個 inflection point
- Capture 出嚟成 bullet 嘅 shape

> [!info] 通用提醒
> 用 incognito browser、設 region = HK + 語言 = 繁體中文(Google URL 加 `&hl=zh-TW&gl=hk`)。一次 quarterly scan 唔好做超過 ~20 個 WebFetch — 質 > 量。

> [!important] Source count change
> Default quarterly scan = **6 sources**(1, 2, 4, 5, 6, 7)。Source 3(小紅書 / 抖音)現時 marked **❌ unreliable at pitch stage**,opt-in only — 詳見 §3。Source 8(paid reports)依然 optional。

> [!warning] Universal fetch-quality principle — Google `site:` search is primary, direct URL is enhancement
> 香港 retailer + brand HK 官網絕大部份係 SPA(JavaScript-rendered),WebFetch 攞到嘅 HTML 通常只有 navigation shell,**冇實際 listing / SKU 資料**。對所有 retailer + brand source:
>
> 1. **第一步**:用 Google `site:{domain} {category} {qualifier}`(eg `site:hktvmall.com 電飯煲 IH 暢銷`)— 通過 Google index 拎 SKU titles
> 2. **第二步(enhancement)**:如有時間 / 配額,WebFetch direct URL 試確認
> 3. **如果只係靠 direct URL 拎到 nav shell** → 嗰條 bullet 自動 downgrade 做 ⚠️
>
> 呢條 rule 由真實 eval 確認:HKTVmall / Fortress / Broadway / Pricerite / Panasonic HK / Toshiba HK / Tiger HK / Iris Ohyama HK 都係 SPA。

---

## 1. Google Trends(HK 區)

### 目的

Macro 興趣趨勢:邊個 category / keyword 喺香港搜尋量過去 30 日 / 12 個月 / 5 年點變、季節 peak 喺幾月、有冇 inflection、有咩 Related Rising sub-query。

### Working access pattern(2026-05-27 confirmed)

> [!success] Playwright CLI(agent-browser)work — WebFetch 唔得
> 2026-05-27 retest confirmed:**agent-browser CLI**(Playwright isolated Chromium)成功 fetch `/explore` + `/trending` 兩個 endpoint,WebFetch 仲係 return JS shell 攞唔到實際數據。 落地用 agent-browser,WebFetch 完全 deprecated 喺呢個 source。

**Two endpoints, two different signals:**

| Endpoint | URL pattern | 用嚟答 |
|---|---|---|
| `/explore` | `https://trends.google.com/trends/explore?geo=HK&q={kw}&date=today%201-m` | 邊個 keyword 喺 HK 30 日點 trend、related Rising / Top 10 |
| `/trending` | `https://trends.google.com/trending?geo=HK` | HK realtime trending-now(celebrity / news / event,有 category filter)|

**Concrete agent-browser sequence**(per seed):

```bash
agent-browser open "https://trends.google.com/trends/explore?geo=HK&q={kw_urlencoded}&date=today%201-m"
agent-browser wait 3000                    # 等 chart render
agent-browser snapshot                      # 拎 30-day time series + Related Rising 1-5
agent-browser scroll down 1200              # 落 Related Queries
agent-browser snapshot                      # Related Rising 6-10 + Related Top + Topics
agent-browser click @{next_button_ref}      # 翻頁 if needed
sleep 30                                    # 30 秒 sleep 防 IP-level 429
```

Compare mode(最多 5 個 keyword):`https://trends.google.com/trends/explore?geo=HK&q={kw1},{kw2},...,{kw5}&date=today%2012-m`

### Default = 30-day window first(NOT 12-month)

`?date=today 1-m` 比 default(12-month)觸發 lighter rate limit。 30-day 行得通先;12-month / 5-year query 只喺需要 seasonal pattern confirmation 嗰陣用(eg 風扇旺季 5-9 月);queries quoted of 5-year 嗰陣分批,每批之間 sleep ≥ 60 秒。

### Seed keyword list

完整 24-seed list(9 category + 5 brand + 5 comparison + 5 long-tail problem)→ `references/seed-list-hk.md`。 唔好 ad-hoc 寫 keyword 入 scan,跟 seed list 確保 quarter-over-quarter 可比。

### Realtime trending-now sweep(separate workflow)

每月一次 5 分鐘 sweep `https://trends.google.com/trending?geo=HK`,用 category filter check:

- Food and Drink
- Hobbies and Leisure
- Technology
- Health
- Shopping

大部分 month return nothing relevant for Imarflex;value 喺**catch trend 爆發嘅嗰個月**(heatwave week → 風扇 spike、viral 食譜 → 氣炸鍋 spike、Mother's Day → 電飯煲 spike — 2026-05-10 已 confirmed 過 peak 100)。

### 點 read inflection point

對每條 keyword:

1. **12 個月 view** — 升 / 跌 / flat?
   - 升 ≥ +50% vs baseline → ✅ 升勢
   - 跌 ≥ -30% vs baseline → ⚠️ 萎縮(可能要考慮 drop category)
   - Flat ±20% → noise,唔記
2. **5 年 view** — 呢個係新 trend 定季節循環?
   - 每年同期都有 peak = 純季節,唔係新 signal
   - 過去 5 年首次見 peak / 新高 = ✅ 結構性升勢
3. **季節 peak 月份** — 對齊 Imarflex 6-8 週 lead time(eg 5-9 月風扇 = 3 月開始鋪 backlog)
4. **Related queries → Rising** — Google 自己 detect 嘅 fast-rising sub-query,係最早 inflection signal
5. **Related queries → Top** — 同 category 一齊搜嘅 keyword,可推 cluster

### Anti-noise

- Single-month spike < +30% → 唔記(noise)
- Pandemic / 新聞 event 引起嘅 spike(eg 颱風後抽濕機)→ 標 ⚠️ "event-driven",唔當 structural
- Keyword 太低基數(< 25 baseline)→ Google Trends 數據 noisy,標 ⚠️

### Fallback — 429 / fetch failure

Agent-browser(Playwright)work 大多數時候,但 IP-level rate limit 仲可以 trigger,尤其連續 quick query 嗰陣。 處理方式:

| 失敗模式 | 處理 |
|---|---|
| HTTP 429 喺 `/explore` | (a) 等 60 秒 retry 同條 query;(b) 仲係 429 → fallback 去 `/trending?geo=HK` 攞 realtime signal(雖然唔等價);(c) 重啟 agent-browser session(`agent-browser close` then 重 open);(d) 全部失敗 → 嗰條 seed 嘅 bullet 自動 ⚠️ data-unavailable,記入 scan output 嘅 sources-used block。 唔好 fabricate % |
| `/explore` 12-month 持續 429 但 30-day work | Default 用 30-day,12-month signal 標 ⚠️「awaiting 12-m retest next scan」 |
| `/trending` work 但 `/explore` 唔得 | 攞 trending-now category filter(Food/Drink / Hobbies / Technology / Health / Shopping)做 partial scan,寫 ⚠️「explore unavailable,trending-only this scan」|
| Keyword baseline < 25 | ⚠️ data-noisy,即使有數都標。 通常 model number(eg IRC-20IH)會踩呢個 |
| 完全 fetch 失敗(agent-browser 唔通)| Raw notes 寫「Source 1 agent-browser failed @ {timestamp}」+ 用 Source 5(HK media listicle)+ Source 7(Amazon JP)做 proxy,但要明確標 ⚠️「proxy for Trends not available」|

> [!important] Rate-limit anti-pattern
> ❌ 連續 quick query 唔 sleep — 多 query 嗰陣會被 IP-level 429 鎖
> ✅ Per-query 30 秒 sleep(seed-list-hk.md 嘅 run protocol)
> ✅ 連續 ≥ 10 queries 之後加 1 次 60 秒 cooldown

`agent-browser` 失敗時,**唔好**改用 `browser-use` 或 raw playwright 重試 — 2026-04 / 2026-05 eval confirm 三個 tool 都 share 同一個 IP-level rate limit window,換 tool 唔解決問題。 真係 trigger 咗 → 等 ≥ 60 分鐘 cooldown,或 fall back 落 `/trending` endpoint。

> [!danger] Anti-pattern
> ❌ **唔好用 WebSearch 喺 listicle 上面攞「升 X%」呢類數,當做 Trends 數據**。Listicle 嘅「推介」/「熱賣」≠ search-volume trend %。Listicle 屬於 Source 5,唔係 Source 1。

### Capture shape

```
✅ Google Trends HK「{keyword}」過去 {timeframe} {direction +/-}%,{seasonal pattern} → {implication for category bet}
```

範例:

```
✅ Google Trends HK「水冷扇」過去 12 個月升 180%,2026 Q2 確認 seasonal peak signal → Q3 風扇主力中加水冷扇 sub-category
```

---

## 2. HKTVmall / 豐澤 / 百老匯 / 實惠 bestseller pages

### 目的

8 週 rolling SKU rank changes。Retailer bestseller = 香港實際 transaction signal,比搜尋 trend 更接近 conversion。

### URL / what-to-click

> [!warning] HKTVmall / Fortress / Broadway / Pricerite 全部係 SPA(JS-rendered)
> Eval 確認:呢 4 個 retailer site direct WebFetch return 嘅 HTML **只係 navigation shell**,**冇實際 listing / SKU 資料**。即使舊 category URL pattern(eg `hktvmall.com/.../category/AA11710000000`)亦已 stale / 404。
>
> **Primary 方法 = Google site search**(direct URL 係 enhancement,唔係 primary):

```
site:hktvmall.com {category} 暢銷
site:hktvmall.com {category} 熱賣
site:fortress.com.hk {category} 熱賣
site:broadway.com.hk {category}
site:pricerite.com.hk {category}
```

呢個 search 會 return Google index 入面 SKU 嘅 title + URL,即使 SPA block WebFetch 都 work。

| Retailer | Direct URL(enhancement only) | 備註 |
|---|---|---|
| HKTVmall | `https://www.hktvmall.com/` + Google site search | URL pattern 不時變,舊 category id 易 404 |
| 豐澤 Fortress | `https://www.fortress.com.hk/zh/` + Google site search | Direct buying-guide page 經常 return 403 |
| 百老匯 Broadway | `https://www.broadway.com.hk/zh-hk/` + Google site search | 同上 |
| 實惠 Pricerite | `https://www.pricerite.com.hk/zh/` + Google site search | 細家電 focus |

### Pitch-stage 限制 — 冇 8-week rank persistence

> [!important] Pitch stage 攞唔到 sustained rank
> Pitch stage(冇 client 提供 retailer authenticated session)只能由 Google site search **single snapshot** 攞 SKU title。**冇 8-week rolling rank 數據**。任何寫住「連續 X 週 top 10」/「sustained ranking」嘅 bullet 喺 pitch stage 一律 ⚠️;只有 hired mode + client 提供 retailer access 之後先可以升 ✅。
>
> Pitch-stage proxy for retailer bestseller = **Source 5(HK media listicle)**:HK 編輯做 listicle 嗰陣會引用 retailer top picks,即係 editor curate 緊 current bestseller。Source 5 ≠ Source 2,但兩者 align 嗰陣可以互相 confirm。

### 主力 category 對 Imarflex 嘅關係

| Retailer category | Imarflex category | 點解要監察 |
|---|---|---|
| 電飯煲 / 多功能煲 | IRC-20IH / IRC-22KS | Top 10 邊個 brand 鎖位、容量分佈 |
| 氣炸鍋 | IAF 系列 | 容量分佈、價位 band、bundle 角度 |
| 風扇 | 風扇系列 | 座枱 / 座地 / 水冷 / 無葉 嘅 ratio |
| 抽濕機 | 抽濕機 | 容量 band、品牌集中度 |

### 點 read SKU rank

1. **Top 10 brand 集中度** — 1-2 個 brand 鎖晒 = 難擠入;5+ brand 分佈 = 有空間
2. **容量 / 規格 cluster** — 例:氣炸鍋 top 10 入面有 7 個係 ≥ 5L 容量 → 細容量(2-3L)係 gap
3. **價位 band** — Imarflex 對應 band 邊個位?入門 / 中價 / 旗艦各有幾多 SKU?
4. **新品上榜時間** — 新 SKU 上榜後幾週入到 top 10 = 反映 brand push 強度
5. **8 週 sustained rank** — 單週 spike 唔算。要 ≥ 8 週連續 top 10 / 連續 +5 位 先當 structural signal
6. **空白 angle** — 邊個 sub-category 完全冇 SKU?eg「降糖 IH 電飯煲」係 HKTVmall 搵唔搵到?

### Anti-noise

- 大促 day(雙 11、書展、年中)後 1 週 rank 必跳 — 唔當 signal
- 同一 brand 多 SKU 連續上榜 = brand SEO / push,唔係 organic demand
- Bestseller rank 受 retailer pricing / placement 影響大 — 要 cross-check Google Trends 同方向

### Capture shape

```
✅ {retailer} {category} bestseller {timeframe} {observation} → {gap / opportunity for Imarflex}
```

範例:

```
✅ HKTVmall 廚電 bestseller 連續 8 週見氣炸鍋占 top 10 一半,但 SKU 集中喺 ≥ 5L 大容量 → 細容量(2-3L)氣炸鍋有 gap,啱 IAF 入門款 push
```

```
⚠️ Fortress 抽濕機 top 10 80% 係 Mitsubishi / Panasonic,Imarflex 未上榜 → 直接打 price 唔贏,要 reposition(eg 細空間 / 經濟款)
```

---

## 3. 小紅書 / 抖音(HK-tagged 文化 / lifestyle cluster) — ❌ Unreliable at pitch stage

> [!danger] Status: ❌ Unreliable at pitch stage by default — opt-in only
> Eval(2026-05)確認:`site:xiaohongshu.com {keyword}` Google site search 喺 pitch stage **return login shells + recruitment pages,唔係實際 content**。直接 fetch xiaohongshu.com / douyin.com web 版要 login,亦無法 access。
>
> 因此:
>
> - **本 source 已由 default quarterly scan 移除** — default scan 現時係 6 sources(1, 2, 4, 5, 6, 7)
> - **Opt-in only** — 只有當 user 自己手動研究(logged-in 手機 app screenshot / 付費 scraping service)拎到實際 post + engagement 數,先用呢個 source 寫 bullet
> - 以下保留嘅 keyword cluster + read 規則,係**畀 user manual research 嘅參考**,**agent 自動 fetch 唔會 return 真實 signal**
> - 任何 ⚠️ 標住「小紅書 cluster 觀察」嘅 bullet 喺 default scan 入面**唔可以**出現,除非有附 user-provided screenshot evidence

### 目的(如 user 手動提供 evidence)

Macro 文化 / lifestyle cluster signal — 香港人 / 用家而家對「家電」呢個概念有咩新 lens(細廚房、學生宿舍、露營、寵物友善...)。呢個係 leading indicator,通常 6-12 個月後反映喺 Google 搜尋。

### URL / 搜尋模式(reference only — agent fetch 唔 work)

```
小紅書: https://www.xiaohongshu.com/search_result?keyword={keyword}
抖音:   https://www.douyin.com/search/{keyword}
```

(小紅書 web 版而家要登入,Google `site:xiaohongshu.com` 喺 eval 入面只 return shell pages — 唔係 viable fallback。)

### 必查 keyword cluster

| Cluster | Keyword combo |
|---|---|
| 香港居住空間 | 香港細廚房家電、劏房家電、香港學生宿舍家電、納米樓家電 |
| Lifestyle 場景 | 露營家電、寵物友善家電、單身家電、新婚家電 |
| 健康 | 降糖飯、低 GI、減糖家電、減脂家電 |
| 收納美學 | 日系家電、北歐家電、櫥櫃式家電、嵌入式家電 |
| 香港地區性 | 香港主婦廚房、HK kitchen tour、香港小家庭 |

### 點 read cluster

1. **同 cluster 內 organic post 數** — ≥ 5 條近 3 個月新 post = cluster active
2. **同 cluster 跨 KOL 數** — ≥ 2 個非互相 reference 嘅 KOL = 真 cluster 唔係單一 push
3. **Post engagement** — 一般 post likes count 喺呢個 cluster 嘅 baseline 點?過 baseline 2x = 真 viral signal
4. **HK 地理 tag** — 帶「香港」/「HK」/「九龍」等 tag 或 visible HK landmark 嘅 post,先當 HK-relevant
5. **Comment 用戶 question** — comment 入面有冇人問「邊度買」「邊隻牌子」= conversion intent

### Anti-noise

- 單一 viral post 唔算 cluster signal,要 ≥ 5 條 same-theme post
- 純 mainland China cluster(冇 HK tag / HK 地點 / HK 用戶)— 唔當 HK signal,只當 leading indicator
- KOL paid sponsor post(有 #廣告 / #ad)— exclude
- 「家電 unboxing」呢類 generic 內容 — 唔算 cluster

### Capture shape

```
{✅/⚠️} 小紅書 / 抖音 HK-tagged「{cluster name}」近 {timeframe} {volume signal} → {implication for category / angle / content cluster}
```

範例:

```
⚠️ 小紅書「香港細廚房家電」cluster 近 90 日見 8 條 organic post 跨 3 KOL,主題集中喺 multi-cooker / 細容量氣炸鍋 → leading indicator,Q3 可試 IRC-22KS 細家庭 angle,但未 confirm convert HK Google 搜尋 → ⚠️ 下季 validate
```

---

## 4. 競品新品 watch

### 目的

主要日系 + 韓系 + 本地 brand 嘅 HK SKU 上架月度 diff。新品上架直接撞到 Imarflex hero SKU = 要喺 content 處理(buying guide 加對比段、PDP 加 differentiator)。

### Watch list — 競品 brand HK 站

> [!warning] Primary 方法 = Google `site:` search
> 大部份 brand HK 站係 SPA(eg `panasonic.com/hk/.../rice-cooker.aspx` direct fetch return empty shell)。**Direct URL primary 已失效**,要靠 Google site search 拎 SKU title。多個 brand HK 域 DNS 已 dead — 見下表「Fetch status」欄。

| Brand | HK 官網 / domain | Fetch status(2026-05 eval)| Primary 方法 |
|---|---|---|---|
| Panasonic HK | `panasonic.com/hk/consumer/kitchen-appliances.html` | ⚠️ Direct return shell only | `site:panasonic.com/hk {category}` |
| Toshiba HK | `toshiba-lifestyle.com/hk/` | ⚠️ Direct partial | **Primary**:`site:toshiba-lifestyle.com/hk {category}`(direct URL 易 return empty)|
| Sharp HK | `sharp.com.hk/zh-hk/` | ⚠️ Direct partial | `site:sharp.com.hk {category}` |
| Tiger HK | `hk.tiger-corporation.com` | ❌ **DNS dead(ECONNREFUSED)** | **Primary**:`site:tiger-corporation.com 香港 {category}`;SGP fallback `tiger-corporation.com.sg` |
| Zojirushi HK | `zojirushi.com.hk` | ⚠️ Direct partial | `site:zojirushi.com.hk {category}` |
| Iris Ohyama HK | `irisohyama.com.hk` | ❌ **DNS dead** | **Primary**:Price.com.hk + YOHO HK + HKTVmall product title via `site:` search;`site:irisohyama.com.tw {category}` 做 secondary |
| 飛樂 / 德國寶 / Rasonic | 各自 HK 官網 | ⚠️ Direct partial | `site:{domain} {category}` |

> [!info] DNS-dead brand site 處理
> Tiger HK 同 Iris Ohyama HK 嘅 brand domain 喺 eval 入面 ECONNREFUSED。**唔好寫「fetch failed」就放棄** — 用 HK retailer + price aggregator(Price.com.hk、YOHO HK)+ regional brand site(Tiger SGP / Iris Ohyama TW)拼湊出當前 HK SKU。Capture 落 raw notes 時清楚標 source 攞自邊。

### Watch 方法

1. **Monthly Google site search + diff** — 每月 1 號(或 quarterly scan 時)用 Google site search 對每個 brand 嘅 HK domain 跑「{brand} HK 新品 {yyyy-mm}」/「{category} site:{domain}」
2. **HK retailer cross-check** — 新 SKU 喺 Fortress / HKTVmall site search 已有 ≠ 純 PR launch
3. **Press release scan** — Google 搜「{brand} HK 新品 {year-month}」/「{brand} 香港 推出」拎 PR
4. **YouTube / Facebook brand page** — 香港 brand page 通常會出 unboxing 短片
5. **Direct WebFetch 係 enhancement** — return shell / 403 / DNS dead 全部 normal,唔當 scan failure;只要 Google site search 有 result 就照 capture

### Capture filter

- ✅ SKU 已 listed 喺 brand HK 官網 + 至少 1 間 HK retailer
- ⚠️ Global launch 但 HK 未上架 — leading indicator,標 ⚠️
- ❌ 純 PR / 未開賣 — 唔算 signal

### Anti-noise

- Brand 重新包裝舊型號 — 唔算新品。Check 之前 SKU 數據比對
- Refresh colorway 唔算 — 要新 spec / 新功能 / 新 positioning
- Brand HK 站轉 layout 導致 page reshuffle — 唔當 launch

### Capture shape

```
✅ {Brand} HK {yyyy-mm} 推 {model} {key feature},直接撞 {Imarflex hero SKU} 嘅 {positioning} → {action: buying-guide 對比段 / PDP 加 differentiator}
```

範例:

```
✅ Panasonic HK 2026-04 推 SR-CX 新款 IH(壓力 + 球釜),直接撞 IRC-20IH 嘅 IH + 健康定位 → IH 電飯煲 buying-guide 必加對比 H2,PDP 要強調「降糖 IH」差異化
```

```
⚠️ Iris Ohyama 2026-03 全球出 2.5L 細容量氣炸鍋,HK 未上 → leading indicator,Q3 監察 HK 上架時機
```

---

## 5. HK media editorial agenda

### 目的

香港 lifestyle / 消費 media 喺呢個 category 寫緊咩。Media listicle 反映「編輯估計呢個月讀者會點」+ 同 Google 對齊嘅 commercial intent topic。

### Watch list — HK media

| Outlet | 點關事 |
|---|---|
| U Lifestyle(UPower / U Magazine)| 家電推介、廚電 listicle 主力 |
| Mill MK / Mill News | 男性向家電 / 數碼產品 |
| FashionOne / FashionOne HK | Lifestyle 廚電 / 美容家電 |
| Yahoo Style HK | Lifestyle + shopping |
| Cosmopolitan HK / Esquire HK | 高端 lifestyle 廚電 |
| HK01 飲食 | 食譜搭配家電 |
| ESDlife / Weekend Weekly | 家庭主婦向 |
| HKEPC / Unwire / Stuff HK | 科技 / 數碼向(風扇 / 抽濕機)|

### 搜尋模式

```
Google: "{category} 推介 {year}" site:upower.com.hk
Google: "{category} 推薦 {year}" site:hk01.com
Google: "點揀 {category}" site:cosmopolitan.com.hk
```

或者直接 Google search 唔限 site:

```
"{category} 推介 2026" OR "{category} 推薦 2026"
```

### 必查 listicle 關鍵字(每月做一次)

- 電飯煲推介 2026 / 點揀電飯煲
- 氣炸鍋推薦 2026 / 氣炸鍋邊隻好
- 風扇推介 2026 / 水冷扇 點揀
- 抽濕機推介 2026
- 多功能煲 / Instant Pot 推介
- 滅蚊燈推介 / 捕蚊燈 邊隻

### 點 read editorial signal

1. **同月 ≥ 2 間 outlet 寫同 category** = editorial 同步,呢個 category 真係熱
2. **Listicle 入面 brand 排序** — Imarflex 出現位置 / 完全 absent?
3. **Listicle 提到嘅 dimension** — 編輯用咩字 frame「點揀」(eg「容量」/「IH 類型」/「保養」)→ 對齊 Imarflex content angle
4. **Repeat 季節 listicle** — 一個 outlet 每年同期都寫(eg「夏天風扇推介」)= evergreen pattern,先 publish 6-8 週 前可搶位

### Anti-noise

- 純 advertorial(有「贊助」/「Sponsored」標)— exclude
- Outlet 抄 outlet — 內容雷同 ≥ 70% 算同一 piece
- 1 間 outlet 單篇文 — 唔算 trend

### Capture shape

```
{✅/⚠️} HK 媒體 {timeframe} {outlet count} 間覆蓋 {category} listicle,{key observation} → {implication}
```

範例:

```
✅ HK 媒體 2026-04 至 05 期間 3 間 outlet(UPower、Yahoo Style、Cosmo)出「夏天電風扇推介」listicle,但 Imarflex 全部缺席 → buying-guide blog + PR 投稿要爭呢個位
```

---

## 6. LIHKG / Reddit r/HongKong 家電 / 煮食 threads

### 目的

純 sentiment trend reading — 香港用戶私下講家電 / 牌子 / 痛點嘅 macro mood。**唔做 quote source**(法律 / 私隱)。

### URL / 搜尋模式

```
LIHKG: https://lihkg.com/search?q={keyword}&type=topic
Reddit: https://www.reddit.com/r/HongKong/search/?q={keyword}
Reddit: https://www.reddit.com/r/HongKong/search/?q={keyword}+appliance
```

### 必查 thread 主題

- 邊隻電飯煲好 / IH 電飯煲推介
- 氣炸鍋邊隻好 / 氣炸鍋推介
- 抽濕機推介 / 邊隻抽濕機好
- 細家庭家電 / 學生家電
- 伊瑪牌 / Imarflex(本品牌 mention)
- Panasonic / Toshiba / Tiger 比較
- 保養 / 維修(brand reputation)

### 點 read sentiment

1. **主流 brand mention 頻率** — Imarflex 出現比例 vs Panasonic / Toshiba(估市場 mindshare)
2. **正 vs 負 sentiment ratio** — 唔逐句 quote,睇整體傾向
3. **痛點 cluster** — 多個 thread 重複提及嘅同類問題(eg「電飯煲內膽塗層好快脫」)→ 整個 category pain
4. **品牌 reputation 變化** — 某 brand 過去 6 個月有冇集中負評(召回 / 維修慢 / 質素問題)
5. **本地用法 / 本地語境** — eg「劏房用邊個風扇好」/「800 呎用咩抽濕機」

### Anti-noise / hard rules

- ❌ **永遠唔 quote 個別 post 做 source**(法律 / 私隱 / ToS)
- ❌ 唔將 LIHKG / Reddit 內容寫入 Imarflex blog 或 social
- ✅ 只用 aggregate sentiment trend(eg「3 個 thread 提到 brand X 售後差」)
- ✅ Brand-自己提及(Imarflex)可做 brand reputation 警示
- 政治 / 不相關 thread — exclude

### Capture shape

```
{✅/⚠️} LIHKG / Reddit {timeframe} {category} thread aggregate sentiment {observation} → {implication for brand positioning / content angle}
```

範例:

```
⚠️ LIHKG 過去 90 日「電飯煲推介」相關 thread 5 條,Panasonic / Tiger / Zojirushi mention 占 70%,Imarflex 完全缺席 → brand mindshare 弱,需要 community-friendly content(技術深度 buying guide)切入,但唔可以直接 quote thread
```

```
✅ LIHKG 過去 60 日見 3 條 thread 集中講「抽濕機聲大 / 耗電」痛點 → 抽濕機 PDP 要強調「靜音 dB」+「能源效益標籤」spec
```

---

## 7. Amazon JP / TW bestseller(6-12 個月 leading indicator)

### 目的

日系家電通常喺日本 / 台灣先紅,然後 6-12 個月後傳到香港。Amazon JP / TW bestseller 係**未來季 Imarflex 應該揀邊條 category** 嘅 leading indicator。

### URL / what-to-click

```
Amazon JP 家電 bestseller:
https://www.amazon.co.jp/gp/bestsellers/kitchen/
https://www.amazon.co.jp/gp/bestsellers/home-appliances/

Amazon TW 家電 bestseller:
https://www.amazon.com.tw/b?node=24062048051   (廚房家電)
https://www.amazon.com.tw/b?node=24062045051   (季節電器)
```

或 Google search:`site:amazon.co.jp bestseller {category}` / `site:amazon.com.tw 暢銷 {category}`。

### 主力 category map

| Amazon JP / TW category | Imarflex 對應 |
|---|---|
| 炊飯器 / 電子鍋 | 電飯煲 |
| エアフライヤー / 氣炸鍋 | 氣炸鍋 |
| 扇風機 / 冷風扇 / 電風扇 | 風扇 / 水冷扇 |
| 除湿機 / 除濕機 | 抽濕機 |
| 多機能調理器 / 多功能料理鍋 | 多功能煲 |
| 蚊取り器 / 捕蚊燈 | 滅蚊燈 |
| セラミックファンヒーター / 陶瓷暖風機 | 暖風機 |

### 點 read JP / TW top 50

1. **同 sub-category 入面 top 50 SKU count** — ≥ 3 款同主題 SKU(eg 細容量氣炸鍋)= cluster signal
2. **持續週數** — 持續 ≥ 4 週 top 50 = sustained signal(避免大促 spike)
3. **價位 band** — JP / TW 平 vs 貴 SKU 分佈,推估 HK 對應 band
4. **新功能** — Top 50 入面有冇 unprecedented feature(eg「無段火力」/「app-control」)?HK 6-12 個月後可能跟
5. **JP vs TW divergence** — TW 接近 HK 文化(中文 / 細屋),signal 比 JP 更直接;JP 領先時間更長

### Anti-noise

- 大促 day(Amazon Prime Day、雙 11)後 1 週 rank — 唔當 signal
- Brand 集中度過高(1 brand 占 top 50 > 60%)= push 唔係 organic demand
- 純 JP 文化 SKU(eg 日式茶器、特殊調理具)— HK 未必跟

### Capture shape

```
{✅/⚠️} Amazon {JP/TW} {category} 過去 {timeframe} top 50 出現 {N} 款 {sub-cluster},{persistence} → {HK leading indicator window} 可能 / 未必跟 → {action}
```

範例:

```
✅ Amazon JP「冷風扇」過去 6 個月 top 50 持續見 3 款不同 brand,日本領先 HK 通常 6-12 個月 → HK 2026-Q4 / 2027-Q1 可能跟風,Q3 鋪水冷扇 backlog 試水
```

```
⚠️ Amazon TW「細容量氣炸鍋」top 50 見 4 款 ≤ 2.5L SKU 持續 4 週,但 HK retailer 而家全部係 ≥ 5L → 標 ⚠️,下季 cross-check HKTVmall bestseller 有冇 shift
```

---

## 一次 quarterly full scan 嘅 minimum capture

Default quarterly full scan **跑 6 sources**(1, 2, 4, 5, 6, 7);Source 3 opt-in,只有 user 提供 manual evidence 先入。

跑完之後 raw signal pool 應該有:

- ≥ 3-5 條 Google Trends signal(每個 priority category 至少 1)— **如 Source 1 fetch fail 全部 ⚠️**
- ≥ 3 條 retailer bestseller observation(HKTVmall + 1 其他 via Google site search)— **pitch stage 全部 ⚠️(冇 8-week persistence)**
- ≥ 2 條 競品新品(過去 90 日)
- ≥ 2 條 HK 媒體 editorial signal(過去 90 日)
- ≥ 1 條 LIHKG / Reddit sentiment trend(過去 90 日)
- ≥ 2 條 Amazon JP / TW leading indicator
- (opt-in)≥ 1-2 條 小紅書 / 抖音 cluster — 只有 user manual evidence 提供先計

然後 distill 去 5-10 條 bullet — 見 `scan-output-template.md`。

> [!warning]
> Raw signal pool 唔等於 output。Distill 去 bullet 嗰陣要 enforce noise filter — single source signal 通常會被 drop 或標 ⚠️,雙 source confirm 嘅至少 ✅。
>
> Pitch stage 嘅實際 fetch landscape(SPA / 429 / DNS dead)令 ⚠️ 偏多係 normal,**唔好為咗湊 ✅ 而 overstate evidence**。Stage-aware ⚠️ rule 見 `cadence-and-triggers.md`。
