# How it works: End-to-End Research Demo

## `code/main.py`

```text
End-to-end auto-research demo: seed -> scheduler -> critic loop -> paper writer.

Conceptual references:
- ./docs/en.md (this lesson)
- Phase 19 lesson 54 (paper writer)
- Phase 19 lesson 55 (critic loop)
- Phase 19 lesson 56 (iteration scheduler)
- Phase 19 lessons 50-53 (earlier auto-research stages; the seed/runner stub here stands in for them)

Stdlib + numpy only. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def _add(path)`](code/main.py#L28)
- [`def _load_module(name, file_path)`](code/main.py#L41)
- [`class NoTriggerError`](code/main.py#L86): No branch crossed the paper threshold; demo cannot pick a best result.
- [`class BestResultError`](code/main.py#L90): Picker received an empty trigger list.
- [`class DemoReport`](code/main.py#L95)
  - [`def to_dict(self)`](code/main.py#L103)
- [`def make_seed_hypotheses()`](code/main.py#L114): Three seed hypotheses, one per research branch. Stand-in for lessons 50-53.
- [`def pick_best_branch(scheduler_report)`](code/main.py#L123): Pick the branch with the highest mean reward among triggered branches.
- [`def _originality_for_reward(reward)`](code/main.py#L139)
- [`def build_mini_paper(branch, reward)`](code/main.py#L147)
- [`def mini_to_full_paper(mini, branch)`](code/main.py#L159): Promote a converged MiniPaper into a full Paper for the writer.
- [`def _run_demo_async(out_dir, seed)`](code/main.py#L211)
- [`def run_demo(out_dir, seed)`](code/main.py#L260)
- [`def demo()`](code/main.py#L266)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
