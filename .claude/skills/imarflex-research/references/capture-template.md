---
type: skill-reference
skill: imarflex-research/signal-gather
area: capture-format
tags:
  - online-marketing
  - research
---

# Capture template + worked examples

呢個係 raw signal 寫入 `research-inbox/YYYY-MM/` 嘅 file format。**每個 file 一條 topic idea**。

## File naming

```
yyyy-mm-dd-{source-short}-{topic-slug-kebab}.md
```

| 部份 | Rule |
|---|---|
| `yyyy-mm-dd` | sweep 嗰日,唔係日後寫稿日 |
| `source-short` | `serp` / `fortress` / `broadway` / `pricerite` / `hktvmall` / `shopline` / `season` / `whatsapp` / `gsc` / `sitesearch` / `posthog` |
| `topic-slug` | English kebab-case 短描述(URL 慣性),例 `air-fryer-shrimp-toast`、`fan-summer-prep` |

例:

```
2026-05-26-serp-air-fryer-shrimp-toast.md
2026-05-26-fortress-fan-category-wording.md
2026-05-26-shopline-irc20ih-pdp-language.md
2026-05-26-season-q3-typhoon-prep.md
```

## File body — frontmatter + Step 3 block(預設用呢個版)

```markdown
---
type: research-note
status: raw
source: serp                  # serp | fortress | broadway | pricerite | hktvmall | shopline | season | whatsapp | gsc | sitesearch | posthog
topic: 氣炸鍋蝦多士
date: 2026-05-26
category: 氣炸鍋
focus-month: 2026-05
sku: IAF-30E                  # optional — 如 signal 對應特定 SKU
tags:
  - online-marketing
  - research
---

## Topic idea
- Source:
- Raw wording:
- Product / category:
- Customer problem:
- Possible keyword:
- Search intent:
- Destination / CTA:
- Evidence:
- Notes:
```

### Field 解釋

| Field | 寫咩 | 不要寫 |
|---|---|---|
| `Source:` | Source short name + 具體出處(URL / WhatsApp 日期 / GSC report)| 「Google」、「客戶」呢類含糊字 |
| `Raw wording:` | 用戶 / SERP / retailer 用嘅**原文** | 我哋翻譯後嘅版本 |
| `Product / category:` | Imarflex category 或 SKU,可寫多個 | 「家電」呢類太闊 |
| `Customer problem:` | 一句話講出客戶嘅 underlying need | 我哋諗到嘅 solution |
| `Possible keyword:` | 推測 SEO keyword(不需 final)| Long-tail 太具體 |
| `Search intent:` | informational / commercial / transactional / navigational | 「想知嘢」呢類非標準字 |
| `Destination / CTA:` | PDP URL / collection / parts finder / warranty / WhatsApp | 「blog」呢類無 destination |
| `Evidence:` | URL、screenshot 描述、GSC 數字、WhatsApp 日期 | 「我覺得」 |
| `Notes:` | Lead time、機會位、後續 action、warning | 寫成段 — bullet 為主 |

### Frontmatter 同 body 嘅 overlap

- `topic`(frontmatter)= 一句短 title,Obsidian 顯示用
- `source` field 喺 frontmatter 同 body 都有 — 兩個都填,frontmatter 用嚟 Bases filter
- `category`、`focus-month` 一定填 — 之後 Step 4 scoring 要按 focus 過濾

### 點解唔用 `research-inbox/_readme.md` 嗰個 free-form template?

`_readme.md` 嗰個係空白筆記版,適合 user 手 jot。我哋自動化 capture 出 Step 3 standard block,後續 Step 4 scoring + seo-keyword-research 直接食 9 個 field 唔需要重新 parse。**兩個 format 都 valid** — 但 skill 預設用呢個,因為一致性高。

---

## Worked example 1 — Competitor SERP(IH 電飯煲)

File: `2026-05-26-serp-rice-cooker-buying-guide.md`

```markdown
---
type: research-note
status: raw
source: serp
topic: 點揀電飯煲 2026
date: 2026-05-26
category: 電飯煲
focus-month: 2026-05
sku: IRC-20IH
tags:
  - online-marketing
  - research
---

## Topic idea

- Source: SERP, Google.com.hk 繁中 incognito, keyword「點揀電飯煲」
- Raw wording: 「點揀電飯煲 2026」/ PAA:「電飯煲 IH 同微壓邊個好?」/ Related:「電飯煲推薦 香港」
- Product / category: 電飯煲(IRC-20IH 旗艦)
- Customer problem: 唔識分 IH / 微壓 / 球釜 / 微電腦,唔知容量點揀
- Possible keyword: 點揀電飯煲 / 電飯煲推薦 香港 2026 / IH vs 微壓
- Search intent: commercial (buying guide)
- Destination / CTA: `/products/irc-20ih` PDP + `/collections/rice-cookers` collection
- Evidence:
  - Top 10 mostly listicle blog(Cosmo HK, UPower, ESDlife)+ 1 YouTube 比較片
  - 強競爭:Cosmo「10 大電飯煲推薦 2025」rank #1 — 但 2025 年內容,可以做 2026 更新搶
  - PAA × 4 條全部係 IH / 微壓 / 容量 / 邊隻牌子
  - Top 3 都冇香港 brand DTC angle — 機會位
- Notes:
  - Lead time:即出可搶 Q2-Q3 流量
  - 已有 sample blog `buying-guide-rice-cooker-2026-ih-vs-pressure` — 已對齊
  - SERP 缺「降糖 IH」angle — Imarflex 健康 USP 可入 H2
```

