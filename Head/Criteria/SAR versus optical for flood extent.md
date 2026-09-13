---
type: knowledge
desc: Why SAR maps flood extent and optical cannot - cloud obscures the optical sensor exactly during the event
aliases: [SAR vs optical, radar vs optical, why SAR for floods, optical cloud limitation, can Sentinel-2 map floods, Sentinel-1 vs Sentinel-2]
keywords: [SAR, radar, optical, Sentinel-1, Sentinel-2, flood extent, flood mapping, cloud cover, cloud penetration, all-weather, C-band, backscatter, revisit, day-night, inundation, water detection]
agent: norwood
sensor: [Sentinel-1 C-band SAR, Sentinel-2 MSI L2A]
workflows: fetch_lulc_data
context: head
retrieval: Answer why flood extent is mapped with radar rather than optical imagery, what the cloud limitation costs in practice, and where optical is still the right instrument.
validation_status: cloud-limitation figures measured on 77 live Sentinel-2 scenes across three AOIs; SAR performance figures are from the literature, not reproduced here
status: draft
tags: [sar, optical, sentinel-1, sentinel-2, flood-extent, cloud, sensor-choice]
---

## Answer in one line

A flood is a cloudy-weather event, so the optical sensor is blind precisely when
the flood is on the ground. C-band SAR penetrates cloud and works at night, so
it is the instrument for **flood extent**; optical supplies the **pre-event
land-cover baseline** the flood arrived on.

## The physical difference

| | Optical (Sentinel-2 MSI) | SAR (Sentinel-1 C-band) |
|---|---|---|
| Energy source | Reflected sunlight — passive | Its own transmitted microwave pulse — active |
| Wavelength | 0.44–2.2 um | ~5.6 cm (C-band) |
| Cloud | **Blocked.** Water droplets scatter at these wavelengths | **Penetrates.** Wavelength is far longer than a droplet |
| Night | Cannot operate | Unaffected |
| Water signal | Low NIR reflectance; MNDWI, NDWI | **Specular reflection** — smooth water reflects the pulse away from the sensor and returns near-zero backscatter, appearing dark |
| Main confusions | Cloud shadow, terrain shadow, turbid water | Radar shadow, smooth dry surfaces (tarmac, sand), wind-roughened water |

The specular-reflection mechanism is why open water is unusually easy for SAR: a
calm water surface is one of the few natural targets that returns almost nothing,
so it separates from land by a wide margin rather than by a tuned threshold.

## What the cloud limitation costs, measured

Not asserted — measured on this project's own AOIs, 77 live Sentinel-2 scenes.

**On the day of the flood.** Tirupati, main event 19 November 2021: the
Sentinel-2 scene acquired on the event date had an AOI valid fraction of
**0.0860**. Under 9% of the study area was observable. The optical sensor saw
almost nothing of the flood it was there to record.

**Across a whole pre-event season.** Shillong, 90-day window ending 2025-08-03:
**0 of 13** scenes reached a 0.9 valid fraction. The best was 0.62.

**Even where optical does well, the good scenes are seasonal.** Edinburgh
returned 13 of 40 scenes above 0.9 — but Edinburgh is temperate and coastal, not
a monsoon catchment during a flood.

Counted over the Shillong AOI, by window:

| Window before 2025-08-03 | Scenes | Tile cloud < 20% |
|---|---|---|
| 15 days | 5 | 0 |
| 90 days | 25 | 1 |
| Nov–Dec (dry season) | 16 | 13 |

The dry-season row is the point: the imagery is available, just never when a
flood is happening. **The cloud is not bad luck, it is the same weather system
that caused the flood.**

## Why no workaround inside the optical domain works

Three have been tried or considered in this project, and all fail for the same
reason — they change *which* cloudy scene is chosen, not whether cloud is there:

- **Sorting the catalogue by scene cloud cover.** `eo:cloud_cover` is computed
  over a 110 km tile; a 46%-cloudy tile gave a 10.8%-clear AOI. See
  [[Scene usability - SCL valid fraction]].
- **Pre-screening on modelled weather cloud.** Tested and rejected: a scene
  under a 97%-cloudy ERA5 cell had a 97%-clear AOI. See
  [[ERA5 cloud does not predict Sentinel-2 AOI usability]].
- **Compositing across dates.** Valid for a land-cover baseline, meaningless for
  a flood: the extent changes hour to hour, so a composite of several dates
  describes no moment in particular.

## The division of labour this project uses

- **Optical (implemented):** pre-event land-cover baseline — vegetation, built-up
  fraction, permanent water context. Land cover changes slowly, so a scene from
  weeks earlier still describes the catchment. This is what `fetch_lulc_data`
  does, and its lookback window exists precisely because the pre-event period is
  the worst period optical has.
