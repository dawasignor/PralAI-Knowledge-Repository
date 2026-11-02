---
type: moc
desc: Index of the output templates - the twelve live module templates (registry v2) the renderer reads, and the five registry-v1 notes that describe the older outputs
aliases: [output templates, thesis output templates, output render templates, module templates]
keywords: [output templates, module templates, thesis outputs, render, live template, blocks, facts sidecar, data availability, weather, land use, terrain, permanent water, MCDM, ranking, sensitivity, essential services, human health, public report, executive summary]
context: head
retrieval: Answer which outputs exist, which template each is rendered from, which code fills it, and whether editing a template changes a run.
validation_status: written 2026-10-21 from the renderers in langgraph-agents; Modules 1-10 made live 2026-10-27
status: draft
tags: [moc, template, output, thesis]
---

## The modules (registry v2)

Every module is rendered from a **live** template here: `core/report_render.py`
reads the note's fenced block at render time, so editing it changes the next
output. Each run writes `NN_<slot>.md` and its facts sidecar
`NN_<slot>.facts.json`.

| # | Module | Template | Filled from |
|---|---|---|---|
| 1 | Data availability | [[Module 1 - Data availability template]] -- Which flood products saw the area during the event. | `core/module_blocks.py` |
| 2 | Weather data | [[Module 2 - Weather data template]] -- The rain, cloud and wind of the event. | `core/module_blocks.py` (the document itself: `core/reports.py::weather_markdown`) |
| 3 | Land use before the event | [[Module 3 - Land use before the event template]] -- What covered the ground before the flood. | `core/module_blocks.py`, with the remote sensing expert's brief |
| 4 | Terrain and slope classes | [[Module 4 - Terrain and slope classes template]] -- How high and how steep the ground is. | `core/module_blocks.py` |
| 5 | Permanent water and structures | [[Module 5 - Permanent water and structures template]] -- The water normally there, so it is not mistaken for flood. | `core/module_blocks.py` |
| 6 | MCDM decision matrix | [[Module 6 - MCDM decision matrix template]] -- Which flood product suits this event best. | `core/module_blocks.py` (`core/mcdm_report.py::decision_matrix_markdown`) |
| 7 | MCDM ranking | [[Module 7 - MCDM ranking template]] -- Which flood product suits this event best. | `core/module_blocks.py` (`core/mcdm_report.py::ranking_markdown`) |
| 8 | Sensitivity analysis | [[Module 8 - Sensitivity analysis template]] -- How firm that ranking is. | `core/module_blocks.py` (`core/mcdm_report.py::sensitivity_markdown`) |
| 9 | Essential services (HEV) | [[Module 9 - Essential services template]] -- The flood's reach to hospitals, drinking water and food, the people affected, and what to do. | `core/module_blocks.py`, with the flood analyst agent's flows |
| 10 | Human health risks (HEV) | [[Module 10 - Human health risks template]] -- Sewage, drinking water, mosquitoes and mould after the flood, and what to do. | `core/module_blocks.py`, with the flood analyst agent's flows |
| 11 | Public Report (Flood bot) | [[Module 11 - Public report template]] | the report facts in `core/report_render.py`, plus agent-written slots |
| 12 | Executive Summary (Chanakya) | [[Module 12 - Executive summary template]] | the report facts in `core/report_render.py`, plus agent-written slots |

A template holds the headings, their order and every fixed sentence. Each
`{{fact:...}}` is a fact (Modules 11-12) or a block (Modules 1-10) built in
code from the stored results; either kind may be placed in any template. A
value that is not stored renders "Not known yet -- <reason>"; a block with
nothing to add renders nothing. Modules 11 and 12 need Modules 1-10 of the
same run first (D-24).

## The registry-v1 outputs (history)

The eight registry-v1 outputs (`core/experiment.py::OUTPUTS_V1`) are kept as
written in the experiments that used them. These notes **describe** their
render; they never drove it. Four still describe a block of a live module:
the weather document (Module 2), the decision matrix (Module 6), the ranking
(Module 7) and the sweep (Module 8) are the same renderers.

| # | Output | Template | Rendered by |
|---|---|---|---|
| 1 | Weather data | [[Output 1 - Weather data template]] | `core/reports.py::weather_markdown` |
| 2 | LULC info (pre-flood AOI brief) | [[Output 2 - LULC info template]] | `core/brief_report.py::brief_markdown`; Norwood reads [[Norwood pre-flood AOI brief schema]] |
| 3 | MCDM decision matrix (before the run) | [[Output 3 - MCDM decision matrix template]] | `core/mcdm_report.py::decision_matrix_markdown` |
| 4 | MCDM ranking | [[Output 4 - MCDM ranking template]] | `core/mcdm_report.py::ranking_markdown` |
| 5 | Sensitivity analysis | [[Output 5 - Sensitivity analysis template]] | `core/mcdm_report.py::sensitivity_markdown` |

Related: [[Head-MOC]] | [[Weather output schema]] | [[Norwood pre-flood AOI brief schema]] | [[Flood_mask_Dataset_MCDA]] | [[Sensitivity Analysis]]
