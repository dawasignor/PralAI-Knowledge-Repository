---
type: dataset
desc: Recorded disasters with hazard type, start and end dates and alert level; anchors a session time frame to a real event
workflows: fetch_place_context
context: head
status: stub
tags: [dataset, event, register, tier/pretrained]
source_url: https://www.gdacs.org/
verified_on: 2026-09-18
---

The Global Disaster Alert and Coordination System, run by the European
Commission's Joint Research Centre with UN OCHA. The one register here that
gives a **window** rather than only an onset: an event carries `fromdate` and
`todate`, which is exactly what a time frame needs. Sometimes carries a GLIDE
number; an empty one means the event was never assigned one, not that the field
is missing.

Indexed **by country, not by city**, so the search uses what the gazetteer
returned for the AOI rather than the name the user typed.

**It never gates the geometry.** A city's extent does not depend on which
disaster is tagged to it, so a register that is down, empty or ambiguous must
not cost the bounding box -- it did, and that was a bug. See
[[Monty data workflows]] and `core/resolve.py`.

ReliefWeb was the first choice and is not usable without paperwork: v1 returns
410, and v2 rejects any appname not approved through a request form.

Related: [[Datasets-MOC]] | [[OpenStreetMap Nominatim]] | [[OpenStreetMap Overpass]] | [[Monty data workflows]]
