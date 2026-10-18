# How it works: Bayes' Theorem

## `bayes.py`

Functions and classes, in file order (click to jump to the line):

- [`def bayes(prior, likelihood, false_positive_rate)`](bayes.py#L5)
- [`def sequential_bayes(prior, likelihood, false_positive_rate, num_tests)`](bayes.py#L11)
- [`class NaiveBayes`](bayes.py#L19)
  - [`def train(self, documents, labels)`](bayes.py#L27)
  - [`def _log_prior(self, cls)`](bayes.py#L36)
  - [`def _log_likelihood(self, word, cls)`](bayes.py#L40)
  - [`def predict(self, document)`](bayes.py#L48)
  - [`def predict_proba(self, document)`](bayes.py#L63)
  - [`def top_words(self, cls, n)`](bayes.py#L78)
- [`def demo_bayes_theorem()`](bayes.py#L90)
- [`def demo_spam_filter()`](bayes.py#L110)
- [`def demo_naive_bayes()`](bayes.py#L128)
- [`def demo_mle_vs_map()`](bayes.py#L185)
- [`def beta_update(alpha, beta_param, successes, failures)`](bayes.py#L213)
- [`def sequential_update_demo()`](bayes.py#L217)
- [`def ab_test_demo()`](bayes.py#L256)
- [`def _beta_sample(alpha, beta_param, rng_module)`](bayes.py#L310)
- [`def _gamma_sample(shape, rng_module)`](bayes.py#L318)

## Run and test

From this folder:

```
python bayes.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
