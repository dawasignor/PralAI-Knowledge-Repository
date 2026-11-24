---
type: registry
desc: Numbered registry of every input a Citadel node can draw on; the `inputs_required` array on a node holds these integers
aliases: [input sources, input source list, inputs required, source registry]
keywords: [input sources, registry, inputs required, workflow inputs, data sources, monty workflows, session context, vault, population, INFORM, HydroWASTE, OSM]
agent: citadel
context: hand
retrieval: Answer which numbered input sources a Citadel node can draw on, which of them are wired to code today, and which are named but not yet available.
validation_status: numbers 1-6 are wired and verified in code; 7 onward are identified only, nothing fetches them
status: stub
tags: [registry, inputs, citadel, workflow]
---

## How this list is used

A node's `inputs_required` is an array of positive integers indexing this
table. `inputs_required: [1, 3, 9]` means the node needs the weather series,
the terrain, and population density.

**Numbers are permanent.** Once assigned, an integer is never reused and never
renumbered, because nodes cite it. Append new sources at the end.

## Wired -- a code path exists today

| # | Source | Provider | Reached through |
|---|---|---|---|
| 1 | Weather and soil moisture series | Open-Meteo Archive + ERA5-Land | `fetch_weather_data` |
| 2 | Land-cover indices (NDVI, NDBI, BUI, NDMI, NMDI, MNDWI) | Sentinel-2 L2A | `fetch_lulc_data` |
| 3 | Elevation and slope | Copernicus DEM GLO-30 | `fetch_terrain_data` |
| 4 | Permanent and seasonal water extent | JRC Global Surface Water | `fetch_permanent_water` |
| 5 | Session context: AOI bounding box, region name, event and time window, demographics, and what the session has established so far | Argos, from [[Chanakya session record]] | `active_context` on the node, plus the `read_session` tool |
| 6 | Vault knowledge notes | This vault | MCP retrieval |

## Named, not wired -- no code fetches these yet

*(Sources 21 and 22 are appended here to keep the numbering append-only, and are
wired -- see the note below the table.)*

Listed so a node can declare what it actually needs, and so the gap between
what a flow requires and what the repo can supply is visible rather than
assumed.

| # | Source | Candidate provider | Wanted by |
|---|---|---|---|
| 7 | Wastewater treatment plants and outfalls | HydroWASTE | [[Human health risk]] |
| 8 | INFORM Risk, vulnerability and climate-change vulnerability, by country and year | INFORM / JRC | Every flow, for the vulnerability step |
| 9 | Population density and distribution | TOTAG | Every exposure step |
| 10 | Building footprints and building use | TOTAG | Exposure; [[Cultural heritage and home flooding risk]] |
| 11 | Road network and travel time | TOTAG | [[Critical infrastructure and waterlogging]] |
| 12 | Health facilities and emergency services | TOTAG | [[Critical infrastructure and waterlogging]] |
| 13 | Electricity network and generation assets | TOTAG | [[Power outage and disruption risk]], [[Electric shock hazard]] |
| 14 | Cooking-fuel and LPG/pipeline distribution data | TOTAG | [[Primary cooking fuel disruption]] |
| 15 | Drinking-water supply and WASH service levels | WHO / UNICEF JMP | [[Drinking water scarcity]] |
| 16 | Humanitarian and government event data for the AOI | HDX, national agencies | Every flow, for local context |
| 21 | Gazetteer: place name to bounding box, country and admin region | OpenStreetMap Nominatim, via geopy | Session resolution, before any flow runs |
| 22 | Disaster register: recorded events with hazard type, start and end dates and alert level | GDACS (EU Joint Research Centre with UN OCHA) | Session resolution, to anchor a time frame to a real event |
| 17 | Landslide and slope-instability inventories | TOTAG | [[Rockfall treefall and landslide risk]] |
| 18 | Cultural and heritage asset registers | TOTAG | [[Cultural heritage and home flooding risk]] |
| 19 | River gauge, discharge and coastal sea-level data | TOTAG | [[River and ocean hazard]] |
| 20 | Guidance and standards from WHO, UN-Water and UNEP | WHO, UN-Water, UNEP | Every recommendation step |

**Sources 21 and 22 are wired**, despite sitting under this heading: numbers
are permanent and appended in order, so a source wired after number 20 is
numbered after it. `core/places.py` reads both, once per session, and the
result is written to the session record rather than fetched again per node.

**TOTAG** means the provider has not been chosen. Choosing one is a decision,
not a lookup: licence, coverage, resolution and update cadence all have to
hold for the AOIs this project runs over.

---

Related: [[Chanakya node schema]] | [[Chanakya flows - MOC]] | [[Agent Chanakya - City Planner]] | [[Workflows-MOC]]
