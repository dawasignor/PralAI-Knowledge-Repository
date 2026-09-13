---
type: workflow
nexus: water
desc: Wastewater hazard sources released or backed up by flooding, who is exposed to them, and the infection risk that follows when sanitation fails
aliases: [sewage risk, infection risk, wastewater flooding, sanitation failure, WASH risk]
keywords: [sewage, wastewater, treatment plant, manhole, sanitation, infection, waterborne disease, WASH, mould, bacterial, heavy metals, HydroWASTE, cholera, leptospirosis, hepatitis E, dilution factor, INFORM, vulnerability, chlorination, displacement]
agent: citadel
parent_workflow: Sewage and infection risk
workflow_order: 1
prev_node: argos
next_node: argos
inputs_required: [1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20]
context: hand
retrieval: Answer where flood-borne wastewater hazards are, who is exposed to them, how vulnerable that population is, what reduces infection risk, and where the analysis is least certain.
sources_note: Sewage and infection risk - sources
card: agents/citadel/workflows/sewage_infection_risk.md
prominent_sources: [WHO 2005, WHO 2006, Ehalt Macedo et al. 2022, WHO 2024]
validation_status: analysis written and sourced; two WHO documents read in full 2026-09-13; nothing implemented, six of eleven input sources unwired, MCP retrieval not built
status: draft
tags: [workflow, citadel, water, sewage, infection, wash]
---

## How this note is cited

Every claim below carries a short citation -- **(WHO 2024)**. The full
reference for each key is in [[Sewage and infection risk - sources]], fetched
alongside this note when the flow runs.

**Quote the vintage with the figure.** Sources get reissued; an undated number
ages into a false claim while still looking sourced.

## The question, and the correct starting assumption

When the water systems, toilets and sanitation fail in this flood, what does
that do to the people here, and what should be done about it.

**Do not start from the intuition that a flood means an epidemic.** The overall
risk of communicable disease outbreaks after a natural disaster is *lower than
is often perceived*, and the risk that exists is driven by the **displaced
population's living conditions** -- crowding, inadequate water and sanitation,
poor access to health services -- rather than by the floodwater itself
(WHO 2006). Of 14 major floods worldwide between 1970 and 1994, **one**
produced a major diarrhoeal outbreak: Sudan 1980, and that flood was
complicated by population displacement (WHO 2005).

Overstating the risk is a failure mode of this analysis, not a safe default.

## Hazard -- what the flood mobilises

**Wastewater infrastructure.** HydroWASTE (input 7) registers **58,502 plants**
globally, **58,278** georeferenced onto the river network, serving about
**4 billion people**; each record carries population served, treated discharge,
treatment level and an estimated outfall position (Ehalt Macedo et al. 2022).

**A flooded treatment plant is a hazard, not an outcome.** Tajikistan, 1992:
flooding of sewage treatment plants contaminated river water, and *no
significant increase in diarrhoeal disease was reported* (WHO 2005). Report the
pathway; do not assert the illness.

Separate **upstream** contamination -- bacterial load, heavy metals, industrial
effluent arriving from elsewhere -- from a **local** sewer backing up. Different
pathway, different advice, different authority.

**Dilution factor.** Receiving-water discharge over effluent discharge. Below
**10**, the European Medicines Agency's recommended environmental threshold,
the receiving water dilutes little even in normal conditions
(Ehalt Macedo et al. 2022). It is a **normal-condition** figure: a flood changes
both terms, so it marks a chronically stressed reach, never a flood-condition
estimate.

**Treatment that is not there.** About **44% of household wastewater** is
released without safe treatment (WHO 2024); roughly **half of all untreated
wastewater** reaches rivers, lakes and seas, and only **11%** of treated
wastewater is reused (UNEP 2023). For an Indian AOI: **72,368 MLD** of urban
sewage generation against **20,235 MLD** of utilised capacity, leaving
**52,133 MLD** untreated (CPCB 2021).

### What sanitation failure actually transmits

