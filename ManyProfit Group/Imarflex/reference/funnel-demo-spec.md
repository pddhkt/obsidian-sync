# Funnel Section — HTML Slide Spec

**用途:**Pitch 入面「Funnel 視角」呢個 section 嘅 HTML 實現指引。
**目標:**Click 階段 → iframe 即場 demo 真網,展示我哋整咗咩。

---

## 整體 Layout(Desktop)

```
┌─────────────────────────────────────────────────────────────┐
│  Section 標題:Funnel 視角 — 我哋整嘅嘢點變銷售?              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐  ┌──────────────────────────────────────────┐│
│  │ 階段 List │  │                                          ││
│  │           │  │                                          ││
│  │ 1. 認知   │  │      iframe                              ││
│  │ 2. 興趣   │  │      (imarflex-app.vercel.app)          ││
│  │ 3. 考慮   │  │                                          ││
│  │ 4. 購買   │  │                                          ││
│  │ 5. 重複   │  │                                          ││
│  │ 6. 倡導   │  │                                          ││
│  │           │  └──────────────────────────────────────────┘│
│  │           │  ┌──────────────────────────────────────────┐│
│  │           │  │ 預期影響 + 我哋整咗咩(active 階段嘅資料)││
│  └──────────┘  └──────────────────────────────────────────┘│
│                                                             │
│  底部:倡導 → 認知 loop 視覺化                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Mobile Fallback(Flywheel View)

當寬度 < 768px,iframe 唔好用(太細),改用 Option B 嘅 flywheel circular layout:

```
        認知
      ↗      ↘
  倡導         興趣
   ↑    🔄    ↓
  重複         考慮
      ↖      ↙
        購買
```

每個圈 click 展開細節(冇 iframe demo,純文字),箭咀順時針流。

---

## 6 階段 Mapping(Desktop iframe)

| # | 階段 | iframe URL | Highlight 資訊 |
|---|------|-----------|----------------|
| 1 | 認知 | `/blog` | 預期:Organic +50%、品牌搜尋 +30% / 整咗:SEO 基礎、Blog SEO、Core Web Vitals |
| 2 | 興趣 | `/` | 預期:Bounce -20%、Session +40% / 整咗:視覺一致、heritage、bento layout |
| 3 | 考慮 | `/products/iaf-30e-air-fryer` | 預期:Add-to-cart +25% / 整咗:PDP 文案、reviews(add-on)、retail links、Trade-in |
| 4 | 購買 | `/cart` | 預期:CR +20-40%、棄單 -15% / 整咗:自建 checkout、Airwallex、cart drawer |
| 5 | 重複 | `/parts-finder` | 預期:重複率 0% → 15-20%、LTV +50% / 整咗:找配件、保養、Email 自動化 |
| 6 | 倡導 | `/products/iaf-30e-air-fryer` (滾去 reviews 區) | 預期:Referral 5-10% / 整咗:Reviews(add-on)、Referral(add-on)、UGC |

---

## HTML 實現(Vanilla JS + iframe)

### 結構

```html
<section class="funnel-section">
  <h2>Funnel 視角 — 我哋整嘅嘢點變銷售?</h2>

  <div class="funnel-layout">
    <!-- 左邊:階段 list -->
    <ul class="funnel-stages">
      <li data-stage="awareness" data-url="https://imarflex-app.vercel.app/blog" class="active">
        <span class="num">1</span>
        <span class="title">認知</span>
        <span class="subtitle">客戶搵緊家電</span>
      </li>
      <li data-stage="interest" data-url="https://imarflex-app.vercel.app/">
        <span class="num">2</span>
        <span class="title">興趣</span>
        <span class="subtitle">值得睇下</span>
      </li>
      <li data-stage="consideration" data-url="https://imarflex-app.vercel.app/products/iaf-30e-air-fryer">
        <span class="num">3</span>
        <span class="title">考慮</span>
        <span class="subtitle">比較緊</span>
      </li>
      <li data-stage="purchase" data-url="https://imarflex-app.vercel.app/cart">
        <span class="num">4</span>
        <span class="title">購買</span>
        <span class="subtitle">落單啦</span>
      </li>
      <li data-stage="retention" data-url="https://imarflex-app.vercel.app/parts-finder">
        <span class="num">5</span>
        <span class="title">重複購買</span>
        <span class="subtitle">需要配件</span>
      </li>
      <li data-stage="advocacy" data-url="https://imarflex-app.vercel.app/products/iaf-30e-air-fryer">
        <span class="num">6</span>
        <span class="title">倡導</span>
        <span class="subtitle">推介俾朋友</span>
      </li>
    </ul>

    <!-- 右邊:iframe + 細節 -->
    <div class="funnel-content">
      <div class="iframe-wrapper">
        <iframe
          id="demo-iframe"
          src="https://imarflex-app.vercel.app/blog"
          title="Imarflex demo"
          loading="lazy"
        ></iframe>
      </div>

      <div class="stage-details" id="stage-details">
        <!-- JS 動態填入 -->
      </div>
    </div>
  </div>

  <!-- 底部 loop 視覺 -->
  <div class="funnel-loop">
    <span>倡導</span> → <span>認知</span> 形成 loop,銷售引擎自動加速
  </div>
