---
type: moc
desc: The six near-real-time flood products Norwood ranks in the flood-mask MCDM, with their metadata side by side
aliases: [NRT products, NRT flood products, near real time flood products, flood mask candidates, Tier 1 products]
keywords: [NRT, near real time, flood product, flood mask, candidate, MCDM, MCDA, GFM, DSWx, VIIRS, MODIS, EMS, comparison, revisit, latency, resolution, excluded candidates]
agent: norwood
context: head
retrieval: Answer which near-real-time flood products are candidates, and compare their modality, resolution, revisit, latency, projection, archive start and cost.
validation_status: all six specifications verified against primary product documentation on 2026-09-05; FloodScan withdrawn from the candidate set 2026-09-21; accuracy figures not yet retrieved for any of them
verified_on: 2026-09-05
status: draft
tags: [moc, dataset, nrt, mcdm]
---

The candidate set for [[Flood_mask_Dataset_MCDA]]. Each note carries its full
specification in frontmatter so one read answers a whole MCDM query.

- [[Global Flood Monitoring (GFM)]] — SAR, 20 m, ensemble, 8 h latency
- [[OPERA DSWx-S1]] — SAR, 30 m, MGRS, short archive
- [[OPERA DSWx-HLS]] — optical, 30 m, grid-aligned with DSWx-S1
- [[VIIRS NRT Flood Product]] — optical, 250 m, daily, archive from 2025
- [[MODIS NRT Flood Product]] — optical, 250 m, daily, archive from 2003
- [[Copernicus EMS Rapid Mapping]] — on-demand, analyst-validated, activation-only

## Excluded candidates

**FloodScan — withdrawn 2026-09-21.** Passive microwave, daily since 1998,
commercial. It was the seventh candidate and is not scored, ranked or carried
into any result.

A thesis has to be able to say why a candidate set is the set it is, so the
withdrawal is recorded here rather than left as an absence. What dropping it
costs, stated plainly:

- **The longest archive in the set.** FloodScan reached back to 1998; the next
  longest is [[MODIS NRT Flood Product]] at 2003. Any event before 2003 now has
  no candidate at all.
- **The only passive-microwave modality**, so the remaining set is entirely SAR
  and optical, and shares their weather and illumination constraints.

What dropping it removes, also plainly:

- The only flood-*fraction* product, which closed the mixed-quantity
  normalisation blocker in [[Scoring criteria]].
- The only product whose shipped grid depended on the licence, which retired
  ruling 1b.
- The only product with no mechanism note in this vault.

## Comparison matrix

**Resolution is the shipped grid**, per [[Scoring criteria]] ruling 1 — the cell
size as delivered, because that is what mapping and impact analysis operate on.
Where the instrument's native footprint is coarser, it is shown in brackets as
**context only; it carries no penalty**.

**Ready** is [[Readiness to use]]: 1 = a finished flood layer, 2 = needs a
permanent-water baseline subtracted before it means flood.

| Product | Modality | Res. (native) | Revisit | Latency | CRS | Archive from | Ready | Cost |
|---|---|---|---|---|---|---|---|---|
| [[Global Flood Monitoring (GFM)]] | SAR | 20 m | 6–12 d | ≤ 8 h | EPSG:4326 | 2015 | 1 | free |
| [[OPERA DSWx-S1]] | SAR | 30 m | 6–12 d | NRT, ? | UTM / MGRS | 2023-12 | 2 | free |
| [[OPERA DSWx-HLS]] | optical | 30 m | 2–3 d\* | ? | UTM / MGRS | 2016 | 2 | free |
| [[VIIRS NRT Flood Product]] | optical | 250 m (375 m) | 1 d | ~24 h | lat/lon | 2025-04 | 1 | free |
| [[MODIS NRT Flood Product]] | optical | 250 m | 1 d | ? | lat/lon | 2003 | 1 | free |
| [[Copernicus EMS Rapid Mapping]] | mixed | varies | — | 2–12 h | ? | 2012 | 1 | free |

`?` means not yet verified. `—` means not applicable.

**\* One trap remains in this table.** DSWx-HLS revisit is an *acquisition*
cadence, not an observation cadence — measured over Shillong, 0 of 13 scenes in
90 days reached a 0.9 AOI valid fraction. See
[[SAR versus optical for flood extent]]. Do not score revisit off this cell
without that.

**Stated limitation, not modelled:** nothing in the scoring distinguishes a
genuinely resolved cell from one posted finer than the sensor resolves.
[[VIIRS NRT Flood Product]] ships 250 m from a 375 m I-band, so its cells are
treated as carrying information comparable to [[MODIS NRT Flood Product]]'s when
they do not. Ruled acceptable 2026-09-05; unchanged by the FloodScan withdrawal,
which removed the worst instance but not the problem.

## Platform orbital parameters

Carried in each note's frontmatter. Verified 2026-09-05.

