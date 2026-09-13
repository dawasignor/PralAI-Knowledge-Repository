---
type: criterion
desc: Why AOI-level SCL valid fraction, not catalogue eo:cloud_cover, decides whether an optical scene is usable
workflows: fetch_lulc_data
context: head
status: draft
tags: [criterion, optical, cloud]
---

## What the criterion is

A Sentinel-2 scene is admitted into the analysis only if the fraction of AOI
pixels that are genuine surface observation clears a threshold. That fraction
is the **valid fraction**, and it is measured by reading the scene's Scene
Classification Layer (SCL) over the AOI footprint and counting the classes that
represent real ground:

| SCL class | Meaning |
|---|---|
| 4 | Vegetation |
| 5 | Not-vegetated |
| 6 | Water |
| 7 | Unclassified |
| 11 | Snow / ice |

Everything else — cloud (8, 9, 10), cloud shadow (3), dark-area pixels (2),
defective (1) and no-data (0) — is rejected and never reaches an index.

Default threshold in the implementation: **`min_valid_fraction = 0.9`** (raised from 0.7 on 2026-08-27).

## Why it replaces the catalogue's cloud figure

The obvious alternative is to sort the STAC catalogue by `eo:cloud_cover` and
take the clearest scene. This criterion exists because that measure is computed
over the **whole 110 km Sentinel-2 tile**, while the AOI is a few kilometres
across. Tile cloud is therefore a poor predictor of what sits over the study
area, and the two can diverge in either direction.

Measured over the Shillong AOI (`[91.80, 25.50, 91.95, 25.62]`):

| Scene date | Tile cloud % | AOI valid fraction |
|---|---|---|
| 2025-07-11 | 46.0 | 0.108 |
| 2025-06-09 | 30.9 | 0.328 |
| 2025-05-10 | 17.1 | 0.621 |

A 46%-cloudy tile left only 10.8% of the AOI usable. The probe is not redundant
with a catalogue sort — it is measuring a different thing. Tile cloud is kept
only as a cheap prefilter to avoid downloading hopeless scenes.

Modelled weather cloud cover fails the same way, and worse: see
[[ERA5 cloud does not predict Sentinel-2 AOI usability]], where a scene under a
97%-cloudy ERA5 cell had a 97%-clear AOI.

## How it is used in the research

Three distinct roles:

**1. Scene admission.** `fetch_lulc_data` walks backwards from the event date up
to `lookback_days` (default 90) and takes the **most recent scene that passes**,
not the clearest one. Land cover is a baseline condition, so recency beats
clarity: a three-week-old scene describes the catchment better than a cleaner
one from three months back.

**2. Provenance.** Every rejected candidate and its measured valid fraction is
recorded in `selection.attempts` and returned with the result. This is how a
reader knows *why* a three-month-old scene was used — the rejection table is
part of the evidence, not debug output.

**3. A qualifier on every statistic.** `valid_fraction` travels with each index
in `stats.coverage`. Every mean is a mean over the pixels that survived masking,
so an NDVI mean of 0.5693 at `valid_fraction = 0.62` is the mean of the 62% that
was visible, not of the AOI. Nothing downstream can distinguish a 62% mean from
a 12% mean unless it is told. Feeding this into
[[Entro - Uncertainty Analyser]] is open work — see
[[Uncertainty Analysis - MOC]].

## Why this matters for flood work specifically

A flood is a cloudy-season event, so the pre-event window is the worst window an
optical sensor has. Counted over the same AOI:

| Window before 2025-08-03 | Scenes | Tile cloud < 20% |
|---|---|---|
| 15 days | 5 | 0 |
| 90 days | 25 | 1 |
| Nov–Dec (dry season) | 16 | 13 |

This is the structural argument for [[SAR]] on the flood-extent side: radar is
not subject to this criterion at all. Measured in full in
[[SAR versus optical for flood extent]]. The optical path supplies the land-cover
baseline; it is not asked to see the flood. See [[Cloud compatibility]].

## The failure is a result

If nothing in the lookback window clears the threshold, the workflow **raises**
and names the best candidate rather than returning indices computed partly from
cloud. Lowering `min_valid_fraction` to force a number produces a different
measurement at lower confidence, not the same measurement — and over monsoon
terrain the failure itself is a finding about optical EO.

## Why the bar is 0.90 -- SETTLED

