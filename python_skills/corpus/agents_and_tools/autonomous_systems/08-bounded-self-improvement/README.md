# Bounded Self-Improvement Designs

Research has converged on four primitives for bounding a self-improvement loop. Formal invariants that must hold across every edit. Alignment anchors that cannot be modified. Multi-objective constraints where every dimension (safety, fairness, robustness) must hold, not just performance. Regression detection that pauses the loop when historical metrics suggest capability loss. None of them is a proof of safety — information-theoretic results (Kolmogorov complexity, Lob's theorem) bound what any system can prove about its own successors. They are mitigations that raise the cost of silent failure.

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
