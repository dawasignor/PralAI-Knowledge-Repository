---
type: workflow
desc: How the five NRT flood products are ranked for one event - the criteria, the evidence behind each score, and why high cloud cover penalises rather than excludes
aliases: [flood mask MCDA, dataset MCDM, product selection, NRT product ranking, TOPSIS, flood dataset selection]
keywords: [MCDM, MCDA, TOPSIS, ranking, decision matrix, criteria, weights, modulator, cloud gate, feasibility, NRT, flood product, GFM, DSWx, MODIS, VIIRS, evidence, contested, ideal solution]
agent: norwood
workflows: rank_flood_products
source_of_truth: core/workflows/_mcdm_data.py and core/workflows/mcdm.py in langgraph-agents
source_docs: [docs/rank_flood_products.md, docs/SOURCES.md]
context: hand
retrieval: Answer how flood-mapping products are ranked for an event, what the twelve criteria are, how the event indices enter, and why a heavily clouded event no longer removes the optical products.
validation_status: ported from flood_dataset_MCDM_template_v3.xlsx and verified against its six test cases to 4.14e-13 on 2026-09-22
status: draft
tags: [workflow, mcdm, ranking, norwood]
---

## What this is

The decision step. Five NRT flood-mapping products are ranked for **one
event** by TOPSIS, and the result is thesis outputs 3 and 4.

Implemented as `rank_flood_products` -- see [[Monty data workflows]]. It is the
only workflow that fetches nothing: it consumes what the weather, LULC and
terrain workflows produced.

## Step 1 -- prune on availability, before any scoring

Ruled 2026-09-05, see [[Scoring criteria]] rulings 2 and 3. A source enters the
MCDM only if it actually covers the user's AOI **and** the event date.
Availability is a precondition, not a criterion traded off against accuracy.
Candidates and their archive start dates are in [[NRT products]]; for
[[Copernicus EMS Rapid Mapping]] the public activations API answers it
directly. **Implementation still pending** -- the current five alternatives are
a fixed set, not the output of an availability prune.

## Step 2 -- the twelve criteria

Six product criteria, three weather, three terrain. Every weather and terrain
criterion is a **cost**, and so are spatial posting and revisit interval.

| Group | Criteria |
|---|---|
| Product | P1 posting, P2 revisit (worst case), P3 separates flood from permanent water, P4 uncertainty-layer richness, P5 archive depth, P6 access maturity |
| Weather | W1 cloud, W2 wind, W3 solar illumination dependence |
| Terrain | T1 forest and vegetation, T2 steep terrain, T3 urban |

**Across these five products, W1, W2, W3, T2 and T3 all encode the same
SAR-versus-optical split.** Only T1 separates within a sensor family, because
DSWx-S1 has an inundated-vegetation class. So distinctions *within* a family
come almost entirely from the product criteria and T1 -- worth knowing before
reading a close result as a fine-grained judgement.

## Step 3 -- the event enters as five indices, and changes the WEIGHTS

Cloud cover, wind speed, dense-vegetation share, steep share, built-up share.
Each scales the weight of the criterion it governs.

**A product is no better at seeing through cloud on a clear day.** What changes
is how much its cloud-blindness matters. That is the whole modelling
commitment: environmental conditions are weight modulators, not score
adjustments.

The specification's literal alternative -- multiplying the matrix cells instead
-- is implemented and does not work: **under vector normalisation a uniform
column multiplier cancels**, and the workbook's own TC5 and TC6 show dense
vegetation at 40% and 70% giving identical rankings. Kept so the choice is
visible rather than quietly dropped.

## Why high cloud cover no longer rejects a product

**Changed 2026-09-22.** `cloud_gate` moved from 80 to 100, so it can no longer
fire: cloud cover has nowhere above 100 to go. Optical products are always
carried into the ranking and penalised. `cloud_upper` moved with it, so the
penalty curve now saturates at total cloud rather than at 80%.

### The reason that survives scrutiny

**The gate fired on the wrong statistic.** `cloud_pct` is a mean over the whole
event window -- 192 hours for the Kelani event, including every night.
Feasibility for an optical product is not a property of that mean; it is a
property of each daytime overpass.

Measured on the Kelani event, window mean **91.67%**:

| Overpass window | Passes | Below 80% cloud |
|---|---|---|
| ~10:30 local (MODIS Terra, HLS) | 8 | **1** (19% cloud) |
| ~13:30 local (MODIS Aqua, VIIRS) | 8 | **1** (45% cloud) |

