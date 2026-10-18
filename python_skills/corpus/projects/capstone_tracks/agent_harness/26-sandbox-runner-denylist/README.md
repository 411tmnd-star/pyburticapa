# Capstone Lesson 26: Sandbox Runner with Denylist and Path Jail

The verification gate decides whether a tool call should run. The sandbox decides what happens when it does. This lesson ships a subprocess runner that refuses dangerous executables, refuses dangerous argv shapes, jails every file path to a project root, truncates oversized output, and kills runaway processes on a wall-clock timeout. It is the second of two layers that sit between the model and the operating system.

```
python code/main.py
```

Needs: standard library only  ·  Tests: `python -m unittest discover -s code/tests`

| File | Open it to… |
|---|---|
| [`code/main.py`](code/main.py) | read and run the code |
| [`code/tests/`](code/tests) | the tests |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
