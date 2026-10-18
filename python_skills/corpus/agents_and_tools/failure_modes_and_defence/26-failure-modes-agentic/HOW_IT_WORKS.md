# How it works: Failure Modes: Why Agents Break

## `main.py`

```text
Stdlib failure-mode tagger for agent traces.

Detects the five industry-recurring modes: hallucinated actions, scope creep,
cascading errors, context loss, tool misuse. Each detector returns a tag if
the trace matches; aggregate distribution mirrors Phoenix's trace clustering.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TraceStep`](main.py#L16)
- [`class Trace`](main.py#L25)
- [`def detect_hallucinated_action(trace)`](main.py#L37)
- [`def detect_scope_creep(trace)`](main.py#L44)
- [`def detect_cascading_errors(trace)`](main.py#L55)
- [`def detect_context_loss(trace)`](main.py#L69)
- [`def detect_tool_misuse(trace)`](main.py#L80)
- [`def detect_success_hallucination(trace)`](main.py#L98)
- [`def tag(trace)`](main.py#L118)
- [`def main()`](main.py#L122)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