- **SAR (not implemented):** flood extent during the event, and soil moisture.
  Recorded in `docs/SOURCES.md` as "the correct instrument ... not ruled out,
  just not built".
- **Permanent water baseline:** JRC Global Surface Water, so floodwater is not
  confused with a lake that is always there. See [[JRC Global Surface Water]].

## Where optical is still the right instrument

SAR is not uniformly better, and the note should not be read that way:

- **Land cover and vegetation state.** NDVI and the rest have no SAR equivalent
  of comparable maturity; photosynthetic activity is an optical measurement.
- **Interpretability.** An analyst can look at an optical scene. SAR backscatter
  needs training to read.
- **Flooded vegetation is hard for both.** Under a canopy, plain C-band
  backscatter loses the water; the double-bounce mechanism that recovers it needs
  polarimetric treatment (Tsyganskaya et al. 2018; Plank et al. 2017).
- **Smooth dry surfaces mimic water in SAR** — tarmac, dry sand and salt flats
  are also specular, which is the SAR analogue of the bare-soil problem in
  [[BUI over NDBI - built-up index accuracy]].
- **Wind roughens water** and raises its backscatter, so a windy flood can be
  under-detected. See [[Wind compatibility]] and [[Bragg Scattering Criterion]].

## Sources

**Already in this vault** (see [[SAR]] for the full list):

- Misra, A. et al. (2025). "Mapping global floods with 10 years of satellite
  radar data." *Nature Communications*, 16(1), 5762.
  doi:10.1038/s41467-025-60973-1. Ten years of global flood mapping from radar —
  the demonstration that SAR carries operational flood mapping at scale.
- Amitrano, D., Di Martino, G., Di Simone, A., & Imperatore, P. (2024). "Flood
  Detection with SAR: A Review of Techniques and Datasets." *Remote Sensing*,
  16(4), 656. doi:10.3390/rs16040656. Review covering the all-weather argument
  and the standard detection families.
- Tsyganskaya, V., Martinis, S., Marzahn, P., & Ludwig, R. (2018). "SAR-based
  detection of flooded vegetation — a review of characteristics and approaches."
  *International Journal of Remote Sensing*, 39(8), 2255–2293. The canopy case.
- Plank, S., Jüssi, M., Martinis, S., & Twele, A. (2017). "Mapping of flooded
  vegetation by means of polarimetric Sentinel-1 and ALOS-2/PALSAR-2 imagery."
  *International Journal of Remote Sensing*, 38(13), 3831–3850.
- Roth, F. et al. (2025). "Evaluating the robustness of Bayesian flood mapping
  with Sentinel-1 data: a multi-event validation study." *Science of Remote
  Sensing*, 11, 100210. doi:10.1016/j.srs.2025.100210.

**Candidate sources for the optical-cloud limitation specifically — NOT yet in
`docs/SOURCES.md`. Verify before citing in the thesis:**

- Notti, D., Giordan, D., Caló, F., Pepe, A., Zucca, F., & Galve, J. P. (2018).
  "Potential and Limitations of Open Satellite Data for Flood Mapping."
  *Remote Sensing*, 10(11), 1673. Directly compares optical and SAR open data for
  flood mapping and quantifies the cloud constraint — the closest single
  reference for the claim this note makes.
- Schumann, G. J.-P., & Moller, D. K. (2015). "Microwave remote sensing of flood
  inundation." *Physics and Chemistry of the Earth*, 83–84, 84–95. The standard
  statement of why microwave is the flood-inundation instrument.

**Also relevant, already recorded:** the Martins Jr et al. SSRN preprint cited in
`docs/SOURCES.md` for the 0.90 retention rule benchmarks Sentinel-1 water
detectors — a single-polarisation VV Otsu threshold and a dual-polarisation
(VV+VH) SVM — against JRC Global Surface Water. See
[[Scene usability - SCL valid fraction]] for the sensor-transfer caveat attached
to that citation.

## Status in this project

SAR is **not implemented**. Every flood-extent claim the system can currently
make rests on optical data that, by the measurements above, frequently cannot
see the event. Treat that as a stated limitation, not a gap to paper over.

---

Related: [[SAR]] | [[Cloud compatibility]] | [[Wind compatibility]] | [[Bragg Scattering Criterion]] | [[Scene usability - SCL valid fraction]] | [[ERA5 cloud does not predict Sentinel-2 AOI usability]] | [[Sentinel-2 C1 L2A]] | [[JRC Global Surface Water]] | [[NRT products]] | [[Agent Norwood - Satellite expert]] | [[Datasets-MOC]]
