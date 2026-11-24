---
type: knowledge
uncertainty_kind: level
level: tool
desc: The standing data-source and method uncertainty of every tool Monty runs, one section per tool
aliases: [standing uncertainty, tool uncertainty statements, data source uncertainty, method uncertainty, DATA, METHOD, MODEL]
keywords: [uncertainty, standing, data source, method, model uncertainty, per tool, what affects reduce, RQ5, RQ6]
workflows: [every tool]
source_workflow: core/workflows/__init__.py
retrieval: For one tool, what can its data source not tell you, what does its own method add, and how could each be reduced?
validation_status: reasoned; figures are the producers' published accuracies or measured in this repo, each named where it is used
status: draft
tags: [uncertainty, level]
---

## What standing uncertainty is

Every tool carries two standing statements that hold for every run, whatever
the event: **data source** (what the data cannot tell you) and **method** (what
the tool's own processing adds). They are registered with the tool
(`@tool(..., data_source_uncertainty=, method_uncertainty=)`), attached to every
stored result as `uncertainty.standing`, and printed as DATA / METHOD / MODEL
lines at the top of the tool's block in the register Entro reads with
`read_uncertainty`. The run's own measured items (valid fraction, coverage,
gaps) follow under the four levels -- see [[Uncertainty - Tool call]].

**Model uncertainty** is the third kind, and it is not per tool: how much an
answer moves when the same event is run again. It is a todo, to be assessed by
running the same event 10 times uncached (RQ5 N = 10 batch, `scripts/run_n.py`)
and comparing the runs (`core/compare.py`).

**How the statements are written** (user, 2026-10-30 and 2026-11-01): short, to
the point, about two sentences. Where the uncertainty matters for the analysis
it is written as pointers instead -- what it is, how it affects the result, how
it can be reduced. The format is guidance, not a check. The code is the copy
attached to results; this note mirrors it for retrieval.

## where_am_i - Where am I (OpenStreetMap)

- **Data source (OpenStreetMap tiles and Overpass API).** Only what OpenStreetMap has mapped; completeness varies by place, and in Sri Lanka most buildings carry only building=yes.
- **Method.** Counts within the bounding box, and nearby features by distance only, so nothing is claimed to be upstream. A category that failed is listed as missing, never as 0.

## fetch_weather - Event weather (gridded)

**Data source (Open-Meteo Archive (ECMWF IFS by default; ERA5 on request)).**
- **What:** model output, not observation -- ECMWF IFS at 9 km (ERA5 at 31 km) smooths convective rain smaller than a grid cell, and its cloud cover is modelled, not seen by a satellite.
- **Affects:** storm totals and rain bursts, and the cloud and wind values that set the ranking's weights.
- **Reduce:** compare with rain gauges or GPM IMERG; keep IFS rather than ERA5 for small AOIs.

**Method.**
- **What:** statistics over grid points sampled across the bounding box; sea points are included (about half the Kelani grid, BUG-033) and aoi_mask is recorded but not applied.
- **Affects:** area means and area fractions, which become the ranking's cloud and wind inputs.
- **Reduce:** land-mask the grid points before aggregating.

## fetch_lulc_data - Land-cover indices

**Data source (Sentinel-2 L2A).**
- **What:** optical imagery, so cloud and shadow hide land, the SCL cloud mask misclassifies some pixels, and the usable scene can be weeks older than the event.
- **Affects:** every land-cover share feeding the ranking; the indices are proxies too -- BUI > 0.2 gives 0.19 % built-up where WorldCover gives 17 % (BUG-010).
- **Reduce:** radar (Sentinel-1), multi-scene composites, or a check against WorldCover.

**Method.**
- **What:** the most recent scene whose clear land reaches 0.7 of the AOI (fixed; no lower threshold is tried), with statistics over the clear part only.
- **Affects:** up to 30 % of the land may be unobserved, and cloud gathers over high ground, so this is a bias, not random noise.
- **Reduce:** report the valid fraction and the threshold used beside each share (done), and prefer recent clear scenes.

## fetch_worldcover - Land cover (WorldCover 2021)

- **Data source (ESA WorldCover 2021 v200).** A single 2021 map with 76.7 % overall accuracy; built-up, the weakest class that matters here, has 65.9 % user's accuracy, and the map says nothing about land in the weeks before the event.
- **Method.** Class shares over land at the native 10 m, with no resampling. Standing in for Sentinel-2 in the ranking, its tree-cover and built-up classes are not the same thing as the NDVI and BUI thresholds.

