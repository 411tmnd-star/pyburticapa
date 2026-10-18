# How it works: Memory Blocks and Sleep-Time Compute

## `main.py`

```text
Letta-shaped memory blocks with a sleep-time consolidation agent.

Primary agent writes raw facts during turns. Sleep-time agent runs between
turns, off the critical path, and consolidates blocks. Scripted so it runs
offline.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Block`](main.py#L15)
  - [`def append(self, text)`](main.py#L23)
  - [`def replace(self, old, new)`](main.py#L30)
  - [`def rewrite(self, new)`](main.py#L39)
  - [`def near_limit(self, threshold)`](main.py#L46)
- [`class BlockStore`](main.py#L50)
  - [`def create(self, label, description, limit)`](main.py#L54)
  - [`def get(self, label)`](main.py#L59)
  - [`def labels(self)`](main.py#L62)
  - [`def render(self)`](main.py#L65)
- [`class ArchivalRecord`](main.py#L76)
- [`class Archival`](main.py#L82)
  - [`def insert(self, text)`](main.py#L87)
  - [`def invalidate(self, rid)`](main.py#L93)
  - [`def valid_records(self)`](main.py#L100)
  - [`def all_records(self)`](main.py#L103)
- [`class PrimaryAgent`](main.py#L107): Handles turns. Writes raw facts fast; never summarizes or consolidates.
  - [`def turn(self, user_text, writes)`](main.py#L115)
- [`class SleepTimeAgent`](main.py#L130): Off the critical path. Summarizes near-limit blocks, invalidates
  - [`def run(self, contradictions)`](main.py#L140)
- [`def _summarize(text, target_len)`](main.py#L160)
- [`def main()`](main.py#L174)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
