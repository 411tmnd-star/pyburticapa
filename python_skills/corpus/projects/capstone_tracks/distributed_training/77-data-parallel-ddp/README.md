# Data Parallel DDP From Scratch

DistributedDataParallel is a hook on top of allreduce. Wrap a model, broadcast the initial parameters from rank 0 so every rank starts identical, install a backward hook on every parameter that issues an allreduce of the gradient, and the rest is gradient descent. The whole pattern is 200 lines.

```
python main.py
```

Needs: torch  ·  Tests: `python -m unittest discover -s tests`

| File | Open it to… |
|---|---|
| [`main.py`](main.py) | read and run the code |
| [`tests/`](tests) | the tests |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
