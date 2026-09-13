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

Rule: a `Responses/` note carries **no design decisions** — it is what Entro
parses. Reasoning belongs in `Knowledge/`; scoring consequences in `Criteria/`.

## Frontmatter contract

Every note tagged `uncertainty` carries, at minimum:

| Key | Purpose |
|---|---|
| `uncertainty_kind` | `response` / `knowledge` / `criterion` / `index`. The routing key. |
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

**Knowledge**
- [[BUI over NDBI - built-up index accuracy]] — what BUI corrects, what it does not, and by how much
- [[Partial AOI coverage in Sentinel-2 scenes]] — when a result describes less area than was requested
- [[ERA5 cloud does not predict Sentinel-2 AOI usability]] — measured negative result: no weather-based scene pre-screen is safe

**Criteria**
- [[Built-up fraction as an MCDM criterion]] — reliability by AOI type, and why the error is a one-way bias

---

Related: [[Head-MOC]] | [[Datasets-MOC]] | [[Scene usability - SCL valid fraction]] | [[Scoring criteria]] | [[SMAA]] | [[Sensitivity Analysis]]
