# How it works: Experiment Runner

## `code/main.py`

```text
Experiment runner: subprocess sandbox with timeout, memory poller, ablation table.

Conceptual references:
- ./docs/en.md (this lesson)
- Phase 19 Track A lessons 20-29 (agent harness primitives)

Stdlib only. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ExperimentSpec`](code/main.py#L30)
  - [`def to_dict(self)`](code/main.py#L40)
- [`class ExperimentResult`](code/main.py#L54)
  - [`def to_dict(self)`](code/main.py#L66)
- [`def _rss_mb(pid)`](code/main.py#L81): Best effort RSS read in MB. Returns None on unsupported platforms.
- [`class _MemoryPoller`](code/main.py#L109): Polls subprocess RSS in MB; kills the process if it crosses the cap.
  - [`def stop(self)`](code/main.py#L122)
  - [`def run(self)`](code/main.py#L125)
- [`def _scan_intermediates(stdout, metric_keys)`](code/main.py#L148): Walk stdout lines and pull every json line whose keys cover metric_keys.
- [`class ExperimentRunner`](code/main.py#L175): Spawn a subprocess, enforce timeout and memory cap, return an ExperimentResult.
  - [`def run(self, spec)`](code/main.py#L182)
  - [`def _run_subprocess(self, spec, config_path)`](code/main.py#L191)
  - [`def _terminal_label(exit_code, timed_out, oomed, have_metrics)`](code/main.py#L249)
- [`def ablate(base, knob, values)`](code/main.py#L261)
- [`class AblationTable`](code/main.py#L280)
  - [`def to_dict(self)`](code/main.py#L284)
- [`class AblationRunner`](code/main.py#L291)
  - [`def sweep(self, base, knob, values)`](code/main.py#L295)
- [`def _demo()`](code/main.py#L304)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
