---
type: workflow
nexus: food
desc: Essential services after a flood - hospital accessibility, food aid and drinking-water aid - lost through inundation and through access, who loses them, and the conditions under which the literature finds each loss
aliases: [essential services, food aid and relief estimation, food aid, relief estimation, hospital accessibility, hospital access, drinking water aid, relief logistics]
keywords: [essential services, hospital accessibility, hospitals, road network, travel time, traffic rerouting, service population, road passability, 30 cm, betweenness centrality, food aid, food security, availability, access, utilisation, relief distribution, path reliability, drinking water aid, tube-wells, utility lifelines, supply chain, coordination, Sri Lanka]
agent: citadel
parent_workflow: Essential services
workflow_order: 1
prev_node: argos
next_node: argos
inputs_required: [3, 4, 5, 8, 9, 11, 12, 15, 16]
context: hand
retrieval: Answer whether people in the AOI can still reach a hospital, receive food aid and receive safe drinking water after this flood, under which conditions the literature finds each service lost, and where the analysis is least certain.
sources_note: Essential services - sources
card: agents/citadel/workflows/essential_services.md
prominent_sources: [Wassmer et al. 2025, Pregnolato et al. 2016, Galli et al. 2025, Li et al. 2025]
validation_status: renamed from Food aid and relief estimation 2026-11-12; Knowledge section written 2026-11-12 from 19 papers in the user's Zotero (Wassmer et al. 2025 read in full; one paper abstract only; one listed paper has no readable copy); nothing implemented
status: draft
tags: [workflow, citadel, essential services, hospitals, food, water, relief]
---

## How this note is cited

Every claim carries a short citation -- **(Wassmer et al. 2025)**. The full
reference for each key is in [[Essential services - sources]], fetched
alongside this note when the flow runs. Quote the vintage with the figure.

## The question, and the correct starting assumption

Essential services here means three things: **access to hospitals**, **food
aid** and **drinking-water aid**. The question is whether the people in this
AOI can still reach each one after the flood, and what should be done where
they cannot.

**A service is lost through access, not only through inundation.** A
hospital outside the flood can still be lost to the people it serves, and a
dry hospital can be overwhelmed by patients rerouted from flooded ones
(Wassmer et al. 2025). Judge every service by whether people can reach it,
not only by whether it sits inside the flood extent.

## Node

Conforms to [[Chanakya node schema]]. One Chanakya node, between two Argus
ones: `prev_node` Argus with the user input; `next_node` Argus, to update the
session and answer the user. Inputs `[3, 4, 5, 8, 9, 11, 12, 15, 16]` index
[[Chanakya input sources]]: terrain, permanent water, session, INFORM,
population, roads, health facilities, water supply, and event data.

## Knowledge -- what the literature finds, and under which conditions

**How to use this section.** Each entry gives the **conditions** under which
a paper found something, the **finding**, and what it does **not** support.
Use a finding for this AOI only where the facts of this run meet its
conditions. Otherwise report it as evidence from elsewhere, naming the
setting, or leave it out.

### Hospital accessibility

#### K1. Hospitals far from the flood can be lost

- **When:** Germany, national scale. Floods are simulated on major rivers. A
  road closes at 0.3 m of water. Traffic is set to rush-hour congestion, and
  hospitals and roads come from OpenStreetMap (Wassmer et al. 2025).
- **Finding:** of 2,475 hospitals, **75** saw their service population rise
  by more than 30% from flood-related traffic disruption alone. The authors
  take 30% as the typical capacity limit of a German hospital. **About a third
  of these (26) are more than 10 km from the nearest inundation**, 13 more
  than 15 km, and two more than 30 km. These facilities may not know they are
  at risk (Wassmer et al. 2025).
- **Two mechanisms:** critical road links are lost and travel times rise; and
  neighbouring hospitals are disabled, so their patients are redirected to
  those that remain (Wassmer et al. 2025).
- **Not proportional to flood frequency:** basins with similar numbers of
  flood events differed widely in how many hospitals were vulnerable
  (Wassmer et al. 2025).
- **Earlier events the paper cites:** the 2021 closure of St.-Antonius
  Hospital in Eschweiler, whose patients went to seven neighbouring
  facilities; bridges destroyed in England in 2009, which raised travel times
  eightfold for six months; and hospital overload in the 2011 Thailand and
  2023 Italy floods (Wassmer et al. 2025).
