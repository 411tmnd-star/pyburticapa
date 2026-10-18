# How it works: Document and Diagram Understanding

## `main.py`

```text
Document AI stack toy — LayoutLMv3-style inputs + Donut schema + token budgets.

Stdlib. Produces the three-stream LayoutLM input (text, bbox, patch-ids) for a
toy page, generates a Donut-style JSON schema, and compares total input token
counts across (OCR-pipeline, Donut, Nougat, VLM-native).
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Token`](main.py#L15)
- [`def mock_page()`](main.py#L20): A synthetic invoice page.
- [`def layoutlm_input(tokens, patch_grid)`](main.py#L34): Produce the three-stream input: text, bbox, patch-ids.
- [`def donut_schema(task)`](main.py#L44)
- [`def token_budget()`](main.py#L65)
- [`def demo_pipeline_output()`](main.py#L81)
- [`def eras_table()`](main.py#L96)
- [`def main()`](main.py#L108)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
