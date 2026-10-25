---
type: knowledge
uncertainty_kind: level
level: pipeline
desc: The third uncertainty level -- how the run itself went: retries, source failures, fallbacks, the cache
aliases: [pipeline uncertainty, run uncertainty, RUN]
keywords: [uncertainty, pipeline, run, retry, source failure, fallback, cache, missing input, RQ5, RQ6]
workflows: [every tool, the pipelines]
source_workflow: core/uncertainty.py, core/monty_graph.py, core/observability.py
retrieval: What uncertainty comes from how a run went rather than from the data or the processing, and where is it logged?
validation_status: measured -- every item is a logged event of the run
status: draft
tags: [uncertainty, level]
---

## What the pipeline level is

Pipeline uncertainty is about **the run**, not the data: a source that failed
or answered slowly, a retry, a category that came back missing, an input that
was not stored, a fallback taken (Sentinel-2 to WorldCover), whether the run
was cached or fetched everything again. It is tagged **RUN** in the step log.

## Where it is recorded

`uncertainty.pipeline` on a result; `run` on every result (`run_id`, `cache`,
`attempts`, `duration_s`, `source_failures` -- a source outage by domain,
never its query string); and, per run, `runs/<run_id>/` holds `steps.jsonl`,
`uncertainty.json`, `events.jsonl` and `metrics.jsonl`.

## Pipeline items in this repo

- **A source failure** (an Overpass 502, an Open-Meteo refusal): kept apart
  from a different answer, because RQ5 has to tell an outage from a change.
- **A category not measured**: a failed request is missing, never 0.
- **A fallback**: the land-cover fallback is taken only on a recorded
  Sentinel-2 failure at the defaults.
- **Cache off**: an uncached run re-fetches everything and writes only its own
  folder; a cached figure says when it was fetched.
- **A missing input**: a module whose input is not stored says "Not known
  yet" and names the tool.

## How to read it

Pipeline uncertainty is **measured** but often invisible in a final number: a
run that retried three times and a run that succeeded at once can give the
same figure. When two runs disagree (RQ5), look here first -- a source failure
explains a difference without the data having changed. See
[[Uncertainty - Tool call]] and [[Uncertainty - Decision]].

Related: [[Uncertainty Analysis - MOC]] | [[Uncertainty - Input data]]
