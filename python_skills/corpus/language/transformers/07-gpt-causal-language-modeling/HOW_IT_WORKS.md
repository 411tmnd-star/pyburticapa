# How it works: GPT — Causal Language Modeling

## `main.py`

```text
GPT-style causal language modeling — causal mask, loss shift, sampling.

Pure stdlib. Tiny "GPT" with random weights demonstrates the mask,
next-token prediction, and four sampling strategies on a 20-token vocab.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def softmax(logits, temperature)`](main.py#L11)
- [`def causal_mask(n)`](main.py#L20)
- [`def attention_scores_with_mask(raw_scores, mask)`](main.py#L24)
- [`def apply_softmax_row(row)`](main.py#L28)
- [`def cross_entropy_shifted(logits_per_pos, target_ids)`](main.py#L38): Next-token CE: logit_i vs target_{i+1}.
- [`def sample_greedy(probs)`](main.py#L50)
- [`def sample_temperature(logits, t, rng)`](main.py#L54)
- [`def sample_from_distribution(probs, rng)`](main.py#L59)
- [`def sample_top_k(logits, k, rng, temperature)`](main.py#L69)
- [`def sample_top_p(logits, p, rng, temperature)`](main.py#L79)
- [`def sample_min_p(logits, min_p, rng, temperature)`](main.py#L101)
- [`def demo_causal_mask()`](main.py#L117)
- [`def demo_sampling()`](main.py#L131)
- [`def demo_ce_loss()`](main.py#L151)
- [`def main()`](main.py#L170)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
