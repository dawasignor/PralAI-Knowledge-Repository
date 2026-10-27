---
type: dataset
desc: NASA LANCE daily global flood map from VIIRS at 250 m - guaranteed daily coverage, but basin-scale resolution and an archive that only starts April 2025
aliases: [VIIRS NRT Flood, VCDWD, VCDWD_L3_NRT, VCDWDG_L3_NRT, VIIRS Global Flood Product]
keywords: [VIIRS, LANCE, NASA, near-real-time, flood, daily, hourly, composite, Suomi NPP, NOAA-20, recurring flood, screening]
agent: norwood
sensor: VIIRS
tier: nrt
modality: optical
producer: NASA LANCE
product_level: L3 daily/hourly composited flood map
spatial_resolution: ~250 m grid (VIIRS I-band native 375 m)
revisit: daily; hourly cumulative products through the day
latency: near real time; final daily product by end of day
coverage: global land
classes: 1-day, 1-day cloud-shadow-screened, 2-day, 3-day composites; recurring-flood classification (R1.1)
crs: geographic lat/lon (WGS 84)
tiling: 10 x 10 degree tiles, MODIS-style h/v naming (e.g. h09v05)
temporal_start: 2025-04
platform: [Suomi NPP, NOAA-20 (JPSS-1)]
orbit_type: sun-synchronous, near-circular polar
orbit_inclination_deg: 98.74
altitude_km: 824
local_solar_time: 13:30 ascending (10:30 LTDN)
swath_km: 3000
native_resolution_m: 375 (I-bands), 750 (M-bands)
licence: open, EOSDIS Data Use and Citation Guidance
access: LANCE servers, HDF5 and GeoTIFF; free Earthdata Login required
mcdm:
  spatial_resolution_m: 250
  native_footprint_m: 375
  readiness: 1
  revisit_days: 1
  latency_hours: 24
  spatial_coverage: global land
  temporal_start: 2025-04-01
  cloud_penetration: none
  light_independence: none
  derived_mask: true
  cost: free
  programmatically_fetchable: true
context: head
retrieval: Answer what the VIIRS NRT flood product gives, why multi-day compositing couples cloud tolerance to temporal precision, and why its April 2025 start rules it out for historical events.
validation_status: specification verified against the NASA Earthdata LANCE product page; accuracy figures not retrieved
source_url: https://www.earthdata.nasa.gov/data/instruments/viirs/near-real-time-data/nrt-global-flood-products
verified_on: 2026-09-05
status: draft
tags: [dataset, nrt, optical, viirs, flood-extent, lance, mcdm]
---

## What it is

The coarse-resolution, high-cadence corner of the tier. It trades two orders of
magnitude of area resolution for **daily, global, guaranteed** observation.

## Multi-day compositing, and the coupling it creates

Compositing is its answer to cloud, and it is the design feature worth
understanding. Four composites ship per file: 1-day, 1-day with cloud-shadow
screening, 2-day and 3-day. A 3-day composite accumulates cloud-free looks across
three passes, so it reports flooding no single day could see.

The cost is **temporal smearing**. A 3-day composite cannot date the flood to a
day, and it mixes water that appeared on day 1 with water that appeared on day 3.

**So revisit and cloud tolerance are not independent criteria for this
product — you buy one with the other.** Scoring them as separate, independently
weighted criteria in [[Flood_mask_Dataset_MCDA]] double-counts. The same applies
to [[MODIS NRT Flood Product]]. Flagged for [[Scoring criteria]].

Release 1.1 adds a **recurring-flood classification**, separating unusual
flooding from areas that flood routinely — a baseline the OPERA DSWx products do
not supply, which means this product reports something closer to flood *anomaly*
than raw water extent.

## Coordinate system

Geographic lat/lon on 10 × 10 degree tiles using the MODIS h/v naming convention
— deliberately grid-compatible with [[MODIS NRT Flood Product]] so the two
archives concatenate. Degrees, not metres: the same area-computation caveat as
[[Global Flood Monitoring (GFM)]].

## Afternoon only

VIIRS observes at ~13:30 local. MODIS historically gave both a morning (Terra)
and an afternoon (Aqua) look; the LANCE documentation notes this loss explicitly
as a quality reduction relative to the MODIS era. Two chances per day at a cloud
gap is materially better than one — and no current criterion expresses
"observations per day" as distinct from "revisit".

## Known limitations

- **250 m grid from 375 m native pixels.** A flooded street, a breached
  embankment, an inundated neighbourhood are all far below one pixel. This
  product answers "is this basin flooding" and cannot answer "which district
  flooded" — the question [[Agent Chanakya - City Planner]] needs. The 250 m grid
  is what is scored per [[Scoring criteria]] ruling 1; the 375 m native footprint
  is context only. Sharing MODIS's 250 m grid is deliberate — it is what lets the
  two archives concatenate, so ranking them apart on resolution would
  misrepresent them.
- **Optical: zero cloud penetration.** Compositing mitigates, it does not solve.
  The measured cost of the optical limitation is in
  [[SAR versus optical for flood extent]].
- **Very short archive: April 2025** — the shortest of any candidate here. For a
  historical thesis event before that date this product does not exist, and
  [[MODIS NRT Flood Product]] must be used instead.
- Daytime only, and now afternoon-only.

## Evaluation notes

Its case rests entirely on **guaranteed daily global coverage at zero cost**.
Where the SAR products have nothing until the next orbit pass, this has something
every day.

Its case collapses on **resolution** for any city-scale impact assessment, and on
**archive length** for a historical event.

**Sensible role: a screening layer** — cheap, always available, used to establish
that flooding is occurring and roughly where, before a high-resolution SAR
product is retrieved for detail.

That is a different *function* from the one the other candidates perform, and it
exposes a structural question for [[Flood_mask_Dataset_MCDA]]: if the MCDM ranks
a single winner, a screening layer will never be selected, however useful it is.
Whether the task is "rank one best product" or "select a complementary set" is
not yet decided.

## Sources

- NRT Global Flood Products, NASA Earthdata / LANCE.
  https://www.earthdata.nasa.gov/data/instruments/viirs/near-real-time-data/nrt-global-flood-products
- Suomi NPP mission and VIIRS instrument specification, eoPortal.
  https://www.eoportal.org/satellite-missions/suomi-npp

---

Related: [[NRT products]] | [[MODIS NRT Flood Product]] | [[SAR versus optical for flood extent]] | [[Cloud compatibility]] | [[Global Flood Monitoring (GFM)]] | [[Flood_mask_Dataset_MCDA]] | [[Scoring criteria]] | [[Agent Chanakya - City Planner]] | [[Agent Norwood - Satellite expert]] | [[Datasets-MOC]]
