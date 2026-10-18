# How it works: Pipeline Parallel and Bubble Analysis

## `main.py`

```text
Pipeline parallel with GPipe schedule and bubble analysis.

Splits a sequential MLP into N stages. The schedule simulates wall-clock for
each stage's forward and backward, then prints a Gantt chart and computes the
bubble fraction against the closed-form (N-1)/(M+N-1) prediction.

A second demo wires a 2-stage real pipeline over torch.distributed gloo:
rank 0 owns stage 0, rank 1 owns stage 1, activations flow over send/recv,
and the schedule trains a small MLP for a few steps to prove the wire works.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def _loopback_iface()`](main.py#L33)
- [`def bubble_fraction(num_stages, num_microbatches)`](main.py#L37): Closed-form bubble fraction per stage for GPipe.
- [`def gpipe_schedule(num_stages, num_microbatches)`](main.py#L50): Return the GPipe schedule as a list of (cycle, stage, microbatch, phase).
- [`def render_gantt(schedule, num_stages, num_microbatches)`](main.py#L74): Render the schedule as a stage-by-cycle text Gantt chart.
- [`def measure_bubble(num_stages, num_microbatches)`](main.py#L90): Empirical bubble: count idle slots in the rendered schedule.
- [`class StageMLP`](main.py#L99): One stage of a sequential MLP.
  - [`def forward(self, x)`](main.py#L107)
- [`def _pipe_worker(rank, world_size, init_file, iface, steps, batch, microbatches, out_queue)`](main.py#L111): Two-rank pipeline: rank 0 owns stage 0, rank 1 owns stage 1.
- [`def run_pipeline(steps, batch, microbatches)`](main.py#L163): Spawn a 2-rank pipeline; return per-rank losses (only rank 1 reports) and norms.
- [`def main()`](main.py#L201)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
