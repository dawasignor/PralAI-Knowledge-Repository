---
type: template
desc: The live template of Module 8, Sensitivity analysis -- the layout the renderer fills from stored results, one block per data-built paragraph or table
aliases: [module 8 template, sensitivity template]
keywords: [module 8, sensitivity, weight sweep, one-at-a-time, stability, template, flood analyst, blocks]
agent: argos
context: head
retrieval: Answer what Module 8 contains, section by section, which block fills each part, and which text is fixed.
source_of_truth: this note -- core/report_render.py reads the fenced block below at render time; core/module_blocks.py builds each block
output_file: experiments/<slug>/08_sensitivity.md (+ 08_sensitivity.facts.json)
validation_status: written 2026-10-27 from the code renderer it replaced (core/outputs.py), checked against two reference runs
status: draft
tags: [template, output, module, flood-analyst]
---

> **Sensitivity:** How firm that ranking is.

## What this is

**This template is live.** `core/report_render.py` reads the fenced block
below when it renders Module 8 (how far each weight can move before the ranking changes); editing it changes the next output.
The heading `# Module 8: Sensitivity analysis from <source>` is written by the store, not
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
| `sensitivity_figure` | the weight-stability chart the tool drew (`core/charts.py`), one band per criterion |
| `sensitivity_sweep` | the whole sweep document, `core/mcdm_report.py::sensitivity_markdown` -- described in [[Output 5 - Sensitivity analysis template]] |
| `data_acquired` | when each payload the module shows was acquired, in the event's zone (user decision 2026-10-26) |
| `how_sure` | the four-level uncertainty from those payloads' own blocks (D-34), then any caveats a block added |

> Since 2026-11-22 the sweep starts from the weights and scores Module 7 ranked with -- the event-first weights and any the user changed -- and each threshold gives the weight to state.

## Template

```markdown
{{figure:sensitivity_figure}}

{{fact:sensitivity_sweep}}

## When the data was acquired

{{fact:data_acquired}}

## How sure are we?

{{fact:how_sure}}

- Weights only are perturbed: scores, evidence and the author parameters are held fixed.
```

Related: [[Output templates - MOC]] | [[Module 7 - MCDM ranking template]] | [[Module 9 - Essential services template]]
