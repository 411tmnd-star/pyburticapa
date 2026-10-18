# AlphaEvolve — Evolutionary Coding Agents

Pair a frontier coding model with an evolutionary loop and a machine-checkable evaluator. Let the loop run long enough. It discovers a 4x4 complex-matrix multiplication procedure that uses 48 scalar multiplications — the first improvement over Strassen in 56 years. It also finds a Google-wide Borg scheduling heuristic that recovers ~0.7% of cluster compute in production. The architecture is boring on purpose. The wins come from the evaluator's rigor.

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
