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
criterion is a **cost**, and so are spatial resolution and revisit interval.

| Group | Criteria |
|---|---|
| Product | P1 spatial resolution, P2 revisit (worst case), P3 separates flood from permanent water, P4 uncertainty layer, P5 archive length, P6 access maturity |
| Weather | W1 cloud, W2 wind, W3 solar illumination dependence |
| Land characteristics | L1 forest and vegetation, L2 steep terrain, L3 urban |

**Across these five products, W1, W2, W3, L2 and L3 all encode the same
SAR-versus-optical split.** Only L1 separates within a sensor family, because
DSWx-S1 has an inundated-vegetation class. So distinctions *within* a family
come almost entirely from the product criteria and L1 -- worth knowing before
reading a close result as a fine-grained judgement.

## Step 3 -- the event enters as five indices, and changes the WEIGHTS

Cloud cover, wind speed, dense-vegetation share, steep share, built-up share.
Each RAISES the weight of the criterion it governs, from its base weight
(user decision 2026-11-22; see Weights below).

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

### Cloud and wind at the passes (2026-11-22)

**Cloud and wind are read at the acquisitions, not over the window** (user decision 2026-11-22). Cloud (W1) is the mean of the AOI model cloud at the OPTICAL passes -- OPERA DSWx-HLS, MODIS MCDWD, VIIRS VCDWD -- because only optical sensors are hurt by cloud; wind (W2) is the mean of the AOI 10 m wind at the RADAR passes -- GFM, OPERA DSWx-S1 -- because only radar is hurt by wind. Pass times come from Module 1 (data_availability): exact for GFM, DSWx-S1 and DSWx-HLS; for MODIS and VIIRS, whose daily composites carry no time, the nominal overpass (Terra 10:30, Aqua 13:30, VIIRS 13:30 local SOLAR time, which is 10:39 and 13:39 civil time in Colombo) on every day of the window. The values come from Module 2's hourly series, interpolated between the two hours either side of each pass. Passes within 5 minutes are one acquisition (one Sentinel-1 pass gives both GFM and DSWx-S1). A pass on a missing hour is withheld and counted; with none left the index is not known -- the window mean is never used instead. Kelani basin: cloud 62.8% over 20 optical passes (window mean was 77.0%), wind 3.24 m/s over 5 radar passes (window mean 3.40), giving W1 0.101 and P1-P6 0.072 each.

**Guardrail: everything is converted to LOCAL time before scoring** (user rule 2026-11-22). Pass times (UTC), model hours (UTC) and nominal overpasses (local solar time) are all turned into the event's IANA zone (Module 1's `period.timezone`) before they are matched or counted, and a pass belongs to the window by its local date. A missing zone, an unknown zone, hours not stored in UTC or a stamp without a zone stop the run (`LocalTimeError`) -- nothing is guessed. Every time the code returns is local, with its offset.

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

**Event criteria are weighted first** (user decision 2026-11-22). Each of the six event criteria starts at the base weight 1/12 (0.0833) and is raised by this event's index: W1 by the cloud curve g(cloud) (0 up to 20% cloud, 1 at 100%), W2 by the wind ramp f(wind) (0 up to 5 m/s, 1 at 15 m/s), L1 by the dense-vegetation share, L2 by the steep share, L3 by the built-up share -- so 52% dense vegetation makes L1 1/12 x 1.52 = 0.127. W3 (daylight) is not raised: darkness comes every night. The weight left after the event criteria is divided equally among the six product criteria P1-P6. Over the Kelani basin with the window-mean cloud and wind (cloud 77%, wind 3.4 m/s, vegetation 52.4%, steep 5.39%, built-up 0.04%): W1 0.116, W2 0.083, W3 0.083, L1 0.127, L2 0.088, L3 0.083, P1-P6 0.070 each; with cloud and wind read at the passes (also 2026-11-22: cloud 62.8%, wind 3.24 m/s) W1 is 0.101 and P1-P6 0.072 each. Before this the event could only LOWER a weight (base x index, renormalised), so no event criterion could ever outweigh a product criterion; that rule is kept as `weighting="multiplicative"` for the specification workbook's test cases.

**Base weights are equal (1/12)** -- a placeholder. AHP and entropy weighting
are open, and an equal-weight ranking says what the criteria imply when nobody
has said which matters more. See [[Sensitivity Analysis]] and [[SMAA]] for what
comes next.

## Still open

- Step 1's availability prune is specified and not implemented.
- P2 for the SAR products is unresolved; the documented 6-12 day range is kept
  with the worst case used, which favours the optical products.
- Per-overpass cloud, rather than a window mean -- DONE 2026-11-22: cloud is
  now read at the optical passes and wind at the radar passes, in local time
  (see "Cloud and wind at the passes" above).

---

Related: [[NRT products]] | [[Scoring criteria]] | [[Monty data workflows]] | [[Readiness to use]] | [[Sensor limits versus processing gains]] | [[Cloud compatibility]] | [[SMAA]] | [[Sensitivity Analysis]] | [[Workflows-MOC]] | [[Agent Norwood - Satellite expert]] | [[Global Flood Monitoring (GFM)]] | [[OPERA DSWx-HLS]] | [[OPERA DSWx-S1]] | [[MODIS NRT Flood Product]] | [[VIIRS NRT Flood Product]]
