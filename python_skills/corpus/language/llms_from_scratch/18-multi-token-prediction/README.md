# Multi-Token Prediction (MTP)

Every autoregressive LLM from GPT-2 to Llama 3 trains on one loss per position: predict the next token. DeepSeek-V3 added a second loss per position: predict the token after that. The extra 14B of parameters (on a 671B model) got distilled back into the main model through gradient flow, and the trained MTP heads were repurposed at inference as speculative-decoding drafters with 80%+ acceptance. 1.8× generation throughput came for free. This lesson builds the sequential MTP module from the DeepSeek technical report, computes the loss and the shared-head parameter layout, and explains why MTP keeps the causal chain while Gloeckle et al.'s original parallel MTP broke it.

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
