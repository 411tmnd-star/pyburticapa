# How it works: Reflexion: Verbal Reinforcement Learning

## `main.py`

```text
Toy Reflexion loop — Actor, Evaluator, Self-Reflector, Episodic memory.

Task: pick three integers from 1..9 that sum to a target. The Actor is
scripted to start with a bad strategy and adapt when reflections are present.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Reflection`](main.py#L16)
- [`class EpisodicMemory`](main.py#L22)
  - [`def add(self, r)`](main.py#L26)
  - [`def as_prompt(self)`](main.py#L31)
- [`class Actor`](main.py#L38): Scripted policy. Without reflections it stays on bad choices; with
  - [`def act(self, memory)`](main.py#L42)
- [`def binary_evaluator(attempt, target)`](main.py#L53)
- [`class SelfReflector`](main.py#L58)
  - [`def reflect(self, attempt, delta)`](main.py#L59)
- [`class TrialResult`](main.py#L68)
- [`def run_reflexion(max_trials, use_memory)`](main.py#L76)
- [`def summarize(trials, name)`](main.py#L92)
- [`def main()`](main.py#L104)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
