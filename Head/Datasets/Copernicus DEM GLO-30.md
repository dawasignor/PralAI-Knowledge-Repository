---
type: dataset
desc: 30 m global elevation model on AWS Open Data, source for slope and terrain statistics, and for the Water Body Mask that rules the sea out of an AOI
aliases: [GLO-30, Copernicus DEM, COP-DEM, TanDEM-X DEM, Water Body Mask, WBM]
keywords: [DEM, elevation, slope, GLO-30, Copernicus, TanDEM-X, DSM, water body mask, WBM, ocean, land mask, pixel-is-point, tile, mosaic, EPSG:4326, arc second]
sensor: TanDEM-X
workflows: [fetch_terrain_data, land mask for fetch_lulc_data and fetch_permanent_water]
source_of_truth: core/workflows/terrain.py and core/workflows/landmask.py in langgraph-agents
context: head
retrieval: Answer what the Copernicus GLO-30 DEM provides, why it is a surface model rather than a terrain model, how its tiles are laid out, and how its Water Body Mask is used to exclude the sea from AOI statistics.
validation_status: tile layout and WBM class codes verified against the data on 2026-09-22
status: draft
tags: [dataset, terrain, water, tier/raw]
source_url: https://copernicus-dem-30m.s3.amazonaws.com
verified_on: 2026-09-22
---

## What it is

The 30 m global elevation model derived from TanDEM-X (2011-2015 acquisition),
published on AWS Open Data as one COG per 1-degree tile. Anonymous HTTPS, no
account, no requester-pays. It is the elevation and slope source for
[[Agent Norwood - Satellite expert]], because Sentinel-2 cannot supply one --
no stereo pair, no DEM product.

## It is a SURFACE model, and that governs every slope figure

GLO-30 is a **DSM**, not a DTM: it measures the top of whatever is there.
Canopy and building heights are included, so slope is inflated over vegetated
and built ground. Over the Kelani basin, where 62% of the observed land is
closed canopy, a slope figure is a canopy-surface gradient over most of the
AOI. Any brief that uses slope carries this caveat inline -- see
[[Norwood pre-flood AOI brief schema]].

Slope is computed by **Horn's 3x3 method**, with the angular grid spacing
converted to metres at the AOI's latitude before any gradient is taken. A
degree of longitude is 111 km at the equator and shortens with latitude;
treating degrees as a length would make slope a function of where you are.

## The tiles are pixel-is-POINT, and that has bitten

Tiles are named for their south-west corner
(`Copernicus_DSM_COG_10_N06_00_E079_00_DEM`), 3600x3600 at one arc second in
EPSG:4326. **The centre of the first pixel sits on the whole degree**, so the
transform -- which records a pixel EDGE -- sits half a pixel outside it: tile
`N06_00_E079_00` has `top = 7.00013889`, which is 7 + res/2.

Mosaicking these against a lattice counted from zero therefore leaves a
permanent half-pixel offset, and rounding it resolves by banker's rounding:
over the Kelani AOI the northern tiles were pasted one row low, every DEM pixel
moved 15 m, and the row at latitude 7.0 was written by no tile at all and came
back as no-data. It showed as a faint line across a printed elevation figure
and nothing else caught it. **A mosaic must be anchored to its first tile's own
origin**, with every other tile required to sit a whole number of pixels from
it. See [[Partial AOI coverage in Sentinel-2 scenes]] for the same lesson on
the projected side.

## The Water Body Mask -- how the sea is excluded

Each tile folder carries an auxiliary layer at
`<tile>_DEM/AUXFILES/<tile>_WBM.tif`: uint8, identical grid to the DEM, same
resolution, same origin. Its classes:

| Code | Meaning |
|---|---|
| 0 | Land |
| 1 | Ocean |
| 2 | Lake |
| 3 | River |

**The codes were verified against the data, not taken from the handbook.** In
tile `N06_00_E079_00`, code 1 is 100% of every longitude band west of 79.83 --
open Indian Ocean -- with a mean elevation of exactly 0.00 m, while code 0
appears only in the easternmost band where Sri Lanka's coast is; codes 2 and 3
are small, inland and near sea level. A legend that agrees with geography *and*
with a second variable is one worth relying on.

This is the mask that rules the sea out of every AOI statistic in the project.
**Only code 1 is excluded by default** -- a lake and a river are part of a
catchment, and the Kelani's own channel is code 3. See
[[Excluding the sea from AOI statistics]].

## What it is not

Not bathymetry, not a flood model, and not a substitute for a hydrologically
conditioned DEM. Slope and elevation distributions indicate that a floodplain
exists; they do not say where the water will go.

---

Related: [[Datasets-MOC]] | [[Agent Norwood - Satellite expert]] | [[Excluding the sea from AOI statistics]] | [[Norwood pre-flood AOI brief schema]] | [[Monty data workflows]] | [[JRC Global Surface Water]] | [[Partial AOI coverage in Sentinel-2 scenes]]
