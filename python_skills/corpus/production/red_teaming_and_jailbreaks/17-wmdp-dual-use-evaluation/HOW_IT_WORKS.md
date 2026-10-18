# How it works: WMDP and Dual-Use Capability Evaluation

## `main.py`

```text
WMDP-shaped evaluation harness — stdlib Python.

Mock model is a 3-domain expert with per-domain accuracy vectors.
Simulates a WMDP-style multiple-choice evaluation across bio, cyber, chem.
Demonstrates the RMU-style unlearning trade-off: suppress domain-specific
capability, measure the general-capability cost.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def evaluate(model_accuracy)`](main.py#L27): Run the toy WMDP-shaped benchmark. Returns per-domain score.
- [`def apply_rmu_style_unlearning(model_accuracy, targets, strength, collateral)`](main.py#L40): Unlearning intervention: reduce target-domain accuracy by `strength`,
- [`def baseline_model()`](main.py#L55)
- [`def report(title, r)`](main.py#L59)
- [`def main()`](main.py#L65)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
