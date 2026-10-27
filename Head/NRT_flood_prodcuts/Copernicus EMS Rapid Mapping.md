---
type: dataset
desc: Copernicus EMS on-demand analyst-validated delineation and damage grading - the highest quality output in the tier and the least available, existing only where an activation was triggered
aliases: [Copernicus EMS Rapid Mapping, CEMS Rapid Mapping, EMSR, EMS Rapid Mapping, Copernicus Emergency Management Service, rapid mapping activation]
keywords: [copernicus, EMS, activation, on-demand, delineation, grading, first estimate, analyst, vector, emergency, ground truth, damage grade]
agent: norwood
sensor: mixed optical and SAR, tasked per activation
tier: nrt
modality: multi
producer: Copernicus Emergency Management Service (European Commission / JRC), via contracted mapping providers
product_level: analyst-validated vector delineation and damage grading
spatial_resolution: driven by the tasked imagery, not fixed by the product
revisit: none - on demand, activation-triggered only
latency: Situational Reporting within 4 h of activation; Service Level 1 delivery 2-12 h after image reception
coverage: only the AOIs of a triggered activation
classes: First Estimate (FEP), Delineation (DEL), Grading (GRA), Reference (REF), Situational Reporting (SR)
crs: UNVERIFIED - not stated on the pages read
tiling: none; per-AOI map products
temporal_start: 2012 (service operational)
platform: multiple - Copernicus Contributing Missions, commercial optical and SAR
orbit_type: n/a - not a single-platform product
orbit_inclination_deg: null
swath_km: null
licence: Copernicus free and open (confirm terms per activation)
access: Rapid Mapping portal, public activations API, ZIP download; COG raster and Vector Tiles
mcdm:
  spatial_resolution_m: null
  readiness: 1
  revisit_days: null
  latency_hours: 12
  spatial_coverage: activation-only
  temporal_start: 2012-01-01
  cloud_penetration: partial
  light_independence: partial
  derived_mask: false
  cost: free
  programmatically_fetchable: false
context: head
retrieval: Answer why EMS Rapid Mapping is an on-demand service rather than a systematic product, why availability is a precondition and not a tradeable criterion, and why its grading product is unique in this tier.
validation_status: product types and access verified against the Copernicus EMS Rapid Mapping portal; the 2-12 h delivery figure is from secondary summaries and needs confirming against the Rapid Mapping Manual
source_url: https://mapping.emergency.copernicus.eu/about/rapid-mapping-portfolio/
verified_on: 2026-09-05
status: draft
tags: [dataset, nrt, multi-sensor, on-demand, copernicus, ground-truth, mcdm]
---

## This is not a dataset in the sense the other six are

The other six are **systematic** products: given a coordinate and a date, you can
ask whether an observation exists. Rapid Mapping is an **on-demand service**. It
produces output only where an Authorised User triggered an activation, and
nowhere else.

For an AOI without an activation, no amount of favourable scoring on resolution
or accuracy matters — the product does not exist there. That is why
`programmatically_fetchable: false` is in the `mcdm` block, and it is the field
[[Agent Norwood - Satellite expert]] should check first for this candidate.

## Five product types

| Type | What it gives |
|---|---|
| First Estimate (FEP) | Fast, rough assessment of worst-affected locations from the earliest post-event image |
| Delineation (DEL) | Geographic extent of the event; monitoring updates on request |
| Grading (GRA) | Damage grade and its spatial distribution — a superset of delineation |
| Reference (REF) | Pre-event territory and assets, for non-European activations |
| Situational Reporting (SR) | Online report within 4 h of activation start, updated through the activation |

**Grading is unique in this tier.** Every other candidate answers "where is the
water". Grading answers "how badly is it damaged" — an impact assessment, not a
flood mask. That is the output [[Agent Chanakya - City Planner]] ultimately needs,
and no algorithmic product here produces it. It is also the closest thing in the
tier to what [[flood_damage_query]] is reaching for.

Products are analyst-produced under 24/7/365 service, which is why accuracy is
high and why it cannot be scaled or automated. Delivery is COG for rasters and
Vector Tiles for thematic layers, packaged as ZIP; a public API exposes
activation metadata at
`https://rapidmapping.emergency.copernicus.eu/backend/dashboard-api/public-activations-info/`.

## Known limitations

- **Coverage is activation-only.** The dominant constraint, and it is binary.
- **Cannot be tasked by this system.** Activation requires an Authorised User —
  national civil protection authorities, EU bodies and similar. A thesis agent
  cannot trigger one.
- **Only large-scale emergencies are in scope**; small events are rejected.
- **No systematic revisit.** Monitoring updates happen if requested, on no fixed
  cadence.
- **Resolution and modality vary per activation**, so `spatial_resolution_m` is
  genuinely `null` rather than merely unverified — there is no single value to
  record. Any normalisation must handle a missing value here, not impute one.
- **CRS not stated** on the pages read.

## Why it breaks a compensatory MCDM

It should score at or near the top on accuracy and be effectively disqualified on
availability for any AOI without an activation.

Under a compensatory aggregation — a weighted sum — **a very high accuracy score
offsets a low availability score, and the model recommends a product that does
not exist for the user's AOI.** Availability here is not a criterion to be traded
off; it is a **precondition**.

Two defensible treatments, and [[Flood_mask_Dataset_MCDA]] must choose one:

1. **Filter before scoring.** A hard availability gate, so Rapid Mapping enters
   the MCDM only when an activation covering the AOI and date exists.
2. **Use a non-compensatory aggregation**, where a near-zero criterion propagates
   rather than being averaged away.

Option 1 is cleaner and is the natural output of the temporal-availability work:
the public activations API can be queried for the event AOI and date directly,
turning availability into a **fact rather than a score**. Worth carrying into
[[Sensitivity Analysis]] and [[SMAA]] too — a candidate that is present or absent
rather than better or worse does not behave like the others under weight
perturbation.

## Useful even when it is not a candidate

Where an activation *does* exist for the thesis event, its analyst-validated
delineation is the closest thing available to **ground truth for benchmarking the
other six products**. That is a validation role, not a candidate role, and it is
probably the more valuable one for the thesis.

## Sources

- Rapid Mapping for Emergency Response Portfolio, Copernicus EMS On Demand
  Mapping. https://mapping.emergency.copernicus.eu/about/rapid-mapping-portfolio/
- Emergency Response data (formats and API access), Copernicus EMS.
  https://mapping.emergency.copernicus.eu/about/how-to-harvest-cems-mapping-data/emergency-response-data/
- Copernicus EMS Rapid Mapping flyer, 2021.
  https://cems-mapping-website.s3.amazonaws.com/media/documents/CEMS_FlyerRapidMapping_2021_iAUmJY7.pdf
  **Located; text extraction incomplete.** The 2–12 h Service Level 1 delivery
  figure comes from secondary summaries — confirm against the Rapid Mapping
  Manual before citing it in the thesis.

---

Related: [[NRT products]] | [[Global Flood Monitoring (GFM)]] | [[Flood_mask_Dataset_MCDA]] | [[SMAA]] | [[Sensitivity Analysis]] | [[Scoring criteria]] | [[flood_damage_query]] | [[Agent Chanakya - City Planner]] | [[Agent Norwood - Satellite expert]] | [[Datasets-MOC]]
