# AEO Audit Scorecard

5 axes,每軸 1-3 分,max 15。 ≥ 13 出街、9-12 改、≤ 8 重寫。任何軸 1 分 + 內容屬 health / safety / electrical → DQ。

## Axis 1 — Passage-Q&A structure

LLM cite content 嗰陣鍾意拎 **direct-answer block**(50 字內、頂段、唔包雜訊)。Prose-heavy article 拎唔到 quote → 唔 cite。

| Score | Criteria |
|---|---|
| **1** | 冇 question heading;全部 H2 / H3 都係 statement format(eg「IH 電飯煲嘅優點」)。Answer 埋喺 paragraph 中段。 |
| **2** | 部分 H2 / H3 用 question(「IH 電飯煲有咩優點?」),但 answer 喺 paragraph 第 2-3 句。 |
| **3** | 每個 main H2 / H3 都係 user-phrased question(「點解 IH 電飯煲煮飯好食啲?」),第一段嘅第一句就係 ≤ 50 字 direct answer,evidence / 拓展 放下面。 |

**Quick check** — 開個 markdown,睇所有 H2 / H3:
- 有冇問號?冇 → 1 分
- 有少數 question heading 但答案唔頂?→ 2 分
- 每個 main H2 / H3 都有 question 形式 + answer 喺第一句?→ 3 分

## Axis 2 — Schema markup

Schema.org structured data 幫 LLM / search engine 「machine-read」content。冇 schema = LLM 要靠 NLP 推測,citation 機會低。

| Score | Criteria |
|---|---|
| **1** | 完全冇 structured data。 |
| **2** | 基本 Product 或 Article schema 有(name + description + brand)。 |
| **3** | Layered:Product + FAQPage(at least 3 Q&A pair)+ HowTo(if 涉及 step)+ Review(if real review)。Valid syntax(過 Google Rich Results Test),無 false structured fact。 |

**Auto-DQ:** Schema 入面寫 `aggregateRating` 但 PDP 冇 review system / 冇真實 rating 數據 = false structured fact = DQ。

**Schema spec 詳見** `schema-checklist.md`。

## Axis 3 — Author identity + E-E-A-T

Google March 2026 update:author identity directly influencing page-level authority(Digital Applied 2026)。LLM 同 search engine 都 weighted real-person credentials。

| Score | Criteria |
|---|---|
| **1** | 冇 byline,或寫「Admin」/「Imarflex 編輯部」/「Editor」。 |
| **2** | Named author(eg「李志強」),但冇 credential / role description。 |
| **3** | Named author + role(eg「Imarflex 產品經理 / 10 年廚房家電 R&D」)+ 可 link out(LinkedIn / Imarflex 員工頁 / 公司 about page mention)。 |

**Auto-DQ:** Author 係 generic「編輯部」+ content 涉及醫學 / 食療 / 安全 angle(eg 降糖 IH 對糖尿病嘅影響、電器漏電風險)= DQ。

**Pitch-stage note:** Client 未提供 named author → 標 ⚠️ TBD placeholder,入 pre-engagement checklist day-1 ask。 唔可以自己 invent 名。

## Axis 4 — Statement-fact pairing

Concrete number + source + date = LLM 嘅 favourite citation pattern。 Prose claim 冇 number 或 number 冇 source = LLM 唔肯 cite(citation 出咗就要孭 hallucination risk)。

| Score | Criteria |
|---|---|
| **1** | Prose claim 冇 number / source(eg「Imarflex 嘅 IH 電飯煲煮飯特別好食」)。 |
| **2** | 有 number(eg「升溫快 30%」)但冇 source。 |
| **3** | 每個 concrete claim 有 number + source URL + date,或寫明「Imarflex internal testing 2026-MM」(post-engagement only;pitch stage 暫用公開 source)。 |

**Pitch-stage source whitelist(可用):**
- HK 政府機構(機電工程署 / 消委會 / 食安中心)
- 主流 HK media(SCMP / HK01 / Yahoo HK,但唔可以 quote 對手 brand 嘅 paid placement)
- 競品 official spec sheet(可用嚟做 comparison)
- Imarflex 自家 brand asset(spec sheet / 產品手冊)

