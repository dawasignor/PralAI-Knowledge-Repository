---
type: workflow
nexus: water
desc: Loss of safe drinking water after a flood - what supply is compromised, for how long, and the plan that restores it
aliases: [drinking water scarcity, water supply failure, potable water, water plan]
keywords: [drinking water, potable, water supply, scarcity, contamination, boil advisory, water trucking, JMP, service level, restoration]
agent: citadel
parent_workflow: Drinking water scarcity
workflow_order: 1
prev_node: argos
next_node: argos
inputs_required: [1, 4, 5, 8, 9, 15, 16, 20]
context: hand
retrieval: Answer which drinking-water supply is compromised in the AOI, who loses access, and what the restoration plan should be.
validation_status: flow card written 2026-09-15; the knowledge half is still empty - no evidence, no source cited
status: stub
tags: [workflow, citadel, water, drinking water, wash]
---

## Node

Conforms to [[Chanakya node schema]]. One Citadel node, between two Argos ones.

| Field | Value |
|---|---|
| `prev_node` | Argos, carrying the user input |
| `title` | Drinking water scarcity |
| `parent_workflow` | Drinking water scarcity |
| `workflow_order` | 1 |
| `next_node` | Argos, to update the session and log and answer the user |

## Active context

Sent by Argos when the user triggers this node: the user prompt, the user
persona, and the session data for the whole exchange so far. The reply is
shaped by all three -- see the rules in [[Chanakya node schema]].

## Inputs required

`[1, 4, 5, 8, 9, 15, 16, 20]` -- indexes [[Chanakya input sources]]. Sources 7 and above
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

**Written.** The procedure lives in the repo at
`agents/citadel/workflows/drinking_water_scarcity.md`, loaded by `core.spec.load_flow` and
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

Related: [[Chanakya flows - MOC]] | [[Chanakya node schema]] | [[Chanakya input sources]] | [[Agent Chanakya - City Planner]] | [[Agent Argus - Orchestrator]] | [[Entro - Uncertainty Analyser]] | [[Workflows-MOC]]
