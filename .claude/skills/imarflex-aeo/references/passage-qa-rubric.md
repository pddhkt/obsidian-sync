# Passage-Q&A Rubric

LLM 同 AI Overviews cite content 嗰陣,拎嘅唔係成段 paragraph,係**一個 question + 一個 short answer block**。寫 content 嘅時候,目標係令每個 main section 都係一個 "quote candidate"。

## 3 件套(每個 H2 / H3 都要齊)

### 1. Question-form heading

H2 / H3 一定要可以**直接 paste 落 search bar 都自然**。寫法:

| ❌ Statement form | ✅ Question form |
|---|---|
| IH 電飯煲嘅優點 | IH 電飯煲有咩優點? |
| 風扇拆洗步驟 | 風扇點樣拆洗? |
| IRC-20IH 規格 | IRC-20IH 適合幾多人食? |
| 保養登記方法 | 伊瑪牌保養點樣登記? |

**Test:** 將個 heading 直接 paste 入 ChatGPT,如果 LLM 答得到呢條問題,就係 question form。

### 2. Direct-answer-first block(≤ 50 字)

H2 / H3 下第一句**必定**係 50 字內嘅 direct answer,**唔可以**用 "First, let's understand…" 開頭。LLM 取 quote 嗰陣只攞呢 50 字。

| ❌ Prose intro | ✅ Direct answer |
|---|---|
| 「IH 電飯煲嘅優點有好多,涉及加熱方式、煮飯口感、能源效率等各方面...」 | 「IH 電飯煲用電磁加熱整個內膽,溫度均勻,煮出來嘅飯粒粒分明、口感較好。」 |
| 「講到 IRC-20IH 適合咩家庭,我哋要先睇返佢嘅容量同功能...」 | 「IRC-20IH 容量 2L,啱 3-5 人家庭日常食。」 |
| 「拆洗風扇其實唔複雜,只要跟住以下步驟...」 | 「風扇拆洗分 4 步:斷電 → 拆網罩 → 拆扇葉 → 清潔擦乾。」 |

**Length test:** Direct answer 數字數,> 50 字就 split — 第一句做 answer,第二句開始做 evidence。

### 3. Evidence / 拓展 block(放 answer 下面)

Direct answer 之後跟住寫:
- 具體 number / spec / source
- 用家 scenario(eg「3-5 人家庭」)
- Competitor comparison(if applicable)
- Link out PDP / collection / 保養登記

Evidence block 就算 LLM 唔 cite,SEO 仲係靠呢度 rank。 兩者並存。

## Template — H2 落筆 pattern

```markdown
## [Question form heading]?

[50 字內 direct answer。一句講晒。]

[100-200 字 evidence:number、source、scenario、comparison]

[Link out:可以閱讀更多 / 睇 PDP / 預訂 / 保養登記]
```

實例:

```markdown
## IRC-20IH 啱幾多人家庭食?

IRC-20IH 容量 2L,啱 3-5 人家庭日常食。

如果家庭人數 1-2 人,可以揀返 0.6-0.8L 嘅 IRC-08 系列;5 人以上就要睇 IRC-22KS(2.2L,4-in-1 multi-cooker)。 IRC-20IH 嘅 sweet spot 係**中容量 1.5-2.2L gap** —— Panasonic / Toshiba 主流 IH 集中喺 0.45-1.0L mini SKU(source: Imarflex 2026 Q2 market scan),呢個容量段港人家庭最常用。

👉 [IRC-20IH 規格 + 訂購]
```

## Heading hierarchy

- **H1** = 1 個,blog title — 通常係 search query 變奏(eg「2026 點揀電飯煲|完整指南」)
- **H2** = 3-7 個 main question,每個對應一個 user pain point / decision
- **H3** = H2 下嘅 sub-question(if needed)— 同樣 question form,同樣 ≤ 50 字 direct answer

H1 數量超過 1 個 / H2 少於 3 個 / H2 多於 7 個 → outline 結構唔啱,先 revise 再寫 draft。

## FAQ section(必加)

每篇 blog / 長 PDP 都要有一個 **FAQ section**(H2 = 「常見問題」)。 入面寫 3-5 條 Q&A,每條:
- H3 = user-phrased question
- 答 ≤ 80 字(FAQ 答可比 inline 長啲,但唔可以 paragraph)

FAQ section 直接 map 到 schema 嘅 FAQPage(`schema-checklist.md` 講埋)。LLM 拎 FAQPage schema 入 retrieval 機會最高。

Pitch-stage source for FAQ Q:用 workflow 通用 FAQ(保養點登記、配件邊度買、容量點揀、清潔點拆洗)。 標 ⚠️。 Post-engagement 用 GSC / WhatsApp / site search 真數據,upgrade 去 ✅。

## Anti-pattern checklist

寫完一篇 article,自我 check:

- [ ] 冇任何 H2 / H3 用 statement form
- [ ] 冇任何 H2 / H3 下嘅第一句 > 50 字
- [ ] 冇 "First, let me explain..." / "讓我哋先了解一下..." 呢類過渡句頂段
- [ ] 冇 paragraph 答出嚟 buried 喺第 3-4 句
- [ ] 有 FAQ section(H2 = 常見問題)+ 至少 3 條 Q&A
- [ ] Direct answer 都係 fact 形式(可以 quote),唔係 marketing prose(「最好嘅選擇」、「無懈可擊」呢類 LLM 唔會 cite)

## Why 50 字

50 zh 字 ≈ 70-80 English token,係 ChatGPT / Perplexity / Claude / AI Overviews 拎 quote block 嘅 sweet spot。 過長 LLM 會截、過短資訊不夠 LLM cite。50 字 = 一句完整、有 number、有 scenario 嘅 fact statement。

Test 自己段 direct answer:
1. 數中文字數,目標 30-50
2. Paste 落 ChatGPT,問「呢句可唔可以做一篇 blog 嘅 quote candidate?」
3. ChatGPT 答 yes / yes with minor edit → 啱
4. ChatGPT 話「太空泛」/「冇 specific fact」→ 唔啱,改
