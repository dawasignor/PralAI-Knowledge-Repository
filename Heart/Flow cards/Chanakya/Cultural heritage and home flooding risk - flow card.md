---
type: flow-card
desc: The procedure Chanakya follows for the Cultural heritage and home flooding risk analysis
aliases: []
keywords:
- flow card
- cultural_heritage_and_home_flooding_risk
- Chanakya
agent: citadel
flow: cultural_heritage_and_home_flooding_risk
workflows: cultural_heritage_and_home_flooding_risk
context: heart
retrieval: The procedure overlaid on Chanakya's prompt when Argus routes the Cultural heritage and home flooding risk analysis. Loaded as an instruction by core/spec.py.
validation_status: moved word for word from agents/citadel/workflows/cultural_heritage_and_home_flooding_risk.md on 2026-10-27; byte check against the running card
status: draft
tags:
- flow-card
- heart
- chanakya
---

# Cultural heritage and home flooding risk - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. The evidence is in [[Cultural heritage and home flooding risk]], fetched as data at run time. Routing and inputs (`select_when`, `inputs_required`, `consumes`) stay in `agents/citadel/workflows/cultural_heritage_and_home_flooding_risk.md`.

## Flow Card

You are running the **Cultural heritage and home flooding risk** analysis for
one AOI and one flood event. Two questions that share a method: which
irreplaceable buildings the water reaches, and where floodwater entering homes
forces people out.

**Depth is not damage.** For heritage, the material decides: unfired earth and
mudbrick can be lost at a depth that stone shrugs off, and slow saturation does
more harm than a fast peak. For homes, what determines displacement is how long
a dwelling is uninhabitable, which depends on construction, drying and the
household's alternatives -- not on how high the mark on the wall was.

**Irreplaceable is a category, not an adjective.** A heritage structure cannot
be rebuilt into the same thing, so the usual cost-benefit ranking does not
apply to it and should not be quietly used. Say that the comparison breaks
rather than producing a ranking that pretends it holds.

Run five steps. The evidence for each is in the knowledge note; this card
carries none.

1. **Hazard.** Water reaching heritage structures and dwellings: depth,
   duration and whether the water is carrying sediment or contamination.
   Separate structures by material, because that is what converts depth into
   loss.
2. **Exposure.** Heritage assets in the extent, listed individually -- these
   are few enough to name. Then residents whose homes take water, reported as
   people and households, with an estimate of how many are displaced rather
   than merely affected.
3. **Vulnerability.** This hazard singles out single-storey dwellings with
   nowhere to move possessions, households with no insurance and no savings,
   renters with weak security of tenure, and older earthen or timber
   construction.
4. **Recommendation.** For the authority: protection and salvage priority for
   named assets, drying and habitability inspection for homes, and the shelter
   requirement implied by the displacement estimate. For the individual: what
   to move and when, and the risks of returning to a damp building.
5. **Uncertainty.** Building material and floor level are rarely in any
   dataset, and both drive this analysis. Say what that costs the answer.

## Notes (not loaded)

---

Related: [[Flow cards - MOC]] | [[Agent Chanakya - City Planner]] | [[Cultural heritage and home flooding risk]]
