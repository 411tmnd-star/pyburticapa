# How it works: Decision Trees and Random Forests

## `trees.py`

Functions and classes, in file order (click to jump to the line):

- [`def gini_impurity(labels)`](trees.py#L5)
- [`def entropy(labels)`](trees.py#L15)
- [`def information_gain(parent_labels, left_labels, right_labels, criterion)`](trees.py#L27)
- [`def variance_reduction(parent_values, left_values, right_values)`](trees.py#L42)
- [`def _variance(values)`](trees.py#L54)
- [`def _mean(values)`](trees.py#L62)
- [`def majority_vote(labels)`](trees.py#L68)
- [`class DecisionTree`](trees.py#L75)
  - [`def fit(self, X, y)`](trees.py#L90)
  - [`def predict(self, X)`](trees.py#L101)
  - [`def _build(self, X, y, depth)`](trees.py#L104)
  - [`def _make_leaf(self, y)`](trees.py#L145)
  - [`def _best_split(self, X, y)`](trees.py#L151)
  - [`def _split_data(self, X, y, feature, threshold)`](trees.py#L194)
  - [`def _predict_one(self, x, node)`](trees.py#L205)
  - [`def print_tree(self, node, indent)`](trees.py#L212)
- [`class RandomForest`](trees.py#L225)
  - [`def fit(self, X, y)`](trees.py#L237)
  - [`def predict(self, X)`](trees.py#L255)
  - [`def feature_importances(self)`](trees.py#L271)
- [`def accuracy(y_true, y_pred)`](trees.py#L283)
- [`def generate_classification_data(n_samples, seed)`](trees.py#L288)
- [`def generate_regression_data(n_samples, seed)`](trees.py#L307)
- [`def train_test_split(X, y, test_ratio, seed)`](trees.py#L319)
- [`def demo_split_criteria()`](trees.py#L334)
- [`def demo_information_gain()`](trees.py#L361)
- [`def demo_decision_tree()`](trees.py#L400)
- [`def demo_random_forest()`](trees.py#L439)
- [`def demo_feature_importance()`](trees.py#L472)
- [`def demo_regression_tree()`](trees.py#L512)
- [`def demo_gini_vs_entropy()`](trees.py#L550)
- [`def demo_single_tree_vs_forest()`](trees.py#L579)
- [`def print_summary()`](trees.py#L629)

## Run and test

From this folder:

```
python trees.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
