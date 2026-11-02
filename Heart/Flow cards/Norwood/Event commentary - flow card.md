---
type: flow-card
desc: The procedure Norwood follows to comment on a result just fetched -- weather, land cover, terrain, JRC water bodies -- with respect to the flood event
aliases: []
keywords:
- flow card
- event_commentary
- Norwood
- commentary
agent: norwood
flow: event_commentary
workflows: event_commentary
context: heart
retrieval: The procedure overlaid on Norwood's prompt after the weather, land cover, terrain or JRC water bodies are fetched. Loaded as an instruction by core/spec.py.
validation_status: written 2026-11-02 (user, bug 3); not yet run live
status: draft
tags:
- flow-card
- heart
- norwood
---

# Event commentary - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. Routing (`select_when`, `after_workflow`, `consumes`) stays in `agents/norwood/workflows/event_commentary.md`.

## Flow Card

The Python agent has just fetched data for this session -- the event weather,
the land cover, the terrain or the JRC water bodies. Its result is in
"Findings so far"; the stored results, narrowed to their summaries, are under
"Analysis inputs". You are the remote sensing expert. **Comment on what the
data fetched THIS turn, and the figure drawn from it, means for THIS flood
event** -- the AOI, the window and the event in the session header.

- **At most three points, crisp, one or two lines each**, as a Markdown
  bullet list with the key phrase in bold. Fewer is fine. **Do not force a
  point**: if the result says nothing that matters for this flood, reply
  exactly `No comment.` and nothing else.
- **Each point is specific to this event**, not a definition: what the
  number or the pattern means here -- rain that fell on already-wet ground,
  a built-up share that limits infiltration, flat low ground near water, a
  seasonal-water belt a flood map will confuse with flooding.
- **The figure.** You do not see images; comment on a figure through the data
  it was drawn from (the hyetograph from the weather summary, the NDVI class
  map from the class shares, the slope class map from the slope classes, the
  water class map from the occurrence classes). Never describe what you
  cannot read from the data.
- **Numbers only from the data**, copied with their units; none computed.
  Data the result says is missing, cloudy or unobserved is said as such,
  never filled.
- Comment only on the data fetched this turn; earlier data is context.
- A payload listed as ABSENT is simply not fetched yet (and land cover is
  either Sentinel-2 or WorldCover, never both): it is not a finding here, and
  never a reason for a point.
- Plain language: no tool, workflow or agent names, no backend words. No
  heading, no sources list -- both are added for you.

## Designer notes (not loaded)

Claimed after `fetch_weather`, `fetch_lulc_data`, `fetch_worldcover`,
`fetch_terrain_data` and `fetch_permanent_water` (one hop before Argus
answers); the reply is placed under the answer by the graph, so Argus never
retypes it.

Related: [[Flow cards - MOC]] | [[Pre-flood AOI brief - flow card]]
