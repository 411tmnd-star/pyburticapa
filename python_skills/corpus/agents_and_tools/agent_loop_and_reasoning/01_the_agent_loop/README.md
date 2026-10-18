# The Agent Loop: Observe, Think, Act

> Every agent in 2026 is a variant of the ReAct loop from 2022 — Claude Code, Cursor, Devin, Operator included. Reasoning tokens interleave with tool calls and observations until a stop condition fires. Learn this loop cold before touching any framework.

## What `main.py` does

```text
Toy ReAct agent loop — stdlib only.

Implements the five ingredients from docs/en.md:
  1. message buffer
  2. tool registry
  3. stop condition
  4. turn budget
  5. observation formatter

ToyLLM is a scripted policy so the loop runs offline and deterministic. Swap
ToyLLM for a real provider client and the control flow is identical.
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

- Theory: [phases/14-agent-engineering/01-the-agent-loop/docs/en.md](../../../../course/ai_engineering/phases/14-agent-engineering/01-the-agent-loop/docs/en.md)
- Quiz: [phases/14-agent-engineering/01-the-agent-loop/quiz.json](../../../../course/ai_engineering/phases/14-agent-engineering/01-the-agent-loop/quiz.json)
- Diagram: [phases/14-agent-engineering/01-the-agent-loop/assets/react-loop.svg](../../../../course/ai_engineering/phases/14-agent-engineering/01-the-agent-loop/assets/react-loop.svg)
- TypeScript version: [phases/14-agent-engineering/01-the-agent-loop/code/main.ts](../../../../course/ai_engineering/phases/14-agent-engineering/01-the-agent-loop/code/main.ts)
- LLM instructions: [skill-agent-loop.md](../../../../llm_instructions/skills/phases/14-agent-engineering/01-the-agent-loop/outputs/skill-agent-loop.md)
- Original lesson folder: [phases/14-agent-engineering/01-the-agent-loop](../../../../course/ai_engineering/phases/14-agent-engineering/01-the-agent-loop)

## Use it in a workflow

Not adapted yet. When you adapt it, write the skill name in the `notes` column of `CATALOG.csv`.
