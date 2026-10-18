# How it works: Architect Professional System Capstone

## `code/main.py`

```text
Architecture readiness gate for this capstone's docs/en.md.

Validates requirements, decisions, controls, evaluations, owners, and rollback.
Hard controls must be verified; a high average score cannot hide their failure.
Uses only the Python standard library and an inspectable architecture packet.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Requirement`](code/main.py#L15)
- [`class Decision`](code/main.py#L24)
- [`class Control`](code/main.py#L35)
- [`class EvaluationGate`](code/main.py#L46)
  - [`def passes(self)`](code/main.py#L53)
- [`class ArchitecturePacket`](code/main.py#L65)
- [`class Finding`](code/main.py#L77)
- [`def validate_packet(packet)`](code/main.py#L83)
- [`def release_decision(packet)`](code/main.py#L122)
- [`def example_packet()`](code/main.py#L132)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
