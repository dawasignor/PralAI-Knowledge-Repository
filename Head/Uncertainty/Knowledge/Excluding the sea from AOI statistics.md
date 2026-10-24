---
type: uncertainty
uncertainty_kind: knowledge
desc: Why a coastal bounding box must have the sea removed before any statistic is reported, and which denominator every figure then uses
aliases: [sea exclusion, ocean mask, land mask, coastal AOI, land_area_km2, exclude_water, water body mask]
keywords: [sea, ocean, land mask, WBM, water body mask, coastal, bbox, denominator, land_area_km2, bbox_area_km2, exclude_water, Colombo, Kelani, permanent water, NDVI over water, slope over water]
sensor: Copernicus DEM GLO-30 Water Body Mask
workflows: [fetch_lulc_data, fetch_terrain_data, fetch_permanent_water]
source_of_truth: core/workflows/landmask.py in langgraph-agents
source_docs: [docs/SOURCES.md, CLAUDE.md EO rule 9]
context: head
retrieval: Answer why the sea is excluded from an AOI's statistics, which water classes are removed and which are kept, what land_area_km2 means, and what happens to each layer if the sea is left in.
validation_status: measured over the Kelani AOI on 2026-09-22; class codes verified against the data
status: draft
tags: [uncertainty, aoi, coastal, denominator, water]
---

## Answer in one line

A bounding box is a rectangle and a coastline is not, so any coastal AOI
contains sea; the sea is removed from every layer before anything is counted,
and **`aoi.area_km2` thereafter means the LAND area**, not the box.

## Why it cannot be left in

Sea is not a land cover. It is not a slope, an elevation, or a greenness. Left
inside the box it corrupts each layer in its own way, and none of the results
look broken:

| Layer | What the sea does to it |
|---|---|
| Sentinel-2 indices | Open water has NDVI near zero and a saturated MNDWI, dragging every composition figure toward values that describe the ocean |
| Copernicus GLO-30 | Sea is flat and at zero elevation, so it inflates the "flat" slope class and pulls the elevation distribution to zero |
| JRC surface water | **The sea is water in 100% of observations, so it is classed PERMANENT** |

The third is the severe one. Measured over the Kelani AOI
(`[79.800, 6.783, 80.217, 7.083]`):

| | "Permanent water" |
|---|---|
| Sea left in | **214.47 km2** -- 13.9% of the box |
| Sea excluded | **1.66 km2** -- 0.125% of the land |

A flood baseline meant to say how much of the catchment is normally wet would
have been reporting the Indian Ocean, and that figure feeds the look-alike
floor in the flood-mapping outlook.

**A box that looks inland can still be contaminated.** The project's earlier
AOI (west edge 79.867) clipped only a sliver of coast, and 2.05 km2 of its
3.6958 km2 of reported permanent water was still sea -- 55% of the figure.

## What is removed, and what is deliberately not

The mask is the Copernicus DEM Water Body Mask -- same bucket as GLO-30, same
lattice, no new dataset. Codes: 0 land, 1 ocean, 2 lake, 3 river.

**Only `ocean` is excluded by default, and that is a judgement, not an
oversight.** A lake and a river are part of a catchment; the Kelani's own
channel is code 3, and dropping it would delete the river from a river-basin
study. The `exclude_water` parameter is what says so out loud, so a caller who
wants inland water gone has to ask for it. A class name the mask does not know
is refused rather than ignored -- a typo that silently excludes nothing is a
mask that is quietly not there.

## The denominator, which is the part that goes wrong

Three areas are in play and **only two of them are denominators**:

| Key | What it is | A denominator? |
|---|---|---|
| `aoi.bbox_area_km2` | the rectangle that was requested | **No.** Context only. |
| `aoi.area_km2` = `aoi.land_area_km2` | the land in it -- the reporting domain | **Yes** |
| `observation_basis.observed_area_km2` | that land, minus cloud and shadow | **Yes** |

On the Kelani AOI the box is 1,536 km2 and the land is 1,321 km2. Dividing by
the box understates every fraction by 14% uniformly -- large enough to matter
and consistent enough to look like a real result.

**Cloud and sea are different absences and must never be added.** Cloud is an
observation failure over ground that exists and could have been measured; sea
is ground outside the analysis. The sea is already out of every denominator, so
`observation_basis` describes the cloud gap alone. Sea area comes from
`aoi.land`, labelled as excluded -- never as "unobserved". Figures follow the
same rule: the sea is drawn as sea, with its own legend entry, distinct from
the white of a cloud gap.

## Reprojection happens here, and only here

The repo carries no reprojection stack, because Sentinel-2's own grids are
exact multiples in one CRS. **That argument does not reach across archives.**
The mask is EPSG:4326 at one arc second; a Sentinel-2 plan is UTM at 20 m, and
no decimation makes those one lattice. So the mask is warped with
nearest-neighbour -- a categorical mask, by a method that cannot invent a class
-- and the coastline is accurate to about one 30 m source pixel. Measured: the
land area comes to 1,320.71 km2 on the UTM grid against 1,324.11 km2 computed
natively, a 0.26% difference.

## What this does not fix

The mask says where the sea is, not where the tidal reach ends. A coastal
lagoon or an estuary connected to the sea is classed ocean and is therefore
excluded, even though it floods. If an analysis needs the tidal zone, that is a
separate decision and a separate mask -- not a loosening of this one.

---

Related: [[Uncertainty Analysis - MOC]] | [[Copernicus DEM GLO-30]] | [[JRC Global Surface Water]] | [[Partial AOI coverage in Sentinel-2 scenes]] | [[Norwood pre-flood AOI brief schema]] | [[Monty data workflows]] | [[Sentinel-2 LULC uncertainty fields]] | [[Scene usability - SCL valid fraction]]
