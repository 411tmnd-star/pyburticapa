# How it works: Tokenizers: BPE, WordPiece, SentencePiece

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`class CharTokenizer`](code/main.py#L4)
  - [`def encode(self, text)`](code/main.py#L5)
  - [`def decode(self, tokens)`](code/main.py#L8)
- [`class BPETokenizer`](code/main.py#L12)
  - [`def _get_pairs(self, tokens)`](code/main.py#L17)
  - [`def _merge_pair(self, tokens, pair, new_token)`](code/main.py#L23)
  - [`def train(self, text, num_merges)`](code/main.py#L35)
  - [`def encode(self, text)`](code/main.py#L51)
  - [`def decode(self, tokens)`](code/main.py#L57)
  - [`def vocab_size(self)`](code/main.py#L61)
  - [`def token_to_str(self, token_id)`](code/main.py#L64)
- [`def compression_ratio(tokenizer, text)`](code/main.py#L68)
- [`def vocabulary_stats(tokenizer, texts)`](code/main.py#L74)
- [`def demo_char_tokenizer()`](code/main.py#L101)
- [`def demo_bpe_training()`](code/main.py#L118)
- [`def demo_encode_decode(tokenizer)`](code/main.py#L143)
- [`def demo_tiktoken_comparison(tokenizer)`](code/main.py#L169)
- [`def demo_vocabulary_analysis(tokenizer, corpus)`](code/main.py#L201)

## `code/bpe.py`

Functions and classes, in file order (click to jump to the line):

- [`class BPETokenizer`](code/bpe.py#L4)
  - [`def _get_pairs(self, tokens)`](code/bpe.py#L9)
  - [`def _merge_pair(self, tokens, pair, new_token)`](code/bpe.py#L15)
  - [`def train(self, text, num_merges)`](code/bpe.py#L27)
  - [`def encode(self, text)`](code/bpe.py#L45)
  - [`def decode(self, tokens)`](code/bpe.py#L51)
  - [`def vocab_size(self)`](code/bpe.py#L55)
  - [`def get_token_str(self, token_id)`](code/bpe.py#L58)
- [`def demo_bpe()`](code/bpe.py#L62)
- [`def demo_tiktoken()`](code/bpe.py#L101)

## Run and test

From this folder:

```
python code/main.py
python code/bpe.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
