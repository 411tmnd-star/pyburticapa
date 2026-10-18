# How it works: Feature Engineering & Selection

## `features.py`

Functions and classes, in file order (click to jump to the line):

- [`def min_max_scale(values)`](features.py#L5)
- [`def standardize(values)`](features.py#L13)
- [`def log_transform(values)`](features.py#L21)
- [`def bin_values(values, n_bins)`](features.py#L25)
- [`def polynomial_features(row, degree)`](features.py#L39)
- [`def one_hot_encode(values)`](features.py#L51)
- [`def label_encode(values)`](features.py#L65)
- [`def target_encode(feature_values, target_values, smoothing)`](features.py#L71)
- [`def count_vectorize(documents)`](features.py#L90)
- [`def tfidf(documents)`](features.py#L109)
- [`def impute_mean(values)`](features.py#L146)
- [`def impute_median(values)`](features.py#L154)
- [`def impute_mode(values)`](features.py#L166)
- [`def add_missing_indicator(values)`](features.py#L177)
- [`def correlation(x, y)`](features.py#L181)
- [`def mutual_information(feature, target, n_bins)`](features.py#L193)
- [`def variance_threshold(features, threshold)`](features.py#L226)
- [`def remove_correlated(features, threshold)`](features.py#L241)
- [`def make_housing_data(n, seed)`](features.py#L261)

## Run and test

From this folder:

```
python features.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
