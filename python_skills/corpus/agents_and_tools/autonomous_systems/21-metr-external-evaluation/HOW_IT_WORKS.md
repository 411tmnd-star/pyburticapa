# How it works: METR Time Horizons and External Capability Evaluation

## `main.py`

```text
Logistic-fit time-horizon estimator — stdlib Python.

Given synthetic task results (expert_time_hours, success), fit a logistic
curve to P(success) vs log(expert_time) and report the 50/10/90% horizons.
Then show what eval-context gaming does to the observed number.

Uses only stdlib; the logistic fit is a minimal gradient-descent
implementation sized for pedagogy, not production.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def synth_tasks(true_horizon_hours, slope, n)`](main.py#L19): Generate synthetic (expert_time_hours, success) pairs.
- [`def sigmoid(x)`](main.py#L39)
- [`def fit(tasks, iters, lr)`](main.py#L47): Fit P(success) = sigmoid(w * log(t) + b). Return (w, b).
- [`def horizon_at(w, b, p)`](main.py#L67): Expert time where P(success) = p.  sigmoid(w*log(t)+b) = p ->
- [`def inject_gaming(tasks, gaming_rate)`](main.py#L85): Flip `gaming_rate` fraction of failures to successes (model behaves
- [`def report(label, w, b)`](main.py#L100)
- [`def main()`](main.py#L108)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
