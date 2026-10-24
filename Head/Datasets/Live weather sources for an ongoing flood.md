---
type: dataset
desc: Weather sources that can describe a flood still happening -- the last hours and days -- when the Open-Meteo archive refuses today's date; compared and checked for Bangkok, 2026-09-26
aliases: [live weather APIs, real-time weather sources, near-real-time weather, weather for an ongoing event, Bangkok weather options]
keywords: [live, near real time, NRT, weather API, Open-Meteo, ECMWF IFS, forecast API, past_days, IMERG, GSMaP, ThaiWater, HII, METAR, aviationweather, TMD, rain gauge, Bangkok, Thailand, end_date, UTC]
sensor: null
workflows: [fetch_weather_grid]
context: head
retrieval: Answer which weather sources can supply rain, cloud and wind for an event that is still under way, what each one gives, how fresh it is, what access it needs, and which one the thesis chose for Bangkok and why.
validation_status: rows marked checked were queried live on 2026-09-26 (Bangkok local); the others are from their providers' own documentation, read the same day
status: draft
tags: [dataset, weather, live, comparison]
source_url: https://open-meteo.com/en/docs/historical-weather-api
verified_on: 2026-09-26
---

## Why this note exists

A flood being mapped while it happens hits a wall the historical ones do not:
**the Open-Meteo archive will not serve a date later than today in UTC.** On
2026-09-26 in Bangkok it was still 2026-09-25 in UTC, and a request ending on
the 26th came back HTTP 400: `'end_date' is out of allowed range from
1940-01-01 to 2026-09-25`. ERA5 is worse again -- about five days behind, and
it answers the gap with nulls rather than an error.

These were the options weighed for the Bangkok event (AOI the Nominatim box for
Bangkok, window 24-26 Sep 2026). The table is kept as it was presented.

## The options

| # | Source | Checked live? | Gives | Access |
|---|---|---|---|---|
| 1 | **Open-Meteo archive, same endpoint, `models=ecmwf_ifs`, end date 2026-09-25 UTC** | ✅ every hour to 25 Sep 23:00 UTC, no gaps | Every weather field over the grid | Free, no key |
| 2 | Open-Meteo forecast endpoint with `past_days` (up to 92) | ✅ 22–25 Sep, no gaps | Same fields and JSON; one-line URL change | Free, no key |
| 3 | NASA GPM IMERG Early | Docs only | Satellite rainfall, 0.1°, half-hourly, about 4 h behind | Free registration |
| 4 | JAXA GSMaP NRT / NOW | Docs only | Satellite rainfall, 0.1°, hourly; NRT about 4 h behind, NOW near real time | Free registration |
| 5 | ThaiWater (HII) public API | ✅ keyless; latest reading 03:00 local on 26 Sep 2026 | Rain gauges (1 h and 24 h totals), including Bangkok's drainage department gauges | Free, no key |
| 6 | Airport weather reports for Suvarnabhumi and Don Mueang (aviationweather.gov) | ✅ 192 reports covering the full 48 h | Observed wind and cloud layers at two points; no rain amounts | Free, no key |
| 7 | Thai Meteorological Department API | Not tested | 118 stations nationally | Registration required |

Options 3–6 each cover only one or two weather fields. Option 1 is the only one
that fills every field over the grid. Some of its last hours are forecast
rather than analysis.

## What was chosen, and why

**Option 1**, by the user on 2026-09-26. It fills the whole
[[Weather output schema]]. It is also the model the Kelani weather actually
came from -- see [[ECMWF IFS via Open-Meteo Archive]] -- so the two events stay
comparable. The price is stated in every payload: hours at or after the
retrieval time are forecast, and the qc block says how many.

Options 3–6 are not rivals to it. They are **cross-checks**, and they are
observations where option 1 is a model:

- **IMERG and GSMaP** -- satellite rainfall over the same grid, independent of
  any weather model.
- **ThaiWater** -- the densest rain-gauge network in Bangkok, and the closest
  thing to ground truth for rainfall.
- **METAR** -- the one observed check on the wind that decides the SAR
  roughening gate.

None of them is wired into a workflow yet.

## Where each one was reached

| # | Endpoint or entry point |
|---|---|
| 1 | `https://archive-api.open-meteo.com/v1/archive?...&models=ecmwf_ifs` |
| 2 | `https://api.open-meteo.com/v1/forecast?...&past_days=N` |
| 3 | Early Run GeoTIFFs at `https://jsimpsonhttps.pps.eosdis.nasa.gov/imerg/gis/early/`, after PPS registration ([GPM IMERG](https://gpm.nasa.gov/data/imerg)) |
| 4 | [JAXA Global Rainfall Watch registration](https://sharaku.eorc.jaxa.jp/GSMaP/registration.html) |
| 5 | `https://api-v3.thaiwater.net/api/v1/thaiwater30/public/rain_24h` -- a 24 h snapshot. An endpoint serving 48 h of history was not found |
| 6 | `https://aviationweather.gov/api/data/metar?ids=VTBS,VTBD&hours=48&format=json` |
| 7 | `https://data.tmd.go.th/api/index1.php` (from a search result; not opened) |

## Things that will bite

- **Dates are UTC and cannot pass today in UTC.** East of Greenwich that is
  tomorrow's local date for part of every day. A local window of "-2 days to
  now" in Bangkok is UTC 2026-09-24 to 2026-09-25, which leaves out the first
  three local hours.
- **Never leave the model to `best_match`.** It is chosen server-side; see
  [[ECMWF IFS via Open-Meteo Archive]].
- **Station and airport data are points.** Two airports do not describe a
  5,459 km² box. Use them to check the grid, not to replace it.

Related: [[Datasets-MOC]] | [[ECMWF IFS via Open-Meteo Archive]] | [[Weather output schema]] | [[Monty data workflows]] | [[Wind compatibility]] | [[Cloud compatibility]] | [[SAR versus optical for flood extent]]
