---
type: uncertainty
uncertainty_kind: knowledge
desc: What each agreement metric between a flood product and a reference flood map measures, when each one misleads, and how Entro reads them together
aliases: [flood map agreement metrics, accuracy metrics for flood maps, confusion matrix metrics, F1 IoU MCC flood, how to read the agreement table]
keywords: [agreement, accuracy, confusion matrix, TP, FP, FN, TN, overall accuracy, precision, recall, F1, IoU, CSI, critical success index, MCC, Matthews correlation coefficient, commission, omission, class imbalance, coverage, flood extent validation]
workflows: accuracy_metrics
source_workflow: core/workflows/validation/metrics.py
sources_note: Flood map validation - sources
agent: entro
context: head
retrieval: Answer what precision, recall, F1, IoU, MCC and overall accuracy each say about a flood product compared with a reference map, which one to trust in which situation, and what coverage does to all of them.
validation_status: definitions checked against the implementation and its tests (hand-computed matrices and scikit-learn); bibliographic details listed, not reopened
status: draft
tags: [uncertainty, validation, accuracy, metrics, flood]
---

## Answer in one line

For flood maps, read **coverage first**, then **precision against recall** to
see which error dominates, then **F1 or IoU** for the flood class and **MCC**
for both classes together. **Overall accuracy is never read alone**, because a
map with no flood at all scores high wherever flood is rare.

## Agreement, not accuracy

The table compares a product with a **reference map**, not with field
observation. Every number is "agreement with the reference". When the
reference is wrong, a product that is right is scored as wrong, and a product
that shares the reference's mistakes is scored as right. A reference
classified from the same sensor family as the product inflates its agreement
(shared blind spots). Entro states which reference was used and how it was
made before reading any number.

## The confusion matrix

Each compared pixel is one of four cases, with flood as the positive class:

- **TP** -- both maps say flood.
- **FP** -- the product says flood, the reference says not (a false alarm, a
  **commission** error).
- **FN** -- the reference says flood, the product says not (a missed flood, an
  **omission** error).
- **TN** -- both say not flood.

A pixel that either map has no data for is in none of the four. How many such
pixels were dropped is **coverage**, reported beside every metric.

## Coverage comes first

Coverage is the share of the evaluation domain where the product had valid
data. Every metric describes **only the covered part**. An F1 over 12% of the
domain is the F1 of that 12%, not of the basin.

Coverage is rarely random. GFM's Exclusion Mask removes dense vegetation and
urban areas, so what remains is mostly open ground and floodplain -- where
flood is easiest to see. The reference's flood share inside the compared
pixels is then higher than across the whole domain, and the metrics describe
the easy part of the problem. Entro compares those two shares
(`reference_flood_share` in the metrics against `domain.reference_flood_share`)
and calls a large gap a **selection effect**.

## Precision and recall: which error dominates

- **Precision** = TP / (TP + FP): of what the product calls flood, the share
  the reference agrees with. Low precision means false alarms.
  Commission error = 1 - precision.
- **Recall** = TP / (TP + FN): of what the reference calls flood, the share
  the product found. Low recall means missed flood. Omission error = 1 - recall.

For emergency use the two errors do not cost the same. Missed flood leaves
people unwarned; false alarms waste response capacity. Entro names the one
that dominates instead of averaging them away.

## F1 and IoU: the flood class

- **F1** = 2TP / (2TP + FP + FN), the harmonic mean of precision and recall
  (Van Rijsbergen 1979).
- **IoU** = TP / (TP + FP + FN), the intersection of the two flood areas over
  their union (Jaccard 1912). In flood-model evaluation the same quantity is
  the fit measure F, also called the critical success index (Bates and De Roo 2000).

F1 and IoU always put products in the same order (IoU = F1 / (2 - F1)), so the
table ranks by F1 and reports IoU for readers who expect it. Both **ignore TN**:
they say nothing about how well the product leaves dry land dry.

## MCC: both classes at once

MCC = (TP TN - FP FN) / sqrt((TP+FP)(TP+FN)(TN+FP)(TN+FN)), from -1 (total
disagreement) through 0 (no better than chance) to 1 (perfect agreement)
(Matthews 1975). It is high only when the product does well on flood **and** on
non-flood, which makes it the single number least fooled by class imbalance
(Chicco and Jurman 2020).

## Overall accuracy misleads when flood is rare

Overall accuracy = (TP + TN) / N. When flood covers a few percent of the
domain, a product that marks nothing as flood still scores close to 1. Entro
quotes overall accuracy only next to the reference's flood share, and never
uses it to compare products (Congalton 1991).

## Undefined is not zero

When a denominator is zero the metric is **undefined** and the table shows
`n/a`: precision when the product marks no flood, recall when the reference
has none, MCC when either map is a single class. Reading `n/a` as 0 would call
a product wrong when there was nothing to measure.

## What else moves the numbers

- **Aggregation.** The reference is aggregated to each product's own pixels
  (flooded share above 0.5). Coarser products lose narrow flood features and
  score lower recall for reasons of scale, not skill.
- **Temporal mismatch.** A cumulative reference -- the union of several passes
  -- holds every pixel that was flooded at any time. A product compared over
  the same window is unioned the same way; one compared on a single date
  misses flood that came and went.
- **Missing analysed extent.** If the reference does not say where it looked,
  unmapped ground counts as non-flood. Product flood there becomes FP that may
  be real flood.
- **Domain choices.** Removing permanent water and the sea from both maps is
  necessary: otherwise every product scores points for a river in its channel.

## Comparing products

Metrics are comparable across products only on the same domain, reference
and temporal mode, with coverage stated. With fewer than three evaluated
products no ranking claim can be made -- see [[Metric rank versus TOPSIS rank]].

---

Related: [[UNOSAT FL20251128LKA flood reference]] | [[Validation against the UNOSAT reference]] | [[Accuracy metrics payload fields]] | [[Uncertainty Analysis - MOC]]
