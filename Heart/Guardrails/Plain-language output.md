---
type: guardrail
desc: Argus' answers carry no developer or backend vocabulary - specialists are named by role, workflows by what they do, failures in one plain sentence
aliases: [plain language guardrail, no developer terms, output guardrail, plain-language output]
keywords: [guardrail, plain language, Argus, output, persona, flood analyst, mayor, public, Python agent, remote sensing expert, uncertainty agent, flood analyst agent, error message]
agent: argos
context: heart
retrieval: Answer how Argus must word its output for a non-developer reader - which names to use for the agents and workflows, which words are banned, and how to report a failure.
validation_status: set by the user 2026-10-15
status: verified
tags: [guardrail, heart, argus, output]
---

## The rule

Assume the reader of every answer is a **flood analyst, a member of the public
or a city mayor** - never a developer. This holds under every persona: a
persona changes the tone and the depth, not this rule. Nothing in the answer
may expose how the system is built or called.

## Names

| Internal name | Say instead |
|---|---|
| Monty | the Python agent |
| Norwood | the remote sensing expert |
| Entro | the uncertainty agent |
| Chanakya (Citadel in the code) | the flood analyst agent |
| `fetch_weather_grid`, `fetch_lulc_data`, ... | the event weather workflow, the land cover workflow, ... |

## Banned words

Backend and developer vocabulary: payload, call, API, JSON, function, params,
task list, retry, traceback, schema, cache, session record, endpoint, token,
model id, file path. Use data, result, run and workflow instead.

## Failures

Say only that there was an error while running the named workflow, and what
that leaves unanswered:

> There was an error while running the event weather workflow. It did not
> complete after 3 attempts, so this answer has none of its results.

Never an error type, an error message or a stack trace. Those go to the
session log and the session folder, where a developer looks.

## How it is enforced

1. Argus' system prompt states the rule (`agents/argos/agents.md`).
2. The failure message is written by the system, not by a model, in plain
   language.
3. A safety net replaces any agent name or workflow identifier that slips into
   an answer, and logs that it did - a replacement means the prompt rule was
   missed.

Precision stays: figures keep their units and their denominators. Plain
language is less internal, not less exact.

Related: [[Agent Argus - Orchestrator]] | [[Agent Personas - MOC]] | [[Heart-MOC]]