---

## Worked example 2 — Retailer / marketplace(氣炸鍋)

File: `2026-05-26-hktvmall-air-fryer-user-reviews.md`

```markdown
---
type: research-note
status: raw
source: hktvmall
topic: 氣炸鍋客戶痛點(用戶 review)
date: 2026-05-26
category: 氣炸鍋
focus-month: 2026-05
sku: IAF-30E
tags:
  - online-marketing
  - research
---

## Topic idea

- Source: HKTVmall, search「氣炸鍋」top 20 SKU user reviews(Philips / Tefal / 飛樂 / Imarflex IAF)
- Raw wording:(直接 quote review)
  - 「容量細,一家四口要分兩次炸」
  - 「網好難洗,油漬黐住」
  - 「冇 preset menu,要自己估時間溫度」
  - 「聲好大,半夜唔敢用」
- Product / category: 氣炸鍋(IAF 系列)
- Customer problem: 容量 / 清潔 / 易用度 / 噪音 — 4 大 friction
- Possible keyword: 氣炸鍋網清潔 / 氣炸鍋容量點揀 / 氣炸鍋食譜時間表 / 細廚房氣炸鍋
- Search intent: informational + commercial(已用緊 / 考慮緊買第二部)
- Destination / CTA: IAF PDP + 食譜 cluster + 清潔 how-to + parts finder(網 / 配件)
- Evidence:
  - HKTVmall search「氣炸鍋」(2026-05-26)
  - 抽 top 20 SKU,每 SKU 睇 5 條 ≥ 3 星 review
  - 容量痛點:出現 12 次;清潔痛點:9 次;preset 痛點:7 次;噪音:5 次
- Notes:
  - 「網清潔」最高頻 → maintenance blog cluster 直接題目
  - 「冇 preset menu」→ 食譜 blog 應該 quote 時間溫度 table
  - Imarflex IAF 如有 preset → PDP / blog 必須突出(check shopline)
  - Lead time:夏天煮食 angle 啱 5-7 月
```

---

## Worked example 3 — Seasonal calendar(風扇)

File: `2026-05-26-season-fan-deep-clean-seasonal.md`

```markdown
---
type: research-note
status: raw
source: season
topic: 風扇換季深層清潔(夏初)
date: 2026-05-26
category: 風扇
focus-month: 2026-05
tags:
  - online-marketing
  - research
---

## Topic idea

- Source: HK 季節 calendar — 5 月轉熱,風扇旺季啟動;客戶第一個動作 = 攞返去年部風扇出嚟用
- Raw wording: 「風扇拆洗」「風扇好嘈點算」「風扇黐塵」
- Product / category: 風扇(座枱 / 座地 / 循環)
- Customer problem: 部風扇 sit 咗一個 winter,塵 + 油 + 摩打聲 — 唔識拆 / 唔知用咩工具 / 擔心安全
- Possible keyword: 風扇深層清潔 / 風扇拆洗教學 / 風扇好嘈 / 風扇黐塵點抹
- Search intent: informational (problem-led + maintenance)
- Destination / CTA: maintenance blog → 風扇 collection PDP + parts finder(扇葉 / 摩打 spare)+ warranty(2 年保養)
- Evidence:
  - HK 5 月轉熱 → 風扇 search trend 開始升(可 cross-check Google Trends 確認)
  - 已有 sample `maintenance-summer-fan-deep-clean-guide` — 直接出街
  - Q2 focus 已列風扇旺季為主推
- Notes:
  - Lead time:即出(已遲過理想 6 週 — 但風扇旺季 5-9 月,仍然有效)
  - Repurpose:blog → IG carousel(4 frame:拆網 / 抹葉 / 摩打 / 安全注意)→ FB how-to post
  - Cross-link 到「點揀新風扇」buying guide(如已有)
  - Brand angle:Imarflex 2 年保養 + parts finder = 維修友善,對 maintenance blog 完美收尾
```

---

## Quality bar — 每個 capture 寫完問自己

- ✅ 9 個 field 全部填咗(寫「未知」都好過空)
- ✅ `Raw wording` 係**原文**唔係 paraphrase
- ✅ `Evidence` 有 URL / 日期 / 數字 — 可重 verify
- ✅ `Destination / CTA` 連到實際 Imarflex page,唔係「blog」/「social」呢類空字
- ✅ 對齊本月 `business-focus`(focus 唔包嘅 category 就唔好寫,入 backlog)
- ✅ Pitch stage 唔 fake GSC / WhatsApp 數據 — 冇就唔填,寫低「待 client data」入 Notes
