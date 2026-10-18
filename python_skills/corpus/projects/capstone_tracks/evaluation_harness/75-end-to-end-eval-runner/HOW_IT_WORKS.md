# How it works: End-to-End Eval Runner

## `code/main.py`

```text
End-to-end eval runner: tasks -> adapter -> metric -> calibration -> leaderboard.

Conceptual references:
- ./docs/en.md (this lesson)
- lesson 70 (task spec), 71 (metrics), 72 (code exec), 73 (calibration), 74 (leaderboard)

Stdlib + numpy. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def _load_sibling(lesson_dir, module_name)`](code/main.py#L23)
- [`class Generation`](code/main.py#L49)
- [`class ModelAdapter`](code/main.py#L56)
  - [`def generate(self, prompt, task)`](code/main.py#L59)
- [`class TaskResult`](code/main.py#L64)
- [`class EvalReport`](code/main.py#L78)
  - [`def to_json(self)`](code/main.py#L86)
- [`def _correct_from_score(metric_name, score, threshold)`](code/main.py#L99)
- [`def _score_one(adapter, task, timeout_s)`](code/main.py#L105)
- [`def run_eval(adapters, tasks, parallel, max_workers, code_exec_timeout_s)`](code/main.py#L137)
- [`def build_eval_runs(results)`](code/main.py#L177)
- [`def _calibration_blocks(buf)`](code/main.py#L190)
- [`def _perplexity_blocks(adapters, buf, results, adapter_token_stats)`](code/main.py#L208)
- [`def render_report(adapters, tasks, results, calibration_buf, adapter_token_stats, wall_seconds)`](code/main.py#L223)
- [`def render_markdown_block(report)`](code/main.py#L251)
- [`class RuleBasedAdapter`](code/main.py#L268)
  - [`def generate(self, prompt, task)`](code/main.py#L274)
- [`class NoisyAdapter`](code/main.py#L291)
  - [`def generate(self, prompt, task)`](code/main.py#L298)
- [`class BiasedAdapter`](code/main.py#L313)
  - [`def generate(self, prompt, task)`](code/main.py#L320)
- [`def _load_fixture_tasks()`](code/main.py#L339)
- [`def demo()`](code/main.py#L349)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
