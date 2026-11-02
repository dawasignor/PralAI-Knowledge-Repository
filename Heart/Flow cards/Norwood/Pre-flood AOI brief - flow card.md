---
type: flow-card
desc: The procedure Norwood follows for the Pre-flood AOI brief analysis
aliases: []
keywords:
- flow card
- pre_flood_aoi_brief
- Norwood
agent: norwood
flow: pre_flood_aoi_brief
workflows: pre_flood_aoi_brief
context: heart
retrieval: The procedure overlaid on Norwood's prompt when Argus routes the Pre-flood AOI brief analysis. Loaded as an instruction by core/spec.py.
validation_status: moved word for word from agents/norwood/workflows/pre_flood_aoi_brief.md on 2026-10-27; byte check against the running card
status: draft
tags:
- flow-card
- heart
- norwood
---

# Pre-flood AOI brief - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. The evidence is in [[Norwood pre-flood AOI brief schema]], fetched as data at run time. Routing and inputs (`select_when`, `inputs_required`, `consumes`) stay in `agents/norwood/workflows/pre_flood_aoi_brief.md`.

## Flow Card

Report to a **human flood analyst** on the pre-flood character of an AOI, from
Monty's cached statistics. Emit one JSON object matching
`norwood/pre-flood-aoi-brief` v1.0.

**This card is longer than the usual flow-card budget on purpose.** An output
contract is procedure, not evidence, and the guidance to keep a card short is
there to stop figures and citations leaking in. No number appears below.

### What you are given, and what you are not

You consume `monty.lulc`, `monty.permanent_water` and `monty.terrain` as
**summary statistics, class fractions and histograms only**. You have no raster
access, no pixel-wise operations and no regridding.

**The hard rule, and it governs the whole report.** Every cross-layer statement
declares `comparison_basis`. With stats-only inputs that value is always
`"areal"`. *Areal agreement is not spatial agreement.* Two layers reporting 3%
water is not evidence they agree about **where** the water is, and must never be
written as co-location. `co_location_verified` is `false` and stays false.

### Order of work

1. **`input_integrity` first.** Footprint, recency, scene selection. A failure
   here **invalidates** the sections below rather than annotating them -- set
   `blocking` and say so in `data_integrity`, do not proceed as though the
   numbers stand.

   **A composition built from more than one scene is always declared, even
   when it is sound.** If the payload's `scene.is_mosaic` is true, record the
   member tiles, `scene.single_datatake` and `scene.datatakes` under
   `input_integrity.scene_selection`, and give it a `data_integrity` entry --
   severity `low` when `single_datatake` is true, `medium` when it is false or
   cannot be established. A mosaic is a fact about how the observation was
   assembled, not merely a defect to raise when something is wrong, and a
   reader who cannot see it from the brief cannot audit the footprint. Take
   the one-pass-or-not judgement from `scene.single_datatake` and **never from
   the timestamp span**: tile products are cut from a continuous datatake and
   each carries the time of its own cut, so two tiles of one pass are always
   some seconds apart.

   **Area excluded from the AOI is declared the same way, and for the same
   reason.** If `aoi.land` shows `excluded_km2` above zero, give it a
   `data_integrity` entry naming the classes removed, the area, and its share
   of the bounding box; state the land area as the denominator every figure
   below uses. Severity `low` when the excluded share is under a twentieth of
   the box, `medium` above it -- at that size a reader comparing your areas to
   the bounding box will find they do not reconcile, and needs to be told why
   rather than left to guess. **A domain that was narrowed silently is a
   domain the reader cannot audit**, and "the sea was removed" is a fact about
   the method, not a defect to raise only when something is wrong.
2. **`observation_basis`.** What share of the LAND the composition actually
   describes. An unobserved share is not random: cloud and cirrus concentrate
   over high ground, so state the likely directional bias rather than treating
   the gap as neutral.
3. **`surface_composition`.** `is_land_cover` is `false`. This is a greenness
   and spectral stratification, and Monty's own caveat string is carried
   **verbatim** -- do not paraphrase it.
4. **`composition_reliability`**, `hydrography`, `terrain_setting`.
5. **`landscape_summary`** and **`flood_mapping_outlook`** -- the forward-looking
   half, written for someone who will receive a flood mask later.
6. **`findings`**, ranked, then `cannot_determine`, `analyst_actions`,
   `data_integrity`.

### Rules that decide what a number may say

- **Nothing is a bare figure.** Every value carries its method and its caveat
  inline. The audience is a human analyst, not a solver.
- **Multiple proxies for one theme are reported as a range** unless
  `spread_ratio < 2`. Picking the convenient one is the failure this rule
  exists to prevent.
- **A class break you did not read from the payload is `inferred_from_fractions`,
  not `stated`.** `breaks_documented_by_monty` is the flag that says which.
- **A DSM is not a DTM.** Copernicus GLO-30 is a surface model: canopy and
  building heights inflate slope over vegetated and built ground. Say so in
  `dsm_caveat` whenever slope is used for anything.
- **Slope and elevation distributions are not a susceptibility surface.** They
  indicate that a floodplain exists, not where it is.
- **`cannot_determine` is a required section, not a fallback.** An analyst
  reading this will want things stats-only inputs cannot give; naming them is
  part of the job, and each one names the specific Monty output that would
  resolve it.

### The AOI is the LAND inside the bounding box, not the bounding box.

