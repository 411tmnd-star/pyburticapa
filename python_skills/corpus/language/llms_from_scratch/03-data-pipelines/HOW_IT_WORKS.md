# How it works: Data Pipelines for Pre-Training

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`def clean_text(text)`](code/main.py#L8)
- [`def quality_filter(text, min_words, max_ratio_caps, max_ratio_special)`](code/main.py#L17)
- [`def get_shingles(text, k)`](code/main.py#L30)
- [`def minhash_signature(shingles, num_hashes)`](code/main.py#L37)
- [`def lsh_buckets(signature, bands)`](code/main.py#L50)
- [`def deduplicate(documents, threshold, num_hashes, bands)`](code/main.py#L61)
- [`class SimpleTokenizer`](code/main.py#L96)
  - [`def train_bpe(self, text, num_merges)`](code/main.py#L104)
  - [`def encode(self, text)`](code/main.py#L132)
  - [`def decode(self, ids)`](code/main.py#L147)
  - [`def vocab_size(self)`](code/main.py#L154)
- [`def tokenize_corpus(documents, tokenizer)`](code/main.py#L158)
- [`def pack_sequences(token_ids, seq_length, pad_id)`](code/main.py#L167)
- [`class PreTrainingDataLoader`](code/main.py#L182)
- [`def compute_statistics(documents, token_ids, sequences, tokenizer_vocab_size)`](code/main.py#L203)
- [`def generate_sample_corpus()`](code/main.py#L237)
- [`def run_pipeline()`](code/main.py#L333)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
