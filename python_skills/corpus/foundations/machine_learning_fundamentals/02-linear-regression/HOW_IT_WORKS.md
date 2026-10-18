# How it works: Linear Regression

## `linear_regression.py`

Functions and classes, in file order (click to jump to the line):

- [`class LinearRegression`](linear_regression.py#L18)
  - [`def predict(self, X)`](linear_regression.py#L25)
  - [`def compute_cost(self, X, y)`](linear_regression.py#L28)
  - [`def compute_gradients(self, X, y)`](linear_regression.py#L34)
  - [`def fit(self, X, y, epochs, print_every)`](linear_regression.py#L41)
  - [`def r_squared(self, X, y)`](linear_regression.py#L52)
- [`class LinearRegressionNormal`](linear_regression.py#L68)
  - [`def fit(self, X, y)`](linear_regression.py#L73)
  - [`def predict(self, X)`](linear_regression.py#L83)
  - [`def r_squared(self, X, y)`](linear_regression.py#L86)
- [`class MultipleLinearRegression`](linear_regression.py#L101)
  - [`def predict_single(self, x)`](linear_regression.py#L108)
  - [`def predict(self, X)`](linear_regression.py#L111)
  - [`def compute_cost(self, X, y)`](linear_regression.py#L114)
  - [`def fit(self, X, y, epochs, print_every)`](linear_regression.py#L119)
  - [`def r_squared(self, X, y)`](linear_regression.py#L136)
- [`def standardize(X)`](linear_regression.py#L144)
- [`class PolynomialRegression`](linear_regression.py#L186)
  - [`def make_features(self, X)`](linear_regression.py#L193)
  - [`def predict(self, X)`](linear_regression.py#L196)
  - [`def fit(self, X, y, epochs, print_every)`](linear_regression.py#L200)
  - [`def r_squared(self, X, y)`](linear_regression.py#L216)
- [`class RidgeRegression`](linear_regression.py#L248)
  - [`def predict_single(self, x)`](linear_regression.py#L255)
  - [`def predict(self, X)`](linear_regression.py#L258)
  - [`def fit(self, X, y, epochs, print_every)`](linear_regression.py#L261)

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
