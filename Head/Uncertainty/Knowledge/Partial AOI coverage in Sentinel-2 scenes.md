---
type: uncertainty
uncertainty_kind: knowledge
desc: Why a Sentinel-2 scene can cover only part of the requested AOI, and how fetch_lulc_data refuses rather than truncating
aliases: [partial AOI, AOI coverage, MGRS tile straddle, truncated bbox, bbox coverage, incomplete scene]
keywords: [AOI, bbox, coverage, MGRS, tile, straddle, truncation, clamp, partial scene, area_km2, sentinel-2, footprint, min_aoi_coverage]
sensor: Sentinel-2 MSI L2A
workflows: [fetch_lulc_data, fetch_terrain_data, fetch_permanent_water]
source_workflow: core/workflows/sentinel.py, core/workflows/_raster.py
source_docs: [docs/fetch_lulc_data.md]
context: head
retrieval: Answer whether a Sentinel-2 result covers the whole area that was requested, what aoi.coverage means, and what happens when an AOI spans two MGRS tiles.
validation_status: guard verified on a synthetic tile in tests; not yet exercised by a real straddling AOI
status: draft
tags: [uncertainty, sentinel-2, optical, aoi, coverage]
---

## Answer in one line

A Sentinel-2 scene is one MGRS tile, so an AOI can straddle two of them and be
covered by neither alone. `fetch_lulc_data` **rejects** a scene that does not
cover the whole AOI rather than returning statistics for the part it can see;
`aoi.coverage` on every response says how much of the requested bbox was
actually measured.

## The failure mode this prevents

Reading a windowed region out of a raster clamps that window to the raster's
own extent. A scene covering half an AOI therefore yields a **smaller array**,
not an error — and every statistic computed on it is internally consistent,
plausible, and describes a region nobody asked for.

The dangerous part is that `area_km2` is derived from the window, so a
truncated run reports the truncated area as though it were the requested one.
There is no downstream check that catches this: the numbers do not look wrong,
they look like a smaller AOI.

## What is returned now

Every `fetch_lulc_data` response carries three fields under `aoi`, on
successful full-coverage runs as well as partial ones:

| Field | Meaning |
|---|---|
| `bbox_requested` | The bbox that was asked for. |
| `bbox_covered` | The extent actually read, after snapping to whole pixels and clamping to the scene. |
| `coverage` | Share of the requested window that survived clamping. `1.0` is full coverage. |

`area_km2` is measured over `bbox_covered`. Read it together with `coverage`,
never alone.

Rejected scenes carry `aoi_coverage` in `selection.attempts`, so the reason an
older or different scene was chosen is visible.

## The threshold, and when a partial scene is allowed

`min_aoi_coverage` defaults to **1.0** — the whole AOI. A scene below it is
rejected before its SCL band is read.

Rejection, not a hard failure: a scene from an adjacent orbit may cover the AOI
in full, so the search continues through the lookback window. Only if every
candidate fails on coverage does the run raise, and that error names MGRS
tiling explicitly rather than blaming cloud:

```
no Sentinel-2 scene covers the whole AOI within the lookback window (12 probed;
widest was S2C_T46RCP_20250510T043037_L2A at 0.5 of the AOI). The AOI probably
straddles two MGRS tiles -- split it, or lower min_aoi_coverage to accept a
partial scene.
```

Lowering `min_aoi_coverage` is possible but is a deliberate act, and the
accepted coverage is recorded in the response.

## Coverage is not the same as valid fraction

Two different quantities, both bounded [0, 1], and they must not be conflated:

| | `aoi.coverage` | `valid_fraction` |
|---|---|---|
| Measures | How much of the requested **area** the scene contains | How much of the covered area was **cloud-free** |
| Cause of a low value | AOI geometry versus tile footprint | Cloud, shadow, snow |
| Fixed by | Splitting the AOI, or a different orbit | Waiting for a clearer scene |
| Default threshold | 1.0 | 0.9 |

A run can have `coverage = 1.0` and `valid_fraction = 0.62`: the whole AOI was
in the scene, but 38% of it was under cloud. See
[[Scene usability - SCL valid fraction]].

## Why the two other EO workflows behave the same way

`fetch_terrain_data` (Copernicus DEM, 1-degree tiles) and
`fetch_permanent_water` (JRC GSW, 10-degree tiles) both **raise** on a bbox
spanning more than one tile, with "multi-tile mosaicking is not implemented".
Sentinel-2 now matches that intent; it differs only in rejecting per scene
rather than up front, because scene footprints vary with orbit while a DEM tile
grid is fixed.

The consequence for cross-workflow use: an AOI too large for one Sentinel-2
tile will usually also fail terrain and water, so a partial-coverage failure is
a signal to **split the AOI**, not to work around one workflow.

## Validation status

The guard is verified on a synthetic tile with an AOI hanging half off its
edge: coverage reports 0.5, `bbox_covered` truncates to the tile edge, the
scene is rejected with the MGRS message, and it is accepted only when
`min_aoi_coverage=0.4` is passed deliberately. **Not yet exercised by a real
straddling AOI** — every AOI run to date fits inside one MGRS tile.

---

Related: [[Uncertainty Analysis - MOC]] | [[Sentinel-2 LULC uncertainty fields]] | [[Scene usability - SCL valid fraction]] | [[Sentinel-2 C1 L2A]] | [[Copernicus DEM GLO-30]] | [[JRC Global Surface Water]] | [[Entro - Uncertainty Analyser]]
