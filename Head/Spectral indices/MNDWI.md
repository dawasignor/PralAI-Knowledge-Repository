---
type: knowledge
desc: Modified Normalised Difference Water Index - open water enhancement using green and SWIR
aliases: [MNDWI, water index, modified normalised difference water index, open water]
keywords: [MNDWI, water, open water, green, SWIR, B03, B11, Xu, NDWI, flood extent, turbidity, saturation]
agent: norwood
sensor: Sentinel-2 MSI L2A
workflows: fetch_lulc_data
source_workflow: core/workflows/sentinel.py
context: head
retrieval: Answer what MNDWI measures, why green/SWIR is used instead of green/NIR, and why it is not the permanent-water baseline.
validation_status: formula and range verified in tests
status: draft
tags: [spectral-index, water, sentinel-2]
---

## What it measures

**Open water surface.** Water absorbs strongly in SWIR and reflects relatively
more in green, so the contrast isolates it.

```
MNDWI = (Green - SWIR16) / (Green + SWIR16)   bands: green (B03), swir16 (B11)
```

Range **[-1, 1]**.

## Why green/SWIR rather than green/NIR

Xu's modification replaces the NIR band of the original NDWI with SWIR
specifically to suppress **built-up surface**, which the NIR formulation
misreads as water. In a populated catchment that is the difference between a
usable water mask and one full of rooftops.

## It is not the permanent-water baseline

Deriving the permanent-water baseline from the same scenes that measure a flood
is circular -- it makes floodwater look permanent. The baseline comes from
[[JRC Global Surface Water]] occurrence instead, which carries the observation
frequency that "permanent" actually means.

Nor is it the flood-extent instrument: during the event the optical sensor is
usually under cloud. See [[SAR versus optical for flood extent]].

## Saturation bites here in particular

MNDWI is computed over water by design, and water is where the reflectance clamp
bites. Over Edinburgh's clear coastal water MNDWI reached the -1.0 bound. Over
turbid inland water (Tirupati, post-monsoon) nothing saturated -- suspended
sediment reflects about 4.9% in NIR, far from the bound. Floodwater is almost
always sediment-laden, so flood cases tend to be the safe ones.

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

Xu, H. (2006). "Modification of normalised difference water index (NDWI) to
enhance open water features in remotely sensed imagery." *International Journal
of Remote Sensing*, 27(14), 3025-3033.

---

Related: [[Spectral Indices - MOC]] | [[JRC Global Surface Water]] | [[SAR versus optical for flood extent]] | [[Sentinel-2 LULC uncertainty fields]]
