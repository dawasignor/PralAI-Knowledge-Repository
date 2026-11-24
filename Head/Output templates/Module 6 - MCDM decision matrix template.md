---
type: template
desc: The live template of Module 6, MCDM decision matrix -- the layout the renderer fills from stored results, one block per data-built paragraph or table
aliases: [module 6 template, mcdm_pre_ranking template]
keywords: [module 6, MCDM, decision matrix, TOPSIS, criteria, weights, event indices, template, flood analyst, blocks]
agent: argos
context: head
retrieval: Answer what Module 6 contains, section by section, which block fills each part, and which text is fixed.
source_of_truth: this note -- core/report_render.py reads the fenced block below at render time; core/module_blocks.py builds each block
output_file: experiments/<slug>/06_mcdm_pre_ranking.md (+ 06_mcdm_pre_ranking.facts.json)
validation_status: written 2026-10-27 from the code renderer it replaced (core/outputs.py), checked against two reference runs
status: draft
tags: [template, output, module, flood-analyst]
---

> **Scores and weights:** Each flood product's scores, and how much each criterion counts here.

## What this is

**This template is live.** `core/report_render.py` reads the fenced block
below when it renders Module 6 (the decision matrix before ranking: criteria, scores, weights, written first so the ranking cannot be read back into its inputs); editing it changes the next output.
The heading `# Module 6: MCDM decision matrix from <source>` is written by the store, not
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
| (fixed text) | how the scores are calculated and how the weights arrive (user, 2026-11-19); the figures in it are the code's own rules (`core/workflows/_mcdm_data.py`, `mcdm.modulators`) |
| `mcdm_matrix_figure` | figure (user, 2026-11-22): benefit criteria (higher is better) and cost criteria (lower is better) in two bands, each cell coloured by how the product compares on its row, each weight as a bar beside the equal start with what the event did to it; drawn by `mcdm_decision_matrix` |
| `mcdm_decision_matrix` | the whole matrix document, `core/mcdm_report.py::decision_matrix_markdown` -- described in [[Output 3 - MCDM decision matrix template]]; the payload's index caveats join How sure |
| `data_acquired` | when each payload the module shows was acquired, in the event's zone (user decision 2026-10-26) |
| `how_sure` | the four-level uncertainty from those payloads' own blocks (D-34), then any caveats a block added |

## Template

```markdown
## The matrix at a glance

{{figure:mcdm_matrix_figure}}

**Blue** is better than the other products on that row, **red** worse, grey all the same. Benefit rows: higher is better. Cost rows: lower is better. A faded row has almost no weight, so it cannot move the ranking.

## How the scores are calculated

Each of the five flood products is scored on twelve criteria. A score is a property of the product, so it does not change from one flood to the next.

- **Product criteria (P1-P6)** come from each product's own specification: spatial resolution (metres) and revisit interval (days, the worst case) -- lower is better; separation of flood from permanent water (0 or 1), uncertainty layer (0-2), archive length (years) and programmatic access maturity (0-2) -- higher is better.
- **Weather and land-characteristic criteria (W1-W3, L1-L3)** score how badly a product is hurt by cloud, wind, darkness, dense vegetation, steep terrain and built-up ground: 0 means not affected, 1 or 2 the most affected. Each of these 30 scores records its basis -- the product's own documentation (D), sensor physics (S) or an author rule (R) -- and its sources; five are marked contested, meaning a second scorer could reasonably score them differently.

## How the weights arrive

1. The event criteria are weighted first (user decision 2026-11-22). Each starts at the base weight 1/12 (0.083) and is raised by this event's index: cloud cover (the mean at the optical products' passes) raises W1, wind speed (the mean at the radar passes) W2, the dense-vegetation share L1, the steep-terrain share L2 and the built-up share L3. Cloud acts through a curve that is 0 up to 20% cloud and rises to 1 at total cloud; wind rises in a straight line from 0 at 5 m/s to 1 at 15 m/s; the three shares are used as they are (52% dense vegetation raises L1 by 52%, to 1/12 x 1.52 = 0.127). Daylight (W3) is not raised. Every pass time is put in local time before cloud and wind are read.
2. The weight left after the event criteria is divided equally among the six product criteria, P1-P6.
3. The twelve weights then sum to one -- the **Weight** column of the weights table.

These are the weights Module 7 ranks with. Any weight or score can be changed here, before the ranking -- for example "set L1 to 0.2" or "give GFM a revisit of 6 days" -- and Module 7 then ranks with your changes and states each one.

{{fact:mcdm_decision_matrix}}

## When the data was acquired

{{fact:data_acquired}}

## How sure are we?

{{fact:how_sure}}
```

Related: [[Output templates - MOC]] | [[Module 5 - Permanent water and structures template]] | [[Module 7 - MCDM ranking template]]
