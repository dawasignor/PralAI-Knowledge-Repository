---
type: uncertainty
uncertainty_kind: criterion
desc: Reliability of the BUI built-up fraction when used as a criterion in the flood MCDM, and how its error should be carried into a score
aliases: [built-up criterion, impervious fraction criterion, BUI in MCDM, built-up fraction reliability]
keywords: [MCDM, MCDA, criterion, built-up fraction, impervious, BUI, weighting, score, uncertainty propagation, upper bound, arid, runoff coefficient, sentinel-2]
sensor: Sentinel-2 MSI L2A
workflows: fetch_lulc_data
source_workflow: core/workflows/sentinel.py
criterion_value: indices.bui.classes.fractions (built-up share of AOI)
criterion_direction: higher built-up fraction implies higher runoff, higher flood hazard
context: head
retrieval: Answer how reliable the Sentinel-2 built-up fraction is as an MCDM criterion, when it should be downweighted, and what its error does to a score.
validation_status: criterion reliability is reasoned, not measured; no arid AOI run, no weights set
status: draft
tags: [uncertainty, criterion, mcdm, built-up, sentinel-2]
---

## What the criterion is

The built-up fraction of the AOI, taken from the BUI classification in a
`fetch_lulc_data` response. It enters the MCDM as a proxy for **impervious
surface**, which drives the runoff coefficient: more impervious surface, less
infiltration, more runoff, higher hazard. Direction is monotonic upward.

Not a terminal product — a person does not read this number and judge it. It is
consumed by the scoring, so its error propagates into a decision.

## Reliability by AOI type

The criterion's accuracy is **not constant across catchments**, so a single
weight is wrong. It depends on which false-positive class dominates:

| AOI type | Dominant confusion | Criterion reliability | Handling |
|---|---|---|---|
| Humid, vegetated (e.g. Shillong) | Vegetation, which BUI removes (margin 1.37 index units) | Good | Full weight |
| Mixed urban / peri-urban | Mixed 20 m pixels, resolved by BUI's vegetation term | Good | Full weight |
| Agricultural, post-harvest | Fallow and ploughed soil, **not** removed by BUI | Degraded, biased high | Downweight; note season of the scene |
| Arid / semi-arid, dune or bare rock | Sand and bare soil, **not** removed by BUI (margin 0.02 index units) | **Unusable as a point estimate** | Treat as an upper bound, not a value |

The reason BUI does not correct the mineral cases is in
[[BUI over NDBI - built-up index accuracy]]: BUI = NDBI - NDVI, and bare
surfaces have NDVI near zero, so the correction cancels.

## The error is a bias, and it points one way

The built-up criterion's error is **not symmetric noise**. Every unremoved
false-positive class — sand, bare soil, dry riverbed, fallow cropland, rock —
pushes the built-up fraction **up**, never down. There is no corresponding class
of built-up surface that BUI reads as vegetation.

So the criterion **overestimates hazard** when it is wrong. For an MCDM this has
two consequences:

1. A sensitivity analysis on this criterion should test the **downward**
   direction, since that is where the true value lies.
2. The error is worst precisely where it inverts physical behaviour. Concrete is
   impervious; dune sand is among the most permeable surfaces there is. In an
   arid catchment a false positive does not blur the runoff estimate, it flips
   its sign — a wadi that floods flashily because of terrain scores instead as a
   city that does not exist.

## Distribution, not a single number

`fetch_lulc_data` returns full BUI statistics and a histogram rather than one
built-up number, so the criterion carries its own diagnostic:

- A **bimodal or implausibly wide** BUI distribution over a supposedly urban AOI
  is a sign of mineral contamination.
- BUI mean is a useful sanity check against the class fraction. Shillong
  returned BUI mean -0.72 with 53% dense vegetation, consistent with a low
  built-up fraction.
- BUI spans **[-2, 2]**. Any normalisation step in the MCDM that assumes
  [-1, 1] will misscale this criterion.

## What must qualify the criterion score

Two fields travel with the value and both belong in the scoring, not beside it:

- **`valid_fraction`** — the built-up fraction is computed over the pixels that
  survived cloud masking. A built-up fraction from 62% of an AOI is not the same
  claim as one from 95%. See [[Scene usability - SCL valid fraction]].
- **`days_before_start`** — scene selection can reach back 90 days, so the
  criterion may describe a different season than the event. This matters most
  for the agricultural case above, where the false-positive rate is seasonal.

Field paths are in [[Sentinel-2 LULC uncertainty fields]].

## Independent cross-check, not yet available

Building footprints (Open Buildings, Microsoft Building Footprints) would give a
second, independent estimate of built-up extent over the same AOI. Two estimates
that disagree are more informative than either alone, and the disagreement would
be a directly usable uncertainty input. Nothing is implemented.

## Open, not decided

- Criterion weight: `TOTAG` — no weight has been set.
- Whether reliability is handled as a **weight adjustment**, as a **score band**
  (upper bound rather than point), or by excluding the criterion for arid AOIs.
- No arid AOI has been run, so the arid row above is reasoned from index
  definitions, not measured.

---

Related: [[Uncertainty Analysis - MOC]] | [[BUI over NDBI - built-up index accuracy]] | [[Sentinel-2 LULC uncertainty fields]] | [[Scene usability - SCL valid fraction]] | [[Scoring criteria]] | [[Flood_mask_Dataset_MCDA]] | [[Sensitivity Analysis]] | [[SMAA]] | [[Entro - Uncertainty Analyser]]