| Pathway | Disease | Evidence |
|---|---|---|
| Drinking-water contamination | Cholera, typhoid, hepatitis A and E, diarrhoeal disease | The **major risk factor** for flood-associated outbreaks (WHO 2005). West Bengal 1998: >16,000 cholera cases, O1 Ogawa. Bangladesh 2004: >17,000 diarrhoeal cases, *V. cholerae* O1 and ETEC (WHO 2006) |
| Direct skin contact with floodwater | Leptospirosis | The **only epidemic-prone infection transmitted directly from contaminated water** (WHO 2005). Rodent urine; flooding proliferates rodents and pushes them onto the same high ground as people. Mumbai 2000; Taiwan, Typhoon Nali, 2001 (WHO 2006) |
| Direct contact | Wound infections, dermatitis, conjunctivitis, ENT infections | Real but **not epidemic prone** (WHO 2005) |
| Faecal-oral, post-flood | Hepatitis E | Outbreaks frequently follow heavy rain and floods; usually mild **except in pregnant women, case fatality up to 25%** (WHO 2006). The sharpest vulnerable-group finding in this analysis |
| Crowding in shelters | Measles, meningitis, acute respiratory infection | Driven by displacement conditions, not by water (WHO 2006) |

**Power cuts belong here.** Flood-related power cuts disrupt water treatment and
supply plants, raising waterborne risk, and degrade health facilities including
the cold chain (WHO 2005). Cross-links to
[[Power outage and disruption risk]].

**Damp and mould.** Wooden buildings and basements hold moisture after the water
leaves. Occupants of damp or mouldy buildings carry up to a **75% greater risk
of respiratory symptoms and asthma**; preventing persistent dampness is the
single most effective measure (WHO 2009).

**Corpses do not cause epidemics.** There is no evidence that dead bodies pose
an outbreak risk after natural disasters; the risk sits with survivors' living
conditions (WHO 2005; WHO 2006). If the user raises it, correcting the belief
*is* the intervention -- WHO asks that people be informed precisely to prevent
panic and inappropriate disposal.

## Exposure -- who is in the way

- Low-lying populated areas: terrain (3) crossed with population (9).
- Proximity to sea, lake or river, against the permanent and seasonal water
  baseline (4), so a river in its channel is not counted as flooding.
- Residential areas near plants and **outfalls** -- the outfall is where
  effluent enters the water, and it is not the plant location
  (Ehalt Macedo et al. 2022).
- **Displacement and shelter first.** The evidence points here before it points
  at pipes: the size, health status and living conditions of the displaced
  population are what drive outbreak risk (WHO 2006).
- Pre-event sanitation service level (JMP), input 15.

Exposure is **who and how many**. Without population data it returns "not
quantified"; area is never substituted for people.

## Vulnerability -- how hard it lands

INFORM (input 8) **for the year of the event**, release year always stated:

- INFORM Risk scores 0-10 across Hazard & Exposure, Vulnerability, and Lack of
  Coping Capacity, over roughly 80 indicators (INFORM).
- Vulnerability holds *Socio-economic Vulnerability* and *Vulnerable Groups* --
  populations with limited access to social and health care systems --
  geometrically aggregated (INFORM).
- Lack of Coping Capacity governs whether a sanitation failure is recovered
  from or compounds. A separate claim from Vulnerability; report both.
- **INFORM Climate Change** is a separate product, and is where any
  forward-looking statement belongs (INFORM).

**A score is not an explanation.** INFORM tells you which components score
badly, not why a country came to be that way. Decompose the score; do not
narrate history.

Two vulnerable groups this hazard singles out, which a national index will not
show: **pregnant women** (hepatitis E) and **children under five** (diarrhoeal
disease and ARI) (WHO 2006). Country income level matters directly -- diarrhoeal
outbreak risk after a disaster is higher in developing than in developed
countries (WHO 2006).

**INFORM is national**; the AOI is not. It sets the regime -- how much
institutional capacity exists -- never a property of the mapped population.

## Recommendation

