---
type: schema
desc: The nine fields that define a node in a Citadel workflow, and the fixed User-Argos-Citadel-Argos path every Citadel flow follows
aliases: [node schema, Citadel node, workflow node, node definition]
keywords: [node, workflow, state, prev_node, next_node, active context, inputs required, workflow order, task description, expected output, citadel, argos]
agent: citadel
context: hand
retrieval: Answer what a node is, which nine fields define one, and what path a Citadel workflow takes from the user and back.
validation_status: schema agreed with the user 2026-09-13; no node has been implemented in code
status: stub
tags: [schema, workflow, node, citadel]
---

## Definitions

A **workflow** is a series of steps followed by one agent or several.
A **node** is one step in a workflow. Nodes exist so the state can be followed.

## The nine fields

| # | Field | Meaning |
|---|---|---|
| 1 | `prev_node` | The node whose output starts this one. **User input** means this is step 0 of the workflow; otherwise it is another agent's output. |
| 2 | `title` | Technically relevant description of the analysis, in a few words. |
| 3 | `parent_workflow` | The workflow this node belongs to. For Citadel flows the title and the parent workflow are the same. |
| 4 | `active_context` | Map of session information Argos sends when the user triggers the node: user prompt, user persona, and the session data for the whole exchange so far. |
| 5 | `inputs_required` | Array of positive integers, indexing [[Citadel input sources]]. |
| 6 | `workflow_order` | The n-th step in the workflow. |
| 7 | `task_description` | Every subtask involved, in detail. |
| 8 | `expected_output` | A sample of the response, in markdown. |
| 9 | `next_node` | Argos, or another agent. |

## Where each field actually lives

A node's nine fields do **not** live in one document. They split by consumer,
because they have different lifetimes and different readers:

| Part | Holds | Lives in | Reaches a prompt? |
|---|---|---|---|
| **Flow card** | Fields 1, 2, 3, 5, 6, 9 and the procedure (7) | `agents/citadel/workflows/<flow>.md`, in a `## Flow Card` section | Yes -- overlaid for one call, one card only |
| **Knowledge note** | The evidence the procedure needs: figures, thresholds, case studies | This vault folder, one note per flow | Only the part retrieved at the step that needs it |
| **Provenance** | Citations, data vintages, verification status | `docs/SOURCES.md` | **Never** |

Field 4, `active_context`, is supplied by Argos at call time and is not stored
anywhere. Field 8, `expected_output`, is a sample and belongs with the card.

**Why it is split.** A written flow was 5,300 tokens as one document -- three
times Citadel's whole persona, re-sent every turn, for one of eleven analyses.
The card alone is about 700. The evidence is only needed at one step, so it is
retrieved, not preloaded. The citations exist so a number can be defended in a
thesis; a model never needs to read them.

**The rule that keeps them honest:** a figure appears in exactly one place. The
card carries no numbers, so it cannot drift from the note. The note carries no
procedure, so it cannot drift from the card.

## Loading

`core.spec.load_flow(agent_slug, flow_name)` reads a card and returns a
`FlowSpec` -- title, `select_when`, `inputs_required`, `knowledge_note`, and
the card text. `core.spec.list_flows(agent_slug)` returns all of them, so Argos
can build a routing menu from `select_when` lines **without** loading eleven
cards into one prompt.

`core.graph._flow_overlay` puts the chosen card into the specialist's system
prompt for that one call, through the same `extra_system` hook Argos uses to
become a debugger. A missing or malformed card is logged and the agent runs
without an overlay, rather than the node failing.

## The Citadel path

Every Citadel workflow runs the same shape:

```
User -> Argos -> Citadel -> Argos -> User
        step 0   step 1     step 2
```

- **Step 0 (Argos).** Receives the user prompt, assembles `active_context` and
  triggers the Citadel node. `prev_node` for a Citadel node is therefore always
  Argos carrying the user's input.
- **Step 1 (Citadel).** Runs the analysis, or answers the question.
- **Step 2 (Argos).** Updates the session and the logs, and returns the answer
  to the user. `next_node` for a Citadel node is therefore always Argos.

## The two paths Citadel can take

| Path | Workflow | Trigger |
|---|---|---|
| General question | [[Citadel general question]] | The user asks about the session so far. Context-dependent; answers from what the session already holds. |
| Autonomous analysis | One of the ten flows in [[Citadel flows - MOC]] | The user asks for an analysis. Citadel runs a set of queries on its own. |

## Rules that hold for every Citadel flow

- **Answer the question that was asked.** The analysis may be wide; the reply is
  shaped by the user's query and persona, both of which arrive in
  `active_context`. Do not dump the whole analysis on the user.
- **Read only what is in the payload.** A field that is absent is reported as
  absent, never inferred.
- **Uncertainty goes to [[Entro - Uncertainty Analyser]].** The user gets a
  brief statement of where confidence is weak and an offer to analyse it in
  depth.
- **Close with a choice**, never a dead end: ask about the analysis, check
  uncertainty with Entro, or run another flow.

---

Related: [[Citadel flows - MOC]] | [[Citadel input sources]] | [[Citadel general question]] | [[Agent Citadel - City Planner]] | [[Agent Argos - Orchestrator]] | [[Entro - Uncertainty Analyser]] | [[Workflows-MOC]]
