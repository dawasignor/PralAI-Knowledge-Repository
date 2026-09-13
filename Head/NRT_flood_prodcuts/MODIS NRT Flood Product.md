---
type: dataset
desc: NASA LANCE daily global flood map from Terra and Aqua MODIS at 250 m - a two-decade archive on ageing platforms, and the only free candidate covering most historical events
aliases: [MODIS NRT Flood, MCDWD, MCDWD_L3_NRT, MCDWD_L3, MODIS Global Flood Product]
keywords: [MODIS, LANCE, MODAPS, NASA, near-real-time, flood, daily, composite, Terra, Aqua, legacy, orbital drift, archive]
agent: norwood
sensor: MODIS
tier: nrt
modality: optical
producer: NASA LANCE MODIS at MODAPS
product_level: L3 daily gridded flood/water composite
spatial_resolution: 250 m
revisit: daily; Terra morning and Aqua afternoon - two looks per day
latency: near real time, no committed figure published
coverage: global land
classes: 1-day, 2-day and 3-day composites
crs: geographic lat/lon (WGS 84), linear latitude/longitude projection
tiling: 10 x 10 degree tiles, h/v naming
temporal_start: 2021-03-01 (MCDWD_L3_NRT record); reprocessed archive MCDWD_L3 covers 2003-2025
platform: [Terra (EOS AM-1), Aqua (EOS PM-1)]
orbit_type: sun-synchronous circular
orbit_inclination_deg: 98.5 (Terra), 98.2 (Aqua)
altitude_km: 705
local_solar_time: 10:30 descending (Terra), 13:30 ascending (Aqua)
swath_km: 2330
native_resolution_m: 250 (bands 1-2), 500 (bands 3-7), 1000 (bands 8-36)
licence: open, EOSDIS Data Use and Citation Guidance
access: NASA LANCE; HDF-EOS per tile per day, GeoTIFF for the flood layers
mcdm:
  spatial_resolution_m: 250
  readiness: 1
  revisit_days: 1
  observations_per_day: 2
  latency_hours: null
  spatial_coverage: global land
  temporal_start: 2003-01-01
  temporal_start_note: via the reprocessed MCDWD_L3 collection; the NRT collection itself starts 2021-03-01
  cloud_penetration: none
  light_independence: none
  derived_mask: true
  cost: free
  programmatically_fetchable: true
context: head
retrieval: Answer what the MODIS NRT flood product gives, why its 2003 archive makes it the default for historical events, and why platform ageing and orbital drift limit its future.
validation_status: specification verified against the NASA Earthdata catalogue record; the LANCE user guide located but not read, so flag values and accuracy are unrecorded
source_url: https://www.earthdata.nasa.gov/data/catalog/lancemodis-mcdwd-l3-nrt-6.1
verified_on: 2026-09-05
status: draft
tags: [dataset, nrt, optical, modis, flood-extent, lance, mcdm]
---

## What it is

Functionally the predecessor of [[VIIRS NRT Flood Product]]: same 250 m posting,
same 10 × 10 degree lat/lon tiling with h/v naming, same 1/2/3-day compositing
strategy against cloud. The two are designed to concatenate.

## Its advantage is the archive, and it is a large one

The reprocessed collection `MCDWD_L3` covers **2003–2025**; forward NRT
production continues under `MCDWD_L3_NRT`.

Against VIIRS's April 2025 start, GFM's 2015 and the OPERA pair's 2016 and 2023,
MODIS is **the only free candidate with a two-decade record at daily cadence**.
For a historical flood event it is frequently the only free product that covers
the date at all.

**Two collections, two names.** `MCDWD_L3` (reprocessed archive) and
`MCDWD_L3_NRT` (forward NRT) are separate collections, and both are in `aliases`.
An agent resolving a historical event **must query the archive collection** — the
NRT collection will not have it. This is a concrete retrieval trap:
`temporal_start` in frontmatter records the NRT record's own stated coverage
(2021-03-01), while `mcdm.temporal_start` records what is reachable across both
(2003).

## Twice-daily observation

Terra crosses at ~10:30 descending, Aqua at ~13:30 ascending, so MODIS gets a
morning and an afternoon look — two independent chances per day of a cloud gap.
A genuine advantage over VIIRS, recorded as `mcdm.observations_per_day`, which no
criterion currently consumes.

## Known limitations

- **The platforms are old and the product is sunsetting.** Terra and Aqua have
  operated far beyond design life and their orbits have drifted, moving equator
  crossing times away from nominal and changing illumination geometry across the
  archive. That is a **consistency** problem for any long time series drawn from
  it, and it is why VIIRS exists as the successor. Availability should not be
  scored on the archive alone without weighing that forward availability is
  ending.
- **250 m** — basin-scale, not district-scale. Same argument as VIIRS.
- **Optical: no cloud penetration.** Compositing trades temporal precision for
  cloud tolerance, so revisit and cloud tolerance are coupled here too — see
  [[VIIRS NRT Flood Product]] and [[SAR versus optical for flood extent]].
- **The NRT collection is described as a beta version** on the Earthdata record.
- **No committed latency figure**; left `null` rather than guessed.

## Evaluation notes

Ranks almost identically to [[VIIRS NRT Flood Product]] on every physical
criterion — same resolution, same cadence, same cloud problem, same coverage,
same cost. The MCDM will not separate them on those.

They separate on **time**, in opposite directions:

- MODIS has the archive (2003) and a shortening future.
- VIIRS has no archive (2025) and the future.

**That makes the choice between them a function of the event date, not of
intrinsic product quality.** This is the structural point for
[[Flood_mask_Dataset_MCDA]]: a static criteria table cannot express "the best
product depends on when the flood happened". Either the event date enters as a
filter before scoring, or availability must be computed per event rather than
read from frontmatter.

That is exactly what the temporal-availability work will resolve — whether a
given product actually covers the AOI and date the user specified.

## Sources

- MODIS/Aqua+Terra Global Flood Product L3 NRT 250m, NASA Earthdata catalogue.
  https://www.earthdata.nasa.gov/data/catalog/lancemodis-mcdwd-l3-nrt-6.1
- NASA LANCE MODIS Global Flood Product, LAADS description.
  https://www.earthdata.nasa.gov/s3fs-public/2026-04/MCDWD_LAADS_Desc.pdf
  **Located, not read in full.**
- LANCE MODIS Flood Product User Guide, Rev A.
  https://www.earthdata.nasa.gov/s3fs-public/2022-02/MCDWD_UserGuide_RevA.pdf
  **Located, not read.** Should carry the flag values and class definitions;
  read before accuracy is scored.
- Terra mission and MODIS instrument specification, eoPortal.
  https://www.eoportal.org/satellite-missions/terra

---

Related: [[NRT products]] | [[VIIRS NRT Flood Product]] | [[FloodScan]] | [[SAR versus optical for flood extent]] | [[Cloud compatibility]] | [[Flood_mask_Dataset_MCDA]] | [[Scoring criteria]] | [[Agent Norwood - Satellite expert]] | [[Datasets-MOC]]
