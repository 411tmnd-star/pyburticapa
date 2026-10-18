# How it works: Capstone 14 — Speculative-Decoding Inference Server

## `main.py`

```text
Speculative decoding server — draft/verify scheduler scaffold.

The hard architectural primitive is the draft/verify scheduler: a draft
model proposes k candidate tokens; the target model verifies them in one
batched pass; any accepted prefix is committed and the rejected suffix is
resampled from the target. This scaffold implements the scheduler with
synthetic token probabilities so the accept/reject logic and the throughput
math are observable end to end.

Run:  python main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def softmax_from(seed)`](main.py#L26)
- [`def sample(dist, rng)`](main.py#L33)
- [`class TargetModel`](main.py#L48)
  - [`def distribution(self, ctx_seed)`](main.py#L52)
  - [`def verify(self, draft_tokens, ctx_seed, rng)`](main.py#L55): Return (accepted_tokens, resampled_next). In one target call we can
- [`class DraftModel`](main.py#L82)
  - [`def propose(self, ctx_seed, k, rng, target)`](main.py#L86)
- [`class Metrics`](main.py#L105)
  - [`def acceptance_rate(self, k)`](main.py#L111)
  - [`def tokens_per_target_call(self)`](main.py#L116)
- [`def speculative_decode(n_tokens, k, rng, target, draft)`](main.py#L120)
- [`def baseline_decode(n_tokens, rng, target)`](main.py#L141)
- [`def main()`](main.py#L159)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
