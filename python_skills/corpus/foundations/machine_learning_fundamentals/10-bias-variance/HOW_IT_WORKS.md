# How it works: Bias-Variance Tradeoff

## `bias_variance.py`

Functions and classes, in file order (click to jump to the line):

- [`def true_function(x)`](bias_variance.py#L6)
- [`def generate_data(n_samples, noise_std, x_range, seed)`](bias_variance.py#L10)
- [`def fit_polynomial(x_train, y_train, degree, lam)`](bias_variance.py#L17)
- [`def predict_polynomial(x, w)`](bias_variance.py#L28)
- [`def bias_variance_decomposition(degrees, n_bootstrap, n_train, noise_std, n_test, lam)`](bias_variance.py#L34)
- [`def print_decomposition(results)`](bias_variance.py#L73)
- [`def find_optimal(results)`](bias_variance.py#L84)
- [`def demo_basic_decomposition()`](bias_variance.py#L89)
- [`def demo_complexity_tradeoff()`](bias_variance.py#L108)
- [`def demo_regularization_effect()`](bias_variance.py#L142)
- [`def demo_data_size_effect()`](bias_variance.py#L167)
- [`def demo_diagnosis()`](bias_variance.py#L190)
- [`def demo_learning_curves()`](bias_variance.py#L231)
- [`def demo_regularization_sweep()`](bias_variance.py#L279)

## Run and test

From this folder:

```
python bias_variance.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
