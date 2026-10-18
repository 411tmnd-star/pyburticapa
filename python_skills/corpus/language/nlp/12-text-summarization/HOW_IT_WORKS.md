# How it works: Text Summarization

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def sentence_split(text)`](main.py#L6)
- [`def similarity(s1, s2)`](main.py#L10)
- [`def textrank(text, top_k, damping, iterations, epsilon)`](main.py#L20)
- [`def rouge_n(hyp, ref, n)`](main.py#L50)
- [`def main()`](main.py#L65)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