A bounding box is a rectangle and a coastline is not, so a coastal AOI contains
sea. **The sea has already been removed from every payload you receive**, using
the Copernicus DEM Water Body Mask; `aoi.land` records exactly what was taken
out. Lakes and rivers were NOT removed -- they are part of the catchment, and
the river's own channel is one of them.

Three areas are in play and only two are denominators:

| Key | What it is | A denominator? |
|---|---|---|
| `aoi.bbox_area_km2` | the rectangle that was requested | **No.** Context only. |
| `aoi.area_km2` (= `aoi.land_area_km2`) | the land in it -- the reporting domain | **Yes** |
| `observation_basis.observed_area_km2` | that land, minus cloud and shadow | **Yes** |

Report the box area and the excluded sea once, in `aoi`, so a reader can see
what the rectangle contained. **Never divide anything by the box.** Over a
coastal AOI the two differ by the whole sea -- on the Kelani extension, 1,536
km2 of box against 1,321 km2 of land -- and using the box understates every
fraction by 14% uniformly.

**Cloud and sea are different absences; never add them.** Cloud is an
observation failure over ground that exists; sea is ground outside the
analysis. The sea is already out of every denominator, so `observation_basis`
describes the cloud gap alone. Sea area comes from `aoi.land`, labelled
excluded -- never "unobserved".

### Two denominators live in this document. Do not mix them.

`fraction` and `area_km2` are the same quantity twice, and nothing in the
schema forces them to agree -- so an inconsistent pair is still valid against
it. Which area a fraction is *of* decides everything:

| Section | Fraction is of | Multiply by |
|---|---|---|
| `surface_composition` (`fraction_of_observed`, `tail_of_interest`, `thematic_signals`) | the **observed land** -- cloud and shadow are excluded | `observation_basis.observed_area_km2` |
| `hydrography.occurrence_classes` | the **whole land area** -- JRC surface water has no cloud mask | `aoi.area_km2` |
| `terrain_setting` slope and elevation fractions | the **whole land area** -- the DEM has no cloud mask | `aoi.area_km2` |

**A denominator follows a figure's SOURCE, not the section it is written in.**
A JRC or DEM figure quoted inside `surface_composition.thematic_signals` as a
cross-check stays a share of the **whole land area**, because those layers
still carry no cloud mask -- it does not become observed-relative by being
quoted there. Only figures derived from the Sentinel-2 scene itself use the
observed area.

A payload's own `land_fraction` and `fraction_of_observed` fields are already
against the right denominator. Carry them; do not re-derive them from a
different area and do not rename them.

Using the land area where the observed area belongs inflates every composition
figure by `1 / valid_fraction`. At 0.74 valid that is a uniform 35%
overstatement across the whole section -- large enough to matter and consistent
enough to look like a real result.

So, wherever you emit both:

1. **Multiply.** Take the denominator from the table above and do the
   arithmetic; do not carry a number across from a class table and do not
   estimate it.
2. **State both denominators once** -- `aoi.area_km2` (the land) and
   `observation_basis.observed_area_km2` -- and use those exact figures. The
   box area is reported beside them and divided by nothing.
3. **A proxy cutting across the supplied class bins is a sum, and you must show
   it.** `ndvi < 0.3` is not a bin: it is `water_or_wet` plus `bare_or_built`
   plus part of `sparse_vegetation`. Name the bins you summed in the proxy's
   `rule`, and say so when a bin had to be split by interpolation.
4. **Check every pair before emitting.** Recompute `fraction x denominator`; if
   it disagrees with your stated area by more than 1%, correct the pair rather
   than reporting both.

`spread_ratio` is `max/min` across the proxy values you just computed, so it
inherits any error in them. Recompute it from the corrected figures.

**Write numbers as plain JSON literals.** `1 .8` is not a number, and one broken
literal makes the whole object unparseable rather than one field wrong.

### Comment on every figure with respect to the event

`event_commentary` comments on **every figure the inputs yield** -- the rain
hyetograph (`weather_grid`, when fetched), the NDVI class map and the built-up
index (`lulc`, or the WorldCover classes), the slope class map and elevation
(`terrain`), the water class map (`permanent_water`) -- **with respect to this
flood event**: the AOI, the window and the event in the session header.

- At most three points per figure, crisp, each a specific observation about
  this flood (rain on already-wet ground, a built-up share that limits
  infiltration, flat low ground beside water, a seasonal-water belt a flood
  map will confuse with flooding), with its number copied and its unit.
- **Never force a point**: a figure with nothing to say for this event gets
  an empty `points` list. A figure whose input is ABSENT is left out.
- You do not see the images: comment through the data each figure is drawn
  from, never on what you cannot read from it.

### The verdict

`report_header.verdict` is one sentence an analyst can read **alone**, with no
other section. `confidence_limiter` names the single biggest thing degrading
confidence -- one thing, not a list.

### Output

One JSON object. No prose around it, no fenced commentary. Every field in the
schema appears; a field you genuinely cannot fill is `null` with the reason
recorded in `cannot_determine` or `data_integrity`, never omitted and never
guessed.

The full field-level schema is in `docs/norwood_preflood_brief.schema.json` and
mirrored in the vault note named in `knowledge_note`. Read the note before
writing, and follow the field names exactly -- a renamed field is a broken
contract, not a stylistic choice.

## Notes (not loaded)

---

Related: [[Flow cards - MOC]] | [[Agent Norwood - Satellite expert]] | [[Norwood pre-flood AOI brief schema]]
