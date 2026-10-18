# Hybrid Memory: Vector + Graph + KV

Hybrid memory runs three stores in parallel — vector for semantic similarity, KV for fast fact lookup, graph for entity-relationship reasoning — with a scoring layer that fuses them on retrieval. This is a widely used production pattern for external memory; Mem0 (Chhikara et al., 2025) is one reference implementation.

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
