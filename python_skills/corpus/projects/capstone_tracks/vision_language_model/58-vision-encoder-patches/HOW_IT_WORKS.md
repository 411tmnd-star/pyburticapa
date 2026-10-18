# How it works: Vision Encoder Patches

## `code/main.py`

```text
Vision encoder front end: patch embedding plus 2D sinusoidal position.

Tokenizes a 224x224x3 image into a sequence of 196 patch tokens plus a CLS
token. The patch projection is a Conv2d with kernel and stride equal to the
patch size, which is numerically identical to flatten-then-linear. The
position signal is a fixed 2D sinusoidal table; half the embedding dim encodes
row position, the other half encodes column position, at multiple frequencies.

Run with: python3 main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class FrontEndConfig`](code/main.py#L23)
  - [`def grid_size(self)`](code/main.py#L30)
  - [`def num_patches(self)`](code/main.py#L38)
- [`def sinusoidal_2d(grid_h, grid_w, dim)`](code/main.py#L42): Build a deterministic 2D sinusoidal position table of shape (grid_h * grid_w, dim).
- [`class PatchEmbed`](code/main.py#L69): Patch projection as a strided Conv2d.
  - [`def forward(self, x)`](code/main.py#L87)
- [`class VisionFrontEnd`](code/main.py#L105): Patch embed + CLS prepend + 2D sinusoidal position.
  - [`def forward(self, x)`](code/main.py#L123)
- [`def synthesize_image(seed, image_size, channels)`](code/main.py#L132): Build a deterministic 1x3x224x224 fixture from numpy.random.
- [`def unfold_then_linear(x, weight, bias, patch_size)`](code/main.py#L149): Reference implementation of patch projection via unfold + matmul.
- [`def describe_token_norms(tokens, max_show)`](code/main.py#L164): Print the L2 norm of the first few tokens for sanity inspection.
- [`def main()`](code/main.py#L171)

## `code/test_main.py`

```text
Unit tests for the vision encoder front end.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TestPatchEmbed`](code/test_main.py#L19)
  - [`def test_patch_count_matches_grid(self)`](code/test_main.py#L20)
  - [`def test_output_shape_includes_cls(self)`](code/test_main.py#L26)
  - [`def test_conv2d_matches_unfold_reference(self)`](code/test_main.py#L34)
- [`class TestPositionEmbedding`](code/test_main.py#L47)
  - [`def test_sinusoidal_deterministic(self)`](code/test_main.py#L48)
  - [`def test_sinusoidal_shape(self)`](code/test_main.py#L53)
  - [`def test_sinusoidal_requires_div_by_four(self)`](code/test_main.py#L57)
- [`class TestVisionFrontEnd`](code/test_main.py#L62)
  - [`def test_cls_token_broadcasts_without_leakage(self)`](code/test_main.py#L63)
  - [`def test_rejects_wrong_spatial_size(self)`](code/test_main.py#L74)
  - [`def test_synthesize_image_is_deterministic(self)`](code/test_main.py#L80)

## Run and test

From this folder:

```
python code/main.py
python code/test_main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
