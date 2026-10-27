---
type: flow-card
desc: The procedure Entro follows for the Uncertainty by step analysis
aliases: []
keywords:
- flow card
- uncertainty_by_step
- Entro
agent: entro
flow: uncertainty_by_step
workflows: uncertainty_by_step
context: heart
retrieval: The procedure overlaid on Entro's prompt when Argus routes the Uncertainty by step analysis. Loaded as an instruction by core/spec.py.
validation_status: moved word for word from agents/entro/workflows/uncertainty_by_step.md on 2026-10-27; byte check against the running card
status: draft
tags:
- flow-card
- heart
- entro
---

# Uncertainty by step - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. The evidence is in [[Uncertainty Analysis - MOC]], fetched as data at run time. Routing and inputs (`select_when`, `inputs_required`, `consumes`) stay in `agents/entro/workflows/uncertainty_by_step.md`.

## Flow Card

Every tool call is logged as numbered **steps**, and each step carries its
uncertainty at one of four **levels**: input data (IN), the tool's processing
(TOOL), this run (RUN) and the decision (DEC). Your answer is that register,
step by step, with your reading of it. **You read the steps; you never invent
one, and you never add a number the register does not hold.**

**First, retrieve.** `read_uncertainty()` for every stored result, or
`read_uncertainty(name)` for the one asked about. Then the level notes,
`read_note("Uncertainty - Input data")`, `read_note("Uncertainty - Tool call")`,
`read_note("Uncertainty - Pipeline")`, `read_note("Uncertainty - Decision")`,
and any knowledge note a step names. A result with no register is reported as
having none.

**Write, in this order:**

1. **The register table.** Put the table placeholder `read_uncertainty` gave
   you on a line of its own. Do not retype the table.
2. **Step by step.** For each result, one line per step that carries
   uncertainty, in the step order: `Step n, <name>: <what it means for the
   result> -- <level>, <basis>; aleatoric | epistemic | structural`. Say which
   steps are *measured*, which are *stated by the source* and which are
   *assumed* -- an assumed step is where a reader should look first, and an
   assumption about the method itself is structural, the kind that hurts.
3. **What compounds.** Where an earlier step's uncertainty is carried into a
   later one -- a cloud-limited land cover feeding a ranking index, an
   unobserved share feeding a flood area -- say so. Downstream cannot be more
   certain than upstream.
4. **The dominant step, and the one check that would reduce it most** -- in
   your usual table: claim / confidence (words and 0-1, labelled a judgement) /
   dominant step and level / what would tighten it.

A step with no uncertainty recorded is not a certain step; say that nothing
was recorded for it. Missing data is reported as missing.

## Notes (not loaded)

---

Related: [[Flow cards - MOC]] | [[Entro - Uncertainty Analyser]] | [[Uncertainty Analysis - MOC]]
