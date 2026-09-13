---
type: dataset
desc: NASA OPERA surface water extent from Harmonized Landsat Sentinel-2 at 30 m - best self-diagnostics in the tier, but optical, so the measured cloud limitation governs it
aliases: [DSWx-HLS, OPERA DSWx-HLS, OPERA_L3_DSWX-HLS_V1, Dynamic Surface Water Extent from HLS, HLS flood product]
keywords: [OPERA, HLS, harmonized landsat sentinel, optical, DSWx, surface water, MGRS, UTM, PODAAC, NASA, cloud mask, terrain shadow]
agent: norwood
sensor: [Landsat 8/9 OLI, Sentinel-2 MSI]
tier: nrt
modality: optical
producer: NASA JPL OPERA project; distributed by PO.DAAC
product_level: L3 surface water extent
spatial_resolution: 30 m
revisit: 2-3 days nominal acquisition cadence (HLS combined) - NOT the cloud-free cadence
latency: not published as a committed figure
coverage: global land
classes: water classification, confidence, land cover, terrain shadow, cloud/cloud-shadow, DEM, diagnostic (10 GeoTIFFs)
crs: UTM zones on the WGS 84 ellipsoid
tiling: MGRS/UTM tiles, 109.8 km x 109.8 km, 3660 x 3660 pixels
temporal_start: 2016-01-01 (validated from April 2023)
platform: Landsat 8/9 + Sentinel-2 A/B/C (harmonised)
orbit_type: sun-synchronous, near-polar
orbit_inclination_deg: 98.2 (Landsat 8/9), 98.62 (Sentinel-2)
altitude_km: 705 (Landsat), 786 (Sentinel-2)
local_solar_time: 10:12 descending (Landsat 9), 10:30 descending (Sentinel-2)
swath_km: 185 (Landsat), 290 (Sentinel-2)
native_revisit_days: 16 single Landsat / 8 Landsat 8+9 / 10 single Sentinel-2 / 5 Sentinel-2 constellation
licence: open, EOSDIS Data Use and Citation Guidance; contains modified Copernicus Sentinel data
access: Earthdata Search, CMR, AWS S3 (us-west-2), PO.DAAC data-subscriber, Harmony subsetter
doi: 10.5067/OPDSW-PL3V1
mcdm:
  spatial_resolution_m: 30
  readiness: 2
  revisit_days: 2-3
  revisit_caveat: acquisition cadence, not cloud-free observation cadence
  latency_hours: null
  spatial_coverage: global land
  temporal_start: 2016-01-01
  cloud_penetration: none
  light_independence: none
  derived_mask: true
  cost: free
  programmatically_fetchable: true
context: head
retrieval: Answer what DSWx-HLS measures, why its 2-3 day revisit is misleading during a flood, what its cloud and terrain-shadow layers give the uncertainty analysis, and how it pairs with DSWx-S1.
validation_status: specification verified against the PO.DAAC record; the cloud-availability figures are this project's own live measurements over three AOIs
source_url: https://podaac.jpl.nasa.gov/dataset/OPERA_L3_DSWX-HLS_V1
verified_on: 2026-09-05
status: draft
tags: [dataset, nrt, optical, landsat, sentinel-2, surface-water, opera, mcdm]
---

## What it is

The optical half of the OPERA DSWx suite, distributed under the PO.DAAC short
name **`OPERA_L3_DSWX-HLS_V1`**. Both strings are in `aliases`, so a query using
either the common name or the archive ID resolves here.

Input is **HLS v2.0** — Harmonized Landsat Sentinel-2, in which Landsat 8/9 OLI
and Sentinel-2 MSI are cross-calibrated, BRDF-corrected and resampled onto one
common 30 m MGRS grid. That harmonisation is what turns platforms with 16-day
and 10-day repeat cycles into a nominal 2–3 day cadence.

Note the relationship to [[Sentinel-2 C1 L2A]]: same instrument, different
processing chain. This project reads S2 C1 L2A directly for spectral indices;
DSWx-HLS reads the harmonised product and returns a finished water classification.

## Coordinate system

UTM on the WGS 84 ellipsoid, MGRS tiles of 109.8 km × 109.8 km at 3660 × 3660
pixels. Metric and square-pixelled, and **identical to [[OPERA DSWx-S1]]**, so
the two co-register exactly.

