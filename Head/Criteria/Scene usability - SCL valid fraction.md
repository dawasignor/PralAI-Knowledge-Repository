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

Default threshold in the implementation: **`min_valid_fraction = 0.7`**
(2026-09-22). It has been 0.7, then 0.9, then 0.8, and now 0.7 again -- the
history matters, because two of those moves were decided against measurements
that turned out to be false. See "Why the bar is 0.70" below.

**0.7 throughout, no step-down (2026-11-01).** The 0.7 → 0.6 → 0.5 step-down
of 2026-10-27 is removed. The tool runs at 0.7 whatever a caller sends (a
model had sent 0.8 for Bangkok) and records what was sent. When no scene
reaches 0.7, the land-cover shares for the ranking come from ESA WorldCover
instead. The lookback is fixed the same way at **90 days**: a model had
shortened it to 30 for Bangkok and found nothing above 0.7, while at 90 days
the 18 Aug 2026 scene passes at 0.733.

**The fraction is of the LAND, not of the bounding box.** The sea is excluded
before anything is counted, so a coastal AOI's valid fraction describes the
ground being analysed rather than being diluted by ocean that was never
observable land. See [[Excluding the sea from AOI statistics]].

**The threshold is judged on the land too -- since 2026-09-26.** Before that,
scene *selection* counted the whole window, sea included, while the *reported*
figure counted the land. A usually-clear sea voted on whether a scene passed:
Kelani-west was selected on 0.7777 and reports 0.7416; Bangkok on 0.8686 and
reports 0.8243. The probe and the confirmation now both count over the land
mask, so the accepted figure is the reported one. Re-run on both events, the
same scenes win; Bangkok's 18 Aug mosaic, the one that could have changed the
answer, is 0.6293 of its land, not 0.665. Attempt records carry
`valid_fraction_is_of: land`.

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

## Why the bar is 0.70 -- SETTLED 2026-09-22

The threshold is **0.7**. The 0.90 convention below is real and still worth
citing, but it was weighed against Kelani measurements that were wrong.

**The 0.8515 that justified the earlier 0.9 -> 0.8 move was an artefact and is
withdrawn.** It came from a windowing bug that *translated* an overhanging AOI
25 km east instead of truncating it, so it described drier ground nobody had
asked about. Re-measured on the correct window, the same 2025-10-31 scene gives
0.7287 over its own 0.904 of the AOI, and 0.7357 as a two-tile mosaic over the
whole of it. **Any Kelani valid fraction quoted above 0.74 predates that fix and
is void.**

**The distribution is bimodal, and that is the whole argument.** Sweeping every
acquisition date back 900 days from the event:

| Threshold | Scene selected | Age at event | Valid fraction |
|---|---|---|---|
| 0.7 | 2025-10-31 mosaic | 24 days | 0.7357 |
| 0.8, 0.85, 0.9 | 2025-03-20 mosaic | **249 days** | 0.9011 |

Across the fifty dates between them the best full-AOI mosaic is 0.7361 and the
next value above it is 0.9011 -- nothing occupies 0.74 to 0.90. So every
threshold in that band selects the same scene: **0.8 costs exactly as much
recency as 0.9 and guarantees less.** And 2025-03-20 is the driest point of the
Kelani year describing a catchment that floods at its wettest.

0.7 is therefore not a threshold chosen to admit a marginal scene. Below it
this catchment has no pre-event optical observation at all, and the choice is
between a baseline labelled 74% observed and no baseline. The cost -- up to 30%
of the AOI unobserved behind a figure that still reads like a whole-AOI mean --
is reported as an uncertainty section in the brief, not a footnote.

## The 0.90 convention it departs from

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
