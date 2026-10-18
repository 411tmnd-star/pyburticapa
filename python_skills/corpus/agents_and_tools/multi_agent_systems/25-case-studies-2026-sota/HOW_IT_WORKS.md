# How it works: Case Studies and the 2026 State of the Art

## `main.py`

```text
Case-study mapper: pick the closest 2026 reference for a proposed design.

Stdlib only. Scripted mapping from design attributes to one of three case
studies (Anthropic Research, MetaGPT/ChatDev, OpenClaw/Moltbook) and the
framework-of-choice recommendation.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Design`](main.py#L13)
- [`def map_to_case(d)`](main.py#L58)
- [`def print_case(key)`](main.py#L70)
- [`def print_landscape()`](main.py#L80)
- [`def main()`](main.py#L91)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
