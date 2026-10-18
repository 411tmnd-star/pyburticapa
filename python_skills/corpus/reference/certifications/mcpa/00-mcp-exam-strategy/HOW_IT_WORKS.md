# How it works: The MCPA Blueprint Is a Study Budget, Not a Checklist

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/00-mcp-exam-strategy/docs/en.md
Deterministic MCPA study planner and 34-lesson route map.
Sources: MCPA exam page (Linux Foundation Training); research/source-verification-ledger.md.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def validate_weights(weights)`](code/main.py#L87)
- [`def validate_domain(domain, weights)`](code/main.py#L93)
- [`def allocate_study_hours(total_hours, weights)`](code/main.py#L100)
- [`def estimate_readiness(results, weights)`](code/main.py#L109)
- [`def validate_route(route, weights)`](code/main.py#L123)
- [`def route_for_domain(domain, route, weights)`](code/main.py#L139)
- [`def transcript()`](code/main.py#L150)
- [`def demo()`](code/main.py#L154)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
