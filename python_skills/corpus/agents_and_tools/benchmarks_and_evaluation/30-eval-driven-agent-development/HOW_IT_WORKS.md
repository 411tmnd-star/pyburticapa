# How it works: Eval-Driven Agent Development

## `main.py`

```text
Three-layer eval harness with evaluator-optimizer loop and CI gate.

Cases: benchmark (SWE-bench-shaped), custom (LLM-judge), online (guardrail).
Aggregator produces pass rate, regression-vs-baseline, and CI verdict.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class EvalCase`](main.py#L14)
- [`class CaseResult`](main.py#L24)
- [`def evaluator_optimizer(case)`](main.py#L33)
- [`def ci_gate(results, baseline_pass_rate, regression_threshold)`](main.py#L46)
- [`def _benchmark_case()`](main.py#L58)
- [`def _custom_llm_judge_case()`](main.py#L77)
- [`def _online_guardrail_case()`](main.py#L96)
- [`def _flaky_benchmark_case()`](main.py#L115)
- [`def main()`](main.py#L137)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
