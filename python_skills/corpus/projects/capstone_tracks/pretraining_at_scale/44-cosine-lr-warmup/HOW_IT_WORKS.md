# How it works: Cosine LR with Linear Warmup

## `main.py`

```text
AdamW with cosine learning-rate schedule and linear warmup.

Implements:
- CosineWithWarmup, a stateless schedule whose lr(step) honors warmup, peak,
  and decay boundaries exactly.
- TrainState, which wires an AdamW optimizer to the schedule and runs one
  training step at a time, logging the learning rate and gradient L2 norm.
- plot_schedule_ascii and write_schedule_csv, deterministic helpers that
  produce a text plot and a CSV the rest of the pipeline can read.

The demo at the bottom builds a tiny torch.nn.Linear model, trains for 20
steps on a fixed batch, prints a per-step log, and renders the schedule.
Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class CosineWithWarmup`](main.py#L40): Stateless cosine-with-warmup learning-rate schedule.
  - [`def lr(self, step)`](main.py#L68)
  - [`def points(self, num_steps)`](main.py#L80)
- [`class StepLog`](main.py#L88): One row of the per-step training log.
  - [`def to_csv_row(self)`](main.py#L96)
- [`def gradient_l2_norm(parameters)`](main.py#L105): Return the L2 norm of the concatenated gradient vector.
- [`class TrainState`](main.py#L122): Bind a model, an AdamW optimizer, a schedule, and a loss function.
  - [`def set_lr(self, lr)`](main.py#L150)
  - [`def log(self)`](main.py#L155)
  - [`def step(self, batch_inputs, batch_targets)`](main.py#L158)
- [`def plot_schedule_ascii(schedule, width, height)`](main.py#L179): Return a text plot of the schedule across [0, total_steps].
- [`def write_schedule_csv(schedule, path)`](main.py#L217): Write one row per step to a CSV with columns (step, lr).
- [`def write_step_log_csv(log, path)`](main.py#L229): Write the training log to a CSV with the canonical schema.
- [`class LinearWarmupConstant`](main.py#L242): Alternative schedule: linear warmup followed by a flat lr_max plateau.
  - [`def lr(self, step)`](main.py#L259)
- [`class InverseSqrtWarmup`](main.py#L270): Linear warmup followed by an inverse-square-root decay.
  - [`def lr(self, step)`](main.py#L286)
- [`class EWMA`](main.py#L295): Exponentially weighted moving average of a scalar, useful for grad-norm smoothing.
  - [`def update(self, sample)`](main.py#L306)
- [`class StepLogSummary`](main.py#L316): Reduction of a per-step log to the numbers a reviewer scans first.
- [`def summarize_step_log(log)`](main.py#L328)
- [`def split_decay_groups(model, weight_decay, no_decay_names)`](main.py#L343): Split model parameters into a decay and a no-decay group.
- [`def build_toy_model(in_dim, out_dim, seed)`](main.py#L372): Tiny linear model with a fixed batch for the demo.
- [`def run_demo()`](main.py#L386): Run 20 training steps on a toy model and render the schedule.

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
