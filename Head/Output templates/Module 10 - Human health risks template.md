---
type: template
desc: The live template of Module 10, Human health risks -- the layout the renderer fills from stored results, one block per data-built paragraph or table
aliases: [module 10 template, human_health_risks_hev template]
keywords: [module 10, human health, HEV, hazard, exposure, vulnerability, risk, recommended actions, sewage, drinking water, mosquitoes, malaria, dengue, mould, hospitals, WHO, template, chanakya, blocks]
agent: argos
sources_note: Human health risk - sources
context: head
retrieval: Answer what Module 10 contains, section by section, which block fills each part, and which text is fixed.
source_of_truth: this note -- core/report_render.py reads the fenced block below at render time; core/module_blocks.py builds each block
output_file: experiments/<slug>/10_human_health_risks_hev.md (+ 10_human_health_risks_hev.facts.json)
validation_status: rewritten 2026-11-02 to the five-section HEV layout with four WHO-sourced health risks; not yet run live
status: draft
tags: [template, output, module, flood-analyst]
---

> **Health risks:** Sewage, drinking water, mosquitoes and mould after the flood, and what to do.

## What this is

**This template is live.** `core/report_render.py` reads the fenced block
below when it renders Module 10, Human health risks: hazard, exposure,
vulnerability, overall risk and recommended actions, for four health risks
(user decision 2026-11-02); editing it changes the next output. The heading
`# Module 10: Human health risks from <source>` is written by the store, not
here.

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
| `hev_map_health` | the map: the flood extent as red dots and the hospitals -- `map_hazard_exposure` |
| `hazard_product_mismatch` | a warning, only when the stored extent is not the best-ranked product's |
| `hazard_flood` | the best-ranked product's flood: km2 flooded of the observed land, or no flood mapped |
| `hev_exposure_health` | hospitals and general clinics: located, in the flood, outside it, not observed, by name |
| `climate_zone_statement` | the experiment's climate zone and its basis, when one is set |
| `hev_people` | WorldPop: the people in the AOI, and the population affected -- inside the mapped flood extent |
| `hev_population_map` | figure: WorldPop people per pixel (log scale), the flood extent in red, land the product did not observe hatched -- `get_pop_data` |
| `hev_income_group` | one phrase: the country's World Bank income group (current classification) |
| `hev_inform_meters` | figure: four national meters out of 10 -- INFORM risk, vulnerability, lack of coping capacity, climate change risk 2050 -- with "higher is worse" at its foot |
| `hev_inform` | the meters' numbers in one line, with the release (the text view, and what Chanakya reads) |
| `hev_inform_trend` | figure: one line chart, year by year, of vulnerability, lack of coping capacity and natural hazard (all natural hazards), from INFORM's latest back-calculated series |
| `hev_inform_trend_line` | the trend's first and last year in one line |
| `hev_previous_floods` | one line: how many floods and storms were recorded before the event, and the latest (GDACS, Copernicus EMS, UNOSAT, World Bank) |
| `previous_disasters_timeline` | figure: those events on a time line, one bar each |
| `hazard_reading` (agent) | Chanakya: what the flood numbers mean for health and how severe -- 2-3 lines for Flood bot |
| `vulnerability_points` (agent) | Chanakya: two points interpreting INFORM and the earlier floods |
| `overall_risks` (agent) | Chanakya: the four health risks below, numbered, most serious here first |
| `actions` (agent) | Chanakya, in a call of its own: the recommended actions |
| `data_acquired`, `how_sure` | when each input was acquired and its source; the four-level uncertainty |

## Template

```markdown
## 1. Hazard

{{map:hev_map_health}}

{{fact:hazard_product_mismatch}}
{{fact:hazard_flood}}

{{fact:hev_exposure_health}}

{{llm:hazard_reading|max_words=110|flood_bot=50}}

{{fact:climate_zone_statement}}

## 2. Exposure

{{fact:hev_people}}

{{figure:hev_population_map}}

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

{{llm:overall_risks|max_words=200|flood_bot=90}}

## 5. Recommended actions

{{llm:actions|max_words=240|flood_bot=100}}

## When the data was acquired

{{fact:data_acquired}}

## How sure are we?

{{fact:how_sure}}
```

## Hints for Chanakya

Sourced evidence for the four risks. Cite in the short form; full references
are in [[Human health risk - sources]], and the conditions behind each claim
are in [[Human health risk]]. A hint is not a finding about this AOI.

**Each part.**
- `hazard_reading`: what the flooded share, the people in it and the
  hospitals inside it mean for health, and how severe; say how much land was
  observed.
- `vulnerability_points`: exactly two. INFORM is national, and Vulnerability
  and Lack of Coping Capacity are separate claims (INFORM). Say whether floods
  recur here and which way the trend runs. The climate meter is 2050, not
  today.
- `overall_risks`: the four below, ordered by how serious each is here; say
  where the facts cannot rank one.
- `actions`: most urgent first, each tied to its risk and cited.

**Start here.** Outbreak risk is lower than often perceived and driven by
displacement (WHO 2006). A relative risk, RR, is a rise, not a rate.

**1. Sewage and infection.** Leptospirosis spreads through skin contact with
floodwater (WHO 2005), but its post-flood effect was inconsistent from year to
year (Yang et al. 2024). Skin and eye disease rose from one week to three
months after floods (Yang et al. 2024). Act: avoid contact with floodwater;
wash and cover wounds (WHO 2006).

**2. Contaminated drinking water.** The major risk factor for flood outbreaks
(WHO 2005). Diarrhoea (RR 1.11) and dysentery (RR 1.38) rose within six
months of floods, gastrointestinal illness peaking days after
(Yang et al. 2024). Hepatitis E is severe in pregnancy (WHO 2006). Act:
uninterrupted safe water comes first (WHO 2005; WHO 2006); boil or chlorinate
to 0.2-0.5 mg/l free chlorine at 30 minutes (WHO 2005); stock oral
rehydration salts (WHO 2006).

**3. Mosquitoes, malaria and dengue.** Malaria rose after floods in Sudan,
China and Uganda, from weeks to a year after (Yang et al. 2024). No source
held links floods to dengue. Give no lag and no forecast for this AOI. Act:
nets and indoor spraying (WHO 2025a); empty, cover and clean water containers
weekly (WHO 2025b).

**4. Mould and respiratory illness.** Respiratory disease rose after floods
in five studies (Yang et al. 2024). Damp, mouldy buildings carry up to 75%
more respiratory symptoms and asthma (WHO 2009). Act: dry buildings before
mould establishes (WHO 2009).

**Hospitals.** Demand for care rises while access falls (Yang et al. 2024).
Power cuts degrade facilities and the vaccine cold chain (WHO 2005).

Related: [[Output templates - MOC]] | [[Module 9 - Essential services template]] | [[Module 11 - Public report template]] | [[Human health risk]]
