# How it works: Role Specialization — Planner, Critic, Executor, Verifier

## `main.py`

```text
Role specialization: planner, executor, critic, verifier.

Builds a small Python function. Critic (LLM-simulated) and verifier (code)
together catch bugs that either alone would miss.

Run twice: once with correct executor output, once with off-spec output.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Spec`](main.py#L14)
- [`class Artifact`](main.py#L22)
- [`class CriticReport`](main.py#L27)
- [`class VerifierReport`](main.py#L33)
- [`def planner(user_wish)`](main.py#L38): Produces a structured spec from a high-level wish.
- [`def executor_correct(spec)`](main.py#L48)
- [`def executor_buggy(spec)`](main.py#L52)
- [`def critic(spec, art)`](main.py#L56): LLM-style review. Pattern-matches against common issues but can be fooled
- [`def verifier(spec, art)`](main.py#L70): Run the code in a sandbox namespace and execute the tests. Deterministic.
- [`def run_pipeline(user_wish, executor, label)`](main.py#L92)
- [`def main()`](main.py#L110)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
