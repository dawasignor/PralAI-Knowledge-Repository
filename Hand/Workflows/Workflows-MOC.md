---
type: moc
desc: Every workflow in the project - the data-fetching functions Monty runs, the analyses Citadel runs, and the decision methods
aliases: [workflows, workflow list, all workflows, what workflows exist, workflow catalogue]
keywords: [workflows, catalogue, MOC, monty, citadel, data fetching, analysis, MCDA, SMAA, sensitivity, flows, index]
agent: argos
context: hand
retrieval: Answer what workflows exist in this project, which agent runs each kind, and where to look for one by name.
validation_status: index only; each entry links to the note that carries the detail
status: draft
tags: [moc, workflows, catalogue]
---

## The three kinds

They are different objects and the difference decides who runs them.

| Kind | What it is | Who runs it | Catalogue |
|---|---|---|---|
| **Data workflow** | A registered Python function that fetches data and returns JSON | Monty | [[Monty data workflows]] |
| **Citadel flow** | An analysis defined by a prompt card plus a knowledge note | Citadel | [[Citadel flows - MOC]] |
| **Decision method** | A method for choosing between options | Norwood, with Entro | listed below |

A Citadel flow **consumes** data workflows as inputs. It does not replace them,
and it cannot run without them.

## Data workflows

Four exist: `fetch_weather_data`, `fetch_lulc_data`, `fetch_terrain_data`,
`fetch_permanent_water`. What each gives, what geometry it takes, and when it
is the wrong tool: [[Monty data workflows]].

**Signatures are truth in the registry**, not in any note. The exact parameter
names arrive with the routing request, generated from `core/workflows/`.

## Citadel flows

Eleven analyses across the water-food-energy nexus, catalogued in
[[Citadel flows - MOC]]. Written so far:

- [[Sewage and infection risk]] -- **draft**. Wastewater hazard, exposure,
  vulnerability, recommendation and uncertainty, with
  [[Sewage and infection risk - sources]] carrying the full references.

The rest are stubs. [[Citadel node schema]] defines what a node is and the
`User -> Argos -> Citadel -> Argos -> User` path they all follow;
[[Citadel input sources]] is the numbered list their `inputs_required` cites.

## Decision methods

- [[Flood_mask_Dataset_MCDA]] -- choosing a flood-mask dataset by weighted
  criteria
- [[SMAA]] -- stochastic multicriteria acceptability analysis
- [[Sensitivity Analysis]] -- which weight, moved how far, flips the ranking
- [[flood_damage_query]]

---

Related: [[Monty data workflows]] | [[Citadel flows - MOC]] | [[Citadel input sources]] | [[Citadel node schema]] | [[Hand-MOC]] | [[Agent Argos - Orchestrator]]
