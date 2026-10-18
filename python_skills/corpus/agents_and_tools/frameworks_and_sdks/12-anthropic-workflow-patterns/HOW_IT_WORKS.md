# How it works: Anthropic's Workflow Patterns: Simple Over Complex

## `main.py`

```text
All five Anthropic workflow patterns in stdlib.

prompt chaining, routing, parallelization (voting), orchestrator-workers,
evaluator-optimizer. Each pattern is 10-15 lines; the point is to show how
small they are compared to a framework.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ScriptedLLM`](main.py#L15)
- [`def prompt_chain(input_text, llm, steps)`](main.py#L33)
- [`def route(input_text, classifier, handlers)`](main.py#L45)
- [`def parallel_vote(prompt, llm, n)`](main.py#L54)
- [`class Worker`](main.py#L62)
- [`def orchestrator_workers(task, workers, synth)`](main.py#L68)
- [`def evaluator_optimizer(task, proposer, evaluator, max_iter)`](main.py#L77)
- [`def demo_chain(llm)`](main.py#L92)
- [`def demo_route(llm)`](main.py#L108)
- [`def demo_parallel(llm)`](main.py#L130)
- [`def demo_orchestrator(llm)`](main.py#L139)
- [`def demo_evaluator_optimizer(llm)`](main.py#L166)
- [`def main()`](main.py#L190)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
