# How it works: Learning Rate Schedules and Warmup

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def constant_schedule(step, lr)`](main.py#L5)
- [`def step_decay_schedule(step, lr, step_size, gamma)`](main.py#L9)
- [`def cosine_schedule(step, lr, total_steps, lr_min)`](main.py#L13)
- [`def warmup_cosine_schedule(step, lr, total_steps, warmup_steps, lr_min)`](main.py#L19)
- [`def one_cycle_schedule(step, lr, total_steps)`](main.py#L28)
- [`def visualize_schedule(name, schedule_fn, total_steps)`](main.py#L37)
- [`def sigmoid(x)`](main.py#L52)
- [`def relu(x)`](main.py#L57)
- [`def relu_deriv(x)`](main.py#L61)
- [`def make_circle_data(n, seed)`](main.py#L65)
- [`def train_with_schedule(schedule_fn, schedule_name, data, epochs, base_lr)`](main.py#L76)
- [`def compare_schedules(data)`](main.py#L129)
- [`def lr_sensitivity(data)`](main.py#L148)
- [`def warmup_impact(data)`](main.py#L172)
- [`def schedule_trajectory(data)`](main.py#L190)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
