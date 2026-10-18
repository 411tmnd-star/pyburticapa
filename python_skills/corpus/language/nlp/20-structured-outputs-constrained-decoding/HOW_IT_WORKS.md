# How it works: Structured Outputs & Constrained Decoding

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`class PhoneFSM`](main.py#L9)
  - [`def valid_next(self, state)`](main.py#L13)
  - [`def transition(self, state, ch)`](main.py#L22)
  - [`def is_accept(self, state)`](main.py#L27)
- [`def softmax(xs)`](main.py#L31)
- [`def sample(probs, rng)`](main.py#L41)
- [`def mask_logits(logits, valid_indices)`](main.py#L51)
- [`def fake_llm_logits(alphabet, rng)`](main.py#L55)
- [`def generate_constrained(alphabet, fsm, seed)`](main.py#L59)
- [`def generate_unconstrained(alphabet, max_len, seed)`](main.py#L81)
- [`def main()`](main.py#L92)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
