# How it works: What Is Machine Learning

## `ml_intro.py`

Functions and classes, in file order (click to jump to the line):

- [`class NearestCentroid`](ml_intro.py#L4)
  - [`def fit(self, X, y)`](ml_intro.py#L9)
  - [`def predict(self, X)`](ml_intro.py#L15)
  - [`def score(self, X, y)`](ml_intro.py#L22)
- [`def generate_classification_data(n_per_class, n_features, separation, seed)`](ml_intro.py#L26)
- [`def train_test_split(X, y, test_fraction, seed)`](ml_intro.py#L38)
- [`def random_baseline(y_train, y_test, seed)`](ml_intro.py#L46)
- [`def majority_baseline(y_train, y_test)`](ml_intro.py#L54)
- [`def demo_nearest_centroid()`](ml_intro.py#L61)
- [`def demo_varying_difficulty()`](ml_intro.py#L100)
- [`def demo_higher_dimensions()`](ml_intro.py#L130)
- [`def demo_multiclass()`](ml_intro.py#L159)

## Run and test

From this folder:

```
python ml_intro.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
