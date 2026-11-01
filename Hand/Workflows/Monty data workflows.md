---
type: catalogue
desc: The data-fetching functions Monty can execute, what each one gives, and which numbered input source it satisfies
aliases: [Monty workflows, data workflows, workflow catalogue, what workflows exist, registered functions]
keywords: [workflows, catalogue, monty, where_am_i, area overview, localities, districts, accuracy_metrics, agreement, validation, UNOSAT, data_availability, NRT availability, which products have data, STAC, CMR, sensitivity_analysis, rank_flood_products, weight sensitivity, rank reversal, fetch_weather, fetch_weather_data, fetch_weather_grid, fetch_lulc_data, fetch_terrain_data, fetch_permanent_water, fetch_place_context, registry, data fetching, Open-Meteo, ERA5, Sentinel-2, Copernicus DEM, JRC, Nominatim, Overpass, GDACS, bounding box, geocoding, input sources]
agent: argos
context: hand
retrieval: Answer which data-fetching workflows exist, what each one returns, what geometry it takes, and which numbered input source it satisfies.
source_of_truth: core/workflows/ registry in langgraph-agents
validation_status: mirrors the registry as of 2026-10-25 (weather rows only updated that day; full pass pending); names are checked against it by tests/test_workflow_catalogue.py
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
| `fetch_weather` | **The one weather tool.** Rain, cloud cover (total and low), wind, gusts and direction, temperature, humidity, pressure, shortwave radiation and ET0, sampled across the AOI and aggregated per hour (mean / max / p90 / area fraction), with storm totals, antecedent index, rain bursts and the sensor-gate inputs. No soil moisture since 2026-10-25 | **Bounding box** | [[ECMWF IFS via Open-Meteo Archive]] by default; ERA5 on request. The model is named in every request | 1 |
| `fetch_lulc_data` | Six land-cover indices -- NDVI, NDBI, [[BUI]], NDMI, NMDI, [[MNDWI]] -- from the most recent usable scene, mosaicked across MGRS tiles when no single scene covers the AOI | **Bounding box** | [[Sentinel-2 C1 L2A]] | 2 |
| `fetch_worldcover` | **The land-cover fallback.** Share and area of each ESA WorldCover class (tree cover, shrubland, grassland, cropland, built-up, bare, water, wetland, mangroves, ...) over the **land** of the AOI, with the published per-class accuracy. Used for the vegetation and built-up ranking indices **only when Sentinel-2 (`fetch_lulc_data`) has failed its 0.7 cloud threshold** for this AOI -- the threshold is never lowered instead. A **2021 snapshot**: it says nothing about the weeks before the event, and tree cover is not dense NDVI, built-up is not BUI | **Bounding box** | ESA WorldCover 10 m 2021 v200 (Zanaga et al. 2022); 76.7% overall accuracy | 2 (fallback) |
| `fetch_terrain_data` | Elevation and slope statistics; cached, because terrain does not change | **Bounding box** | [[Copernicus DEM GLO-30]] | 3 |
| `fetch_permanent_water` | Permanent and seasonal **inland** water extent, so a river in its channel is not counted as flood | **Bounding box** | [[JRC Global Surface Water]] | 4 |
| `rank_flood_products` | Ranks the five NRT flood-mapping products for one event by TOPSIS, with the decision matrix, its evidence, the ideal points and the ranking | **Five indices**, not geometry | [[Flood_mask_Dataset_MCDA]] | consumes 1, 2, 3 |
| `sensitivity_analysis` | How far one criterion weight can move before that ranking changes: the smallest change that reorders it, the weight at which the top product changes, rank agreement across each sweep, and the closeness curves | **Five indices**, not geometry | [[Sensitivity Analysis]] | consumes 1, 2, 3 |
| `data_availability` | Which of the five NRT flood products observed the AOI on each day of the event window, as acquisitions (one pass, not one file), with a product-by-day chart. MODIS MCDWD and VIIRS VCDWD keep about a week of archive, so older days are *not checkable* and carry the model cloud cover at their overpass instead | **Bounding box** + date range | EODC STAC (GFM); NASA CMR-STAC (OPERA DSWx, LANCE MCDWD/VCDWD); [[ECMWF IFS via Open-Meteo Archive]] for cloud | precondition for the MCDM; no numbered input source |
| `where_am_i` | What an AOI is, before any analysis, **for any country**: an OpenStreetMap image of the bounding box (box drawn, framed to fill 75% of the image) with its cities, towns and water infrastructure labelled; the **first- and second-order administrative units** it lies in or crosses (levels read per country -- Sri Lanka province/district, Thailand province/amphoe) and its cities and towns; counts of mapped buildings, hospitals, schools, commercial buildings, food or grocery shops, marketplaces and substations; and **water-related influences** -- hydropower and dams, water-supply reservoirs, river gauges, water treatment and intakes (within 60 km) and river crossings, floodplain industry and quarries, flood protection (in the AOI). Mapped features only; a failed category is missing, never 0; **nothing is claimed to be upstream** (searched by distance, no basin dataset) | **Bounding box** | [[OpenStreetMap Overpass]]; OpenStreetMap standard tile layer | partly 10, 12, 13, 19 and 21 |
| `fetch_world_bank_indicators` | National GDP (current US$) and national population, each the latest year with a value. **National only** -- never an AOI's figure | **Country** (ISO3) | World Bank WDI | context for the Public Report and the Executive Summary |
| `fetch_inform_risk` | INFORM Risk (0-10): overall, Hazard & Exposure, Vulnerability, Lack of Coping Capacity, from the latest release **published before** the date given; INFORM Climate Change 2022 for 2050 and 2080, pessimistic and optimistic. National | **Country** (ISO3) + a date | EC JRC INFORM | vulnerability context |
| `get_pop_data` | Population inside a bounding box from WorldPop Global2 (R2025A v1, constrained, ~100 m), any country, year 2015-2030 (default 2025): the sum of the pixels whose centre is in the box, with the edge band as a range. One country per call | **Bounding box** + country (ISO3) | WorldPop Global2 R2025A | people exposed |
| `search_previous_disasters` | Disasters recorded in the country **before** the event -- never during it -- from internationally recognised bodies: GDACS, Copernicus EMS activations, UNOSAT products and World Bank post-disaster assessments. National news and government reports are not searched yet, and the result says so. Each record dated, linked and cited short, e.g. (World Bank, 2017). No casualty figures | **Country** + the cutoff date | GDACS, Copernicus EMS, UNOSAT, World Bank | history for the reports |
| `get_flood_extent` | One NRT product's flood extent over the AOI for the event window, from the experiment's validation config (accuracy work; pipelines use `get_flood_map`): flood area over land (sea and permanent water out), observed area, coverage, and a raster for the road checks. A product that maps no flood returns 0 km2 with the reason | **config.yaml** + product key | the chosen product (best-ranked) | flood-dependent outputs |
| `get_flood_map` | The best-ranked NRT product's flood map for **any AOI**, with no validation config (BUG-021): the product is read for the user's bbox and window from a shared catalogue -- GFM (EODC STAC), MODIS / VIIRS 2-Day (NASA GIBS), OPERA DSWx-HLS / DSWx-S1 (NASA PO.DAAC, downloaded with the Earthdata token; NOT KNOWN when the login is missing or refused) -- every pass unioned; flood area over land (sea and JRC permanent water out), observed area, coverage, an extent raster for depth and roads, and the **flood overlay** figure: the extent on OpenStreetMap with the AOI box, places and buildings of interest (grey = land not observed). The map the public report and executive summary show | **Bounding box** + window + product (+ this run's water_class.tif) | the chosen product (best-ranked) + OpenStreetMap | flood-dependent outputs, report maps |
| `calc_flood_depth` | **NOT AVAILABLE** (switched off 2026-11-01; do not call or suggest). Floodwater depth inside the extent by FwDET v2.1 (Cohen et al. 2022) on the GLO-30 surface model, with its error: K seeded DEM perturbations within GLO-30's relative vertical accuracy and the boundary shifted one pixel each way, giving the spread and the chance each pixel changes depth band. Vehicle classes 0.3 / 0.6 m and the 10 cm advisory. **A precision, not an accuracy**, and biased high where trees or buildings line the flood | **Bounding box** + the extent raster from `get_flood_map` | Copernicus DEM GLO-30 + the extent | flood depth, road passability |
| `assess_road_access` | **NOT AVAILABLE** (switched off 2026-11-01; do not call or suggest). Km of mapped road by class that is flooded, dry or not observed; bridges in the flood extent; hospitals with a flooded road within 250 m (assumed). With the depth raster from `calc_flood_depth`, flooded road by Kramer class (passable by car / emergency vehicles only / impassable) and the km whose class is unstable; without it, no road is called passable or impassable | **Bounding box** + an extent raster (+ the depth rasters) | OpenStreetMap + the extent (+ the depth) | roads and access |
| `check_slope_tree_roads` | **NOT AVAILABLE** (switched off 2026-11-01; do not call or suggest). Road segments beside ground that is steep (over 30 degrees, source pending) and tree-covered: notes for road access, **not a forecast**. Few or none on flat ground is a finding | **Bounding box** | Copernicus DEM + WorldCover 2021 + OpenStreetMap | roads and access |
| `accuracy_metrics` | Agreement of each NRT product with a reference flood map (UNOSAT FL20251128LKA for Kelani): coverage, precision, recall, F1, IoU, MCC and the confusion matrix on the product's native grid, in one table sorted by F1 beside the TOPSIS rank. **Entro interprets the table** in the same run, through its `accuracy_interpretation` flow. The one parameter is the path to a `config.yaml`; for Kelani 2025 that is `experiments/kelani-2025-west/validation/config.yaml` | **config.yaml** (AOI, reference, products inside it) | [[Validation against the UNOSAT reference]]; [[UNOSAT FL20251128LKA flood reference]] | validation of the MCDM; no numbered input source |

**Retired (2026-10-25): `fetch_place_context`.** A place name is turned into a
bounding box before any routing (the resolver), the event lookup is appended
by the event-records step, and `where_am_i` now counts houses and apartments
too. A call by the old name is refused and names `where_am_i`.

**Renamed and retired (2026-10-25).** `fetch_weather` was registered as
`fetch_weather_grid` until that day; the old name still resolves to it. The
point weather workflow `fetch_weather_data` is **retired**: a call by that name
is refused and names `fetch_weather` instead. Cached payloads from before keep
their soil moisture.

The three bounding-box EO workflows **exclude the sea before they count
anything**, and report over the land area. See
[[Excluding the sea from AOI statistics]].

The first four fetch data. **`rank_flood_products` and `sensitivity_analysis`
fetch nothing** -- the first is the decision step and consumes what the others
produced, the second asks how much of that decision rests on the weighting.
**`data_availability` is the glance before that decision**: a product can rank
first on paper and have no acquisition over the AOI during the event. None of
the data workflows needs an account, a key or asset signing.

**A place name is resolved before routing.** The resolver turns it into a
bounding box and the session record keeps it; every geometry workflow takes
that box. Never guess coordinates.

## What a router needs to know before choosing one

- **Bounding box, not point.** Every geometry workflow takes a bounding box,
  and the box comes from the session (the resolver settled it from the place
  name). Sending the wrong geometry is the most common routing mistake.
- **One weather workflow.** `fetch_weather` describes an area and produces
  the sensor-gate inputs the MCDM reads -- see [[Weather output schema]].
  Asked about a single place, give it a small box around that place; there is
  no point workflow any more.
- **`where_am_i` counts *mapped* features, not features.** OSM coverage is
  excellent in some cities and thin in others, so a low count can mean few
  buildings or few surveyors. Never report one as a population, an asset total
  or a damage denominator without saying where it came from. A category that
  failed is absent from the counts, never present as `0`.
- **It is slow** -- 30 to 90 seconds measured on the locked Kelani AOI
  (2026-10-25), because it asks a shared public Overpass endpoint. Ask for it
  once and keep the answer in the session.
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

Inputs 7 to 20 in [[Chanakya input sources]] have **no workflow behind them** --
wastewater plants, INFORM, population, building footprints, road networks,
health facilities, the electricity network, gauges. Every Citadel flow needs at
least one of them, so no flow can run end to end on this catalogue alone.

Since 2026-10-25 several are covered in part: `fetch_inform_risk` (INFORM),
`get_pop_data` (population), `where_am_i` (facility **locations** -- health,
water and wastewater, government, industry -- not only counts) and
`assess_road_access` with `get_flood_extent` (the road network against a flood
extent; NOT AVAILABLE since 2026-11-01). Mapped OSM features are still mapped features, not the full asset
register an exposure study would want.

---

Related: [[Flood_mask_Dataset_MCDA]] | [[Sensitivity Analysis]] | [[SMAA]] | [[Workflows-MOC]] | [[Chanakya flows - MOC]] | [[Chanakya input sources]] | [[Agent Argus - Orchestrator]] | [[Monty - Python expert]] | [[Sentinel-2 C1 L2A]] | [[Copernicus DEM GLO-30]] | [[JRC Global Surface Water]] | [[ERA5-Land via Open-Meteo Archive]] | [[Weather output schema]] | [[OpenStreetMap Nominatim]] | [[OpenStreetMap Overpass]] | [[GDACS disaster register]]
