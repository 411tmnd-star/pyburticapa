# Speculative Decoding and EAGLE

A frontier LLM generating one token requires a full forward pass over billions of parameters. That forward pass is massively over-provisioned: most of the time a much smaller model can guess the next 3-5 tokens correctly, and the big model only needs to *verify* the guess. When the guess is right you got 5 tokens for the price of one. Speculative decoding (Leviathan et al. 2023) made this exact, and EAGLE-3 (2025) pushed acceptance rates to ~4.5 tokens per verify — a 4-5x speedup at matched output distribution.

```
python code/main.py
```

Needs: numpy

| File | Open it to… |
|---|---|
| [`code/main.py`](code/main.py) | read and run the code |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