## fetch_terrain_data - Elevation and slope

- **Data source (Copernicus DEM GLO-30).** GLO-30 is a surface model (buildings and canopy included) from 2011-2015 radar, with relative vertical error under 2 m on gentle slopes and under 4 m on steep ones (90 % of points). Slope is overstated at building and tree edges and understated where a canopy flattens the true ground.
- **Method.** Slope from the 30 m DEM in fixed classes over land, sea excluded; class shares near a class boundary move with small elevation errors.

## fetch_permanent_water - Permanent water baseline

- **Data source (JRC Global Surface Water).** Water frequency from 36 years of Landsat (1984-2021) at 30 m: it misses rivers narrower than about 30 m and any change after 2021, and cloudy monsoon seasons give it fewer looks.
- **Method.** Permanent means water in at least 90 % of observations and seasonal 25-90 % (Pekel et al.), with the sea removed. Both thresholds are conventions, so the baseline shifts if they shift.

## data_availability - NRT product availability

- **Data source (EODC STAC (GFM); NASA CMR-STAC (OPERA, LANCE); NASA GIBS (MODIS, VIIRS older days); Open-Meteo (cloud)).** The catalogues list what was published, not what was usable. MODIS and VIIRS NRT keep only about a week; older days come from the GIBS daily composite, which merges a day's passes (one per day, not a pass count), and their cloud at overpass is modelled (IFS).
- **Method.** Files within a few minutes of each other count as one pass, and days are local to the AOI from a timezone lookup with a solar-offset fallback; a wrong grouping or offset can move a pass to the wrong day.

## rank_flood_products - NRT flood product ranking

**Data source (MCDM template v3).**
- **What:** 30 evidence scores, five contested and some resting on author rules with no document behind them; the SAR revisit score (P2) is unresolved, and the five event values carry the uncertainty of weather, land cover and terrain.
- **Affects:** the product order itself.
- **Reduce:** settle the contested scores and P2 with a second coder; source the author rules.

**Method.**
- **What:** TOPSIS only, with no weighted-sum check or Spearman comparison; the weights are an author rule (event criteria first: 1/12 raised by each index, the rest shared by the product criteria) on equal 1/12 placeholders, and with the cloud gate off a rank is not a usability claim.
- **Affects:** the order can depend on the weighting more than on the evidence.
- **Reduce:** decide AHP or entropy weights, add the weighted-sum check, and read the rank with sensitivity_analysis and the cloud value beside it.

## sensitivity_analysis - MCDM weight sensitivity

- **Data source (MCDM template v3).** Everything in the ranking's uncertainty carries over; only the weights are moved.
- **Method.** Each weight is moved one at a time on a grid, so a joint change or a crossing narrower than grid_step goes unseen. A criterion whose multiplier is zero cannot be reached at all; SMAA would cover joint uncertainty.

## get_flood_map - Flood map and overlay

**Data source (GFM (EODC STAC) / MODIS, VIIRS (NASA GIBS) / OPERA (NASA PO.DAAC) + OpenStreetMap).**
- **What:** each product has blind spots -- GFM's exclusion mask (dense vegetation, urban), wind roughening the water for radar (GFM, OPERA DSWx-S1), cloud for optical (OPERA DSWx-HLS, MODIS, VIIRS), 250-375 m pixels for MODIS and VIIRS read from GIBS image colours on GIBS's own grid, and OPERA NOT KNOWN without the Earthdata login.
- **Affects:** flood km2, and with it depth, roads and the report maps; not observed can be a large share of the AOI.
- **Reduce:** compare several products, check against a reference map, and report observed coverage beside the flood area.

**Method.**
- **What:** every pass in the window is combined, so the result is the largest extent seen, not a snapshot; unobserved land stays unknown, never dry, and the sea and permanent water are excluded.
- **Affects:** the flood area is a maximum across the window, not the situation on any one day.
- **Reduce:** report per-pass extents and their dates beside the combined one.

## get_flood_extent - Flood extent

- **Data source (the chosen NRT product (GFM / OPERA / MODIS / VIIRS)).** The same product blind spots as get_flood_map, for a product named in the validation config.
- **Method.** The same combine-every-pass extent on the product's own grid, with the window and permanent water taken from the config, so it matches get_flood_map only when the two configs match.

## calc_flood_depth - Flood depth

**NOT AVAILABLE** -- the tool is switched off (2026-11-01); the code and these
statements are kept for when it returns.