- **Duration:** the model cannot say how long a loss lasts. After the 2021
  German floods, temporary bridges took two to seven days, and full
  reconstruction can take more than three years (Wassmer et al. 2025).
- **Does not support:** the 30% capacity limit outside Germany; a count of
  affected hospitals for this AOI. The model also leaves out ambulances
  bypassing congestion, helicopters, debris and flow velocity.

#### K2. When a road stops being passable

- A depth of **30 cm** -- the average sill height of a car -- makes a road
  impassable for most cars. Below that, safe speed falls as the water deepens
  (Pregnolato et al. 2016). (Wassmer et al. 2025) use the same 30 cm limit.
- Recommended safety limits are a total head of **0.3 m for passenger cars**
  and **0.6 m for emergency vehicles**. Civil traffic should not be allowed on
  inundated streets during urban floods (Kramer et al. 2016).
- **Does not support:** passability where water flows fast or carries debris.
  The 30 cm limit leaves both out (Wassmer et al. 2025).

#### K3. Which roads matter

- **Network position, not road area.** Betweenness centrality weighted by
  travel time picks out the critical locations quickly. In Newcastle upon
  Tyne, protecting the single top-ranked location cut person delays by 11%.
  Delays were significant even in a 1-in-10-year event
  (Pregnolato et al. 2016).
- **The method decides which roads are flagged.** In Switzerland, absolute
  flooded road area flags dense urban floodplains; relative flooded area flags
  mountain areas; a network measure flags the most-connected links. Isolated
  valleys reached by a single flood-exposed road show up where the relative
  method ranks higher than the network method (Papilloud et al. 2020).
- **Where flooded roads hurt most:** in Wuhan under pluvial floods, near water
  bodies, on low-lying ground and where commute demand is high. Traffic
  became more uneven as the return period rose (Chen et al. 2024).
- **Sri Lanka, terrain and drainage:** most of the population and economic
  activity sit in low-lying, flood-prone areas. The steep Central Highlands
  act as a funnel: in extreme events rain reaches the low-lying coastal plains
  so fast that even advanced drainage can be overwhelmed. Most drainage and
  reservoir systems are designed for 1-in-50 or 1-in-100-year events
  (Amaratunga and Kodituwakku 2026).

#### K4. How delays unfold

- Calgary, 2013 flood: the flood raised travel delays by roughly **12-65%**
  and distances travelled by **30-45%** (Rebally et al. 2026).
- Rain causes delays **before** the floodwater arrives, through lower road
  friction and visibility. Impacts move from indirect, to compound, to
  cascading as the event goes on (Rebally et al. 2026).

#### K5. The health system around the hospital

- Demand for care rises after a flood while access to it falls
  (Yang et al. 2024). See [[Human health risk]].
- A hospital that stops working can significantly increase the loss of life.
  Accessibility depends on the distances between facilities and homes, and on
  how redundant the facilities and roads are (Galderisi and Limongi 2021).
- INFORM's Lack of Coping Capacity includes access to health care, alongside
  communication and physical infrastructure. It is **national**
  (Marzi et al. 2021).
- Impact-based forecasts give context such as the people at risk and
  vulnerable key infrastructure, hospitals and access roads among it
  (Dasgupta et al. 2025).

### Food aid

#### K6. What a flood does to food security

- Food security has pillars: availability, access and utilisation, with
  stability across them (Galli et al. 2025).
- **Malawi, 2015 floods:** the agricultural losses equal food for more than
  **300,000 people** (almost 4% of the population) and the diet balance of
  almost **2.3 million**. Utilisation impacts -- diets unbalanced by losing
  specific foods -- were the most intense and widespread. Availability impacts
  outweighed access impacts. Poorer and less food-secure districts were hit
  hardest (Galli et al. 2025).
- **Conditions that change it:** availability impacts are stronger where
  smallholders farm for their own consumption. Access impacts grow where trade
  networks cannot absorb a supply shock. Utilisation impacts depend on the
  existing health and sanitation infrastructure (Galli et al. 2025).
- **Does not support:** a food-aid caseload or ration for this AOI. The
  Malawi figures come from post-disaster assessment data and carry high
  uncertainty (Galli et al. 2025).

#### K7. Relief has to reach people

