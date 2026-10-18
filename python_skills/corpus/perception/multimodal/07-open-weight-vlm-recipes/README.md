# Open-Weight VLM Recipes: What Actually Matters

The 2024-2026 open-weight VLM literature is a forest of ablation tables. Apple's MM1 tested 13 combinations of image encoder, connector, and data mix. Allen AI's Molmo proved detailed human captions beat GPT-4V distillation. Cambrian-1 ran 20+ encoder comparisons. Idefics2 formalized the five-axis design space. Prismatic VLMs compared 27 training recipes on a controlled benchmark. Out of all that noise, a small set of results holds across papers: image encoder matters more than connector architecture, data mixture matters more than either, and detailed human captions beat distilled synthetic data. This lesson reads those tables so you do not have to.

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
