# How it works: BERT — Masked Language Modeling

## `main.py`

```text
BERT-style masked language modeling — the masking rules demystified.

Pure stdlib. Shows the 80/10/10 rule, whole-word masking, and
distribution sanity checks over a large batch of tokens.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def create_mlm_batch(tokens, vocab_size, mask_prob, rng)`](main.py#L18): Apply BERT masking.
- [`def whole_word_mlm(tokens, word_spans, vocab_size, mask_prob, rng)`](main.py#L45): Mask whole words: if any subword in a span is selected, mask all.
- [`def distribution_check(n_tokens, vocab_size, mask_prob, seed)`](main.py#L77)
- [`def toy_predict(masked_inputs, vocab)`](main.py#L97): Pretend MLM head: returns a uniform distribution over vocab.
- [`def main()`](main.py#L105)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
