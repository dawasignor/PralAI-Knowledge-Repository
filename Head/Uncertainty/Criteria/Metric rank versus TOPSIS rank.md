---
type: uncertainty
uncertainty_kind: criterion
desc: How Entro compares the order of flood products by agreement with a reference against their TOPSIS order, and what a match or a mismatch does and does not mean
aliases: [metric rank vs TOPSIS rank, does validation support the ranking, rank consistency, validation against MCDM]
keywords: [TOPSIS, MCDM, rank, metric rank, F1, consistency, Spearman, Kendall, validation, agreement, ranking check]
workflows: accuracy_metrics, rank_flood_products
source_workflow: core/workflows/validation/table.py
agent: entro
context: head
retrieval: Answer whether the order of products by agreement with the reference supports the TOPSIS ranking, and how many products such a claim needs.
validation_status: reasoned from the design of the two rankings; no consistency claim has been possible yet (one product evaluated, 2026-10-11)
status: draft
tags: [uncertainty, criterion, validation, mcdm, topsis]
---

## Answer in one line

The metric rank (by F1) and the TOPSIS rank answer **different questions**,
so agreement between them is corroboration, not proof -- and **below three
evaluated products no consistency claim can be made at all**.

## Two different questions

- **TOPSIS** asks which product *should* suit this event, from documented
  product properties weighted by the event's conditions (cloud, wind,
  vegetation, terrain, built-up share). It is a prior judgement.
- **The metric rank** asks which product *did* agree with one reference map
  over one AOI, on the pixels it covered. It is an after-the-fact measurement,
  bounded by the reference's own errors.

A product can rank high in TOPSIS and low in agreement for reasons that do not
make TOPSIS wrong: low coverage, a reference that shares another product's
blind spots, or a pass that missed the flood peak.

## How many products a claim needs

- **One evaluated product** -- no comparison: its metric rank is 1 by
  construction.
- **Two** -- one pairwise order, agreeing or not by a coin's odds. Report it,
  claim nothing.
- **Three or more** -- a rank correlation (Spearman, Kendall tau-b) can be
  stated, still with one event and one AOI as its limit.

## Reading a mismatch

Before reading a mismatch as evidence against TOPSIS, check in this order:

1. **Coverage** -- do the two products describe the same ground?
2. **Shared blind spots** -- does the reference's sensor favour one of them?
3. **Timing** -- did each product's passes fall when the flood was there?
4. **The criterion behind the TOPSIS gap** -- does the metric even measure what
   separated the two in TOPSIS (for example, archive depth or access maturity)?

Only a mismatch that survives all four says something about the ranking.

## Where it stands

As of 2026-10-11 only GFM is evaluated, so no consistency claim is possible.
See [[Validation against the UNOSAT reference]].

---

Related: [[Agreement metrics for binary flood maps]] | [[Flood_mask_Dataset_MCDA]] | [[Sensitivity Analysis]] | [[Uncertainty Analysis - MOC]]
