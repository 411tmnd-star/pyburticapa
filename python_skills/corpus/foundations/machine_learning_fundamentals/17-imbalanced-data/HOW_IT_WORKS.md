# How it works: Handling Imbalanced Data

## `imbalanced.py`

Functions and classes, in file order (click to jump to the line):

- [`def make_imbalanced_data(n_majority, n_minority, seed)`](imbalanced.py#L4)
- [`def euclidean_distance(a, b)`](imbalanced.py#L14)
- [`def find_k_neighbors(X, idx, k)`](imbalanced.py#L18)
- [`def smote(X_minority, k, n_synthetic, seed)`](imbalanced.py#L29)
- [`def random_oversample(X, y, seed)`](imbalanced.py#L48)
- [`def random_undersample(X, y, seed)`](imbalanced.py#L70)
- [`def sigmoid(z)`](imbalanced.py#L90)
- [`def logistic_regression_weighted(X, y, weights, lr, epochs)`](imbalanced.py#L94)
- [`def compute_class_weights(y)`](imbalanced.py#L114)
- [`def class_weighted_loss(y_true, y_pred_probs, weights)`](imbalanced.py#L124)
- [`def confusion_matrix_values(y_true, y_pred)`](imbalanced.py#L131)
- [`def compute_metrics(y_true, y_pred)`](imbalanced.py#L139)
- [`def find_optimal_threshold(y_true, y_probs, metric)`](imbalanced.py#L158)
- [`def print_confusion_matrix(y_true, y_pred, label)`](imbalanced.py#L186)
- [`def print_metrics(metrics, label)`](imbalanced.py#L194)

## Run and test

From this folder:

```
python imbalanced.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