**Pitch-stage source blacklist(禁用):**
- LIHKG / Reddit / 論壇(hard rule #3)
- 競品 negative review aggregator(法律 risk)
- Imarflex 自己未 publish 嘅 internal testing(冇 data 喺 client side 確認)
- Wikipedia(LLM 已 over-fit on Wikipedia,low citation value)

## Axis 5 — Freshness signal

LLM 偏好 recent content。 冇 date = LLM 假設 stale。

| Score | Criteria |
|---|---|
| **1** | 冇 date,無 "updated" line。 |
| **2** | 只有 publish date。 |
| **3** | Publish date + "Last updated: yyyy-mm-dd" + 寫低 review cadence(eg「Reviewed quarterly」/「Next review: 2026-08」)。 |

## Total + thresholds

| Total | Action |
|---|---|
| **13-15 / 15** | ✅ AI-citation-ready。 寫返 `aeo_score` 落 frontmatter,publish。 |
| **9-12 / 15** | ⚠️ Revise。 點名邊軸唔夠分 + 具體 fix。 返去 copywriter / brief author。 |
| **≤ 8 / 15** | ❌ Rewrite。 唔係 polish 問題,係結構唔啱 AEO。 重新 outline。 |

任何軸 1 分 + 內容屬 health / safety / electrical category → DQ(無論 total 點)。

## Auto-DQ summary

| DQ trigger | Reason |
|---|---|
| Axis 1 = 1 分 + health/safety/electrical claim | LLM hallucination risk;Google YMYL penalty |
| Schema declares false structured fact | Google penalty + brand 信譽 |
| Axis 3 = 1 分 + 醫學 / 食療 / 安全 angle | E-E-A-T fail + 法律 risk |
| Source 來自 LIHKG / Reddit / 論壇(無論幾多分) | Hard rule #3 violation |
| Fabricated citation(寫「according to X report」但冇 URL/source) | Hard rule #2 violation |

## Worked example — 降糖 IH sample blog audit

呢個係 hypothetical pitch-stage audit,演示點樣 score 同點寫 audit report。

**File:** `online-marketing/published-content/sample-blog-降糖-IH-2026-04.md`(sample,non-real)

| Axis | Score | Reasoning |
|---|---|---|
| Passage-Q&A | 2 | H2「降糖 IH 點解可以減低血糖」係 question,但 answer 喺第 2 段。Fix:answer 搬到 H2 下第一句,≤ 50 字。 |
| Schema | 1 | 冇 schema。Fix:加 Article + Product(IRC-20IH)+ FAQPage(3 個 Q&A)。 |
| Author identity | 1 | Byline 寫「Imarflex 編輯部」+ 內容涉及糖尿病食療 angle → **DQ trigger**。Fix:client 提供 named author with R&D 或 nutritionist credential,或刪去食療角度。 |
| Statement-fact pairing | 2 | 「減糖 35%」有 number,但冇 source。Fix:cite Toshiba RC-10IRPH spec sheet URL + date,或 internal testing。 |
| Freshness | 2 | 有 publish date,冇 "last updated" + review cadence。Fix:frontmatter 加 `updated_at` + `next_review`。 |

**Total: 8/15 + DQ flag(Author + Health angle)**

**Verdict:** ❌ DQ。 唔可以 publish。 唔係分數低嘅問題,係 health angle + generic author = 法律 + E-E-A-T 雙重 fail。

**Actions:**
1. Client 提供 named author with credential,或刪去「對糖尿病」嘅醫學 claim,改寫做 lifestyle angle(「適合控制飲食嘅家庭」)
2. 加 schema
3. 重 audit

---

## Worked example — IRC-20IH buying guide audit(target 13+/15)

Target structure,sample blog 寫出嚟應該 score 到:

| Axis | Score | How it gets there |
|---|---|---|
| Passage-Q&A | 3 | H2 全係 question(「IRC-20IH 啱幾多人食?」「同 Panasonic SR-CC 比邊個好?」),H2 下第一句 ≤ 50 字 direct answer |
| Schema | 3 | Article + Product(IRC-20IH 真 spec)+ FAQPage(5 Q&A)+ Review(if 有真 user review;pitch-stage 跳過) |
| Author identity | 3 | Named author + role「Imarflex 產品經理」+ 短 bio + LinkedIn link(pitch-stage = ⚠️ TBD + day-1 ask) |
| Statement-fact | 3 | 容量 2L、加熱 W 數、米種兼容 list 全部對 IRC-20IH spec sheet;competitor 比較 link out 競品 spec sheet |
| Freshness | 3 | Publish 2026-MM-DD + "Last updated" + "Next review: 2026 Q3"(對齊新 promo cycle) |

**Total: 15/15 ✅ AI-citation-ready**

Pitch-stage variant:Author = ⚠️ TBD,其他軸 keep 3 分 → 12/15。 入 day-1 ask 後 upgrade 到 15。
