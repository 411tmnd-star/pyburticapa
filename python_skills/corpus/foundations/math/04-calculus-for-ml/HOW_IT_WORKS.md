# How it works: Calculus for Machine Learning

## `derivatives.py`

Functions and classes, in file order (click to jump to the line):

- [`def numerical_derivative(f, x, h)`](derivatives.py#L5)
- [`def numerical_gradient(f, point, h)`](derivatives.py#L9)
- [`def gradient_descent_1d(f, df, x0, lr, steps)`](derivatives.py#L21)
- [`def gradient_descent_nd(f, x0, lr, steps)`](derivatives.py#L31)
- [`def demo_numerical_vs_analytical()`](derivatives.py#L41)
- [`def demo_gradient()`](derivatives.py#L65)
- [`def demo_gradient_descent_1d()`](derivatives.py#L84)
- [`def demo_gradient_descent_2d()`](derivatives.py#L100)
- [`def hessian_2d(f, x, y, h)`](derivatives.py#L121)
- [`def taylor_approx(f, f_prime, f_double_prime, x0, h, order)`](derivatives.py#L128)
- [`def hessian_eigenvalues(H)`](derivatives.py#L137)
- [`def demo_hessian()`](derivatives.py#L149)
- [`def demo_taylor()`](derivatives.py#L191)
- [`def demo_linear_regression()`](derivatives.py#L223)

## Run and test

From this folder:

```
python derivatives.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
