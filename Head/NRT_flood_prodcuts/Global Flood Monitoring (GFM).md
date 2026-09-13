---
type: dataset
desc: Copernicus EMS ensemble flood extent from Sentinel-1 at 20 m, global, delivered within 8 hours - the strongest Tier 1 candidate on physical criteria
aliases: [GFM, CEMS GFM, Global Flood Monitoring, Copernicus Global Flood Monitoring, GloFAS flood monitoring]
keywords: [sentinel-1, SAR, ensemble, near-real-time, copernicus, CEMS, GloFAS, flood extent, all-weather, exclusion mask, likelihood, EODC, TU Wien, DLR, LIST]
agent: norwood
sensor: Sentinel-1 C-SAR
tier: nrt
modality: sar
producer: EODC-led consortium (EODC, LIST, GeoVille, DLR, TU Wien, CIMA Foundation) for JRC / Copernicus EMS
product_level: L3 flood extent, ensemble of three algorithms
spatial_resolution: 20 m
revisit: 6-12 days (Sentinel-1 repeat); denser where orbits overlap
latency: <= 8 h from scene availability on ESA hubs
coverage: global, wherever Sentinel-1 acquires
classes: 10 output layers - see Metadata
crs: EPSG:4326 (WGS 84) for all distributed layers
internal_grid: Equi7Grid data cube, six continental zones, 20 m
tiling: per Sentinel-1 scene footprint
temporal_start: 2015-01-01 (archive); service operational from 2021
platform: Sentinel-1
orbit_type: sun-synchronous, near-polar
orbit_inclination_deg: 98.18
altitude_km: 693
local_solar_time: 18:00 ascending node
acquisition_mode: IW (Interferometric Wide swath)
incidence_angle_deg: 29.1-46.0
swath_km: 250
polarisations: VV+VH
licence: Copernicus free and open
access: GloFAS Map Viewer, GFM web portal, API, WMS
mcdm:
  spatial_resolution_m: 20
  readiness: 1
  revisit_days: 6
  latency_hours: 8
  spatial_coverage: global
  temporal_start: 2015-01-01
  cloud_penetration: full
  light_independence: full
  derived_mask: true
  cost: free
  programmatically_fetchable: true
context: head
retrieval: Answer what GFM measures, at what resolution, revisit, latency and projection, where its Exclusion Mask makes it blind, and how it compares with the other near-real-time flood products.
validation_status: specification verified against the GFM Product User Manual v20251201; thematic accuracy figures not yet retrieved
source_url: https://extwiki.eodc.eu/gfm_assets/gfm4.0_pum_2025.pdf
verified_on: 2026-09-05
status: draft
tags: [dataset, nrt, sar, sentinel-1, flood-extent, copernicus, mcdm]
---

## What it is

An **ensemble** flood extent product, not a single classifier. Three
independently developed algorithms run in parallel on every Sentinel-1 GRD
scene, and their outputs are combined:

| Algorithm | Team | Approach | Reference |
|---|---|---|---|
| 1 | LIST | Hierarchical split-based, re-calibrated per scene; change detection between same-orbit acquisitions | Chini et al. (2017) |
| 2 | DLR | Fuzzy logic with post-classification region growing, using topography-derived indices alongside backscatter | Martinis et al. (2015) |
| 3 | TU Wien | Datacube-based, against a long-term harmonic backscatter model | — |

The redundancy is deliberate — three algorithms build tolerance to any one
failing on a scene — and their **disagreement becomes the Likelihood Values
layer** (0–100, the mean of the individual classification likelihoods).

That layer matters beyond GFM itself: it is a **published per-pixel confidence**,
which none of the other near-real-time products provide. It is the natural input
to [[Entro - Uncertainty Analyser]], and it means the flood mask arrives with its
own uncertainty rather than needing one invented for it.

## The ten output layers

The four that carry weight for scoring:

1. **Observed Flood Extent** — the ensemble flood mask.
2. **Reference Water Mask** — normal (permanent + seasonal) water, derived from a
   five-year Sentinel-1 reference period (2017–2021). Flood is defined *against*
   this, so **GFM needs no external water baseline**. Compare
   [[OPERA DSWx-S1]], which does — and see [[JRC Global Surface Water]] for the
   baseline this project already uses elsewhere.
