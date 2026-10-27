---
type: flow-card
desc: The procedure Chanakya follows for the Food aid and relief estimation analysis
aliases: []
keywords:
- flow card
- food_aid_and_relief_estimation
- Chanakya
agent: citadel
flow: food_aid_and_relief_estimation
workflows: food_aid_and_relief_estimation
context: heart
retrieval: The procedure overlaid on Chanakya's prompt when Argus routes the Food aid and relief estimation analysis. Loaded as an instruction by core/spec.py.
validation_status: moved word for word from agents/citadel/workflows/food_aid_and_relief_estimation.md on 2026-10-27; byte check against the running card
status: draft
tags:
- flow-card
- heart
- chanakya
---

# Food aid and relief estimation - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. The evidence is in [[Food aid and relief estimation]], fetched as data at run time. Routing and inputs (`select_when`, `inputs_required`, `consumes`) stay in `agents/citadel/workflows/food_aid_and_relief_estimation.md`.

## Flow Card

You are running the **Food aid and relief estimation** analysis for one AOI and
one flood event. The question: how much food relief is needed, for whom, for
how long, and where it has to physically arrive.

**Need follows access loss, not population.** Multiplying residents by a daily
ration gives a number that is easy to produce and usually wrong. What creates
need is loss of the ability to obtain or prepare food: displacement, destroyed
stocks, markets cut off, no income, no means of cooking. A population with
intact markets and dry homes needs very little. Start from what was lost.

**A tonnage with no route is not a plan.** The binding constraint is almost
always delivery, not quantity -- a distribution point nobody can reach serves
nobody. Carry the access question from the waterlogging flow into the siting
of every distribution point, and say when the two answers conflict.

Run five steps. The evidence for each is in the knowledge note; this card
carries none.

1. **Hazard.** What the flood did to the food system here: household stocks,
   markets and shops, standing crops, storage, and the roads supply arrives on.
   Distinguish immediate relief from the seasonal shortfall a lost harvest
   causes later -- they have different horizons and different answers.
2. **Exposure.** How many people need relief and for how long, built from
   displacement and access loss rather than from headcount. Displaced people in
   shelter, people in place with no market, and people in place with no income
   are three groups with three different needs.
3. **Vulnerability.** This hazard singles out infants and young children,
   pregnant and breastfeeding women, older people who cannot queue or carry,
   and households that were food-insecure before the water arrived.
4. **Recommendation.** For the authority: the ration basis and its source, the
   duration assumption stated as an assumption, distribution points chosen for
   reachability, and whether food should be ready-to-eat given the cooking-fuel
   answer. For the individual: where and when to collect, and what to do if it
   cannot be reached.
5. **Uncertainty.** Displacement numbers move fastest and are wrong longest.
   Give the figure a date, and say what would update it.

## Notes (not loaded)

---

Related: [[Flow cards - MOC]] | [[Agent Chanakya - City Planner]] | [[Food aid and relief estimation]]
