---
type: template
desc: The live template of Module 5, Permanent water and structures -- the layout the renderer fills from stored results, one block per data-built paragraph or table
aliases: [module 5 template, water_and_structures template]
keywords: [module 5, permanent water, JRC GSW, OpenStreetMap, buildings of interest, water infrastructure, where_am_i, template, flood analyst, blocks]
agent: argos
context: head
retrieval: Answer what Module 5 contains, section by section, which block fills each part, and which text is fixed.
source_of_truth: this note -- core/report_render.py reads the fenced block below at render time; core/module_blocks.py builds each block
output_file: experiments/<slug>/05_water_and_structures.md (+ 05_water_and_structures.facts.json)
validation_status: written 2026-10-27 from the code renderer it replaced (core/outputs.py), checked against two reference runs
status: draft
tags: [template, output, module, flood-analyst]
---

## What this is

**This template is live.** `core/report_render.py` reads the fenced block
below when it renders Module 5 (the normally-wet baseline and what is in the AOI: places, buildings of interest and water infrastructure); editing it changes the next output.
The heading `# Module 5: Permanent water and structures from <source>` is written by the store, not
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
| `water_classes_table` | JRC water classes: km2 and share of land |
| `water_threshold_note` | the source and the permanent-water threshold |
| `aoi_admin_places` | the admin units, country and the cities and towns inside |
| `osm_counts_table` | OpenStreetMap feature counts |
| `osm_counts_missing` | the categories whose request failed; only when one did |
| `buildings_by_category` | buildings of interest, per category, with up to eight names |
| `water_influences_section` | the water infrastructure and influences section, with its heading: mapped, inside the AOI, searched; only when the search returned categories |
| `where_figure` | the overview map's name and caption |
| `data_acquired` | when each payload the module shows was acquired, in the event's zone (user decision 2026-10-26) |
| `how_sure` | the four-level uncertainty from those payloads' own blocks (D-34), then any caveats a block added |

## Template

```markdown
## Permanent and seasonal water

{{fact:water_classes_table}}

{{fact:water_threshold_note}}

## Where the AOI is

{{fact:aoi_admin_places}}

{{fact:osm_counts_table}}

{{fact:osm_counts_missing}}

## Buildings of interest

{{fact:buildings_by_category}}

{{fact:water_influences_section}}

{{fact:where_figure}}

## When the data was acquired

{{fact:data_acquired}}

## How sure are we?

{{fact:how_sure}}

- OpenStreetMap features are mapped features, not every feature on the ground.
```

Related: [[Output templates - MOC]] | [[Module 4 - Terrain and slope classes template]] | [[Module 6 - MCDM decision matrix template]]
