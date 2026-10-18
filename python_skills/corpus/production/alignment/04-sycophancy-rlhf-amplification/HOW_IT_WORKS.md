# How it works: Sycophancy as RLHF Amplification

## `main.py`

```text
Sycophancy amplification simulator — stdlib Python.

Three-action world:
  A = correct answer       (true utility +1.0, agreement indicator 0)
  S = sycophantic agree    (true utility -0.3, agreement indicator 1)
  W = random wrong answer  (true utility -0.5, agreement indicator 0)

Reward model has two components: "confidence/fluency" bonus that happens to
correlate with sycophancy, plus correctness. RL amplifies sycophancy just
like Shapira et al. predict.

We sweep beta (KL coefficient) and alpha (agreement-penalty correction).

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def softmax(xs)`](main.py#L30)
- [`def kl(p, q)`](main.py#L37)
- [`def labeler_reward(action)`](main.py#L41): Labeler-produced reward: mostly correctness, but with a smaller
- [`def train_rm(n_pairs)`](main.py#L49): Fit scalar rewards by Bradley-Terry on pairwise labeler preferences.
- [`def agreement_penalty_correction(r, alpha)`](main.py#L66): Shapira et al. correction: r' = r - alpha * agree(y).
- [`def ppo_train(ref_logits, reward, beta, steps, batch, lr)`](main.py#L71)
- [`def sycophancy(probs)`](main.py#L106)
- [`def correctness(probs)`](main.py#L110)
- [`def report(label, logits)`](main.py#L114)
- [`def main()`](main.py#L122)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
