---
type: knowledge
desc: TODO - products hide sensor weaknesses behind processing (compositing, ensembles, harmonisation, human analysts), so scoring sensor capability and product capability as separate criteria double counts the same design choice
aliases: [double counting in MCDM, processing gains, sensor versus product capability, compositing double count, harmonisation credit]
keywords: [MCDM, MCDA, criterion design, double counting, compositing, ensemble, harmonisation, HLS, GFM, CEMS, weighting, correlated criteria, independence, sensor capability]
agent: norwood
context: head
retrieval: Answer why scoring sensor capability and product capability as independent criteria double counts, which products this affects, and what must be decided before weights are set.
validation_status: TODO - problem identified 2026-09-05 on the user's ruling, no resolution chosen, no products rescored
status: todo
tags: [todo, criterion, mcdm, scoring, double-counting]
---

> **Status: TODO.** Flagged as important by the user, 2026-09-05. Nothing is
> decided and no product has been rescored. Settle this **before weights are
> set** in [[Flood_mask_Dataset_MCDA]] — it changes the ranking, not just the
> presentation.

## The problem in one line

Several products **compensate for a weak sensor with processing**, so if the
scoring credits both the sensor's raw capability and the product's delivered
capability as independent criteria, the same single design choice is counted
twice and those products are inflated.

## Where it started

Noticed first on the compositing optical products. [[MODIS NRT Flood Product]]
and [[VIIRS NRT Flood Product]] ship 1-day, 2-day and 3-day composites. The
3-day version stacks three passes to find gaps between clouds, so it is more
cloud-tolerant — but it can no longer date the flood to a day.

Cloud tolerance was **bought with** temporal precision. Scoring "revisit = 1 day"
and "handles cloud well" as two separate strengths credits one trade twice.

## It generalises, and that is the real finding

The user's extension: this is not a compositing quirk. **Most products in the
tier use processing to cover a disadvantage**, and each case has the same shape.

| Product | The sensor weakness | The processing that covers it | What gets double counted |
|---|---|---|---|
| [[MODIS NRT Flood Product]], [[VIIRS NRT Flood Product]] | Optical, blocked by cloud | Multi-day compositing | Cloud tolerance vs temporal precision |
| [[Global Flood Monitoring (GFM)]] | Any single SAR classifier fails on some scenes | Ensemble of three independent algorithms, plus a published likelihood | Accuracy and reliability, credited once for the algorithms and again for the confidence layer |
| [[OPERA DSWx-HLS]] | Landsat repeats every 16 days, Sentinel-2 every 10 | HLS harmonisation into one 30 m grid | Revisit — the 2–3 day figure is a processing product, not a platform property |
| [[Copernicus EMS Rapid Mapping]] | No fixed sensor, no systematic revisit | Multi-mission tasking plus human analysts | Accuracy and modality flexibility, both bought by the activation model that also destroys availability |
| [[FloodScan]] | ~10 km radiometer footprint | Downscaling to a ~90 m grid | Resolution — see below, this row is **open** |

**The FloodScan row moved back into scope on 2026-09-05.** It was briefly the
settled case: an earlier ruling scored the resolved footprint, which took the
downscaling credit out of the resolution criterion. That ruling was **reversed**
— resolution now scores the shipped grid, and native footprint carries no
penalty ([[Scoring criteria]] ruling 1).

The reversal is well argued on its own terms: the shipped grid is what the
analysis operates on, and the ~10 km footprint is an inference from an unread
paper. But its consequence belongs in this note — **scoring the shipped grid
credits the downscaling.** FloodScan is now an instance of this problem rather
than the template for solving it, and no offset is modelled for it anywhere.

That was ruled acceptable as a stated limitation, which is defensible. It is
also exactly the kind of case-by-case decision this note argues should be made
once, deliberately, for every row. **There is no settled template — every row
above is open.**

## Why it matters for the ranking

Two distortions, in opposite directions:

1. **Heavily processed products are inflated.** GFM and DSWx-HLS gain on several
   criteria from one upstream investment.
2. **Simple products are penalised twice.** [[OPERA DSWx-S1]] does less
   processing, so it looks worse on the derived criteria *and* worse on
   [[Readiness to use]] — even though the underlying Sentinel-1 observation is
   the same one GFM uses.

That second point is the sharp one: **GFM and DSWx-S1 see the identical
Sentinel-1 scene.** Any difference between them is entirely processing. If the
criteria set does not separate sensor from processing, the MCDM cannot say that
cleanly.

## Options, none chosen

- **A — Score the delivered product only.** Drop sensor-level criteria entirely
  and judge what arrives. Simple and honest, but loses the ability to say *why*
  a product performs, and makes the framework harder to extend to raw sources
  where there is no processing to judge.
- **B — Score sensor and processing separately and deliberately**, with the
  processing contribution named. More explanatory, more work, and needs a clear
  rule for what belongs in which.
- **C — Keep the current criteria but test for correlation** and reduce weights
  where criteria move together. Statistical rather than structural; defensible if
  reported, and [[Sensitivity Analysis]] and [[SMAA]] would show the effect.

## What to settle

1. Which option, A / B / C.
2. Whether a criterion set that mixes finished products with raw sources (the
   stated intent for [[Readiness to use]]) can use sensor-level criteria at all.
3. Whether the correlation between criteria is measured before weights are set,
   or discovered afterwards in sensitivity analysis.

---

Related: [[Scoring criteria]] | [[Readiness to use]] | [[Flood_mask_Dataset_MCDA]] | [[Sensitivity Analysis]] | [[SMAA]] | [[NRT products]] | [[SAR versus optical for flood extent]] | [[Agent Norwood - Satellite expert]]