- Shanghai's Fengxian District, under a Zhengzhou "720" rainstorm scenario:
  relief is allocated from market supply depots that must keep supplying
  their original demand points as well as the shelters. Routes are chosen on both **travel time and path
  reliability**, with the flood's effect on travel time included. Rice,
  **drinking water** and infant milk powder stood in for all relief supplies.
  Household reserves and day-night population shifts were left out
  (Li et al. 2025).
- Most flood relief depends on roads; K2 to K4 decide what is still
  reachable.

#### K8. Coordination fails as well as roads

- After Hurricane Katrina, one truckload of ice was redirected again and
  again, driven 4,100 miles, and never used. Ice was kept on the move for
  seventeen days before being stored (Dowty and Wallace 2010).
- In the 2002 southern African food crisis, Zambia banned genetically
  modified maize aid, and the World Food Programme had to withdraw stocks at
  its own expense (Dowty and Wallace 2010).
- The paper's explanation: partners' mismatched organisational cultures are
  one reason supply-chain disruption is managed badly
  (Dowty and Wallace 2010).

### Drinking-water aid

#### K9. Supply fails with the flood

- In rural Bangladesh, about **two-thirds of tube-wells and all toilets**
  became unusable in every flood. Raising tube-wells on an elevated base or an
  extra pipe was the adaptation found (Chanda Shimi et al. 2010). *Abstract
  only.*
- When power, potable water and sewers failed together after Hurricane
  Katrina, melted ice became a source of drinking water
  (Dowty and Wallace 2010).
- Drinking water is one of the three representative relief items in
  (Li et al. 2025).
- Lost utility lifelines -- electricity, gas, water -- cut household
  activities such as showering and cooking. These losses are absent from
  economic indices but belong in measures of well-being (Rose 2004).
- UK, summer 2007 floods: the disruption to water and electricity supply was
  estimated with standard rates, with considerable uncertainty. A Danish
  municipal priority scheme weights waterworks 9 of 10, after hospitals at 10
  (Olesen et al. 2017).
- Water treatment and safety belong to [[Human health risk]] and
  [[Drinking water scarcity]]; this note covers getting water to people.

### Across all three

#### K10. Assessing services where data is scarce

- Impact typologies list public-service and utility interruption and traffic
  disruption as indirect damage (Romali et al. 2025).
- Damage-based methods have limited applicability in data-scarce regions,
  because the data they need is missing (Romali et al. 2025).
- Facility locations, road networks and population can come from open
  sources: OpenStreetMap and the Global Human Settlement Layer
  (Wassmer et al. 2025).
- OpenStreetMap is still sparse in some regions outside Europe
  (Wassmer et al. 2025). A facility missing from the map is not a facility
  that is absent.
- Sri Lanka has no comprehensive, consistent, long-term national hazard
  record, and its disaster figures are likely underestimates
  (De Silva et al. 2026).

## Areas of uncertainty -- to [[Entro - Uncertainty Analyser]]

1. **The hospital evidence is German.** Its 30% capacity limit, road data and
   traffic assumptions are Germany's (K1).
2. **Passability ignores velocity and debris** (K2).
3. **No source gives a ration size, a relief duration or a caseload method.**
   Never state a ration or tonnage as sourced.
4. **Food-security figures are Malawi's** and come from post-disaster
   reporting with high uncertainty (K6).
5. **OpenStreetMap completeness** varies outside Europe; a missing hospital
   or water point is unknown, not absent (K10).
6. **One listed paper has no readable copy:** "Impact of Climate Change on
   Disruption to Urban Transport Networks from Pluvial Flooding" exists in
   Zotero only as a ResearchGate link. **One source is abstract only:**
   Chanda Shimi et al. 2010.

The user gets two or three sentences and an offer of depth, never this list.

## Local and event data

Prefer verified local data over a global product: national disaster
management and health agencies, [HDX](https://data.humdata.org/) and
[ReliefWeb](https://reliefweb.int/). Give the link **and the publication
date**, and say whether a figure is for the event or is background.

---

Related: [[Essential services - sources]] | [[Chanakya flows - MOC]] | [[Chanakya node schema]] | [[Chanakya input sources]] | [[Human health risk]] | [[Drinking water scarcity]] | [[Critical infrastructure and waterlogging]] | [[Module 9 - Essential services template]] | [[Agent Chanakya - City Planner]] | [[Agent Argus - Orchestrator]] | [[Entro - Uncertainty Analyser]] | [[Workflows-MOC]]
