# How it works: Gradient Accumulation

## `main.py`

```text
Gradient accumulation from scratch.

Effective batch size = micro batch size * accumulation steps. Accumulate
gradients across several forward and backward passes, only step the
optimizer after the last micro-batch. Tracks throughput against effective
batch size so the curve is visible, not folklore.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class StepResult`](main.py#L31)
- [`class CurvePoint`](main.py#L44)
- [`def seed_everything(seed)`](main.py#L55)
- [`def synthetic_batch(batch_size, in_dim, out_dim, gen)`](main.py#L59)
- [`def make_model(in_dim, hidden, out_dim)`](main.py#L65)
- [`def global_grad_norm(model)`](main.py#L75)
- [`def zero_grads(model)`](main.py#L84)
- [`def loss_scaled_for_accum(logits, target, accum_steps, loss_fn)`](main.py#L91)
- [`def train_one_optimizer_step(model, optimizer, micro_batches, loss_fn)`](main.py#L96): Run accum_steps micro batches, accumulate grads, step once.
- [`class _NoSyncCtx`](main.py#L130)
- [`def no_sync_context(model)`](main.py#L141): Stand-in for DDP no_sync.
- [`def run_config(effective_batch, accum_steps)`](main.py#L151)
- [`def sweep_effective_batches()`](main.py#L208)
- [`def equivalence_check()`](main.py#L236): One full batch step vs accum_steps micro-batches must match.
- [`def write_curve(points, path)`](main.py#L302)
- [`def parse_args()`](main.py#L311)
- [`def main()`](main.py#L322)

## `test_main.py`

```text
Tests for gradient accumulation core paths.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class EquivalenceTests`](test_main.py#L16)
  - [`def test_full_batch_matches_accumulated(self)`](test_main.py#L17)
  - [`def test_loss_scaled_for_accum_divides(self)`](test_main.py#L23)
- [`class SweepTests`](test_main.py#L35)
  - [`def test_sweep_returns_one_point_per_accum(self)`](test_main.py#L36)
  - [`def test_sync_calls_equal_step_count(self)`](test_main.py#L54)
- [`class CurveOutputTests`](test_main.py#L68)
  - [`def test_write_curve_round_trip(self)`](test_main.py#L69)
  - [`def test_effective_batch_must_divide_accum(self)`](test_main.py#L89)

## Run and test

From this folder:

```
python main.py
python test_main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
