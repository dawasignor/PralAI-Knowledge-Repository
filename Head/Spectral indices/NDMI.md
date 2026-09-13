---
type: knowledge
desc: Normalised Difference Moisture Index - canopy liquid water, and the index that is nearly redundant with NDBI
aliases: [NDMI, moisture index, LSWI, land surface water index, normalised difference moisture index]
keywords: [NDMI, LSWI, moisture, canopy water, vegetation water content, NIR, SWIR, Gao, redundancy, paddy]
agent: norwood
sensor: Sentinel-2 MSI L2A
workflows: fetch_lulc_data
source_workflow: core/workflows/sentinel.py
context: head
retrieval: Answer what NDMI measures, why it is near-redundant with NDBI, and why it is the same expression as LSWI.
validation_status: NDMI/NDBI negation identity asserted in tests; Shillong live mean +0.1116
status: draft
tags: [spectral-index, moisture, sentinel-2]
---

## What it measures

**Liquid water in vegetation canopy**, from the contrast between NIR (scattered
by leaf structure) and SWIR (absorbed by water).

```
NDMI = (NIR - SWIR16) / (NIR + SWIR16)      bands: nir (B08), swir16 (B11)
```

Range **[-1, 1]**. Live Shillong scene: mean +0.1116.

## It is formula-identical to LSWI

The Land Surface Water Index used in paddy-rice work is the same expression on
the same band pair. `fetch_lulc_data` already returns it, so
[[Xiao flooding rule for paddy]] adds no new index -- only a rule across dates.

## Near-redundant with NDBI

On a shared band pair NDMI is the **exact algebraic negative** of [[NDBI]].
Here they differ only because NDMI uses B08 and NDBI uses B8A, so they are
near-negatives: +0.1116 against -0.1481 on the same scene. They are not two
independent measurements and must not be weighted as such.

## It is not soil moisture

NDMI describes canopy water, not soil water. For a spatial soil-moisture proxy
use [[NMDI]], which takes the SWIR *difference* as a term and is therefore
genuinely independent. For the physical quantity use ERA5-Land via
`fetch_weather_data` -- Sentinel-2 has neither a thermal channel nor L-band
radar. See [[ERA5-Land via Open-Meteo Archive]].

## Band pairing is not arbitrary

Sentinel-2 carries two NIR bands and which one an index uses matters:
`nir` is **B08** (10 m, 842 nm), `nir08` is **B8A** (20 m, 865 nm), the band
designed as B08's 20 m equivalent. Everything here is computed on the 20 m grid.

## Two traps that apply to every index here

**The BOA offset does not cancel.** Processing baseline 05.00+ carries a
reflectance scale of 0.0001 *and* an offset of -0.1. In a normalised difference
the numerator cancels but the denominator does not, so ignoring the offset
biases every value. It is read from the STAC item's `raster:bands`, never
hardcoded.

**`min` and `max` saturate over optically deep, clear water.** Reflectance is
clamped to [0, 1] before any index is computed, and a band clamped to exactly 0
makes a normalised difference exactly +/-1. Use `p10` and `p90` to describe a
distribution; use `min`/`max` only to detect saturation, which
`stats.coverage.saturated_pixels` counts for you.

## Source

Gao, B.-C. (1996). "NDWI -- A normalized difference water index for remote
sensing of vegetation liquid water from space." *Remote Sensing of Environment*,
58(3), 257-266.

---

Related: [[Spectral Indices - MOC]] | [[NDBI]] | [[NMDI]] | [[Xiao flooding rule for paddy]] | [[ERA5-Land via Open-Meteo Archive]]
