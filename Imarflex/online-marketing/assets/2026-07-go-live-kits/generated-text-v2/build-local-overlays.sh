#!/usr/bin/env bash
set -euo pipefail

ROOT="online-marketing/assets/2026-07-go-live-kits"
SRC="$ROOT/generated"
OUT="$ROOT/generated-text-v2/exports"
FONT_REG="/usr/share/fonts/noto-cjk/NotoSansCJK-Regular.ttc"
FONT_BOLD="/usr/share/fonts/noto-cjk/NotoSansCJK-Bold.ttc"

mkdir -p "$OUT"

base_image() {
  local src="$1"
  local out="$2"
  local size="$3"
  magick "$src" -auto-orient -resize "${size}^" -gravity center -extent "$size" "$out"
}

overlay_top_two() {
  local src="$1"
  local out="$2"
  local size="$3"
  local box="$4"
  local title="$5"
  local sub="$6"
  local title_size="$7"
  local sub_size="$8"

  magick "$src" -auto-orient -resize "${size}^" -gravity center -extent "$size" \
    -gravity NorthWest \
    -fill "rgba(247,246,242,0.94)" -draw "roundrectangle 54,54 1026,${box} 26,26" \
    -font "$FONT_BOLD" -fill "#3C3F42" -pointsize "$title_size" -annotate +88+142 "$title" \
    -font "$FONT_REG" -fill "#1E4B7A" -pointsize "$sub_size" -annotate +88+214 "$sub" \
    "$out"
}

overlay_top_multi() {
  local src="$1"
  local out="$2"
  local size="$3"
  local box="$4"
  local text="$5"
  local text_size="$6"

  magick "$src" -auto-orient -resize "${size}^" -gravity center -extent "$size" \
    -gravity NorthWest \
    -fill "rgba(247,246,242,0.94)" -draw "roundrectangle 54,54 1026,${box} 26,26" \
    -font "$FONT_BOLD" -fill "#3C3F42" -pointsize "$text_size" -annotate +88+130 "$text" \
    "$out"
}

overlay_landscape_left() {
  local src="$1"
  local out="$2"
  local title="$3"
  local sub="$4"

  magick "$src" -auto-orient -resize "1200x628^" -gravity center -extent "1200x628" \
    -gravity NorthWest \
    -fill "rgba(247,246,242,0.94)" -draw "roundrectangle 54,54 650,270 26,26" \
    -font "$FONT_BOLD" -fill "#3C3F42" -pointsize 62 -annotate +88+140 "$title" \
    -font "$FONT_REG" -fill "#1E4B7A" -pointsize 38 -annotate +88+214 "$sub" \
    "$out"
}

overlay_top_two "$SRC/ifq22r-ig-frame1-hook.png" "$OUT/ifq22r-v2-ig-frame1-hook-local.png" "1080x1350" 300 "循環扇點揀?" "睇呢 3 個 icon 就夠" 68 40
overlay_top_two "$SRC/ifq22r-ig-frame2-vs-fan.png" "$OUT/ifq22r-v2-ig-frame2-vs-fan-local.png" "1080x1350" 300 "唔係吹你,係吹空氣" "風扇吹人 / 循環扇帶對流" 58 38
overlay_top_two "$SRC/ifq22r-ig-frame3-dc-quiet.png" "$OUT/ifq22r-v2-ig-frame3-dc-quiet-local.png" "1080x1350" 300 "DC 馬達" "相對 AC 更靜、更慳電" 72 42
overlay_top_two "$SRC/ifq22r-ig-frame4-omnidirectional.png" "$OUT/ifq22r-v2-ig-frame4-omnidirectional-local.png" "1080x1350" 300 "360° 全方位對流" "氣流去到房尾" 60 42
overlay_top_two "$SRC/ifq22r-ig-frame5-detach.png" "$OUT/ifq22r-v2-ig-frame5-detach-local.png" "1080x1350" 300 "一秒快拆" "扇網扇葉拆得出" 72 42
overlay_top_two "$SRC/ifq22r-ig-frame6-cta.png" "$OUT/ifq22r-v2-ig-frame6-cta-local.png" "1080x1350" 300 "IFQ-22R" "連遙控 + 2 年保養" 72 42
overlay_top_two "$SRC/ifq22r-fb-lifestyle.png" "$OUT/ifq22r-v2-fb-lifestyle-local.png" "1080x1350" 300 "淨係涼一邊?" "問題係空氣冇對流" 64 42
overlay_top_two "$SRC/ifq22r-story-detach.png" "$OUT/ifq22r-v2-story-detach-local.png" "1080x1920" 330 "IFQ-22R" "DC 靜音 + 全方位 + 全拆式" 76 42

overlay_top_two "$SRC/icf140r-ig-frame1-hook.png" "$OUT/icf140r-v2-ig-frame1-hook-local.png" "1080x1350" 300 "冷風機=平價冷氣?" "先搞清楚一件事" 58 42
overlay_top_two "$SRC/icf140r-ig-frame2-principle.png" "$OUT/icf140r-v2-ig-frame2-principle-local.png" "1080x1350" 300 "水蒸發 = 吹涼風" "注水 → 水簾 → 出風" 58 42
overlay_top_multi "$SRC/icf140r-ig-frame3-checklist.png" "$OUT/icf140r-v2-ig-frame3-checklist-local.png" "1080x1350" 430 "啱唔啱用?\n✓ 通風\n✓ 較乾爽\n✓ 局部\n× 追冷氣感" 44
overlay_top_multi "$SRC/icf140r-ig-frame4-range-spec.png" "$OUT/icf140r-v2-ig-frame4-range-spec-local.png" "1080x1350" 410 "真實降溫期望\n加水 4–6°C\n加冰 8–10°C\n視乎環境" 50
overlay_top_multi "$SRC/icf140r-ig-frame5-cta.png" "$OUT/icf140r-v2-ig-frame5-cta-local.png" "1080x1350" 390 "買得明白\n用得長久\n登記 2 年保養" 54
overlay_landscape_left "$SRC/icf140r-fb-hero.png" "$OUT/icf140r-v2-fb-hero-local.png" "冷風機≠冷氣" "局部降溫要通風"
overlay_top_two "$SRC/icf140r-story-9x16.png" "$OUT/icf140r-v2-story-9x16-local.png" "1080x1920" 330 "你以為冷風機=冷氣嗎?" "局部降溫,要通風" 58 42

montage "$OUT"/*-local.png -thumbnail 320x320 -background "#F7F6F2" -gravity center \
  -tile 3x -geometry 340x340+28+28 "$OUT/text-v2-local-contact-sheet.jpg"
