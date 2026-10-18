# How it works: Convex Optimization

## `convex.py`

Functions and classes, in file order (click to jump to the line):

- [`def check_convexity(f, dim, bounds, samples, label)`](convex.py#L5)
- [`def hessian_eigenvalues_2d(H)`](convex.py#L27)
- [`def is_positive_semidefinite_2d(H)`](convex.py#L41)
- [`def invert_2x2(H)`](convex.py#L48)
- [`def mat_vec_2d(M, v)`](convex.py#L58)
- [`class GradientDescent`](convex.py#L65)
  - [`def step(self, params, grads)`](convex.py#L69)
- [`def optimize_gd(grad_f, x0, lr, steps, tol)`](convex.py#L73)
- [`def newtons_method(grad_f, hessian_f, x0, steps, tol)`](convex.py#L87)
- [`def lagrange_solve(f_grad, g_val, g_grad, x0, lr, lr_lambda, steps)`](convex.py#L106)
- [`def demo_convexity_checker()`](convex.py#L126)
- [`def demo_hessian_analysis()`](convex.py#L158)
- [`def demo_newtons_method()`](convex.py#L207)
- [`def demo_condition_number_effect()`](convex.py#L267)
- [`def demo_lagrange_multipliers()`](convex.py#L306)
- [`def demo_regularization_geometry()`](convex.py#L380)
- [`def demo_first_vs_second_order()`](convex.py#L443)
- [`def demo_convex_vs_nonconvex_landscape()`](convex.py#L519)
- [`def demo_duality_intuition()`](convex.py#L567)
- [`def print_summary()`](convex.py#L605)

## Run and test

From this folder:

```
python convex.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
