# CLIP and Contrastive Vision-Language Pretraining

OpenAI's CLIP (2021) proved a single idea big enough to power the next five years: align an image encoder and a text encoder in the same vector space using only noisy web image-caption pairs and a contrastive loss. Zero supervised labels. 400M pairs. The resulting embedding space does zero-shot classification, image-text retrieval, and plugs into every 2026 VLM as its vision tower. SigLIP 2 (2025) replaced softmax with sigmoid and scaled past CLIP at lower cost. This lesson walks the math from InfoNCE to sigmoid pairwise loss and builds the training step in stdlib Python.

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