3. **Exclusion Mask** — where SAR water mapping is not technically feasible: no
   sensitivity (urban, dense vegetation), low backscatter (flat impervious
   surfaces, sand), topographic distortion.
4. **Likelihood Values** — ensemble confidence.

## Two coordinate systems, and the distinction matters

Processing runs in the **Equi7Grid** datacube at 20 m — an equidistant
per-continent projection where a pixel is an equal-area 20 m square. All
*distributed* layers, raster and vector, are reprojected to **WGS 84 /
EPSG:4326**.

So the delivered product is in geographic degrees, where a pixel is **not** a
square and its ground area varies with latitude. Anything computing flooded area
from the delivered raster must handle that — the same trap this project already
hit with the Copernicus DEM and JRC water grids, where squaring a degree
resolution to get an area is wrong.

## Latency chain

From the PUM: scenes reach ESA hubs within 5 h of acquisition; EODC's hubwatcher
retrieves them ~96 minutes after publication; pre-processing into the datacube
takes 10–20 min per scene; the three algorithms consume up to 30 min. Committed
end-to-end timeliness is **8 hours or less** — the only hard latency commitment
among the free candidates.

## Known limitations

- **The Exclusion Mask is the product's honest statement of where it does not
  work**, and it removes exactly the land cover a flood-impact assessment cares
  about: urban areas and dense vegetation. A GFM flood extent over a city is not
  a low-confidence measurement, it is an **absent** one. The mechanisms are the
  ones in [[SAR versus optical for flood extent]] — urban double bounce, canopy
  volume scattering.
- **Revisit is orbit-limited, not product-limited.** Nothing exists between
  Sentinel-1 passes. A flash flood that peaks and recedes inside one repeat
  interval can be missed entirely.
- **Wind roughens open water**, raising its backscatter toward the land
  distribution and suppressing detection — false negatives, not noise. See
  [[Wind compatibility]] and [[Bragg Scattering Criterion]].
- Delivered in EPSG:4326; see the projection note above.

## Evaluation notes

The strongest Tier 1 candidate on the criteria that are physical rather than
operational: 20 m is the finest resolution in the tier, cloud and darkness are
irrelevant, coverage is global and free, and the archive reaches to 2015 so a
historical thesis event can be evaluated against it.

Its weaknesses are structural and cannot be scored away — revisit, and the
Exclusion Mask over urban and vegetated terrain.

**Date reconciliation.** The earlier scratch note recorded GFM as "from 2021".
Both dates are right for different things: the **service** launched publicly in
October 2021, and the **archive** was reprocessed back to **1 January 2015**. For
[[Flood_mask_Dataset_MCDA]] the archive date is the one that governs whether a
historical event is covered — use 2015.

**Not yet checked:** the thematic accuracy figures stipulated in the CEMS
Technical Specifications, which the PUM references. Needed before accuracy can
be scored in [[Scoring criteria]].

## Sources

- Global Flood Monitoring (GFM) Product User Manual, GFM Deliverable 5.2,
  v20251201. https://extwiki.eodc.eu/gfm_assets/gfm4.0_pum_2025.pdf
- Sentinel-1 mission orbit and IW parameters, Copernicus SentiWiki.
  https://sentiwiki.copernicus.eu/web/s1-mission
- Chini et al. (2017); Martinis et al. (2015) — algorithm references cited by the
  PUM. **Not read; not yet in [[SAR]].**

---

Related: [[NRT products]] | [[OPERA DSWx-S1]] | [[SAR versus optical for flood extent]] | [[SAR]] | [[Wind compatibility]] | [[Bragg Scattering Criterion]] | [[JRC Global Surface Water]] | [[Flood_mask_Dataset_MCDA]] | [[Scoring criteria]] | [[Entro - Uncertainty Analyser]] | [[Agent Norwood - Satellite expert]] | [[Datasets-MOC]]
