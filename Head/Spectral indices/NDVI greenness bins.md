---
type: knowledge
desc: Why the NDVI classes are named for greenness rather than land cover, and the phenological method chosen to fix it
aliases: [greenness bins, NDVI classes, NDVI thresholds, very_high_greenness, dense_vegetation, Aryal thresholds, land cover from NDVI, why not forest]
keywords: [NDVI, bins, classes, greenness, land cover, forest, shrub, cropland, phenology, amplitude, TIMESAT, time series, provisional]
agent: norwood
sensor: Sentinel-2 MSI L2A
workflows: fetch_lulc_data
source_workflow: core/workflows/sentinel.py
source_docs: [docs/ndvi_greenness_bins.md]
context: head
retrieval: Answer why the land-cover classes from NDVI are called greenness bins, what would be needed to name them properly, and whether that is implemented.
validation_status: bins verified in tests; the phenological method is specified and NOT implemented
status: draft
tags: [classification, vegetation, sentinel-2, provisional]
---

## The bins

| NDVI | Code | Label |
|---|---|---|
| below 0.19 | 1 | `non_vegetation` |
| 0.19 - 0.40 | 2 | `low_greenness` |
| 0.40 - 0.50 | 3 | `moderate_greenness` |
| 0.50 - 0.60 | 4 | `high_greenness` |
| 0.60 and above | 5 | `very_high_greenness` |

The breaks are Aryal et al.'s (2022) Level-3 Sentinel-2 thresholds -- 0.19
non-vegetation / vegetation, 0.50 shrub / trees, 0.40 and 0.60 stressed /
healthy -- named here by greenness rather than shrub / trees, for the reason
below. Results stored before 2026-11-19 used other breaks (0 / 0.15 / 0.35 /
0.60) and call the top class `dense_vegetation`; its 0.60 break is the same.

The response carries a `caveat` string beside the fractions, so the qualifier
travels with the number rather than living in prose someone has to remember.

## Why they are not land-cover labels

**[[NDVI]] measures green biomass, and greenness is not cover type.**
Peak-season paddy and closed-canopy forest both sit near 0.8 on a single date.
Calling bin 5 `forest` would assert a distinction the measurement cannot make,
so it is called `very_high_greenness` (`dense_vegetation` in older results) -- which is what was actually measured.

## What separates the classes: time, not thresholds

No single-date threshold separates forest from shrub from cropland. What
separates them is **seasonal behaviour**:

- Closed-canopy forest stays high all year -- low amplitude.
- Cropland swings from bare soil to full canopy and back -- high amplitude, with
  onset and duration tied to the planting calendar.
- Shrub sits between, with a shallower and less regular cycle.

The chosen method is therefore the **seasonal amplitude of NDVI across a year**,
a reduced form of the TIMESAT approach, with [[Xiao flooding rule for paddy]]
layered on top to catch transplanted rice.

## Status: specified, not implemented

**Do not relabel the bins until this lands.** The method needs a stack of scenes
across a season; `fetch_lulc_data` selects a **single** scene, deliberately --
it is a pre-event baseline, not a time series. Building this means a new
workflow, not a change to that one.

## Sources

- Tucker, C. J. (1979). "Red and photographic infrared linear combinations for
  monitoring vegetation." *Remote Sensing of Environment*, 8(2), 127-150.
  What red/NIR physically measures -- the basis for naming bins after greenness.
- DeFries, R. S., & Townshend, J. R. G. (1994). "NDVI-derived land cover
  classifications at a global scale." *International Journal of Remote Sensing*,
  15(17), 3567-3586. Land cover from NDVI *temporal profiles* rather than
  single-date thresholds.
- Jonsson, P., & Eklundh, L. (2002). "Seasonality extraction by function fitting
  to time-series of satellite sensor data." *IEEE Transactions on Geoscience and
  Remote Sensing*, 40(8), 1824-1832. TIMESAT; the amplitude metric here is a
  reduced form of it.
- Reed, B. C., Brown, J. F., VanderZee, D., et al. (1994). "Measuring
  phenological variability from satellite imagery." *Journal of Vegetation
  Science*, 5(5), 703-714. Defines amplitude, onset and duration as the metrics
  that distinguish cover types.

---

Related: [[Spectral Indices - MOC]] | [[NDVI]] | [[Xiao flooding rule for paddy]] | [[Sentinel-2 LULC uncertainty fields]]
