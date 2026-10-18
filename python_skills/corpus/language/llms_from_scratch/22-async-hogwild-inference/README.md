# Async and Hogwild! Inference

Speculative decoding (Phase 10 · 15) parallelizes tokens within one sequence. Multi-agent frameworks parallelize across whole sequences but force explicit coordination (voting, sub-task splitting). Hogwild! Inference (Rodionov et al., arXiv:2504.06261) does something else: run N instances of the same LLM in parallel against a SHARED key-value cache. Each worker sees every other worker's generated tokens instantly. Modern reasoning models — QwQ, DeepSeek-R1 — can self-coordinate through that shared cache without any fine-tuning. The approach is experimental but it opens an entirely new axis of inference parallelism that sits orthogonal to spec decode. This lesson implements a two-worker Hogwild! simulator in stdlib Python and explains why the shared-cache collaboration emerges from the existing model's reasoning abilities.

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
