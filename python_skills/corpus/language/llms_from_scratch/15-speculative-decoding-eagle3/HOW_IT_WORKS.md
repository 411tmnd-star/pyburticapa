# How it works: Speculative Decoding and EAGLE-3

## `code/main.py`

```text
Speculative decoding (Leviathan 2023) with N-token drafts and KV rollback.

Implements the full production speculative-decoding loop:
  - draft N tokens from p (cheap)
  - verify N positions in one parallel q forward
  - rejection rule: accept with min(1, q(d)/p(d))
  - residual sampling on rejection: (q - p)_+ renormalized
  - bonus token on full acceptance
  - KV cache rollback bookkeeping

Stdlib only. Numbers match what Phase 7 · 16 proved mathematically and what
Phase 10 · 12 described operationally. Here we stitch both together.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def sample(probs, rng)`](code/main.py#L23)
- [`def residual(q, p)`](code/main.py#L33)
- [`def kl(q, p)`](code/main.py#L41)
- [`class KVBuffer`](code/main.py#L50): Tracks logical cache length for verifier. Physical bytes are notional.
  - [`def extend(self, n)`](code/main.py#L54)
  - [`def truncate_to(self, n)`](code/main.py#L57)
- [`def spec_step(q, p, N, kv, rng)`](code/main.py#L61): One speculative step: draft N tokens from p, verify with q.
- [`def direct_sample(q, n, rng)`](code/main.py#L101)
- [`def distribution_check(q, p, n_steps, rng)`](code/main.py#L105): Check that the FIRST emitted token (the Leviathan-sampled one) is
- [`def chi_square(observed, expected)`](code/main.py#L122)
- [`def measure_alpha(q, p, n_samples, rng)`](code/main.py#L135)
- [`def expected_tokens_per_verify(alpha, N)`](code/main.py#L148)
- [`def wall_time_per_token(alpha, N, c)`](code/main.py#L156): Draft cost is c per token relative to the verifier (cost 1.0).
- [`def perturb(q, amount, rng)`](code/main.py#L165)
- [`def main()`](code/main.py#L171)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
