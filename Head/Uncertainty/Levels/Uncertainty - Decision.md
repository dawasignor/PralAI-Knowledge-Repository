---
type: knowledge
uncertainty_kind: level
level: decision
desc: The fourth uncertainty level -- how firm a conclusion is: weights, gates, thresholds, the product chosen
aliases: [decision uncertainty, conclusion uncertainty, DEC]
keywords: [uncertainty, decision, MCDM, TOPSIS, weights, sensitivity, cloud gate, rank, status chip, product choice, fallback, RQ6]
workflows: [rank_flood_products, sensitivity_analysis, the fallback, the reports]
source_workflow: core/uncertainty.py, core/workflows/mcdm.py
retrieval: How firm is a conclusion drawn from the results -- a rank, a chosen product, a status -- and what would move it?
validation_status: measured where the sensitivity sweep measures it; assumed weights are labelled assumed
status: draft
tags: [uncertainty, level]
---

## What the decision level is

Decision uncertainty is about **the conclusion**: how far a weight can move
before the ranking changes, whether a gate could fire, whether a rank says
anything about usability, which product's flood extent a report rests on, and
whether a fallback changed what an index means. It is tagged **DEC**.

## Where it is recorded

`uncertainty.decision` on the ranking and the sensitivity results, and on the
ranking inputs when the land-cover fallback was used; under the TOPSIS and
sweep steps in `run.steps`.

## Decision items in this repo

- **Event-first weights** (2026-11-22): each event criterion is 1/12 raised by
  its index, the rest shared equally by the product criteria -- an author rule,
  not an elicited weighting.
- **Equal base weights** are a placeholder, not an elicited weighting
  ([[Sensitivity Analysis]]).
- **The cloud gate** sits at 100% and cannot fire: high cloud penalises an
  optical product's weight, it does not remove it -- so **a rank is not a
  usability claim**.
- **The most critical weight**: the smallest change that reorders the
  products, from the sweep.
- **Only TOPSIS** is implemented; nothing is method-agnostic.
- **The fallback**: WorldCover tree cover is not dense NDVI, built-up is not
  BUI > 0.2 ([[Built-up fraction as an MCDM criterion]]).
- **The product a report rests on** is the best-ranked one; if it maps no
  flood, every flood-dependent figure is not known.

## How to read it

Decision uncertainty is where earlier levels **compound**: a cloud-limited land
cover feeds a ranking index, and the ranking chooses the flood extent a mayor
reads. It is also where **structural** uncertainty lives -- a method choice
that may itself be wrong. See [[Metric rank versus TOPSIS rank]] for what an
agreement check can and cannot say about a rank.

Related: [[Uncertainty Analysis - MOC]] | [[Uncertainty - Input data]] | [[Uncertainty - Tool call]] | [[Uncertainty - Pipeline]]
