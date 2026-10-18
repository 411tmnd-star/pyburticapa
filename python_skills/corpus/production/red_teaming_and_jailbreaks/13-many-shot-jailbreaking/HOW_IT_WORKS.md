# How it works: Many-Shot Jailbreaking

## `main.py`

```text
Many-shot jailbreaking toy — stdlib Python.

Target: a filter whose refusal probability decays as a power law in the
number of compliance pairs present in the context. Reproduces the shape of
Anil et al. 2024 Figure 2 without training a model.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def target_asr(n_shots, alpha, a0)`](main.py#L19): Target's attack-success-rate as a function of shot count.
- [`def defense_adjusted(n_shots, alpha)`](main.py#L32): A simple defense: classifier detects the many-shot pattern and caps
- [`def simulate(n_shots, asr_fn, trials)`](main.py#L39)
- [`def fit_power_law(shots, asrs)`](main.py#L45): Simple log-log linear regression: log(ASR) = log(c) + alpha * log(n).
- [`def main()`](main.py#L59)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
