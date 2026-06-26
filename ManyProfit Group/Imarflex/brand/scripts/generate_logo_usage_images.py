#!/usr/bin/env python3
"""Compose deterministic logo-usage example PNGs from the real Imarflex logo files.

Also produces the deliverable master files the designer still owes:
  - imarflex-favicon.ico (16/32/48)
  - imarflex-logo-master.pdf (RGB, raster-embedded — NOT press-grade CMYK)
  - imarflex-symbol.svg / imarflex-symbol-mono-white.svg / imarflex-symbol-mono-black.svg
  - imarflex-wordmark.svg
  - imarflex-logo-master-color.svg / imarflex-logo-mono-white.svg / imarflex-logo-mono-black.svg

Outputs are written to brand/assets/visual-logo-usage/ so they stay grouped
with the note that references them.

⚠️ The SVGs are RASTER-EMBEDDED (PNG inside <image>). They scale and deploy on
the web, but are NOT a substitute for the designer's hand-drawn bezier vectors.
Once the designer ships true SVG masters, drop them into Brand Guideline/Logos/
and re-run this script — it will skip overwriting any SVG that already exists
as a true-vector master (detect: file does not start with the auto-generated
banner comment).

Run with:
    uv tool run --with pillow python3 generate_logo_usage_images.py
"""
from __future__ import annotations

import base64
import io
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

SCRIPT_DIR = Path(__file__).resolve().parent  # Imarflex/brand/scripts
BRAND_ROOT = SCRIPT_DIR.parent  # Imarflex/brand
OUT = BRAND_ROOT / "assets" / "visual-logo-usage"
IMARFLEX_ROOT = BRAND_ROOT.parent  # Imarflex
LOGOS = IMARFLEX_ROOT / "Brand Guideline" / "Logos"

MARK_SRC = LOGOS / "imarflex-mark.png"
WORDMARK_SRC = LOGOS / "imarflex-wordmark.png"

# Palette (from visual-color-palette.md)
RICE_WHITE = (247, 246, 242)
CLAY_BEIGE = (231, 215, 193)
HERITAGE_BLUE = (30, 75, 122)
STEAM_GREY = (220, 225, 230)
SOFT_CHARCOAL = (60, 63, 66)
COOL_AIR = (191, 215, 230)
DESTRUCTIVE_RED = (200, 50, 50)

FONT_REG = "/usr/share/fonts/noto/NotoSans-Regular.ttf"
FONT_BOLD = "/usr/share/fonts/noto/NotoSans-Bold.ttf"
FONT_CJK = "/usr/share/fonts/noto-cjk/NotoSansCJK-Regular.ttc"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def load_mark() -> Image.Image:
    return Image.open(MARK_SRC).convert("RGBA")


def load_wordmark() -> Image.Image:
    return Image.open(WORDMARK_SRC).convert("RGBA")


def recolor(src: Image.Image, color: tuple[int, int, int]) -> Image.Image:
    """Replace all opaque pixels with `color`, preserving alpha (for mono variants)."""
    alpha = src.split()[-1]
    out = Image.new("RGBA", src.size, color + (0,))
    out.putalpha(alpha)
    return out


def paste_centered(canvas: Image.Image, asset: Image.Image, cx: int, cy: int) -> None:
    x = cx - asset.width // 2
    y = cy - asset.height // 2
    canvas.alpha_composite(asset, (x, y))


def fit_to_height(asset: Image.Image, target_h: int) -> Image.Image:
    ratio = target_h / asset.height
    return asset.resize(
        (max(1, int(asset.width * ratio)), target_h), Image.LANCZOS
    )


def fit_to_width(asset: Image.Image, target_w: int) -> Image.Image:
    ratio = target_w / asset.width
    return asset.resize(
        (target_w, max(1, int(asset.height * ratio))), Image.LANCZOS
    )


