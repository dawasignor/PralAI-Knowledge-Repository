---
type: dataset
desc: NASA OPERA surface water extent from Sentinel-1 at 30 m on MGRS tiles - metric projection and grid-aligned with DSWx-HLS, but a short archive and no water baseline
aliases: [DSWx-S1, OPERA DSWx-S1, OPERA_L3_DSWX-S1_V1, Dynamic Surface Water Extent from Sentinel-1]
keywords: [OPERA, sentinel-1, SAR, DSWx, surface water, MGRS, UTM, PODAAC, NASA, JPL, COG, RTC]
agent: norwood
sensor: Sentinel-1 C-SAR
tier: nrt
modality: sar
producer: NASA JPL OPERA project; distributed by PO.DAAC
product_level: L3 surface water extent
spatial_resolution: 30 m
revisit: 6-12 days (Sentinel-1 repeat)
latency: near real time, no committed figure published; forward production from September 2024
coverage: global, 84N to 84S
classes: water classification + confidence layers (3 GeoTIFFs)
crs: UTM zones on the WGS 84 ellipsoid
tiling: MGRS tiles
temporal_start: 2023-12-01
platform: Sentinel-1
orbit_type: sun-synchronous, near-polar
orbit_inclination_deg: 98.18
altitude_km: 693
local_solar_time: 18:00 ascending node
acquisition_mode: IW (Interferometric Wide swath)
incidence_angle_deg: 29.1-46.0
swath_km: 250
polarisations: VV+VH
licence: open, EOSDIS Data Use and Citation Guidance
access: Earthdata Search, PO.DAAC archive, AWS S3 (us-west-2), cloud-optimised GeoTIFF
mcdm:
  spatial_resolution_m: 30
  readiness: 2
  revisit_days: 6
  latency_hours: null
  spatial_coverage: global 84N-84S
  temporal_start: 2023-12-01
  cloud_penetration: full
  light_independence: full
  derived_mask: true
  cost: free
  programmatically_fetchable: true
context: head
retrieval: Answer what DSWx-S1 measures, its resolution, projection and MGRS tiling, why its December 2023 archive start is a hard constraint, and why it is surface water rather than flood.
validation_status: specification verified against the PO.DAAC and NASA Earthdata catalogue records; the OPERA product spec PDF located but not read in full
source_url: https://www.earthdata.nasa.gov/data/catalog/pocloud-opera-l3-dswx-s1-v1-1.0
verified_on: 2026-09-05
status: draft
tags: [dataset, nrt, sar, sentinel-1, surface-water, opera, mcdm]
---

## What it is

The SAR half of NASA's OPERA DSWx suite, and deliberately built as a **matched
pair with [[OPERA DSWx-HLS]]**: same 30 m posting, same MGRS tiling, same class
scheme, so a SAR observation and an optical observation of the same AOI are
pixel-aligned and directly comparable.

No other pair of near-real-time products has that property, and it is the reason
to consider the two together rather than as competitors.

Built on OPERA's own radiometrically terrain-corrected backscatter (RTC-S1)
rather than on raw GRD, so terrain correction is applied upstream.

## Coordinate system

MGRS tiles, each in its local **UTM zone on the WGS 84 ellipsoid** — a projected,
metric CRS. A pixel is a true 30 m square, and area is a pixel count times
900 m², with no latitude correction.

This is the **opposite convention** to [[Global Flood Monitoring (GFM)]], which
delivers in geographic degrees, and it makes DSWx-S1 the cheaper product to
compute flooded area from.

MGRS tiling carries a familiar hazard: an AOI can straddle two tiles, and a
window clamped to one of them yields plausible statistics for a region nobody
asked for. That failure mode is already documented for Sentinel-2 in
[[Partial AOI coverage in Sentinel-2 scenes]], and the same guard applies here.

## It is not a flood mask

DSWx-S1 is a **surface water** extent product. It labels open water; it does not
distinguish floodwater from a lake.

Deriving flood extent requires differencing against a baseline — either the
product's own historical stack or an external one such as
[[JRC Global Surface Water]]. GFM does that step internally and publishes a
Reference Water Mask; DSWx-S1 does not.

**This is a real cost the MCDM should carry**, not a footnote. Two products at
the same resolution are not doing the same amount of work for the agent, and
[[Flood_mask_Dataset_MCDA]] has no criterion expressing it today.

## Known limitations

- **Short archive.** Coverage begins 2023-12-01, forward production only from
  September 2024. Any flood before that date cannot be assessed with this
  product — a hard availability constraint, not a quality one. Against GFM's 2015
  archive this is **the single biggest discriminator between the two SAR
  products** for a historical thesis event.
- **No published water baseline**, so the agent must supply one.
- Same physical blind spots as any C-band water classifier: urban double bounce,
  canopy volume scattering, wind-roughened water ([[Wind compatibility]]),
  terrain shadow and layover.
- **No committed latency figure** was found on the PO.DAAC record — "near real
  time" is stated without a number, unlike GFM's 8 h. Left `null` rather than
  guessed.

## Evaluation notes

Against [[Global Flood Monitoring (GFM)]], its direct competitor: coarser
(30 m vs 20 m), a far shorter archive (2023 vs 2015), no per-pixel ensemble
likelihood, and no built-in reference water. In exchange it offers a metric
projected CRS, MGRS alignment with the optical DSWx product, and cloud-native
COGs on S3 that are cheap to read windowed — the same access pattern
`fetch_lulc_data` already uses for Sentinel-2.

For an operational pipeline fusing SAR and optical, the DSWx pair is the
better-engineered choice. For scoring a single historical flood event on flood
extent alone, GFM currently dominates it.

**Not yet checked:** OPERA's published validation accuracy, and the class and
confidence value encoding in the three GeoTIFFs.

## Sources

- OPERA Dynamic Surface Water Extent from Sentinel-1 (Version 1), NASA Earthdata.
  https://www.earthdata.nasa.gov/data/catalog/pocloud-opera-l3-dswx-s1-v1-1.0
- Product Specification Document for DSWx-S1, v1.0.0, D-108761 Rev A, 2024-08-16.
  https://d2pn8kiwq2w21t.cloudfront.net/documents/OPERA_DSWx-S1_Product_Spec_v1.0.0_D-108761_RevA_2024-08-16_.pdf
  **Located, not read in full.**
- Sentinel-1 orbit and IW parameters, Copernicus SentiWiki.
  https://sentiwiki.copernicus.eu/web/s1-mission

---

Related: [[NRT products]] | [[OPERA DSWx-HLS]] | [[Global Flood Monitoring (GFM)]] | [[SAR versus optical for flood extent]] | [[SAR]] | [[Wind compatibility]] | [[JRC Global Surface Water]] | [[Partial AOI coverage in Sentinel-2 scenes]] | [[Flood_mask_Dataset_MCDA]] | [[Agent Norwood - Satellite expert]] | [[Datasets-MOC]]
