# Any-Resolution Vision: Patch-n'-Pack and NaFlex

Real images are not 224x224 squares. A receipt is 9:16, a chart is 16:9, a medical scan might be 4096x4096, a mobile screenshot is 9:19.5. The pre-2024 VLM answer — resize everything to a fixed square — threw away the signal that makes OCR, document understanding, and high-resolution scene parsing work. NaViT (Google, 2023) showed you could pack variable-resolution patches into a single transformer batch with block-diagonal masking. Qwen2-VL's M-RoPE (2024) dropped absolute positional tables entirely. LLaVA-NeXT's AnyRes tiled high-resolution images into a base + sub-images. SigLIP 2's NaFlex variant (2025) is now the default encoder for open VLMs that want a single checkpoint to serve every aspect ratio. This lesson implements patch-n'-pack end to end.

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
