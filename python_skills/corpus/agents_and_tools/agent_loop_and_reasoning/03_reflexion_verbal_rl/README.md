# Reflexion: Verbal Reinforcement Learning

> Gradient-based RL needs thousands of trials and a GPU cluster to fix a failure mode. Reflexion (Shinn et al., NeurIPS 2023) does it in natural language: after each failed trial, the agent writes a reflection, stores it in episodic memory, and conditions the next trial on that memory. This is the pattern behind Letta's sleep-time compute, Claude Code's CLAUDE.md learnings, and pro-workflow's learn-rule.

## What `main.py` does

```text
Toy Reflexion loop — Actor, Evaluator, Self-Reflector, Episodic memory.

Task: pick three integers from 1..9 that sum to a target. The Actor is
scripted to start with a bad strategy and adapt when reflections are present.
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

- Theory: [phases/14-agent-engineering/03-reflexion-verbal-rl/docs/en.md](../../../../course/ai_engineering/phases/14-agent-engineering/03-reflexion-verbal-rl/docs/en.md)
- Quiz: [phases/14-agent-engineering/03-reflexion-verbal-rl/quiz.json](../../../../course/ai_engineering/phases/14-agent-engineering/03-reflexion-verbal-rl/quiz.json)
- Diagram: [phases/14-agent-engineering/03-reflexion-verbal-rl/assets/reflexion-loop.svg](../../../../course/ai_engineering/phases/14-agent-engineering/03-reflexion-verbal-rl/assets/reflexion-loop.svg)
- LLM instructions: [skill-reflexion-buffer.md](../../../../llm_instructions/skills/phases/14-agent-engineering/03-reflexion-verbal-rl/outputs/skill-reflexion-buffer.md)
- Original lesson folder: [phases/14-agent-engineering/03-reflexion-verbal-rl](../../../../course/ai_engineering/phases/14-agent-engineering/03-reflexion-verbal-rl)

## Use it in a workflow

Not adapted yet. When you adapt it, write the skill name in the `notes` column of `CATALOG.csv`.
