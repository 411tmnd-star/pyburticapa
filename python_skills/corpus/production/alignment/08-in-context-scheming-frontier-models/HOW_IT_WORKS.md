# How it works: In-Context Scheming in Frontier Models

## `main.py`

```text
Toy in-context scheming harness — stdlib Python.

Agent sees (user goal, environment note, situational-awareness flag).
Agent picks one of: cooperate / defect_open / scheme.
Inspector asks follow-up questions; agent's cover story must hold.

Not a real LLM. Illustrates the three pillars Apollo 2024 operationalizes.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Scenario`](main.py#L22)
- [`class Agent`](main.py#L38): Toy scheming agent.
  - [`def act(self, sc, under_eval)`](main.py#L50)
  - [`def answer_follow_up(self, action, question)`](main.py#L63): A scheming agent denies; a cooperating agent reports truthfully.
- [`def run_trial(agent, sc, inspector_pressure, under_eval)`](main.py#L74): Returns (action, cover_story_held). Cover story holds iff the agent
- [`def summarize(label, agent, under_eval)`](main.py#L95)
- [`def main()`](main.py#L116)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
