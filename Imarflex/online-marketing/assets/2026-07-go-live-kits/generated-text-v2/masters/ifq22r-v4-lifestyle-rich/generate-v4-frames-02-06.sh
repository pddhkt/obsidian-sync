#!/usr/bin/env bash
set -u
cd "/home/lmt/Projects/personal/obsidian-sync/Imarflex"
OUT="online-marketing/assets/2026-07-go-live-kits/generated-text-v2/masters/ifq22r-v4-lifestyle-rich"
REF="online-marketing/products/ifq-22r/images/source/IFQ-22R.png"

gen () { # $1=slug  $2=prompt
  higgsfield generate create gpt_image_2 --prompt "$2" --image "$REF" \
    --aspect_ratio 1:1 --resolution 2k --quality high --wait --json \
    > "/tmp/ifq_$1.json" 2>"/tmp/ifq_$1.err"
  echo "$1 EXIT=$?"
}

read -r -d '' P02 <<'EOF'
Use case: ads-marketing. Asset type: Imarflex IFQ-22R Instagram carousel Frame 02 (vs ordinary fan), square 1:1 master.

Reference image: use the attached IFQ-22R as exact product truth — a compact WHITE round-grille air circulator: white spiral grille, round wood-tone (oak) center cap, two vertical wood-tone (oak) support arms, rounded white oval base with touch buttons and dark IR slot, slim white remote.

Primary request: A clean, exciting explanatory social card contrasting an ordinary fan with the IFQ-22R circulator, set on a light airy home background, NOT on flat paper.

Exact text to render, in Traditional Chinese, and no other words:
- Large frame number: "02"
- Headline: "唔係吹你,係吹空氣"
- Sub-headline: "風扇吹人、循環扇帶動全屋"
- Left small label: "普通風扇"
- Right small label: "循環扇"

Composition: A split comparison on a bright Rice White and Steam Grey home background. LEFT: a simple ordinary table fan with one short straight Cool Air blue arrow blowing only at a small seated-person icon (limited reach). RIGHT: the real IFQ-22R with a long looping Cool Air blue airflow line circulating around the whole space (whole-room reach). Big Heritage Blue "02" upper-left, bold Traditional Chinese headline with a hand-drawn Heritage Blue underline, sub-headline smaller below. Put the small label "普通風扇" under the left fan and "循環扇" under the IFQ-22R. Clean, modern, high-contrast, saveable.

Palette: Heritage Blue #1E4B7A, Rice White #F7F6F2, Cool Air #BFD7E6, Steam Grey #DCE1E6, Clay Beige #E7D7C1, Soft Charcoal #3C3F42.

Product truth: the right-side fan is exactly the attached circulator; if blades visible exactly 3 broad white blades; the left fan is a generic ordinary table fan clearly different from it.

Avoid: wrong or misspelled Traditional Chinese, any text other than the listed text, extra English, fake model text, fake price, fake URL, fake QR code, fake spec numbers, the circulator looking like a pedestal or tower fan, 4 or 5 blades, distorted grille, flat paper-collage background, torn paper, masking tape, scrapbook style, dusty vintage tone, clutter.
EOF

read -r -d '' P03 <<'EOF'
Use case: ads-marketing. Asset type: Imarflex IFQ-22R Instagram carousel Frame 03 (feature/spec card), square 1:1 master.

Reference image: use the attached IFQ-22R as exact product truth — a compact WHITE round-grille air circulator: white spiral grille, round wood-tone (oak) center cap, two vertical wood-tone (oak) support arms, rounded white oval base with touch buttons and dark IR slot, slim white remote.

Primary request: A premium, INFORMATION-RICH feature card — the hero product in a calm bright home corner with four clean feature chips, summery and high-impact, NOT a flat paper background.

Exact text to render, in Traditional Chinese, and no other words:
- Large frame number: "03"
- Headline: "DC 馬達,慳電又靜"
- Sub-headline: "4 段風速、3 種風模式"
- Four short feature chips: "360° 對流" and "左右擺頭" and "7 小時定時" and "遙控操作"

