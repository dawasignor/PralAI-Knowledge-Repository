---
type: dataset
desc: Query API over OSM survey data, used for counts of buildings, homes, hospitals and schools inside an AOI
workflows: fetch_place_context
context: head
status: stub
tags: [dataset, exposure, osm, tier/pretrained]
source_url: https://overpass-api.de/
verified_on: 2026-09-18
---

Counts are taken server-side with `out count` rather than by downloading
geometry: the question is "how many hospitals", not "which ones".

**These are counts of *mapped* features, not counts of features.** OSM coverage
is excellent in some cities and thin in others, so a low count can mean few
buildings or few surveyors. Never report one as a population, an asset total or
a damage denominator without saying where it came from. Derna returns
`houses: 0` because its residential buildings are tagged `apartments` -- the
zero is real and it does not mean "no homes".

**Only global instances may be queried.** A regional mirror does not fail on an
AOI it has no data for; it answers `200` with a count of `0`, which arrives as
a finding with nothing to mark it false. `overpass.osm.ch` returned `0` for
Derna and `21780` for Zurich against the main instance's `14657` / `21780`.
See `docs/fetch_place_context.md` in the agent repo.

Related: [[Datasets-MOC]] | [[OpenStreetMap Nominatim]] | [[GDACS disaster register]] | [[Monty data workflows]]
