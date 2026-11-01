---
type: template
desc: The live template of Module 9, Essential services -- the layout the renderer fills from stored results, one block per data-built paragraph or table
aliases: [module 9 template, essential_services_hev template]
keywords: [module 9, essential services, HEV, hazard, exposure, vulnerability, roads, food, water, critical infrastructure, template, flood analyst, blocks]
agent: argos
context: head
retrieval: Answer what Module 9 contains, section by section, which block fills each part, and which text is fixed.
source_of_truth: this note -- core/report_render.py reads the fenced block below at render time; core/module_blocks.py builds each block
output_file: experiments/<slug>/09_essential_services_hev.md (+ 09_essential_services_hev.facts.json)
validation_status: written 2026-10-27 from the code renderer it replaced (core/outputs.py), checked against two reference runs
status: draft
tags: [template, output, module, flood-analyst]
---

## What this is

**This template is live.** `core/report_render.py` reads the fenced block
below when it renders Module 9 (critical infrastructure, roads and accessibility, food and water, as hazard, exposure and vulnerability, from the best-ranked flood extent); editing it changes the next output.
The heading `# Module 9: Essential services from <source>` is written by the store, not
here.

Headings, their order and every fixed sentence live in this note. Each
`{{fact:...}}` is a block `core/module_blocks.py` builds from the stored
results -- a table, or a sentence carrying values. A block whose input is not
stored renders "Not known yet -- <reason>" and names the tool that would
produce it; a block with nothing to add renders nothing, and the blank lines
around it close up. Any report fact (see [[Module 11 - Public report
template]]) may be placed here too. Every block is listed in the facts sidecar
with its source.

| Block | What it holds |
|---|---|
| `hazard_product_mismatch` | a warning, only when the stored extent is not the best-ranked product's |
| `hazard_flood` | the best-ranked product's flood: km2 flooded of the observed land, or no flood mapped (a finding, D-24) |
| `depth_summary` | FwDET depth: median, 95th percentile, deepest, over what area (biased high, BUG-014) |
| `depth_band_table` | depth bands: vehicle classes, the 10 cm advisory, the person bands |
| `depth_how_firm` | the spread across DEM perturbations; a precision, not an accuracy |
| `depth_bias` | why every depth is biased high, and by what edge height |
| `exposure_<section>` | the mapped facilities of that section tested against the extent: in the flood, dry, not observed, flooded by name |
| `evidence_<section>` | the flood analyst agent's flow deliverable for that section, reading its vault note; or why there is none |
| `roads_summary` | km of mapped road flooded, dry, not observed, and the road state |
| `roads_by_class_table` | the same by road class |
| `roads_passability_km` | km by passability class (Kramer et al. 2016); only when depth is stored |
| `roads_bridges` | bridges in the flood extent |
| `roads_hospital_access` | hospitals with a flooded road within the assumed distance |
| `slope_tree_notes` | the slope-and-tree road notes; only when that check is stored |
| `rests_on_where_am_i` | renders nothing: dates and qualifies the OpenStreetMap context the exposure sections use, in When and How sure |
| `people_in_aoi_statement` | people in the AOI from the census, with its vintage and method |
| `data_acquired` | when each payload the module shows was acquired, in the event's zone (user decision 2026-10-26) |
| `how_sure` | the four-level uncertainty from those payloads' own blocks (D-34), then any caveats a block added |

## Template

```markdown
### Hazard: the flood

{{fact:hazard_product_mismatch}}
{{fact:hazard_flood}}

### Hazard: how deep

{{fact:depth_summary}}

{{fact:depth_band_table}}

{{fact:depth_how_firm}}
{{fact:depth_bias}}

## Critical infrastructure

### Exposure: what the flood reached

{{fact:exposure_critical_infrastructure}}

### Vulnerability: what the evidence says

{{fact:evidence_critical_infrastructure}}

## Roads and accessibility

### Exposure: what the flood reached

{{fact:exposure_roads_and_accessibility}}

### Roads

{{fact:roads_summary}}

{{fact:roads_by_class_table}}

{{fact:roads_passability_km}}

{{fact:roads_bridges}}
{{fact:roads_hospital_access}}

{{fact:slope_tree_notes}}

### Vulnerability: what the evidence says

{{fact:evidence_roads_and_accessibility}}

## Food

### Exposure: what the flood reached

{{fact:exposure_food}}

### Vulnerability: what the evidence says

{{fact:evidence_food}}

## Water

### Exposure: what the flood reached

{{fact:exposure_water}}

### Vulnerability: what the evidence says

{{fact:evidence_water}}

## People

{{fact:people_in_aoi_statement}}

{{fact:rests_on_where_am_i}}

## When the data was acquired

{{fact:data_acquired}}

## How sure are we?

{{fact:how_sure}}
```

Related: [[Output templates - MOC]] | [[Module 8 - Sensitivity analysis template]] | [[Module 10 - Human health risks template]]