The threshold is **0.9**, following the de-spiking convention of retaining only
observations at **valid fraction >= 0.90**, with a loose global 3-sigma clip to
remove gross outliers. `min_valid_fraction` was raised from 0.7 on 2026-08-27.

Citation: Martins Jr, C., Capodici, F., Ciraolo, G., & De Marchis, M.,
"Shoreline compactness predicts reliability of Sentinel-1 water-area monitoring
across reservoirs worldwide", SSRN, doi:10.2139/ssrn.7226312. It benchmarks
Sentinel-1 detectors -- a single-polarisation VV Otsu threshold and a
dual-polarisation (VV+VH) SVM -- against JRC Global Surface Water.

**Carry the sensor caveat with the number.** That is SAR water-area monitoring;
this is optical Sentinel-2, where valid fraction is an SCL cloud mask, not a
water-detection quality flag. 0.90 is adopted here as a **quality-retention
convention, not a transferred measurement** -- defensible if stated, weak if
inherited silently.

The reasoning behind the higher bar, independent of the citation: LULC output
is not a terminal product. Its class fractions and index statistics feed the
MCDM scoring ([[Flood_mask_Dataset_MCDA]], [[Scoring criteria]]), so any error
is carried forward into a decision rather than being read and judged by a
person. At 0.7 up to 30% of the AOI is unobserved and the reported mean is an
extrapolation from the visible remainder.

**Cloud is not randomly distributed.** It sits over ridges, valleys and
convective cells -- exactly the terrain features that correlate with land cover
and with flood exposure. The missing fraction is therefore *systematically*
unlike the observed fraction, so the error is a **bias**, not noise that
averages out. That is the argument for setting the threshold by how much
unobserved area the score can tolerate, rather than by how often a scene
passes.

### The 3-sigma clip is not implemented

Only the retention threshold is in the code. The clip would touch every
statistic and interacts with the saturation counting, so it is recorded here
and in HANDOVER section 8c as outstanding, not silently assumed.

### What this costs

Most monsoon AOIs now fail at the defaults. Over Shillong the best scene in a
90-day window reaches 0.62, so a default run raises rather than returning a
number. That failure is the result. See
[[Partial AOI coverage in Sentinel-2 scenes]] for the other way a run can
refuse rather than degrade.

---

## Sources

**Verified — already in the repo's provenance chain (`docs/SOURCES.md`):**

- ESA. *Sentinel-2 Level-2A Algorithm Theoretical Basis Document*,
  S2-PDGS-MPC-ATBD-L2A. Defines the Scene Classification Layer and its classes.
- Drusch, M., Del Bello, U., Carlier, S., et al. (2012). "Sentinel-2: ESA's
  Optical High-Resolution Mission for GMES Operational Services."
  *Remote Sensing of Environment*, 120, 25–36.

**Candidate sources — NOT yet in `docs/SOURCES.md`. Verify the DOI and add the
entry before citing any of these in the thesis:**

- Main-Knorn, M., Pflug, B., Louis, J., et al. (2017). "Sen2Cor for Sentinel-2."
  *Proc. SPIE 10427, Image and Signal Processing for Remote Sensing XXIII*.
  The processor that generates SCL — needed to say what the mask actually is.
- Baetens, L., Desjardins, C., & Hagolle, O. (2019). "Validation of Copernicus
  Sentinel-2 Cloud Masks Obtained from MAJA, Sen2Cor, and FMask Processors."
  *Remote Sensing*, 11(4), 433. The accuracy of SCL as a cloud mask — the
  evidence needed to defend a threshold rather than assert one.
- Zhu, Z., & Woodcock, C. E. (2012). "Object-based cloud and cloud shadow
  detection in Landsat imagery." *Remote Sensing of Environment*, 118, 83–94.
  Fmask; the alternative masking approach if SCL proves insufficient.

**Open:** the 0.90 citation is a Sentinel-1 result used as a Sentinel-2
convention (see above). Baetens et al. remains the paper most likely to
corroborate the number *for optical data* independently, since it quantifies how
wrong the SCL mask itself is. The SSRN reference has not been independently
verified.

---

Related: [[Cloud compatibility]] | [[Sentinel-2 C1 L2A]] | [[Scoring criteria]] | [[SAR]] | [[Datasets-MOC]] | [[Entro - Uncertainty Analyser]] | [[Uncertainty Analysis - MOC]] | [[Sentinel-2 LULC uncertainty fields]] | [[Flood_mask_Dataset_MCDA]] | [[Sensitivity Analysis]]
