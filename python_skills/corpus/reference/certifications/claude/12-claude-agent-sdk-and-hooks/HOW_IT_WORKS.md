# How it works: The Agent SDK Is a Harness, Not Permission

## `code/main.py`

```text
Companion code for:
certifications/claude/lessons/12-claude-agent-sdk-and-hooks/docs/en.md
It validates tools, hooks, sandbox, budgets, subagent isolation, and resume state.
No Agent SDK installation or provider credential is required for the policy lab.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class EventStreamError`](code/main.py#L20): Raised when a managed-agent event fixture violates the state contract.
- [`class EventSummary`](code/main.py#L25)
  - [`def to_dict(self)`](code/main.py#L34)
- [`def consume_managed_events(events)`](code/main.py#L46): Consume persisted events and optional stream previews without network access.
- [`def validate_policy(policy)`](code/main.py#L129)
- [`def evaluate_action(policy, tool_name, approved)`](code/main.py#L216)
- [`class ComputerUseGuard`](code/main.py#L230): Validate model-proposed UI actions against trusted harness state.
  - [`def observe_screenshot(self, screenshot_id, width, height)`](code/main.py#L241)
  - [`def authorize(self, action, trusted_risk_class, approved)`](code/main.py#L251)
- [`def load_policy(path)`](code/main.py#L302)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
