# How it works: Multimodal RAG and Cross-Modal Retrieval

## `main.py`

```text
Multimodal RAG toy — three retrievers + score fusion + grounded generator.

Stdlib. A synthetic restaurant corpus with text reviews, image-feature tags,
and audio-ambiance scores. Runs three retrievers, fuses scores, emits a stub
answer with citations. Demonstrates agentic reformulation on low-confidence.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Restaurant`](main.py#L14)
- [`def text_retrieve(query)`](main.py#L36): Crude keyword matching for the query against review text.
- [`def image_retrieve(query)`](main.py#L47)
- [`def audio_retrieve(query)`](main.py#L63)
- [`def fuse(scores_list, weights)`](main.py#L75)
- [`def top_k(scored, k)`](main.py#L85)
- [`def grounded_generate(query, ranked)`](main.py#L89)
- [`def agentic_loop(query, confidence_floor)`](main.py#L99)
- [`def surveys_table()`](main.py#L119)
- [`def main()`](main.py#L131)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
