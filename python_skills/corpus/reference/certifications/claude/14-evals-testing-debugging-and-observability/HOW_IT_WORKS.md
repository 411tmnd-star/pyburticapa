# How it works: Evals Turn Agent Behavior Into Engineering Evidence

## `code/main.py`

```text
Companion code for:
certifications/claude/lessons/14-evals-testing-debugging-and-observability/docs/en.md
It scores output, tool trajectory, final state, latency, and failures.
The design follows official Anthropic evaluation guidance.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class EvalCase`](code/main.py#L18)
- [`class AgentRun`](code/main.py#L28)
- [`class CaseResult`](code/main.py#L36)
- [`class EvalHarness`](code/main.py#L45)
  - [`def run_case(self, case)`](code/main.py#L49)
  - [`def run_suite(self, cases)`](code/main.py#L65)
- [`def classify_error(exc)`](code/main.py#L79)
- [`def percentile(values, quantile)`](code/main.py#L91)
- [`def validate_release_gate(gate)`](code/main.py#L101): Validate severe-case, regression, trace, and failure-class coverage.
- [`def load_release_gate(path)`](code/main.py#L130)
- [`def _elapsed_ms(started)`](code/main.py#L137)
- [`def demo_agent(prompt)`](code/main.py#L141)
- [`def demo()`](code/main.py#L147)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
