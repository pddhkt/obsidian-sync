#!/usr/bin/env node
/* Imarflex carousel renderer.
 * AI text-free scene plate = background layer; this script draws the TEXT and
 * DIAGRAM layer with real fonts + inline SVG, then screenshots each final card
 * via headless Chromium. No npm deps — only Node builtins + system chromium.
 *
 *   node render.mjs            # render all FRAMES
 *   node render.mjs 03 06      # render only the given sequence ids
 *
 * Copy is data, not pixels. The sequence number lives ONLY in the file id /
 * filename — it is intentionally NOT drawn on the post. */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, "_proof");
mkdirSync(OUT, { recursive: true });
const tokens = readFileSync(resolve(HERE, "tokens.css"), "utf8");
const only = process.argv.slice(2).filter((a) => /^\d/.test(a)); // seq ids e.g. 03 06
const PREVIEW = process.env.PREVIEW === "1"; // render overlay on a placeholder, no AI plate

const dataUri = (p) =>
  "data:image/png;base64," + readFileSync(resolve(HERE, p)).toString("base64");

// --- Per-frame data. `seq` => filename only; never rendered on the card. -----
const FRAMES = [
  { seq: "01", id: "ifq22r-01-hook", scene: "_proof/ifq22r-01-scene.png",
    headline: "淨係涼一邊？", sub: "問題係空氣冇對流", plan: true },

  { seq: "02", id: "ifq22r-02-vs-fan", scene: "_proof/ifq22r-02-scene.png",
    headline: "唔係吹你，係吹空氣", sub: "風扇吹人、循環扇帶動全屋",
    labels: [{ t: "普通風扇", x: "26%" }, { t: "循環扇", x: "74%" }] },

  { seq: "03", id: "ifq22r-03-spec", scene: "_proof/ifq22r-03-scene.png",
    headline: "DC 馬達，慳電又靜", sub: "4 段風速、3 種風模式",
    chips: ["360° 對流", "左右擺頭", "7 小時定時", "遙控操作"] },

  { seq: "04", id: "ifq22r-04-360-uses", scene: "_proof/ifq22r-04-scene.png",
    headline: "360° 全方位對流", sub: "3 個用法，全屋都涼",
    legend: ["① 對住人吹", "② 向窗邊送風", "③ 配冷氣循環"] },

  { seq: "05", id: "ifq22r-05-detach", scene: "_proof/ifq22r-05-scene.png",
    headline: "前網罩快拆", sub: "拆得出，易抹乾淨" },

  { seq: "06", id: "ifq22r-06-cta", scene: "_proof/ifq22r-06-scene.png",
    headline: "IFQ-22R", latinHeadline: true, sub: "連遙控、2 年保養",
    buttons: [{ t: "立即選購", k: "primary" }, { t: "WhatsApp 查詢", k: "outline" }],
    chipsRow: ["DC 靜音", "360° 對流", "易拆清潔"] },
];

// --- inline SVG floor-plan that MATCHES the hook scene (sofa L, window R) ----
const planSvg = () => `
<svg viewBox="0 0 560 470" width="560" height="470" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ar" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto">
    <path d="M0,0 L6,3 L0,6 Z" fill="var(--heritage-blue)"/></marker></defs>
  <rect x="14" y="14" width="532" height="442" rx="22" fill="rgba(247,246,242,.94)"
        stroke="var(--heritage-blue)" stroke-width="5"/>
  <rect x="44" y="150" width="56" height="180" rx="14" fill="var(--steam-grey)"
        stroke="var(--heritage-blue)" stroke-width="3"/>
  <rect x="232" y="212" width="96" height="56" rx="10" fill="var(--clay-beige)"
        stroke="var(--heritage-blue)" stroke-width="3"/>
  <rect x="500" y="150" width="18" height="180" rx="6" fill="var(--cool-air)"/>
  <circle cx="120" cy="372" r="19" fill="var(--heritage-blue)"/>
  <path d="M150,360 C300,300 460,300 460,212 C460,140 250,150 168,196"
        stroke="var(--cool-air)" stroke-width="11" stroke-linecap="round"
        stroke-dasharray="2 26" fill="none" marker-end="url(#ar)"/>
</svg>`;

const underline = () => `<svg class="uline" viewBox="0 0 100 12" preserveAspectRatio="none"
  xmlns="http://www.w3.org/2000/svg"><path d="M1,8 C26,3 62,3 80,6 C88,7 95,7 99,4"
  stroke="var(--heritage-blue)" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`;

const extras = (f) => {
  if (f.chips) return `<div class="extras">${f.chips
    .map((c) => `<div class="chip"><span class="dot"></span>${c}</div>`).join("")}</div>`;
  if (f.legend) return `<div class="extras legend">${f.legend
    .map((l) => `<div>${l}</div>`).join("")}</div>`;
  if (f.buttons || f.chipsRow) return `<div class="extras">
    ${(f.buttons || []).map((b) => `<div class="btn ${b.k}">${b.t}</div>`).join("")}
    ${f.chipsRow ? `<div class="chiprow">${f.chipsRow
      .map((c) => `<div class="chip small"><span class="dot"></span>${c}</div>`).join("")}</div>` : ""}
  </div>`;
  return "";
};

const useReal = (f) => !PREVIEW && existsSync(resolve(HERE, f.scene));
const cardBg = (f) =>
  useReal(f) ? `#fff url('${dataUri(f.scene)}') center/cover no-repeat` : "var(--rice-white)";
