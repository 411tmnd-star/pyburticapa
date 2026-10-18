# How it works: Bag of Words, TF-IDF, and Text Representation

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def tokenize(text)`](main.py#L8)
- [`def build_vocab(docs)`](main.py#L12)
- [`def bag_of_words(docs, vocab)`](main.py#L21)
- [`def document_frequency(bow_matrix)`](main.py#L30)
- [`def inverse_document_frequency(df, n_docs)`](main.py#L39)
- [`def tfidf(bow_matrix)`](main.py#L43)
- [`def l2_normalize(matrix)`](main.py#L55)
- [`def cosine_similarity(a, b)`](main.py#L63)
- [`def main()`](main.py#L67)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
