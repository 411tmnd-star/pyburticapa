# How it works: Vectors, Matrices & Operations

## `matrices.py`

Functions and classes, in file order (click to jump to the line):

- [`class Vector`](matrices.py#L4)
  - [`def dot(self, other)`](matrices.py#L21)
  - [`def magnitude(self)`](matrices.py#L24)
  - [`def normalize(self)`](matrices.py#L27)
- [`class Matrix`](matrices.py#L32)
  - [`def scalar_multiply(self, scalar)`](matrices.py#L80)
  - [`def element_wise_multiply(self, other)`](matrices.py#L86)
  - [`def matmul(self, other)`](matrices.py#L92)
  - [`def transpose(self)`](matrices.py#L109)
  - [`def T(self)`](matrices.py#L116)
  - [`def determinant(self)`](matrices.py#L119)
  - [`def inverse_2x2(self)`](matrices.py#L135)
  - [`def identity(n)`](matrices.py#L147)
  - [`def zeros(rows, cols)`](matrices.py#L154)
  - [`def random(rows, cols, low, high)`](matrices.py#L158)
- [`def relu_matrix(m)`](matrices.py#L165)
- [`def demo_basic_operations()`](matrices.py#L169)
- [`def demo_determinant_inverse()`](matrices.py#L201)
- [`def demo_broadcasting()`](matrices.py#L223)
- [`def demo_neural_network_layer()`](matrices.py#L239)
- [`def demo_vectors()`](matrices.py#L276)
- [`def demo_weight_matrix_intuition()`](matrices.py#L295)

## Run and test

From this folder:

```
python matrices.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
