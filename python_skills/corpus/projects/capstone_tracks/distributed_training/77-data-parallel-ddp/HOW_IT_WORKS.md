# How it works: Data Parallel DDP From Scratch

## `main.py`

```text
DistributedDataParallel from scratch on the gloo backend.

Wraps an nn.Module so that:
  * at construct time every rank's parameters are broadcast from rank 0 and so
    every rank starts with identical weights,
  * after backward each parameter's gradient is allreduced (sum) and divided
    by world_size, producing the mean gradient every rank steps on.

The demo trains a 3-layer MLP for 20 steps on synthetic data across 4 ranks
and compares the resulting per-step loss against a single-process reference
that walks the same batches in rank order. The two paths produce identical
loss curves to float epsilon, which is the load-bearing correctness test.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def _loopback_iface()`](main.py#L38)
- [`class MiniMLP`](main.py#L42): Small enough to converge in seconds, big enough to expose DDP wiring.
  - [`def forward(self, x)`](main.py#L55)
- [`class DistributedDataParallel`](main.py#L59): Broadcast params at init, allreduce-and-mean grads after backward.
  - [`def _broadcast_params(self)`](main.py#L72)
  - [`def sync_grads(self)`](main.py#L76)
  - [`def forward(self, x)`](main.py#L83)
  - [`def parameters(self)`](main.py#L86)
- [`def make_dataset(seed, n_total)`](main.py#L90): Synthetic regression dataset shared by every rank's reference loop.
- [`def _ddp_worker(rank, world_size, init_file, iface, steps, batch, lr, out_queue)`](main.py#L99)
- [`def run_ddp(world_size, steps, batch, lr)`](main.py#L135): Spawn world_size ranks, return per-rank loss history and param norm.
- [`def reference_single_process(world_size, steps, batch, lr)`](main.py#L173): Train the same model on the same per-step concatenated batch sequentially.
- [`def main()`](main.py#L205)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
