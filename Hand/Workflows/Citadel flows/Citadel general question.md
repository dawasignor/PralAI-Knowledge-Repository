---
type: workflow
nexus: none
desc: Citadel answers a question about the session so far from the context it already holds, without triggering an analysis
aliases: [general question, session question, context question, ask Citadel]
keywords: [general question, session context, context dependent, no new analysis, follow-up, clarification, citadel]
agent: citadel
parent_workflow: Citadel general question
workflow_order: 1
prev_node: argos
next_node: argos
inputs_required: [5, 6]
context: hand
retrieval: Answer how Citadel handles a general question about the session so far, and when a question should become an analysis flow instead.
validation_status: knowledge half only - no flow card in the repo
status: stub
tags: [workflow, citadel, general question, session]
---

## Node

Conforms to [[Citadel node schema]]. The first of Citadel's two paths.

| Field | Value |
|---|---|
| `prev_node` | Argos, carrying the user input |
| `title` | Citadel general question |
| `parent_workflow` | Citadel general question |
| `workflow_order` | 1 |
| `next_node` | Argos, to update the session and log and answer the user |

## What separates this path from an analysis

This path answers **from what the session already holds**. It runs no queries
and fetches nothing. If the question cannot be answered from the session, the
honest reply says so and offers the flow that would answer it -- it does not
quietly start an analysis, and it does not fill the gap by inference.

## Active context

The whole of it is the input: the user prompt, the user persona, and the
session exchange. Sources 5 and 6 only.

## Knowledge

Almost none is needed, and that is the point of this path. The only inputs are
5 (session context) and 6 (vault retrieval). No figures, no datasets, no
thresholds.

## Flow card

**Not written.** Will live at
`agents/citadel/workflows/citadel_general_question.md`, loaded by
`core.spec.load_flow`. It is the shortest card of the set, because the rules
are few: answer from session state, run nothing, fetch nothing, and if the
session cannot answer the question, say so and name the flow that would.

## Provenance

Not applicable -- this path makes no sourced claim of its own. Anything it
repeats was already sourced by the flow that produced it.

## Next-node prompts

Offer the user a choice: ask something further, check uncertainty with
[[Entro - Uncertainty Analyser]], or run one of the flows in
[[Citadel flows - MOC]].

---

Related: [[Citadel flows - MOC]] | [[Citadel node schema]] | [[Citadel input sources]] | [[Agent Citadel - City Planner]] | [[Agent Argos - Orchestrator]] | [[Entro - Uncertainty Analyser]] | [[Workflows-MOC]]
