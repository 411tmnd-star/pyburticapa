# How it works: Llama Guard and Input/Output Classification

## `main.py`

```text
Toy input/output classifier with taxonomy — stdlib Python.

Demonstrates where a keyword-based guard wins (raw misuse) and loses
(emoji-smuggled, homoglyph-substituted variants). Output rail shows
how a second guard on the model's output catches a different class.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def classify_raw(text)`](main.py#L47)
- [`def normalize(text)`](main.py#L58)
- [`def _is_invisible(ch)`](main.py#L79)
- [`def _homoglyph_map(s)`](main.py#L98)
- [`def classify_normalized(text)`](main.py#L102)
- [`def output_rail(text)`](main.py#L116)
- [`def demo_inputs()`](main.py#L127)
- [`def demo_outputs()`](main.py#L150)
- [`def main()`](main.py#L163)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
