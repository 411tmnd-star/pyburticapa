# How it works: Word Embeddings — Word2Vec from Scratch

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def tokenize(text)`](main.py#L9)
- [`def build_vocab(docs)`](main.py#L13)
- [`def skipgram_pairs(docs, window)`](main.py#L22)
- [`def sigmoid(x)`](main.py#L32)
- [`def init_embeddings(vocab_size, dim, seed)`](main.py#L36)
- [`def train_pair(W, W_prime, c_idx, ctx_idx, neg_indices, lr)`](main.py#L43)
- [`def train(docs, dim, window, k_neg, epochs, lr, seed)`](main.py#L58)
- [`def nearest(vocab, W, target_vec, topk, exclude)`](main.py#L76)
- [`def main()`](main.py#L94)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
