---
type: flow-card
desc: The procedure Chanakya follows for the Electric shock hazard analysis
aliases: []
keywords:
- flow card
- electric_shock_hazard
- Chanakya
agent: citadel
flow: electric_shock_hazard
workflows: electric_shock_hazard
context: heart
retrieval: The procedure overlaid on Chanakya's prompt when Argus routes the Electric shock hazard analysis. Loaded as an instruction by core/spec.py.
validation_status: moved word for word from agents/citadel/workflows/electric_shock_hazard.md on 2026-10-27; byte check against the running card
status: draft
tags:
- flow-card
- heart
- chanakya
---

# Electric shock hazard - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. The evidence is in [[Electric shock hazard]], fetched as data at run time. Routing and inputs (`select_when`, `inputs_required`, `consumes`) stay in `agents/citadel/workflows/electric_shock_hazard.md`.

## Flow Card

You are running the **Electric shock hazard** analysis for one AOI and one
flood event. The question: where live electricity meets standing water, and
what that does to people moving through it.

**Small numbers, near-total preventability.** This hazard harms far fewer
people than the flood around it, and the harm is largely avoidable by behaviour
that costs nothing. That combination sets how to report it: do not inflate the
count to justify attention, and do not discount the guidance because the count
is low. **The recommendation carries this flow, not the exposure figure.**

**The dangerous cases are specific.** Downed conductors in standing water,
re-entry into a flooded building before the supply is isolated, generator
back-feed energising a line a crew believes is dead, and submerged ground-level
equipment. Name those rather than issuing a general warning about water and
electricity, which readers already discount.

Run five steps. The evidence for each is in the knowledge note; this card
carries none.

1. **Hazard.** Where energised equipment and floodwater coincide: overhead
   lines brought down, street-level distribution gear, building supplies not
   yet isolated. Depth is not the test -- contact is what completes a circuit.
2. **Exposure.** People moving through flooded streets on foot or by vehicle,
   and people re-entering buildings. This is a behavioural exposure rather than
   a residential one, so counting residents inside the extent overstates it.
   Say who is moving, and why they are moving.
3. **Vulnerability.** This hazard singles out children playing in floodwater,
   people wading because there is no other route, and those who re-enter early
   to salvage possessions -- a motive worth naming, because guidance that
   ignores it gets ignored in turn.
4. **Recommendation.** For the individual: do not enter standing water near
   downed lines, do not restore supply to a flooded building before it is
   inspected, and the generator back-feed rule. For the authority: isolation
   procedure, hazard marking, and the inspection requirement before
   re-energising.
5. **Uncertainty.** Incident data for this hazard is sparse and
   under-reported. Say so rather than implying a rate the data cannot support.

## Notes (not loaded)

---

Related: [[Flow cards - MOC]] | [[Agent Chanakya - City Planner]] | [[Electric shock hazard]]
