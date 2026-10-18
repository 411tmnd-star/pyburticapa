# How it works: Naive Bayes

## `naive_bayes.py`

Functions and classes, in file order (click to jump to the line):

- [`class MultinomialNB`](naive_bayes.py#L4)
  - [`def fit(self, X, y)`](naive_bayes.py#L11)
  - [`def predict_log_proba(self, X)`](naive_bayes.py#L30)
  - [`def predict_proba(self, X)`](naive_bayes.py#L33)
  - [`def predict(self, X)`](naive_bayes.py#L40)
  - [`def score(self, X, y)`](naive_bayes.py#L44)
- [`class GaussianNB`](naive_bayes.py#L48)
  - [`def fit(self, X, y)`](naive_bayes.py#L56)
  - [`def _log_likelihood(self, X)`](naive_bayes.py#L73)
  - [`def predict(self, X)`](naive_bayes.py#L88)
  - [`def predict_proba(self, X)`](naive_bayes.py#L92)
  - [`def score(self, X, y)`](naive_bayes.py#L99)
- [`def make_text_data(n_samples, n_features, seed)`](naive_bayes.py#L103)
- [`def make_continuous_data(n_samples, seed)`](naive_bayes.py#L130)
- [`def train_test_split(X, y, test_ratio, seed)`](naive_bayes.py#L157)
- [`def accuracy(y_true, y_pred)`](naive_bayes.py#L166)
- [`def print_separator(title)`](naive_bayes.py#L170)
- [`def demo_multinomial()`](naive_bayes.py#L176)
- [`def demo_gaussian()`](naive_bayes.py#L210)
- [`def demo_comparison()`](naive_bayes.py#L246)
- [`def demo_training_size()`](naive_bayes.py#L285)
- [`def demo_confusion_matrix()`](naive_bayes.py#L305)

## Run and test

From this folder:

```
python naive_bayes.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
