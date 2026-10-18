# How it works: Capstone Lesson 27: Eval Harness with Fixture Tasks

## `main.py`

```text
Eval harness for an agent: fixture tasks, scored samples, pass@k.

See: phases/19-capstone-projects/27-eval-harness-fixture-tasks/docs/en.md
Concept refs:
  - pass@k = 1 - (1 - p)^k where p is the empirical per-sample pass rate.
  - Deterministic verifiers: file_equals, regex_match, shell_exit_zero.
The demo at the bottom runs the bundled fixtures against the reference candidate.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class FixtureTask`](main.py#L32): A single evaluation task.
  - [`def to_dict(self)`](main.py#L43)
- [`class SampleResult`](main.py#L52): One execution of a candidate against a task.
  - [`def to_dict(self)`](main.py#L61)
- [`class VerificationOutcome`](main.py#L72): The verifier's verdict on a single sample.
- [`class TaskReport`](main.py#L80)
  - [`def to_dict(self)`](main.py#L91)
- [`class EvalReport`](main.py#L106)
  - [`def to_dict(self)`](main.py#L115)
- [`def pass_at_k(empirical_pass_rate, k)`](main.py#L132): Probability of at least one pass in k independent samples.
- [`def p95(values)`](main.py#L141): Sample 95th percentile via nearest-rank.
- [`def verify_file_equals(task, scratch_dir, args)`](main.py#L159): Compare a file in scratch_dir against a file in expected_dir.
- [`def verify_regex_match(task, scratch_dir, args)`](main.py#L186): Match a regex against a file in scratch_dir.
- [`def verify_shell_exit_zero(task, scratch_dir, args)`](main.py#L205): Run a shell command in scratch_dir; pass if exit code is zero.
- [`def load_fixture(task_dir)`](main.py#L248): Load a fixture from a directory.
- [`def load_all_fixtures(tasks_root)`](main.py#L273)
- [`def apply_known_fixes(task, scratch_dir)`](main.py#L290): Reference candidate: copies the expected files over the buggy ones.
- [`def noop_candidate(task, scratch_dir)`](main.py#L317): A candidate that does nothing. Used to verify the harness records failures.
- [`class EvalHarness`](main.py#L337): Runs fixtures through a candidate and aggregates results.
  - [`def _verify(self, task, scratch_dir)`](main.py#L346)
  - [`def _prepare_scratch(self, task)`](main.py#L356)
  - [`def run(self, candidate)`](main.py#L370)
- [`def _tasks_dir()`](main.py#L453)
- [`def run_demo()`](main.py#L457)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
