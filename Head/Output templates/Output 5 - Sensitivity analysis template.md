---
type: template
desc: The rendered shape of thesis output 5 (sensitivity analysis of the MCDM ranking) - sections, tables and the sensitivity payload field behind every value
aliases: [output 5 template, sensitivity template, 05_sensitivity_analysis template, weight sensitivity render]
keywords: [output 5, sensitivity, one-at-a-time, OAT, weights, rank reversal, leader change, Spearman, Kendall tau-b, closeness curves, reachable, template, render, thesis output]
agent: monty
workflows: [sensitivity_analysis]
context: head
retrieval: Answer what thesis output 5 looks like when rendered - its sections in order, the columns of each table, which field of the sensitivity payload fills each value, and which sections are conditional.
source_of_truth: core/mcdm_report.py::sensitivity_markdown in langgraph-agents
output_file: experiments/<slug>/05_sensitivity_analysis.md
validation_status: transcribed from the renderer 2026-10-21; the code is authoritative
status: draft
tags: [template, output, sensitivity, mcdm, thesis]
---

## What this is

The template of **thesis output 5**: how far each criterion weight can move,
one at a time, before the ranking of output 4 changes. Rendered
deterministically from the cached `sensitivity` payload by
`core/mcdm_report.py::sensitivity_markdown`. It perturbs **weights only** --
scores, contested cells and author parameters are held fixed. The stability
chart is drawn from the same payload and listed in `figures/index.json`; the
document does not embed it. See [[Sensitivity Analysis]].

**This note describes the render; it does not drive it.** Editing it changes
no output until rendering is wired to read templates from the vault.

## Template

```markdown
---
type: experiment-output
event: {{experiment slug}}
n: 5
slot: sensitivity_analysis
title: Sensitivity analysis result
written: {{UTC time of rendering}}
source: sensitivity_analysis (MCDM template v3 ranking, author's OAT construction), rendered deterministically
inputs_used: [mcdm, sensitivity]
---

# 5. Sensitivity analysis result

## What this is
(fixed text, from method: perturbs / does_not_perturb)

## The ranking being tested
| Rank | Alternative | Closeness Ci | Gap to the rank below |   <- baseline.ranking

## The smallest weight change that changes the order
| Criterion | Name | Weight | Changes at | Delta | Relative | First swap | Base weight needed | Reachable |   <- criteria[].nearest_change, reachable
(fixed text: what "base weight needed" means)
**The most critical criterion is `{{most_critical.criterion}}` ...**   <- most_critical, most_critical_reachable
ONE of: **No weight anywhere in [0, 1] changes the order for ...** (stable_criteria)
      / **Every criterion can change the order somewhere in [0, 1].**

## When the top-ranked product changes
| Criterion | Weight | Leader changes at | Delta | New leader | Base weight needed |   <- criteria[].nearest_leader_change
**{{len(leader_changeable_by)}} of {{N}} criteria can displace {{baseline.leader}}**: {{leader_changeable_by}}
or **No single criterion can displace {{baseline.leader}}** at any weight.

## Rank agreement across each sweep
| Criterion | Weight | Worst rho | Worst tau-b | Mean rho | Order unchanged | Leader unchanged |   <- criteria[].agreement

## Closeness response curves
### `{{criterion}}` {{name}} -- weight {{weight}}{{", unreachable" if not reachable}}   <- one per criterion
| Weight | {{one column per alternative}} | Order |                                         <- criteria[].curve

## What this does and does not test
(fixed text: weights only; no score or parameter perturbation; not SMAA)
```

Related: [[Output templates - MOC]] | [[Output 4 - MCDM ranking template]] | [[Sensitivity Analysis]]
