---
type: flow-card
desc: The procedure Chanakya follows for the Rockfall, treefall and landslide risk analysis
aliases: []
keywords:
- flow card
- rockfall_treefall_and_landslide_risk
- Chanakya
agent: citadel
flow: rockfall_treefall_and_landslide_risk
workflows: rockfall_treefall_and_landslide_risk
context: heart
retrieval: The procedure overlaid on Chanakya's prompt when Argus routes the Rockfall, treefall and landslide risk analysis. Loaded as an instruction by core/spec.py.
validation_status: moved word for word from agents/citadel/workflows/rockfall_treefall_and_landslide_risk.md on 2026-10-27; byte check against the running card
status: draft
tags:
- flow-card
- heart
- chanakya
---

# Rockfall, treefall and landslide risk - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. The evidence is in [[Rockfall treefall and landslide risk]], fetched as data at run time. Routing and inputs (`select_when`, `inputs_required`, `consumes`) stay in `agents/citadel/workflows/rockfall_treefall_and_landslide_risk.md`.

## Flow Card

You are running the **Rockfall, treefall and landslide risk** analysis for one
AOI and one flood event. The question: where the ground or what stands on it
gives way, and who is below it.

**The source is usually outside the AOI.** Runout arrives from above. An
analysis confined to the bounding box will miss the slope that failed a
kilometre upslope and reached the town anyway. Say explicitly when the
contributing slope lies outside the area you were given, and treat that as a
limit on the answer rather than a reason to answer only about the box.

**Antecedent rainfall often matters more than the event.** Slope failure is
usually primed by days or weeks of wetting and then triggered by an intensity
that would be harmless on dry ground. A single event total is therefore a weak
predictor on its own. Use both, and say which one you are reasoning from.

Run five steps. The evidence for each is in the knowledge note; this card
carries none.

1. **Hazard.** Where slope, material and saturation coincide. Separate the
   three failure types -- rockfall is fast and local, landslide and debris flow
   travel, treefall follows root-plate saturation and wind. They have different
   runouts and different protective measures.
2. **Exposure.** Who is in the runout, not who is on the slope. Settlements,
   roads and lifeline infrastructure downslope, and the road segments a
   blockage isolates. Report people.
3. **Vulnerability.** This hazard singles out informal settlement on steep or
   cut slopes, buildings at the toe of a slope, and anyone dependent on a
   single road that a blockage severs.
4. **Recommendation.** For the authority: which slopes to inspect, which roads
   to close and when to reopen, and the drainage that reduces the priming. For
   the individual: the warning signs worth acting on, and where not to shelter.
5. **Uncertainty.** Slope inventories are incomplete almost everywhere, and
   absence of a recorded landslide is not evidence of a stable slope. Say so
   plainly.

## Notes (not loaded)

---

Related: [[Flow cards - MOC]] | [[Agent Chanakya - City Planner]] | [[Rockfall treefall and landslide risk]]
