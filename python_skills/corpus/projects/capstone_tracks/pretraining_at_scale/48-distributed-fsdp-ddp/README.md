# Distributed Data Parallel and FSDP from Scratch

Multi-rank training is two collectives and one rule. Broadcast the parameters at startup, average the gradients after backward, never let the ranks disagree about what step they are on.

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
