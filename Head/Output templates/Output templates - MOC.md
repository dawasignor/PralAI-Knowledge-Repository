---
type: moc
desc: Index of the rendered templates of thesis outputs 1-5 - what each output document looks like and which code renders it
aliases: [output templates, thesis output templates, output render templates]
keywords: [output templates, thesis outputs, render, weather, LULC, MCDM, ranking, sensitivity, experiment outputs, 01_weather_data, 02_lulc_info, 03_mcdm_matrix_pre, 04_mcdm_ranking, 05_sensitivity_analysis]
context: head
retrieval: Answer which thesis outputs exist, what each rendered document looks like, which code renders it, and whether editing a template changes a run.
validation_status: written 2026-10-21 from the renderers in langgraph-agents
status: draft
tags: [moc, template, output, thesis]
---

## The outputs

The eight thesis outputs are fixed in `core/experiment.py::OUTPUTS`; each
experiment writes them as `experiments/<slug>/NN_<slot>.md`. Templates for the
five that are built:

| # | Output | Template | Rendered by | Written by |
|---|---|---|---|---|
| 1 | Weather data | [[Output 1 - Weather data template]] | `core/reports.py::weather_markdown` | code, from `fetch_weather_grid` |
| 2 | LULC info (pre-flood AOI brief) | [[Output 2 - LULC info template]] | `core/brief_report.py::brief_markdown` | **Norwood** writes the JSON brief; code renders it |
| 3 | MCDM decision matrix (before the run) | [[Output 3 - MCDM decision matrix template]] | `core/mcdm_report.py::decision_matrix_markdown` | code, from `rank_flood_products` |
| 4 | MCDM ranking | [[Output 4 - MCDM ranking template]] | `core/mcdm_report.py::ranking_markdown` | code, from `rank_flood_products` |
| 5 | Sensitivity analysis | [[Output 5 - Sensitivity analysis template]] | `core/mcdm_report.py::sensitivity_markdown` | code, from `sensitivity_analysis` |

Outputs 6 (SMAA), 7 (uncertainty in NRT products) and 8 (road and transport
risk) have slots but no renderer yet.

## Do these templates drive the outputs?

**No -- not yet.** They document the render; the renderer in code is the
source of truth, and editing a note here changes nothing in the next run.
Two exceptions to keep in mind:

- **Output 2** has an agent behind it. Norwood reads
  [[Norwood pre-flood AOI brief schema]] at run time, so editing THAT note can
  change the brief it writes; validity is still decided by
  `docs/norwood_preflood_brief.schema.json` in the repo.
- Making these templates live means wiring the renderers to read their
  section layout from the vault -- a code change, not decided yet.

Related: [[Head-MOC]] | [[Weather output schema]] | [[Norwood pre-flood AOI brief schema]] | [[Flood_mask_Dataset_MCDA]] | [[Sensitivity Analysis]]
