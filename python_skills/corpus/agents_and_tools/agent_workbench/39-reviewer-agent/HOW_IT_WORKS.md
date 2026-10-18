# How it works: Reviewer Agent: Separate Builder from Marker

## `main.py`

```text
Reviewer agent stub with a five-dimension rubric.

Consumes builder artifacts (diff summary, state, feedback, verification verdict)
and emits review_report.json with per-dimension scores and a final verdict.

In production each dimension scorer calls an LLM. Here we keep them
deterministic for the lesson — the structure is what travels.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ReviewerInputs`](main.py#L22)
- [`class DimensionScore`](main.py#L32)
- [`class ReviewReport`](main.py#L39)
- [`def score_problem_fit(inputs)`](main.py#L46)
- [`def score_scope_discipline(inputs)`](main.py#L55)
- [`def score_assumptions(inputs)`](main.py#L64)
- [`def score_verification(inputs)`](main.py#L71)
- [`def score_handoff(inputs)`](main.py#L80)
- [`def review(inputs)`](main.py#L91)
- [`def main()`](main.py#L104)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
