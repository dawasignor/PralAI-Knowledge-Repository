---
type: flow-card
desc: The procedure Chanakya follows for the Drinking water scarcity analysis
aliases: []
keywords:
- flow card
- drinking_water_scarcity
- Chanakya
agent: citadel
flow: drinking_water_scarcity
workflows: drinking_water_scarcity
context: heart
retrieval: The procedure overlaid on Chanakya's prompt when Argus routes the Drinking water scarcity analysis. Loaded as an instruction by core/spec.py.
validation_status: moved word for word from agents/citadel/workflows/drinking_water_scarcity.md on 2026-10-27; byte check against the running card
status: draft
tags:
- flow-card
- heart
- chanakya
---

# Drinking water scarcity - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. The evidence is in [[Drinking water scarcity]], fetched as data at run time. Routing and inputs (`select_when`, `inputs_required`, `consumes`) stay in `agents/citadel/workflows/drinking_water_scarcity.md`.

## Flow Card

You are running the **Drinking water scarcity** analysis for one AOI and one
flood event. The question: who loses safe drinking water, for how long, and
what restores it.

**Separate contamination from interruption.** They demand different responses
and are routinely conflated. Water can be present and unsafe, absent and
uncontaminated, or both. A treatment works that never floods still stops
supplying when its power fails or distribution pressure is lost -- and lost
pressure is itself a contamination pathway, since an unpressurised main draws
in whatever surrounds it. Establish which failure you are looking at before
recommending anything.

**A boil advisory is not free.** It assumes a household can boil, which assumes
fuel. If the same event disrupted cooking fuel, the advisory is unenforceable
and the recommendation has to change. Say so rather than issuing it anyway.

Run five steps. The evidence for each is in the knowledge note; this card
carries none.

1. **Hazard.** What supplies this AOI -- surface intake, groundwater, piped
   distribution, tankers, wells -- and which of those the flood reaches.
   Separate source contamination, treatment failure, distribution failure and
   power loss. Name the pathway; do not assert the illness. That is the sewage
   flow's question, not this one.
2. **Exposure.** Who loses safe supply, and for how long. The service level
   before the event is what makes loss measurable: a population already on
   unimproved supply loses something different from one on piped water.
   Households drawing from shallow wells inside the flood extent are the
   sharpest case.
3. **Vulnerability.** Beyond the national picture, this hazard singles out
   infants on formula, dialysis and other clinical water dependencies,
   households with no storage, and anyone whose alternative source is further
   than they can carry.
4. **Recommendation.** Continuity of safe supply ranks first for both
   audiences. For the individual: storage, treatment at point of use, and what
   to do when boiling is not possible. For the authority: protecting plant
   power and distribution pressure, and a trucking plan with its reach stated.
5. **Uncertainty.** Duration is the weakest number in this analysis and the one
   most often asked for. Say what bounds it.

## Notes (not loaded)

---

Related: [[Flow cards - MOC]] | [[Agent Chanakya - City Planner]] | [[Drinking water scarcity]]
