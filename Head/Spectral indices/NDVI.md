---
type: knowledge
desc: Normalised Difference Vegetation Index - green biomass from the red/NIR contrast
aliases: [NDVI, vegetation index, normalised difference vegetation index, greenness]
keywords: [NDVI, vegetation, greenness, biomass, red, NIR, B04, B08, Rouse, chlorophyll, land cover]
agent: norwood
sensor: Sentinel-2 MSI L2A
workflows: fetch_lulc_data
source_workflow: core/workflows/sentinel.py
context: head
retrieval: Answer what NDVI measures, which bands it uses, its range, and why its classes are not land cover.
validation_status: formula and range verified in tests; Shillong live mean 0.5693
status: draft
tags: [spectral-index, vegetation, sentinel-2]
---

## What it measures

**Green biomass**, not land cover. Chlorophyll absorbs strongly in the red and
scatters strongly in the near infrared, so the contrast between the two bands
tracks how much photosynthesising material is in the pixel.

```
NDVI = (NIR - Red) / (NIR + Red)          bands: nir (B08, 10 m), red (B04)
```

Range **[-1, 1]**. Live Shillong scene: mean 0.5693, with 53% of the AOI in the
densest greenness bin.

## What it cannot do

NDVI **cannot separate forest from shrub from cropland.** Peak-season paddy and
closed-canopy forest both sit near 0.8 on a single date. This is why the classes
`fetch_lulc_data` returns are named `dense_vegetation` rather than `forest`, and
why the response carries an explicit caveat string. See [[NDVI greenness bins]].

## Where it is used

- Its own greenness classification, with the caveat above.
- As the vegetation term of [[BUI]], which is what makes built-up detection
  survive a threshold not tuned on the current scene. See
  [[BUI over NDBI - built-up index accuracy]].

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

## Sources

- Rouse, J. W., Haas, R. H., Schell, J. A., & Deering, D. W. (1974).
  "Monitoring vegetation systems in the Great Plains with ERTS."
  *Third ERTS Symposium*, NASA SP-351, 309-317.
- Tucker, C. J. (1979). "Red and photographic infrared linear combinations for
  monitoring vegetation." *Remote Sensing of Environment*, 8(2), 127-150.
  Establishes what the red/NIR combination physically measures, and is the basis
  for naming the bins after greenness.

---

Related: [[Spectral Indices - MOC]] | [[NDVI greenness bins]] | [[BUI]] | [[Sentinel-2 C1 L2A]]
