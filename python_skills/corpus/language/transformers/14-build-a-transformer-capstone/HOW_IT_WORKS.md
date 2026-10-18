# How it works: Build a Transformer from Scratch — The Capstone

## `main.py`

```text
Capstone: decoder-only transformer from scratch.

Uses PyTorch. If torch is not installed, prints a friendly message and
degrades to a parameter-count estimator so the script still runs cleanly.

Default: 4 layers, 4 heads, d_model=128, seq_len=128, 500 steps on a
tiny built-in Shakespeare excerpt. Finishes in ~2 minutes on a laptop.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def param_count(vocab_size, d_model, n_layers, n_heads, ffn_expansion, block_size)`](main.py#L58)
- [`def run_param_preview()`](main.py#L68)
- [`def try_train()`](main.py#L82)
- [`def main()`](main.py#L270)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
