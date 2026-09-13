---
type: protocol
desc: Rulings that govern how flood data sources are scored - what a criterion value means, what is filtered before scoring, and what is still open
aliases: [scoring criteria, scoring protocol, scoring rules, MCDM rulings, how to score]
keywords: [scoring, criteria, MCDM, MCDA, ruling, resolution, footprint, availability, filter, readiness, weights, normalisation]
agent: norwood
context: head
retrieval: Answer how a flood data source is scored - which resolution value is used, what is filtered out before scoring, and which scoring questions are still undecided.
validation_status: rulings 1, 2, 3 and 5 settled by the user 2026-09-05; ruling 4 is open and tracked as a TODO; no weights or score scale set
status: draft
tags: [protocol, scoring, mcdm]
---

Rulings settled with the user on **2026-09-05**, from the five questions raised
while drafting [[NRT products]]. Each says what was decided and what it changes.

---

## 1. Resolution is the shipped grid, not the native footprint

**Ruling, reversed 2026-09-05.** The value scored is the **shipped grid** — the
cell size of the product as delivered — because that is what actually gets used
for flood mapping and impact analysis. Native footprint is recorded as
**information only and carries no penalty anywhere.**

An earlier ruling the same day said the opposite. It was reversed after the
supporting argument was checked and found weak — see *Why the reversal* below.

**In the notes:** `mcdm.spatial_resolution_m` is the shipped grid and is the
field that gets scored. `mcdm.native_footprint_m` appears **only** where it
differs, so its presence is itself the flag, and it is never scored.

**Who this changes:**

| Product | Shipped grid (scored) | Native footprint (info) |
|---|---|---|
| [[FloodScan]] | 90 m licensed / ~10 km free — see ruling 1b | ~10 km radiometer footprint |
| [[VIIRS NRT Flood Product]] | 250 m | 375 m I-band native |

Everything else ships at or coarser than what its sensor resolves, so one value
serves.

**Why the reversal.** Three reasons, in order of weight:

1. **Sourced beats estimated.** 90 m is a documented vendor figure. The ~10 km
   is an inference from the instrument class, with the Galantowicz paper still
   unread. A thesis criterion resting on that inference is weak.
2. **It fixes VIIRS.** Scoring native put [[VIIRS NRT Flood Product]] (375 m)
   *behind* [[MODIS NRT Flood Product]] (250 m), when the two are deliberately
   built on the same 250 m grid so their archives concatenate. Ranking them
   apart misrepresents them.
3. **The pipeline operates on the delivered grid.** Zonal statistics,
   co-registration with exposure layers and cell counts against ward boundaries
   all happen at the shipped cell size.

**Correction to the original argument.** It claimed that scoring the grid would
let FloodScan outrank [[Global Flood Monitoring (GFM)]]. That was wrong — lower
is better, and 90 m is worse than 20 m, so GFM ranks first either way. The real
effect is that FloodScan moves from 4th of seven to last. Smaller than the
original ruling asserted.

**What this knowingly gives up.** Nothing in the model now distinguishes a
genuinely resolved 90 m from a downscaled one, so a FloodScan cell and a GFM
cell are treated as carrying comparable information when they do not. Ruled
acceptable: the alternative was either a penalty in a criterion that is still
empty, or a new criterion correlating heavily with this one. Recorded as a
stated limitation rather than modelled.

---

## 1b. FloodScan carries both distributions, resolved at run time

**Ruling.** "Shipped" is ambiguous for [[FloodScan]] — it depends on which
distribution is reachable:

| Distribution | Shipped grid | Terms |
|---|---|---|
| AER direct | 90 m | commercial, ~USD 25,000/yr |
| HDX redistribution | 0.083° ≈ 10 km | free |

Both are recorded in `mcdm.spatial_resolution_m_by_distribution`, and
`mcdm.spatial_resolution_m` is left `null`. The availability filter (rulings 2
and 3) selects which applies, based on whether a licence exists.

