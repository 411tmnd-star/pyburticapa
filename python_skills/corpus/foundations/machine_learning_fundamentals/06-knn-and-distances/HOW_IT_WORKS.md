# How it works: K-Nearest Neighbors and Distances

## `knn.py`

Functions and classes, in file order (click to jump to the line):

- [`def l2_distance(a, b)`](knn.py#L5)
- [`def l1_distance(a, b)`](knn.py#L9)
- [`def cosine_distance(a, b)`](knn.py#L13)
- [`def minkowski_distance(a, b, p)`](knn.py#L22)
- [`def standardize(X)`](knn.py#L28)
- [`def apply_standardize(X, means, stds)`](knn.py#L45)
- [`class KNN`](knn.py#L49)
  - [`def fit(self, X, y)`](knn.py#L59)
  - [`def predict(self, X)`](knn.py#L63)
  - [`def _predict_one(self, x)`](knn.py#L66)
  - [`def _classify(self, neighbors)`](knn.py#L78)
  - [`def _regress(self, neighbors)`](knn.py#L90)
  - [`def predict_with_neighbors(self, x)`](knn.py#L101)
- [`class KDNode`](knn.py#L112)
- [`class KDTree`](knn.py#L121)
  - [`def _build(self, points, depth)`](knn.py#L127)
  - [`def query(self, point, k)`](knn.py#L141)
  - [`def _search(self, node, point, k, best)`](knn.py#L147)
- [`def accuracy(y_true, y_pred)`](knn.py#L174)
- [`def mse(y_true, y_pred)`](knn.py#L179)
- [`def generate_classification_data(n_samples, n_classes, seed)`](knn.py#L183)
- [`def generate_regression_data(n_samples, seed)`](knn.py#L201)
- [`def generate_high_dim_data(n_samples, n_dims, seed)`](knn.py#L213)
- [`def train_test_split(X, y, test_ratio, seed)`](knn.py#L225)
- [`def demo_basic_knn()`](knn.py#L241)
- [`def demo_distance_metrics()`](knn.py#L271)
- [`def demo_weighted_knn()`](knn.py#L316)
- [`def demo_regression()`](knn.py#L346)
- [`def demo_curse_of_dimensionality()`](knn.py#L389)
- [`def demo_kdtree()`](knn.py#L455)
- [`def demo_scaling_importance()`](knn.py#L516)
- [`def demo_lazy_vs_eager()`](knn.py#L568)
- [`def demo_minkowski_family()`](knn.py#L609)
- [`def demo_k_selection()`](knn.py#L644)
- [`def print_summary()`](knn.py#L706)

## Run and test

From this folder:

```
python knn.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
