---
type: flow-card
desc: The procedure Chanakya follows for the Primary cooking fuel disruption analysis
aliases: []
keywords:
- flow card
- primary_cooking_fuel_disruption
- Chanakya
agent: citadel
flow: primary_cooking_fuel_disruption
workflows: primary_cooking_fuel_disruption
context: heart
retrieval: The procedure overlaid on Chanakya's prompt when Argus routes the Primary cooking fuel disruption analysis. Loaded as an instruction by core/spec.py.
validation_status: moved word for word from agents/citadel/workflows/primary_cooking_fuel_disruption.md on 2026-10-27; byte check against the running card
status: draft
tags:
- flow-card
- heart
- chanakya
---

# Primary cooking fuel disruption - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. The evidence is in [[Primary cooking fuel disruption]], fetched as data at run time. Routing and inputs (`select_when`, `inputs_required`, `consumes`) stay in `agents/citadel/workflows/primary_cooking_fuel_disruption.md`.

## Flow Card

You are running the **Primary cooking fuel disruption** analysis for one AOI
and one flood event. The question: can households still cook, and what follows
if they cannot.

**This is not a comfort question.** Losing the ability to cook removes the
ability to boil, which is what most drinking-water guidance assumes a household
can do. It also removes safe preparation of the relief food that arrives.
Treat cooking capacity as a dependency of the water and food flows, not as a
convenience, and say which of those it breaks.

**The failure mode follows the fuel.** Electric cooking fails with the grid and
returns with it. Cylinder LPG fails on resupply and distribution, so it
survives a short outage and fails a long isolation. Piped gas fails on network
damage and is the slowest to restore. Solid fuel fails when the fuel is wet.
Establish which fuel the affected households actually depend on before
reasoning about restoration -- the answers are not interchangeable.

Run five steps. The evidence for each is in the knowledge note; this card
carries none.

1. **Hazard.** The dominant cooking fuel in the AOI and the mechanism that
   disrupts it: grid loss, blocked resupply routes, damaged distribution,
   soaked solid fuel, or a stove that cannot be used safely indoors.
2. **Exposure.** Households unable to cook, and for how long. Displaced
   households in shelter are a separate case from households in place -- they
   may have no stove at all, whatever the network is doing.
3. **Vulnerability.** This hazard singles out infants and anyone on a
   prepared-food diet, households with no fuel stock, and those who will cook
   indoors on an unsuitable stove if given no alternative -- which converts a
   cooking problem into a carbon monoxide one.
4. **Recommendation.** For the authority: whether relief should be
   ready-to-eat rather than dry rations, and how resupply reaches the AOI. For
   the individual: safe indoor use limits, and what not to burn inside.
5. **Uncertainty.** Fuel mix is usually known only at national or regional
   level. Declare that scale gap explicitly.

## Notes (not loaded)

---

Related: [[Flow cards - MOC]] | [[Agent Chanakya - City Planner]] | [[Primary cooking fuel disruption]]
