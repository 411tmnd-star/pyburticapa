# How it works: The Direct Preference Optimization Family

## `main.py`

```text
DPO family losses on toy preference data — stdlib Python.

Fits a softmax policy on 4 actions to a pairwise preference dataset using
six losses: DPO, IPO, KTO, SimPO, ORPO, BPO. Compares final chosen log-prob,
rejected log-prob, implicit reward spread, and win rate.

Toy-level — goal is to read the loss formulas side by side, not to match
production numbers.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def softmax(logits)`](main.py#L26)
- [`def logsoftmax(logits)`](main.py#L33)
- [`def sigmoid(x)`](main.py#L39)
- [`def sample_pref_pair()`](main.py#L47): Sample a preference pair (y_w, y_l) with true preference strength p_w.
- [`class Policy`](main.py#L57)
  - [`def logprob(self, a)`](main.py#L60)
  - [`def grad_logprob(self, a)`](main.py#L63)
- [`def apply_grad(p, grad, lr)`](main.py#L68)
- [`def make_policy_and_ref()`](main.py#L72)
- [`def train_dpo(pairs, beta, steps, lr, variant)`](main.py#L77)
- [`def train_simpo(pairs, beta, gamma, steps, lr)`](main.py#L112)
- [`def train_kto(labels, beta, steps, lr)`](main.py#L130)
- [`def train_orpo(pairs, lam, steps, lr)`](main.py#L151)
- [`def win_rate(pi)`](main.py#L172)
- [`def report(name, pi)`](main.py#L180)
- [`def main()`](main.py#L185)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