| Platform | Inclination | Altitude | Crossing (local) | Used by |
|---|---|---|---|---|
| Sentinel-1 | 98.18° | 693 km | 18:00 asc | GFM, DSWx-S1 |
| Sentinel-2 | 98.62° | 786 km | 10:30 desc | DSWx-HLS |
| Landsat 8/9 | 98.2° | 705 km | 10:12 desc | DSWx-HLS |
| Terra | 98.5° | 705 km | 10:30 desc | MODIS NRT |
| Aqua | 98.2° | 705 km | 13:30 asc | MODIS NRT |
| Suomi NPP | 98.74° | 824 km | 13:30 asc | VIIRS NRT |

Sentinel-1 IW incidence angle is 29.1–46.0°, swath 250 km — the geometry behind
[[Wind compatibility]] and [[Bragg Scattering Criterion]].

Rapid Mapping has no single platform, so its orbital fields are `null` in its
note rather than blank. The distinction is deliberate: **blank means
unverified, `null` means the field does not apply.**

## Frontmatter convention

Each note carries, beyond the vault's usual fields:

- **Retrieval** — `aliases`, `keywords`, `retrieval`, and the official collection
  ID where one exists (e.g. `OPERA_L3_DSWX-HLS_V1`), so a query using either the
  common name or the archive ID resolves.
- **Platform** — `orbit_inclination_deg`, `altitude_km`, `local_solar_time`,
  `incidence_angle_deg`, `swath_km`, plus `crs` and `tiling`.
- **`mcdm:`** — the criterion **values**. `spatial_resolution_m` is always the
  shipped grid and is the field scored; `native_footprint_m` appears only where
  the instrument resolves coarser than the grid, so its presence is itself the
  flag, and it is never scored. `spatial_resolution_m_by_distribution` replaces
  the scalar where the grid depends on how the product is obtained, in which
  case `spatial_resolution_m` is `null` and the availability filter resolves it.
  `readiness` is the 1–4 scale in [[Readiness to use]]. A `*_caveat` key is
  added wherever a value would be misread on its own.

**The `mcdm` block holds values, never scores.** [[Scoring criteria]] does not
yet define a scale, so any score written here would be invented rather than
sourced.

## Date reconciliation

The earlier draft of this note recorded GFM as "from year 2021". Both dates are
correct for different things: the GFM **service** launched publicly in October
2021, and the **archive** was reprocessed back to **1 January 2015**. For MCDM
availability the archive date governs — use 2015.

## Questions these notes raised, and how they were ruled

Settled with the user 2026-09-05. Full text in [[Scoring criteria]].

| # | Question | Ruling |
|---|---|---|
| 1 | Resolution: shipped grid or native footprint? | **Shipped grid**, always — reversed from an earlier ruling the same day. Native footprint is context only and carries no penalty |
| 1b | ~~Which FloodScan distribution counts as "shipped"?~~ | **RETIRED 2026-09-21** — FloodScan withdrawn from the candidate set. Numbering kept so cross-references do not break |
| 2 | Availability traded off, or a precondition? | **Filter first.** Prune candidates on availability before scoring |
| 3 | Best product depends on event date | **Same filter**, extended to time. Implementation follows the pruning work |
| 4 | Processing hiding sensor weakness | **OPEN — TODO.** See [[Sensor limits versus processing gains]] |
| 5 | Surface water is not flood | **New criterion added:** [[Readiness to use]] |

**Ruling 4 is the live one.** The user's extension: this is not only the
compositing in [[MODIS NRT Flood Product]] and [[VIIRS NRT Flood Product]]. GFM's
three-algorithm ensemble, the HLS harmonisation behind DSWx-HLS's 2–3 day
revisit, and CEMS Rapid Mapping's multi-mission tasking with human analysts are
all processing that covers a sensor weakness. Credit the sensor and the delivered
product as independent criteria and the same design choice is counted twice.
**Settle it before weights are set.**

One gap remains beyond the five: **no accuracy figures** have been retrieved for
any of the six, so that criterion cannot be scored yet. Published figures are
still missing; one **measured agreement** exists -- GFM against the UNOSAT
reference for the Kelani event -- see [[Validation against the UNOSAT reference]].
OPERA is pending data access, and MODIS and VIIRS have no archive for that event.

The second gap — no passive-microwave mechanism note in this vault — **closed
with the withdrawal of FloodScan**, which was the only product whose physics had
nothing to link to. Every remaining candidate is SAR or optical, and both have
mechanism notes.

---

Related: [[Datasets-MOC]] | [[Head-MOC]] | [[SAR versus optical for flood extent]] | [[SAR]] | [[Cloud compatibility]] | [[Wind compatibility]] | [[Bragg Scattering Criterion]] | [[Scene usability - SCL valid fraction]] | [[Flood_mask_Dataset_MCDA]] | [[Scoring criteria]] | [[SMAA]] | [[Sensitivity Analysis]] | [[Agent Norwood - Satellite expert]] | [[Entro - Uncertainty Analyser]] | [[Agent Chanakya - City Planner]]
