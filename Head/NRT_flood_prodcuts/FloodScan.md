---
type: dataset
desc: AER commercial passive-microwave daily flood fraction from 1998 - the only deep archive at daily cadence, but coarse in reality, geographically partial and paid
aliases: [FloodScan, AER FloodScan, SFED, MFED, flood fraction]
keywords: [passive microwave, radiometer, all-sky, flood fraction, AER, daily, historical archive, SFED, MFED, commercial, emissivity, downscaled]
agent: norwood
sensor: multiple passive-microwave radiometers - instrument list UNVERIFIED
tier: nrt
modality: passive-microwave
producer: Atmospheric and Environmental Research (AER)
product_level: L3 daily flood fraction
spatial_resolution: 90 m grid from AER (licensed) or ~10 km from HDX (free); ~10 km native footprint
revisit: daily
latency: not published
coverage: Africa, South America, North America to 55N, Asia-Australia to 55N and 50E - NOT global
classes: SFED, MFED, NDT-SFED, NDT-MFED, LWMASK, WWMASK; derived ACC, NDAYS, DEPTH, AREA
crs: UNVERIFIED - not stated in the vendor documentation read
tiling: none stated
temporal_start: 1998-01-01
platform: multiple, no single platform
orbit_type: sun-synchronous (typical for this instrument class)
orbit_inclination_deg: null
swath_km: null
licence: commercial subscription (~USD 25,000/yr; bulk historical USD 10,000-75,000)
access: AER subscription; a derived subset is redistributed on HDX
mcdm:
  spatial_resolution_m: null
  spatial_resolution_m_by_distribution:
    aer_licensed: 90
    hdx_free: 10000
  native_footprint_m: 10000
  readiness: 1
  revisit_days: 1
  latency_hours: null
  spatial_coverage: partial - excludes Europe and all land above 55N
  temporal_start: 1998-01-01
  cloud_penetration: full
  light_independence: full
  derived_mask: true
  cost: commercial
  programmatically_fetchable: false
context: head
retrieval: Answer what FloodScan measures, why its stated 90 m resolution is a posting rather than resolved detail, where it does not cover, and why its 1998 archive is still its strongest argument.
validation_status: specification from vendor documentation and the HDX record; instrument list, CRS and true footprint not verified - the source paper is located but unread
source_url: https://published.aer.com/floodscan/aer_floodscan_support.html
verified_on: 2026-09-05
status: draft
tags: [dataset, nrt, passive-microwave, flood-fraction, commercial, mcdm]
---

## What it is

The outlier in this tier on three axes at once: **passive microwave** rather than
SAR or optical, **commercial** rather than free, and **geographically partial**
rather than global.

It measures **flood fraction**, not flood extent — SFED (Standard Flood Extent
Depiction) is the fraction of a cell that is inundated, 0–100%, with MFED as the
second primary depiction.

**That is a different quantity from a binary mask, and it normalises
differently.** A fraction is already a continuous 0–1 criterion; an extent mask
is a set of pixels. Before FloodScan enters [[Flood_mask_Dataset_MCDA]] alongside
the extent products, [[Scoring criteria]] has to say what is being compared.

The physical basis is emissivity: standing water changes surface emission
sharply at microwave frequencies, which is why the retrieval works through cloud
and at night — like SAR, but without SAR's geometric distortions. There is no
layover and no radar shadow. The trade is footprint.

## Its real argument: the archive

**Daily, continuous, from 1998.** No other near-real-time flood product reaches
back further than 2015 — [[MODIS NRT Flood Product]] gets to 2003,
[[Global Flood Monitoring (GFM)]] to 2015, and the OPERA pair to 2016 and 2023.

For a historical event, or for establishing what *normal* inundation looks like
at an AOI across decades, nothing else competes.

## Resolution: two distributions, and a footprint that is context only

Per [[Scoring criteria]] rulings 1 and 1b, **the shipped grid is scored** — that
is what gets used for mapping and impact analysis. The native footprint is
recorded as information and carries **no penalty**.

For FloodScan "shipped" depends on how you get it:

| Distribution | Shipped grid | Terms |
|---|---|---|
| AER direct | 90 m (SFED, MFED) | commercial, ~USD 25,000/yr |
| HDX redistribution | 0.083° ≈ 10 km | free |

Both sit in `mcdm.spatial_resolution_m_by_distribution`;
`mcdm.spatial_resolution_m` is `null` and the availability filter resolves it at
run time. **Without a licence the reachable product is the ~10 km HDX grid**, so
the scored value lands near the footprint anyway — for a licensing reason, not a
physical one.

**As context, not as a score:** the radiometer's native footprint is of order
**10 km**, so the 90 m grid is downscaled rather than resolved. Two adjacent
90 m cells are not independent observations. That figure is the instrument
class, not a published number — confirm against Galantowicz et al. below before
citing it.

## Known limitations

- **Coverage is not global**, and the exclusions are structural: no Europe, no
  land above 55N, Asia-Australia only east of 50E. For a European AOI this
  product does not exist.
- **Commercial licensing** — a subscription is ~USD 25,000/year. A hard gate on
  availability, not a soft cost: if the pipeline cannot fetch it, its other
  scores are academic. `programmatically_fetchable: false`.
- **Resolution**, as above.
- **Instrument list unverified.** The vendor page read did not name the
  radiometers, so `sensor` and `orbit_inclination_deg` are left unset rather than
  guessed. FloodScan is a multi-sensor blend, so a single inclination may not be
  a meaningful field for it at all.
- **CRS not stated** in the documentation read.

## Evaluation notes

Two things it wins outright — **daily cadence** and a **1998 archive** — and both
are dimensions where every other candidate in this tier is weak.

Against that: commercial, geographically partial, and its effective resolution is
far coarser than its stated posting. For a city-scale assessment a ~10 km native
footprint cannot resolve which neighbourhoods flooded, which is the question
[[Agent Citadel - City Planner]] is actually asking.

**Realistic role: temporal context rather than event mapping** — establishing
flood recurrence and baseline inundation at an AOI, against which a
high-resolution SAR observation of one event is interpreted. That is closer to
what [[JRC Global Surface Water]] does for permanent water, on a different axis.

## Sources

- AER FloodScan support and product documentation.
  https://published.aer.com/floodscan/aer_floodscan_support.html
- FloodScan: Near Real-Time and Historical Flood Mapping, HDX dataset record.
  https://data.humdata.org/dataset/floodscan
- Galantowicz et al., "A multi-sensor data-driven methodology for all-sky passive
  microwave inundation retrieval." https://arxiv.org/pdf/1807.03803
  **Located, not read.** This is the likely source for the instrument list and
  the true footprint — read it before resolution is scored.

---

Related: [[NRT products]] | [[MODIS NRT Flood Product]] | [[Global Flood Monitoring (GFM)]] | [[Scoring criteria]] | [[Flood_mask_Dataset_MCDA]] | [[JRC Global Surface Water]] | [[Agent Citadel - City Planner]] | [[Agent Norwood - Satellite expert]] | [[Datasets-MOC]]
