# How it works: Matrix Transformations

## `transformations.py`

Functions and classes, in file order (click to jump to the line):

- [`def rotation_2d(theta)`](transformations.py#L4)
- [`def rotation_3d_z(theta)`](transformations.py#L9)
- [`def rotation_3d_x(theta)`](transformations.py#L14)
- [`def rotation_3d_y(theta)`](transformations.py#L19)
- [`def scaling_2d(sx, sy)`](transformations.py#L24)
- [`def shearing_2d(kx, ky)`](transformations.py#L28)
- [`def reflection_x()`](transformations.py#L32)
- [`def reflection_y()`](transformations.py#L36)
- [`def mat_vec_mul(matrix, vector)`](transformations.py#L40)
- [`def mat_mul(a, b)`](transformations.py#L47)
- [`def det_2x2(m)`](transformations.py#L56)
- [`def det_3x3(m)`](transformations.py#L60)
- [`def eigenvalues_2x2(matrix)`](transformations.py#L68)
- [`def eigenvector_2x2(matrix, eigenvalue)`](transformations.py#L82)
- [`def fmt(v, decimals)`](transformations.py#L98)
- [`def demo_basic_transformations()`](transformations.py#L104)
- [`def demo_unit_square()`](transformations.py#L128)
- [`def demo_composition()`](transformations.py#L155)
- [`def demo_3d_rotations()`](transformations.py#L183)
- [`def demo_eigenvalues_from_scratch()`](transformations.py#L206)
- [`def demo_eigendecomposition()`](transformations.py#L235)
- [`def demo_determinant_meaning()`](transformations.py#L270)
- [`def demo_numpy_comparison()`](transformations.py#L297)

## Run and test

From this folder:

```
python transformations.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
