# How it works: Whisper — Architecture & Fine-Tuning

## `main.py`

```text
Whisper prompt format + chunking + budget math, built from stdlib.

Shows the decoder prompt you would pass, the chunk schedule for a long
clip, and the LoRA parameter count delta for a Large-v3-turbo-shaped model.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def build_prompt(language, task, timestamps)`](main.py#L26)
- [`def chunk_schedule(total_seconds, chunk_s, stride_s)`](main.py#L34)
- [`def encoder_frames(seconds, sr, hop)`](main.py#L49)
- [`def transformer_params(n_layers, d_model, d_ff, n_heads, vocab)`](main.py#L54)
- [`def lora_params(n_layers, d_model, rank, modules)`](main.py#L63)
- [`def main()`](main.py#L69)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
