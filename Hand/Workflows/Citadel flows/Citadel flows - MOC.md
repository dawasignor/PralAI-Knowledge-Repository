---
type: moc
desc: Catalogue of Citadel's workflows across the water-food-energy nexus, with people's wellbeing at the centre - how a flood reaches each of them
aliases: [Citadel flows, Citadel workflows, citadel MOC, WFE nexus flows]
keywords: [citadel, workflows, water food energy nexus, wellbeing, flood impact, city planner, catalogue, MOC]
agent: citadel
context: hand
retrieval: Answer which workflows Citadel can run, which nexus resource each belongs to, and where the schema and input registry for them live.
validation_status: catalogue agreed with the user 2026-09-13; every flow is a stub
status: stub
tags: [moc, workflow, citadel, nexus]
---

## What these are

Citadel's workflows, aimed at the **water-food-energy resource nexus** with
**people's wellbeing at the centre** -- the question each one asks is how a
flood reaches the people who depend on that resource.

Read [[Citadel node schema]] first: it defines a node, the nine fields, and the
fixed `User -> Argos -> Citadel -> Argos -> User` path all of these follow.
Inputs are cited by number from [[Citadel input sources]].

## The two paths

- [[Citadel general question]] -- answers from the session so far. No queries.
- An analysis flow below -- Citadel autonomously runs a set of queries.

## The flows

### Water

- [[Critical infrastructure and waterlogging]] -- Waterlogged areas against the infrastructure that has to keep working through them - ambulance routes, emergency contact and the facilities people are sent to
- [[Sewage and infection risk]] -- Wastewater hazard sources released or backed up by flooding, who is exposed to them, and the infection risk that follows when sanitation fails
- [[Drinking water scarcity]] -- Loss of safe drinking water after a flood - what supply is compromised, for how long, and the plan that restores it

### Food

- [[Primary cooking fuel disruption]] -- Whether households can still cook - electric, cylinder LPG or piped gas - and what each failure mode means for food security in the days after a flood
- [[Food aid and relief estimation]] -- How much immediate food relief the affected population needs, for how long, and where it has to physically reach

### Energy

- [[Power outage and disruption risk]] -- Which parts of the electricity network the flood takes down, what that cascades into, and how long restoration realistically takes
- [[Electric shock hazard]] -- Where standing water and live electrical infrastructure meet, and the direct electrocution risk to people moving through a flooded area

### Other

- [[Rockfall treefall and landslide risk]] -- Slope failure triggered or primed by the same rainfall as the flood - rockfall, treefall and landslide, and who sits below it
- [[Cultural heritage and home flooding risk]] -- Buildings that cannot simply be replaced - cultural and heritage structures - together with the residential water-displacement risk of flooding inside homes
- [[River and ocean hazard]] -- Hazard arriving from the water body itself - river discharge, backwater and coastal or tidal influence - as distinct from rainfall falling on the AOI

## Status

Status runs `stub -> draft -> verified`.

- **draft** -- [[Sewage and infection risk]]. The analysis is written and
  sourced; the procedure is authoritative in the repo at
  `agents/citadel/workflows/sewage_infection_risk.md`.
- **stub** -- everything else. Node fields, inputs and the retrieval line are
  written; the task description and the expected output are not.

---

Related: [[Citadel node schema]] | [[Citadel input sources]] | [[Citadel general question]] | [[Agent Citadel - City Planner]] | [[Agent Argos - Orchestrator]] | [[Entro - Uncertainty Analyser]] | [[Workflows-MOC]] | [[Hand-MOC]]
