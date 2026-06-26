---
type: product-library-index
status: active
area: online-marketing
tags:
  - online-marketing
  - products
  - product-library
---

# Product Library

This folder is the canonical place for reusable product information, product images, and product specs.

Campaign-specific generated images can still live under `online-marketing/sales-content/<campaign>/assets/…`; product-level approved photos, source cards, and reusable facts should live here.

## Current Products

| SKU | Product | Category | Product record | Spec | Assets |
|---|---|---|---|---|---|
| IFQ-22R | 『龍卷』8.7吋全拆式遙控循環扇 | 循環扇 | [[ifq-22r/_index]] | [[ifq-22r/spec]] | [[ifq-22r/assets]] |
| ICF-140R | 可移式放霧遙控冰冷風機(14公升) | 冷風機 | [[icf-140r/_index]] | [[icf-140r/spec]] | [[icf-140r/assets]] |

## Where To Put Things

| Material | Put it here | Notes |
|---|---|---|
| Official PDP/source card images | `products/<sku>/images/source/` | Raw source material; do not edit. |
| Approved product reference photos | `products/<sku>/images/reference/` | Use these for prompt/product-truth checks. |
| Reusable generated product images | `products/<sku>/images/generated/` | Only if reusable beyond one campaign. |
| QA contact sheets / visual checks | `products/<sku>/images/qa/` | Keep review evidence here. |
| Product facts and positioning | `products/<sku>/info.md` | Naming, product truth, claims, campaign usage. |
| Structured specs | `products/<sku>/spec.md` | Source-backed specs only; mark unknowns as pending. |
| Asset links and placement notes | `products/<sku>/assets.md` | Link campaign images without duplicating files. |

## Rules

- Do not duplicate campaign images into product folders unless they become approved evergreen SKU references.
- Specs must cite the source card/PDP and keep unknowns as `待確認`.
- Any prompt using the product should check the product record and spec first.
- Keep product-level images separate from campaign-layout exports.

## Template

Use [[product-template]] when adding a new SKU.
