---
type: catalogue
desc: The data-fetching functions Monty can execute, what each one gives, and which numbered input source it satisfies
aliases: [Monty workflows, data workflows, workflow catalogue, what workflows exist, registered functions]
keywords: [workflows, catalogue, monty, fetch_weather_data, fetch_lulc_data, fetch_terrain_data, fetch_permanent_water, registry, data fetching, Open-Meteo, Sentinel-2, Copernicus DEM, JRC, input sources]
agent: argos
context: hand
retrieval: Answer which data-fetching workflows exist, what each one returns, what geometry it takes, and which numbered input source it satisfies.
source_of_truth: core/workflows/ registry in langgraph-agents
validation_status: mirrors the registry as of 2026-09-14; names are checked against it by tests/test_workflow_catalogue.py
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

## The four that exist

| Workflow | What it gives | Geometry | Source | Input source |
|---|---|---|---|---|
| `fetch_weather_data` | Cloud cover, hourly and daily rain, wind, shortwave radiation, and two soil-moisture layers | **One point** | [[ERA5-Land via Open-Meteo Archive]] | 1 |
| `fetch_lulc_data` | Six land-cover indices -- NDVI, NDBI, [[BUI]], NDMI, NMDI, [[MNDWI]] -- from the most recent usable scene | **Bounding box** | [[Sentinel-2 C1 L2A]] | 2 |
| `fetch_terrain_data` | Elevation and slope statistics; cached, because terrain does not change | **Bounding box** | [[Copernicus DEM GLO-30]] | 3 |
| `fetch_permanent_water` | Permanent and seasonal water extent, so a river in its channel is not counted as flood | **Bounding box** | [[JRC Global Surface Water]] | 4 |

None needs an account, a key or asset signing.

## What a router needs to know before choosing one

- **Point against bounding box.** `fetch_weather_data` takes a single point;
  the other three take a bounding box. Sending the wrong geometry is the most
  common routing mistake.
- **Batch related work into one request.** Several tasks in one list each come
  back as their own result. Two hops for work that could have gone together
  wastes a delegation.
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

---

Related: [[Workflows-MOC]] | [[Citadel flows - MOC]] | [[Citadel input sources]] | [[Agent Argos - Orchestrator]] | [[Monty - Python expert]] | [[Sentinel-2 C1 L2A]] | [[Copernicus DEM GLO-30]] | [[JRC Global Surface Water]] | [[ERA5-Land via Open-Meteo Archive]]
