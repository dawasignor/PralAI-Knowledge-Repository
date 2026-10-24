---
type: catalogue
desc: The data-fetching functions Monty can execute, what each one gives, and which numbered input source it satisfies
aliases: [Monty workflows, data workflows, workflow catalogue, what workflows exist, registered functions]
keywords: [workflows, catalogue, monty, where_am_i, area overview, localities, districts, accuracy_metrics, agreement, validation, UNOSAT, data_availability, NRT availability, which products have data, STAC, CMR, sensitivity_analysis, rank_flood_products, weight sensitivity, rank reversal, fetch_weather_data, fetch_weather_grid, fetch_lulc_data, fetch_terrain_data, fetch_permanent_water, fetch_place_context, registry, data fetching, Open-Meteo, ERA5, Sentinel-2, Copernicus DEM, JRC, Nominatim, Overpass, GDACS, bounding box, geocoding, input sources]
agent: argos
context: hand
retrieval: Answer which data-fetching workflows exist, what each one returns, what geometry it takes, and which numbered input source it satisfies.
source_of_truth: core/workflows/ registry in langgraph-agents
validation_status: mirrors the registry as of 2026-10-11; names are checked against it by tests/test_workflow_catalogue.py
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

## The ten that exist

| Workflow | What it gives | Geometry | Source | Input source |
|---|---|---|---|---|
| `fetch_place_context` | Bounding box, country and admin region for a **place name**; counts of the buildings, homes, apartments, commercial premises, hospitals and schools mapped inside it; and the disaster record matching the dates | **Place name** -> bounding box | [[OpenStreetMap Nominatim]] + [[OpenStreetMap Overpass]], [[GDACS disaster register]] | 21, 22; partly 10 and 12 |
| `fetch_weather_data` | Cloud cover, hourly and daily rain, wind, shortwave radiation, and two soil-moisture layers | **One point** | [[ERA5-Land via Open-Meteo Archive]] -- *labelled so; actually receives [[ECMWF IFS via Open-Meteo Archive]] (2026-09-26, unfixed)* | 1 |
| `fetch_weather_grid` | The same variables plus gusts, pressure, ET0 and humidity, sampled across the AOI and aggregated per hour (mean / max / p90 / area fraction), with storm totals, antecedent index, rain bursts and the sensor-gate inputs | **Bounding box** | [[ECMWF IFS via Open-Meteo Archive]] by default; ERA5 on request. The model is named in every request | 1 |
| `fetch_lulc_data` | Six land-cover indices -- NDVI, NDBI, [[BUI]], NDMI, NMDI, [[MNDWI]] -- from the most recent usable scene, mosaicked across MGRS tiles when no single scene covers the AOI | **Bounding box** | [[Sentinel-2 C1 L2A]] | 2 |
| `fetch_terrain_data` | Elevation and slope statistics; cached, because terrain does not change | **Bounding box** | [[Copernicus DEM GLO-30]] | 3 |
| `fetch_permanent_water` | Permanent and seasonal **inland** water extent, so a river in its channel is not counted as flood | **Bounding box** | [[JRC Global Surface Water]] | 4 |
| `rank_flood_products` | Ranks the five NRT flood-mapping products for one event by TOPSIS, with the decision matrix, its evidence, the ideal points and the ranking | **Five indices**, not geometry | [[Flood_mask_Dataset_MCDA]] | consumes 1, 2, 3 |
| `sensitivity_analysis` | How far one criterion weight can move before that ranking changes: the smallest change that reorders it, the weight at which the top product changes, rank agreement across each sweep, and the closeness curves | **Five indices**, not geometry | [[Sensitivity Analysis]] | consumes 1, 2, 3 |
| `data_availability` | Which of the five NRT flood products observed the AOI on each day of the event window, as acquisitions (one pass, not one file), with a product-by-day chart. MODIS MCDWD and VIIRS VCDWD keep about a week of archive, so older days are *not checkable* and carry the model cloud cover at their overpass instead | **Bounding box** + date range | EODC STAC (GFM); NASA CMR-STAC (OPERA DSWx, LANCE MCDWD/VCDWD); [[ECMWF IFS via Open-Meteo Archive]] for cloud | precondition for the MCDM; no numbered input source |
| `where_am_i` | What an AOI is, before any analysis, **for any country**: an OpenStreetMap image of the bounding box (box drawn, framed to fill 75% of the image) with its cities, towns and water infrastructure labelled; the **first- and second-order administrative units** it lies in or crosses (levels read per country -- Sri Lanka province/district, Thailand province/amphoe) and its cities and towns; counts of mapped buildings, hospitals, schools, commercial buildings, food or grocery shops, marketplaces and substations; and **water-related influences** -- hydropower and dams, water-supply reservoirs, river gauges, water treatment and intakes (within 60 km) and river crossings, floodplain industry and quarries, flood protection (in the AOI). Mapped features only; a failed category is missing, never 0; **nothing is claimed to be upstream** (searched by distance, no basin dataset) | **Bounding box** | [[OpenStreetMap Overpass]]; OpenStreetMap standard tile layer | partly 10, 12, 13, 19 and 21 |
| `accuracy_metrics` | Agreement of each NRT product with a reference flood map (UNOSAT FL20251128LKA for Kelani): coverage, precision, recall, F1, IoU, MCC and the confusion matrix on the product's native grid, in one table sorted by F1 beside the TOPSIS rank. **Entro interprets the table** in the same run, through its `accuracy_interpretation` flow. The one parameter is the path to a `config.yaml`; for Kelani 2025 that is `experiments/kelani-2025-west/validation/config.yaml` | **config.yaml** (AOI, reference, products inside it) | [[Validation against the UNOSAT reference]]; [[UNOSAT FL20251128LKA flood reference]] | validation of the MCDM; no numbered input source |

