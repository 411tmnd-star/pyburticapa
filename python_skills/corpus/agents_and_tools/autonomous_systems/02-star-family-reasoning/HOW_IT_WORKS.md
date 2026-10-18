# How it works: STaR, V-STaR, Quiet-STaR — Self-Taught Reasoning

## `main.py`

```text
STaR-loop simulator — stdlib Python.

Toy arithmetic task. A "model" produces rationales via three strategies:
  1. sound reasoning (always correct)
  2. lazy shortcut (right answer 40% of the time on in-distribution problems,
     near zero on out-of-distribution)
  3. random guess

STaR bootstrap rounds filter to correct-answer rationales. Without shielding,
shortcut rationales get reinforced because they look correct in-distribution.

The simulator also runs a V-STaR-style inference selector: sample N rationales,
pick the verifier's top choice. The verifier is itself trained on the same
data, so it can rank confidently wrong rationales above honestly uncertain
ones on OOD.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Trace`](main.py#L25)
- [`class Model`](main.py#L32)
  - [`def sample(self, on_ood)`](main.py#L37)
- [`def evaluate(model, n, on_ood)`](main.py#L49): Return (answer accuracy, rationale soundness fraction).
- [`def star_round(model, n_samples)`](main.py#L62): One round of STaR: keep correct-answer traces, retrain.
- [`def run_star(rounds, initial)`](main.py#L92)
- [`def vstar_infer(model, samples_per_problem, n_problems, on_ood)`](main.py#L101): V-STaR-style best-of-N: pick the trace we'd believe. We model the
- [`def report_round(label, models)`](main.py#L129)
- [`def vstar_report(model)`](main.py#L141)
- [`def main()`](main.py#L151)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
