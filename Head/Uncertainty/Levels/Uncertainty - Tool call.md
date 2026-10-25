---
type: knowledge
uncertainty_kind: level
level: tool
desc: The second uncertainty level -- what a tool's processing did to the data it read
aliases: [tool uncertainty, processing uncertainty, tool call uncertainty, TOOL]
keywords: [uncertainty, tool, processing, valid fraction, coverage, saturation, sea excluded, resampling, mosaic, interpolation, gaps, RQ6]
workflows: [every tool]
source_workflow: core/uncertainty.py
retrieval: What uncertainty does a tool's own processing add, which fields measure it, and how is it shown step by step?
validation_status: measured where the payload measures it; assumed items are labelled assumed
status: draft
tags: [uncertainty, level]
---

## What the tool-call level is

Tool-call uncertainty is what **the processing** did: which pixels survived a
cloud mask, how much of the AOI a scene covered, what was excluded as sea, what
was resampled or mosaicked, which hours had gaps. It is tagged **TOOL** in the
step log, and it is the level the tools measure best, because every one of
these is a count the tool made.

## Where it is recorded

`uncertainty.tool` on every result, and under the step that produced it in
`run.steps` -- a step is one thing the tool did, in order (search, select, read,
classify, aggregate). `read_uncertainty` prints each step with its items, and
the register table ("Uncertainty by step") lays them out by result, step and
level.

## Tool-call items in this repo

- **Valid fraction.** The share of the land a Sentinel-2 scene observed cloud
  free; the rest is not observed, never assumed clear
  ([[Partial AOI coverage in Sentinel-2 scenes]]).
- **Coverage.** The share of the AOI a product or tile set reached; no-data,
  GFM's exclusion mask included, is lost coverage, never dry ground.
- **Sea excluded.** Every land statistic is taken over the land
  ([[Excluding the sea from AOI statistics]]).
- **Gaps withheld.** A missing weather hour withholds the figures that need it
  rather than counting as 0 mm.
- **Resampling and allocation.** A WorldCover class averaged onto the DEM
  grid; census GN divisions allocated to an AOI by centroid, with an edge band.
- **Saturation and unclassified pixels.** Counted and reported.

## How to read it

Tool-call uncertainty is mostly **measured**, and so the most defensible: a
reader can check every number. Its risk is that a share of a sub-domain (the
observed land, the covered pixels) is read as a share of the whole AOI. Each
item says what it is a share of. See [[Uncertainty - Input data]] for what the
data already carried, and [[Uncertainty - Pipeline]] for how the run went.

Related: [[Uncertainty Analysis - MOC]] | [[Sentinel-2 LULC uncertainty fields]]
