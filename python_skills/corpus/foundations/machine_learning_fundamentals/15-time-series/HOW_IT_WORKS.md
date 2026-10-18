# How it works: Time Series Fundamentals

## `time_series.py`

Functions and classes, in file order (click to jump to the line):

- [`def make_synthetic_series(n, seed)`](time_series.py#L4)
- [`def make_seasonal_series(n, period, seed)`](time_series.py#L16)
- [`def difference(series, order)`](time_series.py#L29)
- [`def check_stationarity(series, window)`](time_series.py#L36)
- [`def autocorrelation(series, max_lag)`](time_series.py#L60)
- [`def make_lag_features(series, n_lags)`](time_series.py#L75)
- [`def walk_forward_split(n_samples, n_splits, min_train)`](time_series.py#L89)
- [`class SimpleAR`](time_series.py#L106)
  - [`def fit(self, X, y)`](time_series.py#L112)
  - [`def predict(self, X)`](time_series.py#L119)
  - [`def fit_series(self, series)`](time_series.py#L122)
  - [`def forecast(self, last_values, n_steps)`](time_series.py#L126)
- [`def mse(y_true, y_pred)`](time_series.py#L143)
- [`def mae(y_true, y_pred)`](time_series.py#L147)
- [`def mape(y_true, y_pred)`](time_series.py#L151)
- [`def print_separator(title)`](time_series.py#L156)
- [`def demo_stationarity()`](time_series.py#L162)
- [`def demo_autocorrelation()`](time_series.py#L178)
- [`def demo_lag_features()`](time_series.py#L198)
- [`def demo_walk_forward()`](time_series.py#L223)
- [`def demo_random_vs_walk_forward()`](time_series.py#L255)
- [`def demo_lag_comparison()`](time_series.py#L292)
- [`def demo_forecasting()`](time_series.py#L317)

## Run and test

From this folder:

```
python time_series.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
