# How it works: BPE Tokenizer From Scratch

## `main.py`

```text
Byte-Pair Encoding tokenizer from scratch.

Trains a byte-level BPE vocabulary on a small built-in corpus, encodes a
held-out sentence, decodes it back, and prints both.

Stdlib + nothing else. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class BPETokenizer`](main.py#L24): Byte-level BPE tokenizer.
  - [`def vocab_size(self)`](main.py#L38)
  - [`def _add_token(self, token_bytes)`](main.py#L41)
  - [`def initialize(self, specials)`](main.py#L49): Lay out the byte alphabet and reserve special-token ids.
- [`def _pretokenize(text)`](main.py#L66): Split text on whitespace/non-whitespace runs.
- [`def _word_to_byte_ids(word)`](main.py#L76)
- [`def _count_pairs(corpus_units)`](main.py#L80)
- [`def _apply_merge(symbols, pair, new_id)`](main.py#L88)
- [`def train(tokenizer, corpus, target_vocab_size, specials)`](main.py#L104): Train BPE merges on `corpus` until the vocabulary reaches `target_vocab_size`.
- [`def _build_initial_units(corpus)`](main.py#L134)
- [`def _apply_merge_to_corpus(units, pair, new_id)`](main.py#L143)
- [`def _encode_chunk(tokenizer, chunk)`](main.py#L155)
- [`def encode(tokenizer, text, allow_special)`](main.py#L182): Encode `text` to a list of token ids.
- [`def _encode_pretokenized(tokenizer, text)`](main.py#L213)
- [`def decode(tokenizer, ids)`](main.py#L220): Decode `ids` back to a string. Inverse of `encode` for round-trip safe input.
- [`def save(tokenizer, path)`](main.py#L233): Serialize the tokenizer to a JSON file.
- [`def load(path)`](main.py#L250): Restore a tokenizer previously written with `save`.
- [`def _print_section(title)`](main.py#L290)
- [`def _format_byte_token(token_bytes)`](main.py#L295)
- [`def main()`](main.py#L302)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
