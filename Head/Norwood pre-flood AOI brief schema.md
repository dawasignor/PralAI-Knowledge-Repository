---
type: schema
desc: The JSON contract Norwood emits for a pre-flood AOI brief, and the rules that govern what each number may claim
aliases: [pre-flood AOI brief, norwood brief schema, pre flood brief, norwood output schema, pre-flood-aoi-brief]
keywords: [norwood, schema, output, pre-flood, AOI, brief, LULC, terrain, permanent water, comparison_basis, areal, co-location, DSM, stats-only, flood mapping outlook, findings, cannot_determine]
agent: norwood
context: head
retrieval: Answer what Norwood's pre-flood AOI brief contains, what each section means, and what a stats-only input does and does not allow it to claim.
source_of_truth: docs/norwood_preflood_brief.schema.json in langgraph-agents
validation_status: schema v1.0 supplied by the user 2026-09-22; produced for the Kelani 2025 event on the extended AOI [79.800, 6.783, 80.217, 7.083]
status: draft
tags: [schema, output, norwood, thesis]
---

> **AOI brief:** The area before the flood, and how a flood map over it will behave.

## What this is

The contract for **thesis output 2**: Norwood reporting to a human flood
analyst on what an AOI looked like *before* the flood, built from Monty's
cached statistics.

It consumes `monty.lulc`, `monty.permanent_water` and `monty.terrain` as
**summary statistics, class fractions and histograms only** -- no raster
access, no pixel-wise operations, no regridding.

## The AOI is the LAND inside the box, not the box

A bounding box is a rectangle and a coastline is not, so a coastal AOI contains
sea. **The sea is removed from every payload before Norwood sees it**, using
the Copernicus DEM Water Body Mask; `aoi.land` records what was taken out.
Lakes and rivers are kept -- they are catchment.

Three areas are in play and **only two are denominators**:

| Key | What it is | A denominator? |
|---|---|---|
| `aoi.bbox_area_km2` | the rectangle requested | **No.** Context only. |
| `aoi.area_km2` = `aoi.land_area_km2` | the land in it -- the reporting domain | **Yes** |
| `observation_basis.observed_area_km2` | that land, minus cloud and shadow | **Yes** |

Over the Kelani AOI the box is 1,536 km2 and the land is 1,321 km2. Dividing by
the box understates every fraction by 14% uniformly.

**Cloud and sea are different absences and are never added.** Cloud is an
observation failure over ground that exists; sea is ground outside the
analysis. `observation_basis` therefore describes the cloud gap alone, and sea
area comes from `aoi.land`, labelled excluded -- never "unobserved". See
[[Excluding the sea from AOI statistics]].

**A per-index mask is a denominator of its own.** [[NMDI]] is masked wherever
SWIR16 does not exceed SWIR22, so its observed area is smaller than every other
index's -- 949.46 km2 against 979.44 on the Kelani AOI. An NMDI fraction is
multiplied by NMDI's own observed area, not the scene-wide one. Checking this
against a single observed area produces false disagreements at the ratio of the
two, which is how an earlier revision of the arithmetic checker accused a
correct brief three separate times.

## The rule the whole document turns on

**Areal agreement is not spatial agreement.**

Every cross-layer statement declares `comparison_basis`, and with stats-only
inputs that value is always `areal`. Two layers each reporting three percent
water is not evidence that they agree about *where* the water is.
`co_location_verified` is `false` and cannot become true from these inputs --
verifying it needs the rasters, which Norwood does not have.

This is the difference between "both layers see about this much water" and
"both layers see water in the same place". The second claim would let an
analyst conclude the products corroborate each other. They do not, and nothing
in the numbers can say whether they do.

## What each section is for

| Section | Answers |
|---|---|
| `report_header` | The one sentence an analyst can read alone, plus what most limits confidence |
| `aoi` | The requested box, and whether the layers agree on its area |
| `input_integrity` | **Runs first.** Footprint, recency, scene selection. A failure here *invalidates* what follows rather than annotating it |
| `observation_basis` | What share of the AOI the composition actually describes, and whether the gap is biased |
| `surface_composition` | The pre-flood core -- as a spectral stratification, with `is_land_cover: false` stated outright |
| `composition_reliability` | Whether the composition is trustworthy: entropy, proxy agreement, distribution shape |
| `hydrography` | The dry-water reference an analyst subtracts from a later flood extent |
| `terrain_setting` | Elevation and slope, with the DSM caveat attached |
| `landscape_summary` | The AOI as a place, in plain language |
| `flood_mapping_outlook` | Forward-looking: what a flood mask over this AOI will systematically get wrong |
| `event_commentary` | Comments on every figure with respect to the flood event: at most three points each, none forced |
| `findings` | Ranked, quantified, readable aloud |
| `cannot_determine` | **Required.** What an analyst will reasonably ask that these inputs cannot answer |
| `analyst_actions`, `data_integrity` | What to do, and what was wrong with the inputs |