def draw_label(
    canvas: Image.Image,
    text: str,
    xy: tuple[int, int],
    size: int = 22,
    color: tuple[int, int, int] = SOFT_CHARCOAL,
    bold: bool = False,
    cjk: bool = False,
    anchor: str = "lt",
) -> None:
    f_path = FONT_CJK if cjk else (FONT_BOLD if bold else FONT_REG)
    ImageDraw.Draw(canvas).text(xy, text, font=font(f_path, size), fill=color, anchor=anchor)


def panel(
    size: tuple[int, int],
    bg: tuple[int, int, int],
    border: tuple[int, int, int] | None = None,
) -> Image.Image:
    img = Image.new("RGBA", size, bg + (255,))
    if border:
        d = ImageDraw.Draw(img)
        d.rectangle([(0, 0), (size[0] - 1, size[1] - 1)], outline=border + (255,), width=2)
    return img


# ---------------------------------------------------------------------------
# 1. Variant grid: 6 panels (master color / mono-white / mono-black / wordmark / symbol / lockup)
# ---------------------------------------------------------------------------
def build_variant_grid() -> Image.Image:
    W, H = 1920, 1280
    canvas = Image.new("RGBA", (W, H), RICE_WHITE + (255,))
    draw_label(canvas, "Logo variants", (W // 2, 60), size=48, bold=True, anchor="mm")
    draw_label(
        canvas,
        "Master files — use these only. Never recreate.",
        (W // 2, 110),
        size=22,
        color=SOFT_CHARCOAL,
        anchor="mm",
    )

    cols, rows = 3, 2
    pad_x, pad_y = 80, 180
    gap = 40
    pw = (W - 2 * pad_x - (cols - 1) * gap) // cols
    ph = (H - pad_y - 100 - (rows - 1) * gap) // rows

    mark = load_mark()
    wm = load_wordmark()
    mono_white_mark = recolor(mark, (255, 255, 255))
    mono_black_mark = recolor(mark, SOFT_CHARCOAL)
    mono_white_wm = recolor(wm, (255, 255, 255))

    cells = [
        ("Master · color", RICE_WHITE, mark, "Use on Rice White / Clay Beige"),
        ("Mono · white", HERITAGE_BLUE, mono_white_mark, "Use on Heritage Blue / dark photo"),
        ("Mono · black", RICE_WHITE, mono_black_mark, "Use on light / single-color print"),
        ("Wordmark only", RICE_WHITE, wm, "Wide layouts (header, footer)"),
        ("Symbol only", RICE_WHITE, mark, "Favicon, app icon, social avatar"),
        ("Wordmark mono on blue", HERITAGE_BLUE, mono_white_wm, "Header on Heritage Blue"),
    ]

    for i, (title, bg, asset, sub) in enumerate(cells):
        r, c = i // cols, i % cols
        x = pad_x + c * (pw + gap)
        y = pad_y + r * (ph + gap)
        p = panel((pw, ph), bg, border=STEAM_GREY)
        # fit asset to ~50% of panel height
        target_h = int(ph * 0.46)
        a = fit_to_height(asset, target_h)
        # if too wide, refit to width
        if a.width > pw - 80:
            a = fit_to_width(asset, pw - 80)
        paste_centered(p, a, pw // 2, ph // 2 - 10)
        # title bar
        title_color = (255, 255, 255) if bg == HERITAGE_BLUE else SOFT_CHARCOAL
        draw_label(p, title, (24, 20), size=22, bold=True, color=title_color)
        draw_label(p, sub, (24, ph - 48), size=18, color=title_color)
        canvas.alpha_composite(p, (x, y))

    return canvas


# ---------------------------------------------------------------------------
# 2. Clear space diagram
# ---------------------------------------------------------------------------
def build_clear_space() -> Image.Image:
    W, H = 1600, 1100
    canvas = Image.new("RGBA", (W, H), RICE_WHITE + (255,))
    draw_label(canvas, "Clear space", (W // 2, 60), size=48, bold=True, anchor="mm")
    draw_label(
        canvas,
        "Reserve at least 1× the symbol's x-height of empty space on all four sides.",
        (W // 2, 110),
        size=22,
        anchor="mm",
    )

    mark = load_mark()
    target_h = 360
    m = fit_to_height(mark, target_h)
    # x-height ≈ half the mark for a circular target — use a quarter for safety
    x_unit = target_h // 4  # one "clear-space" unit

    cx, cy = W // 2, H // 2 + 30
    paste_centered(canvas, m, cx, cy)

    # bounding box of the logo
    lx0, ly0 = cx - m.width // 2, cy - m.height // 2
    lx1, ly1 = cx + m.width // 2, cy + m.height // 2

    # clear-space outer box
    ox0, oy0 = lx0 - x_unit, ly0 - x_unit
    ox1, oy1 = lx1 + x_unit, ly1 + x_unit

    d = ImageDraw.Draw(canvas)
    # dashed-ish border by drawing many short segments
    def dashed_rect(box, color, dash=12, gap=8, width=3):
        x0, y0, x1, y1 = box
        # top and bottom
        for x in range(x0, x1, dash + gap):
            d.line([(x, y0), (min(x + dash, x1), y0)], fill=color, width=width)
            d.line([(x, y1), (min(x + dash, x1), y1)], fill=color, width=width)
        for y in range(y0, y1, dash + gap):
            d.line([(x0, y), (x0, min(y + dash, y1))], fill=color, width=width)
            d.line([(x1, y), (x1, min(y + dash, y1))], fill=color, width=width)

    dashed_rect((ox0, oy0, ox1, oy1), HERITAGE_BLUE + (255,))
    # solid bounding box for logo (light)
    d.rectangle([(lx0, ly0), (lx1, ly1)], outline=STEAM_GREY + (255,), width=1)

    # x-unit measurement arrows on left side
    arrow_x = ox0 - 60
    d.line([(arrow_x, oy0), (arrow_x, ly0)], fill=SOFT_CHARCOAL + (255,), width=2)
    d.polygon([(arrow_x - 5, oy0 + 8), (arrow_x + 5, oy0 + 8), (arrow_x, oy0)], fill=SOFT_CHARCOAL + (255,))
    d.polygon([(arrow_x - 5, ly0 - 8), (arrow_x + 5, ly0 - 8), (arrow_x, ly0)], fill=SOFT_CHARCOAL + (255,))
    draw_label(canvas, "x", (arrow_x - 40, (oy0 + ly0) // 2), size=28, bold=True, anchor="mm")

    # x-unit on top
    arrow_y = oy0 - 60
    d.line([(ox0, arrow_y), (lx0, arrow_y)], fill=SOFT_CHARCOAL + (255,), width=2)
    d.polygon([(ox0 + 8, arrow_y - 5), (ox0 + 8, arrow_y + 5), (ox0, arrow_y)], fill=SOFT_CHARCOAL + (255,))
    d.polygon([(lx0 - 8, arrow_y - 5), (lx0 - 8, arrow_y + 5), (lx0, arrow_y)], fill=SOFT_CHARCOAL + (255,))
    draw_label(canvas, "x", ((ox0 + lx0) // 2, arrow_y - 32), size=28, bold=True, anchor="mm")

    draw_label(canvas, "Dashed line = minimum clear-space boundary.", (W // 2, H - 50), size=20, anchor="mm")

    return canvas


# ---------------------------------------------------------------------------
# 3. Minimum size chart
# ---------------------------------------------------------------------------
def build_min_size() -> Image.Image:
    W, H = 1800, 1100
    canvas = Image.new("RGBA", (W, H), RICE_WHITE + (255,))
    draw_label(canvas, "Minimum size", (W // 2, 60), size=48, bold=True, anchor="mm")
    draw_label(
        canvas,
        "Digital: 24px symbol height / 80px wordmark width. Below this, legibility breaks.",
        (W // 2, 110),
        size=22,
        anchor="mm",
    )

    mark = load_mark()
    wm = load_wordmark()

    # Symbol row at 24, 48, 80, 160
    symbol_sizes = [24, 48, 80, 160]
    row1_y = 280
    spacing = W // (len(symbol_sizes) + 1)
    for i, s in enumerate(symbol_sizes, start=1):
        cx = i * spacing
        m = fit_to_height(mark, s)
        paste_centered(canvas, m, cx, row1_y)
        label_color = SOFT_CHARCOAL
        if s == 24:
            draw_label(canvas, "NO — too small", (cx, row1_y + 60), size=18, color=DESTRUCTIVE_RED, bold=True, anchor="mm")
        elif s == 48:
            draw_label(canvas, "OK — favicon", (cx, row1_y + 60), size=18, color=SOFT_CHARCOAL, anchor="mm")
        elif s == 80:
            draw_label(canvas, "OK — navbar", (cx, row1_y + 60), size=18, anchor="mm")
        else:
            draw_label(canvas, "OK — hero / footer", (cx, row1_y + 60), size=18, anchor="mm")
        draw_label(canvas, f"{s}px", (cx, row1_y + 90), size=20, bold=True, anchor="mm")

    draw_label(canvas, "Symbol", (W // 2, row1_y - 110), size=28, bold=True, anchor="mm")

    # Wordmark row
    wm_sizes = [80, 160, 240, 360]
    row2_y = 750
    spacing2 = W // (len(wm_sizes) + 1)
    for i, w in enumerate(wm_sizes, start=1):
        cx = i * spacing2
        ww = fit_to_width(wm, w)
        paste_centered(canvas, ww, cx, row2_y)
        if w == 80:
            draw_label(canvas, "NO — below minimum", (cx, row2_y + 60), size=18, color=DESTRUCTIVE_RED, bold=True, anchor="mm")
        elif w == 160:
            draw_label(canvas, "OK — footer", (cx, row2_y + 60), size=18, anchor="mm")
        elif w == 240:
            draw_label(canvas, "OK — navbar", (cx, row2_y + 60), size=18, anchor="mm")
        else:
            draw_label(canvas, "OK — hero", (cx, row2_y + 60), size=18, anchor="mm")
        draw_label(canvas, f"{w}px wide", (cx, row2_y + 90), size=20, bold=True, anchor="mm")

    draw_label(canvas, "Wordmark", (W // 2, row2_y - 180), size=28, bold=True, anchor="mm")

    return canvas


# ---------------------------------------------------------------------------
# 4. Logo on backgrounds (palette compatibility)
# ---------------------------------------------------------------------------
def build_on_backgrounds() -> Image.Image:
    W, H = 1920, 1100
    canvas = Image.new("RGBA", (W, H), RICE_WHITE + (255,))
    draw_label(canvas, "Logo on backgrounds", (W // 2, 60), size=48, bold=True, anchor="mm")
    draw_label(
        canvas,
        "Approved background colors and the matching logo variant to use.",
        (W // 2, 110),
        size=22,
        anchor="mm",
    )

    mark = load_mark()
    mono_white = recolor(mark, (255, 255, 255))
    mono_black = recolor(mark, SOFT_CHARCOAL)

    cells = [
        ("Rice White", RICE_WHITE, mark, "OK — Primary surface"),
        ("Clay Beige", CLAY_BEIGE, mark, "OK — Warm surface"),
        ("Heritage Blue", HERITAGE_BLUE, mono_white, "OK — Use mono-white variant"),
        ("Soft Charcoal", SOFT_CHARCOAL, mono_white, "OK — Use mono-white variant"),
        ("Cool Air", COOL_AIR, mono_black, "OK — Use mono-black variant"),
        ("Destructive red", DESTRUCTIVE_RED, mark, "NEVER — conflicts with red dot"),
    ]

    cols, rows = 3, 2
    pad_x, pad_y = 80, 180
    gap = 40
    pw = (W - 2 * pad_x - (cols - 1) * gap) // cols
    ph = (H - pad_y - 80 - (rows - 1) * gap) // rows

    for i, (name, bg, asset, note) in enumerate(cells):
        r, c = i // cols, i % cols
        x = pad_x + c * (pw + gap)
        y = pad_y + r * (ph + gap)
        p = panel((pw, ph), bg, border=STEAM_GREY)
        a = fit_to_height(asset, int(ph * 0.5))
        if a.width > pw - 80:
            a = fit_to_width(asset, pw - 80)
        paste_centered(p, a, pw // 2, ph // 2 - 10)
        title_color = (255, 255, 255) if bg in (HERITAGE_BLUE, SOFT_CHARCOAL, DESTRUCTIVE_RED) else SOFT_CHARCOAL
        draw_label(p, name, (24, 20), size=22, bold=True, color=title_color)
        draw_label(p, note, (24, ph - 48), size=18, color=title_color)
        # Mark the bad one with a red strike
        if "Never" in note:
            d = ImageDraw.Draw(p)
            d.line([(40, 40), (pw - 40, ph - 40)], fill=(255, 50, 50, 220), width=8)
            d.line([(pw - 40, 40), (40, ph - 40)], fill=(255, 50, 50, 220), width=8)
        canvas.alpha_composite(p, (x, y))

    return canvas


# ---------------------------------------------------------------------------
# 5. Do / Don't grid
# ---------------------------------------------------------------------------
def build_do_dont() -> Image.Image:
    W, H = 1920, 1280
    canvas = Image.new("RGBA", (W, H), RICE_WHITE + (255,))
    draw_label(canvas, "Do / Don't", (W // 2, 60), size=48, bold=True, anchor="mm")
    draw_label(
        canvas,
        "Six common abuses. The master file is the master file — no transforms.",
        (W // 2, 110),
        size=22,
        anchor="mm",
    )

    mark = load_mark()

    cells = [
        ("DO — Correct", "Use the master as-is", mark, None),
        ("DON'T — Stretched", "Aspect ratio changed", None, "stretch"),
        ("DON'T — Skewed", "Rotated / sheared", None, "skew"),
        ("DON'T — Recolored", "Custom color applied", None, "recolor"),
        ("DON'T — Drop shadow", "Effects added", None, "shadow"),
        ("DON'T — On busy bg", "Low-contrast scene", None, "busy"),
    ]

    cols, rows = 3, 2
    pad_x, pad_y = 80, 180
    gap = 40
    pw = (W - 2 * pad_x - (cols - 1) * gap) // cols
    ph = (H - pad_y - 100 - (rows - 1) * gap) // rows

    target_h = int(ph * 0.5)

    for i, (title, sub, asset, mode) in enumerate(cells):
        r, c = i // cols, i % cols
        x = pad_x + c * (pw + gap)
        y = pad_y + r * (ph + gap)
        bg = RICE_WHITE
        if mode == "busy":
            # busy gradient background
            p = Image.new("RGBA", (pw, ph), (255, 255, 255, 255))
            for yy in range(ph):
                t = yy / ph
                rr = int(180 + 60 * t)
                gg = int(120 + 80 * (1 - t))
                bb = int(70 + 100 * t)
                ImageDraw.Draw(p).line([(0, yy), (pw, yy)], fill=(rr, gg, bb, 255))
        else:
            p = panel((pw, ph), bg, border=STEAM_GREY)

        m = fit_to_height(mark, target_h)

        if mode == "stretch":
            m = mark.resize((int(target_h * 2.1), target_h), Image.LANCZOS)
        elif mode == "skew":
            m = fit_to_height(mark, target_h)
            m = m.transform(
                m.size,
                Image.AFFINE,
                (1, 0.35, -int(target_h * 0.18), 0, 1, 0),
                resample=Image.BICUBIC,
            )
        elif mode == "recolor":
            m = recolor(fit_to_height(mark, target_h), (180, 80, 200))
        elif mode == "shadow":
            base = fit_to_height(mark, target_h)
            shadow_layer = Image.new("RGBA", (base.width + 30, base.height + 30), (0, 0, 0, 0))
            shadow = recolor(base, (0, 0, 0))
            # soften by repeated paste with reduced alpha
            for off in range(6):
                shadow_layer.alpha_composite(shadow, (15 + off, 15 + off))
            shadow_layer.putalpha(shadow_layer.split()[-1].point(lambda v: int(v * 0.35)))
            shadow_layer.alpha_composite(base, (10, 10))
            m = shadow_layer
        # busy and correct just use mark
        paste_centered(p, m, pw // 2, ph // 2 - 10)
        title_color = (255, 255, 255) if mode == "busy" else SOFT_CHARCOAL
        bad = title.startswith("DON'T")
        chip_color = DESTRUCTIVE_RED if bad else HERITAGE_BLUE
        # title pill — width based on text length
        d = ImageDraw.Draw(p)
        pill_w = 260
        d.rounded_rectangle([(20, 20), (20 + pill_w, 60)], radius=20, fill=chip_color + (255,))
        draw_label(p, title, (20 + pill_w // 2, 40), size=18, bold=True, color=(255, 255, 255), anchor="mm")
        draw_label(p, sub, (24, ph - 48), size=18, color=title_color)
        canvas.alpha_composite(p, (x, y))

    return canvas


# ---------------------------------------------------------------------------
# 6. Favicon / app-icon mockup
# ---------------------------------------------------------------------------
def build_favicon_mockup() -> Image.Image:
    W, H = 1600, 1000
    canvas = Image.new("RGBA", (W, H), RICE_WHITE + (255,))
    draw_label(canvas, "Favicon & app icon", (W // 2, 60), size=48, bold=True, anchor="mm")
    draw_label(
        canvas,
        "The symbol must remain readable at the smallest sizes.",
        (W // 2, 110),
        size=22,
        anchor="mm",
    )

    mark = load_mark()
    d = ImageDraw.Draw(canvas)

    # Browser tab mockup
    tab_x, tab_y = 120, 220
    tab_w, tab_h = 600, 80
    d.rounded_rectangle(
        [(tab_x, tab_y), (tab_x + tab_w, tab_y + tab_h)],
        radius=12,
        fill=(255, 255, 255, 255),
        outline=STEAM_GREY + (255,),
        width=2,
    )
    # url bar inside
    d.rounded_rectangle(
        [(tab_x + 80, tab_y + 22), (tab_x + tab_w - 30, tab_y + tab_h - 22)],
        radius=18,
        fill=STEAM_GREY + (255,),
    )
    favicon = fit_to_height(mark, 32)
    paste_centered(canvas, favicon, tab_x + 50, tab_y + tab_h // 2)
    draw_label(canvas, "imarflex.com.hk", (tab_x + 110, tab_y + tab_h // 2), size=22, color=SOFT_CHARCOAL, anchor="lm")
    draw_label(canvas, "Browser tab — 32px symbol", (tab_x, tab_y + tab_h + 30), size=20, bold=True)

    # iOS-style rounded app icons at multiple sizes
    icon_sizes = [(180, "iOS @1x · 180px"), (120, "iOS @2x · 120px"), (76, "iPad · 76px"), (40, "Notification · 40px")]
    base_x = 120
    base_y = 500
    cur_x = base_x
    for size, label in icon_sizes:
        # rounded square in Heritage Blue with mono-white symbol
        sq = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        sq_draw = ImageDraw.Draw(sq)
        radius = int(size * 0.22)
        sq_draw.rounded_rectangle([(0, 0), (size - 1, size - 1)], radius=radius, fill=HERITAGE_BLUE + (255,))
        inner = fit_to_height(recolor(mark, (255, 255, 255)), int(size * 0.65))
        paste_centered(sq, inner, size // 2, size // 2)
        canvas.alpha_composite(sq, (cur_x, base_y))
        draw_label(canvas, label, (cur_x + size // 2, base_y + size + 30), size=18, anchor="mm")
        cur_x += size + 60

    draw_label(canvas, "App icons use mono-white symbol on Heritage Blue.", (W // 2, H - 60), size=20, anchor="mm")

    return canvas


# ---------------------------------------------------------------------------
# Deliverable masters (favicon, PDF, raster-embedded SVGs)
# ---------------------------------------------------------------------------

AUTO_SVG_BANNER = (
    "<!-- AUTO-GENERATED raster-embedded SVG. NOT a true-vector master. "
    "Designer must ship a hand-drawn vector. -->"
)


def png_to_data_uri(img: Image.Image) -> str:
    buf = io.BytesIO()
    img.save(buf, "PNG", optimize=True)
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("ascii")


def raster_embedded_svg(img: Image.Image, title: str) -> str:
    w, h = img.size
    return (
        f"{AUTO_SVG_BANNER}\n"
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="0 0 {w} {h}" width="{w}" height="{h}" '
        f'role="img" aria-label="{title}">\n'
        f"  <title>{title}</title>\n"
        f'  <image href="{png_to_data_uri(img)}" width="{w}" height="{h}" />\n'
        f"</svg>\n"
    )


def write_svg(path: Path, img: Image.Image, title: str) -> None:
    if path.exists():
        head = path.read_text(errors="ignore")[:200]
        if AUTO_SVG_BANNER not in head:
            print(f"skip {path} (looks like a real vector master — leaving it alone)")
            return
    path.write_text(raster_embedded_svg(img, title))
    print(f"wrote {path} ({img.size[0]}x{img.size[1]}, raster-embedded)")


def build_master_lockup(mark: Image.Image, wm: Image.Image, mark_color: tuple[int, int, int] | None = None, wm_color: tuple[int, int, int] | None = None, bg: tuple[int, int, int] | None = None) -> Image.Image:
    """Horizontal lockup: mark | wordmark, with consistent baseline."""
    m = recolor(mark, mark_color) if mark_color else mark.copy()
    w = recolor(wm, wm_color) if wm_color else wm.copy()
    target_h = 600
    m = fit_to_height(m, target_h)
    w = fit_to_height(w, int(target_h * 0.78))  # wordmark slightly shorter
    gap = 80
    pad = 80
    canvas_w = m.width + gap + w.width + 2 * pad
    canvas_h = target_h + 2 * pad
    bg_rgba = (bg if bg else (255, 255, 255)) + (255 if bg else 0,)
    canvas = Image.new("RGBA", (canvas_w, canvas_h), bg_rgba)
    canvas.alpha_composite(m, (pad, pad))
    # vertically center wordmark against mark
    wy = pad + (target_h - w.height) // 2
    canvas.alpha_composite(w, (pad + m.width + gap, wy))
    return canvas


def build_favicon_ico(mark: Image.Image, out_path: Path) -> None:
    sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    icon = mark.copy()
    icon.save(out_path, format="ICO", sizes=sizes)
    print(f"wrote {out_path} (multi-size ICO: {', '.join(f'{s[0]}px' for s in sizes)})")


def build_print_pdf(mark: Image.Image, wm: Image.Image, out_path: Path) -> None:
    """A4 portrait, master lockup centered. RGB — not press-grade CMYK."""
    a4_w, a4_h = 2480, 3508  # 300 DPI A4
    page = Image.new("RGB", (a4_w, a4_h), (247, 246, 242))  # Rice White

    lockup = build_master_lockup(mark, wm)
    # fit lockup to 80% of page width
    target_w = int(a4_w * 0.75)
    if lockup.width > target_w:
        lockup = fit_to_width(lockup, target_w)
    page.paste(lockup, ((a4_w - lockup.width) // 2, (a4_h - lockup.height) // 2), lockup)

    # Footer text
    d = ImageDraw.Draw(page)
    f_small = font(FONT_REG, 36)
    d.text(
        (a4_w // 2, a4_h - 200),
        "Imarflex master logo — RGB raster-embedded PDF.",
        font=f_small,
        fill=SOFT_CHARCOAL,
        anchor="mm",
    )
    d.text(
        (a4_w // 2, a4_h - 150),
        "For press production, supply designer's vector PDF with CMYK ICC profile.",
        font=f_small,
        fill=SOFT_CHARCOAL,
        anchor="mm",
    )
    page.save(out_path, "PDF", resolution=300.0)
    print(f"wrote {out_path} (A4 300dpi RGB)")


def build_master_deliverables(mark: Image.Image, wm: Image.Image) -> None:
    # 1. Favicon ICO (uses Heritage Blue rounded square + mono-white symbol)
    icon_bg = 256
    favicon_canvas = Image.new("RGBA", (icon_bg, icon_bg), (0, 0, 0, 0))
    sq_draw = ImageDraw.Draw(favicon_canvas)
    sq_draw.rounded_rectangle(
        [(0, 0), (icon_bg - 1, icon_bg - 1)], radius=int(icon_bg * 0.22), fill=HERITAGE_BLUE + (255,)
    )
    inner = fit_to_height(recolor(mark, (255, 255, 255)), int(icon_bg * 0.65))
    paste_centered(favicon_canvas, inner, icon_bg // 2, icon_bg // 2)
    build_favicon_ico(favicon_canvas, OUT / "imarflex-favicon.ico")

    # 2. Print PDF
    build_print_pdf(mark, wm, OUT / "imarflex-logo-master.pdf")

    # 3. Symbol SVGs (color, mono-white, mono-black)
    write_svg(OUT / "imarflex-symbol.svg", mark, "Imarflex symbol")
    write_svg(
        OUT / "imarflex-symbol-mono-white.svg",
        recolor(mark, (255, 255, 255)),
        "Imarflex symbol — mono white",
    )
    write_svg(
        OUT / "imarflex-symbol-mono-black.svg",
        recolor(mark, SOFT_CHARCOAL),
        "Imarflex symbol — mono black",
    )

    # 4. Wordmark SVG
    write_svg(OUT / "imarflex-wordmark.svg", wm, "Imarflex wordmark")
    write_svg(
        OUT / "imarflex-wordmark-mono-white.svg",
        recolor(wm, (255, 255, 255)),
        "Imarflex wordmark — mono white",
    )

    # 5. Master lockup SVGs (mark + wordmark)
    write_svg(
        OUT / "imarflex-logo-master-color.svg",
        build_master_lockup(mark, wm),
        "Imarflex master logo — color lockup",
    )
    write_svg(
        OUT / "imarflex-logo-mono-white.svg",
        build_master_lockup(mark, wm, mark_color=(255, 255, 255), wm_color=(255, 255, 255)),
        "Imarflex master logo — mono white lockup",
    )
    write_svg(
        OUT / "imarflex-logo-mono-black.svg",
        build_master_lockup(mark, wm, mark_color=SOFT_CHARCOAL, wm_color=SOFT_CHARCOAL),
        "Imarflex master logo — mono black lockup",
    )


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    targets = [
        ("logo-usage-variant-grid.png", build_variant_grid),
        ("logo-usage-clear-space.png", build_clear_space),
        ("logo-usage-min-size.png", build_min_size),
        ("logo-usage-on-backgrounds.png", build_on_backgrounds),
        ("logo-usage-do-dont.png", build_do_dont),
        ("logo-usage-favicon-mockup.png", build_favicon_mockup),
    ]
    for name, fn in targets:
        img = fn()
        out_path = OUT / name
        img.convert("RGB").save(out_path, "PNG", optimize=True)
        print(f"wrote {out_path} ({img.size[0]}x{img.size[1]})")

    # Now the deliverable masters (favicon, PDF, raster-embedded SVGs)
    print("\n--- deliverable masters (designer-pending) ---")
    build_master_deliverables(load_mark(), load_wordmark())


if __name__ == "__main__":
    main()
