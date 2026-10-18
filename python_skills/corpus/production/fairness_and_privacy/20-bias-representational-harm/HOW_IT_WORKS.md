# How it works: Bias and Representational Harm in LLMs

## `main.py`

```text
Toy embedding-based bias probe (WEAT-shaped) — stdlib Python.

Build a simple 4-d embedding where each axis corresponds to a semantic
dimension. Two identity groups A = {'he', 'his', 'man'} and B = {'she',
'her', 'woman'}; two attribute sets X = {'engineer', 'programmer',
'scientist'} and Y = {'nurse', 'teacher', 'caregiver'}.

WEAT: compute s(w, X, Y) = mean cosine(w, X) - mean cosine(w, Y) for each
target word; effect = mean_a(s) - mean_b(s) over identity groups.

Pedagogical toy; real WEAT uses 300-d pretrained embeddings.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def cos(u, v)`](main.py#L42)
- [`def weat_score(identity_a, identity_b, attr_x, attr_y)`](main.py#L48)
- [`def debias(emb)`](main.py#L59): Crude debias: project out the gender direction (axis 1 minus axis 0).
- [`def main()`](main.py#L71)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
