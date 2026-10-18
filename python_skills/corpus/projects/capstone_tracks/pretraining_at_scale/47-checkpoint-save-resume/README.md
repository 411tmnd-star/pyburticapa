# Checkpoint Save and Resume

Train interrupts kill runs; checkpoints let them continue. Save model, optimizer, scheduler, loss history, step counter, and RNG state, atomically, so a kill at any moment leaves a valid file on disk.

```
python code/main.py
python code/test_main.py
```

Needs: numpy, torch

| File | Open it to… |
|---|---|
| [`code/main.py`](code/main.py) | read and run the code |
| [`code/test_main.py`](code/test_main.py) | run it (command above) |
| [`outputs/`](outputs) | files the code reads or writes (kept in the course's layout) |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
