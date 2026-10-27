---
type: flow-card
desc: The procedure Norwood follows for the Land cover brief analysis
aliases: []
keywords:
- flow card
- land_cover_brief
- Norwood
agent: norwood
flow: land_cover_brief
workflows: land_cover_brief
context: heart
retrieval: The procedure overlaid on Norwood's prompt when Argus routes the Land cover brief analysis. Loaded as an instruction by core/spec.py.
validation_status: moved word for word from agents/norwood/workflows/land_cover_brief.md on 2026-10-27; byte check against the running card
status: draft
tags:
- flow-card
- heart
- norwood
---

# Land cover brief - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. Evidence note named in the repo: `none`. Routing and inputs (`select_when`, `inputs_required`, `consumes`) stay in `agents/norwood/workflows/land_cover_brief.md`.

## Flow Card

Brief a **human flood analyst** on the AOI's land cover before the event, from
the land-cover result the pipeline has just stored. This runs straight after
the land cover is fetched: **terrain, permanent water and the flood products
are not fetched yet**, and are not missing -- they come later. Never report
them as absent, blocking or failed, and never infer them.

### Which input you have

Exactly one of the two is expected; the other is reported ABSENT, which is
normal here.

- **`lulc` (Sentinel-2 L2A)** -- the usual case. One scene, or a mosaic of
  tiles, before the event window.
- **`worldcover` (ESA WorldCover 2021)** -- only when Sentinel-2 failed its
  valid-fraction threshold at the defaults. Say so in the first line. It is a
  map of one year, 2021, not an observation from the weeks before the event.

### Write these sections, in this order, under these headings

`### Scene and cloud` -- which observation this is and **when it was
acquired: copy the "dated" line from the task exactly** (date, time and zone).
How many days before the window; the share of the LAND that was cloud-free
(`scene.aoi_valid_fraction`) and that the rest is not observed, not dry; for a
mosaic, whether it is one datatake (`scene.single_datatake`, never the
timestamp span). The land area (`aoi.area_km2`) and, when sea was excluded,
`aoi.land.excluded_km2` -- the land is the denominator, never the box.

`### Vegetation` -- NDVI: the class shares and the mean, p10 and p90. With
WorldCover: the tree-cover and other vegetation class shares instead.

`### Built-up` -- the built-up index (BUI) and NDBI: mean, p10, p90, and the
share above the payload's own built-up rule if it states one. With WorldCover:
the built-up class share.

`### Moisture and surface water` -- NDMI, MNDWI and NMDI as the payload gives
them, each with what it measures in one plain clause.

`### What this stage cannot say` -- terrain, permanent water and the flood
itself are characterised in later steps; and anything this observation cannot
tell (the cloud-covered share, the year gap for WorldCover).

### Rules

- **Every number comes from the payload as given**, with its denominator
  named: Sentinel-2 shares are of the **observed land**; WorldCover shares
  are of the land. Do not recompute, round differently or estimate.
- **NDVI classes are greenness, not land cover.** Say "vegetated" or
  "bare or built", never "forest" or "city", unless the payload says it.
- The payload's own caveat strings are carried verbatim.
- Plain sentences for an analyst; no JSON, no tool names, no headings other
  than the five above. At most about 350 words.

## Notes (not loaded)

---

Related: [[Flow cards - MOC]] | [[Agent Norwood - Satellite expert]]