The three bounding-box EO workflows **exclude the sea before they count
anything**, and report over the land area. See
[[Excluding the sea from AOI statistics]].

The first six fetch data. **`rank_flood_products` and `sensitivity_analysis`
fetch nothing** -- the first is the decision step and consumes what the others
produced, the second asks how much of that decision rests on the weighting.
**`data_availability` is the glance before that decision**: a product can rank
first on paper and have no acquisition over the AOI during the event. None of
the data workflows needs an account, a key or asset signing.

**`fetch_place_context` is the one that produces a bounding box.** Four of the
others consume one; `rank_flood_products` and `sensitivity_analysis` consume no
geometry at all. If a request names a place and no geometry has been settled,
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
- **`fetch_lulc_data` fails often, and that is correct.** It requires 0.7 valid
  pixels over the whole AOI and will refuse rather than return a cloudy scene.
  Over monsoon terrain most AOIs fail at the defaults. That failure is a
  finding about optical EO, not a bug to work around -- see
  [[SAR versus optical for flood extent]] and
  [[Scene usability - SCL valid fraction]].
- **An AOI crossing an MGRS boundary is mosaicked, not refused.** Same-date
  scenes from the neighbouring tiles are pasted onto one grid. A mosaic reports
  `single_datatake`, which says whether its members are one pass of one
  satellite cut at a tile edge or several observations stapled together --
  **and that is never inferable from the timestamps**, because every tile
  product carries the time of its own cut. See
  [[Partial AOI coverage in Sentinel-2 scenes]].
- **The sea is excluded from every EO statistic, and the denominator moves with
  it.** `aoi.area_km2` is the LAND area; the bounding box is
  `aoi.bbox_area_km2` and is a denominator for nothing. On a coastal AOI the
  two differ by the whole sea -- 1,536 km2 of box against 1,321 km2 of land
  over the Kelani. Lakes and rivers are kept: they are catchment. JRC surface
  water is the layer that most needs this, because it records the ocean as
  water occurring 100% of the time. See
  [[Excluding the sea from AOI statistics]].
- **Built-up classification is unsettled.** `fetch_lulc_data` returns BUI
  statistics but no class fractions, and the index cannot separate built-up
  from bare soil in arid terrain. See
  [[BUI over NDBI - built-up index accuracy]] and
  [[Built-up fraction as an MCDM criterion]].

- **`rank_flood_products` is a decision, not a measurement, and it takes five
  numbers rather than a bounding box**: AOI cloud cover, wind speed,
  dense-vegetation share, steep share and built-up share. They come from the
  weather, LULC and terrain payloads, so it is the last call in a chain rather
  than a starting point.

  **What the event changes is the WEIGHTS, not the product scores.** A product
  is no better at seeing through cloud on a clear day; what changes is how much
  its cloud-blindness matters.

  **High cloud penalises, it does not exclude** (changed 2026-09-22:
  `cloud_gate` moved from 80 to 100, so it can no longer fire). The gate fired
  on a window MEAN while feasibility is per-overpass -- at 91.67% mean cloud
  over the Kelani event, 2 of 16 daytime overpasses were still under 80%, so
  rejection asserted a zero the record did not support. **The cost is that a
  rank is no longer a usability claim**: cloud is now in the compensatory pool,
  and MODIS MCDWD ranks 3rd over an event it could barely observe. Read `W1`
  and the cloud index beside any rank. The mechanism is intact -- setting
  `cloud_gate` below 100 restores the exclusion -- and any exclusion is
  reported with its reason. See [[Cloud compatibility]] and
  [[Flood_mask_Dataset_MCDA]].

  **Only TOPSIS is implemented.** The specification also describes a
  weighted-sum robustness check and a Spearman comparison of the two rankings;
  neither exists, so no ranking from this workflow may be called
  method-agnostic. See [[Flood_mask_Dataset_MCDA]].

- **`sensitivity_analysis` asks how much of that ranking is the weighting.** It
  takes the same five indices, re-runs the ranking itself, then moves one
  criterion weight at a time across its whole range with the other eleven held
  in proportion, and reports the smallest move that changes the order. Route to
  it when a rank is about to be acted on, or when someone asks how robust one
  is -- never as a way of finding a weighting that produces a preferred answer.

  **It perturbs weights and nothing else.** Scores, the contested evidence
  cells, the unresolved P2 range and the author parameters all stay where the
  ranking left them, so a result that is stable here is not thereby stable
  against a different score.

  **A criterion whose modulator is zero is unreachable**, and the output says
  so rather than quietly reporting a threshold no base weight can reach. Its
  sweep answers what that criterion would have to be worth, not what it can be
  set to.

  **It moves one weight at a time**, so it cannot see a threshold two criteria
  cross together, and the fractions it reports are shares of the weight range
  rather than probabilities. Weighting that space is [[SMAA]]'s job.

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

Related: [[Flood_mask_Dataset_MCDA]] | [[Sensitivity Analysis]] | [[SMAA]] | [[Workflows-MOC]] | [[Citadel flows - MOC]] | [[Citadel input sources]] | [[Agent Argos - Orchestrator]] | [[Monty - Python expert]] | [[Sentinel-2 C1 L2A]] | [[Copernicus DEM GLO-30]] | [[JRC Global Surface Water]] | [[ERA5-Land via Open-Meteo Archive]] | [[Weather output schema]] | [[OpenStreetMap Nominatim]] | [[OpenStreetMap Overpass]] | [[GDACS disaster register]]
