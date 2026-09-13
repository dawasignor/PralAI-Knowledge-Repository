---
type: knowledge
desc: The LSWI-over-EVI flooding signal that identifies transplanted paddy, using an index already returned
aliases: [paddy rule, Xiao rule, rice mapping, flooding signal, LSWI EVI, paddy detection, transplanting]
keywords: [paddy, rice, transplanting, flooding signal, LSWI, EVI, NDMI, Xiao, PhenoRice, monsoon, cropland, MODIS, Sentinel-2]
agent: norwood
sensor: Sentinel-2 MSI L2A
workflows: fetch_lulc_data
source_workflow: core/workflows/sentinel.py
source_docs: [docs/paddy_flooding_rule.md]
context: head
retrieval: Answer how transplanted paddy is distinguished from other vegetation, what the flooding rule is, and whether it is implemented.
validation_status: specified from the literature and NOT implemented
status: draft
tags: [classification, vegetation, paddy, sentinel-2, provisional]
---

## Why paddy needs its own rule

Paddy is the case that breaks [[NDVI greenness bins]] hardest. At peak season it
is indistinguishable from closed-canopy forest on NDVI, and its seasonal
amplitude resembles any other annual crop. In a monsoon-Asia flood catchment
that is not an edge case -- it is much of the cultivated land.

## The signal

Paddy has a phase no other crop has: the field is **deliberately flooded** at
transplanting. For a short window the pixel is water plus sparse seedlings, so
its water index rises above its vegetation index -- a reversal that does not
occur in dryland cropping.

```
LSWI + 0.05 >= EVI        ->  flooded / transplanting
```

## It adds no new index

**LSWI is formula-identical to [[NDMI]]**, which `fetch_lulc_data` already
returns. The rule is a comparison across dates, not a new band computation. EVI
is the one term not currently produced.

## Adapting from MODIS to Sentinel-2

The rule was defined on MODIS. Sentinel-2 changes the trade: far finer spatial
resolution (20 m against 250-500 m), so a single paddy plot is resolved rather
than mixed -- but a 5-day revisit that cloud reduces sharply, against MODIS'
daily coverage. The transplanting window is short, so **missing it to cloud is
the main risk**, and that is the same monsoon-season cloud problem set out in
[[SAR versus optical for flood extent]].

## Status: specified, not implemented

Like [[NDVI greenness bins]], this needs a stack of scenes across a season.
`fetch_lulc_data` selects a single pre-event scene.

## Sources

- Xiao, X., Boles, S., Liu, J., et al. (2005). "Mapping paddy rice agriculture
  in southern and northeastern China using multi-temporal MODIS images."
  *Remote Sensing of Environment*, 95(4), 480-492. The flooding-signal
  algorithm.
- Xiao, X., Boles, S., Frolking, S., et al. (2006). "Mapping paddy rice
  agriculture in South and Southeast Asia using multi-temporal MODIS images."
  *Remote Sensing of Environment*, 100(1), 95-113. The monsoon-Asia extension,
  including the cloud-frequency problem.
- Boschetti, M., Busetto, L., Manfron, G., et al. (2017). "PhenoRice: A method
  for automatic extraction of spatio-temporal information on rice crops using
  satellite data time series." *Remote Sensing of Environment*, 194, 347-365.
  The heavier alternative if the simple rule proves insufficient.

---

Related: [[Spectral Indices - MOC]] | [[NDMI]] | [[NDVI greenness bins]] | [[SAR versus optical for flood extent]]
