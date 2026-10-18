# How it works: Positional Encoding — Sinusoidal, RoPE, ALiBi

## `main.py`

```text
Positional encoding — sinusoidal, RoPE, ALiBi.

Pure stdlib. Each encoding scheme shipped as a small reusable function.
Demos the relative-distance property of RoPE numerically.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def sinusoidal_pe(n, d, base)`](main.py#L11)
- [`def apply_rope(x, pos, base)`](main.py#L21): Rotate even/odd pairs of x by angle pos * theta_i.
- [`def dot(a, b)`](main.py#L36)
- [`def alibi_slopes(n_heads)`](main.py#L40)
- [`def alibi_bias(n_heads, seq_len, causal)`](main.py#L44)
- [`def demo_sinusoidal()`](main.py#L61)
- [`def demo_rope_relative()`](main.py#L70)
- [`def demo_rope_base_scaling()`](main.py#L88)
- [`def demo_alibi()`](main.py#L103)
- [`def main()`](main.py#L115)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
