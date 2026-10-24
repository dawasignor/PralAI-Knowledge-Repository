---
type: template
desc: The rendered shape of thesis output 1 (weather data) - sections, tables and the payload field behind every value
aliases: [output 1 template, weather output template, 01_weather_data template, weather data render]
keywords: [output 1, weather, template, render, hyetograph, event summary, rain bursts, daily rollup, data completeness, gaps, acquisitions, quality control, fetch_weather_grid, thesis output]
agent: monty
workflows: [fetch_weather_grid]
context: head
retrieval: Answer what thesis output 1 looks like when rendered - its sections in order, the columns of each table, which payload field fills each value, and which sections appear only under a condition.
source_of_truth: core/reports.py::weather_markdown in langgraph-agents
output_file: experiments/<slug>/01_weather_data.md
validation_status: transcribed from the renderer 2026-10-21; the code is authoritative
status: draft
tags: [template, output, weather, thesis]
---

## What this is

The template of **thesis output 1**, as `core/reports.py::weather_markdown`
renders it from the cached `weather_grid` payload. Deterministic: no agent
writes any of it. The payload's own contract is [[Weather output schema]].

**This note describes the render; it does not drive it.** Editing it changes
no output until rendering is wired to read templates from the vault.

`{{...}}` is a payload path. *withheld (gaps)* replaces any figure that would
need a missing hour (gap-audited payloads only).

## Template

```markdown
---
type: experiment-output
event: {{experiment slug}}
n: 1
slot: weather_data
title: Weather data
written: {{UTC time of rendering}}
source: fetch_weather_grid over bbox {{meta.bbox}}
inputs_used: [weather_grid]
---

# 1. Weather data

## What this is
(fixed text: hourly weather over the AOI on a grid; the meteorological
description of the flood and the sensor gates; the record is
inputs/weather_grid.json and nothing here is recomputed)

## Provenance
| Field | Value |
|---|---|
| Event | `{{meta.event_id}}` |
| AOI bbox (W,S,E,N) | {{meta.bbox}} |
| Window (UTC) | {{meta.window_utc[0]}} to {{meta.window_utc[1]}} |
| Fetched window | {{meta.fetch_window_utc[0]}} onwards ({{meta.antecedent_days}} d antecedent) |
| Endpoint | `{{meta.source.endpoint}}` |
| Model | {{meta.source.model}} |
| Native resolution | {{meta.source.native_res_km}} km |
| Retrieved | {{meta.source.retrieved_at}} |
| Response SHA-256 | `{{meta.source.response_sha256}}` |
| Response size | {{meta.source.response_bytes}} bytes |
| Storage timezone | {{meta.storage_tz}} (local offset {{meta.local_utc_offset_h}} h) |
| AOI mask | {{meta.aoi_mask}} or "none -- bbox statistics, not basin statistics" |
(fixed text: the SHA-256 is the receipt)

## Sampling grid
{{grid.n_points}} points at {{grid.spacing_deg}} degree spacing, equally weighted.
| id | lat | lon | elevation (m) | weight |      <- one row per grid.points[]

## Uncertainty: data completeness
(fixed text: gaps are reported, never filled)
ONE of:
- **Complete.** (qc.gaps has no by_var and no not_served)
- **Incomplete.** Event window complete: {{qc.gaps.window_complete}};
  antecedent period complete: {{qc.gaps.antecedent_complete}}
  | Variable | Event hours missing | of which partial | Missing (UTC, event) | Antecedent hours missing |
  Not served at all: {{qc.gaps.not_served}}
  **Withheld because of these gaps:** {{qc.gaps.withheld[]}}
- (older payload, no qc.gaps) "No missing values" or "predates the gap audit
  and HAS missing values ... re-fetch before citing"

## Event summary
| Quantity | Value |
|---|---|
| Storm total, AOI mean | **{{event_summary.storm_total_mm.aoi_mean}} mm** |
| Storm total, wettest grid point | {{event_summary.storm_total_mm.max_point}} mm |
| Rain in the N observed hours (a floor) | {{...observed_hours_lower_bound_mm}}   <- only with gaps |
| Max 1h / 3h / 6h / 24h intensity (AOI mean) | {{event_summary.max_intensity_mm.<1h|3h|6h|24h>}} mm |
| Wettest 24 h began | {{event_summary.max_intensity_mm.t_max_24h_utc}} |
| Antecedent API, 5 / 14 / 30 d | {{event_summary.antecedent_api_mm.<d5|d14|d30>}} mm |
| Minimum MSL pressure | {{event_summary.min_pressure_msl_hpa}} hPa |
| Maximum gust | {{event_summary.max_gust_ms}} m/s |
| Dry hours after last burst | {{event_summary.dry_hours_after_last_burst}} |
| Cumulative ET0 after the peak | {{event_summary.cum_et0_post_peak_mm}} mm |

### Rain bursts ({{count of event_summary.rain_bursts}})
| Start (UTC) | End (UTC) | Depth (mm) | Peak (mm/h) | Touches a gap |
or "_No burst cleared the depth threshold._"

## Rainfall hyetograph
![Rainfall hyetograph]({{figure.path}})   <- figure.name == "hyetograph"
*{{figure.caption}}* (fixed text on bars, line, shaded bursts, grey gaps)
or "_Not drawn for this payload._"

## Daily rollup
(fixed text: cloud and wind per day; rainfall is in the hyetograph;
gated h = hours with 10 m wind > 5 m/s over more than half the AOI)
| Day (UTC) | Cloud mean (%) | Wind mean (m/s) | Wind p90 max | Gust max | gated h | missing h |

## Derived, not measured
- **`{{derived[].field}}`** -- {{derived[].method}}

## Acquisitions
{{N}} acquisition(s) matched to the hourly series.
or **Empty.** (fixed text: a scene catalogue has to be wired in before this
output can feed the MCDM)

## Quality control
- Precipitation CV across grid points: **{{qc.spatial_heterogeneity.precipitation_cv}}**
- Missing fractions: {{qc.missing_frac_by_var}} or "No missing values ..."
- Grid points that failed: {{qc.points_failed}}
- Model fallback: {{qc.model_fallback}}

### Warnings
- {{qc.warnings[]}}
```

Related: [[Output templates - MOC]] | [[Weather output schema]] | [[ECMWF IFS via Open-Meteo Archive]] | [[Monty data workflows]]
