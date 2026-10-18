# How it works: Hierarchical Architecture and Its Failure Mode

## `main.py`

```text
Hierarchical multi-agent with decomposition-drift demo.

3-level hierarchy: top manager -> sub-managers -> workers.
Run happy path and a perturbed path where the top manager mislabels one branch.
Watch the error cascade.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class LeafOutput`](main.py#L13)
- [`class SubSummary`](main.py#L20)
- [`class TopSynthesis`](main.py#L27)
- [`class Worker`](main.py#L33)
  - [`def run(self, question)`](main.py#L38)
  - [`def _match_key(self, q)`](main.py#L43)
- [`class SubManager`](main.py#L51)
  - [`def run(self, task)`](main.py#L57)
- [`class TopManager`](main.py#L66)
  - [`def run(self, task, branch_labels)`](main.py#L71)
- [`def build_hierarchy()`](main.py#L88)
- [`def render(label, synth)`](main.py#L106)
- [`def main()`](main.py#L117)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
