---
type: flow-card
desc: The procedure Chanakya follows for the Chanakya general question analysis
aliases: []
keywords:
- flow card
- citadel_general_question
- Chanakya
agent: citadel
flow: citadel_general_question
workflows: citadel_general_question
context: heart
retrieval: The procedure overlaid on Chanakya's prompt when Argus routes the Chanakya general question analysis. Loaded as an instruction by core/spec.py.
validation_status: moved word for word from agents/citadel/workflows/citadel_general_question.md on 2026-10-27; byte check against the running card
status: draft
tags:
- flow-card
- heart
- chanakya
---

# Chanakya general question - flow card

Loaded into the agent as an instruction: the `## Flow Card` section only, which runs to the next `##` heading. The evidence is in [[Chanakya general question]], fetched as data at run time. Routing and inputs (`select_when`, `inputs_required`, `consumes`) stay in `agents/citadel/workflows/citadel_general_question.md`.

## Flow Card

The user is asking about the session, not asking for an analysis. **Run
nothing. Fetch nothing.** Answer from the session record and the findings
already in front of you.

The retrieval rules in the system prompt do not apply here: there is no
knowledge note to open, and opening one would turn a question into an analysis
the user did not ask for.

**What this path is for.** Explaining a finding already made, comparing two
findings, restating an answer for a different reader, saying what the session
has established, or saying what it has not.

**When the session cannot answer it**, say so in one line and name the flow
that would -- by name, so Argos can route it on the next turn. Do not
approximate an analysis from memory to avoid saying "not yet run". An
approximation is indistinguishable from a result once it is written down, and
this is the one path with no sources block to expose it.

**Do not re-cite what you did not re-read.** If a figure from an earlier turn
appears in the answer, attribute it to the turn that produced it rather than to
a source you have not opened in this call.

**Close with a choice**, as every path does: ask something further, check the
uncertainty with Entro, or run a named analysis.

## Notes (not loaded)

---

Related: [[Flow cards - MOC]] | [[Agent Chanakya - City Planner]] | [[Chanakya general question]]
