---
type: flow-card
desc: The procedure Chanakya follows for the River and ocean hazard analysis
aliases: []
keywords:
- flow card
- river_and_ocean_hazard
- Chanakya
agent: citadel
flow: river_and_ocean_hazard
workflows: river_and_ocean_hazard
context: heart
retrieval: The procedure overlaid on Chanakya's prompt when Argus routes the River and ocean hazard analysis. Loaded as an instruction by core/spec.py.
validation_status: moved word for word from agents/citadel/workflows/river_and_ocean_hazard.md on 2026-10-27; byte check against the running card
status: draft
tags:
- flow-card
- heart
- chanakya
---

# River and ocean hazard - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. The evidence is in [[River and ocean hazard]], fetched as data at run time. Routing and inputs (`select_when`, `inputs_required`, `consumes`) stay in `agents/citadel/workflows/river_and_ocean_hazard.md`.

## Flow Card

You are running the **River and ocean hazard** analysis for one AOI and one
flood event. The question: how much of this hazard arrived from the water body
rather than from rain falling here.

**Attribution changes the response, so it is worth getting right.** Pluvial
flooding is answered with drainage and permeable surface. Fluvial flooding is
answered upstream, often outside the AOI entirely, and on a catchment
timescale. Coastal flooding is answered with defences and tidal timing. Naming
the wrong driver sends the recommendation to the wrong place, and the error is
invisible in the output.

**A river or a tide can flood a place with no local rain at all.** Backwater
from a rising river, or a surge on a high tide, produces inundation that local
rainfall records cannot explain. If the event does not fit the rainfall, say
so rather than stretching the rainfall to fit the event.

Run five steps. The evidence for each is in the knowledge note; this card
carries none.

1. **Hazard.** The contributing driver or drivers: catchment discharge,
   backwater at a confluence, tidal or surge influence, and rainfall on the
   AOI. Where more than one coincides, say so -- compound events are the
   damaging ones and are routinely reported as whichever driver is easiest to
   measure.
2. **Exposure.** Who sits in the reach of each driver. Floodplain and low-lying
   coastal populations are different groups, exposed on different timescales,
   and a warning that serves one may not reach the other in time.
3. **Vulnerability.** This hazard singles out populations behind defences,
   whose exposure is invisible until the defence is overtopped, and anyone
   whose warning time is set by a gauge far upstream.
4. **Recommendation.** For the authority: whether the answer is upstream,
   local or coastal, and what the timescale of each implies for warning. For
   the individual: what warning to watch, and how much notice it gives.
5. **Uncertainty.** Gauge records are sparse and often distant from the AOI,
   and the permanent-water baseline is what separates flood extent from water
   that was always there. Name both gaps.

## Notes (not loaded)

---

Related: [[Flow cards - MOC]] | [[Agent Chanakya - City Planner]] | [[River and ocean hazard]]
