---
type: uncertainty
uncertainty_kind: knowledge
desc: The Copernicus EMS rapid-mapping products of activation EMSR851 (AOI02 Kelani Ganga delineation, AOI09 Gampola grading, AOI03 Mahaweli Ganga delineation) used as reference flood maps for the kelani-basin-2025 and gampola-2025 validations -- what they are, how the comparison reads them, and where they cannot be trusted
aliases: [EMSR851, EMS reference, Kelani reference, AOI02 reference, emsr851-aoi02, Copernicus EMS reference, Gampola reference, AOI09 reference, AOI03 reference, emsr851-aoi09, emsr851-aoi03]
keywords: [Copernicus EMS, rapid mapping, EMSR851, AOI02, Kelani Ganga, PlanetScope, semi-automatic extraction, AOI09, AOI03, Gampola, Mahaweli Ganga, grading, delineation, monitoring, observedEventA, flooded area, flood trace, notAnalysedA, areaOfInterestA, modelledEventA, floodDepthA, photo-interpretation, GeoEye, Legion, analysed extent, reference map, not field validated]
sensor: PlanetScope (3.9 m), GeoEye (0.5 m) and Legion (1.6 m), post-event optical
workflows: accuracy_metrics
source_workflow: core/workflows/validation/reference.py
sources_note: Flood map validation - sources
agent: entro
context: head
retrieval: Answer what the EMSR851 reference flood maps are, which of their layers and classes the comparison uses, where the comparison domain stops, and which limits of them Entro must carry into every agreement figure.
validation_status: read from the delivered shapefile zips -- layer geometry, attribute tables and source tables -- on 2026-11-18 (Copernicus EMS 2025)
verified_on: 2026-11-18
status: draft
tags: [uncertainty, validation, reference, copernicus-ems, flood]
---

## Answer in one line

Copernicus EMS rapid-mapping products of activation EMSR851, each drawn from
**one post-event optical image** and not field validated
(Copernicus EMS 2025). **AOI02 "Kelani Ganga River"** (delineation, PlanetScope 3.9 m,
30 November 2025, semi-automatic extraction) is the reference of the **main
experiment, kelani-basin-2025**. For gampola-2025, **AOI09 "Gampola"**
(grading, GeoEye 0.5 m, 4 December 2025) is the primary reference and
**AOI03 "Mahaveli Ganga River"** (delineation, monitoring 1, Legion 1.6 m,
3 December 2025) the second; those two are photo-interpreted. They are
operational maps, not ground truth.

## AOI02 Kelani Ganga -- the main experiment's reference

| | |
|---|---|
| Post-event image | PlanetScope, 3.9 m, 30 Nov 2025 05:39 UTC |
| Detection | semi-automatic extraction; 878 features, all "Flooded area" -- no flood trace, no mass movement |
| Analysed area | a river-corridor polygon, 79.86-80.20 E, 6.887-7.001 N; 84 not-analysed polygons |
| Inside the kelani-basin-2025 AOI | 157.77 km2 analysed, 4.43 km2 of it not analysed; **30.13 km2 of observed flood**; domain 153.12 km2 after the sea and JRC permanent water |

What sets it apart from the other two: a **coarser** image (3.9 m), a
**mid-window date** (30 November, inside a 26 November - 4 December window,
so products are compared as unions over days either side of it), and
**semi-automatic** rather than hand-drawn flood. A much larger flood than
Gampola's, so every product's agreement carries information -- the coarse
ones included.

## What was delivered

Each is a zip of shapefiles in WGS84, plus a PDF map and a summary table
(Copernicus EMS 2025):

| | AOI09 Gampola (primary) | AOI03 Mahaweli Ganga (second) |
|---|---|---|
| Map type | Grading | Delineation, monitoring 1 |
| Post-event image | GeoEye, 0.5 m, 4 Dec 2025 05:15 UTC | Legion, 1.6 m, 3 Dec 2025 05:29 UTC |
| Pre-event image | WorldView-2, 24 Jan 2024 | WorldView-2, 24 Jan 2024 |
| Analysed area (`areaOfInterestA`) | 28.13 km2 | 70.88 km2 |
| Marked not analysed (`notAnalysedA`) | 10.46 km2 | 4.56 km2 |
| Observed flood (`observedEventA`), in its own area | 0.41 km2 flooded area + 0.43 km2 flood trace | 0.86 + 0.09 km2 |
| Other layers | building, road and facility damage grades | **modelled** flood (3.73 km2) and **modelled** depth, from the FABDEM terrain model |

## Which features are flood

`observedEventA` holds three kinds of feature in one layer, so the comparison
selects by attribute, never by layer alone:

- **"Flooded area"** -- flood: water on the image.
- **"Flood trace"** -- **counted as flood** (user decision, 2026-11-18): the
  marks water left where it stood, so the reference stands for where water
  had been, not only where it was at the image time.
- **"6-Mass Movement"** (one polygon in each) -- a landslide. Neither flood nor
  dry: it is **removed from the domain**.

**`modelledEventA` and `floodDepthA` are never the reference.** They come from
a model on FABDEM, a 30 m terrain model, not from the image; comparing a
product with them is comparing two models.

## Where the comparison stops

Unlike a reference without one, an EMS product carries **where it looked**.
The comparison domain is

    AOI  -  the sea  -  JRC permanent water
         inside the reference's areaOfInterestA
         minus notAnalysedA  minus the mass-movement polygon

Outside the analysed area, "no flood mapped" means "not looked at", so it is
**out of the domain**, never dry. This matters because the thesis AOI is
deliberately larger than both references (to read the land cover and terrain
around the flood): over the 112.3 km2 AOI, AOI09 leaves a **17.65 km2**
domain with **0.841 km2** of reference flood, and AOI03 a **35.38 km2** domain
with **0.738 km2**. The domain area is reported beside every result.

## Limits Entro must carry

- **One image, one moment.** Each reference is a single post-event optical
  image at the end of the window; flood that had drained without leaving a
  trace is missing from it. Flood trace narrows that gap, it does not close it.
- **Optical.** The images cannot see through cloud or under dense canopy;
  optical products share that blind spot, SAR products do not.
- **A large not-analysed share.** In AOI09, 10.46 of 28.13 km2 (37%) is marked
  not analysed; what lies there is unknown.
- **A very small flood.** About 0.8 km2 in each domain. At 250 m (MODIS,
  VIIRS) that is about a dozen pixels, so their agreement figures carry very
  little information; at the 20 m of GFM, about 2,000 pixels.
- **Two references, two dates.** AOI03 is a day earlier and coarser than
  AOI09; where the two disagree, that disagreement is itself the reference
  uncertainty, not a product error.
- **Photo-interpreted, not field validated.** Every figure is "agreement with
  the reference", never accuracy.

## How the agents reach it

The reference is fixed per experiment, not searched for. Asked to compare the
flood products with a reference, the Python agent runs the agreement tool with
no config; the session's AOI picks the experiment -- the Kelani basin box gets
AOI02; the Gampola box gets AOI09 unless the user names `emsr851-aoi03` -- and
an AOI with no reference gets that answer plainly.

## Licence

The metadata gives the copyright notice by link only: the Copernicus EMS
"cite" page (Copernicus EMS 2025). Cite as that page says before publication.

---

Related: [[Agreement metrics for binary flood maps]] | [[UNOSAT FL20251128LKA flood reference]] | [[Copernicus EMS Rapid Mapping]] | [[Accuracy metrics payload fields]] | [[Uncertainty Analysis - MOC]]
