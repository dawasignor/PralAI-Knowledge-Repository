---
type: template
desc: The live template of Module 9, Essential services -- the layout the renderer fills from stored results, one block per data-built paragraph or table
aliases: [module 9 template, essential_services_hev template]
keywords: [module 9, essential services, HEV, hazard, exposure, vulnerability, risk, recommended actions, hospitals, drinking water, food, INFORM, WorldPop, template, chanakya, blocks]
agent: argos
sources_note: Sewage and infection risk - sources
context: head
retrieval: Answer what Module 9 contains, section by section, which block fills each part, and which text is fixed.
source_of_truth: this note -- core/report_render.py reads the fenced block below at render time; core/module_blocks.py builds each block
output_file: experiments/<slug>/09_essential_services_hev.md (+ 09_essential_services_hev.facts.json)
validation_status: rewritten 2026-11-02 to the five-section HEV layout (hazard, exposure, vulnerability, overall risk, recommended actions); not yet run live
status: draft
tags: [template, output, module, flood-analyst]
---

> **Essential services:** The flood's reach to hospitals, drinking water and food, the people affected, and what to do.

## What this is

**This template is live.** `core/report_render.py` reads the fenced block
below when it renders Module 9, Essential services: hospitals, drinking water
and food, as hazard, exposure, vulnerability, overall risk and recommended
actions (user decision 2026-11-02); editing it changes the next output. The
heading `# Module 9: Essential services from <source>` is written by the
store, not here.

Each `{{fact:...}}` and `{{map:...}}` is built in Python from the stored
results (`core/module_blocks.py`); a block whose input is not stored renders
"Not known yet -- <reason>". Each `{{llm:...}}` is written by **Chanakya**
from those facts, after **Norwood** hands the flood map over
(`core/pipelines/hev.py`); `max_words` is the limit in the analyst and mayor
modes and `flood_bot=` the limit for Flood bot. Agents write prose, never
numbers. The section **Hints for Chanakya** below is handed to Chanakya with
the facts and is never rendered.

| Block | What it holds |
|---|---|
| `hev_map_essential_services` | the map: the flood extent as red dots, hospitals, drinking-water facilities, food shops and markets as amber counted clusters (at most 2 km across) -- `map_hazard_exposure` |
| `hazard_product_mismatch` | a warning, only when the stored extent is not the best-ranked product's |
| `hazard_flood` | the best-ranked product's flood: km2 flooded of the observed land, or no flood mapped |
| `hev_exposure_essential_services` | each facility type: located, in the flood, outside it, not observed, by name |
| `hev_food_clusters` | food outlets and their clusters, and how many are in the flood |
| `hev_people` | WorldPop: the people in the AOI, and the population affected -- inside the mapped flood extent |
| `hev_income_group` | one phrase: the country's World Bank income group (current classification) |
| `hev_inform_meters` | figure: four national meters out of 10 -- INFORM risk, vulnerability, lack of coping capacity, climate change risk 2050 -- with "higher is worse" at its foot |
| `hev_inform` | the meters' numbers in one line, with the release (the text view, and what Chanakya reads) |
| `hev_inform_trend` | figure: one line chart, year by year, of vulnerability, lack of coping capacity and natural hazard (all natural hazards), from INFORM's latest back-calculated series |
| `hev_inform_trend_line` | the trend's first and last year in one line |
| `hev_previous_floods` | one line: how many floods and storms were recorded before the event, and the latest (GDACS, Copernicus EMS, UNOSAT, World Bank) |
| `previous_disasters_timeline` | figure: those events on a time line, one bar each |
| `hazard_reading` (agent) | Chanakya: what the flood numbers mean and how severe -- 2-3 lines for Flood bot |
| `vulnerability_points` (agent) | Chanakya: two points interpreting INFORM and the earlier floods |
| `overall_risks` (agent) | Chanakya: the most important risks to essential services, numbered |
| `actions` (agent) | Chanakya, in a call of its own: the recommended actions |
| `data_acquired`, `how_sure` | when each input was acquired and its source; the four-level uncertainty |

## Template

```markdown
## 1. Hazard

{{map:hev_map_essential_services}}

{{fact:hazard_product_mismatch}}
{{fact:hazard_flood}}

{{fact:hev_exposure_essential_services}}

{{fact:hev_food_clusters}}

{{llm:hazard_reading|max_words=110|flood_bot=50}}

## 2. Exposure

{{fact:hev_people}}

## 3. Vulnerability

{{fact:hev_income_group}}

{{figure:hev_inform_meters}}

{{fact:hev_inform}}

{{figure:hev_inform_trend}}

{{fact:hev_inform_trend_line}}

{{fact:hev_previous_floods}}

{{figure:previous_disasters_timeline}}

{{llm:vulnerability_points|max_words=90|flood_bot=50}}

## 4. Overall risk

{{llm:overall_risks|max_words=160|flood_bot=70}}

## 5. Recommended actions

{{llm:actions|max_words=220|flood_bot=90}}

## When the data was acquired

{{fact:data_acquired}}

## How sure are we?

{{fact:how_sure}}
```

## Hints for Chanakya

Sourced evidence for the risks and actions of this module. Cite in the short
form given; the full references are in [[Sewage and infection risk - sources]].
Use a hint only where the facts support it -- a hint is not a finding about
this AOI.

**Write each part like this.**
- `hazard_reading`: what the flooded share and the facilities inside the flood
  mean for services, and how severe; say how much of the land was observed.
- `vulnerability_points`: exactly two points. INFORM is NATIONAL and sets the
  regime, never a property of the AOI; Vulnerability and Lack of Coping
  Capacity are separate claims -- report both (INFORM). Say whether floods
  recur here from the count and the latest event given. The trend line says
  whether vulnerability and coping have improved; the climate change meter is
  a 2050 projection, never today's risk. A score is not an explanation.
- `overall_risks`: numbered, most serious first, each tied to a fact above.
- `actions`: most urgent first, each tied to the risk it answers.

**Drinking water.**
- Uninterrupted safe drinking water is the single most important preventive
  measure after a flood; everything else ranks below it (WHO 2005; WHO 2006).
- Contaminated drinking water is the major risk factor for flood-associated
  outbreaks -- cholera, typhoid, hepatitis A and E, diarrhoeal disease
  (WHO 2005).
- Flood-related power cuts disrupt water treatment and supply plants, raising
  waterborne risk (WHO 2005).
- Boil or chlorinate: free chlorine with about 30 minutes contact; aim for a
  residual of 0.2-0.5 mg/l at 30 minutes (WHO 2005).

**Hospitals.**
- Power cuts degrade health facilities, including the vaccine cold chain
  (WHO 2005).
- Surveillance and early warning, early diagnosis and treatment of diarrhoeal
  disease and acute respiratory infection in children under five, and oral
  rehydration salts stocked (WHO 2006).

**Food.**
- Protected storage, safe food preparation and hand hygiene -- adequate
  containers, cooking pots and fuel -- reduce cholera and diarrhoeal risk
  (WHO 2005).
- No sourced evidence yet on food supply disruption from flooded shops and
  markets: say what the map shows and do not estimate a shortage.

**Displacement.** Outbreak risk after a flood is driven by the displaced
population's living conditions -- crowding, water, sanitation, access to care
-- more than by the floodwater itself; do not open from "a flood means an
epidemic" (WHO 2006; WHO 2005).

Related: [[Output templates - MOC]] | [[Module 8 - Sensitivity analysis template]] | [[Module 10 - Human health risks template]] | [[Sewage and infection risk]]
