---
type: template
desc: The rendered shape of thesis output 2 (LULC info, Norwood's pre-flood AOI brief) - sections, tables and the brief field behind every value
aliases: [output 2 template, LULC info template, pre-flood brief template, 02_lulc_info template, norwood brief render]
keywords: [output 2, LULC, land cover, pre-flood AOI brief, norwood, template, render, verdict, input integrity, surface composition, hydrography, terrain, flood-mapping outlook, findings, cannot determine, thesis output]
agent: norwood
workflows: [fetch_lulc_data, fetch_permanent_water, fetch_terrain_data]
context: head
retrieval: Answer what thesis output 2 looks like when rendered - its sections in order, the columns of each table, which field of Norwood's brief fills each value, and what is conditional.
source_of_truth: core/brief_report.py::brief_markdown in langgraph-agents (the brief itself must validate against docs/norwood_preflood_brief.schema.json)
output_file: experiments/<slug>/02_lulc_info.md
validation_status: transcribed from the renderer 2026-10-21; the code is authoritative
status: draft
tags: [template, output, lulc, norwood, thesis]
---

## What this is

The template of **thesis output 2**. Unlike outputs 1, 3, 4 and 5 it has an
**agent** behind it: Norwood writes the brief as JSON (validated against the
schema, see [[Norwood pre-flood AOI brief schema]]), and
`core/brief_report.py::brief_markdown` renders that JSON deterministically.
Norwood sees statistics only -- no rasters.

**This note describes the render; it does not drive it.** Editing it changes
no output until rendering is wired to read templates from the vault. (Norwood
does read its schema note at run time, so a change THERE can change the brief
it writes; the JSON Schema file in the repo still decides what is valid.)

`{{...}}` is a field of the brief. Table rows repeat per list item.

## Template

```markdown
---
type: experiment-output
event: {{experiment slug}}
n: 2
slot: lulc_info
title: LULC info
written: {{UTC time of rendering}}
source: norwood/pre-flood-aoi-brief v{{version}} via the pre_flood_aoi_brief flow
inputs_used: [lulc, terrain, permanent_water]
---

# 2. LULC info

## Verdict
> {{report_header.verdict}}
**Confidence: {{report_header.confidence}}** -- limited most by {{report_header.confidence_limiter}}.
`{{schema}}` v{{version}} | report `{{report_header.report_id}}` | generated {{report_header.generated_at}}
(fixed text: this is an areal report -- compares how much, never where;
co_location_verified is false throughout)

## Inputs it rests on
| Payload | Cached | Summary |                 <- report_header.inputs[]: name, cached_at, summary

## AOI
- Requested bbox: `{{aoi.bbox_requested}}`
- Area: {{aoi.area_km2}} km2
- By source: `{{aoi.area_km2_by_source}}`      <- if present
- Area disagreement: {{aoi.area_disagreement_pct}} %

## Input integrity
| Layer | Overlap | Offset | Status |          <- input_integrity.footprint.per_layer[]
### Recency                                    <- input_integrity.recency (+ caveat)
### Scene selection                            <- input_integrity.scene_selection, if present:
   rejection reasons, best rejected alternative, analyst note

## What the composition actually describes    <- observation_basis
(unobserved cause, directional bias warning, masking policy and its
asymmetry flag)

## Surface composition
**`is_land_cover: {{surface_composition.is_land_cover}}`** -- a spectral stratification, not a land-cover map.
| Class | Frac of observed | km2 | Plausible cover | Separability |   <- stratification.classes[]
(stratification caveat)
### Index summary                             <- if surface_composition.index_summary
| Index | mean | median | p10 | p90 | std | skew proxy |
### Thematic signals                          <- if surface_composition.thematic_signals
| Theme | Spread | Consensus | Reported |

## Composition reliability                    <- composition_reliability
(heterogeneity, distribution shape)
| Theme | Spread | Verdict |                   <- proxy_agreement[], if present

## Hydrography
| Class | Threshold % | km2 | Fraction |       <- hydrography.occurrence_classes[]
| Method | km2 | Extent |                      <- independent_water_estimates[], if present
**Recommended reference:** `{{hydrography.recommended_reference.method}}` -- ...
**Commission floor:** {{hydrography.look_alike_floor}} ...

## Terrain                                     <- terrain_setting
(DSM caveat; elevation_m and slope_deg statistics; low_lying_fraction;
floodplain_indication)

## The AOI as a place
**{{landscape_summary.archetype}}** (confidence ...)
{{landscape_summary.one_paragraph}}

## Flood-mapping outlook
{{flood_mapping_outlook.headline_for_analyst}}
| Family | Expected | Dominant limitation | Bias | Area share | Conf. |   <- by_sensor_family[]
(acquisition_outlook)

## Findings                                    <- findings[], sorted by rank
**{{rank}}. {{id}}** [{{severity}} | confidence {{confidence}} | {{basis}}]
{{statement}} -- so what: {{so_what}}

## Cannot determine
| Question | Reason | Would be resolved by | Priority |   <- cannot_determine[]

## Analyst actions
| Action | Rationale | Blocking |              <- analyst_actions[]

## Data integrity
| Code | Severity | Layer | Detail |           <- data_integrity[]
```

**Older outputs differ.** The Kelani file of 2026-09-22 ends with a
`## Verification` section (fraction / km2 pairs checked against their
denominators). No current code writes it; a re-render would not have it.

Related: [[Output templates - MOC]] | [[Norwood pre-flood AOI brief schema]] | [[Monty data workflows]]
