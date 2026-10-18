# How it works: Support Agent With Google ADK

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def main()`](main.py#L8)

## `adk_adapter.py`

```text
Run two actual ADK agents with a session handoff.

Lesson: projects/support-agent-with-google-adk/stages/04-adk-adapter/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def collect_events(events)`](adk_adapter.py#L9)
- [`def run_adk(ticket_text, route_reply, answer_reply)`](adk_adapter.py#L29)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## `framework_demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## `handoff.py`

```text
Record allowed handoff state transitions.

Lesson: projects/support-agent-with-google-adk/stages/03-handoff/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def begin(ticket)`](handoff.py#L11)
- [`def transition(session, event, payload)`](handoff.py#L20)

## `intake.py`

```text
Validate and redact support tickets.

Lesson: projects/support-agent-with-google-adk/stages/01-intake/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def ticket(raw)`](intake.py#L11)

## `routing.py`

```text
Route tickets and enforce specialist capabilities.

Lesson: projects/support-agent-with-google-adk/stages/02-routing/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def route(text)`](routing.py#L22)
- [`def authorize(specialist, tool)`](routing.py#L33)

## `support.py`

Functions and classes, in file order (click to jump to the line):

- [`def prepare_support(raw, requested_tool)`](support.py#L24)
- [`def support_ticket(raw, requested_tool)`](support.py#L48)
- [`def export_support(result, out)`](support.py#L60)

## Run and test

From this folder:

```
python main.py --ticket fixtures/ticket.json --out support-output
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
