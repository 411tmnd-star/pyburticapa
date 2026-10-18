# How it works: Tokenized Dataset with Sliding Window

## `main.py`

```text
Tokenized dataset with sliding window for next-token training.

Wraps a tokenizer-encoded id stream in a PyTorch Dataset and DataLoader so a
training loop can pull (B, T) input and (B, T) target batches.

The tokenizer is the small byte-level BPE from lesson 30, inlined here so
this lesson runs without inter-lesson imports.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class MiniBPE`](main.py#L29): Inline byte-level BPE tokenizer (same contract as lesson 30).
  - [`def vocab_size(self)`](main.py#L39)
  - [`def initialize(self, specials)`](main.py#L42)
- [`def _pretokenize(text)`](main.py#L59)
- [`def _count_pairs(units)`](main.py#L63)
- [`def _apply_merge_to_corpus(units, pair, new_id)`](main.py#L71)
- [`def train_bpe(tokenizer, corpus, target_vocab_size)`](main.py#L96)
- [`def encode_text(tokenizer, text)`](main.py#L125)
- [`class SlidingWindowDataset`](main.py#L151): PyTorch Dataset over a flat id stream.
  - [`def count_windows(num_ids, context_length, stride)`](main.py#L177)
- [`def make_dataloader(dataset, batch_size, shuffle, base_seed, epoch, drop_last)`](main.py#L197): Build a DataLoader with a deterministic per-epoch shuffle.
- [`def _encode_corpus_to_ids(tokenizer, corpus, target_vocab)`](main.py#L218)
- [`def _print_section(title)`](main.py#L245)
- [`def main()`](main.py#L250)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
