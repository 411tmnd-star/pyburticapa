# Transfusion: Autoregressive Text + Diffusion Image in One Transformer

Chameleon and Emu3 bet everything on discrete tokens. They work, but the quantization bottleneck is visible — the image quality plateaus below continuous-space diffusion models. Transfusion (Meta, Zhou et al., August 2024) takes the opposite bet: keep images continuous, drop the VQ-VAE entirely, and train one transformer with two losses. Text tokens get next-token-prediction. Image patches get a flow-matching / diffusion loss. Both objectives optimize the same weights. The architecture underlying Stable Diffusion 3 (MMDiT) is a close cousin. This lesson reads the Transfusion thesis, builds a toy two-loss trainer, and traces the attention mask that lets one transformer do both jobs.

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
