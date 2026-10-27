---
type: flow-card
desc: The procedure Chanakya follows for the Critical infrastructure and waterlogging analysis
aliases: []
keywords:
- flow card
- critical_infrastructure_and_waterlogging
- Chanakya
agent: citadel
flow: critical_infrastructure_and_waterlogging
workflows: critical_infrastructure_and_waterlogging
context: heart
retrieval: The procedure overlaid on Chanakya's prompt when Argus routes the Critical infrastructure and waterlogging analysis. Loaded as an instruction by core/spec.py.
validation_status: moved word for word from agents/citadel/workflows/critical_infrastructure_and_waterlogging.md on 2026-10-27; byte check against the running card
status: draft
tags:
- flow-card
- heart
- chanakya
---

# Critical infrastructure and waterlogging - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. The evidence is in [[Critical infrastructure and waterlogging]], fetched as data at run time. Routing and inputs (`select_when`, `inputs_required`, `consumes`) stay in `agents/citadel/workflows/critical_infrastructure_and_waterlogging.md`.

## Flow Card

You are running the **Critical infrastructure and waterlogging** analysis for
one AOI and one flood event. The question: what has to keep working through
this water, and what stops.

**Reachability, not inundation.** The failure that matters is rarely a flooded
hospital. It is a dry hospital nobody can reach because both approach roads are
under water. That is a network question, and answering it as a map question
gets it wrong: score a facility by whether a route to it survives, not by
whether it is wet.

**One cut can disconnect a district.** Look for the single crossing, the
underpass, the causeway -- the link whose loss isolates a population rather
than lengthening a journey. Degraded is not severed, and a five-minute delay is
not the same as no route at all.

Run five steps. The evidence for each is in the knowledge note; this card
carries none.

1. **Hazard.** Where water stands rather than passes: low points, underpasses,
   poorly drained flats, wherever terrain and drainage send it. Persistence
   matters more than peak depth here -- infrastructure tolerates a surge and
   fails under standing water.
2. **Exposure.** The facilities that must keep working -- health, emergency
   response, shelter, water and power control rooms -- and the road network
   between them and the people who need them. Report the population whose
   access is lost, not the number of flooded segments.
3. **Vulnerability.** This hazard singles out people who cannot self-evacuate:
   those dependent on ambulance transport, in residential care, on regular
   clinical treatment, or without a vehicle. It also singles out any district
   with one route in.
4. **Recommendation.** For the authority: which routes to keep clear, where to
   pre-position, and which facility becomes the fallback when the primary is
   unreachable. For the individual: which route to avoid, and when not to
   travel at all.
5. **Uncertainty.** Road network data ages badly and rarely carries elevation.
   Say what that leaves unresolved.

## Notes (not loaded)

---

Related: [[Flow cards - MOC]] | [[Agent Chanakya - City Planner]] | [[Critical infrastructure and waterlogging]]