**Consequence to state in the thesis:** without a licence the reachable
FloodScan is the ~10 km HDX grid, so scoring "what the user will actually use"
lands near the native footprint anyway — for a licensing reason, not a physical
one. Scoring code must handle the `null` rather than assume a value.

---

## 2. Availability is a filter, applied before scoring

**Ruling.** Candidate sources are **pruned on availability first**, and only the
survivors are scored. Availability is a precondition, not a criterion traded off
against others.

**What it fixes.** A compensatory aggregation averages a top accuracy score
against a zero availability score and can still rank the product first —
recommending something that does not exist for the user's AOI and date. The
clearest case is [[Copernicus EMS Rapid Mapping]], which exists only where an
Authorised User triggered an activation.

**Consequence:** the aggregation method no longer has to be non-compensatory to
stay safe, so that choice stays open on its own merits rather than being forced
by this problem.

---

## 3. The filter is temporal as well as spatial

**Ruling.** Same mechanism as ruling 2. The event date prunes the candidate set
before scoring, because several products simply do not reach back to it.

Worked on the Tirupati event, **19 November 2021**:

| Product | Covers the date? |
|---|---|
| [[Global Flood Monitoring (GFM)]] | Yes — archive from 2015 |
| [[MODIS NRT Flood Product]] | Yes — from 2003, via the `MCDWD_L3` archive collection |
| [[OPERA DSWx-HLS]] | Yes — from 2016, though validated only from April 2023 |
| [[FloodScan]] | Yes — from 1998, if licensed |
| [[OPERA DSWx-S1]] | **No** — starts December 2023 |
| [[VIIRS NRT Flood Product]] | **No** — starts April 2025 |
| [[Copernicus EMS Rapid Mapping]] | Only if an activation covered it |

Seven candidates fall to four before any scoring runs.

**Status:** agreed in principle. Implementation waits until the existing work is
pruned. This is the piece that makes availability a **fact** rather than a score
— for EMS the public activations API answers it directly.

---

## 4. Sensor limits versus processing gains — OPEN, TODO

**Not settled.** Flagged by the user as important and tracked in
[[Sensor limits versus processing gains]].

The problem: products cover sensor weaknesses with processing — compositing in
MODIS and VIIRS, the three-algorithm ensemble in GFM, HLS harmonisation in
DSWx-HLS, multi-mission tasking and human analysts in CEMS Rapid Mapping. Score
sensor capability and delivered capability as independent criteria and the same
design choice is credited twice.

**Settle before weights are set.** It changes the ranking.

---

## 5. Readiness to use is a criterion

**Ruling.** Added as an explicit criterion, defined in [[Readiness to use]]:
an ordinal 1–4 cost scale, 1 best, measuring how much work a source needs before
it yields a usable flood layer.

Deliberately written to cover **raw sources too**, since the framework is
expected to extend beyond finished flood products. Levels 3 and 4 exist for
calibrated imagery and for data that must be tasked.

Immediate effect: [[Global Flood Monitoring (GFM)]] delivers flood and scores 1;
the OPERA pair deliver surface water and score 2, because floodwater must be
separated from permanent water using a baseline such as
[[JRC Global Surface Water]].

---

## Still undecided

Not part of the five, and blocking a run:

- **No score scale.** Nothing defines whether criteria are scored 0–1, 1–5, or
  normalised from raw values. Until then the dataset notes carry **values, not
  scores** — deliberately, so nothing invented enters the model.
- **No weights.** See [[Flood_mask_Dataset_MCDA]].
- **No accuracy figures** have been retrieved for any of the seven products, so
  that criterion cannot be scored at all yet.
- **Normalisation for mixed quantities.** [[FloodScan]] returns a flood
  *fraction*; the others return extent. These are different quantities and do
  not normalise the same way.

---

Related: [[Flood_mask_Dataset_MCDA]] | [[Readiness to use]] | [[Sensor limits versus processing gains]] | [[NRT products]] | [[SMAA]] | [[Sensitivity Analysis]] | [[Agent Norwood - Satellite expert]] | [[Head-MOC]]
