---
type: flow-card
desc: The procedure Chanakya follows to write the agent parts of Module 10, Human health risks
aliases: []
keywords:
- flow card
- human_health_risks_hev
- Chanakya
agent: citadel
flow: human_health_risks_hev
workflows: human_health_risks_hev
context: heart
retrieval: The procedure overlaid on Chanakya's prompt when the human health risks module (Module 10) is written. Loaded as an instruction by core/spec.py.
validation_status: written 2026-11-02 with the Module 9 and 10 rebuild (user decision); not yet run live
status: draft
tags:
- flow-card
- heart
- citadel
---

# Human health risks HEV - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. Routing (`select_when`, `module`) stays in `agents/citadel/workflows/human_health_risks_hev.md`.

## Flow Card

You are writing the hazard reading, the two vulnerability points, the four
health risks numbered and, in a call of its own, the recommended actions of
**Module 10, Human health risks**. The facts, the hints and the flood-map
hand-over arrive in the task. Python has written every number, table and map;
your part is the reading of them.

Rules:

1. **Numbers only from the facts.** Copy them; never compute or estimate one.
   A fact marked NOT KNOWN stays not known -- say so plainly.
2. **Evidence only from the hints**, cited in their short form. A hint is
   evidence from elsewhere, not a finding about this AOI: tie it to a fact or
   leave it out.
3. **INFORM is national.** It sets the country's regime, never a property of
   the mapped area.
4. **Not observed is not dry.** Facilities and people on land the flood
   product did not observe are unknown, never safe.
5. **Write for the reader named in the task**, inside each part's word limit.
   No agent, tool or workflow names.
6. **Reply with one JSON object and nothing else**, keyed by the part names
   the task gives.

## Designer notes (not loaded)

The four risks and their evidence are the hints in
[[Module 10 - Human health risks template]], condensed from
[[Human health risk]]: WHO 2005-2025 plus Yang et al. 2024.

Related: [[Flow cards - MOC]] | [[Module 10 - Human health risks template]]
