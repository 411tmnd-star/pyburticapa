# Jamba — Hybrid SSM-Transformer

State space models (SSMs) and transformers want different things. Transformers buy quality via attention at quadratic cost. SSMs buy linear-time inference and constant memory via a recurrence but lag quality. AI21's Jamba (March 2024) and Jamba 1.5 (August 2024) put them in the same model: 1 Transformer layer for every 7 Mamba layers, MoE on every other block, and a 256k context window that fits on a single 80GB GPU. Mamba-3 (ICLR 2026) tightens the SSM side with complex-valued state spaces and MIMO projections. This lesson reads both architectures end to end and explains why the hybrid recipe has survived three years of scaling when pure-SSM and pure-Transformer long-context attempts have not.

```
python code/main.py
```

Needs: standard library only

| File | Open it to… |
|---|---|
| [`code/main.py`](code/main.py) | read and run the code |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
