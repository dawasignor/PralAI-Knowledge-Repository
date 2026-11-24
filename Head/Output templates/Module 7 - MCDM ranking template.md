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
| (fixed text) | a short introduction to TOPSIS in this thesis, the ideal and anti-ideal, and closeness (user, 2026-11-19) |
| `mcdm_closeness_figure` | figure: the closeness meter -- each product's arrow between the anti-ideal (0) and the ideal (1); drawn by `rank_flood_products` |
| `mcdm_ranking` | the whole ranking document, including the weights the user changed, if any, `core/mcdm_report.py::ranking_markdown` -- described in [[Output 4 - MCDM ranking template]] |
| `data_acquired` | when each payload the module shows was acquired, in the event's zone (user decision 2026-10-26) |
| `how_sure` | the four-level uncertainty from those payloads' own blocks (D-34), then any caveats a block added |

## Template

```markdown
## What TOPSIS does here

TOPSIS (Hwang and Yoon 1981) ranks a set of options by how close each one comes to the best possible combination of criteria. In this thesis it answers one question: which of the five near-real-time flood products suits this flood event best, given the scores and weights of Module 6.

1. Each criterion's scores are put on one common scale (each column divided by its length, "vector normalisation") and multiplied by the criterion's weight.
2. **The ideal** is an imaginary product holding the best value of every criterion among the five -- the finest resolution, the shortest revisit, the least hurt by cloud, and so on. **The anti-ideal** holds the worst value of every criterion. Neither is a real product.
3. For each product, TOPSIS measures how far it lies from the ideal and how far from the anti-ideal.
4. **Closeness** = distance from the anti-ideal / (distance from the anti-ideal + distance to the ideal). It runs from 0 (the product is the anti-ideal) to 1 (the product is the ideal). The product with the highest closeness ranks first.

The ideal and the anti-ideal are built from these five products only, so a closeness is relative: it says how a product compares with the others here, not how good it is in absolute terms.

{{figure:mcdm_closeness_figure}}

{{fact:mcdm_ranking}}

## When the data was acquired

{{fact:data_acquired}}

## How sure are we?

{{fact:how_sure}}

- A rank is not a usability claim: high cloud penalises an optical product's weight and does not remove it.
```

Related: [[Output templates - MOC]] | [[Module 6 - MCDM decision matrix template]] | [[Module 8 - Sensitivity analysis template]]
