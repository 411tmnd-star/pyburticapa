# How it works: Capstone 06 — DevOps Troubleshooting Agent for Kubernetes

## `main.py`

```text
DevOps troubleshooting agent — K8s knowledge graph + HITL approval gate.

The hard architectural primitives are (a) a K8s knowledge graph that lets
root-cause analysis walk from an alerted object to its neighbors with
telemetry overlays, and (b) a read-only-by-default tool surface where every
destructive command is gated by a human-in-the-loop approval and every
considered command is audit-logged. This scaffold implements both.

Run:  python main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Node`](main.py#L25)
  - [`def key(self)`](main.py#L31)
- [`class Graph`](main.py#L36)
  - [`def add(self, n)`](main.py#L40)
  - [`def link(self, src, rel, dst)`](main.py#L43)
  - [`def neighbors(self, key)`](main.py#L46)
- [`def build_sample_cluster()`](main.py#L52)
- [`class Hypothesis`](main.py#L82)
  - [`def score(self)`](main.py#L89)
- [`def root_cause(g, alerted)`](main.py#L98): Walk outward from the alerted object, collect telemetry,
- [`class AuditEvent`](main.py#L149)
- [`class Agent`](main.py#L161)
  - [`def call(self, tool, args, approver)`](main.py#L167)
- [`def main()`](main.py#L190)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
