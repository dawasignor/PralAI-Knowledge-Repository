---
type: uncertainty
uncertainty_kind: response
desc: The uncertainty-bearing fields in a fetch_lulc_data response from Sentinel-2, with a sample payload
aliases: [Sentinel-2 uncertainty, S2 uncertainty, LULC uncertainty, fetch_lulc_data uncertainty, valid fraction]
keywords: [sentinel-2, sentinel 2, s2, lulc, land cover, uncertainty, valid_fraction, cloud mask, SCL, saturation, scene selection, optical]
sensor: Sentinel-2 MSI L2A
workflows: fetch_lulc_data
source_workflow: core/workflows/sentinel.py
context: head
retrieval: Answer questions about how much of the AOI was actually observed, how confident a Sentinel-2 land-cover statistic is, and which fields qualify it.
validation_status: fields and sample values taken from live runs over Shillong, Edinburgh and Tirupati
status: draft
tags: [uncertainty, sentinel-2, optical, lulc]
---

Every uncertainty signal `fetch_lulc_data` returns from a Sentinel-2 scene, and
where it sits in the response.

## Fields

| Field | Path | Meaning |
|---|---|---|
| `valid_fraction` | `indices.<index>.stats.coverage` | Share of AOI pixels that survived cloud/shadow masking. Every statistic beside it is computed over only these pixels. |
| `valid_pixels` / `total_pixels` | `indices.<index>.stats.coverage` | The counts behind `valid_fraction`. |
| `saturated_pixels` | `indices.<index>.stats.coverage` | Pixels sitting exactly on the index bound because a band clamped to 0. `null` means not measured; `0` means none found. |
| `saturated_fraction` | `indices.<index>.stats.coverage` | The same as a share of valid pixels. |
| `coverage` | `aoi` | Share of the requested bbox actually measured. `1.0` is full. `area_km2` is measured over the covered extent. |
| `bbox_requested` / `bbox_covered` | `aoi` | The bbox asked for, and the extent actually read. |
| `aoi_coverage` | `selection.attempts[]` | Coverage of each probed scene, including ones rejected for covering only part of the AOI. |
| `estimated` | `selection.attempts[]` | `true` when `aoi_valid_fraction` is a 1/N decimated estimate (scene rejected on the cheap probe); `false` when it was measured at full resolution. The accepted scene is always `false`. |
| `probe_valid_fraction` | `selection.attempts[]` | The decimated estimate that earned a full-resolution confirmation, kept beside the measurement it was checked against. |
| `probe_decimation` | `selection.attempts[]` | The decimation factor used for the probe. `1` means probes ran at full resolution. |
| `aoi_valid_fraction` | `scene` | Valid fraction of the scene that was accepted. |
| `scene_cloud_cover` | `scene` | Catalogue cloud percentage for the whole tile, not the AOI. |
| `days_before_start` | `scene` | Age of the accepted scene relative to the requested start date. |
| `scl_counts` | top level | Per-class pixel counts from the Scene Classification Layer, so the composition of the rejected pixels is visible. |
| `selection.attempts` | `selection` | Every scene probed and its rejection reason. |
| `selection.scenes_found` / `scenes_probed` | `selection` | How much of the lookback window was searched. |
| `min_valid_fraction` | `selection` | The threshold the run was held to. |
| `classes.caveat` | `indices.<index>.classes` | Text qualifier attached to a classification. |

Note: `scene.aoi_valid_fraction`, `scl_counts` and every index statistic are
always measured at full resolution. Only rejected candidates can carry an
estimate, and they are marked `estimated: true`.

Note: [[NMDI]] carries a **lower** `valid_fraction` than the other indices in
the same response. Its pixels are additionally masked where
`SWIR16 - SWIR22 <= 0.01` -- the index is unbounded below that gap.

## Sample response

```json
{"result_1": {
   "task": "fetch_lulc_data",
   "status": "success",
   "output": {
     "aoi": {"bbox": [91.8, 25.5, 91.95, 25.62],
             "bbox_requested": [91.8, 25.5, 91.95, 25.62],
             "bbox_covered": [91.8, 25.5, 91.95, 25.62],
             "coverage": 1.0,
             "area_km2": 203.7156},
     "scene": {"id": "S2C_T46RCP_20250510T043037_L2A",
               "datetime": "2025-05-10T04:41:...",
               "days_before_start": 85,
               "scene_cloud_cover": 17.135996,
               "aoi_valid_fraction": 0.6209,
               "processing_baseline": "05.11"},
     "indices": {
       "ndvi": {"range": [-1.0, 1.0],
                "stats": {"coverage": {"valid_fraction": 0.6209,
                                       "valid_pixels": 316209,
                                       "total_pixels": 509289,
                                       "saturated_pixels": 0,
                                       "saturated_fraction": 0.0},
                          "min": -0.1848, "max": 0.8692,
                          "mean": 0.5693, "median": 0.613,
                          "p10": 0.305, "p90": 0.7515},
                "classes": {"fractions": {"dense_vegetation": 0.5347},
                            "caveat": "Greenness bins, not land cover. ..."}}
     },
     "scl_counts": {"vegetation": 262719, "cloud_high_prob": 82309},
     "selection": {"lookback_days": 90,
                   "window": ["2025-05-05", "2025-08-03"],
                   "min_valid_fraction": 0.5,
                   "scenes_found": 13, "scenes_probed": 12,
                   "attempts": [{"scene_id": "...", "datetime": "...",
                                 "scene_cloud_cover": 46.0,
                                 "aoi_valid_fraction": 0.108,
                                 "rejected": "AOI valid fraction 0.108 below minimum 0.5"}]}
   }}}
```

Reading of the sample: the accepted scene is 85 days old and covers 62.09% of
the AOI. The NDVI mean of 0.5693 is the mean of 316209 pixels out of 509289.
No pixels saturated. Twelve scenes were probed; the listed rejection had a
46.0% tile cloud figure but only 10.8% of the AOI usable.

## Saturation present

Where a band clamps to zero the index reports its bound rather than a surface
value. Measured over Edinburgh (`[-3.30, 55.90, -3.10, 56.00]`, scene
`S2A_T30UVG_20260811T113338_L2A`), 339153 valid pixels:

```
index  min       max       p10       p90      saturated_pixels  saturated_fraction
ndvi   -1.0      1.0       0.2295    0.8712   70                0.000206
ndbi   -0.6598   1.0      -0.38      0.0265   68                0.000200
ndmi   -1.0      0.6448   -0.0656    0.3595   73                0.000215
nmdi   -1.0      0.9625    0.4793    0.68      4                0.000012
```

`min` and `max` carry the saturation; `p10` and `p90` do not. On the Shillong
and Tirupati AOIs every index reported `saturated_pixels: 0`.

## Failure response

No scene in the window clearing the threshold returns an error, not a degraded
statistic:

```json
{"result_1": {"task": "fetch_lulc_data",
              "output": null,
              "status": "error",
              "message": "ValueError: no Sentinel-2 scene reaches valid fraction 0.9 over the AOI within the lookback window (12 probed; best was S2C_T46RCP_20250510T043037_L2A at 0.6209 on 2025-05-10). Lower min_valid_fraction or raise lookback_days.",
              "error": {"stage": "execute_tasks", "error_type": "runtime_error"}}}
```

---

Related: [[Uncertainty Analysis - MOC]] | [[Partial AOI coverage in Sentinel-2 scenes]] | [[Scene usability - SCL valid fraction]] | [[Sentinel-2 C1 L2A]] | [[Entro - Uncertainty Analyser]]
