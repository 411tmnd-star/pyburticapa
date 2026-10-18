# End-to-End Eval Runner

Five lessons of plumbing, one lesson to glue them. The runner reads the task spec from lesson 70, calls a model through an adapter, scores with lessons 71 and 72, attaches the calibration report from lesson 73, and emits the leaderboard from lesson 74. Demo self-terminates.

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
