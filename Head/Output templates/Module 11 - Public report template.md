---
type: template
desc: The live template of Module 11, the Flood bot Public Report -- placeholders the renderer fills from stored results, and the few slots an agent writes
aliases: [module 11 template, public report template, flood bot report template, output 11 template]
keywords: [module 11, public report, flood bot, template, placeholders, facts sidecar, tiles, meters, chips, RQ5]
agent: argos
context: head
retrieval: Answer what the Public Report contains, section by section, which placeholder fills each value, and which parts an agent writes.
source_of_truth: this note -- core/report_render.py reads the fenced block below at render time
output_file: experiments/<slug>/11_public_report.md (+ 11_public_report.facts.json)
validation_status: written 2026-10-25 from REFACTOR_PLAN Appendix C (template v2); depth block added 2026-10-26 (calc_flood_depth, BUG-012)
status: draft
tags: [template, output, report, public]
---

## What this is

**This template is live.** `core/report_render.py` reads the fenced block
below when it renders Module 11; editing it changes the next report. It
needs a Flood analyst run of the same AOI, window and cache policy first
(D-24). The flood extent is the best-ranked product's.

Placeholders: `{{fact:key}}` a value; `{{tile:key|icon=..}}` a number with
its label; `{{meter:key|min=0|max=10}}` a score on a scale; `{{chip:key}}` a
status; `{{pictogram:key}}` counts; `{{figure:key}}` and `{{map:key}}` an
image; `{{llm:slot|max_words=N}}` the only text an agent writes. Everything
except `llm` is a fact, listed in the facts sidecar with its source. A value
that is not stored renders as "Not known yet", with the reason.

## Template

```markdown
**{{fact:event_name}}** -- {{fact:aoi_display_name}}
{{tile:last_updated|icon=clock}} Verified by {{fact:verified_by}}

## 1. What caused it
{{tile:storm_total_mm|icon=rain}} {{tile:peak_1h_mm|icon=rain-peak}} {{tile:rain_hours|icon=hourglass}}
{{tile:antecedent_phrase|icon=soil}} {{tile:max_gust_kmh|icon=wind}}
{{figure:rain_hyetograph}}
{{llm:cause_one_liner|max_words=30}}

## 2. Where it flooded
{{llm:location_description|max_words=60}}
{{map:where_am_i_overview}}
### Worst-affected areas
{{figure:worst_localities_bar}}
### How deep
{{tile:flood_depth_m|icon=depth}}
{{map:depth_map}}
{{fact:depth_bands_table}}
{{fact:depth_uncertainty}}
> {{chip:advisory_10cm}} Even 10 cm of water is a risk for small children, pushchairs and trolleys.
### Buildings of interest
{{pictogram:buildings_of_interest_counts}}
{{fact:buildings_of_interest_list}}

## 3. People and land affected
{{tile:people_in_aoi|icon=people}} {{tile:people_in_flood_extent|icon=people}}
{{tile:flooded_km2|icon=land}} {{meter:flooded_pct|min=0|max=100}}
{{figure:land_cover_donut}}

## 4. How vulnerable is {{fact:country}}? (national figures)
{{meter:inform_risk|min=0|max=10}} {{meter:inform_hazard|min=0|max=10}}
{{meter:inform_vulnerability|min=0|max=10}} {{meter:inform_lcc|min=0|max=10}}
{{llm:climate_outlook|max_words=35}}
{{tile:gdp_usd_bn|icon=money}} {{tile:population_national|icon=people}}
Floods and storms recorded before {{fact:search_cutoff}}:
{{figure:previous_disasters_timeline}}

## 5. How sure are we?
{{map:flood_overlay}}
{{meter:confidence|bands=low,medium,high}}
{{fact:flood_product}} -- {{llm:why_product|max_words=25}}
{{fact:top_uncertainty}}

## Ask about any of these
{{fact:followup_chips}}

Main sources: {{fact:sources_major}}
```

Related: [[Output templates - MOC]] | [[Module 12 - Executive summary template]]
