# How it works: Video Generation

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def sin_embed(t, dim)`](main.py#L5)
- [`def tanh(v)`](main.py#L15)
- [`def tanh_grad(h)`](main.py#L19)
- [`def matmul(W, x)`](main.py#L23)
- [`def add(a, b)`](main.py#L27)
- [`def randn_matrix(rows, cols, rng, scale)`](main.py#L31)
- [`def make_video(rng)`](main.py#L39): 1-D 'video': smooth trajectory of T_FRAMES values.
- [`def patchify_with_pos(video)`](main.py#L46): Each 'patch' here is one frame value + its time position embedding.
- [`def flatten(patches)`](main.py#L55)
- [`def init_net(in_dim, hidden, out_dim, rng)`](main.py#L59)
- [`def forward(x, t_emb, net)`](main.py#L70)
- [`def backward(target, out, cache, net)`](main.py#L80)
- [`def apply(net, grads, lr)`](main.py#L109)
- [`def make_schedule(T)`](main.py#L120)
- [`def train_joint(net, alpha_bars, T, t_dim, steps, lr, rng)`](main.py#L130): Joint sampling: denoiser sees all frames + their time positions simultaneously.
- [`def sample_joint(net, alphas, alpha_bars, T, t_dim, rng)`](main.py#L147)
- [`def independent_per_frame(T_frames, rng)`](main.py#L164): Baseline: sample each frame independently from a random walk.
- [`def frame_deltas(video)`](main.py#L169)
- [`def main()`](main.py#L173)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
