# How it works: Speculative Decoding and EAGLE

## `code/main.py`

```text
Speculative decoding harness: exact rejection rule, alpha sweep, tree mask.

Three things this file proves, on synthetic toy distributions so the math
stays visible:

1. The Leviathan-Kalai-Matias rejection rule preserves the target's
   sampling distribution. Empirical total-variation distance between
   plain target sampling and speculative-with-draft sampling is < 0.01
   over 50_000 draws.
2. The expected-tokens-per-verify formula holds. For acceptance rate
   alpha and draft length K, E[tokens] = (1 - alpha^(K+1)) / (1 - alpha)
   matches the measured throughput within sampling noise.
3. Tree drafting verifies multiple candidate paths in a single target
   forward via a topological causal mask. We build a depth-K tree, emit
   the verification mask, and confirm every node attends only to its
   ancestors.

Stdlib + numpy only.

Run:
    python main.py
    python main.py --vocab 64 --alpha 0.75 --k 4 --samples 50000
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_target(vocab, rng)`](code/main.py#L31)
- [`def make_draft(target, alpha_hint, rng)`](code/main.py#L37): A draft distribution whose expected token-level acceptance is near
- [`def sample(probs, rng)`](code/main.py#L50)
- [`def speculative_step(target, draft, K, rng)`](code/main.py#L54): One round. Returns 1..K+1 tokens whose distribution equals target.
- [`def total_variation(p, q)`](code/main.py#L81)
- [`def empirical_dist(samples, vocab)`](code/main.py#L85)
- [`def verify_distribution(target, draft, K, n_samples, rng)`](code/main.py#L90): Compare next-token distributions under plain target sampling and
- [`def measure_alpha(target, draft, n_samples, rng)`](code/main.py#L106)
- [`def expected_tokens(alpha, K)`](code/main.py#L117)
- [`def measure_throughput(target, draft, K, n_rounds, rng)`](code/main.py#L123)
- [`def build_tree(branch_factor)`](code/main.py#L131): Return nodes as (parent_index, depth-path). Index 0 is root.
- [`def tree_attention_mask(tree)`](code/main.py#L145): N x N causal mask where each row attends to its ancestors only.
- [`def validate_tree_mask(mask, tree)`](code/main.py#L157)
- [`def _positive_int(value)`](code/main.py#L172)
- [`def _unit_float(value)`](code/main.py#L179)
- [`def parse_args()`](code/main.py#L186)
- [`def main()`](code/main.py#L200)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
