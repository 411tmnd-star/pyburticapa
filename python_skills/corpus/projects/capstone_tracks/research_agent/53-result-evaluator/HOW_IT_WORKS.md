# How it works: Result Evaluator

## `code/main.py`

```text
Result evaluator: improvement check, paired t test, log normalisation, verdict.

Conceptual references:
- ./docs/en.md (this lesson)
- Phase 19 Track A lessons 20-29 (agent harness primitives)

Stdlib + numpy (read of result lists). The t test math is pure stdlib.
Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ExperimentResultLike`](code/main.py#L28): Subset of ExperimentResult fields the evaluator depends on.
- [`class MetricSpec`](code/main.py#L41)
  - [`def validate(self)`](code/main.py#L46)
- [`class Verdict`](code/main.py#L54)
  - [`def to_dict(self)`](code/main.py#L68)
- [`class PairingError`](code/main.py#L85): Raised when candidate and baseline results cannot be paired by seed.
- [`def _lentz_betacf(a, b, x, max_iter, eps)`](code/main.py#L89): Continued fraction for the regularised incomplete beta function via Lentz.
- [`def regularised_incomplete_beta(a, b, x)`](code/main.py#L126): I_x(a, b) via the standard Lentz continued fraction, symmetric in x.
- [`def two_sided_t_p_value(t_stat, df)`](code/main.py#L144): Two sided p value for a t statistic with df degrees of freedom.
- [`def paired_t_test(candidate, baseline)`](code/main.py#L153): Return (mean_diff, p_value, n). p_value is None when n < 2.
- [`def _pair_by_seed(candidates, baselines, metric)`](code/main.py#L172)
- [`def _improvement(candidate_mean, baseline_mean, direction)`](code/main.py#L201)
- [`def _log_transform(values, scale)`](code/main.py#L209)
- [`class EvaluatorConfig`](code/main.py#L221)
- [`class Evaluator`](code/main.py#L226): Pure function over (candidate, baseline) result lists; returns a Verdict.
  - [`def evaluate(self, hypothesis_id, metric_spec, candidates, baselines)`](code/main.py#L232)
  - [`def _failed_verdict(self, hypothesis_id, metric_spec, bad)`](code/main.py#L268)
  - [`def _verdict(self, improvement, p_value, n)`](code/main.py#L288)
- [`def _demo()`](code/main.py#L310)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
