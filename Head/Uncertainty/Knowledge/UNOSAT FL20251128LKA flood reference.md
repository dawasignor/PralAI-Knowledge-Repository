---
type: uncertainty
uncertainty_kind: knowledge
desc: The UNOSAT flood extent for Cyclone Ditwah in Sri Lanka (FL20251128LKA) used as the reference map in the flood product validation -- what it is, how it was built, and where it cannot be trusted
aliases: [UNOSAT reference, UNOSAT flood map, FL20251128LKA, Cyclone Ditwah flood extent, Sri Lanka flood reference, validation reference]
keywords: [UNOSAT, UNITAR, HDX, FL20251128LKA, Cyclone Ditwah, Sri Lanka, Kelani, flood extent, reference map, Sentinel-2, multisensor, analysed extent, cloud obstruction, CC BY-SA, not field validated]
sensor: Sentinel-2 (per the layer attributes)
workflows: accuracy_metrics
source_workflow: core/workflows/validation/reference.py
sources_note: Flood map validation - sources
agent: entro
context: head
retrieval: Answer what the UNOSAT FL20251128LKA flood map is, how it was produced, what its attributes say, and which limits of it Entro must carry into every agreement figure.
validation_status: read from the delivered shapefiles, attribute tables and ArcGIS metadata on 2026-10-11 (UNOSAT 2025)
verified_on: 2026-10-11
status: draft
tags: [uncertainty, validation, reference, unosat, flood]
---

## Answer in one line

The reference is UNOSAT's flood extent for Sri Lanka after Cyclone Ditwah,
**one dissolved multipolygon over 26 November - 2 December 2025**, attributed
to **Sentinel-2**, marked **"To be evaluated" and "Not yet field validated"**,
and delivered **without an analysed extent** (UNOSAT 2025). It is an
operational map, not ground truth.

## What was delivered

The HDX zip `_static_unosat_filesystem_4223_FL20251128LKA_SHP.zip` holds, all
in WGS84 geographic coordinates (UNOSAT 2025):

- `Multisensors_20251126_20251202_FloodExtent_SriLanka` -- **the reference**:
  new water and water increase, one record, about 4,134 km2 nationally.
- `Multisensors_20251126_20251202_WaterExtent_SriLanka` -- flood plus existing
  water, about 4,264 km2. Not used: permanent water is removed separately.
- `S2_20251130_20251202_AnalysisExtent`, `..._CloudObstruction`,
  `..._LandslideExtent`, `S2_20251126_20251130_LandslideAssessment` -- the
  **landslide** assessment. Its analysis extent (2,518 km2, 2 December) is
  smaller than the flood layer and does not describe it.

## Attributes of the flood layer

One record: Water_Class "Flood Water"; Water_Status "New Water / Water
Increase"; Sensor_ID "Sentinel-2"; Confidence "To be evaluated"; Field
Validation "Not yet field validated"; event code FL20251128LKA. The ArcGIS
lineage shows several merges -- "S2_Till02Dec_Flood_Merge2" appended into the
layer -- so it is a union of acquisitions up to 2 December (UNOSAT 2025).

## Sentinel-2, not radar

The validation plan's README note assumed a radar-derived reference. The layer
says Sentinel-2, which is optical, despite the "Multisensors" name. That
changes which products share its blind spots:

- An **optical reference cannot see through cloud**. Where cloud persisted
  during the cyclone, flood under it is missing from the reference, and a SAR
  product that maps it is scored as a false alarm.
- **Optical products** (DSWx-HLS, MODIS, VIIRS) share that blind spot, which
  can inflate their agreement.
- SAR products (GFM, DSWx-S1) do not share it, but have their own: urban areas
  and dense vegetation, which GFM excludes outright.

## No analysed extent

The flood layer carries no extent of where UNOSAT looked. Inside the AOI,
"UNOSAT did not map flood here" and "UNOSAT did not look here" are the same
pixel. Both count as non-flood in the comparison, so a product's flood on
ground UNOSAT never examined is scored as a false alarm. Precision is biased
low by an amount that cannot be measured from these files.

## Temporal mode: cumulative

One dissolved layer named 26 November - 2 December, with no per-polygon dates,
is a union over the window. The products are therefore compared as unions over
the same window ("cumulative"), decided with the user on 2026-10-11.

## Inside the Kelani AOI

Over the kelani-2025-west box `[79.800, 6.783, 80.217, 7.083]`, rasterised at
10 m in UTM 44N: 1,682 rings (577 holes), **61.0 km2 of flood** in a domain of
1,311.7 km2 after removing the sea and JRC permanent water -- a flood share of
4.7%. The cloud-obstruction layer does not touch the AOI.

## Licence

HDX distributes it under CC BY-SA: every table and figure using it credits
UNOSAT (UNOSAT 2025).

---

Related: [[Agreement metrics for binary flood maps]] | [[Validation against the UNOSAT reference]] | [[Copernicus EMS Rapid Mapping]] | [[Uncertainty Analysis - MOC]]
