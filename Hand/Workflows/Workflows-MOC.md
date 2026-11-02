---
type: moc
desc: Every tool and workflow in the project, each with its one plain line - the tools Monty runs, the workflows Norwood and Chanakya own, and the decision methods
aliases: [workflows, workflow list, all workflows, what workflows exist, workflow catalogue]
keywords: [workflows, catalogue, MOC, monty, citadel, data fetching, analysis, MCDA, SMAA, sensitivity, flows, index]
agent: argos
context: hand
retrieval: Answer what workflows exist in this project, which agent runs each kind, and where to look for one by name.
validation_status: index only; each entry links to the note that carries the detail
status: draft
tags: [moc, workflows, catalogue]
---

## Tools and workflows

The console's **Tools and workflows** graph shows the same three groups, and
a click on a node shows the one line below (`core/one_liners.py` holds them;
`tests/test_one_liners.py` checks this note carries every one verbatim).

| Kind | What it is | Who runs it |
|---|---|---|
| **Tool** | A registered Python function that fetches or computes data and returns JSON | Monty |
| **Workflow** | A thesis step: one or more tools, then a module or a brief | Norwood, or Chanakya for Modules 9 and 10 |
| **Decision method** | A method for choosing between options | listed below |

## Tools (Monty)

Signatures are truth in the registry, not in any note; what each tool is for
and when it is the wrong one: [[Monty data workflows]].

| Tool | Name | What it does |
|---|---|---|
| `accuracy_metrics` | Agreement with a reference flood map | Measures how closely each flood product agrees with a reference flood map. |
| `data_availability` | NRT product availability | Checks which of the five near-real-time flood products observed the area on each day of the event. |
| `fetch_inform_risk` | INFORM risk (national) | Gives the country's INFORM risk, vulnerability and coping-capacity scores, out of 10. |
| `fetch_lulc_data` | Land-cover indices | Measures vegetation, built-up and water indices from the latest cloud-free Sentinel-2 image before the event. |
| `fetch_permanent_water` | Permanent water baseline | Maps the water normally present, rivers, lakes and seasonal water, from JRC Global Surface Water. |
| `fetch_terrain_data` | Elevation and slope | Measures elevation and slope over the area from the Copernicus 30 m elevation model. |
| `fetch_weather` | Event weather (gridded) | Fetches the event's hourly rain, cloud and wind over the area from a named weather model. |
| `fetch_world_bank_indicators` | National GDP and population | Gives the country's GDP and population from the World Bank. |
| `fetch_worldcover` | Land cover (WorldCover 2021) | Gives the share of each land-cover class from ESA WorldCover 2021, the fallback when Sentinel-2 is too cloudy. |
| `get_flood_extent` | Flood extent | Reads one product's flood extent from a validation set-up, for checking it against a reference map. |
| `get_flood_map` | Flood map and overlay | Maps the flood from the best-ranked product over the area and window, with how much of the land it observed. |
| `get_pop_data` | Population | Counts the people in the area, and inside the mapped flood, from WorldPop. |
| `map_hazard_exposure` | Hazard and exposure map | Draws the flood with the hospitals, drinking-water facilities and food outlets it reaches. |
| `rank_flood_products` | NRT flood product ranking | Ranks the five flood products by how well each suits this event's cloud, wind, vegetation, slope and built-up conditions. |
| `search_previous_disasters` | Previous disasters (before the event) | Lists the floods and storms recorded in the country before the event, from international registers. |
| `sensitivity_analysis` | MCDM weight sensitivity | Tests how far each criterion's weight can move before the product ranking changes. |
| `where_am_i` | Where am I (OpenStreetMap) | Describes the area: its administrative units, towns, mapped facilities and water infrastructure, from OpenStreetMap. |

## Workflows (Norwood)

Every thesis workflow except Modules 9 and 10.

| Workflow | Module | What it does |
|---|---|---|
| Where am I | -- | What and where the area is, before any analysis. |
| Availability | Module 1 | Which flood products saw the area during the event. |
| Weather | Module 2 | The rain, cloud and wind of the event. |
| Land cover | Module 3 | What covered the ground before the flood. |
| Terrain | Module 4 | How high and how steep the ground is. |
| JRC water bodies | Module 5 | The water normally there, so it is not mistaken for flood. |
| AOI brief | Module 3 | The area before the flood, and how a flood map over it will behave. |
| Ranking | Modules 6-7 | Which flood product suits this event best. |
| Sensitivity | Module 8 | How firm that ranking is. |
| Accuracy | -- | How the flood products agree with a reference flood map. |

## Workflows (Chanakya)

| Workflow | Module | What it does |
|---|---|---|
| Essential services | Module 9 | The flood's reach to hospitals, drinking water and food, the people affected, and what to do. |
| Health risks | Module 10 | Sewage, drinking water, mosquitoes and mould after the flood, and what to do. |

The older single-topic Chanakya flows (sewage, drinking water, power, ...) stay
catalogued in [[Chanakya flows - MOC]]; the two workflows above are what the
console shows.

## Decision methods

- [[Flood_mask_Dataset_MCDA]] -- choosing a flood-mask dataset by weighted
  criteria
- [[SMAA]] -- stochastic multicriteria acceptability analysis
- [[Sensitivity Analysis]] -- which weight, moved how far, flips the ranking
- [[flood_damage_query]]

---

Related: [[Monty data workflows]] | [[Chanakya flows - MOC]] | [[Chanakya input sources]] | [[Chanakya node schema]] | [[Hand-MOC]] | [[Agent Argus - Orchestrator]]
