---
type: template
desc: The live template of Module 7, MCDM ranking -- the layout the renderer fills from stored results, one block per data-built paragraph or table
aliases: [module 7 template, mcdm_ranking template]
keywords: [module 7, MCDM, ranking, TOPSIS, closeness, template, flood analyst, blocks]
agent: argos
context: head
retrieval: Answer what Module 7 contains, section by section, which block fills each part, and which text is fixed.
source_of_truth: this note -- core/report_render.py reads the fenced block below at render time; core/module_blocks.py builds each block
output_file: experiments/<slug>/07_mcdm_ranking.md (+ 07_mcdm_ranking.facts.json)
validation_status: written 2026-10-27 from the code renderer it replaced (core/outputs.py), checked against two reference runs
status: draft
tags: [template, output, module, flood-analyst]
---

> **Ranking:** Which flood product suits this event best.

## What this is

**This template is live.** `core/report_render.py` reads the fenced block
below when it renders Module 7 (the TOPSIS ranking of the products); editing it changes the next output.
The heading `# Module 7: MCDM ranking from <source>` is written by the store, not
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
| `mcdm_ranking` | the whole ranking document, `core/mcdm_report.py::ranking_markdown` -- described in [[Output 4 - MCDM ranking template]] |
| `data_acquired` | when each payload the module shows was acquired, in the event's zone (user decision 2026-10-26) |
| `how_sure` | the four-level uncertainty from those payloads' own blocks (D-34), then any caveats a block added |

## Template

```markdown
{{fact:mcdm_ranking}}

## When the data was acquired

{{fact:data_acquired}}

## How sure are we?

{{fact:how_sure}}

- A rank is not a usability claim: high cloud penalises an optical product's weight and does not remove it.
```

Related: [[Output templates - MOC]] | [[Module 6 - MCDM decision matrix template]] | [[Module 8 - Sensitivity analysis template]]
