# How it works: Feature Selection

## `feature_selection.py`

Functions and classes, in file order (click to jump to the line):

- [`def make_feature_selection_data(n_samples, seed)`](feature_selection.py#L4)
- [`def variance_threshold(X, threshold)`](feature_selection.py#L37)
- [`def discretize(x, n_bins)`](feature_selection.py#L43)
- [`def mutual_information(X, y, n_bins)`](feature_selection.py#L52)
- [`def simple_logistic_importance(X, y, lr, epochs)`](feature_selection.py#L76)
- [`def rfe(X, y, n_features_to_select, lr, epochs)`](feature_selection.py#L91)
- [`def soft_threshold(w, alpha)`](feature_selection.py#L115)
- [`def l1_feature_selection(X, y, alpha, lr, epochs)`](feature_selection.py#L119)
- [`def gini_impurity(y)`](feature_selection.py#L140)
- [`def best_split(X, y, feature_idx)`](feature_selection.py#L148)
- [`def _build_tree_importance(X, y, feature_subset, max_depth, depth)`](feature_selection.py#L168)
- [`def tree_importance(X, y, n_trees, max_depth, seed)`](feature_selection.py#L200)
- [`def evaluate_accuracy(X, y, selected_mask, lr, epochs)`](feature_selection.py#L223)
- [`def feature_group(name)`](feature_selection.py#L237)
- [`def print_feature_scores(names, scores, label, top_k)`](feature_selection.py#L245)

## Run and test

From this folder:

```
python feature_selection.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
