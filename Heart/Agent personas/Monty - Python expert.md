---
type: agent
desc: expert in python, runs code snippets for workflows
workflows: hand
context: head, web_with_source
status: stub
tags: [agent]
---
**Self-Healing Capabilities**: If the code execution fails, the state will retain the code snippet and add the error to execution logs. Monty should return errors in the workflow back to [[Argos]] - Argos must have a retry logic to retry the step in case Monty fails for a maximum of two times, show the error as final output in case its beyond that.