---
type: template
desc: The live template of Module 12, the Chanakya Executive Summary of the Event -- placeholders the renderer fills from stored results, and the slots an agent writes
aliases: [module 12 template, executive summary template, chanakya summary template, output 12 template]
keywords: [module 12, executive summary, chanakya, mayor, template, placeholders, status chips, facts sidecar, RQ5]
agent: citadel
context: head
retrieval: Answer what the Executive Summary contains, section by section, which placeholder fills each value, how each status chip is decided, and which parts an agent writes.
source_of_truth: this note -- core/report_render.py reads the fenced block below at render time
output_file: experiments/<slug>/12_executive_summary.md (+ 12_executive_summary.facts.json)
validation_status: written 2026-10-25 from REFACTOR_PLAN Appendix D (template v2); depth and road passability added 2026-10-26 (calc_flood_depth, BUG-012)
status: draft
tags: [template, output, report, executive]
---

## What this is

**This template is live.** `core/report_render.py` reads the fenced block
below when it renders Module 12, after a Flood analyst run of the same AOI,
window and cache policy (D-24). The placeholder syntax is that of
[[Module 11 - Public report template]].

**Status chips** are AFFECTED, AT RISK, NOT AFFECTED or NOT KNOWN, decided in
code from the stored results, and the rule behind each is in the facts
sidecar: AFFECTED when a mapped road or facility of that kind lies in the
flood extent; AT RISK when none does but a flooded road lies within the
assumed distance of one; NOT AFFECTED when the extent was observed and none
is reached; NOT KNOWN when there is no mapped extent or no located facility.

## Template

```markdown
**{{fact:event_name}}** -- {{fact:aoi_display_name}} · {{fact:window}}
Prepared {{fact:last_updated}} · Verified by {{fact:verified_by}}

## Bottom line
{{llm:bottom_line|max_words=70}}

## At a glance
{{tile:storm_total_mm|icon=rain}} {{tile:flooded_km2|icon=land}} {{tile:people_in_aoi|icon=people}}
{{tile:roads_flooded_km|icon=road}} {{tile:hospitals_access_at_risk|icon=hospital}} {{tile:flood_depth_m|icon=depth}}

## Areas that need attention
### 1. Roads and access {{chip:status_roads}}
{{map:roads_hospitals}}
{{fact:hospital_access_table}}
{{fact:roads_passability}}
{{fact:bridges_affected}}
{{fact:slope_tree_road_notes}}
### 2. Food security {{chip:status_food}}
{{pictogram:food_outlets_flooded}} {{tile:farmland_flooded_km2|icon=farm}}
### 3. Drinking water {{chip:status_water}}
{{fact:water_facilities_checklist}}
### 4. Health risks from the floodwater {{chip:status_health}}
{{fact:health_risk_list}}
### 5. Other essential services {{chip:status_services}}
{{fact:services_checklist}}

## Decisions
| When | Action and why |
|---|---|
| Now | {{llm:decision_now|max_words=40}} |
| Next 72 hours | {{llm:decision_72h|max_words=40}} |
| Watch | {{llm:decision_watch|max_words=40}} |

## How sure are we?
{{fact:depth_uncertainty}}
{{figure:uncertainty_traffic_lights}}

## Data we would need to say more
{{fact:new_data_needed}}

Main sources: {{fact:sources_major}}
```

Related: [[Output templates - MOC]] | [[Module 11 - Public report template]]
