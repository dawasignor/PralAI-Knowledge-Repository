---
type: dataset
desc: Community gazetteer turning a place name into a bounding box, country and admin region
workflows: fetch_place_context
context: head
status: stub
tags: [dataset, gazetteer, osm, tier/pretrained]
source_url: https://nominatim.openstreetmap.org/
verified_on: 2026-09-18
---

Reached through `geopy`. Returns several candidates for a name, each with its
own bounding box and an `importance` rank -- "Boston" is a real city in
Lincolnshire as well as Massachusetts, and choosing silently between them is
how an analysis ends up over the wrong continent. Ambiguity is surfaced to the
user rather than resolved by rank; see [[Monty data workflows]].

A community gazetteer, not an official one. A bounding box is a fine thing to
take from it; a claim about a place is not.

Related: [[Datasets-MOC]] | [[OpenStreetMap Overpass]] | [[GDACS disaster register]] | [[Monty data workflows]]
