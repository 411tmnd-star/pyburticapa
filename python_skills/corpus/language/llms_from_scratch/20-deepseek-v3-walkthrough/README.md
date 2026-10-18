# DeepSeek-V3 Architecture Walkthrough

Phase 10 · Lesson 14 named the six architectural knobs every open model turns. DeepSeek-V3 (December 2024, 671B parameters total, 37B active) turns all six and adds four more: Multi-Head Latent Attention, auxiliary-loss-free load balancing, Multi-Token Prediction, and DualPipe training. This lesson reads DeepSeek-V3's architecture top to bottom and derives every parameter count from the published config. By the end you can explain why the 671B/37B ratio is the right bet and why MLA + MoE together beat either alone at the frontier.

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
