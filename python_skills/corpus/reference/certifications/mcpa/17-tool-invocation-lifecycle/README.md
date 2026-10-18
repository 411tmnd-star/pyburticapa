# The Tool Invocation Lifecycle

A tool call is not one event. It is a fixed sequence of checkpoints, and exactly where a call stops tells you which of two error channels applies and what a caller should do next.

```
python code/main.py
```

Needs: standard library only  ·  Tests: `python -m unittest discover -s code/tests`

| File | Open it to… |
|---|---|
| [`code/main.py`](code/main.py) | read and run the code |
| [`code/tests/`](code/tests) | the tests |
| [`outputs/`](outputs) | files the code reads or writes (kept in the course's layout) |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
