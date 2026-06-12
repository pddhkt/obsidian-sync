# Product Reference Pack Workflow

Use this reference when product shape fidelity matters or when the user asks what client images to gather.

## Source Image Audit

Before prompt writing, inspect the product source folder:

```text
online-marketing/products/<sku>/images/source/
```

Classify every useful source image:

| Type | What To Check |
|---|---|
| Front hero | front grille/body, controls, main silhouette |
| Side angle | side thickness, yoke/bracket, support arms, rear depth |
| Rear angle | rear grille, vents, handle, wheels, rear casing |
| Top/control close-up | buttons, display, top panel, touch icons |
| Base/wheels/feet | ground contact, base shape, caster/wheel details |
| Remote/accessory | color, shape, button layout |
| Detachable/open parts | removed panels, grille, filter, tank, exposed blade/interior |
| Product in use | scale, room context, human interaction, cable/clearance |
| Spec/POP card | confirmed copy, price, feature claims, warranty |

Report what is available and what is missing. Do not ask the user for images that already exist locally unless the visible angle is unclear.

## Client Asset Request Checklist

Ask the client for the smallest useful set, not a vague "more photos":

- White-background front 3/4 hero image.
- Left and right side angles.
- Rear angle.
- Top/control panel close-up.
- Base/wheels/feet close-up.
- Remote and accessories.
- Detachable parts separated from the main body.
- Open/interior view when a cleaning, filter, tank, blade, or detach frame is planned.
- One in-use/lifestyle angle for scale and placement.
- Official dimension/spec card and allowed/forbidden claims.

If the client can provide only one extra image, request the angle most needed by the next frame.

## Scene-To-Reference Matrix

For every carousel frame, create a quick matrix before generation:

| Field | Meaning |
|---|---|
| Frame | slug or frame number |
| Message | exact content purpose, not full prompt |
| Required view | front, side, rear, top, open/interior, detached, in-use |
| Required parts | product body, remote, grille, blade, filter, tank, wheel, control panel |
| Available references | local source image names or note links |
| Missing references | exact images to request from client |
| Product-drift risk | low / medium / high |
| Safer composition | fallback angle if references are missing |

Use this matrix to decide whether to generate, ask for more images, or choose a safer angle.

## Risk Rules

| Situation | Risk | Action |
|---|---|---|
| Front-facing product, front source exists | Low | Generate normally |
| Slight 3/4 product angle, only front source exists | Medium | Prompt front-dominant, mention uncertain side geometry |
| Side/back/inside visible, matching reference missing | High | Ask for reference or choose safer front angle |
| Detachable/open product, only assembled source exists | High | Ask for detach/open reference; do not invent hidden parts |
| Accessories visible, accessory reference missing | Medium | Keep accessory small/simple or ask for close-up |

Do not invent hidden geometry. A generated product that looks plausible but has the wrong side, rear, wheel, grille, bracket, filter, or blade structure is a failed production asset even if the poster design looks good.

## Extracting Parts From A Source Board

If the user provides one image containing many product views/parts:

1. Inspect the board visually.
2. Identify each useful crop: front, side, rear, control, base, accessory, detach/open.
3. Create padded crops into:

```text
online-marketing/products/<sku>/images/reference/
```

4. Use lossless PNG for crops when possible.
5. Upscale only if the crop is too small for visual reference.
6. Record the derived reference files in the product `assets.md` note.

Extracted/upscaled crops are source references, not final social assets.

## IFQ-22R Minimum Reference Pack

For IFQ-22R, ask for:

- Front assembled hero.
- Left/right side showing rear body depth and pale grey yoke.
- Rear grille/body view.
- Base and touch-control close-up.
- Slim white remote close-up.
- Front grille removed.
- Exposed fan with exactly 3 white blades.
- Detached grille placed beside body.

Use front-only compositions until side/rear/open references are available.

## ICF-140R Minimum Reference Pack

For ICF-140R, ask for:

- Front assembled hero.
- Side/rear showing casing depth, handle, water tank access, and wheels.
- Top control panel.
- Front grille close-up.
- Water tank/filter area.
- Wheels/casters close-up.
- Black remote close-up.
- In-use image beside an open window.

Avoid sealed-room or air-conditioner replacement scenes even if the reference image is dramatic.
