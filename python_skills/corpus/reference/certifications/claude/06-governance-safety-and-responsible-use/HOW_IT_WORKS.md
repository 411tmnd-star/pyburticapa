# How it works: Put Authority Around Capability

## `code/main.py`

```text
Companion code for:
certifications/claude/lessons/06-governance-safety-and-responsible-use/docs/en.md
It scores governance controls and computes a deterministic review threshold.
Confidence never overrides consequence, authority, or reversibility in the runner.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def review_required(consequence, reversible, ambiguity)`](code/main.py#L14)
- [`def validate_control_map(packet)`](code/main.py#L20)
- [`def score_control_map(packet)`](code/main.py#L63)
- [`def load_packet(path)`](code/main.py#L69)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
