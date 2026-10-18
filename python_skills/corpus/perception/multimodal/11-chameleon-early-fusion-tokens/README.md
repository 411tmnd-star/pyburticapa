# Chameleon and Early-Fusion Token-Only Multimodal Models

Every VLM we have seen so far keeps images and text separate. Visual tokens come from a vision encoder, flow into a projector, then meet text inside the LLM. The vision and text vocabularies never overlap. Chameleon (Meta, May 2024) asked: what if they did? Train a VQ-VAE that turns an image into a sequence of discrete tokens from a shared vocabulary. Every multimodal document is now one sequence — text tokens and image tokens interleaved, a single autoregressive loss. Side effect: the model can generate mixed-modality outputs — alternating text and image tokens in a single inference call. This lesson reads the early-fusion thesis and builds a toy version end to end.

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
