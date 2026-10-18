# How it works: Model Evaluation

## `evaluation.py`

Functions and classes, in file order (click to jump to the line):

- [`def train_val_test_split(X, y, train_ratio, val_ratio, seed)`](evaluation.py#L5)
- [`def kfold_split(n, k, seed)`](evaluation.py#L28)
- [`def stratified_kfold_split(y, k, seed)`](evaluation.py#L46)
- [`def cross_validate(X, y, model_fn, k, metric_fn, stratified)`](evaluation.py#L71)
- [`def confusion_matrix(y_true, y_pred)`](evaluation.py#L99)
- [`def accuracy(y_true, y_pred)`](evaluation.py#L107)
- [`def precision(y_true, y_pred)`](evaluation.py#L113)
- [`def recall(y_true, y_pred)`](evaluation.py#L118)
- [`def f1_score(y_true, y_pred)`](evaluation.py#L123)
- [`def roc_curve(y_true, y_scores)`](evaluation.py#L129)
- [`def auc_roc(y_true, y_scores)`](evaluation.py#L151)
- [`def mse(y_true, y_pred)`](evaluation.py#L167)
- [`def rmse(y_true, y_pred)`](evaluation.py#L172)
- [`def mae(y_true, y_pred)`](evaluation.py#L176)
- [`def r_squared(y_true, y_pred)`](evaluation.py#L181)
- [`def learning_curve(X, y, model_fn, metric_fn, train_sizes, val_ratio, seed)`](evaluation.py#L190)
- [`class SimpleLogistic`](evaluation.py#L226)
  - [`def sigmoid(self, z)`](evaluation.py#L233)
  - [`def fit(self, X, y)`](evaluation.py#L237)
  - [`def predict_proba(self, x)`](evaluation.py#L251)
  - [`def predict(self, x)`](evaluation.py#L255)
- [`class SimpleLinearRegression`](evaluation.py#L259)
  - [`def fit(self, X, y)`](evaluation.py#L266)
  - [`def predict(self, x)`](evaluation.py#L280)
- [`def standardize(values)`](evaluation.py#L284)
- [`def make_classification_data(n, seed)`](evaluation.py#L292)
- [`def make_regression_data(n, seed)`](evaluation.py#L305)
- [`def make_imbalanced_data(n, minority_ratio, seed)`](evaluation.py#L318)

## Run and test

From this folder:

```
python evaluation.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