**Individual.** Safe water first: boil or chlorinate. Free chlorine at a few
mg/l with about **30 minutes** contact inactivates **>99.99% of enteric bacteria
and viruses** -- though not *Cryptosporidium parvum* oocysts or mycobacteria;
aim for a residual free chlorine of **0.2-0.5 mg/l** at 30 minutes (WHO 2005).
Avoid skin contact with floodwater; wash and cover wounds (WHO 2006). Protected
storage, safe food preparation and hand hygiene -- adequate containers, cooking
pots and **fuel** reduce cholera and diarrhoeal risk (WHO 2005). Dry buildings
before mould establishes (WHO 2009). Seek care early for fever, and for
diarrhoea in a child under five (WHO 2006).

**City mayor or planning office.**

- **Uninterrupted safe drinking water is the single most important preventive
  measure** after a flood (WHO 2005; WHO 2006). Everything else ranks below it.
  Iowa and Missouri, 1993, is the worked example of risk recognised early and
  clean water prioritised (WHO 2005).
- **Settlement and shelter planning**: adequate water and sanitation access,
  minimum space per person (WHO 2006). Muzaffarabad 2005 -- an outbreak of
  >750 cases in a camp of 1,800 was controlled by providing adequate water and
  sanitation facilities (WHO 2006).
- **Surveillance and early warning**, with early diagnosis and treatment of
  diarrhoeal disease and ARI in under-fives, and oral rehydration salts stocked
  (WHO 2006).
- **Vaccination is not the first lever.** Mass tetanus campaigns are **not**
  indicated after floods; oral cholera vaccine is only for populations at
  immediate risk; typhoid vaccines are not recommended for mass campaigns.
  Clean water and adequate sanitation remain the practical strategy
  (WHO 2005). Measles immunisation with vitamin A *is* a priority in crowded
  displacement settings (WHO 2005).
- **Risk-based sanitation management**: Sanitation Safety Planning (WHO 2018).
- **Structural resilience** for plants inside the flood envelope -- intake and
  outfall protection, power continuity, containment during surcharge. Where the
  national treatment gap dominates, hardening one plant is the wrong first
  answer (CPCB 2021).
- **Economics, when needed**: **USD 5.50 returned per USD 1 invested** in
  sanitation (WHO 2024). Attribute it; never present it as an own estimate.

## Areas of uncertainty -- to [[Entro - Uncertainty Analyser]]

1. **Outfall position**: average offset **6.5 +- 3.1 km** from the reported
   plant location, up to **21.8 km** (Ehalt Macedo et al. 2022). At
   neighbourhood scale that exceeds the feature being placed.
2. **Plant coverage is uneven**, worst in lower-income countries, by the
   authors' own statement (Ehalt Macedo et al. 2022). "No plant" and "no
   reporting" are opposite findings the data cannot separate.
3. **Dilution factor is normal-condition**, not flood-condition.
4. **INFORM is national**, the AOI is not.
5. **No observed inundation** -- no flood mask in the pipeline, so extent is
   inferred from terrain and permanent water. Every exposure number inherits it.
6. **Sewer geometry is usually absent** -- manholes, pipes and pumping stations
   are rarely open data.
7. **The disease evidence is not local.** The outbreak record is global and
   historical; the most recent case studies in the WHO references are from
   2005. It establishes *mechanism*, not a rate for this AOI this year.
8. **Source vintage.** Check for newer CPCB, INFORM and JMP releases before
   quoting the figures above.

The user gets two or three sentences and an offer of depth, never this list.

## Local and event data

Prefer verified local data over a global product. National pollution-control
and disaster-management agencies, national hydrological services,
[HDX](https://data.humdata.org/), [ReliefWeb](https://reliefweb.int/), and the
[JMP](https://washdata.org/). Give the link **and the publication date**, and
say whether a figure is for the event or is background. A local figure that
cannot be verified is not used -- it looks specific, which makes it worse than
a verified global one.

---

Related: [[Sewage and infection risk - sources]] | [[Citadel flows - MOC]] | [[Citadel node schema]] | [[Citadel input sources]] | [[Power outage and disruption risk]] | [[Drinking water scarcity]] | [[Agent Citadel - City Planner]] | [[Agent Argos - Orchestrator]] | [[Entro - Uncertainty Analyser]] | [[Workflows-MOC]]
