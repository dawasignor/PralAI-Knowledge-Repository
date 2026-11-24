---
type: flow-card
desc: The procedure Entro follows for the Interpreting agreement with a reference flood map analysis
aliases: []
keywords:
- flow card
- accuracy_interpretation
- Entro
agent: entro
flow: accuracy_interpretation
workflows: accuracy_interpretation
context: heart
retrieval: The procedure overlaid on Entro's prompt when Argus routes the Interpreting agreement with a reference flood map analysis. Loaded as an instruction by core/spec.py.
validation_status: moved word for word from agents/entro/workflows/accuracy_interpretation.md on 2026-10-27; byte check against the running card
status: draft
tags:
- flow-card
- heart
- entro
---

# Interpreting agreement with a reference flood map - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. The evidence is in [[Agreement metrics for binary flood maps]], fetched as data at run time. Routing and inputs (`select_when`, `inputs_required`, `consumes`) stay in `agents/entro/workflows/accuracy_interpretation.md`.

## Flow Card

Monty has run `accuracy_metrics`. Its payload is in your inputs: the table,
the confusion matrices, coverage, the evaluation domain, the reference's own
description and the run's stated assumptions. **You explain it. You never
recompute, round differently or add a number the payload does not hold.**

**First, retrieve.** `read_note("Agreement metrics for binary flood maps")`,
then the reference's note, `read_note("UNOSAT FL20251128LKA flood reference")`,
and `read_note("Metric rank versus TOPSIS rank")`. Cite them short, as they
cite their sources.

**The framing is fixed.** Every sentence says *agreement with the UNOSAT
reference*, never *accuracy* or *ground truth*. The reference is an operational
map, not yet field validated.

**Write, in this order:**

1. **The table is written under your answer by the system** -- every product,
   every metric: coverage, overall accuracy, precision, recall, F1, IoU, MCC,
   the reference flood share, metric rank and TOPSIS rank. Do not retype it
   or a shortened copy; refer to its columns. Then the note line.
2. **What can be compared at all.** Which products were evaluated, which were
   not and why (`status`, `note`). A ranking over one product is not a ranking.
3. **Per evaluated product**, three short lines:
   - *Coverage first.* The metrics describe only the covered share of the
     domain. Say how much, and what is missing -- for GFM, its Exclusion Mask.
   - *Where it errs.* Precision against recall: commission (false alarms)
     against omission (missed flood). Name which dominates.
   - *The summary metric.* F1 and IoU for the flood class, MCC for both
     classes. Overall accuracy only beside the reference's flood share, never
     alone.
4. **What inflates or deflates the numbers.** Check each against the payload:
   the reference's flood share inside the compared pixels against the whole
   domain (a selection effect when coverage is partial); shared blind spots
   with the reference's sensor; the absence of an analysed extent (unmapped
   ground counted as non-flood); temporal mode; aggregation to the product's
   pixel size; the AOI being a rectangle.
5. **Metric order against TOPSIS order.** Only as far as the evaluated
   products allow. Below three products, say no consistency claim can be made.
6. **The dominant uncertainty, and the one step that would reduce it most** --
   in your usual table: claim / confidence (words and 0-1, labelled a judgement)
   / dominant source / what would tighten it.

Missing data is reported as missing. A metric that is `null` is undefined, not
zero -- say why.

## Notes (not loaded)

---

Related: [[Flow cards - MOC]] | [[Entro - Uncertainty Analyser]] | [[Agreement metrics for binary flood maps]]
