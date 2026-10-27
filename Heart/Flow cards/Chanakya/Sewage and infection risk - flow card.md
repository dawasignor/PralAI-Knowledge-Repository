---
type: flow-card
desc: The procedure Chanakya follows for the Sewage and infection risk analysis
aliases: []
keywords:
- flow card
- sewage_infection_risk
- Chanakya
agent: citadel
flow: sewage_infection_risk
workflows: sewage_infection_risk
context: heart
retrieval: The procedure overlaid on Chanakya's prompt when Argus routes the Sewage and infection risk analysis. Loaded as an instruction by core/spec.py.
validation_status: moved word for word from agents/citadel/workflows/sewage_infection_risk.md on 2026-10-27; byte check against the running card
status: draft
tags:
- flow-card
- heart
- chanakya
---

# Sewage and infection risk - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. The evidence is in [[Sewage and infection risk]], fetched as data at run time. Routing and inputs (`select_when`, `inputs_required`, `consumes`) stay in `agents/citadel/workflows/sewage_infection_risk.md`.

## Flow Card

You are running the **Sewage and infection risk** analysis for one AOI and one
flood event. The question: when the water systems, toilets and sanitation fail
in this flood, what does that do to the people here, and what should be done
about it.

**Start from the evidence, not the intuition.** Outbreak risk after a flood is
*lower* than commonly assumed, and what risk exists is driven by the displaced
population's living conditions rather than by the floodwater. A flooded
treatment plant is a hazard, not an outcome. Overstating this risk is a failure
mode of the analysis, not a safe default.

Run five steps. Read the knowledge note for the evidence each one needs -
figures, thresholds and case studies are **not** in this card.

1. **Hazard.** Wastewater infrastructure the flood can surcharge or submerge -
   plants, outfalls, canals, pipes, manholes. Separate upstream contamination
   from a local sewer backing up. Add damp and mould risk for timber buildings
   and occupied basements. Name the pathway; do not assert the illness.
2. **Exposure.** Displacement and shelter first, then low-lying populated
   areas, proximity to receiving water, and residential areas near **outfalls**
   rather than plants. Report who and how many. Without population data the
   step returns "not quantified" - never substitute area for people.
3. **Vulnerability.** INFORM for the **year of the event**, release year stated
   every time. Report Vulnerability and Lack of Coping Capacity as separate
   claims. Add the groups this hazard singles out, which a national index will
   not show you. Declare the scale mismatch: INFORM is national, the AOI is
   not.
4. **Recommendation.** Two audiences, always separated: the individual and the
   city authority. Safe drinking water ranks first for both. Every
   recommendation names its source and the source's date.
5. **Uncertainty.** Name where the data does not carry the claim. Route the
   full set to Entro; give the user two or three sentences and an offer of
   depth, never the list.

**Read first**, before step 1, per the rule in the system prompt:
`read_note(ref="Sewage and infection risk")`, then
`read_note(ref="Sewage and infection risk - sources")`. Both are written; this
is the one flow whose evidence exists.

## Notes (not loaded)

---

Related: [[Flow cards - MOC]] | [[Agent Chanakya - City Planner]] | [[Sewage and infection risk]]
