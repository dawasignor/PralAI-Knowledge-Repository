---
type: uncertainty
uncertainty_kind: knowledge
desc: Accuracy of BUI versus NDBI for built-up detection, the error classes each removes, and where BUI fails
aliases: [BUI vs NDBI, built-up index accuracy, why BUI, NDBI limitations, built-up false positives]
keywords: [BUI, NDBI, NDVI, built-up, impervious, bare soil, sand dune, arid, bare land, false positive, spectral index, sentinel-2, land cover accuracy]
sensor: Sentinel-2 MSI L2A
workflows: fetch_lulc_data
source_workflow: core/workflows/sentinel.py
source_docs: [docs/urban_region_compatibility.md, docs/arid_region.md]
context: head
retrieval: Answer why built-up surface is classified on BUI rather than NDBI, how accurate that classification is, and which surfaces it still gets wrong.
validation_status: derived from index definitions and literature; not validated on an arid AOI
status: draft
tags: [uncertainty, sentinel-2, optical, built-up, accuracy]
---

## Answer in one line

Built-up surface is classified on **BUI (= NDBI - NDVI)**, not on NDBI, because
BUI's separation margin against vegetation is 1.37 index units versus NDBI's
0.57 — wide enough to survive a threshold that was not tuned on the current
scene. BUI does **not** improve separation from bare soil or sand.

## What NDBI gets wrong on its own

NDBI = (SWIR16 - NIR08) / (SWIR16 + NIR08) is positive wherever a surface is
brighter in SWIR than in NIR. Concrete, asphalt and roofing are. So is anything
dry and mineral, and so is some vegetation:

| False positive for NDBI | Class | Removed by BUI? |
|---|---|---|
| Dry-season canopy, senescent or stressed crops | vegetated | **Yes** |
| Mixed 20 m pixels (part roof, part road, part tree) | vegetated | **Yes** |
| Bare and ploughed soil | mineral | No |
| Dry riverbed, exposed gravel bar | mineral | No |
| Sand and dune field | mineral | No |
| Harvested and fallow cropland | mineral | No |
| Rock outcrop | mineral | No |

A second NDBI problem is that the built-up/bare-soil threshold is not a
constant: it shifts with soil type, moisture, illumination and season. Because
Sentinel-2 scene selection reaches back up to 90 days for a usable image,
consecutive runs over one AOI can land in different seasons, so a threshold
tuned on one scene does not transfer.

## What BUI corrects, with numbers

BUI = NDBI - NDVI brings a third band (red) and a second physical property
(photosynthetic activity) into a decision NDBI makes on SWIR brightness alone.

Representative surface reflectances:

| Surface | NDVI | NDBI | BUI |
|---|---|---|---|
| Closed-canopy forest | 0.86 | -0.47 | **-1.33** |
| Concrete / built-up | 0.06 | 0.10 | **+0.04** |
| Sand dune | 0.07 | 0.09 | **+0.02** |

Forest-to-built-up separation: **1.37 BUI units**, against **0.57** on NDBI for
the same pair. That margin, not a better detector in isolation, is the reason
BUI is used.

BUI also resolves mixed pixels. At 20 m, most of a real city block is part
roof, part road, part tree; NDBI reads the mixture as ambiguous and lands near
zero, while BUI's vegetation term decides which way the mixture leans.

## Where BUI fails: bare soil and sand

**The correction switches itself off on exactly the surface that needed it.**
The NDVI subtraction only does work where NDVI is non-zero. Sand is not green,
so its NDVI is near zero and BUI ~= NDBI - 0 ~= NDBI.

Sand separates from concrete by **0.02 BUI units** — inside the noise of
atmospheric correction, let alone of an untuned threshold. Dune and concrete
are genuinely similar targets on a normalised SWIR/NIR difference: both bright,
dry, mineral and unvegetated.

This is a documented limitation of the NDBI family, not an implementation
artefact. As-syakur et al. (2012) introduced EBBI specifically because NDBI
cannot separate built-up from bare land, and built it around a **thermal** band
— an acknowledgement that the required information is absent from the SWIR/NIR
pair. Xu (2008) argues the same from the IBI direction: combine built-up,
vegetation and water indices rather than threshold one harder.

## Why the error direction matters more than its size

Built-up surface and bare sand have **opposite** hydrological behaviour.
Concrete is impervious and sheds nearly all rainfall to runoff; dune sand is
among the most permeable surfaces there is. Misreading dune as built-up does not
blur a runoff estimate — it **inverts** it, and inverts it upward, toward more
predicted flooding.

For an arid or semi-arid AOI, treat the BUI built-up fraction as an **upper
bound**, not an estimate.

The same asymmetry applies to a dry riverbed: it sits inside the exact channel a
flood model cares about, and fallow cropland surrounds it.

## Why NDBI is still returned alongside BUI

1. BUI is defined as NDBI minus NDVI, so returning only BUI hides one of its two
   terms. A surprising BUI value cannot be attributed to the built-up term or
   the vegetation term without both.
2. NDBI is what the published literature reports, so comparison against a study
   of the same city usually means comparing NDBI.
3. Both terms are already computed.

## Range caveat

BUI spans **[-2, 2]**, not [-1, 1], being a difference of two normalised
differences. Every other index in a `fetch_lulc_data` response is bounded to
[-1, 1]. Do not apply [-1, 1] normalisation to BUI.

## What BUI does not measure at all

BUI is a **surface** index answering "how much of this AOI is impervious
built-up material", which drives a runoff coefficient. It does not give building
count, building height, floors exposed below a flood depth, occupancy, or
whether a structure is residential, industrial or critical infrastructure. A
20 m pixel that is 80% impervious has the same BUI whether it holds one
warehouse or forty houses.

## Validation status

Not validated on an arid AOI. All of the above is derived from index definitions
and cited literature. The only region run is Shillong (humid subtropical, BUI
mean -0.72, 53% dense vegetation), which exercises the vegetated end of the
range and not the arid end.

## Sources

- Zha, Y., Gao, J., & Ni, S. (2003). "Use of normalized difference built-up
  index in automatically mapping urban areas from TM imagery."
  *International Journal of Remote Sensing*, 24(3), 583-594. Source of both NDBI
  and the NDBI-minus-NDVI formulation.
- As-syakur, A. R., et al. (2012). "Enhanced Built-Up and Bareness Index (EBBI)
  for Mapping Built-Up and Bare Land in an Urban Area." *Remote Sensing*, 4(10),
  2957-2970.
- Xu, H. (2008). "A new index for delineating built-up land features in
  satellite imagery." *International Journal of Remote Sensing*, 29(14),
  4269-4276.

---

Related: [[Uncertainty Analysis - MOC]] | [[BUI]] | [[NDBI]] | [[NDVI]] | [[Spectral Indices - MOC]] | [[Built-up fraction as an MCDM criterion]] | [[Sentinel-2 LULC uncertainty fields]] | [[Sentinel-2 C1 L2A]] | [[Entro - Uncertainty Analyser]] | [[Scene usability - SCL valid fraction]]
