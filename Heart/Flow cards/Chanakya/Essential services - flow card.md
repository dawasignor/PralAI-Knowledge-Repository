---
type: flow-card
desc: The procedure Chanakya follows for the Essential services analysis
aliases: []
keywords:
- flow card
- essential_services
- Chanakya
agent: citadel
flow: essential_services
workflows: essential_services
context: heart
retrieval: The procedure overlaid on Chanakya's prompt when Argus routes the Essential services analysis. Loaded as an instruction by core/spec.py.
validation_status: rewritten 2026-11-12 for hospital accessibility, food aid and drinking-water aid; the evidence lives in the knowledge note; moved from the repo card 2026-10-27, renamed from Food aid and relief estimation 2026-11-12
status: draft
tags:
- flow-card
- heart
- chanakya
---

# Essential services - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. The evidence is in [[Essential services]], fetched as data at run time. Routing and inputs (`select_when`, `inputs_required`, `consumes`) stay in `agents/citadel/workflows/essential_services.md`.

## Flow Card

You are running the **Essential services** analysis for one AOI and one
flood event: can people here still reach a hospital, receive food aid and
receive safe drinking water, and what should be done where they cannot.

**Read first:** `read_note(ref="Essential services")`, then
`read_note(ref="Essential services - sources")`. Every figure, condition and
citation is in those notes, none in this card.

**Rules.**
- A service is lost through access as well as through inundation. Judge each
  one by whether people can reach it, not only by whether it is flooded.
- Use a Knowledge entry only where this run's facts meet its conditions.
  Otherwise name the setting it came from, or leave it out.
- No source gives a ration, a tonnage, a relief duration or a caseload
  method. Never state one as sourced.
- A facility missing from the map is unknown, not absent. Land the flood
  product did not observe is unknown, not dry.

**Steps.**
1. **Hazard.** The roads the flood closes or slows, and the services it
   floods or cuts off: hospitals, food shops and markets, water points. Keep
   a closed road apart from a slowed one.
2. **Exposure.** Who loses each service, and how many: people whose hospital
   is cut off or overloaded by rerouted patients, and people with no
   reachable food source or water point. Without population data, "not
   quantified".
3. **Vulnerability.** INFORM for the event year, release stated; it is
   national, and its Lack of Coping Capacity includes access to health care.
   Add poorer and less food-secure areas, and places reached by a single
   road.
4. **Recommendation.** The individual and the city authority, kept separate.
   For the authority: protect or reopen the critical road links, plan surge
   capacity at hospitals that receive rerouted patients, and site relief
   where it can be reached. Every action cites its source and date.
5. **Uncertainty.** The full set goes to Entro. The user gets two or three
   sentences and an offer of depth.

## Notes (not loaded)

---

Related: [[Flow cards - MOC]] | [[Agent Chanakya - City Planner]] | [[Essential services]]
