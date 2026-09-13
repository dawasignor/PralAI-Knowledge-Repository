---
type: workflow
nexus: energy
desc: Where standing water and live electrical infrastructure meet, and the direct electrocution risk to people moving through a flooded area
aliases: [electric shock, electrocution risk, live wire flood, electrical hazard]
keywords: [electric shock, electrocution, live conductor, submerged, downed line, standing water, public safety, isolation, de-energisation]
agent: citadel
parent_workflow: Electric shock hazard
workflow_order: 1
prev_node: argos
next_node: argos
inputs_required: [3, 4, 5, 9, 13, 16, 20]
context: hand
retrieval: Answer where electrocution risk is concentrated in a flooded AOI and what reduces it, for both a resident and a city authority.
validation_status: knowledge half only - no evidence written, no source cited, no flow card in the repo
status: stub
tags: [workflow, citadel, energy, safety, electrocution]
---

## Node

Conforms to [[Citadel node schema]]. One Citadel node, between two Argos ones.

| Field | Value |
|---|---|
| `prev_node` | Argos, carrying the user input |
| `title` | Electric shock hazard |
| `parent_workflow` | Electric shock hazard |
| `workflow_order` | 1 |
| `next_node` | Argos, to update the session and log and answer the user |

## Active context

Sent by Argos when the user triggers this node: the user prompt, the user
persona, and the session data for the whole exchange so far. The reply is
shaped by all three -- see the rules in [[Citadel node schema]].

## Inputs required

`[3, 4, 5, 9, 13, 16, 20]` -- indexes [[Citadel input sources]]. Sources 7 and above
are named but not wired, so this flow cannot run end to end today.

## Knowledge

**TOTAG.** This note is the *knowledge* half of the flow: the evidence the card
retrieves at the step that needs it. Nothing here is written yet.

What belongs here once it is:

| Step | What this note must supply |
|---|---|
| Hazard | What the flood mobilises, with figures, thresholds and the datasets that carry them |
| Exposure | Who and what is in the way, and how each is counted |
| Vulnerability | How hard it lands, and which groups this hazard singles out |
| Recommendation | What an individual and what a city authority should do, from verified guidance |
| Uncertainty | Where the data does not carry the claim, routed to [[Entro - Uncertainty Analyser]] |

Every figure carries its **vintage** -- the date of the data, not the date it
was read. A number quoted without its date ages into a false claim while still
looking sourced.

## Flow card

**Not written.** The procedure lives in the repo at
`agents/citadel/workflows/electric_shock_hazard.md`, loaded by `core.spec.load_flow` and
overlaid on Citadel for one call. The card holds the five-step spine and the
output rules; it holds **no figures** -- those are retrieved from this note, so
the two cannot drift.

## Provenance

Citations, vintages and verification status go in `docs/SOURCES.md`, never into
a prompt.

## Next-node prompts

Close by offering the user a choice: ask something specific about this
analysis, check the uncertainty with Entro, or run another flow.

---

Related: [[Citadel flows - MOC]] | [[Citadel node schema]] | [[Citadel input sources]] | [[Agent Citadel - City Planner]] | [[Agent Argos - Orchestrator]] | [[Entro - Uncertainty Analyser]] | [[Workflows-MOC]]
