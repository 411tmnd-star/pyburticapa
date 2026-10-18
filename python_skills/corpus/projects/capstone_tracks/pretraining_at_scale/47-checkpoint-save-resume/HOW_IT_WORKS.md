# How it works: Checkpoint Save and Resume

## `code/main.py`

```text
Checkpoint save and resume from scratch.

Full checkpoint dict: model state, optimizer state, scheduler state,
loss history, current step, RNG state (python random, numpy, torch CPU,
torch CUDA if present). Atomic save by writing to a temp file and then
renaming. Sharded save splits the model state by parameter group so a
single shard is small enough to load on demand. Resume continues mid
epoch with deterministic loss within tolerance.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TrainState`](code/main.py#L39)
- [`def seed_everything(seed)`](code/main.py#L46)
- [`def make_model(in_dim, hidden, out_dim)`](code/main.py#L54)
- [`def make_optimizer_and_scheduler(model, lr, total_steps)`](code/main.py#L64)
- [`def synthetic_loader(batch_size, num_batches, in_dim, out_dim, gen)`](code/main.py#L70)
- [`def capture_rng_state()`](code/main.py#L77)
- [`def restore_rng_state(state)`](code/main.py#L89)
- [`def tuple_from_nested(obj)`](code/main.py#L104)
- [`def atomic_save(payload, path)`](code/main.py#L110)
- [`def atomic_write_json(payload, path)`](code/main.py#L132)
- [`def file_sha256(path)`](code/main.py#L157)
- [`def save_checkpoint(model, optimizer, scheduler, state, out_path)`](code/main.py#L165)
- [`def load_checkpoint(path, model, optimizer, scheduler)`](code/main.py#L195)
- [`def shard_keys_by_prefix(state_dict, num_shards)`](code/main.py#L217): Round-robin allocate parameter keys across shards.
- [`def save_sharded_checkpoint(model, optimizer, scheduler, state, out_dir)`](code/main.py#L233)
- [`def load_sharded_checkpoint(ckpt_dir, model, optimizer, scheduler)`](code/main.py#L287)
- [`def step_one(model, optimizer, scheduler, x, y, loss_fn)`](code/main.py#L326)
- [`def train_until(model, optimizer, scheduler, loss_fn, state)`](code/main.py#L342)
- [`def run_resume_demo()`](code/main.py#L374)
- [`def parse_args()`](code/main.py#L449)
- [`def main()`](code/main.py#L459)

## `code/test_main.py`

```text
Tests for full checkpoint, atomic save, and sharded resume.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class _ArbitraryObject`](code/test_main.py#L21)
- [`def _build_components(total_steps, lr)`](code/test_main.py#L25)
- [`class AtomicSaveTests`](code/test_main.py#L31)
  - [`def test_atomic_save_creates_no_partial_file(self)`](code/test_main.py#L32)
  - [`def test_atomic_write_json_round_trip(self)`](code/test_main.py#L42)
- [`class CheckpointResumeTests`](code/test_main.py#L50)
  - [`def test_single_file_round_trip_matches_state(self)`](code/test_main.py#L51)
  - [`def test_mid_epoch_resume_continues_deterministically(self)`](code/test_main.py#L76)
  - [`def test_load_refuses_pickled_objects(self)`](code/test_main.py#L87)
- [`class ShardedCheckpointTests`](code/test_main.py#L96)
  - [`def test_sharded_round_trip(self)`](code/test_main.py#L97)
  - [`def test_sha_mismatch_is_detected(self)`](code/test_main.py#L112)
  - [`def test_shard_path_outside_checkpoint_dir_is_rejected(self)`](code/test_main.py#L125)
- [`class ShardLayoutTests`](code/test_main.py#L143)
  - [`def test_shard_layout_is_round_robin_and_complete(self)`](code/test_main.py#L144)

## Run and test

From this folder:

```
python code/main.py
python code/test_main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
