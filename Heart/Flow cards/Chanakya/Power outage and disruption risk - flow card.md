---
type: flow-card
desc: The procedure Chanakya follows for the Power outage and disruption risk analysis
aliases: []
keywords:
- flow card
- power_outage_and_disruption_risk
- Chanakya
agent: citadel
flow: power_outage_and_disruption_risk
workflows: power_outage_and_disruption_risk
context: heart
retrieval: The procedure overlaid on Chanakya's prompt when Argus routes the Power outage and disruption risk analysis. Loaded as an instruction by core/spec.py.
validation_status: moved word for word from agents/citadel/workflows/power_outage_and_disruption_risk.md on 2026-10-27; byte check against the running card
status: draft
tags:
- flow-card
- heart
- chanakya
---

# Power outage and disruption risk - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. The evidence is in [[Power outage and disruption risk]], fetched as data at run time. Routing and inputs (`select_when`, `inputs_required`, `consumes`) stay in `agents/citadel/workflows/power_outage_and_disruption_risk.md`.

## Flow Card

You are running the **Power outage and disruption risk** analysis for one AOI
and one flood event. The question: what loses power, what that takes with it,
and how long it lasts.

**An outage is often a decision, not damage.** Utilities de-energise
deliberately ahead of water, so the lights can go out before anything floods
and come back without a repair. Establish which you are looking at: a
protective shutdown and a destroyed substation produce the same darkness and
completely different restoration times.

**Restoration is bounded by access, not by repair.** Crews cannot work where
they cannot reach, and cannot re-energise what is still wet. That couples this
flow to waterlogging and road access -- a realistic duration follows the
recession of the water, not the difficulty of the fix.

Run five steps. The evidence for each is in the knowledge note; this card
carries none.

1. **Hazard.** Which parts of the network the flood reaches: substations,
   distribution gear, generation, and the ground-level equipment that fails
   first. Distinguish transmission from distribution -- the second fails more
   often and is repaired faster.
2. **Exposure.** Customers without power, and the **dependent services** that
   matter more than the count: water pumping and treatment, hospitals without
   adequate backup, telecommunications, cold chain, and lifts in tall
   buildings. Name the cascade rather than the headline number.
3. **Vulnerability.** This hazard singles out households dependent on powered
   medical equipment, people in high-rise buildings when lifts and pumped water
   both fail, and anyone for whom heating or cooling is a survival need rather
   than a comfort.
4. **Recommendation.** For the authority: continuity for water and health
   first, then the sequencing of restoration and where generators go. For the
   individual: what to expect, what to charge while there is still supply, and
   the generator siting rule that carbon monoxide makes non-negotiable.
5. **Uncertainty.** Duration again, and whether backup generation exists where
   it is assumed to.

## Notes (not loaded)

---

Related: [[Flow cards - MOC]] | [[Agent Chanakya - City Planner]] | [[Power outage and disruption risk]]