**`data_integrity` declares method, not only defects.** Two things are entered
there even when nothing is wrong, because a reader who cannot see them cannot
audit the figures:

- `MOSAIC_SINGLE_DATATAKE` (or its multi-datatake equivalent) whenever the
  composition came from more than one scene -- with the member tiles and
  whether they are one pass. Take that from `scene.single_datatake` and
  **never from the timestamp span**: tile products carry the time of their own
  cut, so two tiles of one pass are always some seconds apart.
- `SEA_EXCLUDED_FROM_ALL_LAYERS` whenever `aoi.land.excluded_km2` is above
  zero -- with the classes removed, the area, and its share of the box. An
  analyst comparing these areas to the bounding box will find a discrepancy,
  and needs to be told why rather than left to guess.

## Rules that decide what a number may say

- **Nothing is a bare figure.** Method and caveat travel inline. The audience is
  a human analyst, not a downstream solver.
- **Several proxies for one theme are reported as a range** unless their
  `spread_ratio` is below 2. Picking the convenient proxy is exactly the
  failure the rule prevents.
- **A class break not read from the payload is `inferred_from_fractions`**, and
  `breaks_documented_by_monty` is the flag that says so.
- **A DSM is not a DTM.** Copernicus GLO-30 is a surface model; canopy and
  building heights inflate slope over vegetated and built ground.
- **Slope and elevation distributions are not a susceptibility surface.** They
  say a floodplain exists, not where it is.
- **`is_land_cover` is false**, and Monty's own caveat string is carried
  **verbatim** rather than paraphrased.

## The schema

