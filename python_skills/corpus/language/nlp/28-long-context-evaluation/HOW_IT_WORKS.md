# How it works: Long-Context Evaluation — NIAH, RULER, LongBench, MRCR

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def make_filler(n_tokens, seed)`](main.py#L13)
- [`def insert_needle(filler, needle, depth_ratio)`](main.py#L18)
- [`def mock_retrieval_model(context, question, effective_capacity)`](main.py#L24)
- [`def score_single_needle(context, expected, effective_capacity)`](main.py#L37)
- [`def score_multi_needle(context, expected_list, effective_capacity)`](main.py#L43)
- [`def run_niah_grid(lengths, depths, seed)`](main.py#L55)
- [`def run_multi_needle(length, n_needles, seed)`](main.py#L71)
- [`def main()`](main.py#L86)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
