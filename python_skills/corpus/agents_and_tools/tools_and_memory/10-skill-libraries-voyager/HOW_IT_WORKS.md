# How it works: Skill Libraries and Lifelong Learning (Voyager)

## `main.py`

```text
Voyager-shaped skill library: register, retrieve, compose, refine.

Stdlib only. Action space is code; skills are retrievable and composable;
failures feed back into the next version.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Skill`](main.py#L14)
- [`class SkillLibrary`](main.py#L25)
  - [`def register(self, skill, dedup)`](main.py#L29)
  - [`def search(self, query, top_k, tag_filter)`](main.py#L43)
  - [`def get(self, name)`](main.py#L61)
  - [`def topo_order(self, name)`](main.py#L64)
  - [`def execute(self, name, context)`](main.py#L85)
  - [`def list_names(self)`](main.py#L110)
- [`def _mine(context)`](main.py#L114)
- [`def _place_table(context)`](main.py#L120)
- [`def _craft_iron_pick_v1(context)`](main.py#L125)
- [`def _craft_iron_pick_v2(context)`](main.py#L141)
- [`def _gather_sticks(context)`](main.py#L155)
- [`def main()`](main.py#L161)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
