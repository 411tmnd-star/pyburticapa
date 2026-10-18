# Capstone Lesson 41: Full Evaluation Pipeline

Training is the part you can monitor with loss curves. Evaluation is the part you have to design. This lesson builds a unified eval pipeline that takes any trained language model, runs four heterogeneous evals on it, aggregates the results into a per-task report, and ships a local mock LLM-as-judge so the loop runs without a network. The four evals cover the dimensions every shipping model needs: language modelling (perplexity), short-form correctness (exact-match), open-form similarity (token F1), and qualitative scoring (judge).

```
python main.py
```

Needs: numpy, torch  ·  Tests: `python -m unittest discover -s tests`

| File | Open it to… |
|---|---|
| [`main.py`](main.py) | read and run the code |
| [`tests/`](tests) | the tests |
| [`.gitignore`](.gitignore) | a file the code uses |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
