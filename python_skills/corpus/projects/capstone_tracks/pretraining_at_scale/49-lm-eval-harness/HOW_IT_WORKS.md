# How it works: Language Model Evaluation Harness

## `main.py`

```text
Language model evaluation harness from scratch.

Task spec is a JSONL line per example with `prompt`, `targets`, and
`metric`. Five metrics ship: exact match for arithmetic, rouge-l F1 for
summary, executable check for code, accuracy for multiple choice, and
substring contains for generation. The runner batches examples by task,
runs them against a swappable model adapter, and emits a leaderboard
JSON with per-task and overall scores.

The model adapter is the seam. The default adapter is a deterministic
toy that pattern-matches the prompt; it has just enough behavior to make
the harness's scoring code exercise every metric. Swap the adapter for
an HTTP client, a local inference call, or a mock in tests.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Example`](main.py#L41)
- [`class TaskResult`](main.py#L50)
- [`class Leaderboard`](main.py#L61)
- [`class ModelAdapter`](main.py#L68)
  - [`def generate(self, prompts)`](main.py#L69)
  - [`def name(self)`](main.py#L73)
- [`class ToyAdapter`](main.py#L77): Deterministic adapter that pattern-matches each task.
  - [`def generate(self, prompts)`](main.py#L87)
  - [`def _answer(self, prompt)`](main.py#L90)
- [`def safe_arith_eval(expr)`](main.py#L133): Evaluate a small arithmetic expression without exposing eval.
- [`def _safe_eval(node)`](main.py#L139)
- [`def normalize(s)`](main.py#L149)
- [`def metric_exact_match(prediction, targets)`](main.py#L153)
- [`def metric_substring_contains(prediction, targets)`](main.py#L158)
- [`def metric_multiple_choice(prediction, targets)`](main.py#L163)
- [`def _tokens(s)`](main.py#L168)
- [`def _lcs_length(a, b)`](main.py#L172)
- [`def metric_rouge_l(prediction, targets)`](main.py#L187)
- [`def metric_code_exec(prediction, targets, extras)`](main.py#L209): Execute the prediction in a small namespace and compare against
- [`def load_task_jsonl(path)`](main.py#L255)
- [`def write_task_jsonl(examples, path)`](main.py#L276)
- [`def run_task(task_name, examples, adapter)`](main.py#L289)
- [`def run_leaderboard(tasks, adapter)`](main.py#L340)
- [`def write_leaderboard(board, path)`](main.py#L362)
- [`def build_arithmetic_task()`](main.py#L391)
- [`def build_summary_task()`](main.py#L396)
- [`def build_code_task()`](main.py#L407)
- [`def build_choice_task()`](main.py#L427)
- [`def build_generation_task()`](main.py#L438)
- [`def seed_fixture_tasks(target_dir)`](main.py#L449)
- [`def load_all_tasks(task_dir)`](main.py#L466)
- [`def parse_args()`](main.py#L473)
- [`def main()`](main.py#L483)

## `test_main.py`

```text
Tests for the eval harness: metric scoring, task loading, runner.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class MetricTests`](test_main.py#L17)
  - [`def test_exact_match_normalizes_case_and_whitespace(self)`](test_main.py#L18)
  - [`def test_multiple_choice_uses_first_letter(self)`](test_main.py#L22)
  - [`def test_rouge_l_returns_perfect_on_identical_strings(self)`](test_main.py#L26)
  - [`def test_rouge_l_partial_overlap_below_one(self)`](test_main.py#L30)
  - [`def test_substring_contains_truthy_when_target_inside(self)`](test_main.py#L35)
  - [`def test_code_exec_runs_pairs_and_blocks_unsafe(self)`](test_main.py#L39)
- [`class SafeArithTests`](test_main.py#L47)
  - [`def test_arith_eval_basic_ops(self)`](test_main.py#L48)
  - [`def test_arith_eval_rejects_calls(self)`](test_main.py#L52)
- [`class TaskIOTests`](test_main.py#L57)
  - [`def test_round_trip_jsonl(self)`](test_main.py#L58)
  - [`def test_load_skips_comments_and_blanks(self)`](test_main.py#L68)
- [`class RunnerTests`](test_main.py#L76)
  - [`def test_runner_full_score_with_toy_adapter(self)`](test_main.py#L77)
  - [`def test_runner_handles_mixed_failure(self)`](test_main.py#L90)
- [`class LeaderboardOutputTests`](test_main.py#L107)
  - [`def test_leaderboard_json_contains_schema(self)`](test_main.py#L108)

## Run and test

From this folder:

```
python main.py
python test_main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
