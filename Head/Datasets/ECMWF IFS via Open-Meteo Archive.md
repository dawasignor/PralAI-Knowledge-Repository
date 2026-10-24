---
type: dataset
desc: ECMWF IFS 9 km hourly weather served by the Open-Meteo archive -- the model behind every cached thesis weather output, and the default of fetch_weather_grid
aliases: [ECMWF IFS, IFS HRES, IFS 9 km, ecmwf_ifs, Open-Meteo IFS archive]
keywords: [IFS, ECMWF, Open-Meteo, archive, weather model, 9 km, best_match, ERA5, provenance, precipitation, cloud cover, wind, soil moisture, forecast hours, UTC]
sensor: null
workflows: [fetch_weather_grid, fetch_weather_data]
source_of_truth: core/workflows/weather_grid.py (MODELS) in langgraph-agents
context: head
retrieval: Answer which weather model the thesis weather figures come from, what ECMWF IFS in the Open-Meteo archive is, its resolution, record and delay, and why the model must be named rather than left to best_match.
validation_status: dataset table verified against the Open-Meteo Historical Weather API page on 2026-09-26; identity of the cached Kelani payloads verified by re-fetch the same day (192 of 192 hours)
status: draft
tags: [dataset, weather, tier/pretrained]
source_url: https://open-meteo.com/en/docs/historical-weather-api
verified_on: 2026-09-26
---

## What it is

ECMWF's Integrated Forecasting System at 9 km, hourly, as served by the
Open-Meteo archive (`models=ecmwf_ifs`). Open-Meteo describes it as "assembled
by Open-Meteo using simulation runs daily at 0z, 6z, 12z and 18z, employing
the most up-to-date version of IFS". It is a global model output, not an
observation and not a reanalysis.

| Field | Value |
|---|---|
| Resolution | 9 km, hourly |
| Record | 2017-01-01 onwards -- measured: the first values are 2017-01-01T00:00 |
| Delay | none; updated every 6 hours |
| Hours after "now" | forecast from the latest run, and replaced as later runs arrive |
| IFS cycle behind an hour | not recorded by Open-Meteo -- cite the retrieval date with a figure |

## Why this note exists: it was called ERA5

Until 2026-09-26 `fetch_weather_grid` named no model. Open-Meteo's default,
`best_match`, "combines IFS HRES, ERA5 and ERA5-Land seamlessly" -- the server
chooses -- and the workflow labelled the result "ERA5, 31 km" by hand.

It was this dataset. Re-fetched with the model named, `ecmwf_ifs` reproduces
the cached Kelani grid in 192 of 192 hours for precipitation, cloud and wind;
ERA5 matches 43, 94 and 0 of 192, and would put the storm total at 375.60 mm
against the 390.97 mm cited. **The Kelani weather figures stand, and they are
IFS figures**, including the cloud and wind values that feed the MCDM.

`fetch_weather_grid` now names the model on every call (`ecmwf_ifs` by default,
`era5` on request) and refuses `best_match`. `fetch_weather_data`, the point
workflow, still names none and receives this dataset too -- its soil moisture
is labelled ERA5-Land and matches ERA5-Land in 0 of 72 hours. That one is
reported and not yet fixed.

## What it means for a reader

- **A 9 km cell, not a 31 km one.** Finer than ERA5, still one to two orders
  of magnitude coarser than the 20-250 m flood products it is used to gate.
- **It reaches the present, and ERA5 does not.** ERA5 is about 5 days behind,
  and its gap comes back as nulls, not an error. For a flood happening now this
  is the only archive model with data -- and the last hours of a window ending
  "now" are forecast.
- **Before 2017 it does not exist.** An earlier event needs ERA5, which makes
  pre- and post-2017 weather figures two different models. Say which.

Related: [[Datasets-MOC]] | [[Weather output schema]] | [[Monty data workflows]] | [[ERA5-Land via Open-Meteo Archive]] | [[ERA5 cloud does not predict Sentinel-2 AOI usability]] | [[Cloud compatibility]] | [[Wind compatibility]] | [[Live weather sources for an ongoing flood]]
