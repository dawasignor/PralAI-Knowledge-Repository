---
type: uncertainty
uncertainty_kind: knowledge
desc: Measured negative result - modelled ERA5 cloud cover cannot be used to pre-screen Sentinel-2 scenes, at any cutoff
aliases: [ERA5 cloud screen, cloud pre-screen, weather-based scene filter, 20% cloud rule, cloud cutoff, why not screen scenes by weather]
keywords: [ERA5, open-meteo, cloud cover, pre-screen, scene selection, SCL, valid_fraction, cutoff, threshold, 20 percent, negative result, calibration, sentinel-2, probe]
sensor: Sentinel-2 MSI L2A
workflows: [fetch_lulc_data, fetch_weather_data]
source_workflow: core/workflows/sentinel.py
context: head
retrieval: Answer whether Sentinel-2 scene selection can be made cheaper by filtering on forecast or reanalysis cloud cover first, and why the 20% cloud convention does not hold here.
validation_status: measured on 77 live scenes across three AOIs, 2026-08-27
status: draft
tags: [uncertainty, sentinel-2, optical, cloud, negative-result, experiment]
---

> **Provenance caution, 2026-09-26.** The cloud values paired here were
> probably not ERA5. If they came from `fetch_weather_data`, or any
> Open-Meteo call without a model named, they were ECMWF IFS 9 km -- that
> is what such a call returns, measured 72 of 72 hours at Edinburgh and
> Tirupati. The calibration script was deleted, so which call was made,
> and so which model answered, cannot be confirmed. The conclusion most likely
> stands, because a model cell still says nothing about where the cloud is
> in it. But read "ERA5" below as "model cloud, probably IFS 9 km", and
> the ~25-31 km cell argument as applying to a 9 km cell. See
> [[ECMWF IFS via Open-Meteo Archive]].

## Answer in one line

**No.** Modelled ERA5 cloud cover, sampled at a scene's exact acquisition hour,
does not predict whether that scene's AOI is usable. Measured across 77 scenes,
**every** cutoff from 10% to 80% would have discarded scenes that actually
passed the 0.9 valid-fraction threshold.

## What was tested

The proposal: call Open-Meteo first, keep only the dates where cloud cover is
below some cutoff (20% was suggested), and probe Sentinel-2 only on those
dates. Fewer SCL reads, cheaper run.

For a screen to be sound it must be an **exclusion by proof**, not a
preference. Scene selection returns the *most recent* scene that passes, so
skipping a candidate that would have passed does not merely cost speed -- it
returns a different, older scene, silently. The test was therefore: is there a
cloud level above which no scene ever reaches 0.9?

Method: for every candidate in a 90-day lookback window, pair the measured SCL
valid fraction over the AOI with the ERA5 hourly cloud cover at that scene's
acquisition instant (UTC-matched, not day-averaged).

## Results

| AOI | Window ends | Scenes paired | Reached >= 0.9 | Highest ERA5 cloud among *passing* scenes |
|---|---|---|---|---|
| Shillong | 2025-08-03 | 13 | 0 | -- (nothing passed) |
| Edinburgh | 2026-08-12 | 40 | 13 | **97%** |
| Tirupati | 2021-11-19 | 24 | 1 | **85%** |
| **Pooled** | | **77** | **14** | **97%** |

## The counterexamples

```
AOI         date        time UTC   tile%  ERA5%   valid   pass
Edinburgh   2026-07-12  11:25        7.8   97.0  0.9711   YES
Edinburgh   2026-07-17  11:25       44.9   73.0  0.9985   YES
Edinburgh   2026-08-11  11:36       55.8   65.0  0.9709   YES
Tirupati    2021-09-15  05:24       53.2   85.0  0.9924   YES
```

ERA5 reported 97% cloud over the grid cell at the acquisition hour; the AOI was
97% clear. A 20% cutoff would have thrown that scene away, and eight others.

## Cutoff sweep, pooled

