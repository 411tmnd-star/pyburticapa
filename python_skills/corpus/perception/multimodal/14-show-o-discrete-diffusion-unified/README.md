# Show-o and Discrete-Diffusion Unified Models

Transfusion mixes continuous and discrete representations. Show-o (Xie et al., August 2024) goes the other way: text tokens use causal next-token prediction, image tokens use masked discrete diffusion in the spirit of MaskGIT. Both sit inside one transformer with a hybrid attention mask. The result unifies VQA, text-to-image, inpainting, and mixed-modality generation on one backbone, one tokenizer per modality, one loss formulation (next-token extended to masked prediction). This lesson walks the Show-o design — why masked discrete diffusion is a parallel, few-step image generator — and contrasts with Transfusion and Emu3.

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
