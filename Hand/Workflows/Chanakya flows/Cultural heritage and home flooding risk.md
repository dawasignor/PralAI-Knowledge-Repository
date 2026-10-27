---
type: workflow
nexus: other
desc: Buildings that cannot simply be replaced - cultural and heritage structures - together with the residential water-displacement risk of flooding inside homes
aliases: [cultural heritage flood, heritage buildings, water displacement, flood in homes, residential flooding]
keywords: [cultural heritage, heritage building, monument, place of worship, water displacement, home flooding, residential, displacement, building fabric, irreplaceable]
agent: citadel
parent_workflow: Cultural heritage and home flooding risk
workflow_order: 1
prev_node: argos
next_node: argos
inputs_required: [3, 4, 5, 9, 10, 18]
context: hand
retrieval: Answer which cultural and heritage buildings are vulnerable to the flood, and where floodwater entering homes displaces residents.
validation_status: flow card written 2026-09-15; the knowledge half is still empty - no evidence, no source cited
status: stub
tags: [workflow, citadel, other, heritage, displacement]
---

## Node

Conforms to [[Chanakya node schema]]. One Citadel node, between two Argos ones.

| Field | Value |
|---|---|
| `prev_node` | Argos, carrying the user input |
| `title` | Cultural heritage and home flooding risk |
| `parent_workflow` | Cultural heritage and home flooding risk |
| `workflow_order` | 1 |
| `next_node` | Argos, to update the session and log and answer the user |

## Active context

Sent by Argos when the user triggers this node: the user prompt, the user
persona, and the session data for the whole exchange so far. The reply is
shaped by all three -- see the rules in [[Chanakya node schema]].

## Inputs required

`[3, 4, 5, 9, 10, 18]` -- indexes [[Chanakya input sources]]. Sources 7 and above
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
`agents/citadel/workflows/cultural_heritage_and_home_flooding_risk.md`, loaded by `core.spec.load_flow` and
overlaid on Citadel for one call. The card holds the five-step spine and the
output rules; it holds **no figures** -- those are retrieved from this note, so
the two cannot drift.

## Provenance

Citations, vintages and verification status go in `docs/SOURCES.md`, never into
a prompt.

## Next-node prompts

Close by offering the user a choice: ask something specific about this
analysis, check the uncertainty with Entro, or run another flow.

**Open: whether this is one flow or two.** The user listed cultural buildings and home water-displacement in one line, separated by a semicolon. They share inputs 10 and 3 but answer to different audiences - a conservation authority and a housing or relief authority. Kept as one note until ruled.

---

Related: [[Chanakya flows - MOC]] | [[Chanakya node schema]] | [[Chanakya input sources]] | [[Agent Chanakya - City Planner]] | [[Agent Argus - Orchestrator]] | [[Entro - Uncertainty Analyser]] | [[Workflows-MOC]]
