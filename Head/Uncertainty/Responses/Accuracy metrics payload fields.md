---
type: uncertainty
uncertainty_kind: response
desc: The fields of the accuracy_metrics payload Entro receives, and where each number in the agreement table comes from
aliases: [accuracy_metrics payload, agreement payload fields, validation payload]
keywords: [accuracy_metrics, payload, table, metrics, coverage, domain, census, reference, assumptions, ranks_compared, confusion matrix]
workflows: accuracy_metrics
source_workflow: core/workflows/accuracy.py
agent: entro
context: head
retrieval: Answer which field of the accuracy_metrics payload carries a given number, and what a real one looks like.
validation_status: field names copied from the payload of the 2026-10-11 Kelani run
status: draft
tags: [uncertainty, response, validation]
---

## Top level

| Field | Holds |
|---|---|
| `framing` | Always "agreement with the reference, not accuracy against ground truth". |
| `reference` | The reference's code, layer, rings and holes in the AOI, excluded layers, credit and description. |
| `temporal` | `mode` (cumulative or single_date) and the window or date. |
| `grid_mode` | Always native: the reference aggregated to each product grid. |
| `evaluation` | `flood_fraction_threshold`, `domain_fraction_threshold`. |
| `aoi` | `bbox`, whether a `small_window` test, and that it is a rectangle. |
| `domain` | The census: `aoi_km2`, `sea_removed_km2`, `permanent_water_removed_km2`, `reference_exclusions_removed_km2`, `domain_km2`, `reference_flood_km2`, `reference_flood_share`. |
| `assumptions` | The stated limits the run carries -- read every one. |
| `table` | One row per product: `coverage`, `precision`, `recall`, `f1`, `iou`, `mcc`, `metric_rank`, `topsis_rank`, `status`, `note`. |
| `note` | The one line printed under the table. |
| `products` | Per product: `metrics` (below) and `product` (grid, window, observations), or `reason` when not evaluated. |
| `ranks_compared` | `evaluated_products`, `metric_order`, `topsis_order_of_those`, and a `caveat` below three products. |
| `outputs` | Paths of the CSV, the Markdown table and this payload. |

## Per product: `products[i].metrics`

`tp`, `fp`, `fn`, `tn`, `n`; `overall_accuracy`, `precision`, `recall`, `f1`,
`iou`, `mcc`; `reference_flood_share` (of the **compared** pixels);
`coverage`, `domain_pixels`, `compared_pixels`; `pixel_size_m`,
`pixel_ground_m2`, `pixel_nominal_m2`; `compared_km2`,
`product_flood_km2_in_domain`, `reference_flood_km2_in_compared`,
`reference_flood_km2_in_domain`.

`null` means undefined (a zero denominator), not zero.

## Per product: `products[i].product`

`crs`, `resolution`, `shape` of the native grid; `window`;
`observations` -- one entry per pass with `valid_pixels` and `flood_pixels`;
`observations_with_data`; `encoding`; `nodata_masks`.

## Two comparisons worth making every time

- `products[i].metrics.reference_flood_share` against
  `domain.reference_flood_share`: a large gap is a selection effect from
  partial coverage.
- `pixel_ground_m2` against `pixel_nominal_m2`: GFM's Equi7 pixels cover about
  9% less ground than their nominal 400 m2 over Sri Lanka; counts are
  unaffected, areas are corrected.

---

Related: [[Validation against the UNOSAT reference]] | [[Agreement metrics for binary flood maps]] | [[Uncertainty Analysis - MOC]]
