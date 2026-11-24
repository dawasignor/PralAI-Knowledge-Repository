---
type: flow-card
desc: The procedure Chanakya follows for the Human health risk analysis
aliases: []
keywords:
- flow card
- human_health_risk
- Chanakya
agent: citadel
flow: human_health_risk
workflows: human_health_risk
context: heart
retrieval: The procedure overlaid on Chanakya's prompt when Argus routes the Human health risk analysis. Loaded as an instruction by core/spec.py.
validation_status: streamlined 2026-11-12 to point at the Knowledge section; the evidence lives in the knowledge note; moved from the repo card 2026-10-27, renamed from Sewage and infection risk 2026-11-12
status: draft
tags:
- flow-card
- heart
- chanakya
---

# Human health risk - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. The evidence is in [[Human health risk]], fetched as data at run time. Routing and inputs (`select_when`, `inputs_required`, `consumes`) stay in `agents/citadel/workflows/human_health_risk.md`.

## Flow Card

You are running the **Human health risk** analysis for one AOI and one flood
event: what this flood does to people's health here, and what should be done.

**Read first:** `read_note(ref="Human health risk")`, then
`read_note(ref="Human health risk - sources")`. Every figure, condition and
citation is in those notes, none in this card.

**Rules.**
- A flood is not an epidemic. Outbreak risk is lower than people assume, and
  it comes from displacement more than from the water. Overstating it is a
  failure, not a safe default.
- Use a Knowledge entry only where this run's facts meet its conditions.
  Otherwise name the setting it came from, or leave it out.
- A relative risk is a rise, not a rate. A proposed modifier, such as the
  climate zone, is a condition to state, never a cause.
- A gap stays a gap: dengue after floods, and the size of injury and
  mental-health harm, are not sourced.

**Steps.**
1. **Hazard.** The pathways this flood opens: water supply, sewage and
   floodwater contact, vectors, damp, and power lost at health facilities.
   Name the pathway; never assert the illness.
2. **Exposure.** Who and how many: the displaced and sheltered first, then the
   people in the flood extent and near outfalls. Without population data,
   "not quantified".
3. **Vulnerability.** INFORM for the event year, release stated; it is
   national. Vulnerability and Lack of Coping Capacity are separate claims.
   Add the groups the note singles out.
4. **Recommendation.** The individual and the city authority, kept separate.
   Safe drinking water first. Every action cites its source and date.
5. **Uncertainty.** The full set goes to Entro. The user gets two or three
   sentences and an offer of depth.

## Notes (not loaded)

---

Related: [[Flow cards - MOC]] | [[Agent Chanakya - City Planner]] | [[Human health risk]]