Composition: The IFQ-22R as the hero on the right in a bright Hong Kong home corner with soft daylight, Rice White wall, a little greenery. On the left, big Heritage Blue "03", the bold Traditional Chinese headline with a hand-drawn Heritage Blue underline, sub-headline below. Arrange the four short feature chips as four small clean rounded pills, each with a tiny simple Heritage Blue line icon and its exact label, in a tidy vertical stack or 2x2 grid. A small Heritage Blue sound-wave icon near the motor hints at quietness. Clean, modern, saveable, info-rich but uncluttered.

Palette: Heritage Blue #1E4B7A, Rice White #F7F6F2, Cool Air #BFD7E6, Clay Beige #E7D7C1, Steam Grey #DCE1E6, Soft Charcoal #3C3F42.

Product truth: exactly the attached circulator; if blades visible exactly 3 broad white blades; round grille, oak center cap, twin oak support arms, rounded white base accurate.

Avoid: wrong or misspelled Traditional Chinese, any text other than the listed text, extra English, fake model text, fake decibel or wattage numbers, fake price, fake URL, fake QR code, pedestal fan, tower fan, generic fan, 4 or 5 blades, distorted grille, flat paper-collage background, torn paper, masking tape, scrapbook style, dusty vintage tone, clutter.
EOF

read -r -d '' P04 <<'EOF'
Use case: ads-marketing. Asset type: Imarflex IFQ-22R Instagram carousel Frame 04 (360 circulation + 3 ways to use), square 1:1 master.

Reference image: use the attached IFQ-22R as exact product truth — a compact WHITE round-grille air circulator: white spiral grille, round wood-tone (oak) center cap, two vertical wood-tone (oak) support arms, rounded white oval base, slim white remote.

Primary request: An exciting, educational isometric diagram card showing 3 everyday ways to use the circulator inside one home, with airflow reaching the far end of the room. This is the richest, most useful frame, like a saveable how-to. NOT a flat paper background.

Exact text to render, in Traditional Chinese, and no other words:
- Large frame number: "04"
- Headline: "360° 全方位對流"
- Sub-headline: "3 個用法,全屋都涼"
- Three numbered captions: "① 對住人吹" and "② 向窗邊送風" and "③ 配冷氣循環"

Composition: A clean light isometric cutaway of a compact Hong Kong apartment (living room, window, and a wall air-conditioner) on a Rice White background, drawn in a soft modern editorial illustration style, with Cool Air blue airflow arcs looping through the whole space. Show three small IFQ-22R circulators placed at three spots, each tagged with a Heritage Blue circled number ① ② ③ matching the three captions: ① aimed toward a seated person, ② aimed toward an open window, ③ near the wall aircon to spread cold air. Big Heritage Blue "04" upper-left, bold headline with hand-drawn Heritage Blue underline, sub-headline below, and the three captions listed clearly with their circled numbers. Clean, modern, informative, saveable.

Palette: Heritage Blue #1E4B7A, Rice White #F7F6F2, Cool Air #BFD7E6, Clay Beige #E7D7C1, Steam Grey #DCE1E6, Soft Charcoal #3C3F42.

Product truth: each circulator is the attached product (round white grille, oak center cap, twin oak support arms, rounded white base); keep them small but recognizable; no 4 or 5 blades if blades show.

Avoid: wrong or misspelled Traditional Chinese, any text other than the listed text, extra English, fake model text, fake spec numbers, fake price, fake URL, fake QR code, pedestal fan, tower fan, sealed-room aircon-replacement implication, flat paper-collage background, torn paper, masking tape, scrapbook style, dusty vintage tone, clutter.
EOF

read -r -d '' P05 <<'EOF'
Use case: ads-marketing. Asset type: Imarflex IFQ-22R Instagram carousel Frame 05 (front grille easy clean), square 1:1 master.

Reference image: use the attached IFQ-22R as exact product truth — a compact WHITE round-grille air circulator: white spiral grille, round wood-tone (oak) center cap, two vertical wood-tone (oak) support arms, rounded white oval base with touch buttons and dark IR slot, slim white remote.

Primary request: A clean, bright proof-style card showing the front grille pops off for easy cleaning, staged in a warm real home setting, NOT on flat paper.

