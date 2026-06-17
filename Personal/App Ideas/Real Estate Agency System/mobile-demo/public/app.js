(function () {
  const STORAGE_KEY = "rea-mobile-demo-state-v3";
  const LANG_KEY = "rea-mobile-demo-lang";
  const VIEW_KEY = "rea-mobile-demo-view";
  const root = document.getElementById("app");
  const mock = window.REA_MOCK;

  const fallbackState = () => ({
    users: clone(mock.users),
    owners: clone(mock.owners),
    listings: clone(mock.listings),
    customers: clone(mock.customers),
    viewings: clone(mock.viewings),
    forms: clone(mock.forms),
    comments: clone(mock.comments),
    notifications: clone(mock.notifications),
    currentUserId: "U-1",
    loggedIn: true,
    listingView: localStorage.getItem(VIEW_KEY) || "card",
    listingSort: "match",
    listingFilters: defaultListingFilters(),
    lastAddedListingId: "",
    customersTab: "all",
    viewingsTab: "list",
    formsTab: "all",
    calendarMonth: "2026-06",
    calendarDay: "2026-06-16",
    viewingDraft: null,
    photoViewer: null,
    toast: ""
  });

  let state = loadState();
  state.photoViewer = null; // transient overlay; never restore an open lightbox on load
  let lang = localStorage.getItem(LANG_KEY) || "zh";
  let signatureCanvas = null;
  let signatureDirty = false;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function defaultListingFilters() {
    return {
      search: "",
      district: "all",
      status: "all",
      rentMin: "all",
      rentMax: "all",
      areaMin: "all",
      areaMax: "all",
      rooms: "all",
      floor: "all",
      direction: "all",
      schoolNet: "all",
      tenancy: "all",
      ageMax: "all",
      keyConsent: "all",
      clubhouse: "all",
      matched: "all"
    };
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved || !Array.isArray(saved.listings)) return fallbackState();
      return { ...fallbackState(), ...saved };
    } catch (error) {
      return fallbackState();
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    localStorage.setItem(LANG_KEY, lang);
    localStorage.setItem(VIEW_KEY, state.listingView);
  }

  function t(key) {
    return (mock.translations[lang] && mock.translations[lang][key]) || mock.translations.zh[key] || key;
  }

  function esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function money(value, suffix = "") {
    if (value === null || value === undefined || value === "") return "N/A";
    return "$" + Number(value).toLocaleString("en-US") + suffix;
  }

  const ICONS = {
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.6 2.9 2.6 15.1 0 18M12 3c-2.6 2.9-2.6 15.1 0 18"/>',
    bell: '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.05.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-2.87 1.2V21a2 2 0 1 1-4 0v-.07A1.7 1.7 0 0 0 7 19.4a1.7 1.7 0 0 0-1.87.34l-.06.05a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 2.6 14H2.5a2 2 0 1 1 0-4h.07A1.7 1.7 0 0 0 4.6 7a1.7 1.7 0 0 0-.34-1.87l-.05-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 10 2.6h.07A2 2 0 1 1 14 2.6v.07A1.7 1.7 0 0 0 17 4.6l.06-.05a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 21.4 10v.07a2 2 0 1 1 0 4h-.07a1.7 1.7 0 0 0-1.57 1z"/>',
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.6V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.6"/><path d="M9.5 21v-6h5v6"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="1.6"/><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01"/><path d="M10 21v-3.5h4V21"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    file: '<path d="M14 3v5h5"/><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8Z"/><path d="M9 13h6M9 17h4"/>',
    fileCheck: '<path d="M14 3v5h5"/><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8Z"/><path d="m9.5 14 1.8 1.8 3.2-3.3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    chevronRight: '<path d="m9 6 6 6-6 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>',
    sparkles: '<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z"/><path d="M19 14l.7 1.9L21.5 16.6 19.6 17.3 19 19.2 18.3 17.3 16.4 16.6 18.3 15.9 19 14Z"/>',
    arrowRight: '<path d="M5 12h13"/><path d="m12 5 7 7-7 7"/>',
    userPlus: '<path d="M15 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
    at: '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.9 7.9"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    filter: '<path d="M3 5h18l-7 8.5V20l-4-2v-4.5Z"/>',
    sort: '<path d="M7 4v16M7 4 4 7.5M7 4l3 3.5"/><path d="M17 20V4M17 20l3-3.5M17 20l-3-3.5"/>',
    pin: '<path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
    bed: '<path d="M3 18V8a1 1 0 0 1 1-1h2.5"/><path d="M3 13h18v5"/><path d="M21 18v-5a3 3 0 0 0-3-3H6.5"/><path d="M7 10v3"/>',
    ruler: '<path d="M15.5 3.5 20.5 8.5 8.5 20.5 3.5 15.5Z"/><path d="m8 8 1.6 1.6M11 5l2 2M5 11l2 2"/>',
    key: '<circle cx="8" cy="15" r="3.5"/><path d="m10.5 12.5 7-7"/><path d="m15 5 2.5 2.5M17 7l1.8 1.8"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
    check: '<path d="M5 12.5 10 17l9-10"/>',
    maximize: '<path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
    phone: '<path d="M15.5 21A12.5 12.5 0 0 1 3 8.5 2 2 0 0 1 5 6.5h2.2a1 1 0 0 1 1 .82l.6 3a1 1 0 0 1-.45 1l-1.3.95a10 10 0 0 0 4.6 4.6l.95-1.3a1 1 0 0 1 1-.45l3 .6a1 1 0 0 1 .82 1V19a2 2 0 0 1-2 2Z"/>'
  };

  function icon(name, extra = "") {
    return `<svg class="ico ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  }

  function go(hash) {
    window.location.hash = hash;
  }

  function currentUser() {
    return state.users.find((user) => user.id === state.currentUserId) || state.users[0];
  }

  function getRoute() {
    const raw = window.location.hash.replace(/^#\/?/, "") || "dashboard";
    const [path, query = ""] = raw.split("?");
    return {
      path,
      parts: path.split("/").filter(Boolean),
      params: new URLSearchParams(query)
    };
  }

  function userName(id, english = false) {
    const user = state.users.find((item) => item.id === id);
    if (!user) return "N/A";
    return english && user.englishName ? user.englishName : user.name;
  }

  function owner(id) {
    return state.owners.find((item) => item.id === id);
  }

  function listing(id) {
    return state.listings.find((item) => item.id === id);
  }

  function customer(id) {
    return state.customers.find((item) => item.id === id);
  }

  function form(id) {
    return state.forms.find((item) => item.id === id);
  }

  function statusLabel(status) {
    return t(status) || status;
  }

  function statusClass(status) {
    if (["available", "active", "signed"].includes(status)) return "ok";
    if (["sent", "reserved", "scheduled", "pending"].includes(status)) return "warn";
    if (["expired", "withdrawn"].includes(status)) return "bad";
    if (["draft", "closed", "paused"].includes(status)) return "info";
    return "";
  }

  function addToast(message) {
    state.toast = message;
    saveState();
    render();
    window.setTimeout(() => {
      if (state.toast === message) {
        state.toast = "";
        saveState();
        render();
      }
    }, 2200);
  }

  function addNotification(type, title, body, refLink, recipientId = state.currentUserId) {
    state.notifications.unshift({
      id: "N-" + Date.now(),
      type,
      title,
      body,
      recipientId,
      refLink,
      read: false,
      createdAt: "剛剛"
    });
  }

  function unreadCount() {
    return state.notifications.filter((item) => !item.read && item.recipientId === state.currentUserId).length;
  }

  function matchListingToCustomer(item, person) {
    if (!item || !person || person.status !== "active") return { score: 0, reasons: [] };
    const req = person.requirement;
    const reasons = [];
    let score = 0;
    if (req.dealType === item.dealType || item.dealType === "both") {
      score += 1;
      reasons.push(lang === "zh" ? "租務" : "Lease");
    }
    if (req.districts.includes(item.district)) {
      score += 2;
      reasons.push(lang === "zh" ? "地區" : "District");
    }
    if (item.rent >= req.budgetMin && item.rent <= req.budgetMax) {
      score += 2;
      reasons.push(lang === "zh" ? "預算" : "Budget");
    }
    if (item.area >= req.areaMin && item.area <= req.areaMax) {
      score += 1;
      reasons.push(lang === "zh" ? "面積" : "Area");
    }
    if (item.rooms >= req.rooms) {
      score += 1;
      reasons.push(lang === "zh" ? "房數" : "Rooms");
    }
    if (req.mustHaves.some((need) => item.tenancy.includes(need) || item.schoolNet && need.includes(item.schoolNet) || item.flags.clubhouse && need === "會所")) {
      score += 1;
      reasons.push(lang === "zh" ? "要求" : "Must-have");
    }
    return { score, reasons };
  }

  function customersForListing(listingId) {
    const item = listing(listingId);
    return state.customers
      .map((person) => ({ person, match: matchListingToCustomer(item, person) }))
      .filter((row) => row.match.score >= 4)
      .sort((a, b) => b.match.score - a.match.score);
  }

  function listingsForCustomer(customerId) {
    const person = customer(customerId);
    return state.listings
      .map((item) => ({ item, match: matchListingToCustomer(item, person) }))
      .filter((row) => row.match.score >= 4)
      .sort((a, b) => b.match.score - a.match.score);
  }

  function formStatusChip(status) {
    return `<span class="chip ${statusClass(status)}">${esc(statusLabel(status))}</span>`;
  }

  function listingStatusChip(status) {
    return `<span class="chip ${statusClass(status)}">${esc(statusLabel(status))}</span>`;
  }

  function agentBadge(id) {
    return `<span class="chip brand">${esc(t("agent"))}: ${esc(userName(id, lang === "en"))}</span>`;
  }

  function cleanPhone(value) {
    return String(value || "").replace(/[^\d+]/g, "");
  }

  function shell(content, options = {}) {
    const route = getRoute().parts[0] || "dashboard";
    const isPublic = options.public;
    const hasTabs = !options.noTabs && !isPublic;
    if (isPublic) {
      return `
        <div class="public-shell">
          <main class="main no-tabs">${content}</main>
        </div>
      `;
    }
    return `
      <div class="stage">
        <div class="phone">
          ${options.bareTop ? "" : topbar({ motion: options.scrollTopbar, title: options.topbarTitle })}
          <main class="main ${hasTabs ? "" : "no-tabs"} ${options.bareTop ? "bare-top" : ""} ${options.detailPage ? "detail-page" : ""}">${content}</main>
          ${hasTabs ? bottomNav(route) : ""}
          ${state.toast ? `<div class="toast">${esc(state.toast)}</div>` : ""}
          ${state.photoViewer ? photoViewer() : ""}
        </div>
      </div>
    `;
  }

  function topbarBaseLayer(extraClass = "", attrs = "") {
    return `
      <div class="${extraClass}" ${attrs}>
        <div class="brand-mark" aria-hidden="true">安</div>
        <div class="brand">
          <div class="brand-title">${esc(t("appName"))}</div>
          <div class="brand-sub">${esc(userName(state.currentUserId, lang === "en"))} · ${esc(currentUser().role === "admin" ? t("admin") : t("agent"))}</div>
        </div>
        <div class="top-actions">
          <button class="icon-btn" data-action="toggle-lang" aria-label="${esc(t("language"))}">${lang === "zh" ? "EN" : "繁"}</button>
          <button class="icon-btn" data-nav="#/notifications" aria-label="${esc(t("notifications"))}">
            ${icon("bell")}
            ${unreadCount() ? `<span class="badge-count">${unreadCount()}</span>` : ""}
          </button>
          <button class="icon-btn" data-nav="#/settings" aria-label="${esc(t("settings"))}">${icon("settings")}</button>
        </div>
      </div>
    `;
  }

  function topbar(options = {}) {
    const title = options.title || "";
    if (options.motion && title) {
      return `
        <header class="topbar motion-topbar" data-scroll-topbar data-collapsed="false">
          ${topbarBaseLayer("topbar-layer topbar-base", "data-topbar-base aria-hidden=\"false\"")}
          <div class="topbar-layer topbar-context" data-topbar-context aria-hidden="true">
            <div class="topbar-context-title" title="${esc(title)}">${esc(title)}</div>
          </div>
        </header>
      `;
    }
    return `
      <header class="topbar">
        ${topbarBaseLayer("topbar-static")}
      </header>
    `;
  }

  function bottomNav(route) {
    const items = [
      ["dashboard", t("dashboard"), "#/dashboard", "home"],
      ["listings", t("listings"), "#/listings", "building"],
      ["customers", t("customers"), "#/customers", "users"],
      ["viewings", t("viewings"), "#/viewings", "eye"],
      ["forms", t("forms"), "#/forms", "file"]
    ];
    const activeRoute = route === "listing" || route === "matches" ? "listings" : route === "customer" ? "customers" : route;
    return `
      <nav class="bottom-nav" aria-label="Primary">
        ${items
          .map(([key, label, href, glyph]) => `
            <button class="nav-item ${activeRoute === key ? "active" : ""}" data-nav="${href}">
              <span class="nav-glyph">${icon(glyph)}</span>
              <span>${esc(label)}</span>
            </button>
          `)
          .join("")}
      </nav>
    `;
  }

  function pageHead(kicker, title, action = "") {
    return `
      <div class="screen-head">
        <div>
          <div class="screen-kicker">${esc(kicker)}</div>
          <h1 class="screen-title">${esc(title)}</h1>
        </div>
        ${action}
      </div>
    `;
  }

  function renderLogin() {
    return `
      <div class="login-wrap">
        <form class="login-card" data-form="login">
          <div class="row between start">
            <div class="login-logo">安</div>
            <button class="seg-btn" type="button" data-action="toggle-lang">${lang === "zh" ? "EN" : "繁"}</button>
          </div>
          <div style="height: 18px"></div>
          <h1 class="screen-title">${esc(t("loginTitle"))}</h1>
          <p class="meta">${esc(t("loginSubtitle"))}</p>
          <div class="form-grid">
            <div class="field">
              <label for="login-user">${esc(t("username"))}</label>
              <input id="login-user" name="username" value="jack" autocomplete="username" />
            </div>
            <div class="field">
              <label for="login-pass">${esc(t("password"))}</label>
              <input id="login-pass" name="password" type="password" value="demo123" autocomplete="current-password" />
            </div>
            <button class="btn primary full" type="submit">${esc(t("login"))}</button>
          </div>
        </form>
      </div>
    `;
  }

  const DEMO_NOW = {
    date: "2026-06-16",
    time: "08:30",
    minutes: 510,
    labelZh: "6月16日 · 星期二",
    labelEn: "Tue · 16 Jun"
  };

  function viewingMinutes(row) {
    const [h, m] = row.datetime.slice(11, 16).split(":").map(Number);
    return h * 60 + m;
  }

  function todaysViewings() {
    return state.viewings
      .filter((row) => row.datetime.slice(0, 10) === DEMO_NOW.date)
      .sort((a, b) => viewingMinutes(a) - viewingMinutes(b));
  }

  function viewingDate(row) {
    return row.datetime.slice(0, 10);
  }

  function viewingItineraryHash(row) {
    return `#/viewing/day/${row.customerId}/${viewingDate(row)}`;
  }

  function itineraries(filterDate) {
    const rows = filterDate ? state.viewings.filter((row) => viewingDate(row) === filterDate) : state.viewings;
    const map = new Map();
    rows.forEach((row) => {
      const key = row.customerId + "|" + viewingDate(row);
      if (!map.has(key)) map.set(key, { customerId: row.customerId, date: viewingDate(row), stops: [] });
      map.get(key).stops.push(row);
    });
    const out = [...map.values()];
    out.forEach((it) => it.stops.sort((a, b) => viewingMinutes(a) - viewingMinutes(b)));
    out.sort((a, b) => a.date.localeCompare(b.date) || viewingMinutes(a.stops[0]) - viewingMinutes(b.stops[0]));
    return out;
  }

  function itineraryGlance(it) {
    const keyOffice = it.stops.filter((s) => s.keyLocation === "office").length;
    const keyOwner = it.stops.filter((s) => s.keyLocation !== "office").length;
    const formsReady = it.stops.filter((s) => s.formReady).length;
    const first = it.stops[0];
    const last = it.stops[it.stops.length - 1];
    const timeRange = last !== first
      ? first.datetime.slice(11, 16) + "-" + last.datetime.slice(11, 16)
      : first.datetime.slice(11, 16);
    return { keyOffice, keyOwner, formsReady, total: it.stops.length, timeRange };
  }

  function dayLabel(dateStr) {
    const diff = daysUntil(dateStr);
    if (diff === 0) return lang === "zh" ? "今日" : "Today";
    if (diff === 1) return lang === "zh" ? "明日" : "Tomorrow";
    if (diff === -1) return lang === "zh" ? "昨日" : "Yesterday";
    const [y, m, d] = dateStr.slice(0, 10).split("-").map(Number);
    if (lang === "zh") return `${m}月${d}日`;
    return `${d} ${monthLabel(m)}`;
  }

  function monthLabel(m) {
    const en = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return en[m - 1] || String(m);
  }

  function shiftMonth(ym, delta) {
    let [y, m] = ym.split("-").map(Number);
    m += delta;
    while (m < 1) { m += 12; y -= 1; }
    while (m > 12) { m -= 12; y += 1; }
    return y + "-" + String(m).padStart(2, "0");
  }

  function calendarGrid(ym, options = {}) {
    const { selected, onAction = "pick-day" } = options;
    const [y, m] = ym.split("-").map(Number);
    const startDow = new Date(y, m - 1, 1).getDay();
    const days = new Date(y, m, 0).getDate();
    const counts = {};
    state.viewings.forEach((row) => {
      const dd = viewingDate(row);
      counts[dd] = (counts[dd] || 0) + 1;
    });
    const cells = [];
    for (let i = 0; i < startDow; i++) cells.push(`<span class="cal-cell empty"></span>`);
    for (let d = 1; d <= days; d++) {
      const iso = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const isToday = iso === DEMO_NOW.date;
      const isSel = iso === selected;
      const n = counts[iso] || 0;
      cells.push(`<button type="button" class="cal-cell${isToday ? " today" : ""}${isSel ? " sel" : ""}" data-action="${onAction}" data-date="${iso}">
        <span class="cal-num">${d}</span>${n ? `<span class="cal-dot">${n}</span>` : ""}
      </button>`);
    }
    const dows = lang === "zh" ? ["日", "一", "二", "三", "四", "五", "六"] : ["S", "M", "T", "W", "T", "F", "S"];
    const title = lang === "zh" ? `${y}年${m}月` : `${monthLabel(m)} ${y}`;
    return `
      <section class="card cal">
        <div class="cal-head">
          <button type="button" class="icon-btn" data-action="cal-prev" data-month="${esc(ym)}" aria-label="${esc(lang === "zh" ? "上個月" : "Previous month")}">${icon("chevronRight", "flip")}</button>
          <strong class="cal-title">${esc(title)}</strong>
          <button type="button" class="icon-btn" data-action="cal-next" data-month="${esc(ym)}" aria-label="${esc(lang === "zh" ? "下個月" : "Next month")}">${icon("chevronRight")}</button>
        </div>
        <div class="cal-grid cal-dow">${dows.map((x) => `<span>${esc(x)}</span>`).join("")}</div>
        <div class="cal-grid">${cells.join("")}</div>
      </section>
    `;
  }

  function timeSlots(selectedTime, takenTimes = []) {
    const slots = [];
    for (let mn = 600; mn <= 1110; mn += 30) {
      slots.push(String(Math.floor(mn / 60)).padStart(2, "0") + ":" + String(mn % 60).padStart(2, "0"));
    }
    return `<div class="slot-grid">${slots.map((s) => `<button type="button" class="slot${s === selectedTime ? " active" : ""}${takenTimes.includes(s) ? " booked" : ""}" data-action="pick-time" data-time="${s}">${s}</button>`).join("")}</div>`;
  }

  function pendingFormsList() {
    return state.forms.filter((row) => row.status === "sent");
  }

  function daysUntil(dateStr) {
    if (!dateStr) return null;
    const a = Date.parse(DEMO_NOW.date + "T00:00:00");
    const b = Date.parse(dateStr.slice(0, 10) + "T00:00:00");
    if (isNaN(a) || isNaN(b)) return null;
    return Math.round((b - a) / 86400000);
  }

  function relUntil(targetMin) {
    const diff = targetMin - DEMO_NOW.minutes;
    if (diff <= 0) return lang === "zh" ? "進行中" : "now";
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    if (lang === "zh") return h && m ? `${h} 小時 ${m} 分後` : h ? `${h} 小時後` : `${m} 分鐘後`;
    return h && m ? `in ${h}h ${m}m` : h ? `in ${h}h` : `in ${m}m`;
  }

  function greetingWord() {
    const h = Math.floor(DEMO_NOW.minutes / 60);
    if (lang === "zh") return h < 12 ? "早晨" : h < 18 ? "午安" : "晚安";
    return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  }

  function urgencyHero(next) {
    const item = listing(next.listingId);
    const person = customer(next.customerId);
    return `
      <button class="urgent-hero" data-nav="${esc(viewingItineraryHash(next))}" aria-label="${esc(lang === "zh" ? "下一個睇樓" : "Next viewing")}">
        <span class="uh-time-block">
          <span class="uh-time">${esc(next.datetime.slice(11, 16))}</span>
          <span class="uh-when">${esc(relUntil(viewingMinutes(next)))}</span>
        </span>
        <span class="uh-divider"></span>
        <span class="uh-body">
          <span class="uh-kicker">${icon("clock")} ${esc(lang === "zh" ? "下一個睇樓" : "Next viewing")}</span>
          <span class="uh-title">${esc(item ? item.address : next.listingId)}</span>
          <span class="uh-meta">${esc(person ? person.name : "")} · ${esc(userName(next.agentId, lang === "en"))}</span>
        </span>
        <span class="uh-go">${icon("chevronRight")}</span>
      </button>
    `;
  }

  function urgencyHeroForm(row) {
    const item = listing(row.listingId);
    const days = daysUntil(row.expiresAt);
    return `
      <button class="urgent-hero" data-nav="#/forms/send/${esc(row.id)}" aria-label="${esc(lang === "zh" ? "表格待簽" : "Awaiting signature")}">
        <span class="uh-time-block">
          <span class="uh-time">${days != null ? esc(days) : "-"}</span>
          <span class="uh-when">${esc(lang === "zh" ? "日內到期" : "days left")}</span>
        </span>
        <span class="uh-divider"></span>
        <span class="uh-body">
          <span class="uh-kicker">${icon("file")} ${esc(lang === "zh" ? "表格待簽" : "Awaiting signature")}</span>
          <span class="uh-title">${esc(row.type)}</span>
          <span class="uh-meta">${esc(item ? item.address : "")} · ${esc(row.signerName || "")}</span>
        </span>
        <span class="uh-go">${icon("chevronRight")}</span>
      </button>
    `;
  }

  function calmHero() {
    return `
      <div class="urgent-hero">
        <span class="uh-time-block"><span class="uh-time">✓</span></span>
        <span class="uh-divider"></span>
        <span class="uh-body">
          <span class="uh-kicker">${icon("clock")} ${esc(lang === "zh" ? "今日" : "Today")}</span>
          <span class="uh-title">${esc(lang === "zh" ? "今日暫無緊急待辦" : "Nothing urgent right now")}</span>
          <span class="uh-meta">${esc(lang === "zh" ? "祝你有美好的一天" : "Have a great day")}</span>
        </span>
      </div>
    `;
  }

  function dashKpis(todays, next, pending) {
    const nextTime = next ? next.datetime.slice(11, 16) : "-";
    const matchCount = customersForListing(state.lastAddedListingId || "L-1001").length;
    const soonest = pending.map((f) => daysUntil(f.expiresAt)).filter((n) => n != null).sort((a, b) => a - b)[0];
    const formWarn = soonest != null && soonest <= 3;
    return `
      <section class="kpi-row">
        <button class="kpi" data-nav="#/viewings">
          <span class="kpi-top"><span class="kpi-ico">${icon("eye")}</span></span>
          <span class="kpi-value">${todays.length}</span>
          <span class="kpi-label">${esc(t("todayViewings"))}</span>
          <span class="kpi-sub">${esc(next ? (lang === "zh" ? "下一場 " : "Next ") + nextTime : (lang === "zh" ? "今日完成" : "all done"))}</span>
        </button>
        <button class="kpi ${formWarn ? "warn" : ""}" data-nav="#/forms">
          <span class="kpi-top"><span class="kpi-ico">${icon("file")}</span></span>
          <span class="kpi-value">${pending.length}</span>
          <span class="kpi-label">${esc(t("pendingForms"))}</span>
          <span class="kpi-sub">${esc(soonest != null ? (lang === "zh" ? `${soonest} 日內到期` : `${soonest}d to expiry`) : (lang === "zh" ? "無待簽" : "none pending"))}</span>
        </button>
        <button class="kpi" data-nav="#/matches">
          <span class="kpi-top"><span class="kpi-ico">${icon("sparkles")}</span><span class="dot"></span></span>
          <span class="kpi-value">${matchCount}</span>
          <span class="kpi-label">${esc(t("newMatches"))}</span>
          <span class="kpi-sub">${esc(lang === "zh" ? "等待客戶" : "waiting")}</span>
        </button>
      </section>
    `;
  }

  function renderMatchesOverview() {
    const cards = state.listings
      .map((item) => ({ item, rows: customersForListing(item.id) }))
      .filter((row) => row.rows.length > 0)
      .sort((a, b) => b.rows.length - a.rows.length);
    const totalCustomers = cards.reduce((sum, row) => sum + row.rows.length, 0);
    const kicker = lang === "zh"
      ? `${cards.length} 個盤源 · ${totalCustomers} 個配對`
      : `${cards.length} listings · ${totalCustomers} matches`;
    return shell(`
      ${pageHead(kicker, t("matchBoard"))}
      <p class="screen-sub">${esc(t("matchBoardSub"))}</p>
      <div class="lcard-list">
        ${cards.map(({ item }) => listingCard(item)).join("") || `<div class="empty">${esc(t("noMatchesYet"))}</div>`}
      </div>
    `);
  }

  function dashTimeline(todays) {
    if (!todays.length) {
      return `<div class="empty">${esc(lang === "zh" ? "今日沒有睇樓" : "No viewings today")}</div>`;
    }
    const nowRow = `
      <div class="tl-row tl-now">
        <div class="tl-time">${esc(lang === "zh" ? "現在" : "Now")}</div>
        <div class="tl-track">
          <span class="tl-dot now"></span>
          <div class="tl-nowbar"><span>${esc(DEMO_NOW.time)}</span></div>
        </div>
      </div>
    `;
    const rows = todays.map((row, i) => {
      const item = listing(row.listingId);
      const person = customer(row.customerId);
      const isNext = i === 0;
      return `
        <div class="tl-row ${isNext ? "next" : ""}">
          <div class="tl-time">${esc(row.datetime.slice(11, 16))}</div>
          <div class="tl-track">
            <span class="tl-dot"></span>
            <button class="tl-card" data-nav="${esc(viewingItineraryHash(row))}">
              <span class="tl-card-top">
                <strong class="title-sm">${esc(item ? item.address : row.listingId)}</strong>
                ${isNext ? `<span class="tl-tag">${esc(lang === "zh" ? "下一場" : "Next")}</span>` : formStatusChip(row.status)}
              </span>
              <span class="meta" style="display:block;margin-top:4px">${esc(person ? person.name : "")} · ${esc(userName(row.agentId, lang === "en"))} · ${esc(relUntil(viewingMinutes(row)))}</span>
            </button>
          </div>
        </div>
      `;
    }).join("");
    return `<div class="timeline-rail">${nowRow}${rows}</div>`;
  }

  function activityIconType(type) {
    if (type === "form") return ["fileCheck", "form"];
    if (type === "viewing") return ["clock", "viewing"];
    if (type === "@mention" || type === "mention") return ["at", "mention"];
    if (type === "assign" || type === "reassign") return ["userPlus", "assign"];
    return ["sparkles", "match"];
  }

  function activityRow(item) {
    const [glyph, cls] = activityIconType(item.type);
    return `
      <button class="act-row" data-action="open-notification" data-id="${esc(item.id)}">
        <span class="act-ico ${cls}">${icon(glyph)}</span>
        <span class="grow">
          <span class="row between start">
            <strong class="title-sm">${esc(item.title)}</strong>
            <span class="meta">${esc(item.createdAt)}</span>
          </span>
          <span class="meta" style="display:block;margin-top:2px">${esc(item.body)}</span>
        </span>
        ${!item.read ? `<span class="act-unread"></span>` : ""}
      </button>
    `;
  }

  function renderDashboard() {
    const todays = todaysViewings();
    const upcoming = todays.filter((v) => viewingMinutes(v) >= DEMO_NOW.minutes);
    const next = upcoming[0] || todays[0] || null;
    const pending = pendingFormsList();
    const user = currentUser();
    const recent = state.notifications.slice(0, 3);
    const hero = next ? urgencyHero(next) : pending.length ? urgencyHeroForm(pending[0]) : calmHero();
    return shell(`
      <section class="command">
        <div class="command-bar">
          <div class="brand-mark" aria-hidden="true">安</div>
          <div class="brand">
            <div class="brand-title">${esc(t("appName"))}</div>
            <div class="brand-sub">${esc(userName(state.currentUserId, lang === "en"))} · ${esc(user.role === "admin" ? t("admin") : t("agent"))}</div>
          </div>
          <div class="top-actions">
            <button class="icon-btn ghost" data-action="toggle-lang" aria-label="${esc(t("language"))}">${lang === "zh" ? "EN" : "繁"}</button>
            <button class="icon-btn ghost" data-nav="#/notifications" aria-label="${esc(t("notifications"))}">
              ${icon("bell")}
              ${unreadCount() ? `<span class="badge-count">${unreadCount()}</span>` : ""}
            </button>
            <button class="icon-btn ghost" data-nav="#/settings" aria-label="${esc(t("settings"))}">${icon("settings")}</button>
          </div>
        </div>
        <div class="greeting">
          <h1>${esc(greetingWord())}${lang === "zh" ? "，" : ", "}${esc(userName(state.currentUserId, lang === "en"))}</h1>
          <div class="sub">
            <span>${esc(lang === "zh" ? DEMO_NOW.labelZh : DEMO_NOW.labelEn)}</span>
            <span class="dot-sep">·</span>
            <span>${todays.length} ${esc(lang === "zh" ? "睇樓" : "viewings")}</span>
            <span class="dot-sep">·</span>
            <span>${pending.length} ${esc(lang === "zh" ? "待簽" : "to sign")}</span>
          </div>
        </div>
        ${hero}
      </section>
      ${dashKpis(todays, next, pending)}
      <section class="quick-row">
        <button class="quick-btn" data-nav="#/listing/new">${icon("building")} ${esc(t("addListing"))}</button>
        <button class="quick-btn" data-nav="#/customer/new">${icon("userPlus")} ${esc(t("addCustomer"))}</button>
        <button class="quick-btn" data-nav="#/viewings">${icon("eye")} ${esc(t("addViewing"))}</button>
      </section>
      <div class="dash-sec-head">
        <h2>${esc(lang === "zh" ? "今日行程" : "Today's schedule")}</h2>
        <button class="more" data-nav="#/viewings">${esc(t("all"))} ${icon("chevronRight")}</button>
      </div>
      ${dashTimeline(todays)}
      <div class="dash-sec-head">
        <h2>${esc(lang === "zh" ? "最新動態" : "Latest activity")}</h2>
        <button class="more" data-nav="#/notifications">${esc(t("all"))} ${icon("chevronRight")}</button>
      </div>
      <div class="stack">${recent.map(activityRow).join("")}</div>
    `, { bareTop: true });
  }

  function listingCard(item) {
    const matches = customersForListing(item.id);
    const matchCount = matches.length;
    const dealTag = lang === "zh" ? "租" : "Lease";
    const nameBadges = matches.slice(0, 3).map(({ person }) => `<span class="cbadge">${esc(person.name)}</span>`).join("");
    const moreBadge = matchCount > 3 ? `<span class="cbadge more">+${matchCount - 3}</span>` : "";
    const foot = matchCount ? `
      <button class="lcard-foot" data-nav="#/listing/${esc(item.id)}?tab=customers" aria-label="${esc(t("viewMatchedCustomers"))}">
        <span class="lcard-foot-main">
          <span class="lcard-match-head">
            ${icon("sparkles")}
            <span class="lcard-match-count">${matchCount} ${esc(t("customersMatching"))}</span>
          </span>
          <span class="lcard-match-names">${nameBadges}${moreBadge}</span>
        </span>
        <span class="lcard-match-arrow">${icon("chevronRight", "chev")}</span>
      </button>
    ` : "";
    return `
      <article class="lcard ${matchCount ? "is-matched" : ""}">
        <button class="lcard-main" data-nav="#/listing/${esc(item.id)}" aria-label="${esc(t("viewDetails"))} ${esc(item.address)}">
          <span class="lcard-photo" aria-hidden="true">
            <span class="lcard-status">${listingStatusChip(item.status)}</span>
            <span class="lcard-agent-badge">
              <span class="avatar">${esc((userName(item.owningAgentId) || "").slice(0, 2))}</span>
              <span>${esc(userName(item.owningAgentId, lang === "en"))}</span>
            </span>
          </span>
          <span class="lcard-body">
            <span class="lcard-top">
              <span class="price">${money(item.rent)}<small>${esc(lang === "zh" ? "/月" : "/mo")}</small></span>
              <span class="lcard-deal">${esc(dealTag)}</span>
            </span>
            <span class="lcard-addr">${esc(item.address)}</span>
            <span class="lcard-specs">
              <span>${icon("ruler")} ${esc(item.area)}呎</span>
              <span>${icon("bed")} ${esc(item.rooms)}房${esc(item.halls)}廳</span>
              <span>${icon("pin")} ${esc(item.district)}</span>
            </span>
            <span class="chips">
              <span class="chip">${esc(item.schoolNet)} ${esc(lang === "zh" ? "校網" : "net")}</span>
              <span class="chip">${esc(item.tenancy)}</span>
              ${item.keyConsent ? `<span class="chip ok">${icon("key")} ${esc(lang === "zh" ? "可取匙" : "Key")}</span>` : `<span class="chip warn">${esc(lang === "zh" ? "約業主開門" : "By appt.")}</span>`}
            </span>
          </span>
        </button>
        ${foot}
      </article>
    `;
  }

  function sortedListings(list) {
    const arr = [...list];
    const sort = state.listingSort || "match";
    if (sort === "priceAsc") arr.sort((a, b) => a.rent - b.rent);
    else if (sort === "priceDesc") arr.sort((a, b) => b.rent - a.rent);
    else if (sort === "area") arr.sort((a, b) => b.area - a.area);
    else if (sort === "match") arr.sort((a, b) => customersForListing(b.id).length - customersForListing(a.id).length);
    return arr;
  }

  function listingFilters() {
    return { ...defaultListingFilters(), ...(state.listingFilters || {}) };
  }

  function filteredListings() {
    const filters = listingFilters();
    return state.listings.filter((item) => {
      if (filters.search) {
        const q = String(filters.search).toLowerCase();
        const hay = `${item.address} ${item.estate || ""} ${item.district}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filters.district !== "all" && item.district !== filters.district) return false;
      if (filters.status !== "all" && item.status !== filters.status) return false;
      if (filters.rentMin !== "all" && item.rent < Number(filters.rentMin)) return false;
      if (filters.rentMax !== "all" && item.rent > Number(filters.rentMax)) return false;
      if (filters.areaMin !== "all" && item.area < Number(filters.areaMin)) return false;
      if (filters.areaMax !== "all" && item.area > Number(filters.areaMax)) return false;
      if (filters.rooms !== "all" && item.rooms < Number(filters.rooms)) return false;
      if (filters.floor !== "all" && item.floor !== filters.floor) return false;
      if (filters.direction !== "all" && item.direction !== filters.direction) return false;
      if (filters.schoolNet !== "all" && item.schoolNet !== filters.schoolNet) return false;
      if (filters.tenancy !== "all" && item.tenancy !== filters.tenancy) return false;
      if (filters.ageMax !== "all" && item.age > Number(filters.ageMax)) return false;
      if (filters.keyConsent === "yes" && !item.keyConsent) return false;
      if (filters.keyConsent === "no" && item.keyConsent) return false;
      if (filters.clubhouse === "yes" && !item.flags.clubhouse) return false;
      if (filters.clubhouse === "no" && item.flags.clubhouse) return false;
      if (filters.matched === "yes" && customersForListing(item.id).length === 0) return false;
      return true;
    });
  }

  function renderListingFilters(districts) {
    const filters = listingFilters();
    const floors = [...new Set(state.listings.map((item) => item.floor))];
    const directions = [...new Set(state.listings.map((item) => item.direction))];
    const schoolNets = [...new Set(state.listings.map((item) => item.schoolNet))];
    const tenancyStates = [...new Set(state.listings.map((item) => item.tenancy))];
    const activeCount = Object.entries(filters).filter(([key, value]) => key !== "search" && value !== "all").length;
    return `
      <details class="filter-panel">
        <summary class="filter-summary">
          <span class="filter-summary-label">${icon("filter")} ${esc(lang === "zh" ? "進階篩選" : "Advanced filters")}${activeCount ? `<span class="filter-count">${activeCount}</span>` : ""}</span>
          <span class="filter-summary-hint">${esc(lang === "zh" ? "面積 · 樓層 · 朝向 · 校網…" : "Area · floor · facing…")}</span>
        </summary>
        <form class="filter-grid" data-form="listing-filters">
        <div class="grid-2">
          <div class="field">
            <label for="filter-district">${esc(lang === "zh" ? "地區" : "District")}</label>
            <select id="filter-district" name="district">
              <option value="all">${esc(t("anyDistrict"))}</option>
              ${districts.map((district) => `<option value="${esc(district)}" ${filters.district === district ? "selected" : ""}>${esc(district)}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="filter-status">${esc(t("status"))}</label>
            <select id="filter-status" name="status">
              <option value="all">${esc(t("anyStatus"))}</option>
              ${["available", "reserved", "closed", "withdrawn"].map((status) => `<option value="${status}" ${filters.status === status ? "selected" : ""}>${esc(statusLabel(status))}</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div class="field">
            <label for="filter-rent-min">${esc(t("minRent"))}</label>
            <select id="filter-rent-min" name="rentMin">
              ${["all", "15000", "18000", "22000"].map((value) => `<option value="${value}" ${filters.rentMin === value ? "selected" : ""}>${esc(value === "all" ? t("all") : money(value, lang === "zh" ? "/月" : "/mo"))}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="filter-rent">${esc(t("maxRent"))}</label>
            <select id="filter-rent" name="rentMax">
              ${["all", "20000", "25000", "30000"].map((value) => `<option value="${value}" ${filters.rentMax === value ? "selected" : ""}>${esc(value === "all" ? t("all") : money(value, lang === "zh" ? "/月" : "/mo"))}</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div class="field">
            <label for="filter-area-min">${esc(t("areaRange"))} ${esc(lang === "zh" ? "最低" : "min")}</label>
            <select id="filter-area-min" name="areaMin">
              ${["all", "380", "450", "550", "650"].map((value) => `<option value="${value}" ${filters.areaMin === value ? "selected" : ""}>${esc(value === "all" ? t("all") : value + "呎+")}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="filter-area-max">${esc(t("areaRange"))} ${esc(lang === "zh" ? "最高" : "max")}</label>
            <select id="filter-area-max" name="areaMax">
              ${["all", "500", "600", "700", "800"].map((value) => `<option value="${value}" ${filters.areaMax === value ? "selected" : ""}>${esc(value === "all" ? t("all") : "≤" + value + "呎")}</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div class="field">
            <label for="filter-rooms">${esc(t("minRooms"))}</label>
            <select id="filter-rooms" name="rooms">
              ${["all", "1", "2", "3"].map((value) => `<option value="${value}" ${filters.rooms === value ? "selected" : ""}>${esc(value === "all" ? t("all") : value + "+")}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="filter-floor">${esc(t("floorRange"))}</label>
            <select id="filter-floor" name="floor">
              <option value="all">${esc(t("all"))}</option>
              ${floors.map((floor) => `<option value="${esc(floor)}" ${filters.floor === floor ? "selected" : ""}>${esc(floor)}</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div class="field">
            <label for="filter-direction">${esc(t("direction"))}</label>
            <select id="filter-direction" name="direction">
              <option value="all">${esc(t("all"))}</option>
              ${directions.map((direction) => `<option value="${esc(direction)}" ${filters.direction === direction ? "selected" : ""}>${esc(direction)}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="filter-school">${esc(t("schoolNet"))}</label>
            <select id="filter-school" name="schoolNet">
              <option value="all">${esc(t("all"))}</option>
              ${schoolNets.map((net) => `<option value="${esc(net)}" ${filters.schoolNet === net ? "selected" : ""}>${esc(net)}</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div class="field">
            <label for="filter-tenancy">${esc(t("tenancyState"))}</label>
            <select id="filter-tenancy" name="tenancy">
              <option value="all">${esc(t("all"))}</option>
              ${tenancyStates.map((tenancy) => `<option value="${esc(tenancy)}" ${filters.tenancy === tenancy ? "selected" : ""}>${esc(tenancy)}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="filter-age">${esc(t("buildingAge"))}</label>
            <select id="filter-age" name="ageMax">
              ${["all", "12", "20", "35"].map((value) => `<option value="${value}" ${filters.ageMax === value ? "selected" : ""}>${esc(value === "all" ? t("all") : "≤" + value + (lang === "zh" ? "年" : " yrs"))}</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div class="field">
            <label for="filter-key">${esc(t("keyConsent"))}</label>
            <select id="filter-key" name="keyConsent">
              <option value="all" ${filters.keyConsent === "all" ? "selected" : ""}>${esc(t("all"))}</option>
              <option value="yes" ${filters.keyConsent === "yes" ? "selected" : ""}>${esc(lang === "zh" ? "可取匙" : "Key available")}</option>
              <option value="no" ${filters.keyConsent === "no" ? "selected" : ""}>${esc(lang === "zh" ? "約業主開門" : "By appointment")}</option>
            </select>
          </div>
          <div class="field">
            <label for="filter-clubhouse">${esc(t("clubhouse"))}</label>
            <select id="filter-clubhouse" name="clubhouse">
              <option value="all" ${filters.clubhouse === "all" ? "selected" : ""}>${esc(t("all"))}</option>
              <option value="yes" ${filters.clubhouse === "yes" ? "selected" : ""}>${esc(lang === "zh" ? "有會所" : "Has clubhouse")}</option>
              <option value="no" ${filters.clubhouse === "no" ? "selected" : ""}>${esc(lang === "zh" ? "沒有會所" : "No clubhouse")}</option>
            </select>
          </div>
        </div>
        <div class="actions">
          <button class="btn primary" type="submit">${esc(t("applyFilters"))}</button>
          <button class="btn" type="button" data-action="reset-listing-filters">${esc(t("resetFilters"))}</button>
        </div>
        </form>
      </details>
    `;
  }

  function listingRow(item) {
    const matchCount = customersForListing(item.id).length;
    return `
      <article class="table-row">
        <span>
          <strong>${esc(item.address)}</strong>
          <span class="meta" style="display:block">${esc(item.area)}呎 · ${money(item.rent, lang === "zh" ? "/月" : "/mo")} · ${esc(userName(item.owningAgentId, lang === "en"))}</span>
        </span>
        <span class="actions" style="justify-content:flex-end">
          ${listingStatusChip(item.status)}
          <button class="btn small" data-nav="#/listing/${esc(item.id)}">${esc(t("viewDetails"))}</button>
          <button class="btn small secondary" data-nav="#/listing/${esc(item.id)}?tab=customers">${matchCount} ${esc(t("matchesCustomers"))}</button>
        </span>
      </article>
    `;
  }

  function renderListings() {
    const districts = [...new Set(state.listings.map((item) => item.district))];
    const f = listingFilters();
    const visible = sortedListings(filteredListings());
    const available = state.listings.filter((i) => i.status === "available").length;
    const quick = [
      { field: "reset", value: "", label: t("all"), active: f.district === "all" && f.status === "all" && f.keyConsent === "all" && f.rooms === "all" && f.matched === "all" },
      { field: "matched", value: "yes", label: lang === "zh" ? "有配對" : "Matched", active: f.matched === "yes", accent: true },
      ...districts.map((d) => ({ field: "district", value: d, label: d, active: f.district === d })),
      { field: "status", value: "available", label: lang === "zh" ? "可租" : "Available", active: f.status === "available" },
      { field: "keyConsent", value: "yes", label: lang === "zh" ? "匙盤" : "Key", active: f.keyConsent === "yes" },
      { field: "rooms", value: "2", label: lang === "zh" ? "2房+" : "2BR+", active: f.rooms === "2" }
    ];
    const sortOpts = [
      ["match", lang === "zh" ? "配對最多" : "Most matches"],
      ["priceAsc", lang === "zh" ? "租金低→高" : "Rent ↑"],
      ["priceDesc", lang === "zh" ? "租金高→低" : "Rent ↓"],
      ["area", lang === "zh" ? "面積大→細" : "Area ↓"],
      ["newest", lang === "zh" ? "最新" : "Newest"]
    ];
    const body = state.listingView === "table"
      ? `<div class="table-list">${visible.map(listingRow).join("")}</div>`
      : `<div class="lcard-list">${visible.map(listingCard).join("")}</div>`;
    return shell(`
      <div class="screen-head">
        <div>
          <div class="screen-kicker">${esc(state.listings.length)} ${esc(lang === "zh" ? "個盤源" : "listings")} · <span class="kicker-ok">${available} ${esc(lang === "zh" ? "可租" : "available")}</span></div>
          <h1 class="screen-title">${esc(t("listings"))}</h1>
        </div>
        <button class="btn small primary" data-nav="#/listing/new">${esc(t("addListing"))}</button>
      </div>
      <form class="lsearch" data-form="listing-search">
        <span class="lsearch-ico">${icon("search")}</span>
        <input name="q" value="${esc(f.search)}" placeholder="${esc(lang === "zh" ? "搜尋屋苑、地址或地區…" : "Search estate, address, district…")}" aria-label="${esc(lang === "zh" ? "搜尋" : "Search")}" />
        ${f.search ? `<button type="button" class="lsearch-clear" data-action="clear-listing-search" aria-label="${esc(t("clear"))}">${icon("close")}</button>` : ""}
      </form>
      <div class="lquick">
        ${quick.map((c) => `<button class="qchip ${c.accent ? "accent" : ""} ${c.active ? "active" : ""}" data-action="quick-filter" data-field="${esc(c.field)}" data-value="${esc(c.value)}">${c.accent ? icon("sparkles") : ""}${esc(c.label)}</button>`).join("")}
      </div>
      ${renderListingFilters(districts)}
      <div class="lbar">
        <div class="lbar-count">${visible.length}<span class="lbar-total">/${state.listings.length}</span></div>
        <div class="lbar-controls">
          <label class="lbar-sort">${icon("sort")}
            <select data-action="set-listing-sort" aria-label="${esc(lang === "zh" ? "排序" : "Sort")}">
              ${sortOpts.map(([v, label]) => `<option value="${v}" ${(state.listingSort || "match") === v ? "selected" : ""}>${esc(label)}</option>`).join("")}
            </select>
          </label>
          <div class="segmented">
            <button class="seg-btn ${state.listingView === "card" ? "active" : ""}" data-action="set-listing-view" data-view="card" aria-label="${esc(t("cardView"))}">${icon("building")}</button>
            <button class="seg-btn ${state.listingView === "table" ? "active" : ""}" data-action="set-listing-view" data-view="table" aria-label="${esc(t("listView"))}">${icon("file")}</button>
          </div>
        </div>
      </div>
      ${visible.length ? body : `<div class="empty">${esc(lang === "zh" ? "沒有符合條件的盤源" : "No listings match")}</div>`}
    `);
  }

  function renderListingDetail(id, params = new URLSearchParams()) {
    const item = listing(id);
    if (!item) return shell(notFound());
    const own = owner(item.ownerId);
    const matched = customersForListing(id);
    const forms = state.forms.filter((row) => row.listingId === id);
    const viewings = state.viewings.filter((row) => row.listingId === id);
    const tabs = ["overview", "customers", "viewings", "forms", "timeline"];
    const activeTab = tabs.includes(params.get("tab")) ? params.get("tab") : "overview";
    return shell(`
      <section class="detail-hero">
        <div class="row between start">
          <div class="chips">${listingStatusChip(item.status)} ${agentBadge(item.owningAgentId)}</div>
          <button class="btn small" data-nav="#/listing/edit/${esc(item.id)}">${esc(t("edit"))}</button>
        </div>
        <h1 class="screen-title dh-title">${esc(item.address)}</h1>
        <div class="dh-summary">
          <span class="dh-stat">
            <span class="dh-rent-line">
              <span class="dh-rent">${money(item.rent)}</span>
              <span class="dh-rent-sub">${esc(lang === "zh" ? "/月" : "/mo")}</span>
            </span>
            <span class="dh-deal">${esc(lang === "zh" ? "租" : "Lease")}</span>
          </span>
          <span class="dh-divider"></span>
          <span class="dh-facts">
            <span class="dh-facts-row">${esc(item.area)}呎 · ${esc(item.rooms)}房${esc(item.halls)}廳 · ${esc(item.floor)}</span>
            <span class="dh-facts-sub">${esc(item.schoolNet)}${esc(lang === "zh" ? "校網" : " net")} · ${esc(item.keyConsent ? (lang === "zh" ? "可取匙" : "Key") : (lang === "zh" ? "約業主" : "By appt."))} · ${esc(item.district)}</span>
          </span>
        </div>
      </section>
      ${listingDetailTabs(item.id, activeTab, matched.length)}
      ${listingDetailCarousel(tabs, activeTab, item, own, matched, viewings, forms)}
    `, { detailPage: true, scrollTopbar: true, topbarTitle: item.address });
  }

  function listingDetailTabs(listingId, activeTab, matchedCount) {
    const labels = {
      overview: t("overview"),
      customers: `${t("matchesCustomers")} ${matchedCount}`,
      viewings: t("viewings"),
      forms: t("documents"),
      timeline: t("activityRecord")
    };
    return `
      <nav class="detail-tabs" data-carousel-id="listing-${esc(listingId)}" aria-label="${esc(t("detail"))}">
        <span class="detail-tab-indicator" aria-hidden="true"></span>
        ${Object.entries(labels).map(([key, label]) => `
          <button class="tab-btn ${activeTab === key ? "active" : ""}" data-action="switch-detail-tab" data-listing="${esc(listingId)}" data-tab="${esc(key)}">${esc(label)}</button>
        `).join("")}
      </nav>
    `;
  }

  function listingDetailCarousel(tabs, activeTab, item, own, matched, viewings, forms) {
    const activeIndex = Math.max(0, tabs.indexOf(activeTab));
    const offset = -(activeIndex * (100 / tabs.length));
    return `
      <div class="detail-carousel" data-carousel-id="listing-${esc(item.id)}" data-listing-id="${esc(item.id)}" data-active-tab="${esc(activeTab)}" data-tab-order="${esc(tabs.join(","))}" data-active-index="${activeIndex}">
        <div class="detail-carousel-track" style="transform: translate3d(${offset}%, 0, 0)">
          ${tabs.map((tab) => {
            const active = tab === activeTab;
            return `
              <section class="detail-slide ${active ? "active" : ""}" data-tab-panel="${esc(tab)}" aria-hidden="${active ? "false" : "true"}" ${active ? "" : "inert"}>
                ${listingDetailTabContent(tab, item, own, matched, viewings, forms)}
              </section>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  function localSwipeTabs(carouselId, tabs, activeTab, label) {
    return `
      <nav class="detail-tabs local-tabs" data-carousel-id="${esc(carouselId)}" aria-label="${esc(label)}">
        <span class="detail-tab-indicator" aria-hidden="true"></span>
        ${tabs.map((tab) => `
          <button class="tab-btn ${activeTab === tab.key ? "active" : ""}" data-action="switch-local-tab" data-carousel-id="${esc(carouselId)}" data-tab="${esc(tab.key)}" aria-label="${esc(tab.label || tab.key)}">${tab.html || esc(tab.label)}</button>
        `).join("")}
      </nav>
    `;
  }

  function localSwipeCarousel(carouselId, tabs, activeTab, stateKey, renderPanel) {
    const keys = tabs.map((tab) => tab.key);
    const activeIndex = Math.max(0, keys.indexOf(activeTab));
    const offset = -(activeIndex * (100 / keys.length));
    return `
      <div class="detail-carousel local-carousel" data-carousel-id="${esc(carouselId)}" data-state-key="${esc(stateKey)}" data-active-tab="${esc(activeTab)}" data-tab-order="${esc(keys.join(","))}" data-active-index="${activeIndex}">
        <div class="detail-carousel-track" style="transform: translate3d(${offset}%, 0, 0)">
          ${keys.map((key) => {
            const active = key === activeTab;
            return `
              <section class="detail-slide ${active ? "active" : ""}" data-tab-panel="${esc(key)}" aria-hidden="${active ? "false" : "true"}" ${active ? "" : "inert"}>
                ${renderPanel(key)}
              </section>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  function listingDetailTabContent(activeTab, item, own, matched, viewings, forms) {
    if (activeTab === "customers") {
      return `
        <section class="section">
          <div class="section-title">${esc(t("matchesCustomers"))}<span>${matched.length}</span></div>
          <div class="stack">
            ${matched.map(({ person, match }) => matchCustomerCard(person, match, item.id)).join("") || `<div class="empty">No matches</div>`}
          </div>
        </section>
      `;
    }
    if (activeTab === "viewings") {
      return `
        <section class="section">
          <div class="section-title">${esc(t("viewings"))}<span>${viewings.length}</span></div>
          <div class="stack">${viewings.map((row) => viewingCard(row, { link: "viewing" })).join("") || `<div class="empty">No viewings</div>`}</div>
        </section>
      `;
    }
    if (activeTab === "forms") {
      return `
        <section class="section">
          <div class="section-title">${esc(t("formsAttached"))}<span>${forms.length}</span></div>
          <div class="stack">
            ${forms.map(formCard).join("")}
            <button class="btn primary full" data-action="send-form5" data-listing="${esc(item.id)}">${esc(t("sendForm5"))}</button>
          </div>
        </section>
      `;
    }
    if (activeTab === "timeline") return timelinePanel("listing", item.id);
    return `
      ${detailKpis(item, matched, viewings, forms)}
      <section class="section">
        <div class="section-title">${esc(t("media"))}<span>${esc(item.updatedAt)}</span></div>
        <div class="gallery">
          <button class="gallery-tile" data-action="open-photo" data-listing="${esc(item.id)}" data-index="0" aria-label="${esc(t("photo"))} 1">
            <span class="gallery-label">${esc(t("photo"))} 1</span>
            <span class="gallery-expand">${icon("maximize")}</span>
          </button>
          <button class="gallery-tile" data-action="open-photo" data-listing="${esc(item.id)}" data-index="1" aria-label="${esc(t("photo"))} 2">
            <span class="gallery-label">${esc(t("photo"))} 2</span>
            <span class="gallery-expand">${icon("maximize")}</span>
          </button>
          <button class="gallery-tile floor" data-action="open-photo" data-listing="${esc(item.id)}" data-index="2" style="grid-column: 1 / -1" aria-label="${esc(t("floorPlanLabel"))}">
            <span class="gallery-label">${esc(t("floorPlanLabel"))}</span>
            <span class="gallery-expand">${icon("maximize")}</span>
          </button>
        </div>
      </section>
      ${specSection(item)}
      ${ownerSection(item, own)}
      ${riskFacilitiesSection(item)}
    `;
  }

  function detailKpis(item, matched, viewings, forms) {
    const pending = forms.filter((row) => row.status === "sent");
    const soonest = pending.map((f) => daysUntil(f.expiresAt)).filter((n) => n != null).sort((a, b) => a - b)[0];
    const formWarn = soonest != null && soonest <= 3;
    const sortedV = [...viewings].sort((a, b) => a.datetime.localeCompare(b.datetime));
    const nextV = sortedV.find((v) => daysUntil(v.datetime) >= 0) || sortedV[0];
    return `
      <section class="kpi-row detail-kpis">
        <button class="kpi" data-action="switch-detail-tab" data-listing="${esc(item.id)}" data-tab="customers">
          <span class="kpi-top"><span class="kpi-ico">${icon("sparkles")}</span>${matched.length ? `<span class="dot"></span>` : ""}</span>
          <span class="kpi-value">${matched.length}</span>
          <span class="kpi-label">${esc(t("matchesCustomers"))}</span>
          <span class="kpi-sub">${esc(lang === "zh" ? "等待客戶" : "waiting")}</span>
        </button>
        <button class="kpi" data-action="switch-detail-tab" data-listing="${esc(item.id)}" data-tab="viewings">
          <span class="kpi-top"><span class="kpi-ico">${icon("eye")}</span></span>
          <span class="kpi-value">${viewings.length}</span>
          <span class="kpi-label">${esc(t("viewings"))}</span>
          <span class="kpi-sub">${esc(nextV ? (lang === "zh" ? "下一場 " : "next ") + nextV.datetime.slice(11, 16) : (lang === "zh" ? "未安排" : "none"))}</span>
        </button>
        <button class="kpi ${formWarn ? "warn" : ""}" data-action="switch-detail-tab" data-listing="${esc(item.id)}" data-tab="forms">
          <span class="kpi-top"><span class="kpi-ico">${icon("file")}</span></span>
          <span class="kpi-value">${forms.length}</span>
          <span class="kpi-label">${esc(t("documents"))}</span>
          <span class="kpi-sub">${esc(soonest != null ? (lang === "zh" ? `${soonest} 日內到期` : `${soonest}d to expiry`) : (lang === "zh" ? "無待簽" : "none pending"))}</span>
        </button>
      </section>
    `;
  }

  function photoViewer() {
    const pv = state.photoViewer;
    if (!pv) return "";
    const item = listing(pv.listingId);
    if (!item) return "";
    const total = 3;
    const index = Math.max(0, Math.min(total - 1, pv.index || 0));
    const isFloor = index === 2;
    const caption = isFloor ? t("floorPlanLabel") : `${t("photo")} ${index + 1}`;
    const dots = [0, 1, 2].map((i) => `<span class="pv-dot${i === index ? " on" : ""}"></span>`).join("");
    return `
      <div class="photo-viewer" role="dialog" aria-modal="true" aria-label="${esc(item.address)}">
        <button class="pv-scrim" data-action="close-photo" aria-label="${esc(t("close"))}"></button>
        <div class="pv-head">
          <span class="pv-addr">${esc(item.address)}</span>
          <button class="icon-btn pv-close" data-action="close-photo" aria-label="${esc(t("close"))}">${icon("close")}</button>
        </div>
        <div class="pv-stage-wrap">
          <button class="icon-btn pv-nav prev" data-action="photo-prev" aria-label="${esc(lang === "zh" ? "上一張" : "Previous")}">${icon("chevronRight", "flip")}</button>
          <div class="pv-viewport">
            <div class="pv-track" style="transform: translate3d(-${index * 100}%, 0, 0)">
              <div class="pv-slide"><div class="pv-stage"></div></div>
              <div class="pv-slide"><div class="pv-stage"></div></div>
              <div class="pv-slide"><div class="pv-stage floor"></div></div>
            </div>
          </div>
          <button class="icon-btn pv-nav next" data-action="photo-next" aria-label="${esc(lang === "zh" ? "下一張" : "Next")}">${icon("chevronRight")}</button>
        </div>
        <div class="pv-foot">
          <span class="pv-caption">${esc(caption)}</span>
          <span class="pv-dots">${dots}</span>
        </div>
      </div>
    `;
  }

  // Slide the photo-viewer track to `target` (0..2), then commit the index.
  // Animates with anime.js when available; falls back to an instant commit.
  // Used by both the prev/next buttons and the swipe gesture.
  function slidePhotoTo(target) {
    const pv = state.photoViewer;
    if (!pv) return;
    target = Math.max(0, Math.min(2, target));
    const cur = Math.max(0, Math.min(2, pv.index || 0));
    const track = root.querySelector(".photo-viewer .pv-track");
    const commit = () => {
      if (!state.photoViewer) return;
      state.photoViewer = { ...state.photoViewer, index: target };
      saveState();
      render();
    };
    if (!track) {
      if (target !== cur) commit();
      return;
    }
    const width = track.getBoundingClientRect().width || 1;
    const from = track.dataset.x != null ? Number(track.dataset.x) : -cur * width;
    const to = -target * width;
    const setX = (x) => { track.style.transform = `translate3d(${x}px, 0, 0)`; track.dataset.x = String(x); };
    const animate = window.anime && window.anime.animate;
    if (!animate || reducedMotion() || Math.abs(to - from) < 1) {
      if (target !== cur) commit();
      else setX(to);
      return;
    }
    const frame = { x: from };
    animate(frame, {
      x: to,
      duration: 240,
      ease: "out(3)",
      onUpdate: () => setX(frame.x),
      onComplete: () => { if (target !== cur) commit(); else setX(to); }
    });
  }

  function openPhotoViewer(listingId, index) {
    state.photoViewer = { listingId, index: Math.max(0, Math.min(2, index || 0)) };
    saveState();
    // Push a history entry so the OS/browser back gesture (or back button) closes
    // the viewer via the popstate handler instead of navigating to the previous page.
    try { history.pushState({ pvOpen: true }, ""); } catch (e) {}
    render();
  }

  function closePhotoViewer(fromPopstate) {
    if (!state.photoViewer) return;
    state.photoViewer = null;
    saveState();
    // When closed via the × / scrim, pop the marker we added on open. (When closed
    // by a back gesture, popstate already consumed it, so don't pop again.)
    if (!fromPopstate) {
      try { history.back(); } catch (e) {}
    }
    render();
  }

  function riskFacilitiesSection(item) {
    return `
      <section class="section card">
        <div class="section-title">${esc(t("riskFacilities"))}<span>${esc(item.flags.managementCompany)}</span></div>
        <div class="chips">
          <span class="chip ${item.flags.haunted ? "bad" : "ok"}">${item.flags.haunted ? "凶宅" : "非凶宅"}</span>
          <span class="chip ${item.flags.op ? "ok" : "warn"}">入伙紙 OP</span>
          <span class="chip ${item.flags.clubhouse ? "ok" : ""}">會所</span>
          <span class="chip ${item.flags.bankValuation ? "ok" : "warn"}">銀行估價</span>
          <span class="chip">${esc(item.flags.managementCompany)}</span>
        </div>
      </section>
    `;
  }

  function specSection(item) {
    return `
      <section class="section card">
        <div class="section-title">${esc(t("propertyHighlights"))}<span>${esc(item.floorPlan)}</span></div>
        <div class="spec-grid">
          ${spec("實用面積", `${item.area}呎`)}
          ${spec("房/廳", `${item.rooms}房 ${item.halls}廳`)}
          ${spec("樓層", item.floor)}
          ${spec("朝向", item.direction)}
          ${spec("樓齡", `${item.age}年`)}
          ${spec("管理費", money(item.managementFee))}
          ${spec("校網", item.schoolNet)}
          ${spec("租約", item.tenancy)}
        </div>
      </section>
    `;
  }

  function ownerSection(item, own) {
    return `
      <section class="section card">
        <div class="section-title">${esc(t("ownerViewing"))}<span>${esc(item.keyConsent ? "Key consent" : "By appointment")}</span></div>
        <div class="row">
          <div class="avatar">${esc((own && own.name || "業").slice(0, 2))}</div>
          <div class="grow">
            <h2 class="title-sm">${esc(own ? own.name : "N/A")}</h2>
            <div class="meta">${esc(own ? own.phone : "")} · ${esc(own ? own.email : "")}</div>
          </div>
          ${own && own.phone ? `<a class="icon-btn call-btn" href="tel:${esc(cleanPhone(own.phone))}" aria-label="${esc(t("callOwner"))} ${esc(own.name)}">${icon("phone")}</a>` : ""}
        </div>
      </section>
    `;
  }

  function spec(label, value) {
    return `
      <div class="spec-item">
        <div class="spec-label">${esc(label)}</div>
        <div class="spec-value">${esc(value)}</div>
      </div>
    `;
  }

  function matchCustomerCard(person, match, listingId) {
    return `
      <article class="card">
        <div class="row start">
          <div class="avatar">${esc(person.name.slice(0, 2))}</div>
          <div class="grow">
            <div class="row between start">
              <h3 class="title-sm">${esc(person.name)}</h3>
              <span class="chip brand">${match.score}/8</span>
            </div>
            <div class="meta">${money(person.requirement.budgetMin)}-${money(person.requirement.budgetMax)} · ${esc(person.requirement.districts.join(" / "))}</div>
            <div class="chips" style="margin-top: 7px">
              ${match.reasons.map((reason) => `<span class="chip ok">✓ ${esc(reason)}</span>`).join("")}
            </div>
            <div class="actions" style="margin-top: 10px">
              <button class="btn small secondary" data-nav="#/customer/${esc(person.id)}">${icon("users")} ${esc(t("viewCustomer"))}</button>
              <button class="btn small secondary" data-action="send-viewing-paper" data-listing="${esc(listingId)}" data-customer="${esc(person.id)}">${esc(t("sendViewingPaper"))}</button>
              <button class="btn small" data-action="arrange-viewing" data-listing="${esc(listingId)}" data-customer="${esc(person.id)}">${esc(t("arrangeViewing"))}</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderListingForm(id) {
    const editing = Boolean(id);
    const item = editing ? listing(id) : null;
    return shell(`
      ${pageHead(t("listings"), editing ? t("edit") : t("addListing"))}
      <form class="form-grid" data-form="listing" data-id="${esc(id || "")}">
        <section class="card form-grid">
          <div class="field">
            <label for="listing-address">${esc(lang === "zh" ? "地址" : "Address")}</label>
            <input id="listing-address" name="address" value="${esc(item ? item.address : "沙田 Lucky Plaza 中層 F室")}" />
          </div>
          <div class="grid-2">
            <div class="field">
              <label for="listing-district">${esc(lang === "zh" ? "地區" : "District")}</label>
              <select id="listing-district" name="district">
                ${["沙田", "大圍", "馬鞍山"].map((district) => `<option ${item && item.district === district ? "selected" : ""}>${esc(district)}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="listing-status">${esc(t("status"))}</label>
              <select id="listing-status" name="status">
                ${["available", "reserved", "closed", "withdrawn"].map((status) => `<option value="${status}" ${item && item.status === status ? "selected" : ""}>${esc(statusLabel(status))}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="grid-2">
            <div class="field">
              <label for="listing-area">實用面積</label>
              <input id="listing-area" name="area" inputmode="numeric" value="${esc(item ? item.area : 455)}" />
            </div>
            <div class="field">
              <label for="listing-rent">${esc(lang === "zh" ? "月租" : "Monthly rent")}</label>
              <input id="listing-rent" name="rent" inputmode="numeric" value="${esc(item ? item.rent : 18800)}" />
            </div>
          </div>
          <div class="grid-2">
            <div class="field">
              <label for="listing-rooms">房數</label>
              <input id="listing-rooms" name="rooms" inputmode="numeric" value="${esc(item ? item.rooms : 2)}" />
            </div>
            <div class="field">
              <label for="listing-school">校網</label>
              <input id="listing-school" name="schoolNet" value="${esc(item ? item.schoolNet : "91")}" />
            </div>
          </div>
          <div class="field">
            <label for="listing-owner">${esc(t("owner"))}</label>
            <select id="listing-owner" name="ownerId">
              ${state.owners.map((own) => `<option value="${esc(own.id)}" ${item && item.ownerId === own.id ? "selected" : ""}>${esc(own.name)} · ${esc(own.phone)}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="listing-note">${esc(lang === "zh" ? "相片 / 平面圖" : "Photos / floor plan")}</label>
            <textarea id="listing-note" name="floorPlan">${esc(item ? item.floorPlan : "兩房開則，客廳企理，平面圖待補。")}</textarea>
            <span class="helper">${esc(lang === "zh" ? "示範版只儲存文字，不上載檔案。" : "Prototype stores text only.")}</span>
          </div>
        </section>
        <div class="sticky-actions">
          <button class="btn full" type="button" data-nav="#/listings">${esc(t("cancel"))}</button>
          <button class="btn primary full" type="submit">${esc(t("save"))}</button>
        </div>
      </form>
    `);
  }

  function renderCustomers() {
    const tabs = [
      { key: "all", label: t("all") },
      { key: "active", label: t("active") },
      { key: "tenant", label: lang === "zh" ? "租客" : "Tenants" },
      { key: "shatin", label: lang === "zh" ? "大圍/沙田" : "Tai Wai/Sha Tin" }
    ];
    const keys = tabs.map((tab) => tab.key);
    const activeTab = keys.includes(state.customersTab) ? state.customersTab : "all";
    const customersForTab = (tab) => state.customers.filter((person) => {
      if (tab === "active") return person.status === "active";
      if (tab === "tenant") return person.requirement.dealType === "lease";
      if (tab === "shatin") return person.requirement.districts.some((district) => district === "沙田" || district === "大圍");
      return true;
    });
    const panel = (tab) => {
      const rows = customersForTab(tab);
      return rows.length ? `
        <div class="table-list">
          ${rows.map((person) => {
            const count = listingsForCustomer(person.id).length;
            return `
              <button class="table-row" data-nav="#/customer/${esc(person.id)}">
                <span>
                  <strong>${esc(person.name)}</strong>
                  <span class="meta" style="display:block">${money(person.requirement.budgetMin)}-${money(person.requirement.budgetMax)} · ${esc(person.requirement.districts.join(" / "))} · ${esc(userName(person.owningAgentId, lang === "en"))}</span>
                </span>
                <span class="chips" style="justify-content:flex-end">
                  ${formStatusChip(person.status)}
                  <span class="chip brand">${count}</span>
                </span>
              </button>
            `;
          }).join("")}
        </div>
      ` : `<div class="empty">${esc(lang === "zh" ? "沒有符合條件的客戶" : "No customers match")}</div>`;
    };
    return shell(`
      ${pageHead(t("customers"), t("customers"), `<button class="btn small primary" data-nav="#/customer/new">${esc(t("addCustomer"))}</button>`)}
      ${localSwipeTabs("customers", tabs, activeTab, t("customers"))}
      ${localSwipeCarousel("customers", tabs, activeTab, "customersTab", panel)}
    `, { detailPage: true, scrollTopbar: true, topbarTitle: t("customers") });
  }

  function renderCustomerDetail(id) {
    const person = customer(id);
    if (!person) return shell(notFound());
    const matched = listingsForCustomer(id);
    const viewings = state.viewings.filter((row) => row.customerId === id);
    return shell(`
      ${pageHead(t("customers"), person.name, `<button class="btn small" data-nav="#/customer/edit/${esc(person.id)}">${esc(t("edit"))}</button>`)}
      <section class="card">
        <div class="row">
          <div class="avatar">${esc(person.name.slice(0, 2))}</div>
          <div class="grow">
            <h2 class="title-md">${esc(person.name)}</h2>
            <div class="meta">${esc(person.phone)} · ${esc(person.email)}</div>
          </div>
          ${formStatusChip(person.status)}
          ${person.phone ? `<a class="icon-btn call-btn" href="tel:${esc(cleanPhone(person.phone))}" aria-label="${esc(lang === "zh" ? "致電" : "Call")} ${esc(person.name)}">${icon("phone")}</a>` : ""}
        </div>
      </section>
      <section class="section card">
        <div class="section-title">${esc(t("requirement"))}<span>${esc(t("requirementEdit"))}</span></div>
        <div class="spec-grid">
          ${spec(lang === "zh" ? "預算" : "Budget", `${money(person.requirement.budgetMin)}-${money(person.requirement.budgetMax)}`)}
          ${spec(lang === "zh" ? "地區" : "Districts", person.requirement.districts.join(" / "))}
          ${spec("實用面積", `${person.requirement.areaMin}-${person.requirement.areaMax}呎`)}
          ${spec("房數", `${person.requirement.rooms}+`)}
        </div>
        <div class="chips" style="margin-top: 10px">
          ${person.requirement.mustHaves.map((need) => `<span class="chip">${esc(need)}</span>`).join("")}
        </div>
      </section>
      <section class="section">
        <div class="section-title">${esc(t("matchesListings"))}<span>${matched.length}</span></div>
        <div class="stack">
          ${matched.map(({ item, match }) => matchListingCard(item, match, person.id)).join("") || `<div class="empty">No matches</div>`}
        </div>
      </section>
      <section class="section">
        <div class="section-title">${esc(t("viewings"))}<span>${viewings.length}</span></div>
        <div class="stack">${viewings.map((row) => viewingCard(row, { link: "listing" })).join("") || `<div class="empty">No viewings</div>`}</div>
      </section>
      ${timelinePanel("customer", id)}
    `, { scrollTopbar: true, topbarTitle: person.name });
  }

  function matchListingCard(item, match, customerId) {
    return `
      <article class="card">
        <div class="row start">
          <button class="mini-thumb" data-nav="#/listing/${esc(item.id)}"></button>
          <div class="grow">
            <div class="row between start">
              <h3 class="title-sm">${esc(item.address)}</h3>
              <span class="chip brand">${match.score}/8</span>
            </div>
            <div class="meta">${esc(item.area)}呎 · ${money(item.rent, lang === "zh" ? "/月" : "/mo")} · ${esc(item.tenancy)}</div>
            <div class="chips" style="margin-top: 7px">
              ${match.reasons.map((reason) => `<span class="chip ok">✓ ${esc(reason)}</span>`).join("")}
            </div>
            <div class="actions" style="margin-top: 10px">
              <button class="btn small secondary" data-nav="#/listing/${esc(item.id)}">${icon("building")} ${esc(t("viewListing"))}</button>
              <button class="btn small secondary" data-action="send-viewing-paper" data-listing="${esc(item.id)}" data-customer="${esc(customerId)}">${esc(t("sendViewingPaper"))}</button>
              <button class="btn small" data-action="arrange-viewing" data-listing="${esc(item.id)}" data-customer="${esc(customerId)}">${esc(t("arrangeViewing"))}</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderCustomerForm(id) {
    const editing = Boolean(id);
    const person = editing ? customer(id) : null;
    return shell(`
      ${pageHead(t("customers"), editing ? t("edit") : t("addCustomer"))}
      <form class="form-grid" data-form="customer" data-id="${esc(id || "")}">
        <section class="card form-grid">
          <div class="field">
            <label for="customer-name">${esc(t("fullName"))}</label>
            <input id="customer-name" name="name" value="${esc(person ? person.name : "周小姐")}" />
          </div>
          <div class="grid-2">
            <div class="field">
              <label for="customer-phone">${esc(t("phone"))}</label>
              <input id="customer-phone" name="phone" value="${esc(person ? person.phone : "6333 2109")}" />
            </div>
            <div class="field">
              <label for="customer-budget">${esc(lang === "zh" ? "最高預算" : "Max budget")}</label>
              <input id="customer-budget" name="budgetMax" inputmode="numeric" value="${esc(person ? person.requirement.budgetMax : 21000)}" />
            </div>
          </div>
          <div class="field">
            <label for="customer-districts">${esc(lang === "zh" ? "目標地區" : "Target districts")}</label>
            <input id="customer-districts" name="districts" value="${esc(person ? person.requirement.districts.join(",") : "沙田,馬鞍山")}" />
          </div>
          <div class="grid-2">
            <div class="field">
              <label for="customer-area">實用面積</label>
              <input id="customer-area" name="areaMin" inputmode="numeric" value="${esc(person ? person.requirement.areaMin : 420)}" />
            </div>
            <div class="field">
              <label for="customer-rooms">房數</label>
              <input id="customer-rooms" name="rooms" inputmode="numeric" value="${esc(person ? person.requirement.rooms : 2)}" />
            </div>
          </div>
          <div class="field">
            <label for="customer-must">${esc(lang === "zh" ? "必需條件" : "Must-haves")}</label>
            <textarea id="customer-must" name="mustHaves">${esc(person ? person.requirement.mustHaves.join(",") : "交吉,近港鐵,可養貓")}</textarea>
          </div>
        </section>
        <div class="sticky-actions">
          <button class="btn full" type="button" data-nav="#/customers">${esc(t("cancel"))}</button>
          <button class="btn primary full" type="submit">${esc(t("save"))}</button>
        </div>
      </form>
    `);
  }

  function renderMatches(mode, id, params) {
    const newBanner = params.get("new") === "1";
    const isListing = mode === "listing";
    const subject = isListing ? listing(id) : customer(id);
    if (!subject) return shell(notFound());
    const rows = isListing ? customersForListing(id) : listingsForCustomer(id);
    return shell(`
      ${pageHead(t("newMatches"), isListing ? subject.address : subject.name)}
      ${newBanner ? `<div class="notice">${esc(lang === "zh" ? "新盤已完成透明配對，以下客戶符合主要條件。" : "New listing matched against waiting customers.")}</div>` : ""}
      <section class="section">
        <div class="section-title">${esc(isListing ? t("matchesCustomers") : t("matchesListings"))}<span>${rows.length}</span></div>
        <div class="stack">
          ${rows.map((row) => isListing ? matchCustomerCard(row.person, row.match, id) : matchListingCard(row.item, row.match, id)).join("") || `<div class="empty">No matches</div>`}
        </div>
      </section>
    `);
  }

  function keyChip(row) {
    return row.keyLocation === "office"
      ? `<span class="chip ok">${icon("key")} ${esc(t("keyAtOffice"))}</span>`
      : `<span class="chip warn">${icon("key")} ${esc(t("keyAtOwner"))}</span>`;
  }

  function formReadyChip(row) {
    return row.formReady
      ? `<span class="chip ok">${icon("fileCheck")} ${esc(t("formReady"))}</span>`
      : `<span class="chip info">${icon("file")} ${esc(t("formNotReady"))}</span>`;
  }

  function viewingCard(row, options = {}) {
    const item = listing(row.listingId);
    const person = customer(row.customerId);
    const time = row.datetime.slice(11, 16);
    const logistics = options.detail
      ? `<div class="chips" style="margin-top: 8px">${keyChip(row)}${formReadyChip(row)}${formStatusChip(row.status)}</div>`
      : "";
    const navable = options.detail && item;
    let linkBtn = "";
    if (!options.detail && options.link === "viewing") {
      linkBtn = `<button class="btn small secondary" data-nav="${esc(viewingItineraryHash(row))}">${icon("eye")} ${esc(t("viewViewing"))}</button>`;
    } else if (!options.detail && options.link === "listing" && item) {
      linkBtn = `<button class="btn small secondary" data-nav="#/listing/${esc(row.listingId)}">${icon("building")} ${esc(t("viewListing"))}</button>`;
    }
    const inner = `
      <div class="row start">
        <div class="avatar">${esc(time)}</div>
        <div class="grow">
          <h3 class="title-sm">${esc(item ? item.address : row.listingId)}</h3>
          <div class="meta">${esc(person ? person.name : row.customerId)} · ${esc(userName(row.agentId, lang === "en"))}</div>
          ${row.outcome ? `<div class="timeline-copy">${esc(row.outcome)}</div>` : ""}
          ${logistics}
          ${linkBtn ? `<div class="actions" style="margin-top: 10px">${linkBtn}</div>` : ""}
        </div>
        ${navable ? `<span class="itin-chev">${icon("chevronRight")}</span>` : (options.detail ? "" : formStatusChip(row.status))}
      </div>
    `;
    if (navable) {
      return `<button class="card tight viewing-stop" data-nav="#/listing/${esc(row.listingId)}" aria-label="${esc(t("viewDetails"))} ${esc(item.address)}">${inner}</button>`;
    }
    return `<article class="card tight">${inner}</article>`;
  }

  function itineraryCard(it) {
    const person = customer(it.customerId);
    const g = itineraryGlance(it);
    return `
      <button class="card tight itin-card" data-nav="#/viewing/day/${esc(it.customerId)}/${esc(it.date)}" aria-label="${esc(person ? person.name : it.customerId)} ${esc(dayLabel(it.date))}">
        <div class="row start">
          <div class="avatar">${esc(person ? person.name.slice(0, 2) : "?")}</div>
          <div class="grow">
            <h3 class="title-sm">${esc(person ? person.name : it.customerId)} · ${esc(dayLabel(it.date))}</h3>
            <div class="meta">${esc(g.timeRange)} · ${g.total} ${esc(t("stops"))}</div>
            <div class="chips" style="margin-top: 7px">
              <span class="chip ${g.formsReady === g.total ? "ok" : "warn"}">${icon("fileCheck")} ${g.formsReady}/${g.total}</span>
              ${g.keyOwner
                ? `<span class="chip warn">${icon("key")} ${g.keyOwner} ${esc(lang === "zh" ? "約業主" : "by owner")}</span>`
                : `<span class="chip ok">${icon("key")} ${esc(lang === "zh" ? "全部取匙" : "all office")}</span>`}
            </div>
          </div>
          <span class="itin-chev">${icon("chevronRight")}</span>
        </div>
      </button>
    `;
  }

  function renderViewingDay(customerId, date) {
    const person = customer(customerId);
    const stops = state.viewings
      .filter((row) => row.customerId === customerId && viewingDate(row) === date)
      .sort((a, b) => viewingMinutes(a) - viewingMinutes(b));
    if (!person || !stops.length) return shell(notFound());
    const g = itineraryGlance({ stops });
    return shell(`
      ${pageHead(t("itinerary"), person.name + " · " + dayLabel(date))}
      <section class="card">
        <div class="spec-grid">
          ${spec(t("stops"), g.total)}
          ${spec(lang === "zh" ? "時段" : "Time", g.timeRange)}
          ${spec(lang === "zh" ? "睇樓紙" : "Forms", g.formsReady + "/" + g.total)}
          ${spec(lang === "zh" ? "取匙" : "Office key", g.keyOffice + "/" + g.total)}
        </div>
      </section>
      <section class="section">
        <div class="stack">${stops.map((row) => viewingCard(row, { detail: true })).join("")}</div>
      </section>
      <div class="sticky-actions">
        <button class="btn full" type="button" data-nav="#/viewings">${esc(t("back"))}</button>
        <button class="btn primary full" type="button" data-nav="#/viewing/new?customer=${esc(customerId)}&date=${esc(date)}">${esc(t("addStop"))}</button>
      </div>
    `);
  }

  function todaySlotsCard() {
    const today = todaysViewings();
    return `
      <section class="card">
        <div class="section-title">${esc(t("todaySlots"))}<span>${today.length}</span></div>
        ${today.length
          ? `<div class="today-list">
              ${today.map((row) => {
                const person = customer(row.customerId);
                const item = listing(row.listingId);
                const name = person ? person.name : row.customerId;
                const time = row.datetime.slice(11, 16);
                return `
                  <button class="today-slot" data-nav="${esc(viewingItineraryHash(row))}" aria-label="${esc(name)} ${esc(time)}">
                    <span class="today-time">${esc(time)}</span>
                    <span class="today-main">
                      <span class="today-name">${esc(name)}</span>
                      ${item ? `<span class="today-sub">${esc(item.address)}</span>` : ""}
                    </span>
                    <span class="itin-chev">${icon("chevronRight")}</span>
                  </button>
                `;
              }).join("")}
            </div>`
          : `<div class="empty">${esc(lang === "zh" ? "今日沒有睇樓" : "No viewings today")}</div>`}
      </section>
    `;
  }

  function renderViewings() {
    const tabs = [
      { key: "list", label: t("list"), html: icon("list") },
      { key: "calendar", label: t("calendar"), html: icon("calendar") }
    ];
    const activeTab = state.viewingsTab === "calendar" ? "calendar" : "list";
    const addBtn = `<button class="btn small primary" type="button" data-nav="#/viewing/new">${esc(t("addViewing"))}</button>`;
    const panel = (tab) => {
      if (tab === "calendar") {
        const day = state.calendarDay;
        const groups = itineraries(day);
        return `
          ${calendarGrid(state.calendarMonth || DEMO_NOW.date.slice(0, 7), { selected: day, onAction: "pick-day-list" })}
          <section class="section">
            <div class="section-title">${esc(dayLabel(day))}<span>${groups.length}</span></div>
            <div class="stack">${groups.map(itineraryCard).join("") || `<div class="empty">${esc(t("noViewingsDay"))}</div>`}</div>
            ${groups.length ? "" : `<button class="btn primary full" type="button" data-nav="#/viewing/new?date=${esc(day)}" style="margin-top:10px">${esc(t("addViewing"))}</button>`}
          </section>
        `;
      }
      const groups = itineraries();
      return `
        ${todaySlotsCard()}
        <section class="section">
          <div class="section-title">${esc(t("allItineraries"))}<span>${groups.length}</span></div>
          <div class="stack">${groups.map(itineraryCard).join("") || `<div class="empty">${esc(t("noViewings"))}</div>`}</div>
        </section>
      `;
    };
    return shell(`
      ${pageHead(t("viewings"), t("viewings"), addBtn)}
      ${localSwipeTabs("viewings", tabs, activeTab, t("viewings"))}
      ${localSwipeCarousel("viewings", tabs, activeTab, "viewingsTab", panel)}
    `, { detailPage: true, scrollTopbar: true, topbarTitle: t("viewings") });
  }

  function renderViewingForm(params) {
    const pCustomer = params.get("customer") || "";
    const pListing = params.get("listing") || "";
    const pDate = params.get("date") || "";
    const formKey = pCustomer + "|" + pListing + "|" + pDate;
    let draft = state.viewingDraft;
    if (!draft || draft._formKey !== formKey) {
      const firstCustomer = pCustomer || (state.customers[0] && state.customers[0].id) || "";
      const firstListing = pListing || (state.listings[0] && state.listings[0].id) || "";
      const li0 = listing(firstListing);
      draft = {
        _formKey: formKey,
        customerId: firstCustomer,
        listingId: firstListing,
        date: pDate || DEMO_NOW.date,
        time: "",
        keyLocation: li0 && !li0.keyConsent ? "owner" : "office",
        formReady: false,
        outcome: ""
      };
      state.viewingDraft = draft;
      state.calendarMonth = draft.date.slice(0, 7);
    }
    const takenTimes = state.viewings
      .filter((row) => row.customerId === draft.customerId && viewingDate(row) === draft.date)
      .map((row) => row.datetime.slice(11, 16));
    return shell(`
      ${pageHead(t("viewings"), t("addViewing"))}
      <form class="form-grid" data-form="viewing">
        <input type="hidden" name="date" value="${esc(draft.date)}" />
        <input type="hidden" name="time" value="${esc(draft.time)}" />
        <section class="card form-grid">
          <div class="field">
            <label for="viewing-customer">${esc(t("selectCustomer"))}</label>
            <select id="viewing-customer" name="customerId">
              ${state.customers.map((c) => `<option value="${esc(c.id)}" ${c.id === draft.customerId ? "selected" : ""}>${esc(c.name)} · ${esc(c.phone)}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="viewing-listing">${esc(t("selectListing"))}</label>
            <select id="viewing-listing" name="listingId">
              ${state.listings.map((l) => `<option value="${esc(l.id)}" ${l.id === draft.listingId ? "selected" : ""}>${esc(l.address)}</option>`).join("")}
            </select>
          </div>
        </section>
        <div class="field">
          <label>${esc(t("selectDate"))} · <span class="field-pick">${esc(dayLabel(draft.date))}</span></label>
          ${calendarGrid(state.calendarMonth || draft.date.slice(0, 7), { selected: draft.date, onAction: "pick-day" })}
        </div>
        <div class="field">
          <label>${esc(t("selectTime"))}${draft.time ? ` · <span class="field-pick">${esc(draft.time)}</span>` : ""}</label>
          ${timeSlots(draft.time, takenTimes)}
        </div>
        <section class="card form-grid">
          <div class="grid-2">
            <div class="field">
              <label for="viewing-key">${esc(t("keyLocationLabel"))}</label>
              <select id="viewing-key" name="keyLocation">
                <option value="office" ${draft.keyLocation === "office" ? "selected" : ""}>${esc(t("keyAtOffice"))}</option>
                <option value="owner" ${draft.keyLocation === "owner" ? "selected" : ""}>${esc(t("keyAtOwner"))}</option>
              </select>
            </div>
            <div class="field">
              <label for="viewing-form">${esc(lang === "zh" ? "睇樓紙狀態" : "Form 6 status")}</label>
              <select id="viewing-form" name="formReady">
                <option value="" ${!draft.formReady ? "selected" : ""}>${esc(t("formNotReady"))}</option>
                <option value="on" ${draft.formReady ? "selected" : ""}>${esc(t("formReady"))}</option>
              </select>
            </div>
          </div>
          <div class="field">
            <label for="viewing-note">${esc(t("viewingNote"))}</label>
            <textarea id="viewing-note" name="outcome">${esc(draft.outcome)}</textarea>
          </div>
        </section>
        <div class="sticky-actions viewing-actions">
          <div class="va-row">
            <button class="btn full" type="button" data-nav="#/viewings">${esc(t("cancel"))}</button>
            <button class="btn primary full" type="submit">${esc(t("save"))}</button>
          </div>
          <button class="btn secondary full" type="submit" name="addAnother" value="1">${esc(t("saveAddAnother"))}</button>
        </div>
      </form>
    `);
  }

  function formCard(row) {
    const item = listing(row.listingId);
    const person = customer(row.customerId);
    return `
      <article class="card tight">
        <div class="row start">
          <div class="avatar">${esc(row.type.slice(0, 2))}</div>
          <div class="grow">
            <h3 class="title-sm">${esc(row.type)}</h3>
            <div class="meta">${esc(item ? item.address : "")}${person ? " · " + esc(person.name) : ""}</div>
            <div class="chips" style="margin-top: 7px">${formStatusChip(row.status)}${row.expiresAt ? `<span class="chip">${esc(row.expiresAt)}</span>` : ""}</div>
          </div>
          <button class="btn small" data-nav="#/forms/send/${esc(row.id)}">${esc(t("detail"))}</button>
        </div>
      </article>
    `;
  }

  function renderForms() {
    const tabs = [
      { key: "all", label: t("all") },
      { key: "form5", label: "Form 5" },
      { key: "form6", label: "Form 6" },
      { key: "sent", label: t("sent") },
      { key: "signed", label: t("signed") }
    ];
    const keys = tabs.map((tab) => tab.key);
    const activeTab = keys.includes(state.formsTab) ? state.formsTab : "all";
    const formsForTab = (tab) => state.forms.filter((row) => {
      if (tab === "form5") return row.type.includes("Form 5");
      if (tab === "form6") return row.type.includes("Form 6");
      if (tab === "sent") return row.status === "sent";
      if (tab === "signed") return row.status === "signed";
      return true;
    });
    const panel = (tab) => {
      const rows = formsForTab(tab);
      return rows.length
        ? `<div class="stack">${rows.map(formCard).join("")}</div>`
        : `<div class="empty">${esc(lang === "zh" ? "沒有符合條件的表格" : "No forms match")}</div>`;
    };
    return shell(`
      ${pageHead(t("formHub"), t("forms"))}
      ${localSwipeTabs("forms", tabs, activeTab, t("forms"))}
      ${localSwipeCarousel("forms", tabs, activeTab, "formsTab", panel)}
    `, { detailPage: true, scrollTopbar: true, topbarTitle: t("forms") });
  }

  function renderFormSend(id) {
    const row = form(id);
    if (!row) return shell(notFound());
    const item = listing(row.listingId);
    const person = customer(row.customerId);
    const own = owner(row.ownerId || (item && item.ownerId));
    const canOpen = row.link && row.status !== "draft";
    return shell(`
      ${pageHead(t("formSend"), row.type)}
      <section class="form-paper">
        <div class="row between start">
          <div>
            <h2>${esc(row.type)}</h2>
            <h3>${esc(lang === "zh" ? "地產代理協議示範" : "Estate agency agreement demo")}</h3>
          </div>
          ${formStatusChip(row.status)}
        </div>
        <div class="legal-grid">
          ${legal("物業 Property", item ? item.address : "N/A")}
          ${legal("租金 Rent", item ? money(item.rent, "/月") : "N/A")}
          ${legal("業主 Landlord", own ? `${own.name} · ${own.phone}` : "N/A")}
          ${legal("客戶 Client", person ? `${person.name} · ${person.phone}` : (own ? own.name : "N/A"))}
          ${legal("代理 Agent", userName(state.currentUserId, lang === "en"))}
          ${legal("有效期 Expiry", row.expiresAt || "72h after generation")}
        </div>
      </section>
      <section class="section card">
        <div class="section-title">${esc(lang === "zh" ? "簽署連結" : "Signing link")}<span>${esc(row.status)}</span></div>
        <div class="field">
          <label for="form-link">${esc(lang === "zh" ? "一次性連結" : "One-time link")}</label>
          <input id="form-link" readonly value="${esc(row.link ? location.origin + location.pathname + row.link : "")}" />
        </div>
        <div class="actions" style="margin-top: 12px">
          <button class="btn primary" data-action="generate-form-link" data-form-id="${esc(row.id)}">${esc(t("generateLink"))}</button>
          <button class="btn" data-action="copy-form-link" data-form-id="${esc(row.id)}">${esc(t("copyLink"))}</button>
        </div>
      </section>
      <section class="section">
        <div class="actions">
          ${canOpen ? `<button class="btn secondary full" data-nav="${esc(row.link)}">${esc(t("openPublicLink"))}</button>` : ""}
          ${row.type.includes("Form 6") ? `<button class="btn primary full" data-action="arrange-viewing" data-listing="${esc(row.listingId)}" data-customer="${esc(row.customerId || "C-2001")}">${esc(t("arrangeViewing"))}</button>` : ""}
        </div>
      </section>
    `);
  }

  function legal(label, value) {
    return `<div class="legal-row"><strong>${esc(label)}</strong><span>${esc(value)}</span></div>`;
  }

  function renderSign(id) {
    const row = form(id);
    if (!row) return shell(notFound(), { public: true });
    const item = listing(row.listingId);
    const person = customer(row.customerId);
    const own = owner(row.ownerId || (item && item.ownerId));
    const isExpired = row.status === "expired";
    const isSigned = row.status === "signed";
    const titleState = isExpired ? t("linkExpired") : isSigned ? t("alreadySigned") : t("publicSign");
    return shell(`
      <div class="row between" style="margin-bottom: 14px">
        <div class="brand-mark">安</div>
        <button class="seg-btn" data-action="toggle-lang">${lang === "zh" ? "EN" : "繁"}</button>
      </div>
      ${pageHead(lang === "zh" ? "安居物業代理有限公司" : "On Kee Property Agency Ltd.", titleState)}
      ${isSigned || isExpired ? `<div class="notice ${isExpired ? "warn" : ""}">${esc(titleState)}</div>` : ""}
      <section class="form-paper section">
        <div>
          <h2>${esc(row.type)}</h2>
          <h3>Residential Leasing Agreement · 住宅租賃代理協議</h3>
        </div>
        <div class="legal-grid">
          ${legal("物業 Property", item ? item.address : "N/A")}
          ${legal("租金 Rent", item ? money(item.rent, "/月") : "N/A")}
          ${legal("實用 Saleable", item ? `${item.area} sq.ft. / ${item.area}呎` : "N/A")}
          ${legal("簽署方 Signer", row.signerName || (person ? person.name : own ? own.name : ""))}
          ${legal("代理 Agent", userName(state.currentUserId, lang === "en"))}
        </div>
      </section>
      ${isSigned ? signedConfirmation(row) : isExpired ? `<button class="btn full" data-nav="#/forms">${esc(t("backToApp"))}</button>` : signForm(row, person, own)}
    `, { public: true });
  }

  function signForm(row, person, own) {
    return `
      <form class="form-grid" data-form="sign" data-id="${esc(row.id)}">
        <section class="card form-grid">
          <div class="section-title">${esc(t("clientIdentity"))}</div>
          <div class="field">
            <label for="sign-name">${esc(t("fullName"))}</label>
            <input id="sign-name" name="name" value="${esc(row.signerName || (person ? person.name : own ? own.name : ""))}" required />
          </div>
          <div class="field">
            <label for="sign-hkid">${esc(t("hkid"))}</label>
            <input id="sign-hkid" name="hkid" value="A123456(7)" required />
          </div>
          <div class="grid-2">
            <div class="field">
              <label for="sign-phone">${esc(t("phone"))}</label>
              <input id="sign-phone" name="phone" value="${esc(person ? person.phone : own ? own.phone : "")}" required />
            </div>
            <div class="field">
              <label for="sign-address">${esc(t("address"))}</label>
              <input id="sign-address" name="address" value="${esc(own ? own.address : "")}" required />
            </div>
          </div>
        </section>
        <section class="card form-grid">
          <div class="section-title">${esc(t("signature"))}<span>${esc(lang === "zh" ? "手寫" : "Draw")}</span></div>
          <canvas class="signature-pad" id="signature-pad" width="760" height="360"></canvas>
          <div class="actions">
            <button class="btn" type="button" data-action="clear-signature">${esc(t("clear"))}</button>
            <button class="btn primary" type="submit">${esc(t("submitSignature"))}</button>
          </div>
        </section>
      </form>
    `;
  }

  function signedConfirmation(row) {
    return `
      <section class="card section">
        <h2 class="title-md">${esc(t("signedThanks"))}</h2>
        <p class="meta">${esc(row.signerName)} · ${esc(row.signedAt || "剛剛")}</p>
        <button class="btn primary full" data-nav="#/forms" style="margin-top: 14px">${esc(t("backToApp"))}</button>
      </section>
    `;
  }

  function notificationCard(item) {
    return `
      <button class="card tight" data-action="open-notification" data-id="${esc(item.id)}">
        <div class="row start">
          <div class="avatar">${esc(item.type.slice(0, 2).toUpperCase())}</div>
          <div class="grow">
            <div class="row between start">
              <h3 class="title-sm">${esc(item.title)}</h3>
              ${!item.read ? `<span class="chip bad">${esc(lang === "zh" ? "未讀" : "Unread")}</span>` : ""}
            </div>
            <div class="meta">${esc(item.body)}</div>
            <div class="meta" style="margin-top: 4px">${esc(item.createdAt)}</div>
          </div>
        </div>
      </button>
    `;
  }

  function renderNotifications() {
    const visible = state.notifications.filter((item) => item.recipientId === state.currentUserId);
    return shell(`
      ${pageHead(t("notifications"), t("notifications"))}
      <div class="stack">${visible.map(notificationCard).join("") || `<div class="empty">No notifications</div>`}</div>
    `);
  }

  function renderSettings() {
    return shell(`
      ${pageHead(t("settings"), t("settings"))}
      <section class="card">
        <div class="row between">
          <div>
            <h2 class="title-sm">${esc(t("language"))}</h2>
            <div class="meta">${esc(lang === "zh" ? "繁體中文為預設" : "Traditional Chinese default")}</div>
          </div>
          <button class="btn secondary" data-action="toggle-lang">${lang === "zh" ? "English" : "繁體中文"}</button>
        </div>
      </section>
      <section class="section card">
        <div class="section-title">${esc(t("telegram"))}<span>${currentUser().telegramLinked ? "Connected" : "Pending"}</span></div>
        <div class="legal-row"><strong>${esc(t("linkCode"))}</strong><span>AGT-${esc(currentUser().username.toUpperCase())}-4821</span></div>
        <button class="btn full" style="margin-top: 12px">${esc(lang === "zh" ? "更新連接碼" : "Refresh code")}</button>
      </section>
      <section class="section card">
        <div class="section-title">${esc(t("users"))}<span>${esc(t("admin"))}</span></div>
        <div class="stack">
          ${state.users.map((user) => `
            <div class="row">
              <div class="avatar">${esc(user.avatar)}</div>
              <div class="grow">
                <h3 class="title-sm">${esc(user.name)}</h3>
                <div class="meta">${esc(user.username)} · ${esc(user.role)}</div>
              </div>
              <button class="btn small">${esc(lang === "zh" ? "重設" : "Reset")}</button>
            </div>
          `).join("")}
        </div>
      </section>
      <section class="section stack">
        <button class="btn danger full" data-action="reset-demo">${esc(t("resetDemo"))}</button>
        <button class="btn full" data-action="logout">${esc(t("logout"))}</button>
      </section>
    `);
  }

  function timelinePanel(parentType, parentId) {
    const relatedViewingIds = parentType === "listing"
      ? state.viewings.filter((row) => row.listingId === parentId).map((row) => row.id)
      : state.viewings.filter((row) => row.customerId === parentId).map((row) => row.id);
    const items = state.comments.filter((row) =>
      (row.parentType === parentType && row.parentId === parentId) ||
      (row.parentType === "viewing" && relatedViewingIds.includes(row.parentId))
    );
    return `
      <section class="section card">
        <div class="section-title">${esc(t("timeline"))}<span>${items.length}</span></div>
        <div class="timeline">
          ${items.map((item) => {
            const author = state.users.find((user) => user.id === item.authorId);
            return `
              <div class="timeline-item">
                <div class="avatar">${esc(author ? author.avatar : "??")}</div>
                <div class="timeline-body">
                  <div class="row between">
                    <strong class="title-sm">${esc(author ? author.name : "System")}</strong>
                    <span class="meta">${esc(item.createdAt)}</span>
                  </div>
                  ${item.parentType === "viewing" ? `<span class="chip info" style="margin-top: 5px">from viewing</span>` : ""}
                  <div class="timeline-copy">${esc(item.body)}</div>
                </div>
              </div>
            `;
          }).join("") || `<div class="empty">No comments</div>`}
        </div>
        <form class="form-grid" data-form="comment" data-parent-type="${esc(parentType)}" data-parent-id="${esc(parentId)}" style="margin-top: 12px">
          <div class="field">
            <label for="comment-body">${esc(t("addComment"))}</label>
            <textarea id="comment-body" name="body" placeholder="${esc(t("commentPlaceholder"))}"></textarea>
          </div>
          <button class="btn primary full" type="submit">${esc(t("submitComment"))}</button>
        </form>
      </section>
    `;
  }

  function notFound() {
    return `<div class="empty">Screen not found</div>`;
  }

  function render() {
    const route = getRoute();
    const [section, action, id] = route.parts;
    if (!state.loggedIn && section !== "sign") {
      root.innerHTML = renderLogin();
      bindAfterRender();
      return;
    }

    let html = "";
    if (section === "login") html = renderLogin();
    else if (section === "dashboard" || !section) html = renderDashboard();
    else if (section === "listings") html = renderListings();
    else if (section === "listing" && action === "new") html = renderListingForm();
    else if (section === "listing" && action === "edit") html = renderListingForm(id);
    else if (section === "listing") html = renderListingDetail(action, route.params);
    else if (section === "customers") html = renderCustomers();
    else if (section === "customer" && action === "new") html = renderCustomerForm();
    else if (section === "customer" && action === "edit") html = renderCustomerForm(id);
    else if (section === "customer") html = renderCustomerDetail(action);
    else if (section === "matches" && !action) html = renderMatchesOverview();
    else if (section === "matches") html = renderMatches(action, id, route.params);
    else if (section === "viewing" && action === "new") html = renderViewingForm(route.params);
    else if (section === "viewing" && action === "day") html = renderViewingDay(id, route.parts[3]);
    else if (section === "viewings") html = renderViewings();
    else if (section === "forms" && action === "send") html = renderFormSend(id);
    else if (section === "forms") html = renderForms();
    else if (section === "sign") html = renderSign(action);
    else if (section === "notifications") html = renderNotifications();
    else if (section === "settings") html = renderSettings();
    else html = shell(notFound());

    root.innerHTML = html;
    bindAfterRender();
  }

  function bindAfterRender() {
    signatureCanvas = document.getElementById("signature-pad");
    if (signatureCanvas) setupSignature(signatureCanvas);
    setupDetailCarousel();
    setupScrollTopbar();
  }

  let topbarScrollCleanup = null;
  let topbarScrollAnimation = null;

  function setTopbarProgress(topbar, progress) {
    const next = Math.max(0, Math.min(1, progress));
    const base = topbar && topbar.querySelector("[data-topbar-base]");
    const context = topbar && topbar.querySelector("[data-topbar-context]");
    if (!base || !context) return;
    topbar.dataset.progress = String(next);
    base.style.transform = `translate3d(0, ${-115 * next}%, 0)`;
    base.style.opacity = String(1 - next);
    context.style.transform = `translate3d(0, ${115 * (1 - next)}%, 0)`;
    context.style.opacity = String(next);
  }

  function setTopbarInteractivity(topbar, collapsed) {
    const base = topbar && topbar.querySelector("[data-topbar-base]");
    const context = topbar && topbar.querySelector("[data-topbar-context]");
    if (!base || !context) return;
    base.setAttribute("aria-hidden", collapsed ? "true" : "false");
    context.setAttribute("aria-hidden", collapsed ? "false" : "true");
    if (collapsed) base.setAttribute("inert", "");
    else base.removeAttribute("inert");
  }

  function setTopbarCollapsed(topbar, collapsed, options = {}) {
    if (!topbar) return;
    const nextProgress = collapsed ? 1 : 0;
    const currentProgress = Number(topbar.dataset.progress || (topbar.dataset.collapsed === "true" ? 1 : 0));
    if (topbar.dataset.collapsed === String(collapsed) && Math.abs(currentProgress - nextProgress) < 0.01) return;
    topbar.dataset.collapsed = String(collapsed);
    topbar.classList.toggle("is-collapsed", collapsed);
    setTopbarInteractivity(topbar, collapsed);
    if (topbarScrollAnimation && typeof topbarScrollAnimation.cancel === "function") {
      topbarScrollAnimation.cancel();
      topbarScrollAnimation = null;
    }
    const animate = window.anime && window.anime.animate;
    if (options.animate === false || reducedMotion() || !animate) {
      setTopbarProgress(topbar, nextProgress);
      return;
    }
    const frame = { progress: currentProgress };
    topbarScrollAnimation = animate(frame, {
      progress: nextProgress,
      duration: 230,
      ease: "out(3)",
      onUpdate: () => setTopbarProgress(topbar, frame.progress),
      onComplete: () => {
        topbarScrollAnimation = null;
        setTopbarProgress(topbar, nextProgress);
      }
    });
  }

  function setupScrollTopbar() {
    if (topbarScrollCleanup) {
      topbarScrollCleanup();
      topbarScrollCleanup = null;
    }
    const topbar = root.querySelector("[data-scroll-topbar]");
    const main = root.querySelector(".phone > .main");
    if (!topbar || !main) return;
    let ticking = false;
    const expandAt = 12;
    const collapseAt = 32;
    setTopbarCollapsed(topbar, main.scrollTop >= collapseAt, { animate: false });
    const update = () => {
      const y = main.scrollTop;
      if (y <= expandAt) setTopbarCollapsed(topbar, false);
      else if (y >= collapseAt) setTopbarCollapsed(topbar, true);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    main.addEventListener("scroll", onScroll, { passive: true });
    topbarScrollCleanup = () => {
      main.removeEventListener("scroll", onScroll);
      if (topbarScrollAnimation && typeof topbarScrollAnimation.cancel === "function") {
        topbarScrollAnimation.cancel();
        topbarScrollAnimation = null;
      }
    };
  }

  function carouselNav(carousel) {
    const carouselId = carousel && carousel.dataset.carouselId;
    if (!carouselId) return null;
    return Array.from(root.querySelectorAll(".detail-tabs")).find((nav) => nav.dataset.carouselId === carouselId) || null;
  }

  function carouselById(carouselId) {
    if (!carouselId) return null;
    return Array.from(root.querySelectorAll(".detail-carousel")).find((carousel) => carousel.dataset.carouselId === carouselId) || null;
  }

  function syncActiveDetailTab(carouselOrOptions = {}, maybeOptions = {}) {
    const isCarousel = carouselOrOptions && carouselOrOptions.nodeType === 1 && carouselOrOptions.matches(".detail-carousel");
    if (!isCarousel) {
      const options = carouselOrOptions || {};
      root.querySelectorAll(".detail-carousel").forEach((carousel) => syncActiveDetailTab(carousel, options));
      return;
    }
    const carousel = carouselOrOptions;
    const options = maybeOptions || {};
    const nav = carouselNav(carousel);
    const active = nav && nav.querySelector(".tab-btn.active");
    if (!active) return;
    active.scrollIntoView({ block: "nearest", inline: "center" });
    requestAnimationFrame(() => animateDetailTabIndicator(active, options));
  }

  let detailIndicatorAnimation = null;

  function setDetailTabIndicator(indicator, x, width) {
    indicator.dataset.x = String(x);
    indicator.dataset.width = String(width);
    indicator.style.width = `${width}px`;
    indicator.style.transform = `translate3d(${x}px, 0, 0)`;
  }

  function animateDetailTabIndicator(active, options = {}) {
    const nav = active && active.closest(".detail-tabs");
    const indicator = nav && nav.querySelector(".detail-tab-indicator");
    if (!indicator) return;
    const nextX = active.offsetLeft;
    const nextWidth = active.offsetWidth;
    const prevX = Number(indicator.dataset.x || nextX);
    const prevWidth = Number(indicator.dataset.width || nextWidth);
    const animate = window.anime && window.anime.animate;
    if (detailIndicatorAnimation && typeof detailIndicatorAnimation.cancel === "function") {
      detailIndicatorAnimation.cancel();
      detailIndicatorAnimation = null;
    }
    if (options.animate === false || reducedMotion() || !animate) {
      setDetailTabIndicator(indicator, nextX, nextWidth);
      indicator.style.scale = "1";
      return;
    }
    const frame = { x: prevX, width: prevWidth, scale: 0.98 };
    detailIndicatorAnimation = animate(frame, {
      x: nextX,
      width: nextWidth,
      scale: 1,
      duration: 240,
      ease: "out(3)",
      onUpdate: () => {
        setDetailTabIndicator(indicator, frame.x, frame.width);
        indicator.style.scale = String(frame.scale);
      },
      onComplete: () => {
        detailIndicatorAnimation = null;
        setDetailTabIndicator(indicator, nextX, nextWidth);
        indicator.style.scale = "1";
      }
    });
  }

  function detailTabs(carousel) {
    return (carousel && carousel.dataset.tabOrder || "").split(",").filter(Boolean);
  }

  function detailCarouselWidth(carousel) {
    return carousel ? carousel.getBoundingClientRect().width : 0;
  }

  function detailCarouselX(carousel, index) {
    return -(index * detailCarouselWidth(carousel));
  }

  function applyCarouselX(track, value) {
    if (!track) return;
    track.dataset.x = String(value);
    track.style.transform = `translate3d(${value}px, 0, 0)`;
  }

  function setupDetailCarousel() {
    root.querySelectorAll(".detail-carousel").forEach((carousel) => {
      const main = carousel.closest(".main");
      const tabs = carouselNav(carousel);
      if (main && tabs) {
        const minHeight = Math.max(320, main.clientHeight - tabs.offsetHeight - 12);
        carousel.style.setProperty("--detail-carousel-min-h", `${minHeight}px`);
      }
      const order = detailTabs(carousel);
      const requestedTab = carousel.dataset.activeTab || order[Number(carousel.dataset.activeIndex || 0)] || order[0];
      const activeIndex = Math.max(0, order.indexOf(requestedTab));
      const activeTab = order[activeIndex] || requestedTab;
      applyCarouselX(carousel.querySelector(".detail-carousel-track"), detailCarouselX(carousel, activeIndex));
      updateDetailSlideState(carousel, activeTab);
      syncActiveDetailTab(carousel, { animate: false });
    });
  }

  function updateDetailSlideState(carousel, activeTab) {
    if (!carousel || !activeTab) return;
    const tabs = detailTabs(carousel);
    const index = Math.max(0, tabs.indexOf(activeTab));
    activeTab = tabs[index] || activeTab;
    carousel.dataset.activeTab = activeTab;
    carousel.dataset.activeIndex = String(index);
    const nav = carouselNav(carousel);
    if (nav) nav.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === activeTab);
    });
    carousel.querySelectorAll(".detail-slide").forEach((slide) => {
      const active = slide.dataset.tabPanel === activeTab;
      slide.classList.toggle("active", active);
      slide.setAttribute("aria-hidden", active ? "false" : "true");
      if (active) slide.removeAttribute("inert");
      else slide.setAttribute("inert", "");
    });
  }

  function reducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function tabHash(listingId, tab) {
    return `#/listing/${listingId}?tab=${tab}`;
  }

  function updateHashWithoutRender(hash) {
    if (window.location.hash === hash) return;
    window.history.pushState(null, "", hash);
  }

  const detailTabAnimations = new WeakMap();

  function animateCarouselTo(carousel, targetIndex, options = {}) {
    const track = carousel && carousel.querySelector(".detail-carousel-track");
    const tabs = detailTabs(carousel);
    const targetTab = tabs[targetIndex];
    if (!carousel || !track || !targetTab) return;
    const currentIndex = Number(carousel.dataset.activeIndex || 0);
    const from = Number(track.dataset.x || detailCarouselX(carousel, currentIndex));
    const to = detailCarouselX(carousel, targetIndex);
    const distance = Math.abs(targetIndex - currentIndex);
    const listingId = carousel.dataset.listingId;
    updateDetailSlideState(carousel, targetTab);
    syncActiveDetailTab(carousel, { animate: true });
    const currentAnimation = detailTabAnimations.get(carousel);
    if (currentAnimation && typeof currentAnimation.cancel === "function") {
      currentAnimation.cancel();
      detailTabAnimations.delete(carousel);
    }
    const commit = () => {
      applyCarouselX(track, to);
      const stateKey = carousel.dataset.stateKey;
      if (stateKey && Object.prototype.hasOwnProperty.call(state, stateKey)) {
        state[stateKey] = targetTab;
        saveState();
      }
      if (options.commitUrl && listingId) updateHashWithoutRender(tabHash(listingId, targetTab));
    };
    const animate = window.anime && window.anime.animate;
    if (!animate || reducedMotion() || Math.abs(to - from) < 1) {
      commit();
      return;
    }
    const frame = { x: from };
    const animation = animate(frame, {
      x: to,
      duration: Math.min(340, 220 + distance * 70),
      ease: "out(3)",
      onUpdate: () => applyCarouselX(track, frame.x),
      onComplete: () => {
        detailTabAnimations.delete(carousel);
        commit();
      }
    });
    detailTabAnimations.set(carousel, animation);
  }

  function switchListingTab(listingId, targetTab) {
    const carousel = carouselById("listing-" + listingId);
    if (!carousel || carousel.dataset.listingId !== listingId) {
      go(tabHash(listingId, targetTab));
      return;
    }
    const tabs = detailTabs(carousel);
    const targetIndex = tabs.indexOf(targetTab);
    if (targetIndex < 0) return;
    animateCarouselTo(carousel, targetIndex, { commitUrl: true });
  }

  function switchLocalTab(carouselId, targetTab) {
    const carousel = carouselById(carouselId);
    if (!carousel) return;
    const tabs = detailTabs(carousel);
    const targetIndex = tabs.indexOf(targetTab);
    if (targetIndex < 0) return;
    animateCarouselTo(carousel, targetIndex);
  }

  function setupSignature(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#16211f";
    signatureDirty = false;
    let drawing = false;

    function point(event) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) * (canvas.width / rect.width),
        y: (event.clientY - rect.top) * (canvas.height / rect.height)
      };
    }

    canvas.addEventListener("pointerdown", (event) => {
      drawing = true;
      signatureDirty = true;
      canvas.setPointerCapture(event.pointerId);
      const p = point(event);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    });
    canvas.addEventListener("pointermove", (event) => {
      if (!drawing) return;
      const p = point(event);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    });
    canvas.addEventListener("pointerup", () => {
      drawing = false;
    });
    canvas.addEventListener("pointercancel", () => {
      drawing = false;
    });
  }

  function clearSignature() {
    if (!signatureCanvas) return;
    const ctx = signatureCanvas.getContext("2d");
    ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
    signatureDirty = false;
  }

  function handleListingSubmit(formEl) {
    const data = new FormData(formEl);
    const id = formEl.dataset.id || "L-" + Math.floor(Date.now() / 1000);
    const existing = listing(id);
    const next = {
      ...(existing || {
        id,
        estate: "Lucky Plaza",
        floor: "中層",
        flat: "F",
        halls: 1,
        direction: "東南",
        age: 25,
        dealType: "lease",
        price: null,
        tenancy: "交吉",
        owningAgentId: state.currentUserId,
        keyConsent: true,
        flags: { haunted: false, op: true, clubhouse: false, bankValuation: true, managementCompany: "示範管理公司" },
        photos: ["front", "living", "floorplan"],
        updatedAt: "剛剛"
      }),
      address: data.get("address"),
      district: data.get("district"),
      status: data.get("status"),
      area: Number(data.get("area") || 0),
      rent: Number(data.get("rent") || 0),
      rooms: Number(data.get("rooms") || 0),
      schoolNet: data.get("schoolNet"),
      ownerId: data.get("ownerId"),
      floorPlan: data.get("floorPlan")
    };
    if (existing) {
      state.listings = state.listings.map((item) => item.id === id ? next : item);
      addToast(lang === "zh" ? "盤源已更新" : "Listing updated");
      go("#/listing/" + id);
    } else {
      state.listings.unshift(next);
      state.lastAddedListingId = id;
      const count = customersForListing(id).length;
      addNotification("match", `${next.address} ${lang === "zh" ? "配對" : "matched"} ${count}`, lang === "zh" ? "新盤已配對等待客戶。" : "New listing matched waiting customers.", "#/listing/" + id + "?tab=customers");
      saveState();
      go("#/listing/" + id + "?tab=customers");
    }
  }

  function handleViewingSubmit(formEl, submitter) {
    const data = new FormData(formEl);
    const customerId = data.get("customerId");
    const listingId = data.get("listingId");
    const item = listing(listingId);
    const person = customer(customerId);
    const date = data.get("date") || DEMO_NOW.date;
    const time = data.get("time") || "14:00";
    const addAnother = Boolean(submitter && submitter.name === "addAnother");
    const next = {
      id: "V-" + Date.now().toString().slice(-5),
      listingId,
      customerId,
      agentId: state.currentUserId,
      datetime: `${date}T${time}:00+08:00`,
      status: "scheduled",
      keyLocation: data.get("keyLocation") || (item && !item.keyConsent ? "owner" : "office"),
      formReady: data.get("formReady") === "on",
      outcome: String(data.get("outcome") || "").trim()
    };
    state.viewings.unshift(next);
    state.viewingDraft = null;
    addNotification("viewing", lang === "zh" ? "睇樓已安排" : "Viewing arranged", `${person ? person.name : ""} · ${item ? item.address : ""} · ${time}`, `#/viewing/day/${customerId}/${date}`);
    saveState();
    addToast(lang === "zh" ? "睇樓已加入行程" : "Viewing added to itinerary");
    if (addAnother) go(`#/viewing/new?customer=${customerId}&date=${date}`);
    else go(`#/viewing/day/${customerId}/${date}`);
  }

  function handleCustomerSubmit(formEl) {
    const data = new FormData(formEl);
    const id = formEl.dataset.id || "C-" + Math.floor(Date.now() / 1000);
    const existing = customer(id);
    const next = {
      ...(existing || { id, email: "new-customer@example.hk", status: "active", owningAgentId: state.currentUserId }),
      name: data.get("name"),
      phone: data.get("phone"),
      requirement: {
        dealType: "lease",
        budgetMin: 15000,
        budgetMax: Number(data.get("budgetMax") || 0),
        districts: String(data.get("districts") || "").split(",").map((part) => part.trim()).filter(Boolean),
        areaMin: Number(data.get("areaMin") || 0),
        areaMax: 680,
        rooms: Number(data.get("rooms") || 0),
        mustHaves: String(data.get("mustHaves") || "").split(",").map((part) => part.trim()).filter(Boolean)
      }
    };
    if (existing) state.customers = state.customers.map((item) => item.id === id ? next : item);
    else state.customers.unshift(next);
    saveState();
    go("#/customer/" + id);
  }

  function sendViewingPaper(listingId, customerId) {
    const item = listing(listingId);
    const person = customer(customerId);
    const newForm = {
      id: "F-6" + Date.now().toString().slice(-5),
      type: "Form 6 睇樓紙",
      recordType: "viewing",
      listingId,
      customerId,
      ownerId: null,
      status: "sent",
      link: "",
      expiresAt: "",
      signedAt: "",
      signerName: person ? person.name : ""
    };
    state.forms.unshift(newForm);
    addNotification("form", lang === "zh" ? "睇樓紙已建立" : "Form 6 created", `${person ? person.name : ""} · ${item ? item.address : ""}`, "#/forms/send/" + newForm.id);
    saveState();
    go("#/forms/send/" + newForm.id);
  }

  function sendForm5(listingId) {
    let row = state.forms.find((item) => item.type.includes("Form 5") && item.listingId === listingId);
    if (!row) {
      const item = listing(listingId);
      row = {
        id: "F-5" + Date.now().toString().slice(-5),
        type: "Form 5 放盤紙",
        recordType: "listing",
        listingId,
        customerId: null,
        ownerId: item ? item.ownerId : null,
        status: "draft",
        link: "",
        expiresAt: "",
        signedAt: "",
        signerName: ""
      };
      state.forms.unshift(row);
    }
    saveState();
    go("#/forms/send/" + row.id);
  }

  function generateFormLink(formId) {
    const row = form(formId);
    if (!row) return;
    row.status = "sent";
    row.link = "#/sign/" + row.id;
    row.expiresAt = "2026-06-19 18:00";
    if (!row.signerName) {
      const own = owner(row.ownerId);
      const person = customer(row.customerId);
      row.signerName = person ? person.name : own ? own.name : "";
    }
    addNotification("form", lang === "zh" ? "表格連結已產生" : "Form link generated", row.type, "#/forms/send/" + row.id);
    saveState();
    addToast(lang === "zh" ? "簽署連結已產生" : "Signing link generated");
  }

  function copyFormLink(formId) {
    const row = form(formId);
    if (!row || !row.link) {
      addToast(lang === "zh" ? "請先產生連結" : "Generate a link first");
      return;
    }
    const value = location.origin + location.pathname + row.link;
    if (navigator.clipboard) navigator.clipboard.writeText(value).catch(() => {});
    addToast(lang === "zh" ? "連結已複製" : "Link copied");
  }

  function submitComment(formEl) {
    const body = new FormData(formEl).get("body");
    if (!String(body).trim()) return;
    const mentions = String(body).includes("@另一位代理") ? ["U-3"] : [];
    state.comments.push({
      id: "M-" + Date.now(),
      authorId: state.currentUserId,
      body,
      createdAt: "剛剛",
      parentType: formEl.dataset.parentType,
      parentId: formEl.dataset.parentId,
      mentions
    });
    if (mentions.length) {
      addNotification("@mention", "@另一位代理", body, "#/listing/" + formEl.dataset.parentId, "U-3");
      addNotification("@mention", lang === "zh" ? "你提及了另一位代理" : "Mention notification sent", body, "#/listing/" + formEl.dataset.parentId);
    }
    saveState();
    addToast(mentions.length ? (lang === "zh" ? "@提及通知已送出" : "Mention notification sent") : (lang === "zh" ? "留言已新增" : "Comment added"));
  }

  function submitSignature(formEl) {
    if (!signatureDirty) {
      addToast(lang === "zh" ? "請先簽名" : "Please sign first");
      return;
    }
    const row = form(formEl.dataset.id);
    if (!row) return;
    const data = new FormData(formEl);
    row.status = "signed";
    row.signerName = data.get("name");
    row.signedAt = "剛剛";
    addNotification("form", lang === "zh" ? `${row.type} 已簽妥` : `${row.type} signed`, row.signerName, "#/forms/send/" + row.id);
    saveState();
    render();
  }

  function isSwipeControl(target) {
    return Boolean(target.closest("input, select, label, canvas, .detail-tabs"));
  }

  let detailSwipe = null;
  let textareaSwipe = null;
  let suppressNextCarouselClick = false;

  function suppressCarouselClick() {
    suppressNextCarouselClick = true;
    window.setTimeout(() => {
      suppressNextCarouselClick = false;
    }, 180);
  }

  function finishDetailSwipe(carousel, track, index, startX, startY, endX, endY, locked) {
    if (!carousel.isConnected || !track) return;
    carousel.classList.remove("dragging");
    if (locked) suppressCarouselClick();
    const order = detailTabs(carousel);
    if (order.length < 2) return;
    const dx = endX - startX;
    const dy = endY - startY;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    const minSwipe = Math.min(96, Math.max(64, carousel.clientWidth * 0.20));
    let target = index;
    if (absX >= minSwipe && absX >= absY * 1.35) {
      target = dx < 0 ? index + 1 : index - 1;
    }
    target = Math.max(0, Math.min(order.length - 1, target));
    animateCarouselTo(carousel, target, { commitUrl: target !== index });
  }

  document.addEventListener("pointerdown", (event) => {
    const carousel = event.target.closest(".detail-carousel");
    if (!carousel || isSwipeControl(event.target)) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (event.pointerType === "touch" && event.target.closest("textarea")) return;
    const track = carousel.querySelector(".detail-carousel-track");
    const index = Number(carousel.dataset.activeIndex || 0);
    const editable = event.target.closest("textarea");
    if (editable && editable.setPointerCapture) {
      try {
        editable.setPointerCapture(event.pointerId);
      } catch (_) {}
    }
    detailSwipe = {
      carousel,
      track,
      index,
      baseX: Number(track && track.dataset.x || detailCarouselX(carousel, index)),
      x: event.clientX,
      y: event.clientY,
      editable,
      locked: false
    };
  });

  document.addEventListener("pointermove", (event) => {
    if (!detailSwipe) return;
    const { carousel, track, index, baseX, x, y } = detailSwipe;
    if (!carousel.isConnected || !track) {
      detailSwipe = null;
      return;
    }
    const dx = event.clientX - x;
    const dy = event.clientY - y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    if (!detailSwipe.locked) {
      if (absY > 12 && absY > absX * 1.2) {
        if (detailSwipe.editable && detailSwipe.editable.releasePointerCapture) {
          try {
            detailSwipe.editable.releasePointerCapture(event.pointerId);
          } catch (_) {}
        }
        detailSwipe = null;
        return;
      }
      if (absX < 8 || absX < absY * 1.15) return;
      detailSwipe.locked = true;
      if (detailSwipe.editable) detailSwipe.editable.blur();
      carousel.classList.add("dragging");
    }
    event.preventDefault();
    const order = detailTabs(carousel);
    let dragX = dx;
    if ((index === 0 && dx > 0) || (index === order.length - 1 && dx < 0)) {
      dragX = dx * 0.32;
    }
    applyCarouselX(track, baseX + dragX);
  });

  document.addEventListener("pointerup", (event) => {
    if (!detailSwipe) return;
    const { carousel, track, index, x, y, locked, editable } = detailSwipe;
    detailSwipe = null;
    if (editable && editable.releasePointerCapture) {
      try {
        editable.releasePointerCapture(event.pointerId);
      } catch (_) {}
    }
    finishDetailSwipe(carousel, track, index, x, y, event.clientX, event.clientY, locked);
  });

  document.addEventListener("pointercancel", (event) => {
    if (detailSwipe && detailSwipe.carousel) {
      detailSwipe.carousel.classList.remove("dragging");
      if (detailSwipe.editable && detailSwipe.editable.releasePointerCapture) {
        try {
          detailSwipe.editable.releasePointerCapture(event.pointerId);
        } catch (_) {}
      }
      animateCarouselTo(detailSwipe.carousel, detailSwipe.index);
    }
    detailSwipe = null;
  });

  document.addEventListener("touchstart", (event) => {
    if (event.touches.length !== 1) return;
    const editable = event.target.closest(".detail-carousel textarea");
    if (!editable) return;
    const carousel = editable.closest(".detail-carousel");
    const track = carousel && carousel.querySelector(".detail-carousel-track");
    if (!carousel || !track) return;
    const touch = event.touches[0];
    const index = Number(carousel.dataset.activeIndex || 0);
    textareaSwipe = {
      carousel,
      track,
      index,
      baseX: Number(track.dataset.x || detailCarouselX(carousel, index)),
      x: touch.clientX,
      y: touch.clientY,
      editable,
      locked: false
    };
  }, { passive: true });

  document.addEventListener("touchmove", (event) => {
    if (!textareaSwipe) return;
    if (event.touches.length !== 1) {
      textareaSwipe = null;
      return;
    }
    const { carousel, track, index, baseX, x, y, editable } = textareaSwipe;
    if (!carousel.isConnected || !track) {
      textareaSwipe = null;
      return;
    }
    const touch = event.touches[0];
    const dx = touch.clientX - x;
    const dy = touch.clientY - y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    if (!textareaSwipe.locked) {
      if (absY > 12 && absY > absX * 1.2) {
        textareaSwipe = null;
        return;
      }
      if (absX < 8 || absX < absY * 1.15) return;
      textareaSwipe.locked = true;
      detailSwipe = null;
      editable.blur();
      carousel.classList.add("dragging");
    }
    event.preventDefault();
    const order = detailTabs(carousel);
    let dragX = dx;
    if ((index === 0 && dx > 0) || (index === order.length - 1 && dx < 0)) {
      dragX = dx * 0.32;
    }
    applyCarouselX(track, baseX + dragX);
  }, { passive: false });

  document.addEventListener("touchend", (event) => {
    if (!textareaSwipe) return;
    const { carousel, track, index, x, y, locked } = textareaSwipe;
    textareaSwipe = null;
    const touch = event.changedTouches[0] || { clientX: x, clientY: y };
    finishDetailSwipe(carousel, track, index, x, y, touch.clientX, touch.clientY, locked);
  });

  document.addEventListener("touchcancel", () => {
    if (textareaSwipe && textareaSwipe.carousel) {
      textareaSwipe.carousel.classList.remove("dragging");
      animateCarouselTo(textareaSwipe.carousel, textareaSwipe.index);
    }
    textareaSwipe = null;
  });

  document.addEventListener("click", (event) => {
    if (!suppressNextCarouselClick || !event.target.closest(".detail-carousel")) return;
    event.preventDefault();
    event.stopPropagation();
    suppressNextCarouselClick = false;
  }, true);

  // ---- photo viewer: swipe between images ----
  let pvSwipe = null;
  document.addEventListener("pointerdown", (event) => {
    if (!state.photoViewer) return;
    const viewport = event.target.closest(".pv-viewport");
    if (!viewport) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const track = viewport.querySelector(".pv-track");
    if (!track) return;
    pvSwipe = {
      viewport,
      track,
      width: viewport.getBoundingClientRect().width || 1,
      index: Math.max(0, Math.min(2, state.photoViewer.index || 0)),
      startX: event.clientX,
      startY: event.clientY,
      pointerId: event.pointerId,
      decided: false,
      locked: false
    };
  });

  document.addEventListener("pointermove", (event) => {
    if (!pvSwipe) return;
    const dx = event.clientX - pvSwipe.startX;
    const dy = event.clientY - pvSwipe.startY;
    if (!pvSwipe.decided) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      pvSwipe.decided = true;
      if (Math.abs(dx) <= Math.abs(dy)) { pvSwipe = null; return; }
      pvSwipe.locked = true;
      try { pvSwipe.viewport.setPointerCapture(pvSwipe.pointerId); } catch (e) {}
    }
    if (!pvSwipe.locked) return;
    let drag = dx;
    const atStart = pvSwipe.index === 0 && dx > 0;
    const atEnd = pvSwipe.index === 2 && dx < 0;
    if (atStart || atEnd) drag = dx * 0.32;
    const x = -pvSwipe.index * pvSwipe.width + drag;
    pvSwipe.track.style.transform = `translate3d(${x}px, 0, 0)`;
    pvSwipe.track.dataset.x = String(x);
  });

  function endPvSwipe(event, cancel) {
    if (!pvSwipe) return;
    const s = pvSwipe;
    pvSwipe = null;
    if (!s.locked) return;
    const dx = (event && typeof event.clientX === "number" ? event.clientX : s.startX) - s.startX;
    const threshold = Math.min(90, Math.max(46, s.width * 0.18));
    let target = s.index;
    if (!cancel) {
      if (dx <= -threshold && s.index < 2) target = s.index + 1;
      else if (dx >= threshold && s.index > 0) target = s.index - 1;
    }
    slidePhotoTo(target);
  }
  document.addEventListener("pointerup", (event) => endPvSwipe(event, false));
  document.addEventListener("pointercancel", (event) => endPvSwipe(event, true));

  document.addEventListener("click", (event) => {
    const nav = event.target.closest("[data-nav]");
    if (nav) {
      event.preventDefault();
      go(nav.dataset.nav);
      return;
    }
    const action = event.target.closest("[data-action]");
    if (!action) return;
    event.preventDefault();
    const type = action.dataset.action;
    if (type === "toggle-lang") {
      lang = lang === "zh" ? "en" : "zh";
      saveState();
      render();
    } else if (type === "set-listing-view") {
      state.listingView = action.dataset.view;
      saveState();
      render();
    } else if (type === "switch-detail-tab") {
      switchListingTab(action.dataset.listing, action.dataset.tab);
    } else if (type === "switch-local-tab") {
      switchLocalTab(action.dataset.carouselId, action.dataset.tab);
    } else if (type === "reset-listing-filters") {
      const keepSearch = (state.listingFilters && state.listingFilters.search) || "";
      state.listingFilters = { ...defaultListingFilters(), search: keepSearch };
      saveState();
      render();
    } else if (type === "quick-filter") {
      const field = action.dataset.field;
      const value = action.dataset.value;
      const next = { ...defaultListingFilters(), ...(state.listingFilters || {}) };
      if (field === "reset") {
        state.listingFilters = { ...defaultListingFilters(), search: next.search };
      } else {
        next[field] = next[field] === value ? "all" : value;
        state.listingFilters = next;
      }
      saveState();
      render();
    } else if (type === "clear-listing-search") {
      state.listingFilters = { ...defaultListingFilters(), ...(state.listingFilters || {}), search: "" };
      saveState();
      render();
    } else if (type === "send-viewing-paper") {
      sendViewingPaper(action.dataset.listing, action.dataset.customer);
    } else if (type === "arrange-viewing") {
      go("#/viewing/new?customer=" + (action.dataset.customer || "") + "&listing=" + (action.dataset.listing || ""));
    } else if (type === "set-viewings-tab") {
      state.viewingsTab = action.dataset.tab;
      saveState();
      render();
    } else if (type === "pick-day") {
      state.viewingDraft = { ...(state.viewingDraft || {}), date: action.dataset.date };
      saveState();
      render();
    } else if (type === "pick-day-list") {
      state.calendarDay = action.dataset.date;
      saveState();
      render();
    } else if (type === "pick-time") {
      state.viewingDraft = { ...(state.viewingDraft || {}), time: action.dataset.time };
      saveState();
      render();
    } else if (type === "cal-prev" || type === "cal-next") {
      state.calendarMonth = shiftMonth(action.dataset.month, type === "cal-next" ? 1 : -1);
      saveState();
      render();
    } else if (type === "open-photo") {
      openPhotoViewer(action.dataset.listing, Number(action.dataset.index) || 0);
    } else if (type === "close-photo") {
      closePhotoViewer(false);
    } else if (type === "photo-prev" || type === "photo-next") {
      if (state.photoViewer) {
        slidePhotoTo((state.photoViewer.index || 0) + (type === "photo-next" ? 1 : -1));
      }
    } else if (type === "send-form5") {
      sendForm5(action.dataset.listing);
    } else if (type === "generate-form-link") {
      generateFormLink(action.dataset.formId);
    } else if (type === "copy-form-link") {
      copyFormLink(action.dataset.formId);
    } else if (type === "clear-signature") {
      clearSignature();
    } else if (type === "open-notification") {
      const item = state.notifications.find((row) => row.id === action.dataset.id);
      if (item) {
        item.read = true;
        saveState();
        go(item.refLink);
      }
    } else if (type === "reset-demo") {
      localStorage.removeItem(STORAGE_KEY);
      state = fallbackState();
      saveState();
      go("#/dashboard");
      render();
    } else if (type === "logout") {
      state.loggedIn = false;
      saveState();
      go("#/login");
      render();
    }
  });

  document.addEventListener("submit", (event) => {
    const formEl = event.target;
    if (!formEl.matches("form")) return;
    event.preventDefault();
    if (formEl.dataset.form === "login") {
      state.loggedIn = true;
      saveState();
      go("#/dashboard");
    } else if (formEl.dataset.form === "listing") {
      handleListingSubmit(formEl);
    } else if (formEl.dataset.form === "listing-search") {
      const q = new FormData(formEl).get("q");
      state.listingFilters = { ...defaultListingFilters(), ...(state.listingFilters || {}), search: String(q || "").trim() };
      saveState();
      render();
    } else if (formEl.dataset.form === "listing-filters") {
      const data = new FormData(formEl);
      state.listingFilters = {
        search: (state.listingFilters && state.listingFilters.search) || "",
        district: data.get("district") || "all",
        status: data.get("status") || "all",
        rentMin: data.get("rentMin") || "all",
        rentMax: data.get("rentMax") || "all",
        areaMin: data.get("areaMin") || "all",
        areaMax: data.get("areaMax") || "all",
        rooms: data.get("rooms") || "all",
        floor: data.get("floor") || "all",
        direction: data.get("direction") || "all",
        schoolNet: data.get("schoolNet") || "all",
        tenancy: data.get("tenancy") || "all",
        ageMax: data.get("ageMax") || "all",
        keyConsent: data.get("keyConsent") || "all",
        clubhouse: data.get("clubhouse") || "all"
      };
      saveState();
      render();
    } else if (formEl.dataset.form === "customer") {
      handleCustomerSubmit(formEl);
    } else if (formEl.dataset.form === "viewing") {
      handleViewingSubmit(formEl, event.submitter);
    } else if (formEl.dataset.form === "comment") {
      submitComment(formEl);
    } else if (formEl.dataset.form === "sign") {
      submitSignature(formEl);
    }
  });

  function mirrorViewingField(el) {
    if (!el.name || !el.closest('[data-form="viewing"]')) return false;
    if (!state.viewingDraft) state.viewingDraft = {};
    const draft = state.viewingDraft;
    if (el.name === "customerId") draft.customerId = el.value;
    else if (el.name === "listingId") draft.listingId = el.value;
    else if (el.name === "keyLocation") draft.keyLocation = el.value;
    else if (el.name === "formReady") draft.formReady = el.value === "on";
    else if (el.name === "outcome") draft.outcome = el.value;
    else return false;
    return true;
  }

  document.addEventListener("input", (event) => {
    if (mirrorViewingField(event.target)) saveState();
  });

  document.addEventListener("change", (event) => {
    if (mirrorViewingField(event.target)) {
      saveState();
      return;
    }
    const sel = event.target.closest('[data-action="set-listing-sort"]');
    if (!sel) return;
    state.listingSort = sel.value;
    saveState();
    render();
  });

  let detailResizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(detailResizeTimer);
    detailResizeTimer = setTimeout(() => {
      setupDetailCarousel();
    }, 120);
  });

  window.addEventListener("hashchange", render);
  window.addEventListener("popstate", () => {
    // If the fullscreen viewer is open, a back navigation closes it instead of
    // leaving the current page.
    if (state.photoViewer) {
      closePhotoViewer(true);
      return;
    }
    render();
  });

  if (!window.location.hash) {
    window.location.hash = "#/dashboard";
  } else {
    render();
  }
})();
