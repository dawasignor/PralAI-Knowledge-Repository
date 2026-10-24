---
type: schema
desc: The output contract for gridded event weather — what fetch_weather_grid returns and what each block is for
aliases: [weather output schema, weather schema, weather output, gridded weather output]
keywords: [weather, schema, output, ECMWF IFS, ERA5, best_match, Open-Meteo, grid, acquisitions, gates, antecedent, API, rain bursts, area fraction, SAR wind roughening, cloud, thesis output]
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
from the Open-Meteo Archive, with the model **named in the request**:
ECMWF IFS 9 km by default, ERA5 on request. `meta.source.model` says which.

> **Correction, 2026-09-26.** This note used to say ERA5 for the atmosphere
> and ERA5-Land for soil. The workflow named no model, Open-Meteo's
> `best_match` served ECMWF IFS, and every cached payload -- Kelani included
> -- is IFS at 9 km: re-fetched with the model named, 192 of 192 hours
> identical. The figures stand; the model named for them was wrong. See
> [[ECMWF IFS via Open-Meteo Archive]].

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
| `qc` | Missing fractions, the `gaps` audit, spatial CV, warnings | What would make a reader distrust the rest |
| `figure` | The rainfall hyetograph: name, PNG path, caption | **The rainfall in output 1 is this graph, not a table** (since 2026-10-14). Absent when the chart was not drawn |

**Rainfall is reported as a hyetograph** (user decision, 2026-10-14): hourly
AOI-mean rainfall as bars, the cumulative total as a line, rain bursts shaded
with their depth, the wettest 24 h bracketed. A missing hour is shaded and the
line stops there -- it is never counted as dry. In the console it is shown as
`<image - run-region-year-hyetograph>`. Argus does not read the hourly series:
it is given a summary of the values output 1 is written from (storm totals,
peaks, antecedent index, bursts, completeness, provenance, and the window means
of cloud and wind that feed the ranking).

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
elsewhere. **Do not substitute the model cloud for it.** A 9 km (IFS) or 31 km
(ERA5) cell mean and
a per-pixel scene mask are not the same measurement.

## Missing hours are reported, never filled

Ruled by the user on 2026-09-26: **a missing hour is not assumed or filled in
-- it is reported.** Before then the storm series counted a missing hour as
0 mm, so a total over a gap came out silently low. Live ERA5 over Bangkok had
120 of 192 hours missing, and 50.78 mm of observed rain would have been
reported as the storm total.

- An hour counts for a variable only if **every** grid point returned a value.
  A partial hour is a gap, because a mean over the points that reported is a
  guess about the rest.
- A figure that would need a missing hour is **withheld** and named in
  `qc.gaps.withheld`. That covers storm totals, peaks, the antecedent index,
  extremes, and the precipitation CV.
- Where the observed hours bound the answer, the bound sits beside it,
  labelled as a floor: `observed_hours_lower_bound_mm` and
  `observed_windows_lower_bound`.
- `qc.gaps` is on every payload: `window_complete`, `antecedent_complete`,
  per-variable missing hours as UTC ranges, what was not served, and what was
  withheld. An empty audit is the claim "nothing was missing".
- **The weather document opens with "Uncertainty: data completeness"**, before
  any number is read.

For an agent reading output 1: check `qc.gaps.window_complete` first. If it is
false, quote only what is not withheld, give a floor as a floor, and say which
hours are missing.

## Known limits, stated rather than modelled

- **The model is 9 km (IFS) or 31 km (ERA5), and the products are 20–250 m.** Model wind and cloud
  gate products delivered two orders of magnitude finer; a cell mean cannot
  resolve what a scene sees. Carried as a standing `qc` warning.
- **Sampling finer than the model grid (0.25° ERA5, ~0.08° IFS) does not
  add independent information.** The
  endpoint interpolates, so finer points are distinct but correlated by
  construction: the CV then describes interpolated variation and understates
  true sub-grid heterogeneity. Measured, not assumed — four points across 0.3°
  return four different series. *(Corrected 2026-09-26: that measurement was
  on IFS 9 km data believed to be ERA5, so the four series were most likely
  four different cells. The point stands; this evidence for it does not.)*
- **These are bounding-box statistics, and unlike the EO workflows the
  weather grid does NOT exclude the sea.** A grid point over water still
  returns rain, wind and radiation, and those are real measurements of the
  atmosphere there -- but they are not catchment statistics. On the Kelani
  AOI (`[79.800, 6.783, 80.217, 7.083]`, 20 points at 0.1 deg) the western
  column sits over the Indian Ocean. Say which you are reporting. The land
  mask used by the EO workflows is described in
  [[Excluding the sea from AOI statistics]].
- **Without an `aoi_mask` these are bbox statistics, not basin statistics.**
  Grid points are equally weighted. Naming a mask records it; it is not applied.

## Related

[[Monty data workflows]] | [[Flood_mask_Dataset_MCDA]] | [[Scoring criteria]] |
[[NRT products]] | [[SAR versus optical for flood extent]] |
[[Cloud compatibility]] | [[Wind compatibility]] |
[[ECMWF IFS via Open-Meteo Archive]] | [[Live weather sources for an ongoing flood]] | [[Workflows-MOC]]
