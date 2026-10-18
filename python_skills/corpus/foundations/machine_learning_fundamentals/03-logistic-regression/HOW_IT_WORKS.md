# How it works: Logistic Regression

## `logistic_regression.py`

Functions and classes, in file order (click to jump to the line):

- [`def sigmoid(z)`](logistic_regression.py#L5)
- [`class LogisticRegression`](logistic_regression.py#L36)
  - [`def predict_proba(self, x)`](logistic_regression.py#L43)
  - [`def predict(self, x, threshold)`](logistic_regression.py#L47)
  - [`def compute_loss(self, X, y)`](logistic_regression.py#L50)
  - [`def fit(self, X, y, epochs, print_every)`](logistic_regression.py#L59)
  - [`def accuracy(self, X, y)`](logistic_regression.py#L80)
- [`class ClassificationMetrics`](logistic_regression.py#L99)
  - [`def accuracy(self)`](logistic_regression.py#L106)
  - [`def precision(self)`](logistic_regression.py#L110)
  - [`def recall(self)`](logistic_regression.py#L114)
  - [`def f1(self)`](logistic_regression.py#L118)
  - [`def print_confusion_matrix(self)`](logistic_regression.py#L123)
  - [`def print_report(self)`](logistic_regression.py#L130)
- [`class SoftmaxRegression`](logistic_regression.py#L165)
  - [`def softmax(self, scores)`](logistic_regression.py#L173)
  - [`def predict_proba(self, x)`](logistic_regression.py#L179)
  - [`def predict(self, x)`](logistic_regression.py#L186)
  - [`def fit(self, X, y, epochs, print_every)`](logistic_regression.py#L190)
  - [`def accuracy(self, X, y)`](logistic_regression.py#L214)

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