Exact text to render, in Traditional Chinese, and no other words:
- Large frame number: "05"
- Headline: "前網罩快拆"
- Sub-headline: "拆得出,易抹乾淨"

Composition: On a bright Clay Beige and Rice White home tabletop in soft daylight, show the IFQ-22R with its round white front grille DETACHED and set to one side; the body keeps its twin oak support arms and rounded white base, and through the open front exactly 3 broad white fan blades are clearly visible. A folded Steam Grey microfibre cloth sits nearby as a cleaning cue. Thin Heritage Blue callout lines connect the detached grille and the open front. Big Heritage Blue "05" upper-left, bold Traditional Chinese headline with hand-drawn Heritage Blue underline, sub-headline below. Add two or three small simple circular Heritage Blue icon chips with no words for clean and easy and hygienic. Clean, modern, saveable.

Palette: Heritage Blue #1E4B7A, Rice White #F7F6F2, Cool Air #BFD7E6, Clay Beige #E7D7C1, Steam Grey #DCE1E6, Soft Charcoal #3C3F42.

Product truth: exactly the attached circulator; exactly 3 broad white PP blades visible through the open front, not 4, not 5; detached front grille is round white plastic with spiral ribs; twin oak support arms stay attached; rounded white base visible.

Avoid: wrong or misspelled Traditional Chinese, any text other than the listed text, extra English, fake model text, fake price, fake URL, fake QR code, broken or jagged parts, 4 or 5 blades, missing wood supports, pedestal fan, dirty alarmist repair scene, hand interaction, flat paper-collage background, torn paper, masking tape, scrapbook style, dusty vintage tone, clutter.
EOF

read -r -d '' P06 <<'EOF'
Use case: ads-marketing. Asset type: Imarflex IFQ-22R Instagram carousel Frame 06 (CTA), square 1:1 master.

Reference image: use the attached IFQ-22R as exact product truth — a compact WHITE round-grille air circulator: white spiral grille, round wood-tone (oak) center cap, two vertical wood-tone (oak) support arms, rounded white oval base with touch buttons and dark IR slot, slim white remote.

Primary request: A warm, premium closing CTA card in a bright lived-in home, with two clear call-to-action buttons and three small feature chips. Summery and inviting, NOT a flat paper background.

Exact text to render, in Traditional Chinese and the model code, and no other words:
- Large frame number: "06"
- Headline (model code): "IFQ-22R"
- Sub-headline: "連遙控、2 年保養"
- Two button labels: "立即選購" and "WhatsApp 查詢"
- Three small feature chips: "DC 靜音" and "360° 對流" and "易拆清潔"

Composition: The IFQ-22R fully assembled as a warm hero in a bright Hong Kong home corner with soft golden daylight, Rice White wall, Clay Beige accents, slim white remote in front. Big Heritage Blue "06" upper-left; "IFQ-22R" set large and bold; "連遙控、2 年保養" smaller beneath with a hand-drawn Heritage Blue underline. Place two clean rounded CTA buttons: a solid Heritage Blue button reading "立即選購" and an outline button reading "WhatsApp 查詢". Add three small rounded feature chips with tiny Heritage Blue line icons reading "DC 靜音", "360° 對流", "易拆清潔". Clean, modern, premium, saveable.

Palette: Heritage Blue #1E4B7A, Rice White #F7F6F2, Cool Air #BFD7E6, Clay Beige #E7D7C1, Steam Grey #DCE1E6, Soft Charcoal #3C3F42.

Product truth: exactly the attached circulator; if blades visible exactly 3 broad white blades; round grille, oak center cap, twin oak support arms, rounded white base accurate.

Avoid: wrong or misspelled Traditional Chinese, any text other than the listed text, extra English, fake price numbers, fake URL, fake QR code, fake logo badge, real phone number, pedestal fan, tower fan, generic fan, 4 or 5 blades, distorted grille, flat paper-collage background, torn paper, masking tape, scrapbook style, dusty vintage tone, clutter, Western family staging.
EOF

gen 02-vs-fan "$P02" &
gen 03-spec "$P03" &
gen 04-360-uses "$P04" &
gen 05-detach "$P05" &
gen 06-cta "$P06" &
wait
echo "ALL DONE"
