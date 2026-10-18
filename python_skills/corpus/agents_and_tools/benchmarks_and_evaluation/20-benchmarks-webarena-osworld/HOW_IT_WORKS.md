# How it works: Benchmarks: WebArena and OSWorld

## `main.py`

```text
Toy web-agent harness with execution-based eval and trajectory efficiency.

Models a minimal shopping app; 3 tasks with gold trajectories; a scripted agent
attempts each task; we record success + steps-over-gold per OSWorld-Human.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ShoppingApp`](main.py#L13)
  - [`def list_items(self)`](main.py#L23)
  - [`def add_to_cart(self, sku, qty)`](main.py#L26)
  - [`def remove_from_cart(self, sku)`](main.py#L32)
  - [`def checkout(self)`](main.py#L38)
- [`class Task`](main.py#L50)
- [`def _agent_task_1(app)`](main.py#L58)
- [`def _agent_task_2(app)`](main.py#L66)
- [`def _agent_task_3(app)`](main.py#L76)
- [`def main()`](main.py#L89)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
