# How it works: Gradient Clipping and Mixed Precision

## `main.py`

```text
Gradient clipping and mixed-precision training step.

Implements:
- clip_global_l2_norm, a wrapper around torch.nn.utils.clip_grad_norm_ that
  returns both the pre-clip norm and an explicit post-clip norm.
- has_non_finite_grad, a helper that scans gradients for NaN and Inf.
- AmpTrainState, a training-step orchestrator that wires an AdamW optimizer,
  autocast, and GradScaler into one safe step.
- StepLog and SkipLog, structured per-step records.

The demo at the bottom trains a small torch.nn.Linear model for 20 steps and
injects a non-finite gradient on a specific step to exercise the skip path.
Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class StepLog`](main.py#L40): One row of the per-step training log.
  - [`def to_csv_row(self)`](main.py#L52)
- [`class SkipLog`](main.py#L66): Standalone record of a skipped step, for alerting and forensics.
- [`def has_non_finite_grad(parameters)`](main.py#L76): Return True if any gradient contains a NaN or Inf.
- [`def compute_global_l2_norm(parameters)`](main.py#L88): Compute the Euclidean norm over all gradients without clipping.
- [`def clip_global_l2_norm(parameters, max_norm)`](main.py#L100): Clip gradients in place to max_norm and return (pre_clip, post_clip).
- [`class AmpTrainState`](main.py#L125): Training step with mixed precision and gradient clipping.
  - [`def log(self)`](main.py#L172)
  - [`def skip_log(self)`](main.py#L176)
  - [`def skip_count(self)`](main.py#L180)
  - [`def set_loss_fn(self, fn)`](main.py#L183)
  - [`def set_lr(self, lr)`](main.py#L186)
  - [`def _current_lr(self)`](main.py#L190)
  - [`def step(self, inputs, targets, gradient_corruptor)`](main.py#L193): Run one training step with optional gradient corruption for testing.
  - [`def _record_skip(self, loss_value, reason, pre_clip, update_scaler)`](main.py#L273)
- [`def rolling_skip_rate(log, window)`](main.py#L306): Return the rolling skip rate over the last `window` steps for each step.
- [`def write_step_log_csv(log, path)`](main.py#L322): Write the canonical training-step CSV.
- [`def build_toy_model(in_dim, out_dim, seed)`](main.py#L349)
- [`def inject_inf_into_first_grad(model)`](main.py#L361): Test-only: write +Inf into the first parameter's gradient.
- [`def run_demo()`](main.py#L370): Train for 20 steps and inject a non-finite gradient on a known step.

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