</section>
```

### JS Logic

```javascript
const stageData = {
  awareness: {
    impact: ['Organic traffic +50%', '品牌搜尋 +30%'],
    items: ['SEO 技術基礎(schema、sitemap、Core Web Vitals)', 'Blog SEO(可選 add-on)', '1 秒以內 load']
  },
  interest: {
    impact: ['Bounce rate -20%', 'Session duration +40%'],
    items: ['視覺一致性', 'Heritage storytelling', 'Bento layout、視覺節奏']
  },
  consideration: {
    impact: ['Add-to-cart rate +25%'],
    items: ['PDP 文案 framework', 'Reviews 系統(add-on)', 'Retail links', '保養 + Trade-in']
  },
  purchase: {
    impact: ['CR +20-40%', '棄單率 -15%'],
    items: ['自建 checkout', 'Airwallex 多種付款', 'Cart drawer + 免運進度條', 'Mobile-first', 'Meilisearch 中文搜尋']
  },
  retention: {
    impact: ['重複購買率 0% → 15-20%', 'LTV +50%'],
    items: ['找配件工具', '保養登記 retention', 'Email 自動化(8 trigger)', '22 個月保養到期提醒', 'Loyalty(add-on)']
  },
  advocacy: {
    impact: ['Referral revenue 5-10%', 'Reviews 持續累積'],
    items: ['📝 Reviews 系統(add-on)', '🎁 Referral(add-on / Email 整合)', '📸 UGC + social share(included)']
  }
};

document.querySelectorAll('.funnel-stages li').forEach(li => {
  li.addEventListener('click', () => {
    // 切換 active
    document.querySelectorAll('.funnel-stages li').forEach(x => x.classList.remove('active'));
    li.classList.add('active');

    // 換 iframe URL
    const url = li.dataset.url;
    document.getElementById('demo-iframe').src = url;

    // 換右邊細節
    const stage = li.dataset.stage;
    const data = stageData[stage];
    document.getElementById('stage-details').innerHTML = `
      <div class="impact">
        <h4>預期影響</h4>
        <ul>${data.impact.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>
      <div class="items">
        <h4>我哋整咗咩</h4>
        <ul>${data.items.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>
    `;
  });
});
```

---

## CSS 重點(Warm Japanese Heritage 風格)

跟原 proposal-spec.md 嘅 design system:

```css
:root {
  --primary-red: #B91C1C;
  --warm-charcoal: #292524;
  --cream: #FFFBF5;
  --light-red: #FEE2E2;
  --muted: #78716C;
  --border: #E7E5E4;
}

.funnel-stages li {
  cursor: pointer;
  padding: 1rem;
  border-left: 4px solid transparent;
  transition: all 0.2s;
}

.funnel-stages li:hover {
  background: var(--light-red);
  border-left-color: var(--primary-red);
}

.funnel-stages li.active {
  background: var(--cream);
  border-left-color: var(--primary-red);
  font-weight: 600;
}

.iframe-wrapper {
  border: 2px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 16 / 10;
}

.iframe-wrapper iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
```

---

## ⚠️ 技術注意事項

### 1. iframe Embedding Permission
`imarflex-app.vercel.app` 要 set 啱 `Content-Security-Policy` 同 `X-Frame-Options`,先可以 embed:

**Next.js `next.config.js` 要設:**
```javascript
{
  headers: async () => [{
    source: '/(.*)',
    headers: [
      { key: 'X-Frame-Options', value: 'ALLOWALL' },  // 或者 SAMEORIGIN + ALLOW-FROM
      { key: 'Content-Security-Policy', value: "frame-ancestors 'self' https://your-pitch-domain.com" }
    ]
  }]
}
```

呢個一定要 pre-pitch 測試,唔好 pitch 嗰陣先發現 embed 唔到。

### 2. iframe 跨域 navigation
切 URL 時 iframe 重新 load,可能有閃爍。建議:
- 預載 6 個 iframe(全部隱藏,click 切顯示) → 即時切換但記憶體高
- 或 lazy load,加 loading skeleton 過渡

### 3. Mobile fallback
< 768px 自動 detect 用 flywheel view,唔強行塞 iframe。

### 4. Demo 失敗 backup
帶定 6 張 screenshot(每階段一張)。Vercel down / WiFi 慢 → 切換做圖片版。

---

## Pitch 嘅 Talk Track(配合 demo)

```
「呢個 funnel,就係客戶由唔識你到推介朋友嘅整個旅程。我同你逐個階段示範。

[Click 認知]
「呢度係 blog,客戶 Google『電飯煲推薦』搜到呢啲文章,SEO 帶 traffic。」

[Click 興趣]
「跳到 homepage,佢即時感受到品牌個性 — 唔淨係家電,係由大阪到深水埗嘅故事。Bounce rate 即時降。」

[Click 考慮]
「PDP 上面焦點功能、規格、保養信任 + Trade-in,都係幫佢做決定。」

[Click 購買]
「Cart drawer 即時提示免運門檻,checkout 順過 Shopline。」

[Click 重複購買]
「半年後濾網要換,parts finder 一搜就有,呢個係高毛利重複收入。」

[Click 倡導]
「用得好 → 寫 review → 系統自動邀請 ref → 朋友變新客戶。」

「6 個階段,5 個我哋直接負責或者打基礎。倡導同認知形成 loop — 呢個就係銷售引擎。」
```

每段 30-60 秒,整個 funnel section 約 5-7 分鐘。

---

## 接住要做嘅嘢

1. ✅ Pitch + Add-on doc 已 ready
2. 🔜 整 HTML slide deck prototype(包括呢個 funnel section)
3. 🔜 Pre-pitch 測試 iframe embed
4. 🔜 拍定 6 張 screenshot backup
5. 🔜 Talk track 排練(用個 demo 邊講邊 click)
