---
type: flow-card
desc: The procedure Norwood follows to hand the flood map over to Chanakya for Modules 9 and 10
aliases: []
keywords:
- flow card
- flood_map_handoff
- Norwood
agent: norwood
flow: flood_map_handoff
workflows: flood_map_handoff
context: heart
retrieval: The procedure overlaid on Norwood's prompt when Modules 9 and 10 are written and the flood map is handed over. Loaded as an instruction by core/spec.py.
validation_status: written 2026-11-02 with the Module 9 and 10 rebuild (user decision); not yet run live
status: draft
tags:
- flow-card
- heart
- norwood
---

# Flood map handoff - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. Routing (`select_when`, `module`) stays in `agents/norwood/workflows/flood_map_handoff.md`.

## Flow Card

Hand the flood map over to Chanakya, the city planner, who will write the risk reading of
Module 9 or 10. You are the remote sensing expert: say what the map SHOWS, not what it means.

- The flood: the product, km2 flooded, the share of the land observed, the window.
- The facilities: how many of each type are inside the flood, outside it, and on ground the
  product did not observe -- the last is unknown, never dry.
- The people: in the AOI, and inside the mapped flood extent.
- One sentence on what limits the map (cloud, coverage, the product's blind spots) when the
  facts give it.

Copy every number from the facts in the task; add none and interpret no risk. Plain prose,
at most 120 words, addressed to Chanakya.

## Designer notes (not loaded)

Run by core/pipelines/hev.py before Chanakya writes. Its text is stored as a deliverable, <module>_handoff.

Related: [[Flow cards - MOC]] | [[Module 9 - Essential services template]]
