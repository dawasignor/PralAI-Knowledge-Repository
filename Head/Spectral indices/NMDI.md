---
type: knowledge
desc: Normalized Multi-band Drought Index - the independent moisture proxy, and the one that must be masked
aliases: [NMDI, drought index, normalized multi-band drought index, soil moisture proxy]
keywords: [NMDI, drought, soil moisture, SWIR difference, B8A, B11, B12, Wang Qu, masking, unbounded, divergence, valid_fraction]
agent: norwood
sensor: Sentinel-2 MSI L2A
workflows: fetch_lulc_data
source_workflow: core/workflows/sentinel.py
context: head
retrieval: Answer what NMDI measures, why it is masked where the SWIR difference is small, and why it is preferred over NDMI as a moisture proxy.
validation_status: mask verified in tests; unmasked live scene reached -249; masked Shillong mean +0.5632
status: draft
tags: [spectral-index, moisture, sentinel-2, masking]
---

## What it measures

Soil and vegetation moisture, using the **difference between the two SWIR
bands** as one term rather than a single band.

```
NMDI = (NIR08 - g) / (NIR08 + g),  where g = SWIR16 - SWIR22
bands: nir08 (B8A), swir16 (B11), swir22 (B12)
```

Live Shillong scene, masked: mean +0.5632, range [0.218, 0.953].

## Why it is the moisture proxy to use

Unlike [[NDMI]], which is a near-negative of [[NDBI]] and so carries no
independent information, NMDI's SWIR-difference term makes it **genuinely
independent** of the built-up signal. If you want one spatial moisture proxy
from this response, it is this one.

It is still not soil moisture in the physical sense -- that comes from ERA5-Land
via `fetch_weather_data`. NMDI contributes the spatial pattern; ERA5-Land
contributes the quantity, at about 9 km for the whole AOI.

## It is bounded only where it is defined

This is the part that matters. Unlike a plain band pair, NMDI is bounded to
[-1, 1] **only while g > 0**. Where SWIR22 exceeds SWIR16 the denominator falls
below the numerator and the ratio diverges: on a live Shillong scene, before
this was guarded, **NMDI reached -249**.

So pixels with `g <= 0.01` reflectance are masked. That threshold is also the
index's physical premise -- Wang and Qu define NMDI for soil and canopy, where
the 1.6 um band is brighter than the 2.2 um band. Water, shadow and snow break
that, and they are not surfaces NMDI describes. **The bound therefore holds by
construction rather than by a tuned cutoff.**

Consequence to carry downstream: **NMDI's `valid_fraction` is lower than every
other index in the same response**, because of this extra mask. Masking moved
its mean by 0.0016 -- it removes pathological pixels, not signal. See
[[Sentinel-2 LULC uncertainty fields]].

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

Wang, L., & Qu, J. J. (2007). "NMDI: A normalized multi-band drought index for
monitoring soil and vegetation moisture with satellite remote sensing."
*Geophysical Research Letters*, 34, L20405.

---

Related: [[Spectral Indices - MOC]] | [[NDMI]] | [[Sentinel-2 LULC uncertainty fields]] | [[ERA5-Land via Open-Meteo Archive]]
