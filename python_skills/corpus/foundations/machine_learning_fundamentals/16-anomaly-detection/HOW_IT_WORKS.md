# How it works: Anomaly Detection

## `anomaly_detection.py`

Functions and classes, in file order (click to jump to the line):

- [`def zscore_detect(X, threshold)`](anomaly_detection.py#L4)
- [`def iqr_detect(X, factor)`](anomaly_detection.py#L14)
- [`def _c_factor(n)`](anomaly_detection.py#L28)
- [`class IsolationTree`](anomaly_detection.py#L37)
  - [`def fit(self, X, depth)`](anomaly_detection.py#L48)
  - [`def path_length(self, x, depth)`](anomaly_detection.py#L80)
- [`class IsolationForest`](anomaly_detection.py#L90)
  - [`def fit(self, X)`](anomaly_detection.py#L98)
  - [`def anomaly_score(self, X)`](anomaly_detection.py#L115)
  - [`def predict(self, X, threshold)`](anomaly_detection.py#L130)
- [`def make_anomaly_data(n_normal, n_anomaly, n_features, seed)`](anomaly_detection.py#L135)
- [`def make_multimodal_data(n_per_cluster, n_anomaly, seed)`](anomaly_detection.py#L165)
- [`def precision_recall(y_true, y_pred)`](anomaly_detection.py#L181)
- [`def precision_at_k(y_true, scores, k)`](anomaly_detection.py#L193)
- [`def print_separator(title)`](anomaly_detection.py#L198)
- [`def demo_zscore()`](anomaly_detection.py#L204)
- [`def demo_iqr()`](anomaly_detection.py#L221)
- [`def demo_isolation_forest()`](anomaly_detection.py#L238)
- [`def demo_comparison()`](anomaly_detection.py#L268)
- [`def demo_multimodal()`](anomaly_detection.py#L301)

## Run and test

From this folder:

```
python anomaly_detection.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
