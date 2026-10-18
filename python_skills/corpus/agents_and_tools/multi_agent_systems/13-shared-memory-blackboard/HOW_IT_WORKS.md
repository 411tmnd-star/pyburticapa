# How it works: Shared Memory and Blackboard Patterns

## `main.py`

```text
Shared memory patterns: MessagePool, Blackboard, and a poisoning demo.

Runs a three-agent research task twice. The first run has a hallucinated
decimal that propagates through shared memory into the final report. The
second run adds a read-only verifier that re-fetches the source and flags
the inconsistency.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ProvenanceEntry`](main.py#L18)
- [`class MessagePool`](main.py#L30): Append-only full-pool shared state.
  - [`def write(self, writer, content, prompt, source_uri, topic, supersedes)`](main.py#L38)
  - [`def read_all(self)`](main.py#L56)
  - [`def flag(self, entry_id, flag)`](main.py#L60)
- [`class Blackboard`](main.py#L68): Topic-keyed pub/sub blackboard.
  - [`def publish(self, writer, topic, content, prompt, source_uri)`](main.py#L77)
  - [`def subscribe(self, topic, cb)`](main.py#L97)
  - [`def read_topic(self, topic)`](main.py#L101)
- [`def retrieval_agent(pool, uri, hallucinate)`](main.py#L112)
- [`def summarizer_agent(pool)`](main.py#L124)
- [`def analyst_agent(pool)`](main.py#L133)
- [`def verifier_agent(pool)`](main.py#L143): Read-only agent. Re-fetches cited sources and flags inconsistencies.
- [`def run_without_verifier()`](main.py#L158)
- [`def run_with_verifier()`](main.py#L171)
- [`def demo_blackboard()`](main.py#L190)
- [`def main()`](main.py#L215)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
