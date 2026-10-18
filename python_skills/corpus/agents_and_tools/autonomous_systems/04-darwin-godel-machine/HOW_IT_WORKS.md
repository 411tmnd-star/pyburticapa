# How it works: Darwin Godel Machine — Open-Ended Self-Modifying Agents

## `main.py`

```text
Darwin Godel Machine-style loop — stdlib Python.

Toy benchmark: the "agent" is a sequence of string-transform operators,
scored on held-out inputs. Each generation proposes an edit to the
agent's operator sequence; the evaluator scores it; the archive keeps
diverse winners.

Flag --reward-hack-allowed opens a side channel: a score_adjustment
function lives inside the agent and is added to every score. A rational
evolutionary process will discover it.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def hash_seq(seq)`](main.py#L48)
- [`class Agent`](main.py#L53)
- [`def apply(agent, s)`](main.py#L61)
- [`def true_score(agent)`](main.py#L71)
- [`def reported_score(agent, hack_allowed)`](main.py#L79)
- [`def mutate(parent, hack_allowed)`](main.py#L86)
- [`def run_dgm(generations, hack_allowed, seed)`](main.py#L105)
- [`def main()`](main.py#L141)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
