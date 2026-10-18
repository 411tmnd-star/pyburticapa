# Vision Transformers and the Patch-Token Primitive

Before anything multimodal, an image has to become a sequence of tokens a transformer can eat. The 2020 ViT paper answered this with 16x16 pixel patches, a linear projection, and a position embedding. Five years later every 2026 frontier model (Claude Opus 4.7 at 2576px native, Gemini 3.1 Pro, Qwen3.5-Omni) still begins this way — the encoder changed from ViT to DINOv2 to SigLIP 2, register tokens were added, the positional scheme became 2D-RoPE, but the primitive held. This lesson reads the patch-token pipeline end to end and builds it in stdlib Python so the rest of Phase 12 has a concrete mental model for "visual tokens."

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
