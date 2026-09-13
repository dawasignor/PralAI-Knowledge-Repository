---
type: knowledge
desc: Built-Up Index, NDBI minus NDVI - the index used for built-up classification, and the one that spans [-2, 2]
aliases: [BUI, built-up index, NDBI minus NDVI]
keywords: [BUI, built-up, impervious, runoff coefficient, NDBI, NDVI, range, Zha, urban, arid, normalisation]
agent: norwood
sensor: Sentinel-2 MSI L2A
workflows: fetch_lulc_data
source_workflow: core/workflows/sentinel.py
context: head
retrieval: Answer what BUI is, why it is used for built-up classification instead of NDBI, and why its range is not [-1, 1].
validation_status: formula and range verified in tests; Shillong live mean -0.72
status: draft
tags: [spectral-index, built-up, sentinel-2]
---

## What it is

```
BUI = NDBI - NDVI
```

A difference of two normalised differences, which brings a third band (red) and
a second physical property (photosynthetic activity) into a decision [[NDBI]]
makes on SWIR brightness alone.

**Range [-2, 2]**, not [-1, 1]. Every other index in a `fetch_lulc_data`
response is bounded to [-1, 1]; BUI is the exception. Any normalisation step in
the MCDM that assumes [-1, 1] will misscale this criterion. Live Shillong scene:
mean -0.72.

## Why it is the classification index

Not because it is a better detector in isolation, but because its **margin
against vegetation is wide enough to survive a threshold that was not tuned on
the current scene**: forest to built-up separates by 1.37 BUI units, against
NDBI's 0.57 for the same pair.

## What it does not fix

Bare soil and sand. The correction only does work where NDVI is non-zero, and
sand is not green -- so it switches itself off on exactly the surface that
needed it. Sand separates from concrete by 0.02 BUI units.

Full accuracy treatment, error direction and the arid-region consequence:
[[BUI over NDBI - built-up index accuracy]]. Its role as an MCDM criterion:
[[Built-up fraction as an MCDM criterion]].

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
Remote Sensing*, 24(3), 583-594.

---

Related: [[Spectral Indices - MOC]] | [[NDBI]] | [[NDVI]] | [[BUI over NDBI - built-up index accuracy]] | [[Built-up fraction as an MCDM criterion]]
