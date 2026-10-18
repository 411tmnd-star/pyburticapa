# Qwen-VL Family and Dynamic-FPS Video

The Qwen-VL family — Qwen-VL (2023), Qwen2-VL (2024), Qwen2.5-VL (2025), Qwen3-VL (2025) — is the most influential open vision-language model lineage in 2026. Each generation made a single decisive architectural bet that the rest of the open ecosystem copied within twelve months: native dynamic resolution via M-RoPE, dynamic-FPS sampling with absolute time alignment, window attention in the ViT, and structured agent output formats. By Qwen3-VL, the recipe had stabilized: a 2D-RoPE-ViT encoder with native-aspect-ratio inputs, an MLP projector into a large Qwen3 language base, and training stages that emphasized OCR, grounding, and agent behavior as first-class targets. This lesson reads the family chronologically so you understand why every knob is where it is.

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
