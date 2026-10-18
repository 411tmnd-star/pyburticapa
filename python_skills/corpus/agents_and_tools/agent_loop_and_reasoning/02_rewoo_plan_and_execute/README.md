# ReWOO and Plan-and-Execute: Decoupled Planning

> ReAct interleaves thought and action in one stream. ReWOO separates them: one big plan up front, then execute. 5x fewer tokens, +4% accuracy on HotpotQA, and you can distill the planner into a 7B model. Plan-and-Execute generalized it; Plan-and-Act scaled it to web navigation.

## What `main.py` does

```text
Toy ReWOO — Planner, Workers, Solver. Stdlib only.

Demonstrates the decoupled pattern from Xu et al. (arXiv:2305.18323):
  1. Planner emits a DAG of (tool, args) steps with references (#E1, #E2, ...).
  2. Workers run each step in topological order.
  3. Solver composes the final answer from question + plan + evidence.

Compare run_rewoo() vs run_react() at the bottom for token-use intuition.
```

(from the script's own docstring)

## Run it

From this folder:

```
python main.py
```

Needs: standard library only

## Files

- [`main.py`](main.py)

These are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.

## Learn more

- Theory: [phases/14-agent-engineering/02-rewoo-plan-and-execute/docs/en.md](../../../../course/ai_engineering/phases/14-agent-engineering/02-rewoo-plan-and-execute/docs/en.md)
- Quiz: [phases/14-agent-engineering/02-rewoo-plan-and-execute/quiz.json](../../../../course/ai_engineering/phases/14-agent-engineering/02-rewoo-plan-and-execute/quiz.json)
- Diagram: [phases/14-agent-engineering/02-rewoo-plan-and-execute/assets/rewoo-dag.svg](../../../../course/ai_engineering/phases/14-agent-engineering/02-rewoo-plan-and-execute/assets/rewoo-dag.svg)
- LLM instructions: [skill-rewoo-planner.md](../../../../llm_instructions/skills/phases/14-agent-engineering/02-rewoo-plan-and-execute/outputs/skill-rewoo-planner.md)
- Original lesson folder: [phases/14-agent-engineering/02-rewoo-plan-and-execute](../../../../course/ai_engineering/phases/14-agent-engineering/02-rewoo-plan-and-execute)

## Use it in a workflow

Not adapted yet. When you adapt it, write the skill name in the `notes` column of `CATALOG.csv`.
