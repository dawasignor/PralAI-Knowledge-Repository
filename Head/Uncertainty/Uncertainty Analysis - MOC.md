---
type: moc
uncertainty_kind: index
desc: Index and retrieval contract for every uncertainty note Entro reads through MCP
aliases: [uncertainty index, Entro notes, uncertainty MOC]
keywords: [uncertainty, Entro, MCP, retrieval, index, confidence, error, bias]
context: head
retrieval: Start here to find which uncertainty note answers a question, and what each note kind contains.
status: draft
tags: [moc, uncertainty]
---

Uncertainty signals produced by the data-ingestion workflows, written for
retrieval by [[Entro - Uncertainty Analyser]] through MCP.

## File structure

Notes are filed by **use type**, because the three kinds answer different
questions and should not be returned interchangeably.

| Folder | `uncertainty_kind` | Contains | Answers |
|---|---|---|---|
| `Responses/` | `response` | Literal payload shapes and field maps from a workflow. No rationale. | "Which field carries this, and what does a real one look like?" |
| `Knowledge/` | `knowledge` | Accuracy and error behaviour of a measure, with numbers and citations. | "How wrong can this be, and in which direction?" |
| `Criteria/` | `criterion` | How a measure enters the MCDM: direction, reliability by context, what must qualify it. | "Can I score on this, and at what weight?" |
| `Levels/` | `level` | The four uncertainty levels every tool call is logged at, step by step: input data, tool call, pipeline, decision. | "At which step did this uncertainty enter, and at what level?" |

Rule: a `Responses/` note carries **no design decisions** — it is what Entro
parses. Reasoning belongs in `Knowledge/`; scoring consequences in `Criteria/`.

## Frontmatter contract

Every note tagged `uncertainty` carries, at minimum:

| Key | Purpose |
|---|---|
| `uncertainty_kind` | `response` / `knowledge` / `criterion` / `level` / `index`. The routing key. |
| `aliases` | Alternate phrasings a query may use. |
| `keywords` | Retrieval terms, including abbreviations and spelled-out forms. |
| `sensor` | The instrument, when source-specific. |
| `workflows` | The workflow that produces the data. |
| `source_workflow` | Path to the code, so a claim can be checked. |
| `retrieval` | One sentence: what question this note answers. |
| `validation_status` | Whether the content is measured or reasoned. |

Chunking: each `##` section is written to stand alone. Entities are repeated
rather than pronouned across sections, so a retrieved chunk carries its own
subject.

## Notes

**Responses**
- [[Sentinel-2 LULC uncertainty fields]] — coverage, saturation, scene selection and failure payloads
- [[Accuracy metrics payload fields]] — where every number in the agreement table comes from

**Knowledge**
- [[BUI over NDBI - built-up index accuracy]] — what BUI corrects, what it does not, and by how much
- [[Partial AOI coverage in Sentinel-2 scenes]] — when a result describes less area than was requested
- [[Excluding the sea from AOI statistics]] — why a coastal bounding box is not the reporting domain
- [[ERA5 cloud does not predict Sentinel-2 AOI usability]] — measured negative result: no weather-based scene pre-screen is safe
- [[Agreement metrics for binary flood maps]] — what precision, recall, F1, IoU, MCC say, when each misleads, coverage first
- [[UNOSAT FL20251128LKA flood reference]] — the validation reference: Sentinel-2, cumulative, no analysed extent
- [[Validation against the UNOSAT reference]] — the Kelani validation: design, decisions, results so far
- [[Labelled-sample validation - walkthrough]] — every step of the stratified labelled sample: strata, labels, Stehman estimators, final metrics
- [[Flood map validation - sources]] — full references for the validation notes

**Criteria**
- [[Built-up fraction as an MCDM criterion]] — reliability by AOI type, and why the error is a one-way bias
- [[Metric rank versus TOPSIS rank]] — what the agreement order can and cannot say about the TOPSIS ranking

**Levels** (since 2026-10-25). Every tool call is logged as numbered steps, and
each step carries its uncertainty at one of four levels. Entro reads the
register with `read_uncertainty` and answers step by step through its
`uncertainty_by_step` flow.
- [[Uncertainty - Input data]] — IN: what a dataset carries before any processing
- [[Uncertainty - Tool call]] — TOOL: what the processing did (valid fraction, coverage, sea, gaps)
- [[Uncertainty - Pipeline]] — RUN: how the run went (source failures, fallbacks, cache)
- [[Uncertainty - Decision]] — DEC: how firm a conclusion is (weights, gates, the product chosen)

**Validation.** Monty computes the agreement table (`accuracy_metrics`); Entro
interprets it through the `accuracy_interpretation` flow, starting from
[[Agreement metrics for binary flood maps]]. Every reading is agreement with
the reference, never accuracy against ground truth.

---

Related: [[Head-MOC]] | [[Datasets-MOC]] | [[Scene usability - SCL valid fraction]] | [[Scoring criteria]] | [[SMAA]] | [[Sensitivity Analysis]]
