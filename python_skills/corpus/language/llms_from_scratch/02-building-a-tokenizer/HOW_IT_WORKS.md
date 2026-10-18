# How it works: Building a Tokenizer from Scratch

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`def pre_tokenize(text)`](code/main.py#L17)
- [`def apply_merge(byte_seq, pair, new_id)`](code/main.py#L21)
- [`class SpecialTokenHandler`](code/main.py#L34)
  - [`def add_token(self, token_str, token_id)`](code/main.py#L39)
  - [`def split_with_specials(self, text)`](code/main.py#L44)
- [`class ProductionTokenizer`](code/main.py#L59)
  - [`def normalize(self, text)`](code/main.py#L66)
  - [`def train(self, text, num_merges)`](code/main.py#L69)
  - [`def add_special_token(self, token_str)`](code/main.py#L90)
  - [`def encode(self, text)`](code/main.py#L97)
  - [`def decode(self, ids)`](code/main.py#L112)
  - [`def vocab_size(self)`](code/main.py#L119)
  - [`def get_token_bytes(self, token_id)`](code/main.py#L122)
- [`def demo_byte_encoding()`](code/main.py#L126)
- [`def demo_pre_tokenization()`](code/main.py#L145)
- [`def demo_full_tokenizer()`](code/main.py#L163)
- [`def demo_tiktoken_comparison()`](code/main.py#L215)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
