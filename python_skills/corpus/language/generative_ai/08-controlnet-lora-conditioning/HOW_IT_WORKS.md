# How it works: ControlNet, LoRA & Conditioning

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def matmul_mat_vec(M, v)`](main.py#L5)
- [`def outer(u, v)`](main.py#L9)
- [`def zeros(rows, cols)`](main.py#L13)
- [`def randn_matrix(rows, cols, rng, scale)`](main.py#L17)
- [`def lora_forward(W_frozen, A, B, x, alpha)`](main.py#L21): Compute (W + alpha * B @ A) @ x.
- [`def train_lora(W_frozen, W_target, r, rng, steps, lr)`](main.py#L29)
- [`def controlnet_toy(steps, rng)`](main.py#L57): Learn a gated side-network that conditions on an extra signal.
- [`def main()`](main.py#L81)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
