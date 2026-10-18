# How it works: Vision Transformers and the Patch-Token Primitive

## `main.py`

```text
Vision transformer patch tokenizer and geometry calculator — stdlib Python.

Given a ViT config (patch size, resolution, hidden dim, depth, heads), computes:
  - grid shape and sequence length after patch tokenization
  - per-component parameter count (patch embed, pos, blocks, LN)
  - FLOPs per forward (dominated by attention + MLP)
  - comparison table across canonical 2026 encoders

Also walks a toy 8x8 grayscale image through the patch-flatten-project pipeline
so the primitive is concrete. No numpy, no torch — just ints and lists.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ViTConfig`](main.py#L19)
- [`def grid_shape(image_size, patch_size)`](main.py#L40)
- [`def seq_length(cfg)`](main.py#L49)
- [`def patch_embed_params(cfg)`](main.py#L55)
- [`def pos_embed_params(cfg)`](main.py#L60)
- [`def cls_register_params(cfg)`](main.py#L64)
- [`def block_params(cfg)`](main.py#L69)
- [`def total_params(cfg)`](main.py#L77)
- [`def flops_per_forward(cfg)`](main.py#L88)
- [`def fmt(n)`](main.py#L96)
- [`def patch_toy_image()`](main.py#L106): Walk an 8x8 grayscale image through patch-tokenize with P=4.
- [`def print_config(cfg)`](main.py#L145)
- [`def main()`](main.py#L165)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
