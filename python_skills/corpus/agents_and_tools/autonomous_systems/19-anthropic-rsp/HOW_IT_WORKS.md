# How it works: Anthropic Responsible Scaling Policy v3.0

## `main.py`

```text
RSP v3.0 threshold evaluator — stdlib Python.

Mirrors the decision shape of Anthropic's RSP v3.0 for the AI R&D-4
threshold. Given a candidate model's capability measurements, decide
whether the threshold is crossed and what the affirmative case must
cover.

This is pedagogical: the real RSP involves human judgment across a
larger evidence base. The code is a reading aid, not a policy tool.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class CapabilityMeasurement`](main.py#L18)
- [`def threshold_crossed(m)`](main.py#L40)
- [`def affirmative_case_template(m)`](main.py#L61)
- [`def evaluate(m)`](main.py#L78)
- [`def main()`](main.py#L101)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
