# How it works: Probability and Distributions

## `probability.py`

Functions and classes, in file order (click to jump to the line):

- [`def factorial(n)`](probability.py#L7)
- [`def combinations(n, k)`](probability.py#L14)
- [`def conditional_probability(p_a_and_b, p_b)`](probability.py#L18)
- [`def bernoulli_pmf(k, p)`](probability.py#L22)
- [`def categorical_pmf(k, probs)`](probability.py#L26)
- [`def poisson_pmf(k, lam)`](probability.py#L30)
- [`def uniform_pdf(x, a, b)`](probability.py#L34)
- [`def normal_pdf(x, mu, sigma)`](probability.py#L40)
- [`def expected_value(values, probabilities)`](probability.py#L46)
- [`def variance(values, probabilities)`](probability.py#L50)
- [`def sample_bernoulli(p, n)`](probability.py#L55)
- [`def sample_categorical(probs, n)`](probability.py#L59)
- [`def sample_uniform(a, b, n)`](probability.py#L75)
- [`def sample_normal_box_muller(mu, sigma, n)`](probability.py#L79)
- [`def softmax(logits)`](probability.py#L89)
- [`def log_softmax(logits)`](probability.py#L97)
- [`def cross_entropy_loss(logits, target_index)`](probability.py#L104)
- [`def joint_to_marginals(joint)`](probability.py#L109)
- [`def check_independence(joint, marginal_x, marginal_y, tol)`](probability.py#L117)
- [`def demonstrate_clt(dist_fn, n_per_sample, n_averages)`](probability.py#L125)

## Run and test

From this folder:

```
python probability.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
