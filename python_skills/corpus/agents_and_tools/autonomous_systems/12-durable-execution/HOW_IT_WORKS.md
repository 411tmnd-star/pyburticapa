# How it works: Long-Running Background Agents: Durable Execution

## `main.py`

```text
Minimal durable-execution engine — stdlib Python.

Models the workflow / activity / event-log pattern used by Temporal, LangGraph
checkpointing, Microsoft Agent Framework, and Claude Code Routines.

Activities are logged with inputs before execution and outputs after. A
replay of a workflow re-runs the workflow code but returns cached outputs
for activities whose event is already in the log. A crash mid-run loses
only the incomplete activity.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class EventLog`](main.py#L24)
  - [`def events(self)`](main.py#L32)
  - [`def append(self, ev)`](main.py#L36)
  - [`def lookup(self, name, args)`](main.py#L42)
- [`def activity(name)`](main.py#L51)
- [`def fetch_docs(query)`](main.py#L72)
- [`def call_llm(doc_count)`](main.py#L78)
- [`def write_report(summary)`](main.py#L84)
- [`def workflow(log, query, crash_after)`](main.py#L91): Three-activity workflow with an optional crash for pedagogy.
- [`def reset_log(path)`](main.py#L105)
- [`def count_runs(log)`](main.py#L111)
- [`def main()`](main.py#L115)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
