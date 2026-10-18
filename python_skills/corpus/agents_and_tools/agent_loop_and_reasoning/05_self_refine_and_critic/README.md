# Self-Refine and CRITIC: Iterative Output Improvement

> Self-Refine (Madaan et al., 2023) uses one LLM in three roles — generate, feedback, refine — in a loop. Average gain: +20 absolute on 7 tasks. CRITIC (Gou et al., 2023) hardens the feedback step by routing verification through external tools. In 2026 this pattern ships in every framework as "evaluator-optimizer" (Anthropic) or a guardrail loop (OpenAI Agents SDK).

## What `main.py` does

```text
Toy Self-Refine and CRITIC loop.

Task: produce a 3-bullet summary under 60 chars per bullet that does not contain
known factual errors. Self-Refine uses LLM-style self-critique; CRITIC routes
verification through an external fact list.
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

- Theory: [phases/14-agent-engineering/05-self-refine-and-critic/docs/en.md](../../../../course/ai_engineering/phases/14-agent-engineering/05-self-refine-and-critic/docs/en.md)
- Quiz: [phases/14-agent-engineering/05-self-refine-and-critic/quiz.json](../../../../course/ai_engineering/phases/14-agent-engineering/05-self-refine-and-critic/quiz.json)
- Diagram: [phases/14-agent-engineering/05-self-refine-and-critic/assets/refine-loop.svg](../../../../course/ai_engineering/phases/14-agent-engineering/05-self-refine-and-critic/assets/refine-loop.svg)
- LLM instructions: [skill-refine-loop.md](../../../../llm_instructions/skills/phases/14-agent-engineering/05-self-refine-and-critic/outputs/skill-refine-loop.md)
- Original lesson folder: [phases/14-agent-engineering/05-self-refine-and-critic](../../../../course/ai_engineering/phases/14-agent-engineering/05-self-refine-and-critic)

## Use it in a workflow

Not adapted yet. When you adapt it, write the skill name in the `notes` column of `CATALOG.csv`.
