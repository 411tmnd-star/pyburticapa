# How it works: ZeRO Optimizer State Sharding

## `main.py`

```text
ZeRO stage 1 optimiser state sharding on the gloo backend.

Each rank owns 1/N of the fp32 master parameter copy and 1/N of the Adam
moments. After backward the full fp16 gradient is reduce_scattered so each
rank receives only its shard's summed gradient. Adam updates the rank's
shard of the master copy, then the updated fp16 parameter shards are
allgathered so every rank reconstructs the full model for the next forward.

Run: python3 code/main.py

Compare per-step loss with vanilla DDP (lesson 77) and the per-rank optimiser
memory drop to confirm the 1/N scaling.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def _loopback_iface()`](main.py#L36)
- [`class MiniMLP`](main.py#L40)
  - [`def forward(self, x)`](main.py#L51)
- [`def flat_param_numel(module)`](main.py#L55)
- [`def gather_flat_params(module)`](main.py#L59): Concatenate every parameter into one contiguous fp32 vector.
- [`def scatter_flat_to_params(module, flat)`](main.py#L64): Copy a flat fp32 vector back into the module's fp32 parameters.
- [`def gather_flat_grads(module)`](main.py#L73): Concatenate every parameter's gradient into one contiguous fp32 vector.
- [`def shard_bounds(total, world_size, rank)`](main.py#L84): Return (start, end) of the rank's shard in a length-total flat tensor.
- [`class ZeroOptimizer`](main.py#L98): Stage-1 sharded Adam.
  - [`def shard_bytes(self)`](main.py#L131): Bytes of optimiser state held on this rank only.
  - [`def step(self)`](main.py#L137): Reduce_scatter grads to per-rank shards, Adam-step, allgather params back.
  - [`def zero_grad(self)`](main.py#L161)
- [`def make_dataset(seed, n_total)`](main.py#L168)
- [`def _zero_worker(rank, world_size, init_file, iface, steps, batch, lr, out_queue)`](main.py#L176)
- [`def run_zero(world_size, steps, batch, lr)`](main.py#L208)
- [`def memory_table(p_params, world_size)`](main.py#L245): Per-rank memory in bytes for vanilla DDP and ZeRO stage 1.
- [`def main()`](main.py#L266)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
