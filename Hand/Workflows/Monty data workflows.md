---
type: catalogue
desc: The data-fetching functions Monty can execute, what each one gives, and which numbered input source it satisfies
aliases: [Monty workflows, data workflows, workflow catalogue, what workflows exist, registered functions]
keywords: [workflows, catalogue, monty, fetch_weather_data, fetch_weather_grid, fetch_lulc_data, fetch_terrain_data, fetch_permanent_water, fetch_place_context, registry, data fetching, Open-Meteo, ERA5, Sentinel-2, Copernicus DEM, JRC, Nominatim, Overpass, GDACS, bounding box, geocoding, input sources]
agent: argos
context: hand
retrieval: Answer which data-fetching workflows exist, what each one returns, what geometry it takes, and which numbered input source it satisfies.
source_of_truth: core/workflows/ registry in langgraph-agents
validation_status: mirrors the registry as of 2026-09-21; names are checked against it by tests/test_workflow_catalogue.py
status: draft
tags: [catalogue, workflows, monty, data]
---

## What this is

The functions **Monty** can execute. Argos routes work here by naming a
function and supplying its parameters; Monty runs it and returns JSON.

**Signatures are not in this note, on purpose.** The registry in
`core/workflows/` is the only truth about parameter names, and a parameter
name copied into a note drifts the moment the function changes -- producing
exactly the `unknown_function` and signature errors this catalogue exists to
prevent. This note carries **judgment**: what each workflow is for, what it
costs, and when it is the wrong tool. The exact signature arrives with the
routing request, generated from the registry.

## The six that exist

| Workflow | What it gives | Geometry | Source | Input source |
|---|---|---|---|---|
| `fetch_place_context` | Bounding box, country and admin region for a **place name**; counts of the buildings, homes, apartments, commercial premises, hospitals and schools mapped inside it; and the disaster record matching the dates | **Place name** -> bounding box | [[OpenStreetMap Nominatim]] + [[OpenStreetMap Overpass]], [[GDACS disaster register]] | 21, 22; partly 10 and 12 |
| `fetch_weather_data` | Cloud cover, hourly and daily rain, wind, shortwave radiation, and two soil-moisture layers | **One point** | [[ERA5-Land via Open-Meteo Archive]] | 1 |
| `fetch_weather_grid` | The same variables plus gusts, pressure, ET0 and humidity, sampled across the AOI and aggregated per hour (mean / max / p90 / area fraction), with storm totals, antecedent index, rain bursts and the sensor-gate inputs | **Bounding box** | [[ERA5-Land via Open-Meteo Archive]] | 1 |
| `fetch_lulc_data` | Six land-cover indices -- NDVI, NDBI, [[BUI]], NDMI, NMDI, [[MNDWI]] -- from the most recent usable scene | **Bounding box** | [[Sentinel-2 C1 L2A]] | 2 |
| `fetch_terrain_data` | Elevation and slope statistics; cached, because terrain does not change | **Bounding box** | [[Copernicus DEM GLO-30]] | 3 |
| `fetch_permanent_water` | Permanent and seasonal water extent, so a river in its channel is not counted as flood | **Bounding box** | [[JRC Global Surface Water]] | 4 |

None needs an account, a key or asset signing.

**`fetch_place_context` is the one that produces a bounding box.** The other
five consume one. If a request names a place and no geometry has been settled,
this is the first call, not a guess at coordinates.

## What a router needs to know before choosing one

- **Point against bounding box.** `fetch_weather_data` takes a single point;
  four take a bounding box; `fetch_place_context` takes a **place name** and is
  the only one that returns a box rather than requiring one. Sending the wrong
  geometry is the most common routing mistake.
- **Two weather workflows, and they are not interchangeable.**
  `fetch_weather_data` describes a point. `fetch_weather_grid` describes an
  area and produces the sensor-gate inputs the MCDM reads -- see
  [[Weather output schema]]. Asked "what was the weather over the AOI", the
  grid one is the answer; asked for a single gauge-like series, the point one
  is cheaper.
- **The event lookup never gates the geometry.** Inside
  `fetch_place_context` the three lookups run in dependency order -- gazetteer,
  then Overpass, then GDACS -- and the last two may fail without costing the
  bounding box. A city's extent does not depend on which disaster is being
  tagged to it, and a register that is down or ambiguous is not a reason to
  have no AOI.
- **`fetch_place_context` counts *mapped* features, not features.** OSM
  coverage is excellent in some cities and thin in others, so a low count can
  mean few buildings or few surveyors. Never report one as a population, an
  asset total or a damage denominator without saying where it came from. A
  category that failed is absent from the counts, never present as `0`.
- **It is slow** -- around two minutes measured over Derna with the feature
  counts included, because the Overpass requests are deliberately paced against
  a shared public endpoint. Ask for it once and keep the answer in the session
  record rather than re-deriving a bounding box that is already settled.
- **Send one workflow per request.** Pick the single workflow that answers the
  question actually asked. Three results arriving at once bury the one that was
  wanted, and `core/graph.py` enforces the cap -- a surplus task is deferred and
  named, not run. If more data is needed afterwards, say so as the next step and
  let the user ask. (This reverses earlier guidance to batch; the reason is
  legibility of the answer, not cost.)
- **Rasters go to disk, statistics come back in the JSON.** Nothing returns an
  array.
- **`valid_fraction` travels with every EO statistic.** Every mean is a mean
  over the pixels that survived cloud masking. A mean over 62% of an AOI is not
  the same claim as one over 95%, and nothing downstream can tell unless it is
  told. See [[Scene usability - SCL valid fraction]].
- **`fetch_lulc_data` fails often, and that is correct.** It requires 0.9 valid
  pixels over the whole AOI and will refuse rather than return a cloudy scene.
  Over monsoon terrain most AOIs fail at the defaults. That failure is a
  finding about optical EO, not a bug to work around -- see
  [[SAR versus optical for flood extent]].
- **Built-up classification is unsettled.** `fetch_lulc_data` returns BUI
  statistics but no class fractions, and the index cannot separate built-up
  from bare soil in arid terrain. See
  [[BUI over NDBI - built-up index accuracy]] and
  [[Built-up fraction as an MCDM criterion]].

## Planned, not built

- `fetch_vegetation_phenology` -- separates forest, shrub and cropland by
  seasonal NDVI amplitude across a year. Needs a stack of scenes rather than
  the single scene `fetch_lulc_data` selects, which is why it is a separate
  workflow rather than more parameters on the existing one.

## What is missing entirely

Inputs 7 to 20 in [[Citadel input sources]] have **no workflow behind them** --
wastewater plants, INFORM, population, building footprints, road networks,
health facilities, the electricity network, gauges. Every Citadel flow needs at
least one of them, so no flow can run end to end on this catalogue alone.

`fetch_place_context` narrows two of those and closes neither. It returns
**counts** of mapped buildings and health facilities, which is a sense of scale
for inputs 10 and 12 -- not the footprints, uses, capacities or locations those
inputs call for. An exposure step still has nothing to intersect with a flood
extent. Read the counts as context, not as the dataset.

---

Related: [[Workflows-MOC]] | [[Citadel flows - MOC]] | [[Citadel input sources]] | [[Agent Argos - Orchestrator]] | [[Monty - Python expert]] | [[Sentinel-2 C1 L2A]] | [[Copernicus DEM GLO-30]] | [[JRC Global Surface Water]] | [[ERA5-Land via Open-Meteo Archive]] | [[Weather output schema]] | [[OpenStreetMap Nominatim]] | [[OpenStreetMap Overpass]] | [[GDACS disaster register]]
