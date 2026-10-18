# How it works: Vision Transformers (ViT)

## `main.py`

```text
Vision Transformer (ViT) — the patchify + embed front end.

Pure stdlib. Takes a toy 24x24x3 image, cuts it into 6x6 patches,
projects each to a d_model vector, prepends [CLS], adds 2D position.
Verifies shapes and counts parameters for real ViT configs.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_image(H, W, C, seed)`](main.py#L12)
- [`def patchify(image, patch_size)`](main.py#L17)
- [`def linear_project(patches, d_model, rng)`](main.py#L37)
- [`def cls_and_pos(tokens, grid_h, grid_w, rng)`](main.py#L55): Prepend learnable [CLS] and add 2D sinusoidal positional encoding.
- [`def pos_2d(H, W, d_model)`](main.py#L72): 2D sinusoidal: split d_model in half, encode row and col independently.
- [`def param_count_vit(d_model, n_layers, n_heads, ffn_expansion, num_patches, num_classes)`](main.py#L90): Approximate ViT parameter count (patch embed + transformer + head).
- [`def main()`](main.py#L106)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
