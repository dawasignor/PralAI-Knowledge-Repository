---
type: knowledge
uncertainty_kind: level
level: input
desc: The first of the four uncertainty levels -- the inherent limits of a dataset, before any processing touches it
aliases: [input data uncertainty, dataset uncertainty, input uncertainty, IN]
keywords: [uncertainty, input, dataset, vintage, resolution, surface model, snapshot, model archive, mapped features, WorldPop, population, RQ6]
workflows: [every tool]
source_workflow: core/uncertainty.py
retrieval: What uncertainty does a dataset carry before any tool processes it, and where is it recorded for a run?
validation_status: reasoned; each item is read off a payload field or stated by the dataset's own documentation
status: draft
tags: [uncertainty, level]
---

## What the input-data level is

Input-data uncertainty is what a dataset carries **before** any tool in Sangam
touches it: its resolution, its vintage, what it measures and what it only
models, and what its producer says about its accuracy. No processing choice can
remove it; a tool can only report it. In the step log it is tagged **IN**.

## Where it is recorded

Every tool result carries `uncertainty.input`, a list of items, each with a
`statement`, a `value` and `unit` where there is one, a `basis` --
`stated_by_source` when the dataset's producer says it, `measured` when the
tool read it off the data, `assumed` when nothing measures it -- and a
`vintage`. The same items sit under the step that met them in `run.steps`,
and `read_uncertainty` prints them, one line each, tagged IN.

## Input-data items in this repo

- **A model, not observations.** The weather is a model archive
  ([[ECMWF IFS via Open-Meteo Archive]]); its cell size is far coarser than
  the 20-250 m products it gates.
- **A surface model.** [[Copernicus DEM GLO-30]] includes canopy and
  buildings, so it adds slope where they stand.
- **A snapshot.** ESA WorldCover is one year (2021) and JRC Global Surface
  Water ([[JRC Global Surface Water]]) describes 1984-2021: neither describes
  the weeks before the event.
- **A classification with its own errors.** The Sentinel-2 SCL cloud mask
  ([[Scene usability - SCL valid fraction]]); WorldCover's published per-class
  accuracy, global and not measured for the AOI.
- **Mapped features.** OpenStreetMap counts what is mapped, not what exists.
- **A modelled population.** WorldPop Global2 R2025A spreads census totals
  over mapped settlement with a random-forest model, for the year asked
  (2015-2030); it is an estimate, not a count, and an alpha release.

## How to read it

Input-data uncertainty is usually **epistemic or structural**: more or better
data would reduce it, or the dataset measures a different quantity from the
one wanted (a surface model for terrain, a 2021 map for 2025 land). It is
carried into everything downstream -- see [[Uncertainty - Tool call]] for what
processing adds, and [[Uncertainty - Decision]] for where it reaches a ranking.

Related: [[Uncertainty Analysis - MOC]] | [[Uncertainty - Pipeline]]
