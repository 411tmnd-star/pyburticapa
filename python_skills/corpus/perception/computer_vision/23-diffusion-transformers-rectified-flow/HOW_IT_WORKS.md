# How it works: Diffusion Transformers & Rectified Flow

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def timestep_embedding(t, dim)`](main.py#L8)
- [`class AdaLNZero`](main.py#L15)
  - [`def forward(self, x, cond)`](main.py#L23)
- [`class DiTBlock`](main.py#L29)
  - [`def forward(self, x, cond)`](main.py#L41)
- [`class TinyDiT`](main.py#L50)
  - [`def forward(self, x, t)`](main.py#L69)
  - [`def _unpatchify(self, x, n)`](main.py#L80)
- [`def rectified_flow_train_step(model, x0, optimizer, device)`](main.py#L88)
- [`def rectified_flow_sample(model, shape, steps, device)`](main.py#L105)
- [`def synthetic_blobs(num, size, seed)`](main.py#L117)
- [`def main()`](main.py#L131)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
