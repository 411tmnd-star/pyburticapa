# How it works: Image Generation — Diffusion Models

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def linear_beta_schedule(T, beta_start, beta_end)`](main.py#L9)
- [`def precompute_schedule(betas)`](main.py#L13)
- [`def q_sample(x0, t, noise, schedule)`](main.py#L26)
- [`def timestep_embedding(t, dim)`](main.py#L32)
- [`class TinyUNet`](main.py#L40)
  - [`def forward(self, x, t)`](main.py#L56)
- [`def train_step(model, x0, schedule, optimizer, device, T)`](main.py#L67)
- [`def sample_ddpm(model, schedule, shape, T, device)`](main.py#L83)
- [`def sample_ddim(model, schedule, shape, steps, T, device, eta)`](main.py#L103)
- [`def synthetic_circles(num, size, seed)`](main.py#L124)
- [`def main()`](main.py#L138)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