const placeholder = `<div class="ph"><div class="ph-zone">AI 場景 plate<br>product photo</div></div>`;

const buildHtml = (f) => `<!doctype html><html><head><meta charset="utf-8"><style>
${tokens}
*{margin:0;box-sizing:border-box}
html,body{width:var(--card);height:var(--card)}
.card{position:relative;width:var(--card);height:var(--card);overflow:hidden;
  background:${cardBg(f)};font-kerning:normal}
.ph{position:absolute;inset:0;background:
  radial-gradient(120% 100% at 82% 22%, var(--cool-air) 0%, rgba(191,215,230,0) 46%),
  linear-gradient(180deg,#ffffff,var(--rice-white))}
.ph-zone{position:absolute;right:90px;top:50%;transform:translateY(-50%);width:52%;height:68%;
  border:6px dashed rgba(30,75,122,.22);border-radius:30px;display:flex;align-items:center;
  justify-content:center;text-align:center;font-family:var(--font-zh);font-weight:700;
  font-size:58px;color:rgba(30,75,122,.28);line-height:1.4}
.scrim{position:absolute;inset:0;background:
  linear-gradient(118deg, rgba(247,246,242,.82) 0%, rgba(247,246,242,.34) 34%, rgba(247,246,242,0) 56%),
  linear-gradient(180deg, rgba(247,246,242,.5) 0%, rgba(247,246,242,0) 22%)}
.tl{position:absolute;top:var(--margin);left:var(--margin);max-width:1180px}
.hl{display:inline-block}
.headline{font-family:var(--font-zh);font-weight:var(--w-bold);font-size:var(--fs-headline);
  line-height:var(--lh-zh);color:var(--soft-charcoal);letter-spacing:.01em}
.headline.latin{font-family:var(--font-latin);font-weight:800;font-size:240px;
  letter-spacing:-.02em;color:var(--heritage-blue);line-height:1}
.uline{display:block;width:100%;height:24px;margin:10px 0 22px}
.sub{font-family:var(--font-zh);font-weight:var(--w-medium);font-size:var(--fs-sub);color:var(--soft-charcoal);opacity:.92}
.extras{margin-top:46px;display:flex;flex-direction:column;gap:22px}
.chip{display:inline-flex;align-items:center;gap:16px;width:max-content;
  background:rgba(247,246,242,.92);border:3px solid var(--heritage-blue);border-radius:999px;
  padding:16px 34px;font-family:var(--font-zh);font-weight:var(--w-medium);font-size:var(--fs-chip);color:var(--soft-charcoal)}
.chip.small{padding:12px 26px;font-size:34px}
.chip .dot{width:16px;height:16px;border-radius:50%;background:var(--heritage-blue);flex:0 0 auto}
.chiprow{display:flex;gap:18px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;justify-content:center;width:max-content;border-radius:999px;
  padding:24px 54px;font-family:var(--font-zh);font-weight:var(--w-bold);font-size:var(--fs-button)}
.btn.primary{background:var(--heritage-blue);color:var(--rice-white)}
.btn.outline{background:rgba(247,246,242,.85);color:var(--heritage-blue);border:4px solid var(--heritage-blue)}
.legend{gap:18px}.legend div{font-family:var(--font-zh);font-weight:var(--w-medium);font-size:var(--fs-sub);color:var(--soft-charcoal)}
.label{position:absolute;bottom:130px;transform:translateX(-50%);font-family:var(--font-zh);font-weight:var(--w-bold);
  font-size:var(--fs-chip);color:var(--soft-charcoal);background:rgba(247,246,242,.92);
  border:3px solid var(--heritage-blue);border-radius:999px;padding:12px 36px}
.plan{position:absolute;right:var(--margin);bottom:var(--margin);filter:drop-shadow(0 18px 40px rgba(30,75,122,.20))}
</style></head><body>
<div class="card">
  ${useReal(f) ? "" : placeholder}
  <div class="scrim"></div>
  <div class="tl">
    <span class="hl"><div class="headline${f.latinHeadline ? " latin" : ""}">${f.headline}</div>${underline()}</span>
    <div class="sub">${f.sub}</div>
    ${extras(f)}
  </div>
  ${(f.labels || []).map((l) => `<div class="label" style="left:${l.x}">${l.t}</div>`).join("")}
  ${f.plan ? `<div class="plan">${planSvg()}</div>` : ""}
</div></body></html>`;

const chromiumBin = process.env.CHROMIUM || "chromium";
const targets = FRAMES.filter((f) => only.length === 0 || only.includes(f.seq));
const suffix = PREVIEW ? "-preview" : "-final";
for (const f of targets) {
  if (!PREVIEW && !existsSync(resolve(HERE, f.scene))) { console.log("skip (no plate yet):", f.id); continue; }
  const htmlPath = resolve(OUT, `${f.id}.html`);
  const pngPath = resolve(OUT, `${f.id}${suffix}.png`);
  writeFileSync(htmlPath, buildHtml(f));
  execFileSync(chromiumBin, [
    "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
    "--force-device-scale-factor=1", "--window-size=2048,2048",
    "--default-background-color=00000000", `--screenshot=${pngPath}`, `file://${htmlPath}`,
  ], { stdio: ["ignore", "ignore", "inherit"] });
  console.log("rendered", `${f.id}${suffix}.png`);
}