```json
{
  "schema": "norwood/pre-flood-aoi-brief",
  "version": "1.0",
  "contract": {
    "role": "Norwood reports to a human flood analyst on the pre-flood character of an AOI.",
    "consumes": ["monty.lulc", "monty.permanent_water", "monty.terrain"],
    "access": "summary statistics, class fractions and histograms only. No raster access, no pixel-wise operations, no regridding.",
    "hard_rule": "Every cross-layer statement declares comparison_basis. With stats-only inputs this is always 'areal'. Areal agreement is not spatial agreement and must never be reported as co-location.",
    "audience": "human analyst, not a downstream solver. Numbers carry method and caveat inline; nothing is reported as a bare figure."
  },

  "report_header": {
    "report_id": "<string>",
    "aoi_label": "<string>",
    "generated_at": "<iso8601>",
    "event_window": {"start": "<date>", "end": "<date|null>"},
    "inputs": [
      {"name": "<monty payload name>", "cached_at": "<iso8601>", "summary": "<monty summary string>"}
    ],
    "verdict": "<one sentence the analyst can read alone>",
    "confidence": "<high|moderate|low>",
    "confidence_limiter": "<the single biggest thing degrading confidence>"
  },

  "aoi": {
    "bbox_requested": "<[minlon,minlat,maxlon,maxlat]>",
    "area_km2": "<float>",
    "area_km2_by_source": {"<payload>": "<float>"},
    "area_disagreement_pct": "<float>",
    "from": "each payload's aoi block"
  },

  "input_integrity": {
    "note": "Run before any statistic is reported. A failure here invalidates the sections below rather than annotating them.",
    "footprint": {
      "per_layer": [
        {
          "layer": "<string>",
          "bbox_requested": "<bbox>",
          "bbox_delivered": "<bbox>",
          "overlap_with_requested": "<float 0-1>",
          "offset_deg": {"lon": "<float>", "lat": "<float>"},
          "status": "<aligned|shifted|partial>"
        }
      ],
      "min_pairwise_overlap": "<float 0-1>",
      "common_extent_frac": "<float 0-1>",
      "blocking": "<bool>",
      "from": "payload.aoi.bbox_requested vs bbox_covered, and grid.transform"
    },
    "recency": {
      "scene_datetime": "<iso8601>",
      "days_before_event_start": "<int>",
      "season_at_scene": "<string|null>",
      "baseline_role": "<dry_reference|near_event|stale>",
      "caveat": "<why this lag does or does not represent the pre-flood state>"
    },
    "scene_selection": {
      "scenes_found": "<int>",
      "scenes_probed": "<int>",
      "scenes_rejected": "<int>",
      "rejection_reasons": {"<reason>": "<int>"},
      "clear_scene_rate": "<float, accepted / probed>",
      "best_rejected_alternative": {
        "scene_id": "<string>",
        "why_rejected": "<string>",
        "would_have_been_better_because": "<string|null>"
      },
      "analyst_note": "<whether the selection rule cost the analyst a better scene>",
      "from": "payload.selection.attempts"
    }
  },

  "observation_basis": {
    "note": "What share of the AOI these composition numbers actually describe, and whether the unobserved share is random.",
    "valid_fraction": "<float 0-1>",
    "observed_area_km2": "<float>",
    "unobserved_area_km2": "<float>",
    "unobserved_cause": {"<scl class>": "<float fraction of scene>"},
    "gap_randomness": "<unknown_stats_only>",
    "directional_bias_warning": "<e.g. cloud and cirrus concentrate over high ground, so upland cover is likely under-represented in the composition below>",
    "masking_policy": {
      "masked_classes": ["<scl class>"],
      "retained_classes": ["<scl class>"],
      "asymmetry_flag": "<string|null>"
    },
    "from": "payload.indices.*.stats.coverage and payload.scl_counts"
  },

  "surface_composition": {
    "note": "The pre-flood LULC core. Reported as a greenness/spectral stratification with an explicit statement of what it is not.",
    "is_land_cover": false,
    "stratification": {
      "basis": "<index name>",
      "class_breaks": "<[floats]>",
      "breaks_documented_by_monty": "<bool>",
      "breaks_source": "<stated|inferred_from_fractions>",
      "classes": [
        {
          "label": "<string>",
          "fraction_of_observed": "<float 0-1>",
          "area_km2": "<float>",
          "plausible_land_cover": ["<string>"],
          "separability": "<high|moderate|low>"
        }
      ],
      "caveat": "<monty's own caveat string, carried verbatim>"
    },
    "index_summary": [
      {
        "index": "<ndvi|ndbi|bui|ndmi|mndwi|nmdi>",
        "mean": "<float>", "median": "<float>", "p10": "<float>", "p90": "<float>", "std": "<float>",
        "modal_bin": "<[lo,hi]>",
        "modal_bin_share": "<float 0-1>",
        "skew_proxy": "<float, (mean-median)/std>",
        "tail_of_interest": {
          "rule": "<e.g. ndvi < 0.4>",
          "fraction": "<float>",
          "area_km2": "<float>",
          "why_it_matters": "<the non-vegetated minority is where water, bare ground and settlement live>"
        }
      }
    ],
    "thematic_signals": [
      {
        "theme": "<settlement|bare_ground|open_water|crop_or_grass|closed_canopy|canopy_moisture>",
        "estimates": [
          {"proxy": "<rule>", "fraction": "<float>", "area_km2": "<float>"}
        ],
        "spread_ratio": "<float, max/min across proxies>",
        "consensus": "<strong|weak|contradictory>",
        "reported_value": "<float|null>",
        "reporting_rule": "report a single value only when spread_ratio < 2; otherwise report the range"
      }
    ]
  },

  "composition_reliability": {
    "heterogeneity": {
      "shannon_entropy_nats": "<float>",
      "evenness": "<float 0-1, H / ln(n_classes)>",
      "interpretation": "<single stratum dominates | mixed landscape | highly fragmented>",
      "why_it_matters": "a homogeneous AOI means one cover type governs flood detectability everywhere; a fragmented one means per-zone reasoning is required",
      "from": "class fractions"
    },
    "proxy_agreement": [
      {"theme": "<string>", "spread_ratio": "<float>", "verdict": "<constrained|weakly_constrained|unconstrained>"}
    ],
    "distribution_shape": {
      "index": "<string>",
      "modality": "<unimodal|bimodal|multimodal>",
      "basis": "histogram peak count",
      "implication": "<bimodality suggests two distinct cover regimes; unimodality suggests one>"
    },
    "overall": "<high|moderate|low>"
  },

  "hydrography": {
    "note": "The dry-water reference the analyst subtracts from any later flood extent.",
    "occurrence_classes": [
      {"label": "<permanent|seasonal|ephemeral|never>", "threshold_pct": "<float>", "area_km2": "<float>", "fraction": "<float>"}
    ],
    "independent_water_estimates": [
      {"method": "<jrc_occurrence_gte_90|mndwi_gt_0|scl_water|index_class>", "area_km2": "<float>", "extent": "<which layer's footprint>"}
    ],
    "estimate_spread_ratio": "<float>",
    "comparison_basis": "areal",
    "co_location_verified": false,
    "recommended_reference": {"method": "<string>", "rationale": "<string>"},
    "look_alike_floor": {
      "note": "non-flood surfaces that will read as water and set a commission floor",
      "seasonal_plus_ephemeral_km2": "<float>",
      "implication": "<a later flood mask must exceed this before any of it is new water>"
    }
  },

  "terrain_setting": {
    "model_type": "<DSM|DTM>",
    "dsm_caveat": "<if DSM: canopy and building heights inflate slope and any derived drainage over vegetated ground>",
    "elevation_m": {
      "min": "<float>", "p10": "<float>", "median": "<float>", "mean": "<float>", "p90": "<float>", "max": "<float>",
      "relief_m": "<float>",
      "low_lying_fraction": {"rule": "<below first histogram break>", "value": "<float>", "area_km2": "<float>"},
      "negative_elevation_present": "<bool>"
    },
    "slope_deg": {
      "mean": "<float>", "median": "<float>", "p90": "<float>", "max": "<float>",
      "frac_lt_5": "<float>", "frac_gt_15": "<float>",
      "class_breaks_deg": "<[floats]>",
      "breaks_documented_by_monty": "<bool>",
      "classes": {"<label>": "<float>"},
      "evenness": "<float 0-1>"
    },
    "floodplain_indication": {
      "basis": "elevation and slope distributions only",
      "low_gradient_low_lying_signal": "<strong|moderate|weak>",
      "caveat": "slope and elevation distributions are not a susceptibility surface; they indicate that a floodplain exists, not where it is",
      "comparison_basis": "areal"
    }
  },

  "landscape_summary": {
    "archetype": "<forested_upland|mixed_rural|periurban|urban_delta|agricultural_lowland|...>",
    "archetype_confidence": "<high|moderate|low>",
    "one_paragraph": "<plain-language description of the AOI as a place, written for the analyst>",
    "dominant_control": "<the single surface or terrain property that will govern flood behaviour and detection here>"
  },

  "flood_mapping_outlook": {
    "note": "Forward-looking. What the analyst should expect when a flood mask for this AOI arrives.",
    "by_sensor_family": [
      {
        "family": "<sar_c_band|sar_l_band|optical_multispectral>",
        "expected_performance": "<good|degraded|poor>",
        "dominant_limitation": "<string>",
        "expected_bias": "<omission|commission|mixed>",
        "affected_area_share": "<float 0-1>",
        "evidence": ["<path into this report>"],
        "confidence": "<float 0-1>"
      }
    ],
    "acquisition_outlook": {
      "optical_clear_scene_rate": "<float>",
      "implication": "<whether optical should be treated as an opportunistic or a dependable source here>"
    },
    "commission_risk_floor_km2": "<float>",
    "omission_risk_share": "<float 0-1>",
    "headline_for_analyst": "<one sentence on what a flood extent from this AOI will systematically get wrong>"
  },

  "event_commentary": {
    "note": "Comments on EVERY figure the inputs yield, with respect to this flood event (user 2026-11-02). At most three points per figure, crisp; a figure with nothing to say for this event has an empty list -- never a forced point.",
    "event": "<the event and window these comments are about, from the session header>",
    "figures": [
      {
        "figure": "<rain_hyetograph|ndvi_class|bui|slope_class|elevation|water_class|worldcover_classes>",
        "from": "<the payload the figure is drawn from>",
        "points": ["<what the figure shows that matters for THIS flood, a number copied with its unit>"]
      }
    ]
  },

  "findings": [
    {
      "id": "<slug>",
      "rank": "<int, 1 = most important>",
      "severity": "<blocking|high|medium|info>",
      "statement": "<plain language, quantified, readable aloud in a briefing>",
      "evidence": ["<json path into this report>"],
      "comparison_basis": "<areal|single_layer>",
      "confidence": "<float 0-1>",
      "so_what": "<what the analyst should do or expect differently because of this>"
    }
  ],

  "cannot_determine": [
    {
      "question": "<what the analyst would reasonably ask that Norwood cannot answer>",
      "reason": "<stats_only|layer_absent|footprint_mismatch|pre_event_data_cannot_constrain>",
      "would_be_resolved_by": "<the specific additional Monty output or layer>",
      "priority": "<high|medium|low>"
    }
  ],

  "analyst_actions": [
    {"action": "<string>", "rationale": "<string>", "blocking": "<bool>"}
  ],

  "data_integrity": [
    {"code": "<UPPER_SNAKE>", "severity": "<blocking|high|medium|low>", "layer": "<string>", "detail": "<string>"}
  ]
}
```

---

Related: [[Monty data workflows]] | [[Weather output schema]] | [[Agent Norwood - Satellite expert]] | [[Scene usability - SCL valid fraction]] | [[SAR versus optical for flood extent]] | [[Copernicus DEM GLO-30]] | [[JRC Global Surface Water]] | [[Sentinel-2 C1 L2A]] | [[NRT products]]
