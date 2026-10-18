# How it works: Token and Positional Embeddings

## `main.py`

```text
Token and positional embeddings.

Builds three modules:

- TokenEmbedding: vocab_size x d_model lookup
- LearnedPositionalEmbedding: max_context_length x d_model lookup
- SinusoidalPositionalEmbedding: parameter-free sin/cos table

Composes them via EmbeddingComposer for the transformer input.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def _init_normal(weight, std)`](main.py#L26): Init a parameter tensor in place from a small Gaussian.
- [`class TokenEmbedding`](main.py#L32): Vocabulary-id to vector lookup.
  - [`def forward(self, ids)`](main.py#L46)
- [`class LearnedPositionalEmbedding`](main.py#L54): Position-id to vector lookup with learned parameters.
  - [`def forward(self, seq_len)`](main.py#L73)
- [`class SinusoidalPositionalEmbedding`](main.py#L84): Parameter-free position-to-vector mapping.
  - [`def _build_table(max_context_length, d_model, base)`](main.py#L106)
  - [`def forward(self, seq_len)`](main.py#L116)
- [`class EmbeddingComposer`](main.py#L126): Sums a token embedding with a positional embedding.
  - [`def d_model(self)`](main.py#L153)
  - [`def forward(self, ids)`](main.py#L156)
- [`def count_parameters(module)`](main.py#L165)
- [`def neighbour_cosine_curve(table, max_offset)`](main.py#L169): Average cosine similarity between row p and row p+k for k in 1..max_offset.
- [`class DemoConfig`](main.py#L195)
- [`def _print_section(title)`](main.py#L204)
- [`def main()`](main.py#L209)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
