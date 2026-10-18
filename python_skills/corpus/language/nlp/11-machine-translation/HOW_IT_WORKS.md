# How it works: Machine Translation

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def tokenize(text)`](main.py#L5)
- [`def ngrams(tokens, n)`](main.py#L9)
- [`def ngram_precision(hyp_tokens, ref_tokens, n)`](main.py#L13)
- [`def brevity_penalty(hyp_len, ref_len)`](main.py#L26)
- [`def simple_bleu(hypothesis, reference, max_n)`](main.py#L34)
- [`def simple_bleu_note()`](main.py#L45)
- [`def chrf(hypothesis, reference, n, beta)`](main.py#L53)
- [`def main()`](main.py#L79)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
