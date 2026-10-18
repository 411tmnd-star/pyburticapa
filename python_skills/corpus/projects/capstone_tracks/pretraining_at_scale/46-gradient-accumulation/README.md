# Gradient Accumulation

Train at an effective batch you cannot afford, one micro-batch at a time. Scale the loss, hold the optimizer step, and let the gradients pile up.

```
python main.py
python test_main.py
```

Needs: torch

| File | Open it to… |
|---|---|
| [`main.py`](main.py) | read and run the code |
| [`test_main.py`](test_main.py) | run it (command above) |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
