---
type: schema
desc: The output contract for gridded event weather — what fetch_weather_grid returns and what each block is for
aliases: [weather output schema, weather schema, weather output, gridded weather output]
keywords: [weather, schema, output, ERA5, Open-Meteo, grid, acquisitions, gates, antecedent, API, rain bursts, area fraction, SAR wind roughening, cloud, thesis output]
agent: monty
context: hand
retrieval: Answer what the weather output contains, what each block means, which fields are measured and which are derived, and what the acquisitions block is for.
source_of_truth: core/workflows/weather_grid.py in langgraph-agents
validation_status: schema fixed by the user 2026-09-21; first produced for the Kelani 2025 event the same day
status: draft
tags: [schema, output, weather, thesis]
---

## What this is

The shape of **thesis output 1, weather**. Produced by `fetch_weather_grid`
from the Open-Meteo Archive (ERA5 for the atmosphere, ERA5-Land for soil).

It answers a different question from the point weather workflow. `fetch_weather_data`
says what the weather was at a coordinate. This says **what the weather was
over an area, hour by hour, and whether it was the kind of weather that breaks
a flood-mapping sensor.** The second is what the MCDM consumes.

## The blocks

| Block | Holds | Why it exists |
|---|---|---|
| `meta` | Event id, bbox, window, source, `response_sha256` | The receipt. A thesis figure traces to a payload and that payload to one request |
| `grid` | The sample points, their elevation and weight | A statistic is an area statistic only if you can see what it was taken over |
| `hourly` | Every variable, aggregated across the grid per hour | The series the event description is written from |
| `acquisitions` | One row per satellite overpass, with the weather at that instant and the gates it implies | **The row the MCDM actually consumes** |
| `event_summary` | Storm totals, peak intensities, antecedent index, rain bursts | The flood in a dozen numbers |
| `derived` | Anything Open-Meteo did not serve, and the method that produced it | Measured and computed must never look alike |
| `qc` | Missing fractions, spatial CV, warnings | What would make a reader distrust the rest |

## Aggregates, and why the area fraction is the important one

Every hourly variable carries the same aggregate block over the grid points:
`mean`, and where it makes sense `max`, `min`, `p90`, and an `area_frac_*`.

**`area_frac_*` is the one a gate should read.** "Mean wind 4 m/s" and "wind
over 5 m/s across 70% of the AOI" can be the same hour, and only the second
tells you whether a SAR scene is roughened. A mean over an AOI hides exactly
the spatial concentration that decides whether a product works.

Thresholds carried today: `precipitation` > 10 mm/h, `cloud_cover` < 20%,
`wind_speed_10m` > 5 m/s.

## Two rules the numbers depend on

**Wind direction is circular.** It is combined as a unit-vector resultant,
never an arithmetic mean — the average of 350° and 10° is 180°, the exact
opposite of both readings. Nothing else in the output averages an angle.

**Wind is stored in m/s, and the endpoint does not default to it.**
Open-Meteo answers in km/h unless asked otherwise. Left unset, every wind
figure is 3.6x too large under an `m/s` label and the 5 m/s roughening gate
fires on 1.4 m/s air — plausible-looking numbers, a correct-looking unit
string, and nothing downstream able to catch it. This was a live bug on the
first Kelani run.

## `acquisitions` is the block that is not filled yet

It pairs each candidate product's overpass with the weather at that instant and
computes the per-scene gates:

```
sar_wind_roughening   wind_p90 > 5 m/s
optical_usable        cloud_mean < 60%
```

**Open-Meteo does not know when Sentinel-1 flew**, so the acquisition times are
not available from this workflow and the block comes back empty with a `qc`
warning. It is left empty rather than filled with plausible times: a gate is a
claim about a specific scene, and an invented overpass makes that claim
unfalsifiable. A scene catalogue has to be wired in before this output can feed
the MCDM.

`cloud_cover_scene_pct` is null for a different reason — it comes from the
scene's own mask (Fmask, MOD35), not from a weather model, and is filled
elsewhere. **Do not substitute the model cloud for it.** A 31 km cell mean and
a per-pixel scene mask are not the same measurement.

## Known limits, stated rather than modelled

- **The model is 31 km and the products are 20–250 m.** Model wind and cloud
  gate products delivered two orders of magnitude finer; a cell mean cannot
  resolve what a scene sees. Carried as a standing `qc` warning.
- **Sampling finer than 0.25° does not add independent information.** The
  endpoint interpolates, so finer points are distinct but correlated by
  construction: the CV then describes interpolated variation and understates
  true sub-grid heterogeneity. Measured, not assumed — four points across 0.3°
  return four different series.
- **Without an `aoi_mask` these are bbox statistics, not basin statistics.**
  Grid points are equally weighted. Naming a mask records it; it is not applied.

## Related

[[Monty data workflows]] | [[Flood_mask_Dataset_MCDA]] | [[Scoring criteria]] |
[[NRT products]] | [[SAR versus optical for flood extent]] |
[[Cloud compatibility]] | [[Wind compatibility]] |
[[ERA5-Land via Open-Meteo Archive]] | [[Workflows-MOC]]
