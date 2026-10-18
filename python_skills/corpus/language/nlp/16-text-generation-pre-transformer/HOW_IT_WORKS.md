# How it works: Text Generation Before Transformers — N-gram Language Models

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def tokenize(text)`](main.py#L6)
- [`def train_bigrams(sentences)`](main.py#L10)
- [`def kneser_ney_prob(bigrams, unigram_contexts, context_totals, unique_follow, total_unique_bigrams, prev, w, discount)`](main.py#L25)
- [`def laplace_prob(bigrams, unigrams, vocab_size, prev, w)`](main.py#L36)
- [`def perplexity(prob_fn, sentences)`](main.py#L42)
- [`def sample_sentence(prob_fn, vocab, max_len, seed)`](main.py#L54)
- [`def main()`](main.py#L72)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
