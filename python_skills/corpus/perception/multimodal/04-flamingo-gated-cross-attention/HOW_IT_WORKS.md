# How it works: Flamingo and Gated Cross-Attention for Few-Shot VLMs

## `main.py`

```text
Flamingo gated cross-attention + Perceiver resampler toy — stdlib Python.

Demonstrates:
  - Perceiver resampler: variable-length patch tokens -> fixed-length latents
  - gated cross-attention: tanh(alpha) * cross + x residual
  - alpha=0 -> visual contribution is exactly zero (frozen LLM preserved)
  - interleaved-sequence attention mask for (img1, txt1, img2, txt2)

Pure Python. No numpy, no torch.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def vec(n)`](main.py#L20)
- [`def mat(rows, cols)`](main.py#L24)
- [`def matvec(M, v)`](main.py#L28)
- [`def dot(a, b)`](main.py#L32)
- [`def softmax(xs)`](main.py#L36)
- [`def add(a, b)`](main.py#L43)
- [`def scale(a, s)`](main.py#L47)
- [`def cross_attention(queries, keys, values)`](main.py#L51)
- [`def perceiver_resampler(patches, num_latents, num_blocks)`](main.py#L68): Variable patches -> fixed K latents via cross-attention.
- [`def gated_cross_attention_step(text_hidden, visual_tokens, alpha)`](main.py#L79): y = tanh(alpha) * cross_attn(text, visual) + text_hidden.
- [`def interleaved_mask(sequence)`](main.py#L89): Build a cross-attn mask where each text token attends only to the most
- [`def demo_resampler()`](main.py#L109)
- [`def demo_gate()`](main.py#L119)
- [`def demo_interleaved_mask()`](main.py#L142)
- [`def main()`](main.py#L158)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
