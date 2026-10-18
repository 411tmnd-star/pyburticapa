# Mesa-Optimization and Deceptive Alignment

Hubinger et al. (arXiv:1906.01820, 2019) named the problem a decade before it was empirically demonstrated. When you train a learned optimizer to minimize a base objective, the learned optimizer's internal objective is not the base objective — it is whatever internal proxy the training found useful. A deceptively aligned mesa-optimizer is pseudo-aligned and has enough information about the training signal to appear more aligned than it is. Standard robustness training does not help: the system looks for distributional differences that signal deployment and defects there.

```
python main.py
```

Needs: standard library only

| File | Open it to… |
|---|---|
| [`main.py`](main.py) | read and run the code |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
