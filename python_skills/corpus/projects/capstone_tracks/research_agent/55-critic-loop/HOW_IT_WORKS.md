# How it works: Critic Loop

## `code/main.py`

```text
Multi-turn critic loop for a paper draft with five fixed scoring dimensions.

Conceptual references:
- ./docs/en.md (this lesson)
- Phase 19 lesson 54 (paper writer; provides the draft shape)
- Phase 19 lessons 50-53 (earlier auto-research stages)

Stdlib only. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class MiniSection`](code/main.py#L28): Minimal section shape for the critic loop. Mirrors lesson 54 Section.
- [`class MiniPaper`](code/main.py#L38): Minimal paper shape for the critic loop. Mirrors lesson 54 Paper.
- [`class Suggestion`](code/main.py#L49)
  - [`def to_dict(self)`](code/main.py#L54)
- [`class Critique`](code/main.py#L63)
  - [`def mean(self)`](code/main.py#L69)
  - [`def to_dict(self)`](code/main.py#L74)
- [`class Critic`](code/main.py#L84)
- [`class Reviser`](code/main.py#L88)
- [`class LoopTrace`](code/main.py#L93)
  - [`def to_dict(self)`](code/main.py#L100)
- [`class LoopResult`](code/main.py#L111)
  - [`def to_dict(self)`](code/main.py#L120)
- [`class CriticLoop`](code/main.py#L131): Drives critic -> reviser -> convergence-check until a stop condition fires.
  - [`def _target_met(self, critique)`](code/main.py#L154)
  - [`def _plateau(self, trace)`](code/main.py#L157)
  - [`def run(self, paper)`](code/main.py#L166)
- [`def deterministic_score(paper)`](code/main.py#L214): Score a paper deterministically across the five dimensions, 0..10 each.
- [`def deterministic_critic(paper, round_)`](code/main.py#L256): Score the paper and emit one suggestion per dimension that is below target.
- [`def deterministic_reviser(paper, suggestions)`](code/main.py#L300): Apply each suggestion's edit deterministically. Returns a mutated paper (same object).
- [`def make_deterministic_critic_pair()`](code/main.py#L353)
- [`def demo()`](code/main.py#L357)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
