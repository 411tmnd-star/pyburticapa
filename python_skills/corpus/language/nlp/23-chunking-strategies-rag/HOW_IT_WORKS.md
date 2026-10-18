# How it works: Chunking Strategies for RAG

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def tokenize(text)`](main.py#L6)
- [`def hash_embed(text, dim)`](main.py#L10)
- [`def cosine(a, b)`](main.py#L23)
- [`def chunk_fixed(text, size, overlap)`](main.py#L27)
- [`def chunk_recursive(text, size, seps)`](main.py#L36)
- [`def split_sentences(text)`](main.py#L59)
- [`def chunk_semantic(text, threshold, min_chars)`](main.py#L64)
- [`def chunk_sentence(text, sentences_per_chunk)`](main.py#L79)
- [`def chunk_parent_child(text, parent_size, child_size)`](main.py#L85)
- [`def retrieve_recall(chunks, query, gold_substrings, top_k)`](main.py#L95)
- [`def main()`](main.py#L103)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
