# How it works: Repo Memory and Durable State

## `main.py`

```text
Schema-first agent state with atomic writes.

Writes JSON Schema files for `agent_state.json` and `task_board.json`,
implements a tiny stdlib validator that handles the subset we need
(required, type, enum, pattern, items), and a StateManager with
temp-and-rename writes so a partial failure cannot corrupt the file.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class SchemaError`](main.py#L56)
- [`def _check_type(value, types)`](main.py#L60)
- [`def validate(value, schema, path)`](main.py#L76)
- [`def atomic_write(path, content)`](main.py#L99)
- [`class StateManager`](main.py#L113)
  - [`def load(self)`](main.py#L118)
  - [`def commit(self, state)`](main.py#L123)
- [`def main()`](main.py#L128)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
