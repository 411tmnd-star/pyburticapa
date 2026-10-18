# How it works: Linear Systems

## `linear_systems.py`

Functions and classes, in file order (click to jump to the line):

- [`def gaussian_elimination(A, b)`](linear_systems.py#L4)
- [`def lu_decompose(A)`](linear_systems.py#L26)
- [`def lu_solve(P, L, U, b)`](linear_systems.py#L47)
- [`def cholesky(A)`](linear_systems.py#L62)
- [`def cholesky_solve(L, b)`](linear_systems.py#L79)
- [`def least_squares_normal(A, b)`](linear_systems.py#L93)
- [`def ridge_regression(A, b, lam)`](linear_systems.py#L99)
- [`def condition_number(A)`](linear_systems.py#L107)
- [`def conjugate_gradient(A, b, tol, max_iter)`](linear_systems.py#L114)
- [`def demo_gaussian_elimination()`](linear_systems.py#L139)
- [`def demo_lu()`](linear_systems.py#L161)
- [`def demo_cholesky()`](linear_systems.py#L188)
- [`def demo_least_squares()`](linear_systems.py#L219)
- [`def demo_ridge()`](linear_systems.py#L249)
- [`def demo_condition_number()`](linear_systems.py#L289)
- [`def demo_conjugate_gradient()`](linear_systems.py#L319)
- [`def demo_equivalence()`](linear_systems.py#L348)
- [`def demo_linear_regression_full()`](linear_systems.py#L382)

## Run and test

From this folder:

```
python linear_systems.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
