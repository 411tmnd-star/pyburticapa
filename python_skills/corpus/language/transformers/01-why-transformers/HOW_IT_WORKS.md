# How it works: Why Transformers — The Problems with RNNs

## `main.py`

```text
Why Transformers - demonstrate the serial-depth gap between RNN-style
recurrence and attention-style parallel reduction.

Runs in pure stdlib. No numpy, no torch.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def rnn_style(xs, decay)`](main.py#L11): Sequential recurrence: h_t depends on h_{t-1}. Cannot parallelize.
- [`def attention_style(xs)`](main.py#L19): Order-independent reduction: every element is independent.
- [`def serial_scan(xs)`](main.py#L24): Prefix sum computed serially. Depth O(N).
- [`def parallel_scan(xs)`](main.py#L34): Hillis-Steele parallel prefix sum. Depth O(log N).
- [`def benchmark(n, reps)`](main.py#L54)
- [`def depth(n)`](main.py#L72): Serial-depth count for RNN vs attention-style reductions.
- [`def main()`](main.py#L79)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
