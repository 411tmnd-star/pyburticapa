# How it works: Batch APIs — the 50% Discount as Industry Standard

## `main.py`

```text
Batch vs synchronous cost simulator — stdlib Python.

Models a 50k-document pipeline across four configurations:
  SYNC              : no discount, no cache
  SYNC + CACHE      : system prompt cached after first call
  BATCH             : 50% discount, no cache
  BATCH + CACHE     : stacked (~10% of SYNC bill)
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def cost_sync(docs, prefix_tokens, per_doc_tokens, out_tokens)`](main.py#L20)
- [`def cost_sync_cache(docs, prefix_tokens, per_doc_tokens, out_tokens)`](main.py#L29)
- [`def cost_batch(docs, prefix_tokens, per_doc_tokens, out_tokens)`](main.py#L39)
- [`def cost_batch_cache(docs, prefix_tokens, per_doc_tokens, out_tokens)`](main.py#L43)
- [`def run(label, docs, prefix, per_doc, output)`](main.py#L47)
- [`def main()`](main.py#L60)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
