#!/usr/bin/env node
/*
 * Imarflex client-reply markdown → brand-styled HTML.
 *
 * Reads a `客戶報價問題回覆-YYYY-MM-DD.md` (or similar) markdown file, strips
 * YAML frontmatter, extracts `date:` and `re:` to populate the page header,
 * and writes a print-ready HTML wrapped in the Imarflex brand template
 * (Heritage Blue / Rice White / Clay Beige / Steam Grey).
 *
 * Pipe through chromium-headless to produce the PDF:
 *
 *   node md-to-pdf.js <input.md> <output.html>
 *   chromium --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
 *     --print-to-pdf=<output.pdf> file://<output.html>
 *
 * The PDF intentionally has no footer (per client preference, 2026-05-27).
 */

const fs = require('fs');

// `marked` is bundled inside @google/gemini-cli's node_modules. No install needed.
const markedPath = '/home/lmt/.npm-global/lib/node_modules/@google/gemini-cli/node_modules/marked';
const { marked } = require(markedPath);

const [,, inputPath, outputHtmlPath] = process.argv;
if (!inputPath || !outputHtmlPath) {
  console.error('Usage: node md-to-pdf.js <input.md> <output.html>');
  process.exit(1);
}

const raw = fs.readFileSync(inputPath, 'utf8');

// Pull frontmatter so we can drive title/meta from the doc itself.
const fm = {};
const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?/);
if (fmMatch) {
  for (const line of fmMatch[1].split('\n')) {
    const m = line.match(/^([a-zA-Z_-]+):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
}

const md = fmMatch ? raw.slice(fmMatch[0].length) : raw;
const date = fm.date || '';
const reLine = fm.re || '客戶報價問題跟進回覆';
const project = fm.project || 'Imarflex 伊瑪牌';

marked.setOptions({ gfm: true, breaks: false, headerIds: true, mangle: false });
const body = marked.parse(md);

const css = `
:root {
  --heritage-blue: #0F2E4C;
  --heritage-blue-2: #1B4068;
  --rice-white: #F7F4ED;
  --clay-beige: #E7DFC8;
  --steam-grey: #C9D3DA;
  --soft-charcoal: #2A2D31;
  --soft-charcoal-2: #5B6068;
  --soft-charcoal-3: #8B919A;
  --hairline: #D7D0BC;
}

@page { size: A4; margin: 22mm 20mm 22mm 20mm; }

* { box-sizing: border-box; }

html, body {
  margin: 0; padding: 0; background: #fff;
  color: var(--soft-charcoal);
  font-family: "Noto Sans CJK HK", "Noto Sans CJK TC", "Noto Sans CJK SC",
    "PingFang HK", "PingFang TC", "Helvetica Neue", Arial, sans-serif;
  font-size: 10.5pt; line-height: 1.65; font-weight: 400;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}

.page { max-width: 170mm; margin: 0 auto; padding: 0; }

.doc-header {
  border-bottom: 2px solid var(--heritage-blue);
  padding-bottom: 14px; margin-bottom: 22px;
}
.doc-header .brand {
  font-family: "Noto Serif CJK HK", "Noto Serif CJK TC", serif;
  font-size: 13pt; font-weight: 700; color: var(--heritage-blue);
  letter-spacing: 0.08em; margin-bottom: 4px;
}
.doc-header .meta {
  font-size: 8.5pt; color: var(--soft-charcoal-3); letter-spacing: 0.04em;
}

h1 {
  font-family: "Noto Serif CJK HK", "Noto Serif CJK TC", serif;
  font-size: 20pt; font-weight: 700; color: var(--heritage-blue);
  margin: 0 0 18px; line-height: 1.3;
}
h2 {
  font-family: "Noto Serif CJK HK", "Noto Serif CJK TC", serif;
  font-size: 14pt; font-weight: 700; color: var(--heritage-blue);
  margin: 32px 0 12px; padding: 8px 0 8px 14px;
  border-left: 4px solid var(--heritage-blue);
  background: var(--rice-white); page-break-after: avoid;
}
h3 { font-size: 11.5pt; font-weight: 700; color: var(--heritage-blue-2);
     margin: 22px 0 8px; page-break-after: avoid; }
h4 { font-size: 10.5pt; font-weight: 700; color: var(--soft-charcoal);
     margin: 18px 0 6px; page-break-after: avoid; }

p { margin: 0 0 10px; }
ul, ol { margin: 0 0 10px; padding-left: 22px; }
li { margin: 4px 0; }
li p { margin: 4px 0; }
li > ul, li > ol { margin: 4px 0; }

blockquote {
  margin: 14px 0; padding: 10px 14px;
  background: var(--rice-white);
  border-left: 3px solid var(--clay-beige);
  color: var(--soft-charcoal); font-size: 10pt;
  page-break-inside: avoid;
}
blockquote p { margin: 0 0 6px; }
blockquote p:last-child { margin: 0; }

table {
  border-collapse: collapse; width: 100%;
  margin: 12px 0 16px; font-size: 9.5pt;
  page-break-inside: avoid;
}
thead { background: var(--heritage-blue); color: #fff; }
th {
  text-align: left; padding: 8px 10px;
  font-weight: 700; font-size: 9pt; letter-spacing: 0.04em;
  border-right: 1px solid var(--heritage-blue-2);
}
th:last-child { border-right: none; }
td {
  padding: 7px 10px; border-bottom: 1px solid var(--hairline);
  vertical-align: top; color: var(--soft-charcoal);
}
tbody tr:nth-child(even) { background: #FAF8F2; }
tbody tr:last-child td { border-bottom: 1px solid var(--clay-beige); }

strong { color: var(--heritage-blue); font-weight: 700; }
em { font-style: italic; color: var(--soft-charcoal-2); }
a { color: var(--heritage-blue-2); text-decoration: none;
    border-bottom: 1px dotted var(--heritage-blue-2); }

code {
  background: var(--clay-beige); color: var(--heritage-blue);
  padding: 1px 5px; border-radius: 3px;
  font-family: "JetBrains Mono", "Source Code Pro", "Menlo", "Consolas", monospace;
  font-size: 9pt;
}
pre {
  background: var(--rice-white); border: 1px solid var(--hairline);
  border-radius: 4px; padding: 10px 12px;
  overflow-x: auto; font-size: 9pt;
}
pre code { background: transparent; padding: 0; color: var(--soft-charcoal); }

hr { border: none; border-top: 1px dashed var(--clay-beige); margin: 28px 0; }
`;

const html = `<!doctype html>
<html lang="zh-HK">
<head>
<meta charset="utf-8" />
<title>${project} — ${reLine} — ${date}</title>
<style>${css}</style>
</head>
<body>
<div class="page">
  <div class="doc-header">
    <div class="brand">IMARFLEX 伊瑪牌 · 網站重建項目</div>
    <div class="meta">${reLine}${date ? ' · ' + date : ''}</div>
  </div>
  ${body}
</div>
</body>
</html>`;

fs.writeFileSync(outputHtmlPath, html);
console.log('Wrote', outputHtmlPath);