The MGRS straddle hazard documented in
[[Partial AOI coverage in Sentinel-2 scenes]] applies unchanged.

## Ten layers, and the extra ones are the point

Beyond water classification and confidence it ships land cover, **terrain
shadow**, **cloud and cloud-shadow classification**, the DEM used, and a
diagnostic layer.

The terrain-shadow and cloud layers are **self-declared failure masks**: the
product states where its own answer is unreliable. That is directly readable
evidence for [[Entro - Uncertainty Analyser]] rather than something the agent
must infer — the same role `valid_fraction` plays for `fetch_lulc_data` in
[[Scene usability - SCL valid fraction]].

## The revisit figure is a trap

**The nominal 2–3 day revisit is an *acquisition* cadence, not an observation
cadence.** A flood is a cloudy-season event, so usable revisit during the event
window is far worse than the metadata suggests.

This is measured, not asserted — the figures are this project's own, over its own
AOIs:

- **Shillong**, 90-day window ending 2025-08-03: **0 of 13** scenes reached a 0.9
  AOI valid fraction; best was 0.62. A 15-day lookback gave 5 scenes, none under
  70% tile cloud.
- **Tirupati**, event date 19 November 2021: the scene acquired on the event date
  had an AOI valid fraction of **0.0860** — under 9% of the study area
  observable, on the day of the flood.
- Tile-level cloud metadata is a poor proxy for AOI usability: a 46%-cloudy tile
  gave a 10.8%-clear AOI. See [[Scene usability - SCL valid fraction]].
- Pre-screening on modelled weather cloud does not rescue it either. See
  [[ERA5 cloud does not predict Sentinel-2 AOI usability]].

The full argument is in [[SAR versus optical for flood extent]]. **Scoring
revisit for this product from its metadata alone will rank it far too highly** —
`mcdm.revisit_days` carries `revisit_caveat` for exactly this reason.

## Known limitations

- **Cloud is the binding constraint, and it is not random.** See above.
- **Not a flood mask** — surface water extent, same as DSWx-S1. Flood requires
  differencing against a baseline the product does not supply.
- **Turbid floodwater is spectrally unlike clear water**, so sediment-laden flood
  is under-detected in the visible/NIR.
- **No committed latency figure** published; left `null` rather than guessed.
- Validated data only from April 2023, though coverage nominally starts 2016.

## Evaluation notes

The best-instrumented product in the tier for *understanding its own failure*:
explicit cloud, cloud-shadow and terrain-shadow layers mean the agent does not
have to infer where the answer is untrustworthy.

But it is optical, and the physics is decisive. On cloud penetration it scores
zero, and no amount of resolution or revisit compensates.

**Its realistic role is as a complement to a SAR product, not a rival.** Same
grid as [[OPERA DSWx-S1]], so where cloud does break it adds an independent
optical confirmation of a SAR detection — and a cloud-free optical observation
agreeing with a SAR observation is much stronger evidence than either alone. The
shared MGRS grid makes that agreement cheap to compute.

That framing only survives if [[Flood_mask_Dataset_MCDA]] can select a
*complementary set* rather than a single winner. Worth settling.

## Sources

- OPERA Dynamic Surface Water Extent from HLS (Version 1), PO.DAAC.
  https://podaac.jpl.nasa.gov/dataset/OPERA_L3_DSWX-HLS_V1 (DOI 10.5067/OPDSW-PL3V1)
- Landsat 9 orbit and instrument specification, USGS.
  https://www.usgs.gov/landsat-missions/landsat-9
- Sentinel-2 mission orbit and MSI parameters, Copernicus SentiWiki.
  https://sentiwiki.copernicus.eu/web/s2-mission
- Cloud-availability measurements: this project's live runs over Shillong,
  Edinburgh and Tirupati, 2026-08-27.

---

Related: [[NRT products]] | [[OPERA DSWx-S1]] | [[SAR versus optical for flood extent]] | [[Cloud compatibility]] | [[Scene usability - SCL valid fraction]] | [[ERA5 cloud does not predict Sentinel-2 AOI usability]] | [[Partial AOI coverage in Sentinel-2 scenes]] | [[Sentinel-2 C1 L2A]] | [[Copernicus DEM GLO-30]] | [[Flood_mask_Dataset_MCDA]] | [[Entro - Uncertainty Analyser]] | [[Agent Norwood - Satellite expert]] | [[Datasets-MOC]]
