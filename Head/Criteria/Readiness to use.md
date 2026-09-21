---
type: criterion
desc: How much work a data source needs before it yields a flood layer the pipeline can act on - an ordinal cost criterion that scales from a finished flood mask down to raw sensor data
aliases: [readiness, readiness to use, ease of use, processing burden, usability criterion, how ready is the product]
keywords: [criterion, MCDM, MCDA, readiness, ease of use, processing burden, derivation, baseline subtraction, raw data, flood mask, surface water, effort, cost criterion]
agent: norwood
criterion_direction: lower is better - it is a cost criterion
criterion_scale: ordinal 1-4
criterion_value: mcdm.readiness in each dataset note
context: head
retrieval: Answer how much processing a flood data source needs before it is usable, how the 1-4 readiness scale is defined, and where each candidate product sits on it.
validation_status: scale defined 2026-09-05 on the user's ruling; levels assigned from product documentation, not from measured processing effort
status: draft
tags: [criterion, mcdm, readiness, scoring]
---

## Why this criterion exists

Two products can look identical on resolution, revisit and cost and still leave
very different amounts of work behind.

[[Global Flood Monitoring (GFM)]] hands over a **flood** mask — it compares each
scene against its own Reference Water Mask, so the answer is finished.
[[OPERA DSWx-S1]] hands over a **water** mask, which includes every lake and
river that is always there. Turning that into flood needs a permanent-water
baseline subtracted from it, using something like
[[JRC Global Surface Water]] — extra code, extra assumptions, extra error.

Without this criterion the MCDM treats those two as equivalent deliverables.
They are not.

## The scale

Ordinal, **1 is best**. This is a cost criterion, so it is minimised.

| Level | Meaning | Typical work required |
|---|---|---|
| **1 — Ready** | A finished flood layer. Read it and use it. | None |
| **2 — Minor derivation** | A water or surface layer that becomes flood through one documented step | Subtract a permanent-water baseline |
| **3 — Major derivation** | Calibrated imagery, no classification | Build, tune and validate a classifier |
| **4 — Raw or must be tasked** | Needs acquisition planning or heavy preprocessing before classification is even possible | Tasking, ordering, terrain correction, calibration |

## Where the candidates sit

| Product | Level | Why |
|---|---|---|
| [[Global Flood Monitoring (GFM)]] | 1 | Flood extent defined against its own reference water |
| [[Copernicus EMS Rapid Mapping]] | 1 | Analyst-validated delineation and damage grading |
| [[MODIS NRT Flood Product]] | 1 | Flood water maps directly |
| [[VIIRS NRT Flood Product]] | 1 | Flood maps, plus a recurring-flood classification |
| [[OPERA DSWx-S1]] | 2 | Surface water; needs a permanent-water baseline |
| [[OPERA DSWx-HLS]] | 2 | Surface water; same |

**Every remaining candidate returns the same quantity.** FloodScan was the
exception — level 1, but delivering a **fraction** (0–100% of a cell inundated)
rather than a binary extent, which made comparing it a normalisation problem
rather than a readiness one. It was withdrawn from the candidate set on
2026-09-21 (see [[NRT products]]), so that distinction no longer has a case to
apply to.

The principle it illustrated is kept, because it is what the scale means:
**readiness measures *work*, not *comparability*.** A future candidate that
delivers a fraction is still level 1, and still a normalisation problem.

## Designed to extend past this tier

The scale is deliberately not written around near-real-time flood products,
because the framework is expected to cover raw sources later. Levels 3 and 4
exist for that:

| Future candidate | Level | Why |
|---|---|---|
| Sentinel-1 GRD | 3 | Calibrated backscatter; the flood classifier is yours to build |
| OPERA RTC-S1 | 3 | Terrain-corrected backscatter, still no water classification |
| Sentinel-2 L2A | 3 | Surface reflectance; indices and thresholds are yours |
| Commercial SAR tasking | 4 | Must be ordered and acquired before anything exists |

This is why the levels are phrased as *work required*, not as product type. A
source is scored on what the pipeline must do to it, whatever it is.

## Scoring notes

- **Ordinal, so treat it as ordinal.** The gap between 1 and 2 is not
  necessarily the same size as the gap between 3 and 4. Any normalisation in
  [[Flood_mask_Dataset_MCDA]] should not assume equal intervals without saying
  so.
- **It is a cost, not a quality.** A level 3 source can still be the right
  answer if it is the only one that covers the event, or if its resolution is
  decisive. Readiness should carry a modest weight, not a dominant one.
- **It interacts with the double-counting problem.** A product can reach level 1
  because processing was done for it upstream — GFM's ensemble, the HLS
  harmonisation. That processing may already be credited elsewhere in the
  scoring. See [[Sensor limits versus processing gains]].

---

Related: [[Scoring criteria]] | [[Flood_mask_Dataset_MCDA]] | [[Sensor limits versus processing gains]] | [[NRT products]] | [[JRC Global Surface Water]] | [[Agent Norwood - Satellite expert]] | [[Datasets-MOC]]
