# Planning with HTN and Evolutionary Search

> Symbolic planning handles the cases where the plan is provably correct. Evolutionary code search handles the cases where the fitness function is machine-checkable. ChatHTN (2025) and AlphaEvolve (2025) show what each unlocks when paired with an LLM.

## What `main.py` does

```text
HTN planner (with scripted LLM fallback) plus a toy evolutionary search.

Two demos, one file. HTN shows the ChatHTN pattern: symbolic planner falls back
to an LLM for decomposition when no method matches. Evolutionary search shows
the AlphaEvolve pattern: ensemble mutations filtered by a deterministic evaluator.
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

- Theory: [phases/14-agent-engineering/11-planning-htn-and-evolutionary/docs/en.md](../../../../course/ai_engineering/phases/14-agent-engineering/11-planning-htn-and-evolutionary/docs/en.md)
- Quiz: [phases/14-agent-engineering/11-planning-htn-and-evolutionary/quiz.json](../../../../course/ai_engineering/phases/14-agent-engineering/11-planning-htn-and-evolutionary/quiz.json)
- Diagram: [phases/14-agent-engineering/11-planning-htn-and-evolutionary/assets/htn-vs-evolve.svg](../../../../course/ai_engineering/phases/14-agent-engineering/11-planning-htn-and-evolutionary/assets/htn-vs-evolve.svg)
- LLM instructions: [skill-hybrid-planner.md](../../../../llm_instructions/skills/phases/14-agent-engineering/11-planning-htn-and-evolutionary/outputs/skill-hybrid-planner.md)
- Original lesson folder: [phases/14-agent-engineering/11-planning-htn-and-evolutionary](../../../../course/ai_engineering/phases/14-agent-engineering/11-planning-htn-and-evolutionary)

## Use it in a workflow

Not adapted yet. When you adapt it, write the skill name in the `notes` column of `CATALOG.csv`.