```
cutoff  skipped  usable lost   verdict
   10%       71           10   UNSAFE
   20%       66            9   UNSAFE
   30%       62            9   UNSAFE
   40%       61            9   UNSAFE
   50%       57            9   UNSAFE
   60%       51            7   UNSAFE
   70%       46            5   UNSAFE
   80%       37            3   UNSAFE
```

No safe cutoff exists in the tested range. Every level that skips enough to be
worth doing also discards usable scenes.

## ERA5 is a worse predictor than the catalogue figure already rejected

| AOI | corr(ERA5 cloud, valid fraction) | corr(tile cloud, valid fraction) |
|---|---|---|
| Shillong | -0.506 | -0.710 |
| Edinburgh | -0.476 | -0.795 |
| Tirupati | **-0.040** | -0.371 |
| Pooled | **-0.430** | **-0.711** |

Both correlate in the right direction; neither is predictive. ERA5 is
consistently the weaker of the two, and over Tirupati it carries essentially no
information at all.

This matters because `eo:cloud_cover` -- the catalogue's tile-level figure --
was already rejected as unreliable for AOI-scale decisions. A screen on ERA5
would have replaced a weak proxy with a weaker one.

## Why it fails

A ~25-31 km ERA5 grid cell reports **how much** cloud is in the cell, never
**where**. A 15x13 km AOI can sit entirely in the clear part of a 97%-cloudy
cell.

This is the same aggregation failure as tile-level cloud cover over a 110 km
tile, and it is worse in one respect: ERA5 is a **model output**, not an
observation of that scene. Two error sources instead of one.

The conclusion generalises: **nothing short of reading the actual SCL pixels
over the actual AOI establishes whether a scene is usable.** This experiment
corroborates the founding premise of the scene-selection design with 77 scenes
rather than the 3 originally cited.

## What was done with the result

Nothing was built. The pre-screen was abandoned at the calibration stage and
the calibration script was removed. The cheaper alternative that remains
taken instead was reading the **same** SCL pixels at reduced resolution through
the COG's built-in overviews -- 5.1x faster with a worst-case valid fraction
error of 0.008 -- which attacks probe *cost* rather than probe *count* and
carries none of this risk. **Implemented 2026-08-27** as `probe_decimation`,
with the accepted scene always re-read at full resolution so no returned number
is an estimate.

## Fixtures

Recorded for reuse.

| AOI | bbox | Event / window end |
|---|---|---|
| Shillong | `[91.80, 25.50, 91.95, 25.62]` | 2025-08-03 |
| Edinburgh | `[-3.30, 55.90, -3.10, 56.00]` | 2026-08-12 |
| Tirupati | `[79.35, 13.57, 79.50, 13.69]` `TOTAG` | **main event 19 Nov 2021, +/- 1 day** |

The Tirupati bbox is **assumed**, not supplied -- it is a ~15 km box centred on
the city. The event date is authoritative. Rerunning with the real bbox would
change the Tirupati row but not the conclusion, which rests on the Edinburgh
97% counterexample.

Incidental observation from the Tirupati window: the scene on the event date
itself (2021-11-19) had a valid fraction of **0.0860**. Optical imagery sees
almost nothing of that AOI on the day of the flood -- the structural argument
for [[SAR]], set out in [[SAR versus optical for flood extent]].

## Method caveats

- ERA5 cloud was read from the Open-Meteo archive JSON endpoint directly rather
  than through `fetch_weather_data`, because `pandas` could not be installed in
  the test environment. Same API, same variable, same reanalysis behind it.
- Edinburgh returned 92 candidates in 90 days; the calibration capped probing at
  40. Shillong and Tirupati were probed in full.
- Partial-coverage scenes were excluded from the pairing as not comparable.

---

Related: [[Uncertainty Analysis - MOC]] | [[Scene usability - SCL valid fraction]] | [[Sentinel-2 LULC uncertainty fields]] | [[Partial AOI coverage in Sentinel-2 scenes]] | [[Sentinel-2 C1 L2A]] | [[ERA5-Land via Open-Meteo Archive]] | [[Cloud compatibility]] | [[SAR]] | [[Entro - Uncertainty Analyser]]
