---
type: template
desc: The rendered shape of thesis output 4 (MCDM final ranking and decision matrix) - sections, tables and the mcdm payload field behind every value
aliases: [output 4 template, ranking template, 04_mcdm_ranking template, TOPSIS ranking render]
keywords: [output 4, MCDM, TOPSIS, ranking, closeness, ideal point, anti-ideal, separation, normalised matrix, weighted matrix, template, render, thesis output]
agent: monty
workflows: [rank_flood_products]
context: head
retrieval: Answer what thesis output 4 looks like when rendered - its sections in order, the columns of each table, and which field of the mcdm payload fills each value.
source_of_truth: core/mcdm_report.py::ranking_markdown in langgraph-agents
output_file: experiments/<slug>/04_mcdm_ranking.md
validation_status: transcribed from the renderer 2026-10-21; the code is authoritative
status: draft
tags: [template, output, mcdm, ranking, thesis]
---

## What this is

The template of **thesis output 4**: the TOPSIS ranking and every step from
the matrix to it. Rendered deterministically from the same cached `mcdm`
payload as output 3, by `core/mcdm_report.py::ranking_markdown`. A rank is not
a usability claim -- read it beside the cloud index and `W1` (output 3).

**This note describes the render; it does not drive it.** Editing it changes
no output until rendering is wired to read templates from the vault.

## Template

```markdown
---
type: experiment-output
event: {{experiment slug}}
n: 4
slot: mcdm_ranking
title: MCDM final ranking and decision matrix
written: {{UTC time of rendering}}
source: rank_flood_products (MCDM template v3), rendered deterministically -- no agent writing
inputs_used: [mcdm]
---

# 4. MCDM final ranking and decision matrix

## What this is
(fixed text)

## Ranking
| Rank | Alternative | Sensor | Closeness Ci | D+ (to ideal) | D- (to anti-ideal) |   <- ranking[]: rank, alternative, sensor, closeness, d_plus, d_minus
**{{N}} alternative(s) were never ranked.**                                            <- if gate.excluded
| Alternative | Sensor | Reason |
(fixed text: this changes what the closeness values mean)

## Normalised decision matrix
| Criterion | {{one column per alternative}} |               <- topsis (normalised)

## Weighted normalised matrix
| Criterion | Weight | {{one column per alternative}} |      <- topsis (weighted)

## Ideal and anti-ideal points
| Criterion | Direction | Ideal best (A+) | Ideal worst (A-) |

## Separation measures
| Alternative | D+ (to A+) | D- (to A-) | D+ + D- | Ci | Rank |

## What this ranking rests on
(fixed text: method, normalisation, rank rule, what is not implemented)
```

Related: [[Output templates - MOC]] | [[Output 3 - MCDM decision matrix template]] | [[Output 5 - Sensitivity analysis template]]
