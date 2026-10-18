# How it works: Hyperparameter Tuning

## `tuning.py`

Functions and classes, in file order (click to jump to the line):

- [`def make_data(n_samples, n_features, seed)`](tuning.py#L6)
- [`class SimpleTree`](tuning.py#L25)
  - [`def fit(self, X, y)`](tuning.py#L31)
  - [`def _build(self, X, y, depth)`](tuning.py#L34)
  - [`def predict(self, X)`](tuning.py#L66)
  - [`def _predict_one(self, x, node)`](tuning.py#L69)
- [`class GBMForTuning`](tuning.py#L77)
  - [`def fit(self, X, y)`](tuning.py#L88)
  - [`def predict(self, X)`](tuning.py#L111)
- [`def neg_mse(model, X, y)`](tuning.py#L118)
- [`def grid_search(param_grid, X_train, y_train, X_val, y_val)`](tuning.py#L123)
- [`def sample_param(spec, rng)`](tuning.py#L144)
- [`def random_search(param_distributions, X_train, y_train, X_val, y_val, n_iter, seed)`](tuning.py#L157)
- [`class SimpleBayesianOptimizer`](tuning.py#L185)
  - [`def _sample_random(self)`](tuning.py#L194)
  - [`def _params_to_vec(self, params)`](tuning.py#L197)
  - [`def _rbf_kernel(self, X1, X2, length_scale)`](tuning.py#L212)
  - [`def _predict(self, X_new)`](tuning.py#L216)
  - [`def _expected_improvement(self, mu, var, best_y)`](tuning.py#L242)
  - [`def _norm_cdf(x)`](tuning.py#L249)
  - [`def _norm_pdf(x)`](tuning.py#L253)
  - [`def suggest(self)`](tuning.py#L256)
  - [`def observe(self, params, score)`](tuning.py#L271)
  - [`def optimize(self, objective, n_iter)`](tuning.py#L275)
- [`def convergence_curve(history)`](tuning.py#L293)
- [`def demo_grid_search()`](tuning.py#L302)
- [`def demo_random_search()`](tuning.py#L335)
- [`def demo_bayesian()`](tuning.py#L379)
- [`def demo_comparison()`](tuning.py#L429)
- [`def demo_optuna()`](tuning.py#L498)

## Run and test

From this folder:

```
python tuning.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
