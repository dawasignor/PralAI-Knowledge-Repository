---
type: template
desc: Data availability is first calculated before starting off with the flood analysis
aliases:
  - module 1 template
  - data_availability template
keywords:
  - module 1
  - data availability
  - NRT products
  - passes
  - rolling archive
  - overpass cloud
  - template
  - flood analyst
  - blocks
agent: argos
context: head
retrieval: Answer what Module 1 contains, section by section, which block fills each part, and which text is fixed.
source_of_truth: this note -- core/report_render.py reads the fenced block below at render time; core/module_blocks.py builds each block
output_file: experiments/<slug>/01_data_availability.md (+ 01_data_availability.facts.json)
validation_status: written 2026-10-27 from the code renderer it replaced (core/outputs.py), checked against two reference runs
status: draft
tags:
  - template
  - output
  - module
  - flood-analyst
---

> **Availability:** Which flood products saw the area during the event.

## What this is

**This template is live.** `core/report_render.py` reads the fenced block
below when it renders Module 1 (which of the five NRT flood products observed the AOI on each day of the window); editing it changes the next output.
The heading `# Module 1: Data availability from <source>` is written by the store, not
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
| `availability_window_check` | a warning, only when the stored check was fetched for another window |
| `availability_clock_change` | a note, only when the local clock changed in the window |
| `availability_searched` | the window searched, its zone, when it was retrieved, what an instance is |
| `availability_not_checkable` | the overpass cloud on days no archive holds (no data); only when there are such days |
| `availability_figure` | figure: the availability chart -- passes per product per day with the overpass cloud (user, 2026-11-19: the chart, not the per-day count table) |
| `data_acquired` | when each payload the module shows was acquired, in the event's zone (user decision 2026-10-26) |
| `how_sure` | the four-level uncertainty from those payloads' own blocks (D-34), then any caveats a block added |

## Template

```markdown
{{fact:availability_window_check}}

{{fact:availability_clock_change}}

{{fact:availability_searched}}

{{fact:availability_not_checkable}}

{{figure:availability_figure}}

## When the data was acquired

{{fact:data_acquired}}

## How sure are we?

{{fact:how_sure}}
```

Related: [[Output templates - MOC]] | [[Module 2 - Weather data template]]
