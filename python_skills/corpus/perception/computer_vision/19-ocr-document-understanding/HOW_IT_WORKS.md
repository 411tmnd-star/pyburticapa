# How it works: OCR & Document Understanding

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def ctc_loss(log_probs, targets, input_lengths, target_lengths, blank)`](main.py#L10)
- [`def greedy_ctc_decode(log_probs, blank)`](main.py#L15)
- [`class TinyCRNN`](main.py#L29)
  - [`def forward(self, x)`](main.py#L45)
- [`def synthetic_line(text, height, char_width)`](main.py#L52)
- [`def build_batch(strings, max_len)`](main.py#L62)
- [`def decode_to_str(ids)`](main.py#L78)
- [`def main()`](main.py#L82)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
