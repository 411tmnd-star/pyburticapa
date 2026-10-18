# How it works: Anthropic's Model Welfare Program

## `main.py`

```text
Four-step welfare precautionary assessment — stdlib Python.

Given a deployment scenario, computes an expected-value score for four
candidate welfare interventions under specified moral-patienthood
probability and intervention costs. Reference implementation of the
framing Anthropic 2025 uses for Opus 4's end-conversation intervention.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Intervention`](main.py#L17)
- [`class Scenario`](main.py#L24)
- [`def ev(intervention, scenario)`](main.py#L29): Expected-value of the intervention given scenario-specific
- [`def main()`](main.py#L51)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
