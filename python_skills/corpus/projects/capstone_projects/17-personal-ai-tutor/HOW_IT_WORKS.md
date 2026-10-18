# How it works: Capstone 17 — Personal AI Tutor (Adaptive, Multimodal, with Memory)

## `main.py`

```text
Personal AI tutor — Bayesian knowledge tracing + Socratic policy scaffold.

The hard architectural primitive is the learner model: per-concept mastery
probability updated by Bayesian knowledge tracing after each interaction,
feeding into a curriculum-graph walk that chooses the next concept. This
scaffold implements BKT, a curriculum DAG, a Socratic policy decision, and
a simulated two-learner study.

Run:  python main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class BKTParams`](main.py#L24)
- [`def bkt_update(mastery, correct, p)`](main.py#L31)
- [`class Concept`](main.py#L48)
- [`def curriculum_map(concepts)`](main.py#L68)
- [`class LearnerState`](main.py#L77)
- [`def next_concept(state, cmap, master_threshold)`](main.py#L87)
- [`def socratic_policy(state, concept, correct)`](main.py#L101)
- [`def simulate_answer(learner_knowledge, concept_difficulty, rng)`](main.py#L116): Simulate whether the learner answers correctly.
- [`def run_adaptive(learner_id, inherent_ability, cmap, n_turns, rng)`](main.py#L129)
- [`def run_baseline(learner_id, inherent_ability, cmap, n_turns, rng)`](main.py#L158): Non-adaptive concept selection (round-robin). Mastery is still updated
- [`def mastery_sum(state, cmap)`](main.py#L176)
- [`def main()`](main.py#L180)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
