# How it works: Reward Hacking and Goodhart's Law

## `main.py`

```text
Reward hacking over-optimization curve — stdlib Python.

Reproduces the shape of Gao, Schulman, Hilton (ICML 2023): as a policy drifts
from an initial reference (measured in sqrt(KL)), proxy reward climbs
monotonically while gold reward peaks and falls. We build toy gold and
proxy linear reward models and hill-climb a mean-vector policy under a KL
penalty. You can vary proxy sample size and noise tails.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def dot(a, b)`](main.py#L25)
- [`def gauss()`](main.py#L29)
- [`def student_t(df)`](main.py#L33): Heavy-tailed noise. For df=3, variance finite but kurtosis infinite.
- [`def sample_feature()`](main.py#L42)
- [`def gold_reward(x)`](main.py#L46)
- [`class ProxyRM`](main.py#L51)
  - [`def score(self, x)`](main.py#L55)
- [`def train_proxy(n_samples, noise)`](main.py#L59): Fit a linear proxy RM by least squares from n labels of gold + noise.
- [`def solve(a, b)`](main.py#L82): Gaussian elimination. D is small so this is fine.
- [`def sqrt_kl_from_origin(mu)`](main.py#L102): Two unit-variance Gaussians, one at 0, one at mu. KL = 1/2 * ||mu||^2.
- [`def expected_reward(w, mu)`](main.py#L107): E_{x ~ N(mu, I)} [<w, x>] = <w, mu>.
- [`def best_of_n_sweep(proxy, ns)`](main.py#L112): Simulate best-of-n sampling at each n. Compute mean KL, proxy, gold
- [`def kl_constrained_policy_sweep(proxy, kl_budgets)`](main.py#L137): Solve argmax_mu <w_proxy, mu> - lambda * ||mu||^2/2, sweep lambda.
- [`def print_curve(name, curve)`](main.py#L157)
- [`def main()`](main.py#L168)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
