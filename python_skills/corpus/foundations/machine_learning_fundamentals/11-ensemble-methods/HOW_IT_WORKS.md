# How it works: Ensemble Methods

## `ensembles.py`

Functions and classes, in file order (click to jump to the line):

- [`def make_classification_data(n_samples, n_features, noise, seed)`](ensembles.py#L5)
- [`def make_regression_data(n_samples, n_features, noise, seed)`](ensembles.py#L13)
- [`def train_test_split(X, y, test_ratio, seed)`](ensembles.py#L20)
- [`class DecisionStump`](ensembles.py#L27)
  - [`def fit(self, X, y, weights)`](ensembles.py#L34)
  - [`def predict(self, X)`](ensembles.py#L51)
- [`class AdaBoostScratch`](ensembles.py#L59)
  - [`def fit(self, X, y)`](ensembles.py#L65)
  - [`def predict(self, X)`](ensembles.py#L85)
  - [`def accuracy(self, X, y)`](ensembles.py#L89)
- [`class TreeNode`](ensembles.py#L93)
- [`class SimpleRegressionTree`](ensembles.py#L102)
  - [`def fit(self, X, y)`](ensembles.py#L108)
  - [`def _build(self, X, y, depth)`](ensembles.py#L111)
  - [`def predict(self, X)`](ensembles.py#L155)
  - [`def _predict_one(self, x, node)`](ensembles.py#L158)
- [`class GradientBoostingScratch`](ensembles.py#L166)
  - [`def fit(self, X, y)`](ensembles.py#L174)
  - [`def predict(self, X)`](ensembles.py#L186)
  - [`def mse(self, X, y)`](ensembles.py#L192)
- [`class BaggingClassifier`](ensembles.py#L196)
  - [`def fit(self, X, y)`](ensembles.py#L202)
  - [`def predict(self, X)`](ensembles.py#L212)
  - [`def accuracy(self, X, y)`](ensembles.py#L216)
- [`class StackingClassifier`](ensembles.py#L220)
  - [`def fit(self, X, y)`](ensembles.py#L229)
  - [`def predict(self, X)`](ensembles.py#L265)
  - [`def accuracy(self, X, y)`](ensembles.py#L270)
- [`def demo_adaboost()`](ensembles.py#L274)
- [`def demo_gradient_boosting()`](ensembles.py#L300)
- [`def demo_learning_rate_effect()`](ensembles.py#L325)
- [`def demo_bagging()`](ensembles.py#L351)
- [`def demo_stacking()`](ensembles.py#L373)
- [`def demo_comparison()`](ensembles.py#L427)
- [`def demo_sklearn_comparison()`](ensembles.py#L453)

## Run and test

From this folder:

```
python ensembles.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