Two usable opportunities in sixteen, both on 2025-11-30 after the rain stopped.
**Rejection asserts zero.** The record shows a small non-zero number, so the
gate was making a stronger claim than the data supports.

### Two supporting reasons

- **A two-row matrix is a degenerate TOPSIS.** With three of five alternatives
  removed, one survivor is the ideal on every criterion it wins and the
  anti-ideal on every one it loses, so closeness lands near 1 and near 0 **by
  construction** -- the Kelani run gave 0.827 and 0.173. That is a pair
  rendered as numbers, not a ranking, and it cannot demonstrate the method.
- **[[Sensitivity Analysis]] and [[SMAA]] need a continuous response.** A gate
  is a discontinuity: perturb cloud across 80% and the alternative set changes,
  so rank acceptability is undefined across the boundary rather than merely
  different.

### What it costs -- and the tension with ruling 2

**It moves cloud from a precondition into the compensatory pool**, which is
what [[Scoring criteria]] ruling 2 warns against: a compensatory aggregation
can average a top accuracy score against a zero availability score and still
rank the product first. TOPSIS is compensatory. On the Kelani event **MODIS
MCDWD ranks 3rd of 5**, on the strength of a 23-year archive and daily revisit,
over an event it could barely observe.

The reconciliation is that ruling 2 governs **existence** -- does this product
cover this AOI and this date at all -- which is binary and permanent. Cloud is
**conditional observability**: it varies hour by hour and was already
represented as a scored criterion. They are different kinds of thing. But the
hazard ruling 2 names is real here anyway, so the rule that replaces the gate
is:

> **A rank is no longer a usability claim.** Read `W1` and the cloud index
> before treating one as a recommendation. Output 3 states this in its gate
> section and carries the dated change note beside the numbers.

The curve is gentler everywhere, not only past 80: at 50% cloud the penalty is
0.109 where it was 0.182, and at 80% it is 0.445 where it was 1.0.

## Step 4 -- the evidence register

**Thirty cells carry the reasoning, not just the score**: six susceptibility
criteria times five alternatives, each with a basis, a rationale and source
keys that resolve in `docs/SOURCES.md` section 8b.

| Basis | Meaning |
|---|---|
| D | product documentation -- the product's own spec or user guide |
| S | sensor physics -- stated for one product, applied by sensor type |
| R | author rule -- a modelling choice, with no document behind it |

**Six cells are contested**, meaning a second coder could reasonably score them
differently -- mostly the urban susceptibilities, where explicit masking is not
confirmed for DSWx-S1 and the MODIS/VIIRS coding could be argued either way.
They are carried into output 3 with the weight their criterion holds, because a
sensitivity analysis that does not know which cells are soft is testing the
wrong thing.

## Step 5 -- TOPSIS, and what is missing

Vector normalisation, weighting, then distance to the best and worst synthetic
alternatives the candidate set offers. **The ideal is not an absolute** -- PIS
and NIS are built column-wise from the candidates actually present, so removing
an alternative moves them.

**Only TOPSIS is implemented.** The specification also describes a weighted-sum
model as a robustness check and a Spearman comparison of the two rankings.
Neither exists, so **no ranking from this workflow is method-agnostic**, and
the stability of an order under a different aggregation is untested.

**Base weights are equal (1/12)** -- a placeholder. AHP and entropy weighting
are open, and an equal-weight ranking says what the criteria imply when nobody
has said which matters more. See [[Sensitivity Analysis]] and [[SMAA]] for what
comes next.

## Still open

- Step 1's availability prune is specified and not implemented.
- P2 for the SAR products is unresolved; the documented 6-12 day range is kept
  with the worst case used, which favours the optical products.
- Per-overpass cloud, rather than a window mean, is the obvious refinement and
  is what the measurement above actually argues for.

---

Related: [[NRT products]] | [[Scoring criteria]] | [[Monty data workflows]] | [[Readiness to use]] | [[Sensor limits versus processing gains]] | [[Cloud compatibility]] | [[SMAA]] | [[Sensitivity Analysis]] | [[Workflows-MOC]] | [[Agent Norwood - Satellite expert]] | [[Global Flood Monitoring (GFM)]] | [[OPERA DSWx-HLS]] | [[OPERA DSWx-S1]] | [[MODIS NRT Flood Product]] | [[VIIRS NRT Flood Product]]
