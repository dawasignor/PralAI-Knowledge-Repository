---
type: uncertainty
uncertainty_kind: knowledge
desc: The validation of the NRT flood products against the UNOSAT reference for the Kelani event -- its design, every decision taken, how Monty computes it, and the results so far
aliases: [Kelani validation, UNOSAT validation, accuracy metrics workflow, agreement table, flood product validation, validation plan]
keywords: [validation, agreement, accuracy_metrics, UNOSAT, FL20251128LKA, Kelani, GFM, OPERA, DSWx, MODIS, VIIRS, TOPSIS, coverage, exclusion mask, native grid, cumulative, F1, MCC]
workflows: accuracy_metrics
source_workflow: core/workflows/accuracy.py
agent: entro
context: head
retrieval: Answer how the flood products were validated against UNOSAT for the Kelani event, what was decided and why, what the agreement table shows so far, and what is still missing.
validation_status: design from the user's validation plan; decisions recorded 2026-10-11; GFM result measured 2026-10-11, other products not yet evaluated
verified_on: 2026-10-11
status: draft
tags: [uncertainty, validation, kelani, unosat]
---

## Answer in one line

Each NRT product is compared with the UNOSAT flood map on the product's own
pixel grid, over the Kelani AOI minus sea and permanent water, as a union over
26 November - 2 December 2025. **Only GFM can be evaluated so far**: agreement
F1 0.465 and MCC 0.504, but over only **12% coverage** of the domain.

## Who does what

**Monty** runs the workflow `accuracy_metrics` and produces the table; the code
is in `core/workflows/validation/`. **Entro** interprets the table through the
`accuracy_interpretation` flow, in the same run -- it explains, it never
recomputes. **Argus** routes the question and writes the answer.

## The design, step by step

1. **Reference.** The UNOSAT flood layer is read from the HDX zip and
   rasterised at 10 m in UTM 44N, holes cut out (see
   [[UNOSAT FL20251128LKA flood reference]]).
2. **Domain.** The AOI, minus the sea (Copernicus DEM Water Body Mask), minus
   JRC permanent water (occurrence of 90% or more), minus UNOSAT's
   cloud-obstruction layer. The reference has no analysed extent, so nothing
   more can be removed.
3. **Products.** Each product's observations in the window are combined as a
   union: flood if any pass saw flood, non-flood if a pass saw the ground and
   none saw flood, no-data if no pass saw it. Encodings are mapped to
   flood / non-flood / no-data from the config, never guessed.
4. **Native grid.** The reference is aggregated to each product's own pixels:
   a product pixel is reference flood when more than half its in-domain area
   is flood. Pixels where the product has no data are left out and counted as
   lost coverage.
5. **Table.** One row per product, sorted by F1, with coverage, precision,
   recall, F1, IoU, MCC, the metric rank and the TOPSIS rank.

## Decisions and why

Taken with the user on 2026-10-11:

- **Cumulative** temporal mode -- the reference is one union over the window.
- **Domain = AOI minus the cloud layer**, with the missing analysed extent
  stated as an assumption -- the reference ships none.
- **GFM only for now** -- OPERA needs an Earthdata login, and MODIS and VIIRS
  have no archive for November 2025 (the LANCE NRT archive keeps about a week).
- **The kelani-2025-west rectangle as the AOI**, not the basin outline.
- **GFM's Exclusion Mask is no-data**, not non-flood: the product's own
  statement of where SAR flood mapping does not work.
- **Agreement, not accuracy**, in every table and sentence.

## Results so far

Measured 2026-10-11 over the kelani-2025-west domain (1,311.7 km2, of which
61.0 km2 is reference flood):

| Product | Coverage | Precision | Recall | F1 | IoU | MCC | Metric rank | TOPSIS rank |
|---|---|---|---|---|---|---|---|---|
| GFM (Sentinel-1) | 0.121 | 0.962 | 0.307 | 0.465 | 0.303 | 0.504 | 1 | 1 |
| OPERA DSWx-HLS | not evaluated | | | | | | | 4 |
| OPERA DSWx-S1 | not evaluated | | | | | | | 2 |
| MODIS MCDWD | not evaluated | | | | | | | 3 |
| VIIRS VCDWD | not evaluated | | | | | | | 5 |

GFM confusion matrix, on its native 20 m grid: TP 22,689, FP 884, FN 51,336,
TN 357,981 -- 432,890 pixels compared of 3,590,102 in the domain.

## How to read the GFM row

- **Coverage 0.121.** The Exclusion Mask removes most of the AOI. Only 2 of 8
  GFM passes in the window held data over the AOI, and all of GFM's flood came
  from the 2 December pass.
- **Precision 0.962, recall 0.307.** When GFM says flood, UNOSAT agrees; but
  GFM misses most of the flood UNOSAT mapped, even where it had data.
  Omission dominates.
- **A selection effect.** The reference's flood share is 4.7% of the domain
  but 17.1% of the pixels GFM compared: the exclusion mask leaves mostly open
  floodplain, where flood is easiest to see.
- **The reference's blind spot runs the other way.** UNOSAT is optical: cloud
  hides flood from it but not from GFM. GFM flood under cloud would count as a
  false alarm -- yet false alarms are few, so this did not dominate here.
- **Temporal spread.** GFM's flood came from one pass on 2 December; the
  reference unions every Sentinel-2 view up to the same day. Flood that had
  receded by 2 December, or was seen only by an earlier optical pass, counts
  against GFM's recall.

## The rank comparison cannot be made yet

With one evaluated product, "metric rank 1, TOPSIS rank 1" is not agreement,
it is the only row. See [[Metric rank versus TOPSIS rank]].

## What is still missing

- OPERA DSWx-HLS and DSWx-S1 -- the data needs an Earthdata login; once
  downloaded, they are added to the config as local files.
- MODIS and VIIRS -- no archive exists for the event.
- An analysed extent for the reference.
- The basin outline, in place of the rectangle.

---

Related: [[Agreement metrics for binary flood maps]] | [[UNOSAT FL20251128LKA flood reference]] | [[Accuracy metrics payload fields]] | [[Global Flood Monitoring (GFM)]] | [[Flood_mask_Dataset_MCDA]]
