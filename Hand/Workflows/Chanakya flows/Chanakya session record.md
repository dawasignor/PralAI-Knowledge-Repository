---
type: schema
desc: The constants that hold for a whole session - AOI bounding box, region name, event window, demographics - how they are resolved, and how an agent reaches them
aliases: [session record, session context, session constants, active context, AOI and time frame]
keywords: [session, session record, active context, AOI, bounding box, time frame, event window, demographics, gazetteer, GDACS, Nominatim, geocoding, digest, read_session, input source 5]
agent: citadel
context: hand
retrieval: Answer what the session record holds, how the AOI and time frame are settled before a flow runs, and how an agent reads them.
validation_status: implemented and tested 2026-09-15; core/session.py, core/places.py, core/resolve.py, tests/test_session.py
status: active
tags: [schema, session, workflow, citadel, argos]
---

## What it is

Input source 5 on [[Chanakya input sources]], and field 4 -- `active_context`
-- on [[Chanakya node schema]]. One record per session, holding the facts that
do not change between one message and the next.

Before this existed each message started a fresh run. A follow-up question like
"and what about drinking water there?" reached an orchestrator with no idea
where *there* was, so it re-derived the area or invented one. An invented AOI
produces an answer that reads exactly like a correct one.

## What it holds

| Field | Example | Settled by |
|---|---|---|
| Region name | Tirupati, Andhra Pradesh, India | Gazetteer (input 21) |
| AOI bounding box | 79.2632, 13.4716, 79.5832, 13.7916 (W, S, E, N, EPSG:4326) | Gazetteer |
| Event and window | Flood in India (flood, Orange), 2021-11-14 to 2021-11-18 | Disaster register (input 22) |
| Demographics | population, density, with source and vintage | Not yet wired -- input 9 |
| Run settings | persona, verified-sources-only | The console, each turn |
| Analyses run | `citadel:human_health_risk` | The graph |
| Digest | two or three sentences on what the session has established | Argos, rewritten each turn |

**A vintage travels with every figure.** A 2011 census population used in 2026
is not wrong; presenting it without its year is.

## How the AOI and window are settled

Once, before anything is routed, in `core/resolve.py`:

1. One model turn reads the message for a place and a rough period, and says
   whether they are **new**, **same**, or **none**. "None" inherits -- that is
   what makes a follow-up question keep the area.
2. The place goes to the gazetteer; the period goes to the disaster register,
   searched by the country the gazetteer returned.
3. **One clear match is taken and announced.** Anything ambiguous ends the turn
   with a question instead of an analysis.

Ambiguity is measured by place, not by rank. "Tirupati" returns the same city
three times and needs no question; "Boston" returns Massachusetts and
Lincolnshire, and running the wrong one is an error nobody downstream can see.

A window with no matching entry in the register is still usable -- it is
recorded as *user-stated, unconfirmed*, and the record is not marked confirmed.

## How an agent reaches it

Split by lifetime, the same way a flow card is split from its knowledge note.

- **The header is injected** into every prompt of every agent, every turn:
  region, bounding box, window, whether it is confirmed. Around 100 tokens.
  Injected rather than offered because an agent with no AOI does not stop and
  ask -- it invents one.
- **The rest is retrieved** with the `read_session` tool: demographics,
  provenance, and the digest. Whoever needs it asks for it.

The whole record is held under **1000 tokens**. Only the digest grows, so the
digest is what gets trimmed, and a trim is marked rather than silent.

## Related

[[Chanakya node schema]] - the nine fields, and where each one lives.
[[Chanakya input sources]] - the numbered registry this is source 5 of.
[[Chanakya flows - MOC]] - the flows that read it.