**Data source (FwDET v2.1 on Copernicus DEM GLO-30).**
- **What:** GLO-30 is a surface model, so building and canopy heights raise the edge elevations and depth is biased high (BUG-014); any error in the flood extent passes straight into depth.
- **Affects:** depth bands, road passability and the people-in-depth bands.
- **Reduce:** a bare-earth DEM (FABDEM, for example) or a check against gauge water levels.

**Method.**
- **What:** the paper's defaults (10 smoothing passes, 0.5 % slope threshold) were never tested on GLO-30; the water surface comes from the nearest flood edge and negative depths are set to 0; the error estimate is 20 seeded DEM perturbations assuming normal, independent pixel errors.
- **Affects:** the spread of depths and the chance a pixel changes band.
- **Reduce:** tune the parameters on a known event, and add spatially correlated errors.

## get_pop_data - Population

- **Data source (WorldPop Global2 R2025A).** WorldPop Global2 R2025A is a modelled estimate, not a count: census totals are spread over settlement pixels by a random-forest model, and WorldPop labels this release alpha. Being constrained, it places people only where settlement is mapped, so missed settlements push people into neighbours.
- **Method.** The total sums the ~100 m pixels whose centre falls inside the bounding box, so the edge pixels can move it by the reported range. Only the named country's raster is read; any part of the box outside it is not counted.

## assess_road_access - Road and hospital access

**NOT AVAILABLE** -- the tool is switched off (2026-11-01); the code and these
statements are kept for when it returns.

- **Data source (OpenStreetMap (Overpass) + the flood extent).** Only roads OpenStreetMap has mapped are counted, and errors in the flood extent and depth carry through.
- **Method.** A flooded road near a hospital uses an assumed 250 m distance. The passability thresholds (0.3 / 0.6 m) are user decision D-36; the article behind them was not read.

## check_slope_tree_roads - Slope-and-tree road notes

**NOT AVAILABLE** -- the tool is switched off (2026-11-01); the code and these
statements are kept for when it returns.

- **Data source (Copernicus DEM GLO-30 + ESA WorldCover 2021 + OpenStreetMap).** Slope from GLO-30, tree cover from WorldCover 2021 and roads from OpenStreetMap, each with its own vintage and errors.
- **Method.** The 30 degree threshold has no source yet, so the results are notes for road access, not a forecast of blockage.

## fetch_world_bank_indicators - National GDP and population

- **Data source (World Bank WDI).** National figures in the latest year with a value; they are estimates and can be revised.
- **Method.** Each indicator takes its own latest year, so GDP and population can be from different years, and neither is the AOI's.

## fetch_inform_risk - INFORM risk (national)

- **Data source (EC JRC INFORM).** A national composite index (0-10) built from many indicators; the 2022 climate projections depend on the chosen scenarios.
- **Method.** It uses the release published before the event date, and climate-change scores are matched by country name, which fails if the names differ.

## search_previous_disasters - Previous disasters (before the event)

**Data source (GDACS, Copernicus EMS, UNOSAT, World Bank).**
- **What:** registers of events large enough to raise an alert, trigger a mapping activation or a World Bank assessment, so small and local floods are missing; national news and government reports are not searched, and the Copernicus EMS public list starts in 2023.
- **Affects:** the history reads as fewer and larger events than happened.
- **Reduce:** add a national source -- the disaster-loss database (DesInventar) where the government keeps one, or its disaster agency's situation reports.

**Method.** A national search by date before the event, one row per record and publisher, so one event can appear once per source; distance to the AOI is computed where a record has a location, but nothing is filtered by it, and casualty figures are not kept.

## accuracy_metrics - Agreement with a reference flood map

**Data source (UNOSAT reference via HDX; product STAC catalogues; JRC GSW; Copernicus DEM WBM).**
- **What:** the UNOSAT map is an operational product from its own date and sensor, not field-validated, which is why the result is agreement with the reference, not accuracy.
- **Affects:** every F1, IoU and MCC value, and their order.
- **Reduce:** the stratified labelled sample (Stehman estimates) already in the repo, and matching the reference date to the product passes.

**Method.**
- **What:** the reference is aggregated to each product's own grid inside a domain that excludes cloud, sea and permanent water, so products are compared over different covered areas.
- **Affects:** a product with low coverage can score well over a small area.
- **Reduce:** read coverage beside each metric (reported), and compare on the area all products observed.

## Links

Related: [[Uncertainty Analysis - MOC]] | [[Uncertainty - Input data]] | [[Uncertainty - Tool call]] | [[Uncertainty - Pipeline]] | [[Uncertainty - Decision]] | [[Monty data workflows]]
