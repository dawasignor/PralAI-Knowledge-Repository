---
type: template
desc: The live template of Module 10, Human health risks -- the layout the renderer fills from stored results, one block per data-built paragraph or table
aliases: [module 10 template, human_health_risks_hev template]
keywords: [module 10, human health, HEV, hazard, exposure, vulnerability, climate zone, sewage, hospitals, template, flood analyst, blocks]
agent: argos
context: head
retrieval: Answer what Module 10 contains, section by section, which block fills each part, and which text is fixed.
source_of_truth: this note -- core/report_render.py reads the fenced block below at render time; core/module_blocks.py builds each block
output_file: experiments/<slug>/10_human_health_risks_hev.md (+ 10_human_health_risks_hev.facts.json)
validation_status: written 2026-10-27 from the code renderer it replaced (core/outputs.py), checked against two reference runs
status: draft
tags: [template, output, module, flood-analyst]
---

## What this is

**This template is live.** `core/report_render.py` reads the fenced block
below when it renders Module 10 (health risks from the floodwater, as hazard, exposure and vulnerability); editing it changes the next output.
The heading `# Module 10: Human health risks from <source>` is written by the store, not
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
| `climate_zone_statement` | the experiment's climate zone and its basis (core/report_config.py) |
| `exposure_health` | hospitals and water facilities tested against the extent |
| `evidence_health` | the flood analyst agent's sewage and electric-shock flow deliverables; or why there are none |
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

## Climate zone

{{fact:climate_zone_statement}}

## Health facilities, water and sewage

### Exposure: what the flood reached

{{fact:exposure_health}}

### Vulnerability: what the evidence says

{{fact:evidence_health}}

## When the data was acquired

{{fact:data_acquired}}

## How sure are we?

{{fact:how_sure}}
```

Related: [[Output templates - MOC]] | [[Module 9 - Essential services template]] | [[Module 11 - Public report template]]
