# How it works: Evaluation & Testing LLM Applications

## `eval_framework.py`

Functions and classes, in file order (click to jump to the line):

- [`class TestCase`](eval_framework.py#L11)
- [`class EvalScore`](eval_framework.py#L24)
- [`class EvalResult`](eval_framework.py#L32)
  - [`def average_score(self)`](eval_framework.py#L44)
- [`def score_with_llm_judge(input_text, model_output, reference_output, criteria)`](eval_framework.py#L82)
- [`def simulate_judge_score(input_text, model_output, reference_output, criterion)`](eval_framework.py#L98)
- [`def generate_judge_reasoning(input_text, model_output, criterion, score)`](eval_framework.py#L140)
- [`def rouge_l_score(reference, hypothesis)`](eval_framework.py#L146)
- [`def word_overlap_score(reference, hypothesis)`](eval_framework.py#L173)
- [`def wilson_confidence_interval(successes, total, z)`](eval_framework.py#L183)
- [`def bootstrap_confidence_interval(scores, n_bootstrap, confidence)`](eval_framework.py#L195)
- [`def run_model(model_name, input_text)`](eval_framework.py#L224)
- [`def build_test_suite()`](eval_framework.py#L231)
- [`def run_eval_suite(test_suite, model_name, prompt_version, criteria)`](eval_framework.py#L284)
- [`def compare_eval_runs(baseline_results, new_results, criteria)`](eval_framework.py#L300)
- [`def print_comparison_report(report)`](eval_framework.py#L371)
- [`def run_demo()`](eval_framework.py#L396)

## Run and test

From this folder:

```
python eval_framework.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
