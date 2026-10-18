# How it works: Distributed Data Parallel and FSDP from Scratch

## `main.py`

```text
Distributed data parallel from scratch on the gloo backend.

CUDA is not assumed. The demo simulates a multi-rank cluster by spawning
several worker processes with torch.multiprocessing and connecting them
through the gloo CPU backend. The same collective ops (all_reduce,
broadcast) you would use on a multi-GPU machine show up here; only the
device tag changes.

Three drills:

1. Show that a manual all_reduce of gradients across N ranks matches the
   gradient a single process would compute on the concatenated input.
2. Wrap a model in a from-scratch DDP wrapper that broadcasts parameters
   at construction and averages gradients in a post-backward hook.
3. Sketch FSDP parameter sharding by partitioning the parameter tensors
   across ranks and gathering them for the forward pass.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class RankResult`](main.py#L44)
- [`def init_process_group(rank, world_size, backend, master_port)`](main.py#L55)
- [`def shutdown_process_group()`](main.py#L64)
- [`def make_model(in_dim, hidden, out_dim)`](main.py#L69)
- [`def broadcast_module(module, src)`](main.py#L77)
- [`def all_reduce_grads_(module, world_size)`](main.py#L82): Sum gradients across ranks, divide by world size, return l2 norm.
- [`def shard_for_rank(x, rank, world_size)`](main.py#L94)
- [`class MinimalDDP`](main.py#L103): Toy DistributedDataParallel.
  - [`def forward(self)`](main.py#L123)
  - [`def sync_grads(self)`](main.py#L126)
- [`def _grad_norm(module)`](main.py#L132)
- [`def fsdp_round_trip_sketch(module, world_size, rank)`](main.py#L141): Sketch parameter sharding and gathering for the forward pass.
- [`def manual_all_reduce_matches_single_process(rank, world_size, in_dim, out_dim, batch_size)`](main.py#L179): Each rank computes a gradient on its slice; all-reduce-mean recovers the
- [`def rank_main(rank, world_size, backend, master_port, result_queue, in_dim, hidden, out_dim, batch_size, num_steps, lr, seed)`](main.py#L223)
- [`def free_port()`](main.py#L284)
- [`def run_distributed_demo(world_size)`](main.py#L294)
- [`def write_demo(payload, path)`](main.py#L372)
- [`def parse_args()`](main.py#L377)
- [`def main()`](main.py#L388)

## `test_main.py`

```text
Tests for the from-scratch DDP wrapper and FSDP sharding sketch.

The collective tests spawn worker processes through torch.multiprocessing
on the gloo backend; this works on CPU and does not require CUDA.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class HelperTests`](test_main.py#L24)
  - [`def test_shard_for_rank_partitions_evenly(self)`](test_main.py#L25)
  - [`def test_shard_for_rank_handles_remainder(self)`](test_main.py#L36)
- [`class GradNormTests`](test_main.py#L43)
  - [`def test_grad_norm_zero_when_no_grads(self)`](test_main.py#L44)
  - [`def test_grad_norm_matches_manual_calc(self)`](test_main.py#L49)
- [`class DistributedDemoTests`](test_main.py#L60)
  - [`def setUp(self)`](test_main.py#L61)
  - [`def test_two_rank_param_sums_match(self)`](test_main.py#L67)
  - [`def test_three_rank_param_sums_match(self)`](test_main.py#L82)
- [`class OutputTests`](test_main.py#L97)
  - [`def test_write_demo_round_trip(self)`](test_main.py#L98)

## Run and test

From this folder:

```
python main.py
python test_main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
