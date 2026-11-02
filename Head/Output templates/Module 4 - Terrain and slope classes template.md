---
type: template
desc: The live template of Module 4, Terrain and slope classes -- the layout the renderer fills from stored results, one block per data-built paragraph or table
aliases: [module 4 template, terrain template]
keywords: [module 4, terrain, elevation, slope, GLO-30, DEM, template, flood analyst, blocks]
agent: argos
context: head
retrieval: Answer what Module 4 contains, section by section, which block fills each part, and which text is fixed.
source_of_truth: this note -- core/report_render.py reads the fenced block below at render time; core/module_blocks.py builds each block
output_file: experiments/<slug>/04_terrain.md (+ 04_terrain.facts.json)
validation_status: written 2026-10-27 from the code renderer it replaced (core/outputs.py), checked against two reference runs
status: draft
tags: [template, output, module, flood-analyst]
---

> **Terrain:** How high and how steep the ground is.

## What this is

**This template is live.** `core/report_render.py` reads the fenced block
below when it renders Module 4 (elevation and slope classes from the Copernicus DEM); editing it changes the next output.
The heading `# Module 4: Terrain and slope classes from <source>` is written by the store, not
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
| `terrain_summary` | the DEM, the land area and the slope method |
| `elevation_table` | elevation percentiles |
| `slope_class_table` | slope classes: share of land and km2 |
| `slope_class_figure` | the slope class raster's name, when it was written |
| `data_acquired` | when each payload the module shows was acquired, in the event's zone (user decision 2026-10-26) |
| `how_sure` | the four-level uncertainty from those payloads' own blocks (D-34), then any caveats a block added |

## Template

```markdown
{{fact:terrain_summary}}

{{fact:elevation_table}}

{{fact:slope_class_table}}

GLO-30 is a surface model: canopy and building heights add to the slope where they stand.

{{fact:slope_class_figure}}

## When the data was acquired

{{fact:data_acquired}}

## How sure are we?

{{fact:how_sure}}
```

Related: [[Output templates - MOC]] | [[Module 3 - Land use before the event template]] | [[Module 5 - Permanent water and structures template]]
