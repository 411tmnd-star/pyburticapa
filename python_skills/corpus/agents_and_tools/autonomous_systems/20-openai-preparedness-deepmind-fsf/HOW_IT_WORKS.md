# How it works: OpenAI Preparedness Framework and DeepMind Frontier Safety Framework

## `main.py`

```text
Cross-policy decision-table diff — stdlib Python.

Reads three small tables encoding how OpenAI PF v2, Anthropic RSP v3.0,
and DeepMind FSF v3 classify a short list of capabilities. Outputs a
side-by-side comparison. The tables are pedagogical distillations of
the three source documents; real policy reads require the documents.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Policy`](main.py#L15)
- [`def diff(capability)`](main.py#L78)
- [`def main()`](main.py#L88)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
