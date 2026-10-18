# Emu3: Next-Token Prediction for Image and Video Generation

BAAI's Emu3 (Wang et al., September 2024) is the 2024 result that should have ended the diffusion-versus-autoregressive debate. A single Llama-style decoder-only transformer, trained only on the next-token-prediction objective, across a unified vocabulary of text + VQ image tokens + 3D VQ video tokens, beats SDXL on image generation and LLaVA-1.6 on perception. No CLIP loss. No diffusion schedule. Classifier-free guidance is used at inference for quality, but the core training objective is next-token prediction with teacher forcing. Published in Nature. This lesson reads the Emu3 thesis — why a better tokenizer plus scale is all you need — and contrasts with diffusion approaches.

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
