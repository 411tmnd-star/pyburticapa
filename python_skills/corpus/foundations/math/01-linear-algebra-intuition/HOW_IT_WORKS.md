# How it works: Linear Algebra Intuition

## `vectors.py`

Functions and classes, in file order (click to jump to the line):

- [`class Vector`](vectors.py#L1)
  - [`def dot(self, other)`](vectors.py#L15)
  - [`def magnitude(self)`](vectors.py#L18)
  - [`def normalize(self)`](vectors.py#L21)
  - [`def cosine_similarity(self, other)`](vectors.py#L25)
  - [`def angle_between(self, other)`](vectors.py#L28)
  - [`def project_onto(self, other)`](vectors.py#L34)
- [`def is_independent(vectors)`](vectors.py#L42)
- [`def gram_schmidt(vectors)`](vectors.py#L68)
- [`class Matrix`](vectors.py#L81)
  - [`def transpose(self)`](vectors.py#L103)
  - [`def rank(self)`](vectors.py#L109)

## Run and test

From this folder:

```
python vectors.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
