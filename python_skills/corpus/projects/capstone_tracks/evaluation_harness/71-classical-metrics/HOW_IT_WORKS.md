# How it works: Classical Metrics

## `code/main.py`

```text
Classical metrics: exact_match, F1, BLEU-4, ROUGE-L, accuracy.

Conceptual references:
- ./docs/en.md (this lesson)
- lesson 70 (task spec format) for the metric_name field

Stdlib + numpy. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def tokenize(text)`](code/main.py#L23)
- [`def exact_match(prediction, targets)`](code/main.py#L27)
- [`def accuracy(prediction, targets)`](code/main.py#L34)
- [`def f1_score(prediction, target)`](code/main.py#L38)
- [`def _ngram_counts(tokens, n)`](code/main.py#L55)
- [`def _modified_precision(cand_tokens, ref_tokens, n)`](code/main.py#L63)
- [`def _brevity_penalty(cand_len, ref_len)`](code/main.py#L75)
- [`def bleu4(prediction, reference, max_n)`](code/main.py#L83)
- [`def lcs_length(a, b)`](code/main.py#L99)
- [`def rouge_l(prediction, reference, beta)`](code/main.py#L116)
- [`def score(metric_name, prediction, targets)`](code/main.py#L146)
- [`def corpus_mean(scores)`](code/main.py#L162)
- [`def corpus_bleu(predictions, references, max_n)`](code/main.py#L168)
- [`def _reference_examples()`](code/main.py#L198)
- [`def demo()`](code/main.py#L214)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
