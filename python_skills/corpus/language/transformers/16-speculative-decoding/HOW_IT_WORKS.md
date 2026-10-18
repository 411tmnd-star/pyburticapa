# How it works: Speculative Decoding — Draft, Verify, Repeat

## `main.py`

```text
Speculative decoding: core algorithm and distribution equivalence.

Implements:
- Bernoulli accept / reject using min(1, q/p)
- Residual distribution (q - p)_+ for rejection fallback
- Bonus token on full acceptance
- Empirical check that the marginal distribution matches direct sampling
- Acceptance rate vs KL divergence sweep
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def sample(probs, rng)`](main.py#L15)
- [`def residual(q, p)`](main.py#L25)
- [`def kl(q, p)`](main.py#L33)
- [`def spec_step_one_token(q, p, rng)`](main.py#L41): Draft 1 token from p, verify with q. Returns (accepted_token, was_accepted).
- [`def spec_step_n(q, p, N, rng)`](main.py#L52): Draft N tokens (same context), then verify in one pass.
- [`def run_distribution_check(q, p, n_samples, rng)`](main.py#L70)
- [`def chi_square(observed, expected)`](main.py#L80)
- [`def acceptance_rate(q, p, n_samples, rng)`](main.py#L93)
- [`def perturb(q, amount, rng)`](main.py#L102)
- [`def expected_tokens_per_verify(alpha, N)`](main.py#L108)
- [`def main()`](main.py#L116)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
