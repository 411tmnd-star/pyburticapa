# How it works: Attention Mechanism — The Breakthrough

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def softmax(scores)`](main.py#L4)
- [`def dot(a, b)`](main.py#L11)
- [`def dot_attention(decoder_state, encoder_states)`](main.py#L17)
- [`def matvec(M, v)`](main.py#L36)
- [`def tanh_vec(v)`](main.py#L43)
- [`def additive_attention(decoder_state, encoder_states, W_a, U_a, v_a)`](main.py#L47)
- [`def main()`](main.py#L63)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
