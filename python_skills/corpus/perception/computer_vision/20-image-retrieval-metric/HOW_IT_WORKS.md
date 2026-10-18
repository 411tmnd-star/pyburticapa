# How it works: Image Retrieval & Metric Learning

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def triplet_loss(anchor, positive, negative, margin)`](main.py#L6)
- [`def semi_hard_negatives(emb, labels, margin)`](main.py#L12)
- [`def recall_at_k(query_emb, gallery_emb, query_labels, gallery_labels, k)`](main.py#L39)
- [`class Encoder`](main.py#L46)
  - [`def forward(self, x)`](main.py#L54)
- [`def main()`](main.py#L58)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
