# How it works: Society of Mind and Multi-Agent Debate

## `main.py`

```text
Multi-agent debate on a numeric task (Du et al. 2023 style).

3 agents, each starts with a different (possibly wrong) answer. In each round,
every agent reads the others' answers and revises toward the weighted average.
Convergence is logged per round. Agent policies are scripted, not LLM-backed --
the point is the debate dynamics.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class DebateAgent`](main.py#L19)
  - [`def initial(self)`](main.py#L25)
  - [`def revise(self, others)`](main.py#L28): Weighted average of own + others, weighted by confidence.
- [`def agreement_score(agents, tol)`](main.py#L39): Fraction of agents within tol of the mean.
- [`def error_vs_truth(agents)`](main.py#L46)
- [`def run_debate(agents, rounds, label)`](main.py#L51)
- [`def fresh_team(seed)`](main.py#L70)
- [`def single_shot_majority(agents)`](main.py#L79): Control: majority on round-0 answers (self-consistency baseline).
- [`def main()`](main.py#L84)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
