# How it works: End-to-End Distributed Training

## `main.py`

```text
End-to-end distributed training: tiny GPT, 4 ranks, DDP + ZeRO-1 + sharded checkpoint.

Composes the pieces built in lessons 76-80:
  * gloo backend with file rendezvous (lesson 76)
  * broadcast at init for DDP-shape parameter sync (lesson 77)
  * reduce_scatter on grad + allgather on params for ZeRO-1 (lesson 78)
  * sharded checkpoint with atomic write at the halfway mark (lesson 80)

20 steps, self-terminating, prints loss curve, per-rank memory profile, and a
RESUME VERIFIED line proving the step-10 checkpoint reloads byte-equal.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def _loopback_iface()`](main.py#L47)
- [`class CausalSelfAttention`](main.py#L51)
  - [`def forward(self, x)`](main.py#L61)
- [`class TransformerBlock`](main.py#L77)
  - [`def forward(self, x)`](main.py#L89)
- [`class MiniGPT`](main.py#L95)
  - [`def forward(self, ids)`](main.py#L109)
- [`def flat_param_numel(module)`](main.py#L119)
- [`def gather_flat_params(module)`](main.py#L123)
- [`def scatter_flat_to_params(module, flat)`](main.py#L127)
- [`def gather_flat_grads(module)`](main.py#L135)
- [`class ZeroOptimizer`](main.py#L145): Stage-1 sharded Adam, ported from lesson 78.
  - [`def shard_bytes(self)`](main.py#L170)
  - [`def step(self)`](main.py#L173)
  - [`def zero_grad(self)`](main.py#L195)
  - [`def state_dict(self)`](main.py#L201)
  - [`def load_state_dict(self, state)`](main.py#L209)
- [`class ShardEntry`](main.py#L217)
- [`def _sha(data)`](main.py#L223)
- [`def _serialize(state)`](main.py#L227)
- [`def _deserialize(data)`](main.py#L234)
- [`def save_sharded(per_rank_state, dest_dir, step)`](main.py#L239)
- [`def load_sharded(src_dir, expected_world_size)`](main.py#L271)
- [`def make_corpus(seed, total_tokens)`](main.py#L289)
- [`def init_distributed(rank, world_size, init_file, iface)`](main.py#L294)
- [`def _gather_payloads_to_rank0(local_payload, world_size)`](main.py#L302): Allgather variable-length byte buffers across ranks via padding.
- [`def _train_worker(rank, world_size, init_file, iface, ckpt_dir, steps, out_queue)`](main.py#L315)
- [`def run_e2e(world_size, steps)`](main.py#L360)
- [`def verify_resume(ckpt_dir, expected_world_size, expected_master_shards)`](main.py#L401): Reload the checkpoint and compare master shards byte-equal to the snapshot.
- [`def main()`](main.py#L417)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
