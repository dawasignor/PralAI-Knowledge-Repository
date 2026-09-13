---
type: knowledge
desc: Normalised Difference Built-up Index - SWIR-bright surfaces, which is more than buildings
aliases: [NDBI, built-up index, normalised difference built-up index]
keywords: [NDBI, built-up, impervious, concrete, SWIR, B11, B8A, Zha, bare soil, urban]
agent: norwood
sensor: Sentinel-2 MSI L2A
workflows: fetch_lulc_data
source_workflow: core/workflows/sentinel.py
context: head
retrieval: Answer what NDBI measures, why it is returned but not used for classification, and how it relates to NDMI and BUI.
validation_status: formula verified in tests; Shillong live mean -0.1481
status: draft
tags: [spectral-index, built-up, sentinel-2]
---

## What it measures

Surfaces **brighter in SWIR than in NIR**. Concrete, asphalt and roofing are --
which is the intent -- but so is anything dry and mineral: bare soil, dry
riverbed, sand, fallow cropland, rock outcrop.

```
NDBI = (SWIR16 - NIR08) / (SWIR16 + NIR08)     bands: swir16 (B11), nir08 (B8A)
```

Range **[-1, 1]**. Live Shillong scene: mean -0.1481.

**NDBI pairs with `nir08`, not `nir`,** so both bands are native 20 m and
neither is interpolated.

## It is returned, but not used for classification

Built-up classification uses [[BUI]] instead, because NDBI's threshold against
bare soil is not a constant -- it shifts with soil type, moisture, illumination
and season, and scene selection can reach back 90 days, so consecutive runs over
one AOI may land in different seasons. The full argument, with separation
margins, is in [[BUI over NDBI - built-up index accuracy]].

NDBI is still returned because [[BUI]] is defined as NDBI minus NDVI -- omitting
it would hide one of BUI's two terms -- and because published studies report
NDBI, so comparison against them usually means comparing NDBI.

## Not independent of NDMI

On a shared band pair NDBI and [[NDMI]] are **exact algebraic negatives**. As
computed here they differ only because NDMI uses B08 and NDBI uses B8A, making
them near-negatives: NDBI mean -0.1481 against NDMI mean +0.1116 on the same
scene. Do not treat them as two independent votes.

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

Zha, Y., Gao, J., & Ni, S. (2003). "Use of normalized difference built-up index
in automatically mapping urban areas from TM imagery." *International Journal of
Remote Sensing*, 24(3), 583-594. Source of both NDBI and the NDBI-minus-NDVI
formulation.

---

Related: [[Spectral Indices - MOC]] | [[BUI]] | [[NDMI]] | [[BUI over NDBI - built-up index accuracy]]
