---
type: template
desc: The rendered shape of thesis output 3 (the MCDM decision matrix before the run) - sections, tables and the mcdm payload field behind every value
aliases: [output 3 template, decision matrix template, 03_mcdm_matrix_pre template, MCDM matrix render]
keywords: [output 3, MCDM, TOPSIS, decision matrix, criteria, weights, modulators, indices, feasibility gate, evidence, contested cells, parameters, template, render, thesis output]
agent: monty
workflows: [rank_flood_products]
context: head
retrieval: Answer what thesis output 3 looks like when rendered - its sections in order, the columns of each table, which field of the mcdm payload fills each value, and which sections are conditional.
source_of_truth: core/mcdm_report.py::decision_matrix_markdown in langgraph-agents
output_file: experiments/<slug>/03_mcdm_matrix_pre.md
validation_status: transcribed from the renderer 2026-10-21; the code is authoritative
status: draft
tags: [template, output, mcdm, thesis]
---

## What this is

The template of **thesis output 3**: the decision matrix as it stands
**before** ranking, written first so the ranking cannot be read back into its
inputs. Rendered deterministically from the cached `mcdm` payload by
`core/mcdm_report.py::decision_matrix_markdown` -- no agent writes it. Static
scores and evidence come from `_mcdm_data.py` (the MCDM template v3, see
[[Flood_mask_Dataset_MCDA]]).

**This note describes the render; it does not drive it.** Editing it changes
no output until rendering is wired to read templates from the vault.

## Template

```markdown
---
type: experiment-output
event: {{experiment slug}}
n: 3
slot: mcdm_matrix_pre
title: MCDM decision matrix -- scores and weights before the run
written: {{UTC time of rendering}}
source: rank_flood_products (MCDM template v3), rendered deterministically -- no agent writing
inputs_used: [weather_grid, lulc, terrain]
---

# 3. MCDM decision matrix -- scores and weights before the run

## What this is
(fixed text) Method: **{{method.name}}**, mode `{{method.mode}}`.
> **{{method.wsm_note}}**                      <- if not method.wsm_implemented

## The event, as five indices
| Index | Value | Read from | Reduced by | A share of |   <- index_provenance[]
- **{{index}}** -- {{note}}                    <- per index_provenance[] with a note
### What the indices do not say                <- if index_caveats
- {{index_caveats[]}}

## Feasibility gate                            <- gate
ONE of: "The gate cannot fire at this setting" (gate.can_fire false) /
**{{len(gate.excluded)}} of {{N}} alternatives excluded**
| Alternative | Sensor | Reason |              <- gate.excluded[]

## Criteria
| ID | Criterion | Group | Direction | Scale | Scoring rule |   <- criteria[]

## The decision matrix
| Criterion | Dir | {{one column per alternative}} |          <- decision_matrix
| Alternative | Sensor | Eligible | Product-criteria sources | <- alternatives[]
| Alternative | Revisit range (days) | Value used |            <- P2 range

## Evidence behind every susceptibility score
| Criterion | Alternative | Score | Basis | Contested | Rationale | Sources |
### The {{N}} contested cells that carry weight              <- if any
| Criterion | Alternative | Score | Weight | Why it is contested |

## Weights
(fixed text on WEIGHT mode)
| ID | Criterion | Base | Modulated by | Modulator | Effective | Normalised |   <- criteria[]
**At maximum** ... / **Zeroed out** -- `{{criteria with modulator 0}}`   <- if any
Base weights are **equal ({{base_weight}} each)** ...

## Parameters -- every one an author rule
| Parameter | Value | Meaning |              <- parameters, parameter_notes

## Sources
| Key | Reference | URL |                      <- sources
```

Related: [[Output templates - MOC]] | [[Output 4 - MCDM ranking template]] | [[Flood_mask_Dataset_MCDA]] | [[Scoring criteria]]
