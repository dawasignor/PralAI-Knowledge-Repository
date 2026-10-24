---
type: dataset
desc: Permanent-water occurrence baseline used to separate standing water from flood extent -- and the layer that counts the ocean as permanent water
aliases: [JRC GSW, Global Surface Water, Pekel, surface water occurrence, permanent water]
keywords: [JRC, global surface water, occurrence, permanent, seasonal, ephemeral, Pekel, Landsat, baseline, flood extent, look-alike, ocean, sea, coastal AOI]
workflows: fetch_permanent_water
source_of_truth: core/workflows/water.py in langgraph-agents
context: head
retrieval: Answer what the JRC Global Surface Water occurrence layer provides, how permanent and seasonal water are separated, and why the ocean must be masked out before any coastal AOI statistic is reported.
validation_status: ocean behaviour measured over the Kelani AOI on 2026-09-22
status: draft
tags: [dataset, water, tier/pretrained]
source_url: https://storage.googleapis.com/global-surface-water/downloads2021/
verified_on: 2026-09-22
---

## What it is

The long-run surface-water record: 1984-2021 Landsat, 30 m, distributed as
10-degree tiles over plain HTTPS with range requests and no account. The band
used here is **`occurrence`** -- the percentage of valid observations in which
a pixel was water.

It is the **dry-water reference**: the extent an analyst subtracts from a flood
map so that a river sitting in its own channel is not counted as flood.

## The thresholds are Pekel's, not ours

| Class | Occurrence | Meaning |
|---|---|---|
| Permanent | >= 90% | Water in almost every observation |
| Seasonal | 25-90% | Water for part of a normal year |
| Ephemeral | > 0%, < 25% | Water rarely, but it has happened |

Citation: Pekel, J.-F., Cottam, A., Gorelick, N., & Belward, A. S. (2016),
"High-resolution mapping of global surface water and its long-term changes",
*Nature* 540(7633), 418-422. The band and the breakpoints are the paper's.

## It records the OCEAN as permanent water -- mask it first

This is the single most important thing to know before pointing it at a coastal
AOI. The sea is water in 100% of observations, so it is classed permanent, and
nothing in the layer distinguishes it from an inland reservoir.

Measured over the Kelani AOI (`[79.800, 6.783, 80.217, 7.083]`) on 2026-09-22:

| | "Permanent water" |
|---|---|
| Sea left in | **214.47 km2** -- 13.9% of the bounding box |
| Sea excluded | **1.66 km2** -- 0.125% of the land |

A flood baseline meant to say how much of the catchment is normally wet would
instead have been reporting the Indian Ocean, and the figure would have flowed
straight into the flood-mapping outlook as a look-alike floor.

**Even a bbox that looks inland can be contaminated.** The project's earlier
AOI (west edge 79.867) clipped only a sliver of coast, and still 2.05 km2 of
its 3.6958 km2 of reported permanent water was sea -- 55% of the figure.

The sea is removed with the Copernicus DEM Water Body Mask before anything is
counted; lakes and rivers are kept, because they are the baseline. See
[[Excluding the sea from AOI statistics]] and [[Copernicus DEM GLO-30]].

## What the workflow returns

Areas and fractions for permanent, seasonal, ephemeral and never-water, plus
occurrence statistics over water pixels only -- an AOI mean occurrence is
meaningless when most of the AOI is dry land sitting at zero.

**Fractions are of the LAND area**, not the bounding box, and the field is
named `land_fraction` so that cannot be misread.

## What it is not

Not a flood map, and not the state on any single date. It is a 37-year
summary, so a channel that has migrated since 2021 is recorded where it used to
be, and a reservoir built after 2021 is absent.

---

Related: [[Datasets-MOC]] | [[Sentinel-2 C1 L2A]] | [[Agent Norwood - Satellite expert]] | [[Excluding the sea from AOI statistics]] | [[Copernicus DEM GLO-30]] | [[Monty data workflows]] | [[Norwood pre-flood AOI brief schema]]
