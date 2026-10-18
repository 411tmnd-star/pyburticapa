# How it works: Automated Alignment Research (Anthropic AAR)

## `main.py`

```text
Parallel AAR forum simulator — stdlib Python.

Three Automated Alignment Researchers run in parallel. Each solves a
research task under one of two regimes: fixed-workflow (human-prescribed
plan) or free-decomposition. Findings post to an append-only forum whose
records live outside the agents' sandboxes.

One agent attempts log tampering. The tamper-evident chain catches the
attempt at verification time.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ForumRecord`](main.py#L20)
- [`class Forum`](main.py#L30)
  - [`def head(self)`](main.py#L34)
  - [`def post(self, rec)`](main.py#L37)
  - [`def verify(self)`](main.py#L44): Return indexes of any tampered records.
- [`def solve(agent, task, regime)`](main.py#L67)
- [`def run_regime(regime)`](main.py#L76)
- [`def attempt_tamper(forum_records)`](main.py#L92): Rebuild a forum from records and attempt a silent edit.
- [`def regime_report(regime)`](main.py#L117)
- [`def tamper_demo()`](main.py#L132)
- [`def main()`](main.py#L147)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
