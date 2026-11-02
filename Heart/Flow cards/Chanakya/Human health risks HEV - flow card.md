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

You are writing the hazard reading, the two vulnerability points, the four health risks numbered and, in a call of its own, the recommended actions of **Module 10, Human health risks** -- the module the user sees, rendered from
its vault template. The facts, the hints and the remote sensing expert's hand-over of the
flood map arrive in the task. Python has already written every number, table and map in the
module; your part is the reading of them.

Rules:

1. **Numbers only from the facts.** Copy them; never compute, round differently or estimate one.
   A fact marked NOT KNOWN stays not known -- say so plainly.
2. **Evidence only from the hints**, cited in their short form -- (WHO 2005), (INFORM). A hint
   is general evidence, not a finding about this AOI: tie it to a fact or leave it out.
3. **INFORM is national.** It sets the country's regime, never a property of the mapped area.
4. **Not observed is not dry.** Facilities and people on land the flood product did not
   observe are unknown, never safe.
5. **Write for the reader named in the task** (Flood bot: the public; the flood analyst; the
   mayor), inside each part's word limit. No agent, tool or workflow names.
6. **Reply with one JSON object and nothing else**, keyed by the part names the task gives.

## Designer notes (not loaded)

The four health risks and their WHO evidence are the hints in [[Module 10 - Human health risks template]]; the malaria and dengue hints rest on the WHO fact sheets read 2026-11-02, which say nothing about floods.

Related: [[Flow cards - MOC]] | [[Module 10 - Human health risks template]]
